# Comprehensive Survey & Analysis of Dishasingha Portfolio Web Application

**Target Repository**: `C:\Users\ADMIN\.gemini\antigravity\scratch\dishasingha`  
**Date**: 2026-08-07  
**Investigator**: `explorer_survey_1`

---

## Executive Summary

A comprehensive investigation was conducted on the portfolio web application at `C:\Users\ADMIN\.gemini\antigravity\scratch\dishasingha`. The portfolio is a Single-Page Application (SPA) built with React 19, TypeScript, Vite 6, Tailwind CSS v4, and Motion. It relies on a custom `window.location.hash` state-driven routing architecture rather than React Router.

Primary findings:
1. **Critical Blank Screen Crash**: Sub-routes `#/projects/b2b-research` and `#/projects/b2b-research/:slug` crash into a blank cream screen due to an unhandled `ReferenceError: Download is not defined` in `src/App.tsx` (lines 538 and 599). `Download` is rendered in JSX but missing from the `lucide-react` import statement.
2. **Lack of React Error Boundary**: The application lacks an `ErrorBoundary`. Any runtime error (such as missing icons or fetch errors) unmounts the entire React component tree, causing a blank screen (`#root` div becomes empty).
3. **Invalid Double Hash (`##...`) Syntax**: Double hash URLs (e.g. `##projects` or `##/startup`) are generated when anchor `href` attributes (e.g. `href="#projects"`) and `onClick` hash state handlers (`window.location.hash = ...`) fire simultaneously or when string concatenation prepends `#` to an existing `#` hash string.
4. **TypeScript & Interface Deficiencies**: `tsc --noEmit` fails with 7 errors across `App.tsx` including missing `Download` reference, missing `React` namespace imports (`React.SVGProps`, `React.MouseEvent`), and `VideoCardProps` prop mismatches.

---

## 1. Overall Project Architecture & Build Configuration

### 1.1 Technology Stack & Framework Versions
- **UI Framework**: React 19.0.0 (`react`, `react-dom`)
- **Language**: TypeScript 5.8.2 (`typescript`)
- **Build Tool**: Vite 6.2.0 (`vite`) with `@vitejs/plugin-react` (5.0.4) and `@tailwindcss/vite` (4.1.14)
- **Styling**: Tailwind CSS v4.1.14
- **Animation & Icons**: Motion 12.23.24 (`motion/react`), Lucide React 0.546.0 (`lucide-react`)
- **Routing**: **Custom hash routing logic** (No `react-router` or `react-router-dom` is installed in `package.json`).

### 1.2 Package Scripts (`package.json`)
```json
"scripts": {
  "dev": "vite --port=3000 --host=0.0.0.0",
  "build": "vite build",
  "preview": "vite preview",
  "clean": "rm -rf dist",
  "lint": "tsc --noEmit"
}
```

### 1.3 Deployment Configuration (`vercel.json`)
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```
All routes are rewritten to `/index.html` for single-page application hash routing compatibility.

### 1.4 Directory Layout
```
dishasingha/
├── index.html                  # Main HTML template loading /src/main.tsx
├── package.json                # Project dependencies and npm scripts
├── tsconfig.json               # TypeScript compiler config
├── vercel.json                 # Vercel deployment rewrite rules
├── vite.config.ts              # Vite configuration (React, Tailwind v4 plugins)
├── public/
│   ├── favicon.jpg             # Site icon
│   ├── portrait.jpg            # Hero portrait
│   ├── projects/               # Video posters, startup screenshots, media
│   └── data/
│       └── spreadsheets/       # 8 redacted B2B research JSON datasets
└── src/
    ├── main.tsx                # Entry point mounting <App /> into #root
    ├── App.tsx                 # Main application & routing logic (1,820 lines)
    ├── index.css               # Global styles & Tailwind imports
    ├── components/
    │   └── CadAutomationSection.tsx # CAD Drafting standalone section
    └── data/
        ├── projects.ts         # Types, WEBSITES, CATEGORIES, helpers
        └── projects.json       # Video, B2B spreadsheet, and 3D render projects data
