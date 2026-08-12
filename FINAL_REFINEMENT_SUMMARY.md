# XIYÀTO — final refinement pass

Refinement of the existing site, not a rebuild. Routes, navigation, layouts,
buttons, modals, galleries, filters and form flow are unchanged. What changed is
wording, content depth, brand application, the neutral colour system, mobile
composition, media presentation and search metadata.

Restore point: tag `pre-refinement-pass` at `d2eef26`.

---

## 1. Colour system — the warm cast removed

The palette was warm at source. `globals.css` defined `--color-paper: #faf8f5`
(cream), `--color-ink: #16130f` (brown-tinted near-black), `--color-rule:
#e0dad0` (beige) and a `#6b2233` oxblood accent. The file's own header described
it as "paper ground, warm near-black ink, single oxblood accent".

Every neutral is now achromatic — R, G and B are equal — so nothing can drift
yellow on a wide-gamut display.

| Token | Was | Now |
|---|---|---|
| `--color-paper` | `#faf8f5` | `#ffffff` |
| `--color-surface` | `#ffffff` | `#ffffff` |
| `--color-paper-deep` | `#f3efe9` | `#f7f7f7` |
| `--color-ink` | `#16130f` | `#0a0a0a` |
| `--color-ink-soft` | `#423b33` | `#3a3a3a` |
| `--color-ink-muted` | `#6b6157` | `#5a5a5a` |
| `--color-ink-faint` | `#948a7e` | `#737373` |
| `--color-rule` | `#e0dad0` | `#e5e5e5` |
| `--color-rule-strong` | `#c9c0b3` | `#cfcfcf` |
| `--color-accent` | `#6b2233` | `#810100` |

**The brand red is measured, not chosen.** Sampling the supplied logo across
7,869 pixels of the monogram gives a dominant cluster at `#810100` (mode, 1,215
hits). It carries 10.8:1 contrast on white.

Verified in the browser: the rendered palette is exactly nine achromatic greys
(`#000000 #0a0a0a #3a3a3a #5a5a5a #737373 #cfcfcf #e5e5e5 #f7f7f7 #ffffff`) plus
the brand red and one red tint. No beige, cream, ivory or yellow anywhere.

`bg-surface` and `bg-paper-deep` swapped roles: on a white canvas, alternating
sections step *down* to grey rather than up to white.

---

## 2. Media quality corrections

The owner reported vertical/horizontal lines, seams, blurry bands and splitting
through images and video. Diagnosed before changing anything.

| Asset / component | Cause | Source clean? | Fix | Quality after |
|---|---|---|---|---|
| CAD drawing grid, visualisation gallery, work gallery | `grid gap-px` + `bg-rule` on the container. The 1px gap let the container's beige background print a line **between adjacent images**. Measured cell widths were fractional (175.406 / 175.422 / 351.828), so the browser rasterised that hairline inconsistently — crisp on some columns, a 2px blurred band on others. | Yes | Replaced the hairline gap with real gaps (`gap-3`/`gap-4`); each image now carries its own `.media-well` frame. Nothing is drawn between two images. | No seam, no band |
| 19 images across galleries, cards and posters | `group-hover:scale-[1.03]` / `scale-[1.02]` applied **directly to `<img>`**. Scaling the bitmap forces the compositor to resample it, softening fine CAD linework. | Yes | Hover depth moved to the surrounding frame (`.media-frame`). The image layer carries no transform. | Sharp at rest and on hover |
| Video posters, play badges, scene labels | `backdrop-filter: blur(8px)` on overlays sitting on media — a compositing layer that can leave a visible edge. | Yes | Removed from every element over media; opacity raised to keep contrast. Retained only on the sticky header, which is chrome, not portfolio. | Clean |
| CAD drawings in grids | `object-cover` cropped technical sheets, trimming title blocks and dimensions. | Yes | Added a `fit` prop; drawings use `object-contain` on a neutral well. | Nothing cropped |
| Hero capability tiles | Same `gap-px bg-rule` hairline between tile images. | Yes | Real 4px gaps on a neutral ground. | Clean |

**Ruled out, honestly:** resolution was never the problem. A survey of every
rendered image found **zero** served below its displayed size × DPR — no
thumbnail was being enlarged, no low-res derivative substituted. The defect was
entirely in the presentation layer.

A site-wide rule now holds: decoration frames the work, never crosses it.
`.deco` is `pointer-events: none`, `aria-hidden`, and `z-index: 0` behind
content; `.deco-host` uses `isolation: isolate` and `overflow: clip`.

---

## 3. Brand assets

Generated from the supplied artwork. The monogram is **never redrawn** — the
emblem and wordmark are cropped from the original raster, so the letterforms and
the accent on the À cannot be distorted by an inaccurate vector trace.

- `public/brand/emblem-{512,256,180,64,48,32,16}.png` — measured bounding box
  of the circular monogram (x 337–918, y 152–726), squared and padded
