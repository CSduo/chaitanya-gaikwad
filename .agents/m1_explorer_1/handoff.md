# Handoff Report — Milestone 1: Japanese Sakura & Architectural SVG Line-Art Components Specification

**Author**: `m1_explorer_1`  
**Target Directory**: `src/components/ui/decorations/`  
**Project Root**: `C:\Users\ADMIN\.gemini\antigravity\scratch\dishasingha`  
**Date**: 2026-08-09  

---

## 1. Observation

Direct code and context observations from project analysis:

1. **Project Framework & Dependencies**:
   - React 19 (`react: ^19.0.0`) & TypeScript
   - Tailwind CSS v4 (`@tailwindcss/vite: ^4.1.14`)
   - Motion v12 (`"motion": "^12.23.24"`, imported via `import { motion } from "motion/react"`)
   - Lucide React (`lucide-react: ^0.546.0`)

2. **Existing Background & UI Decor Structure**:
   - `src/components/ui/BackgroundGrid.tsx`: Employs fixed position overlay (`fixed inset-0 pointer-events-none z-0 overflow-hidden`) with dynamic vector grid `opacity-[0.035]`.
   - `src/components/ui/AvailabilityBadge.tsx`: Currently placed in Hero section; to be replaced by refined architectural framing in Milestone 2.

3. **Requirement Specifications (`ORIGINAL_REQUEST.md` & `explorer_2/handoff.md`)**:
   - R1: Integrate delicate Japanese Sakura blossoms/petals and precision architectural drafting marks (compass rings, corner crosshairs, fine blueprint accents).
   - R3: High visual clarity on pure white background `#ffffff` with subtle vector opacity (10–30%), crisp jet-black outlines (`currentColor` stroke), zero layout shift.
   - Component Directory: `src/components/ui/decorations/` containing:
     - `SakuraPetal.tsx`
     - `SakuraBlossom.tsx`
     - `SakuraBranch.tsx`
     - `CornerCrosshairs.tsx`
     - `CompassRing.tsx`
     - `BlueprintAccent.tsx`
     - `index.ts` (barrel export)

---

## 2. Logic Chain

1. **Design System & Vector Styling Criteria**:
   - All components must use pure line-art styling (`fill="none"`, `stroke="currentColor"`).
   - Props must consistently support `className`, `size` (or `width`/`height`), `strokeWidth`, `opacity`, and custom `color` to support Tailwind text color inheritance (e.g. `text-black`, `text-neutral-800`).
   - SVG stroke scaling: Clean vector scaling using `strokeLinecap="round"` and `strokeLinejoin="round"` for organic botanical elements, and `strokeLinecap="square"` for geometric drafting marks.
   - Opacity defaults set within the optimal 10–30% target range (typically 0.20 to 0.25), easily customizable via props or parent CSS class wrappers.

2. **Component Path Geometry Specifications**:
   - **`SakuraPetal.tsx`**: Organic Japanese cherry blossom petal featuring the iconic notched/cleft top, tapering stem base, primary midrib vein, and delicate lateral vein line art.
   - **`SakuraBlossom.tsx`**: 5-petal radial cherry blossom centered at `(50, 50)`, central receptacle rings, 10 stamen filaments with terminal anther dots, and an optional architectural center alignment grid (`showCenterGrid`).
   - **`SakuraBranch.tsx`**: Curved botanical stem with offshoot twigs, attached blossoms, unopened buds, wind-drifted petals, and architectural axis node ticks. Supports `flipX` for left/right corner framing.
   - **`CornerCrosshairs.tsx`**: Architectural drafting corner mark featuring `L`-frame brackets, central target circles, extended grid axes, ruler tick marks, and support for `top-left`, `top-right`, `bottom-left`, `bottom-right` positioning and custom monospace label tags.
   - **`CompassRing.tsx`**: Concentric azimuth dial rings, 12 major (30°) and 36 minor (10°) radial tick marks, cardinal direction indicators (`N`, `E`, `S`, `W`), and a north pointer triangle. Perfect for background slow rotations.
   - **`BlueprintAccent.tsx`**: Versatile drafting annotation component with 4 distinct variants: `coordinate-tag` (box + code label + dashed ray line), `dimension-line` (slash-tick dimension bar), `scale-bar` (subdivided 0-10m ruler), and `cross-marker` (dashed target circle).
   - **`index.ts`**: Clean barrel export re-exporting all 6 decoration components and shared TypeScript interfaces.

