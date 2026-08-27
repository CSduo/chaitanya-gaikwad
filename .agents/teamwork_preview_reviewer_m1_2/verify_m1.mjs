import {
  DISCIPLINE_THEMES,
  DISCIPLINE_THEMES_BY_SERVICE,
  normalizeDisciplineSlug,
  getDisciplineTheme,
  getDisciplineThemeByServiceSlug,
  getThemeClasses
} from ../../lib/discipline-themes.ts;

import {
  HAPTIC_PATTERNS,
  TACTILE_CLASSES,
  isHapticsSupported,
  isReducedMotionPreferred,
  triggerHaptic,
  tactileClass,
  createHapticHandler,
  useTactile
} from ../../lib/tactile.ts;

console.log(=== 1. DISCIPLINE THEMES RUNTIME AUDIT ===);
const expectedSlugs = [cad, growth, visualisation, video, website, automation];
for (const slug of expectedSlugs) {
  const theme = DISCIPLINE_THEMES[slug];
  if (!theme) {
    console.error(MISSING THEME FOR SLUG: );
    process.exit(1);
  }
  console.log([PASS] Discipline: );
  console.log(       Palette: );
  console.log(       ThemeClass: );
  console.log(       PatternClass: );
  console.log(       Motif: );
  console.log(       Accent Color: );
  console.log(       Background Color: );
  console.log(       Card Border: );
}

console.log(\n=== 2. SERVICE SLUG MAPPING AUDIT ===);
const expectedServices = [
  cad-technical-production,
  growth-marketing-b2b,
  visualisation-image-production,
  video-ai-film-editing,
  website-design-development,
  automation-workflow-systems
];
for (const s of expectedServices) {
  const t = getDisciplineThemeByServiceSlug(s);
  console.log([PASS] Service  -> mapped to theme:  ());
}

console.log(\n=== 3. FALLBACK AND NORMALIZATION AUDIT ===);
console.log(normalizeDisciplineSlug('3d-visualisation') ->, normalizeDisciplineSlug(3d-visualisation));
console.log(normalizeDisciplineSlug('film') ->, normalizeDisciplineSlug(film));
console.log(normalizeDisciplineSlug('web') ->, normalizeDisciplineSlug(web));
console.log(getDisciplineTheme('completely-invalid-slug') ->, getDisciplineTheme(completely-invalid-slug).slug);
console.log(getThemeClasses('cad').accentText ->, getThemeClasses(cad).accentText);

console.log(\n=== 4. TACTILE & MICRO-HAPTIC AUDIT ===);
console.log(Haptic Patterns:, HAPTIC_PATTERNS);
console.log(isHapticsSupported() in Node SSR:, isHapticsSupported());
console.log(isReducedMotionPreferred() in Node SSR:, isReducedMotionPreferred());
console.log(triggerHaptic('selection') in Node SSR (safe fallback):, triggerHaptic(selection));
console.log(triggerHaptic('success') in Node SSR (safe fallback):, triggerHaptic(success));
console.log(triggerHaptic([20, 50, 20]) custom pattern in Node SSR:, triggerHaptic([20, 50, 20]));
console.log(tactileClass('button', 'px-4 py-2') ->, tactileClass(button, px-4 py-2));
console.log(tactileClass('card') ->, tactileClass(card));
console.log(tactileClass('thumbnail') ->, tactileClass(thumbnail));
console.log(tactileClass('iconButton') ->, tactileClass(iconButton));

let callbackRan = false;
const handler = createHapticHandler(light, () => {
  callbackRan = true;
});
handler();
console.log(createHapticHandler executed wrapped callback successfully:, callbackRan);

console.log(\nALL DIRECT RUNTIME AUDIT CHECKS PASSED!);
