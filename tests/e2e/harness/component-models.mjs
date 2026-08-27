/**
 * XIYÀTO Component Models & Opaque-Box State Machines
 * Models real contract interfaces, state transitions, event handlers, and rendering outputs.
 */

import { SERVICES } from "../../../lib/services.ts";
import { CAD_DRAWINGS, CAD_PROJECTS, WORKBOOKS } from "../../../lib/portfolio.ts";
import { globalHaptics, globalMotion } from "./dom-simulator.mjs";

/* =========================================================================
   1. Discipline Theme Tokens Model (R4 / Feature 1)
   ========================================================================= */
export const DISCIPLINE_THEMES = {
  cad: {
    slug: "cad",
    name: "CAD & Technical Production",
    motif: "Deliver",
    paletteName: "Technical Drafting Slate",
    classes: {
      sectionWrapper: "theme-slate bg-[#0c1017] text-slate-100",
      cardSurface: "bg-[#131924] border-slate-800/80",
      cardBorder: "border-slate-800/80 hover:border-cyan-500/50",
      accentText: "text-cyan-400",
      accentBg: "bg-cyan-950/40",
      accentBorder: "border-cyan-500/30",
      textPrimary: "text-slate-100",
      textMuted: "text-slate-400",
      badgeStyle: "bg-cyan-950/60 text-cyan-300 border border-cyan-500/30",
      gridLines: "border-slate-800/40",
    },
  },
  growth: {
    slug: "growth",
    name: "Growth, Marketing & B2B",
    motif: "Grow",
    paletteName: "Research Dossier",
    classes: {
      sectionWrapper: "theme-dossier bg-[#fafaf9] text-stone-900",
      cardSurface: "bg-white border-stone-200 shadow-xs",
      cardBorder: "border-stone-200 hover:border-amber-600/40",
      accentText: "text-amber-700",
      accentBg: "bg-amber-50",
      accentBorder: "border-amber-600/30",
      textPrimary: "text-stone-900",
      textMuted: "text-stone-600",
      badgeStyle: "bg-emerald-50 text-emerald-800 border border-emerald-600/20",
      gridLines: "border-stone-200",
    },
  },
  visualisation: {
    slug: "visualisation",
    name: "3D Visualisation & Image Production",
    motif: "Visualise",
    paletteName: "Titanium Gallery",
    classes: {
      sectionWrapper: "theme-titanium bg-[#ffffff] text-zinc-900",
      cardSurface: "bg-[#fafafa] border-zinc-200",
      cardBorder: "border-zinc-200 hover:border-zinc-400",
      accentText: "text-zinc-900",
      accentBg: "bg-zinc-100",
      accentBorder: "border-zinc-300",
      textPrimary: "text-zinc-900",
      textMuted: "text-zinc-500",
      badgeStyle: "bg-zinc-100 text-zinc-800 border border-zinc-300",
      gridLines: "border-zinc-100",
    },
  },
  video: {
    slug: "video",
    name: "Video, AI Film & Editing",
    motif: "Film",
    paletteName: "Obsidian Black",
    classes: {
      sectionWrapper: "theme-obsidian bg-[#050505] text-neutral-100",
      cardSurface: "bg-[#09090b] border-neutral-800",
      cardBorder: "border-neutral-800 hover:border-neutral-700",
      accentText: "text-rose-500",
      accentBg: "bg-rose-950/30",
      accentBorder: "border-rose-800/40",
      textPrimary: "text-neutral-100",
      textMuted: "text-neutral-400",
      badgeStyle: "bg-neutral-900 text-neutral-300 border border-neutral-700",
      gridLines: "border-neutral-800/40",
    },
  },
  website: {
    slug: "website",
    name: "Website Design & Development",
    motif: "Build",
    paletteName: "Tech Clean",
    classes: {
      sectionWrapper: "theme-tech bg-[#f8fafc] text-slate-900",
      cardSurface: "bg-white border-slate-200",
      cardBorder: "border-slate-200 hover:border-blue-500/40",
      accentText: "text-blue-600",
      accentBg: "bg-blue-50",
      accentBorder: "border-blue-200",
      textPrimary: "text-slate-900",
      textMuted: "text-slate-500",
      badgeStyle: "bg-blue-50 text-blue-700 border border-blue-200",
      gridLines: "border-slate-200/80",
    },
  },
  automation: {
    slug: "automation",
    name: "Automation & Marketing Systems",
    motif: "Automate",
    paletteName: "Tech Clean",
    classes: {
      sectionWrapper: "theme-tech bg-[#090d16] text-slate-100",
      cardSurface: "bg-[#0f172a] border-slate-800",
      cardBorder: "border-slate-800 hover:border-emerald-500/40",
      accentText: "text-emerald-400",
      accentBg: "bg-emerald-950/30",
      accentBorder: "border-emerald-800/30",
      textPrimary: "text-slate-100",
      textMuted: "text-slate-400",
      badgeStyle: "bg-emerald-950/50 text-emerald-300 border border-emerald-500/30",
      gridLines: "border-slate-800/60",
    },
  },
};

