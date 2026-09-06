// UI 문구 사전. 새 페이지/컴포넌트에서 문구가 필요해지면 여기에 ko/en 쌍으로 추가한다.
export const UI = {
	ko: {
		siteTitle: '라이언의 스노우볼',
		siteDescription: 'Claude Code & AI 에이전트로 구축하는 자동매매 및 생산성 자동화 일지',
		heroTagline:
			'Claude Code 같은 AI 에이전트로 자동매매 시스템을 만들고, Obsidian에 쌓은 지식을 자동으로 블로그까지 발행하는 1인 개발 여정을 기록합니다.',
		heroCta: '최신 글 보러가기 →',
		topicsTitle: '이 블로그에서 다루는 것들',
		recentPosts: '최근 글',
		viewAllPosts: '전체 글 보기 →',
		backToAll: '← 전체 글 보기',
		emptyCategory: '아직 이 카테고리에 발행된 글이 없습니다.',
		comments: '댓글',
		switchTo: 'English',
		aboutTitle: 'About',
		lastUpdatedOn: '마지막 수정',
		footerRights: '라이언. All rights reserved.',
		privacyPolicy: '개인정보처리방침',
	},
	en: {
		siteTitle: "Ryan's Snowball",
		siteDescription:
			'A build log of automated trading systems and productivity automation, built with Claude Code & AI agents.',
		heroTagline:
			'I build automated trading systems with AI agents like Claude Code, and turn notes piling up in Obsidian into blog posts automatically — this is that solo build log.',
		heroCta: 'Read the latest posts →',
		topicsTitle: 'What this blog covers',
		recentPosts: 'Recent posts',
		viewAllPosts: 'View all posts →',
		backToAll: '← Back to all posts',
		emptyCategory: 'No posts published in this category yet.',
		comments: 'Comments',
		switchTo: '한국어',
		aboutTitle: 'About',
		lastUpdatedOn: 'Last updated on',
		footerRights: 'Ryan. All rights reserved.',
		privacyPolicy: 'Privacy Policy',
	},
} as const;

export function t(lang: 'ko' | 'en') {
	return UI[lang];
}
