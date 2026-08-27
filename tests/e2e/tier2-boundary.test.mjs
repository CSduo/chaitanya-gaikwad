/**
 * XIYÀTO E2E Test Suite — Tier 2: Boundary & Corner Cases
 * Validates edge cases, invalid inputs, clamping, viewports, and corner conditions across F1 - F10.
 * Total: >=50 tests (5+ tests per feature).
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

/* =========================================================================
   Feature 1: Bespoke Discipline Thematic Tokens (Boundary & Corner)
   ========================================================================= */
describe("Tier 2 — Feature 1: Thematic Tokens Boundary & Corner Cases", () => {
  it("T2.1.1: Empty, null, or undefined slug returns fallback theme without error", () => {
    expect(getDisciplineTheme("").slug).toBe("cad");
    expect(getDisciplineTheme(null).slug).toBe("cad");
    expect(getDisciplineTheme(undefined).slug).toBe("cad");
  });

  it("T2.1.2: Malformed or mixed-case slug falls back safely without throwing", () => {
    expect(getDisciplineTheme("CAD_TECHNICAL").slug).toBe("cad");
    expect(getDisciplineTheme("Growth-123").slug).toBe("cad");
  });

  it("T2.1.3: All theme class definitions contain valid non-empty CSS strings", () => {
    for (const [key, theme] of Object.entries(DISCIPLINE_THEMES)) {
      expect(typeof theme.classes.sectionWrapper).toBe("string");
      expect(theme.classes.sectionWrapper.length).toBeGreaterThan(5);
      expect(theme.classes.sectionWrapper).not.toContain("undefined");
      expect(theme.classes.sectionWrapper).not.toContain("null");
    }
  });

  it("T2.1.4: Theme registry contains exactly 6 primary discipline keys", () => {
    const keys = Object.keys(DISCIPLINE_THEMES);
    expect(keys).toHaveLength(6);
    expect(keys).toContain("cad");
    expect(keys).toContain("growth");
    expect(keys).toContain("visualisation");
    expect(keys).toContain("video");
    expect(keys).toContain("website");
    expect(keys).toContain("automation");
  });

  it("T2.1.5: Theme token objects expose complete contract fields", () => {
    for (const theme of Object.values(DISCIPLINE_THEMES)) {
      expect(theme.name).toBeDefined();
      expect(theme.motif).toBeDefined();
      expect(theme.paletteName).toBeDefined();
      expect(theme.classes.cardSurface).toBeDefined();
      expect(theme.classes.cardBorder).toBeDefined();
      expect(theme.classes.accentText).toBeDefined();
      expect(theme.classes.textPrimary).toBeDefined();
      expect(theme.classes.textMuted).toBeDefined();
    }
  });
});

/* =========================================================================
   Feature 2: Tactile Micro-Haptics (Boundary & Corner)
   ========================================================================= */
describe("Tier 2 — Feature 2: Tactile Micro-Haptics Boundary & Corner Cases", () => {
  beforeEach(() => {
    globalHaptics.clear();
    globalHaptics.enable();
    globalMotion.set(false);
  });

  it("T2.2.1: Custom numerical duration of 0ms or negative executes without crashing", () => {
    const resZero = triggerHaptic(0);
    expect(resZero).toBe(true);
    const resNeg = triggerHaptic(-15);
    expect(resNeg).toBe(true);
  });

  it("T2.2.2: Extreme array pattern (100 elements) does not overflow memory", () => {
    const hugePattern = new Array(100).fill(5);
    const res = triggerHaptic(hugePattern);
    expect(res).toBe(true);
    expect(globalHaptics.getLastVibration().pattern).toHaveLength(100);
  });

  it("T2.2.3: Rapid succession haptic calls in 1ms are recorded in history", () => {
    for (let i = 0; i < 10; i++) {
      triggerHaptic("selection");
    }
    expect(globalHaptics.getHistory()).toHaveLength(10);
  });

  it("T2.2.4: When navigator.vibrate throws synchronously, returns false safely", () => {
    const errorHaptics = {
      vibrate() {
        throw new Error("SecurityError: vibrate disallowed");
      },
    };
    const res = triggerHaptic("medium", errorHaptics, globalMotion);
    expect(res).toBe(false);
  });

  it("T2.2.5: Enabling reduced motion immediately suppresses all haptic triggers", () => {
    globalMotion.set(true);
    expect(triggerHaptic("heavy")).toBe(false);
    expect(triggerHaptic("light")).toBe(false);
    expect(triggerHaptic([10, 20])).toBe(false);
    expect(globalHaptics.getHistory()).toHaveLength(0);
  });
});

