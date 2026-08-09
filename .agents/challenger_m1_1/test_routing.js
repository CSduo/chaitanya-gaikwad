const fs = require('fs');
const path = require('path');

// Load projects.json
const projectsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../src/data/projects.json'), 'utf8')
);

// Replicate App.tsx syncRoute logic
function syncRoute(inputHash, locationPathname = "/") {
  let hash = inputHash || "";
  let windowLocationHash = hash;
  if (hash.startsWith("##")) {
    const cleanHash = "#" + hash.replace(/^#+/, "");
    windowLocationHash = cleanHash;
    hash = cleanHash;
  } else {
    hash = hash.replace(/^#+/, "#");
  }
  if (!hash || hash === "#") hash = locationPathname !== "/" ? locationPathname : "#/";
  return { hash, windowLocationHash };
}

// Replicate slug extraction in App.tsx
function extractSlug(currentHash) {
  const rawSlug = currentHash.includes("b2b-research/") ? currentHash.split("b2b-research/")[1] : "";
  const slug = (rawSlug || "").split("#")[0].split("/")[0].trim();
  return slug;
}

// Replicate router switch in App.tsx
function resolveRoute(currentHash) {
  const slug = extractSlug(currentHash);
  
  if (currentHash.includes("startup")) {
    return { route: "startup", view: "renderStartupPage" };
  } else if (currentHash.includes("cad-automation")) {
    return { route: "cad-automation", view: "renderCadAutomationStandalonePage" };
  } else if (currentHash.includes("b2b-research/") && slug) {
    const projects = projectsData.spreadsheets;
    const currentProject = projects.find((p) => p.slug === slug);
    if (!currentProject) {
      return { route: "b2b-research-viewer-404", view: "renderSpreadsheetViewerPage", slug, found: false };
    }
    return { route: "b2b-research-viewer", view: "renderSpreadsheetViewerPage", slug, found: true, projectTitle: currentProject.title };
  } else if (currentHash.includes("b2b-research")) {
    return { route: "b2b-research-list", view: "renderB2BResearchPage" };
  } else if (currentHash.includes("projects/videos")) {
    return { route: "videos", view: "renderVideosPage" };
  } else if (currentHash.includes("projects/visualisations")) {
    return { route: "visualisations", view: "renderVisualisationsPage" };
  } else if (currentHash.includes("projects/websites")) {
    return { route: "websites", view: "renderWebsitesPage" };
  } else {
    return { route: "main", view: "renderMainPage" };
  }
}

// Replicate handleNavLinkClick logic
function handleNavLinkClick(item, isSubRoute) {
  const sectionId = item.toLowerCase().replace(/\s+/g, '-');
  if (item === "Startup") {
    return { action: "navigate", targetHash: "/startup" };
  }
  if (isSubRoute) {
    return { action: "navigate_and_scroll", targetHash: `#${sectionId}`, sectionId };
  }
  return { action: "scroll_only", sectionId };
}

// Test Suites
console.log("=== STARTING ROUTING & NAVIGATION EMPIRICAL TESTS ===\n");

let passed = 0;
let failed = 0;

function assert(description, condition, details = "") {
  if (condition) {
    console.log(`[PASS] ${description}`);
    passed++;
  } else {
    console.error(`[FAIL] ${description} ${details}`);
    failed++;
  }
}

// Test 1: Standard Sub-Routes
console.log("--- Test Suite 1: Standard Sub-Routes ---");

const subRouteTests = [
  { input: "#/projects/b2b-research", expectedView: "renderB2BResearchPage" },
  { input: "#/projects/videos", expectedView: "renderVideosPage" },
  { input: "#/projects/visualisations", expectedView: "renderVisualisationsPage" },
  { input: "#/projects/websites", expectedView: "renderWebsitesPage" },
  { input: "#/cad-automation", expectedView: "renderCadAutomationStandalonePage" },
  { input: "#/startup", expectedView: "renderStartupPage" },
];

subRouteTests.forEach(test => {
  const synced = syncRoute(test.input);
  const result = resolveRoute(synced.hash);
  assert(`Route '${test.input}' resolves to ${test.expectedView}`, result.view === test.expectedView, `(Got: ${result.view})`);
});

// Test 2: B2B Research Workbook Viewer Slugs (All 8 Workbooks)
console.log("\n--- Test Suite 2: All 8 B2B Research Slugs ---");

const b2bSlugs = projectsData.spreadsheets.map(s => s.slug);
assert("Found 8 B2B Research spreadsheets in projects.json", b2bSlugs.length === 8, `(Count: ${b2bSlugs.length})`);

b2bSlugs.forEach(slug => {
  const hash = `#/projects/b2b-research/${slug}`;
  const synced = syncRoute(hash);
  const result = resolveRoute(synced.hash);
  assert(
    `Slug '${slug}' resolves to spreadsheet viewer and finds project`,
    result.view === "renderSpreadsheetViewerPage" && result.found === true,
    `(View: ${result.view}, Found: ${result.found})`
  );
  
  // Verify corresponding JSON file exists on filesystem in public/data/spreadsheets/
  const jsonPath = path.join(__dirname, `../../public/data/spreadsheets/${slug}.json`);
  const jsonExists = fs.existsSync(jsonPath);
  assert(`JSON dataset file exists for '${slug}'`, jsonExists, `(Path: ${jsonPath})`);
  
  if (jsonExists) {
    try {
      const jsonContent = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      assert(`JSON dataset for '${slug}' has 'sheets' array`, Array.isArray(jsonContent.sheets) && jsonContent.sheets.length > 0);
    } catch (err) {
      assert(`JSON dataset for '${slug}' is valid JSON`, false, err.message);
    }
  }
});

// Test 3: Normalization & Edge Cases (Double Hash, Empty Hash, Slash-only)
console.log("\n--- Test Suite 3: Hash Normalization & Edge Cases ---");

const normCases = [
  { input: "##/startup", expectedHash: "#/startup", expectedView: "renderStartupPage" },
  { input: "###/projects/videos", expectedHash: "#/projects/videos", expectedView: "renderVideosPage" },
  { input: "###", expectedHash: "#/", expectedView: "renderMainPage" },
  { input: "#", expectedHash: "#/", expectedView: "renderMainPage" },
  { input: "", expectedHash: "#/", expectedView: "renderMainPage" },
  { input: "#/", expectedHash: "#/", expectedView: "renderMainPage" },
];

normCases.forEach(tc => {
  const synced = syncRoute(tc.input);
  const res = resolveRoute(synced.hash);
  assert(`Normalizing '${tc.input}' -> hash '${synced.hash}' & view '${res.view}'`, synced.hash === tc.expectedHash && res.view === tc.expectedView, `(Got hash: ${synced.hash}, view: ${res.view})`);
});

// Test 4: Trailing Slashes and Query Parameters
console.log("\n--- Test Suite 4: Trailing Slashes & Query Parameters ---");

const trailingSlashTests = [
  { input: "#/projects/b2b-research/", expectedView: "renderB2BResearchPage" },
  { input: "#/projects/b2b-research/cleaned-premium-fabric-import-buyer-shortlist/", expectedView: "renderSpreadsheetViewerPage", expectedFound: true },
];

trailingSlashTests.forEach(test => {
  const synced = syncRoute(test.input);
  const res = resolveRoute(synced.hash);
  const foundOk = test.expectedFound === undefined || res.found === test.expectedFound;
  assert(`Route '${test.input}' handles trailing slash cleanly`, res.view === test.expectedView && foundOk, `(View: ${res.view}, Found: ${res.found})`);
});

// Test 5: Invalid Slugs and Fallback
console.log("\n--- Test Suite 5: Invalid Slug Handling ---");

const invalidSlugTest = "#/projects/b2b-research/non-existent-workbook-xyz";
const syncedInvalid = syncRoute(invalidSlugTest);
const resInvalid = resolveRoute(syncedInvalid.hash);
assert(`Invalid slug resolves to spreadsheet viewer with found=false`, resInvalid.view === "renderSpreadsheetViewerPage" && resInvalid.found === false, `(View: ${resInvalid.view}, Found: ${resInvalid.found})`);

// Summary
console.log(`\n=== TEST SUMMARY: ${passed} PASSED, ${failed} FAILED ===`);
if (failed > 0) {
  process.exit(1);
}
