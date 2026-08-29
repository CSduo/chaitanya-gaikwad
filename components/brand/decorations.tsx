/**
 * XIYATO decorative vector system.
 *
 * Every motif here is built from the same construction geometry as the logo:
 * concentric circles, registration crosshairs, drafting grids, measurement
 * ticks. They read as one drawing set rather than eight illustrations.
 *
 * Deliberately NOT included: any recreation of the XIYATO monogram. The
 * monogram is used only as the supplied raster artwork, so it can never be
 * silently distorted by a redraw.
 *
 * Contract for every export in this file:
 *   - aria-hidden and focusable="false"
 *   - pointer-events: none (via .deco)
 *   - sits behind content (z-index 0, host uses .deco-host)
 *   - strokes use currentColor so the caller controls tone
 *   - no filters, no blend modes, nothing that can print onto media
 */

type DecoProps = {
  className?: string;
  /** Stroke opacity. Kept low by default; decoration must never compete with copy. */
  opacity?: number;
};

const svgBase = {
  "aria-hidden": true as const,
  focusable: "false" as const,
  fill: "none" as const,
  xmlns: "http://www.w3.org/2000/svg",
};

/* ------------------------------------------------------------------ */
/* 1 — BRAND CONSTRUCTION BACKGROUND                                   */
/* The circular grid and crosshair that the logo is built on.          */
/* ------------------------------------------------------------------ */

