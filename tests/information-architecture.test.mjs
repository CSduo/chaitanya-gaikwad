/**
 * Information architecture and internal linking (2026-10 discoverability work).
 *
 * These assertions protect the link paths that let crawlers reach every
 * indexable page from a hub: specialism pages from their parent service and
 * /services, case studies from /work and their service pages, and the
 * canonical-only rules for breadcrumbs and redirects.
 */
import assert from "node:assert/strict";
import { test } from "node:test";
import { readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";
import { redirectSourcePattern } from "../scripts/seo-audit.ts";
import { SPECIALISMS, specialismsForService, specialismBreadcrumbTrail, specialismsByParent } from "../lib/specialisms.ts";
import { ALL_SERVICES } from "../lib/services.ts";
import { allCaseStudies, hubCaseStudies, caseStudyBreadcrumbTrail, WORK_HUB_PATH } from "../lib/case-studies.ts";
import { PRIMARY_NAV } from "../lib/site.ts";
import { CONTENT_SOURCES } from "../scripts/generate-content-dates.mjs";
import { collectionPageSchema } from "../lib/seo.ts";

// Default exports of CommonJS-compiled TypeScript arrive wrapped when imported from .mjs.
const unwrap = (mod) => (typeof mod.default === "object" && mod.default?.default !== undefined ? mod.default.default : mod.default);
const sitemap = unwrap(await import("../app/sitemap.ts"));
const nextConfig = unwrap(await import("../next.config.ts"));
const pathRules = (await nextConfig.redirects()).filter((rule) => !rule.has && !rule.missing);
const redirects = (path) => pathRules.some((rule) => redirectSourcePattern(rule.source).test(path));
const sitemapUrls = new Set(sitemap().map((entry) => entry.url));
const appDir = new URL("../app/", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");

test("every specialism page on disk is registered, so it is linked from its parent and /services", () => {
  // app/services/<parent>/<page>/page.tsx — the [slug] route is a single level.
  const onDisk = readdirSync(join(appDir, "services"))
    .filter((dir) => !dir.startsWith("[") && statSync(join(appDir, "services", dir)).isDirectory())
    .flatMap((parent) =>
      readdirSync(join(appDir, "services", parent))
        .filter((page) => existsSync(join(appDir, "services", parent, page, "page.tsx")))
        .map((page) => `/services/${parent}/${page}`),
    )
    .sort();
  assert.deepEqual(SPECIALISMS.map((s) => s.path).sort(), onDisk);
});

test("specialisms sit under a canonical parent, appear on it and in the sitemap, and breadcrumb Services > parent > page", () => {
  const canonical = new Set(ALL_SERVICES.map((s) => s.slug));
  const grouped = specialismsByParent().flatMap((g) => g.specialisms.map((s) => s.path));
  for (const specialism of SPECIALISMS) {
    assert.ok(canonical.has(specialism.parent), `${specialism.path}: parent ${specialism.parent} is not canonical`);
    assert.ok(specialismsForService(specialism.parent).includes(specialism), `${specialism.path} missing from its parent page`);
    assert.ok(grouped.includes(specialism.path), `${specialism.path} missing from /services`);
    assert.ok(sitemapUrls.has(`https://xiyato.uk${specialism.path}`), `${specialism.path} missing from the sitemap`);
    const trail = specialismBreadcrumbTrail(specialism);
    assert.deepEqual(trail.map((item) => item.path), ["/", "/services", `/services/${specialism.parent}`, specialism.path]);
    for (const item of trail) assert.ok(!redirects(item.path), `${specialism.path}: breadcrumb ${item.path} redirects`);
  }
  // Legacy slugs resolve to the canonical parent's specialisms.
  assert.deepEqual(specialismsForService("growth-marketing-b2b"), specialismsForService("b2b-lead-generation"));
});

test("parent paths implied by specialism URLs redirect to the parent service instead of 404ing", () => {
  for (const specialism of SPECIALISMS) {
    const impliedParent = specialism.path.split("/").slice(0, 3).join("/");
    const rule = pathRules.find((r) => r.source === impliedParent);
    assert.ok(rule, `${impliedParent} has no redirect`);
    assert.equal(rule.destination, `/services/${specialism.parent}`);
    assert.equal(rule.permanent, true);
    assert.ok(!redirects(rule.destination), `${impliedParent} -> ${rule.destination} is a chain`);
  }
});

test("/work is a real, indexable hub: no redirect, in the sitemap with a content group, and in the header", () => {
  assert.equal(WORK_HUB_PATH, "/work");
  assert.ok(!redirects("/work"), "/work must not redirect");
  assert.ok(existsSync(join(appDir, "work", "page.tsx")));
  assert.ok(sitemapUrls.has("https://xiyato.uk/work"));
  assert.ok(CONTENT_SOURCES["/work"]?.includes("app/work/page.tsx"));
  assert.equal(PRIMARY_NAV.find((item) => item.label === "Work")?.href, "/work");
});

test("legacy portfolio hubs land on /work in one hop", () => {
  for (const source of ["/projects", "/startup", "/work/research"]) {
    const rule = pathRules.find((r) => r.source === source);
    assert.equal(rule?.destination, "/work", source);
    assert.equal(rule.permanent, true);
  }
});

test("the hub lists every case study, visualisation first, and its ItemList matches what it shows", () => {
  const hub = hubCaseStudies();
  assert.deepEqual(hub.map((s) => s.slug).sort(), allCaseStudies().map((s) => s.slug).sort());
  assert.equal(hub[0].category, "visualisation");
  const schema = collectionPageSchema({
    name: "n",
    description: "d",
    path: "/work",
    items: hub.map((s) => ({ name: s.projectName, path: `/work/${s.slug}` })),
  });
  assert.equal(schema["@type"], "CollectionPage");
  assert.equal(schema.mainEntity.numberOfItems, hub.length);
  assert.deepEqual(schema.mainEntity.itemListElement.map((i) => i.url), hub.map((s) => `https://xiyato.uk/work/${s.slug}`));
  for (const study of hub) {
    assert.ok(study.shortName && study.shortName.length <= 40, `${study.slug}: needs a short descriptive label`);
    assert.equal(caseStudyBreadcrumbTrail(study)[1].path, "/work");
  }
});