export function getDisciplineTheme(slug) {
  const theme = DISCIPLINE_THEMES[slug];
  if (!theme) {
    return DISCIPLINE_THEMES.cad; // Safe fallback
  }
  return theme;
}

/* =========================================================================
   2. Tactile Micro-Haptics Model (R5 / Feature 2)
   ========================================================================= */
export const HAPTIC_PATTERNS = {
  light: 10,
  medium: 25,
  heavy: 45,
  selection: 8,
  success: [10, 30, 20],
  warning: [30, 50, 30],
};

export function triggerHaptic(type = "light", haptics = globalHaptics, motion = globalMotion) {
  // If user prefers reduced motion, suppress haptics
  if (motion.get()) {
    return false;
  }
  const pattern = HAPTIC_PATTERNS[type] ?? type;
  try {
    return haptics.vibrate(pattern);
  } catch (_err) {
    return false; // Graceful non-throwing fallback
  }
}

/* =========================================================================
   3. Capabilities Carousel & Desktop Grid Model (R1 / Features 3 & 4)
   ========================================================================= */
export class CapabilitiesCarouselModel {
  constructor(services = SERVICES) {
    this.services = services || [];
    this.activeIndex = 0;
    this.scrollLeft = 0;
  }

  get totalSlides() {
    return this.services.length;
  }

  get counterText() {
    if (this.totalSlides === 0) return "00 / 00";
    const current = String(this.activeIndex + 1).padStart(2, "0");
    const total = String(this.totalSlides).padStart(2, "0");
    return `${current} / ${total}`;
  }

  get activeService() {
    return this.services[this.activeIndex] || null;
  }

  goTo(index) {
    if (this.totalSlides === 0) return;
    const clamped = Math.max(0, Math.min(index, this.totalSlides - 1));
    this.activeIndex = clamped;
    triggerHaptic("selection");
  }

  next() {
    if (this.activeIndex < this.totalSlides - 1) {
      this.goTo(this.activeIndex + 1);
    }
  }

  prev() {
    if (this.activeIndex > 0) {
      this.goTo(this.activeIndex - 1);
    }
  }

  handleScrollOffset(offsetPx, cardWidthPx = 300) {
    if (cardWidthPx <= 0) return;
    this.scrollLeft = Math.max(0, offsetPx);
    const computedIndex = Math.round(this.scrollLeft / cardWidthPx);
    const clamped = Math.max(0, Math.min(computedIndex, this.totalSlides - 1));
    if (clamped !== this.activeIndex) {
      this.activeIndex = clamped;
      triggerHaptic("selection");
    }
  }

  renderCards() {
    return this.services.map((s, idx) => ({
      index: idx,
      slug: s.slug,
      name: s.name,
      shortName: s.shortName,
      motif: s.motif,
      summary: s.summary,
      anchorHref: `#service-${s.slug}`,
      isActive: idx === this.activeIndex,
      orderNumber: String(s.order).padStart(2, "0"),
    }));
  }
}

/* =========================================================================
   4. Lead Intelligence Panel Model (R2 / Features 5 & 6)
   ========================================================================= */
