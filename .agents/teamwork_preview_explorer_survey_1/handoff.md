# Frontend Survey & Architectural Handoff Report

## 1. Observation

### 1.1 Architecture, Stack & Configuration
- **Framework:** Next.js `16.3.0` (Turbopack, App Router, React Server Components + selective `"use client"` interactive leaves)
- **Runtime & UI:** React `19.2.8`, React-DOM `19.2.8`
- **Styling:** Tailwind CSS `v4.0.0` (`@tailwindcss/postcss`) configured via CSS variables and `@theme` block in `app/globals.css:17-58`
- **Typography:** Next.js `next/font/google` (`IBM_Plex_Sans`, `IBM_Plex_Mono`, `Newsreader`) registered in `app/layout.tsx:11-30` with CSS variables `--font-plex-sans`, `--font-plex-mono`, `--font-newsreader`
- **TypeScript:** TypeScript `5.7.3` (`tsconfig.json`), `npm run typecheck` (`tsc --noEmit`) passes cleanly with 0 errors
- **Asset Directory:** `/public/media` containing structured subdirectories:
  - `/public/media/cad/` (25 produced drawing sheets + 7 client reference inputs, DWGs, vector PDFs)
  - `/public/media/data/` (8 JSON research workbooks: India fabric import, Saudi automotive showrooms, Philippines VIP routes, China interior hubs, GCC fit-out, UAE electronics, etc.)
  - `/public/media/video/` (8 video MP4s + posters in `/public/media/posters/`)
  - `/public/media/visual/` (41 curated visualisations across interiors, product, retail, office, hospitality)
  - `/public/media/downloads/` (Redacted `.xlsx` workbooks and vector `.pdf` sets)

---

### 1.2 Existing Homepage Component & Section Structure
Direct inspection of `app/page.tsx` revealed the current 6-stage layout:
1. **Hero Section (`app/page.tsx:66-183`):**
   - Left column (`lg:col-span-5`): Wordmark, H1 (`HOME_COPY.h1`), standfirst, Primary CTA button + "View our work" anchor link (`#capabilities`), Direct WhatsApp contact cards (UK `+44 7882 746212` & India `+91 70283 11226`).
   - Right column (`lg:col-span-7`): `HeroCapabilities` (`components/home/HeroCapabilities.tsx`) containing interactive viewports (`CadScene`, `DataScene`, `VisualisationScene`, `VideoScene`, `WebScene`, `AutomationScene`) with 6s auto-advance and 6 selector buttons.
2. **Capabilities Overview (`app/page.tsx:188-232`):**
   - Header: "We provide six services given below."
   - Service Grid: 6 cards mapped from `SERVICES` in `lib/services.ts`. Currently rendered as `grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3` (standard vertical stack on mobile).
3. **Dedicated Service Chapters (`app/page.tsx:234-245`):**
   - `CadSection` (`components/home/ServiceSections.tsx:105-151`)
   - `GrowthSection` (`components/home/ServiceSections.tsx:157-210`)
   - `VisualisationSection` (`components/home/ServiceSections.tsx:216-282`)
   - `VideoSection` (`components/home/ServiceSections.tsx:288-314`)
   - `WebsiteSection` (`components/home/ServiceSections.tsx:374-421`)
   - `AutomationSection` (`components/home/ServiceSections.tsx:338-369`)
4. **Engagement Model (`app/page.tsx:249-265`):** 3-stage numbered cards (01 Project, 02 Ongoing Support, 03 Advisory).
5. **Dual-Hub UK / India Presence (`app/page.tsx:270-274`):** `LocationsPanel` (`components/home/LocationsPanel.tsx`) with real-time bridge line and London/Mumbai operational focus.
6. **Project CTA & Crawlable Index (`app/page.tsx:279-296`):** `ProjectCTA` (`components/site/ProjectCTA.tsx`) and hidden crawlable link list.

---

### 1.3 Detailed Analysis by Redesign Requirement