---

## 3. Caveats

1. **React 19 SVG Prop Attributes**:
   - In React 19, standard SVG attributes like `strokeWidth`, `strokeDasharray`, and `transform` must be passed as string/number values compatible with TypeScript's `React.SVGProps<SVGSVGElement>`.
2. **Subtle Opacity Stacking**:
   - When placing multiple SVG decorations inside overlapping Framer Motion containers, setting opacity on the root `<svg>` or `<motion.div>` ensures stroke layers don't double-blend into visible internal seams.
3. **Responsive Scaling & Pointer Events**:
   - All decorative SVG components include `pointer-events-none select-none` by default so they never intercept hover or click interactions on text, buttons, or project links.

---

## 4. Conclusion & Complete Technical Component Specifications

Below is the complete, ready-to-implement TypeScript / React code specification for all 7 target files.

### 1. `src/components/ui/decorations/SakuraPetal.tsx`

```tsx
import React from "react";

export interface SakuraPetalProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number | string;
  strokeWidth?: number | string;
  opacity?: number;
  color?: string;
}

export const SakuraPetal: React.FC<SakuraPetalProps> = ({
  className = "",
  size = 48,
  strokeWidth = 1.2,
  opacity = 0.25,
  color = "currentColor",
  style,
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none pointer-events-none ${className}`}
      style={{ opacity, ...style }}
      {...props}
    >
      <g stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        {/* Outer Sakura Petal Outline with iconic top cleft notch */}
        <path d="M 24 5 C 21 8.5 17.5 9 14.5 7.5 C 8.5 16 6.5 28 13.5 37.5 C 18 43 22.5 45.5 24 46.5 C 25.5 45.5 30 43 34.5 37.5 C 41.5 28 39.5 16 33.5 7.5 C 30.5 9 27 8.5 24 5 Z" />
        {/* Primary Central Vein (Midrib) */}
        <path d="M 24 46.5 Q 24 31 24 16" />
        {/* Secondary Lateral Branch Veins */}
        <path d="M 24 38 Q 19 32 16 27" opacity="0.8" />
        <path d="M 24 38 Q 29 32 32 27" opacity="0.8" />
        <path d="M 24 28 Q 20 22 18 18" opacity="0.6" />
        <path d="M 24 28 Q 28 22 30 18" opacity="0.6" />
        {/* Base Taper Terminal Accent Dot */}
        <circle cx="24" cy="46.5" r="0.8" fill={color} stroke="none" />
      </g>
    </svg>
  );
};
```

---

### 2. `src/components/ui/decorations/SakuraBlossom.tsx`

```tsx
import React from "react";

export interface SakuraBlossomProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number | string;
  strokeWidth?: number | string;
  opacity?: number;
  color?: string;
  showCenterGrid?: boolean;
}

