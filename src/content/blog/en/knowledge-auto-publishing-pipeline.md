---
title: "From Note to Post — Inside My Obsidian-to-Blog Pipeline"
description: "A full breakdown of the three-stage pipeline that turns a raw note dropped into Obsidian into a wiki entry, and then into a post on this blog — with a real example."
pubDate: 2026-09-04
category: "publishing-pipeline"
tags: ["Automation", "Obsidian", "Claude Code", "Publishing Pipeline", "Astro"]
draft: false
---

## Introduction

I didn't type most of the posts on this blog myself. A note dropped haphazardly into `raw/inbox/` in my Obsidian vault gets picked up by an AI agent (Claude Code), turned into a structured wiki entry, and the best of those entries get converted into a post here and published. Until now this has just been "something that happens automatically" — but recently, while actually processing a personal-finance note through the whole thing, I had a reason to walk through the entire flow start to finish. This post documents that pipeline itself — a bit of a meta post, in other words.

## The three-stage structure: Capture → Ingest/Compile → Publish

### Stage 1: Capture (raw/inbox)

Web articles, paper excerpts, and personal notes get saved as-is, unprocessed, into the `raw/inbox/` folder in Obsidian. Nothing gets organized at this point — the whole point is just to drop the raw material in.

### Stage 2: Ingest & Compile (raw/inbox → wiki/)

Asking "clean up what's in the inbox" kicks off this sequence:

1. **Analyze the source**: pull out the core concepts, claims, and keywords from the new file.
2. **Check existing knowledge**: if the extracted concept already exists in `wiki/concepts/` or `wiki/entities/`, integrate the new angle into the existing document without damaging what's there; if not, create a new one. If several concepts are intertwined, also create a separate synthesis note under `wiki/synthesis/`.
3. **Bidirectional links**: link related documents with wiki-links inside every new or edited document, so no document ends up orphaned.
4. **Update the index**: register the new document in `wiki/index.md`, the map-of-content for the whole wiki.
5. **Archive**: move the processed source from `raw/inbox/` to `raw/archive/`. That move itself acts as the "already processed" flag — the same file won't come up again the next time cleanup is requested.

There's a fixed writing standard, too. Every wiki document carries frontmatter (`type` — concept/entity/synthesis, `aliases`, `tags`, `created`/`updated`, `sources` pointing back to the original), and the body follows an **Overview → Core content → Connections** structure. The rule is always the same: no plain summarizing — new information always gets woven organically into the existing knowledge graph.

### Stage 3: Publish (wiki/ → the Astro blog)

A separate, dedicated publishing step takes over from here, targeting this Astro blog (deployed on Vercel).

1. **Scan for candidates**: sweep `wiki/concepts/`, `entities/`, and `synthesis/` for any note that doesn't yet carry `blog_published: true` in its frontmatter. Synthesis notes get priority since they tend to already be polished, comprehensive pieces.
2. **Consider clustering**: don't mechanically turn every note-1 into post-1. If several candidates overlap in subject matter, first check whether they'd work better split into a "big picture" post and a "technical deep dive" post that pulls from multiple notes.
3. **Rewrite in blog voice**: never just translate or trim the source. Rewrite it in an intro–body–conclusion structure that a general reader — someone with none of the wiki's graph context — can follow immediately. Wiki-links get converted to plain or bolded text, and any tree-style diagram gets converted into a nested list or arrow-based flow (this template has no mermaid renderer).
4. **Generate frontmatter**: fill in `title`/`description`/`pubDate`/`category`/`tags`/`lang`/`draft` to match this blog's content schema. **`category` is required** — one of a predefined set of category slugs has to be picked.
5. **Mark the source as published**: once the conversion is done, write `blog_published`, `blog_slug`, and `blog_published_at` back onto the original wiki note. That's the second state flag — it keeps the same note from showing up as a duplicate candidate on the next scan.
6. **Commit only, never auto-push**: the pipeline `git add`s and commits to the blog repo automatically, but **it never pushes on its own.** Once Vercel is wired up to the repo, a push is an instant production deploy, so that step always waits for an explicit human go-ahead.

## The category system that sorts published posts

After running this pipeline a few times, posts from noticeably different domains started showing up on the same blog. That's what led to building a separate category taxonomy for post types.

- A single source of truth holds each category's slug, label, icon, and description; there are currently five (AI Agent Automation, Algorithmic Trading, Physical AI & Autonomous Driving, **Knowledge Auto-Publishing Pipeline**, and Personal Finance & Investing).
- The content schema's `category` field is a required value pulled straight from that list, so a new post can't skip assigning one.
- Post cards and detail pages get a clickable category badge, and each category also gets its own listing page.

## A real example: from a finance note to a published post

The fastest way to show how this actually runs is with a recent example.

Requesting cleanup on a "comparing five tax-advantaged accounts" note sitting in `raw/inbox/` led to:

1. Pension Savings, IRP, ISA, a general brokerage account, and a CMA each becoming their own concept note, plus a separate synthesis note on age-based allocation strategy — six notes in total, all cross-linked and reflected in the wiki index. The source note moved to the archive.
2. The synthesis note got reworked into a blog post — "ISA in Your 20s, Pension Savings in Your 40s" — and published.
3. This was the first time personal-finance content had entered this blog, which is exactly what created the need to distinguish post types — and that's what became the category system described above.

One note produced six wiki nodes, one of which became a blog post, and along the way the blog's own structure (categories) gained a new piece too.

## Closing thoughts

The pipeline comes down to two things: **narrowing human involvement to exactly two decisions — which candidate to publish, and whether to deploy** — and **using two state flags (archiving, and the publish flag) to prevent duplicate processing.** Organizing notes, writing posts, and deploying are each, individually, kind of a hassle — but chaining all three into one flow means "just drop the note in and the rest follows" is actually true now. This very post was made that way, too.

*This post is adapted from a note in my personal wiki about the knowledge auto-publishing pipeline.*
