# Codebase Structure & Setup Investigation Report

## 1. Observation

### File & Project Structure
The project is located at `C:\Users\ADMIN\.gemini\antigravity\scratch\dishasingha`. The file layout is structured as follows:

```
C:\Users\ADMIN\.gemini\antigravity\scratch\dishasingha\
├── ORIGINAL_REQUEST.md          # User requirements & acceptance criteria
├── package.json                 # Project dependencies & npm scripts
├── vite.config.ts               # Vite configuration (React + Tailwind CSS v4)
├── tsconfig.json                # TypeScript compiler options (target ES2022, moduleResolution bundler)
├── index.html                   # HTML entry point (title: "Chaitanya Gaikwad — Portfolio & Capabilities")
├── src/
│   ├── main.tsx                 # React DOM root mounting <App />
│   ├── App.tsx                  # Main SPA entry, layout, navigation, section router, sub-routes & lightboxes (1925 lines, 97.8 KB)
│   ├── index.css                # Global CSS, font imports (@import url for Playfair Display, Outfit, Plus Jakarta Sans), @theme definition & keyframe animations
│   ├── components/
│   │   ├── CadAutomationSection.tsx # CAD Drafting Showcase & pan/zoom lightbox modal (941 lines, 50.4 KB)
│   │   └── ui/
│   │       ├── AvailabilityBadge.tsx   # Floating pill badge ("Available for CAD Drafting & Creative Direction") with emerald ping animation (30 lines)
│   │       ├── BackgroundGrid.tsx      # SVG blueprint dot matrix grid + ambient radial gradient blurs (36 lines)
│   │       ├── BorderBeam.tsx          # Animated glowing border beam component (41 lines)
│   │       ├── MetricCounterGrid.tsx   # 4-card KPI counter grid ($1,000 Contract, 10,000+ B2B Leads, 40+ Renders, 100% CAD Accuracy) (74 lines)
│   │       ├── ScrollProgress.tsx      # Top scroll progress bar driven by motion/react useScroll & useSpring (19 lines)
│   │       └── SpotlightCard.tsx       # Mouse-follow radial spotlight hover card component (55 lines)
│   └── data/
│       ├── projects.ts          # Project data helpers, WEBSITES array, CATEGORIES array, CIYATO_SCREENSHOTS array, and query functions (246 lines)
│       └── projects.json        # Structured JSON containing videos, spreadsheets, and renders arrays (77.2 KB)
└── .agents/
    └── explorer_1/              # Explorer working directory (DISPATCH.md, BRIEFING.md, progress.md, handoff.md)
```

### Tech Stack & Package Dependencies (`package.json`)
- **Framework & Bundler**: Vite `^6.2.0` (running `vite v6.4.3`), React `^19.0.0`, React DOM `^19.0.0` (`"type": "module"`).
- **TypeScript**: TypeScript `~5.8.2`, ES2022 target, `jsx: react-jsx`, path alias `@/*` pointing to `./*`.
- **Styling**: Tailwind CSS `^4.1.14` with `@tailwindcss/vite` plugin (`^4.1.14`). Autoprefixer `^10.4.21`.
- **Animation & Motion**: `motion` (`^12.23.24`), imported directly as `import { motion, AnimatePresence, useScroll, useSpring } from "motion/react"`.
- **Iconography**: `lucide-react` (`^0.546.0`) and inline SVGs (e.g. `WhatsAppIcon`).
- **Utility / Server**: `@google/genai` (`^1.29.0`), `express` (`^4.21.2`), `dotenv` (`^17.2.3`), `tsx` (`^4.21.0`), `@types/node` (`^22.14.0`).

### Styling & Theme Conventions (`src/index.css`)
- **Font Imports**:
  - `Playfair Display` (serif) -> applied via class `.serif` or `font-serif`.
  - `Outfit` (display) -> applied via class `.display` or `font-display`.
  - `Plus Jakarta Sans`, `Inter` (sans) -> primary body font (`font-sans`).
- **Theme Variables** (`@theme` directive in `src/index.css`):
  - `--color-warm-bg`: `#ffffff`
  - `--color-warm-ink`: `#000000`
  - `--color-warm-accent`: `#000000`
- **Design Aesthetic**: High-contrast, editorial minimalist, pure white background (`#ffffff`), jet black typography (`#000000`), subtle opacity borders (`border-black/5`, `border-black/10`), pill badges, and rounded containers (`rounded-[2rem]`, `rounded-[2.5rem]`, `rounded-[3rem]`).

