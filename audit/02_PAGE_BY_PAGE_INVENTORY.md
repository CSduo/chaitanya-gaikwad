# 02 — PAGE-BY-PAGE INVENTORY

**Audit date:** 2026-08-11 · **Source commit:** `cca00cd` · Measurements taken live at 1440×900 unless stated.

Legend — `LAYOUT TYPE` uses the actual CSS mechanism (CSS grid / flex / absolute overlay).

---

# GLOBAL CHROME (renders on every route)

## G-01 — SCROLL PROGRESS BAR
- **FUNCTION:** Reading-progress indicator
- **COMPONENT:** `src/components/ui/ScrollProgress.tsx`
- **VISUALS:** 2.5 px solid black bar, `position: fixed`, top:0, full width, `z-50`, `transform-origin: left`
- **ANIMATION:** `useScroll()` → `useSpring(stiffness 100, damping 30, restDelta 0.001)` driving `scaleX`
- **INTERACTIONS:** none — `pointer-events: none`
- **LAYOUT TYPE:** fixed overlay

## G-02 — BACKGROUND GRID
- **FUNCTION:** Decorative blueprint texture behind all content
- **COMPONENT:** `src/components/ui/BackgroundGrid.tsx`
- **GRAPHICS:** inline SVG `<pattern id="architectural-grid">` 32×32 px — one 1 px black dot at (16,16) plus four 2 px tick marks. Painted at `opacity: 0.035`
- **BACKGROUND ELEMENTS:** two blurred radial gradients — `w-96 h-96 bg-neutral-200/40` at top-left (offset −40/−40) and `bg-neutral-200/30` at right (top-1/3), both `blur-3xl`
- **DECORATIVE:** yes, entirely. `position: fixed`, `z-0`, `pointer-events: none`
- **LAYOUT TYPE:** fixed full-viewport overlay

## G-03 — HEADER / NAVIGATION
- **FUNCTION:** Primary site navigation
- **STRUCTURE:** `<nav>` `position: fixed`, top:0, full width, `z-40`, height 64 px, `bg-white/85`, `backdrop-blur-sm`, 1 px bottom border `black/10`. Inner container `max-w-5xl` (1024 px), horizontal padding 24 px
- **LOGO:** text `CG.` — Playfair Display, 20 px, weight 600, letter-spacing −0.5 px. Links to `#home`
- **LINKS (desktop, ≥768 px):** HOME · ABOUT · SERVICES · PROJECTS · STARTUP · CONTACT — 10 px, uppercase, weight 600, tracking 0.1em, 32 px gap
- **BUTTONS:** hamburger toggle, `<768 px` only, 36×36 px, `aria-label="Toggle navigation menu"`, swaps lucide `Menu` ↔ `X`
- **DROPDOWNS:** none
- **CTA:** **none in the header**
- **STICKY:** always fixed; no shrink, hide-on-scroll, or active-state highlighting
- **ANIMATIONS:** mobile panel enters `opacity 0→1, y −10→0` (motion/react)
- **LAYOUT TYPE:** fixed bar, flex space-between

---

# PAGE 1 — HOMEPAGE  (`/`, `/#home`, and every unmatched path)

Document height: 6,093 px @1440 · 10,536 px @430 · 10,931 px @360.

## SECTION 01 — HERO  (`id="home"`)
- **FUNCTION:** Identity, positioning, primary CTAs
- **LAYOUT TYPE:** vertical flex, centre-aligned, `gap 20px`; padding 48 px top (mobile) / 80 px (desktop); 1 px bottom border `black/10`

**DECORATIVE ELEMENTS** (`FloatingSakuraField`, absolute, `z-0`, pointer-events none):
| Element | Placement | Detail |
|---|---|---|
| Sakura branch (line art) | top-left, offset −40/−48 | 280×210, `opacity-15`, hidden `<640 px` |
| Sakura branch (mirrored) | top-right, offset −40/−48 | 280×210, `opacity-15`, hidden `<640 px` |
| Compass ring | top-1/4, right 8 % | 160 px, `opacity-10`, hidden `<768 px`. **Contains SVG `<text>` glyphs `N` `E` `S` `W` with no `aria-hidden` — read aloud by screen readers** |
| Corner crosshairs ×2 | top-left & top-right, inset 24 px | 40 px, `opacity-20` |
| Drifting petals ×5 | 12%/8%, 22%/right 10%, 55%/5%, 68%/right 6%, 85%/12% | 28–42 px, `opacity 0.16`; each loops `y [0,−18,0,18,0]`, `x [0,12,0,−12,0]`, rotate 5-keyframe, duration 8–12 s, delay 0–4 s, `repeat: Infinity`, `easeInOut` |

**01.1 — NAME**
- **VISIBLE HEADING (H1):** `Chaitanya Gaikwad`
- Playfair Display, weight 600, letter-spacing −0.025em. Sizes: 36 px (base) → 60 px (sm) → 72 px (md) → **96 px (lg)**
- **ANIMATION:** parent block `opacity 0→1, y −15→0`, duration 0.8 s

**01.2 — ROLE BADGE ROW**
- **BADGES (text, dot-separated):** `CAD DRAFTER` · `AI VISUAL DESIGNER` · `MARKETING & B2B SPECIALIST` · `VISUAL CONTENT CREATOR`
- Separator: `•` in `black/30`
- 9–10 px, uppercase, weight 800, tracking 0.22em
- **MOBILE VARIANT:** third badge swaps to `MARKETING & B2B` below 640 px (two DOM nodes, one hidden by CSS)

**01.3 — DIVIDER**
- 64×1 px rule, `bg-black/20`, centred

**01.4 — PORTRAIT + FLANKING SKILL COLUMNS**
- **LAYOUT TYPE:** 3-column flex, centred, gap 24→80 px
- **IMAGE:** `/portrait.jpg`, alt `Portrait of Chaitanya Gaikwad`, `referrerPolicy="no-referrer"`
  - Container: `rounded-3xl` (**24 px radius — a rounded square, not a circle**), `border black/10`, `shadow-2xl`, `bg-neutral-100`
  - Rendered 192 px (mobile) → 221 px (768) → **266 px (≥1024)**
  - **ANIMATION:** `opacity 0→1, scale 0.93→1`, 0.8 s, delay 0.2 s; hover `scale 1.03` over 700 ms
- **LEFT SKILL COLUMN — `hidden md:flex`, right-aligned:**
  | Label | Sub-label | Icon |
  |---|---|---|
  | CAD DRAFTING | AutoCAD · Architecture | inline SVG, terminal/window glyph |
  | AI VISUALS | Midjourney · Gen AI | inline SVG, sparkle glyph |
  | WEB DEV | React · Vite · Deploy | inline SVG, code-brackets glyph |
- **RIGHT SKILL COLUMN — `hidden md:flex`, left-aligned:**
  | Icon | Label | Sub-label |
  |---|---|---|
  | inline SVG, film/frame glyph | CINEMATIC VIDEO | Reels · AI Films |
  | inline SVG, bar-chart glyph | B2B RESEARCH | Lead Gen · Excel |
  | inline SVG, globe glyph | MARKETING | Strategy · Growth |