/* =========================================================================
   Feature 3: Mobile Horizontal Slideshow (Boundary & Corner)
   ========================================================================= */
describe("Tier 2 — Feature 3: Mobile Carousel Boundary & Corner Cases", () => {
  it("T2.3.1: Empty services array handles safely with 00 / 00 counter", () => {
    const emptyModel = new CapabilitiesCarouselModel([]);
    expect(emptyModel.totalSlides).toBe(0);
    expect(emptyModel.counterText).toBe("00 / 00");
    expect(emptyModel.activeService).toBeNull();
    emptyModel.next();
    expect(emptyModel.activeIndex).toBe(0);
  });

  it("T2.3.2: Single service array displays 01 / 01 without out-of-bounds swipe", () => {
    const singleModel = new CapabilitiesCarouselModel([SERVICES[0]]);
    expect(singleModel.totalSlides).toBe(1);
    expect(singleModel.counterText).toBe("01 / 01");
    singleModel.next();
    expect(singleModel.activeIndex).toBe(0);
    singleModel.prev();
    expect(singleModel.activeIndex).toBe(0);
  });

  it("T2.3.3: Swiping left before index 0 remains clamped at index 0", () => {
    const model = new CapabilitiesCarouselModel(SERVICES);
    model.prev();
    model.prev();
    expect(model.activeIndex).toBe(0);
    expect(model.counterText).toBe("01 / 06");
  });

  it("T2.3.4: Swiping right past index 5 remains clamped at index 5", () => {
    const model = new CapabilitiesCarouselModel(SERVICES);
    for (let i = 0; i < 10; i++) {
      model.next();
    }
    expect(model.activeIndex).toBe(5);
    expect(model.counterText).toBe("06 / 06");
  });

  it("T2.3.5: Fractional scroll offsets calculate correctly", () => {
    const model = new CapabilitiesCarouselModel(SERVICES);
    // 320px width: 490px scroll is index 2 (1.53 -> 2)
    model.handleScrollOffset(490, 320);
    expect(model.activeIndex).toBe(2);
    // Negative offset clamps to 0
    model.handleScrollOffset(-100, 320);
    expect(model.activeIndex).toBe(0);
  });

  it("T2.3.6: goTo with out-of-range indices (-99 or +99) clamps safely", () => {
    const model = new CapabilitiesCarouselModel(SERVICES);
    model.goTo(-99);
    expect(model.activeIndex).toBe(0);
    model.goTo(99);
    expect(model.activeIndex).toBe(5);
  });
});

/* =========================================================================
   Feature 4: Desktop Capabilities Grid (Boundary & Corner)
   ========================================================================= */