```

---

## 2. Hash Routing & Navigation Implementation

### 2.1 Router State Hook & Hash Sync (`src/App.tsx` lines 324, 337-355)
Navigation state is tracked in a single React state variable `currentHash`:
```typescript
const [currentHash, setCurrentHash] = useState(
  window.location.hash || window.location.pathname || "#/"
);

useEffect(() => {
  const syncRoute = () => {
    let hash = window.location.hash || "";
    hash = hash.replace(/^#+/, "#"); // collapses ##... -> #
    if (!hash || hash === "#") hash = window.location.pathname !== "/" ? window.location.pathname : "#/";
    setCurrentHash(hash);
    if (hash.includes("projects") || hash.includes("startup") || hash.includes("cad-automation")) {
      window.scrollTo({ top: 0 });
    }
  };
  window.addEventListener("hashchange", syncRoute);
  window.addEventListener("popstate", syncRoute);
  syncRoute();
  return () => {
    window.removeEventListener("hashchange", syncRoute);
    window.removeEventListener("popstate", syncRoute);
  };
}, []);
```

### 2.2 Router Switch Expression (`src/App.tsx` lines 1614-1632)
```typescript
<div className="flex-1 bg-warm-bg">
  {currentHash.includes("startup") ? (
    renderStartupPage()
  ) : currentHash.includes("cad-automation") ? (
    renderCadAutomationStandalonePage()
  ) : (currentHash.includes("b2b-research/") && currentHash.split("b2b-research/")[1]?.split("#")[0]?.split("/")[0]?.trim()) ? (
    renderSpreadsheetViewerPage()
  ) : currentHash.includes("b2b-research") ? (
    renderB2BResearchPage()
  ) : currentHash.includes("projects/videos") ? (
    renderVideosPage()
  ) : currentHash.includes("projects/visualisations") ? (
    renderVisualisationsPage()
  ) : currentHash.includes("projects/websites") ? (
    renderWebsitesPage()
  ) : (
    renderMainPage()
  )}
</div>
```

### 2.3 Subpage Link Components & Card Handlers
1. **Top Navbar Links (`NAV_ITEMS = ["Home", "About", "Services", "Projects", "Startup", "Contact"]`)**:
   - `href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}`
   - `onClick={(e) => handleNavLinkClick(e, item)}` (lines 419-436).
2. **Category Cards on Homepage (`renderMainPage()` line 1230)**:
   - `onClick={() => { const r = cat.route.replace(/^#/, ''); window.location.hash = r; }}`
   - `cat.route` examples: `#/projects/b2b-research`, `#/projects/videos`, `#/projects/visualisations`, `#/projects/websites`, `#/cad-automation`.
3. **B2B Research Card "View Data" Buttons (`renderB2BResearchPage()` line 528)**:
   - `<a href={`#/projects/b2b-research/${sheet.slug}`}>`
4. **Subpage Back Links**:
   - `<a href="#projects">` / `<a href="#home">` / `<a href="#/projects/b2b-research">`

---

## 3. Investigation of Routing Bugs, Blank Screens & URL Syntax Errors

### 3.1 Root Cause 1: Missing `Download` Icon Import (CRITICAL BLANK SCREEN CRASH)
- **Observation**:
  - In `src/App.tsx`:
    - Line 538: `<Download size={11} />` inside `renderB2BResearchPage()`
    - Line 599: `<Download size={14} />` inside `renderSpreadsheetViewerPage()`
  - Top import from `lucide-react` (lines 3-31) does NOT include `Download`.
- **Evidence Chain**:
  - Running `npm run lint` (`tsc --noEmit`) outputs:
    `src/App.tsx:538:20 - error TS2304: Cannot find name 'Download'.`
    `src/App.tsx:600:16 - error TS2304: Cannot find name 'Download'.`
  - At runtime, navigating to `#/projects/b2b-research` or `#/projects/b2b-research/:slug` causes React to attempt rendering `<Download />`.
  - JavaScript throws `Uncaught ReferenceError: Download is not defined`.
  - React 19 catches the error during render phase, but with no `ErrorBoundary` present, React unmounts the entire `<App />` tree, rendering an empty `#root` element (cream blank screen).

### 3.2 Root Cause 2: Absence of React Error Boundary Protection
- **Observation**: Zero `ErrorBoundary` components exist in `src/App.tsx` or `src/main.tsx`.
- **Logic Chain**: When any component inside a subroute throws a runtime exception (e.g. missing icon, network error during fetch, undefined data access), React 19 unmounts the component tree. Wrapping sub-routes and root in a defensive `ErrorBoundary` with a user-friendly fallback UI ("Workbook not found" / "Page Error" with a "Back to Projects" button) will prevent app unmounting.

### 3.3 Root Cause 3: Invalid Double Hash Syntax (`##...`)
- **Observation**: In `handleNavLinkClick` (line 424):
  `window.location.hash = "/startup";`
  And line 430:
  `window.location.hash = `#${sectionId}`;`
  And category cards (line 1230):
  `window.location.hash = cat.route.replace(/^#/, '');`
- **Logic Chain**:
  - When an `<a>` element has `href="#projects"` AND `onClick` sets `window.location.hash = "#projects"`, browser event propagation plus hash mutation causes `window.location.hash` to become `"##projects"`.
  - When `cat.route` is `"# /projects/b2b-research"`, assigning `window.location.hash = "#/projects/b2b-research"` on a URL that already has a hash can result in `"##/projects/b2b-research"`.
  - While `syncRoute()` has `hash = hash.replace(/^#+/, "#")` for React state, the browser address bar still shows `##...` unless cleaned or normalized via a safe navigation helper.

### 3.4 Root Cause 4: TypeScript Types & Interface Violations
- **Observation**:
  - `src/App.tsx(37,30)`, `(229,26)`, `(238,26)`, `(419,34)`: `error TS2503: Cannot find namespace 'React'.`
  - `src/App.tsx(471,15)`: `error TS2322: Type '{ key: string; vid: Project; idx: number; ... }' is not assignable to type 'VideoCardProps'.`
- **Impact**: `npm run build` will fail unless these TypeScript compilation errors are resolved.

### 3.5 Root Cause 5: Defensive Data Handling in Spreadsheet Viewer
- **Observation**:
  - `renderSpreadsheetViewerPage()` relies on fetching `/data/spreadsheets/${slug}.json`.
  - If a slug is invalid or the fetch fails, `spreadsheetData` remains `null`.
  - Defensive checks are needed so that if a JSON dataset fails to load or has missing sheets/headers, a clear fallback error card with "Back to B2B Research" is displayed instead of throwing undefined property access errors.

---

## 4. Summary of Files and Components Requiring Fixes

| File Path | Component / Section | Required Modification |
|---|---|---|
| `src/App.tsx` | Top Imports | Import `Download` from `lucide-react`. Import `React` from `'react'`. |
| `src/App.tsx` | Component Types | Fix `VideoCardProps` and `React.MouseEvent` / `React.SVGProps` type annotations. |
| `src/App.tsx` | Error Boundary | Add defensive `ErrorBoundary` component wrapping sub-routes with fallback UI and "Back to Projects" button. |
| `src/App.tsx` | Navigation & Hash Handlers | Normalize hash assignments in `handleNavLinkClick`, category cards, and `syncRoute` to eliminate `##...` double hash URLs. |
| `src/App.tsx` | B2B Research Subpages | Ensure `renderB2BResearchPage()` and `renderSpreadsheetViewerPage()` handle missing data defensively with friendly fallbacks. |

---

## 5. Next Steps for Implementation

1. Update `src/App.tsx` imports and fix TypeScript errors.
2. Implement a robust `ErrorBoundary` component.
3. Normalize hash routing and link handlers to eliminate `##...` double hash URLs.
4. Verify `npm run lint` (`tsc --noEmit`) passes with 0 errors.
5. Verify `npm run build` completes cleanly with 0 errors.
