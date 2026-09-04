---
title: "The Robots That Inherited FSD's Brain — Cybercab and Optimus"
description: "How Tesla's FSD neural network gets transplanted into a robotaxi (Cybercab) and a humanoid (Optimus), and the Unboxed manufacturing innovation that made both of them cheap enough to build."
pubDate: 2026-09-03
category: "physical-ai"
tags: ["Tesla", "Cybercab", "Robotics", "Manufacturing Innovation"]
draft: false
---

## Introduction

In the previous post ([Tesla, the Company Profile](/en/blog/tesla/)), I broke Tesla down into four pillars: mobility, energy, robotics, and infrastructure. This post digs deeper into one of the most interesting threads in that story: **how a single neural network (FSD) migrates beyond the car and into a robot's body.** We'll cover the robotaxi Cybercab, the humanoid Optimus, and the Unboxed manufacturing process that dramatically lowered the production cost of both.

## The starting point: Full Self-Driving (FSD)

Every part of this story starts with **FSD**. It's the vision-based, end-to-end (E2E) autonomous-driving software running in Tesla vehicles, handling perception, decision, and control all at once using just eight surround cameras — no expensive lidar, no high-precision maps.

The scale is unusual. It processes over a million pixels per millisecond across a 360-degree view around the vehicle, and keeps training on more than **11 billion miles** of real-world driving data gathered from over 9 million vehicles worldwide. The payoff shows up in the safety numbers: with FSD (Supervised) engaged, drivers see 8x fewer serious crashes, 7x fewer minor crashes, and 6x fewer road-departure crashes versus the US average. Support expanded to South Korea, China, Australia, and New Zealand in 2025, with major European markets to follow in 2026.

This same vision neural network and AI compute stack is the shared raw material behind the two products below.

## Cybercab: a two-seat robotaxi with no steering wheel

**Cybercab** is a purpose-built electric vehicle Tesla designed from scratch for autonomous ride-hailing. It has no steering wheel and no pedals at all.

Why two seats? The decision is grounded in data showing that **over 85% of ride-hailing trips worldwide carry only one or two passengers.** Removing unnecessary seats cut both weight and cost substantially. Combined with 4680 battery cells, a simplified low-voltage 48V architecture, steer-by-wire (steering entirely by electrical signal with no physical steering column), and a next-generation drive unit that removes dependence on rare-earth and other scarce minerals, Cybercab reaches **6.1 miles per kWh** — well ahead of the Model Y AWD's 4.3 mi/kWh.

Here's how the operating loop works:

1. A rider hails the car through the app, setting personal preferences like temperature and media.
2. A Cybercab is dispatched and drives itself using FSD.
3. When the battery runs low, it automatically wireless-charges at a Supercharger.
4. When it needs maintenance or a wash, it drives itself to an automated service hub.

Robotaxi service began in Austin, Texas in June 2025 running on Model Y vehicles, and is set to shift to Cybercab as its primary vehicle once mass production ramps up. Because Tesla vertically integrates FSD, its own Supercharger network, and remote diagnostics, it's chasing a per-mile cost structurally lower than not just ride-sharing services like Uber, but private car ownership itself.

## Tesla Optimus: FSD with a body

**Tesla Optimus** is the general-purpose bipedal humanoid robot Tesla is developing. The core idea is simple — it **shares the exact same pure-vision neural network and AI computer as Tesla's cars**, so it can perceive 3D space and generate movement without any separate, complex sensor suite. It's essentially a brain trained for cars, transplanted into a robot body.

The mission comes down to two things:

- **Replacing dangerous, repetitive labor**: roughly 3 million industrial fatalities and 395 million work-related injuries are reported globally each year, and robots can take over this kind of dangerous, tedious work.
- **The economics of abundance**: removing the ceiling that physical labor puts on production, dramatically lowering the cost of goods and services.

Real-world deployment has already started. Optimus units are running inside Tesla's own Gigafactory lines, doing real work like parts picking, transport, and assembly — and as production scales, this contributes not just to lowering the robot's own manufacturing cost, but to Tesla's vehicle and battery costs and supply-chain localization as well.

## What made both possible: Unboxed manufacturing

Behind the low cost of both Cybercab and Optimus sits the **Unboxed manufacturing process** — a fundamental redesign of the sequential conveyor-belt assembly line that's been the automotive industry standard since Ford, over a century ago.

The old way worked like this: stamp and weld the body into a completed "box," send it through the paint shop, then thread doors, seats, and wiring into the cramped interior of that box one step at a time. People and robots had to work inside tight spaces, which made movement inefficient and forced factories to be larger.

Unboxed manufacturing flips the order:

1. Split the vehicle's underbody, front, rear, doors, and roof into independent sub-modules up front.
2. Assemble each module in open space — seats, wiring, electronics and all — completely in parallel.
3. Apply RIM (reaction injection molding) panels to eliminate the paint shop entirely.
4. In the final stage, snap the completed modules together at once, like Lego.

The payoff is concrete: because nobody has to work inside a cramped body shell anymore, **factory footprint shrinks by 40–50%**, the paint shop — the most expensive, highest-emission part of a car factory — disappears entirely, and with every part assembled in parallel there's no line congestion, dropping **manufacturing cost to roughly 50% of the old baseline**.

## Closing thoughts

FSD → Cybercab / Optimus → Unboxed manufacturing isn't three separate projects — it's one cost-reduction loop. FSD becomes the brain for both cars and robots, eliminating the need to develop separate sensor stacks, and Unboxed manufacturing builds the body that houses that brain far more cheaply. It's more accurate to say this isn't a car company building robots — it's a company reusing intelligence and manufacturing capability it has already proven, in a different form factor.

*This post is adapted from Tesla robotics and manufacturing notes I keep in my personal wiki.*
