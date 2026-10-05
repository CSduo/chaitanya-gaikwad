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
import { readdirSync, statSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { redirectSourcePattern } from "../scripts/seo-audit.ts";
import { SPECIALISMS, specialismsForService, specialismBreadcrumbTrail, specialismsByParent } from "../lib/specialisms.ts";
import { ALL_SERVICES } from "../lib/services.ts";
import { allCaseStudies, hubCaseStudies, caseStudyBreadcrumbTrail, caseStudiesForService, WORK_HUB_PATH } from "../lib/case-studies.ts";
import { conceptVisuals, renderVisuals, featuredRenders } from "../lib/visuals.ts";
import { PRIMARY_NAV } from "../lib/site.ts";
import { CONTENT_SOURCES } from "../scripts/generate-content-dates.mjs";
import { collectionPageSchema } from "../lib/seo.ts";
import { ROUTE_SEO } from "../lib/seo-copy.ts";
import { HOME_COPY } from "../lib/home-copy.ts";
import { getCaseStudy } from "../lib/case-studies.ts";

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

test("the 3D service page links its case study and submits only production renders to image search", () => {
  assert.ok(caseStudiesForService("visualisation-image-production").some((s) => s.slug === "interior-visualisation-studies"));
  const entry = sitemap().find((e) => e.url === "https://xiyato.uk/services/visualisation-image-production");
  const concepts = new Set(conceptVisuals().map((v) => `https://xiyato.uk${v.src}`));
  assert.ok(concepts.size > 0);
  assert.equal(entry.images.length, renderVisuals().length);
  assert.deepEqual(entry.images.filter((src) => concepts.has(src)), []);
  for (const v of featuredRenders(8)) assert.ok(!concepts.has(`https://xiyato.uk${v.src}`), `${v.src} is a concept, not a render`);
});

test("AI concept studies are labelled in alt text and follow the render portfolio in their own section", () => {
  for (const v of conceptVisuals()) assert.match(v.alt, /AI-generated concept study/, v.src);
  const source = readFileSync(new URL("../components/home/ServiceProof.tsx", import.meta.url), "utf8");
  const renders = source.indexOf("3D render portfolio");
  const concepts = source.indexOf("AI-assisted concept studies");
  assert.ok(renders > 0 && concepts > 0, "both gallery sections must be labelled");
  assert.ok(renders < concepts, "production renders must lead the gallery");
});

test("the homepage leads with 3D visualisation and film and links the 3D service, case study and furniture film", () => {
  assert.match(ROUTE_SEO.home.metaTitle, /^3D Visualisation & Film/);
  assert.match(ROUTE_SEO.home.metaDescription, /3D visualisation and film studio/);
  assert.match(HOME_COPY.h1, /^3D visualisation and film/);
  const page = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
  for (const slug of ["interior-visualisation-studies", "sultanah-moon-chair-cinematic-campaign", "bahrain-luxury-interior-cad-package"]) {
    assert.ok(getCaseStudy(slug), `${slug} no longer exists`);
    assert.ok(page.includes(`getCaseStudy("${slug}")`), `homepage no longer links ${slug}`);
  }
  // Supporting chapters link their specialisms, so specialism pages are reachable from the homepage.
  assert.match(page, /specialismsForService\(cad\.slug\)/);
  assert.match(page, /specialismsForService\(b2bLeadGen\.slug\)/);
  // Visualisation and film come before the supporting-capabilities carousel.
  assert.ok(page.indexOf("<VisualisationSection") < page.indexOf("<VideoSection"));
  assert.ok(page.indexOf("<VideoSection") < page.indexOf("<ServicesCarousel"));
});