- Icon tiles: 48×48 px, `rounded-2xl`, solid black, white stroke 1.5, `shadow-lg`, hover `scale 1.05`
- Labels 11 px / weight 800 / uppercase / tracking 0.1em; sub-labels 10 px / `black/40`
- **ALL SIX SKILL BLOCKS DISAPPEAR BELOW 768 px** — 6 labels + 6 sub-labels + 6 icons are desktop-only content

**01.5 — BIO NARRATIVE**
- **HEADING (H2):** `Architectural CAD Drafter, AI Visual Designer, and B2B Marketing Specialist.` — 16 px (base) / 18 px (sm), weight 700
- **BODY COPY:** `I help architecture firms, brands, and international businesses elevate their visual presentation, market services, and grow through precision CAD work, AI-powered content creation, cinematic video production, B2B lead generation, market research, and responsive web development.` — 12–14 px, `black/65`, weight 500, max-width 768 px
- **ANIMATION:** `opacity 0→1, y 15→0`, 0.8 s, delay 0.3 s

**01.6 — FOUR-BUTTON CTA GRID**
- **LAYOUT TYPE:** CSS grid — 2 columns (base) → 4 columns (lg). Max-width 672 px, gap 12 px
- **ANIMATION:** `opacity 0→1, y 10→0`, 0.8 s, delay 0.45 s

| # | Label | Target | Type | Style |
|---|---|---|---|---|
| 1 | `VIEW PORTFOLIO` | `#projects` | ANCHOR | solid black, white text, 10 px/800/uppercase, `rounded-2xl`, `shadow-md` |
| 2 | `LET'S CONNECT` | `#contact` | ANCHOR | identical |
| 3 | `+44 7882 746212` | `https://wa.me/447882746212` | WHATSAPP, `_blank`, `noopener noreferrer` | black pill + 20 px `#25D366` circle badge + monospace number |
| 4 | `+91 70283 11226` | `https://wa.me/917028311226` | WHATSAPP, `_blank`, `noopener noreferrer` | identical |

- **NUMBERS / METRICS:** none anywhere in the hero
- **BADGES:** no availability badge (removed in commit `d9d2ee0`)
- **FORMS / TABS / ACCORDIONS / CAROUSELS:** none

## SECTION 02 — PROJECTS  (`id="projects"`, `scroll-mt-20`)
- **EYEBROW:** `WORKS & CAPABILITIES` — 10 px, uppercase, weight 700, tracking 0.2em
- **VISIBLE HEADING (H2):** `Projects` — Playfair Display 48 px
- **LAYOUT TYPE:** CSS grid — 1 column (base) → 2 columns (md). Gap 32 px. Padding 96 px vertical, 1 px bottom border
- **CARDS:** 5, each 320 px tall, `rounded-[2.5rem]`, `border black/10`, `shadow-sm`, `overflow-hidden`

**Card anatomy** (identical across all five):
- Background image, `bg-cover bg-center`, filter `brightness(0.4)`; hover `scale 1.05` over 500 ms
- `SpotlightCard` wrapper — 400 px radial-gradient `rgba(0,0,0,0.08)` follows the cursor, fades in/out over 300 ms (`src/components/ui/SpotlightCard.tsx`). **Desktop-hover only; no touch equivalent**
- Overlay content, white on the darkened image:
  - **BADGE / EYEBROW:** `CATEGORY PORTFOLIO` — 9 px, uppercase, tracking 0.2em, `white/90`
  - **H3:** category title, Playfair Display 30 px
  - **BODY:** category description, 12 px, `white/80`, `line-clamp-2`
  - **AFFORDANCE:** `EXPLORE CATEGORY` + lucide `ChevronRight` (14 px); the row translates 6 px right on hover
- **ENTRANCE ANIMATION:** `opacity 0→1, y 15→0`, `whileInView`, `viewport once`, stagger `idx × 0.05 s`

| # | H3 | Background image | Destination |
|---|---|---|---|
| 1 | Architectural & Interior CAD Drafting | `/portfolio/cad-automation/hero-plan.webp` | `#/cad-automation` |
| 2 | Cinematic Videos | `/projects/posters/sultanah-co-moon-chair-cinematic-campaign-poster.webp` | `#/projects/videos` |
| 3 | B2B Research & Excel Systems | `/projects/posters/excel-placeholder-poster.webp` | `#/projects/b2b-research` |
| 4 | 3D Renders & Visualisations | `/projects/renders/render-2.webp` | `#/projects/visualisations` |
| 5 | Websites Developed | `/sakura-bg.png` | `#/projects/websites` |

> **INTERACTION — VERIFIED DEFECT:** these five cards are `<div onClick>`, **not links**. Live DOM query confirms the `#projects` section contains **0 focusable elements** and **40 elements with `cursor: pointer`**. The entire portfolio is unreachable by keyboard, has no href for crawlers, and cannot be opened in a new tab.

## SECTION 03 — STARTUP PREVIEW  (`id="startup-preview"` — orphan anchor)
- **LAYOUT TYPE:** single panel `rounded-[3rem]`, white, `border black/5`, `shadow-sm`, padding 32→48 px; inner 12-col grid (7 / 5 split at md)
- **LOGO:** `/projects/startup/logo.webp`, alt `Ciyato Logo`, 56×56 px, `rounded-[1.1rem]`, `border black/10`
- **EYEBROW:** `MY STARTUP` — 10 px, uppercase, tracking 0.2em, weight 700
- **BADGE:** `CURRENTLY IN DEVELOPMENT` — 8 px, uppercase, `bg-amber-500/10`, `text-amber-800`, `rounded-full`, amber border. **The only non-monochrome UI accent on the homepage**
- **HEADING (H2):** `Ciyato — Android Launcher & AI Organiser` — Playfair Display 36 px
- **BODY COPY:** `Ciyato is an AI-powered Android launcher and phone organisation system designed to transform a cluttered device into a clean, searchable, intelligently organised digital space. It combines a home-screen replacement with an internal dashboard to manage apps, files, screenshots, and notes.`
- **BUTTON:** `EXPLORE CIYATO LAUNCHER` + `ChevronRight` → `#/startup`. Solid black pill, 12 px uppercase. **Measured 249×40 px on mobile — below the 44 px tap-target minimum**
- **IMAGE:** `/projects/startup/hero.webp`, alt `Ciyato Android Launcher Interface Preview`, 4:5, `rounded-[2rem]`, max-width 320 px; hover `scale 1.02` over 700 ms

## SECTION 04 — SERVICES  (`id="services"`)
- **EYEBROW:** `OFFERINGS` · **HEADING (H2):** `Services` (Playfair Display 48 px)
- **LAYOUT TYPE:** CSS grid — 1 col (base) → 2 (sm) → 3 (lg). Gap 24 px
- **CARDS:** 9, white, `rounded-[2rem]` (32 px), `border black/5` → black on hover, `shadow-sm`, padding 32 px
- **CARD ANATOMY:** 40×40 px `rounded-xl` `bg-black/5` icon tile (lucide, 20 px, stroke 1.5) → **H3** Playfair Display 24 px → 12 px body in `black/60`
- **ANIMATION:** `opacity 0→1, y 15→0`, `whileInView once`, stagger `i × 0.03 s`