### Component Structure & Layout Hierarchy
1. **Header Navigation** (`src/App.tsx:1669-1716`): Fixed header `bg-white/85 backdrop-blur-sm border-b border-black/10` featuring `CG.` logo and section links (`Home`, `About`, `Services`, `Projects`, `Startup`, `Contact`). Includes mobile dropdown menu toggle.
2. **Hero Section** (`src/App.tsx:1124-1304`):
   - Centered title: "Chaitanya Gaikwad"
   - Role Badges: `CAD Drafter • AI Visual Designer • Marketing & B2B Specialist • Visual Content Creator`
   - Centered Portrait (`/portrait.jpg`) flanked by desktop skill badge columns (CAD Drafting, AI Visuals, Web Dev, Cinematic Video, B2B Research, Marketing).
   - Action Button Grid (4 buttons: View Portfolio, Let's Connect, WhatsApp UK +44 7882 746212, WhatsApp IN +91 70283 11226).
   - KPI Metric Counter Grid (`<MetricCounterGrid />`).
3. **Projects Category Grid** (`src/App.tsx:1307-1358`): Renders 5 category cards (`Architectural & Interior CAD Drafting`, `Cinematic Videos`, `B2B Research & Excel Systems`, `3D Renders & Visualisations`, `Websites Developed`).
4. **Startup Preview Section** (`src/App.tsx:1361-1403`): Preview card for "Ciyato — Android Launcher & AI Organiser".
5. **Services Section** (`src/App.tsx:1406-1432`): 9 service items rendered as responsive grid cards.
6. **About / Experience Section** (`src/App.tsx:1435-1571`): Left bio column + right studio work experience cards (`Sultanah & Co. Interiors`, `Red Chandelier Studio`, `Chinese Company`, `Ereno Design Studio`, `Fitout 360 Interiors`, `Jovial Decor`) + Approach & Key Strengths grid.
7. **Contact / Footer Section** (`src/App.tsx:1574-1655`): "Let's connect." section with WhatsApp and Instagram links, plus copyright footer.
8. **Sub-Route Renderers** (`src/App.tsx`): Hash-based router (`currentHash`) displaying:
   - `renderStartupPage()` (`#/startup`)
   - `renderCadAutomationStandalonePage()` (`#/cad-automation`)
   - `renderSpreadsheetViewerPage()` (`#/projects/b2b-research/:slug`)
   - `renderB2BResearchPage()` (`#/projects/b2b-research`)
   - `renderVideosPage()` (`#/projects/videos`)
   - `renderVisualisationsPage()` (`#/projects/visualisations`)
   - `renderWebsitesPage()` (`#/projects/websites`)
9. **Modal Lightboxes** (`src/App.tsx`): Video modal player (`activeVideoUrl`), Renders lightbox (`lightboxIndex`), Startup screenshots lightbox (`startupLightboxIndex`).
10. **Availability Badge** (`src/components/ui/AvailabilityBadge.tsx`): Component defined at `src/components/ui/AvailabilityBadge.tsx` and imported at `src/App.tsx:37`. Note that `ORIGINAL_REQUEST.md` specifically requires: *"The availability badge is removed, and replaced with refined artistic framing."*

### Build & Linting Status
1. **`npm run build` (`vite build`)**: EXITED CODE 0 (SUCCESS).
   - Command output: `✓ 2083 modules transformed. dist/index.html 1.52 kB, dist/assets/index-CCuo-hHd.css 58.22 kB, dist/assets/index-4rTCpDI_.js 522.87 kB. built in 11.42s`.
2. **`npm run lint` (`tsc --noEmit`)**: EXITED CODE 1 (FAILED WITH 1 TYPE ERROR).
   - Verbatim terminal output:
     ```
     > react-example@0.0.0 lint
     > tsc --noEmit

     src/App.tsx(1345,89): error TS2339: Property 'description' does not exist on type '{ id: string; title: string; subtitle: string; desc: string; route: string; }'.
     ```
   - **Root Cause**: At line 1345 of `src/App.tsx`, the code references `{cat.description}` on elements mapped from `CATEGORIES`. However, in `src/data/projects.ts`, the property is named `desc` (not `description`).

---

## 2. Logic Chain

1. **Framework & Setup Identification**:
   - `package.json` specifies `"type": "module"`, `"vite": "^6.2.0"`, `"react": "^19.0.0"`, `"tailwindcss": "^4.1.14"`, and `"motion": "^12.23.24"`.
   - `vite.config.ts` uses `@tailwindcss/vite` and `@vitejs/plugin-react` plugins with `@` resolved to the root directory `.`.
   - Motion components are imported from `motion/react` (e.g. `import { motion } from "motion/react"`).

2. **UI & Component Architecture**:
   - `src/App.tsx` serves as the primary container containing all section anchors (`#home`, `#projects`, `#startup-preview`, `#services`, `#about`, `#contact`).
   - The application relies on SVG grid backgrounds (`BackgroundGrid.tsx`), Framer Motion scroll indicators (`ScrollProgress.tsx`), and Spotlight Cards (`SpotlightCard.tsx`).
   - AvailabilityBadge (`AvailabilityBadge.tsx`) exists in `src/components/ui/AvailabilityBadge.tsx` and is imported in `App.tsx`, but per `ORIGINAL_REQUEST.md` acceptance criteria ("The availability badge is removed, and replaced with refined artistic framing"), it is targeted for replacement with Japanese Sakura botanical line-art and precision architectural drafting marks.

3. **Styling & Asset Integration Rationale**:
   - Custom fonts (`Playfair Display`, `Outfit`, `Plus Jakarta Sans`) are imported via Google Fonts in `src/index.css`.
   - Custom colors `--color-warm-bg` (`#ffffff`) and `--color-warm-ink` (`#000000`) establish the pure white & crisp jet-black contrast required by R3 in `ORIGINAL_REQUEST.md`.

4. **Lint Error Discovery**:
   - Running `tsc --noEmit` flagged an error at `src/App.tsx:1345`. Line 1345 attempts to render `cat.description`. `CATEGORIES` in `src/data/projects.ts` defines `desc`. Fixing `cat.description` to `cat.desc` (or updating the interface) will make `npm run lint` pass cleanly with 0 errors.

---

## 3. Caveats

- **Read-Only Scope**: This report is produced under read-only investigation rules; no edits have been applied to `src/App.tsx` or project code during this phase.
- **Node Modules & Dist**: `dist/` is generated during `npm run build`. Note that `tsconfig.json` does not explicitly exclude `dist/` in an `"exclude"` array; if obsolete `.js` files linger in `dist/`, `tsc --noEmit` could inspect them unless `dist/` is cleaned or excluded.
- **Large Bundle Warning**: `vite build` issues a chunk size warning (>500 kB for `index-4rTCpDI_.js`). This is cosmetic and does not block production build completion.

---

## 4. Conclusion

The `dishasingha` portfolio codebase is a modern React 19 + Vite 6 + Tailwind CSS v4 + TypeScript SPA with Framer Motion (`motion/react`) animations.

### Key Takeaways for Subsequent Agents:
1. **Animation Library**: Uses `motion/react` (`import { motion } from "motion/react"`). New floating botanical petals, parallax scroll movement, and cursor proximity reactions should use `motion/react` or hardware-accelerated SVG/CSS transforms.
2. **Background & Layering Strategy**: The existing background is `BackgroundGrid` (`src/components/ui/BackgroundGrid.tsx`), fixed behind content (`fixed inset-0 pointer-events-none z-0`). New Japanese Sakura botanical line art and architectural drafting marks (compass rings, crosshairs, blueprint accents) should be implemented as floating SVG overlay/background components placed fixed or absolutely within section bounds.
3. **Availability Badge Removal**: Per Acceptance Criteria, any remaining reference to `AvailabilityBadge` should be removed and replaced with refined artistic drafting/botanical framing around the Hero section.
4. **Linting Fix Needed**: Before final verification, `src/App.tsx:1345` (`cat.description`) needs to be changed to `cat.desc` so `npm run lint` (`tsc --noEmit`) passes with 0 errors.
5. **Build Verification**: `npm run build` succeeds seamlessly out of the box.

---

## 5. Verification Method

To independently verify the findings in this report:

1. **Verify Tech Stack & Dependencies**:
   - Inspect `C:\Users\ADMIN\.gemini\antigravity\scratch\dishasingha\package.json` and `src/index.css`.
2. **Verify Existing Lint Error**:
   - Run `npm run lint` from `C:\Users\ADMIN\.gemini\antigravity\scratch\dishasingha`.
   - Observe error: `src/App.tsx(1345,89): error TS2339: Property 'description' does not exist on type '{ id: string; title: string; subtitle: string; desc: string; route: string; }'.`
3. **Verify Build Process**:
   - Run `npm run build` from `C:\Users\ADMIN\.gemini\antigravity\scratch\dishasingha`.
   - Confirm output `✓ built in ...` and exit code 0.
4. **Verify Component Hierarchy**:
   - Open `src/App.tsx` and inspect imports (lines 1-40) and section containers (`#home`, `#projects`, `#startup-preview`, `#services`, `#about`, `#contact`).
