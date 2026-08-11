# 07 — DESIGN SYSTEM INVENTORY

**Audit date:** 2026-08-11 · Values are computed styles read from the live site, cross-checked against `src/index.css` and the JSX.

---

## 0. HOW THE SYSTEM IS DEFINED

There is **no `tailwind.config` file**. Tailwind v4 runs through `@tailwindcss/vite` with configuration expressed entirely in a 37-line `src/index.css`.

The complete design-token declaration is:

```css
@theme {
  --font-sans:    "Plus Jakarta Sans", "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-serif:   "Playfair Display", serif;
  --font-display: "Outfit", sans-serif;
  --color-warm-bg:     #ffffff;
  --color-warm-ink:    #000000;
  --color-warm-accent: #000000;
}
```

**Six tokens. That is the entire design system.** Everything else — every spacing value, radius, shadow, size, and opacity — is a Tailwind utility written inline in the JSX. There are no component classes, no `@apply`, no CSS modules, and no styled-components.

Two of the three colour tokens hold the same value (`--color-warm-ink` and `--color-warm-accent` are both `#000000`), so `text-warm-accent` and `text-warm-ink` render identically. `--font-display` is defined but never used.

**Two styling dialects coexist:** `CadAutomationSection.tsx` consistently uses the token utilities (`text-warm-ink/75`, `border-warm-ink/10`, `text-warm-accent`), while `App.tsx` mostly uses raw utilities (`text-black/75`, `border-black/10`). Both compile to the same output.

---

## 1. TYPOGRAPHY

### 1.1 — Families

| Role | Family | Loaded | Used |
|---|---|---|---|
| Body / UI | **Plus Jakarta Sans** (200–800, + italic) | Yes — 2 woff2 | Yes, default on `<body>` |
| Headings | **Playfair Display** (400–900, + italic) | Yes — 1 woff2 | Yes, via the `.serif` class |
| Display | **Outfit** (300–800) | Requested in the CSS `@import` | **NO — zero usages site-wide** |
| Monospace | *(none loaded)* | — | `font-mono` used in ~20 places → falls back to the OS default |

Delivery: one `@import` (line 1 of `index.css`) to Google Fonts with `display=swap`. No `preconnect`, no `preload`, not self-hosted. Measured chain: main CSS → fonts CSS (52 ms) → woff2 (59 ms).

Applied as two utility classes:
```css
.serif   { font-family: var(--font-serif); }
.display { font-family: var(--font-display); }   /* never used */
```

### 1.2 — Heading hierarchy (measured)

| Level | Family | Size | Weight | Tracking | Line-height | Where |
|---|---|---|---|---|---|---|
| H1 hero | Playfair Display | 36 → 60 → 72 → **96 px** | 600 | **−2.4 px** (−0.025em) | 120 px | Homepage only |
| H1 category | Playfair Display | 48 px (fixed) | 400 | normal | 48 px | Videos, B2B, Visualisations, Websites |
| H1 startup | Playfair Display | 48 → 72 px | 400 | normal | `leading-none` | Startup |
| H2 section | Playfair Display | **48 px (fixed at every width)** | 400 | normal | 48 px | Projects, Services, Experience, Let's connect |
| H2 sub | Plus Jakarta Sans | 16 → 18 px | 700 | normal | snug | Hero bio line |
| H3 card | Playfair Display | 18 / 20 / 24 / 30 px | 400–600 | normal | 33 px @24 px | Service, project, workbook, website cards |
| H4 | Playfair Display | 18–20 px | 600 | normal | tight | CAD sub-cards |
| H4 panel | Plus Jakarta Sans | 10 px | 700 | widest | — | `APPROACH`, `KEY STRENGTHS` |

**Only three headings scale with viewport.** Every section H2 is a fixed 48 px from 360 px to 1920 px.

### 1.3 — Body & UI scale (all fixed-size)

