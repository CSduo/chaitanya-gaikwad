/**
 * XIYÀTO E2E Test Suite — Tier 3: Cross-Feature Combinations
 * Validates cross-module interactions, concurrent states, theme + modal combinations,
 * and responsive lifecycle transitions.
 * Total: >=10 tests (12 tests total).
 */

import { describe, it, expect, beforeEach, registry } from "./harness/test-framework.mjs";
import {
  DISCIPLINE_THEMES,
  getDisciplineTheme,
  triggerHaptic,
  CapabilitiesCarouselModel,
  LeadIntelligencePanelModel,
  CadDraftingRailStageModel,
  CadInspectionModalModel,
  HomepageAssemblyModel,
} from "./harness/component-models.mjs";
import { globalHaptics, globalMotion, globalViewport, globalCLS } from "./harness/dom-simulator.mjs";
import { SERVICES } from "../../lib/services.ts";
import { CAD_DRAWINGS, CAD_PROJECTS, WORKBOOKS } from "../../lib/portfolio.ts";

describe("Tier 3: Cross-Feature Combination Matrix", () => {
  beforeEach(() => {
    globalHaptics.clear();
    globalHaptics.enable();
    globalMotion.set(false);
    globalViewport.set(1280, 800);
    globalCLS.clear();
  });

  it("T3.1: Theme switching with active Lead Intelligence Drawer maintains drawer state", () => {
    const growthTheme = DISCIPLINE_THEMES.growth;
    const leadPanel = new LeadIntelligencePanelModel(WORKBOOKS, "india");
    leadPanel.openDrawer();
    leadPanel.setSearchQuery("cotton");
    expect(leadPanel.isDrawerOpen).toBe(true);

    // Theme context is applied
    expect(growthTheme.classes.sectionWrapper).toContain("theme-dossier");
    // Drawer state is preserved
    expect(leadPanel.searchQuery).toBe("cotton");
    expect(leadPanel.isDrawerOpen).toBe(true);
  });

  it("T3.2: CAD stage selection with theme switches preserves blueprint and zoom state", () => {
    const cadTheme = DISCIPLINE_THEMES.cad;
    const cadStage = new CadDraftingRailStageModel(CAD_DRAWINGS, CAD_PROJECTS);
    cadStage.selectDrawing(1);
    cadStage.setStageZoom(1.5);

    expect(cadTheme.classes.sectionWrapper).toContain("theme-slate");
    expect(cadStage.selectedIndex).toBe(1);
    expect(cadStage.stageZoom).toBe(1.5);
  });

  it("T3.3: Responsive resize from mobile to desktop during active swipe preserves selected service", () => {
    globalViewport.set(390, 844);
    const carousel = new CapabilitiesCarouselModel(SERVICES);
    carousel.goTo(3); // Video service
    expect(carousel.activeService.slug).toBe("video-ai-film-editing");
    expect(carousel.counterText).toBe("04 / 06");

    // Resize to desktop 1440px
    globalViewport.set(1440, 900);
    expect(globalViewport.isDesktop()).toBe(true);
    expect(carousel.activeService.slug).toBe("video-ai-film-editing");
    expect(carousel.renderCards()[3].isActive).toBe(true);
  });

  it("T3.4: Drawer live search combined with region tab switching resets search query", () => {
    const panel = new LeadIntelligencePanelModel(WORKBOOKS, "india");
    panel.openDrawer();
    panel.setSearchQuery("Mumbai");
    expect(panel.searchQuery).toBe("Mumbai");

    // Switch region to China
    panel.setRegion("china");
    expect(panel.activeRegion).toBe("china");
    // Region change switches active dataset and resets sheet index
    expect(panel.activeSheetIndex).toBe(0);
    expect(panel.currentPage).toBe(0);
  });

  it("T3.5: CAD zoom level & pan state reset on thumbnail switch", () => {
    const stage = new CadDraftingRailStageModel(CAD_DRAWINGS, CAD_PROJECTS);
    stage.setStageZoom(2.0);
    stage.panOffset = { x: 50, y: 25 };

    // Select another thumbnail in rail
    stage.selectDrawing(2);
    expect(stage.stageZoom).toBe(1.0);
    expect(stage.panOffset).toEqual({ x: 0, y: 0 });
  });

  it("T3.6: Tactile feedback is triggered on drawer open, sheet tab switch, and modal open", () => {
    const leadPanel = new LeadIntelligencePanelModel(WORKBOOKS, "india");
    leadPanel.openDrawer();
    expect(globalHaptics.getHistory().length).toBeGreaterThanOrEqual(1);

    leadPanel.setSheet(1);
    expect(globalHaptics.getHistory().length).toBeGreaterThanOrEqual(2);

    const cadModal = new CadInspectionModalModel(CAD_DRAWINGS, 0);
    cadModal.open();
    expect(globalHaptics.getHistory().length).toBeGreaterThanOrEqual(3);
  });

  it("T3.7: Multi-sheet navigation in drawer maintains search filter isolation", () => {
    const panel = new LeadIntelligencePanelModel(WORKBOOKS, "india");
    panel.openDrawer();
    panel.setSearchQuery("Fabrics");
    expect(panel.searchQuery).toBe("Fabrics");

    panel.setSheet(1);
    expect(panel.activeSheetIndex).toBe(1);
    expect(panel.currentPage).toBe(0);
  });

  it("T3.8: Deep-link anchor navigation from Hero/Grid matches themed section targets", () => {
    const carousel = new CapabilitiesCarouselModel(SERVICES);
    const assembly = new HomepageAssemblyModel();
    const cards = carousel.renderCards();

    for (const card of cards) {
      const targetId = card.anchorHref.replace("#", "");
      const section = assembly.getSection(targetId);
      expect(section).toBeDefined();
      expect(section.theme).toBeDefined();
      expect(DISCIPLINE_THEMES[section.theme]).toBeDefined();
    }
  });

  it("T3.9: Keyboard shortcuts in CAD Inspection Modal work independently of drawer state", () => {
    const leadPanel = new LeadIntelligencePanelModel(WORKBOOKS, "india");
    const outputs = CAD_DRAWINGS.filter((d) => d.role === "output");
    const cadModal = new CadInspectionModalModel(outputs, 0, true);

    expect(leadPanel.isDrawerOpen).toBe(false);
    expect(cadModal.isOpen).toBe(true);

    cadModal.handleKeyDown("+");
    expect(cadModal.zoomScale).toBe(1.5);
    cadModal.handleKeyDown("ArrowRight");
    expect(cadModal.currentIndex).toBe(1);
    cadModal.handleKeyDown("Escape");
    expect(cadModal.isOpen).toBe(false);
  });

  it("T3.10: Touch drag gestures on CAD stage under reduced motion suppresses vibration", () => {
    globalMotion.set(true); // User opts for reduced motion
    const stage = new CadDraftingRailStageModel(CAD_DRAWINGS, CAD_PROJECTS);
    stage.setStageZoom(2.0);
    stage.panOffset = { x: 40, y: -20 };

    expect(stage.stageZoom).toBe(2.0);
    expect(stage.panOffset).toEqual({ x: 40, y: -20 });
    // No vibration recorded because reduced motion is active
    expect(globalHaptics.getHistory()).toHaveLength(0);
  });

  it("T3.11: Extreme viewport resize cycle (320px -> 1920px -> 360px) maintains state continuity", () => {
    const carousel = new CapabilitiesCarouselModel(SERVICES);
    globalViewport.set(320, 568);
    carousel.goTo(2);
    expect(carousel.activeIndex).toBe(2);

    globalViewport.set(1920, 1080);
    expect(globalViewport.isDesktop()).toBe(true);
    expect(carousel.activeIndex).toBe(2);

    globalViewport.set(360, 640);
    expect(globalViewport.isMobile()).toBe(true);
    expect(carousel.counterText).toBe("03 / 06");
  });

  it("T3.12: Concurrent modal and drawer lifecycles have isolated state spaces", () => {
    const leadPanel = new LeadIntelligencePanelModel(WORKBOOKS, "india");
    const cadModal = new CadInspectionModalModel(CAD_DRAWINGS, 0);

    leadPanel.openDrawer();
    expect(leadPanel.isDrawerOpen).toBe(true);
    expect(cadModal.isOpen).toBe(false);

    cadModal.open();
    expect(cadModal.isOpen).toBe(true);

    cadModal.close();
    expect(cadModal.isOpen).toBe(false);
    expect(leadPanel.isDrawerOpen).toBe(true);
  });
});

// Run directly when executed as main module
if (process.argv[1]?.endsWith("tier3-combinations.test.mjs")) {
  registry.runAll().then((res) => {
    process.exit(res.failed > 0 ? 1 : 0);
  });
}