export const SAMPLE_REGION_RECORDS = {
  india: [
    { rank: "01", company: "Raymond Luxury Cottons", region: "Mumbai", score: "A++", route: "Direct VP Sourcing WhatsApp", status: "Verified" },
    { rank: "02", company: "Arvind Mills Premium Division", region: "Ahmedabad", score: "A++", route: "Head of Procurement Direct Desk", status: "Verified" },
    { rank: "03", company: "Vardhman Textiles Luxury Line", region: "Bangalore", score: "A+", route: "Commercial Director Route", status: "Verified" },
    { rank: "04", company: "Bombay Rayon Fashions", region: "Mumbai", score: "A+", route: "Export Sourcing Lead Mapped", status: "Verified" },
    { rank: "05", company: "Alok Industries Speciality", region: "Pune", score: "A", route: "Factory GM Contact Route", status: "Verified" },
  ],
  "middle-east": [
    { rank: "01", company: "Al-Futtaim BYD & Luxury KSA", region: "Riyadh", score: "A++", route: "Director Fit-out Procurement", status: "Verified" },
    { rank: "02", company: "SAMACO Automotive (Porsche/Audi)", region: "Jeddah", score: "A++", route: "Retail Network Director Phone", status: "Verified" },
    { rank: "03", company: "Mohamed Yousuf Naghi Motors", region: "Riyadh", score: "A+", route: "Projects & Facilities Lead", status: "Verified" },
    { rank: "04", company: "Wallan Trading Genesis Division", region: "Riyadh", score: "A+", route: "Head of Showroom Development", status: "Verified" },
    { rank: "05", company: "Al Jazirah Vehicles Luxury", region: "Dammam", score: "A", route: "Branch Fit-out Manager", status: "Verified" },
  ],
  philippines: [
    { rank: "01", company: "Ayala Land Premier Development", region: "Makati", score: "VIP", route: "Direct VP Architecture Office", status: "Verified" },
    { rank: "02", company: "Megaworld Luxury Residential", region: "BGC Taguig", score: "VIP", route: "Head of Interior Design Review", status: "Verified" },
    { rank: "03", company: "Rockwell Land High-End Assets", region: "Makati", score: "VIP", route: "Executive Procurement Desk", status: "Verified" },
    { rank: "04", company: "SM Prime Commercial Fitout", region: "Pasay", score: "A+", route: "Project Director Direct Channel", status: "Verified" },
    { rank: "05", company: "Robinsons Land Prestige", region: "Ortigas", score: "A+", route: "Commercial Sourcing Lead", status: "Verified" },
  ],
  china: [
    { rank: "01", company: "Lecong International Furniture Expo Mall", region: "Foshan", score: "Tier 1", route: "Wholesale Management Office", status: "Verified" },
    { rank: "02", company: "Louvre Furnishing Group International", region: "Foshan", score: "Tier 1", route: "International Buyer Channel", status: "Verified" },
    { rank: "03", company: "Shunde Furniture Wholesale Market Hub", region: "Guangdong", score: "Tier 1", route: "Export Trading Representative", status: "Verified" },
    { rank: "04", company: "Dongguan Houjie International Furniture", region: "Dongguan", score: "Tier 2", route: "Factory Federation Office", status: "Verified" },
    { rank: "05", company: "Shenzhen Yitian Holiday Luxury Interiors", region: "Shenzhen", score: "Tier 2", route: "Procurement Committee", status: "Verified" },
  ],
};

export class LeadIntelligencePanelModel {
  constructor(workbooks = WORKBOOKS, defaultRegion = "india") {
    this.workbooks = workbooks || [];
    this.activeRegion = defaultRegion;
    this.isDrawerOpen = false;
    this.searchQuery = "";
    this.activeSheetIndex = 0;
    this.currentPage = 0;
    this.pageSize = 20;
  }

  setRegion(region) {
    const validRegions = ["india", "middle-east", "philippines", "china", "all"];
    if (validRegions.includes(region)) {
      this.activeRegion = region;
      this.activeSheetIndex = 0;
      this.currentPage = 0;
      triggerHaptic("selection");
    }
  }

  get activeWorkbook() {
    const map = {
      india: "cleaned-premium-fabric-import-buyer-shortlist",
      "middle-east": "automotive-showroom-lead-intelligence",
      philippines: "philippines-vip-approachable-lead-intelligence",
      china: "china-interior-markets-100plus",
    };
    const slug = map[this.activeRegion];
    return this.workbooks.find((w) => w.slug === slug) || this.workbooks[0] || null;
  }

