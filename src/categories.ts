// 블로그 포스트 카테고리 정의.
// 새 카테고리를 추가하려면 CATEGORY_SLUGS와 CATEGORIES에 함께 추가할 것
// (content.config.ts의 category 필드가 CATEGORY_SLUGS를 그대로 참조한다).

export const CATEGORY_SLUGS = [
	'ai-automation',
	'algo-trading',
	'physical-ai',
	'publishing-pipeline',
	'personal-finance',
] as const;

export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

export interface CategoryMeta {
	slug: CategorySlug;
	label: string;
	icon: string;
	desc: string;
	label_en: string;
	desc_en: string;
}

export const CATEGORIES: CategoryMeta[] = [
	{
		slug: 'ai-automation',
		label: 'AI 에이전트 자동화',
		icon: '🤖',
		desc: 'Claude Code로 터미널에서 프로젝트를 설계·빌드·배포하는 과정을 있는 그대로 기록합니다.',
		label_en: 'AI Agent Automation',
		desc_en: 'Notes on designing, building, and shipping projects from the terminal with Claude Code.',
	},
	{
		slug: 'algo-trading',
		label: '알고리즘 트레이딩',
		icon: '📈',
		desc: '비트코인·주식 자동매매 봇을 설계하고 백테스팅하며 검증해나가는 과정을 다룹니다.',
		label_en: 'Algorithmic Trading',
		desc_en: 'Designing, backtesting, and validating crypto and stock auto-trading bots.',
	},
	{
		slug: 'physical-ai',
		label: 'Physical AI & 자율주행',
		icon: '🧠',
		desc: 'Tesla, NVIDIA 등 자율주행·로보틱스 기술 트렌드를 위키로 정리해 풀어냅니다.',
		label_en: 'Physical AI & Autonomous Driving',
		desc_en: 'Tesla, NVIDIA, and the wider autonomous driving / robotics trends, distilled from my wiki.',
	},
	{
		slug: 'publishing-pipeline',
		label: '지식 자동 발행 파이프라인',
		icon: '🛠️',
		desc: 'Obsidian 노트 → Claude Code 변환 → GitHub → Vercel, 메모가 글이 되는 과정을 공유합니다.',
		label_en: 'Knowledge Auto-Publishing Pipeline',
		desc_en: 'How a note becomes a post: Obsidian → Claude Code → GitHub → Vercel.',
	},
	{
		slug: 'personal-finance',
		label: '재테크 & 자산관리',
		icon: '💰',
		desc: '절세 계좌 활용법, 생애주기별 자산배분 등 개인 재무 설계를 정리합니다.',
		label_en: 'Personal Finance & Investing',
		desc_en: 'Tax-advantaged accounts, life-stage asset allocation, and other personal finance notes.',
	},
];

export function getCategory(slug: string): CategoryMeta | undefined {
	return CATEGORIES.find((c) => c.slug === slug);
}
