# Portfolio Web Application Repair Plan

## Objectives
1. Fix single-page application hash and subpage route resolution across all sub-routes (`#/projects/b2b-research`, `#/projects/b2b-research/:slug`, `#/projects/videos`, `#/projects/visualisations`, `#/projects/websites`, `#/cad-automation`, `#/startup`) without blank screens or URL syntax errors.
2. Implement robust error boundary protection & defensive fallbacks so missing/malformed data/slugs display a friendly error UI with a "Back to Projects" button.
3. Verify interactive B2B research data and spreadsheet viewer (category grid & individual workbook viewer loading JSON datasets, sheet tabs, search filter rows, download buttons).
4. Ensure `npm run build` succeeds cleanly and production build assets pass local preview tests.

## Phased Approach
### Phase 0: Survey & Initial Investigation
- Dispatch 3 parallel Explorer subagents (`explorer_survey_1`, `explorer_survey_2`, `explorer_survey_3`) to analyze:
  1. Routing setup, hash router logic, navigation components, card click handlers, and URL hash parsing.
  2. Component tree, error boundaries, data fetching / fallback handling, slug resolution logic.
  3. B2B research spreadsheet viewer components, JSON data loading, sheet tab selection, search filter rows, and download button logic.

### Phase 1: PROJECT.md & Milestone Architecture
- Synthesize explorer findings into `PROJECT.md`.
- Define Feature Inventory, Code Layout, Interface Contracts, and Milestones (M1: Routing, M2: Error Boundaries, M3: B2B Viewer & Data).

### Phase 2: Execution & Verification Loops
- For each milestone:
  - Run iteration loop: Explorer -> Worker -> Reviewers (x2) -> Challengers (x2) -> Forensic Auditor -> Gate check.
  - Require build and test verification at every gate.

### Phase 3: Final E2E & Production Verification
- Run full build (`npm run build`), verify dist assets, test all routes and error scenarios.
- Send victory claim message to Sentinel.
