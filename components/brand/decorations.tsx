/**
 * XIYATO decorative vector system.
 *
 * Every motif here is built from the same construction geometry as the logo:
 * concentric circles, registration crosshairs, drafting grids, measurement
 * ticks. They read as one drawing set rather than eight illustrations.
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
/* 3 — CAD MOTIF                                                       */
/* ------------------------------------------------------------------ */

export function CadMotif({ className = "", opacity = 0.5 }: DecoProps) {
  return (
    <svg {...svgBase} viewBox="0 0 320 220" className={className} style={{ opacity }}>
      <g stroke="currentColor" strokeLinecap="square">
        <rect x="30" y="30" width="200" height="140" strokeWidth="1" />
        <rect x="38" y="38" width="184" height="124" strokeWidth="0.4" />
        <line x1="140" y1="38" x2="140" y2="120" strokeWidth="0.8" />
        <path d="M 140 120 A 26 26 0 0 0 166 146" strokeWidth="0.4" strokeDasharray="2 2" />
        <line x1="30" y1="192" x2="230" y2="192" strokeWidth="0.5" />
        <line x1="30" y1="186" x2="30" y2="198" strokeWidth="0.8" />
        <line x1="230" y1="186" x2="230" y2="198" strokeWidth="0.8" />
        <circle cx="30" cy="16" r="8" strokeWidth="0.5" />
        <circle cx="230" cy="16" r="8" strokeWidth="0.5" />
        <line x1="270" y1="30" x2="270" y2="170" strokeWidth="0.35" strokeDasharray="3 3" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 4 — GROWTH / B2B MOTIF                                              */
/* ------------------------------------------------------------------ */

export function GrowthMotif({ className = "", opacity = 0.5 }: DecoProps) {
  const rows = [0, 1, 2, 3, 4, 5];
  return (
    <svg {...svgBase} viewBox="0 0 320 220" className={className} style={{ opacity }}>
      <g stroke="currentColor" strokeLinecap="square">
        <rect x="24" y="28" width="150" height="164" strokeWidth="0.8" />
        {rows.map((r) => (
          <line key={r} x1="24" y1={28 + (r + 1) * 27} x2="174" y2={28 + (r + 1) * 27} strokeWidth="0.35" />
        ))}
        <line x1="72" y1="28" x2="72" y2="192" strokeWidth="0.35" />
        <line x1="126" y1="28" x2="126" y2="192" strokeWidth="0.35" />
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
/* 5 — VISUALISATION MOTIF                                             */
/* ------------------------------------------------------------------ */

export function VisualisationMotif({ className = "", opacity = 0.5 }: DecoProps) {
  return (
    <svg {...svgBase} viewBox="0 0 320 220" className={className} style={{ opacity }}>
      <g stroke="currentColor" strokeLinecap="square">
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
/* 6 — VIDEO MOTIF                                                     */
/* ------------------------------------------------------------------ */

export function VideoMotif({ className = "", opacity = 0.5 }: DecoProps) {
  return (
    <svg {...svgBase} viewBox="0 0 320 220" className={className} style={{ opacity }}>
      <g stroke="currentColor" strokeLinecap="square">
        {[24, 100, 176, 252].map((x) => (
          <rect key={x} x={x} y="56" width="60" height="42" strokeWidth="0.7" />
        ))}
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
        <line x1="136" y1="126" x2="136" y2="164" strokeWidth="1" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 7 — AUTOMATION MOTIF                                                */
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
/* 8 — WEB MOTIF                                                       */
/* ------------------------------------------------------------------ */

export function WebMotif({ className = "", opacity = 0.5 }: DecoProps) {
  return (
    <svg {...svgBase} viewBox="0 0 320 220" className={className} style={{ opacity }}>
      <g stroke="currentColor" strokeLinecap="square">
        <rect x="24" y="40" width="180" height="126" strokeWidth="1" />
        <line x1="24" y1="58" x2="204" y2="58" strokeWidth="0.5" />
        <line x1="24" y1="104" x2="204" y2="104" strokeWidth="0.35" />
        <rect x="36" y="70" width="70" height="24" strokeWidth="0.35" />
        <rect x="36" y="116" width="156" height="8" strokeWidth="0.3" />
        <rect x="36" y="132" width="118" height="8" strokeWidth="0.3" />
        <rect x="216" y="56" width="46" height="94" strokeWidth="0.7" />
        <line x1="216" y1="70" x2="262" y2="70" strokeWidth="0.4" />
        <rect x="272" y="72" width="26" height="62" strokeWidth="0.7" />
        <line x1="272" y1="83" x2="298" y2="83" strokeWidth="0.4" />
        <line x1="24" y1="186" x2="298" y2="186" strokeWidth="0.35" strokeDasharray="3 3" />
        {[24, 204, 262, 298].map((x) => (
          <line key={x} x1={x} y1="180" x2={x} y2="192" strokeWidth="0.6" />
        ))}
      </g>
    </svg>
  );
}

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
/* Full-bleed architectural blueprint drafting grid & vector geometry */
/* ------------------------------------------------------------------ */

export function ArchitecturalHeroBackground({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 select-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* 1. Fine White Technical Drafting Grid (Minor 2.5rem modules) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] [mask-image:radial-gradient(ellipse_90%_90%_at_50%_45%,#000_70%,transparent_100%)]" />

      {/* 2. Major 10rem Structural Framing Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:10rem_10rem] [mask-image:radial-gradient(ellipse_85%_85%_at_50%_40%,#000_60%,transparent_100%)]" />

      {/* 3. Architectural Blueprint Vector Set in Crisp Subtle White */}
      <svg
        className="absolute inset-0 h-full w-full stroke-white text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        {/* Large Concentric Azimuth Calibration Rings (Top Right) */}
        <g opacity="0.16" strokeWidth="0.75">
          <circle cx="82%" cy="22%" r="100" strokeDasharray="3 3" />
          <circle cx="82%" cy="22%" r="200" strokeWidth="0.5" />
          <circle cx="82%" cy="22%" r="320" strokeDasharray="4 6" />
          <circle cx="82%" cy="22%" r="460" strokeWidth="0.35" />
          <circle cx="82%" cy="22%" r="620" strokeDasharray="2 4" strokeWidth="0.3" />
          {/* Cardinal Coordinate Axes */}
          <line x1="82%" y1="0%" x2="82%" y2="100%" strokeDasharray="2 4" strokeWidth="0.5" />
          <line x1="0%" y1="22%" x2="100%" y2="22%" strokeDasharray="2 4" strokeWidth="0.5" />
          <line x1="30%" y1="0%" x2="100%" y2="70%" strokeDasharray="1 5" strokeWidth="0.35" />
        </g>

        {/* Axonometric 3D Spatial Wireframe (Center Right) */}
        <g opacity="0.14" strokeWidth="0.7" className="stroke-white">
          {/* Main 3D Volume */}
          <polygon points="calc(80% - 120px),160 calc(80% + 40px),110 calc(80% + 180px),170 calc(80% + 20px),220" />
          <polygon points="calc(80% - 120px),290 calc(80% + 40px),240 calc(80% + 180px),300 calc(80% + 20px),350" />
          <line x1="calc(80% - 120px)" y1="160" x2="calc(80% - 120px)" y2="290" />
          <line x1="calc(80% + 40px)" y1="110" x2="calc(80% + 40px)" y2="240" />
          <line x1="calc(80% + 180px)" y1="170" x2="calc(80% + 180px)" y2="300" />
          <line x1="calc(80% + 20px)" y1="220" x2="calc(80% + 20px)" y2="350" />
          
          {/* Internal Spatial Divisions & Projection Rays */}
          <line x1="calc(80% - 50px)" y1="145" x2="calc(80% - 50px)" y2="275" strokeDasharray="2 3" strokeWidth="0.5" />
          <line x1="calc(80% + 100px)" y1="140" x2="calc(80% + 100px)" y2="270" strokeDasharray="2 3" strokeWidth="0.5" />
          <line x1="calc(80% - 120px)" y1="160" x2="calc(80% + 180px)" y2="300" strokeDasharray="1 4" strokeWidth="0.4" />
        </g>

        {/* Floor Plan Structural Partitions with Dimensions (Far Right) */}
        <g opacity="0.15" strokeWidth="0.75">
          <rect x="calc(100% - 320px)" y="380" width="260" height="180" strokeWidth="0.8" />
          <rect x="calc(100% - 310px)" y="390" width="240" height="160" strokeWidth="0.4" strokeDasharray="3 2" />
          <line x1="calc(100% - 200px)" y1="380" x2="calc(100% - 200px)" y2="480" strokeWidth="0.8" />
          <path d="M calc(100% - 200px) 480 A 35 35 0 0 0 calc(100% - 165px) 515" strokeDasharray="2 2" strokeWidth="0.5" />
          
          {/* Structural Column Nodes */}
          <rect x="calc(100% - 324px)" y="376" width="8" height="8" fill="white" fillOpacity="0.3" stroke="none" />
          <rect x="calc(100% - 64px)" y="376" width="8" height="8" fill="white" fillOpacity="0.3" stroke="none" />
          <rect x="calc(100% - 324px)" y="556" width="8" height="8" fill="white" fillOpacity="0.3" stroke="none" />
          <rect x="calc(100% - 64px)" y="556" width="8" height="8" fill="white" fillOpacity="0.3" stroke="none" />
        </g>

        {/* Structural Grid Reference Bubbles (Top and Left Margins) */}
        <g opacity="0.22" strokeWidth="0.6" className="font-mono text-[9px] fill-white text-center">
          <circle cx="10%" cy="40" r="9" />
          <text x="10%" y="43" textAnchor="middle" stroke="none">A</text>
          
          <circle cx="28%" cy="40" r="9" />
          <text x="28%" y="43" textAnchor="middle" stroke="none">B</text>

          <circle cx="46%" cy="40" r="9" />
          <text x="46%" y="43" textAnchor="middle" stroke="none">C</text>

          <circle cx="64%" cy="40" r="9" />
          <text x="64%" y="43" textAnchor="middle" stroke="none">D</text>

          <circle cx="82%" cy="40" r="9" />
          <text x="82%" y="43" textAnchor="middle" stroke="none">E</text>
        </g>

        {/* Technical Coordinate Crosshairs (+) at key structural intersections */}
        {[
          { x: "10%", y: "18%" },
          { x: "28%", y: "26%" },
          { x: "46%", y: "14%" },
          { x: "64%", y: "38%" },
          { x: "82%", y: "52%" },
          { x: "18%", y: "68%" },
          { x: "52%", y: "82%" },
          { x: "74%", y: "88%" },
        ].map((pt, i) => (
          <g key={i} strokeWidth="1" opacity="0.28">
            <line x1={`calc(${pt.x} - 8px)`} y1={pt.y} x2={`calc(${pt.x} + 8px)`} y2={pt.y} />
            <line x1={pt.x} y1={`calc(${pt.y} - 8px)`} x2={pt.x} y2={`calc(${pt.y} + 8px)`} />
            <circle cx={pt.x} cy={pt.y} r="1.5" fill="white" fillOpacity="0.6" stroke="none" />
          </g>
        ))}

        {/* Isometric 30-degree Drafting Perspective Guides (Bottom Left) */}
        <g strokeWidth="0.5" strokeDasharray="2 4" opacity="0.12">
          <line x1="0%" y1="65%" x2="520" y2="28%" />
          <line x1="0%" y1="80%" x2="680" y2="28%" />
          <line x1="100" y1="95%" x2="800" y2="28%" />
        </g>

        {/* Datum Elevation Level Markers (Right Margin) */}
        <g opacity="0.25" strokeWidth="0.75" className="font-mono text-[9px] tracking-wider fill-white">
          <path d="M calc(100% - 150px) 70 L calc(100% - 130px) 70 L calc(100% - 120px) 60" />
          <text x="calc(100% - 115px)" y="64" stroke="none">▽ +7.200 PARAPET</text>

          <path d="M calc(100% - 150px) 180 L calc(100% - 130px) 180 L calc(100% - 120px) 170" />
          <text x="calc(100% - 115px)" y="174" stroke="none">▽ +3.600 LVL 02</text>

          <path d="M calc(100% - 170px) 330 L calc(100% - 150px) 330 L calc(100% - 140px) 320" />
          <text x="calc(100% - 135px)" y="324" stroke="none">▽ +0.000 FFL</text>
        </g>

        {/* Dimensional Measurement Line Top Center */}
        <g opacity="0.22" strokeWidth="0.6" className="font-mono text-[8px] tracking-widest fill-white">
          <line x1="10%" y1="62" x2="64%" y2="62" strokeDasharray="2 2" />
          <line x1="10%" y1="56" x2="10%" y2="68" />
          <line x1="28%" y1="58" x2="28%" y2="66" />
          <line x1="46%" y1="58" x2="46%" y2="66" />
          <line x1="64%" y1="56" x2="64%" y2="68" />
          <text x="37%" y="54" textAnchor="middle" stroke="none">SPAN: 18,400mm · STRUCTURAL GRID MODULE</text>
        </g>

        {/* North Arrow & Architectural Drafting Certification Block (Bottom Right) */}
        <g opacity="0.25" strokeWidth="0.6" className="font-mono text-[8px] uppercase tracking-[0.16em] fill-white">
          {/* North Arrow */}
          <circle cx="calc(100% - 255px)" cy="calc(100% - 35px)" r="12" />
          <polygon points="calc(100% - 255px),calc(100% - 45px) calc(100% - 259px),calc(100% - 30px) calc(100% - 255px),calc(100% - 34px) calc(100% - 251px),calc(100% - 30px)" fill="white" fillOpacity="0.4" stroke="none" />
          <text x="calc(100% - 258px)" y="calc(100% - 48px)" stroke="none">N</text>

          {/* Title Block */}
          <rect x="calc(100% - 230px)" y="calc(100% - 56px)" width="200" height="42" stroke="white" strokeWidth="0.6" />
          <text x="calc(100% - 218px)" y="calc(100% - 40px)" stroke="none">XIYÀTO · SPEC SET 01</text>
          <text x="calc(100% - 218px)" y="calc(100% - 26px)" stroke="none">SCALE 1:50 · QA VERIFIED</text>
        </g>
      </svg>
    </div>
  );
}
