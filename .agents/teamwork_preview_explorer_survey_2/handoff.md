# Comprehensive UI, Interactivity, Styling, and Asset Survey Report

**Project**: XIYÀTO Homepage Redesign & Editorial Elevation  
**Subagent**: Explorer Survey 2 (`teamwork_preview_explorer_survey_2`)  
**Workspace**: `C:\Users\ADMIN\.gemini\antigravity\scratch\chaitanya-gaikwad`  
**Date**: 2026-08-27  

---

## 1. Observation

### 1.1 Technical Stack & Dependency Landscape
- **Framework & Runtime** (`package.json:13-27`):
  - Next.js: `16.3.0` (Turbopack enabled)
  - React / React-DOM: `19.2.8` (React 19 Server Components + Client Components architecture)
  - Styling: Tailwind CSS `^4.0.0` with `@tailwindcss/postcss` (`postcss.config.mjs`)
  - TypeScript: `^5.7.3`
  - ESLint: `^9.18.0` with `eslint-config-next: 16.3.0`
- **External Animation / UI Libraries**:
  - `framer-motion` is **NOT** installed.
  - `lucide-react` is **NOT** installed.
  - Icons and brand graphics are directly rendered as performant, accessible SVG primitives (`components/brand/decorations.tsx`, `components/brand/Divider.tsx`, `components/media/viewers.tsx`).
- **Production Build Status**:
  - `npm run build` completed with **Exit Code 0** across all 34 static routes (`34/34 SSG`).

---

### 1.2 Core Data Structures & Asset Catalog Audit

#### A. Services & Capabilities (`lib/services.ts:44-565`)
Six primary discipline services:
1. `cad-technical-production` (Order: 1, Motif: "Deliver", Name: "CAD & Technical Production")
2. `growth-marketing-b2b` (Order: 2, Motif: "Grow", Name: "Growth, Marketing & B2B")
3. `visualisation-image-production` (Order: 3, Motif: "Visualise", Name: "3D Visualisation & Image Production")
4. `video-ai-film-editing` (Order: 4, Motif: "Film", Name: "Video, AI Film & Editing")
5. `website-design-development` (Order: 5, Motif: "Build", Name: "Website Design & Development")
6. `automation-workflow-systems` (Order: 6, Motif: "Automate", Name: "Automation & Marketing Systems")

#### B. CAD Blueprint & Technical Drawing Assets (`lib/portfolio.ts:285-684`, `public/media/cad/`)
- **7 Distinct Projects** (`CAD_PROJECTS`):
  1. `master-bathroom` (GA Floor Plan, 4 detailed wall elevations, site sketch & 3D render inputs)
  2. `cigar-lounge` (Seating layout, RCP coffered ceiling, herringbone parquet flooring)
  3. `master-bedroom` (GA room layout, headboard/wardrobe elevation, window vanity elevation, RCP electrical)
  4. `toilet-wash` (Powder room layout, fluted toilet feature wall, wash feature wall)
  5. `stair-wall` (Joinery construction detail with panel reveals and hidden fixings)
  6. `villa-concept` (Site master plan, ground floor layout, first floor layout)
  7. `villa-measurement` (Area measurement & boundary survey)
- **Asset Files Verified in `/public/media/cad/`**:
  - High-res drawings: `mb-plan.png` (7629×5389), `cl-layout.png` (7629×5389), `mbr-plan.png` (8344×5894), `sw-joinery-detail.png` (5064×6388), `tw-plan.png` (4764×3274), `va-ground-floor.png` (2977×2105), `vm-area-boundary.png` (1980×1810).
  - Downloadable vector sets in `/public/media/cad/downloads/`: `cigar-lounge-set.pdf`, `cigar-lounge-set.dwg`, `master-bathroom-set.pdf`, `master-bathroom-set.dwg`, `master-bedroom-set.pdf`, `master-bedroom-set.dwg`, `stair-wall-detail.pdf`, `toilet-wash-set.pdf`, `villa-concept-set.pdf`, `villa03-area-measurement.pdf`.

