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
      className={`pointer-events-none absolute inset-0 select-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* 1. Fine White Technical Drafting Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] [mask-image:radial-gradient(ellipse_95%_95%_at_50%_45%,#000_75%,transparent_100%)]" />

      {/* 2. Major 10rem Structural Modules */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:10rem_10rem] [mask-image:radial-gradient(ellipse_90%_90%_at_50%_40%,#000_65%,transparent_100%)]" />

      {/* 3. Scaled Responsive Architectural & Interior Vector Drawing Set */}
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMaxYMid slice"
        className="absolute inset-0 h-full w-full stroke-white text-white font-mono"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        {/* ==========================================================
            A. TOP RIGHT: AZIMUTH CALIBRATION & LIGHTING CONES
            ========================================================== */}
        <g opacity="0.22" strokeWidth="0.75">
          <circle cx="1320" cy="180" r="90" strokeDasharray="3 3" />
          <circle cx="1320" cy="180" r="190" strokeWidth="0.5" />
          <circle cx="1320" cy="180" r="310" strokeDasharray="4 6" />
          <circle cx="1320" cy="180" r="440" strokeWidth="0.35" />
          
          {/* Cardinal Drafting Axes */}
          <line x1="1320" y1="0" x2="1320" y2="900" strokeDasharray="2 4" strokeWidth="0.5" />
          <line x1="600" y1="180" x2="1600" y2="180" strokeDasharray="2 4" strokeWidth="0.5" />

          {/* Architectural Downlight Fixture & Photometric 38° Cone */}
          <circle cx="1320" cy="180" r="6" strokeWidth="1" />
          <circle cx="1320" cy="180" r="2" fill="white" fillOpacity="0.8" stroke="none" />
          <path d="M 1320 180 L 1180 360" strokeDasharray="2 3" strokeWidth="0.6" />
          <path d="M 1320 180 L 1460 360" strokeDasharray="2 3" strokeWidth="0.6" />
          <path d="M 1195 340 A 200 200 0 0 0 1445 340" strokeDasharray="3 4" strokeWidth="0.5" />
          <text x="1335" y="174" fontSize="9" stroke="none" fill="white" fillOpacity="0.7" letterSpacing="0.1em">
            ⊕ SPOTLIGHT DL-01 · 38°
          </text>
        </g>

        {/* ==========================================================
            B. CENTER RIGHT: MINIMALIST INTERIOR LOUNGE SEATING SUITE (PLAN)
            ========================================================== */}
        <g opacity="0.28" strokeWidth="0.8">
          {/* Room Boundary & Dimension Extension Lines */}
          <rect x="940" y="240" width="560" height="360" strokeWidth="0.9" strokeDasharray="8 4" />
          <text x="960" y="265" fontSize="10" stroke="none" fill="white" fillOpacity="0.85" letterSpacing="0.16em" fontWeight="bold">
            [ SALON 01 · BESPOKE LIVING LOUNGE ]
          </text>

          {/* Curved Minimalist Sofa (Plan View) */}
          <g>
            <rect x="1000" y="310" width="280" height="90" rx="12" strokeWidth="1.1" />
            <line x1="1090" y1="310" x2="1090" y2="400" strokeWidth="0.6" />
            <line x1="1190" y1="310" x2="1190" y2="400" strokeWidth="0.6" />
            {/* Backrest Cushion Offset */}
            <path d="M 1008 335 Q 1140 330 1272 335" strokeDasharray="2 2" strokeWidth="0.6" />
            <text x="1140" y="360" textAnchor="middle" fontSize="8" stroke="none" fill="white" fillOpacity="0.6" letterSpacing="0.1em">
              CURVED LOUNGE MODULE · 2800mm
            </text>
          </g>

          {/* Monolithic Coffee Table (Plan View) */}
          <g>
            <rect x="1060" y="440" width="160" height="70" rx="4" strokeWidth="0.9" />
            <line x1="1060" y1="440" x2="1220" y2="510" strokeDasharray="1 3" strokeWidth="0.4" />
            <text x="1140" y="480" textAnchor="middle" fontSize="8" stroke="none" fill="white" fillOpacity="0.6" letterSpacing="0.1em">
              TRAVERTINE PLINTH
            </text>
          </g>

          {/* Minimalist Accent Lounge Chair 01 */}
          <g>
            <rect x="1330" y="320" width="80" height="80" rx="16" strokeWidth="1" />
            <circle cx="1370" cy="360" r="24" strokeDasharray="2 3" strokeWidth="0.5" />
            <text x="1370" y="415" textAnchor="middle" fontSize="7" stroke="none" fill="white" fillOpacity="0.6">
              ACCENT ARMCHAIR
            </text>
          </g>

          {/* Minimalist Accent Lounge Chair 02 */}
          <g>
            <rect x="1330" y="430" width="80" height="80" rx="16" strokeWidth="1" />
            <circle cx="1370" cy="470" r="24" strokeDasharray="2 3" strokeWidth="0.5" />
          </g>

          {/* Architectural Floor Herringbone / Linear Tile Hatching */}
          <g opacity="0.4" strokeWidth="0.3" strokeDasharray="2 4">
            <line x1="940" y1="380" x2="1500" y2="380" />
            <line x1="940" y1="460" x2="1500" y2="460" />
            <line x1="940" y1="540" x2="1500" y2="540" />
            <line x1="1040" y1="240" x2="1040" y2="600" />
            <line x1="1300" y1="240" x2="1300" y2="600" />
          </g>

          {/* Dimension Witness String */}
          <g opacity="0.8" strokeWidth="0.6" fontSize="8">
            <line x1="1000" y1="290" x2="1280" y2="290" />
            <line x1="1000" y1="284" x2="1000" y2="296" />
            <line x1="1280" y1="284" x2="1280" y2="296" />
            <text x="1140" y="285" textAnchor="middle" stroke="none" fill="white" fillOpacity="0.75">
              DIM: 2,800 mm
            </text>
          </g>
        </g>

        {/* ==========================================================
            C. BOTTOM RIGHT: INTERIOR WALL JOINERY ELEVATION & SLATS
            ========================================================== */}
        <g opacity="0.25" strokeWidth="0.75">
          {/* Wall Panelling Frame */}
          <rect x="940" y="640" width="560" height="180" strokeWidth="0.9" />

          {/* Fluted Vertical Timber Slats */}
          {Array.from({ length: 22 }, (_, i) => 970 + i * 22).map((x, i) => (
            <line
              key={x}
              x1={x}
              y1="640"
              x2={x}
              y2={i > 13 ? 750 : 820}
              strokeWidth={i % 3 === 0 ? "0.8" : "0.4"}
              strokeDasharray={i % 4 === 0 ? "4 2" : "none"}
            />
          ))}

          {/* Floating Credenza / Media Unit in Joinery */}
          <rect x="1260" y="750" width="220" height="50" rx="2" strokeWidth="1" />
          <line x1="1370" y1="750" x2="1370" y2="800" strokeWidth="0.6" />
          <text x="1370" y="780" textAnchor="middle" fontSize="7" stroke="none" fill="white" fillOpacity="0.7" letterSpacing="0.1em">
            C-01 FLOATING JOINERY · 2200mm
          </text>

          {/* Recessed Shadow Gap Detail Notation */}
          <line x1="940" y1="655" x2="1500" y2="655" strokeDasharray="2 2" strokeWidth="0.5" />
          <text x="960" y="632" fontSize="8" stroke="none" fill="white" fillOpacity="0.7" letterSpacing="0.12em">
            ELEVATION E-01 · VERTICAL ACOUSTIC SLAT DETAIL (20mm REVEAL)
          </text>
        </g>

        {/* ==========================================================
            D. INTERIOR ELEVATION DATUMS (RIGHT MARGIN)
            ========================================================== */}
        <g opacity="0.32" strokeWidth="0.75" fontSize="9" letterSpacing="0.08em" className="fill-white">
          <path d="M 1520 240 L 1545 240 L 1555 230" />
          <text x="1560" y="235" stroke="none">▽ +3.200 SUSPENDED CEILING</text>

          <path d="M 1520 420 L 1545 420 L 1555 410" />
          <text x="1560" y="415" stroke="none">▽ +2.400 JOINERY DATUM</text>

          <path d="M 1520 640 L 1545 640 L 1555 630" />
          <text x="1560" y="635" stroke="none">▽ +0.900 BALUSTRADE / COUNTER</text>

          <path d="M 1520 820 L 1545 820 L 1555 810" />
          <text x="1560" y="815" stroke="none">▽ +0.000 FFL (FINISHED FLOOR)</text>
        </g>

        {/* ==========================================================
            E. TOP MARGIN: STRUCTURAL AXIS BUBBLES
            ========================================================== */}
        <g opacity="0.28" strokeWidth="0.6" fontSize="9" textAnchor="middle" className="fill-white">
          <circle cx="160" cy="50" r="10" />
          <text x="160" y="53" stroke="none">A</text>

          <circle cx="480" cy="50" r="10" />
          <text x="480" y="53" stroke="none">B</text>

          <circle cx="800" cy="50" r="10" />
          <text x="800" y="53" stroke="none">C</text>

          <circle cx="1120" cy="50" r="10" />
          <text x="1120" y="53" stroke="none">D</text>

          <circle cx="1440" cy="50" r="10" />
          <text x="1440" y="53" stroke="none">E</text>

          {/* Span Dimension */}
          <line x1="160" y1="75" x2="1440" y2="75" strokeDasharray="3 3" />
          <line x1="160" y1="68" x2="160" y2="82" />
          <line x1="1440" y1="68" x2="1440" y2="82" />
          <text x="800" y="70" stroke="none" fontSize="8" letterSpacing="0.18em">
            TOTAL ENVELOPE: 24,000mm · STRUCTURAL GRID
          </text>
        </g>

        {/* ==========================================================
            F. PRECISION REGISTRATION CROSSHAIRS (+)
            ========================================================== */}
        {[
          { x: 160, y: 220 },
          { x: 480, y: 160 },
          { x: 800, y: 280 },
          { x: 940, y: 180 },
          { x: 280, y: 640 },
          { x: 620, y: 780 },
          { x: 940, y: 820 },
          { x: 1500, y: 820 },
        ].map((pt, i) => (
          <g key={i} strokeWidth="1" opacity="0.35">
            <line x1={pt.x - 8} y1={pt.y} x2={pt.x + 8} y2={pt.y} />
            <line x1={pt.x} y1={pt.y - 8} x2={pt.x} y2={pt.y + 8} />
            <circle cx={pt.x} cy={pt.y} r="1.5" fill="white" fillOpacity="0.7" stroke="none" />
          </g>
        ))}

        {/* ==========================================================
            G. BOTTOM RIGHT: INTERIOR TITLE BLOCK & SPECIFICATION STAMP
            ========================================================== */}
        <g opacity="0.32" strokeWidth="0.6" fontSize="8" letterSpacing="0.16em" className="fill-white uppercase">
          {/* North Point Arrow */}
          <circle cx="1200" cy="855" r="14" />
          <polygon points="1200,843 1195,860 1200,856 1205,860" fill="white" fillOpacity="0.5" stroke="none" />
          <text x="1200" y="838" textAnchor="middle" stroke="none">N</text>

          {/* Blueprint Title Block */}
          <rect x="1240" y="835" width="260" height="42" stroke="white" strokeWidth="0.8" />
          <text x="1255" y="851" stroke="none">XIYÀTO · INTERIOR ARCHITECTURE</text>
          <text x="1255" y="866" stroke="none">DWG IA-01 · SCALE 1:20 · VERIFIED</text>
        </g>
      </svg>
    </div>
  );
}