| # | H3 | lucide icon |
|---|---|---|
| 1 | Architectural & Interior CAD Drafting | `FileCode` |
| 2 | AI Visual Content | `Image` |
| 3 | AI Video & Short-Form Content | `Video` |
| 4 | Digital Marketing Support | `Megaphone` |
| 5 | B2B Lead Generation | `Users` |
| 6 | Business Research | `Search` |
| 7 | Outreach & Follow-Up | `Send` |
| 8 | Website Creation & Development | `Globe` |
| 9 | Automation & Workflow Systems | `Cpu` |

- **NO PRICING, NO CTA, NO LINK on any service card.** Services are a dead end — nothing in this section is clickable.

## SECTION 05 — PROFESSIONAL EXPERIENCE  (`id="about"`)
- **LAYOUT TYPE:** 12-col grid — 5 (bio) / 7 (cards) at lg, gap 64 px

**05.1 — BIO COLUMN**
- **EYEBROW:** `MY JOURNEY` · **HEADING (H2):** `Professional Experience` — Playfair Display 48 px, tracking tight
- **BODY ¶1:** `I partner with interior design studios, manufacturers, and international business startups. My work bridges the gap between high-fidelity media campaigns (videos, renders) and operational business setups (spreadsheets, lead qualification pipelines, and complete website creation).`
- **BODY ¶2:** `By combining digital development and structured outreach with visual content production, I help businesses clarify their presence and build solid lead pipelines that convert.`

**05.2 — EXPERIENCE CARDS (6)**
- **LAYOUT TYPE:** CSS grid — 1 col → 2 (sm). Fixed height **280 px**, gap 16 px, `rounded-[2rem]`, white, `border black/5`, `shadow-sm`
- **BACKGROUND ELEMENT:** where `bgImage` is set, a `bg-cover` layer at **`opacity 0.05`**, rising to 0.08 and `scale 1.05` on hover
- **HOVER:** whole card lifts `y −3`
- **ANATOMY:** H3 company (Playfair Display 20 px, bold) → optional 9 px `black/40` descriptor → 8 px `black/40` period (right-aligned) → 9 px uppercase role → 11 px description, **`line-clamp-4`** → 1 px top border → social row

| # | Company (H3) | Descriptor | Period | Role | Background image | Social row |
|---|---|---|---|---|---|---|
| 1 | Sultanah & Co. Interiors | — | MAR 2025 – PRESENT | FREELANCE CINEMATIC CONTENT CREATOR | `/ig-thumb-3.png` | `@sultanahco` + IG gradient badge + blue verified tick |
| 2 | Red Chandelier Studio | — | MAR 2026 – PRESENT | CREATIVE VISUAL STRATEGIST & AI CONTENT PRODUCER | `/ig-thumb-2.png` | `@redchandelier.studio` + tick |
| 3 | Chinese Company | HOTEL LINEN & PREMIUM BEDDING EXPORT CLIENT | MAR 2025 – PRESENT | MARKETING, LEAD GENERATION & WEBSITE SPECIALIST | `/sakura-bg.png` | lucide `Globe` + italic `Instagram account not publicly available` + `PRIVATE` chip |
| 4 | Ereno Design Studio | — | MAR 2026 – JUN 2026 | FREELANCE AI VISUAL DESIGNER | `/ig-thumb-1.png` | `@erenodesignstudio` + tick |
| 5 | Fitout 360 Interiors | — | APR 2026 – MAY 2026 | FREELANCE AI VISUALIZER & VIDEO CREATOR | **none** | `@fitout360uae` + tick |
| 6 | Jovial Decor | — | FEB 2026 – MAY 2026 | AI DESIGN SPECIALIST | **none** | `@jovialdecoure` + tick |

- **LOGOS:** none — no client logo is used anywhere on the site
- **VERIFIED TICK:** hand-drawn SVG in Instagram blue `#0095f6`, `aria-label="Verified account"`. Applied to 5 of 6 cards
- **INSTAGRAM BADGE:** 20 px circle, `linear-gradient(135deg, #F9CE34 0%, #EE2A7B 45%, #D62976 65%, #962FBF 82%, #4F5BD5 100%)`
- **METRICS IN COPY (not styled as metrics):** card 5 — "more than nine high-fidelity commercial office renders"; card 6 — "approximately 10,000 square feet"

**05.3 — APPROACH & KEY STRENGTHS**
- **LAYOUT TYPE:** 12-col grid — 5 / 7 at md, gap 40 px, 1 px top border, both panels `rounded-2xl`, `bg-black/2`, `border black/5`, padding 24 px

*Left — APPROACH (H4, 10 px uppercase, lucide `MapPin` 16 px):*
- `Visual Storytelling` (14 px, weight 600) — `Using state-of-the-art AI generation tools to create custom product mockups, cinematic video content, and high-impact visual campaigns.`
- `Systems & Outreach` (14 px, weight 600) — `Building solid B2B lead pipelines, managing CRM trackers, automating follow-up campaigns, and executing cold outreach that converts.`

*Right — KEY STRENGTHS (H4, lucide `Sparkles` 16 px):* 2-col bullet grid, 6 px black dot markers, 12 px `black/60`:
`AI image & video generation` · `Short-form video content & reels` · `B2B lead generation & business research` · `Email & WhatsApp outreach automation` · `CRM tracking & follow-up systems` · `Website Creation & Development`

## SECTION 06 — FOOTER / CONTACT  (`<footer id="contact">`)
- **LAYOUT TYPE:** 2-col grid at md, gap 64 px, 1 px top border, padding 96 px vertical

*Left column:*
- **HEADING (H2):** `Let's connect.` — Playfair Display 48 px, `leading-none`
- **BODY:** `Open to creative direction, B2B campaigns, or website support opportunities.` — 16 px, `black/60`, max-width 384 px
- **CONTACT LINKS** (24 px text, weight 600, 8 px underline offset):
  - 32 px `#25D366` circle + `+44 7882 746212` → `https://wa.me/447882746212`
  - 32 px `#25D366` circle + `+91 70283 11226` → `https://wa.me/917028311226`
  - 32 px IG-gradient circle + `@xiyato22` (20 px, `black/70`) → `https://www.instagram.com/xiyato22`
  - Circles scale 1.05 on hover
- **NO EMAIL ADDRESS, NO TEL: LINK, NO FORM, NO ADDRESS, NO MAP**

*Right column:*
- **SOCIAL ICON ROW** (40 px gap, `black/50` → black on hover, label fades in on hover):
  - lucide `Instagram` 24 px, label `INSTAGRAM`, `aria-label="Visit on Instagram"` → `https://www.instagram.com/xiyato22`
  - custom WhatsApp SVG 24 px, label `WHATSAPP`, `aria-label="Message on WhatsApp"` → `https://wa.me/447882746212`
- **FOOTER COPY:** `PORTFOLIO 2026 • CHAITANYA GAIKWAD` (10 px, `black/50`, tracking 0.2em) and `CREATIVE & B2B STRATEGY` (10 px, `black/40`)
- **LEGAL LINKS:** none. **SITEMAP LINKS:** none. **NAV LINK GROUPS:** none. **LOCATION:** none

---

# PAGE 2 — CAD DRAFTING  (`/#/cad-automation`)

Container `max-w-5xl` (1024 px), padding-top 96 px. Document height 5,347 px @1440. **No `<h1>` on this page.**

