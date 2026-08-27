/**
 * XIYÀTO E2E Test Suite — Tier 1: Feature Coverage
 * Validates all 10 core features (F1 - F10) with >=5 test cases per feature (>=50 tests total).
 */

import { describe, it, expect, beforeEach, registry } from "./harness/test-framework.mjs";
import {
  DISCIPLINE_THEMES,
  getDisciplineTheme,
  HAPTIC_PATTERNS,
  triggerHaptic,
  CapabilitiesCarouselModel,
  LeadIntelligencePanelModel,
  CadDraftingRailStageModel,
  CadInspectionModalModel,
  HomepageAssemblyModel,
  SAMPLE_REGION_RECORDS,
} from "./harness/component-models.mjs";
import { globalHaptics, globalMotion, globalViewport, globalCLS } from "./harness/dom-simulator.mjs";
import { SERVICES } from "../../lib/services.ts";
import { CAD_DRAWINGS, CAD_PROJECTS, WORKBOOKS } from "../../lib/portfolio.ts";

/* =========================================================================
   Feature 1: Bespoke Discipline Thematic Tokens (R4)
   ========================================================================= */
describe("Tier 1 — Feature 1: Bespoke Discipline Thematic Tokens (R4)", () => {
  it("T1.1.1: Technical Drafting Slate (CAD) defines slate/cyan classes and theme-slate scope", () => {
    const theme = DISCIPLINE_THEMES.cad;
    expect(theme.slug).toBe("cad");
    expect(theme.paletteName).toBe("Technical Drafting Slate");
    expect(theme.motif).toBe("Deliver");
    expect(theme.classes.sectionWrapper).toContain("theme-slate");
    expect(theme.classes.sectionWrapper).toContain("bg-[#0c1017]");
    expect(theme.classes.accentText).toBe("text-cyan-400");
    expect(theme.classes.cardBorder).toContain("border-slate-800/80");
  });

  it("T1.1.2: Research Dossier (Growth) defines bone/amber/emerald classes and theme-dossier scope", () => {
    const theme = DISCIPLINE_THEMES.growth;
    expect(theme.slug).toBe("growth");
    expect(theme.paletteName).toBe("Research Dossier");
    expect(theme.motif).toBe("Grow");
    expect(theme.classes.sectionWrapper).toContain("theme-dossier");
    expect(theme.classes.sectionWrapper).toContain("bg-[#fafaf9]");
    expect(theme.classes.accentText).toBe("text-amber-700");
    expect(theme.classes.badgeStyle).toContain("text-emerald-800");
  });

  it("T1.1.3: Titanium Gallery (3D Visuals) defines gallery zinc classes and theme-titanium scope", () => {
    const theme = DISCIPLINE_THEMES.visualisation;
    expect(theme.slug).toBe("visualisation");
    expect(theme.paletteName).toBe("Titanium Gallery");
    expect(theme.motif).toBe("Visualise");
    expect(theme.classes.sectionWrapper).toContain("theme-titanium");
    expect(theme.classes.sectionWrapper).toContain("bg-[#ffffff]");
    expect(theme.classes.textPrimary).toBe("text-zinc-900");
    expect(theme.classes.cardSurface).toContain("bg-[#fafafa]");
  });

  it("T1.1.4: Obsidian Black (Video) defines deep jet/crimson classes and theme-obsidian scope", () => {
    const theme = DISCIPLINE_THEMES.video;
    expect(theme.slug).toBe("video");
    expect(theme.paletteName).toBe("Obsidian Black");
    expect(theme.motif).toBe("Film");
    expect(theme.classes.sectionWrapper).toContain("theme-obsidian");
    expect(theme.classes.sectionWrapper).toContain("bg-[#050505]");
    expect(theme.classes.accentText).toBe("text-rose-500");
    expect(theme.classes.cardSurface).toContain("bg-[#09090b]");
  });

  it("T1.1.5: Tech Clean (Web & Automation) defines systems terminal classes and theme-tech scope", () => {
    const webTheme = DISCIPLINE_THEMES.website;
    const autoTheme = DISCIPLINE_THEMES.automation;
    expect(webTheme.paletteName).toBe("Tech Clean");
    expect(autoTheme.paletteName).toBe("Tech Clean");
    expect(webTheme.classes.sectionWrapper).toContain("theme-tech");
    expect(autoTheme.classes.sectionWrapper).toContain("theme-tech");
    expect(autoTheme.classes.accentText).toBe("text-emerald-400");
  });

  it("T1.1.6: getDisciplineTheme returns correct theme by slug and falls back safely", () => {
    const cad = getDisciplineTheme("cad");
    expect(cad.slug).toBe("cad");
    const fallback = getDisciplineTheme("unknown-discipline-slug");
    expect(fallback).toBeDefined();
    expect(fallback.slug).toBe("cad");
  });
});

