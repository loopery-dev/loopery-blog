export type Lang = 'ko' | 'en';

/**
 * 주어진 경로의 "다른 언어 버전" 경로를 계산한다. ko가 루트, en이 /en 프리픽스라는
 * 라우팅 규칙에 전적으로 의존한다 — 실제로 그 번역이 존재하는지는 호출하는 쪽에서
 * (컬렉션에 같은 슬러그가 있는지 확인해서) 판단해야 한다.
 */
export function getAltPath(pathname: string, currentLang: Lang): string {
	if (currentLang === 'ko') {
		return `/en${pathname}`;
	}
	const stripped = pathname.replace(/^\/en/, '');
	return stripped === '' ? '/' : stripped;
}
