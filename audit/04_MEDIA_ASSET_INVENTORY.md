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