| Size | Weight | Transform | Tracking | Typical use |
|---|---|---|---|---|
| 16 px | 400 | none | normal | Footer body, base |
| 14 px | 400 | none | relaxed | Section body copy (`text-sm`) |
| 12 px | 400 | none | relaxed | Card body copy (`text-xs`) |
| 11 px | 400–800 | none / upper | 1.1 px | Card descriptions, skill labels, disclaimer |
| **10 px** | 600–800 | uppercase | 1–2 px (0.1–0.2em) | **Nav links, all eyebrows, all buttons, footer** |
| **9 px** | 600–700 | uppercase | wider | Tag chips, card meta, category pills |
| **8 px** | 700 | uppercase | wider | Experience period, `PRIVACY STATUS` |

**The dominant UI size on this site is 10 px uppercase at weight 600–800 with wide tracking.** It is used for the navigation, every section eyebrow, every button label, and the footer. 8 px and 9 px are used for real content, not just decoration.

### 1.4 — Text transformations
`uppercase` is applied to: all nav links, all eyebrows, all button labels, all tag chips, all badges, all card meta, all step labels, the footer, and the role badges. Sentence case survives only in headings and body paragraphs.

---

## 2. COLOUR

### 2.1 — Core palette — effectively two colours

| Role | Value |
|---|---|
| Page background | `#ffffff` (pure white, set on `body`) |
| Foreground | `#000000` (pure black, set on `body`) |
| Accent | `#000000` — **the accent token is black; there is no accent colour** |

### 2.2 — The real palette is opacity steps of black

| Token | Compiled | Measured contrast on white | Use |
|---|---|---|---|
| `black` | `#000000` | 21.0 : 1 | Headings, body, buttons |
| `black/80` | `oklab(0 0 0 / 0.8)` | ~13 : 1 | Table cells |
| `black/75` | | ~11 : 1 | Card body |
| `black/70`, `/65`, `/60` | | 5.7–7.9 : 1 | Secondary body |
| `black/50` | | **3.95 : 1** | Footer copy, social icons — **fails WCAG AA** |
| `black/40` | | **2.85 : 1** | Card meta, periods, descriptors, `PRIVATE` — **fails WCAG AA** |
| `black/30` | | **2.10 : 1** | Role-badge dots — **fails** |
| `black/20`, `/10`, `/5`, `/2` | | — | Borders, fills, wash |

Borders: `black/5` (cards), `black/10` (nav, panels, dividers), `white/10`–`/20` (dark surfaces).

### 2.3 — Non-monochrome colours (the complete list)

| Colour | Value | Where |
|---|---|---|
| WhatsApp green | `#25D366` | 9 circular badges |
| Green 700/800 | Tailwind | `Phone & Email Redacted`, sheet-count chips, `CheckCircle2` ticks |
| Instagram gradient | `linear-gradient(135deg,#F9CE34 0%,#EE2A7B 45%,#D62976 65%,#962FBF 82%,#4F5BD5 100%)` | 6 Instagram badges |
| Instagram blue | `#0095f6` | 5 verified ticks |
| Amber 500/800/400/300 | Tailwind + `#F59E0B`, `#FDE68A` | `CURRENTLY IN DEVELOPMENT` ×2; the Bahrain banner and its BorderBeam |
| Neutral 100/200/800/900/950 | Tailwind | Portrait placeholder, background blurs, Bahrain gradient, lightbox chrome |

**Every one of these enters through a third-party brand (WhatsApp, Instagram) or a single status treatment (amber = in development, green = redacted/verified).** The site has no colour of its own.

### 2.4 — Gradients

1. Instagram brand gradient (6 uses)
2. `bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900` — Bahrain banner, the only dark surface
3. BorderBeam travelling gradient `#F59E0B → #FDE68A → transparent`
4. SpotlightCard radial `rgba(0,0,0,0.08)`, 400 px, cursor-tracked
5. Two background blur blobs `bg-neutral-200/40` and `/30`