#### Requirement R1: Mobile Horizontal Service Slideshow & Navigation
- **Observed Deficiency:** In `app/page.tsx:198-231`, the `#capabilities` section renders cards in a vertical `grid-cols-1` on mobile. On smaller viewports (360px–430px), 6 stacked cards create vertical scrolling fatigue before visitors encounter the rich interactive chapters.
- **Observed Assets & Data:** `SERVICES` in `lib/services.ts` provides order `01`–`06`, shortName, motif ("Deliver", "Grow", "Visualise", "Film", "Build", "Automate"), summary, and target anchor `service-${slug}`.
- **Architectural Need:**
  - On mobile (`< lg`), convert `#capabilities` into a smooth, horizontal swipeable slideshow with CSS scroll snapping (`snap-x snap-mandatory`), touch swipe momentum, active slide index indicator (`01 / 06`), and tactile navigation buttons (prev/next pills).
  - On desktop (`lg+`), present an elevated, high-contrast 3-column / 6-card editorial grid with subtle corner framing, registration marks, and direct anchor links to the chapters below.

#### Requirement R2: Compact Expandable Lead Intelligence Panel (Growth & B2B)
- **Observed Deficiency:**
  - On the homepage (`components/home/ServiceSections.tsx:157-210`), `GrowthSection` only displays 3 static stat boxes and 4 workbook links, forcing users to navigate away to `/work/research/[slug]` to preview any data.
  - In `components/home/scenes.tsx:51-347`, `DataScene` displays only Saudi automotive data in the hero.
- **Observed Data Assets:** `/public/media/data/` contains rich structured JSON datasets:
  - **India:** `cleaned-premium-fabric-import-buyer-shortlist.json` (4 sheets: Top 30 Strategic Targets, Mumbai, Pune, Bangalore; 200+ records) and `laminate-events-in-india.json`
  - **Middle East:** `automotive-showroom-lead-intelligence.json` (114 records, 22 fields), `saudi-riyadh-jeddah-55-lead-intelligence.json`, `middle-east-interiors-fitout-whatsapp-expanded.json`
  - **Philippines:** `philippines-vip-approachable-lead-intelligence.json` (100 VIP routes, 4 sheets: VIP Lead Intelligence, Outreach Routes, Source Log, Use Notes)
  - **China:** `china-interior-markets-100plus.json` (100+ interior/furniture wholesale hubs across Tier 1, Tier 2, Tier 3)
- **Architectural Need:**
  - Build a bespoke **Compact Expandable Lead Intelligence Panel** inside `GrowthSection`:
    - **Region Switcher Tabs:** India, Middle East, Philippines, China.
    - **Instant Metric Counters:** Live counter badges per region (Records Mapped, Verified Route %, Fields Captured, Research Scope).
    - **Dense Compact Table (<350px collapsed):** Sticky table header, ranked rows, score/priority badges (`A++`, `A+`, `VIP`), horizontal scroll cue.
    - **Expandable Drawer / Modal:** An interactive full-screen/slide-over drawer with search filtering, multi-sheet selection, and download links, keeping the homepage initial footprint under 350px while offering deep data exploration.

#### Requirement R3: CAD Interactive Drafting Rail & Sheet Viewer
- **Observed Deficiency:**
  - On the homepage (`components/home/ServiceSections.tsx:105-151`), `CadSection` displays a static 4-column `ImageGrid` with 8 thumbnails that open a generic single-zoom lightbox.
  - Meanwhile, an advanced pan/zoom modal (`components/work/CadInspectionModal.tsx:1-355`) already exists with multi-level scaling (100%–400%), mouse wheel zoom, click-drag panning, touch panning, keyboard shortcuts (`+`, `-`, `0`, `ESC`, arrows), and vector PDF download buttons, but it is currently only linked on `/services/cad-technical-production`.
- **Observed Assets:** `CAD_DRAWINGS` in `lib/portfolio.ts:371-684` contains 25 Ultra-HD drawings (GA floor plans, wall elevations 1–4, reflected ceiling plans, herringbone flooring plans, joinery details) across 7 project packages.
- **Architectural Need:**
  - Upgrade `CadSection` into an **Interactive Drafting Stage & Horizontal Blueprint Rail**:
    - **Featured Stage:** Prominent drawing viewport displaying the selected CAD sheet with blueprint grid, technical resolution tag (`8344 × 5894 px`), sheet identifier, and an "Inspect & Pan/Zoom" CTA.
    - **Horizontal Scrollable Blueprint Rail:** A horizontal thumbnail strip of produced drawing sheets with category filters (Floor Plan, Elevation, RCP, Flooring, Joinery Detail).
    - **Zero Vertical Sprawl:** A compact, fixed-height footprint (`<500px`) where clicking rail thumbnails instantly swaps the active featured stage without page layout shifts.
    - **Direct Inspection Modal Integration:** Clicking the stage opens `CadInspectionModal` for deep pan/zoom examination.