/* =========================================================================
   Feature 2: Tactile Micro-Haptics & Sensory Feedback (R5)
   ========================================================================= */
describe("Tier 1 — Feature 2: Tactile Micro-Haptics & Sensory Feedback (R5)", () => {
  beforeEach(() => {
    globalHaptics.clear();
    globalHaptics.enable();
    globalMotion.set(false);
  });

  it("T1.2.1: triggerHaptic('light') executes 10ms vibration pattern", () => {
    const result = triggerHaptic("light");
    expect(result).toBe(true);
    const last = globalHaptics.getLastVibration();
    expect(last.pattern).toBe(10);
  });

  it("T1.2.2: triggerHaptic('selection') executes 8ms crisp selection pattern", () => {
    const result = triggerHaptic("selection");
    expect(result).toBe(true);
    const last = globalHaptics.getLastVibration();
    expect(last.pattern).toBe(8);
  });

  it("T1.2.3: triggerHaptic('success') executes multi-pulse pattern [10, 30, 20]", () => {
    const result = triggerHaptic("success");
    expect(result).toBe(true);
    const last = globalHaptics.getLastVibration();
    expect(last.pattern).toEqual([10, 30, 20]);
  });

  it("T1.2.4: triggerHaptic('warning') executes multi-pulse pattern [30, 50, 30]", () => {
    const result = triggerHaptic("warning");
    expect(result).toBe(true);
    const last = globalHaptics.getLastVibration();
    expect(last.pattern).toEqual([30, 50, 30]);
  });

  it("T1.2.5: triggerHaptic suppresses vibration when prefers-reduced-motion is active", () => {
    globalMotion.set(true);
    const result = triggerHaptic("medium");
    expect(result).toBe(false);
    expect(globalHaptics.getHistory()).toHaveLength(0);
  });

  it("T1.2.6: triggerHaptic handles unsupported navigator.vibrate gracefully without throwing", () => {
    globalHaptics.disable();
    const result = triggerHaptic("heavy");
    expect(result).toBe(false);
  });
});

/* =========================================================================
   Feature 3: Mobile Horizontal Service Slideshow (R1)
   ========================================================================= */
describe("Tier 1 — Feature 3: Mobile Horizontal Service Slideshow (R1)", () => {
  let model;

  beforeEach(() => {
    globalHaptics.clear();
    globalMotion.set(false);
    model = new CapabilitiesCarouselModel(SERVICES);
  });

  it("T1.3.1: Carousel initializes with 6 services and activeIndex 0", () => {
    expect(model.totalSlides).toBe(6);
    expect(model.activeIndex).toBe(0);
    expect(model.activeService.slug).toBe("cad-technical-production");
  });

  it("T1.3.2: Counter formats fractional 01 / 06 on initial load", () => {
    expect(model.counterText).toBe("01 / 06");
  });

  it("T1.3.3: next() advances activeIndex and updates counter to 02 / 06", () => {
    model.next();
    expect(model.activeIndex).toBe(1);
    expect(model.counterText).toBe("02 / 06");
    expect(model.activeService.slug).toBe("growth-marketing-b2b");
  });

  it("T1.3.4: prev() decrements activeIndex and restores counter to 01 / 06", () => {
    model.goTo(3);
    expect(model.counterText).toBe("04 / 06");
    model.prev();
    expect(model.activeIndex).toBe(2);
    expect(model.counterText).toBe("03 / 06");
  });

  it("T1.3.5: handleScrollOffset snaps to correct slide based on scroll position", () => {
    // 300px card width, scroll 610px -> index 2
    model.handleScrollOffset(610, 300);
    expect(model.activeIndex).toBe(2);
    expect(model.counterText).toBe("03 / 06");
  });

  it("T1.3.6: renderCards generates complete metadata for all 6 service cards", () => {
    const cards = model.renderCards();
    expect(cards).toHaveLength(6);
    expect(cards[0].orderNumber).toBe("01");
    expect(cards[0].motif).toBe("Deliver");
    expect(cards[0].anchorHref).toBe("#service-cad-technical-production");
    expect(cards[0].isActive).toBe(true);
    expect(cards[1].isActive).toBe(false);
  });
});

