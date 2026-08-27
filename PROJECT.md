# Project: XIYÀTO Homepage Redesign & Editorial Elevation

## Architecture
- **Framework & Runtime**: Next.js 16.3.0 (App Router, Turbopack, React Server Components + Client interactive islands)
- **UI & Styling**: React 19.2.8, Tailwind CSS v4.0.0 (`@tailwindcss/postcss`), custom design token layers (`app/globals.css`, `lib/discipline-themes.ts`)
- **Typography**: IBM Plex Sans (`var(--font-sans)`), Newsreader (`var(--font-serif)`), IBM Plex Mono (`var(--font-mono)`)
- **Data & Assets Layer**: Local static catalogs in `lib/services.ts`, `lib/portfolio.ts`, `lib/visuals.ts`, `lib/brand.ts` and `/public/media/{cad,data,video,visual,downloads}`
- **Performance Budget**: CLS < 0.05, 60fps scrolling, pure CSS/SVG hardware accelerated animations without heavy third-party dependencies, 0 build errors across 34 static routes.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Bespoke Discipline Thematic Tokens (R4) | 5 luxury editorial palettes: Technical Drafting Slate (CAD), Research Dossier (Growth), Titanium Gallery (3D Visuals), Obsidian Black (Video), Tech Clean (Web & Automation) with token provider and CSS scopes. | M1 | Survey (R4) |
| 2 | Tactile Micro-Haptics & Sensory Feedback (R5) | Lightweight haptic feedback helper (`lib/tactile.ts`) using `navigator.vibrate` with visual micro-scaling (`active:scale-[0.98]`) for touch and click interactions. | M1 | Survey (R5) |
| 3 | Mobile Horizontal Service Slideshow (R1) | Touch swipeable carousel with CSS scroll-snap (`snap-x snap-mandatory`), touch momentum, active card peek, fractional `01 / 06` counter, step pills, and prev/next controls. | M2 | Survey (R1) |
| 4 | Desktop Responsive Capabilities Grid (R1) | High-contrast 3-column / 6-card editorial grid with registration marks, hover lift, motif tags, and smooth anchor jumps to discipline chapters. | M2 | Survey (R1) |
| 5 | Compact Lead Intelligence Stage (R2) | Multi-region tabs (India, Middle East, Philippines, China), instant reactive metric counters, dense collapsed preview table (<350px height) with sticky headers. | M2 | Survey (R2) |
| 6 | Expandable Lead Intelligence Drawer (R2) | Interactive slide-over/modal drawer for full workbook inspection, multi-sheet tabs, live text search, row pagination, and instant redacted XLSX download link. | M2 | Survey (R2) |
| 7 | CAD Interactive Drafting Rail & HUD (R3) | Horizontal thumbnail strip of produced drawings with category filters (Floor Plans, Elevations, RCP, Flooring, Details) and sheet metadata HUD. | M3 | Survey (R3) |
| 8 | CAD Sticky Featured Drawing Stage (R3) | Prominent drafting viewport with instant blueprint swap, technical coordinate stamps, quick zoom toggles (1x/1.5x/2x), and zero vertical page sprawl. | M3 | Survey (R3) |
| 9 | CAD Full Inspection Modal & Vector Downloads (R3) | Deep pan/drag and multi-level zoom (100%-400%) integration, vector PDF/DWG download triggers, keyboard shortcuts (`+`, `-`, `0`, `ESC`). | M3 | Survey (R3) |
| 10 | Homepage Assembly & Atmosphere Integration (R4/R5) | Full assembly of `app/page.tsx`, wrapping service chapters with bespoke discipline themes, atmospheric grid lines, section dividers, and CTA strips. | M4 | Survey (R4/R5) |
| 11 | Comprehensive E2E Testing Suite (Tiers 1-4) | Opaque-box test suite for verifying R1-R5 across mobile/desktop, tab switches, modal expansions, zoom interactions, and build integrity. | E2E-Track | Survey / Req |
| 12 | Adversarial Stress & Performance Verification (Tier 5) | Adversarial test cases verifying edge cases: rapid tab switching, extreme viewport sizes (320px to 3840px), reduced motion, touch gestures, and zero layout shift. | Final-M | Survey / Req |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Theming & Tactile Foundations | `lib/discipline-themes.ts`, `lib/tactile.ts`, `app/globals.css` updates with theme scopes (`.theme-slate`, `.theme-dossier`, `.theme-titanium`, `.theme-obsidian`, `.theme-tech`). | none | PLANNED |
| M2 | Capabilities Carousel & Lead Intelligence Panel | `components/home/CapabilitiesCarousel.tsx` (R1) + `components/home/LeadIntelligencePanel.tsx` (R2) with multi-region tabs and expandable drawer. | M1 | PLANNED |
| M3 | CAD Drafting Rail & Drawing Stage | `components/home/CadDraftingRailStage.tsx` (R3) with featured stage, horizontal thumbnail rail, quick zoom, and `CadInspectionModal` integration. | M1 | PLANNED |
| M4 | Homepage Assembly & Thematic Elevation | Refactor `app/page.tsx` and `components/home/ServiceSections.tsx` to mount all interactive components with bespoke discipline atmospheres and verified responsive layouts. | M2, M3 | PLANNED |
| E2E | E2E Testing Suite Track | Independent test suite creation (`TEST_INFRA.md`, automated verification runner, Tiers 1-4 tests, publishing `TEST_READY.md`). | none | IN_PROGRESS |
| Final | 100% E2E Pass & Adversarial Hardening (Tier 5) | Verify 100% pass on E2E test suite (Tiers 1-4), followed by Tier 5 white-box adversarial stress testing, CLS < 0.05 verification, and clean build. | M4, E2E | PLANNED |

