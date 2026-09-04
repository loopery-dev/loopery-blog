import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CATEGORY_SLUGS } from './categories';

// 두 언어 컬렉션이 공유하는 스키마. 번역 글의 id(슬러그)는 원문과 반드시 같아야
// 한다 — hreflang/언어 전환 링크가 "같은 슬러그면 서로의 번역"이라고 가정하고
// 경로를 계산한다 (src/i18n/utils.ts 참고).
const blogSchema = ({ image }: { image: () => z.ZodType<{ src: string }> }) =>
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
		draft: z.boolean().default(false),
	});

const blog = defineCollection({
	// 한국어(기본) 글. src/content/blog/ 바로 아래 파일만 — en/ 서브폴더는 별도 컬렉션.
	loader: glob({ base: './src/content/blog', pattern: '*.{md,mdx}' }),
	schema: blogSchema,
});

const blogEn = defineCollection({
	// 영어 번역 글. 파일명(슬러그)이 원문 blog 컬렉션과 반드시 일치해야 한다.
	loader: glob({ base: './src/content/blog/en', pattern: '*.{md,mdx}' }),
	schema: blogSchema,
});

export const collections = { blog, blogEn };