- `public/brand/emblem-mark-{512,256,128}.png` — transparent variants;
  luminance mapped to alpha with the red preserved, so the mark sits on any
  ground without a white tile
- `public/brand/logo-full.png` — trimmed full lock-up
- `app/favicon.ico` — hand-assembled ICO packing 16/32/48
- `app/icon.png`, `app/apple-icon.png` — file-convention icons
- `app/opengraph-image.png` — 1200×630 social card

The previous `icon.tsx` / `apple-icon.tsx` / `opengraph-image.tsx` generators
drew a letterform on an ink square. They are deleted; the real emblem replaces
them.

**Two defects were caught by looking at the output rather than trusting the
crop maths.** The first OG render showed a faint grey panel where each crop met
the canvas — the artwork's ground is `#fefefe`, not pure white — and ClearType
was fringing the text with colour. Fixed by snapping near-white to `#ffffff`
after compositing and switching to grayscale antialiasing.

The emblem appears in the footer beside the wordmark. It is **not** enlarged
into the navigation.

---

## 4. Founder portrait

The supplied photograph, unretouched, at `public/media/people/`:

- `founder-4x5.jpg` (1000×1250) — editorial crop; the source is 995×1280
  (0.777), already close to 4:5, so only a slight trim from the bottom was
  needed and nothing is cut from the head
- `founder-1x1.jpg` (800×800) — compact square, top-anchored so the face stays
  centred

Used on `/company/people` and previewed on `/company`. Not added to the
homepage. Alt text describes only what the photograph shows.

---

## 5. The lost section effect — found and restored

Searched git history rather than guessing. The pre-rebuild decoration set
survives on `legacy/pre-rebuild-snapshot`:

```
src/components/ui/decorations/CornerCrosshairs.tsx
src/components/ui/decorations/BlueprintAccent.tsx
src/components/ui/decorations/CompassRing.tsx
src/components/ui/BackgroundGrid.tsx
```

`CornerCrosshairs` carries an "Outer Corner Frame" path — `M 6 36 L 6 6 L 36 6`
— four of which around a region produce exactly the matchbox outline the owner
described. It is the same visual language as the new logo: concentric circles,
registration crosshairs, measurement ticks.

Restored as `components/brand/Divider.tsx`:

- **`SectionDivider`** — two hairlines drawing outward from the centre, a
  registration tick, one short brand-red segment, and an optional drafting
  index (`02 / Growth`). Draws once on viewport entry via IntersectionObserver;
  static and complete under `prefers-reduced-motion`. Placed between the six
  homepage chapters.
- **`BoxFrame`** — the corner-bracket outline, desktop only.

---

## 6. Brand graphic language

`components/brand/decorations.tsx` — eight motifs in one drawing set, all built
from the logo's construction geometry:

`ConstructionRing`, `CornerFrame`, `CadMotif` (plan, wall offset, door swing,
dimension line, grid bubbles), `GrowthMotif` (record table branching to
prospects), `VisualisationMotif` (frame, crop marks, one-point perspective),
`VideoMotif` (frame sequence, timeline, timecode ticks), `AutomationMotif`
(inputs → process → outputs with a return loop), `WebMotif` (three viewports and
a breakpoint dimension line).

Deliberately excluded: any recreation of the XIYÀTO monogram.

Every motif is `aria-hidden`, `focusable="false"`, uses `currentColor`, carries
no filter or blend mode, and is hidden below `lg` — decoration simplifies on
small screens rather than shrinking.

---

## 7. Copy

Baseline captured first: `audit/CURRENT_SITE_COPY.txt` (36 routes, 6,382 lines,
verbatim). Final state: `audit/FINAL_SITE_COPY.txt`, same route structure.

**Positioning.** The homepage H1 was *"Technical, creative and growth services
for design-led businesses."* — too narrow. Now: *"One partner to build, present,
operate and grow a design practice, a brand or a manufacturer."*

Rewritten: all six service summaries, overviews and intros; homepage hero,
capability index, process intro and CTA; the Company narrative (eight chapters);
founder biography; Work hero and six category blurbs; Services overview.

**Kept deliberately.** The Careers and Contact headlines were not replaced —
the authored Careers H1 repeated wording already used on two other routes, so
the existing line is stronger.

### Three factual overclaims caught before publication

An adversarial verification pass ran three independent lenses (fabrication,
banned language, duplication) over the draft, raising 22 findings. Three were
factual errors, each verified against the real data rather than taken on trust:

1. **"a public source recorded against every claim"** — only **2 of 8**
   workbooks carry a Source Log sheet (Saudi, Philippines). Corrected to "the
   larger studies carry a source log".
2. **"Each … with scoring, sources, excluded records and contact routes"** —
   excluded records appear in exactly **1 of 8** (`Removed - Backup Rows`).
   Rewritten to state what each workbook actually holds.
