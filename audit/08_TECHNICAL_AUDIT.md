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