## Interface Contracts

### 1. `lib/discipline-themes.ts`
```typescript
export type DisciplineSlug = "cad" | "growth" | "visualisation" | "video" | "website" | "automation";

export interface DisciplineThemeTokens {
  slug: DisciplineSlug;
  name: string;
  motif: string;
  paletteName: string;
  classes: {
    sectionWrapper: string;
    cardSurface: string;
    cardBorder: string;
    accentText: string;
    accentBg: string;
    accentBorder: string;
    textPrimary: string;
    textMuted: string;
    badgeStyle: string;
    gridLines?: string;
  };
}
```

### 2. `components/home/CapabilitiesCarousel.tsx` (R1)
```typescript
import { Service } from "@/lib/services";

export interface CapabilitiesCarouselProps {
  services: Service[];
  className?: string;
}
```

### 3. `components/home/LeadIntelligencePanel.tsx` (R2)
```typescript
export type RegionKey = "all" | "india" | "middle-east" | "philippines" | "china";

export interface LeadIntelligencePanelProps {
  defaultRegion?: RegionKey;
  className?: string;
}
```

### 4. `components/home/CadDraftingRailStage.tsx` (R3)
```typescript
import { CadDrawing } from "@/lib/portfolio";

export interface CadDraftingRailStageProps {
  drawings?: CadDrawing[];
  className?: string;
}
```

## Code Layout
- `lib/discipline-themes.ts` — Discipline theme token definitions and helper hooks/getters
- `lib/tactile.ts` — Tactile vibration and micro-haptic interaction utilities
- `components/home/CapabilitiesCarousel.tsx` — Mobile horizontal snap carousel + desktop 3-col grid
- `components/home/LeadIntelligencePanel.tsx` — Multi-region lead intelligence panel, metrics, compact table, and expandable drawer
- `components/home/CadDraftingRailStage.tsx` — Horizontal blueprint rail + featured drawing stage + zoom inspector trigger
- `components/home/ServiceSections.tsx` — Discipline section wrappers utilizing theme tokens and interactive stages
- `app/page.tsx` — Master homepage landing route assembling all elevated chapters
- `app/globals.css` — Global CSS styling and bespoke discipline theme utility classes
- `tests/e2e/` — Opaque-box E2E test scripts, runners, and validation harnesses
