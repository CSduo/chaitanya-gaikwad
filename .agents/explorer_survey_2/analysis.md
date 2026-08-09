# Codebase Survey: Error Boundaries, Error Handling & Defensive Fallback UI Gaps

**Target Codebase**: `C:\Users\ADMIN\.gemini\antigravity\scratch\dishasingha`  
**Date**: 2026-08-07  
**Investigator**: explorer_survey_2  

---

## Executive Summary

A comprehensive survey of the portfolio single-page application codebase was conducted to evaluate React Error Boundaries, data fetching error handling, route failure modes, and defensive fallback UI gaps. The codebase consists of a React 19 + Vite 6 single-page application (`src/App.tsx`, `src/main.tsx`, `src/components/CadAutomationSection.tsx`, `src/data/projects.ts`, `src/data/projects.json`). 

**Key Findings**:
1. **Zero Error Boundary Protection**: There is currently no React `ErrorBoundary` implementation anywhere in the codebase. None of the subpage router components are wrapped in error boundaries.
2. **Blank Cream Screen Crash Vulnerability**: Any unhandled JS exception during rendering (e.g., malformed JSON data, missing properties, array `TypeError`s) causes React 18/19 to unmount the entire `<App />` component tree from `<div id="root"></div>`. Because `index.html` / `index.css` styles the root container with `bg-warm-bg` (`#FDFBF7`), the user is left with a blank cream screen with zero visual feedback or recovery controls.
3. **Inadequate Fallback UIs**: Existing fallback states are minimal string checks (e.g., "Workbook not found" with "Back to list" link, or "No sheets available" inside a blank container). They lack styled error cards, diagnostic messages, and the required **"Back to Projects"** navigation button.
4. **Data Fetching Silent Failures**: `fetch(/data/spreadsheets/${slug}.json)` swallows network failures or HTTP 404/500 responses in `.catch()`, logging to `console.error` while leaving `spreadsheetData` as `null` without updating user-visible state or offering recovery options.

---

## 1. Current React ErrorBoundary Implementation

### Findings:
- **`src/main.tsx`**:
  ```tsx
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
  ```
  `App` is rendered directly inside `StrictMode` without an `ErrorBoundary` wrapper.
- **`src/App.tsx`**:
  - Contains no class components implementing `componentDidCatch` or `getDerivedStateFromError`.
  - Subpage routing functions (`renderVideosPage`, `renderB2BResearchPage`, `renderSpreadsheetViewerPage`, `renderVisualisationsPage`, `renderWebsitesPage`, `renderStartupPage`, `renderCadAutomationStandalonePage`) are executed as inline helper methods inside `App`'s main render method:
    ```tsx
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
- **Consequence**: If any subpage or component throws a JavaScript exception during rendering, React unmounts the entire `<App />` component tree. The browser viewport becomes completely empty except for the root container background color (`bg-warm-bg` cream `#FDFBF7`), resulting in the reported "blank cream screen" crash.

---

## 2. Route Resolution, Invalid Slugs, Fetch Failures & Crash Analysis

### A. Spreadsheet Viewer Route (`#/projects/b2b-research/:slug`)
- **Route Matching Logic**:
  `(currentHash.includes("b2b-research/") && currentHash.split("b2b-research/")[1]?.split("#")[0]?.split("/")[0]?.trim())`
- **Data Fetching Logic (`App.tsx` lines 358-381)**:
  ```ts
  useEffect(() => {
    if (currentHash.includes("projects/b2b-research/")) {
      const rawSlug = currentHash.split("projects/b2b-research/")[1] || "";
      const slug = rawSlug.split("#")[0].split("/")[0].trim();
      if (!slug) return;
      setSpreadsheetLoading(true);
      setSpreadsheetData(null);
      fetch(`/data/spreadsheets/${slug}.json`)
        .then((res) => {
          if (!res.ok) throw new Error("Spreadsheet not found");
          return res.json();
        })
        .then((data) => {
          setSpreadsheetData(data);
          setActiveSheetIndex(0);
          setSpreadsheetSearchQuery("");
          setSpreadsheetLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setSpreadsheetLoading(false);
        });
    }
  }, [currentHash]);
  ```

### B. Specific Failure Modes Identified:

