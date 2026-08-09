# Project: Dishasingha Portfolio Web Application Repair

## Architecture
- **Framework**: React 19, Vite 6, TypeScript 5, Tailwind CSS
- **Routing Architecture**: SPA Hash-based Routing (`window.location.hash`, `hashchange` listener)
- **Data Architecture**: Static JSON datasets (`public/data/spreadsheets/*.json`, `src/data/projects.json`)
- **Key Modules**:
  - `src/main.tsx`: App entry point
  - `src/App.tsx`: Main layout, hash router, page renderers, spreadsheet viewer
  - `src/components/ErrorBoundary.tsx`: Defensive React Error Boundary wrapper
  - `src/components/RouteErrorFallback.tsx`: Friendly fallback UI with "Back to Projects" button
  - `src/data/projects.json`: Project portfolio catalog metadata
  - `public/data/spreadsheets/`: 8 B2B research JSON datasets
  - `public/projects/downloads/`: 8 Excel `.xlsx` downloadable files

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Download Icon Import & Symbol Resolution | Import `Download` from `lucide-react` in `src/App.tsx` to fix uncaught `ReferenceError` | M1 | ORIGINAL_REQUEST §R1 |
| 2 | TypeScript Build Clean-up | Fix `React` namespace errors and `VideoCardProps` type mismatch in `src/App.tsx` | M1 | ORIGINAL_REQUEST §Acceptance Criteria |
| 3 | SPA Hash Route Resolution & Double Hash Fix | Clean hash route resolution across all 7 sub-routes without `##...` URL syntax errors or blank screens | M1 | ORIGINAL_REQUEST §R1 |
| 4 | Reusable ErrorBoundary Component | Create React `ErrorBoundary` class component catching render errors | M2 | ORIGINAL_REQUEST §R2 |
| 5 | Route Error Fallback UI | Create friendly error UI component with prominent "Back to Projects" button | M2 | ORIGINAL_REQUEST §R2 |
| 6 | Subpage & App Root Boundary Wrapping | Wrap `<App />` root in `main.tsx` and sub-routes in `App.tsx` with `<ErrorBoundary>` | M2 | ORIGINAL_REQUEST §R2 |
| 7 | Defensive Data Fetching & Error State | Update `useEffect` spreadsheet fetch to handle 404/500/malformed JSON with explicit error state | M2 | ORIGINAL_REQUEST §R2 |
| 8 | B2B Research Category Portfolio Grid Verification | Verify category grid displays 8 B2B research project cards cleanly | M3 | ORIGINAL_REQUEST §R3 |
| 9 | Interactive Spreadsheet Viewer Verification | Verify workbook viewer loads JSON, renders sheet tabs, search filter rows, and download buttons cleanly | M3 | ORIGINAL_REQUEST §R3 |
| 10 | Production Build & Local Preview Verification | Ensure `npm run build` succeeds with 0 errors and production build assets pass preview checks | M3 | ORIGINAL_REQUEST §Acceptance Criteria |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | M1: SPA Hash Routing, Types & Icon Fixes | Import `Download`, fix TS errors, normalize hash routing logic & click handlers in `src/App.tsx` | none | PLANNED |
| 2 | M2: Defensive Fallbacks & Error Boundaries | Create `ErrorBoundary.tsx` & `RouteErrorFallback.tsx`, wrap routes, implement defensive data fetching in `src/App.tsx` | M1 | PLANNED |
| 3 | M3: B2B Viewer Verification & Production Build | Verify B2B research grid & interactive viewer features, execute `npm run build` and local preview verification | M1, M2 | PLANNED |

## Interface Contracts
### `ErrorBoundary` Component Props & State
```tsx
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}
```

### `RouteErrorFallback` Component Props
```tsx
interface RouteErrorFallbackProps {
  title?: string;
  message?: string;
  error?: Error | null;
  onReset?: () => void;
}
// Render features a prominent button: <a href="#projects" onClick={...}>Back to Projects</a>
```

## Code Layout
- `src/main.tsx`: Entry point wrapping `<App />` with `<ErrorBoundary>`
- `src/App.tsx`: Main routing and portfolio view component
- `src/components/ErrorBoundary.tsx`: Generic React error boundary wrapper
- `src/components/RouteErrorFallback.tsx`: Error fallback UI with "Back to Projects" button
- `src/data/projects.json`: Metadata for projects and spreadsheets
- `public/data/spreadsheets/`: JSON datasets for interactive viewer
- `public/projects/downloads/`: Downloadable `.xlsx` workbooks
