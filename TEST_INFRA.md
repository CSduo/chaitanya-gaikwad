# XIYÀTO E2E Testing Infrastructure & Methodology Specification

## 1. Executive Summary & Test Suite Overview

This document specifies the architecture, methodology, validation tiers, boundary analysis, combinatorial matrices, and execution protocol for the **XIYÀTO Homepage Redesign & Editorial Elevation** E2E Opaque-Box Test Suite.

The test suite validates all 10 core features defined in `PROJECT.md` across 4 progressive verification tiers:
- **Tier 1: Feature Coverage** (>= 50 test cases, >= 5 per feature)
- **Tier 2: Boundary & Corner Cases** (>= 50 test cases, >= 5 per feature)
- **Tier 3: Cross-Feature Combinations** (>= 10 test cases)
- **Tier 4: Real-World Application Scenarios** (>= 5 end-to-end user journeys)
- **Total Suite Coverage**: 115+ automated tests with 0 external runtime dependencies, powered by Node.js native ESM and `node:test` / `node:assert/strict`.

---

## 2. Test Architecture & Directory Layout

The E2E test suite resides under `tests/e2e/` with an opaque-box architecture that inspects rendered outputs, DOM landmarks, event bindings, contract types, state transitions, and responsive behavior without mutating production source code:

```
tests/e2e/
├── test-runner.mjs               # Master runner script with colored telemetry, tier breakdown & exit codes
├── harness/
│   ├── test-framework.mjs        # Lightweight BDD assertion harness, reporter & runner utilities
│   ├── dom-simulator.mjs         # Headless DOM, viewport, haptic, and touch simulation engine
│   └── component-models.mjs      # Opaque-box component models & state machine contracts
├── tier1-features.test.mjs       # Tier 1: Feature Coverage (50 tests covering Features 1-10)
├── tier2-boundary.test.mjs       # Tier 2: Boundary & Corner Cases (50 tests covering limits/edges)
├── tier3-combinations.test.mjs   # Tier 3: Cross-Feature Combinations (12 tests covering concurrent states)
└── tier4-scenarios.test.mjs      # Tier 4: Real-World User Journeys (5 multi-step end-to-end workflows)
```

---

## 3. The 10 Core Features in Scope

| Feature # | Feature Name | Requirement ID | Milestone | Core Verification Target |
|---|---|---|---|---|
| **F1** | Bespoke Discipline Thematic Tokens | R4 | M1 | 5 palettes (Slate, Dossier, Titanium, Obsidian, Tech Clean), token getters, CSS classes |
| **F2** | Tactile Micro-Haptics & Sensory Feedback | R5 | M1 | Vibration helper, patterns, fallback safety, micro-scale classes, reduced motion |
| **F3** | Mobile Horizontal Service Slideshow | R1 | M2 | CSS scroll-snap, 01/06 counter, touch swipe momentum, card peek, step pills |
| **F4** | Desktop Responsive Capabilities Grid | R1 | M2 | 3-column / 6-card grid, registration marks, motif tags, smooth anchor jumps |
| **F5** | Compact Lead Intelligence Stage | R2 | M2 | Region tabs (India, ME, PH, China), instant metrics, <350px collapsed table |
| **F6** | Expandable Lead Intelligence Drawer | R2 | M2 | Full drawer modal, multi-sheet tabs, live search query, pagination, XLSX download |
| **F7** | CAD Interactive Drafting Rail & HUD | R3 | M3 | Horizontal thumbnail rail, category filter pills, sheet metadata HUD, resolution stamps |
| **F8** | CAD Sticky Featured Drawing Stage | R3 | M3 | Featured drawing stage, instant blueprint swap, technical coordinate stamps, quick zoom |
| **F9** | CAD Full Inspection Modal & Downloads | R3 | M3 | Deep pan/drag, 1x-4x zoom, vector PDF/DWG download routes, keyboard shortcuts |
| **F10** | Homepage Assembly & Atmosphere Integration | R4/R5 | M4 | 6 service chapter wrappers, thematic CSS scopes, CLS aspect ratios, semantic landmarks |

---

## 4. Test Methodologies & Design Techniques

### 4.1 Category-Partition Testing
Each feature domain is partitioned into disjoint equivalence classes across inputs, states, and environments:
- **Viewport Environments**:
  - `Mobile-Narrow` (320px – 360px): Single card visible, touch gestures, drawer full screen
  - `Mobile-Standard` (375px – 430px): Card peek visible (84vw), bottom action bars
  - `Tablet` (768px – 1024px): 2-column transitions, compact HUD
  - `Desktop` (1280px – 1920px): 3-column grid, split CAD drafting stage
  - `Ultra-Wide` (2560px – 3840px): Constrained max-widths (`container-wide: 88rem`), centered alignments
- **User Motion Preferences**:
  - `Standard Motion`: Full animation, CSS transforms, smooth scroll
  - `Reduced Motion` (`prefers-reduced-motion: reduce`): Immediate state snaps, vibration suppressed