## SECTION 01 — BACK LINK
`← BACK TO HOME` — lucide `ArrowLeft` 12 px + 10 px uppercase, tracking widest → `#home`

## SECTION 02 — INTRO + HERO GALLERY
- **LAYOUT TYPE:** 12-col grid, 6 / 6 at lg, gap 48 px, centred
- **EYEBROW:** 8 px black dot + `ARCHITECTURAL & INTERIOR CAD DRAFTING` (10 px, tracking 0.25em)
- **HEADING (H2):** `Architectural & Interior CAD Drafting` — Playfair Display 48 px → 60 px (lg)
- **LEAD:** `From design references and measured layouts to editable AutoCAD drawing packages.` (16 px, weight 500)
- **BODY:** `I combine structured design inputs, professional CAD scripting, and detailed quality checks to produce editable architectural and interior drawings faster. Plans, elevations, ceiling layouts, flooring patterns, and custom interior details are developed from supplied measurements, engineering drawings, and visual references, then delivered as editable DWG, DXF, and presentation-ready PDF files.`
- **TRUST CHIP:** lucide `ShieldCheck` 20 px + `Designed for client review. Fully editable for professional refinement.` — white card, `rounded-2xl`, `border black/10`
- **HERO GALLERY:** 2×2 grid inside a 4:3 `rounded-[2.5rem]` white panel with `shadow-xl`. Each tile `rounded-2xl`, hover `scale 1.05` (500 ms), with a `bg-black/65 backdrop-blur` category pill bottom-left
  1. `hero-plan.webp` — pill `PLAN DRAWING` — *Master Bathroom - General Layout Plan*
  2. `hero-elevation.webp` — pill `WALL ELEVATION` — *Master Bathroom - Bathtub & Window Elevation*
  3. `cigar-lounge-ceiling.webp` — pill `CEILING PLAN` — *Cigar Lounge - Reflected Ceiling Plan (RCP)*
  4. `cigar-lounge-flooring.webp` — pill `FLOORING PLAN` — *Cigar Lounge - Herringbone Flooring Plan*
- **CAPTION BAR:** `AutoCAD DWG / DXF Output (4 Sheets)` (left) · `Click any preview to launch full screen →` (right)
- **INTERACTION:** any tile opens the lightbox at that index

## SECTION 03 — FEATURED CLIENT PROJECT BANNER
- **LAYOUT TYPE:** full-width dark panel, `rounded-[2.5rem]`, `bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900`, white text, `shadow-xl`, `border white/10`
- **ANIMATION:** `BorderBeam` — a 300 px gradient beam (`#F59E0B` → `#FDE68A`, 2 px) travels the border on a 10 s infinite linear `offset-path` loop (`src/components/ui/BorderBeam.tsx`, keyframe in `index.css`)
- **BADGES:** lucide `MapPin` (amber-400) + `FEATURED CLIENT PROJECT • BAHRAIN` (monospace, tracking 0.25em, amber-400) · right chip `COMPLETE DRAWING PACKAGE` (amber-300 on `white/10`, amber border)
- **HEADING (H3):** `Bahrain Luxury Interior & Architectural CAD Package` — Playfair Display 30→36 px
- **BODY:** `This complete architectural & interior AutoCAD package was commissioned for a premier luxury interior design project in Bahrain as a comprehensive multi-sheet drawing set. The deliverable included general arrangement layout plans, wall elevations, reflected ceiling plans, herringbone flooring patterns, and custom joinery construction details delivered as editable DWG, DXF, and presentation-ready PDF sets.`
- **This is the only dark section on the entire website.**

## SECTION 04 — FEATURED PROJECTS
- **HEADER:** eyebrow `SELECTED CAD PACKAGES` · **H3** `Featured Projects` (Playfair Display 36 px) · right helper text `Click cards or thumbnails to launch full drawing gallery` (hidden `<768 px`)
- **LAYOUT TYPE:** CSS grid — 1 col → 3 (md), gap 32 px. Cards `rounded-[2.5rem]`, white, `shadow-sm`, hover border `warm-accent/30`

| Card | H4 | Preview mosaic | Count chip | Tags |
|---|---|---|---|---|
| 1 | Master Bathroom CAD Package | 2×2 of `master-bathroom-plan / -elevation / -vanity / -shower` | `+ 6 Drawings` | PLAN · 4 ELEVATIONS · FIXTURE LAYOUT · DWG + DXF |
| 2 | Cigar Lounge Ceiling & Flooring | `cigar-lounge-layout` (16:9, spans 2) + `-ceiling` + `-flooring` | `3 CAD Drawings` | RCP · COFFERED CEILING · LIGHTING LAYOUT · HERRINGBONE FLOOR |
| 3 | Custom Interior Wall Drafting | `feature-wall-overview` (16:9, spans 2) + `toilet-elevations` + `stair-wall-detail` | `4 Wall Packages` | FEATURE WALLS · CABINETRY · PANELLING · DIMENSIONS |

- **BODY COPY, card 1:** `An editable bathroom drawing package developed from a measured plan and interior-design references. The package included the general arrangement, four wall elevations, sanitary-fixture coordination, window setting-out and professional presentation sheets.`
- **BODY COPY, card 2:** `A reflected ceiling and flooring package created from a supplied furniture layout and luxury interior references. The work included a coordinated coffered-ceiling concept, lighting arrangement and editable herringbone flooring pattern.`
- **BODY COPY, card 3:** `Editable feature-wall drawings developed from interior references, confirmed overall dimensions and project-specific design instructions. The workflow supports TV units, display walls, decorative panelling, cabinetry, mirrors and under-stair wall compositions.`
- **NOTE — DATA INCONSISTENCY:** card 1's chip reads `+ 6 Drawings` while its gallery holds exactly 6 items total (4 drawings + 2 client-input references). Card 3's chip reads `4 Wall Packages` but its mosaic shows gallery indices 0, 1 and 3 — index 2 (`wash-elevations.webp`) is never shown as a thumbnail.
- **INTERACTION:** clicking the mosaic opens at index 0; clicking an individual thumbnail opens at that index (`stopPropagation`); clicking the H4 opens at index 0. **The H4 is a `<div>`-level click target with `cursor-pointer` — not a button or link.**

## SECTION 05 — CLIENT INPUT → EDITABLE CAD OUTPUT
- **LAYOUT TYPE:** white panel `rounded-[3rem]`, padding 32→48 px; inner 12-col grid 5 / 2 / 5
- **HEADER:** eyebrow `TRANSFORMATION WORKFLOW` · **H3** `Client Input to Editable CAD Output` (centred, 30→36 px)
- **LEFT PANEL — Client Input:** header `CLIENT INPUT` + chip `Reference Materials`; 2-up image grid (`master-bathroom-render-input.webp`, `master-bathroom-plan-input.webp`) at `opacity-90`; monospace bullet list:
  `• Supplied hand sketch / PDF layout` · `• Measured room dimensions & constraints` · `• Interior visual renders & material specs`