  get dynamicMetrics() {
    const metricsMap = {
      india: { records: "200+", verifiedRoute: "100%", fieldsCaptured: "14 Fields", strategicTargets: "30 Core" },
      "middle-east": { records: "114 Hubs", verifiedRoute: "100%", fieldsCaptured: "22 Fields", strategicTargets: "55 KSA/UAE" },
      philippines: { records: "100 VIPs", verifiedRoute: "100%", fieldsCaptured: "16 Fields", strategicTargets: "28 C-Level" },
      china: { records: "100+ Mkts", verifiedRoute: "98%", fieldsCaptured: "18 Fields", strategicTargets: "Foshan/Shunde" },
      all: { records: "500+ Leads", verifiedRoute: "99.4%", fieldsCaptured: "70+ Fields", strategicTargets: "4 Global Hubs" },
    };
    return metricsMap[this.activeRegion] || metricsMap.india;
  }

  get previewRows() {
    const rows = SAMPLE_REGION_RECORDS[this.activeRegion];
    if (rows) return rows;
    return Object.values(SAMPLE_REGION_RECORDS).flat().slice(0, 5);
  }

  openDrawer() {
    this.isDrawerOpen = true;
    triggerHaptic("medium");
  }

  closeDrawer() {
    this.isDrawerOpen = false;
    triggerHaptic("light");
  }

  setSearchQuery(q) {
    this.searchQuery = q || "";
    this.currentPage = 0;
  }

  setSheet(sheetIdx) {
    const wb = this.activeWorkbook;
    const maxSheets = wb ? wb.sheetNames.length : 1;
    this.activeSheetIndex = Math.max(0, Math.min(sheetIdx, maxSheets - 1));
    this.currentPage = 0;
    triggerHaptic("selection");
  }

  get filteredDrawerRows() {
    let rows = this.previewRows;
    if (!this.searchQuery) return rows;
    const q = this.searchQuery.toLowerCase();
    return rows.filter((r) =>
      Object.values(r).some((val) => String(val).toLowerCase().includes(q))
    );
  }

  get totalDrawerPages() {
    return Math.max(1, Math.ceil(this.filteredDrawerRows.length / this.pageSize));
  }

  get paginatedRows() {
    const start = this.currentPage * this.pageSize;
    return this.filteredDrawerRows.slice(start, start + this.pageSize);
  }

  nextPage() {
    if (this.currentPage < this.totalDrawerPages - 1) {
      this.currentPage++;
      triggerHaptic("selection");
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      triggerHaptic("selection");
    }
  }
}

/* =========================================================================
   5. CAD Drafting Rail & Featured Stage Model (R3 / Features 7 & 8)
   ========================================================================= */
export class CadDraftingRailStageModel {
  constructor(drawings = CAD_DRAWINGS, projects = CAD_PROJECTS) {
    this.drawings = (drawings || []).filter((d) => d.role === "output");
    this.allDrawings = drawings || [];
    this.projects = projects || [];
    this.selectedIndex = 0;
    this.activeCategory = "All";
    this.stageZoom = 1.0;
    this.panOffset = { x: 0, y: 0 };
    this.isInspectionModalOpen = false;
  }

  get categories() {
    const unique = Array.from(new Set(this.drawings.map((d) => d.category)));
    return ["All", ...unique];
  }

  setCategoryFilter(cat) {
    this.activeCategory = cat;
    const filtered = this.filteredDrawings;
    if (filtered.length > 0) {
      this.selectedIndex = 0;
    }
    triggerHaptic("selection");
  }

  get filteredDrawings() {
    if (this.activeCategory === "All") return this.drawings;
    return this.drawings.filter((d) => d.category === this.activeCategory);
  }

  get activeDrawing() {
    const list = this.filteredDrawings;
    return list[this.selectedIndex] || this.drawings[0] || null;
  }

  selectDrawing(idx) {
    const max = this.filteredDrawings.length;
    if (max === 0) return;
    this.selectedIndex = Math.max(0, Math.min(idx, max - 1));
    this.stageZoom = 1.0;
    this.panOffset = { x: 0, y: 0 };
    triggerHaptic("selection");
  }

  setStageZoom(scale) {
    const clamped = Math.max(1.0, Math.min(scale, 2.5));
    this.stageZoom = clamped;
    if (clamped === 1.0) {
      this.panOffset = { x: 0, y: 0 };
    }
    triggerHaptic("light");
  }

  openInspectionModal() {
    this.isInspectionModalOpen = true;
    triggerHaptic("medium");
  }

