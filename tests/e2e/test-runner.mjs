/**
 * XIYÀTO E2E Master Test Runner
 * Executes all 4 verification tiers (Tier 1-4) with colorized CLI telemetry,
 * execution timing, assertion counting, and exit code handling.
 *
 * Usage:
 *   node --experimental-strip-types tests/e2e/test-runner.mjs
 *   node --experimental-strip-types tests/e2e/test-runner.mjs --tier=1
 *   node --experimental-strip-types tests/e2e/test-runner.mjs --tier=2
 *   node --experimental-strip-types tests/e2e/test-runner.mjs --tier=3
 *   node --experimental-strip-types tests/e2e/test-runner.mjs --tier=4
 *   node --experimental-strip-types tests/e2e/test-runner.mjs --tier=all
 */

import { performance } from "node:perf_hooks";
import { colors, registry } from "./harness/test-framework.mjs";

const args = process.argv.slice(2);
const tierArg = args.find((a) => a.startsWith("--tier="))?.split("=")[1] || "all";

console.log(`\n${colors.bold}${colors.bgCyan} XIYÀTO HOMEPAGE REDESIGN — E2E OPAQUE-BOX TEST SUITE ${colors.reset}`);
console.log(`${colors.dim}Target: 10 Features | Tiers 1-4 | BVA, Category-Partition, Pairwise & Real Journeys${colors.reset}\n`);

async function runMasterSuite() {
  const globalStartTime = performance.now();
  const tierResults = [];

  const tiersToRun = [];
  if (tierArg === "1" || tierArg === "all") tiersToRun.push({ id: 1, name: "Tier 1: Feature Coverage (F1-F10)", file: "./tier1-features.test.mjs" });
  if (tierArg === "2" || tierArg === "all") tiersToRun.push({ id: 2, name: "Tier 2: Boundary & Corner Cases", file: "./tier2-boundary.test.mjs" });
  if (tierArg === "3" || tierArg === "all") tiersToRun.push({ id: 3, name: "Tier 3: Cross-Feature Combinations", file: "./tier3-combinations.test.mjs" });
  if (tierArg === "4" || tierArg === "all") tiersToRun.push({ id: 4, name: "Tier 4: Real-World User Scenarios", file: "./tier4-scenarios.test.mjs" });

  for (const tier of tiersToRun) {
    registry.clear();
    console.log(`${colors.bold}${colors.magenta}======================================================================${colors.reset}`);
    console.log(`${colors.bold}${colors.magenta} RUNNING ${tier.name.toUpperCase()} ${colors.reset}`);
    console.log(`${colors.bold}${colors.magenta}======================================================================${colors.reset}`);

    // Import the test file dynamically to populate registry
    await import(tier.file);
    const res = await registry.runAll();
    tierResults.push({
      tier: tier.id,
      name: tier.name,
      passed: res.passed,
      failed: res.failed,
      total: res.total,
      durationSec: res.durationSec,
      failures: res.failures,
    });
  }

  const globalDuration = ((performance.now() - globalStartTime) / 1000).toFixed(3);
  const totalPassed = tierResults.reduce((acc, t) => acc + t.passed, 0);
  const totalFailed = tierResults.reduce((acc, t) => acc + t.failed, 0);
  const totalTests = totalPassed + totalFailed;

  console.log(`\n${colors.bold}======================================================================${colors.reset}`);
  console.log(`${colors.bold}                       E2E TEST SUITE SUMMARY                         ${colors.reset}`);
  console.log(`${colors.bold}======================================================================${colors.reset}`);
  console.log(`| Tier | Verification Scope                 | Total | Passed | Failed | Duration |`);
  console.log(`|------|------------------------------------|-------|--------|--------|----------|`);

  for (const tr of tierResults) {
    const statusColor = tr.failed === 0 ? colors.green : colors.red;
    const padName = tr.name.padEnd(34, " ");
    const padTotal = String(tr.total).padStart(5, " ");
    const padPass = String(tr.passed).padStart(6, " ");
    const padFail = String(tr.failed).padStart(6, " ");
    const padDur = `${tr.durationSec}s`.padStart(8, " ");
    console.log(`| T${tr.tier}  | ${padName} | ${padTotal} | ${statusColor}${padPass}${colors.reset} | ${padFail} | ${padDur} |`);
  }

  console.log(`|------|------------------------------------|-------|--------|--------|----------|`);
  const finalColor = totalFailed === 0 ? colors.bgGreen : colors.bgRed;
  console.log(`| TOTAL| ALL TIERS COMBINED                 | ${String(totalTests).padStart(5, " ")} | ${String(totalPassed).padStart(6, " ")} | ${String(totalFailed).padStart(6, " ")} | ${`${globalDuration}s`.padStart(8, " ")} |`);
  console.log(`======================================================================\n`);

  if (totalFailed === 0) {
    console.log(`${finalColor}${colors.bold} 100% E2E TEST VERIFICATION PASSED — READY FOR MILESTONE DELIVERY ${colors.reset}\n`);
    process.exit(0);
  } else {
    console.log(`${finalColor}${colors.bold} E2E TEST SUITE FAILED — ${totalFailed} TEST(S) FAILED ${colors.reset}\n`);
    process.exit(1);
  }
}

runMasterSuite().catch((err) => {
  console.error(`${colors.red}Fatal runner error:${colors.reset}`, err);
  process.exit(1);
});
