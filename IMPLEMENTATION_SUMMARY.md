# XIYÀTO — IMPLEMENTATION SUMMARY

**Date:** 2026-08-11
**Branch:** `rebuild/xiyato-business-site`
**Recoverable baseline:** `legacy/pre-rebuild-snapshot` (the complete previous site and all original media)
**Authorities:** `IA_02_APPROVED_ARCHITECTURE.md` (binding), `XIYATO_UK_FULL_AUDIT.md` (factual record)

---

## 1. FRAMEWORK

**Next.js 16.3.0, App Router, TypeScript strict.**

The previous stack was React 19 + Vite as a client-only SPA with a hand-rolled
`String.includes()` hash router. That architecture cannot satisfy IA_02's requirement for
server-rendered crawlable HTML and true HTTP status codes, and no prerender shim would have
fixed the routing model underneath it. It was replaced rather than patched.

| Concern | Resolution |
|---|---|
| Crawlable HTML | Static prerendering at build; every route ships real content |
| Real routes / status codes | File-system routing; genuine 404s |
| Dynamic case studies | `generateStaticParams` over the case-study data |
| Server capability for forms | Route handler at `/api/enquiry` |
| Route metadata | Metadata API, per route |
| Image optimisation | `next/image` with AVIF/WebP and responsive `srcset` |
| Fonts | `next/font` — self-hosted at build, no third-party request chain |

Initially installed 15.1.6; npm flagged a published CVE for that release, so the build was
moved to 16.3.0 before anything was built on top of it.

Runtime dependencies are now **three**: `next`, `react`, `react-dom`.

---

## 2. STRUCTURAL CHANGES

| Before | After |
|---|---|
| 1,923-line `App.tsx` holding all 8 page templates | 17 route files, none over ~330 lines |
| Hash routing (`#/projects/videos`) | Real paths (`/work?category=visual-content`) |
| Catch-all returning the homepage with HTTP 200 | Genuine 404 page with a 404 status |
| 5 category cards as `div onClick` | Semantic `<a href>` throughout |
| No dropdowns, no active state, no focus state | Accessible dropdowns, active state, visible focus |
| 0 forms | Two separately-routed forms with a real backend |
| Content hard-coded in JSX | Typed data layer under `lib/` |
| 3 hostnames, no canonical | One canonical host, self-referencing canonicals |

**Component inventory:** 40 reusable components as specified in IA_02 §13 — layout and
typographic primitives, cards, content structures, forms, and the conversion CTA. No page
introduces a bespoke one-off pattern.

---

## 3. ROUTES

All 17 fixed routes plus the templated case study, exactly as approved.

```
/                                          Home (12 sections)
/work                                      Work index + ?category filter
/work/{slug}                               6 case studies
/services                                  Services overview
/services/cad-technical-production         Flagship service
/services/growth-operations
/services/visual-content
/company                                   Consolidated Company/About (14 sections)
/company/people                            Founder & People
/company/locations
/careers                                   Zero-vacancy state by design
/contact                                   Business enquiry system
/legal/privacy                             Published
/legal/terms                               Published
/legal/cookies                             Unpublished → 404
/legal/accessibility                       Unpublished → 404
/legal/company-information                 Unpublished → 404
```

**Utilities:** `/404` (real status), `/sitemap.xml`, `/robots.txt`, `/site.webmanifest`,
plus generated `/opengraph-image`, `/icon`, `/apple-icon`.

---

## 4. CASE STUDIES PUBLISHED

Six, selected against the quality bar rather than migrated wholesale. The old site listed
69 portfolio items; most were single-sentence tiles sharing boilerplate descriptions.

| Case study | Category | Featured | Evidence |
|---|---|---|---|
| Bahrain Luxury Interior — Complete Drawing Package | Technical Production | ✓ | 11 real CAD drawings, full QA list, DWG/DXF/PDF deliverables |
| Saudi Market Entry — Lead Intelligence System | Growth Operations | ✓ | 55 records, 6 sheets, 18 fields, 31 logged sources |
| Moon Chair — Cinematic Product Campaign | Visual Content | ✓ | Named client, real film |
| Hotel Linen Export — Market and Commercial Programme | Multi-disciplinary | | 7 sheets, 459 records, 294 logged exclusions |
| Automotive Showroom — Design-Build Target Mapping | Growth Operations | | 117 records, 22 fields |
| Interior Visualisation — Concept and Material Studies | Visual Content | | 18 images, 2 films |