#### Requirement R4: Bespoke Thematic Atmosphere & Styling Per Discipline
- **Observed Deficiency:** The current site applies a uniform monochrome palette (`#ffffff`, `#f7f7f7`, `#0a0a0a`) across all sections, missing the opportunity to evoke the distinct craft and editorial luxury of each specific discipline.
- **Architectural Need:** Define 5 bespoke thematic atmospheric styling tokens/classes:
  1. **CAD & Technical Production: "Technical Drafting Slate"**
     - Dark slate/blueprint ground (`#0c1017` / `#131924`), crisp blueprint grid hairlines (`#1e293b`), drafting cyan/ice-white accents (`#38bdf8` / `#e0f2fe`), mono coordinate stamps (`GRID: GA-01 · 8344×5894`).
  2. **Growth, Marketing & B2B: "Research Dossier"**
     - Institutional ledger paper ground (`#fafaf9` / `#f5f5f4`), ruled ledger hairlines (`#e7e5e4`), verification emerald (`#15803d`) and intelligence amber (`#b45309`) badges, dense matrix typography.
  3. **Video, AI Film & Editing: "Obsidian Black"**
     - Pure obsidian black ground (`#050505` / `#09090b`), cinematic letterbox framing, subtle crimson/ruby edge glow (`#810100`), glassmorphic frosted controls (`backdrop-blur-md bg-white/10`).
  4. **3D Visualisation: "Titanium Gallery"**
     - Pure titanium white/grey museum canvas (`#ffffff` / `#fafafa`), razor-thin titanium frames (`#e4e4e7`), pure photographic framing without distracting background elements.
  5. **Web & Automation: "Tech Clean"**
     - Precision terminal dark/light duality (`#090d16` / `#f8fafc`), glowing status beacons (`animate-pulse bg-emerald-500`), telemetry metrics cards, live server/deployment pills.

---

## 2. Logic Chain

1. **Premise:** The homepage is the flagship entry point for high-value architecture, interior, and luxury brand clients.
2. **From Premise to R1 (Mobile Slideshow):**
   - On mobile viewports, stacking 6 full service cards vertically pushes critical proof chapters 1200px+ down the viewport.
   - Therefore, introducing a horizontal swipeable slideshow with CSS snapping (`snap-x snap-mandatory`), a `01/06` counter, and tactile navigation preserves mobile density while allowing immediate discovery of all six disciplines.
   - On desktop, retaining an elevated 3-column grid guarantees clarity, accessibility, and direct anchor links.
3. **From Premise to R2 (Growth Lead Intelligence Panel):**
   - Growth & B2B services are evaluated based on data rigor, provenance, and verification quality.
   - Rather than forcing visitors to navigate away to inspect individual workbooks, embedding a multi-region interactive panel (India, Middle East, Philippines, China) with instant live metric counters and a `<350px` collapsed table on the homepage immediately demonstrates research depth.
   - An expandable full-sheet drawer provides complete workbook exploration without bloating vertical page height.
4. **From Premise to R3 (CAD Drafting Rail):**
   - Architecture and interior clients judge CAD outsourcing by drawing coordination, linework precision, and dimensional clarity.
   - A static grid of small thumbnails fails to showcase the 8K resolution of the drawings.
   - Implementing a sticky featured drawing stage with a horizontal blueprint thumbnail rail and seamless one-click launch of `CadInspectionModal` delivers an authentic CAD drafting room experience with zero vertical page sprawl.
5. **From Premise to R4 (Bespoke Thematic Atmosphere):**
   - Standard monochrome styling makes different capabilities feel repetitive.
   - Applying distinct, luxury editorial atmospheres (Drafting Slate, Research Dossier, Obsidian Black, Titanium Gallery, Tech Clean) reinforces domain expertise and sensory richness while maintaining overarching brand harmony via shared typography and red monogram accents.
