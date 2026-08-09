# Specification Mining Report & Handoff — dishasingha Portfolio

**Author**: spec_miner_1  
**Project Root**: `C:\Users\ADMIN\.gemini\antigravity\scratch\dishasingha`  
**Working Directory**: `C:\Users\ADMIN\.gemini\antigravity\scratch\dishasingha\.agents\spec_miner_1`  
**Date**: 2026-08-09  

---

## 1. Observation

### 1.1 Project Structure & Source Code Audit
- **Framework & Tech Stack**: React 19 (`react` ^19.0.0), Vite (`vite` ^6.2.0), TypeScript (`typescript` ~5.8.2), Framer Motion / Motion (`motion` ^12.23.24), Tailwind CSS v4 (`@tailwindcss/vite` ^4.1.14), Lucide Icons (`lucide-react` ^0.546.0).
- **Core Files & Component Map**:
  - `src/App.tsx`: Main page layout, section routing, subpage views (`renderStartupPage`, `renderCadAutomationStandalonePage`, `renderVideosPage`, `renderVisualisationsPage`, `renderWebsitesPage`, `renderB2BResearchPage`, `renderSpreadsheetViewerPage`), media modals, lightboxes.
  - `src/index.css`: Defines `@theme` variables (`--font-sans`, `--font-serif`, `--font-display`, `--color-warm-bg: #ffffff`, `--color-warm-ink: #000000`, `--color-warm-accent: #000000`), body styles (`background-color: #ffffff; color: #000000;`), `.serif`, `.display`, and `@keyframes border-beam`.
  - `src/components/ui/BackgroundGrid.tsx`: Fixed background overlay (`fixed inset-0 pointer-events-none z-0 overflow-hidden`), renders an architectural SVG dot matrix pattern with opacity 0.035 (`opacity-[0.035]`) and two radial light blur blobs.
  - `src/components/ui/AvailabilityBadge.tsx`: Standalone React component rendering an emerald pulsing dot badge (`"Available for CAD Drafting & Creative Direction"`). Currently imported at `src/App.tsx` line 37, but not rendered in the active JSX layout.
  - `src/components/ui/ScrollProgress.tsx`: Fixed top scroll progress line using Framer Motion `useScroll()` and `useSpring()`.
  - `src/components/ui/MetricCounterGrid.tsx`: KPI counter grid displaying project metrics ($1,000 contract, 10,000+ B2B data, 40+ renders, 100% accuracy).
  - `src/components/ui/SpotlightCard.tsx`: Interactive spotlight card component with mouse position tracking and radial gradient hover highlight.
  - `src/components/ui/BorderBeam.tsx`: Animated border gradient beam component.
  - `src/components/CadAutomationSection.tsx`: Detailed CAD drafting portfolio showcase section and standalone page with custom lightbox, pinch-zoom, and drag-pan capability.

### 1.2 Section Bounds Mapping in `src/App.tsx`
- **Navigation Bar**: Lines 1669–1715 (`<nav className="fixed top-0 w-full z-40 bg-white/85 backdrop-blur-sm border-b border-black/10">`).
- **Hero Section (`#home`)**: Lines 1124–1304 (`<section id="home" className="py-12 md:py-20 border-b border-black/10">`). Contains centered name "Chaitanya Gaikwad", role pills, side skill columns on desktop, portrait, bio narrative, 4-button CTA grid, and `MetricCounterGrid`.
- **Projects Category Portal Section (`#projects`)**: Lines 1307–1359 (`<section id="projects" className="py-24 border-b border-black/10 scroll-mt-20">`). Renders 5 category cards (CAD Automation, Cinematic Videos, B2B Research, 3D Renders & Visualisations, Websites Developed).
- **Startup Preview Section (`#startup-preview`)**: Lines 1361–1404 (`<section id="startup-preview" className="py-24 border-b border-black/10 scroll-mt-20">`). Preview card for Ciyato Android Launcher.
- **Services Section (`#services`)**: Lines 1406–1432 (`<section id="services" className="py-24 border-b border-black/10 scroll-mt-20">`). Renders 9 service offerings cards.
- **About / Experience Section (`#about`)**: Lines 1435–1571 (`<section id="about" className="py-24 scroll-mt-20">`). Bio narrative, studio experience cards (Sultanah & Co., Red Chandelier, Chinese Export client, Ereno, Fitout 360, Jovial Decor), and approach/strengths boxes.
- **Contact / Footer Section (`#contact`)**: Lines 1574–1655 (`<footer id="contact" className="py-24 border-t border-black/10">`). "Let's connect." text, WhatsApp/Instagram direct links, social icons, copyright notice.

