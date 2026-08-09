# Technical Architecture Report: Sakura Botanical Flourishes & Architectural Drafting Marks

**Author**: explorer_2  
**Target Project**: dishasingha portfolio website (`C:\Users\ADMIN\.gemini\antigravity\scratch\dishasingha`)  
**Date**: 2026-08-09  

---

## 1. Observation

Direct code & project file observations:

1. **Dependency Stack (`package.json`)**:
   - `"motion": "^12.23.24"` (Framer Motion / Motion v12) is installed and imported in `App.tsx` and `ScrollProgress.tsx` via `import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "motion/react"`.
   - `"lucide-react": "^0.546.0"` is present for UI icons.
   - `@tailwindcss/vite: ^4.1.14` and `react: ^19.0.0` are active.

2. **SVG Assets Status**:
   - Zero standalone `.svg` asset files exist in `public/` or `src/` (confirmed via `find_by_name`).
   - SVG illustrations and patterns are currently implemented as inline React components (e.g. `WhatsAppIcon` in `App.tsx` and `CadAutomationSection.tsx`) and inline SVG pattern definitions (e.g. `BackgroundGrid.tsx` with `<pattern id="architectural-grid">`).

3. **Background & Layout Structure (`BackgroundGrid.tsx`, `App.tsx`)**:
   - `BackgroundGrid.tsx` uses a `fixed inset-0 pointer-events-none z-0 overflow-hidden` wrapper layer with `opacity-[0.035]` for background grid rendering.
   - `ScrollProgress.tsx` demonstrates full compatibility with Framer Motion `useScroll()` and `useSpring()`.
   - `SpotlightCard.tsx` uses React mouse state (`useState`, `onMouseMove`) scoped to card boundaries.

---

## 2. Logic Chain

From these direct observations, we derive the technical architecture for integrating bespoke Japanese Sakura botanical line-art flourishes and architectural drafting marks:

### Step 1: Inline Modular SVG Component Architecture
- **Reasoning**: Standalone SVG files in `public/` require extra network fetches and prevent dynamic stroke/fill/animation manipulation. Inline SVG React components inside `src/components/ui/decorations/` provide crisp, zero-latency vector rendering with full Framer Motion path integration (`motion.path`, `motion.svg`).
- **Component Modules**:
  1. `SakuraPetal.tsx`: Single organic petal path with subtle curved inner vein line art (`stroke="currentColor"`, `strokeWidth="0.75"` to `1.2`).
  2. `SakuraBlossom.tsx`: Detailed 5-petal cherry blossom with fine stamen accents.
  3. `SakuraBranch.tsx`: Framing botanical branch for section header corners.
  4. `CornerCrosshairs.tsx`: Architectural Drafting mark featuring crosshair `+` targets with extended alignment ticks (`L`, `T`, `┼`, dimension ticks) positioned in 4 corners.
  5. `CompassRing.tsx`: Architectural azimuth dial with concentric fine-line circles, degree tick marks (`0°`, `90°`, `180°`, `270°`), and cardinal orientation markers.
  6. `BlueprintAccent.tsx`: Drafting coordinate callouts (e.g. `ARCH // REF-2026-N`, `SCALE 1:50`) and dimension ruler ticks.

### Step 2: 60 FPS Hardware-Accelerated Motion Pattern
- **Reasoning**: To maintain a butter-smooth 60 FPS under heavy ambient animations, transitions must ONLY alter GPU-accelerated CSS properties (`transform` / `opacity`) and apply `will-change: transform`.
- **Floating Ambient Drift**:
  - Sakura petals use infinite spring-buffered loops:
    `y: [0, -18, 0]`, `x: [0, 8, -4, 0]`, `rotate: [0, 15, -10, 0]`, duration `14s–22s`, `ease: "easeInOut"`.
  - Architectural compass rings use continuous slow rotation (`rotate: [0, 360]`, duration `80s`, `ease: "linear"`).