export function ConstructionRing({ className = "", opacity = 0.5 }: DecoProps) {
  return (
    <svg {...svgBase} viewBox="0 0 400 400" className={className} style={{ opacity }}>
      <g stroke="currentColor" strokeWidth="1" strokeLinecap="square">
        {/* Twin azimuth rings, as on the emblem */}
        <circle cx="200" cy="200" r="168" />
        <circle cx="200" cy="200" r="158" strokeWidth="0.6" />
        {/* Inner construction square and its quartering grid */}
        <rect x="105" y="105" width="190" height="190" strokeWidth="0.5" />
        <line x1="105" y1="200" x2="295" y2="200" strokeWidth="0.5" />
        <line x1="200" y1="105" x2="200" y2="295" strokeWidth="0.5" />
        <line x1="152" y1="105" x2="152" y2="295" strokeWidth="0.35" />
        <line x1="248" y1="105" x2="248" y2="295" strokeWidth="0.35" />
        {/* Registration marks at the four cardinal points */}
        <line x1="200" y1="18" x2="200" y2="46" strokeWidth="1.4" />
        <line x1="200" y1="354" x2="200" y2="382" strokeWidth="1.4" />
        <line x1="18" y1="200" x2="46" y2="200" strokeWidth="1.4" />
        <line x1="354" y1="200" x2="382" y2="200" strokeWidth="1.4" />
        {/* Centre target */}
        <circle cx="200" cy="200" r="8" strokeWidth="0.6" />
        <circle cx="200" cy="200" r="2" strokeWidth="0.8" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 2 — CORNER FRAME                                                    */
/* The "box line" corner bracket, carried over from the original       */
/* CornerCrosshairs decoration and simplified.                         */
/* ------------------------------------------------------------------ */

export function CornerFrame({
  className = "",
  opacity = 0.55,
  position = "top-left",
}: DecoProps & { position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const rotation = { "top-left": 0, "top-right": 90, "bottom-right": 180, "bottom-left": 270 }[position];
  return (
    <svg
      {...svgBase}
      viewBox="0 0 64 64"
      className={className}
      style={{ opacity, transform: rotation ? `rotate(${rotation}deg)` : undefined }}
    >
      <g stroke="currentColor" strokeWidth="1" strokeLinecap="square">
        <path d="M 4 30 L 4 4 L 30 4" />
        <line x1="12" y1="12" x2="20" y2="20" strokeWidth="0.5" strokeDasharray="2 2" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 3 — CAD MOTIF: architectural drafting geometry                      */
/* ------------------------------------------------------------------ */

export function CadMotif({ className = "", opacity = 0.5 }: DecoProps) {
  return (
    <svg {...svgBase} viewBox="0 0 320 220" className={className} style={{ opacity }}>
      <g stroke="currentColor" strokeLinecap="square">
        {/* Plan outline with a wall thickness offset */}
        <rect x="30" y="30" width="200" height="140" strokeWidth="1" />
        <rect x="38" y="38" width="184" height="124" strokeWidth="0.4" />
        {/* Internal partition and door swing */}
        <line x1="140" y1="38" x2="140" y2="120" strokeWidth="0.8" />
        <path d="M 140 120 A 26 26 0 0 0 166 146" strokeWidth="0.4" strokeDasharray="2 2" />
        {/* Dimension line with end ticks */}
        <line x1="30" y1="192" x2="230" y2="192" strokeWidth="0.5" />
        <line x1="30" y1="186" x2="30" y2="198" strokeWidth="0.8" />
        <line x1="230" y1="186" x2="230" y2="198" strokeWidth="0.8" />
        {/* Grid reference bubbles */}
        <circle cx="30" cy="16" r="8" strokeWidth="0.5" />
        <circle cx="230" cy="16" r="8" strokeWidth="0.5" />
        <line x1="270" y1="30" x2="270" y2="170" strokeWidth="0.35" strokeDasharray="3 3" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 4 — GROWTH / B2B MOTIF: structured rows, nodes, connections         */
/* ------------------------------------------------------------------ */

export function GrowthMotif({ className = "", opacity = 0.5 }: DecoProps) {
  const rows = [0, 1, 2, 3, 4, 5];
  return (
    <svg {...svgBase} viewBox="0 0 320 220" className={className} style={{ opacity }}>
      <g stroke="currentColor" strokeLinecap="square">
        {/* A record table: the shape of a research workbook */}
        <rect x="24" y="28" width="150" height="164" strokeWidth="0.8" />
        {rows.map((r) => (
          <line key={r} x1="24" y1={28 + (r + 1) * 27} x2="174" y2={28 + (r + 1) * 27} strokeWidth="0.35" />
        ))}
        <line x1="72" y1="28" x2="72" y2="192" strokeWidth="0.35" />
        <line x1="126" y1="28" x2="126" y2="192" strokeWidth="0.35" />
        {/* Qualified records branching out to prospects */}
        {[68, 110, 152].map((y, i) => (
          <g key={y}>
            <path d={`M 174 ${y} C 214 ${y}, 224 110, 262 110`} strokeWidth="0.5" />
            <circle cx="262" cy="110" r={i === 1 ? 5 : 0} strokeWidth="0.8" />
          </g>
        ))}
        <circle cx="262" cy="110" r="13" strokeWidth="0.4" strokeDasharray="2 3" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 5 — VISUALISATION MOTIF: framing and projection construction        */
/* ------------------------------------------------------------------ */

export function VisualisationMotif({ className = "", opacity = 0.5 }: DecoProps) {
  return (
    <svg {...svgBase} viewBox="0 0 320 220" className={className} style={{ opacity }}>
      <g stroke="currentColor" strokeLinecap="square">
        {/* Image frame with crop marks */}
        <rect x="70" y="40" width="180" height="130" strokeWidth="1" />
        {[
          [70, 40, -1, -1],
          [250, 40, 1, -1],
          [70, 170, -1, 1],
          [250, 170, 1, 1],
        ].map(([x, y, dx, dy]) => (
          <g key={`${x}-${y}`} strokeWidth="0.8">
            <line x1={x} y1={y} x2={x + dx * 14} y2={y} />
            <line x1={x} y1={y} x2={x} y2={y + dy * 14} />
          </g>
        ))}
        {/* One-point perspective construction to a vanishing point */}
        <circle cx="160" cy="105" r="2.5" strokeWidth="0.7" />
        {[
          [70, 40],
          [250, 40],
          [70, 170],
          [250, 170],
        ].map(([x, y]) => (
          <line key={`v${x}-${y}`} x1={x} y1={y} x2="160" y2="105" strokeWidth="0.3" strokeDasharray="2 3" />
        ))}
        <line x1="70" y1="105" x2="250" y2="105" strokeWidth="0.35" strokeDasharray="4 3" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 6 — VIDEO MOTIF: timeline, frames, timecode ticks                   */
/* ------------------------------------------------------------------ */

export function VideoMotif({ className = "", opacity = 0.5 }: DecoProps) {
  return (
    <svg {...svgBase} viewBox="0 0 320 220" className={className} style={{ opacity }}>
      <g stroke="currentColor" strokeLinecap="square">
        {/* Frame sequence */}
        {[24, 100, 176, 252].map((x) => (
          <rect key={x} x={x} y="56" width="60" height="42" strokeWidth="0.7" />
        ))}
        {/* Timeline with major and minor timecode ticks */}
        <line x1="24" y1="140" x2="296" y2="140" strokeWidth="0.8" />
        {Array.from({ length: 18 }, (_, i) => 24 + i * 16).map((x, i) => (
          <line
            key={x}
            x1={x}
            y1="140"
            x2={x}
            y2={i % 3 === 0 ? 152 : 147}
            strokeWidth={i % 3 === 0 ? 0.7 : 0.35}
          />
        ))}
        {/* Playhead */}
        <line x1="136" y1="126" x2="136" y2="164" strokeWidth="1" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 7 — AUTOMATION MOTIF: input, process, output flow graph             */
/* ------------------------------------------------------------------ */

export function AutomationMotif({ className = "", opacity = 0.5 }: DecoProps) {
  return (
    <svg {...svgBase} viewBox="0 0 320 220" className={className} style={{ opacity }}>
      <g stroke="currentColor" strokeLinecap="square">
        {[52, 110, 168].map((y) => (
          <rect key={y} x="20" y={y - 13} width="52" height="26" strokeWidth="0.6" />
        ))}
        <rect x="132" y="82" width="56" height="56" strokeWidth="1" />
        <circle cx="160" cy="110" r="12" strokeWidth="0.4" strokeDasharray="2 3" />
        {[52, 110, 168].map((y) => (
          <path key={y} d={`M 72 ${y} C 104 ${y}, 104 110, 132 110`} strokeWidth="0.5" />
        ))}
        {[80, 140].map((y) => (
          <path key={y} d={`M 188 110 C 220 110, 220 ${y}, 248 ${y}`} strokeWidth="0.5" />
        ))}
        {[80, 140].map((y) => (
          <rect key={y} x="248" y={y - 13} width="52" height="26" strokeWidth="0.6" />
        ))}
        {/* Return loop — the part that makes it a system rather than a script */}
        <path
          d="M 274 153 C 274 196, 46 196, 46 65"
          strokeWidth="0.35"
          strokeDasharray="3 3"
        />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 8 — WEB MOTIF: responsive viewport wireframes                       */
/* ------------------------------------------------------------------ */

export function WebMotif({ className = "", opacity = 0.5 }: DecoProps) {
  return (
    <svg {...svgBase} viewBox="0 0 320 220" className={className} style={{ opacity }}>
      <g stroke="currentColor" strokeLinecap="square">
        {/* Desktop viewport */}
        <rect x="24" y="40" width="180" height="126" strokeWidth="1" />
        <line x1="24" y1="58" x2="204" y2="58" strokeWidth="0.5" />
        <line x1="24" y1="104" x2="204" y2="104" strokeWidth="0.35" />
        <rect x="36" y="70" width="70" height="24" strokeWidth="0.35" />
        <rect x="36" y="116" width="156" height="8" strokeWidth="0.3" />
        <rect x="36" y="132" width="118" height="8" strokeWidth="0.3" />
        {/* Tablet and handset, same content at three widths */}
        <rect x="216" y="56" width="46" height="94" strokeWidth="0.7" />
        <line x1="216" y1="70" x2="262" y2="70" strokeWidth="0.4" />
        <rect x="272" y="72" width="26" height="62" strokeWidth="0.7" />
        <line x1="272" y1="83" x2="298" y2="83" strokeWidth="0.4" />
        {/* Breakpoint dimension line */}
        <line x1="24" y1="186" x2="298" y2="186" strokeWidth="0.35" strokeDasharray="3 3" />
        {[24, 204, 262, 298].map((x) => (
          <line key={x} x1={x} y1="180" x2={x} y2="192" strokeWidth="0.6" />
        ))}
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Motif router — one call site per service chapter.                   */
/* ------------------------------------------------------------------ */

const MOTIFS = {
  "cad-technical-production": CadMotif,
  "growth-marketing-b2b": GrowthMotif,
  "visualisation-image-production": VisualisationMotif,
  "video-ai-film-editing": VideoMotif,
  "automation-workflow-systems": AutomationMotif,
  "website-design-development": WebMotif,
} as const;

export type MotifSlug = keyof typeof MOTIFS;

export function ServiceMotif({
  slug,
  className = "",
  opacity = 0.5,
}: { slug: string } & DecoProps) {
  const Motif = MOTIFS[slug as MotifSlug];
  return Motif ? <Motif className={className} opacity={opacity} /> : null;
}

/* ------------------------------------------------------------------ */
/* 9 — ARCHITECTURAL HERO BACKGROUND (Pure Black & Crisp White CAD)    */
/* ------------------------------------------------------------------ */

export function ArchitecturalHeroBackground({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 select-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* 1. Fine White Technical Drafting Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_40%,#000_65%,transparent_100%)]" />

      {/* 2. Major 14rem Structural Module Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:14rem_14rem] [mask-image:radial-gradient(ellipse_75%_75%_at_50%_35%,#000_50%,transparent_100%)]" />

      {/* 3. Architectural Blueprint Vector Elements in Crisp White */}
      <svg
        className="absolute inset-0 h-full w-full stroke-white text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        {/* Large Concentric Azimuth Calibration Rings (Top Right) */}
        <g opacity="0.16" strokeWidth="0.8">
          <circle cx="85%" cy="18%" r="140" strokeDasharray="3 3" />
          <circle cx="85%" cy="18%" r="260" strokeWidth="0.5" />
          <circle cx="85%" cy="18%" r="380" strokeDasharray="4 6" />
          <circle cx="85%" cy="18%" r="520" strokeWidth="0.4" />
          {/* Cardinal Coordinate Axes */}
          <line x1="85%" y1="0%" x2="85%" y2="100%" strokeDasharray="2 4" strokeWidth="0.5" />
          <line x1="0%" y1="18%" x2="100%" y2="18%" strokeDasharray="2 4" strokeWidth="0.5" />
          <line x1="40%" y1="0%" x2="100%" y2="60%" strokeDasharray="1 5" strokeWidth="0.35" />
        </g>

        {/* Technical Coordinate Crosshairs (+) at key structural intersections */}
        {[
          { x: "12%", y: "22%" },
          { x: "48%", y: "14%" },
          { x: "72%", y: "55%" },
          { x: "20%", y: "80%" },
          { x: "88%", y: "78%" },
          { x: "60%", y: "88%" },
        ].map((pt, i) => (
          <g key={i} strokeWidth="1" opacity="0.3">
            <line x1={`calc(${pt.x} - 7px)`} y1={pt.y} x2={`calc(${pt.x} + 7px)`} y2={pt.y} />
            <line x1={pt.x} y1={`calc(${pt.y} - 7px)`} x2={pt.x} y2={`calc(${pt.y} + 7px)`} />
            <circle cx={pt.x} cy={pt.y} r="1.5" fill="white" fillOpacity="0.5" stroke="none" />
          </g>
        ))}

        {/* Isometric 30-degree Drafting Perspective Guides (Bottom Left) */}
        <g strokeWidth="0.5" strokeDasharray="2 4" opacity="0.12">
          <line x1="0%" y1="75%" x2="450" y2="40%" />
          <line x1="0%" y1="88%" x2="600" y2="40%" />
          <line x1="120" y1="100%" x2="720" y2="40%" />
        </g>

        {/* Datum Elevation Level Markers (Right Margin) */}
        <g opacity="0.25" strokeWidth="0.75" className="font-mono text-[9px] tracking-wider fill-white">
          <path d="M calc(100% - 130px) 90 L calc(100% - 110px) 90 L calc(100% - 100px) 80" />
          <text x="calc(100% - 95px)" y="84" stroke="none">▽ +3.600 ROOF</text>

          <path d="M calc(100% - 150px) 240 L calc(100% - 130px) 240 L calc(100% - 120px) 230" />
          <text x="calc(100% - 115px)" y="234" stroke="none">▽ +0.000 FFL</text>
        </g>

        {/* Dimensional Measurement Line Top Center */}
        <g opacity="0.2" strokeWidth="0.6" className="font-mono text-[8px] tracking-widest fill-white">
          <line x1="28%" y1="40" x2="68%" y2="40" strokeDasharray="2 2" />
          <line x1="28%" y1="34" x2="28%" y2="46" />
          <line x1="68%" y1="34" x2="68%" y2="46" />
          <text x="48%" y="34" textAnchor="middle" stroke="none">DIM: 9600mm · ARCH STRUCTURAL SPAN</text>
        </g>

        {/* Technical Blueprint Certification Block (Bottom Right) */}
        <g opacity="0.22" strokeWidth="0.6" className="font-mono text-[8px] uppercase tracking-[0.18em] fill-white">
          <rect x="calc(100% - 220px)" y="calc(100% - 56px)" width="190" height="42" stroke="white" strokeWidth="0.6" />
          <text x="calc(100% - 208px)" y="calc(100% - 40px)" stroke="none">XIYÀTO · SPEC SET 01</text>
          <text x="calc(100% - 208px)" y="calc(100% - 26px)" stroke="none">SCALE 1:1 · QA VERIFIED</text>
        </g>
      </svg>
    </div>
  );
}

