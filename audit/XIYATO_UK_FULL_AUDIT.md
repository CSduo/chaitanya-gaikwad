# XIYATO.UK — COMPLETE FORENSIC AUDIT

**Audit date:** 2026-08-11 · **Live host:** https://xiyato.uk · **Source commit:** `cca00cd` (branch `main`)

Combined from the 11 individual audit documents. Contents unchanged.

---

## TABLE OF CONTENTS

1. Current Site Map
2. Page-by-Page Inventory
3. Complete Copy Inventory
4. Media & Asset Inventory
5. Navigation & Link Audit
6. Responsive Audit
7. Design System Inventory
8. Technical Audit
9. Contact & Form Audit
10. Current Information Architecture (incl. duplication map)
11. Unknown / Unverified / Inaccessible Items



---

# 01 — CURRENT SITE MAP

**Audit date:** 2026-08-11
**Live host audited:** https://xiyato.uk
**Source commit audited:** `cca00cd` (branch `main`)
**Method:** live HTTP inspection (curl), live DOM inspection (headless Chromium), full source read

---

## 1. HOST / ENVIRONMENT FACTS

| Check | Result |
|---|---|
| `https://xiyato.uk` loads | YES — HTTP 200, 1,496 bytes HTML |
| `https://www.xiyato.uk` loads | YES — HTTP 200, **identical ETag `2ea3fc1f818a841cd71959cb89650c1f`** |
| `www` → apex redirect | **NO REDIRECT.** Both hosts serve 200 independently |
| `http://xiyato.uk` → HTTPS | YES — HTTP 308 Permanent Redirect → `https://xiyato.uk/` |
| `http://www.xiyato.uk` → HTTPS | YES — HTTP 308 → `https://www.xiyato.uk/` (stays on www) |
| `https://chaitanya-gaikwad.vercel.app` | LIVE — HTTP 200, identical content, not redirected |
| Redirects from older domains | **NONE FOUND.** No legacy domain is known to this audit — see doc 11 |
| TLS | Valid (`ssl_verify_result=0`), HSTS `max-age=63072000` |
| Server | Vercel (`Server: Vercel`, edge `bom1`) |
| Rendering | **100% client-side.** Served HTML `<body>` contains only `<div id="root"></div>` |

**Consequence:** three hostnames serve byte-identical content with no canonical tag and no redirect between them (`xiyato.uk`, `www.xiyato.uk`, `chaitanya-gaikwad.vercel.app`).

---

## 2. CRAWLER-FACING FILES

| File | Status |
|---|---|
| `/robots.txt` | **DOES NOT EXIST.** Returns HTTP 200 + SPA HTML shell (`Content-Type: text/html`) |
| `/sitemap.xml` | **DOES NOT EXIST.** Returns HTTP 200 + SPA HTML shell |
| `/manifest.json`, `/site.webmanifest` | **DO NOT EXIST.** Return HTTP 200 + SPA HTML shell |
| `/favicon.jpg` | Exists — 173,040 bytes JPEG |

Cause: `vercel.json` contains a single unconditional rewrite:
```json
{ "rewrites": [ { "source": "/(.*)", "destination": "/index.html" } ] }
```
Every unmatched path returns the SPA shell with **HTTP 200**.

---

## 3. ROUTING SYSTEM

- **Type:** client-side hash routing, hand-rolled. No router library.
- **Implementation:** `src/App.tsx:1719` — an ordered `String.includes()` ladder over one `currentHash` state value.
- **Normalisation:** `syncRoute()` (`src/App.tsx:344`) collapses `##…` → `#…`, and **falls back to `window.location.pathname` when the hash is empty**.
- **Therefore every page has two working URL forms:** a hash form and a clean-path form. Both verified live.

Match order (first match wins — order is load-bearing):

| # | Substring tested | Renders |
|---|---|---|
| 1 | `startup` | Startup page |
| 2 | `cad-automation` | CAD page |
| 3 | `b2b-research/` + non-empty slug | Spreadsheet viewer |
| 4 | `b2b-research` | B2B category list |
| 5 | `projects/videos` | Videos category |
| 6 | `projects/visualisations` | Visualisations category |
| 7 | `projects/websites` | Websites category |
| 8 | *(fallback)* | Homepage |

---

## 4. ROUTE REGISTER

> Every route shares one identical `<title>` and one identical `<meta name="description">`, injected statically in `index.html`. There is no per-route metadata anywhere in the project.

**Global values, identical on all routes:**
- META TITLE: `Chaitanya Gaikwad — Portfolio & Capabilities`
- META DESCRIPTION: `Portfolio of Chaitanya Gaikwad: AI Visual Designer, Visual Content Creator, B2B Research Specialist, and Architectural CAD Drafting.`
- CANONICAL URL: **NONE — no `<link rel="canonical">` exists on any route**

---

### ROUTE 01 — Homepage
- **ROUTE:** `/` · `/#home` · **and every unmatched path** (e.g. `/about`, `/projects`, `/nonsense-xyz`)
- **PAGE NAME:** Homepage
- **PAGE TITLE (visible H1):** Chaitanya Gaikwad
- **META TITLE / DESCRIPTION / CANONICAL:** global values above / none
- **NAVIGATION LABEL:** `Home` (also logo `CG.`)
- **PARENT NAVIGATION ITEM:** — (root)
- **INDEXABLE:** Technically yes (no robots directives) — but content is JS-only; raw HTML contains zero page copy
- **DESKTOP ACCESS:** Yes · **MOBILE ACCESS:** Yes

### ROUTE 02 — Architectural & Interior CAD Drafting
- **ROUTE:** `/#/cad-automation` · `/cad-automation`
- **PAGE NAME:** CAD Automation / CAD Drafting standalone page
- **PAGE TITLE (visible):** "Architectural & Interior CAD Drafting" — **rendered as `<h2>`; this page has NO `<h1>`**
- **NAVIGATION LABEL:** none in header. Reached only via the Projects grid card on the homepage
- **PARENT NAVIGATION ITEM:** Projects (section anchor)
- **INDEXABLE:** yes/no as above · **DESKTOP:** Yes · **MOBILE:** Yes

### ROUTE 03 — Cinematic Videos
- **ROUTE:** `/#/projects/videos` · `/projects/videos`
- **PAGE TITLE (H1):** Cinematic Videos
- **NAVIGATION LABEL:** none in header — homepage Projects card only
- **PARENT:** Projects · **DESKTOP:** Yes · **MOBILE:** Yes

### ROUTE 04 — B2B Research & Excel Systems (category list)
- **ROUTE:** `/#/projects/b2b-research` · `/projects/b2b-research`
- **PAGE TITLE (H1):** B2B Research & Excel Systems
- **NAVIGATION LABEL:** none in header — homepage Projects card only
- **PARENT:** Projects · **DESKTOP:** Yes · **MOBILE:** Yes

### ROUTE 05 — Spreadsheet Viewer (dynamic, ×8)
- **ROUTE PATTERN:** `/#/projects/b2b-research/<slug>` · `/projects/b2b-research/<slug>`
- **PAGE TITLE (H1):** the workbook title
- **NAVIGATION LABEL:** "VIEW DATA" button on route 04
- **PARENT:** B2B Research & Excel Systems
- **DESKTOP:** Yes · **MOBILE:** Yes (table is 10,093 px wide inside a 326 px scroller — see doc 06)

The 8 live slugs:

| # | Slug | H1 | Sheets |
|---|---|---|---|
| 1 | `cleaned-premium-fabric-import-buyer-shortlist` | Premium Fabric Import Buyer Shortlist | 7 |
| 2 | `electronics-middle-east-selected-leads` | Electronics Middle East Selected Leads | 1 |
| 3 | `middle-east-interiors-fitout-whatsapp-expanded` | Middle East Interiors & Fitout WhatsApp Leads | 1 |
| 4 | `automotive-showroom-lead-intelligence` | Automotive Showroom Lead Intelligence | 2 |
| 5 | `china-interior-markets-100plus` | China Interior Markets & Hubs | 4 |
| 6 | `laminate-events-in-india` | Laminate Events & Building Expos Calendar | 1 |
| 7 | `philippines-vip-approachable-lead-intelligence` | Philippines VIP Approachable Lead Intelligence | 4 |
| 8 | `saudi-riyadh-jeddah-55-lead-intelligence` | Saudi Riyadh & Jeddah Lead Intelligence | 6 |

**Invalid slug state (verified):** `/#/projects/b2b-research/does-not-exist` renders "Workbook not found" + "BACK TO LIST", and logs a console error (see doc 08).

### ROUTE 06 — 3D Renders & Visualisations
- **ROUTE:** `/#/projects/visualisations` · `/projects/visualisations`
- **PAGE TITLE (H1):** 3D Renders & Visualisations
- **NAVIGATION LABEL:** none in header — homepage Projects card only
- **PARENT:** Projects · **DESKTOP:** Yes · **MOBILE:** Yes

### ROUTE 07 — Websites Developed
- **ROUTE:** `/#/projects/websites` · `/projects/websites`
- **PAGE TITLE (H1):** Websites Developed
- **NAVIGATION LABEL:** none in header — homepage Projects card only
- **PARENT:** Projects · **DESKTOP:** Yes · **MOBILE:** Yes

### ROUTE 08 — Ciyato (Startup)
- **ROUTE:** `/#/startup` · `/startup` · **and any URL containing the string `startup`**
- **PAGE TITLE (H1):** Ciyato
- **NAVIGATION LABEL:** `Startup` (header nav, desktop + mobile)
- **PARENT:** — (top-level nav item)
- **DESKTOP:** Yes · **MOBILE:** Yes

---

## 5. ANCHOR-ONLY SECTIONS (not routes)

Live on the homepage only. Nav links to these resolve to the homepage plus a scroll.

| Anchor | Section | In header nav? |
|---|---|---|
| `#home` | Hero | Yes — "Home" + logo |
| `#projects` | Projects category grid | Yes — "Projects" |
| `#startup-preview` | Ciyato preview band | **NO — orphan anchor, nothing links to it** |
| `#services` | Services grid | Yes — "Services" |
| `#about` | Professional Experience | Yes — "About" |
| `#contact` | Footer / contact | Yes — "Contact" |

---

## 6. MODAL / OVERLAY CONTENT (no URL, not linkable, not indexable)

| Overlay | Trigger | Route |
|---|---|---|
| CAD drawing lightbox (pan/zoom/pinch, thumbnail strip, download, WhatsApp CTA) | Any CAD image or "VIEW DRAWING SAMPLES" | 02 |
| Video modal player (autoplay + native controls) | Video card or maximise icon | 03 |
| Renders lightbox (49-item, arrow/keyboard nav) | Any render tile | 06 |
| Startup screenshot lightbox (9-item) | Any Ciyato thumbnail | 08 |
| Mobile navigation dropdown | Hamburger, < 768 px | all |

**None of these have a URL.** Their content cannot be linked, shared, or indexed.

---

## 7. DOWNLOADABLE FILES (8, all reachable)

All served from `/projects/downloads/`, all with the HTML `download` attribute, all linked from route 04.

`automotive-showroom-lead-intelligence-redacted.xlsx` (44 KB) · `china-interior-markets-100plus-redacted.xlsx` (16 KB) · `cleaned-premium-fabric-import-buyer-shortlist-redacted.xlsx` (62 KB) · `electronics-middle-east-selected-leads-redacted.xlsx` (42 KB) · `laminate-events-in-india-redacted.xlsx` (8 KB) · `middle-east-interiors-fitout-whatsapp-expanded-redacted.xlsx` (10 KB) · `philippines-vip-approachable-lead-intelligence-redacted.xlsx` (27 KB) · `saudi-riyadh-jeddah-55-lead-intelligence-redacted.xlsx` (30 KB)

**No PDF exists anywhere in the project. No CV / résumé file exists.**

---

## 8. PAGE TYPES THAT DO **NOT** EXIST

Verified absent from both the live site and the source:

- Dedicated **About** page (About is a homepage anchor only)
- Dedicated **Contact** page (Contact is a homepage anchor only)
- Dedicated **Services** page (Services is a homepage anchor only)
- **Individual project detail pages** — no per-project route exists for any video, render, or website; only category grids and modals
- **Resume / CV page or download**
- **404 page** — every unknown path returns HTTP 200 + the homepage
- **Legal pages** — no privacy policy, no terms, no cookie notice, no imprint
- **Utility pages** — no search, no blog, no testimonials page, no thank-you page
- **Redirect routes** — none configured beyond Vercel's automatic HTTP→HTTPS 308

---

## 9. ROUTES / DATA PRESENT IN SOURCE BUT NOT REACHABLE VIA NORMAL NAVIGATION

| Item | Location | Status |
|---|---|---|
| `#startup-preview` anchor | `src/App.tsx:1360` | Section renders, but no link targets the anchor |
| "Available for Acquisition" CTA branch | `src/App.tsx:849,877-885` | **Dead code.** Fires only when `web.status === "Available for Acquisition"`; no project carries that value (Export Brand Website is `"Completed"`), so the WhatsApp acquisition CTA never renders |
| `thumbnail` / `poster` for all 3 websites | `src/data/projects.ts:56,84,112` | Defined but never read — route 07 renders **0 images** |
| `getAllProjects()` | `src/data/projects.ts:158` | Exported, never imported |
| `CiyatoScreenshot.id` field | `src/data/projects.ts:184` | Only used as React key |
| `AvailabilityBadge` component | `src/components/ui/AvailabilityBadge.tsx` | Complete component, imported nowhere |
| `SakuraBlossom`, `BlueprintAccent` | `src/components/ui/decorations/` | Exported via barrel, rendered nowhere |
| `useCursorProximity`, `useParallaxMotion`, `useParallaxY`, `useParallaxRotation` | `src/hooks/` | Complete hooks, imported nowhere |
| `scripts/verify_m2_hooks.ts` | `scripts/` | Test harness for the two unused hooks; not wired to any npm script |
| `spreadsheetPreview` field | `src/data/projects.json` | Present on all 8 workbooks; the viewer builds its fetch URL from `slug` instead and never reads this field |

---

## 10. SITE MAP — CONDENSED TREE

```
xiyato.uk  (= www.xiyato.uk = chaitanya-gaikwad.vercel.app, no canonical, no redirect)
│
├── /  (+ every unmatched path — soft 404)
│   ├── #home             Hero
│   ├── #projects         Projects category grid  ── 5 cards (div onClick, not links)
│   ├── #startup-preview  Ciyato band             ── orphan anchor
│   ├── #services         Services grid           ── 9 cards
│   ├── #about            Professional Experience ── 6 cards + Approach + Key Strengths
│   └── #contact          Footer
│
├── /#/cad-automation                      (no H1)  → lightbox overlay
├── /#/projects/videos                              → video modal overlay
├── /#/projects/visualisations                      → renders lightbox overlay
├── /#/projects/websites
├── /#/projects/b2b-research
│   └── /#/projects/b2b-research/<slug>     × 8     + 8 .xlsx downloads
└── /#/startup                                      → screenshot lightbox overlay
```

**Totals:** 8 distinct rendered page templates · 15 addressable URLs (7 static + 8 dynamic) · each with a duplicate clean-path form · 5 modal overlays with no URL · 8 downloadable files · 0 forms.


---

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


---

# 03 — COMPLETE COPY INVENTORY

**Audit date:** 2026-08-11 · Copy transcribed verbatim from the live site and from `src/`. Nothing here is rewritten.
Sources: `index.html`, `src/App.tsx`, `src/components/CadAutomationSection.tsx`, `src/data/projects.ts`, `src/data/projects.json`.

---

## 1. BRAND NAME

| Context | Exact string |
|---|---|
| Hero H1 | `Chaitanya Gaikwad` |
| Nav logo | `CG.` |
| Footer | `PORTFOLIO 2026 • CHAITANYA GAIKWAD` |
| `<title>` | `Chaitanya Gaikwad — Portfolio & Capabilities` |
| Instagram handle | `@xiyato22` |
| Domain | `xiyato.uk` |

**No logo mark, wordmark, or brand graphic exists.** The brand is the text `CG.` in Playfair Display.

## 2. BRAND DESCRIPTOR

- Footer: `CREATIVE & B2B STRATEGY`
- Meta description: `AI Visual Designer, Visual Content Creator, B2B Research Specialist, and Architectural CAD Drafting.`
- Hero role row: `CAD DRAFTER` · `AI VISUAL DESIGNER` · `MARKETING & B2B SPECIALIST` · `VISUAL CONTENT CREATOR`
- Mobile-only variant of the third: `MARKETING & B2B`

> **No tagline, no positioning line, no value proposition sentence exists.** The descriptor is a list of job titles in four places, and the four lists do not agree with each other (see doc 11 §Inconsistencies).

## 3. HERO HEADLINE

- **H1:** `Chaitanya Gaikwad`
- **H2 (sub-headline):** `Architectural CAD Drafter, AI Visual Designer, and B2B Marketing Specialist.`

## 4. HERO SUPPORTING COPY

`I help architecture firms, brands, and international businesses elevate their visual presentation, market services, and grow through precision CAD work, AI-powered content creation, cinematic video production, B2B lead generation, market research, and responsive web development.`

## 5. HERO SKILL LABELS (desktop only, ≥768 px)

| Label | Sub-label |
|---|---|
| `CAD DRAFTING` | `AutoCAD · Architecture` |
| `AI VISUALS` | `Midjourney · Gen AI` |
| `WEB DEV` | `React · Vite · Deploy` |
| `CINEMATIC VIDEO` | `Reels · AI Films` |
| `B2B RESEARCH` | `Lead Gen · Excel` |
| `MARKETING` | `Strategy · Growth` |

> These 12 strings are the **only place the site names its tools** (AutoCAD, Midjourney, React, Vite, Excel). All 12 disappear below 768 px.

## 6. ABOUT COPY / FOUNDER INTRODUCTION

Section eyebrow: `MY JOURNEY` · Section heading: `Professional Experience`

**¶1:** `I partner with interior design studios, manufacturers, and international business startups. My work bridges the gap between high-fidelity media campaigns (videos, renders) and operational business setups (spreadsheets, lead qualification pipelines, and complete website creation).`

**¶2:** `By combining digital development and structured outreach with visual content production, I help businesses clarify their presence and build solid lead pipelines that convert.`

> There is **no personal biography, no origin story, no location, no education, no photo caption**. The portrait carries only the alt text `Portrait of Chaitanya Gaikwad`.

## 7. APPROACH COPY

Panel heading: `APPROACH`
- `Visual Storytelling` — `Using state-of-the-art AI generation tools to create custom product mockups, cinematic video content, and high-impact visual campaigns.`
- `Systems & Outreach` — `Building solid B2B lead pipelines, managing CRM trackers, automating follow-up campaigns, and executing cold outreach that converts.`

## 8. KEY STRENGTHS

Panel heading: `KEY STRENGTHS`
`AI image & video generation` · `Short-form video content & reels` · `B2B lead generation & business research` · `Email & WhatsApp outreach automation` · `CRM tracking & follow-up systems` · `Website Creation & Development`

## 9. SERVICE NAMES & DESCRIPTIONS (homepage `#services`, 9 items)

| Service name | Description |
|---|---|
| Architectural & Interior CAD Drafting | Professional AutoCAD drafting transforming measurements, hand sketches, and design references into editable DWG, DXF, and PDF drawing packages. |
| AI Visual Content | AI-generated images, cinematic product visuals, website hero images, mockups, brand visuals, and creative visual direction. |
| AI Video & Short-Form Content | Short-form videos, reels, product explainers, promotional content, AI-assisted video production, and visual storytelling. |
| Digital Marketing Support | Content planning, campaign assistance, brand presentation, social media support, marketing execution, and digital growth strategy. |
| B2B Lead Generation | Researching relevant companies, identifying decision-makers, preparing organized lead lists, and finding potential business opportunities. |
| Business Research | Company research, market research, competitor research, supplier research, export-business research, and opportunity identification. |
| Outreach & Follow-Up | Email outreach, WhatsApp outreach, personalized messaging, follow-up systems, CRM-style tracking, and international communication support. |
| Website Creation & Development | Complete responsive websites for portfolios, brands, and businesses—from page structure, visual direction, content placement to front-end development, mobile optimisation, integrations, and deployment. |
| Automation & Workflow Systems | Email automation, outreach workflows, lead-management systems, content workflows, repetitive-task automation, and practical AI-assisted systems. |

**No pricing, package, timeline, or deliverable copy accompanies any service.**

## 10. CATEGORY COPY (homepage `#projects`, 5 cards — each card's eyebrow is `CATEGORY PORTFOLIO`)

| Title | Subtitle *(defined in source, never rendered)* | Description (rendered, `line-clamp-2`) |
|---|---|---|
| Architectural & Interior CAD Drafting | Professional AutoCAD Drawing Packages | Professional AutoCAD drafting transforming measurements, hand sketches, and design references into editable DWG, DXF, and PDF drawing packages. |
| Cinematic Videos | AI-Assisted Films, Reels & Product Stories | Cinematic short-form videos, product campaigns, interior walkthroughs, and brand stories created through AI-assisted production, visual direction, editing, prompt engineering, and structured storytelling. |
| B2B Research & Excel Systems | Lead Intelligence, Market Mapping & Outreach Workflows | Structured research and spreadsheet systems created for lead generation, buyer mapping, supplier discovery, competitor research, outreach tracking, sample evaluation, and cross-border business development. |
| 3D Renders & Visualisations | Interior Concepts, Product Mockups & Spatial Studies | A curated collection of interior renders, architectural concepts, product visualisations, material studies, showroom previews, and presentation-ready imagery created for client communication and design exploration. |
| Websites Developed | Responsive Portfolio, Brand & Business Websites | Complete responsive websites developed through page planning, visual direction, content organisation, front-end implementation, mobile optimisation, contact integrations, and deployment. |

> The `subtitle` field exists on all 5 categories in `src/data/projects.ts` and is **never rendered anywhere**.

## 11. CATEGORY PAGE INTROS

- **Cinematic Videos:** `Short-form films, luxury product campaigns, and retail walkthroughs created using advanced AI text-to-video systems, prompt engineering, custom storyboarding, and pacing edits.`
- **B2B Research & Excel Systems:** `Clean, structured lead generation pipelines, buyer shortlists, and competitor market intelligence. Original phone numbers and emails have been safely redacted to safeguard confidentiality.`
- **3D Renders & Visualisations:** `High-fidelity 3D spatial concept renders and visualisations exploring texture matching, lighting design, and creative composition. Click on any panel to launch the lightbox.`
- **Websites Developed:** `Complete responsive websites built from layout wireframing, content planning, and visual styling to front-end development, mobile optimisation, and live deployment.`
- **Interactive viewer eyebrow:** `INTERACTIVE SPREADSHEET PREVIEWS`