- **CENTRE:** 48 px circle, `warm-accent/10`, lucide `ArrowRight` — **rotated 90° below `lg`, 0° at `lg`+**; caption `CAD DRAFTING & SCRIPTING`
- **RIGHT PANEL — Editable CAD Output:** header `EDITABLE CAD OUTPUT` + chip `DWG / DXF / PDF`; `master-bathroom-plan.webp` with an overlay chip `Editable Geometry + Layers`; monospace tick list:
  `✓ Clean plan, elevations & dimensions` · `✓ Organised CAD layers, blocks & hatches` · `✓ Presentation PDF & editable DWG/DXF files`
- **CLOSING LINE (italic, centred):** `Reference plans, dimensions and design images are converted into structured, editable CAD documentation—not simply placed as flat images.`
- **INTERACTION:** left panel opens the before/after gallery at index 0; right panel at index 2

## SECTION 06 — 4-STEP PRODUCTION WORKFLOW
- **HEADER:** eyebrow `STRUCTURED PROCESS` · **H3** `4-Step Production Workflow` (centred, 36 px)
- **LAYOUT TYPE:** CSS grid — 1 → 2 (sm) → 4 (lg), gap 24 px. Cards `rounded-[2rem]`, white, `shadow-sm`
- **CARD ANATOMY:** monospace step label (left) + lucide icon (right) → **H4** Playfair Display 20 px → 12 px body

| Step | H4 | Icon | Body |
|---|---|---|---|
| Step 01 | Project Inputs | `FileText` | `The client supplies measurements, plans, markups, sketches, renders or reference images.` |
| Step 02 | Technical Specification | `Sliders` | `The requirements are organised into fixed dimensions, design rules, editable assumptions and drawing deliverables.` |
| Step 03 | CAD Drafting & Production | `Layers` | `Precision CAD scripting, layer setting-out, and professional drafting create plans, elevations, ceiling layouts, flooring patterns, dimensions, layers, and presentation sheets.` |
| Step 04 | Verification & Delivery | `FolderCheck` | `The package is reviewed through dimensional checks, visual comparison and file-integrity testing before delivery as editable DWG, DXF and PDF files.` |

## SECTION 07 — QUALITY CONTROL
- **LAYOUT TYPE:** `rounded-[3rem]` panel, `bg-black/5`; inner 12-col grid 7 / 5
- **EYEBROW:** `QUALITY CONTROL & VERIFICATION` · **H3** `Quality Control With Verification`
- **BODY:** `Professional drafting is only useful when the result remains measurable, editable, and reviewable. Each package is checked for confirmed dimensions, room geometry, door and fixture relationships, layer organisation, file editability, annotation clarity, and presentation quality. Any dimensions estimated from visual references remain clearly editable for final professional adjustment.`
- **BADGES (2×3 grid, white cards, lucide `CheckCircle2` in green-700):**
  `DIMENSION CHECKED` · `EDITABLE GEOMETRY` · `LAYER ORGANIZED` · `VISUALLY REVIEWED` · `PDF PRESENTATION` · `REVISION READY`

## SECTION 08 — SUPPORTED CAD DELIVERABLES
- **EYEBROW:** `CAPABILITIES` · **H3** `Supported CAD Deliverables` (centred)
- **LAYOUT TYPE:** CSS grid 1 → 2 (sm) → 3 (lg), gap 24 px. 12 white `rounded-2xl` cards; each **H4** (Playfair Display 18 px) + 12 px body

| H4 | Body |
|---|---|
| Architectural Plans | Dimensioned general arrangement and layout plans. |
| Interior Elevations | Vertical wall drawings with fixture and material setting-out. |
| Furniture & Cabinet Drawings | Custom millwork, joinery divisions and cabinet elevations. |
| TV and Feature Walls | Media units, panelling, display niches and feature walls. |
| Reflected Ceiling Plans | Coffered ceilings, coving, soffits and modular grids. |
| Flooring Patterns | Herringbone, stone layouts, tile bounds and flooring setting-out. |
| Bathroom Layouts | Sanitary fixture placement, wall tile divisions and window alignment. |
| Lighting Coordination | Downlight layouts, LED strip channels and fixture positions. |
| Dimensioned CAD Drafts | Fully dimensioned, annotated and scaled CAD geometry. |
| DWG / DXF Conversion | Renders, sketches and markups converted to editable CAD vectors. |
| Presentation PDFs | Client-ready title sheets and clean vectorized drawing sets. |
| Revision Packages | Structured CAD drawing sets ready for client review and designer refinement. |

## SECTION 09 — FILE FORMATS
- **EYEBROW:** `FLEXIBLE FILE FORMATS`
- **BADGES (monospace, black fill, white text, `rounded-lg`):** `DWG` · `DXF` · `PDF` · `PNG PREVIEW` · `CUSTOM LISP SCRIPT (INCLUDED)`
- **BODY:** `Flexible deliverables for review, editing, presentation and continued development by the client's design team.`
- **NOTE:** the container is `flex … justify-between` with only one child — the right half is permanently empty

## SECTION 10 — CALL TO ACTION
- **HEADING (H3):** `Have a plan, reference or design that needs drafting?` — Playfair Display 36→48 px, centred
- **BODY:** `Send the available layout, measurements and design references. I will review the material, identify what is confirmed or missing, and propose the appropriate editable CAD package.`
- **PRIMARY BUTTON:** `Start a CAD Project` → `https://wa.me/447882746212?text=Hello, I would like to discuss an AutoCAD drafting project. I have a plan/reference and need editable CAD drawings.` (URL-encoded), `_blank`
- **SECONDARY BUTTON:** `View Drawing Samples` — a real `<button>`; opens the Master Bathroom lightbox

## SECTION 11 — DISCLAIMER
Monospace, 11 px, `black/50`, centred, max-width 768 px:
`CAD packages are developed from the measurements and references supplied for each project. Provisional details remain editable and should be reviewed by the project's qualified designer, draftsman or technical consultant before construction.`

## SECTION 12 — LIGHTBOX OVERLAY (modal)
- **STRUCTURE:** `position: fixed`, `inset-0`, `z-[9999]`, solid black, vertical flex, `touch-action: none`, `user-select: none`
- **TOP BAR** (`bg-neutral-900/95`): category + `n / total` (monospace, tracking widest) · drawing title (Playfair Display 14 px, truncated) · `Generate` button (lucide `Sparkles`, hidden `<640 px`) → WhatsApp · `Download` button (`download` attr, filename derived from the title with non-alphanumerics → `_`, `.webp`) · zoom-reset chip showing live `%` (only when zoom ≠ 1) · zoom −/+ cluster (hidden `<640 px`) · close `X`
- **VIEWPORT:** `object-contain`, `transform: translate(panX,panY) scale(zoom)`, 0.2 s ease; `pointer-events: none` on the `<img>`
- **INTERACTIONS:** mouse drag pan (zoom > 1 only) · wheel zoom ±0.3 · pinch-zoom (2-finger) · 1-finger pan when zoomed · double-click toggles 1× ↔ 2.5× · zoom clamped **1–5×** · pan clamped by `clampPan()` so the image cannot leave frame · `←` / `→` navigate · `Esc` **or `Backspace`** closes
- **BOTTOM BAR:** horizontally scrollable thumbnail strip (56×40 → 64×44 px; active tile gets an accent border, `scale 1.05`, full opacity; inactive at `opacity-40`) · `Esc to exit` hint with a `<kbd>` chip (hidden `<768 px`) · mobile-only `Generate CAD →` link
- **MOBILE HINT:** `Pinch to zoom · Swipe to navigate` pill, shown only while zoom ≤ 1 and `<640 px`
- **A11Y:** no `role="dialog"`, no `aria-modal`, no focus trap, no scroll lock. Arrow buttons do carry `aria-label` (`Previous drawing` / `Next drawing`)

