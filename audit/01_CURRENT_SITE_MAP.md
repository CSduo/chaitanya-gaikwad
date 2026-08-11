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