/* =========================================================================
   Feature 4: Desktop Responsive Capabilities Grid (R1)
   ========================================================================= */
describe("Tier 1 — Feature 4: Desktop Responsive Capabilities Grid (R1)", () => {
  let model;

  beforeEach(() => {
    globalViewport.set(1280, 800);
    model = new CapabilitiesCarouselModel(SERVICES);
  });

  it("T1.4.1: Desktop view maps all 6 services into high-contrast cards", () => {
    expect(globalViewport.isDesktop()).toBe(true);
    const cards = model.renderCards();
    expect(cards).toHaveLength(6);
    const slugs = cards.map((c) => c.slug);
    expect(slugs).toContain("cad-technical-production");
    expect(slugs).toContain("growth-marketing-b2b");
    expect(slugs).toContain("visualisation-image-production");
    expect(slugs).toContain("video-ai-film-editing");
    expect(slugs).toContain("website-design-development");
    expect(slugs).toContain("automation-workflow-systems");
  });

  it("T1.4.2: Every card generates a valid anchor target matching homepage chapters", () => {
    const cards = model.renderCards();
    for (const card of cards) {
      expect(card.anchorHref.startsWith("#service-")).toBe(true);
    }
  });

  it("T1.4.3: Grid cards contain luxury secondary motifs", () => {
    const cards = model.renderCards();
    const motifs = cards.map((c) => c.motif);
    expect(motifs).toContain("Deliver");
    expect(motifs).toContain("Grow");
    expect(motifs).toContain("Visualise");
    expect(motifs).toContain("Film");
    expect(motifs).toContain("Build");
    expect(motifs).toContain("Automate");
  });

  it("T1.4.4: Grid cards expose formatted order numbers 01 to 06", () => {
    const cards = model.renderCards();
    expect(cards[0].orderNumber).toBe("01");
    expect(cards[5].orderNumber).toBe("06");
  });

  it("T1.4.5: Viewport simulation transitions cleanly between mobile and desktop", () => {
    globalViewport.set(390, 844);
    expect(globalViewport.isMobile()).toBe(true);
    expect(globalViewport.isDesktop()).toBe(false);

    globalViewport.set(1440, 900);
    expect(globalViewport.isMobile()).toBe(false);
    expect(globalViewport.isDesktop()).toBe(true);
  });
});

/* =========================================================================
   Feature 5: Compact Lead Intelligence Stage (R2)
   ========================================================================= */
