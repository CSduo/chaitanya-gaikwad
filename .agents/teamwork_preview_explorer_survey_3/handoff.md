# XIYÀTO Homepage Redesign — Architectural & Feature Inventory Survey

**Date:** 2026-08-27  
**Subagent:** explorer_survey_3  
**Status:** Complete Architectural & Feature Inventory  
**Target:** Elevation of the XIYÀTO homepage into an ultra-premium editorial showcase (R1, R2, R3, R4, R5)  

---

## 1. Observation

Direct observations from codebase inspection of `C:\Users\ADMIN\.gemini\antigravity\scratch\chaitanya-gaikwad`:

### 1.1 Codebase & Build Infrastructure
- **Framework:** Next.js 16.3.0 with React 19.2.8, TypeScript 5.7.3, Tailwind CSS v4.0.0 (`@tailwindcss/postcss`).
- **Build Status:** Verified via `npm run build` — compiles cleanly in Turbopack in ~4s, generating **34 static/SSG pages** with zero compilation errors (`app/page.tsx`, `/services/*`, `/work/*`, `/work/research/*`, `/company/*`, `/legal/*`, `/sitemap.xml`, `/robots.txt`).
- **Typecheck Status:** Verified via `npm run typecheck` (`tsc --noEmit`) — passes with **0 errors** under strict TypeScript configuration.
- **Routing & SEO:** Next.js App Router (`app/`) with statically pre-rendered server metadata (`pageMetadata` in `lib/seo.ts`), JSON-LD schemas (`organizationSchema`, `webSiteSchema`), and 308 legacy redirects configured in `next.config.ts`.