### 1.3 Verified Build Status
Executing `npm run build` completed synchronously with **exit code 0** (0 errors). Output generated in `dist/` (dist/index.html 1.43 kB, dist/assets/index-DYiZ0Y1z.css 37.05 kB, dist/assets/index-D7Uls7mN.js 1,460.77 kB).

---

## 2. Features Discovered

| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|----------|---------|-------------|--------|---------|----------------|----------------|
| 1 | Visual Assets | Sakura Botanical & Architectural Line-Art Flourishes | Delicate SVG line-art blossoms/petals integrated with technical architectural drafting marks (compass rings, corner crosshairs, dimension ticks, fine blueprint grid accents). | Vector SVG paths, position props, scale, rotation | Rendered SVG overlay elements framing content sections | Fallback to transparent layout if SVG fails to render | `ORIGINAL_REQUEST.md` R1 |
| 2 | Visual Framing | Availability Badge Removal & Replacement | Replace raw `AvailabilityBadge` with refined architectural & Sakura botanical framing surrounding the Hero title and section headers. | Clean header container without green pulse badge | Crisp jet black line-art frame around hero title and key sections | Clean layout render without broken imports | `ORIGINAL_REQUEST.md` R1 & Criteria |
| 3 | Motion | Ambient Slow Floating Drift | Continuous, smooth physics-based floating motion for Sakura petals with slight rotational sways. | Time-based float offset, loop duration 6–12s | 60 FPS Framer Motion / CSS `translate3d` animation | Falls back to static placement if `prefers-reduced-motion` is active | `ORIGINAL_REQUEST.md` R2 |
| 4 | Motion | Scroll-Linked Parallax Movement | Background botanical and architectural flourishes move along Y-axis / scale / rotate linked to scroll position. | `useScroll()`, `useTransform()` position values | Smooth differential scroll parallax for background line art | Linear static positioning if scroll APIs unavailable | `ORIGINAL_REQUEST.md` R2 |
| 5 | Physics | Desktop Cursor Proximity Reaction | Background drafting marks & floating petals react gently (slight repulsion or tilt) when the mouse cursor gets near on desktop. | Mouse X/Y cursor coordinates relative to element center | Spring-physic (`useSpring`) displacement within 150px radius | Silent fallback (no reaction) on touch devices (`pointer: coarse`) | `ORIGINAL_REQUEST.md` R2 |
| 6 | Aesthetics | Pure White & Jet Black High Contrast | Maintain pure `#ffffff` background with crisp `#000000` line accents and controlled 10–30% opacity on flourishes. | Color codes (`#ffffff`, `#000000`), opacity utilities (`opacity-10`, `opacity-20`, `opacity-30`) | Luxury high-fashion aesthetic with optimal contrast ratio (>15:1) | Text remains 100% legible over opacity layer | `ORIGINAL_REQUEST.md` R3 |
| 7 | Responsiveness | Responsive Whitespace & Zero Horizontal Overflow | Scale, re-anchor, or selectively hide side flourishes on mobile viewports so layout never causes X-axis scrolling. | Viewport width (`sm`, `md`, `lg`), CSS `max-w-full`, `overflow-x-hidden` | Responsive, clean mobile layout with 0 horizontal overflow | Prevents page clipping or side scrollable whitespace | `ORIGINAL_REQUEST.md` R3 & Criteria |

---

## 3. Edge Cases