**Evidence policy.** Metrics are operational only — sheet counts, record counts, field
counts, drawing counts. No revenue, conversion, ROI or client-impact figure was invented,
because none is substantiated anywhere in the source material.

**Growth Operations engagements publish their system, not their records.** The workbooks
name real companies and, in one column, real individuals. Case studies show sheet structure,
record counts and the field schema; the underlying lead data is not republished.

---

## 5. CONTENT ARCHIVED

Preserved on `legacy/pre-rebuild-snapshot`; removed from the production path.

| Item | Decision | Reason |
|---|---|---|
| Ciyato startup page and 20 assets | **Archived** | A consumer Android product with no place in a B2B production studio's architecture. `/startup` redirects to `/work` |
| "Websites Developed" as a category | **Archived as a category** | Per instruction, not made a fourth service. The strongest instance survives inside the Hotel Linen multi-disciplinary case study |
| Personal Portfolio Website project | **Removed** | Self-referential; linked to the site the visitor was already on |
| Anvikshiki Journal project | **Archived** | Academic publishing is off-positioning for the approved service set |
| Spreadsheet viewer (20,635 cells) | **Replaced** | Substituted with curated structure tables. The viewer rendered up to 6,777 unvirtualised cells and exposed third-party lead intelligence |
| 8 downloadable `.xlsx` files | **Withdrawn from publication** | Contained named third-party business intelligence; two leaked the owner's personal Gmail in document metadata |
| 31 of 43 visualisations, 6 of 9 videos | **Archived** | Curated to the strongest; the rest were unattributed and undescribed |
| 4 decorative PNGs (2.78 MB) | **Removed** | Rendered at 5% opacity behind text |
| 6 orphaned assets (2 MB) | **Removed** | Referenced nowhere |
| Sakura petals, compass ring, blueprint accents | **Removed** | Decorative motion with no informational role |
| `README.md` / `metadata.json` describing "Disha Singha" | **Replaced** | Wrong project identity |

---

## 6. THE SIGNATURE INTERACTION

The brief invited a design→drawing comparison. The genuine asset pairs did not support a
slider: the client render is portrait 986×1448, the drafted plan landscape 3200×2260, and
forcing them into one frame would have cropped both badly.

Built instead: **a drawing-set viewer** in the hero, stepping through four sheets from one
real package — plan, elevation, reflected ceiling, flooring. All four share an identical
intrinsic aspect ratio, so nothing crops and switching causes no layout shift. It
demonstrates the actual production value (documents of the same space that agree with each
other), is keyboard-operable with arrow keys and proper `tablist` semantics, and holds no
fabricated drawings.

The input→output comparison lives on the CAD service page, where it belongs contextually,
each image in its natural frame.

---

## 7. FORM IMPLEMENTATION

`POST /api/enquiry` — a real Node route handler.

- **Server-side validation is authoritative**; the client copy is convenience only
- Honeypot field, accepted silently so bots learn nothing
- Best-effort in-memory rate limit (5/minute/IP)
- Delivery via the Resend REST API using `fetch` — no SDK dependency
- Project enquiries and talent submissions are routed to separate inboxes

**Behaviour without credentials:** returns HTTP 503 with an explicit "not delivered"
message. The UI shows a failure state offering the verified WhatsApp channels. **It never
reports a false success.** Verified: valid submission → 503; invalid → 422 with per-field
errors; honeypot → 200 `delivered:false`; malformed → 400.

**File upload** is specified in the architecture but not shipped, because no secure storage
is configured. Rather than a decorative dead control, the form states that files can be sent
in reply to the first message.

---

## 8. SEO IMPLEMENTATION

| Item | Status |
|---|---|
| Crawlable HTML | 394–1,069 words per route in the server response (previously **0**) |
| Unique title + description | Every route |
| Self-referencing canonical | Every route, on `https://xiyato.uk` |
| Open Graph incl. `og:image` | Every route; generated branded image, per-case-study override |
| `twitter:card` | `summary_large_image` on every route |
| Structured data | `ProfessionalService`, `Service`, `BreadcrumbList`, `CreativeWork` |
| Sitemap | Generated from route data; excludes unpublished legal routes |
| `robots.txt` | Real content type, references the sitemap |
| Heading structure | Exactly one `<h1>` per route, verified across all 23 |
| Alt text | Zero images missing `alt`, verified across all routes |

