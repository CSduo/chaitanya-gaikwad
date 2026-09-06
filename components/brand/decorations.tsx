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
            <line x1={x} y1={y} x2={x} y2={x + dy * 14} />
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
/* 9 — ARCHITECTURAL & INTERIOR DESIGN HERO BACKGROUND                */
/* Minimalist, eye-catching architectural & interior CAD linework     */
/* ------------------------------------------------------------------ */

export function ArchitecturalHeroBackground({ className = "" }: { className?: string }) {
  return (
    <div
      className={`deco pointer-events-none absolute inset-0 select-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* 1. Fine Technical Drafting Grid (Crisp and visible against dark backdrop) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.11)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.11)_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* 2. Major Structural Grid (160px modules with high-contrast lines) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.22)_1.5px,transparent_1.5px),linear-gradient(to_bottom,rgba(255,255,255,0.22)_1.5px,transparent_1.5px)] bg-[size:160px_160px]" />

      {/* 3. Subtle ambient glow to lift the architectural blueprint linework */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.06)_0%,transparent_60%)]" />

      {/* 4. Text legibility veil (softens lines directly under copy without dimming background) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_22%_45%,rgba(0,0,0,0.55)_0%,transparent_70%)]" />

      {/* 5. Complete Architectural Blueprint Linework System */}
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        {/* ── DRAWING SHEET BORDER & COORDINATE MARGIN (RIBA / AIA Format) ── */}
        <g stroke="white" strokeWidth="1.5" opacity="0.45">
          <rect x="24" y="24" width="1552" height="852" />
          <rect x="30" y="30" width="1540" height="840" strokeWidth="0.75" strokeDasharray="6 6" />
        </g>

        {/* Border Grid Reference Indices */}
        <g fill="white" opacity="0.6" fontFamily="monospace" fontSize="9" textAnchor="middle">
          {["A", "B", "C", "D", "E", "F", "G", "H"].map((letter, i) => (
            <text key={letter} x={100 + i * 200} y="18">{letter}</text>
          ))}
          {[1, 2, 3, 4, 5, 6].map((num, i) => (
            <text key={num} x="16" y={100 + i * 140}>{num}</text>
          ))}
        </g>

        {/* ── TOP STRUCTURAL AXIS BUBBLES & DIMENSION CHAIN (Clear of brand title) ── */}
        <g stroke="white" opacity="0.6" strokeWidth="1" fontFamily="monospace" fontSize="10" textAnchor="middle" fill="white">
          {[360, 580, 800, 1020, 1240, 1460].map((cx, i) => (
            <g key={cx}>
              <circle cx={cx} cy="36" r="11" strokeWidth="1.2" fill="rgba(0,0,0,0.8)" />
              <text x={cx} y="40" stroke="none" fontWeight="bold">{String.fromCharCode(67 + i)}</text>
              <line x1={cx} y1="47" x2={cx} y2="900" strokeDasharray="4 8" strokeWidth="0.5" opacity="0.25" />
            </g>
          ))}
          {/* Top Span Dimension String */}
          <line x1="360" y1="56" x2="1460" y2="56" strokeWidth="0.8" />
          {[360, 580, 800, 1020, 1240, 1460].map(x => (
            <g key={x}>
              <line x1={x - 4} y1="52" x2={x + 4} y2="60" strokeWidth="1.2" />
            </g>
          ))}
          <text x="470" y="52" stroke="none" fontSize="8">4,800</text>
          <text x="690" y="52" stroke="none" fontSize="8">4,800</text>
          <text x="910" y="52" stroke="none" fontSize="8">4,800</text>
          <text x="1130" y="52" stroke="none" fontSize="8">4,800</text>
          <text x="1350" y="52" stroke="none" fontSize="8">4,800</text>
        </g>

        {/* ── LEFT MARGIN ELEVATION DATUMS ── */}
        <g stroke="white" opacity="0.75" strokeWidth="1" fontFamily="monospace" fontSize="10" fill="white">
          {/* Datum 1: Ceiling */}
          <line x1="40" y1="140" x2="90" y2="140" strokeWidth="1.2" />
          <polygon points="90,140 102,132 102,140" fill="white" stroke="none" />
          <text x="110" y="136" stroke="none">▽ +3.400 CEILING DATUM</text>
          <line x1="102" y1="140" x2="520" y2="140" strokeDasharray="3 4" strokeWidth="0.5" opacity="0.4" />

          {/* Datum 2: High Level Joinery */}
          <line x1="40" y1="280" x2="90" y2="280" strokeWidth="1.2" />
          <polygon points="90,280 102,272 102,280" fill="white" stroke="none" />
          <text x="110" y="276" stroke="none">▽ +2.400 DOOR HEAD &amp; JOINERY</text>
          <line x1="102" y1="280" x2="520" y2="280" strokeDasharray="3 4" strokeWidth="0.5" opacity="0.4" />

          {/* Datum 3: Worksurface / Counter */}
          <line x1="40" y1="460" x2="90" y2="460" strokeWidth="1.2" />
          <polygon points="90,460 102,452 102,460" fill="white" stroke="none" />
          <text x="110" y="456" stroke="none">▽ +0.900 WORK SURFACE DATUM</text>
          <line x1="102" y1="460" x2="520" y2="460" strokeDasharray="3 4" strokeWidth="0.5" opacity="0.4" />

          {/* Datum 4: Finished Floor Level */}
          <line x1="40" y1="620" x2="90" y2="620" strokeWidth="1.5" />
          <polygon points="90,620 102,612 102,620" fill="white" stroke="none" />
          <text x="110" y="616" stroke="none" fontWeight="bold">▽ ±0.000 FINISHED FLOOR LEVEL (FFL)</text>
          <line x1="102" y1="620" x2="700" y2="620" strokeWidth="0.8" opacity="0.5" />

          {/* Datum 5: Structural Slab */}
          <line x1="40" y1="680" x2="90" y2="680" strokeWidth="1" />
          <polygon points="90,680 102,672 102,680" fill="white" stroke="none" />
          <text x="110" y="676" stroke="none" opacity="0.8">▽ -0.300 STRUCTURAL CONCRETE SLAB</text>
          <line x1="102" y1="680" x2="520" y2="680" strokeDasharray="4 4" strokeWidth="0.5" opacity="0.3" />
        </g>

        {/* ── LEFT & CENTER: REAL ARCHITECTURAL FLOOR PLAN & SECTION SCHEMATICS ── */}
        <g stroke="white" opacity="0.55" strokeWidth="1.2">
          {/* Wall Section & Hatching (behind headline area) */}
          <rect x="70" y="720" width="460" height="28" strokeWidth="1.4" />
          <line x1="70" y1="734" x2="530" y2="734" strokeWidth="0.6" strokeDasharray="2 2" />
          {Array.from({ length: 23 }, (_, i) => 80 + i * 20).map(x => (
            <line key={x} x1={x} y1="720" x2={x + 10} y2="748" strokeWidth="0.75" />
          ))}
          <text x="80" y="712" fontFamily="monospace" fontSize="9" fill="white" stroke="none" letterSpacing="0.14em">
            WALL DETAIL W-04 · 250mm ACOUSTIC CAVITY PARTITION
          </text>

          {/* Architectural Door Swing */}
          <line x1="440" y1="620" x2="520" y2="620" strokeWidth="2" />
          <line x1="440" y1="620" x2="440" y2="540" strokeWidth="1.5" />
          <path d="M 520 620 A 80 80 0 0 0 440 540" strokeDasharray="4 4" strokeWidth="1" />
          <text x="450" y="585" fontFamily="monospace" fontSize="8" fill="white" stroke="none">D-01 · 900</text>

          {/* Window Fenestration Assembly */}
          <rect x="560" y="614" width="160" height="12" strokeWidth="1.2" />
          <line x1="560" y1="620" x2="720" y2="620" strokeWidth="0.8" />
          <text x="640" y="605" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="white" stroke="none">
            W-03 DOUBLE GLAZED MULLION
          </text>
        </g>

        {/* ── ARCHITECTURAL RADIAL CALIBRATION & ISOMETRIC GRIDS ── */}
        <g stroke="white" opacity="0.45" strokeWidth="1">
          {/* Concentric Geometry Rings */}
          <circle cx="1180" cy="220" r="120" strokeDasharray="6 6" strokeWidth="0.8" />
          <circle cx="1180" cy="220" r="240" strokeWidth="0.6" />
          <circle cx="1180" cy="220" r="380" strokeDasharray="8 8" strokeWidth="0.5" />
          <circle cx="1180" cy="220" r="8" strokeWidth="1.5" />
          <circle cx="1180" cy="220" r="3" fill="white" stroke="none" />

          {/* Radial Angle Rays */}
          <line x1="900" y1="220" x2="1460" y2="220" strokeDasharray="4 4" strokeWidth="0.8" />
          <line x1="1180" y1="0" x2="1180" y2="500" strokeDasharray="4 4" strokeWidth="0.8" />
          <line x1="1010" y1="50" x2="1350" y2="390" strokeDasharray="3 5" strokeWidth="0.6" />
          <line x1="1010" y1="390" x2="1350" y2="50" strokeDasharray="3 5" strokeWidth="0.6" />

          <text x="1195" y="212" fontFamily="monospace" fontSize="9" fill="white" stroke="none" letterSpacing="0.14em">
            GEOMETRIC ORIGIN · AXIS 04-D
          </text>
        </g>

        {/* ── REGISTRATION TARGET CROSSHAIRS (Precision Technical Stamps) ── */}
        {[
          [80, 100], [480, 100], [800, 100],
          [80, 480], [380, 480], [740, 480],
          [80, 800], [540, 800], [920, 800], [1480, 800],
        ].map(([x, y], i) => (
          <g key={i} stroke="white" strokeWidth="1.2" opacity="0.6">
            <line x1={x - 12} y1={y} x2={x + 12} y2={y} />
            <line x1={x} y1={y - 12} x2={x} y2={y + 12} />
            <circle cx={x} cy={y} r="5" strokeWidth="0.8" />
            <circle cx={x} cy={y} r="1.5" fill="white" stroke="none" />
          </g>
        ))}

        {/* ── TECHNICAL TITLE BLOCK & NORTH ARROW (Bottom Left & Right) ── */}
        <g stroke="white" opacity="0.75" strokeWidth="1" fontFamily="monospace" fontSize="9" letterSpacing="0.14em" fill="white">
          {/* North Arrow on Bottom Left */}
          <circle cx="80" cy="830" r="18" strokeWidth="1.2" />
          <polygon points="80,816 73,838 80,833 87,838" fill="white" stroke="none" />
          <text x="80" y="812" textAnchor="middle" stroke="none" fontWeight="bold" fontSize="10">N</text>
          <text x="110" y="828" stroke="none" fontSize="8" letterSpacing="0.18em">GRID NORTH · 0.00°</text>
          <text x="110" y="842" stroke="none" fontSize="8" fillOpacity="0.7">COORD: 51°30'26"N 0°07'39"W</text>

          {/* Scale Bar on Bottom Left */}
          <g transform="translate(320, 825)">
            <rect x="0" y="0" width="160" height="8" strokeWidth="1" />
            <rect x="0" y="0" width="40" height="8" fill="white" stroke="none" />
            <rect x="80" y="0" width="40" height="8" fill="white" stroke="none" />
            <text x="0" y="-4" stroke="none" fontSize="8">0m</text>
            <text x="40" y="-4" stroke="none" fontSize="8">1m</text>
            <text x="80" y="-4" stroke="none" fontSize="8">2m</text>
            <text x="120" y="-4" stroke="none" fontSize="8">3m</text>
            <text x="160" y="-4" stroke="none" fontSize="8">4m</text>
            <text x="80" y="20" textAnchor="middle" stroke="none" fontSize="8">SCALE 1:50 @ A1</text>
          </g>

          {/* Full Architectural RIBA Specification Title Block on Bottom Right */}
          <g transform="translate(1180, 780)">
            <rect x="0" y="0" width="370" height="74" strokeWidth="1.5" fill="rgba(0,0,0,0.75)" />
            <line x1="0" y1="24" x2="370" y2="24" strokeWidth="1" />
            <line x1="0" y1="48" x2="370" y2="48" strokeWidth="1" />
            <line x1="220" y1="24" x2="220" y2="74" strokeWidth="1" />
            
            <text x="14" y="16" stroke="none" fontWeight="bold" fontSize="10">XIYÀTO · TECHNICAL ARCHITECTURE &amp; PRODUCTION</text>
            <text x="14" y="38" stroke="none" fontSize="8" fillOpacity="0.9">PROJECT: INTERNATIONAL EXECUTIVE SPECIFICATION</text>
            <text x="14" y="62" stroke="none" fontSize="8" fillOpacity="0.9">DISCIPLINE: CAD · BIM · JOINERY · 3D · SYSTEMS</text>
            
            <text x="230" y="38" stroke="none" fontSize="8">DWG NO: XI-A101</text>
            <text x="230" y="62" stroke="none" fontSize="8">STATUS: STAGE 4 QA</text>
          </g>
        </g>
      </svg>
    </div>
  );
}