| # | Feature | Input | Observed Behavior |
|---|---------|-------|-------------------|
| 1 | Scroll Parallax | Rapid user scrolling or jumping via nav anchor links (`#projects`, `#about`, `#contact`) | Transforms may jump if not spring-smoothed; must use `useSpring` on scroll transform values to avoid visual jitter during hash navigation. |
| 2 | Cursor Proximity | Touchscreen devices (mobile/tablet) lacking mouse hover | Cursor listener events don't fire; elements must gracefully default to ambient float without breaking touch scroll performance. |
| 3 | Mobile Responsiveness | Narrow mobile viewports (320px–375px) with decorative side flourishes | Side SVG flourishes positioned fixed or absolute outside container can cause horizontal scrollbar (`overflow-x`); must wrap layout in `overflow-x-hidden` or restrict SVG positioning to container boundaries (`pointer-events-none max-w-full`). |
| 4 | Reduced Motion | User OS preference `prefers-reduced-motion: reduce` | Floating animations and parallax transforms can cause motion sickness; motion must be disabled or dampened via Framer Motion `useReducedMotion()`. |
| 5 | Dark Mode / High Contrast Override | Browser or OS forced dark mode / color inversion | Hardcoded `#ffffff` background and `#000000` strokes ensure pure high-contrast white & jet black aesthetic across modern browsers. |

---

## 4. Detailed Specification Breakdown

### 4.1 Botanical & Architectural Visual Asset Specifications (R1)
1. **Sakura Botanical Flourishes**:
   - Single Japanese Sakura 5-petal blossom vector contour.
   - Petal cluster / falling single petal vector outlines.
   - Delicate branch stroke contours with subtle botanical curves.
   - Vector styling: `fill="none"`, `stroke="#000000"`, `strokeWidth="1"` or `"1.5"`, `strokeLinecap="round"`, `strokeLinejoin="round"`.
2. **Architectural Geometric Drafting Marks**:
   - Precision compass rings (concentric thin circles with degree tick marks).
   - Corner crosshair drafting marks (`+` targets with 90° corner brackets).
   - Blueprint alignment grid lines with fine dimension tick marks.
   - Technical datum symbols and coordinate markers (`N 00°`, `X:Y` drafting axes).
3. **Framing Placement Targets**:
   - **Hero Section (`#home`)**: Framing around "Chaitanya Gaikwad" title and central portrait card.
   - **About Section (`#about`)**: Corner drafting crosshairs framing the experience grid and bio.
   - **Projects Section (`#projects`)**: Side botanical flourishes with blueprint tick marks framing category cards.
   - **Contact Section (`#contact`)**: Architectural compass ring and falling petal flourish framing "Let's connect." heading.

### 4.2 Availability Badge Removal & Replacement Specs (R1)
- **Current State**: `AvailabilityBadge` component defined at `src/components/ui/AvailabilityBadge.tsx` and imported at `src/App.tsx` line 37. Not currently rendered in active layout.
- **Action**:
  - Remove `import { AvailabilityBadge } from "./components/ui/AvailabilityBadge";` from `src/App.tsx`.
  - Replace availability badge area with a refined Sakura blossom + crosshair architectural drafting mark header accent directly above the Hero title.

### 4.3 Motion & Interactive Physics Specs (R2)
1. **Ambient Slow Floating Drift**:
   - Petal elements drift vertically along Y-axis: `y: [0, -18, 0, 12, 0]` pixels.
   - Rotation sway: `rotate: [0, 8, -6, 4, 0]` degrees.
   - Duration: 8 to 14 seconds per loop, easing `easeInOut`, `repeat: Infinity`.
   - GPU accelerated via CSS transforms / Framer Motion.
2. **Scroll-Linked Parallax Movement**:
   - Linked to page scroll via Framer Motion `useScroll()`.
   - Background architectural drafting marks shift vertically at rate: `yParallax = scrollYProgress * -120px` to `+80px`.
   - Botanical branch elements rotate slightly on scroll: `rotateParallax = scrollYProgress * 15deg`.
   - Spring smoothed with `stiffness: 100`, `damping: 30` to eliminate scroll stutter.
3. **Desktop Cursor Proximity Reaction**:
   - Active only when `window.matchMedia('(pointer: fine)').matches`.
   - Mouse position listener tracks pointer `(mouseX, mouseY)`.
   - Proximity radius threshold: 180px from flourish anchor center.
   - Displaces flourish away from cursor by up to 25px (`dx * factor`, `dy * factor`) using Framer Motion spring physics.
   - Smoothly returns to baseline ambient position when cursor moves outside threshold.

