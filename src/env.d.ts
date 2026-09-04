/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
	// 조회수 — Vercel KV(Upstash) 연결 시 자동 주입되거나 Upstash를 직접 연결했을 때의 이름
	readonly KV_REST_API_URL?: string;
	readonly KV_REST_API_TOKEN?: string;
	readonly UPSTASH_REDIS_REST_URL?: string;
	readonly UPSTASH_REDIS_REST_TOKEN?: string;

	// 댓글 — giscus.app에서 발급되는 값 (PUBLIC_ 접두사라 클라이언트에도 노출됨, 전부 비민감 정보)
	readonly PUBLIC_GISCUS_REPO?: string;
	readonly PUBLIC_GISCUS_REPO_ID?: string;
	readonly PUBLIC_GISCUS_CATEGORY?: string;
	readonly PUBLIC_GISCUS_CATEGORY_ID?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
