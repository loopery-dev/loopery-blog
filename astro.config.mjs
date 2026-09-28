// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	// sitemap/canonical/OG/RSS가 전부 이 값을 기준으로 절대 URL을 만든다.
	// 커스텀 도메인을 연결하면 이 값도 같이 바꿔야 한다.
	site: 'https://loopery.dev',
	// output stays 'static' (the default): every page is still prerendered at
	// build time except src/pages/api/views/[slug].ts, which opts out via
	// `export const prerender = false` to run as a Vercel serverless function
	// (needed for the live view counter). The adapter is what makes that
	// per-route opt-out possible.
	//
	// NOTE: Astro/Vercel middleware does NOT run in front of prerendered
	// static pages (Vercel serves those straight from the filesystem and
	// never invokes the render function or edge middleware) — confirmed
	// against Astro's own docs. So the language auto-redirect is implemented
	// client-side instead (see the inline script in BaseHead.astro), not via
	// src/middleware.ts.
	adapter: vercel(),
	// 카테고리 슬러그를 physical-ai → tech-investing으로 바꿨다(2026-09).
	// 기존 색인/외부 링크가 깨지지 않게 구 URL을 새 URL로 넘긴다.
	//
	// 주의: 어댑터가 만드는 Vercel 라우트는 `^/blog/category/physical-ai$`처럼
	// 트레일링 슬래시가 없는 완전 일치 정규식이다(키에 슬래시를 붙여도 Astro가
	// 떼어낸다). 그런데 sitemap과 CategoryBadge가 쓰는 정식 형태는 슬래시가
	// 붙은 `/blog/category/physical-ai/`쪽이다. Vercel이 매칭 전에 슬래시를
	// 정규화해주면 아래 규칙만으로 충분하지만, 그 동작에 기대지 않기 위해
	// public/blog/category/physical-ai/index.html 에 정적 폴백을 함께 두었다
	// (리다이렉트 라우트가 filesystem 핸들러보다 먼저 평가되므로 충돌 없음).
	// 카테고리 슬러그를 또 바꾸면 이 두 곳을 같이 손볼 것.
	redirects: {
		'/blog/category/physical-ai': '/blog/category/tech-investing/',
		'/en/blog/category/physical-ai': '/en/blog/category/tech-investing/',
	},
	integrations: [mdx(), sitemap()],
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Atkinson',
			cssVariable: '--font-atkinson',
			fallbacks: ['sans-serif'],
			options: {
				variants: [
					{
						src: ['./src/assets/fonts/atkinson-regular.woff'],
						weight: 400,
						style: 'normal',
						display: 'swap',
					},
					{
						src: ['./src/assets/fonts/atkinson-bold.woff'],
						weight: 700,
						style: 'normal',
						display: 'swap',
					},
				],
			},
		},
	],
});
