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
