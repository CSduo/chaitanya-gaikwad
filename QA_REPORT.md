# XIYÀTO — QA REPORT

**Date:** 2026-08-11 · **Build:** Next.js 16.3.0 · **Tested against:** production build (`next start`)

---

## 1. BUILD, TYPECHECK, LINT

| Check | Command | Result |
|---|---|---|
| Production build | `npm run build` | **PASS** — compiled in ~4s, 27 pages prerendered |
| Typecheck | `npx tsc --noEmit` | **PASS** — 0 errors under `strict`, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch` |
| Lint | `npx eslint .` | **PASS** — 0 errors, 0 warnings |

Three lint errors were found and fixed during QA: two `setState`-in-effect patterns (replaced
with React's adjust-state-during-render pattern) and one `children`-as-prop violation.

---

## 2. ROUTE STATUS CODES

All 23 addressable routes return **HTTP 200** with correct content:

`/` · `/work` · `/work` ×4 filtered views · `/services` · 3 service pages · `/company` ·
`/company/people` · `/company/locations` · `/careers` · `/contact` · `/legal/privacy` ·
`/legal/terms` · 6 case studies · `/sitemap.xml` · `/robots.txt` · `/site.webmanifest`

### Genuine 404s — the audit's headline defect is resolved

| Path | Status |
|---|---|
| `/nonsense-xyz-404-test` | **404** |
| `/work/does-not-exist` | **404** |
| `/services/nope` | **404** |
| `/legal/cookies` (unpublished) | **404** |
| `/legal/accessibility` (unpublished) | **404** |
| `/legal/company-information` (unpublished) | **404** |

Previously **every** URL returned 200 with the homepage, including `/robots.txt` and
`/sitemap.xml`.

---

## 3. LEGACY REDIRECTS

All return **308 Permanent Redirect** to the correct destination. None falls back to `/`.

| From | To |
|---|---|
| `/cad-automation` | `/services/cad-technical-production` |
| `/projects/videos` | `/work?category=visual-content` |
| `/projects/visualisations` | `/work?category=visual-content` |
| `/projects/b2b-research` | `/work?category=growth-operations` |
| `/projects/b2b-research/{slug}` | `/work?category=growth-operations` |
| `/projects/websites` | `/work?category=multi-disciplinary` |
| `/projects` | `/work` |
| `/startup` | `/work` |
| `/about` | `/company` |
| `/company/about` | `/company` |

Hash-based legacy links are handled by a client shim (fragments never reach the server).

---

## 4. SEO — VERIFIED IN SERVER HTML

Checked against the actual server response, not the client DOM.

| Route | Crawlable words | H1 | JSON-LD | Canonical |
|---|---:|---:|---:|---|
| `/` | 1,069 | 1 | ✓ | ✓ |
| `/company` | 968 | 1 | ✓ | ✓ |
| `/work/bahrain-luxury-interior-cad-package` | 809 | 1 | ✓ | ✓ |
| `/work/saudi-market-entry-lead-intelligence` | 797 | 1 | ✓ | ✓ |
| `/services/cad-technical-production` | 765 | 1 | ✓ | ✓ |
| `/services` | 741 | 1 | ✓ | ✓ |
| `/work` | 736 | 1 | ✓ | ✓ |
| `/legal/privacy` | 653 | 1 | ✓ | ✓ |
| `/careers` | 547 | 1 | ✓ | ✓ |
| `/contact` | 476 | 1 | ✓ | ✓ |
| `/company/people` | 469 | 1 | ✓ | ✓ |
| `/company/locations` | 394 | 1 | ✓ | ✓ |

**Previously: 0 words in the server HTML on every route.**

- Exactly one `<h1>` on all 23 routes — verified programmatically
- Unique title and description per route; filtered work views get their own titles
- `og:image` and `twitter:card` present on every route
- Zero images missing `alt` across all routes

---

## 5. LINK INTEGRITY

- **32 distinct internal link targets** — all resolve, no 4xx/5xx
- **External links: 3** — two WhatsApp, one Instagram. All `target="_blank"` with
  `rel="noopener noreferrer"`
- Zero anchors without `href`
- **Zero clickable-div navigation patterns** (previously 40 on the homepage alone)

---

## 6. RESPONSIVE — ALL EIGHT REQUIRED WIDTHS

| Requested | Measured | H-scroll | Overflow | Small targets | Nav | H1 |
|---|---|---|---|---|---|---|
| 1920 | 1905 | No | 0 | 0 | desktop | 60px |
| 1440 | 1425 | No | 0 | 0 | desktop | 60px |
| 1280 | 1265 | No | 0 | 0 | desktop | 60px |
| 1024 | 1009 | No | 0 | 0 | desktop | 60px |
| 768 | 753 | No | 0 | 0 | **mobile** | 48px |
| 430 | 430 | No | 0 | 0 | mobile | 36px |
| 390 | 390 | No | 0 | 0 | mobile | 36px |
| 360 | 360 | No | 0 | 0 | mobile | 36px |

**Zero horizontal overflow and zero sub-44px tap targets at every width.** The 1024px
breakpoint switches correctly. Verified on all other routes at 360px as well.

Two rounds of fixes were applied to reach this: header nav and dropdown toggles raised to
44px, and `TextLink` given a 44px minimum.

---

## 7. ACCESSIBILITY

| Check | Result |
|---|---|
| Focus visible on keyboard Tab | **PASS** — 2px oxblood outline, 3px offset, verified with real key presses |
| Skip-to-content | **PASS** — first focusable element, 135×44px |
| Tab order | **PASS** — skip → logo → nav → CTA → content |
| Focusable elements on homepage | **52** (previously 0 in the portfolio section) |
| Dropdown keyboard operation | **PASS** — `aria-expanded` toggles, `aria-controls` correct, Escape closes, focus returns |
| Mobile menu focus trap | **PASS** — focus enters, is trapped, returns to trigger |
| Mobile menu scroll lock | **PASS** — `overflow: hidden` while open, restored on close |
| Mobile menu Escape + backdrop | **PASS** |
| Submenus collapsed by default | **PASS** — as approved |
| Lightbox dialog semantics | **PASS** — `role="dialog"`, `aria-modal="true"`, `aria-label`, focus inside, Escape closes, labelled controls |
| Form labels | **PASS** — 12 fields, zero unlabelled visible fields |
| Landmarks | **PASS** — one each of `header`, `nav`, `main`, `footer` |
| Reduced motion | **PASS** — global `prefers-reduced-motion` block |
| Images missing alt | **0** across all routes |

---

## 8. FORMS

| Scenario | Expected | Result |
|---|---|---|
| Empty submit | Inline errors, focus to first invalid | **PASS** — 5 errors, `aria-invalid` set, focus moved to `name` |
| Invalid email | Field-level error | **PASS** |
| Valid submit, provider unconfigured | Failure state, no false success | **PASS** — HTTP 503, "Your message was not sent", WhatsApp offered |
| Malformed request body | 400 | **PASS** |
| Honeypot filled | Silent accept, not delivered | **PASS** — 200 `delivered:false` |
| Server-side validation | Authoritative | **PASS** — 422 with per-field errors |

Talent and project submissions are validated by the same module but routed separately.

---

## 9. PERFORMANCE

| Measure | Result |
|---|---|
| Homepage requests | 15 |
| Document HTML (compressed) | 16 KB |
| JS + CSS (compressed) | 193 KB |
| Fonts (self-hosted woff2) | 116 KB |
| Images on first paint | **1** — the LCP drawing at 14 KB |
| **Cold homepage total** | **~340 KB** (previously ~3.7 MB) |
| TTFB (local) | 15 ms |
| DOMContentLoaded | 58 ms |
| Video requests on a gallery route | **0** until clicked (previously 9 range requests) |
| Third-party runtime requests | **0** |
| Production asset library | 28 MB (previously 106 MB) |

On the 22-image visualisation case study: all 22 lazy, one loaded on arrival, zero `<video>`
elements in the DOM until the visitor asks.

**Lighthouse was not run** — no CLI available in this environment and the browser pane does
not composite. No scores are claimed. Figures above are direct measurements.

---

## 10. CONSOLE

**Zero console messages** on every route tested — no errors, no warnings, no React hydration
mismatches.

---

## 11. FINAL SANITY PASS

Searched for `Lorem`, `TODO`, `FIXME`, `TO BE SUPPLIED`, `Example Ltd`, `Private Limited`,
`Pvt Ltd`, `Coming soon`, `123 Main`, `John Smith`, `react-example`, `Disha Singha`,
clickable-div navigation, and hash-routing remnants.

All matches evaluated; **no placeholder or fabricated content remains**. Legitimate matches:
HTML `placeholder` attributes on form controls, `window.location.hash` inside the documented
legacy shim, and one `focus:outline-none` immediately followed by a `focus-visible` outline
replacement.

**Verified absent:** fake team members, fake addresses, fake registration details, fake
testimonials, fake client logos, invented metrics, invented vacancies.

---

## 12. VERCEL DEPLOYMENT

### First attempt — FAILED

```
Error: No Output Directory named "dist" found after the Build completed.
```

**The build itself succeeded** — compile, typecheck and all 27 static pages generated
normally. The failure was in the deploy step, caused by configuration inherited from the
previous Vite application:

1. **`vercel.json` was never replaced.** It still contained the SPA catch-all
   `{"source": "/(.*)", "destination": "/index.html"}` — the exact soft-404 rewrite the audit
   flagged and the brief required be removed. `/index.html` does not exist in a Next.js build.
2. **The Vercel project's Output Directory was still `dist`**, the Vite convention. Next.js
   outputs to `.next`.

### Fix

`vercel.json` replaced with an explicit framework declaration:

```json
{
  "framework": "nextjs",
  "buildCommand": "next build",
  "outputDirectory": ".next",
  "installCommand": "npm ci"
}
```

`vercel.json` build settings take precedence over dashboard project settings, so this
overrides the stale `dist` override without needing a dashboard change.

### Second attempt — READY

| | |
|---|---|
| Status | **● Ready** |
| Duration | 38s |
| Preview URL | `https://chaitanya-gaikwad-kr2dbwfcl-xiyatosaanvi-2995s-projects.vercel.app` |
| Build log | Clean — `Build Completed`, `Deploying outputs`, no errors or warnings |