export const SakuraBlossom: React.FC<SakuraBlossomProps> = ({
  className = "",
  size = 96,
  strokeWidth = 1.2,
  opacity = 0.25,
  color = "currentColor",
  showCenterGrid = true,
  style,
  ...props
}) => {
  const petalAngles = [0, 72, 144, 216, 288];
  const stamenAngles = [15, 51, 87, 123, 159, 195, 231, 267, 303, 339];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none pointer-events-none ${className}`}
      style={{ opacity, ...style }}
      {...props}
    >
      <g stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        {/* Architectural Center Grid Accents */}
        {showCenterGrid && (
          <g opacity="0.4" strokeWidth={Number(strokeWidth) * 0.6}>
            <line x1="50" y1="2" x2="50" y2="98" strokeDasharray="2 2" />
            <line x1="2" y1="50" x2="98" y2="50" strokeDasharray="2 2" />
            <circle cx="50" cy="50" r="44" strokeDasharray="1 3" />
          </g>
        )}

        {/* 5 Radial Sakura Petals */}
        {petalAngles.map((angle, index) => (
          <g key={`petal-${index}`} transform={`rotate(${angle} 50 50)`}>
            <path d="M 50 14 C 47 18 43 19 39 17 C 32 26 30 38 38 46 C 43 50 48 52 50 53 C 52 50 57 50 62 46 C 70 38 68 26 61 17 C 57 19 53 18 50 14 Z" />
            <path d="M 50 53 Q 50 38 50 24" strokeWidth={Number(strokeWidth) * 0.8} />
            <path d="M 50 44 Q 45 37 42 32" strokeWidth={Number(strokeWidth) * 0.6} opacity="0.7" />
            <path d="M 50 44 Q 55 37 58 32" strokeWidth={Number(strokeWidth) * 0.6} opacity="0.7" />
          </g>
        ))}

        {/* Central Receptacle Ring */}
        <circle cx="50" cy="50" r="7" strokeWidth={strokeWidth} fill="none" />
        <circle cx="50" cy="50" r="3.5" strokeWidth={Number(strokeWidth) * 0.8} />

        {/* Stamen Filaments & Anther Dots */}
        {stamenAngles.map((angle, index) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = 50 + 7 * Math.cos(rad);
          const y1 = 50 + 7 * Math.sin(rad);
          const x2 = 50 + 17 * Math.cos(rad);
          const y2 = 50 + 17 * Math.sin(rad);
          return (
            <g key={`stamen-${index}`}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={Number(strokeWidth) * 0.75} />
              <circle cx={x2} cy={y2} r="1" fill={color} stroke="none" />
            </g>
          );
        })}
      </g>
    </svg>
  );
};
```

---

### 3. `src/components/ui/decorations/SakuraBranch.tsx`

```tsx
import React from "react";

export interface SakuraBranchProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  width?: number | string;
  height?: number | string;
  strokeWidth?: number | string;
  opacity?: number;
  color?: string;
  flipX?: boolean;
}

export const SakuraBranch: React.FC<SakuraBranchProps> = ({
  className = "",
  width = 240,
  height = 180,
  strokeWidth = 1.2,
  opacity = 0.25,
  color = "currentColor",
  flipX = false,
  style,
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 240 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none pointer-events-none ${className}`}
      style={{
        opacity,
        transform: flipX ? "scaleX(-1)" : undefined,
        ...style,
      }}
      {...props}
    >
      <g stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        {/* Main Tapering Stem */}
        <path
          d="M 10 170 Q 50 140 90 120 T 170 60 T 230 20"
          strokeWidth={Number(strokeWidth) * 1.8}
        />
        {/* Secondary Offshoot Twigs */}
        <path d="M 65 132 Q 95 105 110 75" strokeWidth={Number(strokeWidth) * 1.3} />
        <path d="M 125 90 Q 155 70 185 55" strokeWidth={Number(strokeWidth) * 1.2} />
        <path d="M 170 60 Q 190 35 210 25" strokeWidth={Number(strokeWidth) * 1.0} />

        {/* Architectural Node Ticks */}
        <g strokeWidth={Number(strokeWidth) * 0.6} opacity="0.6">
          <line x1="60" y1="130" x2="70" y2="134" />
          <line x1="120" y1="88" x2="130" y2="92" />
          <line x1="165" y1="58" x2="175" y2="62" />
          <circle cx="90" cy="120" r="3" strokeDasharray="1 1" />
          <circle cx="170" cy="60" r="3" strokeDasharray="1 1" />
        </g>

        {/* Blossom Clusters */}
        <g transform="translate(110, 75) scale(0.38)">
          <path d="M 0 -36 C -5 -28 -14 -28 -22 -32 C -28 -14 -24 -2 -10 6 C -4 10 0 12 0 16 C 0 12 4 10 10 6 C 24 -2 28 -14 22 -32 C 14 -28 5 -28 0 -36 Z" />
          <circle cx="0" cy="0" r="6" />
        </g>
        <g transform="translate(185, 55) scale(0.32)">
          <circle cx="0" cy="0" r="5" />
          <path d="M 0 -30 Q 0 -15 0 0" />
          <line x1="-10" y1="-10" x2="10" y2="10" />
          <line x1="-10" y1="10" x2="10" y2="-10" />
        </g>

        {/* Flower Buds */}
        <g transform="translate(230, 20)">
          <path d="M 0 0 C 4 -6 8 -6 10 -4 C 12 2 8 8 0 10 C -2 6 -2 2 0 0 Z" />
          <line x1="0" y1="10" x2="-5" y2="14" />
        </g>
        <g transform="translate(210, 25)">
          <path d="M 0 0 C 3 -5 7 -5 9 -3 C 10 2 7 7 0 8 C -1 5 -1 2 0 0 Z" />
        </g>

        {/* Drifting Wind Petals */}
        <g transform="translate(140, 120) rotate(25) scale(0.4)">
          <path d="M 24 5 C 21 8.5 17.5 9 14.5 7.5 C 8.5 16 6.5 28 13.5 37.5 C 18 43 22.5 45.5 24 46.5 C 25.5 45.5 30 43 34.5 37.5 C 41.5 28 39.5 16 33.5 7.5 C 30.5 9 27 8.5 24 5 Z" />
        </g>
        <g transform="translate(195, 100) rotate(-15) scale(0.35)">
          <path d="M 24 5 C 21 8.5 17.5 9 14.5 7.5 C 8.5 16 6.5 28 13.5 37.5 C 18 43 22.5 45.5 24 46.5 C 25.5 45.5 30 43 34.5 37.5 C 41.5 28 39.5 16 33.5 7.5 C 30.5 9 27 8.5 24 5 Z" />
        </g>
      </g>
    </svg>
  );
};
```

---

### 4. `src/components/ui/decorations/CornerCrosshairs.tsx`

```tsx
import React from "react";