## 12. PROJECT TITLES & DESCRIPTIONS

### 12.1 — Cinematic Videos (9)

| # | Title | Client | Year | Tags | Description |
|---|---|---|---|---|---|
| 1 | Moon Chair Cinematic Reel — Sultanah & Co. Interiors | Sultanah & Co. Interiors | 2025 | Cinematic · AI Video · Product Campaign · Luxury | Directed the "Moon Chair" cinematic campaign and created premium factory-to-showroom reel concepts, visual sequences, transitions, and social content designed to strengthen luxury product storytelling. |
| 2 | Kozena Luxury Furniture Campaign | Kozena | 2026 | Cinematic · Luxury · Short-Form · Furniture | A premium cinematic product showcase campaign for Kozena's luxury sofa and furniture range. |
| 3 | Premium Bar Red Restaurant Concept | Hospitality Client | 2026 | Cinematic · Hospitality · Interior Walkthrough | Visual walk-through and promotional media concept for a premium high-end red bar and restaurant design proposal. |
| 4 | Room Transformation Walkthrough | Interior Design Studio | 2026 | Cinematic · Interior · Walkthrough · Transformation | Before-and-after room transformation visual reel and material spatial study. |
| 5 | Bahrain Client Commercial Ad | Middle East Developer | 2026 | Cinematic · Commercial Ad · Real Estate | Cinematic visual ad and walkthrough campaign for a premium real estate developer in Bahrain. |
| 6 | The Bar Edit Cinematic | Hospitality Client | 2026 | Cinematic · Luxury · Short-Form · Hospitality | Cinematic commercial edit showcasing ambience, luxury finishes, and design details for an upscale bar. |
| 7 | Great Design Holds Attention Walkthrough | Visual Design Study | 2026 | Cinematic · AI Video · Spatial Study | Cinematic walkthrough study exploring visual rhythm, spatial comfort, and premium textures. |
| 8 | Bingxi Factory-to-Showroom Video | Bingxi | 2026 | Cinematic · Industrial · Showroom · Product Story | Cinematic visual campaign tracking production from factory floor to luxury furniture showroom. |
| 9 | One Design District Showroom Reel | One Design District | 2026 | Cinematic · Showroom Reel · Interior · POV | POV walkthrough showing statement furniture pieces and premium finishes at One Design District showroom. |

All nine share the role string `Cinematic Content Creator & Visual Director`, and on all nine the `location` field is a duplicate of the `client` field. **`role`, `location`, `subcategory`, `dateRange` and `shortDescription` are never rendered on this page.**

### 12.2 — 3D Renders & Visualisations (49)

Titles are auto-numbered only:
- `Spatial Study Concept 01` – `06` (subcategory `3D Renders`)
- `Visualisation Study Concept 01` – `43` (subcategory `Visualisations`)

**There are only two description strings across all 49 items**, differing only by the trailing concept number:

1. *(the 6 renders)* `A high-fidelity rendering study showcasing spatial layout, lighting, furniture design details, and material textures. Created as part of spatial concept development and visual design study. Concept NN.`
2. *(the 43 visualisations)* `A high-fidelity visual concept exploring texture matching, spatial arrangement, lighting design, and creative aesthetics. Concept NN.`

Two `shortDescription` strings (never rendered), two `client` values (`Interior & Visual Exploration`, `Visual Content & Design Exploration`), two `role` values (`AI Visualizer & 3D Spatial Designer`, `AI Visualizer & Creative Director`). **No client, brief, tool, or material is named for any of the 49.**

Section count chips: `6 Concepts` · `43 Concepts`

### 12.3 — B2B Research & Excel Systems (8)

| # | Title | Chip | shortDescription (rendered on the card) | Tags |
|---|---|---|---|---|
| 1 | Premium Fabric Import Buyer Shortlist | 7 SHEETS | A cleaned shortlist of premium fabric importers in India segmenting targets by cities. | B2B Research · Data Organisation · Export Support |
| 2 | Electronics Middle East Selected Leads | 1 SHEETS | Market mapping and B2B lead generation shortlist for electronics shops in target UAE regions. | B2B Research · Lead Generation · Market Mapping |
| 3 | Middle East Interiors & Fitout WhatsApp Leads | 1 SHEETS | Expanded B2B lead generation database mapping interior and fit-out firms in the GCC. | B2B Research · Lead Generation · Outreach |
| 4 | Automotive Showroom Lead Intelligence | 2 SHEETS | Dealership showroom targets and EV/Chinese brand distributors ranked for design-build outreach. | B2B Research · Lead Generation · Market Mapping |
| 5 | China Interior Markets & Hubs | 4 SHEETS | Wholesale interior decor markets and furniture hubs mapped across Tier 1, 2, and 3 cities. | B2B Research · Market Mapping · Data Organisation |
| 6 | Laminate Events & Building Expos Calendar | 1 SHEETS | Events calendar mapping architecture, construction, and building material exhibitions in India. | B2B Research · Market Mapping · Events Research |
| 7 | Philippines VIP Approachable Lead Intelligence | 4 SHEETS | Upper-echelon VIP public contact routes mapped for premium architectural outreach. | B2B Research · Lead Generation · Outreach |
| 8 | Saudi Riyadh & Jeddah Lead Intelligence | 6 SHEETS | Developer, luxury hotel projects, and pre-opening opportunities mapped for Saudi market entry. | B2B Research · Lead Generation · Saudi Market |

**All eight workbooks share one identical `fullDescription`**, shown on every viewer page:
`This workbook was developed to organize B2B intelligence into usable commercial systems. It covers buyer discovery, supplier research, outreach prioritization, contact-route mapping, sample evaluation, and progress tracking across international markets. Built for practical outreach and decision-making—not simply data collection.`

All eight also share the subcategory string `Lead Intelligence, Market Mapping & Outreach Workflows`, the client string `B2B Client Systems`, and the role string `B2B Research & Outreach Specialist`.

### 12.4 — Websites Developed (3)

| # | Title | Client | Role eyebrow | Description |
|---|---|---|---|---|
| 1 | Personal Portfolio Website | Chaitanya Gaikwad | DESIGNER & FRONT-END WEBSITE DEVELOPER | A refined editorial portfolio designed and developed to present cinematic content, B2B research systems, visualisations, professional experience, and digital-development work through one responsive experience. |
| 2 | Export Brand Website | International Bedding & Hotel-Linen Client | FRONT-END WEBSITE DEVELOPER & DIGITAL PRESENTATION SPECIALIST | A complete responsive brand website originally developed for an international bedding and hotel-linen export opportunity. The original commercial opportunity is now proceeding independently, while the finished website build remains available for acquisition, licensing, or adaptation by a suitable business. |
| 3 | Anvikshiki Journal | Academic & Research Community | FULL-STACK DEVELOPER & TECHNICAL ADMINISTRATOR | A clean, responsive academic journal platform designed and developed to manage and publish scholarly articles, indexing, peer-reviewed research papers, and author submissions. |

Tags — 1: `Portfolio · Responsive Design · Front-End Development · Project Architecture · Media Presentation · Contact Integration · Vercel Deployment` · 2: `Export Business · Responsive Website · Front-End Development · B2B Presentation · Lead Capture · International Brand · Foreign Trade` · 3: `Academic Journal · Publication Platform · Full-Stack Development · Responsive Layout · Scholarly Research · Database Integration`

### 12.5 — CAD project copy

Card titles: `Master Bathroom CAD Package` · `Cigar Lounge Ceiling & Flooring` · `Custom Interior Wall Drafting`
Featured banner: `Bahrain Luxury Interior & Architectural CAD Package`
*(Full body copy for each is transcribed in doc 02, Page 2 §04 and §03.)*

Drawing titles used in the lightbox and as alt text: `Master Bathroom - General Layout Plan` · `Master Bathroom - Bathtub & Window Elevation` · `Master Bathroom - General Arrangement Plan` · `Master Bathroom - Wall 1: Bathtub & Window Elevation` · `Master Bathroom - Wall 2: Vanity & WC Wall Elevation` · `Master Bathroom - Wall 3: Walk-in Shower Wall Elevation` · `Cigar Lounge - Reflected Ceiling Plan (RCP)` · `Cigar Lounge - Herringbone Flooring Plan` · `Cigar Lounge - General Furniture Layout` · `Cigar Lounge - Herringbone Flooring Layout` · `Custom Interior Walls - General Arrangement & Layout` · `Toilet Feature Wall - Vanity & Mirror Elevation Details` · `Wash Feature Wall - Decorative Panelling & Fixture Elevation` · `Stair Feature Wall - Architectural Joinery Construction Detail` · `Client Reference - 3D Visual Render` · `Client Reference - Measured Hand Sketch & CAD Notes` · `Client Input - Visual 3D Render Reference` · `Client Input - Dimensioned Layout & Markups` · `Editable CAD Output - Vector General Arrangement Plan` · `Editable CAD Output - Vector Wall Elevation with Dimensions`

Category pills: `Plan Drawing` · `Wall Elevation` · `Ceiling Plan` · `Flooring Plan` · `Elevation` · `Input Material` · `General Layout` · `Construction Detail` · `Client Reference` · `Vector DWG / DXF`

## 13. CLIENT / COMPANY NAMES USED ON THE SITE

**Named employers (Experience section):** `Sultanah & Co. Interiors` · `Red Chandelier Studio` · `Chinese Company` *(anonymised, descriptor `HOTEL LINEN & PREMIUM BEDDING EXPORT CLIENT`)* · `Ereno Design Studio` · `Fitout 360 Interiors` · `Jovial Decor`

**Named project clients:** `Kozena` · `Bingxi` · `One Design District` · `Anvikshiki Journal`

**Anonymised clients:** `Hospitality Client` (×2) · `Interior Design Studio` · `Middle East Developer` · `Visual Design Study` · `International Bedding & Hotel-Linen Client` · `Academic & Research Community` · `B2B Client Systems` · `Interior & Visual Exploration` · `Visual Content & Design Exploration`

**Third-party names inside the public spreadsheet data** (e.g. `Dar Global`, and a named individual in the `NAMED PERSON PUBLICLY SEEN` column) — see doc 09 §5.

> **Note:** the Experience card labelled `Jovial Decor` links to `@jovialdecoure` and its `aria-label` reads `View Jovial Decoure on Instagram` — three spellings of the same client.

## 14. EXPERIENCE STATEMENTS

| Company | Period | Role | Statement |
|---|---|---|---|
| Sultanah & Co. Interiors | Mar 2025 – Present | Freelance Cinematic Content Creator | Directed the "Moon Chair" cinematic campaign and created premium factory-to-showroom reel concepts, visual sequences, transitions, and social content designed to strengthen luxury product storytelling. |
| Red Chandelier Studio | Mar 2026 – Present | Creative Visual Strategist & AI Content Producer | Created luxury interior visuals, cinematic reels, showroom walkthroughs, campaign assets, advanced architectural prompts, and presentation content for residential, hospitality, and commercial projects. |
| Chinese Company | Mar 2025 – Present | Marketing, Lead Generation & Website Specialist | Built structured buyer databases, cross-border outreach workflows, buyer qualification systems, and sample-evaluation tracking while supporting export communication and a complete brand website project. |
| Ereno Design Studio | Mar 2026 – Jun 2026 | Freelance AI Visual Designer | Produced high-end interior concept visuals, showroom-style mockups, realistic short-form video concepts, and structured vendor and material research for design proposals and client presentations. |
| Fitout 360 Interiors | Apr 2026 – May 2026 | Freelance AI Visualizer & Video Creator | Delivered more than nine high-fidelity commercial office renders and developed ultra-realistic AI video concepts, transforming raw layout references into polished visual options for client presentations. |
| Jovial Decor | Feb 2026 – May 2026 | AI Design Specialist | Created interior visuals, product mockups, curtain catalogue layouts, point-of-sale signage, invitation concepts, and social media assets for a home décor showroom covering approximately 10,000 square feet. |

## 15. PROJECT METRICS

The site has **no metric cards, no counters, no statistics block** (KPI cards removed in commit `826c6e5`). Every number on the site is embedded in prose or is a UI count:

| Number | Where |
|---|---|
| `more than nine high-fidelity commercial office renders` | Experience — Fitout 360 |
| `approximately 10,000 square feet` | Experience — Jovial Decor |
| `AutoCAD DWG / DXF Output (4 Sheets)` | CAD hero caption |
| `+ 6 Drawings`, `3 CAD Drawings`, `4 Wall Packages` | CAD project chips |
| `4-Step Production Workflow`, `Step 01`–`Step 04` | CAD workflow |
| `6 Concepts`, `43 Concepts` | Visualisations section chips |
| `7 SHEETS`, `1 SHEETS`, `2 SHEETS`, `4 SHEETS`, `6 SHEETS` | B2B cards |
| `Showing {n} of {n} rows` | Spreadsheet viewer footer |
| `RENDER {n} OF 49`, `SCREENSHOT {n} OF 9`, `{n} / {total}` | Lightbox counters |
| `PORTFOLIO 2026` | Footer |
| Phone numbers `+44 7882 746212`, `+91 70283 11226` | Multiple |

**No monetary figures, rates, or earnings appear anywhere** (removed in commit `cca00cd`). Verified: a full-text search of the built bundle and all source files returns no currency-formatted values.

## 16. TESTIMONIALS

**NONE.** There is no testimonial, quote, review, endorsement, or reference anywhere on the site.

## 17. TRUST STATEMENTS

| Statement | Location |
|---|---|
| `Designed for client review. Fully editable for professional refinement.` | CAD intro chip |
| `Quality Control With Verification` + the 6 badges `DIMENSION CHECKED` / `EDITABLE GEOMETRY` / `LAYER ORGANIZED` / `VISUALLY REVIEWED` / `PDF PRESENTATION` / `REVISION READY` | CAD §07 |
| `Professional drafting is only useful when the result remains measurable, editable, and reviewable. Each package is checked for confirmed dimensions, room geometry, door and fixture relationships, layer organisation, file editability, annotation clarity, and presentation quality. Any dimensions estimated from visual references remain clearly editable for final professional adjustment.` | CAD §07 body |
| `Reference plans, dimensions and design images are converted into structured, editable CAD documentation—not simply placed as flat images.` | CAD §05 closing |
| `Phone & Email Redacted` + `PRIVACY STATUS` | Spreadsheet viewer |
| `Original phone numbers and emails have been safely redacted to safeguard confidentiality.` | B2B category intro |
| `Instagram account not publicly available` + `PRIVATE` chip | Experience card 3 |
| Blue verified tick (`aria-label="Verified account"`) on 5 Experience cards | Experience |
| `CURRENTLY IN DEVELOPMENT` | Startup ×2 |

**Only legal/disclaimer text on the site** (CAD §11):
`CAD packages are developed from the measurements and references supplied for each project. Provisional details remain editable and should be reviewed by the project's qualified designer, draftsman or technical consultant before construction.`

## 18. CALLS TO ACTION

| CTA label | Type | Destination | Page |
|---|---|---|---|
| `VIEW PORTFOLIO` | anchor | `#projects` | Home |
| `LET'S CONNECT` | anchor | `#contact` | Home |
| `+44 7882 746212` | WhatsApp | `wa.me/447882746212` | Home hero |
| `+91 70283 11226` | WhatsApp | `wa.me/917028311226` | Home hero |
| `EXPLORE CATEGORY` ×5 | *non-link div click* | 5 category routes | Home |
| `EXPLORE CIYATO LAUNCHER` | hash route | `#/startup` | Home |
| `Start a CAD Project` | WhatsApp (pre-filled) | `wa.me/447882746212?text=…` | CAD |
| `View Drawing Samples` | button → modal | — | CAD |
| `Generate` / `Generate CAD →` | WhatsApp (pre-filled) | `wa.me/447882746212?text=…` | CAD lightbox |
| `VIEW DATA` ×8 | hash route | viewer routes | B2B |
| `DOWNLOAD` ×8 | file download | `.xlsx` | B2B |
| `Download Portfolio Copy` | file download | `.xlsx` | Viewer |
| `VISIT LIVE WEBSITE` ×3 | external | 3 URLs | Websites |
| `WhatsApp +44 7882 746212` / `WhatsApp +91 70283 11226` | WhatsApp (pre-filled) | `wa.me/…?text=…` | Startup |
| `Inquire Website Acquisition` | WhatsApp (pre-filled) | `wa.me/447882746212?text=…` | **DEAD CODE — never renders** |
| `BACK TO HOME` / `BACK TO PROJECTS` / `BACK TO B2B RESEARCH` / `Back to list` | anchor | — | subpages |

**The Services section (9 cards) and the Experience section (6 cards) contain no CTA at all.**

## 19. CONTACT COPY

- Footer heading: `Let's connect.`
- Footer body: `Open to creative direction, B2B campaigns, or website support opportunities.`
- CAD CTA heading: `Have a plan, reference or design that needs drafting?`
- CAD CTA body: `Send the available layout, measurements and design references. I will review the material, identify what is confirmed or missing, and propose the appropriate editable CAD package.`
- Startup CTA heading: `Interested in Ciyato?`
- Startup CTA body: `For product discussions, early collaboration, development opportunities, partnerships, or enquiries relating to Ciyato, contact me directly on WhatsApp.`

**Pre-filled WhatsApp message bodies (3 distinct):**
1. `Hello, I would like to discuss an AutoCAD drafting project. I have a plan/reference and need editable CAD drawings.`
2. `Hello, I am interested in Ciyato and would like to learn more about the startup.`
3. `Hi Chaitanya, I am inquiring about acquiring the Export Brand Website listed on your portfolio.` *(dead code)*

## 20. LOCATION INFORMATION

**NO location is stated anywhere on the site** — no city, no country, no address, no timezone, no service area.

Places named only as *client* context: `Bahrain` · `India` · `UAE` · `GCC` · `Saudi` (Riyadh, Jeddah) · `China` · `Philippines` · `Middle East` · `Global` · `Remote`.

The `+44` (UK) and `+91` (India) phone prefixes are the only geographic signal about the site owner.

## 21. FOOTER COPY

`Let's connect.` · `Open to creative direction, B2B campaigns, or website support opportunities.` · `+44 7882 746212` · `+91 70283 11226` · `@xiyato22` · `INSTAGRAM` · `WHATSAPP` · `PORTFOLIO 2026 • CHAITANYA GAIKWAD` · `CREATIVE & B2B STRATEGY`

## 22. LEGAL COPY

**NONE**, other than the CAD disclaimer quoted in §17. No copyright symbol, privacy policy, terms, cookie notice, or company registration detail exists.

## 23. NAVIGATION LABELS

Header (desktop and mobile use the same six): `Home` · `About` · `Services` · `Projects` · `Startup` · `Contact` — rendered uppercase by CSS. Logo: `CG.`
Back links: `Back to Home` · `Back to Projects` · `Back to B2B Research` · `Back to list`

## 24. BUTTON LABELS (complete set)

`VIEW PORTFOLIO` · `LET'S CONNECT` · `EXPLORE CATEGORY` · `EXPLORE CIYATO LAUNCHER` · `VIEW DATA` · `DOWNLOAD` · `Download Portfolio Copy` · `VISIT LIVE WEBSITE` · `Start a CAD Project` · `View Drawing Samples` · `Generate` · `Generate CAD →` · `Inquire Website Acquisition` *(dead)* · `Back to …` · `Toggle navigation menu` *(aria-label)*

## 25. MICROCOPY

`Click any preview to launch full screen →` · `Click cards or thumbnails to launch full drawing gallery` · `Click on any panel to launch the lightbox.` · `Click to expand.` · `Pinch to zoom · Swipe to navigate` · `Esc to exit` · `Editable Geometry + Layers` · `Reference Materials` · `DWG / DXF / PDF` · `Active Sheet: {name}` · `Showing {n} of {n} rows` · `CAD Drawing` *(lightbox fallback label)* · `Column {i}` *(table header fallback)* · `PRIVATE` · `Category Portfolio` · `Works & Capabilities` · `Offerings` · `My Journey` · `My Startup` · `Capabilities` · `Screenshots` · `Selected CAD Packages` · `Structured Process` · `Transformation Workflow` · `Quality Control & Verification` · `Flexible File Formats` · `Development Milestones` · `Interactive Spreadsheet Previews` · `Privacy Status` · `Client Input` · `Editable CAD Output` · `CAD Drafting & Scripting` · `Featured Client Project • Bahrain` · `Complete Drawing Package`

## 26. FORM LABELS / SUCCESS / ERROR TEXT

**The site has zero `<form>` elements and exactly one `<input>` in total** (verified live).

That input is the spreadsheet row filter:
- **Placeholder:** `Search rows...`
- **Label:** none · **`aria-label`:** none · **`name`:** none · **`required`:** false · **validation:** none
- **Empty result text:** `No matching records found`

**There is no contact form anywhere, and therefore no submit button, no success state, no error state, no validation copy, and no spam protection.**

## 27. LOADING / EMPTY / ERROR STATES

| State | Copy |
|---|---|
| Spreadsheet loading | `Parsing Worksheet...` (with a spinner) |
| Spreadsheet, no sheets | `No sheets available` |
| Spreadsheet, no search match | `No matching records found` |
| Invalid workbook slug | `Workbook not found` + `Back to list` |
| Unknown URL | **no error copy — the homepage renders with HTTP 200** |

## 28. MOBILE-ONLY vs DESKTOP-ONLY TEXT

**Mobile-only (<640 px):** `MARKETING & B2B` (hero badge) · `Pinch to zoom · Swipe to navigate` · `Generate CAD →`

**Desktop-only (hidden on mobile):**
- ≥640 px: `MARKETING & B2B SPECIALIST` · `Generate` (lightbox) · zoom −/+ cluster
- ≥768 px: **all 12 hero skill strings** (§5) · `Click cards or thumbnails to launch full drawing gallery` · `Esc to exit`
- Hover-only: `EXPLORE CATEGORY` spotlight, video control pill (`opacity-0` until `group-hover`), social icon labels `INSTAGRAM` / `WHATSAPP`

## 29. SEO / META COPY

Identical on **every** route (static, in `index.html`):