#### C. Growth & B2B Lead Intelligence Datasets (`lib/portfolio.ts:164-279`, `public/media/data/`)
- **8 Workbooks (17 Structured Sheets total)**:
  1. `cleaned-premium-fabric-import-buyer-shortlist` (India — 4 sheets: Top 30 Strategic Targets, Mumbai, Pune, Bangalore)
  2. `automotive-showroom-lead-intelligence` (Middle East / KSA / Philippines — 2 sheets: Lead Intelligence, Outreach Strategy)
  3. `philippines-vip-approachable-lead-intelligence` (Philippines — 4 sheets: VIP Lead Intelligence, Outreach Routes, Source Log, Use Notes)
  4. `china-interior-markets-100plus` (China — 4 sheets: MASTER, Tier_1, Tier_2, Tier_3)
  5. `middle-east-interiors-fitout-whatsapp-expanded` (GCC — 1 sheet: Expanded ME Leads)
  6. `electronics-middle-east-selected-leads` (UAE — 1 sheet: selected_leads)
  7. `laminate-events-in-india` (India — 1 sheet: Events Calendar)
  8. `saudi-riyadh-jeddah-55-lead-intelligence` (KSA — 1 sheet)
- **Live In-DOM Sample Records** (`components/home/scenes.tsx:80-201`):
  - 10 curated verified lead records (`Al-Futtaim BYD KSA`, `SAMACO Porsche`, `SAMACO Audi`, `SAMACO Supercar Group`, `Mohamed Yousuf Naghi Motors`, `Wallan Trading Genesis`) with 10 fields (Rank, Priority, Score, Company, Brands, Lead Type, City/Region, Decision-Maker Role, Best Contact Route, Verification Status).
- **Downloadable Excel Files**: All 8 redacted workbooks available under `/public/media/downloads/*-redacted.xlsx`.

#### D. 3D Visualisation Assets (`lib/visuals.ts:38-408`, `public/media/visual/`)
- **41 Reviewed High-Resolution Visual Items** across 6 categories:
  - `interiors` (18 items: e.g. `render-1.webp`, `vis-2.webp`, `vis-20.webp`, `vis-21.webp`, `vis-24.webp`, `vis-41.webp`, `vis-42.webp`)
  - `product-furniture` (11 items: e.g. `vis-9.webp`, `vis-11.webp`, `vis-25.webp`, `vis-30.webp`, `vis-34.webp`, `vis-37.webp`)
  - `retail-showroom` (5 items: e.g. `vis-5.webp`, `vis-6.webp`, `vis-8.webp`, `vis-27.webp`, `vis-28.webp`)
  - `workspace-office` (4 items: e.g. `vis-19.webp`, `vis-36.webp`, `vis-39.webp`, `vis-40.webp`)
  - `hospitality` (2 items: e.g. `vis-43.webp`)
  - `exterior-architectural` (1 item: e.g. `vis-3.webp`)

#### E. Video & AI Film Assets (`lib/portfolio.ts:32-158`, `public/media/video/`, `public/media/posters/`)
- **8 Film Projects** with WebP posters and MP4 streams:
  1. `sultanah-co-moon-chair-cinematic-campaign` (1080×1350 portrait)
  2. `kozena-luxury-furniture-campaign` (1080×1920 9:16 vertical)
  3. `bingxi-factory-video` (832×464 16:9 landscape)
  4. `the-bar-edit-cinematic` (1080×1350)
  5. `premium-bar-red-restaurant-concept` (1080×1920)
  6. `bahrain-client-commercial-ad` (1080×1350)
  7. `room-transformation-interior-walkthrough` (1080×1920)
  8. `great-design-holds-attention-walkthrough` (720×1280)

---

### 1.3 Current Homepage & UI Component Architecture

