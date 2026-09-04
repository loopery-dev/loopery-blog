// 포스트별 조회수 카운터. Upstash Redis(Vercel KV)를 사용한다.
// 사이트 나머지는 전부 정적 프리렌더링이고, 이 라우트만 요청마다 실행되는
// Vercel 서버리스 함수로 동작한다 (astro.config.mjs의 adapter + 아래 prerender=false).
import type { APIRoute } from 'astro';
import { Redis } from '@upstash/redis';

export const prerender = false;

// Vercel의 Storage 탭에서 Upstash Redis(구 Vercel KV)를 연결하면 대개
// KV_REST_API_URL / KV_REST_API_TOKEN으로 주입되고, Upstash를 직접 연결한
// 경우 UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN으로 주입된다.
// 둘 다 지원해서 어느 쪽으로 연결하든 동작하게 한다.
function getRedis(): Redis | null {
	const url = import.meta.env.KV_REST_API_URL ?? import.meta.env.UPSTASH_REDIS_REST_URL;
	const token = import.meta.env.KV_REST_API_TOKEN ?? import.meta.env.UPSTASH_REDIS_REST_TOKEN;
	if (!url || !token) return null;
	return new Redis({ url, token });
}

const MAX_SLUG_LENGTH = 200;
// 콘텐츠 스키마의 slug 문자 집합과 동일하게 제한 (임의 키 주입 방지)
const SLUG_PATTERN = /^[a-zA-Z0-9_-]+$/;

function isValidSlug(slug: string): boolean {
	return slug.length > 0 && slug.length <= MAX_SLUG_LENGTH && SLUG_PATTERN.test(slug);
}

// GET: 현재 조회수만 읽는다 (증가 없음).
export const GET: APIRoute = async ({ params }) => {
	const slug = params.slug;
	if (!slug || !isValidSlug(slug)) {
		return new Response(JSON.stringify({ error: 'invalid slug' }), { status: 400 });
	}

	const redis = getRedis();
	if (!redis) {
		// KV가 아직 연결되지 않은 상태 — 기능을 끈 것처럼 조용히 0을 반환.
		return new Response(JSON.stringify({ views: 0, configured: false }), {
			headers: { 'content-type': 'application/json' },
		});
	}

	const views = (await redis.get<number>(`views:${slug}`)) ?? 0;
	return new Response(JSON.stringify({ views, configured: true }), {
		headers: { 'content-type': 'application/json' },
	});
};

// POST: 조회수를 1 증가시키고 새 값을 반환한다. 포스트 페이지 로드 시 클라이언트가 호출.
export const POST: APIRoute = async ({ params }) => {
	const slug = params.slug;
	if (!slug || !isValidSlug(slug)) {
		return new Response(JSON.stringify({ error: 'invalid slug' }), { status: 400 });
	}

	const redis = getRedis();
	if (!redis) {
		return new Response(JSON.stringify({ views: 0, configured: false }), {
			headers: { 'content-type': 'application/json' },
		});
	}

	const views = await redis.incr(`views:${slug}`);
	return new Response(JSON.stringify({ views, configured: true }), {
		headers: { 'content-type': 'application/json' },
	});
};