| Tag | Value |
|---|---|
| `<title>` | `Chaitanya Gaikwad — Portfolio & Capabilities` |
| `meta[name=description]` | `Portfolio of Chaitanya Gaikwad: AI Visual Designer, Visual Content Creator, B2B Research Specialist, and Architectural CAD Drafting.` |
| `og:type` | `website` |
| `og:url` | `https://chaitanya-gaikwad.vercel.app/` ← **points at the Vercel host, not `xiyato.uk`** |
| `og:title` | `Chaitanya Gaikwad — Portfolio & Capabilities` |
| `og:description` | `AI Visual Designer, Visual Content Creator, B2B Research Specialist, and Architectural CAD Drafting.` |
| `twitter:title` | `Chaitanya Gaikwad — Portfolio & Capabilities` |
| `twitter:description` | `AI Visual Designer, Visual Content Creator, B2B Research Specialist, and Architectural CAD Drafting.` |
| `og:image` | **ABSENT** |
| `twitter:card` | **ABSENT** |
| `twitter:image` | **ABSENT** |
| `canonical` | **ABSENT** |
| `meta[name=robots]` | **ABSENT** |
| `meta[name=author]` | **ABSENT** |
| `html lang` | `en` |

## 30. STRUCTURED DATA

**NONE.** Verified live: `document.querySelectorAll('script[type="application/ld+json"]')` returns 0 elements. No `Person`, `LocalBusiness`, `Service`, `BreadcrumbList`, `CreativeWork`, or any other schema.org markup exists.

## 31. NON-SITE COPY PRESENT IN THE REPOSITORY

Two files describe a **different person and project** and would ship with any copy of the repo:

- `README.md` — begins `Hi I'm Disha,` and describes a background in AIML and AI alignment/governance
- `metadata.json` — `"name": "Disha Singha Portfolio"`, `"description": "Academic portfolio for Disha Singha, specializing in AI Safety and Philosophy of AI."`
- `package.json` — `"name": "react-example"`

These are not served to visitors, but they are the repository's identity.


---

# 04 — MEDIA & ASSET INVENTORY

**Audit date:** 2026-08-11 · File sizes from the repository working tree (verified to match live `Content-Length`). Pixel dimensions measured by loading each asset in the browser.

---

## 1. TOTALS

| Folder | Files | Size |
|---|---:|---:|
| `public/projects/videos/` | 9 | **88,088 KB (86.0 MB)** |
| `public/projects/visualisations/` | 43 | 8,888 KB |
| `public/portfolio/cad-automation/` | 20 | 4,408 KB |
| `public/` root (loose) | 7 | 3,900 KB |
| `public/projects/startup/` (incl. `thumbs/`) | 20 | 1,364 KB |
| `public/data/spreadsheets/` | 8 | 984 KB |
| `public/projects/posters/` | 10 | 504 KB |
| `public/projects/renders/` | 6 | 444 KB |
| `public/projects/downloads/` | 8 | 256 KB |
| **TOTAL `public/`** | **131** | **108,860 KB ≈ 106 MB** |

**By file type:** 99 `.webp` · 9 `.mp4` · 8 `.xlsx` · 8 `.json` · 5 `.png` · 2 `.jpg`

**Video is 81 % of the entire asset payload.** No image formats beyond WebP/PNG/JPEG are used; there is no AVIF, no SVG file (all SVG is inline in JSX), and no `srcset`/`<picture>` anywhere in the codebase.

---

## 2. PROFILE / IDENTITY ASSETS

| File | Where it appears | Type | Dimensions | Size | Compressed | Reused | Mobile | Desktop | Alt text | Role | Links |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/portrait.jpg` | Homepage hero | JPEG | 1024 × 1016 (1.01:1) | 176 KB | JPEG only — **not WebP** | No | Yes (192 px) | Yes (266 px) | `Portrait of Chaitanya Gaikwad` | Meaningful | No |
| `/favicon.jpg` | Browser tab + Apple touch icon | JPEG | 1024 × 1024 | **173 KB** | JPEG | Yes (both `<link>` tags) | Yes | Yes | n/a | Meaningful | No |

> **`favicon.jpg` is a 173 KB, 1024 px JPEG used as a favicon.** A conventional favicon is 1–15 KB. It is also declared as the `apple-touch-icon`. There is no `.ico`, no 32 px variant, and no `manifest`.
> The portrait is served at 1024 px and displayed at 192–266 px — roughly 4× the pixels needed at 1× density.

---

## 3. LOOSE ROOT ASSETS — the homepage's heaviest payload

| File | Dimensions | Size | Where used | Rendered at | Alt | Decorative? |
|---|---|---|---|---|---|---|
| `/ig-thumb-1.png` | 1024 × 1024 | **728 KB** | Experience card 4 background · Websites project 3 `thumbnail` (never rendered) | CSS background at **`opacity: 0.05`** | none (CSS bg) | Decorative |
| `/ig-thumb-2.png` | 1024 × 1024 | **790 KB** | Experience card 2 background · Websites project 1 `thumbnail` (never rendered) | CSS background at **`opacity: 0.05`** | none | Decorative |
| `/ig-thumb-3.png` | 1024 × 1024 | **740 KB** | Experience card 1 background | CSS background at **`opacity: 0.05`** | none | Decorative |
| `/sakura-bg.png` | 1024 × 1024 | **521 KB** | Projects card 5 background (`brightness 0.4`) · Experience card 3 background (`opacity 0.05`) · Websites project 2 `thumbnail` (never rendered) | CSS background | none | Decorative |
| `/regenerated_image_1777361976700.png` | 709 × 1084 | **780 KB** | **NOWHERE — orphan** | — | — | — |

**Verified network finding:** these four PNGs total **2,779 KB and all four download on the homepage**, where three of them are only ever painted at 5 % opacity behind text. They are the single largest avoidable cost on the site's entry page.

Homepage first-load payload (14 requests, measured live):
`index.js` 143 KB (gzip) + `index.css` 10 KB + Google Fonts CSS + `portrait.jpg` 176 KB + `startup/logo.webp` 27 KB + `startup/hero.webp` 116 KB + `cad-automation/hero-plan.webp` 300 KB + `posters/sultanah-…-poster.webp` 44 KB + `posters/excel-placeholder-poster.webp` 61 KB + `renders/render-2.webp` 78 KB + `sakura-bg.png` 521 KB + `ig-thumb-1/2/3.png` 2,258 KB ≈ **3.7 MB**.

---

## 4. VIDEO ASSETS (9) — `public/projects/videos/`

All: MP4, 9:16 portrait, `loop`, `muted`, `playsInline`, `preload="metadata"`, no `controls` on the card, poster set, `object-cover`. Visible on both mobile and desktop. Not links (they open a modal). Meaningful, not decorative. **No `<track>`, no captions, no subtitles, no transcript, and no `aria-label` on any `<video>`.**

| File | Size | Card title | Poster |
|---|---:|---|---|
| `bahrain-client-commercial-ad.mp4` | **31,976 KB (31.2 MB)** | Bahrain Client Commercial Ad | `bahrain-client-commercial-ad-poster.webp` |
| `sultanah-co-moon-chair-cinematic-campaign.mp4` | 12,349 KB | Moon Chair Cinematic Reel | `sultanah-co-moon-chair-cinematic-campaign-poster.webp` |
| `premium-bar-red-restaurant-concept.mp4` | 10,212 KB | Premium Bar Red Restaurant Concept | `premium-bar-red-restaurant-concept-poster.webp` |
| `kozena-luxury-furniture-campaign.mp4` | 7,983 KB | Kozena Luxury Furniture Campaign | `kozena-luxury-furniture-campaign-poster.webp` |
| `bingxi-factory-video.mp4` | 6,205 KB | Bingxi Factory-to-Showroom Video | `bingxi-factory-video-poster.webp` |
| `one-design-district-showroom-reel.mp4` | 5,866 KB | One Design District Showroom Reel | `one-design-district-showroom-reel-poster.webp` |
| `the-bar-edit-cinematic.mp4` | 5,231 KB | The Bar Edit Cinematic | `the-bar-edit-cinematic-poster.webp` |
| `great-design-holds-attention-walkthrough.mp4` | 4,916 KB | Great Design Holds Attention Walkthrough | `great-design-holds-attention-walkthrough-poster.webp` |
| `room-transformation-interior-walkthrough.mp4` | 3,326 KB | Room Transformation Walkthrough | `room-transformation-interior-walkthrough-poster.webp` |

**Loading strategy (verified live):** on entering `#/projects/videos`, **all nine files immediately issue HTTP 206 range requests in parallel** (then abort once metadata arrives). There is no lazy mount, no `IntersectionObserver` gate on the *network* request — only on playback. An `IntersectionObserver` at `threshold: 0.5` then autoplays whichever card is centred, progressively pulling the full file. A visitor scrolling the whole page can trigger tens of MB of transfer.

Server headers on video: `Accept-Ranges: bytes`, `Content-Type: video/mp4`, `Cache-Control: public, max-age=0, must-revalidate`. **No adaptive streaming (no HLS/DASH), no multiple resolutions, no poster-only fallback.**

---

## 5. POSTER IMAGES (10) — `public/projects/posters/`

WebP, ~1080 × 1350 (4:5) where sampled. 504 KB total. Nine are video posters (see §4). The tenth:

| File | Size | Dimensions | Where | Alt |
|---|---:|---|---|---|
| `excel-placeholder-poster.webp` | 61 KB | 1024 × 1024 | Homepage Projects card 3 background **only**. Assigned as `thumbnail`/`poster` to all 8 B2B workbooks but **never rendered on the B2B pages** | none (CSS bg) |

`sultanah-co-moon-chair-cinematic-campaign-poster.webp` (44 KB, 1080 × 1350) is **reused** as both the video poster and the homepage Projects card 2 background.

---

## 6. CAD DRAWING ASSETS (20) — `public/portfolio/cad-automation/`

**15 in use, 5 orphaned.** All WebP. Every one is `loading="eager"` — **there is no lazy loading anywhere on the CAD page**.

| File | Size | Natural dimensions | Rendered at | Used in | Alt text present |
|---|---:|---|---|---|---|
| `hero-plan.webp` | 300 KB | 3200 × 2260 | 207 px · also homepage card bg | HERO gallery + homepage | Yes |
| `hero-elevation.webp` | 141 KB | 3200 × 2260 | 207 px | HERO gallery | Yes |
| `cigar-lounge-ceiling.webp` | 292 KB | 3200 × 2260 | 207 / 116 px | HERO + CIGAR galleries (**reused**) | Yes |
| `cigar-lounge-flooring.webp` | 284 KB | 3200 × 2260 | 207 / 116 px | HERO + CIGAR galleries (**reused**) | Yes |
| `cigar-lounge-layout.webp` | 234 KB | 3200 × 2260 | 240 px | CIGAR gallery | Yes |
| `master-bathroom-plan.webp` | 300 KB | 3200 × 2260 | 116 / 287 px | MASTER_BATHROOM + BEFORE_AFTER + §05 (**reused 3×**) | Yes |
| `master-bathroom-elevation.webp` | 141 KB | 3200 × 2260 | 116 px | MASTER_BATHROOM + BEFORE_AFTER (**reused**) | Yes |
| `master-bathroom-vanity.webp` | 162 KB | 3200 × 2260 | 116 px | MASTER_BATHROOM | Yes |
| `master-bathroom-shower.webp` | 202 KB | 3200 × 2260 | 116 px | MASTER_BATHROOM | Yes |
| `master-bathroom-render-input.webp` | 318 KB | 986 × 1448 | 134 px | MASTER_BATHROOM + BEFORE_AFTER + §05 (**reused 3×**) | Yes |
| `master-bathroom-plan-input.webp` | 28 KB | 247 × 532 | 134 px | MASTER_BATHROOM + BEFORE_AFTER + §05 (**reused 3×**) | Yes |
| `feature-wall-overview.webp` | 206 KB | 3200 × 2199 | 240 px | FEATURE_WALL | Yes |
| `toilet-elevations.webp` | 220 KB | 3200 × 2199 | 116 px | FEATURE_WALL | Yes |
| `wash-elevations.webp` | 205 KB | *(not sampled)* | lightbox only | FEATURE_WALL — **never shown as a thumbnail** | Yes |
| `stair-wall-detail.webp` | 94 KB | 2536 × 3200 | 116 px | FEATURE_WALL | Yes |
| `cad-automation-hero.webp` | **304 KB** | — | — | **ORPHAN** | — |
| `hero-ceiling.webp` | **296 KB** | — | — | **ORPHAN** | — |
| `hero-flooring.webp` | **288 KB** | — | — | **ORPHAN** | — |
| `toilet-3d-input.webp` | **256 KB** | — | — | **ORPHAN** | — |
| `stair-wall-input.webp` | **84 KB** | — | — | **ORPHAN** | — |

> **Resolution mismatch:** thirteen CAD drawings are 3200 px wide and are displayed at 116–287 px in the grid — a 11×–27× linear over-delivery. This is defensible for the pan/zoom lightbox (which zooms to 5×) but the same full-resolution file is what loads eagerly into the thumbnail grid. There is no thumbnail tier for CAD images, unlike the Ciyato screenshots which do have one.

---

## 7. RENDER & VISUALISATION ASSETS (49)

| Set | Files | Total | Sampled dimensions | Loading | Alt text |
|---|---:|---:|---|---|---|
| `public/projects/renders/render-1…6.webp` | 6 | 444 KB (44–125 KB each) | `render-1`: 999 × 1230 (0.81) | `lazy` | = title, e.g. `Spatial Study Concept 01` |
| `public/projects/visualisations/vis-1…43.webp` | 43 | 8,888 KB (110–469 KB each) | `vis-1`: 1440 × 960 (1.50) | `lazy` | = title, e.g. `Visualisation Study Concept 01` |

- Displayed in a 4:3 tile at ~291 px wide; **the source aspect ratios (0.81 and 1.50) do not match the 4:3 tile**, so every thumbnail is cropped by `object-cover`. The lightbox uses `object-contain` and shows the full frame.
- `render-2.webp` (78 KB) is **reused** as the homepage Projects card 4 background.
- The lightbox loads `media` (the same full-size file) — there is no thumbnail tier for this set.
- All 49 are lazy-loaded — the only category page that does this correctly.
- **Alt text is the generic auto-numbered title on all 49**; it conveys no information about the image.

---

## 8. STARTUP (CIYATO) ASSETS (20) — `public/projects/startup/`

| File | Size | Dimensions | Where | Loading | Alt |
|---|---:|---|---|---|---|
| `logo.webp` | 27 KB | 1024 × 1024 | Homepage startup band (56 px) + Startup hero (64 px) — **reused** | default (eager) | `Ciyato Logo` |
| `hero.webp` | 116 KB | 1122 × 1402 (0.80) | Homepage startup band + Startup hero — **reused** | default (eager) | `Ciyato Android Launcher Interface Preview` / `Ciyato Android Interface Preview` (**two different alt strings for the same file**) |
| `screen-1…9.webp` | 93–156 KB (1,073 KB total) | `screen-1`: 941 × 1672 (0.56) | Startup lightbox, full size only | on demand | = caption |
| `thumbs/screen-1…9-thumb.webp` | 15–24 KB (180 KB total) | `screen-1-thumb`: 300 × 533 | Startup gallery grid | `lazy` | = caption |

> **This is the only asset set on the site with a proper two-tier thumbnail/full-size structure.** Captions double as alt text and are descriptive (`Unified Search Panel`, `Privacy & User Controls`, …).

---

## 9. DOWNLOADABLE DOCUMENTS (8) — `public/projects/downloads/`

All `.xlsx`, all linked with the `download` attribute from `#/projects/b2b-research`, all also offered as `Download Portfolio Copy` on the matching viewer page.

| File | Size |
|---|---:|
| `cleaned-premium-fabric-import-buyer-shortlist-redacted.xlsx` | 62 KB |
| `automotive-showroom-lead-intelligence-redacted.xlsx` | 44 KB |
| `electronics-middle-east-selected-leads-redacted.xlsx` | 42 KB |
| `saudi-riyadh-jeddah-55-lead-intelligence-redacted.xlsx` | 30 KB |
| `philippines-vip-approachable-lead-intelligence-redacted.xlsx` | 27 KB |
| `china-interior-markets-100plus-redacted.xlsx` | 16 KB |
| `middle-east-interiors-fitout-whatsapp-expanded-redacted.xlsx` | 10 KB |
| `laminate-events-in-india-redacted.xlsx` | 8 KB |

**Redaction verified.** A pattern scan of all 8 files (unzipped OOXML) found **0 email addresses and 0 phone numbers in the cell data**, matching the site's `Phone & Email Redacted` claim. Same scan on the 8 public JSON previews: **0 and 0**.

**One incidental finding:** two workbooks carry an author email in their OOXML document metadata (`docProps/core.xml` → `dc:creator`) — `chaitanyagaikwad022@gmail.com` in `automotive-showroom-lead-intelligence-redacted.xlsx` and `saudi-riyadh-jeddah-55-lead-intelligence-redacted.xlsx`. This is the site owner's own address, not client data, but it is publicly downloadable and is not published anywhere else on the site.

**No PDF, no CV, no case-study document, and no image download exists anywhere.**

---

## 10. DATA FILES (8) — `public/data/spreadsheets/`

Fetched at runtime by the viewer. Shape: `{ sheets: [ { name, data: [[...]] } ] }`, row 0 = headers.

| File | Size | Sheets | Body rows | Max cols | Cells |
|---|---:|---:|---:|---:|---:|
| `electronics-middle-east-selected-leads.json` | 312 KB | 1 | 250 | 27 | 6,777 |
| `cleaned-premium-fabric-import-buyer-shortlist.json` | 288 KB | 7 | 459 | 21 | 6,066 |
| `automotive-showroom-lead-intelligence.json` | 139 KB | 2 | 129 | 22 | 2,700 |
| `philippines-vip-approachable-lead-intelligence.json` | 80 KB | 4 | 145 | 15 | 1,728 |
| `saudi-riyadh-jeddah-55-lead-intelligence.json` | 73 KB | 6 | 124 | 18 | 1,378 |
| `china-interior-markets-100plus.json` | 40 KB | 4 | 216 | 4 | 880 |
| `middle-east-interiors-fitout-whatsapp-expanded.json` | 31 KB | 1 | 25 | 31 | 806 |
| `laminate-events-in-india.json` | 9 KB | 1 | 24 | 12 | 300 |
| **TOTAL** | **984 KB** | **26** | **1,372** | — | **20,635** |

Rendered as an unvirtualised `<table>`; the largest single sheet puts 6,777 cells in the DOM from one 312 KB fetch.

---

## 11. ICONS

| Source | Count | Notes |
|---|---|---|
| `lucide-react` | 32 imported across the app | Tree-shaken into the JS bundle, not separate files. Sizes 11–28 px, stroke 1.5–2.5 |
| Custom inline SVG — WhatsApp glyph | 1 path, **duplicated in two files** | Defined identically in `src/App.tsx:42` and `src/components/CadAutomationSection.tsx:26` |
| Custom inline SVG — hero skill icons | 6 | Heroicons-style paths, hand-inlined in `App.tsx` |
| Custom inline SVG — verified tick | 1 | Instagram blue `#0095f6`, `aria-label="Verified account"` |
| Decoration SVGs | 7 components | `SakuraPetal`, `SakuraBlossom`*, `SakuraBranch`, `CornerCrosshairs`, `CompassRing`, `BlueprintAccent`*, `FloatingSakuraField` — *starred two are never rendered |
| `BackgroundGrid` pattern | 1 | Inline `<pattern>`, global |

**53 `<svg>` elements render on the homepage; 27 of them have no `aria-hidden`.** The `CompassRing` contains literal `<text>` glyphs `N`, `E`, `S`, `W` which are exposed to assistive technology (verified live).

**No icon font, no sprite sheet, no external icon CDN.**

---

## 12. FONTS

Loaded via a single `@import` on line 1 of `src/index.css` (Google Fonts, `display=swap`):

| Family | Requested range | Actually used | Font files downloaded |
|---|---|---|---|
| Playfair Display | 400–900, italic + roman | Yes — all headings (`.serif`) | 1 woff2 |
| Plus Jakarta Sans | 200–800, italic + roman | Yes — body default | 2 woff2 |
| **Outfit** | 300–800 | **NO — zero usages** | 0 |

The `--font-display: "Outfit"` token and the `.display` CSS class exist in `index.css` but **no element in the entire codebase uses either** (verified by grep and by `document.fonts` showing all Outfit faces `unloaded`).

**Loading chain (measured):** main CSS finishes at 50 ms → Google Fonts CSS request starts at 52 ms → woff2 files start at 59–60 ms. A three-hop serial dependency with **no `preconnect`, no `preload`, and no self-hosting**.

**No monospace font is loaded**, yet `font-mono` is applied in ~20 places (phone numbers, CAD chips, step labels, zoom %) — these fall back to the OS default monospace.

---

## 13. ORPHANED ASSETS (in `public/`, referenced nowhere)

| File | Size |
|---|---:|
| `/regenerated_image_1777361976700.png` | 780 KB |
| `/portfolio/cad-automation/cad-automation-hero.webp` | 304 KB |
| `/portfolio/cad-automation/hero-ceiling.webp` | 296 KB |
| `/portfolio/cad-automation/hero-flooring.webp` | 288 KB |
| `/portfolio/cad-automation/toilet-3d-input.webp` | 256 KB |
| `/portfolio/cad-automation/stair-wall-input.webp` | 84 KB |
| **TOTAL DEAD WEIGHT** | **≈ 2,008 KB** |

All six are publicly reachable by direct URL. *(`favicon.jpg` also matched the orphan scan of `src/`, but it is referenced from `index.html` and is genuinely in use.)*

**Referenced-but-missing assets: NONE.** Every image, video, and download path referenced in `src/` resolves to a real file.

---

## 14. ASSET REUSE MAP

| Asset | Used in N places |
|---|---|
| `sakura-bg.png` | 3 — Projects card 5 bg, Experience card 3 bg, Websites project 2 `thumbnail` (unrendered) |
| `master-bathroom-plan.webp` | 3 galleries + the §05 output panel |
| `master-bathroom-render-input.webp` | 3 |
| `master-bathroom-plan-input.webp` | 3 |
| `ig-thumb-1.png` | 2 — Experience card 4 bg, Websites project 3 `thumbnail` (unrendered) |
| `ig-thumb-2.png` | 2 — Experience card 2 bg, Websites project 1 `thumbnail` (unrendered) |
| `excel-placeholder-poster.webp` | 2 — Projects card 3 bg, all 8 B2B `poster` fields (unrendered) |
| `cigar-lounge-ceiling.webp` | 2 galleries |
| `cigar-lounge-flooring.webp` | 2 galleries |
| `master-bathroom-elevation.webp` | 2 galleries |
| `sultanah-…-poster.webp` | 2 — video poster + Projects card 2 bg |
| `render-2.webp` | 2 — visualisations grid + Projects card 4 bg |
| `startup/logo.webp` | 2 — homepage band + startup hero |
| `startup/hero.webp` | 2 — homepage band + startup hero (with two different alt strings) |
| `favicon.jpg` | 2 — `icon` + `apple-touch-icon` |