1. **Invalid Slug in Metadata (`projects.json` matching failure)**:
   - When slug is invalid (e.g., `#/projects/b2b-research/non-existent-slug`):
     - `projects.find((p) => p.slug === slug)` evaluates to `undefined`.
     - `renderSpreadsheetViewerPage()` triggers line 554:
       ```tsx
       if (!currentProject) {
         return (
           <div className="max-w-5xl mx-auto px-6 py-24 text-center">
             <p className="serif text-2xl mb-6">Workbook not found</p>
             <a href="#/projects/b2b-research" className="text-xs uppercase tracking-wider font-semibold underline">Back to list</a>
           </div>
         );
       }
       ```
     - **Defects**:
       - The button reads "Back to list" pointing to `#/projects/b2b-research`, not "Back to Projects" pointing to `#projects` or homepage.
       - The fallback UI is plain text without consistent editorial design or icon.

2. **Route Syntax Discrepancy (`#/b2b-research/slug` vs `#/projects/b2b-research/slug`)**:
   - Router condition evaluates `currentHash.includes("b2b-research/")` (which matches `#/b2b-research/slug`), but `useEffect` checks `currentHash.includes("projects/b2b-research/")`.
   - Result: Component renders, but data fetching `fetch()` NEVER fires, leaving `spreadsheetLoading: false` and `spreadsheetData: null` forever.

3. **HTTP 404 / 500 or Network Fetch Failure**:
   - `fetch()` throws error on `!res.ok`. `.catch()` catches it, logs to console, sets `spreadsheetLoading: false`.
   - `spreadsheetData` remains `null`.
   - UI renders lines 704-706:
     ```tsx
     <div className="flex-1 flex flex-col items-center justify-center p-20">
       <p className="text-xs text-warm-ink/40 font-bold uppercase tracking-wider">No sheets available</p>
     </div>
     ```
   - **Defects**: No user notification of fetch error, no retry button, no "Back to Projects" button.

4. **Malformed JSON Data / TypeErrors (Tree Crash Vectors)**:
   - If JSON dataset is fetched but malformed:
     - Missing `.sheets` array: `spreadsheetData.sheets.map(...)` throws `TypeError: Cannot read properties of undefined (reading 'map')`.
     - Non-array `data` matrix in sheet: `activeSheet?.data?.slice(1)` throws `TypeError: activeSheet.data.slice is not a function`.
     - Undefined row in `data`: `filteredRows = bodyRows.filter(row => row.some(...))` throws `TypeError: Cannot read properties of undefined (reading 'some')`.
   - **Result**: Immediate unhandled React render exception, unmounting the entire `<App />` root into a **blank cream screen**.

5. **Double-Hash / Navigation Hash Mismatches**:
   - Clicking cards or links when hash contains trailing `#` or `##` string artifacts.
   - Although `syncRoute` collapses `##` to `#`, string split logic `currentHash.split("b2b-research/")[1]` can extract dirty hash strings if query parameters or extra slashes exist.

---

## 3. Fallback UIs & Implementation Requirements

### Current Fallback UIs:
- Minimal text "Workbook not found" with link to `#/projects/b2b-research`.
- Minimal text "No sheets available" box.

### Required Fallback Implementation:

1. **React ErrorBoundary Component (`src/components/ErrorBoundary.tsx`)**:
   - Class component catching errors via `componentDidCatch(error, errorInfo)` and `getDerivedStateFromError(error)`.
   - Maintains `hasError: boolean` and `error: Error | null` state.
   - Supports reset handler `onReset()` to reset error state when user clicks recovery buttons.

2. **Route & Component Error Fallback UI (`RouteErrorFallback`)**:
   - **Visuals**: Centered editorial card on cream background (`bg-warm-bg`), styled with project typography (serif header, warm accents).
   - **Icon**: `AlertTriangle` or `FileX` icon from `lucide-react`.
   - **Title**: "Project Data Unavailable" or "Page Error".
   - **Description**: Clear description of what happened (e.g., "The requested spreadsheet dataset could not be loaded or is malformed.").
   - **Action Button**: Prominent **"Back to Projects"** button (`href="#projects"` or navigating to home `#projects` and resetting boundary state).
   - **Secondary Button**: "Try Again" / "Refresh Page".

3. **Data Fetching Error State in `App.tsx`**:
   - Add `spreadsheetError: string | null` state.
   - Update `fetch().catch()` to set `setSpreadsheetError("Unable to load spreadsheet dataset")`.
   - Render defensive fallback card with "Back to Projects" button when `spreadsheetError` is set.

---

## 4. Protection & Defensive Logic Catalog