- **`app/page.tsx` Structure**:
  - `HeroCapabilities` (`components/home/HeroCapabilities.tsx`): 6-scene switcher (`CadScene`, `DataScene`, `VisualisationScene`, `VideoScene`, `WebScene`, `AutomationScene`).
  - `#capabilities` Grid (`app/page.tsx:188-232`): Simple responsive 1/2/3-column static grid of 6 service cards.
  - Service Chapters (`components/home/ServiceSections.tsx`): `CadSection`, `GrowthSection`, `VisualisationSection`, `VideoSection`, `WebsiteSection`, `AutomationSection` separated by `SectionDivider`.
  - Engagement Model (`app/page.tsx:249-265`): 3-column process cards.
  - Locations Panel (`components/home/LocationsPanel.tsx:1-119`): Dual-hub UK & India presence.
  - Project CTA (`components/site/ProjectCTA.tsx`): Bottom inquiry strip.

- **Design System & Styling (`app/globals.css:1-58`)**:
  - Theme ground: `--color-paper` (`#ffffff`), `--color-paper-deep` (`#f7f7f7`).
  - Ink scale: `--color-ink` (`#0a0a0a`), `--color-ink-soft` (`#3a3a3a`), `--color-ink-muted` (`#5a5a5a`), `--color-ink-faint` (`#737373`).
  - Rules: `--color-rule` (`#e5e5e5`), `--color-rule-strong` (`#cfcfcf`).
  - Accent: `--color-accent` (`#810100`), `--color-accent-wash` (`#fdf3f3`).
  - Typography: IBM Plex Sans (`var(--font-sans)`), Newsreader (`var(--font-serif)`), IBM Plex Mono (`var(--font-mono)`).

---

## 2. Logic Chain & Technical Requirements Analysis

### 2.1 R1: Mobile Horizontal Service Slideshow & Navigation
* **Observation**: In `app/page.tsx:188-232`, the `#capabilities` section currently renders standard vertical card stacking on mobile (`grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3`).
* **Technical Requirement**:
  1. **Mobile Experience (< 640px)**:
     - Horizontal swipeable carousel with CSS scroll-snap (`snap-x snap-mandatory overflow-x-auto`).
     - Touch momentum scrolling (`-webkit-overflow-scrolling: touch`) with hidden scrollbars (`scrollbar-width: none`).
     - Card width sized at `84vw` with `max-w-[320px]` and `snap-start`, leaving adjacent card preview peeking.
     - Live indicator counter: `01 / 06` updated in real time as the user swipes through cards.
     - Step pills or interactive dot triggers with prev/next tap buttons.
  2. **Desktop Experience (>= 640px / >= 1024px)**:
     - Clean, responsive 3-column editorial grid (`grid sm:grid-cols-2 lg:grid-cols-3 gap-4`).
     - Micro-interactions: Subtle card hover elevation, arrow translation, motif badges.
  3. **Zero Layout Shift Implementation**:
     - Card heights defined using flex stretching and clamp utilities so slide transitions do not cause vertical reflow.
     - State tracking using native scroll listener wrapped in `requestAnimationFrame` with passive event listener.

---

### 2.2 R2: Compact Expandable Lead Intelligence Panel (Growth & B2B)
* **Observation**: `GrowthSection` in `components/home/ServiceSections.tsx:157-210` currently has 3 static metric tiles and 4 links to `/work/research/[slug]`, without direct data interrogation on the homepage.
* **Technical Requirement**:
  1. **Region Selector Tabs**:
     - India (`cleaned-premium-fabric-import-buyer-shortlist`, `laminate-events-in-india`)
     - Middle East / KSA / UAE (`automotive-showroom-lead-intelligence`, `saudi-riyadh-jeddah-55`, `gcc-fitout`)
     - Philippines (`philippines-vip-approachable-lead-intelligence`)
     - China (`china-interior-markets-100plus`)
  2. **Instant Metric Counters & Telemetry**:
     - Total verified records (e.g. 114 Showrooms, 100+ Wholesale Markets, 30 Fabric Importers).
     - Qualification checks pass rate (100% verified route, public source logged, decision-maker mapped).
     - Multi-sheet breakdown indicator.
  3. **Compact Collapsed Stage (< 350px height)**:
     - Header bar with active dataset status, pulse dot, and search/filter bar.
     - Compact scrollable table view (5 featured rows) with sticky headers.
     - Expand/inspect trigger button ("Expand Lead Intelligence Dossier").
  4. **Interactive Sheet Preview Drawer / Modal**:
     - Expandable full-width drawer/modal overlay allowing full sheet inspection directly on the homepage.
     - Multi-sheet switching tabs, real-time row filtering, column view, and instant XLSX download link.
  5. **Data Hydration**:
     - Fast client-cached datasets avoiding heavy network waterfall requests.