**Because Instagram-derived thumbnails are reused as Experience-card wallpaper at 5 % opacity, three 700–800 KB images are downloaded on the homepage for a visual effect that is nearly invisible.**

---

## 15. ALT-TEXT SUMMARY

| Page | `<img>` count | Missing `alt` | Empty `alt=""` | Notes |
|---|---:|---:|---:|---|
| Homepage | 3 | 0 | 0 | portrait + Ciyato logo + Ciyato hero. **All decorative card imagery is CSS `background-image`, so it carries no alt and is correctly invisible to AT** |
| CAD | 17 | 0 | 0 | all descriptive drawing titles |
| Videos | 0 | — | — | 9 `<video>`, none with `aria-label` or captions |
| B2B list | 0 | — | — | |
| Spreadsheet viewer | 0 | — | — | |
| Visualisations | 49 | 0 | 0 | all generic auto-numbered titles |
| Websites | **0** | — | — | thumbnails defined in data, never rendered |
| Startup | 11 | 0 | 0 | descriptive |

**No `<img>` on the site is missing an `alt` attribute, and none is broken** (verified live on every route). The weakness is alt *quality* on the 49 renders, not alt *presence*.

**No image on the site is wrapped in a link.** Images either do nothing or open a modal via a `div` click handler.


---

# 05 — NAVIGATION & LINK AUDIT

**Audit date:** 2026-08-11 · Every outbound URL was requested with a real browser User-Agent. Every internal route was loaded and rendered.

---

## 1. DESKTOP HEADER (≥ 768 px)

| Property | Behaviour |
|---|---|
| **Element** | `<nav>`, `position: fixed`, top 0, width 100 %, `z-40`, height 64 px |
| **Background** | `bg-white/85` + `backdrop-blur-sm`, 1 px bottom border `black/10` |
| **Container** | `max-w-5xl` (1024 px) — **narrower than the homepage content container (1152 px)**, so the nav's right edge sits inboard of the content's right edge at ≥1024 px |
| **Logo** | Text `CG.` — Playfair Display 20 px / 600 / tracking −0.5 px. Links to `#home`. **No image, no SVG mark.** Hover changes nothing (`hover:text-black` on already-black text) |
| **Links** | HOME · ABOUT · SERVICES · PROJECTS · STARTUP · CONTACT — 10 px, uppercase, 600, tracking 0.1em, 32 px gaps |
| **Dropdowns** | **NONE** |
| **CTA in header** | **NONE** — no "Contact me" or WhatsApp button in the bar |
| **Sticky behaviour** | Permanently fixed. No shrink, no hide-on-scroll-down, no shadow-on-scroll |
| **Active state** | **NONE** — the current section/page is never highlighted |
| **Hover state** | `hover:text-black` on text that is already `#000` → **no visible hover feedback on any nav link** |
| **Focus state** | **NONE VISIBLE** — verified live: focusing a nav link yields `outline-style: none`, `box-shadow: none` |

### Nav link behaviour is context-dependent (`handleNavLinkClick`, `src/App.tsx:431`)

| Item | On the homepage | On a sub-route |
|---|---|---|
| Home / About / Services / Projects / Contact | Native anchor jump to `#<id>` | `preventDefault` → sets `window.location.hash` → 50 ms `setTimeout` → `scrollIntoView({behavior:'smooth'})` |
| Startup | `preventDefault` → sets hash to `/startup` → `scrollTo(top)` | same |

**Consequence:** from any sub-route, clicking About/Services/Projects/Contact returns to the homepage and scrolls. This works, but relies on a 50 ms timer racing the re-render.

---

## 2. MOBILE HEADER (< 768 px)

| Property | Behaviour |
|---|---|
| **Trigger** | 36 × 36 px `<button>`, `aria-label="Toggle navigation menu"`, lucide `Menu` ↔ `X` |
| **Panel** | Renders **below** the 64 px bar, in normal flow inside `<nav>`. Full width, measured **225 px tall** at 360 px |
| **Style** | Solid white, 1 px top border, padding 24 px, vertical flex, 16 px gaps; items 12 px uppercase 600 |
| **Open animation** | `opacity 0→1`, `y −10→0` (motion/react) |
| **Close animation** | **NONE** — not wrapped in `AnimatePresence`, so it disappears instantly |
| **Closes on link click** | Yes — `setMobileMenuOpen(false)` is the first statement in the handler |
| **Closes on outside click** | **NO — there is no backdrop element** (verified live) |
| **Closes on `Esc`** | **NO — no key handler exists** |
| **Body scroll lock** | **NO** — `body` stays `overflow: visible` while the menu is open (verified live) |
| **Focus trap / return** | **NONE** |
| **Overflow** | 6 items at 225 px fits every tested viewport; no internal scrolling needed |
| **CTA in mobile menu** | **NONE** — no phone, WhatsApp, or contact affordance in the panel |

**DOM duplication:** the desktop link list stays in the DOM (hidden by `hidden md:flex`). With the panel open the page contains **13 nav anchors** — the logo plus two complete copies of the six nav items (verified live). Assistive technology and crawlers see both.

---

## 3. FOOTER

| Property | Behaviour |
|---|---|
| **Link groups** | **NONE** — the footer has no column structure, no sitemap, and **no navigation links back into the site** |
| **Social profiles** | 2 icons — Instagram (`aria-label="Visit on Instagram"`), WhatsApp (`aria-label="Message on WhatsApp"`). Text labels are `opacity-0` and appear **on hover only** |
| **Contact links** | 3 — WhatsApp UK, WhatsApp India, Instagram `@xiyato22` |
| **Email address** | **NONE** |
| **Phone (`tel:`)** | **NONE** — both numbers link to WhatsApp, not to the dialer |
| **Postal address** | **NONE** |
| **Legal links** | **NONE** — no privacy, terms, cookies, or imprint |
| **Copyright** | No `©` symbol; only the text `PORTFOLIO 2026 • CHAITANYA GAIKWAD` |
| **Back-to-top** | **NONE** |

---

## 4. COMPLETE LINK REGISTER

### 4.1 — Internal anchors (homepage sections)

| Label | Href | Type | Status |
|---|---|---|---|
| `CG.` (logo) | `#home` | ANCHOR / INTERNAL | **WORKING** |
| HOME | `#home` | ANCHOR | **WORKING** |
| ABOUT | `#about` | ANCHOR | **WORKING** |
| SERVICES | `#services` | ANCHOR | **WORKING** |
| PROJECTS | `#projects` | ANCHOR | **WORKING** |
| CONTACT | `#contact` | ANCHOR | **WORKING** |
| STARTUP | `#startup` | ANCHOR → intercepted to route `/startup` | **WORKING** |
| VIEW PORTFOLIO | `#projects` | ANCHOR | **WORKING** |
| LET'S CONNECT | `#contact` | ANCHOR | **WORKING** |
| `BACK TO HOME` (CAD, Startup) | `#home` | ANCHOR | **WORKING** |
| `BACK TO PROJECTS` (Videos, B2B, Visualisations, Websites) | `#projects` | ANCHOR | **WORKING** |
| `BACK TO B2B RESEARCH` (viewer) | `#/projects/b2b-research` | INTERNAL ROUTE | **WORKING** |
| `Back to list` (invalid slug) | `#/projects/b2b-research` | INTERNAL ROUTE | **WORKING** |

> `#startup-preview` exists as a section `id` but **no link anywhere targets it** — orphan anchor.

### 4.2 — Internal routes

| Label | Href | Type | Status |
|---|---|---|---|
| EXPLORE CIYATO LAUNCHER | `#/startup` | INTERNAL ROUTE | **WORKING** |
| VIEW DATA × 8 | `#/projects/b2b-research/<slug>` | INTERNAL ROUTE | **WORKING** (all 8 verified) |
| **5 × project category cards** | *(no href — `div onClick`)* | **NOT A LINK** | See §5 |

### 4.3 — Downloads

| Label | Href | Type | Status |
|---|---|---|---|
| DOWNLOAD × 8 (B2B list) | `/projects/downloads/<name>-redacted.xlsx` | DOWNLOAD (`download` attr) | **WORKING** — all 8 files exist |
| Download Portfolio Copy (viewer) | same 8 files | DOWNLOAD | **WORKING** |
| Download (CAD lightbox) | current `.webp` src | DOWNLOAD (`download` attr, renamed) | **WORKING** |

### 4.4 — External links (all verified live)

| Label | URL | Type | HTTP | `target` | `rel` | Status |
|---|---|---|---|---|---|---|
| WhatsApp UK (5 instances) | `https://wa.me/447882746212` | WHATSAPP | 200 → `api.whatsapp.com/send/?phone=447882746212…` | `_blank` | `noopener noreferrer` | **WORKING / REDIRECT** |
| WhatsApp India (4 instances) | `https://wa.me/917028311226` | WHATSAPP | 200 → `api.whatsapp.com/send/?phone=917028311226…` | `_blank` | `noopener noreferrer` | **WORKING / REDIRECT** |
| Start a CAD Project | `wa.me/447882746212?text=…` | WHATSAPP | 200 | `_blank` | `noopener noreferrer` | **WORKING** |
| Generate / Generate CAD → | `wa.me/447882746212?text=…` | WHATSAPP | 200 | `_blank` | `noopener noreferrer` | **WORKING** |
| Ciyato enquiry × 2 | `wa.me/…?text=…` | WHATSAPP | 200 | `_blank` | `noopener noreferrer` | **WORKING** |
| `@xiyato22` (×2) | `https://www.instagram.com/xiyato22` | EXTERNAL | 200 | `_blank` | `noopener noreferrer` | **RESOLVES** — profile existence UNVERIFIED, see below |
| `@sultanahco` | `https://www.instagram.com/sultanahco/` | EXTERNAL | 200 | `_blank` | `noopener noreferrer` | **RESOLVES** |
| `@redchandelier.studio` | `https://www.instagram.com/redchandelier.studio/` | EXTERNAL | 200 | `_blank` | `noopener noreferrer` | **RESOLVES** |
| `@erenodesignstudio` | `https://www.instagram.com/erenodesignstudio/` | EXTERNAL | 200 | `_blank` | `noopener noreferrer` | **RESOLVES** |
| `@fitout360uae` | `https://www.instagram.com/fitout360uae/` | EXTERNAL | 200 | `_blank` | `noopener noreferrer` | **RESOLVES** |
| `@jovialdecoure` | `https://www.instagram.com/jovialdecoure/` | EXTERNAL | 200 | `_blank` | `noopener noreferrer` | **RESOLVES** |
| VISIT LIVE WEBSITE (1) | `https://chaitanya-gaikwad.vercel.app/` | EXTERNAL | 200 | `_blank` | `noopener noreferrer` | **WORKING — but this is the same site the visitor is on** |
| VISIT LIVE WEBSITE (2) | `https://xiyora.vercel.app` | EXTERNAL | 200 | `_blank` | `noopener noreferrer` | **RESOLVES** — content UNVERIFIED |
| VISIT LIVE WEBSITE (3) | `https://anvikshikijournal.in/` | EXTERNAL | 200 | `_blank` | `noopener noreferrer` | **RESOLVES** |

> **HTTP 200 is not proof of existence for these hosts.** A control test confirmed Instagram returns **200 for a deliberately nonsensical handle**, and `xiyora.vercel.app` returns **200 for a nonexistent path** (SPA catch-all). Whether each of the 6 Instagram profiles and the Xiyora site actually contain the claimed content requires manual confirmation — logged in doc 11.

### 4.5 — Link types that do **not** appear anywhere

`MAILTO` — none · `TEL` — none · `LinkedIn` — none · calendar/booking links — none · `sms:` — none · RSS — none · any third-party embed — none.

---

## 5. VERIFIED NAVIGATION DEFECTS

### 5.1 — The portfolio is unreachable by keyboard *(highest-impact finding)*
The five project category cards are `<div onClick={…}>` with `cursor-pointer`. Live DOM query on `#projects`:
- **focusable elements: 0**
- elements with `cursor: pointer`: **40**

Consequences: not tabbable · not activatable by Enter/Space · no `href` for crawlers or link previews · cannot be middle-clicked, ⌘/Ctrl-clicked, or "open in new tab" · no status-bar URL preview on hover.

The same pattern applies to every project/render/CAD tile and to the CAD `<h4>` titles.

### 5.2 — No visible focus indicator anywhere
`focus:outline-none` is applied to the mobile menu button (`App.tsx:1689`) and the spreadsheet search input (`App.tsx:655`) **with no replacement style**. Measured on a focused nav link: `outline-style: none`, `box-shadow: none`. There is no `:focus-visible` rule in the project. A keyboard user cannot see where they are.

### 5.3 — No hover feedback on nav links
All six use `hover:text-black` while already rendering at `#000`.

### 5.4 — Substring routing is fragile
Matching is `String.includes()` on the whole URL, in a fixed order. Any future URL containing `startup`, `cad-automation`, `b2b-research`, or `projects/videos` anywhere in its path or query will be captured by the earlier rule.

### 5.5 — Every path returns HTTP 200
`/nonsense-xyz-404-test` renders the complete homepage with status 200 (verified). Broken inbound links, typos, and removed URLs all silently resolve to the homepage. Search engines treat this as a soft 404.

### 5.6 — Duplicate URL forms with no canonical
Each page answers on both `/#/route` and `/route`, across three hostnames. `/#/startup`, `/startup`, `https://www.xiyato.uk/startup`, and `https://chaitanya-gaikwad.vercel.app/startup` all serve identical content with no `rel=canonical`.

### 5.7 — Modal content has no URL
Five overlays (CAD lightbox, video modal, renders lightbox, startup lightbox, mobile menu) hold substantial content but cannot be linked, shared, bookmarked, or returned to with the Back button.

### 5.8 — Back button does not close overlays
No overlay pushes history state. Pressing Back while a lightbox is open navigates away from the page instead of closing the overlay.

---

## 6. USER JOURNEYS CURRENTLY AVAILABLE

### 6.1 — Journeys that work

| # | Journey | Steps | Notes |
|---|---|---|---|
| 1 | Homepage → WhatsApp | 1 click from the hero | The **shortest and most prominent** conversion path |
| 2 | Homepage → Projects → category → back | 2 clicks + back | Mouse/touch only (§5.1) |
| 3 | Homepage → CAD page → lightbox → WhatsApp (pre-filled) | 3 clicks | The **only journey with a contextual, pre-filled CTA** |
| 4 | Homepage → B2B → workbook viewer → search rows → download `.xlsx` | 3–4 clicks | The deepest interactive journey |
| 5 | Homepage → Videos → autoplay on scroll → maximise modal | 1 click + scroll | |
| 6 | Homepage → Visualisations → lightbox → arrow through 49 | 2 clicks | |
| 7 | Homepage → Websites → external live site | 2 clicks | Leaves the site |
| 8 | Homepage → Startup (nav or band) → screenshot lightbox → WhatsApp | 2–3 clicks | Only nav item pointing at a real page |
| 9 | Any sub-route → nav → homepage section | 1 click | |
| 10 | Homepage → footer → Instagram / WhatsApp | 1 click | |

### 6.2 — Journeys that do **not** exist

- **Services → enquiry.** All 9 service cards are inert. There is no path from "I want this service" to "contact" other than scrolling to the footer.
- **Project → enquiry.** No project page, card, or lightbox (except CAD) offers a CTA.
- **Experience → anything.** The 6 cards link only outward to Instagram — off-site.
- **Category → related category.** Sub-routes link only back to `#projects`; no cross-navigation.
- **Project → project.** No next/previous between projects; only within a lightbox.
- **Any journey via email.** No email address exists on the site.
- **Any journey via a form.** No form exists.
- **Any journey to a CV/résumé.** None exists.
- **Keyboard-only journey into the portfolio.** Blocked entirely by §5.1.

### 6.3 — Conversion surface summary

Every conversion on this site is **WhatsApp or Instagram**. There are 9 WhatsApp links and 8 Instagram links across the site, and **0 forms, 0 email addresses, 0 phone-dialer links, 0 booking links**.

WhatsApp CTA distribution:
- Homepage hero — 2 (no pre-filled message)
- Homepage footer — 2 (no pre-filled message)
- CAD page — 3 (pre-filled, contextual)
- Startup page — 2 (pre-filled, contextual)
- Videos / Visualisations / Websites / B2B / viewer pages — **0**

**Four of the eight pages offer no contact affordance at all** beyond the header nav.


---

# 06 — RESPONSIVE AUDIT

**Audit date:** 2026-08-11 · Headless Chromium, real viewport resizes. Widths below 768 px ran with mobile device emulation (touch points, mobile UA).

> **Screenshots could not be captured.** The browser pane was not composited in this environment, so every `screenshot` call timed out. In place of images, every claim below is a **numeric DOM measurement** taken at that viewport — overflow is measured as `documentElement.scrollWidth > clientWidth`, element bounds via `getBoundingClientRect()`, and layout via computed `grid-template-columns`. This is logged in doc 11.

---

## 1. BREAKPOINT SYSTEM

Tailwind v4 defaults, unmodified (there is no `tailwind.config`, and `@theme` in `index.css` overrides only fonts and three colours):

`sm` 640 px · `md` 768 px · `lg` 1024 px · `xl` 1280 px · `2xl` 1536 px

**Only `sm`, `md` and `lg` are used in the codebase.** `xl` and `2xl` appear nowhere, so **nothing changes between 1024 px and 4K** — the layout is frozen above `lg`.

---

## 2. MEASUREMENT MATRIX — HOMEPAGE

| Requested width | Measured viewport | H-scroll | Content overflow | H1 size | Container | Gutter/side | Portrait | Nav | Skill columns | CTA cols | Projects | Services | Experience | Doc height | Screens |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **1920** | 1905 | No | none | 96 px | 1152 px | **377 px** | 266 px | desktop | visible | 4 | 2 | 3 | 2 | 6,093 px | 5.6 |
| **1440** | 1425 | No | none | 96 px | 1152 px | **137 px** | 266 px | desktop | visible | 4 | 2 | 3 | 2 | 6,093 px | 6.8 |
| **1280** | 1265 | No | none | 96 px | 1152 px | 57 px | 266 px | desktop | visible | 4 | 2 | 3 | 2 | 6,093 px | 7.6 |
| **1024** | 1009 | No | none¹ | 96 px | 1009 px | 24 px | 266 px | desktop | visible | 4 | 2 | 3 | 2 | 6,185 px | 8.1 |
| **768** | 753 | No | none | 72 px | 753 px | 24 px | 221 px | desktop | visible | 2 | 2 | 2 | 2 | 7,125 px | 7.0 |
| **430** | 430 | No | none | 36 px | 430 px | 24 px | 192 px | hamburger | **hidden** | 2 | 1 | 1 | 1 | 10,536 px | 11.3 |
| **390** | 390 | No | none | 36 px | 390 px | 24 px | 192 px | hamburger | **hidden** | 2 | 1 | 1 | 1 | 10,702 px | **12.7** |
| **360** | 360 | No | none | 36 px | 360 px | 24 px | 192 px | hamburger | **hidden** | 2 | 1 | 1 | 1 | 10,931 px | **13.7** |

¹ At 1024 px, eight elements report bounds past the viewport edge. All eight are the two decorative Sakura branch SVGs (deliberately offset `-left-12` / `-right-12`) and their child nodes; every one is clipped by an ancestor with `overflow: hidden`. **Not a defect.**

**HEADLINE RESULT: there is no horizontal scrolling and no content overflow at any tested width, from 360 px to 1920 px.** Verified on the homepage and on all seven sub-routes.

---

## 3. WHAT CHANGES AT EACH BREAKPOINT

### Above 1024 px — nothing changes
The content container is capped at `max-w-6xl` (1152 px) on the homepage and `max-w-5xl` (1024 px) on every sub-route. At 1920 px this leaves **377 px of empty margin on each side** of the homepage, and **448 px per side** on sub-routes. The design does not use the extra width for any purpose.

The header container is `max-w-5xl` while the homepage body is `max-w-6xl`, so **above 1024 px the nav bar's content is 128 px narrower than the page content beneath it** and the two right edges do not align.

### 1024 px (`lg`) — desktop layout established
- CTA grid → 4 columns; Services → 3 columns
- H1 stays at 96 px (`lg:text-8xl`) — the largest it ever gets
- Startup hero H1 → 72 px; CAD intro H2 → 60 px
- The CAD "Client Input → Output" arrow rotates from 90° (stacked) to 0° (horizontal)
- Bio/Experience split becomes 5 / 7 columns

### 768 px (`md`) — the largest single jump
Crossing below 768 px:
- Desktop nav links → **hidden**; hamburger → **shown**
- **Both hero skill columns disappear** — 6 icons, 6 labels, and 6 sub-labels removed. This is the site's only statement of its tool stack (AutoCAD, Midjourney, React, Vite, Excel), and mobile visitors never see it
- H1 96 px → 72 px
- Services 3 cols → 2; Projects stays 2; Startup band and CAD intro stack
- CAD featured projects 3 cols → 1
- Helper text `Click cards or thumbnails to launch full drawing gallery` → hidden
- Lightbox `Esc to exit` hint → hidden

### 640 px (`sm`)
- Projects, Services and Experience → 1 column
- Hero badge swaps `MARKETING & B2B SPECIALIST` → `MARKETING & B2B`
- Both decorative Sakura branches → hidden
- H1 72 px → 36 px (**no 60 px `sm` step is reached in practice — the drop is 72 → 36 in one move**)
- CAD lightbox: `Generate` button and the zoom −/+ cluster → hidden; mobile hint pill → shown
- Startup gallery 3 cols → 2

---

## 4. HIDDEN / REORDERED CONTENT

| Content | Hidden below | Impact |
|---|---|---|
| 6 hero skill blocks (18 strings) | 768 px | **The only place tools are named.** Lost on mobile |
| 2 Sakura branch decorations | 640 px | Cosmetic |
| Compass ring decoration | 768 px | Cosmetic |
| `MARKETING & B2B SPECIALIST` | 640 px | Shortened, not lost |
| Nav link row | 768 px | Replaced by hamburger |
| `Click cards or thumbnails…` helper | 768 px | Discoverability hint lost where it matters most |
| `Esc to exit` hint | 768 px | Irrelevant on touch |
| Lightbox `Generate` button + zoom cluster | 640 px | Partly replaced by `Generate CAD →` and pinch-zoom |

