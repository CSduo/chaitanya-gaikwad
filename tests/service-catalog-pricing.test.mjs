import { groupServices, CAROUSEL_INTERVAL_MS } from "../lib/service-carousel.ts";
import { existsSync } from "node:fs";
import { VISUALS, featuredVisuals } from "../lib/visuals.ts";
import assert from "node:assert/strict";
import test from "node:test";
import { ALL_SERVICES, SERVICES, SECONDARY_SERVICES, getService, serviceAnchor } from "../lib/services.ts";
import { PRIMARY_NAV } from "../lib/site.ts";
import { SERVICE_SEO } from "../lib/seo-copy.ts";
import { PRICING_TIERS, PRICING_NOTE, getServicePricing, getPricingWhatsAppHref } from "../lib/pricing.ts";
import sitemapModule from "../app/sitemap.ts";
import nextConfigModule from "../next.config.ts";

// tsx can expose CommonJS-transpiled TypeScript default exports as namespaces.
const sitemap = sitemapModule.default ?? sitemapModule;
const nextConfig = nextConfigModule.default ?? nextConfigModule;

const primarySlugs = [
  "visualisation-image-production",
  "ai-video-production",
  "website-design-development",
  "cad-technical-production",
  "b2b-lead-generation",
  "automation-workflow-systems",
];

test("primary catalog and navigation preserve the commissioned six-service order", () => {
  assert.deepEqual(SERVICES.map((service) => service.slug), primarySlugs);
  assert.deepEqual(SERVICES.map((service) => service.order), [1, 2, 3, 4, 5, 6]);
  const serviceLinks = PRIMARY_NAV.find((item) => item.href === "/services").children;
  assert.deepEqual(serviceLinks.slice(1, 7).map((item) => item.href), primarySlugs.map((slug) => `/services/${slug}`));
  assert.equal(PRIMARY_NAV[0].href, "/#capabilities");
});

test("specialist research remains a canonical, discoverable service", () => {
  assert.deepEqual(SECONDARY_SERVICES.map((service) => service.slug), ["market-intelligence-research"]);
  assert.equal(ALL_SERVICES.length, 7);
  assert.equal(new Set(ALL_SERVICES.map((service) => service.slug)).size, 7);
  assert.equal(getService("market-intelligence-research").slug, "market-intelligence-research");
  const serviceLinks = PRIMARY_NAV.find((item) => item.href === "/services").children;
  assert.ok(serviceLinks.some((item) => item.href === "/services/market-intelligence-research"));
});

test("every service keeps its canonical sitemap entry and distinct metadata", () => {
  const entries = sitemap();
  const titles = new Set();
  for (const service of ALL_SERVICES) {
    assert.equal(entries.filter((item) => item.url === `https://xiyato.uk/services/${service.slug}`).length, 1);
    assert.ok(SERVICE_SEO[service.slug]?.metaDescription);
    titles.add(SERVICE_SEO[service.slug].metaTitle);
  }
  assert.equal(titles.size, ALL_SERVICES.length);
});

test("automation is independent and legacy aliases still resolve", async () => {
  const automation = getService("automation-workflow-systems");
  assert.equal(automation.slug, "automation-workflow-systems");
  assert.equal(automation.process.length, 4);
  assert.ok(automation.groups.length > 0);
  assert.equal(serviceAnchor(automation.slug), "service-automation-workflow-systems");
  assert.equal(getService("growth-marketing-b2b").slug, "b2b-lead-generation");
  assert.equal(getService("video-ai-film-editing").slug, "ai-video-production");
  assert.equal(serviceAnchor("growth-marketing-b2b"), "service-b2b-lead-generation");
  assert.equal(serviceAnchor("video-ai-film-editing"), "service-ai-video-production");
  assert.equal(getService("not-a-service"), undefined);

  const redirects = await nextConfig.redirects();
  for (const service of ALL_SERVICES) {
    assert.ok(!redirects.some((rule) => rule.source === `/services/${service.slug}`), `${service.slug} must serve its own canonical page`);
  }
  for (const [source, destination] of [
    ["/services/growth-marketing-b2b", "/services/b2b-lead-generation"],
    ["/services/video-ai-film-editing", "/services/ai-video-production"],
    ["/projects/b2b-research", "/services/market-intelligence-research"],
    ["/work/automation", "/services/automation-workflow-systems"],
    ["/work", "/#capabilities"],
  ]) {
    assert.ok(redirects.some((rule) => rule.source === source && rule.destination === destination && rule.permanent));
  }
});

test("published starting prices and units match the commercial brief", () => {
  assert.deepEqual(PRICING_TIERS.map(({ id, amount, unit }) => [id, amount, unit]), [
    ["render", 10, "image"],
    ["reel", 25, "reel"],
    ["website", 250, "project"],
    ["lead-file", 20, "lead file"],
    ["marketing", 50, null],
    ["automation", 50, null],
  ]);
  assert.match(PRICING_NOTE, /USD/);
  assert.match(PRICING_NOTE, /agreed before work begins/);
  assert.deepEqual(getServicePricing("cad-technical-production"), []);
  assert.deepEqual(getServicePricing("market-intelligence-research"), []);
  assert.deepEqual(getServicePricing("b2b-lead-generation").map(({ id }) => id), ["lead-file", "marketing"]);
  assert.equal(getServicePricing("growth-marketing-b2b")[0].id, "lead-file");
  assert.equal(getServicePricing("video-ai-film-editing")[0].id, "reel");
});

test("price CTAs open correctly scoped enquiries rather than fictitious downloads", () => {
  for (const tier of PRICING_TIERS) {
    assert.equal(tier.currency, "USD");
    const url = new URL(tier.href);
    assert.equal(url.origin, "https://wa.me");
    assert.equal(url.pathname, "/447882746212");
    assert.ok(url.searchParams.get("text").includes(tier.name));
    assert.ok(url.searchParams.get("text").includes(tier.label));
    assert.match(url.searchParams.get("text"), /confirm the scope and delivery/);
    assert.ok(!/download/i.test(tier.cta));
    assert.ok(tier.note.length > 20);
    const indiaUrl = new URL(getPricingWhatsAppHref(tier, "india"));
    assert.equal(indiaUrl.pathname, "/917028311226");
  }
});


test("visualization collection leads with kitchens and artwork while retaining the archive", () => {
  const concepts = VISUALS.filter((item) => item.collection === "studio-concepts");
  const archive = VISUALS.filter((item) => !item.collection);
  assert.equal(concepts.length, 43);
  assert.equal(archive.length, 41);
  assert.deepEqual(VISUALS.slice(0, concepts.length), concepts);
  assert.ok(VISUALS[0].src.includes("kitchen"));
  assert.ok(featuredVisuals(8).some((item) => item.group === "artwork"));
  assert.equal(new Set(VISUALS.map((item) => item.src)).size, VISUALS.length);
  for (const item of VISUALS) assert.ok(existsSync(new URL('../public' + item.src, import.meta.url)), item.src);
});


test("service carousel rotates two complete groups without skipping or repeating services", () => {
  const groups = groupServices(SERVICES);
  assert.deepEqual(groups.map(group => group.map(service => service.slug)), [primarySlugs.slice(0, 3), primarySlugs.slice(3)]);
  assert.equal(CAROUSEL_INTERVAL_MS, 5000);
  assert.deepEqual(groupServices([]), []);
  assert.deepEqual(groupServices([1,2,3,4]), [[1,2,3],[4]]);
});
