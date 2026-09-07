import {
	calculate,
	paymentFactor,
	formatKRW,
	type Inputs,
	type Regulation,
} from './mortgage.ts';

let ok = true;
function check(label: string, got: number, want: number, tol = 1) {
	const good = Math.abs(got - want) < tol;
	ok = ok && good;
	console.log(
		`${good ? 'PASS' : 'FAIL'}  ${label}: got ${got.toFixed(1)} / want ${want.toFixed(1)}`
	);
}

const baseReg: Regulation = {
	ltvPct: 70,
	dsrPct: 40,
	dtiPct: 40,
	dtiEnabled: false,
	stressRatePct: 0,
	loanCaps: [],
	capsEnabled: false,
};
const baseIn: Inputs = {
	cash: 30000,
	income: 1000000, // 소득을 크게 줘서 DSR이 안 걸리게
	existingAnnualPayment: 0,
	ratePct: 4,
	years: 30,
	includeFees: false,
	feeRateOverridePct: null,
	extraFee: 0,
};

console.log('--- 1. LTV만 걸리는 경우 (현금 3억, LTV 70%) ---');
// L <= 0.7*(C+L)  =>  L = 0.7*30000/0.3 = 70,000
const r1 = calculate(baseIn, baseReg);
check('대출', r1.loan, 70000);
check('집값', r1.price, 100000);
check('실효 LTV(%)', r1.effectiveLtvPct, 70, 0.01);
console.log(`      병목: ${r1.binding}`);

console.log('\n--- 2. DSR이 걸리는 경우 (연소득 6천, DSR 40%, 4% 30년) ---');
// 연 상환 여력 2,400만 → 월 200만. 4%/30년 계수로 역산
const factor = paymentFactor(4, 30);
const expectedLoan = 200 / factor;
const r2 = calculate({ ...baseIn, income: 6000, cash: 100000 }, baseReg);
check('대출', r2.loan, expectedLoan);
check('월 상환액', r2.monthlyPayment, 200, 0.5);
check('실효 DSR(%)', r2.effectiveDsrPct, 40, 0.1);
console.log(`      병목: ${r2.binding} (${formatKRW(r2.loan)})`);

console.log('\n--- 3. 절대한도 계단이 걸리는 경우 (현금 6억) ---');
// 15억 이하 6억 / 15~25억 4억 / 25억 초과 2억
const capReg: Regulation = {
	...baseReg,
	capsEnabled: true,
	loanCaps: [
		{ maxPrice: 150000, cap: 60000 },
		{ maxPrice: 250000, cap: 40000 },
		{ maxPrice: Infinity, cap: 20000 },
	],
};
const r3 = calculate({ ...baseIn, cash: 60000 }, capReg);
check('대출', r3.loan, 60000);
check('집값', r3.price, 120000);
console.log(`      병목: ${r3.binding} — 12억 집이면 15억 이하 구간이라 한도 6억이 맞음`);

console.log('\n--- 4. 스트레스 금리: 한도는 줄고 실제 상환액은 그대로 ---');
const r4a = calculate({ ...baseIn, income: 6000, cash: 100000 }, baseReg);
const r4b = calculate({ ...baseIn, income: 6000, cash: 100000 }, { ...baseReg, stressRatePct: 3 });
console.log(`      스트레스 0%p 대출: ${formatKRW(r4a.loan)}`);
console.log(`      스트레스 3%p 대출: ${formatKRW(r4b.loan)}`);
console.log(`      ${(r4b.loan < r4a.loan ? 'PASS' : 'FAIL')}  스트레스 적용 시 한도가 줄어든다`);
ok = ok && r4b.loan < r4a.loan;
// 실제 월 상환액은 실제 금리(4%) 기준이어야 한다
check('스트레스 적용 후에도 실제 금리 기준 월 상환액', r4b.monthlyPayment, r4b.loan * factor, 0.01);

console.log('\n--- 5. 부대비용: 집값 + 부대비용 = 현금 + 대출 ---');
const r5 = calculate({ ...baseIn, includeFees: true, extraFee: 200 }, baseReg);
check('현금+대출 = 집값+부대비용', r5.price + r5.fees, baseIn.cash + r5.loan);
console.log(`      집값 ${formatKRW(r5.price)} / 부대비용 ${formatKRW(r5.fees)} / 대출 ${formatKRW(r5.loan)}`);
console.log(`      ${(r5.price < r1.price ? 'PASS' : 'FAIL')}  부대비용을 반영하면 살 수 있는 집값이 줄어든다`);
ok = ok && r5.price < r1.price;

console.log('\n--- 6. 다주택 LTV 0% (규제지역) ---');
const r6 = calculate(baseIn, { ...baseReg, ltvPct: 0 });
check('대출', r6.loan, 0);
check('집값 = 현금', r6.price, 30000);

console.log('\n--- 7. 포맷 ---');
console.log(`      ${formatKRW(120000)} / ${formatKRW(100000)} / ${formatKRW(5400)} / ${formatKRW(0)}`);

console.log('\n결과:', ok ? '전부 통과' : '실패 있음');
process.exit(ok ? 0 : 1);