| Content | Shown only below | |
|---|---|---|
| Hamburger button | 768 px | |
| `MARKETING & B2B` | 640 px | |
| `Pinch to zoom · Swipe to navigate` | 640 px | |
| `Generate CAD →` | 640 px | |

**No content is reordered at any breakpoint** — grids reflow but DOM order is constant everywhere.

---

## 5. TYPOGRAPHY SCALING

| Element | 360–639 | 640–767 | 768–1023 | ≥1024 |
|---|---|---|---|---|
| Hero H1 | 36 px | 60 px | 72 px | **96 px** |
| Section H2 (`Projects`, `Services`, …) | 48 px | 48 px | 48 px | 48 px |
| Category page H1 | 48 px | 48 px | 48 px | 48 px |
| Startup H1 | 48 px | 48 px | 48 px | 72 px |
| CAD intro H2 | 48 px | 48 px | 48 px | 60 px |
| Body copy | 12 px | 14 px | 14 px | 14 px |
| Nav links | 12 px (panel) | 10 px | 10 px | 10 px |
| Role badges | 9 px | 10 px | 10 px | 10 px |
| Button labels | 10 px | 10 px | 10 px | 10 px |
| Experience period | 8 px | 8 px | 8 px | 8 px |

**Only the hero H1 and two page H1s scale.** Every section heading is a fixed 48 px at all widths — a 48 px serif heading on a 360 px screen occupies a third of the viewport width. Body copy and all UI text are **fixed-size and never scale**; the smallest are 8 px (Experience period, `PRIVACY STATUS` label) and 9 px (tag chips, card eyebrows).

---

## 6. TOUCH-TARGET AUDIT (measured at 390 px and 430 px)

**11 interactive elements fall below the 44 × 44 px minimum on the homepage.** Measured examples:

| Element | Size | Deficit |
|---|---|---|
| `CG.` logo link | 32 × 28 px | both axes |
| Hamburger button | 36 × 36 px | both axes |
| `EXPLORE CIYATO LAUNCHER` | 249 × 40 px | height |
| `@sultanahco` | 121 × 20 px | height |
| `@redchandelier.studio` | 179 × 20 px | height |
| `@erenodesignstudio` | 167 × 20 px | height |
| `@fitout360uae` | 133 × 20 px | height |
| `@jovialdecoure` | 136 × 20 px | height |

The five Instagram links in the Experience cards are 20 px tall — less than half the recommended minimum — and sit inside cards that are themselves not clickable.

The four hero CTA buttons measure ~150 × 46 px at 360 px and **do** meet the target.

---

## 7. HOVER-ONLY INTERACTIONS (no touch equivalent)

| Interaction | Where | On touch |
|---|---|---|
| `SpotlightCard` cursor-follow gradient | 5 project cards | Never appears |
| Video control pill (`opacity-0` → `group-hover:opacity-100`) | 9 video cards | **Play/pause and mute are effectively invisible on touch until tapped**; tapping the card opens the modal instead |
| Social icon labels `INSTAGRAM` / `WHATSAPP` | Footer | Labels never appear — icons stay unlabelled visually |
| Card border darkening | Services, B2B, Websites | Never |
| Image `scale` on hover | all galleries | Never |
| Experience card `y −3` lift | 6 cards | Never |
| `EXPLORE CATEGORY` 6 px translate | 5 cards | Never |
| Background image opacity 0.05 → 0.08 | Experience cards | Never |

**The video control pill is the significant one:** on a touch device the play/pause and mute buttons are rendered at `opacity: 0`, so the only discoverable action is tapping the card, which opens the full-screen modal.

---

## 8. PER-ROUTE RESPONSIVE NOTES

| Route | Mobile behaviour | Verified issues |
|---|---|---|
| **Homepage** | Clean; 10,931 px tall at 360 px = **13.7 screens** | Skill columns lost; 11 small tap targets |
| **CAD** | All sections stack; 3-up featured grid → 1-up; input/output arrow rotates 90° | 17 eager-loaded 3200 px images on a phone connection |
| **Videos** | 3-up → 1-up, 9:16 cards near full width | Control pill hover-only; 9 parallel MP4 range requests |
| **B2B list** | 2-up → 1-up; the 2-col button row holds | Sheet chip reads `1 SHEETS` |
| **Spreadsheet viewer** | See §9 | **The most compromised page on mobile** |
| **Visualisations** | 3-up → 1-up, 49 lazy tiles | Lightbox arrows sit close to the image edges |
| **Websites** | 3-up → 1-up | Shortest page; no images at any width |
| **Startup** | 5-up gallery → 2-up; hero stacks | Clean |

---

## 9. SPREADSHEET VIEWER ON MOBILE — measured at 360 px

| Measurement | Value |
|---|---|
| Page horizontal scroll | **No** (correctly contained) |
| Scroll container `overflow-x` | `auto` |
| Container client width | **326 px** |
| Table width | **10,093 px** |
| Ratio | **31 × the container** |
| Rows rendered | 55 |
| `<td>` nodes in the DOM | 990 |
| Search input width | 278 px |
| Sheet tab buttons | 128–200 px wide, 32–34 px tall — wrap to multiple rows |

The table is correctly wrapped so the *page* never scrolls sideways, but reading one row requires ~10,000 px of horizontal scrolling inside a 326 px window, with no frozen first column, no card/stacked view, and no column hiding. The largest workbook (`electronics-middle-east-selected-leads`, 250 rows × 27 columns) puts **6,777 cells** in a single unvirtualised table.

---

## 10. LAYOUT DEFECTS FOUND

| # | Finding | Severity |
|---|---|---|
| 1 | Homepage is 13.7 screens tall at 360 px with no in-page navigation, no section jumps, and no back-to-top | High |
| 2 | Hero skill blocks (the only tool disclosure) vanish below 768 px | High |
| 3 | Video control pill is `opacity-0` until hover — no touch path to play/pause/mute | High |
| 4 | Spreadsheet table is 31× the viewport on mobile | High |
| 5 | 11 tap targets below 44 px, including five 20 px-tall links | Medium |
| 6 | Section headings fixed at 48 px on 360 px screens | Medium |
| 7 | Nothing uses the space above 1024 px; 377 px empty margin per side at 1920 px | Medium |
| 8 | Header container (1024 px) and homepage container (1152 px) do not align above 1024 px | Low |
| 9 | Mobile menu has no backdrop, no `Esc`, and no body-scroll lock | Medium |
| 10 | Experience cards are fixed at `h-[280px]` with `line-clamp-4`; longer descriptions are silently truncated at every width | Low |
| 11 | H1 jumps 72 px → 36 px across the `sm` boundary (the 60 px step is skipped in practice) | Low |
| 12 | The CAD "Flexible File Formats" panel is `justify-between` with one child — half the panel is permanently empty | Low |

## 11. WHAT IS CORRECT

- **Zero horizontal overflow at every tested width on every route** — the single strongest result of this audit
- No overlapping elements detected at any width
- No broken grids, no clipped text, no truncated buttons (all WhatsApp buttons verified un-truncated at 360 px)
- All images and videos scale without distortion (`object-cover` / `object-contain` used consistently)
- Wide content (the data table) is correctly contained in its own scroll context
- The mobile menu fits every tested viewport without internal scrolling
- Grid reflow (3 → 2 → 1) is applied consistently across every card grid on the site


---

# 07 — DESIGN SYSTEM INVENTORY

**Audit date:** 2026-08-11 · Values are computed styles read from the live site, cross-checked against `src/index.css` and the JSX.

---

## 0. HOW THE SYSTEM IS DEFINED

There is **no `tailwind.config` file**. Tailwind v4 runs through `@tailwindcss/vite` with configuration expressed entirely in a 37-line `src/index.css`.

The complete design-token declaration is:

```css
@theme {
  --font-sans:    "Plus Jakarta Sans", "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-serif:   "Playfair Display", serif;
  --font-display: "Outfit", sans-serif;
  --color-warm-bg:     #ffffff;
  --color-warm-ink:    #000000;
  --color-warm-accent: #000000;
}
```

**Six tokens. That is the entire design system.** Everything else — every spacing value, radius, shadow, size, and opacity — is a Tailwind utility written inline in the JSX. There are no component classes, no `@apply`, no CSS modules, and no styled-components.

Two of the three colour tokens hold the same value (`--color-warm-ink` and `--color-warm-accent` are both `#000000`), so `text-warm-accent` and `text-warm-ink` render identically. `--font-display` is defined but never used.

**Two styling dialects coexist:** `CadAutomationSection.tsx` consistently uses the token utilities (`text-warm-ink/75`, `border-warm-ink/10`, `text-warm-accent`), while `App.tsx` mostly uses raw utilities (`text-black/75`, `border-black/10`). Both compile to the same output.

---

## 1. TYPOGRAPHY

### 1.1 — Families

| Role | Family | Loaded | Used |
|---|---|---|---|
| Body / UI | **Plus Jakarta Sans** (200–800, + italic) | Yes — 2 woff2 | Yes, default on `<body>` |
| Headings | **Playfair Display** (400–900, + italic) | Yes — 1 woff2 | Yes, via the `.serif` class |
| Display | **Outfit** (300–800) | Requested in the CSS `@import` | **NO — zero usages site-wide** |
| Monospace | *(none loaded)* | — | `font-mono` used in ~20 places → falls back to the OS default |

Delivery: one `@import` (line 1 of `index.css`) to Google Fonts with `display=swap`. No `preconnect`, no `preload`, not self-hosted. Measured chain: main CSS → fonts CSS (52 ms) → woff2 (59 ms).

Applied as two utility classes:
```css
.serif   { font-family: var(--font-serif); }
.display { font-family: var(--font-display); }   /* never used */
```

### 1.2 — Heading hierarchy (measured)

| Level | Family | Size | Weight | Tracking | Line-height | Where |
|---|---|---|---|---|---|---|
| H1 hero | Playfair Display | 36 → 60 → 72 → **96 px** | 600 | **−2.4 px** (−0.025em) | 120 px | Homepage only |
| H1 category | Playfair Display | 48 px (fixed) | 400 | normal | 48 px | Videos, B2B, Visualisations, Websites |
| H1 startup | Playfair Display | 48 → 72 px | 400 | normal | `leading-none` | Startup |
| H2 section | Playfair Display | **48 px (fixed at every width)** | 400 | normal | 48 px | Projects, Services, Experience, Let's connect |
| H2 sub | Plus Jakarta Sans | 16 → 18 px | 700 | normal | snug | Hero bio line |
| H3 card | Playfair Display | 18 / 20 / 24 / 30 px | 400–600 | normal | 33 px @24 px | Service, project, workbook, website cards |
| H4 | Playfair Display | 18–20 px | 600 | normal | tight | CAD sub-cards |
| H4 panel | Plus Jakarta Sans | 10 px | 700 | widest | — | `APPROACH`, `KEY STRENGTHS` |

**Only three headings scale with viewport.** Every section H2 is a fixed 48 px from 360 px to 1920 px.

### 1.3 — Body & UI scale (all fixed-size)

| Size | Weight | Transform | Tracking | Typical use |
|---|---|---|---|---|
| 16 px | 400 | none | normal | Footer body, base |
| 14 px | 400 | none | relaxed | Section body copy (`text-sm`) |
| 12 px | 400 | none | relaxed | Card body copy (`text-xs`) |
| 11 px | 400–800 | none / upper | 1.1 px | Card descriptions, skill labels, disclaimer |
| **10 px** | 600–800 | uppercase | 1–2 px (0.1–0.2em) | **Nav links, all eyebrows, all buttons, footer** |
| **9 px** | 600–700 | uppercase | wider | Tag chips, card meta, category pills |
| **8 px** | 700 | uppercase | wider | Experience period, `PRIVACY STATUS` |

**The dominant UI size on this site is 10 px uppercase at weight 600–800 with wide tracking.** It is used for the navigation, every section eyebrow, every button label, and the footer. 8 px and 9 px are used for real content, not just decoration.

### 1.4 — Text transformations
`uppercase` is applied to: all nav links, all eyebrows, all button labels, all tag chips, all badges, all card meta, all step labels, the footer, and the role badges. Sentence case survives only in headings and body paragraphs.

---

## 2. COLOUR

### 2.1 — Core palette — effectively two colours

| Role | Value |
|---|---|
| Page background | `#ffffff` (pure white, set on `body`) |
| Foreground | `#000000` (pure black, set on `body`) |
| Accent | `#000000` — **the accent token is black; there is no accent colour** |

### 2.2 — The real palette is opacity steps of black

| Token | Compiled | Measured contrast on white | Use |
|---|---|---|---|
| `black` | `#000000` | 21.0 : 1 | Headings, body, buttons |
| `black/80` | `oklab(0 0 0 / 0.8)` | ~13 : 1 | Table cells |
| `black/75` | | ~11 : 1 | Card body |
| `black/70`, `/65`, `/60` | | 5.7–7.9 : 1 | Secondary body |
| `black/50` | | **3.95 : 1** | Footer copy, social icons — **fails WCAG AA** |
| `black/40` | | **2.85 : 1** | Card meta, periods, descriptors, `PRIVATE` — **fails WCAG AA** |
| `black/30` | | **2.10 : 1** | Role-badge dots — **fails** |
| `black/20`, `/10`, `/5`, `/2` | | — | Borders, fills, wash |

Borders: `black/5` (cards), `black/10` (nav, panels, dividers), `white/10`–`/20` (dark surfaces).

### 2.3 — Non-monochrome colours (the complete list)

| Colour | Value | Where |
|---|---|---|
| WhatsApp green | `#25D366` | 9 circular badges |
| Green 700/800 | Tailwind | `Phone & Email Redacted`, sheet-count chips, `CheckCircle2` ticks |
| Instagram gradient | `linear-gradient(135deg,#F9CE34 0%,#EE2A7B 45%,#D62976 65%,#962FBF 82%,#4F5BD5 100%)` | 6 Instagram badges |
| Instagram blue | `#0095f6` | 5 verified ticks |
| Amber 500/800/400/300 | Tailwind + `#F59E0B`, `#FDE68A` | `CURRENTLY IN DEVELOPMENT` ×2; the Bahrain banner and its BorderBeam |
| Neutral 100/200/800/900/950 | Tailwind | Portrait placeholder, background blurs, Bahrain gradient, lightbox chrome |

**Every one of these enters through a third-party brand (WhatsApp, Instagram) or a single status treatment (amber = in development, green = redacted/verified).** The site has no colour of its own.

### 2.4 — Gradients

1. Instagram brand gradient (6 uses)
2. `bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900` — Bahrain banner, the only dark surface
3. BorderBeam travelling gradient `#F59E0B → #FDE68A → transparent`
4. SpotlightCard radial `rgba(0,0,0,0.08)`, 400 px, cursor-tracked
5. Two background blur blobs `bg-neutral-200/40` and `/30`

---

## 3. LAYOUT

### 3.1 — Containers

| Container | Width | Used by |
|---|---|---|
| `max-w-6xl` | **1152 px** | Homepage `<main>` |
| `max-w-5xl` | **1024 px** | Nav bar, CAD, Videos, B2B, Visualisations, Websites, Startup |
| `max-w-[1600px]` | **1600 px** | Spreadsheet viewer only |
| `max-w-3xl` / `2xl` / `xl` / `sm` | 768 / 672 / 576 / 384 px | CTA panels, copy blocks, CTA grid |

Horizontal padding: `px-6` (24 px) everywhere except the viewer (`px-4 sm:px-10`).
**Three different page widths across eight pages, and the nav does not match the homepage.**

### 3.2 — Grids

| Pattern | Breakpoints | Used by |
|---|---|---|
| 1 → 2 | md | Projects (5 cards), B2B (8), Experience (6, at `sm`) |
| 1 → 2 → 3 | sm, lg | Services (9), CAD capabilities (12), CAD features (6), Startup features (6) |
| 1 → 2 → 3 | md, lg | Videos (9), Visualisations (49), Websites (3) |
| 1 → 2 → 4 | sm, lg | CAD workflow (4) |
| 2 → 3 → 4 → 5 | sm, md, lg | Startup screenshots (9) |
| 2 → 4 | lg | Hero CTA buttons |
| 12-col | lg / md | CAD intro (6/6), CAD input-output (5/2/5), Experience (5/7), Startup hero (7/5), Startup build (6/6), viewer header (2/1) |

### 3.3 — Spacing

Section rhythm: `py-24` (96 px) on homepage sections; `py-12 md:py-20` on the hero; `space-y-20` between CAD blocks; `space-y-24` between Startup blocks.
Grid gaps: 12 / 16 / 24 / 32 / 40 / 48 / 64 px. Card padding: 24 / 32 / 48 / 64 px.
Section dividers: 1 px `border-b border-black/10`.
**No spacing scale is declared** — values are picked per-instance from Tailwind's default scale.

### 3.4 — Border radii — 11 distinct values in use

| Value | Utility | Applied to |
|---|---|---|
| 8 px | `rounded-lg` | File-format chips |
| 12 px | `rounded-xl` | Icon tiles, mosaic images |
| 16 px | `rounded-2xl` | Hero CTA buttons, skill icon tiles, Approach panels |
| 17.6 px | `rounded-[1.1rem]` | Ciyato logo (homepage) |
| 20 px | `rounded-[1.25rem]` | Ciyato logo (startup) |
| 28.8 px | `rounded-[1.8rem]` | CAD preview mosaics, render tiles |
| 32 px | `rounded-[2rem]` | Service cards, render tiles, Startup cards |
| 36.8 px | `rounded-[2.3rem]` | Video card inner |
| 40 px | `rounded-[2.5rem]` | Project cards, workbook cards, CAD cards, video shells |
| 48 px | `rounded-[3rem]` | CTA panels, quality-control panel |
| 9999 px | `rounded-full` | Pills, badges, circular buttons |

The visual signature is **very large radii (40–48 px)** on cards and panels. There is no radius scale — five of the eleven are arbitrary bracket values.

---

## 4. UI COMPONENTS

### 4.1 — Buttons (no shared component; every button is styled inline)

| Variant | Style | Instances |
|---|---|---|
| Primary solid | black bg, white text, 10–12 px uppercase 600–800, `rounded-full` or `rounded-2xl`, `shadow-md` | ~14 |
| Secondary tinted | `bg-black/5` (or `bg-warm-ink/5`), black text, `rounded-full` | ~10 |
| Outline | `border-warm-ink/20`, transparent | 1 (`View Drawing Samples`) |
| WhatsApp black pill | black bg + 20 px `#25D366` circle + monospace number | 2 (hero) |
| WhatsApp green pill | `bg-[#25D366]/10`, `text-green-800`, green border | 2 (startup) |
| Sheet tab | active = black/white; inactive = white + `border-black/5` | per workbook |
| Icon-only | white on `white/15`, circular, `border-white/20` | lightboxes |
| Text/back link | `ArrowLeft` + 10 px uppercase, no chrome | 7 |

**No disabled state, no loading state, no pressed state, and no focus state is defined for any button variant.**

### 4.2 — Inputs
Exactly one input exists site-wide (the spreadsheet row filter): `rounded-full`, `border-black/10`, `shadow-inner`, 12 px, `focus:outline-none focus:border-warm-accent` — **and since `warm-accent` is `#000000` on a `black/10` border, the focus change is a subtle border darkening with the outline removed.** No label, no error state, no helper text. No other form control of any kind exists.

### 4.3 — Cards — 7 distinct treatments

| Type | Radius | Background | Border | Shadow | Hover |
|---|---|---|---|---|---|
| Service | 32 px | white | `black/5` → black | `shadow-sm` | border |
| Project category | 40 px | image, `brightness .4` | `black/10` | `shadow-sm` | image `scale 1.05` + spotlight |
| Experience | 32 px | white + 5 % image wash | `black/5` | `shadow-sm` | `y −3`, wash → 8 % |
| Workbook | 40 px | white | `black/5` → black | `shadow-sm` | border |
| Video | 40 px | `white/40` | `black/5` | none | control pill fades in |
| Render tile | 32 px | `white/40` | `black/5` | none | `scale 1.03` + black wash |
| CAD project | 40 px | white | `black/5` → `warm-accent/30` | `shadow-sm` | border |

### 4.4 — Tags, badges, chips

| Kind | Style |
|---|---|
| Tag chip | 9 px 600, `bg-black/5` or white, `rounded` / `rounded-full`, `text-black/60` |
| Sheet count | 9 px 700 uppercase, `bg-green-800/10`, `text-green-800` |
| Status (dev) | 8–9 px 700 uppercase, `bg-amber-500/10`, `text-amber-800`, amber border, `rounded-full` |
| Category pill (CAD) | 9 px 700 uppercase white on `bg-black/65` + `backdrop-blur-md`, `rounded-full` |
| Count chip (CAD) | 9 px monospace 700 white on `bg-black/75` + `backdrop-blur-md` |
| Concept count | 10 px 700 uppercase on `bg-black/10`, `rounded-full` |
| QC badge | 9 px 700 uppercase + green `CheckCircle2`, white card, `rounded-2xl` |
| File format | 12 px monospace 700, white on black, `rounded-lg` |
| `PRIVATE` | 8 px 700 uppercase, `bg-warm-ink/5`, `rounded` |
| Eyebrow | 10 px 700 uppercase, tracking 0.2em — **the most repeated element on the site** |

### 4.5 — Navigation
See doc 05. Fixed bar, `bg-white/85` + `backdrop-blur-sm`, 64 px, no active state, no hover state, no focus state, no CTA.

### 4.6 — Modals
4 lightbox/modal variants (see doc 02). **None has `role="dialog"`, `aria-modal`, a focus trap, or body-scroll lock** (verified live). Backdrops: `black/90`, `black/95`, `black/95 + blur-md`, solid black. Only the CAD lightbox and the startup lightbox label their arrow buttons.

### 4.7 — Accordions, tabs, carousels
**Accordions: none. Carousels: none.** Tabs exist in exactly one place — the spreadsheet sheet switcher — implemented as plain `<button>`s with no `role="tab"`, no `aria-selected`, and no arrow-key navigation.

---

## 5. VISUAL EFFECTS

