// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	// sitemap/canonical/OG/RSS가 전부 이 값을 기준으로 절대 URL을 만든다.
	// 커스텀 도메인을 연결하면 이 값도 같이 바꿔야 한다.
	site: 'https://ryansnowball.com',
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