### 4.2 Boundary Value Analysis (BVA)
Boundary limits are rigorously tested at the extreme minimum, transition threshold, and extreme maximum:
- **Zoom Scales**: Min (`1.0x` / 100%), Step decrement (`0.5x` clamped to 1.0x), Max (`4.0x` / 400%), Step increment (`4.5x` clamped to 4.0x), Reset (`1.0x`).
- **Pagination & Rows**: Page 0, Last Page, Out-of-bounds Page (`page < 0`, `page > totalPages`), 0-search-match empty results, 100+ row pagination.
- **Carousel Indices**: Index 0 (`01 / 06`), Index 5 (`06 / 06`), Clamped left navigation (prev at 0), Clamped right navigation (next at 5), Non-integer swipe percentages.
- **Viewport Widths**: `319px` (sub-minimum), `320px` (min supported), `640px` (sm boundary), `1024px` (lg desktop boundary), `2560px` (2K), `3840px` (4K).

### 4.3 Pairwise & Combinatorial Testing
Interaction matrices test cross-feature state combinations:
- (Theme = `Slate` × Modal = `Open` × Zoom = `2x` × Viewport = `Mobile`)
- (Region = `China` × Drawer = `Open` × Search = `"Hub"` × Page = `2`)
- (Carousel = `Swiping` × Viewport Resize = `Mobile->Desktop` × ActiveCard = `3`)
- (Theme = `Obsidian` × Video = `Playing` × ReducedMotion = `Active`)
- (CAD Stage = `Elevations` × Drawing Switch × Modal Launch × Keydown = `Escape`)

### 4.4 Real-World Application Workloads & User Journeys
Simulates complete multi-step visitor interactions reflecting real architectural and B2B client behavior:
1. **Architecture Director CAD Workflow**: Mobile arrival -> Capabilities swipe -> CAD chapter jump -> Blueprint category filter -> Featured stage swap -> 2x quick zoom -> Inspection modal launch -> Vector PDF & DWG download check.
2. **Commercial Real Estate Intelligence Dossier**: Desktop arrival -> 3-col capabilities grid -> Growth chapter -> Region switch (India -> China) -> Instant metrics check -> Drawer modal expansion -> Live text search -> Pagination next -> Redacted XLSX download validation.
3. **Luxury Interior 3D Visualisation & Film Journey**: Hero capability scene switch -> Visualisation gallery category filter -> Fullscreen visual inspection -> Obsidian Black Video reel review -> Sensory haptic trigger validation -> Reduced motion compliance.
4. **Systems & Web Performance Audit**: Compact 320px viewport rendering -> Mobile navigation -> Capabilities counter tracking (`01/06` to `06/06`) -> Telemetry badges verification -> Touch target size validation (>=44x44px) -> Zero layout shift (aspect ratio constraints).
5. **Full Lifecycle Executive Homepage Walkthrough**: Complete sequential walkthrough exercising all 10 features end-to-end, asserting CSS theme scope nesting, tactile vibration fallbacks, drawer/modal state isolation, and zero console error generation.

---

## 5. Coverage Thresholds & Quality Gates

To guarantee enterprise-grade software quality, the test suite enforces the following thresholds:

| Metric | Target Threshold | Description |
|---|---|---|
| **Tier 1 Feature Tests** | >= 50 tests | >= 5 dedicated tests per feature (10 features) |
| **Tier 2 Boundary Tests** | >= 50 tests | >= 5 boundary/corner tests per feature (10 features) |
| **Tier 3 Combinations** | >= 10 tests | Cross-module state and concurrency tests |
| **Tier 4 Real-World Scenarios** | >= 5 tests | Full multi-step end-to-end user workflows |
| **Total Test Count** | >= 115 tests | Complete test suite coverage |
| **Pass Rate** | **100% (0 failures)** | All tests must pass with exit code 0 |
| **Build Stability** | 0 compilation errors | `npm run build` passes with 34/34 static routes |
| **Type Integrity** | 0 TypeScript errors | `npm run typecheck` (`tsc --noEmit`) passes cleanly |

---

## 6. Test Execution Instructions

### Run the Complete E2E Test Suite:
```bash
node tests/e2e/test-runner.mjs
```

### Run Specific Verification Tiers:
```bash
# Run Tier 1 Feature Coverage
node tests/e2e/tier1-features.test.mjs

# Run Tier 2 Boundary & Corner Cases
node tests/e2e/tier2-boundary.test.mjs

# Run Tier 3 Cross-Feature Combinations
node tests/e2e/tier3-combinations.test.mjs

# Run Tier 4 Real-World User Scenarios
node tests/e2e/tier4-scenarios.test.mjs
```

### Run via Test Runner with Tier Flag:
```bash
node tests/e2e/test-runner.mjs --tier=1
node tests/e2e/test-runner.mjs --tier=2
node tests/e2e/test-runner.mjs --tier=3
node tests/e2e/test-runner.mjs --tier=4
node tests/e2e/test-runner.mjs --tier=all
```