| Effect | Implementation | Where |
|---|---|---|
| Shadows | `shadow-sm` (most cards) · `shadow-md` (hero buttons, badges) · `shadow-lg` (skill tiles, CTA panel) · `shadow-xl` (CAD hero, startup hero, Bahrain banner) · `shadow-2xl` (portrait, lightbox images) · `shadow-inner` (search input) | throughout |
| Blur / glass | `backdrop-blur-sm` (nav, video modal, renders lightbox) · `backdrop-blur-md` (video control pill, CAD pills, startup lightbox) · `blur-3xl` (2 background blobs) | throughout |
| Spotlight | `SpotlightCard` — 400 px radial `rgba(0,0,0,0.08)` following the cursor, 300 ms fade | 5 project cards |
| Border beam | `BorderBeam` — 300 px gradient on `offset-path: rect(…)`, 10 s infinite linear, masked to the border box | Bahrain banner only |
| Texture | 3.5 %-opacity SVG dot-matrix, fixed, full viewport | global |
| Image treatments | `brightness(0.4)` (project cards) · `brightness(0.95)` (render tiles) · `opacity 0.05→0.08` (experience wash) · `opacity-90` (CAD inputs) · `imageRendering: -webkit-optimize-contrast` (all CAD images) | |
| Parallax | **NONE** — `useParallaxMotion` exists in the codebase but is imported nowhere | |
| Cursor effects | Spotlight only. No custom cursor, no magnetic buttons | |
| Selection | `selection:bg-black selection:text-white` | global |

---

## 6. MOTION

Library: `motion` v12 (Framer Motion) — `motion`, `AnimatePresence`, `useScroll`, `useSpring`.

| Category | Pattern | Values |
|---|---|---|
| Page entrance | hero block | `opacity 0→1`, `y −15→0`, 0.8 s |
| | portrait | `opacity 0→1`, `scale 0.93→1`, 0.8 s, delay 0.2 s |
| | bio | `opacity 0→1`, `y 15→0`, 0.8 s, delay 0.3 s |
| | CTA grid | `opacity 0→1`, `y 10→0`, 0.8 s, delay 0.45 s |
| Scroll-triggered | project cards | `whileInView`, `viewport once`, stagger `idx × 0.05 s` |
| | service cards | `whileInView`, `viewport once`, stagger `i × 0.03 s` |
| | video / workbook / render / website cards | `animate` on mount, stagger `idx × 0.05 s` |
| Scroll-linked | progress bar | `useSpring(scrollYProgress, {stiffness 100, damping 30, restDelta 0.001})` → `scaleX` |
| Ambient loop | 5 sakura petals | `y`/`x`/`rotate` 5-keyframe loops, 8–12 s, delays 0–4 s, `repeat: Infinity`, `easeInOut` |
| Ambient loop | BorderBeam | 10 s infinite linear |
| Hover | scale 1.02–1.05 (images, tiles), `y −3`/`−4` (cards), translate-x 1.5 (chevron) | 300–700 ms |
| Modal | `AnimatePresence` fade in/out | opacity only |
| Loading | spinner (`animate-spin`) in the spreadsheet viewer | |
| Text animation | **NONE** — no typewriter, split, or reveal effects |
| Page transitions | **NONE** — route changes swap content instantly, with no exit animation |

**Reduced motion: not handled anywhere.** `prefers-reduced-motion` appears **zero times** in the codebase (verified by grep). At the same time, **69 elements on the homepage carry an active animation or transition**, including 5 petals and the border beam that loop forever.

---

## 7. WHAT THE SYSTEM DOES NOT HAVE

- No design tokens for spacing, radii, shadows, or type scale — only 6 tokens, 3 of them fonts
- No accent colour (the accent token is black)
- No dark mode, no `prefers-color-scheme` handling
- No reusable Button, Card, Badge, Section, or Container component — every instance is styled inline
- No focus-visible styles anywhere; two places actively remove the outline
- No `prefers-reduced-motion` handling
- No component library, no Storybook, no visual documentation
- No responsive type scale beyond three headings
- No empty/error/disabled/loading states outside the spreadsheet viewer


---

# 08 — TECHNICAL AUDIT

**Audit date:** 2026-08-11 · Live host `https://xiyato.uk` · Source commit `cca00cd`

---

## 1. STACK & BUILD

| Item | Value |
|---|---|
| Framework | React 19.2 + TypeScript 5.8, **no meta-framework** |
| Build tool | Vite 6 (`@vitejs/plugin-react`) |
| CSS | Tailwind v4 via `@tailwindcss/vite`, **no config file** |
| Animation | `motion` v12 (Framer Motion) |
| Icons | `lucide-react` |
| Router | none — hand-rolled hash matching |
| State | React `useState` only; no store, no context, no data layer |
| Hosting | Vercel, edge `bom1` |
| Deploy | auto on push to `main` |
| Build verified | `npm run build` → **succeeds**, 2,090 modules, 33 s |
| Typecheck verified | `npm run lint` (`tsc --noEmit`) → **passes with zero errors** |

**Bundle (live):**

| File | Raw | Compressed |
|---|---:|---:|
| `assets/index-JR0ohsl4.js` | 529,338 B | **146,121 B** |
| `assets/index-DffWhNEv.css` | 56,877 B | 9,722 B |
| `index.html` | 1,496 B | — |

Vite emits a chunk-size warning: *"Some chunks are larger than 500 kB after minification."* **There is no code splitting** — `projects.json` (75 KB of project data) and every page renderer are bundled into one JS file that must download before anything renders.

### 1.1 — `tsconfig.json` has no `strict`
`strict`, `noUnusedLocals`, `noUnusedParameters`, and `noImplicitAny` are all absent. The passing typecheck is therefore a weak guarantee.

### 1.2 — Unused dependencies shipped in `package.json`
`express` ^4.21.2, `dotenv` ^17.2.3, `@google/genai` ^1.29.0, and `@types/express` — **zero imports anywhere in `src/`** (verified by grep). `vite.config.ts` still injects `process.env.GEMINI_API_KEY`, which is never read. Leftovers from an AI Studio scaffold, together with `.env.example` documenting `GEMINI_API_KEY` and `APP_URL`.

---

## 2. RENDERING & SEO

### 2.1 — The site is 100 % client-rendered
The HTML served to every crawler is 1,496 bytes and its entire `<body>` is:
```html
<body><div id="root"></div></body>
```
**No heading, no paragraph, no link, no image is present in the server response.** Every word of content — nine services, six roles, 49 renders, eight workbooks — exists only after JavaScript executes. There is no SSR, no SSG, no prerender, no `react-snap`.

### 2.2 — Metadata is static and identical on all 15 URLs

| Tag | Status |
|---|---|
| `<title>` | Present — **one value for the whole site** |
| `meta description` | Present — **one value for the whole site** |
| `canonical` | **ABSENT on every route** |
| `meta robots` | Absent (defaults to index,follow) |
| `og:type`, `og:title`, `og:description` | Present |
| `og:url` | Present — **`https://chaitanya-gaikwad.vercel.app/`, not `xiyato.uk`** |
| **`og:image`** | **ABSENT** |
| `twitter:title`, `twitter:description` | Present |
| **`twitter:card`** | **ABSENT** — without it, Twitter/X renders no card |
| **`twitter:image`** | **ABSENT** |
| `html lang="en"` | Present |
| JSON-LD / schema.org | **ABSENT** — 0 `application/ld+json` scripts (verified live) |

**Practical effect:** sharing any page of this site to WhatsApp, Instagram DM, LinkedIn, or Slack produces a text-only preview with the same title and description, attributed to the `vercel.app` domain.

### 2.3 — Crawler files
`robots.txt`, `sitemap.xml`, and any web manifest **do not exist**. Requesting them returns HTTP 200 with `Content-Type: text/html` and the SPA shell — an actively misleading response for a crawler.

### 2.4 — Heading hierarchy

| Route | H1 | Issue |
|---|---|---|
| Homepage | `Chaitanya Gaikwad` | Correct — exactly one H1 |
| **CAD** | **none** | Page starts at H2 |
| Videos / B2B / Visualisations / Websites / Viewer / Startup | one each | Correct |

Homepage order: H1 → H2 → H2 → H3×5 → H2 → H2 → H3×9 → H2 → H3×6 → H4×2 → H2. No skipped levels; the two H4s (`APPROACH`, `KEY STRENGTHS`) sit after H3 card titles, which is acceptable.

**Semantic landmarks (homepage):** `<nav>` 1 · `<main>` 1 · `<section>` 5 · `<footer>` 1 · **`<header>` 0** · `<article>` 0 · `<aside>` 0. The nav is a bare `<nav>` with no wrapping `<header>`. Sub-routes render into a plain `<div>` — **no `<main>` on any sub-route**.

---

## 3. PERFORMANCE

### 3.1 — Measured

| Metric | Value |
|---|---|
| TTFB (warm edge) | **11 ms** |
| DOMContentLoaded (warm cache) | 98 ms |
| Load (warm cache) | 100 ms |
| Homepage requests | **14** |
| `X-Vercel-Cache` | `HIT` |
| HTML response | 1,496 B |

### 3.2 — Cold-load payload (computed from verified file sizes)

| Resource | Size |
|---|---:|
| JS (compressed) | 143 KB |
| CSS (compressed) | 10 KB |
| Google Fonts CSS + 3 woff2 | ~90 KB *(estimated)* |
| `ig-thumb-2.png` | 790 KB |
| `ig-thumb-3.png` | 740 KB |
| `ig-thumb-1.png` | 728 KB |
| `sakura-bg.png` | 521 KB |
| `cad-automation/hero-plan.webp` | 300 KB |
| `portrait.jpg` | 176 KB |
| `startup/hero.webp` | 116 KB |
| `posters/excel-placeholder-poster.webp` | 61 KB |
| `renders/render-2.webp` | 78 KB |
| `posters/sultanah-…-poster.webp` | 44 KB |
| `startup/logo.webp` | 27 KB |
| **Homepage total** | **≈ 3.7 MB** |

**2,779 KB of that — 75 % of the homepage image weight — is four PNGs, three of which are painted at 5 % opacity behind Experience-card text.** `hero-plan.webp` (300 KB, 3200 px) is downloaded for a card background rendered under a `brightness(0.4)` filter.

### 3.3 — Caching is misconfigured for static assets

```
Cache-Control: public, max-age=0, must-revalidate
```
This header is returned for **content-hashed bundles** (`index-JR0ohsl4.js`), for every image, and for the 31 MB MP4. Hashed filenames are immutable by construction and should carry `max-age=31536000, immutable`. As configured, every asset is revalidated on every visit. `vercel.json` contains no `headers` block.

### 3.4 — Image optimisation

| Issue | Evidence |
|---|---|
| No responsive images | **0 uses of `srcset`, `sizes`, or `<picture>`** in the codebase |
| No width/height attributes | **0 `<img>` carries intrinsic dimensions** → every image is a CLS risk |
| Oversized delivery | 13 CAD drawings are 3200 px wide, displayed at 116–287 px. `portrait.jpg` is 1024 px, displayed at 192–266 px. The four homepage PNGs are 1024 px, used as low-opacity washes |
| PNG where WebP belongs | 5 PNGs totalling 3,559 KB; the same content as WebP would be a fraction of that |
| Favicon | 173 KB, 1024 × 1024 JPEG |
| No CDN image pipeline | Vercel Image Optimization is not enabled; all files are served raw from `public/` |

### 3.5 — Lazy loading is inconsistent

| Page | Images | `loading="lazy"` | `eager`/default |
|---|---:|---:|---:|
| Homepage | 3 | 0 | **3** |
| **CAD** | 17 | **0** | **17 (explicitly `eager`)** |
| Visualisations | 49 | **49** | 0 |
| Startup | 11 | 9 | 2 |
| Websites | 0 | — | — |

The CAD page explicitly sets `loading="eager"` on all 17 full-resolution drawings — roughly 3.2 MB forced on first paint.

### 3.6 — Video loading

All 9 `<video>` elements use `preload="metadata"`. **Verified live: entering `#/projects/videos` fires nine simultaneous HTTP 206 range requests**, one per MP4, before any user interaction. An `IntersectionObserver` (`threshold: 0.5`) then autoplays the centred card, progressively downloading the full file — up to 31 MB for the Bahrain ad. There is no adaptive bitrate, no resolution ladder, and no poster-only fallback.

### 3.7 — Font loading chain
Measured: main CSS ends 50 ms → Google Fonts CSS request 52 ms → woff2 59–60 ms. Three serial hops, caused by `@import` at the top of `index.css`. **No `preconnect` to `fonts.gstatic.com`, no `preload`, not self-hosted.** A third family (Outfit) is requested in the CSS but used by nothing.

### 3.8 — Rendering cost
- The spreadsheet viewer renders an **unvirtualised table**; the largest workbook produces **6,777 `<td>` nodes** from a 312 KB fetch
- The visualisations page mounts **49 lazy images plus 49 `motion.div`s**
- The homepage carries **69 elements with an active animation or transition**, including 5 infinitely looping petals and a looping border beam
- Route changes re-render the entire tree (one `currentHash` string drives everything); there is no `React.memo`, `useMemo`, or `useCallback` anywhere

---

## 4. CONSOLE & NETWORK ERRORS

| Route | Console |
|---|---|
| Homepage, CAD, Videos, B2B, Visualisations, Websites, Startup | **Clean — no errors, no warnings** |
| `#/projects/b2b-research/<invalid-slug>` | **1 error:** `SyntaxError: Unexpected token '<', "<!doctype "... is not valid JSON` |

**Cause of the error:** the viewer fetches `/data/spreadsheets/<slug>.json`; the Vercel catch-all rewrite returns the SPA shell with **HTTP 200**, so the `res.ok` guard passes and `res.json()` throws. It is caught and logged, and the UI correctly shows `Workbook not found` — but the guard is ineffective by design.

**Broken image requests: none.** Verified on every route: 0 images with `naturalWidth === 0`.
**Failed network requests: none**, apart from the 9 deliberate MP4 range aborts.

---

## 5. ACCESSIBILITY

### 5.1 — Codebase-wide grep result
Across all of `src/`, the total number of occurrences of `aria-hidden`, `role=`, `tabIndex`, `onKeyDown`, `prefers-reduced-motion`, and `focus-visible` is **zero**. The only matches for `focus:` are:

- `src/App.tsx:1689` — `focus:outline-none` on the mobile menu button
- `src/App.tsx:655` — `focus:outline-none` on the search input

**The only two accessibility-related style rules in the project both remove a focus indicator.**

### 5.2 — Verified failures

| # | Finding | Evidence | WCAG |
|---|---|---|---|
| 1 | **The entire portfolio is keyboard-inaccessible.** The 5 category cards are `div onClick` | `#projects` contains **0 focusable elements** and **40 `cursor:pointer` elements** | 2.1.1 Keyboard (A) |
| 2 | **No visible focus indicator anywhere** | Focused nav link → `outline-style: none`, `box-shadow: none` | 2.4.7 Focus Visible (AA) |
| 3 | **Low-contrast text used for real content** | `black/40` = **2.85 : 1** (card meta, periods, `PRIVATE`, descriptors, footer strapline); `black/50` = **3.95 : 1**; `black/30` = **2.10 : 1**. All at 8–10 px | 1.4.3 Contrast (AA) |
| 4 | **No `prefers-reduced-motion` support** with 69 animated elements including infinite loops | grep: 0 occurrences | 2.3.3 (AAA) / best practice |
| 5 | **Modals are not dialogs** — no `role="dialog"`, no `aria-modal`, no focus trap, no focus return, no scroll lock | Opening the renders lightbox leaves `document.activeElement === BODY`; `body` stays `overflow: visible` | 4.1.2, 2.4.3 |
| 6 | **Icon-only buttons without labels** in the renders lightbox (close, prev, next) | 3 buttons, no `aria-label` | 4.1.2 Name, Role, Value (A) |
| 7 | **Decorative SVG exposed to AT** — the compass ring's `<text>` glyphs read as "N E S W" straight after the navigation | `document.body.innerText` contains `N E S W`; 27 of 53 SVGs lack `aria-hidden` | 1.1.1 |
| 8 | **Unlabelled input** — the search field has no `<label>`, no `aria-label`, no `name` | verified live | 3.3.2 Labels (A) |
| 9 | **Sheet tabs are not tabs** — plain buttons, no `role="tab"`/`tablist`, no `aria-selected`, no arrow-key support | | 4.1.2 |
| 10 | **Duplicated nav in the DOM** — 13 nav anchors when the mobile panel is open (two full copies of six items) | verified live | 4.1.1 |
| 11 | **Data table lacks semantics** — no `<caption>`, no `scope` on `<th>`, no `aria-describedby` | | 1.3.1 |
| 12 | **11 touch targets below 44 px**, five of them 20 px tall | measured at 390 px | 2.5.5 (AAA) / 2.5.8 (AA) |
| 13 | **No skip-to-content link** | | 2.4.1 Bypass Blocks (A) |
| 14 | **Video has no captions, transcript, or accessible name** on any of 9 files | | 1.2.2 (A) |
| 15 | **No `<main>` on any sub-route**; no `<header>` element anywhere | | 1.3.1 |
| 16 | **Content requires JavaScript** — with JS off, the page is empty | | 4.1.1 / robustness |

### 5.3 — What is correct
- **Every `<img>` on the site has an `alt` attribute** — 0 missing across all routes (quality is weak on the 49 renders, but presence is complete)
- Decorative card imagery is CSS `background-image`, correctly invisible to AT
- `aria-label` is present on: the hamburger, the video control buttons, the social icon links, the Experience Instagram links, the verified tick, the CAD lightbox arrows, and the startup lightbox arrows
- `html lang="en"` is set
- Semantic `<nav>`, `<main>`, `<section>`, `<footer>` on the homepage
- Heading order is logical with no skipped levels
- All external links use `rel="noopener noreferrer"` with `target="_blank"`

### 5.4 — Contrast measurement caveat
Two readings in the raw sweep (1.00 : 1 and 1.39 : 1) are **measurement artifacts**, not real failures: the first is white text over a background image, the second is black text over an `oklab` translucent-white nav that resolves to white in practice. They are excluded from §5.2 above.

---

## 6. SECURITY & HEADERS

| Header | Value | Assessment |
|---|---|---|
| `Strict-Transport-Security` | `max-age=63072000` | Present (Vercel default). No `includeSubDomains`, no `preload` |
| `Access-Control-Allow-Origin` | `*` | Vercel default for static assets |
| `Content-Security-Policy` | **ABSENT** | |
| `X-Frame-Options` / `frame-ancestors` | **ABSENT** | The site can be framed by any origin |
| `X-Content-Type-Options` | **ABSENT** | |
| `Referrer-Policy` | **ABSENT** | |
| `Permissions-Policy` | **ABSENT** | |
| TLS | Valid, `ssl_verify_result = 0` | |
| HTTP → HTTPS | 308 Permanent Redirect | Correct |

**No secrets are exposed in the client bundle.** `GEMINI_API_KEY` is wired into `vite.config.ts` `define`, but since the variable is unset at build time it compiles to `undefined` and is never referenced. `.gitignore` correctly excludes `.env*`.

**Note for the record:** the GitHub personal access token supplied for cloning is now stored in plaintext in `.git/config` of the local clone. It should be rotated and the remote re-pointed at a credential helper.

---

## 7. 404, REDIRECT, AND HOST BEHAVIOUR

| Test | Result |
|---|---|
| `/nonsense-xyz-404-test` | **HTTP 200** + full homepage rendered |
| `/robots.txt`, `/sitemap.xml`, `/manifest.json` | **HTTP 200** + SPA shell, `Content-Type: text/html` |
| `/projects`, `/about` | HTTP 200 + homepage (fall through the router ladder) |
| `/startup`, `/cad-automation`, `/projects/videos`, `/projects/b2b-research/<slug>` | HTTP 200 + **the correct page** (clean-path deep links work) |
| `http://` → `https://` | 308 Permanent Redirect ✓ |
| `www` → apex | **NO REDIRECT** — `www.xiyato.uk` serves 200 with an identical ETag |
| `chaitanya-gaikwad.vercel.app` | **NOT REDIRECTED** — serves 200 |

**There is no 404 page and no way to produce a 404 status.** Combined with the missing canonical, three hostnames × two URL forms per page means each page is reachable at **six or more distinct URLs**, all returning 200 with identical metadata.

---

## 8. LIGHTHOUSE — APPROXIMATION

> **Lighthouse could not be executed in this environment** (no CLI available, and the browser pane does not composite). The figures below are **reasoned estimates derived from the measured evidence above**, not tool output. They are flagged as unverified in doc 11 and should be re-run with the real tool before being quoted.

| Category | Est. | Drivers (all measured) |
|---|---|---|
| **Performance (mobile)** | **~35–55** | ~3.7 MB cold homepage; 2.78 MB of it four PNGs; single 529 KB JS chunk with no splitting; no `srcset`; no width/height (CLS); `max-age=0` on hashed assets; 3-hop font chain. Offset by an 11 ms TTFB and only 14 requests |
| **Performance (desktop)** | **~55–75** | same payload, faster network assumption |
| **Accessibility** | **~65–80** | Automated tooling would flag: contrast (`black/40`, `black/50`), unlabelled input, unlabelled icon buttons, missing `role` on tabs. It would **not** catch the most serious issue — the keyboard-inaccessible portfolio — because axe cannot detect a missing `div → a` conversion. **The true accessibility state is materially worse than any automated score will show** |
| **Best Practices** | **~75–90** | No CSP, no `X-Content-Type-Options`, images at wrong intrinsic size; no console errors on normal routes |
| **SEO** | **~70–85** | Passes: `lang`, title, description, viewport, crawlable, no `robots` block. Fails: no canonical, no structured data, no `og:image`, no `twitter:card`, no sitemap, no robots.txt, identical metadata on every page. Lighthouse tests the rendered DOM, so it will **not** penalise the empty server HTML — a real crawler may |

---

## 9. ANALYTICS, INTEGRATIONS, APIs

| Item | Status |
|---|---|
| Analytics | **NONE** — no GA4, no Plausible, no Vercel Analytics, no Speed Insights, no Meta Pixel |
| Tag manager | **NONE** |
| Cookies | **NONE SET** — and therefore no consent banner needed |
| `localStorage` / `sessionStorage` | **NOT USED** |
| Third-party scripts | **NONE** — the only external origin is `fonts.googleapis.com` / `fonts.gstatic.com` |
| Backend / API routes | **NONE** — no `/api`, no serverless functions, no `server.js` |
| Runtime data fetching | One `fetch()` — the spreadsheet JSON loader |
| CMS | **NONE** — all content is hard-coded in TS/JSON and requires a redeploy to change |
| Error tracking | **NONE** |
| Env-dependent behaviour | **NONE at runtime.** `vite.config.ts` disables HMR when `DISABLE_HMR=true` (dev only) |