6. **From Premise to Performance & Quality:**
   - Strict CSS aspect ratios prevent CLS (`CLS < 0.05`).
   - Using CSS hardware-accelerated transforms/opacity and respecting `prefers-reduced-motion` ensures smooth 60fps scrolling and full accessibility.
   - Pure React/Tailwind implementation without heavy runtime dependencies ensures build stability (`0 errors`).

---

## 3. Caveats

- **Redacted Data Safety:** All published dataset JSON files in `/public/media/data/` are redacted portfolio copies (contact details removed). All UI representations must maintain the redaction notice.
- **Large Bitmap Dimensions:** CAD drawings have native dimensions up to `8344 × 5894 px`. `next/image` with responsive `sizes` must be used to ensure fast thumbnail loading while supplying full-resolution images inside the zoom modal.
- **Background Build Lock:** In the current environment, a background node process (`PID 8120`/`5852`) was active during initial verification; single-process `npm run build` or `npm run typecheck` runs cleanly when not locked.

---

## 4. Conclusion & Architectural Recommendation

The codebase is well-structured, statically typed, and performant. Implementing the redesign requires:
1. **Component `components/home/CapabilitiesSlideshow.tsx`:**
   - Mobile: Touch-enabled swipeable horizontal carousel with snap alignment, `01/06` slide counter, progress indicator, and active navigation pills.
   - Desktop: Responsive 3-column editorial grid with hover lift and anchor jumps.
2. **Component `components/home/LeadIntelligencePanel.tsx`:**
   - Multi-region tab switcher (India, Middle East, Philippines, China).
   - Dynamic metric counters (records mapped, fields verified, qualification rate).
   - Collapsed table (`<350px` height) with sticky headers and scroll cue.
   - Expandable interactive drawer/modal with search, filtering, and pagination.
3. **Component `components/home/CadDraftingRail.tsx`:**
   - Featured drawing stage with technical metadata and zoom trigger.
   - Horizontal blueprint thumbnail rail with category filters (Floor Plan, Elevation, RCP, Flooring, Detail).
   - Integration with `components/work/CadInspectionModal.tsx` for multi-level zoom (100%–400%) and pan.
4. **Thematic Atmosphere Classes in `app/globals.css`:**
   - Add scoped CSS utility classes: `.theme-slate`, `.theme-dossier`, `.theme-obsidian`, `.theme-titanium`, `.theme-tech`.
5. **Homepage Integration in `app/page.tsx`:**
   - Replace the static `#capabilities` grid with `CapabilitiesSlideshow`.
   - Update `CadSection` to use `CadDraftingRail`.
   - Update `GrowthSection` to use `LeadIntelligencePanel`.
   - Wrap each service chapter with its respective bespoke theme container.

---

## 5. Verification Method

To verify the implementation independently:

1. **Type & Build Verification:**
   ```bash
   npm run typecheck
   npm run build
   ```
   *Expected result: 0 TypeScript errors, 0 build errors.*

2. **Mobile Carousel (R1) Verification:**
   - View viewport width `360px`–`430px`.
   - Verify `#capabilities` scrolls horizontally with snap points.
   - Verify `01/06` counter updates on swipe and navigation click.
   - Verify desktop (`1024px+`) displays the 3-column grid.

3. **Lead Intelligence Panel (R2) Verification:**
   - Verify tabs for India, Middle East, Philippines, China switch active data and instant metric counters.
   - Verify collapsed table height is `< 350px`.
   - Click "Expand Full Sheet / Intelligence Drawer" and verify modal opens with live search and pagination.

4. **CAD Drafting Rail (R3) Verification:**
   - Select thumbnails in the blueprint rail; verify the featured stage updates instantly without vertical jump.
   - Click the featured stage; verify `CadInspectionModal` opens with working mouse wheel zoom, pan drag, and vector PDF download.

5. **Discipline Atmospheres (R4) Verification:**
   - Inspect background tones, borders, and typography accents across CAD (Slate), Growth (Dossier), Video (Obsidian), Visualisation (Titanium), and Automation (Tech Clean).
