/**
 * 주택 구입 가능 금액 계산 (LTV / DSR / DTI / 대출 절대한도 동시 적용).
 *
 * 페이지(home-affordability.astro)에서 분리해둔 이유는 계산 로직만 따로 검증하기
 * 위해서다. UI 없이 이 모듈만 import해서 시나리오별 값을 확인할 수 있다.
 *
 * 금액 단위는 전부 **만원**이다 (한국 부동산 금액을 원 단위로 다루면 자릿수가 커서
 * 입력도 표시도 불편하다). 1억 = 10,000.
 */

export interface Regulation {
	/** 담보인정비율 (%) */
	ltvPct: number;
	/** 총부채원리금상환비율 상한 (%) — 1금융 40, 2금융 50 */
	dsrPct: number;
	/** 총부채상환비율 상한 (%) — 규제지역에서만 적용 */
	dtiPct: number;
	dtiEnabled: boolean;
	/** 스트레스 DSR 가산금리 (%p) — 한도 산정에만 쓰이고 실제 상환액에는 안 붙는다 */
	stressRatePct: number;
	/** 주택가격 구간별 대출 절대한도 (규제지역). 오름차순 구간. */
	loanCaps: { maxPrice: number; cap: number }[];
	capsEnabled: boolean;
}

export interface Inputs {
	/** 보유 현금 (만원) */
	cash: number;
	/** 연소득, 세전 (만원) */
	income: number;
	/** 기존 대출의 연간 원리금 상환액 (만원) */
	existingAnnualPayment: number;
	/** 실제 대출금리 (%) */
	ratePct: number;
	/** 대출 만기 (년) */
	years: number;
	/** 취득세·중개보수를 현금에서 차감할지 */
	includeFees: boolean;
	/** 취득세 중과 등으로 직접 지정하고 싶을 때의 부대비용률 (%). null이면 자동 계산 */
	feeRateOverridePct: number | null;
	/** 법무비 등 정액 비용 (만원) */
	extraFee: number;
}

export interface Result {
	/** 최종 대출 가능액 (만원) */
	loan: number;
	/** 구입 가능 주택가격 (만원) */
	price: number;
	/** 부대비용 (만원) */
	fees: number;
	/** 각 규제가 허용하는 대출 상한 (만원). Infinity면 해당 규제 미적용 */
	limits: { ltv: number; dsr: number; dti: number; cap: number };
	/** 실제로 한도를 결정한 규제 */
	binding: 'ltv' | 'dsr' | 'dti' | 'cap' | 'none';
	/** 실제 금리 기준 월 상환액 (만원) */
	monthlyPayment: number;
	/** 총 이자 (만원) */
	totalInterest: number;
	/** 실효 LTV (%) */
	effectiveLtvPct: number;
	/** 실효 DSR (%) — 실제 금리 기준 */
	effectiveDsrPct: number;
	/** 스트레스 금리 적용 DSR (%) — 심사에 쓰이는 값 */
	stressedDsrPct: number;
}

export const BINDING_LABEL: Record<Result['binding'], string> = {
	ltv: 'LTV (담보인정비율)',
	dsr: 'DSR (소득 대비 상환부담)',
	dti: 'DTI (총부채상환비율)',
	cap: '대출 절대한도',
	none: '제약 없음',
};

/** 원리금균등상환의 "대출 1원당 월 상환액" 계수 */
export function paymentFactor(annualRatePct: number, years: number): number {
	const months = Math.round(years * 12);
	if (months <= 0) return 0;
	const monthlyRate = annualRatePct / 100 / 12;
	if (monthlyRate === 0) return 1 / months;
	const growth = Math.pow(1 + monthlyRate, months);
	return (monthlyRate * growth) / (growth - 1);
}

/**
 * 주택 취득세율 (%). 전용 85㎡ 이하 1주택 기준의 표준세율이다.
 * 6~9억 구간은 취득가액에 따라 1~3%로 이어지는 누진식을 쓴다.
 * 지방교육세를 더해 대략 ×1.1로 잡는다.
 *
 * 다주택 중과(8~12%)나 85㎡ 초과 농어촌특별세는 반영하지 않는다 —
 * 그 경우는 feeRateOverridePct로 직접 지정한다.
 */
export function acquisitionTaxRatePct(price: number): number {
	const eok = price / 10000;
	let base: number;
	if (eok <= 6) base = 1;
	else if (eok <= 9) base = (eok * 2) / 3 - 3;
	else base = 3;
	return base * 1.1;
}

/** 부동산 중개보수 상한요율 (%) — 매매 기준 */
export function brokerageRatePct(price: number): number {
	const eok = price / 10000;
	if (eok < 0.5) return 0.6;
	if (eok < 2) return 0.5;
	if (eok < 9) return 0.4;
	if (eok < 12) return 0.5;
	if (eok < 15) return 0.6;
	return 0.7;
}

