/**
 * Empirical Stress Test Harness — Challenger 2 for Milestone M1
 * 
 * 1. WCAG 2.1 Contrast Ratio Calculator & AAA Evaluation for all 5 themes
 * 2. Adversarial fuzzing / invalid input resilience testing for theme getters
 * 3. CSS syntax verification and token integrity checks
 */

import fs from "node:fs";
import path from "node:path";
import {
  DISCIPLINE_THEMES,
  DISCIPLINE_THEMES_BY_SERVICE,
  normalizeDisciplineSlug,
  getDisciplineTheme,
  getDisciplineThemeByServiceSlug,
  getThemeClasses,
} from "../lib/discipline-themes.ts";

console.log("================================================================================");
console.log("   EMPIRICAL CHALLENGER 2: MILESTONE M1 THEMING & TACTILE FOUNDATIONS AUDIT   ");
console.log("================================================================================\n");

// -----------------------------------------------------------------------------
// Part 1: Color Contrast & WCAG AAA Verification
// -----------------------------------------------------------------------------

function hexToRgb(hex) {
  let cleaned = hex.replace("#", "").trim();
  if (cleaned.length === 3) {
    cleaned = cleaned.split("").map((c) => c + c).join("");
  }
  const num = parseInt(cleaned, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function sRgbToLinear(c8bit) {
  const c = c8bit / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function getRelativeLuminance(hex) {
  // If rgba string is passed, parse or fallback
  if (hex.startsWith("rgba")) {
    // For semi-transparent or rgba, extract if needed or handle hex
    const match = hex.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (match) {
      const r = sRgbToLinear(parseInt(match[1]));
      const g = sRgbToLinear(parseInt(match[2]));
      const b = sRgbToLinear(parseInt(match[3]));
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }
  }
  const { r, g, b } = hexToRgb(hex);
  const rLin = sRgbToLinear(r);
  const gLin = sRgbToLinear(g);
  const bLin = sRgbToLinear(b);
  return 0.2126 * rLin + 0.7152 * gLin + 0.0722 * bLin;
}

function calculateContrastRatio(hex1, hex2) {
  const l1 = getRelativeLuminance(hex1);
  const l2 = getRelativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

console.log("--------------------------------------------------------------------------------");
console.log("1. WCAG CONTRAST RATIO ANALYSIS ACROSS ALL 5 THEMES");
console.log("--------------------------------------------------------------------------------");

const themes = [
  { key: "cad", name: "CAD & Technical Production (Technical Drafting Slate)" },
  { key: "growth", name: "Growth, Marketing & B2B (Research Dossier)" },
  { key: "visualisation", name: "3D Visualisation (Titanium Gallery)" },
  { key: "video", name: "Video & AI Film (Obsidian Black)" },
  { key: "website", name: "Website & Automation (Tech Clean)" },
];

const contrastResults = [];

for (const t of themes) {
  const theme = DISCIPLINE_THEMES[t.key];
  console.log(`\n▶ Theme: ${theme.paletteName} [${t.key}]`);
  console.log(`  Background: ${theme.colors.background} | Surface: ${theme.colors.surface} | SurfaceMuted: ${theme.colors.surfaceMuted}`);

  const backgrounds = [
    { label: "Background", color: theme.colors.background },
    { label: "Surface", color: theme.colors.surface },
    { label: "SurfaceMuted", color: theme.colors.surfaceMuted },
  ];

  const foregrounds = [
    { label: "textPrimary", color: theme.colors.textPrimary, isPrimary: true },
    { label: "textMuted", color: theme.colors.textMuted, isMuted: true },
    { label: "textFaint", color: theme.colors.textFaint, isFaint: true },
    { label: "accent", color: theme.colors.accent, isAccent: true },
    { label: "accentHover", color: theme.colors.accentHover, isAccent: true },
  ];

  console.log(`  ------------------------------------------------------------------------------`);
  console.log(`  | Foreground   | Hex     | Background   | Hex     | Ratio   | AA Normal | AAA Normal | AAA Large |`);
  console.log(`  |--------------|---------|--------------|---------|---------|-----------|------------|-----------|`);

  for (const bg of backgrounds) {
    for (const fg of foregrounds) {
      const ratio = calculateContrastRatio(fg.color, bg.color);
      const ratioStr = ratio.toFixed(2) + ":1";
      const passAANormal = ratio >= 4.5 ? "PASS" : "FAIL";
      const passAAANormal = ratio >= 7.0 ? "PASS" : "FAIL";
      const passAAALarge = ratio >= 4.5 ? "PASS" : "FAIL";

      console.log(
        `  | ${fg.label.padEnd(12)} | ${fg.color.padEnd(7)} | ${bg.label.padEnd(12)} | ${bg.color.padEnd(7)} | ${ratioStr.padStart(7)} | ${passAANormal.padEnd(9)} | ${passAAANormal.padEnd(10)} | ${passAAALarge.padEnd(9)} |`
      );

      contrastResults.push({
        theme: t.key,
        themeName: theme.paletteName,
        fgLabel: fg.label,
        fgColor: fg.color,
        bgLabel: bg.label,
        bgColor: bg.color,
        ratio,
        isPrimary: fg.isPrimary,
        isMuted: fg.isMuted,
        isFaint: fg.isFaint,
        isAccent: fg.isAccent,
        passAANormal: ratio >= 4.5,
        passAAANormal: ratio >= 7.0,
        passAAALarge: ratio >= 4.5,
      });
    }
  }
}

// -----------------------------------------------------------------------------
// Part 2: Invalid Input Resilience / Getter Stress Testing
// -----------------------------------------------------------------------------
console.log("\n--------------------------------------------------------------------------------");
console.log("2. ADVERSARIAL STRESS TESTING: THEME GETTERS & RESILIENCE");
console.log("--------------------------------------------------------------------------------");

const adversarialInputs = [
  { desc: "Empty string", val: "" },
  { desc: "Whitespace string", val: "   " },
  { desc: "Uppercase valid slug 'CAD'", val: "CAD" },
  { desc: "Uppercase valid slug 'GROWTH'", val: "GROWTH" },
  { desc: "Mixed case 'Visualisation'", val: "Visualisation" },
  { desc: "Trimmed full service slug '  cad-technical-production  '", val: "  cad-technical-production  " },
  { desc: "Non-existent slug 'quantum-computing'", val: "quantum-computing" },
  { desc: "Prototype pollution string '__proto__'", val: "__proto__" },
  { desc: "Constructor string 'constructor'", val: "constructor" },
  { desc: "toString property 'toString'", val: "toString" },
  { desc: "Special characters '!@#$%^&*()'", val: "!@#$%^&*()" },
  { desc: "Numeric string '12345'", val: "12345" },
  { desc: "SQL injection fragment 'cad; DROP TABLE themes;'", val: "cad; DROP TABLE themes;" },
  { desc: "HTML tag '<script>alert(1)</script>'", val: "<script>alert(1)</script>" },
  { desc: "Null passed via casting", val: null },
  { desc: "Undefined passed via casting", val: undefined },
  { desc: "Number 42 passed via casting", val: 42 },
  { desc: "Boolean true passed via casting", val: true },
  { desc: "Empty object passed via casting", val: {} },
  { desc: "Array passed via casting", val: ["cad"] },
];

let getterFailures = 0;
let getterTestsRun = 0;

console.log("Testing normalizeDisciplineSlug, getDisciplineTheme, getDisciplineThemeByServiceSlug, getThemeClasses...\n");

for (const input of adversarialInputs) {
  getterTestsRun++;
  try {
    const slug = normalizeDisciplineSlug(input.val);
    const theme = getDisciplineTheme(input.val);
    const serviceTheme = getDisciplineThemeByServiceSlug(input.val);
    const classes = getThemeClasses(input.val);

    // Validate returned token structure
    const isTokensValid =
      theme &&
      typeof theme.slug === "string" &&
      typeof theme.paletteName === "string" &&
      typeof theme.motif === "string" &&
      typeof theme.colors === "object" &&
      typeof theme.colors.background === "string" &&
      typeof theme.colors.textPrimary === "string" &&
      typeof theme.classes === "object" &&
      typeof theme.classes.sectionWrapper === "string" &&
      typeof theme.classes.cardSurface === "string" &&
      typeof theme.metadata === "object";

    const isClassesValid =
      classes &&
      typeof classes.sectionWrapper === "string" &&
      typeof classes.cardSurface === "string" &&
      typeof classes.cardBorder === "string";

    if (!isTokensValid || !isClassesValid) {
      console.log(`  ✖ FAILED for ${input.desc} (val: ${JSON.stringify(input.val)}): Invalid theme structure returned`);
      getterFailures++;
    } else {
      console.log(`  ✔ PASSED: [${input.desc}] => resolved slug: "${slug}" | palette: "${theme.paletteName}" | safe: true`);
    }
  } catch (err) {
    console.log(`  ✖ CRASHED on [${input.desc}] (val: ${JSON.stringify(input.val)}): ${err.message}`);
    getterFailures++;
  }
}

console.log(`\nGetter Stress Test Summary: ${getterTestsRun - getterFailures}/${getterTestsRun} passed.`);

// -----------------------------------------------------------------------------
// Part 3: CSS Token & globals.css Structural Verification
// -----------------------------------------------------------------------------
console.log("\n--------------------------------------------------------------------------------");
console.log("3. CSS SYNTAX, SCOPE SELECTORS & ACCESSIBILITY TOKENS VERIFICATION");
console.log("--------------------------------------------------------------------------------");

const cssPath = path.resolve("app/globals.css");
const cssContent = fs.readFileSync(cssPath, "utf-8");

const requiredThemeClasses = [
  ".theme-slate",
  ".theme-dossier",
  ".theme-titanium",
  ".theme-obsidian",
  ".theme-tech",
];

const requiredPatterns = [
  ".pattern-draft-grid",
  ".pattern-dossier-ledger",
  ".pattern-gallery-spotlight",
  ".pattern-cinema-glow",
  ".pattern-tech-mesh",
];

const requiredTactile = [
  ".tactile-press",
  ".tactile-lift",
  "@media (prefers-reduced-motion: reduce)",
];

console.log("Verifying presence of all required theme scopes in app/globals.css:");
for (const cls of requiredThemeClasses) {
  const present = cssContent.includes(cls);
  console.log(`  ${present ? "✔" : "✖"} Theme scope ${cls}: ${present ? "FOUND" : "MISSING"}`);
}

console.log("\nVerifying presence of all hardware-accelerated pattern classes in app/globals.css:");
for (const pat of requiredPatterns) {
  const present = cssContent.includes(pat);
  console.log(`  ${present ? "✔" : "✖"} Pattern ${pat}: ${present ? "FOUND" : "MISSING"}`);
}

console.log("\nVerifying presence of tactile & accessibility rules in app/globals.css:");
for (const tac of requiredTactile) {
  const present = cssContent.includes(tac);
  console.log(`  ${present ? "✔" : "✖"} Rule ${tac}: ${present ? "FOUND" : "MISSING"}`);
}

console.log("\n================================================================================");
console.log("STRESS TEST HARNESS EXECUTION COMPLETE");
console.log("================================================================================");