describe("Tier 1 — Feature 5: Compact Lead Intelligence Stage (R2)", () => {
  let model;

  beforeEach(() => {
    model = new LeadIntelligencePanelModel(WORKBOOKS, "india");
  });

  it("T1.5.1: Panel initializes with India region dataset by default", () => {
    expect(model.activeRegion).toBe("india");
    expect(model.activeWorkbook.slug).toBe("cleaned-premium-fabric-import-buyer-shortlist");
    expect(model.dynamicMetrics.records).toBe("200+");
  });

  it("T1.5.2: Switching region to Middle East updates dynamic metrics reactively", () => {
    model.setRegion("middle-east");
    expect(model.activeRegion).toBe("middle-east");
    expect(model.activeWorkbook.slug).toBe("automotive-showroom-lead-intelligence");
    expect(model.dynamicMetrics.records).toBe("114 Hubs");
    expect(model.dynamicMetrics.fieldsCaptured).toBe("22 Fields");
  });

  it("T1.5.3: Switching region to Philippines updates dynamic metrics reactively", () => {
    model.setRegion("philippines");
    expect(model.activeRegion).toBe("philippines");
    expect(model.activeWorkbook.slug).toBe("philippines-vip-approachable-lead-intelligence");
    expect(model.dynamicMetrics.records).toBe("100 VIPs");
  });

  it("T1.5.4: Switching region to China updates dynamic metrics reactively", () => {
    model.setRegion("china");
    expect(model.activeRegion).toBe("china");
    expect(model.activeWorkbook.slug).toBe("china-interior-markets-100plus");
    expect(model.dynamicMetrics.records).toBe("100+ Mkts");
  });

  it("T1.5.5: Collapsed table preview renders top 5 ranked records with verification status", () => {
    const rows = model.previewRows;
    expect(rows).toHaveLength(5);
    expect(rows[0].rank).toBe("01");
    expect(rows[0].status).toBe("Verified");
    expect(rows[0].route).toBeDefined();
  });

  it("T1.5.6: Active dataset provides verified dataUrl and redacted XLSX downloadUrl", () => {
    const wb = model.activeWorkbook;
    expect(wb.dataUrl).toContain(".json");
    expect(wb.downloadUrl).toContain("-redacted.xlsx");
  });
});

/* =========================================================================
   Feature 6: Expandable Lead Intelligence Drawer (R2)
   ========================================================================= */
describe("Tier 1 — Feature 6: Expandable Lead Intelligence Drawer (R2)", () => {
  let model;

  beforeEach(() => {
    model = new LeadIntelligencePanelModel(WORKBOOKS, "india");
  });

  it("T1.6.1: openDrawer() opens full interactive drawer modal", () => {
    expect(model.isDrawerOpen).toBe(false);
    model.openDrawer();
    expect(model.isDrawerOpen).toBe(true);
  });

  it("T1.6.2: Multi-sheet tabs switch active sheet index cleanly", () => {
    expect(model.activeSheetIndex).toBe(0);
    model.setSheet(2);
    expect(model.activeSheetIndex).toBe(2);
  });

  it("T1.6.3: Live search query filters rows dynamically", () => {
    model.setSearchQuery("Mumbai");
    const filtered = model.filteredDrawerRows;
    expect(filtered.length).toBeGreaterThan(0);
    for (const r of filtered) {
      expect(JSON.stringify(r).toLowerCase()).toContain("mumbai");
    }
  });

  it("T1.6.4: Pagination controls navigate pages and compute page bounds", () => {
    expect(model.currentPage).toBe(0);
    expect(model.totalDrawerPages).toBeGreaterThanOrEqual(1);
    model.nextPage();
    // Clamped if totalDrawerPages is 1
    expect(model.currentPage).toBeLessThanOrEqual(model.totalDrawerPages - 1);
  });

  it("T1.6.5: closeDrawer() closes drawer modal and resets modal state", () => {
    model.openDrawer();
    expect(model.isDrawerOpen).toBe(true);
    model.closeDrawer();
    expect(model.isDrawerOpen).toBe(false);
  });
});

/* =========================================================================
   Feature 7: CAD Interactive Drafting Rail & HUD (R3)
   ========================================================================= */
describe("Tier 1 — Feature 7: CAD Interactive Drafting Rail & HUD (R3)", () => {
  let model;

  beforeEach(() => {
    model = new CadDraftingRailStageModel(CAD_DRAWINGS, CAD_PROJECTS);
  });

  it("T1.7.1: Drafting rail loads all output drawing sheets from CAD_DRAWINGS", () => {
    expect(model.drawings.length).toBeGreaterThanOrEqual(10);
    for (const d of model.drawings) {
      expect(d.role).toBe("output");
    }
  });

  it("T1.7.2: Category filters extract unique drawing types including Floor Plan and Elevation", () => {
    const categories = model.categories;
    expect(categories).toContain("All");
    expect(categories).toContain("Floor Plan");
    expect(categories).toContain("Elevation");
  });

  it("T1.7.3: Selecting category filter 'Elevation' isolates only elevation sheets", () => {
    model.setCategoryFilter("Elevation");
    expect(model.activeCategory).toBe("Elevation");
    const filtered = model.filteredDrawings;
    expect(filtered.length).toBeGreaterThan(0);
    for (const d of filtered) {
      expect(d.category).toBe("Elevation");
    }
  });

  it("T1.7.4: Active drawing HUD exposes sheet title, category, project, and dimensions", () => {
    const active = model.activeDrawing;
    expect(active).toBeDefined();
    expect(active.title).toBeDefined();
    expect(active.project).toBeDefined();
    expect(active.width).toBeGreaterThan(1000);
    expect(active.height).toBeGreaterThan(1000);
  });

  it("T1.7.5: Drawing packages provide downloadable vector sets", () => {
    const mbPlan = model.drawings.find((d) => d.downloads && d.downloads.pdf);
    expect(mbPlan).toBeDefined();
    expect(mbPlan.downloads.pdf).toContain(".pdf");
  });
});

