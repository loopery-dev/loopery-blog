// UI 문구 사전. 새 페이지/컴포넌트에서 문구가 필요해지면 여기에 ko/en 쌍으로 추가한다.
export const UI = {
	ko: {
		siteTitle: '루퍼',
		siteDescription: '자동화 & 검증 — 믿고 손을 놓을 수 있는 루프를 짓습니다.',
		heroTagline: '믿고 손을 놓을 수 있는 루프를 짓습니다.',
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
		footerRights: '루퍼. All rights reserved.',
		privacyPolicy: '개인정보처리방침',
	},
	en: {
		siteTitle: 'Looper',
		siteDescription: 'Automation & Verification — building loops you can trust enough to let go of.',
		heroTagline: 'I build loops you can trust enough to let go of.',
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
		footerRights: 'Looper. All rights reserved.',
		privacyPolicy: 'Privacy Policy',
	},
} as const;

export function t(lang: 'ko' | 'en') {
	return UI[lang];
}
