import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CATEGORY_SLUGS } from './categories';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			// 포스트 유형 카테고리. 값 목록/라벨/아이콘은 src/categories.ts에서 관리.
			category: z.enum(CATEGORY_SLUGS),
			tags: z.array(z.string()).default([]),
			// 'kr' | 'en' — Obsidian wiki → 듀얼 발행 파이프라인용
			lang: z.enum(['kr', 'en']).default('kr'),
			draft: z.boolean().default(false),
		}),
});

export const collections = { blog };
