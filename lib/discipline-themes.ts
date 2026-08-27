/**
 * XIYÀTO Bespoke Discipline Theme Tokens (M1 / R4)
 *
 * 5 distinct luxury editorial palettes for service showcase chapters:
 * 1. Technical Drafting Slate (CAD & Technical Production)
 * 2. Research Dossier (Growth, Marketing & B2B)
 * 3. Titanium Gallery (3D Visualisation & Image Production)
 * 4. Obsidian Black (Video, AI Film & Editing)
 * 5. Tech Clean (Website Design & Development / Automation Systems)
 */

export type DisciplineSlug =
  | "cad"
  | "growth"
  | "visualisation"
  | "video"
  | "website"
  | "automation";

export type ServiceSlug =
  | "cad-technical-production"
  | "growth-marketing-b2b"
  | "visualisation-image-production"
  | "video-ai-film-editing"
  | "website-design-development"
  | "automation-workflow-systems";

export interface DisciplineThemeClasses {
  sectionWrapper: string;
  cardSurface: string;
  cardBorder: string;
  accentText: string;
  accentBg: string;
  accentBorder: string;
  textPrimary: string;
  textMuted: string;
  badgeStyle: string;
  gridLines?: string;
  highlightGlow?: string;
  interactiveHover?: string;
}

export interface DisciplineThemeColors {
  background: string;
  surface: string;
  surfaceMuted: string;
  border: string;
  borderStrong: string;
  accent: string;
  accentHover: string;
  accentWash: string;
  textPrimary: string;
  textMuted: string;
  textFaint: string;
}

export interface DisciplineThemeTokens {
  slug: DisciplineSlug;
  serviceSlug: ServiceSlug;
  name: string;
  shortName: string;
  motif: string;
  paletteName: string;
  themeClass: string;
  patternClass: string;
  colors: DisciplineThemeColors;
  classes: DisciplineThemeClasses;
  metadata: {
    fontRegister: "mono" | "sans" | "serif";
    technicalCue: string;
    aestheticDescriptor: string;
  };
}