| Target Component / Route | Current Protection | Vulnerability Risk | Required Defensive Fix |
|---|---|---|---|
| **Root Application (`<App />`)** | None | Top-level render crash unmounts app to blank cream screen | Wrap `<App />` in `<ErrorBoundary>` in `src/main.tsx` |
| **Main Hash Router Container (`src/App.tsx`)** | None | Invalid subpage render unmounts entire DOM tree | Wrap dynamic route rendering block in `<ErrorBoundary>` |
| **`#/projects/b2b-research/:slug` (Spreadsheet Viewer)** | Bare `!currentProject` string check | Missing JSON file, network failure, 404, or malformed `.sheets` matrix crashes page or shows blank box | Add `spreadsheetError` state, validate JSON schema before render, wrap in `<ErrorBoundary>`, add "Back to Projects" button |
| **`#/projects/b2b-research` (B2B Research Listing)** | None | Missing `projectsData.spreadsheets` array or missing object fields | Add nullish checks on `spreadsheets.map()`, wrap in `<ErrorBoundary>` |
| **`#/projects/videos` (Cinematic Videos)** | None | Broken video URL, missing `vid.media`, or video player exception | Add `onError` handler to `<video>`, wrap `VideoCard` grid in `<ErrorBoundary>` |
| **`#/projects/visualisations` (3D Renders)** | None | Missing render image files or array indexing crash | Add image `onError` fallback, wrap in `<ErrorBoundary>` |
| **`#/projects/websites` (Websites Developed)** | None | Missing project fields or link target issues | Wrap page in `<ErrorBoundary>` |
| **`#/cad-automation` (CAD Automation Page)** | None | Pan/zoom gesture calculation crash in `CadAutomationSection.tsx` | Wrap `<CadAutomationSection />` in `<ErrorBoundary>` |
| **`#/startup` (Ciyato Startup Page)** | None | `CIYATO_SCREENSHOTS` gallery index overflow | Add bounds checking on lightbox index, wrap in `<ErrorBoundary>` |
| **Renders & Startup Lightboxes** | `if (!currentRender) return null` | Keyboard navigation index overflow or missing media properties | Ensure safe bounds wrapping on `setLightboxIndex`, wrap modals in `<ErrorBoundary>` |

---

## 5. Proposed Implementation Blueprint

### A. `src/components/ErrorBoundary.tsx`
```tsx
import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  public handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="max-w-3xl mx-auto px-6 py-24 text-center font-sans">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-700 flex items-center justify-center mx-auto mb-6">
            <AlertTriangle size={32} />
          </div>
          <h2 className="serif text-3xl sm:text-4xl mb-4 text-warm-ink">Something went wrong</h2>
          <p className="text-sm text-warm-ink/70 max-w-md mx-auto mb-8 leading-relaxed">
            An unexpected error occurred while rendering this page content.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#projects"
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 bg-warm-accent text-white px-6 py-3 rounded-full text-xs uppercase tracking-wider font-bold hover:bg-warm-accent/90 transition-all shadow-sm"
            >
              <ArrowLeft size={14} /> Back to Projects
            </a>
            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 bg-warm-ink/5 text-warm-ink px-6 py-3 rounded-full text-xs uppercase tracking-wider font-bold hover:bg-warm-ink/10 transition-all"
            >
              <RefreshCw size={14} /> Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### B. Spreadsheet Viewer Fetch & Error Handling Upgrade (`src/App.tsx`)
```tsx
const [spreadsheetError, setSpreadsheetError] = useState<string | null>(null);

useEffect(() => {
  if (currentHash.includes("b2b-research/")) {
    const rawSlug = currentHash.split("b2b-research/")[1] || "";
    const slug = rawSlug.split("#")[0].split("/")[0].trim();
    if (!slug) return;
    setSpreadsheetLoading(true);
    setSpreadsheetData(null);
    setSpreadsheetError(null);
    fetch(`/data/spreadsheets/${slug}.json`)
      .then((res) => {
        if (!res.ok) throw new Error(`Spreadsheet dataset "${slug}" not found`);
        return res.json();
      })
      .then((data) => {
        if (!data || !Array.isArray(data.sheets) || data.sheets.length === 0) {
          throw new Error("Spreadsheet data format is invalid or empty");
        }
        setSpreadsheetData(data);
        setActiveSheetIndex(0);
        setSpreadsheetSearchQuery("");
        setSpreadsheetLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load spreadsheet:", err);
        setSpreadsheetError(err.message || "Failed to load workbook dataset");
        setSpreadsheetLoading(false);
      });
  }
}, [currentHash]);
```

---

## Conclusion
The root cause of blank cream screens in the portfolio application is the complete absence of React Error Boundaries combined with unhandled fetch failures and missing schema validation. Implementing a reusable `ErrorBoundary` wrapper, enhancing data fetching error states, and providing styled fallback UIs with a prominent **"Back to Projects"** button will ensure 100% reliable rendering across all subpage routes.