---

### 2.3 R3: CAD Interactive Drafting Rail & Blueprint Viewer
* **Observation**: `CadSection` in `components/home/ServiceSections.tsx:105-151` uses a basic 4-column thumbnail grid that opens a generic lightbox. Meanwhile, `CadInspectionModal.tsx` on the work page has full pan/zoom/drag capabilities.
* **Technical Requirement**:
  1. **Horizontal Blueprint Drafting Rail**:
     - Scrollable rail of produced drawing sheets (`General Arrangement Plan`, `Wall Elevations`, `Reflected Ceiling Plan`, `Flooring Setting-Out`, `Joinery Construction Details`).
     - Visual indicator for sheet format, resolution (e.g. `8344 × 5894 px`), and revision stage.
  2. **Sticky / Featured Drawing Inspection Stage**:
     - Prominent drawing stage embedded in the CAD section with direct interactive controls.
     - Clicking any thumbnail in the rail smoothly swaps the active blueprint in the viewport without page reload or vertical jumping.
  3. **Interactive Inspection Tools**:
     - Zoom In / Zoom Out / 100% Reset buttons.
     - Pan/drag viewport support with cursor feedback (`cursor-grab`, `cursor-grabbing`).
     - Vector PDF and editable DWG package download badges.
     - Fullscreen inspector modal expansion trigger.

---

### 2.4 R4: Bespoke Discipline Theme Token System & Luxury Editorial Styling
* **Observation**: The design system currently applies global achromatic variables (`--color-paper`, `--color-ink`). There are no discipline-specific atmospheric palettes or shader gradients.
* **Technical Requirement**:
  Implement a structured theme token system with 5 distinctive luxury editorial registers:

| Discipline | Palette Theme | Surface Ground | Primary Text / Accent | Atmospheric Gradient / Texture |
|---|---|---|---|---|
| **01 CAD & Technical** | *Technical Drafting Slate* | `#0b0f17` (Deep Blueprint Slate) | `#f1f5f9` (Chalk White) / `#38bdf8` (Cyan Rule) | Technical cyan grid line overlay (`draft-grid`), blue-grey rule borders (`#1e293b`) |
| **02 Growth & B2B** | *Research Dossier* | `#faf8f5` (Archival Bone/Paper) | `#1c1917` (Stone Ink) / `#b45309` (Amber Seal) | Subtle warm dossier grain, emerald verified pills (`#059669`), tabular borders |
| **03 3D Visualisation** | *Titanium Gallery* | `#09090b` (Deep Zinc) / `#18181b` | `#fafafa` (Titanium Light) / `#e4e4e7` (Platinum) | Soft ambient spotlight radial gradient, gallery frame drop-shadows |
| **04 Video & AI Film** | *Obsidian Black* | `#030303` (Obsidian Jet) | `#ffffff` / `#e11d48` (Cinema Crimson Accent) | Anamorphic glow overlay, 16:9 / 9:16 frame guides, film reel metadata |
| **05 Web & Automation** | *Tech Clean & Systems* | `#0a0e14` (Cyber Slate) / `#f8fafc` | `#0f172a` (Deep Ink) / `#10b981` (System Green) | Monospace telemetry metrics, pulsing live indicators, wireframe grid accents |

---

### 2.5 CLS & Performance Optimization Matrix (CLS < 0.05, 60fps)

