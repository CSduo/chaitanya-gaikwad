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

      {/* 2. Major Structural Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:10rem_10rem] [mask-image:radial-gradient(ellipse_90%_90%_at_50%_40%,#000_65%,transparent_100%)]" />

      {/* 3. Interior Architecture Vector Schematics */}
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        {/* ── A. CONCENTRIC CALIBRATION ARCS (center-right) ── */}
        <g stroke="white" opacity="0.18" strokeWidth="0.7">
          <circle cx="1200" cy="250" r="80" strokeDasharray="3 3" />
          <circle cx="1200" cy="250" r="170" strokeWidth="0.5" />
          <circle cx="1200" cy="250" r="280" strokeDasharray="4 6" />
          <circle cx="1200" cy="250" r="400" strokeWidth="0.35" />
          {/* Cardinal axes */}
          <line x1="1200" y1="0" x2="1200" y2="900" strokeDasharray="2 4" strokeWidth="0.5" />
          <line x1="700" y1="250" x2="1600" y2="250" strokeDasharray="2 4" strokeWidth="0.5" />
        </g>

        {/* ── B. DOWNLIGHT FIXTURE & 38° PHOTOMETRIC CONE ── */}
        <g stroke="white" opacity="0.25" strokeWidth="0.7">
          <circle cx="1200" cy="250" r="5" strokeWidth="1" />
          <circle cx="1200" cy="250" r="2" fill="white" fillOpacity="0.9" stroke="none" />
          <line x1="1200" y1="250" x2="1080" y2="430" strokeDasharray="2 3" strokeWidth="0.6" />
          <line x1="1200" y1="250" x2="1320" y2="430" strokeDasharray="2 3" strokeWidth="0.6" />
          <path d="M 1095 410 A 160 160 0 0 0 1305 410" strokeDasharray="3 3" strokeWidth="0.5" />
          <text x="1215" y="243" fontFamily="monospace" fontSize="8" fill="white" fillOpacity="0.65" letterSpacing="0.1em" stroke="none">
            ⊕ DL-01 · 38°
          </text>
        </g>

        {/* ── C. MINIMALIST INTERIOR LOUNGE PLAN (center-right) ── */}
        <g stroke="white" opacity="0.22" strokeWidth="0.8">
          {/* Room boundary */}
          <rect x="920" y="300" width="520" height="320" strokeDasharray="8 4" />
          <text x="940" y="325" fontFamily="monospace" fontSize="9" fill="white" fillOpacity="0.8" letterSpacing="0.14em" fontWeight="bold" stroke="none">
            SALON 01 · BESPOKE LIVING
          </text>

          {/* Curved sofa plan */}
          <rect x="970" y="370" width="260" height="80" rx="10" strokeWidth="1" />
          <line x1="1050" y1="370" x2="1050" y2="450" strokeWidth="0.5" />
          <line x1="1150" y1="370" x2="1150" y2="450" strokeWidth="0.5" />
          <path d="M 978 390 Q 1100 385 1222 390" strokeDasharray="2 2" strokeWidth="0.5" />
          <text x="1100" y="415" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="white" fillOpacity="0.55" letterSpacing="0.1em" stroke="none">
            CURVED MODULE · 2600
          </text>

          {/* Coffee table */}
          <rect x="1020" y="490" width="140" height="55" rx="3" strokeWidth="0.9" />
          <text x="1090" y="522" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="white" fillOpacity="0.5" letterSpacing="0.1em" stroke="none">
            TRAVERTINE
          </text>

          {/* Accent chairs */}
          <rect x="1290" y="375" width="70" height="70" rx="14" strokeWidth="0.9" />
          <circle cx="1325" cy="410" r="20" strokeDasharray="2 3" strokeWidth="0.5" />
          <rect x="1290" y="475" width="70" height="70" rx="14" strokeWidth="0.9" />
          <circle cx="1325" cy="510" r="20" strokeDasharray="2 3" strokeWidth="0.5" />

          {/* Floor hatching */}
          <line x1="920" y1="420" x2="1440" y2="420" strokeWidth="0.25" strokeDasharray="2 5" opacity="0.4" />
          <line x1="920" y1="500" x2="1440" y2="500" strokeWidth="0.25" strokeDasharray="2 5" opacity="0.4" />
          <line x1="920" y1="560" x2="1440" y2="560" strokeWidth="0.25" strokeDasharray="2 5" opacity="0.4" />
          <line x1="1060" y1="300" x2="1060" y2="620" strokeWidth="0.25" strokeDasharray="2 5" opacity="0.4" />
          <line x1="1260" y1="300" x2="1260" y2="620" strokeWidth="0.25" strokeDasharray="2 5" opacity="0.4" />

          {/* Sofa dimension line */}
          <line x1="970" y1="345" x2="1230" y2="345" strokeWidth="0.6" />
          <line x1="970" y1="339" x2="970" y2="351" strokeWidth="0.6" />
          <line x1="1230" y1="339" x2="1230" y2="351" strokeWidth="0.6" />
          <text x="1100" y="340" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="white" fillOpacity="0.7" stroke="none">
            2,600 mm
          </text>
        </g>

        {/* ── D. WALL JOINERY ELEVATION (bottom-right) ── */}
        <g stroke="white" opacity="0.2" strokeWidth="0.7">
          <rect x="920" y="660" width="520" height="170" />
          <text x="940" y="652" fontFamily="monospace" fontSize="8" fill="white" fillOpacity="0.7" letterSpacing="0.12em" stroke="none">
            ELEVATION E-01 · ACOUSTIC SLAT DETAIL
          </text>

          {/* Fluted timber slats */}
          {Array.from({ length: 20 }, (_, i) => 950 + i * 20).map((x, i) => (
            <line
              key={x}
              x1={x}
              y1="660"
              x2={x}
              y2={i > 12 ? 760 : 830}
              strokeWidth={i % 3 === 0 ? "0.7" : "0.35"}
              strokeDasharray={i % 5 === 0 ? "4 2" : "none"}
            />
          ))}

          {/* Floating credenza */}
          <rect x="1230" y="760" width="190" height="45" rx="2" strokeWidth="0.9" />
          <line x1="1325" y1="760" x2="1325" y2="805" strokeWidth="0.5" />
          <text x="1325" y="787" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="white" fillOpacity="0.6" letterSpacing="0.1em" stroke="none">
            C-01 FLOATING · 1900
          </text>

          {/* Shadow gap line */}
          <line x1="920" y1="675" x2="1440" y2="675" strokeDasharray="2 2" strokeWidth="0.4" />
        </g>

        {/* ── E. ELEVATION DATUMS (right margin) ── */}
        <g stroke="white" opacity="0.3" strokeWidth="0.7" fontFamily="monospace" fontSize="8" letterSpacing="0.08em" fill="white">
          <line x1="1470" y1="300" x2="1490" y2="300" />
          <line x1="1490" y1="300" x2="1498" y2="292" />
          <text x="1505" y="296" stroke="none">▽ +3.200 CEILING</text>

          <line x1="1470" y1="470" x2="1490" y2="470" />
          <line x1="1490" y1="470" x2="1498" y2="462" />
          <text x="1505" y="466" stroke="none">▽ +2.400 JOINERY</text>

          <line x1="1470" y1="660" x2="1490" y2="660" />
          <line x1="1490" y1="660" x2="1498" y2="652" />
          <text x="1505" y="656" stroke="none">▽ +0.900 COUNTER</text>

          <line x1="1470" y1="830" x2="1490" y2="830" />
          <line x1="1490" y1="830" x2="1498" y2="822" />
          <text x="1505" y="826" stroke="none">▽ +0.000 FFL</text>
        </g>

        {/* ── F. STRUCTURAL AXIS BUBBLES (top) ── */}
        <g stroke="white" opacity="0.25" strokeWidth="0.6" fontFamily="monospace" fontSize="9" textAnchor="middle" fill="white">
          {[160, 480, 800, 1120, 1440].map((cx, i) => (
            <g key={cx}>
              <circle cx={cx} cy="45" r="10" />
              <text x={cx} y="49" stroke="none">{String.fromCharCode(65 + i)}</text>
            </g>
          ))}
          {/* Span dimension */}
          <line x1="160" y1="70" x2="1440" y2="70" strokeDasharray="3 3" />
          <line x1="160" y1="63" x2="160" y2="77" />
          <line x1="1440" y1="63" x2="1440" y2="77" />
          <text x="800" y="65" stroke="none" fontSize="7.5" letterSpacing="0.16em">
            ENVELOPE: 24,000mm
          </text>
        </g>

        {/* ── G. REGISTRATION CROSSHAIRS ── */}
        {[
          [160, 220], [480, 160], [800, 280],
          [280, 640], [620, 780], [920, 830], [1440, 830],
        ].map(([x, y], i) => (
          <g key={i} stroke="white" strokeWidth="0.8" opacity="0.3">
            <line x1={x - 8} y1={y} x2={x + 8} y2={y} />
            <line x1={x} y1={y - 8} x2={x} y2={y + 8} />
            <circle cx={x} cy={y} r="1.5" fill="white" fillOpacity="0.7" stroke="none" />
          </g>
        ))}

        {/* ── H. ISOMETRIC PERSPECTIVE GUIDES (bottom-left) ── */}
        <g stroke="white" strokeWidth="0.45" strokeDasharray="2 5" opacity="0.12">
          <line x1="0" y1="600" x2="500" y2="250" />
          <line x1="0" y1="750" x2="650" y2="250" />
          <line x1="80" y1="900" x2="780" y2="250" />
        </g>

        {/* ── I. NORTH ARROW & TITLE BLOCK ── */}
        <g stroke="white" opacity="0.28" strokeWidth="0.6" fontFamily="monospace" fontSize="8" letterSpacing="0.14em" fill="white">
          {/* North arrow */}
          <circle cx="1180" cy="855" r="13" />
          <polygon points="1180,843 1176,860 1180,856 1184,860" fill="white" fillOpacity="0.5" stroke="none" />
          <text x="1180" y="839" textAnchor="middle" stroke="none" fontSize="7">N</text>

          {/* Title block */}
          <rect x="1210" y="838" width="250" height="40" />
          <text x="1225" y="853" stroke="none">XIYÀTO · INTERIOR ARCHITECTURE</text>
          <text x="1225" y="868" stroke="none">DWG IA-01 · SCALE 1:20 · QA</text>
        </g>
      </svg>
    </div>
  );
}

