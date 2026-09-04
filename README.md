# 🚀 라이언의 자동화 일지 (Ryan's Automation Log)

> Claude Code & AI 에이전트로 구축하는 자동매매 및 생산성 자동화 일지.
> 별도로 관리하는 개인 Obsidian 위키의 노트를 정리해 Astro + Vercel 기반 블로그로 발행합니다.

## 🛠 Tech Stack

- **Framework:** [Astro](https://astro.build) (Static Site Generation)
- **Deployment:** [Vercel](https://vercel.com) — GitHub `main` 브랜치 push 시 자동 빌드
- **Content Source:** 비공개 Obsidian 위키 (`wiki/concepts`, `wiki/entities`, `wiki/synthesis`) — 이 저장소에는 포함되지 않음
- **Automation:** Claude Code (wiki → 블로그 포스트 변환, git commit/push)

## 📁 Pipeline Architecture

```text
[비공개 Obsidian 위키: wiki/*] ──(Claude Code)──► [src/content/blog/*.md] ──(git push)──► [Vercel 자동 배포]
```

Obsidian 볼트에서 `/publish-blog` 스킬을 실행하면 wiki 노트를 골라 이 저장소의 `src/content/blog/`로 변환·커밋합니다.

## ✅ 발행된 글

`wiki/`의 주제 14개는 서로 겹치는 내용이 많아(같은 벤치마크·아키텍처를 여러 노트가 공유) 노트 단위 1:1이 아니라 **주제 클러스터 단위로 묶어서** 6개 글로 발행했습니다.

| 글 | 묶은 원본 노트 |
|---|---|
| [테슬라 기업 프로필](https://ryans-automation-log.vercel.app/blog/tesla/) | `entities/Tesla.md` |
| [Tesla Ecosystem and Physical AI](https://ryans-automation-log.vercel.app/blog/tesla-ecosystem-and-physical-ai/) | `synthesis/Tesla-Ecosystem-and-Physical-AI.md` |
| [왜 자율주행 AI는 '추론'을 시작했나](https://ryans-automation-log.vercel.app/blog/reasoning-centric-autonomous-driving/) | `synthesis/Reasoning-Centric-Autonomous-Driving.md`, `concepts/VLA-for-Autonomous-Driving.md`, `entities/NVIDIA.md` |
| [Alpamayo-R1 해부](https://ryans-automation-log.vercel.app/blog/alpamayo-r1-deep-dive/) | `entities/Alpamayo-R1.md`, `entities/Cosmos-Reason.md`, `entities/AlpaSim.md`, `concepts/Chain-of-Causation.md`, `concepts/Flow-Matching-Trajectory-Decoder.md`, `concepts/Reasoning-Action-Consistency-RL.md` |
| [FSD 두뇌를 물려받은 로봇들](https://ryans-automation-log.vercel.app/blog/fsd-cybercab-optimus-unboxed/) | `concepts/Full-Self-Driving.md`, `entities/Cybercab.md`, `entities/Tesla-Optimus.md`, `concepts/Unboxed-Manufacturing.md` |
| [메가팩, AI 시대 전력망의 숨은 수혜자](https://ryans-automation-log.vercel.app/blog/megapack-ai-power-grid/) | `entities/Megapack.md` |

`wiki/`의 모든 주제가 현재 발행 완료 상태입니다. 새 노트가 추가되면 다시 `/publish-blog`로 후보를 스캔합니다 — 겹치는 내용이 많다면 이번처럼 클러스터로 묶어서 발행하는 걸 우선 검토합니다.

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
category: "ai-automation"   # src/categories.ts의 CATEGORY_SLUGS 중 하나, 필수
tags: ["ClaudeCode", "Obsidian"]
lang: "kr"   # "kr" | "en" — 듀얼 발행용
draft: false
---
```

## 📊 조회수 · 💬 댓글 설정

둘 다 코드는 이미 들어가 있고, 아래 값을 **Vercel 프로젝트의 Settings → Environment Variables**에
등록하면 다음 배포부터 바로 켜진다(코드 수정·재배포 불필요). 값을 비워두면 두 기능 다 자동으로
숨겨진다 — 로컬 `.env`에는 절대 실제 값을 넣지 말고 `.env.example`만 참고할 것.

**조회수** (Upstash Redis 기반 서버리스 카운터, `src/pages/api/views/[slug].ts`)
1. Vercel 대시보드 → 이 프로젝트 → Storage 탭 → Upstash Redis(구 Vercel KV) 연결(무료 티어로 충분).
2. 연결하면 `KV_REST_API_URL` / `KV_REST_API_TOKEN`이 프로젝트에 자동 주입됨 — 별도 작업 불필요.

**댓글** (giscus, GitHub Discussions 기반)
1. 이 저장소가 **공개(public)**이고 **Discussions**가 켜져 있어야 함 (Settings → General).
2. [giscus.app](https://giscus.app)에서 `JuhyeokRa/ryans-automation-log`를 입력 → 안내에 따라
   [giscus GitHub App](https://github.com/apps/giscus)을 이 저장소에 설치.
3. Discussion 카테고리는 "Comments"(Announcements 타입 추천, 매핑은 `pathname`)로 새로 만들기.
4. 페이지 하단에 생성되는 `<script>` 코드의 `data-repo` / `data-repo-id` / `data-category` /
   `data-category-id` 값을 그대로 Vercel 환경 변수 `PUBLIC_GISCUS_REPO` /
   `PUBLIC_GISCUS_REPO_ID` / `PUBLIC_GISCUS_CATEGORY` / `PUBLIC_GISCUS_CATEGORY_ID`에 등록.

## 🔒 Security Notice

API 키, 계정 정보, 개인 메모, 로컬 파일 경로(사용자명 포함) 등은 절대 여기에 직접 커밋하지 않고
`.env`(gitignore 처리됨) 또는 비공개 Obsidian 위키에만 보관합니다. 조회수·댓글용 시크릿도 위처럼
Vercel 프로젝트의 환경 변수로만 설정합니다.
