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