**There is currently no way to know whether anyone visits this site, which pages they reach, or whether any CTA is ever clicked.**

---

## 10. DEPLOYMENT FILES

| File | Contents |
|---|---|
| `vercel.json` | 5 lines — one catch-all rewrite. **No `headers`, no `redirects`, no `cleanUrls`, no `trailingSlash`** |
| `vite.config.ts` | React + Tailwind plugins, `@` alias, `GEMINI_API_KEY` define, conditional HMR. Contains a mojibake character on line 20 (`Do not modifyâfile watching`) — a UTF-8/CP1252 corruption of an em dash |
| `package.json` | Named `react-example`; scripts `dev` (port 3000), `build`, `preview`, `clean` (uses `rm -rf` — fails on Windows `cmd`), `lint` |
| `.gitignore` | Correct — excludes `node_modules`, `dist`, `.env*`, `.vercel` |
| `.env.example` | Documents `GEMINI_API_KEY` and `APP_URL`, both unused |
| `metadata.json` | **Describes a different project** — `"Disha Singha Portfolio"` |
| `README.md` | **Describes a different person** — begins `Hi I'm Disha,` |
| Lockfiles | **Both `package-lock.json` (154 KB) and `pnpm-lock.yaml` (92 KB) are committed** — two package managers, potentially divergent |
| CI/CD | No `.github/`, no workflows, no tests, no linter config, no formatter config |

### 10.1 — Live bundle vs local build
The live bundle is `index-JR0ohsl4.js` (529,338 B); a fresh local build of `cca00cd` produced `index-yA8G95OQ.js` (529,439 B) — a 101-byte difference. Most likely explanation: caret-ranged dependencies (`motion`, `lucide-react`, `vite`) resolved to newer patch versions locally than at deploy time. **Not confirmed** — logged in doc 11.

---

## 11. DEAD CODE

| Item | Location |
|---|---|
| `AvailabilityBadge` component | `src/components/ui/AvailabilityBadge.tsx` — imported nowhere |
| `SakuraBlossom`, `BlueprintAccent` | `src/components/ui/decorations/` — exported, rendered nowhere |
| `useCursorProximity` | `src/hooks/useCursorProximity.ts` — imported nowhere |
| `useParallaxMotion`, `useParallaxY`, `useParallaxRotation` | `src/hooks/useParallaxMotion.ts` — imported nowhere |
| `src/hooks/index.ts` | barrel for two unused hooks |
| `scripts/verify_m2_hooks.ts` | test harness for those hooks; not wired to any npm script |
| `getAllProjects()` | `src/data/projects.ts:158` — exported, never imported |
| "Available for Acquisition" branch | `src/App.tsx:849,877–885` — unreachable |
| `subtitle` on all 5 categories | `src/data/projects.ts` — never rendered |
| `thumbnail`/`poster` on all 3 websites | never rendered |
| `spreadsheetPreview` on all 8 workbooks | never read (the URL is rebuilt from `slug`) |
| `.display` class / `--font-display` | `src/index.css:7,26` — never used; still triggers a font request |
| `express`, `dotenv`, `@google/genai`, `@types/express` | `package.json` — zero imports |
| `GEMINI_API_KEY` define | `vite.config.ts` |
| 6 orphaned public assets | ≈ 2,008 KB (doc 04 §13) |
| Duplicated `WhatsAppIcon` | defined identically in `App.tsx` and `CadAutomationSection.tsx` |

---

## 12. TECHNICAL FINDINGS, RANKED

| # | Finding | Impact |
|---|---|---|
| 1 | Portfolio unreachable by keyboard (5 `div onClick` cards, 0 focusable elements) | Accessibility — blocking |
| 2 | Zero server-rendered content; every crawler sees an empty `<div>` | SEO — severe |
| 3 | No 404 status; every URL returns 200 + homepage | SEO — severe |
| 4 | 3 hostnames × 2 URL forms, no canonical, no www redirect | SEO — severe |
| 5 | ~3.7 MB homepage, 2.78 MB of it decorative PNGs at 5 % opacity | Performance — high |
| 6 | `max-age=0, must-revalidate` on content-hashed assets and a 31 MB MP4 | Performance — high |
| 7 | No visible focus state anywhere; `focus:outline-none` used twice with no replacement | Accessibility — high |
| 8 | 9 MP4 range requests fire on entering the videos route | Performance — high |
| 9 | 17 eager 3200 px images on the CAD page | Performance — high |
| 10 | Contrast failures at `black/40` (2.85:1) and `black/50` (3.95:1) on real content | Accessibility — high |
| 11 | No `og:image`, no `twitter:card` — every share is a bare text link | Distribution — high |
| 12 | Identical title/description on all 15 URLs | SEO — high |
| 13 | No analytics of any kind | Measurement — high |
| 14 | No sitemap, no robots.txt | SEO — medium |
| 15 | Modals lack dialog semantics, focus trap, and scroll lock | Accessibility — medium |
| 16 | No `prefers-reduced-motion` with 69 animated elements | Accessibility — medium |
| 17 | Unvirtualised 6,777-cell table | Performance — medium |
| 18 | 529 KB single JS chunk, no code splitting | Performance — medium |
| 19 | No `srcset`/`sizes`/`width`/`height` on any image | Performance / CLS — medium |
| 20 | Font `@import` creates a 3-hop blocking chain; a third family is loaded unused | Performance — medium |
| 21 | No security headers beyond HSTS | Security — medium |
| 22 | `App.tsx` is 1,923 lines holding all 8 page templates | Maintainability — medium |
| 23 | `tsconfig` has no `strict` | Maintainability — medium |
| 24 | Two lockfiles committed | Maintainability — low |
| 25 | `README.md` / `metadata.json` describe a different person and project | Housekeeping — low |
| 26 | ~2 MB of orphaned public assets | Housekeeping — low |
| 27 | Console error on invalid workbook slug | Robustness — low |


---

# 09 — CONTACT & FORM AUDIT

**Audit date:** 2026-08-11 · No form was submitted; none exists to submit.

---

## 1. HEADLINE FINDING

**The website has zero `<form>` elements and zero submit paths.**

Verified live on every route: `document.querySelectorAll('form').length === 0`.

Every enquiry on this site leaves through **WhatsApp or Instagram**. There is no email address, no telephone link, no contact form, no booking link, and no file-upload mechanism anywhere on the site.

---

## 2. COMPLETE CONTACT-MECHANISM REGISTER

| Mechanism | Present | Count | Notes |
|---|---|---|---|
| Contact form | **NO** | 0 | |
| Email address / `mailto:` | **NO** | 0 | No email is published anywhere |
| Telephone `tel:` | **NO** | 0 | Two numbers are shown, but both link to WhatsApp, not the dialer |
| WhatsApp | YES | **9 links** | Primary conversion path |
| Instagram | YES | **8 links** | 6 profiles: 1 own + 5 client |
| LinkedIn | **NO** | 0 | |
| Calendar / booking | **NO** | 0 | |
| File upload | **NO** | 0 | |
| CV / résumé download | **NO** | 0 | |
| Newsletter signup | **NO** | 0 | |
| Live chat widget | **NO** | 0 | |
| Physical address | **NO** | 0 | |
| Contact page | **NO** | 0 | `#contact` is a footer anchor on the homepage |

---

## 3. WHATSAPP — FULL INVENTORY

Two numbers are used throughout: **+44 7882 746212** (UK) and **+91 70283 11226** (India).

| # | Page | Location | Label | Pre-filled message | Number |
|---|---|---|---|---|---|
| 1 | Homepage | Hero CTA grid | `+44 7882 746212` | none | UK |
| 2 | Homepage | Hero CTA grid | `+91 70283 11226` | none | IN |
| 3 | Homepage | Footer contact list | `+44 7882 746212` | none | UK |
| 4 | Homepage | Footer contact list | `+91 70283 11226` | none | IN |
| 5 | Homepage | Footer social icon row | `WHATSAPP` (label hover-only) | none | UK |
| 6 | CAD | Main CTA | `Start a CAD Project` | *"Hello, I would like to discuss an AutoCAD drafting project. I have a plan/reference and need editable CAD drawings."* | UK |
| 7 | CAD | Lightbox top bar (≥640 px) | `Generate` | same as #6 | UK |
| 8 | CAD | Lightbox bottom bar (<640 px) | `Generate CAD →` | same as #6 | UK |
| 9 | Startup | CTA | `WhatsApp +44 7882 746212` | *"Hello, I am interested in Ciyato and would like to learn more about the startup."* | UK |
| 10 | Startup | CTA | `WhatsApp +91 70283 11226` | same as #9 | IN |
| — | Websites | *(dead code)* | `Inquire Website Acquisition` | *"Hi Chaitanya, I am inquiring about acquiring the Export Brand Website listed on your portfolio."* | UK |

**Technical form:** all use `https://wa.me/<number>` (some with `?text=`), `target="_blank"`, `rel="noopener noreferrer"`.
**Verified live:** all resolve HTTP 200 and redirect to `https://api.whatsapp.com/send/?phone=…&type=phone_number&app_absent=0`.

**Distribution gap:** the India number appears **only** in the homepage hero, homepage footer, and the Startup CTA. The CAD page — the most developed service page on the site — offers the UK number only.

**Coverage gap:** four of the eight pages (Videos, B2B list, Spreadsheet viewer, Visualisations, Websites) contain **no contact affordance at all** beyond the header nav.

---

## 4. INSTAGRAM — FULL INVENTORY

| # | Page | Location | Handle | `aria-label` | Verified tick shown |
|---|---|---|---|---|---|
| 1 | Homepage | Experience card 1 | `@sultanahco` | `View Sultanah & Co. Interiors on Instagram` | Yes |
| 2 | Homepage | Experience card 2 | `@redchandelier.studio` | `View Red Chandelier Studio on Instagram` | Yes |
| 3 | Homepage | Experience card 4 | `@erenodesignstudio` | `View Ereno Design Studio on Instagram` | Yes |
| 4 | Homepage | Experience card 5 | `@fitout360uae` | `View Fitout 360 Interiors on Instagram` | Yes |
| 5 | Homepage | Experience card 6 | `@jovialdecoure` | `View Jovial Decoure on Instagram` | Yes |
| 6 | Homepage | Footer contact list | `@xiyato22` | — | No |
| 7 | Homepage | Footer social icon row | `INSTAGRAM` (label hover-only) | `Visit on Instagram` | No |

Experience card 3 (`Chinese Company`) shows a `PRIVATE` chip and the italic text `Instagram account not publicly available` instead of a link.

> **Note:** five of the seven Instagram links point at **client** accounts, not the site owner's. The Experience section's only interactive element sends visitors **off-site to a third party**.

---

## 5. THE ONLY INPUT ON THE SITE

The spreadsheet row filter, on `/#/projects/b2b-research/<slug>`.

| Property | Value |
|---|---|
| **FIELDS** | 1 — `<input type="text">` |
| **PLACEHOLDER** | `Search rows...` |
| **LABEL** | **NONE** — no `<label>`, no `aria-label`, no `aria-labelledby` (verified live) |
| **NAME / ID** | **NONE** |
| **REQUIRED FIELDS** | none — the field is optional |
| **VALIDATION** | **NONE** — any string is accepted; no min/max, no pattern, no sanitisation |
| **SUBMISSION ENDPOINT** | **NONE** — no form wrapper, no submit event, no network call. Filtering is local React state |
| **SUCCESS STATE** | rows filter in place; footer updates to `Showing {n} of {n} rows` |
| **ERROR STATE** | none possible |
| **EMPTY STATE** | `No matching records found` |
| **SPAM PROTECTION** | not applicable — nothing is transmitted |
| **WHERE SUBMISSIONS GO** | nowhere — no data leaves the browser |
| **DEBOUNCE** | none — filtering runs on every keystroke across every cell of the active sheet |
| **RESET** | cleared automatically when a different sheet tab is selected |

**Filter logic:** case-insensitive substring match; a row is kept if **any** cell contains the query. Runs over up to 6,777 cells with no memoisation.

---

## 6. DATA COLLECTED BY THE SITE

| Category | Status |
|---|---|
| Form submissions | none — no forms |
| Cookies set | **NONE** (verified) |
| `localStorage` / `sessionStorage` | **NOT USED** |
| Analytics / tracking | **NONE** — no GA, no pixel, no Vercel Analytics |
| Third-party embeds | **NONE** |
| Server-side logging | Vercel platform access logs only |

**The site collects no personal data.** This is why the absence of a privacy policy has not created a live compliance problem — but note that the **outbound** WhatsApp and Instagram links do transfer the visitor to third parties, and Google Fonts is requested from `fonts.googleapis.com` on every page load (an IP-address transfer to Google that some EU interpretations treat as requiring disclosure).

---

## 7. OUTBOUND DATA IN DOWNLOADABLE FILES

The 8 `.xlsx` downloads are the only files the site distributes.

**Redaction claim verified.** The site states `Phone & Email Redacted` and *"Original phone numbers and emails have been safely redacted to safeguard confidentiality."* A pattern scan across all 8 workbooks (unzipped OOXML) and all 8 public JSON previews found:

- **0 email addresses in cell data**
- **0 telephone numbers in cell data**

**The claim holds.**

**Two incidental findings, recorded for completeness:**

1. **Author metadata.** `automotive-showroom-lead-intelligence-redacted.xlsx` and `saudi-riyadh-jeddah-55-lead-intelligence-redacted.xlsx` carry `chaitanyagaikwad022@gmail.com` in `docProps/core.xml` (`dc:creator`). This is the site owner's own address, not client data — but it is publicly downloadable and is **not published anywhere on the site itself**, so it is disclosed unintentionally.

2. **Named third parties in public business-intelligence data.** The spreadsheet viewer publishes, at a public URL with no authentication, columns including `COMPANY / LEAD`, `DECISION-MAKER ROUTE`, `NAMED PERSON PUBLICLY SEEN`, `PUBLIC CONTACT / ROUTE`, `SUGGESTED OUTREACH ANGLE`, `WHY THIS LEAD MATTERS`, and `SOURCE URLS`. Sampled row 1 of `saudi-riyadh-jeddah-55-lead-intelligence` names a company, a named individual with their role, an active project, and a recommended pitch angle — all attributed to public sources. Phone and email are genuinely absent, but **the material is competitive-intelligence content about identifiable companies and people, indexed at a public URL, describing how to approach them.** Whether that is intended is a business decision, not a technical defect — it is recorded here as a fact of the current site, not as a recommendation.

---

## 8. CONVERSION-PATH ANALYSIS

### Paths that exist

| Entry point | Steps to contact | Channel |
|---|---|---|
| Homepage hero | **1 click** | WhatsApp (no context) |
| Homepage footer | 1 click after scrolling ~13 screens on mobile | WhatsApp / Instagram |
| CAD page | 1 click, anywhere on the page | WhatsApp (pre-filled, contextual) |
| CAD lightbox | 1 click while viewing a drawing | WhatsApp (pre-filled) |
| Startup page | 1 click | WhatsApp (pre-filled) |
| Header nav → Contact | 1 click → footer | WhatsApp / Instagram |

### Paths that do not exist

- **Services → enquiry.** All 9 service cards are inert — no link, no CTA, no price, no "discuss this".
- **Project → enquiry.** No video, render, workbook, or website card offers a CTA. Only the CAD page does.
- **Experience → enquiry.** The 6 cards link outward to Instagram only.
- **Email.** No address is published, so no email enquiry is possible.
- **Phone call.** Both numbers are WhatsApp-only; a visitor who wants to call must copy the digits manually.
- **Asynchronous / written enquiry with attachments.** The CAD CTA asks the visitor to *"Send the available layout, measurements and design references"* — but the only channel offered is WhatsApp, and there is no upload field anywhere on the site.
- **Any lead capture.** Nothing is captured; if a visitor does not initiate a WhatsApp message, they leave no trace, and with no analytics installed there is no record they were ever there.

### Channel concentration

**100 % of conversions depend on WhatsApp or Instagram.** A visitor who does not use WhatsApp — common in corporate, US, and much of the EU B2B context, which is precisely the audience the B2B and CAD pages address — **has no way to make contact at all.**


---

# 10 — CURRENT INFORMATION ARCHITECTURE

**Audit date:** 2026-08-11
This document describes the website **as it is today**, not as it should be. No restructuring is proposed here.
It also carries the **content-duplication map** (audit Phase 11), because duplication is a structural property of this IA.

---

## PART A — HIERARCHICAL OUTLINE

```
XIYATO.UK
│   (= www.xiyato.uk = chaitanya-gaikwad.vercel.app — 3 hosts, no canonical, no redirect)
│   (every page also answers on a clean path: /startup as well as /#/startup)
│   (every unmatched path returns HTTP 200 + the full homepage)
│
├── GLOBAL CHROME (all routes)
│   ├── Scroll progress bar
│   ├── Blueprint dot-matrix background + 2 blur gradients
│   └── Fixed header — CG. logo · Home · About · Services · Projects · Startup · Contact
│       └── < 768 px: hamburger → 225 px dropdown panel
│
├── HOME  /
│   ├── 01  HERO  #home
│   │   ├── H1 "Chaitanya Gaikwad"
│   │   ├── 4 role badges (dot-separated)
│   │   ├── Portrait  +  6 skill blocks   ← desktop only, ≥768 px
│   │   ├── Bio: 1 heading + 1 paragraph
│   │   ├── 4 CTA buttons — View Portfolio · Let's Connect · WhatsApp UK · WhatsApp IN
│   │   └── Decorations: 2 sakura branches · compass ring · 2 crosshairs · 5 drifting petals
│   │
│   ├── 02  PROJECTS  #projects            ← the site's only portal into the portfolio
│   │   ├── Card 1 → CAD Drafting
│   │   ├── Card 2 → Cinematic Videos
│   │   ├── Card 3 → B2B Research & Excel Systems
│   │   ├── Card 4 → 3D Renders & Visualisations
│   │   └── Card 5 → Websites Developed
│   │       (all five are div onClick — 0 focusable elements in this section)
│   │
│   ├── 03  STARTUP PREVIEW  #startup-preview   ← orphan anchor, nothing links to it
│   │   └── Logo · dev badge · H2 · paragraph · CTA → /#/startup · hero image
│   │
│   ├── 04  SERVICES  #services
│   │   └── 9 cards — icon + title + description       (no CTA, no link, no price)
│   │
│   ├── 05  ABOUT / EXPERIENCE  #about
│   │   ├── Bio column — 2 paragraphs
│   │   ├── 6 employer cards → outbound Instagram
│   │   └── Approach (2 items)  +  Key Strengths (6 bullets)
│   │
│   └── 06  FOOTER / CONTACT  #contact
│       └── "Let's connect." · WhatsApp ×2 · Instagram · 2 social icons · 2 lines of footer text
│           (no email · no tel: · no form · no legal links · no sitemap links)
│
├── CAD DRAFTING  /#/cad-automation        ← reachable ONLY from Projects card 1
│   ├── 01  Back to Home
│   ├── 02  Intro + 4-tile hero gallery              [H2 — this page has no H1]
│   ├── 03  Bahrain featured banner                  ← the only dark section on the site
│   ├── 04  Featured Projects — 3 cards, 3 galleries
│   ├── 05  Client Input → Editable CAD Output
│   ├── 06  4-Step Production Workflow
│   ├── 07  Quality Control + 6 badges
│   ├── 08  Supported CAD Deliverables — 12 cards
│   ├── 09  File formats — 5 chips
│   ├── 10  CTA — WhatsApp (pre-filled) + View Drawing Samples
│   ├── 11  Disclaimer
│   └── ▸ LIGHTBOX (no URL) — 5 galleries, pan/zoom/pinch, download, WhatsApp
│
├── CINEMATIC VIDEOS  /#/projects/videos
│   ├── Back to Projects · H1 · intro
│   ├── 9 video cards — autoplay at 50 % viewport, one at a time
│   └── ▸ VIDEO MODAL (no URL)
│
├── B2B RESEARCH & EXCEL SYSTEMS  /#/projects/b2b-research
│   ├── Back to Projects · H1 · intro
│   ├── 8 workbook cards — View Data + Download
│   └── SPREADSHEET VIEWER  /#/projects/b2b-research/<slug>     ← 8 dynamic routes
│       ├── Back · H1 · privacy card · Download Portfolio Copy
│       ├── Sheet tabs (1–7 per workbook) + row search
│       ├── Data table — 26 sheets, 1,372 rows, 20,635 cells total
│       └── Row counter footer
│
├── 3D RENDERS & VISUALISATIONS  /#/projects/visualisations
│   ├── Back to Projects · H1 · intro
│   ├── 3D Renders — 6 tiles
│   ├── Visualisations — 43 tiles
│   └── ▸ RENDERS LIGHTBOX (no URL) — 49 items, arrow/keyboard nav
│
├── WEBSITES DEVELOPED  /#/projects/websites            ← shortest page, 0 images
│   ├── Back to Projects · H1 · intro
│   └── 3 cards → 3 external sites
│
└── CIYATO (STARTUP)  /#/startup            ← the only nav item pointing at a real page
    ├── Back to Home
    ├── Hero — logo · dev badge · H1 · lead · body · hero image
    ├── The Vision  |  What Ciyato Is
    ├── Key Features & Intent — 6 cards
    ├── Application Interface Gallery — 9 thumbnails
    ├── Building Ciyato + 5 milestones
    ├── CTA — WhatsApp ×2 (pre-filled)
    └── ▸ SCREENSHOT LIGHTBOX (no URL) — 9 items
```

---

## PART B — STRUCTURAL CHARACTERISTICS OF THE CURRENT IA

### B1 — Depth
Maximum depth is **3 levels**: Home → Projects category → Spreadsheet viewer. Everything else is 2 levels. There is no per-project detail level; individual videos, renders, and websites have no page of their own.

### B2 — The navigation and the content do not agree

| Header nav item | What it actually is |
|---|---|
| Home | homepage anchor |
| About | homepage anchor |
| Services | homepage anchor |
| **Projects** | homepage anchor — **not** the portfolio |
| **Startup** | a real page |
| Contact | homepage anchor |

**Five of six nav items are homepage anchors. Only "Startup" leads to a page.** Meanwhile the six real content pages — CAD, Videos, B2B, Viewer, Visualisations, Websites — appear **nowhere in the navigation**. They are reachable only by clicking a card inside the homepage's Projects grid, and that grid is not keyboard-accessible.

### B3 — The homepage carries almost everything
At 360 px the homepage is 10,931 px tall — **13.7 screens**. It contains the hero, the entire portfolio portal, the startup pitch, all nine services, all six employment entries, the approach statement, the strengths list, and all contact detail. There is no in-page navigation, no section index, and no back-to-top.

