# Project: dishasingha portfolio - Japanese Sakura & Architectural Line-Art Integration

## Architecture
- Tech Stack: React 19, Motion v12 (`motion/react`), Tailwind CSS v4 (`@tailwindcss/vite`), Vite 6.2, TypeScript 5.8
- Component Architecture: Inline SVG React components under `src/components/ui/decorations/`, custom hooks in `src/hooks/`, unified section overlay in `src/components/ui/BotanicalArchitecturalOverlay.tsx`, integrated into `src/App.tsx`.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Sakura SVG Components | Inline React SVG vector graphics (`SakuraPetal`, `SakuraBlossom`, `SakuraBranch`) | M1 | Survey |
| 2 | Architectural Drafting Marks | Inline React SVG components (`CornerCrosshairs`, `CompassRing`, `BlueprintAccent`) | M1 | Survey |
| 3 | Physics & Motion Engine | `useCursorProximity`, `useParallaxMotion`, ambient floating float, 60 FPS transform/opacity optimizations | M2 | Survey |
| 4 | Availability Badge Removal & Framing | Remove `AvailabilityBadge.tsx`, create `HeroFraming.tsx` with Sakura + crosshair framing | M3 | Survey |
| 5 | Section Overlay Integration | Frame Hero (`#home`), About (`#about`), Projects (`#projects`), Contact (`#contact`) with 10-30% opacity jet black line art | M4 | Survey |
| 6 | Build & Verification | `npm run build` with 0 errors, no horizontal overflow, 60 FPS performance, forensic integrity audit clean | M5 | Survey |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | M1: SVG Vector Component Suite | Create 6 SVG vector components in `src/components/ui/decorations/` | none | PLANNED |
| 2 | M2: Motion & Proximity Physics Engine | Create `useCursorProximity.ts` & `useParallaxMotion.ts` | M1 | PLANNED |
| 3 | M3: Badge Removal & Hero Framing | Remove `AvailabilityBadge`, replace with `HeroFraming.tsx` | M1, M2 | PLANNED |
| 4 | M4: Full Portfolio Overlay Integration | `BotanicalArchitecturalOverlay.tsx`, section framing, 10-30% opacity, pure white contrast | M1, M2, M3 | PLANNED |
| 5 | M5: E2E Verification & Forensic Audit | Tier 1-4 tests, build check `npm run build`, review approval, forensic audit | M4 | PLANNED |

## Interface Contracts
### `src/components/ui/decorations/*`
- Standard React SVG props: `className?: string`, `style?: React.CSSProperties`, `opacity?: number`.
- Pure vector paths (`stroke="currentColor"`, `fill="none"` or subtle opacity fill).

### `src/hooks/useCursorProximity.ts`
- Inputs: `stiffness?: number`, `damping?: number`
- Outputs: `{ x: MotionValue<number>, y: MotionValue<number> }` (60 FPS zero-re-render Framer Motion values).

### `src/hooks/useParallaxMotion.ts`
- Inputs: `targetRef: React.RefObject<HTMLElement>`, `offsetRange: [number, number]`
- Outputs: `MotionValue<number>` for Y-axis or rotation transform.

## Code Layout
- `src/components/ui/decorations/SakuraPetal.tsx`
- `src/components/ui/decorations/SakuraBlossom.tsx`
- `src/components/ui/decorations/SakuraBranch.tsx`
- `src/components/ui/decorations/CornerCrosshairs.tsx`
- `src/components/ui/decorations/CompassRing.tsx`
- `src/components/ui/decorations/BlueprintAccent.tsx`
- `src/hooks/useCursorProximity.ts`
- `src/hooks/useParallaxMotion.ts`
- `src/components/ui/HeroFraming.tsx`
- `src/components/ui/BotanicalArchitecturalOverlay.tsx`
- `src/App.tsx`