**Five galleries feed this overlay:** HERO (4) · MASTER_BATHROOM (6) · CIGAR_LOUNGE (3) · FEATURE_WALL (4) · BEFORE_AFTER (4).

---

# PAGE 3 — CINEMATIC VIDEOS  (`/#/projects/videos`)

Container `max-w-5xl`, padding 96 px vertical. Document height 2,934 px @1440.

## SECTION 01 — BACK LINK
`← BACK TO PROJECTS` → `#projects`

## SECTION 02 — PAGE HEADER
- **EYEBROW:** `CATEGORY PORTFOLIO` · **H1:** `Cinematic Videos` (Playfair Display 48 px)
- **BODY:** `Short-form films, luxury product campaigns, and retail walkthroughs created using advanced AI text-to-video systems, prompt engineering, custom storyboarding, and pacing edits.`

## SECTION 03 — VIDEO GRID
- **LAYOUT TYPE:** CSS grid — 1 → 2 (md) → 3 (lg), gap 32 px
- **CARD SHELL:** `bg-white/40`, padding 8 px, `rounded-[2.5rem]`, `border black/5`
- **MEDIA:** 9:16 `<video>` — `loop`, `muted`, `playsInline`, `preload="metadata"`, `poster` set, **no `controls`**, `object-cover`
- **CONTROL PILL** (`bg-black/45 backdrop-blur-md`, `rounded-full`, **`opacity-0` → visible on `group-hover` only**): Play/Pause (`aria-label` toggles `Play video`/`Pause video`) · Mute/Unmute (`aria-label` toggles) · Maximise (`aria-label="Play video full screen"`)
- **CARD BODY:** client (9 px uppercase `black/40`) + year (right) → **H3** Playfair Display 20 px → 12 px `fullDescription` → tag chips (9 px, `bg-black/5`, `rounded`)
- **ENTRANCE:** `opacity 0→1, y 15→0`, stagger `idx × 0.05 s`

**AUTOPLAY BEHAVIOUR:** each card runs an `IntersectionObserver` at `threshold: 0.5`. Crossing 50 % visibility sets that card as the single `activePlayingId`; a global modal-open flag suppresses playback. Only one video plays at a time. **Verified live: all 9 MP4s issue HTTP 206 range requests immediately on route load** (metadata preload), then abort.

| # | H3 | Client | Year | Tags |
|---|---|---|---|---|
| 1 | Moon Chair Cinematic Reel — Sultanah & Co. Interiors | SULTANAH & CO. INTERIORS | 2025 | Cinematic · AI Video · Product Campaign · Luxury |
| 2 | Kozena Luxury Furniture Campaign | KOZENA | 2026 | Cinematic · Luxury · Short-Form · Furniture |
| 3 | Premium Bar Red Restaurant Concept | HOSPITALITY CLIENT | 2026 | Cinematic · Hospitality · Interior · Walkthrough |
| 4 | Room Transformation Walkthrough | INTERIOR DESIGN STUDIO | 2026 | Cinematic · Interior · Walkthrough · Transformation |
| 5 | Bahrain Client Commercial Ad | MIDDLE EAST DEVELOPER | 2026 | Cinematic · Commercial Ad · Real Estate |
| 6 | The Bar Edit Cinematic | HOSPITALITY CLIENT | 2026 | *(see doc 03)* |
| 7 | Great Design Holds Attention Walkthrough | *(see doc 03)* | 2026 | |
| 8 | Bingxi Factory-to-Showroom Video | *(see doc 03)* | 2026 | |
| 9 | One Design District Showroom Reel | *(see doc 03)* | 2026 | |

## SECTION 04 — VIDEO MODAL (overlay)
`fixed inset-0 z-50`, `bg-black/90 backdrop-blur-sm`, click-backdrop-to-close, `X` top-right. Inner `<video autoPlay controls>` in a `rounded-[2rem]` shell, max 85 vh / 90 vw (4xl at md). No `role="dialog"`, no focus trap, no `Esc` handler, no scroll lock.

---

# PAGE 4 — B2B RESEARCH & EXCEL SYSTEMS  (`/#/projects/b2b-research`)

Document height 1,964 px @1440.

## SECTION 01 — BACK LINK
`← BACK TO PROJECTS` → `#projects`

## SECTION 02 — PAGE HEADER
- **EYEBROW:** `CATEGORY PORTFOLIO` · **H1:** `B2B Research & Excel Systems`
- **BODY:** `Clean, structured lead generation pipelines, buyer shortlists, and competitor market intelligence. Original phone numbers and emails have been safely redacted to safeguard confidentiality.`

## SECTION 03 — WORKBOOK CARD GRID
- **LAYOUT TYPE:** CSS grid — 1 → 2 (md), gap 32 px. White cards, `rounded-[2.5rem]`, `border black/5` → black on hover, padding 32 px
- **CARD ANATOMY:** 9 px uppercase subcategory (left) + green sheet-count chip (`bg-green-800/10`, `text-green-800`) → **H3** Playfair Display 24 px → 12 px `shortDescription` → tag chips → 1 px divider → 2-col button row
- **BUTTONS:** `VIEW DATA` (lucide `Search` 11 px; solid black pill) → `#/projects/b2b-research/<slug>` · `DOWNLOAD` (lucide `Download` 11 px; `bg-black/5` pill) → the `.xlsx`, with the `download` attribute
- **ENTRANCE:** `opacity 0→1, y 15→0`, stagger `idx × 0.05 s`
- **DEFECT:** the sheet-count chip is unpluralised — three cards render **`1 SHEETS`**

| # | H3 | Chip | shortDescription |
|---|---|---|---|
| 1 | Premium Fabric Import Buyer Shortlist | 7 SHEETS | A cleaned shortlist of premium fabric importers in India segmenting targets by cities. |
| 2 | Electronics Middle East Selected Leads | 1 SHEETS | Market mapping and B2B lead generation shortlist for electronics shops in target UAE regions. |
| 3 | Middle East Interiors & Fitout WhatsApp Leads | 1 SHEETS | Expanded B2B lead generation database mapping interior and fit-out firms in the GCC. |
| 4 | Automotive Showroom Lead Intelligence | 2 SHEETS | Dealership showroom targets and EV/Chinese brand distributors ranked for design-build outreach. |
| 5 | China Interior Markets & Hubs | 4 SHEETS | Wholesale interior decor markets and furniture hubs mapped across Tier 1, 2, and 3 cities. |
| 6 | Laminate Events & Building Expos Calendar | 1 SHEETS | Events calendar mapping architecture, construction, and building material exhibitions in India. |
| 7 | Philippines VIP Approachable Lead Intelligence | 4 SHEETS | Upper-echelon VIP public contact routes mapped for premium architectural outreach. |
| 8 | Saudi Riyadh & Jeddah Lead Intelligence | 6 SHEETS | Developer, luxury hotel projects, and pre-opening opportunities mapped for Saudi market entry. |

