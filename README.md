# 🚀 라이언의 자동화 일지 (Ryan's Automation Log)

> Claude Code & AI 에이전트로 구축하는 자동매매 및 생산성 자동화 일지.
> Obsidian(`D:\My-Second-Brain`)의 wiki 노트를 정리해 Astro + Vercel 기반 블로그로 발행합니다.

## 🛠 Tech Stack

- **Framework:** [Astro](https://astro.build) (Static Site Generation)
- **Deployment:** [Vercel](https://vercel.com) — GitHub `main` 브랜치 push 시 자동 빌드
- **Content Source:** [Obsidian Vault](../../../My-Second-Brain) (`wiki/concepts`, `wiki/entities`, `wiki/synthesis`)
- **Automation:** Claude Code (wiki → 블로그 포스트 변환, git commit/push)

## 📁 Pipeline Architecture

```text
[Obsidian Vault: wiki/*] ──(Claude Code)──► [src/content/blog/*.md] ──(git push)──► [Vercel 자동 배포]
```

현재는 Astro 프로젝트 스캐폴딩 단계까지 완료된 상태이며, wiki → 블로그 변환 자동화는 다음 단계에서 구축합니다.

## ⚡ Quick Start

```sh
npm install
npm run dev       # localhost:4321 에서 로컬 미리보기
npm run build      # ./dist/ 로 프로덕션 빌드
npm run preview    # 빌드 결과 로컬 미리보기
```

## 📝 콘텐츠 규칙 (Frontmatter)

`src/content/blog/*.md` 문서는 아래 스키마(`src/content.config.ts`)를 따릅니다:

```yaml
---
title: "글 제목"
description: "SEO 요약 (2문장 이내)"
pubDate: 2026-09-02
updatedDate: 2026-09-02   # 선택
heroImage: ../../assets/xxx.jpg   # 선택
tags: ["ClaudeCode", "Obsidian"]
lang: "kr"   # "kr" | "en" — 듀얼 발행용
draft: false
---
```

## 🔒 Security Notice

API 키, 계정 정보, 개인 메모는 `.env` 및 Obsidian Vault의 비공개 경로에만 보관하며 GitHub에 직접 커밋하지 않습니다.
