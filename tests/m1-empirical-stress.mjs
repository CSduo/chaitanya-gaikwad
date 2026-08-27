/**
 * XIYÀTO Empirical Stress Test Suite — Milestone M1 (Theming & Tactile Foundations)
 *
 * Exhaustively tests:
 * 1. Slug mappings (short, full, aliases, invalid, edge cases) & Theme integrity
 * 2. SSR simulation (typeof window === "undefined", Node 24 navigator getter, broken globals)
 * 3. Haptic vibration triggers across all profiles, custom arrays, reduced-motion bypass, exception safety
 * 4. CSS token resolution & class definition parity in app/globals.css
 * 5. Adversarial input matrix (null/undefined inputs, prototype pollution attempts, numeric/zero vibration, NaN)
 */

import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";

// Dynamically import TypeScript modules using strip-types runtime
import {
  DISCIPLINE_THEMES,
  DISCIPLINE_THEMES_BY_SERVICE,
  normalizeDisciplineSlug,
  getDisciplineTheme,
  getDisciplineThemeByServiceSlug,
  getThemeClasses,
} from "../lib/discipline-themes.ts";

import {
  HAPTIC_PATTERNS,
  TACTILE_CLASSES,
  TACTILE_TOUCH,
  TACTILE_BUTTON,
  TACTILE_CARD,
  TACTILE_TAB,
  isHapticsSupported,
  isReducedMotionPreferred,
  triggerHaptic,
  tactileClass,
  createHapticHandler,
  useTactile,
} from "../lib/tactile.ts";

import { SERVICES } from "../lib/services.ts";

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