export type CornerPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export interface CornerCrosshairsProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number | string;
  strokeWidth?: number | string;
  opacity?: number;
  color?: string;
  position?: CornerPosition;
  label?: string;
}

export const CornerCrosshairs: React.FC<CornerCrosshairsProps> = ({
  className = "",
  size = 80,
  strokeWidth = 1,
  opacity = 0.25,
  color = "currentColor",
  position = "top-left",
  label,
  style,
  ...props
}) => {
  const rotationMap: Record<CornerPosition, number> = {
    "top-left": 0,
    "top-right": 90,
    "bottom-right": 180,
    "bottom-left": 270,
  };

  const rotation = rotationMap[position];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none pointer-events-none ${className}`}
      style={{
        opacity,
        transform: rotation ? `rotate(${rotation}deg)` : undefined,
        ...style,
      }}
      {...props}
    >
      <g stroke={color} strokeWidth={strokeWidth} strokeLinecap="square">
        {/* Outer Corner Frame */}
        <path d="M 6 36 L 6 6 L 36 6" />

        {/* Crosshair Axes */}
        <line x1="0" y1="24" x2="64" y2="24" />
        <line x1="24" y1="0" x2="24" y2="64" />

        {/* Target Concentric Circles */}
        <circle cx="24" cy="24" r="10" strokeWidth={Number(strokeWidth) * 0.8} />
        <circle cx="24" cy="24" r="3" strokeWidth={Number(strokeWidth) * 0.7} />

        {/* Axis Measurement Ticks */}
        <line x1="34" y1="21" x2="34" y2="27" />
        <line x1="44" y1="22" x2="44" y2="26" />
        <line x1="54" y1="21" x2="54" y2="27" />
        <line x1="21" y1="34" x2="27" y2="34" />
        <line x1="22" y1="44" x2="26" y2="44" />
        <line x1="21" y1="54" x2="27" y2="54" />

        {/* Diagonal Drafting Guideline */}
        <line x1="6" y1="6" x2="16" y2="16" strokeDasharray="2 2" strokeWidth={Number(strokeWidth) * 0.6} />

        {/* Architectural Label Text */}
        {label && (
          <text
            x="38"
            y="16"
            fill={color}
            stroke="none"
            fontSize="6"
            fontFamily="monospace"
            letterSpacing="1"
            opacity="0.8"
          >
            {label}
          </text>
        )}
      </g>
    </svg>
  );
};
```

---

### 5. `src/components/ui/decorations/CompassRing.tsx`

```tsx
import React from "react";

export interface CompassRingProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number | string;
  strokeWidth?: number | string;
  opacity?: number;
  color?: string;
  showCardinalTicks?: boolean;
}

export const CompassRing: React.FC<CompassRingProps> = ({
  className = "",
  size = 180,
  strokeWidth = 1,
  opacity = 0.2,
  color = "currentColor",
  showCardinalTicks = true,
  style,
  ...props
}) => {
  const majorTicks = Array.from({ length: 12 }, (_, i) => i * 30);
  const minorTicks = Array.from({ length: 36 }, (_, i) => i * 10).filter(
    (deg) => deg % 30 !== 0
  );

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none pointer-events-none ${className}`}
      style={{ opacity, ...style }}
      {...props}
    >
      <g stroke={color} strokeWidth={strokeWidth} strokeLinecap="round">
        {/* Azimuth Rings */}
        <circle cx="100" cy="100" r="90" strokeWidth={Number(strokeWidth) * 1.2} />
        <circle cx="100" cy="100" r="82" strokeDasharray="2 3" strokeWidth={Number(strokeWidth) * 0.75} />
        <circle cx="100" cy="100" r="64" strokeWidth={Number(strokeWidth) * 0.8} />
        <circle cx="100" cy="100" r="30" strokeDasharray="1 2" strokeWidth={Number(strokeWidth) * 0.6} />

        {/* Center Crosshairs */}
        <line x1="100" y1="5" x2="100" y2="195" strokeWidth={Number(strokeWidth) * 0.5} strokeDasharray="4 4" />
        <line x1="5" y1="100" x2="195" y2="100" strokeWidth={Number(strokeWidth) * 0.5} strokeDasharray="4 4" />
        <circle cx="100" cy="100" r="3" strokeWidth={strokeWidth} />

        {/* Major Degree Ticks */}
        {majorTicks.map((deg) => (
          <line
            key={`major-${deg}`}
            x1="100"
            y1="10"
            x2="100"
            y2="18"
            transform={`rotate(${deg} 100 100)`}
            strokeWidth={Number(strokeWidth) * 1.2}
          />
        ))}

        {/* Minor Degree Ticks */}
        {minorTicks.map((deg) => (
          <line
            key={`minor-${deg}`}
            x1="100"
            y1="10"
            x2="100"
            y2="14"
            transform={`rotate(${deg} 100 100)`}
            strokeWidth={Number(strokeWidth) * 0.65}
            opacity="0.7"
          />
        ))}

        {/* North Arrow Pointer */}
        <polygon points="100,2 96,10 104,10" fill={color} stroke="none" />

        {/* Cardinal Direction Indicators */}
        {showCardinalTicks && (
          <g fill={color} stroke="none" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
            <text x="100" y="27">N</text>
            <text x="178" y="103">E</text>
            <text x="100" y="179">S</text>
            <text x="23" y="103">W</text>
          </g>
        )}
      </g>
    </svg>
  );
};
```

---

### 6. `src/components/ui/decorations/BlueprintAccent.tsx`

```tsx
import React from "react";

