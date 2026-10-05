#!/usr/bin/env node
/**
 * Derives sitemap <lastmod> dates from Git history and writes them to
 * data/content-dates.json, which app/sitemap.ts reads at build time.
 *
 * Why a committed file: Vercel builds from a shallow clone, where
 * `git log -- <path>` cannot be trusted, so the previous build-time lookup
 * emitted no <lastmod> at all in production. Dates are therefore computed here,
 * from complete history, and committed.
 *
 * Each route group maps to the files that make up its *main content* (page
 * source plus the data it renders). Site-wide chrome such as the header,
 * footer, layout or JSON-LD helpers is deliberately excluded so a navigation
 * tweak does not move every lastmod at once. A group's date is the committer
 * date of the most recent commit touching any of its sources. Uncommitted
 * edits are ignored (they are not published yet), and nothing is ever dated
 * "now".
 *
 * Usage
 *   node scripts/generate-content-dates.mjs          regenerate the file
 *   node scripts/generate-content-dates.mjs --check  compare the file with Git;
 *        missing groups fail, stale dates warn (add --strict to fail on them)
 *
 * Workflow: commit content changes first, then run `npm run content:dates` and
 * commit data/content-dates.json, so the file can record the content commit.
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT = join(ROOT, "data", "content-dates.json");

/** Route group (as used by app/sitemap.ts) -> main-content source paths. */
export const CONTENT_SOURCES = {
  "/": [
    "app/page.tsx",
    "components/home",
    "lib/home-copy.ts",
    "lib/services.ts",
    "lib/pricing.ts",
    "lib/visuals.ts",
    "lib/new-visuals.ts",
    "lib/portfolio.ts",
    "lib/service-carousel.ts",
    "lib/seo-copy.ts",
  ],
  "/services": [
    "app/services/page.tsx",
    "components/home/ServicePreview.tsx",
    "components/services",
    "lib/services.ts",
    "lib/specialisms.ts",
    "lib/pricing.ts",
    "lib/seo-copy.ts",
  ],
  "/services/[slug]": [
    "app/services/[slug]",
    "components/home/ServicePreview.tsx",
    "components/home/ServiceProof.tsx",
    "components/services",
    "lib/services.ts",
    "lib/specialisms.ts",
    "lib/pricing.ts",
    "lib/visuals.ts",
    "lib/new-visuals.ts",
    "lib/portfolio.ts",
    "lib/seo-copy.ts",
  ],
  // One group per specialism page (lib/specialisms.ts drives their breadcrumbs).
  "/services/cad/interior-fit-out-shop-drawings": ["app/services/cad/interior-fit-out-shop-drawings", "lib/specialisms.ts"],
  "/services/growth/middle-east-market-intelligence": ["app/services/growth/middle-east-market-intelligence", "lib/specialisms.ts"],
  "/services/visualisation/photorealistic-furniture-rendering": [
    "app/services/visualisation/photorealistic-furniture-rendering",
    "lib/specialisms.ts",
  ],
  "/work/[slug]": ["app/work/[slug]", "components/work", "lib/case-studies.ts"],
  "/company": ["app/company/page.tsx", "components/company", "lib/company-copy.ts", "lib/company.ts", "lib/seo-copy.ts"],
  "/company/people": ["app/company/people", "lib/company.ts", "lib/seo-copy.ts"],
  "/company/locations": ["app/company/locations", "lib/company.ts"],
  "/careers": ["app/careers", "components/forms/TalentForm.tsx", "lib/company.ts", "lib/seo-copy.ts"],
  "/contact": ["app/contact", "components/forms/EnquiryForm.tsx", "lib/enquiry.ts", "lib/site.ts", "lib/seo-copy.ts"],
  "/legal/[slug]": ["app/legal"],
};

function git(args) {
  return execFileSync("git", args, { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
}

function assertCompleteHistory() {
  let shallow;
  try {
    shallow = git(["rev-parse", "--is-shallow-repository"]);
  } catch {
    throw new Error("Not a Git checkout: content dates can only be derived from Git history.");
  }
  if (shallow !== "false") {
    throw new Error("Shallow clone: run `git fetch --unshallow` (or checkout with fetch-depth: 0) first.");
  }
}

/** Latest committed change to any of the paths, as an ISO-8601 UTC string. */
export function lastCommitDate(paths) {
  for (const path of paths) {
    if (!existsSync(join(ROOT, path))) throw new Error(`Content source does not exist: ${path}`);
  }
  const value = git(["log", "-1", "--format=%cI", "--", ...paths.map((p) => `:(literal)${p}`)]);
  if (!value || !Number.isFinite(Date.parse(value))) return undefined;
  return new Date(value).toISOString();
}

export function computeContentDates() {
  assertCompleteHistory();
  const groups = {};
  for (const [group, sources] of Object.entries(CONTENT_SOURCES)) {
    const lastModified = lastCommitDate(sources);
    if (!lastModified) throw new Error(`No commit found for ${group} (${sources.join(", ")})`);
    groups[group] = { lastModified, sources };
  }
  return {
    $comment:
      "Generated by scripts/generate-content-dates.mjs from Git history (latest commit touching each group's main-content sources). Do not edit by hand; run `npm run content:dates`.",
    groups,
  };
}

function readCurrent() {
  try {
    return JSON.parse(readFileSync(OUTPUT, "utf8"));
  } catch {
    return null;
  }
}

function check({ strict }) {
  const expected = computeContentDates();
  const current = readCurrent();
  if (!current?.groups) {
    console.error(`::error file=data/content-dates.json::Missing or unreadable. Run npm run content:dates.`);
    return 1;
  }
  let missing = 0;
  let stale = 0;
  for (const [group, { lastModified }] of Object.entries(expected.groups)) {
    const recorded = current.groups[group]?.lastModified;
    if (!recorded) {
      missing++;
      console.error(`::error file=data/content-dates.json::No lastmod recorded for ${group}. Run npm run content:dates.`);
    } else if (recorded !== lastModified) {
      stale++;
      console.log(`::warning file=data/content-dates.json::${group} records ${recorded} but its sources last changed ${lastModified}. Run npm run content:dates and commit the file.`);
    }
  }
  if (missing || (strict && stale)) return 1;
  console.log(`Content dates checked: ${Object.keys(expected.groups).length} groups, ${stale} stale.`);
  return 0;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    if (process.argv.includes("--check")) {
      process.exitCode = check({ strict: process.argv.includes("--strict") });
    } else {
      const data = computeContentDates();
      writeFileSync(OUTPUT, `${JSON.stringify(data, null, 2)}\n`);
      console.log(`Wrote ${Object.keys(data.groups).length} content dates to data/content-dates.json`);
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}