**Verified in the deployed artifact:** all 12 redirects compiled into the Vercel routing
layer with 308 status, both header rules applied (5 security headers site-wide, immutable
caching on `/media/*`), 17 static + 3 dynamic routes, 19 prerendered HTML pages. The three
unpublished legal routes are correctly absent from the prerender output.

### Preview is behind Vercel Deployment Protection

Every path on the preview returns `302 → vercel.com/sso-api`. This is the account's
Deployment Protection on preview deployments, **not a site fault**. The owner can open the
URL directly while signed in to Vercel. Automated verification of the live preview was
therefore not possible; the equivalent checks were run against the identical production build
locally (§2–§11, 33/33 passing) and against the deployed build artifact above.

To allow automated checking of future previews, either disable Deployment Protection for
previews or issue a Protection Bypass for Automation token.

---

## 13. KNOWN LIMITATIONS

1. **No screenshots captured.** The browser pane does not composite in this environment;
   every `screenshot` call timed out — the same limitation recorded in the original audit.
   Layout was verified by DOM measurement, which is more precise for overflow and sizing but
   blind to purely aesthetic issues. **A human visual review is still advisable.**
2. **No Lighthouse scores.** Not run; not estimated.
3. **Homepage is long on mobile** — 12,264px (~15 screens) at 360px. Trimmed from 13,190px by
   reducing featured work from three cards to two and tightening mobile section padding.
   This is inherent to the approved 12-section structure stacking into one column; every
   section is a preview linking deeper rather than the whole site inlined.
4. **Form delivery inactive** until the four `ENQUIRY_*` variables are set. Fails honestly
   meanwhile.
5. **Canonical host redirects not applied** — `www` and the `.vercel.app` host must be
   redirected in the Vercel dashboard. Application-level canonicals already point at the apex.
6. **Growth Operations case studies carry no imagery**, by choice — the evidence is
   structural (sheet counts, field schemas) because publishing the lead data would expose
   third-party business intelligence.
7. **No real-device testing.** Mobile verified via Chromium emulation only.
8. **No assistive-technology testing.** Findings are from DOM inspection and computed styles;
   no screen reader was run.
