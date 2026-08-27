/**
 * XIYÀTO E2E Test Suite — Tier 4: Real-World Application Scenarios
 * Validates complete end-to-end user journeys simulating real client interactions.
 * Total: 5 multi-step user journeys.
 */

import { describe, it, expect, beforeEach, registry } from "./harness/test-framework.mjs";
import {
  DISCIPLINE_THEMES,
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

describe("Tier 4: Real-World Application User Scenarios", () => {
  beforeEach(() => {
    globalHaptics.clear();
    globalHaptics.enable();
    globalMotion.set(false);
    globalViewport.set(1280, 800);
    globalCLS.clear();
  });

  it("Scenario 1: Architecture Director CAD Deep Inspection Journey", () => {
    // 1. Visitor arrives on mobile viewport (390px)
    globalViewport.set(390, 844);
    expect(globalViewport.isMobile()).toBe(true);

    // 2. Swipes capabilities carousel to discover CAD service
    const carousel = new CapabilitiesCarouselModel(SERVICES);
    expect(carousel.counterText).toBe("01 / 06");
    expect(carousel.activeService.slug).toBe("cad-technical-production");

    // 3. Follows anchor to CAD chapter with Technical Drafting Slate theme
    const assembly = new HomepageAssemblyModel();
    const cadSection = assembly.getSection("service-cad-technical-production");
    const cadTheme = DISCIPLINE_THEMES[cadSection.theme];
    expect(cadTheme.paletteName).toBe("Technical Drafting Slate");
    expect(cadTheme.classes.sectionWrapper).toContain("theme-slate");

    // 4. Inspects CAD Drafting Rail and filters category to "Elevation"
    const railStage = new CadDraftingRailStageModel(CAD_DRAWINGS, CAD_PROJECTS);
    railStage.setCategoryFilter("Elevation");
    expect(railStage.activeCategory).toBe("Elevation");
    expect(railStage.filteredDrawings.length).toBeGreaterThan(0);

    // 5. Selects wall elevation drawing and verifies technical HUD metadata
    railStage.selectDrawing(0);
    const activeDrawing = railStage.activeDrawing;
    expect(activeDrawing.category).toBe("Elevation");
    expect(activeDrawing.width).toBeGreaterThan(5000);
    expect(activeDrawing.height).toBeGreaterThan(3000);

    // 6. Toggles quick stage zoom to 1.5x and 2.0x
    railStage.setStageZoom(1.5);
    expect(railStage.stageZoom).toBe(1.5);
    railStage.setStageZoom(2.0);
    expect(railStage.stageZoom).toBe(2.0);

    // 7. Launches deep inspection modal
    railStage.openInspectionModal();
    const modal = new CadInspectionModalModel(railStage.filteredDrawings, railStage.selectedIndex, true);
    expect(modal.isOpen).toBe(true);

    // 8. Uses keyboard shortcuts to zoom in to 3.0x and navigate to next drawing
    modal.handleKeyDown("+");
    modal.handleKeyDown("+");
    modal.handleKeyDown("+");
    modal.handleKeyDown("+");
    expect(modal.zoomScale).toBe(3.0);
    modal.panBy(100, -50);
    expect(modal.panPosition).toEqual({ x: 100, y: -50 });

    modal.handleKeyDown("ArrowRight");
    expect(modal.currentIndex).toBe(1);
    expect(modal.zoomScale).toBe(1.0); // Reset on sheet switch

    // 9. Validates vector PDF download link
    const currentDrawing = modal.activeDrawing;
    if (currentDrawing.downloads?.pdf) {
      expect(currentDrawing.downloads.pdf).toMatch(/\.pdf$/);
    }

    // 10. Closes modal with Escape key
    modal.handleKeyDown("Escape");
    expect(modal.isOpen).toBe(false);
  });

  it("Scenario 2: Commercial Real Estate Lead Dossier Exploration Journey", () => {
    // 1. Visitor arrives on desktop (1440px)
    globalViewport.set(1440, 900);
    expect(globalViewport.isDesktop()).toBe(true);

    // 2. Explores Growth & B2B chapter with Research Dossier theme
    const assembly = new HomepageAssemblyModel();
    const growthSection = assembly.getSection("service-growth-marketing-b2b");
    const growthTheme = DISCIPLINE_THEMES[growthSection.theme];
    expect(growthTheme.paletteName).toBe("Research Dossier");
    expect(growthTheme.classes.sectionWrapper).toContain("theme-dossier");

    // 3. Initializes Lead Intelligence Panel and switches region from India to China
    const panel = new LeadIntelligencePanelModel(WORKBOOKS, "india");
    expect(panel.activeRegion).toBe("india");
    panel.setRegion("china");
    expect(panel.activeRegion).toBe("china");

    // 4. Verifies instant reactive telemetry metrics
    expect(panel.dynamicMetrics.records).toContain("100+");
    expect(panel.dynamicMetrics.verifiedRoute).toContain("98%");
    expect(panel.dynamicMetrics.strategicTargets).toContain("Foshan");

    // 5. Inspects dense preview table (<350px height envelope)
    const preview = panel.previewRows;
    expect(preview.length).toBe(5);
    expect(preview[0].company).toContain("Lecong");
    expect(preview[0].score).toBe("Tier 1");

    // 6. Expands interactive Lead Intelligence Drawer
    panel.openDrawer();
    expect(panel.isDrawerOpen).toBe(true);

    // 7. Searches for "Wholesale" in live text filter
    panel.setSearchQuery("Wholesale");
    const filtered = panel.filteredDrawerRows;
    expect(filtered.length).toBeGreaterThan(0);
    for (const r of filtered) {
      expect(JSON.stringify(r).toLowerCase()).toContain("wholesale");
    }

    // 8. Switches sheet tabs and navigates pages
    panel.setSheet(1);
    expect(panel.activeSheetIndex).toBe(1);
    panel.nextPage();
    panel.prevPage();

    // 9. Verifies redacted XLSX workbook download link
    const wb = panel.activeWorkbook;
    expect(wb.downloadUrl).toMatch(/-redacted\.xlsx$/);

    // 10. Closes drawer
    panel.closeDrawer();
    expect(panel.isDrawerOpen).toBe(false);
  });

  it("Scenario 3: Luxury Interior Client 3D & Cinematic Video Journey", () => {
    // 1. Visitor arrives on tablet (820px)
    globalViewport.set(820, 1180);
    expect(globalViewport.isTablet()).toBe(true);

    // 2. Browses 3D Visualisation chapter (Titanium Gallery)
    const assembly = new HomepageAssemblyModel();
    const visSection = assembly.getSection("service-visualisation-image-production");
    const visTheme = DISCIPLINE_THEMES[visSection.theme];
    expect(visTheme.paletteName).toBe("Titanium Gallery");
    expect(visTheme.classes.sectionWrapper).toContain("theme-titanium");

    // 3. Verifies gallery aspect ratio prevents layout shifts
    const ratios = assembly.verifyAspectRatios();
    expect(ratios.visualisationGallery).toBe("aspect-[4/3]");

    // 4. Transitions to Video & AI Film chapter (Obsidian Black)
    const videoSection = assembly.getSection("service-video-ai-film-editing");
    const videoTheme = DISCIPLINE_THEMES[videoSection.theme];
    expect(videoTheme.paletteName).toBe("Obsidian Black");
    expect(videoTheme.classes.sectionWrapper).toContain("theme-obsidian");
    expect(ratios.videoReel).toBe("aspect-video");

    // 5. Triggers tactile feedback on play button
    const hapticResult = triggerHaptic("medium");
    expect(hapticResult).toBe(true);
    expect(globalHaptics.getLastVibration().pattern).toBe(25);

    // 6. User enables prefers-reduced-motion; verifies tactile vibration is suppressed
    globalMotion.set(true);
    const suppressed = triggerHaptic("medium");
    expect(suppressed).toBe(false);
  });

  it("Scenario 4: Systems & Web Performance Auditor Journey", () => {
    // 1. Auditor simulates ultra-compact 320px viewport
    globalViewport.set(320, 568);
    expect(globalViewport.isMobile()).toBe(true);

    // 2. Tests capabilities carousel horizontal scroll-snap
    const carousel = new CapabilitiesCarouselModel(SERVICES);
    for (let i = 0; i < 5; i++) {
      carousel.next();
    }
    expect(carousel.counterText).toBe("06 / 06");
    expect(carousel.activeIndex).toBe(5);

    // 3. Inspects Web & Automation chapters (Tech Clean theme)
    const assembly = new HomepageAssemblyModel();
    const webSection = assembly.getSection("service-website-design-development");
    const autoSection = assembly.getSection("service-automation-workflow-systems");
    expect(DISCIPLINE_THEMES[webSection.theme].paletteName).toBe("Tech Clean");
    expect(DISCIPLINE_THEMES[autoSection.theme].paletteName).toBe("Tech Clean");

    // 4. Verifies zero layout shift score
    globalCLS.recordShift("nav-bar", { left: 0, top: 0, width: 320, height: 60 }, { left: 0, top: 0, width: 320, height: 60 });
    expect(globalCLS.getCLS()).toBeLessThan(0.05);

    // 5. Verifies all 6 services have valid non-empty titles and motifs
    for (const service of SERVICES) {
      expect(service.name.length).toBeGreaterThan(3);
      expect(service.motif.length).toBeGreaterThan(2);
      expect(service.summary.length).toBeGreaterThan(10);
    }
  });

  it("Scenario 5: Full Lifecycle Executive Homepage Walkthrough", () => {
    // 1. Theme Tokens verification
    expect(Object.keys(DISCIPLINE_THEMES)).toHaveLength(6);

    // 2. Micro-Haptics readiness
    expect(triggerHaptic("light")).toBe(true);

    // 3. Mobile carousel capabilities verification
    const carousel = new CapabilitiesCarouselModel(SERVICES);
    carousel.goTo(0);
    expect(carousel.counterText).toBe("01 / 06");

    // 4. Desktop grid cards verification
    const cards = carousel.renderCards();
    expect(cards).toHaveLength(6);

    // 5. Compact Lead Intelligence stage verification
    const leadPanel = new LeadIntelligencePanelModel(WORKBOOKS, "india");
    expect(leadPanel.dynamicMetrics.records).toBe("200+");

    // 6. Expandable Lead Drawer verification
    leadPanel.openDrawer();
    leadPanel.setSearchQuery("Pune");
    expect(leadPanel.filteredDrawerRows.length).toBeGreaterThan(0);
    leadPanel.closeDrawer();

    // 7. CAD Interactive Drafting Rail verification
    const rail = new CadDraftingRailStageModel(CAD_DRAWINGS, CAD_PROJECTS);
    expect(rail.categories).toContain("Floor Plan");

    // 8. CAD Sticky Stage zoom verification
    rail.setStageZoom(1.5);
    expect(rail.stageZoom).toBe(1.5);
    rail.setStageZoom(1.0);

    // 9. CAD Full Inspection Modal verification
    const modal = new CadInspectionModalModel(rail.drawings, 0);
    modal.open();
    modal.zoomIn();
    expect(modal.zoomScale).toBe(1.5);
    modal.close();

    // 10. Homepage Assembly layout verification
    const assembly = new HomepageAssemblyModel();
    const verifiedThemes = assembly.verifyThemeMapping();
    expect(Object.keys(verifiedThemes).length).toBeGreaterThanOrEqual(6);
  });
});

// Run directly when executed as main module
if (process.argv[1]?.endsWith("tier4-scenarios.test.mjs")) {
  registry.runAll().then((res) => {
    process.exit(res.failed > 0 ? 1 : 0);
  });
}
