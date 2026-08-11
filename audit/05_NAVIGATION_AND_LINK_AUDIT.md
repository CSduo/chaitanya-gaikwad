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