export const DISCIPLINE_THEMES: Record<DisciplineSlug, DisciplineThemeTokens> = {
  cad: {
    slug: "cad",
    serviceSlug: "cad-technical-production",
    name: "CAD & Technical Production",
    shortName: "CAD & Technical Production",
    motif: "Deliver",
    paletteName: "Technical Drafting Slate",
    themeClass: "theme-slate",
    patternClass: "pattern-draft-grid",
    colors: {
      background: "#0b1120",
      surface: "#131d31",
      surfaceMuted: "#1e293b",
      border: "rgba(148, 163, 184, 0.18)",
      borderStrong: "rgba(148, 163, 184, 0.35)",
      accent: "#38bdf8",
      accentHover: "#0ea5e9",
      accentWash: "rgba(56, 189, 248, 0.12)",
      textPrimary: "#f8fafc",
      textMuted: "#94a3b8",
      textFaint: "#64748b",
    },
    classes: {
      sectionWrapper: "bg-[#0b1120] text-slate-100 theme-slate relative overflow-hidden border-t border-slate-800/80",
      cardSurface: "bg-[#131d31]/90 backdrop-blur-xs",
      cardBorder: "border border-slate-700/60 hover:border-sky-500/50 transition-colors",
      accentText: "text-sky-400",
      accentBg: "bg-sky-400",
      accentBorder: "border-sky-500/40",
      textPrimary: "text-slate-100",
      textMuted: "text-slate-400",
      badgeStyle: "bg-sky-950/60 text-sky-300 border border-sky-800/60 font-mono text-[0.625rem] tracking-[0.14em] uppercase",
      gridLines: "pattern-draft-grid",
      highlightGlow: "shadow-[0_0_25px_rgba(56,189,248,0.15)]",
      interactiveHover: "hover:border-sky-400/60 hover:shadow-[0_4px_20px_rgba(56,189,248,0.12)] transition-all",
    },
    metadata: {
      fontRegister: "mono",
      technicalCue: "DWG / DXF / Layer Coordination",
      aestheticDescriptor: "Architectural blueprint precision with cyan drafting registration",
    },
  },

  growth: {
    slug: "growth",
    serviceSlug: "growth-marketing-b2b",
    name: "Growth, Marketing & B2B",
    shortName: "Growth & B2B",
    motif: "Grow",
    paletteName: "Research Dossier",
    themeClass: "theme-dossier",
    patternClass: "pattern-dossier-ledger",
    colors: {
      background: "#121316",
      surface: "#1c1d22",
      surfaceMuted: "#27272e",
      border: "rgba(244, 244, 245, 0.14)",
      borderStrong: "rgba(244, 244, 245, 0.28)",
      accent: "#f59e0b",
      accentHover: "#d97706",
      accentWash: "rgba(245, 158, 11, 0.12)",
      textPrimary: "#fafafa",
      textMuted: "#a1a1aa",
      textFaint: "#71717a",
    },
    classes: {
      sectionWrapper: "bg-[#121316] text-zinc-100 theme-dossier relative overflow-hidden border-t border-zinc-800/80",
      cardSurface: "bg-[#1c1d22]/95 backdrop-blur-xs",
      cardBorder: "border border-zinc-700/50 hover:border-amber-500/50 transition-colors",
      accentText: "text-amber-400",
      accentBg: "bg-amber-400",
      accentBorder: "border-amber-500/40",
      textPrimary: "text-zinc-100",
      textMuted: "text-zinc-400",
      badgeStyle: "bg-amber-950/50 text-amber-300 border border-amber-800/50 font-mono text-[0.625rem] tracking-[0.14em] uppercase",
      gridLines: "pattern-dossier-ledger",
      highlightGlow: "shadow-[0_0_25px_rgba(245,158,11,0.15)]",
      interactiveHover: "hover:border-amber-400/60 hover:shadow-[0_4px_20px_rgba(245,158,11,0.12)] transition-all",
    },
    metadata: {
      fontRegister: "sans",
      technicalCue: "Scored Targets / Multi-Sheet Intelligence",
      aestheticDescriptor: "Executive market dossier with structured tabular hierarchy",
    },
  },

  visualisation: {
    slug: "visualisation",
    serviceSlug: "visualisation-image-production",
    name: "3D Visualisation & Image Production",
    shortName: "3D Visualisation",
    motif: "Visualise",
    paletteName: "Titanium Gallery",
    themeClass: "theme-titanium",
    patternClass: "pattern-gallery-spotlight",
    colors: {
      background: "#09090b",
      surface: "#141417",
      surfaceMuted: "#202025",
      border: "rgba(228, 228, 231, 0.16)",
      borderStrong: "rgba(228, 228, 231, 0.32)",
      accent: "#e4e4e7",
      accentHover: "#ffffff",
      accentWash: "rgba(228, 228, 231, 0.1)",
      textPrimary: "#ffffff",
      textMuted: "#a1a1aa",
      textFaint: "#71717a",
    },
    classes: {
      sectionWrapper: "bg-[#09090b] text-zinc-100 theme-titanium relative overflow-hidden border-t border-zinc-800/80",
      cardSurface: "bg-[#141417]/90 backdrop-blur-xs",
      cardBorder: "border border-zinc-700/60 hover:border-zinc-400 transition-colors",
      accentText: "text-zinc-200",
      accentBg: "bg-zinc-200",
      accentBorder: "border-zinc-500/40",
      textPrimary: "text-white",
      textMuted: "text-zinc-400",
      badgeStyle: "bg-zinc-800/80 text-zinc-200 border border-zinc-700/60 font-mono text-[0.625rem] tracking-[0.14em] uppercase",
      gridLines: "pattern-gallery-spotlight",
      highlightGlow: "shadow-[0_0_30px_rgba(255,255,255,0.08)]",
      interactiveHover: "hover:border-zinc-300 hover:shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all",
    },
    metadata: {
      fontRegister: "serif",
      technicalCue: "Spatial Lighting / Material Fidelity",
      aestheticDescriptor: "Exhibition gallery with brushed titanium framing and neutral pedestals",
    },
  },

  video: {
    slug: "video",
    serviceSlug: "video-ai-film-editing",
    name: "Video, AI Film & Editing",
    shortName: "Video & Film",
    motif: "Film",
    paletteName: "Obsidian Black",
    themeClass: "theme-obsidian",
    patternClass: "pattern-cinema-glow",
    colors: {
      background: "#050505",
      surface: "#0d0d10",
      surfaceMuted: "#18181c",
      border: "rgba(255, 255, 255, 0.12)",
      borderStrong: "rgba(255, 255, 255, 0.25)",
      accent: "#f43f5e",
      accentHover: "#e11d48",
      accentWash: "rgba(244, 63, 94, 0.12)",
      textPrimary: "#ffffff",
      textMuted: "#a3a3a3",
      textFaint: "#737373",
    },
    classes: {
      sectionWrapper: "bg-[#050505] text-neutral-100 theme-obsidian relative overflow-hidden border-t border-neutral-900",
      cardSurface: "bg-[#0d0d10]/95 backdrop-blur-xs",
      cardBorder: "border border-neutral-800 hover:border-rose-500/60 transition-colors",
      accentText: "text-rose-400",
      accentBg: "bg-rose-500",
      accentBorder: "border-rose-500/40",
      textPrimary: "text-white",
      textMuted: "text-neutral-400",
      badgeStyle: "bg-rose-950/60 text-rose-300 border border-rose-900/60 font-mono text-[0.625rem] tracking-[0.14em] uppercase",
      gridLines: "pattern-cinema-glow",
      highlightGlow: "shadow-[0_0_30px_rgba(244,63,94,0.18)]",
      interactiveHover: "hover:border-rose-500/70 hover:shadow-[0_4px_24px_rgba(244,63,94,0.15)] transition-all",
    },
    metadata: {
      fontRegister: "mono",
      technicalCue: "9:16 / 4:5 / 16:9 Cuts · Anamorphic Pacing",
      aestheticDescriptor: "Cinema darkroom with neon crimson accents and anamorphic letterboxing",
    },
  },

  website: {
    slug: "website",
    serviceSlug: "website-design-development",
    name: "Website Design & Development",
    shortName: "Website & Tech",
    motif: "Build",
    paletteName: "Tech Clean",
    themeClass: "theme-tech",
    patternClass: "pattern-tech-mesh",
    colors: {
      background: "#080c14",
      surface: "#0f1523",
      surfaceMuted: "#1a2236",
      border: "rgba(52, 211, 153, 0.16)",
      borderStrong: "rgba(52, 211, 153, 0.32)",
      accent: "#10b981",
      accentHover: "#059669",
      accentWash: "rgba(16, 185, 129, 0.12)",
      textPrimary: "#f9fafb",
      textMuted: "#9ca3af",
      textFaint: "#6b7280",
    },
    classes: {
      sectionWrapper: "bg-[#080c14] text-slate-100 theme-tech relative overflow-hidden border-t border-slate-900",
      cardSurface: "bg-[#0f1523]/95 backdrop-blur-xs",
      cardBorder: "border border-slate-800 hover:border-emerald-500/50 transition-colors",
      accentText: "text-emerald-400",
      accentBg: "bg-emerald-400",
      accentBorder: "border-emerald-500/40",
      textPrimary: "text-slate-100",
      textMuted: "text-slate-400",
      badgeStyle: "bg-emerald-950/50 text-emerald-300 border border-emerald-800/50 font-mono text-[0.625rem] tracking-[0.14em] uppercase",
      gridLines: "pattern-tech-mesh",
      highlightGlow: "shadow-[0_0_25px_rgba(16,185,129,0.15)]",
      interactiveHover: "hover:border-emerald-400/60 hover:shadow-[0_4px_20px_rgba(16,185,129,0.12)] transition-all",
    },
    metadata: {
      fontRegister: "mono",
      technicalCue: "Next.js / Turbopack / Zero CLS Code Architecture",
      aestheticDescriptor: "Silicon-grade engineering clean with terminal emerald highlights",
    },
  },

  automation: {
    slug: "automation",
    serviceSlug: "automation-workflow-systems",
    name: "Automation & Marketing Systems",
    shortName: "Automation & Systems",
    motif: "Automate",
    paletteName: "Tech Clean",
    themeClass: "theme-tech",
    patternClass: "pattern-tech-mesh",
    colors: {
      background: "#080c14",
      surface: "#0f1523",
      surfaceMuted: "#1a2236",
      border: "rgba(52, 211, 153, 0.16)",
      borderStrong: "rgba(52, 211, 153, 0.32)",
      accent: "#10b981",
      accentHover: "#059669",
      accentWash: "rgba(16, 185, 129, 0.12)",
      textPrimary: "#f9fafb",
      textMuted: "#9ca3af",
      textFaint: "#6b7280",
    },
    classes: {
      sectionWrapper: "bg-[#080c14] text-slate-100 theme-tech relative overflow-hidden border-t border-slate-900",
      cardSurface: "bg-[#0f1523]/95 backdrop-blur-xs",
      cardBorder: "border border-slate-800 hover:border-emerald-500/50 transition-colors",
      accentText: "text-emerald-400",
      accentBg: "bg-emerald-400",
      accentBorder: "border-emerald-500/40",
      textPrimary: "text-slate-100",
      textMuted: "text-slate-400",
      badgeStyle: "bg-emerald-950/50 text-emerald-300 border border-emerald-800/50 font-mono text-[0.625rem] tracking-[0.14em] uppercase",
      gridLines: "pattern-tech-mesh",
      highlightGlow: "shadow-[0_0_25px_rgba(16,185,129,0.15)]",
      interactiveHover: "hover:border-emerald-400/60 hover:shadow-[0_4px_20px_rgba(16,185,129,0.12)] transition-all",
    },
    metadata: {
      fontRegister: "mono",
      technicalCue: "Webhook Routes / WhatsApp Ingestion / CRM Sync",
      aestheticDescriptor: "Silicon-grade engineering clean with terminal emerald highlights",
    },
  },
};