  closeInspectionModal() {
    this.isInspectionModalOpen = false;
    triggerHaptic("light");
  }
}

/* =========================================================================
   6. CAD Inspection Modal Model (R3 / Feature 9)
   ========================================================================= */
export class CadInspectionModalModel {
  constructor(drawings = CAD_DRAWINGS, initialIndex = 0, isOpen = false) {
    this.drawings = drawings || [];
    this.currentIndex = initialIndex;
    this.isOpen = isOpen;
    this.zoomScale = 1.0;
    this.panPosition = { x: 0, y: 0 };
    this.isDragging = false;
  }

  get activeDrawing() {
    return this.drawings[this.currentIndex] || this.drawings[0] || null;
  }

  open(index = 0) {
    this.isOpen = true;
    this.currentIndex = Math.max(0, Math.min(index, this.drawings.length - 1));
    this.resetTransform();
    triggerHaptic("medium");
  }

  close() {
    this.isOpen = false;
    this.resetTransform();
    triggerHaptic("light");
  }

  resetTransform() {
    this.zoomScale = 1.0;
    this.panPosition = { x: 0, y: 0 };
  }

  zoomIn() {
    this.zoomScale = Math.min(this.zoomScale + 0.5, 4.0);
    triggerHaptic("light");
  }

  zoomOut() {
    this.zoomScale = Math.max(this.zoomScale - 0.5, 1.0);
    if (this.zoomScale === 1.0) {
      this.panPosition = { x: 0, y: 0 };
    }
    triggerHaptic("light");
  }

  next() {
    this.resetTransform();
    this.currentIndex = (this.currentIndex + 1) % this.drawings.length;
    triggerHaptic("selection");
  }

  prev() {
    this.resetTransform();
    this.currentIndex = (this.currentIndex - 1 + this.drawings.length) % this.drawings.length;
    triggerHaptic("selection");
  }

  panBy(dx, dy) {
    if (this.zoomScale > 1.0) {
      this.panPosition.x += dx;
      this.panPosition.y += dy;
    }
  }

  handleKeyDown(key) {
    if (!this.isOpen) return;
    switch (key) {
      case "Escape":
        this.close();
        break;
      case "+":
      case "=":
        this.zoomIn();
        break;
      case "-":
        this.zoomOut();
        break;
      case "0":
        this.resetTransform();
        break;
      case "ArrowRight":
        this.next();
        break;
      case "ArrowLeft":
        this.prev();
        break;
    }
  }
}

/* =========================================================================
   7. Homepage Assembly & Atmosphere Model (R4/R5 / Feature 10)
   ========================================================================= */
export class HomepageAssemblyModel {
  constructor() {
    this.sections = [
      { id: "hero", name: "Hero Capabilities", theme: "titanium", role: "banner" },
      { id: "capabilities", name: "Capabilities Showcase", theme: "titanium", role: "region" },
      { id: "service-cad-technical-production", name: "CAD & Technical Production", theme: "cad", role: "region" },
      { id: "service-growth-marketing-b2b", name: "Growth, Marketing & B2B", theme: "growth", role: "region" },
      { id: "service-visualisation-image-production", name: "3D Visualisation", theme: "visualisation", role: "region" },
      { id: "service-video-ai-film-editing", name: "Video, AI Film & Editing", theme: "video", role: "region" },
      { id: "service-website-design-development", name: "Website Design", theme: "website", role: "region" },
      { id: "service-automation-workflow-systems", name: "Automation & Marketing Systems", theme: "automation", role: "region" },
      { id: "locations", name: "Locations Panel", theme: "titanium", role: "region" },
      { id: "project-cta", name: "Project CTA", theme: "titanium", role: "contentinfo" },
    ];
  }

  getSection(id) {
    return this.sections.find((s) => s.id === id) || null;
  }

  verifyThemeMapping() {
    const verified = {};
    for (const sec of this.sections) {
      if (sec.theme && DISCIPLINE_THEMES[sec.theme]) {
        verified[sec.id] = DISCIPLINE_THEMES[sec.theme];
      }
    }
    return verified;
  }

  verifyAspectRatios() {
    // Aspect ratios for CLS < 0.05 compliance
    return {
      cadStage: "aspect-[16/10]",
      visualisationGallery: "aspect-[4/3]",
      videoReel: "aspect-video",
      videoPortrait: "aspect-[9/16]",
    };
  }
}