---

## 3. LAYOUT

### 3.1 — Containers

| Container | Width | Used by |
|---|---|---|
| `max-w-6xl` | **1152 px** | Homepage `<main>` |
| `max-w-5xl` | **1024 px** | Nav bar, CAD, Videos, B2B, Visualisations, Websites, Startup |
| `max-w-[1600px]` | **1600 px** | Spreadsheet viewer only |
| `max-w-3xl` / `2xl` / `xl` / `sm` | 768 / 672 / 576 / 384 px | CTA panels, copy blocks, CTA grid |

Horizontal padding: `px-6` (24 px) everywhere except the viewer (`px-4 sm:px-10`).
**Three different page widths across eight pages, and the nav does not match the homepage.**

### 3.2 — Grids

| Pattern | Breakpoints | Used by |
|---|---|---|
| 1 → 2 | md | Projects (5 cards), B2B (8), Experience (6, at `sm`) |
| 1 → 2 → 3 | sm, lg | Services (9), CAD capabilities (12), CAD features (6), Startup features (6) |
| 1 → 2 → 3 | md, lg | Videos (9), Visualisations (49), Websites (3) |
| 1 → 2 → 4 | sm, lg | CAD workflow (4) |
| 2 → 3 → 4 → 5 | sm, md, lg | Startup screenshots (9) |
| 2 → 4 | lg | Hero CTA buttons |
| 12-col | lg / md | CAD intro (6/6), CAD input-output (5/2/5), Experience (5/7), Startup hero (7/5), Startup build (6/6), viewer header (2/1) |

### 3.3 — Spacing

Section rhythm: `py-24` (96 px) on homepage sections; `py-12 md:py-20` on the hero; `space-y-20` between CAD blocks; `space-y-24` between Startup blocks.
Grid gaps: 12 / 16 / 24 / 32 / 40 / 48 / 64 px. Card padding: 24 / 32 / 48 / 64 px.
Section dividers: 1 px `border-b border-black/10`.
**No spacing scale is declared** — values are picked per-instance from Tailwind's default scale.

### 3.4 — Border radii — 11 distinct values in use

| Value | Utility | Applied to |
|---|---|---|
| 8 px | `rounded-lg` | File-format chips |
| 12 px | `rounded-xl` | Icon tiles, mosaic images |
| 16 px | `rounded-2xl` | Hero CTA buttons, skill icon tiles, Approach panels |
| 17.6 px | `rounded-[1.1rem]` | Ciyato logo (homepage) |
| 20 px | `rounded-[1.25rem]` | Ciyato logo (startup) |
| 28.8 px | `rounded-[1.8rem]` | CAD preview mosaics, render tiles |
| 32 px | `rounded-[2rem]` | Service cards, render tiles, Startup cards |
| 36.8 px | `rounded-[2.3rem]` | Video card inner |
| 40 px | `rounded-[2.5rem]` | Project cards, workbook cards, CAD cards, video shells |
| 48 px | `rounded-[3rem]` | CTA panels, quality-control panel |
| 9999 px | `rounded-full` | Pills, badges, circular buttons |

The visual signature is **very large radii (40–48 px)** on cards and panels. There is no radius scale — five of the eleven are arbitrary bracket values.

---

## 4. UI COMPONENTS

### 4.1 — Buttons (no shared component; every button is styled inline)

| Variant | Style | Instances |
|---|---|---|
| Primary solid | black bg, white text, 10–12 px uppercase 600–800, `rounded-full` or `rounded-2xl`, `shadow-md` | ~14 |
| Secondary tinted | `bg-black/5` (or `bg-warm-ink/5`), black text, `rounded-full` | ~10 |
| Outline | `border-warm-ink/20`, transparent | 1 (`View Drawing Samples`) |
| WhatsApp black pill | black bg + 20 px `#25D366` circle + monospace number | 2 (hero) |
| WhatsApp green pill | `bg-[#25D366]/10`, `text-green-800`, green border | 2 (startup) |
| Sheet tab | active = black/white; inactive = white + `border-black/5` | per workbook |
| Icon-only | white on `white/15`, circular, `border-white/20` | lightboxes |
| Text/back link | `ArrowLeft` + 10 px uppercase, no chrome | 7 |