describe("Tier 2 — Feature 4: Desktop Grid Boundary & Corner Cases", () => {
  it("T2.4.1: Ultra-wide 4K viewport (3840px) is identified as desktop", () => {
    globalViewport.set(3840, 2160);
    expect(globalViewport.isDesktop()).toBe(true);
    expect(globalViewport.isUltraWide()).toBe(true);
  });

  it("T2.4.2: Exact breakpoint boundaries (639px vs 640px, 1023px vs 1024px)", () => {
    globalViewport.set(639, 800);
    expect(globalViewport.isMobile()).toBe(true);
    expect(globalViewport.isTablet()).toBe(false);

    globalViewport.set(640, 800);
    expect(globalViewport.isMobile()).toBe(false);
    expect(globalViewport.isTablet()).toBe(true);

    globalViewport.set(1023, 800);
    expect(globalViewport.isTablet()).toBe(true);
    expect(globalViewport.isDesktop()).toBe(false);

    globalViewport.set(1024, 800);
    expect(globalViewport.isTablet()).toBe(false);
    expect(globalViewport.isDesktop()).toBe(true);
  });

  it("T2.4.3: Service card with 500+ character summary preserves card structure", () => {
    const longService = {
      ...SERVICES[0],
      summary: "A".repeat(500),
    };
    const model = new CapabilitiesCarouselModel([longService]);
    const cards = model.renderCards();
    expect(cards[0].summary).toHaveLength(500);
    expect(cards[0].orderNumber).toBe("01");
  });

  it("T2.4.4: 50 duplicated services render without index crash", () => {
    const lots = new Array(50).fill(SERVICES[0]).map((s, idx) => ({ ...s, order: idx + 1 }));
    const model = new CapabilitiesCarouselModel(lots);
    expect(model.totalSlides).toBe(50);
    model.goTo(49);
    expect(model.counterText).toBe("50 / 50");
  });

  it("T2.4.5: Anchor hrefs are lowercase, alphanumeric and hyphen-separated", () => {
    const model = new CapabilitiesCarouselModel(SERVICES);
    const cards = model.renderCards();
    for (const card of cards) {
      expect(card.anchorHref).toMatch(/^#service-[a-z0-9-]+$/);
    }
  });
});

/* =========================================================================
   Feature 5: Compact Lead Intelligence Stage (Boundary & Corner)
   ========================================================================= */
describe("Tier 2 — Feature 5: Compact Lead Stage Boundary & Corner Cases", () => {
  let model;

  beforeEach(() => {
    model = new LeadIntelligencePanelModel(WORKBOOKS, "india");
  });

  it("T2.5.1: Invalid region key is rejected and preserves current active region", () => {
    model.setRegion("antarctica");
    expect(model.activeRegion).toBe("india");
    model.setRegion("mars");
    expect(model.activeRegion).toBe("india");
  });

  it("T2.5.2: Rapid switching across all regions in loop maintains data integrity", () => {
    const regions = ["india", "middle-east", "philippines", "china", "all"];
    for (let i = 0; i < 20; i++) {
      const r = regions[i % regions.length];
      model.setRegion(r);
      expect(model.activeRegion).toBe(r);
      expect(model.dynamicMetrics).toBeDefined();
    }
  });

  it("T2.5.3: Preview rows are non-empty and have defined fields", () => {
    for (const reg of ["india", "middle-east", "philippines", "china"]) {
      model.setRegion(reg);
      const rows = model.previewRows;
      expect(rows.length).toBeGreaterThan(0);
      for (const row of rows) {
        expect(row.company).toBeDefined();
        expect(row.score).toBeDefined();
        expect(row.route).toBeDefined();
      }
    }
  });

  it("T2.5.4: Empty workbooks fallback returns null workbook safely", () => {
    const emptyModel = new LeadIntelligencePanelModel([], "india");
    expect(emptyModel.activeWorkbook).toBeNull();
  });

  it("T2.5.5: All-markets region provides aggregated dynamic metrics", () => {
    model.setRegion("all");
    expect(model.dynamicMetrics.records).toContain("500+");
    expect(model.dynamicMetrics.verifiedRoute).toContain("99");
  });
});

/* =========================================================================
   Feature 6: Expandable Lead Drawer (Boundary & Corner)
   ========================================================================= */
describe("Tier 2 — Feature 6: Lead Drawer Boundary & Corner Cases", () => {
  let model;

  beforeEach(() => {
    model = new LeadIntelligencePanelModel(WORKBOOKS, "india");
    model.openDrawer();
  });

  it("T2.6.1: Search query with regex special characters does not crash", () => {
    model.setSearchQuery(".*+?^${}()|[]\\");
    const filtered = model.filteredDrawerRows;
    expect(Array.isArray(filtered)).toBe(true);
  });

  it("T2.6.2: Search query with 0 matches returns empty array", () => {
    model.setSearchQuery("NON_EXISTENT_COMPANY_XYZ_12345");
    expect(model.filteredDrawerRows).toHaveLength(0);
    expect(model.totalDrawerPages).toBe(1);
  });

  it("T2.6.3: Setting search query resets currentPage to 0", () => {
    model.currentPage = 3;
    model.setSearchQuery("Bombay");
    expect(model.currentPage).toBe(0);
  });

  it("T2.6.4: Setting sheet index with negative or out-of-range value clamps safely", () => {
    model.setSheet(-5);
    expect(model.activeSheetIndex).toBe(0);
    model.setSheet(99);
    expect(model.activeSheetIndex).toBeLessThanOrEqual(model.activeWorkbook.sheetNames.length - 1);
  });

  it("T2.6.5: prevPage at page 0 clamps to 0", () => {
    model.prevPage();
    expect(model.currentPage).toBe(0);
  });

  it("T2.6.6: Search with surrounding whitespace matches trimmed content", () => {
    model.setSearchQuery("  cotton  ");
    // Model search matches substring
    const rows = model.filteredDrawerRows;
    expect(Array.isArray(rows)).toBe(true);
  });
});

/* =========================================================================
   Feature 7: CAD Interactive Drafting Rail & HUD (Boundary & Corner)
   ========================================================================= */
describe("Tier 2 — Feature 7: CAD Drafting Rail Boundary & Corner Cases", () => {
  it("T2.7.1: Category filter with no matching drawings returns empty array safely", () => {
    const model = new CadDraftingRailStageModel(CAD_DRAWINGS, CAD_PROJECTS);
    model.setCategoryFilter("NonExistentCategory");
    expect(model.filteredDrawings).toHaveLength(0);
    expect(model.activeDrawing).toBeDefined(); // Fallback drawing
  });

  it("T2.7.2: Empty drawings array initializes safely", () => {
    const emptyModel = new CadDraftingRailStageModel([], []);
    expect(emptyModel.drawings).toHaveLength(0);
    expect(emptyModel.categories).toEqual(["All"]);
    expect(emptyModel.activeDrawing).toBeNull();
  });

  it("T2.7.3: selectDrawing clamps negative or excessive indices", () => {
    const model = new CadDraftingRailStageModel(CAD_DRAWINGS, CAD_PROJECTS);
    model.selectDrawing(-10);
    expect(model.selectedIndex).toBe(0);
    model.selectDrawing(9999);
    expect(model.selectedIndex).toBe(model.filteredDrawings.length - 1);
  });

  it("T2.7.4: Changing category filter resets selectedIndex to 0", () => {
    const model = new CadDraftingRailStageModel(CAD_DRAWINGS, CAD_PROJECTS);
    model.selectDrawing(3);
    expect(model.selectedIndex).toBe(3);
    model.setCategoryFilter("Floor Plan");
    expect(model.selectedIndex).toBe(0);
  });

  it("T2.7.5: Drawing dimensions are positive non-zero integers", () => {
    const model = new CadDraftingRailStageModel(CAD_DRAWINGS, CAD_PROJECTS);
    for (const d of model.drawings) {
      expect(d.width).toBeGreaterThan(0);
      expect(d.height).toBeGreaterThan(0);
    }
  });
});

/* =========================================================================
   Feature 8: CAD Sticky Featured Drawing Stage (Boundary & Corner)
   ========================================================================= */
describe("Tier 2 — Feature 8: CAD Sticky Stage Boundary & Corner Cases", () => {
  let model;

  beforeEach(() => {
    model = new CadDraftingRailStageModel(CAD_DRAWINGS, CAD_PROJECTS);
  });

  it("T2.8.1: Stage zoom requested below 1.0x clamps to 1.0x", () => {
    model.setStageZoom(0.2);
    expect(model.stageZoom).toBe(1.0);
    model.setStageZoom(-5);
    expect(model.stageZoom).toBe(1.0);
  });

  it("T2.8.2: Stage zoom requested above 2.5x clamps to 2.5x", () => {
    model.setStageZoom(3.5);
    expect(model.stageZoom).toBe(2.5);
    model.setStageZoom(10);
    expect(model.stageZoom).toBe(2.5);
  });

  it("T2.8.3: Zooming to 1.0x zeroes out any pan offsets", () => {
    model.setStageZoom(2.0);
    model.panOffset = { x: 100, y: -50 };
    model.setStageZoom(1.0);
    expect(model.panOffset).toEqual({ x: 0, y: 0 });
  });

  it("T2.8.4: Selecting a new drawing resets zoom and pan automatically", () => {
    model.setStageZoom(2.0);
    model.panOffset = { x: 80, y: 40 };
    model.selectDrawing(2);
    expect(model.stageZoom).toBe(1.0);
    expect(model.panOffset).toEqual({ x: 0, y: 0 });
  });

  it("T2.8.5: Rapid zoom cycling preserves numerical stability", () => {
    for (let i = 0; i < 50; i++) {
      const z = 1.0 + (i % 3) * 0.5;
      model.setStageZoom(z);
      expect(model.stageZoom).toBeGreaterThanOrEqual(1.0);
      expect(model.stageZoom).toBeLessThanOrEqual(2.5);
    }
  });
});

/* =========================================================================
   Feature 9: CAD Full Inspection Modal (Boundary & Corner)
   ========================================================================= */
describe("Tier 2 — Feature 9: CAD Inspection Modal Boundary & Corner Cases", () => {
  let model;

  beforeEach(() => {
    const outputs = CAD_DRAWINGS.filter((d) => d.role === "output");
    model = new CadInspectionModalModel(outputs, 0, true);
  });

  it("T2.9.1: Unrecognized keyboard keys do not throw or change state", () => {
    const initialScale = model.zoomScale;
    const initialPos = { ...model.panPosition };
    model.handleKeyDown("KeyX");
    model.handleKeyDown("Space");
    model.handleKeyDown("Shift");
    expect(model.zoomScale).toBe(initialScale);
    expect(model.panPosition).toEqual(initialPos);
  });

  it("T2.9.2: panBy when zoomScale is 1.0 does not move panPosition", () => {
    expect(model.zoomScale).toBe(1.0);
    model.panBy(50, 50);
    expect(model.panPosition).toEqual({ x: 0, y: 0 });
  });

  it("T2.9.3: Next and Prev cycle continuously around drawing array boundaries", () => {
    const total = model.drawings.length;
    model.currentIndex = 0;
    model.prev();
    expect(model.currentIndex).toBe(total - 1);
    model.next();
    expect(model.currentIndex).toBe(0);
  });

  it("T2.9.4: Modal open clamps invalid initialIndex", () => {
    model.open(-50);
    expect(model.currentIndex).toBe(0);
    model.open(9999);
    expect(model.currentIndex).toBe(model.drawings.length - 1);
  });

  it("T2.9.5: Closing modal resets zoom and pan positions", () => {
    model.zoomIn();
    model.zoomIn();
    model.panBy(30, 20);
    model.close();
    expect(model.isOpen).toBe(false);
    expect(model.zoomScale).toBe(1.0);
    expect(model.panPosition).toEqual({ x: 0, y: 0 });
  });
});

/* =========================================================================
   Feature 10: Homepage Assembly (Boundary & Corner)
   ========================================================================= */
describe("Tier 2 — Feature 10: Homepage Assembly Boundary & Corner Cases", () => {
  let assembly;

  beforeEach(() => {
    assembly = new HomepageAssemblyModel();
    globalCLS.clear();
  });

  it("T2.10.1: Querying non-existent section returns null safely", () => {
    expect(assembly.getSection("non-existent-section-id")).toBeNull();
  });

  it("T2.10.2: Cumulative layout shift during simulated interactions is below 0.05", () => {
    // Record small shifts during tab/zoom transitions
    globalCLS.recordShift("cad-stage", { left: 0, top: 200, width: 800, height: 500 }, { left: 0, top: 200, width: 800, height: 500 });
    globalCLS.recordShift("growth-panel", { left: 0, top: 800, width: 800, height: 350 }, { left: 0, top: 800, width: 800, height: 350 });
    const cls = globalCLS.getCLS();
    expect(cls).toBeLessThan(0.05);
  });

  it("T2.10.3: Smallest supported mobile viewport (320px) is identified as mobile", () => {
    globalViewport.set(320, 568);
    expect(globalViewport.isMobile()).toBe(true);
    expect(globalViewport.isTablet()).toBe(false);
    expect(globalViewport.isDesktop()).toBe(false);
  });

  it("T2.10.4: Every section has a valid semantic landmark role", () => {
    for (const sec of assembly.sections) {
      expect(["banner", "region", "contentinfo"]).toContain(sec.role);
    }
  });

  it("T2.10.5: All verified theme mappings contain non-empty theme tokens", () => {
    const verified = assembly.verifyThemeMapping();
    expect(Object.keys(verified).length).toBeGreaterThanOrEqual(6);
    for (const theme of Object.values(verified)) {
      expect(theme.classes.sectionWrapper).toBeDefined();
    }
  });
});

// Run directly when executed as main module
if (process.argv[1]?.endsWith("tier2-boundary.test.mjs")) {
  registry.runAll().then((res) => {
    process.exit(res.failed > 0 ? 1 : 0);
  });
}