### 4.4 Responsive Whitespace & Contrast Specs (R3)
1. **Background**: Pure white `#ffffff` enforced on root HTML/body and main layout containers.
2. **Flourish Opacity**:
   - Background architectural blueprint grids/rings: 10% to 20% opacity (`opacity-10`, `opacity-20`, `rgba(0,0,0,0.1)`).
   - Foreground botanical framing lines: 20% to 30% opacity (`opacity-20`, `opacity-30`, `rgba(0,0,0,0.25)`).
   - Hover / active state accents: Up to 40% opacity (`opacity-40`).
3. **Jet Black Accents**: High-precision crisp jet black `#000000` / `rgb(0, 0, 0)`.
4. **Mobile Layout Rules**:
   - Side-flanking desktop flourishes stack cleanly or scale down to max width 100vw.
   - All flourish parent containers must have `pointer-events-none` and `overflow-hidden` or `max-w-full`.
   - Enforce `overflow-x-hidden` on `main` and `App` top-level wrapper to prevent horizontal scrollbars on mobile viewports.

---

## 5. Logic Chain

1. **Source Analysis**: The user request and `ORIGINAL_REQUEST.md` define an aesthetic enhancement combining Japanese Sakura botanical line art with architectural geometric drafting marks.
2. **Current Code Base Analysis**: `App.tsx` has a clean white structure with existing UI components (`BackgroundGrid`, `ScrollProgress`, `SpotlightCard`, `MetricCounterGrid`, `CadAutomationSection`). `AvailabilityBadge.tsx` is an unused green pulse component that must be removed.
3. **Technical Feasibility**: Framer Motion (`motion` 12.23.24) is already installed and heavily used across `App.tsx`. Implementing SVG flourishes with Framer Motion `useScroll`, `useTransform`, `useSpring`, and ambient `animate` loops fulfills all motion physics requirements without introducing external dependencies.
4. **Visual Rules Feasibility**: Tailwind v4 with inline SVG styling (`stroke="#000000"`, `opacity-[0.15]`) satisfies pure white (#ffffff), jet black (#000000), and 10–30% opacity constraints while ensuring text legibility.
5. **Responsiveness Feasibility**: Wrapping flourish overlays in `pointer-events-none absolute/fixed` containers with proper responsive media queries (`hidden md:block` for heavy desktop side flourishes, scaled SVG viewports for mobile) prevents horizontal overflow.

---

## 6. Caveats

- **No New Large External Dependencies Needed**: Built-in SVG vector rendering and Framer Motion provide full control over animation physics, frame rates, and styling.
- **Touch Device Behavior**: Desktop cursor proximity events must be gated with fine pointer checks (`window.matchMedia('(pointer: fine)')`) so touch devices do not cause unnecessary event overhead or unexpected element shifts.
- **Standalone Subpages**: Route changes to `#projects/b2b-research`, `#startup`, `#cad-automation`, etc., render subpages where global background flourishes must non-intrusively frame content without interfering with subpage interactive tools (such as Excel table viewers or CAD lightboxes).

---

## 7. Conclusion

The specification requirements for the Japanese Sakura botanical and architectural drafting flourishes are fully extracted, categorized, and mapped directly to the codebase. The implementation team can immediately create the bespoke SVG flourish components, integrate them around the Hero, About, Projects, and Contact sections, remove the obsolete `AvailabilityBadge`, apply smooth Framer Motion floating drift, scroll parallax, and cursor proximity physics, and ensure zero horizontal overflow on mobile viewports.

---

## 8. Verification Method

1. **Build Verification**: Run `npm run build` in `C:\Users\ADMIN\.gemini\antigravity\scratch\dishasingha` to verify Vite build completes with 0 errors.
2. **Code Inspection**: Verify `src/App.tsx` imports and renders the new Sakura & Architectural flourish components around `#home`, `#about`, `#projects`, `#contact`, and that `AvailabilityBadge` is completely unimported/removed.
3. **Layout & Contrast Verification**: Inspect DOM rendering on desktop (1920x1080) and mobile (375x667) viewports to confirm pure white `#ffffff` background, crisp jet black `#000000` accents, opacity levels strictly between 10%–30%, and `document.documentElement.scrollWidth === document.documentElement.clientWidth` (no horizontal overflow).
4. **Motion Verification**: Confirm 60 FPS smooth animations for ambient floating drift, scroll-linked parallax, and desktop mouse proximity reactions.