**No disabled state, no loading state, no pressed state, and no focus state is defined for any button variant.**

### 4.2 — Inputs
Exactly one input exists site-wide (the spreadsheet row filter): `rounded-full`, `border-black/10`, `shadow-inner`, 12 px, `focus:outline-none focus:border-warm-accent` — **and since `warm-accent` is `#000000` on a `black/10` border, the focus change is a subtle border darkening with the outline removed.** No label, no error state, no helper text. No other form control of any kind exists.

### 4.3 — Cards — 7 distinct treatments

| Type | Radius | Background | Border | Shadow | Hover |
|---|---|---|---|---|---|
| Service | 32 px | white | `black/5` → black | `shadow-sm` | border |
| Project category | 40 px | image, `brightness .4` | `black/10` | `shadow-sm` | image `scale 1.05` + spotlight |
| Experience | 32 px | white + 5 % image wash | `black/5` | `shadow-sm` | `y −3`, wash → 8 % |
| Workbook | 40 px | white | `black/5` → black | `shadow-sm` | border |
| Video | 40 px | `white/40` | `black/5` | none | control pill fades in |
| Render tile | 32 px | `white/40` | `black/5` | none | `scale 1.03` + black wash |
| CAD project | 40 px | white | `black/5` → `warm-accent/30` | `shadow-sm` | border |

### 4.4 — Tags, badges, chips

| Kind | Style |
|---|---|
| Tag chip | 9 px 600, `bg-black/5` or white, `rounded` / `rounded-full`, `text-black/60` |
| Sheet count | 9 px 700 uppercase, `bg-green-800/10`, `text-green-800` |
| Status (dev) | 8–9 px 700 uppercase, `bg-amber-500/10`, `text-amber-800`, amber border, `rounded-full` |
| Category pill (CAD) | 9 px 700 uppercase white on `bg-black/65` + `backdrop-blur-md`, `rounded-full` |
| Count chip (CAD) | 9 px monospace 700 white on `bg-black/75` + `backdrop-blur-md` |
| Concept count | 10 px 700 uppercase on `bg-black/10`, `rounded-full` |
| QC badge | 9 px 700 uppercase + green `CheckCircle2`, white card, `rounded-2xl` |
| File format | 12 px monospace 700, white on black, `rounded-lg` |
| `PRIVATE` | 8 px 700 uppercase, `bg-warm-ink/5`, `rounded` |
| Eyebrow | 10 px 700 uppercase, tracking 0.2em — **the most repeated element on the site** |

### 4.5 — Navigation
See doc 05. Fixed bar, `bg-white/85` + `backdrop-blur-sm`, 64 px, no active state, no hover state, no focus state, no CTA.

### 4.6 — Modals
4 lightbox/modal variants (see doc 02). **None has `role="dialog"`, `aria-modal`, a focus trap, or body-scroll lock** (verified live). Backdrops: `black/90`, `black/95`, `black/95 + blur-md`, solid black. Only the CAD lightbox and the startup lightbox label their arrow buttons.

### 4.7 — Accordions, tabs, carousels
**Accordions: none. Carousels: none.** Tabs exist in exactly one place — the spreadsheet sheet switcher — implemented as plain `<button>`s with no `role="tab"`, no `aria-selected`, and no arrow-key navigation.

---

## 5. VISUAL EFFECTS

