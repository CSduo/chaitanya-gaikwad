# Master Plan: dishasingha Portfolio — Japanese Sakura & Architectural Line-Art Integration

## Executive Summary
This master plan details the complete end-to-end strategy for enhancing the dishasingha portfolio website with bespoke Japanese Sakura botanical line-art flourishes and precision architectural drafting marks. The visual system features 60 FPS multi-layered motion physics (ambient floating drift, scroll parallax, zero-re-render desktop cursor proximity), 10–30% jet black opacity over pure white background, removal and replacement of the availability badge with refined artistic framing, and flawless mobile responsiveness.

## Architectural Layout & File Boundaries
- SVG Vector Components: `src/components/ui/decorations/`
  - `SakuraPetal.tsx`
  - `SakuraBlossom.tsx`
  - `SakuraBranch.tsx`
  - `CornerCrosshairs.tsx`
  - `CompassRing.tsx`
  - `BlueprintAccent.tsx`
- Physics & Motion Hooks: `src/hooks/`
  - `useCursorProximity.ts`
  - `useParallaxMotion.ts`
- Unified Overlay Component: `src/components/ui/BotanicalArchitecturalOverlay.tsx`
- Hero Framing Component: `src/components/ui/HeroFraming.tsx`
- Layout Integration: `src/App.tsx` (Removing `AvailabilityBadge`, integrating section framing)

## Milestone Breakdown

### Milestone 1: Sakura & Architectural SVG Vector Component Suite
- **Objective**: Build zero-latency, inline React SVG vector graphics for botanical flourishes and architectural drafting marks.
- **Deliverables**: 6 modular components in `src/components/ui/decorations/`.

### Milestone 2: Physics-Based Motion & Proximity Engine
- **Objective**: Implement hardware-accelerated micro-interaction hooks for ambient float, scroll parallax, and zero-re-render cursor proximity using Framer Motion `motion/react`.
- **Deliverables**: Custom hooks `useCursorProximity` and `useParallaxMotion`.

### Milestone 3: Availability Badge Removal & Hero Section Refined Framing
- **Objective**: Remove obsolete `AvailabilityBadge.tsx` and integrate artistic Sakura blossom contour + architectural corner crosshair framing above Hero title.
- **Deliverables**: Removal of badge, creation of `HeroFraming.tsx`, clean integration into `App.tsx`.

### Milestone 4: Full Portfolio Section Integration & Responsive Tuning
- **Objective**: Frame Hero (`#home`), About (`#about`), Projects (`#projects`), and Contact (`#contact`) sections with `BotanicalArchitecturalOverlay.tsx`. Enforce 10–30% opacity, pure white contrast, no horizontal overflow, and 60 FPS performance. Resolve pre-existing build/lint warnings.
- **Deliverables**: Integrated `App.tsx`, responsive styling tuning, clean build.

### Milestone 5: Verification, E2E Testing & Forensic Audit
- **Objective**: Comprehensive multi-tier test suite execution (Tiers 1-4), build validation (`npm run build`), review verification, and Forensic Audit (`teamwork_preview_auditor`).
- **Deliverables**: All tests pass, build code 0, clean audit report.

## Iteration Loop Protocol per Milestone
Each milestone will be executed using the Project Pattern Iteration Loop:
1. **Explorer**: Technical strategy & task specification.
2. **Worker**: Code implementation & local build/test verification (with Zero-Cheating enforcement).
3. **Reviewers & Challengers**: High-reliability code review & stress testing.
4. **Forensic Auditor**: Integrity verification.
5. **Gate Check**: PASS / FAIL evaluation.
