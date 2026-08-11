# XIYÀTO — FINAL REDIRECT MAP

**Date:** 2026-08-11
**Implemented in:** `next.config.ts` (server-side) and
`components/site/LegacyHashRedirect.tsx` (fragment shim)

Every retired URL resolves to its closest genuine destination. **No route bulk-redirects to
the homepage.** All server redirects are 308 Permanent.

---

## 1. SERVER-SIDE REDIRECTS (308 Permanent) — verified live

| # | Old path | New destination | Rationale |
|---|---|---|---|
| 1 | `/cad-automation` | `/services/cad-technical-production` | The CAD page became the flagship service page |
| 2 | `/projects/videos` | `/work?category=visual-content` | Video work is now a work category |
| 3 | `/projects/visualisations` | `/work?category=visual-content` | Renders and visualisations, same category |
| 4 | `/projects/b2b-research` | `/work?category=growth-operations` | B2B research is now Growth Operations |
| 5 | `/projects/b2b-research/:slug` | `/work?category=growth-operations` | 8 workbook viewer URLs; the viewer is retired, the category is the closest destination |
| 6 | `/projects/websites` | `/work?category=multi-disciplinary` | Website work now sits inside a multi-disciplinary engagement |
| 7 | `/projects` | `/work` | Category index becomes the work index |
| 8 | `/startup` | `/work` | Ciyato archived; work index is the nearest live surface |
| 9 | `/about` | `/company` | About consolidated into the Company page |
| 10 | `/services/cad` | `/services/cad-technical-production` | Short-slug alias reserved against mistyping |
| 11 | `/company/about` | `/company` | The separate About route was removed in IA_02 |
| 12 | `/legal` | `/legal/privacy` | No legal index page exists by decision |

---

## 2. FRAGMENT COMPATIBILITY SHIM (client-side)

Server redirects cannot see a URL fragment — the browser never transmits it. Inbound links
carrying the old hash routes are therefore translated on mount and the fragment is stripped
from history so it cannot re-fire.

**This does not reintroduce hash routing.** It is a one-shot translation table in
`LegacyHashRedirect.tsx`.

| Old fragment | New destination |
|---|---|
| `#/cad-automation`, `#cad-automation` | `/services/cad-technical-production` |
| `#/projects/videos` | `/work?category=visual-content` |
| `#/projects/visualisations` | `/work?category=visual-content` |
| `#/projects/b2b-research` | `/work?category=growth-operations` |
| `#/projects/b2b-research/{slug}` | `/work?category=growth-operations` |
| `#/projects/websites` | `/work?category=multi-disciplinary` |
| `#/projects`, `#projects` | `/work` |
| `#/startup`, `#startup` | `/work` |
| `#services` | `/services` |
| `#about` | `/company` |
| `#contact` | `/contact` |
| `#home`, `#/` | `/` |

Repeated leading hashes (`##/foo`) are normalised before matching, mirroring the old site's
own behaviour.

---

## 3. RESOLUTION OF THE TWO IA_02 OPEN GAPS

IA_02 §17.2 recorded two destinations that could not be decided at architecture stage.
Both are now resolved.

### Website development work
**Decision: retained inside a multi-disciplinary engagement; not made a service.**

The three website projects were reviewed individually:

| Project | Decision | Reason |
|---|---|---|
| Export Brand Website | **Retained** — folded into the *Hotel Linen Export* case study | Genuine commercial work with real surrounding context. Its dead "available for acquisition" CTA is gone |
| Personal Portfolio Website | **Removed** | Self-referential; linked to the site the visitor was already on |
| Anvikshiki Journal | **Archived** | Academic publishing is off-positioning for the approved service set |

`/projects/websites` → `/work?category=multi-disciplinary`, which contains the surviving work.

### Ciyato startup
**Decision: archived from the commercial site, source preserved.**

A consumer Android launcher has no place in the architecture of a B2B production studio, and
forcing it in would have required a fourth division the brief explicitly ruled out. All 20
assets and the full page remain on `legacy/pre-rebuild-snapshot`.

`/startup` → `/work` (308) rather than 410, because the content is archived rather than
permanently retired — if a home for it is chosen later, this redirect is the single line that
changes.

---

## 4. URLS THAT NOW CORRECTLY RETURN 404

Previously every one of these returned HTTP 200 with the homepage.

| Path | Status |
|---|---|
| Any unmatched path | **404** |
| `/work/{unknown-slug}` | **404** |
| `/services/{unknown-slug}` | **404** |
| `/legal/cookies` | **404** (unpublished) |
| `/legal/accessibility` | **404** (unpublished) |
| `/legal/company-information` | **404** (unpublished) |

`/robots.txt` and `/sitemap.xml` now return their real content types instead of HTML.

---

## 5. HOST-LEVEL REDIRECTS — REQUIRES DASHBOARD CONFIGURATION

Not implementable in application code; must be set in the Vercel project.

| From | To | Type |
|---|---|---|
| `http://xiyato.uk` | `https://xiyato.uk` | 308 (already active) |
| `https://www.xiyato.uk` | `https://xiyato.uk` | **301 — to configure** |
| `https://chaitanya-gaikwad.vercel.app` | `https://xiyato.uk` | **301 — to configure** |

All application canonicals already point at `https://xiyato.uk`, so search engines receive a
consistent signal even before these are applied.

**No redirect loops:** each source appears exactly once, all targets are terminal, and no
target is itself a redirect source.