| Effect | Implementation | Where |
|---|---|---|
| Shadows | `shadow-sm` (most cards) · `shadow-md` (hero buttons, badges) · `shadow-lg` (skill tiles, CTA panel) · `shadow-xl` (CAD hero, startup hero, Bahrain banner) · `shadow-2xl` (portrait, lightbox images) · `shadow-inner` (search input) | throughout |
| Blur / glass | `backdrop-blur-sm` (nav, video modal, renders lightbox) · `backdrop-blur-md` (video control pill, CAD pills, startup lightbox) · `blur-3xl` (2 background blobs) | throughout |
| Spotlight | `SpotlightCard` — 400 px radial `rgba(0,0,0,0.08)` following the cursor, 300 ms fade | 5 project cards |
| Border beam | `BorderBeam` — 300 px gradient on `offset-path: rect(…)`, 10 s infinite linear, masked to the border box | Bahrain banner only |
| Texture | 3.5 %-opacity SVG dot-matrix, fixed, full viewport | global |
| Image treatments | `brightness(0.4)` (project cards) · `brightness(0.95)` (render tiles) · `opacity 0.05→0.08` (experience wash) · `opacity-90` (CAD inputs) · `imageRendering: -webkit-optimize-contrast` (all CAD images) | |
| Parallax | **NONE** — `useParallaxMotion` exists in the codebase but is imported nowhere | |
| Cursor effects | Spotlight only. No custom cursor, no magnetic buttons | |
| Selection | `selection:bg-black selection:text-white` | global |

---

## 6. MOTION

Library: `motion` v12 (Framer Motion) — `motion`, `AnimatePresence`, `useScroll`, `useSpring`.

| Category | Pattern | Values |
|---|---|---|
| Page entrance | hero block | `opacity 0→1`, `y −15→0`, 0.8 s |
| | portrait | `opacity 0→1`, `scale 0.93→1`, 0.8 s, delay 0.2 s |
| | bio | `opacity 0→1`, `y 15→0`, 0.8 s, delay 0.3 s |
| | CTA grid | `opacity 0→1`, `y 10→0`, 0.8 s, delay 0.45 s |
| Scroll-triggered | project cards | `whileInView`, `viewport once`, stagger `idx × 0.05 s` |
| | service cards | `whileInView`, `viewport once`, stagger `i × 0.03 s` |
| | video / workbook / render / website cards | `animate` on mount, stagger `idx × 0.05 s` |
| Scroll-linked | progress bar | `useSpring(scrollYProgress, {stiffness 100, damping 30, restDelta 0.001})` → `scaleX` |
| Ambient loop | 5 sakura petals | `y`/`x`/`rotate` 5-keyframe loops, 8–12 s, delays 0–4 s, `repeat: Infinity`, `easeInOut` |
| Ambient loop | BorderBeam | 10 s infinite linear |
| Hover | scale 1.02–1.05 (images, tiles), `y −3`/`−4` (cards), translate-x 1.5 (chevron) | 300–700 ms |
| Modal | `AnimatePresence` fade in/out | opacity only |
| Loading | spinner (`animate-spin`) in the spreadsheet viewer | |
| Text animation | **NONE** — no typewriter, split, or reveal effects |
| Page transitions | **NONE** — route changes swap content instantly, with no exit animation |

**Reduced motion: not handled anywhere.** `prefers-reduced-motion` appears **zero times** in the codebase (verified by grep). At the same time, **69 elements on the homepage carry an active animation or transition**, including 5 petals and the border beam that loop forever.

---

## 7. WHAT THE SYSTEM DOES NOT HAVE

- No design tokens for spacing, radii, shadows, or type scale — only 6 tokens, 3 of them fonts
- No accent colour (the accent token is black)
- No dark mode, no `prefers-color-scheme` handling
- No reusable Button, Card, Badge, Section, or Container component — every instance is styled inline
- No focus-visible styles anywhere; two places actively remove the outline
- No `prefers-reduced-motion` handling
- No component library, no Storybook, no visual documentation
- No responsive type scale beyond three headings
- No empty/error/disabled/loading states outside the spreadsheet viewer