All eight share the subcategory eyebrow `LEAD INTELLIGENCE, MARKET MAPPING & OUTREACH WORKFLOWS` and the poster `/projects/posters/excel-placeholder-poster.webp` — **which is never rendered on this page.**

---

# PAGE 5 — SPREADSHEET VIEWER  (`/#/projects/b2b-research/<slug>`)

Container `max-w-[1600px]` — **the widest container on the site**.

## SECTION 01 — BACK LINK
`← BACK TO B2B RESEARCH` → `#/projects/b2b-research`

## SECTION 02 — WORKBOOK HEADER
- **LAYOUT TYPE:** 12-col grid, 2 / 1 at lg, items-end
- **EYEBROW:** `INTERACTIVE SPREADSHEET PREVIEWS` · **H1:** workbook title (Playfair Display 36 px) · 12 px `fullDescription`
- **PRIVACY CARD:** `PRIVACY STATUS` (8 px, `black/40`) / `Phone & Email Redacted` (10 px, green-700) + lucide `Shield` 16 px green
- **BUTTON:** `Download Portfolio Copy` (lucide `Download` 14 px), solid black pill → the `.xlsx`

## SECTION 03 — SHEET TABS + SEARCH
- **TABS:** one `<button>` per sheet — active = solid black / white text; inactive = white, `border black/5`, `text-black/60`. Selecting a tab resets the search box
- **SEARCH:** `<input type="text" placeholder="Search rows...">`, `rounded-full`, `shadow-inner`, lucide `Search` 12 px icon absolutely positioned. **No `<label>`, no `aria-label`, no `name`** (verified live)
- **FILTER LOGIC:** case-insensitive substring across every cell of the active sheet; a row matches if any cell contains the query

## SECTION 04 — DATA TABLE
- Row 0 of the sheet becomes `<thead>`; empty headers fall back to `Column {i+1}`
- Header cells: `bg-black/5`, 10 px uppercase, tracking widest, `sticky top-0 z-10`, `whitespace-nowrap`
- Body cells: 12 px `black/80`, `whitespace-nowrap`; `null` renders as a `black/20` dash
- Scroll container: `overflow: auto`, `max-height: 500px`
- Row hover: `bg-black/2`
- **EMPTY STATE:** `No matching records found` (centred, 12 px, uppercase)
- **LOADING STATE:** 24 px spinning ring (`animate-spin`) + `Parsing Worksheet...`
- **NO-DATA STATE:** `No sheets available`
- **INVALID SLUG STATE:** `Workbook not found` + `Back to list`
- **NOT VIRTUALISED.** Verified: the Saudi workbook renders 55 rows × 18 columns = **990 `<td>` nodes** in one table. Largest workbook (`electronics-middle-east-selected-leads`) is 250 rows × 27 columns = **6,777 cells** from a 312 KB fetch.

## SECTION 05 — ROW COUNTER FOOTER
`Active Sheet: {name}` (left) · `Showing {filtered} of {total} rows` (right) — 10 px uppercase, tracking widest, `black/40`

**Example — `saudi-riyadh-jeddah-55-lead-intelligence`, sheet `MASTER LEADS`:** 55 rows; columns `RANK · PRIORITY · FINAL SCORE /100 · COMPANY / LEAD · SEGMENT · CITY FOCUS · WEBSITE · PUBLIC CONTACT / ROUTE · DECISION-MAKER ROUTE · NAMED PERSON PUBLICLY SEEN · ACTIVE PROJECT / EVIDENCE · SERVICE FIT · WHY THIS LEAD MATTERS · SUGGESTED OUTREACH ANGLE · BEST CHANNEL · VERIFICATION STATUS · SOURCE URLS · NOTES`. Sheet tabs: `MASTER LEADS · ONGOING PROJECTS · DECISION MAKER ROUTES · OUTREACH ANGLES · SOURCE LOG · SEND GUIDANCE`.

---

# PAGE 6 — 3D RENDERS & VISUALISATIONS  (`/#/projects/visualisations`)

Document height 6,382 px @1440.

## SECTION 01 — BACK LINK
`← BACK TO PROJECTS` → `#projects`

## SECTION 02 — PAGE HEADER
- **EYEBROW:** `CATEGORY PORTFOLIO` · **H1:** `3D Renders & Visualisations`
- **BODY:** `High-fidelity 3D spatial concept renders and visualisations exploring texture matching, lighting design, and creative composition. Click on any panel to launch the lightbox.`

## SECTION 03 — 3D RENDERS
- **H2:** `3D Renders` · right chip `6 Concepts` (`bg-black/10`, `rounded-full`), 1 px bottom border
- **LAYOUT TYPE:** CSS grid — 1 → 2 (sm) → 3 (md), gap 24 px
- **TILE:** `bg-white/40`, padding 8 px, `rounded-[2rem]`; 4:3 image `rounded-[1.8rem]`, `loading="lazy"`, `filter brightness(0.95)`, hover `scale 1.03` (500 ms) plus a `bg-black/10` wash
- **CAPTION:** 8 px uppercase subcategory (`3D Renders`) → **H3** Playfair Display 18 px
- **TITLES:** `Spatial Study Concept 01` … `06`

## SECTION 04 — VISUALISATIONS
- **H2:** `Visualisations` · right chip `43 Concepts`
- Identical tile treatment; subcategory reads `Visualisations`
- **TITLES:** `Visualisation Study Concept 01` … `43`

> **CONTENT NOTE:** all 49 titles are auto-numbered placeholders. Alt text equals the title. No client, brief, tool, material, or context is given for any of the 49 images.

## SECTION 05 — RENDERS LIGHTBOX (overlay)
`fixed inset-0 z-50`, `bg-black/95 backdrop-blur-sm`, column flex.
- **HEADER:** `RENDER {n} OF 49` (10 px, `white/50`) + `X`
- **BODY:** prev/next circular buttons (`bg-white/5`, `border white/10`) around an `object-contain` image capped at 70 vh
- **FOOTER:** **H3** title (Playfair Display 24 px) + 12 px `fullDescription` in `white/60`
- **KEYBOARD:** `←` / `→` cycle (modulo), `Esc` closes
- **A11Y (verified live):** no `role="dialog"`, no `aria-modal`, no focus management (`document.activeElement` stays `BODY`), body scroll not locked, and **all three control buttons are icon-only with no `aria-label`**

---

# PAGE 7 — WEBSITES DEVELOPED  (`/#/projects/websites`)

Document height 1,056 px @1440 — **the shortest page on the site**.

## SECTION 01 — BACK LINK
`← BACK TO PROJECTS` → `#projects`

## SECTION 02 — PAGE HEADER
- **EYEBROW:** `CATEGORY PORTFOLIO` · **H1:** `Websites Developed`
- **BODY:** `Complete responsive websites built from layout wireframing, content planning, and visual styling to front-end development, mobile optimisation, and live deployment.`

## SECTION 03 — WEBSITE CARDS
- **LAYOUT TYPE:** CSS grid — 1 → 2 (md) → 3 (lg), gap 32 px. White, `rounded-[2.5rem]`, padding 32 px
- **CARD ANATOMY:** 9 px uppercase role → **H3** Playfair Display 30 px → 12 px `fullDescription` → tag chips → 1 px divider → full-width button
- **IMAGES: NONE.** `thumbnail`/`poster` are defined in `src/data/projects.ts` for all three but never rendered — **verified live: this page contains 0 `<img>` elements**