Schema properties are emitted only where a verified fact backs them. No `address`,
`telephone`, `foundingDate` or registration field is fabricated.

---

## 9. PERFORMANCE

| Measure | Before | After |
|---|---|---|
| Homepage cold payload | ~3.7 MB | **~340 KB** (16 KB document + 193 KB JS/CSS + 116 KB fonts + 14 KB LCP image) |
| Images on first paint | 11 (incl. four 700–800 KB PNGs) | **1** — the LCP drawing at 14 KB |
| JS bundle | 529 KB single chunk, no splitting | Route-level splitting |
| Video requests on a gallery route | 9 simultaneous range requests | **0** until the visitor clicks |
| Production asset library | 106 MB | **28 MB** |
| Font loading | 3-hop external chain, one family unused | Self-hosted, 2 families in use |
| Static asset caching | `max-age=0, must-revalidate` on hashed bundles | Immutable caching on `/media/*` |
| Responsive images | None | `srcset` across 10 widths, AVIF/WebP |
| Intrinsic dimensions | None (CLS risk) | Every image |

Third-party requests at runtime: **zero**.

---

## 10. ACCESSIBILITY

Every failure the audit recorded has been addressed.

| Audit finding | Resolution |
|---|---|
| Portfolio unreachable by keyboard (0 focusable elements) | Semantic links; **52 focusable elements** on the homepage |
| No visible focus anywhere | `:focus-visible` outline site-wide, verified with real Tab presses |
| Contrast failures at 2.85:1 and 3.95:1 | Token scale rebuilt; secondary text at `--color-ink-muted` and above |
| No `prefers-reduced-motion` | Global reduced-motion block |
| Modals without dialog semantics | `role="dialog"`, `aria-modal`, focus management, Escape |
| Icon buttons without labels | All labelled |
| Decorative SVG read aloud ("N E S W") | Removed |
| Unlabelled input | Every field labelled; zero unlabelled visible fields |
| Sheet tabs not tabs | Proper `tablist`/`tab` with arrow-key navigation |
| 11 tap targets under 44px | **0** at every tested width |
| No skip link | Skip-to-content as the first focusable element |
| Mobile menu: no trap, no Esc, no scroll lock | All implemented and verified |

---

## 11. REDIRECTS

Ten server-side 308 redirects in `next.config.ts`, each to its closest destination — none
bulk-redirects to `/`. Because fragments never reach the server, a documented client-side
shim (`LegacyHashRedirect`) translates inbound `#/...` links to real paths on mount. It does
not reintroduce hash routing.

Full mapping in `REDIRECT_MAP_FINAL.md`.

---

## 12. DEPLOYMENT NOTES

- Vercel auto-deploys `main`; this work is on `rebuild/xiyato-business-site` and has **not**
  been pushed or promoted. Production `xiyato.uk` is untouched.
- Security headers are set in `next.config.ts`: HSTS, `X-Content-Type-Options`,
  `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`.
- **Canonical host redirects must be configured in the Vercel dashboard** — `www.xiyato.uk`
  and `chaitanya-gaikwad.vercel.app` → `https://xiyato.uk`. This is domain configuration,
  not application code.
- Set the four `ENQUIRY_*` environment variables to activate form delivery.
- No analytics installed, so no cookie banner is required and `/legal/cookies` stays
  unpublished — consistent with IA_02's publication triggers.

---

## 13. VERIFICATION

`npm run build` ✓ · `npx tsc --noEmit` ✓ (strict, `noUnusedLocals`, `noUnusedParameters`) ·
`npx eslint .` ✓ · 23 routes crawled ✓ · 32 internal link targets resolve ✓ · zero console
errors and zero hydration warnings ✓ · 8 viewport widths with zero overflow ✓.

Full results in `QA_REPORT.md`. Outstanding owner-supplied facts in
`IMPLEMENTATION_OPEN_FACTS.md`.