1. **Cumulative Layout Shift (CLS) Prevention**:
   - **Aspect Ratio Locking**: Every media frame must use strict CSS aspect ratios (`aspect-[4/3]`, `aspect-[16/10]`, `aspect-video`, `aspect-[9/16]`) so space is reserved before image/video metadata loads.
   - **Fixed Skeleton Containers**: Tab switches in Growth and CAD must render inside fixed/min-height containers to eliminate height bounce when toggling between tabs.
   - **Font Loading**: `next/font` with `font-display: swap` and fallback metric adjustments is already implemented in `app/layout.tsx`.
   - **Scroll-snap Boundaries**: Horizontal rails must use `overflow-x-auto` with `overscroll-contain` so horizontal swipes do not trigger vertical page movement.

2. **Animation & Touch Performance**:
   - Hardware-accelerated CSS properties only: `transform` (`translate3d`), `opacity`, and CSS grid/flex transitions.
   - `prefers-reduced-motion` compliance: All automated transitions immediately deactivate, displaying final states cleanly for users with motion sensitivity.
   - Zero heavyweight runtime JS animation libraries (avoiding React 19 hydration issues with external legacy animation packages).

---

## 3. Caveats

1. **Zero External UI Dependencies**: The project deliberately avoids `framer-motion` and `lucide-react` to prevent peer dependency conflicts with React 19.2.8 and Next.js 16.3.0, and to keep JavaScript bundle overhead near zero. All new interactive components should utilize clean React 19 hooks and inline SVG icons.
2. **Server vs. Client Boundaries**: `app/page.tsx` is a Server Component. Interactive carousel/tabs/rails must remain modular Client Components (`"use client"`) imported into `app/page.tsx` to maintain full SSR SEO crawlability for headings and links.
3. **Data Redaction Compliance**: All published lead intelligence data is strictly redacted (contact emails/phones masked as per portfolio guidelines in `public/media/data/`). No private PII should ever be exposed.
4. **Mobile Touch Target Dimensions**: All touch controls (swipe buttons, tabs, drawer toggles, zoom icons) must maintain a minimum touch target size of 44×44px to satisfy WCAG AA accessibility standards.

---

## 4. Conclusion

1. **Asset & Data Preparedness**: The codebase contains all required production assets (25 CAD drawings with PDFs/DWGs, 8 multi-sheet research workbooks, 41 photorealistic 3D visuals, and 8 cinematic video reels).
2. **Readiness for Redesign**:
   - **R1 (Mobile Carousel)**: Ready for implementation with native CSS scroll-snapping and reactive counter.
   - **R2 (Lead Intelligence Panel)**: Ready for implementation with region tabs, instant telemetry, and expandable dossier modal.
   - **R3 (CAD Drafting Rail)**: Ready for implementation with horizontal blueprint rail and embedded sticky inspection stage.
   - **R4 (Discipline Themes)**: Ready for implementation using CSS theme tokens (Slate, Dossier, Titanium, Obsidian, Tech Clean).
3. **Build Health**: The build system is fully validated (`npm run build` succeeds with 0 errors).

---

## 5. Verification Method

To independently verify these findings:

1. **Build & Typecheck**:
   ```powershell
   npm run build
   npm run typecheck
   npm run lint
   ```
2. **Inspect Core Data & Components**:
   - View `lib/services.ts` and `lib/portfolio.ts` to confirm dataset and asset definitions.
   - View `components/home/ServiceSections.tsx` and `app/page.tsx` to observe current section layouts.
   - View `components/work/CadInspectionModal.tsx` and `components/media/DataViewer.tsx` for existing interaction primitives.
   - View `app/globals.css` for theme token setup.
3. **Validate Asset Integrity**:
   - Check `public/media/cad/`, `public/media/data/`, `public/media/visual/`, and `public/media/video/`.
4. **Invalidation Conditions**:
   - If any CAD or data asset path returns 404, or if `npm run build` fails with type or bundling errors.