### B4 — Sub-routes are leaves
Every sub-route links **back to `#projects`** and nowhere else. There is no cross-navigation between categories, no next/previous project, no related content, and no breadcrumb.

### B5 — Content weight is inverted against business value

| Section | Content volume | Depth of the destination |
|---|---|---|
| 3D Renders & Visualisations | **49 items** — the largest set | 2 boilerplate descriptions, generic numbered titles, zero client context |
| B2B Research | 8 workbooks, 20,635 cells | 1 identical description shared by all 8 |
| Cinematic Videos | 9 items, 86 MB | 1–2 sentences each; no brief, no result |
| **CAD Drafting** | 3 projects, 15 images | **12 sections, workflow, QC, capabilities, disclaimer, contextual CTA** — by far the most developed page |
| Websites | 3 items | 1 paragraph each, no screenshots |
| Startup (Ciyato) | 1 product | 7 sections — the second most developed page |

The two most thoroughly built pages (CAD and Ciyato) sit **furthest from the navigation**. The largest content set (49 renders) has the least information attached to it.

### B6 — Services and portfolio are disconnected
`#services` lists 9 services. The portfolio contains 5 categories. They overlap but do not map onto each other, and **no service card links to its matching portfolio category**:

| Service | Matching portfolio category | Linked? |
|---|---|---|
| Architectural & Interior CAD Drafting | CAD Drafting | **No** |
| AI Visual Content | 3D Renders & Visualisations | **No** |
| AI Video & Short-Form Content | Cinematic Videos | **No** |
| B2B Lead Generation | B2B Research & Excel Systems | **No** |
| Business Research | B2B Research & Excel Systems | **No** |
| Website Creation & Development | Websites Developed | **No** |
| Digital Marketing Support | *no portfolio evidence* | — |
| Outreach & Follow-Up | *no portfolio evidence* | — |
| Automation & Workflow Systems | *no portfolio evidence* | — |

Three of the nine services have no supporting work anywhere on the site.

### B7 — Dead ends
Sections with no onward action of any kind: **Services** (9 cards), **Key Strengths**, **Approach**, **Experience** (links only off-site to Instagram), **Websites** (links only off-site), **Visualisations** (lightbox only), **Videos** (modal only), **B2B viewer** (download only).

**Of eight pages, only two — CAD and Startup — contain a contact CTA.**

---

## PART C — CONTENT DUPLICATION MAP *(audit Phase 11)*

Recorded, not removed.

### C1 — Identical text reused verbatim

| Text | Appears in | Count |
|---|---|---|
| `Professional AutoCAD drafting transforming measurements, hand sketches, and design references into editable DWG, DXF, and PDF drawing packages.` | Services card 1 **and** Projects category card 1 (`CATEGORIES[0].desc`) | **2 — byte-identical, ~200 px apart on the same page** |
| `This workbook was developed to organize B2B intelligence into usable commercial systems…` (full paragraph) | `fullDescription` of **all 8 workbooks**; rendered on all 8 viewer pages | **8** |
| `A high-fidelity rendering study showcasing spatial layout, lighting, furniture design details, and material textures…` | 6 render items (differs only by trailing `Concept NN.`) | **6** |
| `A high-fidelity visual concept exploring texture matching, spatial arrangement, lighting design, and creative aesthetics…` | 43 visualisation items (differs only by `Concept NN.`) | **43** |
| `Directed the "Moon Chair" cinematic campaign and created premium factory-to-showroom reel concepts…` | Experience card 1 **and** video project 1 `fullDescription` | **2** |
| `Lead Intelligence, Market Mapping & Outreach Workflows` | `subcategory` on all 8 workbooks + category subtitle | **9** |
| `AI-Assisted Films, Reels & Product Stories` | `subcategory` on all 9 videos + category subtitle | **10** |
| `Cinematic Content Creator & Visual Director` | `role` on all 9 videos | **9** (never rendered) |
| `B2B Research & Outreach Specialist` | `role` on all 8 workbooks | **8** (never rendered) |
| `CATEGORY PORTFOLIO` | 5 homepage cards + 4 category page eyebrows | **9** |
| Meta title / description | identical on **all 15 URLs** | **15** |

**Net effect:** 49 of the site's 69 portfolio items carry a description that is a duplicate of another item's, and the 8 B2B workbooks are described identically to one another on their own detail pages.

### C2 — Personal introduction stated four times, four different ways

| # | Location | Wording |
|---|---|---|
| 1 | `<title>` / meta | AI Visual Designer, Visual Content Creator, B2B Research Specialist, Architectural CAD Drafting |
| 2 | Hero role badges | CAD Drafter · AI Visual Designer · Marketing & B2B Specialist · Visual Content Creator |
| 3 | Hero H2 | Architectural CAD Drafter, AI Visual Designer, and B2B Marketing Specialist |
| 4 | Footer | Creative & B2B Strategy |

**No two of the four agree.** "Visual Content Creator" appears in 1 and 2 but not 3. "Marketing/B2B" is styled three different ways. The footer descriptor matches none of them.

### C3 — Duplicated CTAs

| CTA | Instances |
|---|---|
| WhatsApp +44 7882 746212 | **5** (hero, footer list, footer icon, CAD ×3 → same number, Startup) |
| WhatsApp +91 70283 11226 | **4** |
| Instagram `@xiyato22` | **2** (footer list + footer icon row, ~40 px apart) |
| `VISIT LIVE WEBSITE` | 3 (identical label, 3 different destinations) |
| `VIEW DATA` / `DOWNLOAD` | 8 each |
| `EXPLORE CATEGORY` | 5 |
| `BACK TO PROJECTS` | 4 |

The footer shows the same Instagram account twice within one screen — once as a text link, once as an icon.

### C4 — Duplicated images
See doc 04 §14. Notably: `sakura-bg.png` in 3 places · `master-bathroom-plan.webp` in 4 · `master-bathroom-render-input.webp` in 3 · `master-bathroom-plan-input.webp` in 3 · `cigar-lounge-ceiling.webp` and `-flooring.webp` in 2 galleries each · `startup/hero.webp` in 2 places **with two different alt strings**.

### C5 — Duplicated company names

| Name | Appears as |
|---|---|
| Sultanah & Co. Interiors | Experience card 1 · video 1 client · video 1 title · video 1 `location` |
| Jovial Decor / Jovial Decoure / @jovialdecoure | Experience card 1 heading, its Instagram label, and its `aria-label` — **three spellings of one client** |
| Hospitality Client | videos 3 and 6 |
| Bahrain | CAD featured banner · video 5 title · video 5 description |

For every video, the `location` field is a **verbatim copy of the `client` field** (all 9).

### C6 — Duplicated skills across three lists

| Skill | Hero skill blocks | Services | Key Strengths |
|---|---|---|---|
| CAD drafting | ✓ | ✓ | ✗ |
| AI visuals / images | ✓ | ✓ | ✓ |
| Video / reels | ✓ | ✓ | ✓ |
| B2B research / lead gen | ✓ | ✓✓ *(two cards)* | ✓ |
| Web development | ✓ | ✓ | ✓ |
| Marketing | ✓ | ✓ | ✗ |
| Outreach automation | ✗ | ✓ | ✓ |
| CRM tracking | ✗ | ✓ | ✓ |

**The same capability set is stated three times in three different vocabularies**, and the three lists disagree about what is included.

### C7 — Duplicated structural components
`WhatsAppIcon` is defined **twice** — byte-identical SVG paths in `src/App.tsx:42` and `src/components/CadAutomationSection.tsx:26`.
The "eyebrow + Playfair H2" section header pattern is hand-written **19 times** with no shared component.
The back-link pattern (`ArrowLeft` + uppercase label) is hand-written **7 times**.
Card markup is duplicated across 7 near-identical treatments (doc 07 §4.3).

### C8 — Duplicated URLs
Every page is reachable at **6+ distinct URLs**: `{xiyato.uk, www.xiyato.uk, chaitanya-gaikwad.vercel.app} × {/#/route, /route}` — all HTTP 200, all with identical metadata, none carrying a canonical.

---

## PART D — ONE-PARAGRAPH SUMMARY OF THE CURRENT IA

The site is a single-page portfolio with six hidden sub-pages hanging off one card grid. Navigation advertises six destinations, of which five are scroll anchors on the homepage and one is a real page; the six pages that contain the actual work are absent from the menu and reachable only through a card grid that no keyboard user can operate. The homepage carries the entire narrative — identity, portfolio portal, startup pitch, nine services, six jobs, and all contact detail — across roughly fourteen mobile screens. Depth stops at three levels, no individual project has a page, and five modal experiences hold significant content at no URL at all. Content volume runs inversely to content quality: the 49-item render gallery shares two sentences between all of its items, while the two richest pages — CAD and Ciyato — sit furthest from the navigation. Services and portfolio describe the same capabilities in three different vocabularies and never link to each other. Every conversion path terminates in WhatsApp or Instagram; there is no form, no email address, and no analytics to record whether any of it works.


---

# 11 — UNKNOWN / UNVERIFIED / INACCESSIBLE ITEMS

**Audit date:** 2026-08-11

Everything in this file is something the audit **could not confirm**. Nothing here has been guessed at or filled in. Where a claim appears elsewhere in this audit that depends on an item below, it is cross-referenced.

---

## 1. INACCESSIBLE — could not be captured in this environment

### 1.1 — Screenshots
**Status: INACCESSIBLE**
Every `screenshot` call failed with *"the Browser pane is not displayed, so the page is not compositing frames."* No image of any page at any breakpoint could be captured.

**Substitute used:** doc 06 relies entirely on numeric DOM measurement — `scrollWidth` vs `clientWidth` for overflow, `getBoundingClientRect()` for element bounds, computed `grid-template-columns` for layout, computed `fontSize` for type. This is more precise than visual inspection for detecting overflow and layout state, but it **cannot detect purely visual problems**: awkward line breaks, unbalanced whitespace, poor image crops, visual hierarchy failures, or anything that looks wrong without measuring wrong.

**Requires manual confirmation:** full-page screenshots of all 8 routes at 1920 / 1440 / 1280 / 1024 / 768 / 430 / 390 / 360 px.

### 1.2 — Lighthouse scores
**Status: UNVERIFIED — ESTIMATED**
Lighthouse could not be executed (no CLI in this environment; the browser pane does not composite, which Lighthouse requires). The four scores in doc 08 §8 are **reasoned estimates derived from measured evidence**, not tool output.

**Do not quote them as measurements.** Re-run with `npx lighthouse https://xiyato.uk --preset=desktop` and again for mobile before using any number.

### 1.3 — Core Web Vitals
**Status: UNVERIFIED**
FCP and LCP both reported `0` in the Performance API during measurement (the pane was not painting). TTFB (11 ms), DOMContentLoaded (98 ms), and resource sizes **are** genuine measurements. **LCP, CLS, and INP are unknown.** Given no `width`/`height` on any image, CLS is likely non-trivial, but this is inference, not measurement.

### 1.4 — Cold-cache load measurement
**Status: PARTIALLY VERIFIED**
The 14-request homepage inventory is verified. Total transfer was measured mid-session at 6,744 KB across three routes. The "≈3.7 MB homepage" figure in docs 04 and 08 is **computed by summing verified file sizes**, not observed in a single cold load. Individual file sizes are verified against live `Content-Length`.

### 1.5 — Real-device testing
**Status: NOT PERFORMED**
All mobile testing used Chromium device emulation. Not verified on real hardware: iOS Safari behaviour (notably `playsInline` autoplay policy and the 9-video preload under a real cellular connection), Android Chrome, pinch-zoom in the CAD lightbox on a real touchscreen, and actual scroll performance with 69 animated elements.

### 1.6 — Assistive-technology testing
**Status: NOT PERFORMED**
No screen reader (NVDA / JAWS / VoiceOver) was run. The accessibility findings in doc 08 §5 are from DOM inspection and computed styles — all are verifiable facts about the markup, but the **lived experience** of navigating this site with a screen reader has not been observed.

---

## 2. UNVERIFIED — resolves, but content not confirmed

### 2.1 — Instagram profiles (6)
**Status: UNVERIFIED**
All six return HTTP 200. **A control test proved this means nothing**: `https://www.instagram.com/zzq_this_handle_should_not_exist_9182/` also returns HTTP 200. Instagram serves a 200 page for nonexistent handles.

Unconfirmed for each of `@xiyato22`, `@sultanahco`, `@redchandelier.studio`, `@erenodesignstudio`, `@fitout360uae`, `@jovialdecoure`: whether the account exists, whether it is the intended account, and whether it is public. **Also unconfirmed: whether the blue "verified" tick rendered next to five of these on the site corresponds to actual Instagram verification.** The tick is a hand-drawn SVG in the site's own code with `aria-label="Verified account"` — the site asserts it; Instagram has not been asked.

**Requires manual confirmation.**

### 2.2 — `https://xiyora.vercel.app`
**Status: UNVERIFIED**
Returns HTTP 200. A control test showed a nonexistent path on the same host also returns 200 (SPA catch-all), so status alone proves nothing. Not confirmed: that it is the "Export Brand Website" described, that it is complete, or that it is intended to remain public.

### 2.3 — `https://anvikshikijournal.in/`
**Status: UNVERIFIED**
Returns HTTP 200. Not confirmed: that this is the described academic journal platform, or the actual nature of the "Full-Stack Developer & Technical Administrator" role claimed.

### 2.4 — WhatsApp numbers
**Status: PARTIALLY VERIFIED**
Both `wa.me` links resolve and redirect correctly to `api.whatsapp.com`. **Not verified: that either number has an active WhatsApp account, or that they are monitored.** `wa.me` does not distinguish. No message was sent.

**These two numbers are the site's only conversion channel** — confirming they are live is the single highest-value manual check in this document.

---

## 3. UNKNOWN — cannot be determined from the site or the source

### 3.1 — Business and content facts
- **Location.** No city, country, address, timezone, or service area appears anywhere. The `+44` and `+91` prefixes are the only signal, and they conflict.
- **Whether "Chinese Company" is intentionally anonymised** or a placeholder never filled in.
- **The three anonymised video clients** (`Hospitality Client` ×2, `Interior Design Studio`, `Middle East Developer`) — whether anonymity is contractual or incidental.
- **Whether the 49 render/visualisation images are client work, speculative work, or personal studies.** The site never says; the titles are auto-numbered and the two shared descriptions say nothing.
- **Whether the Instagram-derived `ig-thumb-*.png` files are licensed for use.** They are client-account imagery reused as decorative wallpaper.
- **Whether publishing the B2B lead data at a public URL is intended.** Named companies, named individuals, decision-maker routes, and suggested pitch angles are indexed publicly (doc 09 §7.2). Phone/email are genuinely redacted. This is a business decision the audit cannot make.
- **Whether `Fitout 360 Interiors` and `Jovial Decor` are intentionally missing background images** while the other four Experience cards have them.

### 3.2 — Date and status questions
- **Experience dates are unusual.** Four entries start in 2026 (`Mar 2026`, `Apr 2026`, `Feb 2026`) and three end in 2026, against an audit date of 11 Aug 2026. `Fitout 360` reads `Apr 2026 – May 2026` and `Ereno` reads `Mar 2026 – Jun 2026` — both already past. Two entries read `Present`. **Whether these dates are accurate, forward-dated, or placeholders is unknown.**
- **`PORTFOLIO 2026`** in the footer is hard-coded, not derived from the current year.
- **Ciyato's actual development state.** Five milestones are listed with no dates, no percentages, and identical styling for done and pending items.

### 3.3 — Ownership and history
- **Whether a previous domain existed.** No redirects into `xiyato.uk` were found, but the audit can only test hosts it knows about. If an older domain exists, it was not supplied and could not be discovered.
- **Why `README.md` and `metadata.json` describe "Disha Singha"** and an AI-safety portfolio. Unknown whether the repository was forked, templated, or reused.
- **Whether `chaitanya-gaikwad.vercel.app` is meant to stay publicly reachable** or is a deployment artifact.
- **Whether `www.xiyato.uk` serving 200 without redirecting is intentional.**

### 3.4 — Technical unknowns
- **Live bundle vs local build.** Live `index-JR0ohsl4.js` is 529,338 B; a fresh local build of `cca00cd` produced `index-yA8G95OQ.js` at 529,439 B — 101 bytes apart. The most likely cause is caret-ranged dependencies (`motion`, `lucide-react`, `vite`) resolving to newer patch versions locally. **Not confirmed.** It cannot be ruled out that the live deployment is from a slightly different commit than `cca00cd`.
- **Vercel project settings** — build command, output directory, environment variables, domain configuration, and analytics toggles are all in the Vercel dashboard, which was not accessed. `vercel.json` contains only the rewrite.
- **Whether `GEMINI_API_KEY` is set in the Vercel environment.** If it were, `vite.config.ts` would inline it into the client bundle. The live bundle does not appear to contain a key, which suggests it is unset — but this was not exhaustively verified.
- **The five orphaned CAD images** (`cad-automation-hero`, `hero-ceiling`, `hero-flooring`, `toilet-3d-input`, `stair-wall-input`, ~1.2 MB) — unknown whether these are drafts, replaced versions, or content that was meant to ship.
- **`regenerated_image_1777361976700.png`** (780 KB) — origin and purpose unknown; referenced nowhere.
- **Video encoding parameters** — codec, bitrate, resolution, and duration were not probed. The `duration` and `aspectRatio` fields exist in `projects.json` but `duration` is unset on all 9.
- **Why both `package-lock.json` and `pnpm-lock.yaml` are committed**, and which one the Vercel build actually uses.

---

## 4. CLAIMS THE SITE MAKES THAT THE AUDIT COULD NOT INDEPENDENTLY CHECK

Recorded as claims, neither endorsed nor disputed.

| Claim | Location | Audit status |
|---|---|---|
| `Phone & Email Redacted` | Spreadsheet viewer | **VERIFIED TRUE** — 0 emails, 0 phone numbers found across all 8 JSON files and all 8 `.xlsx` files |
| `Original phone numbers and emails have been safely redacted…` | B2B intro | **VERIFIED TRUE** — same evidence |
| Blue verified tick on 5 Experience cards | Experience | **UNVERIFIED** — site-authored SVG, not checked against Instagram |
| `more than nine high-fidelity commercial office renders` (Fitout 360) | Experience | **UNVERIFIED** — no Fitout 360 work is shown on the site |
| `approximately 10,000 square feet` (Jovial Decor) | Experience | **UNVERIFIED** |
| `Featured Client Project • Bahrain` / `commissioned for a premier luxury interior design project in Bahrain` | CAD banner | **UNVERIFIED** |
| `Delivered … editable DWG, DXF and PDF files` | CAD, throughout | **UNVERIFIED** — only WebP raster previews are published; no DWG, DXF, or PDF file exists anywhere in the project |
| `CUSTOM LISP SCRIPT (INCLUDED)` | CAD file formats | **UNVERIFIED** — no LISP file exists in the repository |
| `Instagram account not publicly available` | Experience card 3 | **UNVERIFIED** |
| Ciyato is `currently being refined into a functional Android application` | Startup | **UNVERIFIED** — no APK, repo link, store listing, or build artifact is referenced |
| `Export Brand Website … remains available for acquisition` | Websites card 2 | **UNVERIFIED**, and note the acquisition CTA for it is dead code that never renders |

---

## 5. INTERNAL INCONSISTENCIES FOUND (facts, not unknowns)

Listed here because each needs an owner decision before any rebuild.

1. **Four different self-descriptions** across title, hero badges, hero H2, and footer — no two agree (doc 10 §C2).
2. **Three spellings of one client**: `Jovial Decor` (heading) / `@jovialdecoure` (link) / `Jovial Decoure` (aria-label).
3. **`og:url` points at `chaitanya-gaikwad.vercel.app`**, not `xiyato.uk`.
4. **`1 SHEETS`** — unpluralised on 3 of 8 workbook cards.
5. **CAD card 1 chip reads `+ 6 Drawings`** while its gallery holds exactly 6 items (4 drawings + 2 client references) — the `+` implies additional unseen content.
6. **CAD card 3 chip reads `4 Wall Packages`** but only 3 of the 4 gallery images are shown as thumbnails; `wash-elevations.webp` is never surfaced.
7. **`startup/hero.webp` has two different alt strings** in two places.
8. **The CAD page has no `<h1>`.**
9. **Websites page defines thumbnails for all 3 projects and renders none.**
10. **The Export Brand Website's copy says it is available for acquisition; its `status` field says `Completed`**, so the acquisition CTA never renders.
11. **The header container is 1024 px and the homepage container is 1152 px** — their right edges do not align above 1024 px.
12. **`--color-warm-ink` and `--color-warm-accent` are both `#000000`** — the "accent" token is not an accent.
13. **`Outfit` font is downloaded via CSS `@import` and used by nothing.**
14. **`package.json` is named `react-example`.**
15. **`README.md` and `metadata.json` describe a different person and project entirely.**
16. **`vite.config.ts` line 20 contains mojibake** (`Do not modifyâfile watching`) — a CP1252/UTF-8 corruption of an em dash.
17. **`npm run clean` uses `rm -rf`** — fails on Windows `cmd`/PowerShell.

---

## 6. WHAT THIS AUDIT DID **NOT** COVER

Explicitly out of scope, for the record:

- Legal review of publishing third-party business-intelligence data
- Copyright status of the Instagram-derived imagery reused as decoration
- Competitive or market positioning analysis
- Any judgement on whether the content is commercially effective
- The content of the three external websites linked from the Websites page
- Git history beyond the five most recent commits
- Vercel dashboard configuration, deployment logs, and domain settings
- Load, stress, or uptime testing
- Penetration testing or dependency CVE scanning
- Actual video playback quality, codec, or duration

---

## 7. THE FIVE HIGHEST-VALUE MANUAL CHECKS

If only a handful of things get confirmed before any redesign work begins:

1. **Send a test message to both WhatsApp numbers.** They are the site's only conversion channel; nothing else on the site works if these do not.
2. **Open all six Instagram profiles.** Confirm they exist, are public, are the right accounts, and that the five "verified" ticks are truthful.
3. **Confirm the Experience dates**, particularly the four 2026 start dates and the two already-ended 2026 engagements.
4. **Decide whether the public B2B lead data should stay public** — named companies, named individuals, and outreach strategy at an unauthenticated URL.
5. **Run real Lighthouse** on mobile and desktop, and capture full-page screenshots at the eight breakpoints, to replace the two gaps in this audit.