### Step 3: Zero-Re-render Cursor Proximity Listener
- **Reasoning**: Binding `useState` to global `mousemove` events forces React to re-render the entire app on every mouse tick, dropping frame rates.
- **Solution using `useMotionValue` & `useSpring` from `motion/react`**:
  ```tsx
  // Single window event listener inside a custom hook useCursorProximity()
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);
  ```
  Passing `smoothX` and `smoothY` directly to `<motion.div style={{ x: smoothX, y: smoothY }}>` bypasses React's virtual DOM reconciliation entirely during mouse movements!

### Step 4: Scroll Parallax Integration
- **Reasoning**: Combining `useScroll()` with `useTransform()` enables depth layering where architectural blueprint marks move slowly in the background while botanical petals drift gracefully in the midground/foreground.
- **Example Implementation**:
  ```tsx
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const yArchitectural = useTransform(scrollYProgress, [0, 1], [-30, 30]); // Subtle slow scroll
  const yBotanical = useTransform(scrollYProgress, [0, 1], [-80, 80]);     // Faster floating scroll
  const rotateCompass = useTransform(scrollYProgress, [0, 1], [0, 45]);    // Dial turns on scroll
  ```

### Step 5: High-Fashion Minimal Whitespace Harmony (R1 & R3)
- **Contrast & Opacity Control**:
  - Background overlay lines: `text-black`, opacity set to `10%` (`opacity-10` / `rgba(0,0,0,0.10)`) for draft lines, up to `25%` (`opacity-25` / `rgba(0,0,0,0.25)`) for key sakura petal outlines.
  - Maintains clean readability of body copy, project thumbnails, and CAD automation packages against pure white `#ffffff`.
- **Responsive Overflow Guard**:
  - Wrap decorative layers in `pointer-events-none overflow-hidden select-none absolute inset-0`.
  - Downscale or hide high-density accents on mobile viewports using `hidden md:block` or `scale-75 md:scale-100`.

---

## 3. Caveats

1. **Mobile Touch Performance**:
   - On mobile devices without cursor hardware (`pointer: coarse`), cursor proximity listeners should gracefully deactivate (`window.matchMedia("(pointer: fine)").matches`) to prevent unnecessary computation.
2. **Reduced Motion User Preference**:
   - Code should respect `prefers-reduced-motion: reduce` by setting animation durations to 0 or disabling infinite loop translations.
3. **Availability Badge Replacement**:
   - Requirement R1 / Acceptance Criteria explicitly state: *"The availability badge is removed, and replaced with refined artistic framing."* The existing `AvailabilityBadge` component in `App.tsx` should be cleanly replaced by the new architectural drafting frame header.

---

## 4. Conclusion

The optimal technical architecture for Sakura botanical flourishes & architectural drafting marks is:
1. **Create modular React SVG components** under `src/components/ui/decorations/` (`SakuraPetal`, `SakuraBlossom`, `CornerCrosshairs`, `CompassRing`, `BlueprintAccent`).
2. **Wrap in a unified decorative container component** `src/components/ui/BotanicalArchitecturalOverlay.tsx` mounted inside `App.tsx` (and framing Hero, About, Projects, and Contact sections).
3. **Use Framer Motion (`motion/react`) `useMotionValue` + `useSpring`** for lag-free 60 FPS cursor proximity response.
4. **Use `useScroll` + `useTransform`** for multi-layered parallax depth.
5. **Apply `pointer-events-none`, `will-change-transform`, crisp jet black outlines at 10–30% opacity** over pure white background.

---

## 5. Verification Method

Independent verification steps after implementation:

1. **Build Integrity**:
   Run `npm run build` from project root (`C:\Users\ADMIN\.gemini\antigravity\scratch\dishasingha`) and verify zero TypeScript or Vite bundle errors.
2. **Visual Inspection**:
   Inspect Hero, About, Projects, and Contact sections to confirm Sakura petals, compass rings, and corner crosshairs frame the content without obscuring text or triggering horizontal scrollbars.
3. **60 FPS Performance Verification**:
   Open Chrome DevTools -> Performance tab -> Record smooth 60 FPS scrolling and mouse movements with zero long tasks (>50ms) or layout shifts.