function feeRatePct(price: number, inputs: Inputs): number {
	if (!inputs.includeFees) return 0;
	if (inputs.feeRateOverridePct !== null) return inputs.feeRateOverridePct;
	return acquisitionTaxRatePct(price) + brokerageRatePct(price);
}

/** 주택가격 구간별 대출 절대한도 */
function loanCap(price: number, reg: Regulation): number {
	if (!reg.capsEnabled || reg.loanCaps.length === 0) return Infinity;
	for (const tier of reg.loanCaps) {
		if (price <= tier.maxPrice) return tier.cap;
	}
	return reg.loanCaps[reg.loanCaps.length - 1].cap;
}

export function calculate(inputs: Inputs, reg: Regulation): Result {
	const realFactor = paymentFactor(inputs.ratePct, inputs.years);
	// 한도 심사는 스트레스 금리를 얹은 금리로 원리금을 계산한다 (실제 상환액과 다름)
	const stressFactor = paymentFactor(inputs.ratePct + reg.stressRatePct, inputs.years);

	// 소득 기반 한도는 집값과 무관하므로 먼저 확정된다
	const dsrRoom = inputs.income * (reg.dsrPct / 100) - inputs.existingAnnualPayment;
	const dsrLimit = stressFactor > 0 ? Math.max(0, dsrRoom / 12 / stressFactor) : 0;

	// DTI는 원래 "주담대 원리금 + 기타대출 이자"지만, 기타대출 이자를 따로 받지 않고
	// 보수적으로 원리금을 그대로 쓴다 (그만큼 한도가 조금 낮게 잡힌다).
	const dtiRoom = inputs.income * (reg.dtiPct / 100) - inputs.existingAnnualPayment;
	const dtiLimit = reg.dtiEnabled
		? stressFactor > 0
			? Math.max(0, dtiRoom / 12 / stressFactor)
			: 0
		: Infinity;

	// LTV·절대한도는 집값에 걸리고 집값은 다시 대출액에 걸린다(순환).
	// 집값 = (현금 - 부대비용) + 대출 이므로 고정점 반복으로 푼다. 단조 수렴한다.
	let price = Math.max(inputs.cash, 0);
	let loan = 0;
	for (let i = 0; i < 60; i += 1) {
		const ltvLimit = (reg.ltvPct / 100) * price;
		loan = Math.max(0, Math.min(ltvLimit, dsrLimit, dtiLimit, loanCap(price, reg)));
		const rate = feeRatePct(price, inputs) / 100;
		// price + price*rate + 정액비용 = cash + loan
		price = Math.max(0, (inputs.cash + loan - inputs.extraFee) / (1 + rate));
	}

	// 반복이 끝난 집값에서 모든 제약을 다시 평가해, 보고하는 값이 반드시 제약을
	// 만족하도록 마무리한다 (절대한도가 계단 함수라 경계에서 흔들릴 수 있다).
	const limits = {
		ltv: (reg.ltvPct / 100) * price,
		dsr: dsrLimit,
		dti: dtiLimit,
		cap: loanCap(price, reg),
	};
	loan = Math.max(0, Math.min(limits.ltv, limits.dsr, limits.dti, limits.cap));
	const fees = price * (feeRatePct(price, inputs) / 100) + (inputs.includeFees ? inputs.extraFee : 0);

	let binding: Result['binding'] = 'none';
	let smallest = Infinity;
	(['ltv', 'dsr', 'dti', 'cap'] as const).forEach((key) => {
		if (limits[key] < smallest - 1e-9) {
			smallest = limits[key];
			binding = key;
		}
	});

	const monthlyPayment = loan * realFactor;
	const months = Math.round(inputs.years * 12);
	const annualPayment = monthlyPayment * 12;
	const stressedAnnual = loan * stressFactor * 12;

	return {
		loan,
		price,
		fees,
		limits,
		binding,
		monthlyPayment,
		totalInterest: Math.max(0, monthlyPayment * months - loan),
		effectiveLtvPct: price > 0 ? (loan / price) * 100 : 0,
		effectiveDsrPct:
			inputs.income > 0
				? ((annualPayment + inputs.existingAnnualPayment) / inputs.income) * 100
				: 0,
		stressedDsrPct:
			inputs.income > 0
				? ((stressedAnnual + inputs.existingAnnualPayment) / inputs.income) * 100
				: 0,
	};
}

/** 만원 단위 숫자를 "5억 4,000만원" 형태로 */
export function formatKRW(manwon: number): string {
	const rounded = Math.round(manwon);
	if (rounded === 0) return '0원';
	const sign = rounded < 0 ? '-' : '';
	const abs = Math.abs(rounded);
	const eok = Math.floor(abs / 10000);
	const rest = abs % 10000;
	if (eok > 0 && rest > 0) return `${sign}${eok}억 ${rest.toLocaleString()}만원`;
	if (eok > 0) return `${sign}${eok}억원`;
	return `${sign}${rest.toLocaleString()}만원`;
}