### 1.2 Existing Homepage Structure (`app/page.tsx`)
- **Hero Section (lines 66-183):** Contains brand title, H1 (`HOME_COPY.h1`), standfirst, WhatsApp quick-contact cards (UK & India), and `HeroCapabilities` interactive scene switcher (`CadScene`, `DataScene`, `VisualisationScene`, `VideoScene`, `WebScene`, `AutomationScene`).
- **Capabilities Anchor `#capabilities` (lines 188-232):** Renders a static 3-column grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`) mapping `SERVICES`. On mobile viewports (<640px), this collapses into a vertical stack of 6 full-width cards, causing vertical scroll sprawl before reaching service chapters.
- **Service Chapters (lines 234-245):** Successive sections separated by `SectionDivider`:
  - `CadSection` (`components/home/ServiceSections.tsx:105`): Renders 4-step process list and an 8-item `ImageGrid`.
  - `GrowthSection` (`components/home/ServiceSections.tsx:157`): Renders 3 aggregate stat boxes and 4 static workbook cards.
  - `VisualisationSection` (`components/home/ServiceSections.tsx:216`): Category button filter + 8/12 item `ImageGrid`.
  - `VideoSection` (`components/home/ServiceSections.tsx:288`): Dark tone container with `VideoGallery` (3 video cards).
  - `WebsiteSection` (`components/home/ServiceSections.tsx:374`): 3 website cards with scope pills.
  - `AutomationSection` (`components/home/ServiceSections.tsx:338`): 3 marketing pillar cards + CTA box.
- **Current Theming (`components/home/ServiceSections.tsx:77-79`):** Uses only binary `tone="light" | "surface" | "dark"` with monochrome paper/ink variables. It lacks discipline-specific luxury palettes (Technical Drafting Slate, Research Dossier, Titanium Gallery, Obsidian Black, Tech Clean).

### 1.3 Available Data & Media Assets
- **CAD Package Data (`lib/portfolio.ts:281-684`):** 25 ultra-HD drawings across 7 real projects (`master-bathroom`, `cigar-lounge`, `master-bedroom`, `toilet-wash`, `stair-wall`, `villa-concept`, `villa-measurement`), with vector PDF/DWG download routes under `/public/media/cad/`.
- **Research Workbook Data (`lib/portfolio.ts:160-279`):** 8 structured research systems across India, Middle East, Philippines, China, GCC, UAE, with sheet counts, sheet names, and redacted JSON data files under `/public/media/data/*.json`.
- **Visuals Data (`lib/visuals.ts`):** 41 reviewed visual renders across 6 groups (`interiors`, `product-furniture`, `retail-showroom`, `workspace-office`, `exterior-architectural`, `hospitality`).
- **Video Data (`lib/portfolio.ts:11-158`):** 8 commercial film projects with MP4 files and WebP poster frames.
- **Interactive Modals:** `CadInspectionModal.tsx` supports canvas pan, wheel/button zoom (1x-4x), and thumbnail navigation; `DataViewer.tsx` supports sheet tabs, text filtering, and pagination; `Lightbox` and `Dialog` support accessible image/video viewports.

---

## 2. Logic Chain & Feature Inventory Mapping

### 2.1 R1: Mobile Horizontal Service Slideshow & Navigation
- **Problem:** Stacking 6 service cards vertically on mobile creates unnecessary scroll fatigue and buries the subsequent service chapters.
- **Solution:** A unified `CapabilitiesShowcase` component that dynamically switches presentation mode:
  - **Mobile Mode (`< lg`):**
    - Horizontal swipeable carousel with CSS scroll snap (`scroll-snap-type: x mandatory`, `scroll-snap-align: center`).
    - Visible fractional counter: `01 / 06` in monospace luxury typography.
    - Active slide tracking via `IntersectionObserver` or scroll debouncing.
    - Stepper controls: Previous / Next arrow buttons + pagination progress indicators.
    - Touch-optimized card width (`w-[82vw]` to `w-[86vw]`, max `340px`) with peek affordance of adjacent cards.
    - Micro-haptic tactile feedback on snap/transition.
  - **Desktop Mode (`>= lg`):**
    - High-density 3x2 architectural grid with refined hover borders, accent glow, and deep links to matching chapters (`#service-${slug}`).
- **Interface Contract:**
  ```typescript
  export interface CapabilitiesShowcaseProps {
    services: Service[];
    defaultIndex?: number;
    onServiceSelect?: (slug: ServiceSlug) => void;
    className?: string;
  }
  ```

### 2.2 R2: Compact Expandable Lead Intelligence Panel for Growth & B2B
- **Problem:** Current `GrowthSection` presents static workbook cards; users cannot immediately experience the depth of XIYÀTO's research operations without leaving the page, yet rendering full data tables inflates vertical height.
- **Solution:** A dual-state `LeadIntelligencePanel` component:
  - **Collapsed State (< 350px container height):**
    - Region Filter Tabs: `All Markets`, `India`, `Middle East`, `Philippines`, `China`.
    - Instant Dynamic Metric Counters: Reactively displays total verified targets, structured sheets, reachable routes %, and A++/A+ priority share based on the selected region.
    - Curated Lead Snapshot Table: Ultra-dense 3-4 row preview displaying Rank, Company, Sector/Brand, Decision-Maker Route, and Verification Badge.
    - "Expand Dossier" Action: Prominent CTA to open the full interactive viewer without layout shift.
  - **Expanded State (Interactive Drawer / Modal / In-Place Dossier):**
    - Full multi-sheet exploration (`cleanSheets`), live row search (`query`), paginated table (`PAGE_SIZE: 20`), and direct redacted workbook download.
    - Smooth height transition with `overflow: hidden` during animation to ensure **CLS < 0.05**.
- **Interface Contract:**
  ```typescript
  export type RegionKey = "all" | "india" | "middle-east" | "philippines" | "china";

  export interface LeadIntelligencePanelProps {
    workbooks: Workbook[];
    defaultRegion?: RegionKey;
    className?: string;
  }
  ```

### 2.3 R3: CAD Interactive Drafting Rail & Sheet Viewer
- **Problem:** Displaying 8 large drawing cards in a static grid creates vertical sprawl and loses the feel of an architectural drafting board.
- **Solution:** An integrated `CadDraftingRailStage` component:
  - **Featured Blueprint Stage (Top):**
    - Dedicated drafting canvas presenting the active sheet in full detail with technical title block metadata: Sheet Number, Scale, Drawing Type, Project Package, and vector PDF/DWG download triggers.
    - Quick Stage Zoom: 1x / 1.5x / 2x toggle and pan with double-click reset.
    - "Full Inspector" trigger to open full-screen `CadInspectionModal` with pan/drag and 4x zoom.
  - **Horizontal Scrollable Blueprint Rail (Bottom):**
    - Category filter pills: `All`, `Plans`, `Elevations`, `Ceilings (RCP)`, `Joinery Details`.
    - Horizontally scrolling thumbnail strip with active sheet selection and hover previews.
    - Constrained height envelope (~540px desktop, ~420px mobile) keeping the entire CAD experience self-contained.
- **Interface Contract:**
  ```typescript
  export interface CadDraftingRailStageProps {
    drawings: CadDrawing[];
    projects: typeof CAD_PROJECTS;
    initialIndex?: number;
    className?: string;
  }
  ```

### 2.4 R4: Bespoke Thematic Atmosphere & Styling Per Discipline
- **Problem:** Homogeneous black-and-white styling flattens the distinction between mechanical CAD precision, deep archival intelligence, cinematic film, and modern automation.
- **Solution:** 5 bespoke luxury editorial palettes declared via typed theme tokens:
  1. **Technical Drafting Slate (CAD & Technical Production):**
     - Surface: `#0e141b` / `#131b24` | Hairlines: `#1e2d3d` | Grid: Blueprint crosshair grid | Accent: Cyan `#38bdf8` / `#0284c7` | Ink: `#f8fafc` & `#94a3b8`.
  2. **Research Dossier (Growth & B2B Lead Intelligence):**
     - Surface: `#fcfbf7` / `#f4f1ea` | Hairlines: `#d6d1c4` | Accent: Executive Crimson `#810100` | Ink: `#1c1917` & `#44403c`.
  3. **Obsidian Black (Video, AI Film & Editing):**
     - Surface: `#050505` / `#0c0c0c` | Hairlines: `#222222` | Accent: Amber `#f59e0b` | Ink: `#ffffff` & `#a3a3a3`.
  4. **Titanium Gallery (3D Visualisation & Image Production):**
     - Surface: `#f6f6f8` / `#ffffff` | Hairlines: `#d8d8df` | Accent: Monolith Slate `#18181b` / Monogram Red `#810100` | Ink: `#18181b` & `#52525b`.
  5. **Tech Clean (Web Development & Automation):**
     - Surface: `#ffffff` / `#f8fafc` | Hairlines: `#e2e8f0` | Accent: Terminal Emerald `#10b981` / Cobalt `#2563eb` | Ink: `#0f172a` & `#475569`.
- **Interface Contract:**
  ```typescript
  export type DisciplineSlug = "cad" | "growth" | "visualisation" | "video" | "automation" | "web";

  export interface DisciplineTheme {
    slug: DisciplineSlug;
    name: string;
    atmosphere: string;
    classes: {
      wrapper: string;
      surface: string;
      border: string;
      accentText: string;
      accentBg: string;
      textPrimary: string;
      textMuted: string;
      badge: string;
    };
  }
  ```

### 2.5 Performance, Tactile Feedback & Lightbox Enhancements (R5)
- **CLS < 0.05:** Fixed aspect-ratio containers, reserved height envelopes for dynamic panels, zero layout jump on tab or slide transitions.
- **60fps Scrolling:** CSS hardware transforms (`translate3d`), `overflow: clip` on background decorations, `contain: layout style`, passive scroll listeners.
- **Tactile Feedback:** Lightweight haptic helper (`lib/tactile.ts`) using `navigator.vibrate` (with graceful fallback for iOS/desktop) + visual micro-scaling (`active:scale-[0.98]`).
- **Accessible Lightbox & Modals:** Focus traps, keyboard navigation (`ArrowLeft`, `ArrowRight`, `Escape`), body scroll lock without scrollbar jitter.

---

## 3. Caveats & Assumptions

1. **No External Network Dependencies for Data:** All CAD images, video posters/streams, and research workbooks exist locally in `/public/media/` and `/public/media/data/`. No external API calls are required for homepage rendering.
2. **Reduced Motion Compliance:** Every carousel, timer auto-advance, and zoom animation must strictly respect `useReducedMotion()`, defaulting to static complete states.
3. **No Unvirtualized Large DOMs:** Redacted datasets are filtered and paginated (`PAGE_SIZE: 20`) to keep DOM element counts minimal.
4. **Existing ESLint Script:** `next lint` invoked directly in some environments might expect specific arguments; running `npx eslint .` or configuring ESLint in `package.json` ensures zero lint warnings.

---

## 4. Conclusion & Milestone Implementation Plan

The project architecture is in an excellent, robust baseline state (Next.js 16 App Router, TypeScript strict, Next.js fonts, clean pre-rendering). Elevating the landing experience to satisfy R1, R2, R3, R4, and R5 can proceed systematically across four clear milestones:

### Milestone Breakdown
| Milestone | Scope & Deliverables | Primary Files Involved |
|---|---|---|
| **M1: Theming & Tactile Foundations** | Declare 5 discipline theme tokens, implement `lib/discipline-themes.ts`, implement `lib/tactile.ts` micro-haptics helper. | `lib/discipline-themes.ts`, `lib/tactile.ts`, `app/globals.css` |
| **M2: R1 Capabilities Showcase & R2 Lead Intelligence** | Build `CapabilitiesCarousel` (mobile swipe snap + counter + desktop grid); build `LeadIntelligencePanel` (region tabs, dynamic metrics, <350px collapsed height, expandable dossier). | `components/home/CapabilitiesCarousel.tsx`, `components/home/LeadIntelligencePanel.tsx` |
| **M3: R3 CAD Drafting Stage & Lightbox Polish** | Build `CadDraftingRailStage` (featured stage + technical HUD + category filter + horizontal rail); integrate deep zoom inspector & tactile feedback. | `components/home/CadDraftingRailStage.tsx`, `components/work/CadInspectionModal.tsx`, `components/media/viewers.tsx` |
| **M4: Homepage Integration & Final QA** | Assemble all modules into `app/page.tsx`, apply bespoke discipline atmospheres and section dividers, run full verification (`npm run build`, `npm run typecheck`, responsive testing, CLS validation). | `app/page.tsx`, `components/home/ServiceSections.tsx`, `QA_REPORT.md` |

---

## 5. Verification Method

To independently verify this architectural survey and future implementations:

1. **Typecheck Verification:**
   ```powershell
   npm run typecheck
   ```
   *Expected:* Exits with code 0 (zero TypeScript errors).

2. **Production Build Verification:**
   ```powershell
   npm run build
   ```
   *Expected:* Compiles all 34 static/SSG routes successfully with zero compilation or packaging errors.

3. **Component & Layout Smoke Test:**
   - Inspect server HTML output to confirm valid headings, crawlable text, and accessible metadata.
   - Validate responsive breakpoints:
     - Mobile (360px - 430px): Horizontal snapping capabilities carousel with `01/06` counter; compact `<350px` Lead Intelligence panel; compact CAD drafting stage & rail.
     - Tablet (768px - 1024px): Responsive 2-column transitions.
     - Desktop (1280px - 1920px): Full 3-column capabilities grid, expanded CAD stage with dual-pane layout, deep thematic discipline styling.