function assert(condition, message, details = "") {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✔ ${message}`);
  } else {
    failedTests++;
    console.error(`  ✖ FAIL: ${message}`);
    if (details) console.error(`    Detail: ${details}`);
    failures.push({ message, details });
  }
}

function assertEqual(actual, expected, message) {
  const match = JSON.stringify(actual) === JSON.stringify(expected);
  assert(
    match,
    message,
    `Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`
  );
}

console.log("\n=======================================================");
console.log(" XIYÀTO EMPIRICAL CHALLENGER — M1 STRESS HARNESS");
console.log("=======================================================\n");

// =========================================================================
// SUITE 1: THEME TOKENS & SLUG MAPPINGS
// =========================================================================
console.log("▶ SUITE 1: Discipline Theme Tokens & Slug Mapping Stress");

const EXPECTED_SHORT_SLUGS = [
  "cad",
  "growth",
  "visualisation",
  "video",
  "website",
  "automation",
];

const EXPECTED_SERVICE_SLUGS = [
  "cad-technical-production",
  "growth-marketing-b2b",
  "visualisation-image-production",
  "video-ai-film-editing",
  "website-design-development",
  "automation-workflow-systems",
];

// 1.1 Test all primary short slugs
for (const slug of EXPECTED_SHORT_SLUGS) {
  const norm = normalizeDisciplineSlug(slug);
  assertEqual(norm, slug, `Short slug '${slug}' normalizes to '${slug}'`);

  const theme = getDisciplineTheme(slug);
  assert(Boolean(theme), `Theme for '${slug}' is defined`);
  assertEqual(theme.slug, slug, `Theme for '${slug}' has correct slug`);
  assert(
    typeof theme.name === "string" && theme.name.length > 0,
    `Theme '${slug}' has non-empty name ('${theme.name}')`
  );
  assert(
    typeof theme.motif === "string" && theme.motif.length > 0,
    `Theme '${slug}' has non-empty motif ('${theme.motif}')`
  );
  assert(
    typeof theme.paletteName === "string" && theme.paletteName.length > 0,
    `Theme '${slug}' has non-empty paletteName ('${theme.paletteName}')`
  );
  assert(
    typeof theme.themeClass === "string" && theme.themeClass.startsWith("theme-"),
    `Theme '${slug}' has valid themeClass ('${theme.themeClass}')`
  );
  assert(
    typeof theme.patternClass === "string" && theme.patternClass.startsWith("pattern-"),
    `Theme '${slug}' has valid patternClass ('${theme.patternClass}')`
  );

  // Check colors
  const colorKeys = [
    "background",
    "surface",
    "surfaceMuted",
    "border",
    "borderStrong",
    "accent",
    "accentHover",
    "accentWash",
    "textPrimary",
    "textMuted",
    "textFaint",
  ];
  for (const cKey of colorKeys) {
    assert(
      typeof theme.colors[cKey] === "string" && theme.colors[cKey].length > 0,
      `Theme '${slug}' has non-empty color '${cKey}' (${theme.colors[cKey]})`
    );
  }

  // Check classes
  const classKeys = [
    "sectionWrapper",
    "cardSurface",
    "cardBorder",
    "accentText",
    "accentBg",
    "accentBorder",
    "textPrimary",
    "textMuted",
    "badgeStyle",
    "gridLines",
    "highlightGlow",
    "interactiveHover",
  ];
  for (const k of classKeys) {
    assert(
      typeof theme.classes[k] === "string" && theme.classes[k].length > 0,
      `Theme '${slug}' has non-empty class '${k}'`
    );
  }

  // Check metadata
  assert(
    ["mono", "sans", "serif"].includes(theme.metadata.fontRegister),
    `Theme '${slug}' fontRegister is valid ('${theme.metadata.fontRegister}')`
  );
  assert(
    typeof theme.metadata.technicalCue === "string" && theme.metadata.technicalCue.length > 0,
    `Theme '${slug}' has technicalCue ('${theme.metadata.technicalCue}')`
  );
}

// 1.2 Test all full service slugs
const SERVICE_TO_DISCIPLINE_MAP = {
  "cad-technical-production": "cad",
  "growth-marketing-b2b": "growth",
  "visualisation-image-production": "visualisation",
  "video-ai-film-editing": "video",
  "website-design-development": "website",
  "automation-workflow-systems": "automation",
};

for (const [svcSlug, expectedDisc] of Object.entries(SERVICE_TO_DISCIPLINE_MAP)) {
  const norm = normalizeDisciplineSlug(svcSlug);
  assertEqual(norm, expectedDisc, `Full service slug '${svcSlug}' normalizes to '${expectedDisc}'`);

  const themeBySvc = getDisciplineThemeByServiceSlug(svcSlug);
  assertEqual(themeBySvc.slug, expectedDisc, `getDisciplineThemeByServiceSlug('${svcSlug}') returns '${expectedDisc}' theme`);

  const themeClasses = getThemeClasses(svcSlug);
  assert(
    typeof themeClasses.sectionWrapper === "string" && themeClasses.sectionWrapper.includes(themeBySvc.themeClass),
    `getThemeClasses('${svcSlug}').sectionWrapper includes '${themeBySvc.themeClass}'`
  );

  const directMapped = DISCIPLINE_THEMES_BY_SERVICE[svcSlug];
  assert(directMapped !== undefined, `DISCIPLINE_THEMES_BY_SERVICE['${svcSlug}'] is directly defined`);
  assertEqual(directMapped.slug, expectedDisc, `DISCIPLINE_THEMES_BY_SERVICE['${svcSlug}'] has slug '${expectedDisc}'`);
}

// 1.3 Test alias slugs
const ALIAS_MAP = {
  "3d-visualisation": "visualisation",
  film: "video",
  web: "website",
};

for (const [alias, expectedDisc] of Object.entries(ALIAS_MAP)) {
  assertEqual(
    normalizeDisciplineSlug(alias),
    expectedDisc,
    `Alias '${alias}' normalizes to '${expectedDisc}'`
  );
  assertEqual(
    getDisciplineTheme(alias).slug,
    expectedDisc,
    `getDisciplineTheme('${alias}') returns '${expectedDisc}' theme`
  );
}

// 1.4 Test invalid, empty, and adversarial slug inputs
const INVALID_SLUGS = [
  "",
  "non-existent-service",
  "random-junk-12345",
  "CAD-TECHNICAL-PRODUCTION",
  "CAD",
  "Growth",
  "   ",
  "__proto__",
  "constructor",
  "undefined",
  "null",
  "a".repeat(1000),
  null,
  undefined,
  12345,
  {},
  [],
];

for (const invalid of INVALID_SLUGS) {
  const label = typeof invalid === "string" ? (invalid.length > 20 ? invalid.slice(0, 20) + "..." : invalid) : String(invalid);
  const normalized = normalizeDisciplineSlug(invalid);
  assertEqual(
    normalized,
    "cad",
    `Invalid slug '${label}' falls back safely to 'cad'`
  );
  const fallbackTheme = getDisciplineTheme(invalid);
  assertEqual(
    fallbackTheme.slug,
    "cad",
    `getDisciplineTheme('${label}') returns fallback 'cad' theme`
  );
}

// 1.5 Verify all live services in lib/services.ts match discipline themes
for (const svc of SERVICES) {
  const theme = getDisciplineTheme(svc.slug);
  assert(
    Boolean(theme),
    `Service '${svc.slug}' maps to valid discipline theme (${theme.name})`
  );
  assertEqual(
    theme.serviceSlug,
    svc.slug,
    `Theme serviceSlug '${theme.serviceSlug}' matches SERVICES entry '${svc.slug}'`
  );
}

// =========================================================================
// SUITE 2: SSR SAFETY SIMULATION (lib/tactile.ts)
// =========================================================================
console.log("\n▶ SUITE 2: SSR Safety Simulation (Node.js & Broken Globals)");

// 2.1 Pure SSR Node environment (global.window is undefined)
assert(
  typeof global.window === "undefined",
  "Global window is undefined in standard Node SSR environment"
);

assertEqual(
  isHapticsSupported(),
  false,
  "isHapticsSupported() returns false during SSR"
);

assertEqual(
  isReducedMotionPreferred(),
  false,
  "isReducedMotionPreferred() returns false during SSR"
);

assertEqual(
  triggerHaptic("light"),
  false,
  "triggerHaptic('light') returns false safely without throwing in SSR"
);

assertEqual(
  triggerHaptic([20, 30, 40]),
  false,
  "triggerHaptic([20, 30, 40]) returns false safely in SSR"
);

// Test tactileClass helper in SSR
const btnClass = tactileClass("button");
assert(
  typeof btnClass === "string" && btnClass.includes("active:scale-[0.98]"),
  "tactileClass('button') returns expected micro-compression class in SSR"
);

const customBtnClass = tactileClass("button", "bg-ink text-paper");
assert(
  customBtnClass.includes("bg-ink text-paper") && customBtnClass.includes("active:scale-[0.98]"),
  "tactileClass('button', 'extra') combines custom classes correctly"
);

const fallbackClass = tactileClass("nonExistentVariant");
assertEqual(
  fallbackClass,
  TACTILE_CLASSES.button,
  "tactileClass with invalid variant falls back to button class"
);

// Test createHapticHandler in SSR
let callbackFired = false;
let callbackEventArg = null;
const handler = createHapticHandler("success", (e) => {
  callbackFired = true;
  callbackEventArg = e;
});

assert(typeof handler === "function", "createHapticHandler returns a function in SSR");
handler({ type: "click", clientX: 100 });
assert(
  callbackFired === true && callbackEventArg?.clientX === 100,
  "createHapticHandler invokes callback with event argument even when haptics are unsupported"
);

// Test createHapticHandler without callback
let threwWithoutCallback = false;
try {
  const noopHandler = createHapticHandler("impact");
  noopHandler({ type: "touch" });
} catch {
  threwWithoutCallback = true;
}
assert(!threwWithoutCallback, "createHapticHandler without callback executes cleanly");

// Test useTactile hook in SSR
const tactileHookResult = useTactile();
assert(
  tactileHookResult.isHapticsSupported === false,
  "useTactile().isHapticsSupported is false in SSR"
);
assert(
  tactileHookResult.isReducedMotion === false,
  "useTactile().isReducedMotion is false in SSR"
);
assert(
  typeof tactileHookResult.triggerHaptic === "function",
  "useTactile().triggerHaptic is a function"
);

// 2.2 Simulated Partial Environments (e.g. Browser without matchMedia, iOS Safari without vibrate)
const origNavigatorDesc = Object.getOwnPropertyDescriptor(globalThis, "navigator");

try {
  // Scenario A: window defined, but navigator undefined
  globalThis.window = {};
  Object.defineProperty(globalThis, "navigator", {
    value: undefined,
    configurable: true,
    writable: true,
  });

  assert(
    isHapticsSupported() === false,
    "Partial SSR (window defined, navigator undefined) returns false"
  );
  assert(
    isReducedMotionPreferred() === false,
    "Partial SSR (window defined, matchMedia undefined) returns false"
  );

  // Scenario B: navigator defined, but vibrate is not a function (e.g. iOS Safari / Desktop Chrome)
  Object.defineProperty(globalThis, "navigator", {
    value: { vibrate: undefined },
    configurable: true,
    writable: true,
  });

  assert(
    isHapticsSupported() === false,
    "iOS / Desktop fallback (navigator.vibrate undefined) returns false"
  );
  assert(
    triggerHaptic("selection") === false,
    "triggerHaptic returns false when navigator.vibrate is undefined"
  );
} finally {
  delete globalThis.window;
  if (origNavigatorDesc) {
    Object.defineProperty(globalThis, "navigator", origNavigatorDesc);
  } else {
    delete globalThis.navigator;
  }
}

// =========================================================================
// SUITE 3: VIBRATION PATTERNS & CLIENT SIMULATION
// =========================================================================
console.log("\n▶ SUITE 3: Haptic Pattern Triggers & Browser Simulation");

// Set up full simulated browser environment
let lastVibrateArgs = null;
let vibrateCallCount = 0;
let vibrateShouldThrow = false;
let mockReducedMotion = false;

const browserNavigator = {
  vibrate: (pattern) => {
    vibrateCallCount++;
    if (vibrateShouldThrow) {
      throw new Error("SecurityError: vibrate blocked");
    }
    lastVibrateArgs = pattern;
    return true;
  },
};

const browserWindow = {
  matchMedia: (query) => ({
    matches: query === "(prefers-reduced-motion: reduce)" ? mockReducedMotion : false,
  }),
};

globalThis.window = browserWindow;
Object.defineProperty(globalThis, "navigator", {
  value: browserNavigator,
  configurable: true,
  writable: true,
});

try {
  // 3.1 Test all 6 standard haptic profiles
  const EXPECTED_PROFILES = {
    selection: 10,
    light: 15,
    medium: 30,
    impact: 45,
    success: [15, 60, 20],
    warning: [30, 40, 30, 40, 30],
  };

  for (const [profile, expectedTiming] of Object.entries(EXPECTED_PROFILES)) {
    vibrateCallCount = 0;
    lastVibrateArgs = null;
    const res = triggerHaptic(profile);
    assertEqual(res, true, `triggerHaptic('${profile}') returns true`);
    assertEqual(vibrateCallCount, 1, `triggerHaptic('${profile}') called navigator.vibrate once`);
    assertEqual(
      lastVibrateArgs,
      expectedTiming,
      `triggerHaptic('${profile}') passed timing ${JSON.stringify(expectedTiming)}`
    );
  }

  // 3.2 Test custom and adversarial patterns
  {
    // Numeric pattern
    vibrateCallCount = 0;
    triggerHaptic(75);
    assertEqual(lastVibrateArgs, 75, "triggerHaptic(75) passed custom numeric duration 75");

    // Array pattern
    vibrateCallCount = 0;
    triggerHaptic([10, 50, 10, 50]);
    assertEqual(
      lastVibrateArgs,
      [10, 50, 10, 50],
      "triggerHaptic([10, 50, 10, 50]) passed custom array pattern"
    );

    // Empty array pattern
    vibrateCallCount = 0;
    triggerHaptic([]);
    assertEqual(lastVibrateArgs, [], "triggerHaptic([]) passed empty array");

    // Zero pattern
    vibrateCallCount = 0;
    triggerHaptic(0);
    assertEqual(lastVibrateArgs, 0, "triggerHaptic(0) passed zero duration");

    // Unknown string profile fallback
    vibrateCallCount = 0;
    triggerHaptic("non_existent_profile");
    assertEqual(
      lastVibrateArgs,
      HAPTIC_PATTERNS.light,
      "Unknown profile falls back to HAPTIC_PATTERNS.light (15ms)"
    );
  }

  // 3.3 Test prefers-reduced-motion compliance
  {
    mockReducedMotion = true;
    assertEqual(
      isReducedMotionPreferred(),
      true,
      "isReducedMotionPreferred() detects simulated prefers-reduced-motion: reduce"
    );

    vibrateCallCount = 0;
    lastVibrateArgs = null;
    const suppressedRes = triggerHaptic("medium");
    assertEqual(
      suppressedRes,
      false,
      "triggerHaptic suppresses vibration when prefers-reduced-motion is active"
    );
    assertEqual(vibrateCallCount, 0, "navigator.vibrate was NOT called when reduced motion is active");

    // Test ignoreReducedMotion bypass option
    const bypassRes = triggerHaptic("medium", { ignoreReducedMotion: true });
    assertEqual(
      bypassRes,
      true,
      "triggerHaptic with ignoreReducedMotion: true successfully triggers vibration"
    );
    assertEqual(vibrateCallCount, 1, "navigator.vibrate was called once with ignoreReducedMotion flag");
    assertEqual(lastVibrateArgs, 30, "Correct timing passed when ignoring reduced motion");

    // Reset reduced motion
    mockReducedMotion = false;
  }

  // 3.4 Test Exception Handling in navigator.vibrate
  {
    vibrateShouldThrow = true;
    let exceptionEscaped = false;
    let throwRes = null;
    try {
      throwRes = triggerHaptic("impact");
    } catch {
      exceptionEscaped = true;
    }
    assert(
      !exceptionEscaped,
      "triggerHaptic catches SecurityError / permissions policy exceptions safely"
    );
    assertEqual(
      throwRes,
      false,
      "triggerHaptic returns false when navigator.vibrate throws"
    );
    vibrateShouldThrow = false;
  }

  // 3.5 Test createHapticHandler in simulated browser
  {
    let hapticClicked = false;
    lastVibrateArgs = null;
    const clientHandler = createHapticHandler("success", () => {
      hapticClicked = true;
    });

    clientHandler({ target: "button" });
    assert(hapticClicked, "createHapticHandler triggered custom callback");
    assertEqual(
      lastVibrateArgs,
      [15, 60, 20],
      "createHapticHandler dispatched 'success' vibration pattern to browser"
    );
  }
} finally {
  delete globalThis.window;
  if (origNavigatorDesc) {
    Object.defineProperty(globalThis, "navigator", origNavigatorDesc);
  } else {
    delete globalThis.navigator;
  }
}

// =========================================================================
// SUITE 4: CSS CLASS SYNTAX & TOKEN RESOLUTION (app/globals.css)
// =========================================================================
console.log("\n▶ SUITE 4: CSS Class Syntax & Token Resolution Parity");

const globalsCssPath = path.resolve(process.cwd(), "app/globals.css");
assert(fs.existsSync(globalsCssPath), `globals.css exists at ${globalsCssPath}`);

const globalsCssContent = fs.readFileSync(globalsCssPath, "utf-8");

// 4.1 Verify theme classes exist in globals.css
const REQUIRED_THEME_CLASSES = [
  ".theme-slate",
  ".theme-dossier",
  ".theme-titanium",
  ".theme-obsidian",
  ".theme-tech",
];

for (const cls of REQUIRED_THEME_CLASSES) {
  assert(
    globalsCssContent.includes(cls),
    `globals.css defines theme scope '${cls}'`
  );
}

// 4.2 Verify pattern classes exist in globals.css
const REQUIRED_PATTERN_CLASSES = [
  ".pattern-draft-grid",
  ".pattern-dossier-ledger",
  ".pattern-gallery-spotlight",
  ".pattern-titanium-sheen",
  ".pattern-cinema-glow",
  ".pattern-obsidian-vignette",
  ".pattern-tech-mesh",
  ".pattern-tech-matrix",
];

for (const pCls of REQUIRED_PATTERN_CLASSES) {
  assert(
    globalsCssContent.includes(pCls),
    `globals.css defines background pattern '${pCls}'`
  );
}

// 4.3 Verify tactile utility classes exist in globals.css
const REQUIRED_TACTILE_CSS = [
  ".tactile-press",
  ".tactile-lift",
  "motion-reduce:transform-none",
];

for (const tCls of REQUIRED_TACTILE_CSS) {
  assert(
    globalsCssContent.includes(tCls) || TACTILE_CLASSES.button.includes(tCls),
    `Tactile interaction utility '${tCls}' is present in CSS/Tailwind definitions`
  );
}

// 4.4 Verify all CSS variables in each .theme-* scope
const REQUIRED_VARIABLES = [
  "--color-paper",
  "--color-surface",
  "--color-surface-muted",
  "--color-paper-deep",
  "--color-ink",
  "--color-ink-soft",
  "--color-ink-muted",
  "--color-ink-faint",
  "--color-rule",
  "--color-rule-strong",
  "--color-accent",
  "--color-accent-hover",
  "--color-accent-wash",
  "--color-focus",
];

for (const themeCls of REQUIRED_THEME_CLASSES) {
  // Extract CSS block for theme
  const blockStart = globalsCssContent.indexOf(themeCls);
  assert(blockStart !== -1, `Found block start for ${themeCls}`);
  const blockEnd = globalsCssContent.indexOf("}", blockStart);
  const blockContent = globalsCssContent.slice(blockStart, blockEnd);

  for (const cssVar of REQUIRED_VARIABLES) {
    assert(
      blockContent.includes(cssVar),
      `${themeCls} defines CSS token '${cssVar}'`
    );
  }
}

// 4.5 Verify all TACTILE_CLASSES constants are non-empty and well-formed
const TACTILE_VARIANTS = [
  "button",
  "buttonSubtle",
  "card",
  "tab",
  "thumbnail",
  "drawerToggle",
  "iconButton",
  "ringFocus",
  "touch",
];

for (const variant of TACTILE_VARIANTS) {
  const clsStr = TACTILE_CLASSES[variant];
  assert(
    typeof clsStr === "string" && clsStr.length > 0,
    `TACTILE_CLASSES['${variant}'] is non-empty string (${clsStr})`
  );
  assert(
    !clsStr.includes("undefined") && !clsStr.includes("null"),
    `TACTILE_CLASSES['${variant}'] contains no undefined/null substrings`
  );
}

// =========================================================================
// SUMMARY
// =========================================================================
console.log("\n=======================================================");
console.log(` M1 EMPIRICAL STRESS TEST SUMMARY`);
console.log("=======================================================");
console.log(` Total Assertions: ${totalTests}`);
console.log(` Passed:           ${passedTests}`);
console.log(` Failed:           ${failedTests}`);
console.log("=======================================================\n");

if (failedTests === 0) {
  console.log("✔ ALL EMPIRICAL STRESS TESTS PASSED — VERIFIED ROBUST\n");
  process.exit(0);
} else {
  console.error(`✖ ${failedTests} TEST(S) FAILED:\n`);
  failures.forEach((f, i) => console.error(`  ${i + 1}. ${f.message}: ${f.details}`));
  process.exit(1);
}