export type BlueprintAccentVariant = "coordinate-tag" | "dimension-line" | "scale-bar" | "cross-marker";

export interface BlueprintAccentProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  width?: number | string;
  height?: number | string;
  strokeWidth?: number | string;
  opacity?: number;
  color?: string;
  variant?: BlueprintAccentVariant;
  code?: string;
}

export const BlueprintAccent: React.FC<BlueprintAccentProps> = ({
  className = "",
  width = 220,
  height = 40,
  strokeWidth = 1,
  opacity = 0.25,
  color = "currentColor",
  variant = "coordinate-tag",
  code = "ARCH // SEC-01",
  style,
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 220 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none pointer-events-none ${className}`}
      style={{ opacity, ...style }}
      {...props}
    >
      <g stroke={color} strokeWidth={strokeWidth} strokeLinecap="square">
        {variant === "coordinate-tag" && (
          <>
            <rect x="2" y="8" width="130" height="24" strokeWidth={strokeWidth} />
            <line x1="2" y1="14" x2="8" y2="8" />
            <line x1="126" y1="32" x2="132" y2="26" />
            <line x1="132" y1="20" x2="218" y2="20" strokeDasharray="4 2" strokeWidth={Number(strokeWidth) * 0.75} />
            <circle cx="218" cy="20" r="2" fill={color} stroke="none" />
            <text
              x="12"
              y="24"
              fill={color}
              stroke="none"
              fontSize="9"
              fontFamily="monospace"
              letterSpacing="1.5"
            >
              {code}
            </text>
          </>
        )}

        {variant === "dimension-line" && (
          <>
            <line x1="10" y1="20" x2="210" y2="20" strokeWidth={strokeWidth} />
            <line x1="5" y1="26" x2="15" y2="14" strokeWidth={Number(strokeWidth) * 1.5} />
            <line x1="205" y1="26" x2="215" y2="14" strokeWidth={Number(strokeWidth) * 1.5} />
            <line x1="10" y1="5" x2="10" y2="35" strokeWidth={Number(strokeWidth) * 0.6} />
            <line x1="210" y1="5" x2="210" y2="35" strokeWidth={Number(strokeWidth) * 0.6} />
            <rect x="85" y="10" width="50" height="20" fill="white" stroke={color} strokeWidth={Number(strokeWidth) * 0.7} />
            <text
              x="110"
              y="23"
              fill={color}
              stroke="none"
              fontSize="8"
              fontFamily="monospace"
              textAnchor="middle"
            >
              {code || "SCALE 1:50"}
            </text>
          </>
        )}

        {variant === "scale-bar" && (
          <>
            <line x1="10" y1="25" x2="210" y2="25" strokeWidth={strokeWidth} />
            {[10, 50, 90, 130, 170, 210].map((x) => (
              <line key={x} x1={x} y1="17" x2={x} y2="25" strokeWidth={Number(strokeWidth) * 1.2} />
            ))}
            {[30, 70, 110, 150, 190].map((x) => (
              <line key={x} x1={x} y1="21" x2={x} y2="25" strokeWidth={Number(strokeWidth) * 0.7} />
            ))}
            <text x="10" y="12" fill={color} stroke="none" fontSize="7" fontFamily="monospace">0m</text>
            <text x="90" y="12" fill={color} stroke="none" fontSize="7" fontFamily="monospace">5m</text>
            <text x="200" y="12" fill={color} stroke="none" fontSize="7" fontFamily="monospace">10m</text>
          </>
        )}

        {variant === "cross-marker" && (
          <>
            <line x1="100" y1="5" x2="100" y2="35" strokeDasharray="3 3" />
            <line x1="85" y1="20" x2="115" y2="20" strokeDasharray="3 3" />
            <circle cx="100" cy="20" r="8" strokeWidth={strokeWidth} />
            <circle cx="100" cy="20" r="2" fill={color} stroke="none" />
          </>
        )}
      </g>
    </svg>
  );
};
```

---

### 7. `src/components/ui/decorations/index.ts`

```typescript
export * from "./SakuraPetal";
export * from "./SakuraBlossom";
export * from "./SakuraBranch";
export * from "./CornerCrosshairs";
export * from "./CompassRing";
export * from "./BlueprintAccent";
```

---

## 5. Verification Method

1. **File Path & Component Structure Verification**:
   - Verify that all 7 files are created in `src/components/ui/decorations/`.
   - Confirm barrel export `src/components/ui/decorations/index.ts` re-exports all components without circular dependencies.

2. **TypeScript Compilation & Build Verification**:
   - Run `npm run build` from project root (`C:\Users\ADMIN\.gemini\antigravity\scratch\dishasingha`).
   - Confirm zero TypeScript error output and successful Vite production bundle compilation.

3. **Visual & Opacity Inspection**:
   - Verify rendering of line-art elements (`fill="none"`, `stroke="currentColor"`) against pure white background (`#ffffff`).
   - Confirm opacity settings (10–30% overlay opacity) render smoothly without clipping or layout shift.
