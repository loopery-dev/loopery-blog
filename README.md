# 🚀 라이언의 자동화 일지 (Ryan's Automation Log)

> Claude Code & AI 에이전트로 구축하는 자동매매 및 생산성 자동화 일지.
> Obsidian(`D:\Juhyeok\Projects\obsidian`)의 wiki 노트를 정리해 Astro + Vercel 기반 블로그로 발행합니다.

## 🛠 Tech Stack

- **Framework:** [Astro](https://astro.build) (Static Site Generation)
- **Deployment:** [Vercel](https://vercel.com) — GitHub `main` 브랜치 push 시 자동 빌드
- **Content Source:** [Obsidian Vault](../obsidian) (`wiki/concepts`, `wiki/entities`, `wiki/synthesis`)
- **Automation:** Claude Code (wiki → 블로그 포스트 변환, git commit/push)

## 📁 Pipeline Architecture

```text
[Obsidian Vault: wiki/*] ──(Claude Code)──► [src/content/blog/*.md] ──(git push)──► [Vercel 자동 배포]
```

Obsidian 볼트에서 `/publish-blog` 스킬을 실행하면 wiki 노트를 골라 이 저장소의 `src/content/blog/`로 변환·커밋합니다.

## 📌 발행 예정 위키 주제 (Backlog)

`wiki/`에 정리는 됐지만 아직 블로그 글로 발행되지 않은 주제 목록입니다. 원본 노트의 frontmatter에 `blog_published: true`가 없으면 여기 포함됩니다 — `/publish-blog` 실행 시 후보로 뜹니다.

### Concepts

| 주제 | 요약 |
|---|---|
| [Chain of Causation](../obsidian/wiki/concepts/Chain-of-Causation.md) | VLA가 관측과 주행 행동 사이의 인과 관계를 학습하도록 만든 구조화 추론 프레임워크·데이터셋 방법론 |
| [Flow-Matching Trajectory Decoder](../obsidian/wiki/concepts/Flow-Matching-Trajectory-Decoder.md) | VLM 추론 결과를 조건으로 6.4초 미래 주행 궤적을 실시간 생성하는 연속 액션 생성기 |
| [Full Self-Driving (FSD)](../obsidian/wiki/concepts/Full-Self-Driving.md) | 라이다·HD맵 없이 카메라만으로 인지-판단-제어를 단일 파이프라인으로 처리하는 테슬라의 E2E 자율주행 SW |
| [Reasoning-Action Consistency RL](../obsidian/wiki/concepts/Reasoning-Action-Consistency-RL.md) | SFT된 VLA의 언어적 추론과 실제 제어 궤적 간 일관성을 강제하는 사후 강화학습 기법 |
| [Unboxed Manufacturing Process](../obsidian/wiki/concepts/Unboxed-Manufacturing.md) | 컨베이어 벨트 방식을 대체하는 테슬라의 모듈형 병렬 차량 조립 패러다임 |
| [VLA for Autonomous Driving](../obsidian/wiki/concepts/VLA-for-Autonomous-Driving.md) | 카메라·센서·자연어 지시를 통합해 추론과 제어 궤적을 동시에 생성하는 자율주행 비전-언어-행동 모델 |

### Entities

| 주제 | 요약 |
|---|---|
| [AlpaSim](../obsidian/wiki/entities/AlpaSim.md) | NVIDIA의 3D 가우시안 스플래팅 기반 신경 렌더링 자율주행 시뮬레이터 |
| [Alpamayo-R1 (AR1)](../obsidian/wiki/entities/Alpamayo-R1.md) | NVIDIA가 CES 2026에서 공개한 자율주행 특화 VLA 파운데이션 모델 |
| [Cosmos-Reason](../obsidian/wiki/entities/Cosmos-Reason.md) | NVIDIA의 물리 AI(Physical AI)용 대형 비전-언어 모델(VLM) |
| [Cybercab](../obsidian/wiki/entities/Cybercab.md) | 스티어링 휠 없는 테슬라의 로보택시 전용 자율주행 전기차 |
| [Megapack](../obsidian/wiki/entities/Megapack.md) | 전력망·데이터센터용 테슬라의 대용량 배터리 에너지 저장 장치(BESS) |
| [NVIDIA](../obsidian/wiki/entities/NVIDIA.md) | 자율주행·Physical AI 생태계 전반을 선도하는 AI 하드웨어·소프트웨어 기업 |
| [Tesla Optimus](../obsidian/wiki/entities/Tesla-Optimus.md) | FSD 신경망 두뇌를 물리적 신체에 이식한 테슬라의 휴머노이드 로봇 |
| [Tesla](../obsidian/wiki/entities/Tesla.md) | EV·자율주행·에너지저장·로보틱스를 아우르는 Physical AI 선도 기업 |

### Synthesis

| 주제 | 요약 |
|---|---|
| [Reasoning-Centric Autonomous Driving](../obsidian/wiki/synthesis/Reasoning-Centric-Autonomous-Driving.md) | 모듈러 → E2E → 추론 중심으로 이어진 자율주행 패러다임 전환을 정리한 종합 리포트 |

> ✅ 발행 완료: [Tesla Ecosystem and Physical AI](https://ryans-automation-log.vercel.app/blog/tesla-ecosystem-and-physical-ai/)

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