| # | H3 | Role eyebrow | Button | Target |
|---|---|---|---|---|
| 1 | Personal Portfolio Website | DESIGNER & FRONT-END WEBSITE DEVELOPER | `VISIT LIVE WEBSITE` + `ExternalLink` | `https://chaitanya-gaikwad.vercel.app/` |
| 2 | Export Brand Website | FRONT-END WEBSITE DEVELOPER & DIGITAL PRESENTATION SPECIALIST | `VISIT LIVE WEBSITE` | `https://xiyora.vercel.app` |
| 3 | Anvikshiki Journal | FULL-STACK DEVELOPER & TECHNICAL ADMINISTRATOR | `VISIT LIVE WEBSITE` | `https://anvikshikijournal.in/` |

- **DEAD CODE PATH:** an alternate branch renders an `Available for Acquisition` status chip and a WhatsApp button reading `Inquire Website Acquisition` (pre-filled: *"Hi Chaitanya, I am inquiring about acquiring the Export Brand Website listed on your portfolio."*). It requires `status === "Available for Acquisition"`; card 2 carries `status: "Completed"`, so **this never renders**, even though its body copy still says the build "remains available for acquisition, licensing, or adaptation."
- **SELF-REFERENCE:** card 1 links to the site the visitor is already on, via the `.vercel.app` host rather than `xiyato.uk`

---

# PAGE 8 — CIYATO (STARTUP)  (`/#/startup`)

Container `max-w-5xl`, `space-y-24`. Document height 3,573 px @1440.

## SECTION 01 — BACK LINK
`← BACK TO HOME` → `#home`

## SECTION 02 — HERO
- **LAYOUT TYPE:** 12-col grid, 7 / 5 at md
- **LOGO:** `/projects/startup/logo.webp`, 64×64 px, `rounded-[1.25rem]`
- **EYEBROW:** `MY STARTUP` · **BADGE:** `CURRENTLY IN DEVELOPMENT` (amber pill)
- **H1:** `Ciyato` — Playfair Display 48 px → **72 px (lg)**, `leading-none`
- **LEAD (18 px, weight 600):** `An AI-Powered Android Launcher & Phone Organiser`
- **BODY:** `A cleaner and more intelligent way to organise apps, files, screenshots, notes, and everyday phone content from one connected Android experience.`
- **IMAGE:** `/projects/startup/hero.webp`, alt `Ciyato Android Interface Preview`, 4:5, `rounded-[2.5rem]`, `shadow-xl`, max-width 384 px

## SECTION 03 — VISION / DEFINITION
2-col grid at md, 1 px top border.
- **H2** `The Vision` — `Modern phones contain hundreds of apps, files, screenshots, notifications, and pieces of information, but the systems used to organise them have changed very little. Ciyato is being created to make Android devices feel cleaner, easier to navigate, and more personally organised without taking control away from the user.`
- **H2** `What Ciyato Is` — `Ciyato is both a real Android launcher and an internal phone-organisation application. The launcher reorganises the home screen and app library, while the internal application provides access to search, files, shared content, settings, privacy controls, and future AI-assisted organisation tools.`

## SECTION 04 — KEY FEATURES & INTENT
- **EYEBROW:** `CAPABILITIES` · **H2:** `Key Features & Intent` (Playfair Display 36 px)
- **LAYOUT TYPE:** CSS grid — 1 → 2 (md) → 3 (lg), gap 24 px. White `rounded-[2rem]` cards, hover border black

| H3 | Body |
|---|---|
| Smart App Organisation | Organises real installed applications into useful categories while allowing users to edit, move, hide, remove, and personalise their layouts. |
| Unified Search | Helps users find apps, files, screenshots, notes, and phone content from one searchable experience. |
| Customisable Home Screen | Supports flexible pages, movable applications and categories, removable widgets, and personalised layouts. |
| Files and Content Organisation | Provides a dedicated space for browsing and managing files and other device content. |
| Privacy and User Control | Designed around local organisation, clear permissions, transparent behaviour, and the ability to return to the previous Android launcher. |
| AI-Assisted Phone Management | Future intelligent tools are planned to help users organise content, simplify repetitive actions, and manage their phone more efficiently. |

## SECTION 05 — APPLICATION INTERFACE GALLERY
- **EYEBROW:** `SCREENSHOTS` · **H2:** `Application Interface Gallery`
- **HELPER:** `Preview shots illustrating app library categorisation, layouts, and search configurations. Click to expand.`
- **LAYOUT TYPE:** CSS grid — 2 → 3 (sm) → 4 (md) → 5 (lg), gap 16 px
- **TILE:** white, `rounded-2xl`, padding 10 px, hover `y −4` + border black; 9:16 thumbnail, `loading="lazy"`, hover `scale 1.05`; caption 9 px uppercase `black/40`, `line-clamp-1`
- **CAPTIONS:** `Ciyato Home Experience` · `Smart App Library` · `Application Organisation` · `Unified Search Panel` · `Files and Storage` · `Personalisation Controls` · `Settings & Preferences` · `Privacy & User Controls` · `Product Development Preview`

## SECTION 06 — BUILDING CIYATO
12-col grid, 6 / 6, 1 px top border.
- **H2** `Building Ciyato` — `Ciyato has progressed through multiple interface and product-development versions and is currently being refined into a functional Android application. The focus is on real installed-app support, reliable launcher behaviour, practical organisation tools, privacy, performance, and a premium but simple user experience.`
- **MILESTONE PANEL** (white, `rounded-[2rem]`, eyebrow `DEVELOPMENT MILESTONES`, 6 px black dot per row):
  `Product concept established` · `Interface system in development` · `Android launcher functionality in progress` · `Organisation and search features being refined` · `Preparing for future testing and launch`
- **No dates, no percentages, no progress bar** — the list is unstyled by state, so completed and pending items look identical

## SECTION 07 — CTA
- White `rounded-[3rem]` panel, centred, max-width 768 px
- **H2:** `Interested in Ciyato?` (Playfair Display 36 px)
- **BODY:** `For product discussions, early collaboration, development opportunities, partnerships, or enquiries relating to Ciyato, contact me directly on WhatsApp.`
- **BUTTONS (2):** `WhatsApp +44 7882 746212` and `WhatsApp +91 70283 11226` — green-tinted pills (`bg-[#25D366]/10`, `text-green-800`, green border), 24 px `#25D366` circle badge, monospace underlined number. Both pre-fill: *"Hello, I am interested in Ciyato and would like to learn more about the startup."*

## SECTION 08 — STARTUP LIGHTBOX (overlay)
`fixed inset-0 z-50`, `bg-black/95 backdrop-blur-md`. Header `SCREENSHOT {n} OF 9` + `X`; prev/next circular buttons **with `aria-label` (`Previous screenshot` / `Next screenshot`) — unlike the renders lightbox**; footer **H3** caption + static subtitle `Ciyato Android Interface Preview`. Keyboard `←` / `→` / `Esc`. Loads the full-resolution `screen-N.webp`, not the thumbnail.