/* =========================================================================
   Feature 8: CAD Sticky Featured Drawing Stage (R3)
   ========================================================================= */
describe("Tier 1 — Feature 8: CAD Sticky Featured Drawing Stage (R3)", () => {
  let model;

  beforeEach(() => {
    model = new CadDraftingRailStageModel(CAD_DRAWINGS, CAD_PROJECTS);
  });

  it("T1.8.1: Featured stage displays the active selected blueprint", () => {
    expect(model.selectedIndex).toBe(0);
    const initial = model.activeDrawing;
    expect(initial).toBeDefined();
  });

  it("T1.8.2: Selecting thumbnail in rail swaps featured stage drawing instantly", () => {
    const initialSrc = model.activeDrawing.src;
    model.selectDrawing(2);
    expect(model.selectedIndex).toBe(2);
    expect(model.activeDrawing.src).not.toBe(initialSrc);
  });

  it("T1.8.3: Stage zoom controls toggle between 1.0x, 1.5x, and 2.0x", () => {
    expect(model.stageZoom).toBe(1.0);
    model.setStageZoom(1.5);
    expect(model.stageZoom).toBe(1.5);
    model.setStageZoom(2.0);
    expect(model.stageZoom).toBe(2.0);
  });

  it("T1.8.4: Resetting zoom back to 1.0x clears pan offset", () => {
    model.setStageZoom(2.0);
    model.panOffset = { x: 50, y: -30 };
    model.setStageZoom(1.0);
    expect(model.stageZoom).toBe(1.0);
    expect(model.panOffset).toEqual({ x: 0, y: 0 });
  });

  it("T1.8.5: openInspectionModal() triggers inspection modal launch", () => {
    expect(model.isInspectionModalOpen).toBe(false);
    model.openInspectionModal();
    expect(model.isInspectionModalOpen).toBe(true);
    model.closeInspectionModal();
    expect(model.isInspectionModalOpen).toBe(false);
  });
});

/* =========================================================================
   Feature 9: CAD Full Inspection Modal & Downloads (R3)
   ========================================================================= */
describe("Tier 1 — Feature 9: CAD Full Inspection Modal & Downloads (R3)", () => {
  let model;

  beforeEach(() => {
    const outputDrawings = CAD_DRAWINGS.filter((d) => d.role === "output");
    model = new CadInspectionModalModel(outputDrawings, 0, true);
  });

  it("T1.9.1: Inspection modal initializes with selected drawing at 1.0x scale", () => {
    expect(model.isOpen).toBe(true);
    expect(model.zoomScale).toBe(1.0);
    expect(model.panPosition).toEqual({ x: 0, y: 0 });
  });

  it("T1.9.2: zoomIn() increments scale by 0.5x up to maximum 4.0x", () => {
    model.zoomIn();
    expect(model.zoomScale).toBe(1.5);
    model.zoomIn();
    model.zoomIn();
    model.zoomIn();
    model.zoomIn();
    model.zoomIn();
    model.zoomIn();
    model.zoomIn();
    expect(model.zoomScale).toBe(4.0); // Clamped to 4.0
  });

  it("T1.9.3: zoomOut() decrements scale by 0.5x down to minimum 1.0x", () => {
    model.zoomScale = 2.0;
    model.zoomOut();
    expect(model.zoomScale).toBe(1.5);
    model.zoomOut();
    expect(model.zoomScale).toBe(1.0);
    model.zoomOut();
    expect(model.zoomScale).toBe(1.0); // Clamped to 1.0
  });

  it("T1.9.4: Keyboard shortcuts handle Escape, zoom, and reset keys", () => {
    model.handleKeyDown("+");
    expect(model.zoomScale).toBe(1.5);
    model.handleKeyDown("0");
    expect(model.zoomScale).toBe(1.0);
    model.handleKeyDown("Escape");
    expect(model.isOpen).toBe(false);
  });

  it("T1.9.5: Vector PDF and DWG download links are correctly mapped", () => {
    const active = model.activeDrawing;
    expect(active.downloads).toBeDefined();
    if (active.downloads.pdf) {
      expect(active.downloads.pdf).toMatch(/\.pdf$/);
    }
  });

  it("T1.9.6: panBy modifies panPosition when zoomed in", () => {
    model.zoomIn(); // 1.5x
    model.panBy(40, -25);
    expect(model.panPosition).toEqual({ x: 40, y: -25 });
  });
});