3. **"Nine short-form films for furniture brands, showrooms … and a property
   developer"** — one of the nine is `great-design-holds-attention-walkthrough`,
   marked `client: null, descriptor: "Internal visual study"`. Corrected to
   eight client films plus one internal study.

**The same false claim was already live.** `lib/services.ts` carried "Every
claim in the data is traceable to a recorded public source" in the published
Growth overview. Removed.

Also fixed: stale scope claims. `/services` still read *"Production capacity
across three disciplines."* and its meta description said *"Three services"*;
the Company and Careers pages referenced "the three disciplines". `DISCIPLINES`
in `lib/company.ts` listed three. All now reflect six.

---

## 8. Work page

Categories match the requested set exactly and the existing URL-addressable
filter is retained — it renders real links, so each view is shareable and works
without JavaScript.

Unfiltered, the archive now reads as six labelled chapters (heading, count,
contextual sentence, and a link to the service that produced the work).
Filtered, it stays a single flat grid. Cards and destinations are identical
either way — only the grouping changes.

On phones the filter is a horizontal snap rail bleeding to the screen edge, so
the last chip is visibly cut off; from `sm` it wraps as before. Six labels
wrapped to three cramped lines at 360px.

Verified: `?category=video` → 10 of 26; unfiltered → 26 across 6 chapters.

---

## 9. Company page

Expanded from a fixed set of blocks to eight authored chapters
(`lib/company-copy.ts`, rendered by `components/company/Narrative.tsx`):

what XIYÀTO is · what we solve · one partner, multiple capabilities · how the
disciplines connect · how projects are run · who we work with · UK + India
operating presence · founder accountability

Tone alternates white / `#f7f7f7` so it reads as chapters rather than one wall.
Supporting points break the prose up instead of extending it.

Nothing asserts headcount, offices, trading history, revenue or legal status.
"Who we work with" describes types of business, never named clients.

---

## 10. Mobile

- Homepage at 360px: **26.6 → ~19 screens**. The video chapter alone went
  2,490px → 1,202px.
- Video posters are a horizontal snap rail below `sm`. A 9:16 poster is roughly
  640px tall on a 360px screen; three stacked consumed most of the page.
- Fluid headline scale reworked per route rather than reusing desktop sizes
  (homepage H1 31px/34px at 360).
- Chapter padding `py-16` → `py-12`, grid gaps `gap-10` → `gap-8` on mobile.
- Touch targets: footer links 32px → 44px (compact rhythm returns at `lg`, not
  `sm` — tablets are touch devices); breadcrumbs 19px → 44px on touch and a
  24px minimum on desktop; card title links 42.8px → 44px; checkbox 20px → 24px.
- Mobile nav panel: white, dark text, no warm tint.

**Two bugs I introduced and caught in QA:**

- The video rail overflowed the page at 768px. Grid items default to
  `min-width: auto`, so an 872px rail forced its column wider than the viewport
  instead of scrolling inside it. Fixed with `min-w-0` on the chapter content
  column and the Work filter column.
- The hero construction ring bled 160px past the right edge at 768px, causing
  horizontal scroll. Fixed with `overflow: clip` on `.deco-host` — clips without
  creating a scroll container, so sticky and focus-scroll behaviour is
  unaffected — and decoration is now hidden below `lg`.

---

## 11. Accessibility and performance

- Zero horizontal overflow at 360/390/430/768/1024/1280/1440/1920 across every
  major route
- Zero broken images; zero videos loaded before a click
- Every decorative SVG `aria-hidden`, `pointer-events: none`, behind content
- One H1 per route; focus visible throughout; `prefers-reduced-motion` honoured
  by the divider draw and every transition
- Portrait dimensions declared, so no layout shift

---

## 12. Files changed

**New**
```
components/brand/decorations.tsx      components/brand/Divider.tsx
components/company/Narrative.tsx      lib/seo-copy.ts
lib/home-copy.ts                      lib/company-copy.ts
audit/CURRENT_SITE_COPY.txt           audit/FINAL_SITE_COPY.txt
public/brand/*                        public/media/people/founder-{4x5,1x1}.jpg
app/icon.png  app/apple-icon.png  app/opengraph-image.png  app/favicon.ico
```

**Modified**
```
app/globals.css                       app/layout.tsx
app/page.tsx                          app/work/page.tsx
app/services/page.tsx                 app/services/[slug]/page.tsx
app/company/page.tsx                  app/company/people/page.tsx
app/careers/page.tsx                  app/contact/page.tsx
app/work/research/[slug]/page.tsx     app/site.webmanifest/route.ts
components/media/viewers.tsx          components/work/{cards,media,WorkFilter}.tsx
components/home/{ServiceSections,ServiceProof,HeroCapabilities,scenes}.tsx
components/site/Footer.tsx            components/ui/primitives.tsx
components/forms/fields.tsx           lib/{seo,site,services,company,case-studies}.ts
next.config.ts
```

**Deleted**
```
app/icon.tsx  app/apple-icon.tsx  app/opengraph-image.tsx   (placeholder marks)
```