export const DISCIPLINE_THEMES_BY_SERVICE: Record<ServiceSlug, DisciplineThemeTokens> = {
  "cad-technical-production": DISCIPLINE_THEMES.cad,
  "growth-marketing-b2b": DISCIPLINE_THEMES.growth,
  "visualisation-image-production": DISCIPLINE_THEMES.visualisation,
  "video-ai-film-editing": DISCIPLINE_THEMES.video,
  "website-design-development": DISCIPLINE_THEMES.website,
  "automation-workflow-systems": DISCIPLINE_THEMES.automation,
};

/**
 * Normalizes any incoming slug (short, full, or alias) to a valid DisciplineSlug.
 */
export function normalizeDisciplineSlug(slug: string): DisciplineSlug {
  if (slug === "cad" || slug === "cad-technical-production") return "cad";
  if (slug === "growth" || slug === "growth-marketing-b2b") return "growth";
  if (slug === "visualisation" || slug === "visualisation-image-production" || slug === "3d-visualisation") return "visualisation";
  if (slug === "video" || slug === "video-ai-film-editing" || slug === "film") return "video";
  if (slug === "website" || slug === "website-design-development" || slug === "web") return "website";
  if (slug === "automation" || slug === "automation-workflow-systems") return "automation";
  return "cad";
}

/**
 * Retrieves the theme token object for any service slug, discipline slug, or string.
 */
export function getDisciplineTheme(slug: DisciplineSlug | ServiceSlug | string): DisciplineThemeTokens {
  const norm = normalizeDisciplineSlug(slug);
  return DISCIPLINE_THEMES[norm] ?? DISCIPLINE_THEMES.cad;
}

/**
 * Retrieves the theme token object by full ServiceSlug.
 */
export function getDisciplineThemeByServiceSlug(serviceSlug: ServiceSlug | string): DisciplineThemeTokens {
  return getDisciplineTheme(serviceSlug);
}

/**
 * Retrieves the CSS class map for a discipline or service slug.
 */
export function getThemeClasses(slug: DisciplineSlug | ServiceSlug | string): DisciplineThemeClasses {
  return getDisciplineTheme(slug).classes;
}