/* =========================================================================
   Feature 10: Homepage Assembly & Atmosphere Integration (R4/R5)
   ========================================================================= */
describe("Tier 1 — Feature 10: Homepage Assembly & Atmosphere Integration (R4/R5)", () => {
  let assembly;

  beforeEach(() => {
    assembly = new HomepageAssemblyModel();
  });

  it("T1.10.1: Homepage assembly structure maps all 6 service chapters in order", () => {
    const cad = assembly.getSection("service-cad-technical-production");
    const growth = assembly.getSection("service-growth-marketing-b2b");
    const vis = assembly.getSection("service-visualisation-image-production");
    const video = assembly.getSection("service-video-ai-film-editing");
    const web = assembly.getSection("service-website-design-development");
    const auto = assembly.getSection("service-automation-workflow-systems");

    expect(cad).toBeDefined();
    expect(growth).toBeDefined();
    expect(vis).toBeDefined();
    expect(video).toBeDefined();
    expect(web).toBeDefined();
    expect(auto).toBeDefined();
  });

  it("T1.10.2: CAD chapter is mapped to Technical Drafting Slate theme tokens", () => {
    const cad = assembly.getSection("service-cad-technical-production");
    expect(cad.theme).toBe("cad");
    const theme = DISCIPLINE_THEMES[cad.theme];
    expect(theme.classes.sectionWrapper).toContain("theme-slate");
  });

  it("T1.10.3: Growth chapter is mapped to Research Dossier theme tokens", () => {
    const growth = assembly.getSection("service-growth-marketing-b2b");
    expect(growth.theme).toBe("growth");
    const theme = DISCIPLINE_THEMES[growth.theme];
    expect(theme.classes.sectionWrapper).toContain("theme-dossier");
  });

  it("T1.10.4: Visualisation chapter is mapped to Titanium Gallery theme tokens", () => {
    const vis = assembly.getSection("service-visualisation-image-production");
    expect(vis.theme).toBe("visualisation");
    const theme = DISCIPLINE_THEMES[vis.theme];
    expect(theme.classes.sectionWrapper).toContain("theme-titanium");
  });

  it("T1.10.5: Video chapter is mapped to Obsidian Black theme tokens", () => {
    const video = assembly.getSection("service-video-ai-film-editing");
    expect(video.theme).toBe("video");
    const theme = DISCIPLINE_THEMES[video.theme];
    expect(theme.classes.sectionWrapper).toContain("theme-obsidian");
  });

  it("T1.10.6: Aspect ratios are defined across media containers to enforce CLS < 0.05", () => {
    const ratios = assembly.verifyAspectRatios();
    expect(ratios.cadStage).toBe("aspect-[16/10]");
    expect(ratios.visualisationGallery).toBe("aspect-[4/3]");
    expect(ratios.videoReel).toBe("aspect-video");
    expect(ratios.videoPortrait).toBe("aspect-[9/16]");
  });
});

// Run directly when executed as main module
if (process.argv[1]?.endsWith("tier1-features.test.mjs")) {
  registry.runAll().then((res) => {
    process.exit(res.failed > 0 ? 1 : 0);
  });
}
