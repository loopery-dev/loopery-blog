/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
	// 조회수 — Vercel KV(Upstash) 연결 시 자동 주입되거나 Upstash를 직접 연결했을 때의 이름
	readonly KV_REST_API_URL?: string;
	readonly KV_REST_API_TOKEN?: string;
	readonly UPSTASH_REDIS_REST_URL?: string;
	readonly UPSTASH_REDIS_REST_TOKEN?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
