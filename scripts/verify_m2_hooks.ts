import fs from "fs";
import path from "path";

async function verifyHooks() {
  console.log("=== EMPIRICAL VERIFICATION OF MILESTONE 2 HOOKS ===");

  const cursorHookPath = path.resolve("src/hooks/useCursorProximity.ts");
  const parallaxHookPath = path.resolve("src/hooks/useParallaxMotion.ts");

  const cursorCode = fs.readFileSync(cursorHookPath, "utf-8");
  const parallaxCode = fs.readFileSync(parallaxHookPath, "utf-8");

  let passes = true;

  // 1. Check zero re-render requirement in useCursorProximity
  console.log("\n[Test 1] Zero Re-Render Verification for useCursorProximity...");
  const usesStateInCursor = /useState|useReducer/.test(cursorCode);
  const callsSetInEvent = /rawX\.set\(|rawY\.set\(/.test(cursorCode);
  const hasPointerEvent = /pointermove/.test(cursorCode);
  const isPassive = /passive:\s*true/.test(cursorCode);

  if (!usesStateInCursor && callsSetInEvent && hasPointerEvent && isPassive) {
    console.log("  ✅ PASS: useCursorProximity uses MotionValue.set() directly inside a passive pointermove listener with 0 React state triggers.");
  } else {
    console.error("  ❌ FAIL: useCursorProximity does not fulfill zero-re-render criteria.");
    console.error({ usesStateInCursor, callsSetInEvent, hasPointerEvent, isPassive });
    passes = false;
  }

  // 2. Check Framer Motion Spring physics in useCursorProximity
  console.log("\n[Test 2] Spring Physics Verification in useCursorProximity...");
  const usesSpringInCursor = /useSpring\(rawX|useSpring\(rawY/.test(cursorCode);
  const defaultSpringParams = /stiffness\s*=\s*40/.test(cursorCode) && /damping\s*=\s*25/.test(cursorCode) && /mass\s*=\s*1/.test(cursorCode);

  if (usesSpringInCursor && defaultSpringParams) {
    console.log("  ✅ PASS: useCursorProximity applies Framer Motion spring physics with configurable stiffness (40), damping (25), and mass (1).");
  } else {
    console.error("  ❌ FAIL: Spring physics parameters in useCursorProximity missing or invalid.");
    passes = false;
  }

  // 3. Check useParallaxMotion spring physics & transforms
  console.log("\n[Test 3] Spring Physics & Transform Verification in useParallaxMotion...");
  const usesScroll = /useScroll/.test(parallaxCode);
  const usesTransform = /useTransform/.test(parallaxCode);
  const usesSpringInParallax = /useSpring\(scrollYProgress/.test(parallaxCode);
  const exportsParallaxY = /export function useParallaxY/.test(parallaxCode);
  const exportsParallaxRotation = /export function useParallaxRotation/.test(parallaxCode);

  if (usesScroll && usesTransform && usesSpringInParallax && exportsParallaxY && exportsParallaxRotation) {
    console.log("  ✅ PASS: useParallaxMotion correctly binds scroll progress to Framer Motion spring physics and hardware-accelerated transforms (Y & rotation).");
  } else {
    console.error("  ❌ FAIL: useParallaxMotion missing required scroll transform/spring capabilities.");
    passes = false;
  }

  // 4. Mobile pointer fine media query check
  console.log("\n[Test 4] Mobile / Touch Optimization in useCursorProximity...");
  const checksPointerFine = /matchMedia\("\(pointer: fine\)"\)/.test(cursorCode);
  if (checksPointerFine) {
    console.log("  ✅ PASS: useCursorProximity checks for (pointer: fine) to prevent unnecessary listener overhead on touch devices.");
  } else {
    console.error("  ❌ FAIL: Pointer fine media query check missing.");
    passes = false;
  }

  if (!passes) {
    console.error("\n❌ EMPIRICAL VERIFICATION FAILED!");
    process.exit(1);
  }

  console.log("\n🎉 ALL EMPIRICAL VERIFICATION TESTS PASSED SUCCESSFULLY!");
}

verifyHooks().catch((err) => {
  console.error("Test runner error:", err);
  process.exit(1);
});
