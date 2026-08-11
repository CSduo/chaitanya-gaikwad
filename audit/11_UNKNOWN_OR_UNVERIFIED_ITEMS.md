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
