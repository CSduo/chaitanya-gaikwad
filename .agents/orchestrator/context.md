# Project Context & Scope

## Project Context
- **Target Application**: Portfolio Web Application for Chaitanya Gaikwad
- **Project Root**: `C:\Users\ADMIN\.gemini\antigravity\scratch\dishasingha`
- **Orchestrator Workspace**: `C:\Users\ADMIN\.gemini\antigravity\scratch\dishasingha\.agents\orchestrator`
- **Original Request Path**: `C:\Users\ADMIN\.gemini\antigravity\scratch\dishasingha\.agents\ORIGINAL_REQUEST.md`

## Key Problem Areas Identified in Request
1. SPA Hash Routing:
   - Sub-routes (`#/projects/b2b-research`, `#/projects/b2b-research/:slug`, `#/projects/videos`, `#/projects/visualisations`, `#/projects/websites`, `#/cad-automation`, `#/startup`).
   - Direct link entry and card click events causing blank screens, unmounted React trees, or URL hash syntax errors (e.g., `##...`).
2. Error Boundaries & Defensive Fallbacks:
   - React tree crashing into blank cream screen when slug or data file is missing/malformed.
   - Requires user-friendly error UI with "Back to Projects" button.
3. Interactive B2B Research Data & Spreadsheet Viewer:
   - Category grid loading 8 B2B research project cards.
   - Individual workbook spreadsheet viewer loading JSON datasets, sheet tabs, search filter rows, and download buttons without console errors.
4. Build & Production Verification:
   - Clean `npm run build` with 0 errors.
   - Local preview test verification.
