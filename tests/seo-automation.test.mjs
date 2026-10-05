import assert from "node:assert/strict";
import { test } from "node:test";
import { generateKeyPairSync } from "node:crypto";
import { inspectPage, sitemapUrls } from "../scripts/seo-audit.ts";
import { submitGoogleSitemap } from "../scripts/submit-google-sitemap.ts";

// The fixture title carries the site's single separator and brand suffix, which the audit now requires.
const html = '<html lang="en-GB"><head><title>Interior renders | XIYÀTO</title><meta name="description" content="Interior and furniture rendering services."><meta name="viewport" content="width=device-width"><meta name="robots" content="index,follow"><link rel="canonical" href="https://xiyato.uk/"></head><body><h1>Interior renders</h1><script type="application/ld+json">{"@type":"Organization"}</script></body></html>';

test("audit catches crawl-blocking directives, incorrect canonicals and malformed structured data", () => {
  assert.deepEqual(inspectPage(html, "https://xiyato.uk/").errors, []);
  assert.match(inspectPage(html, "https://xiyato.uk/contact").errors.join(), /canonical/);
  assert.match(inspectPage(html, "https://xiyato.uk/", "googlebot: noindex").errors.join(), /noindex/);
  assert.match(inspectPage(html.replace('"index,follow"', '"none"'), "https://xiyato.uk/").errors.join(), /noindex/);
  assert.match(inspectPage(html.replace('{"@type":"Organization"}', "{broken}"), "https://xiyato.uk/").errors.join(), /JSON-LD/);
});

test("audit enforces title and description length and the single title separator", () => {
  const withTitle = (t) => html.replace("<title>Interior renders | XIYÀTO</title>", `<title>${t}</title>`);
  assert.deepEqual(inspectPage(withTitle("3D Visualisation &amp; Film for Interiors and Products | XIYÀTO"), "https://xiyato.uk/").errors, []);
  assert.match(inspectPage(withTitle(`${"x".repeat(52)} | XIYÀTO`), "https://xiyato.uk/").errors.join(), /Title is 61 characters/);
  assert.match(inspectPage(withTitle("Interior renders — XIYÀTO"), "https://xiyato.uk/").errors.join(), /single separator/);
  assert.match(inspectPage(withTitle("Moon Chair — Campaign | XIYÀTO"), "https://xiyato.uk/").errors.join(), /single separator/);
  const longDescription = html.replace("Interior and furniture rendering services.", "y".repeat(156));
  assert.match(inspectPage(longDescription, "https://xiyato.uk/").errors.join(), /156 characters/);
});

test("image sitemap entries are not mistaken for page URLs", () => {
  assert.deepEqual(sitemapUrls('<url><loc>https://xiyato.uk/</loc><image:image><image:loc>https://xiyato.uk/render.webp</image:loc></image:image></url>'), ["https://xiyato.uk/"]);
});

test("Google submission safely skips without credentials and uses the supported sitemap endpoint when configured", async () => {
  assert.equal(await submitGoogleSitemap({}, () => { throw new Error("Unexpected network request"); }), "skipped");
  const { privateKey } = generateKeyPairSync("rsa", { modulusLength: 2048 });
  const env = { GOOGLE_SEARCH_CONSOLE_CREDENTIALS: JSON.stringify({ client_email: "test@example.invalid", private_key: privateKey.export({ type: "pkcs8", format: "pem" }) }) };
  const calls = [];
  const fetchMock = async (url, options) => {
    calls.push({ url, options });
    return calls.length === 1 ? new Response(JSON.stringify({ access_token: "test-token" }), { status: 200 }) : new Response(null, { status: 204 });
  };
  assert.equal(await submitGoogleSitemap(env, fetchMock), "submitted");
  assert.equal(calls[0].url, "https://oauth2.googleapis.com/token");
  assert.equal(calls[1].options.method, "PUT");
  assert.equal(calls[1].url, "https://www.googleapis.com/webmasters/v3/sites/sc-domain%3Axiyato.uk/sitemaps/https%3A%2F%2Fxiyato.uk%2Fsitemap.xml");
  await assert.rejects(submitGoogleSitemap(env, async () => new Response(null, { status: 403 })), /authentication failed/);
  await assert.rejects(submitGoogleSitemap({ ...env, GOOGLE_SEARCH_CONSOLE_PROPERTY: "sc-domain:other.example" }, fetchMock), /canonical/);
});

/* ------------------------------------------------------------------ */
/* Discoverability regressions found in the 2026-10 audit              */
/* ------------------------------------------------------------------ */

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";
import { sitemapUrlsMissingLastmod, linksToRedirects, mediaReferences, redirectSourcePattern } from "../scripts/seo-audit.ts";
import { CONTENT_SOURCES } from "../scripts/generate-content-dates.mjs";
// Default exports of CommonJS-compiled TypeScript arrive wrapped when imported from .mjs.
const unwrap = (mod) => (typeof mod.default === "object" && mod.default?.default !== undefined ? mod.default.default : mod.default);
const sitemap = unwrap(await import("../app/sitemap.ts"));
const nextConfig = unwrap(await import("../next.config.ts"));
import { allCaseStudies, caseStudyBreadcrumbTrail } from "../lib/case-studies.ts";

const contentDates = JSON.parse(readFileSync(new URL("../data/content-dates.json", import.meta.url), "utf8"));

test("sitemap audit flags <url> entries without <lastmod>", () => {
  const xml = '<urlset><url><loc>https://xiyato.uk/</loc><lastmod>2026-10-05T00:00:00.000Z</lastmod></url><url><loc>https://xiyato.uk/contact</loc></url></urlset>';
  assert.deepEqual(sitemapUrlsMissingLastmod(xml), ["https://xiyato.uk/contact"]);
});

test("every sitemap URL has a Git-derived lastmod that is not in the future", () => {
  const now = Date.now();
  for (const entry of sitemap()) {
    assert.ok(entry.lastModified instanceof Date, `${entry.url} has no lastmod`);
    assert.ok(entry.lastModified.getTime() <= now, `${entry.url} lastmod is in the future`);
  }
});

test("data/content-dates.json covers every content group and every source exists", () => {
  assert.deepEqual(Object.keys(contentDates.groups).sort(), Object.keys(CONTENT_SOURCES).sort());
  for (const [group, sources] of Object.entries(CONTENT_SOURCES)) {
    for (const source of sources) assert.ok(existsSync(new URL(`../${source}`, import.meta.url)), `${group}: missing source ${source}`);
    assert.ok(Number.isFinite(Date.parse(contentDates.groups[group].lastModified)), `${group}: invalid date`);
  }
});

test("redirect-link audit catches legacy slugs and ignores host-only rules", async () => {
  const rules = await nextConfig.redirects();
  const html = '<a href="/services/growth-marketing-b2b">x</a><a href="/services/b2b-lead-generation">y</a><a href="/projects/b2b-research/abc?x=1">z</a><a href="/#capabilities">w</a><a href="https://xiyato.uk/work">e</a>';
  assert.deepEqual(linksToRedirects(html, rules), ["/services/growth-marketing-b2b", "/projects/b2b-research/abc?x=1"]);
  assert.ok(redirectSourcePattern("/projects/b2b-research/:slug").test("/projects/b2b-research/a"));
  assert.ok(!redirectSourcePattern("/projects").test("/projects-x"));
});

test("media audit decodes image-optimiser URLs", () => {
  const html = '<img src="/_next/image?url=%2Fmedia%2Fvisual%2Fvis-3.webp&amp;w=640&amp;q=75"><video src="/media/video/a.mp4">';
  assert.deepEqual(mediaReferences(html).sort(), ["/media/video/a.mp4", "/media/visual/vis-3.webp"]);
});

test("case-study breadcrumbs run Home > Work > the study's discipline > study, and never link a redirect", async () => {
  const rules = (await nextConfig.redirects()).filter((r) => !r.has);
  const expected = {
    "bahrain-luxury-interior-cad-package": "/services/cad-technical-production",
    "sultanah-moon-chair-cinematic-campaign": "/services/ai-video-production",
    "interior-visualisation-studies": "/services/visualisation-image-production",
  };
  for (const study of allCaseStudies()) {
    const trail = caseStudyBreadcrumbTrail(study);
    assert.equal(trail[0].path, "/");
    // The /work hub level was inserted above the discipline once the hub existed.
    assert.equal(trail[1].path, "/work");
    assert.equal(trail.at(-1).path, `/work/${study.slug}`);
    if (expected[study.slug]) assert.equal(trail[2].path, expected[study.slug], study.slug);
    for (const item of trail) {
      assert.ok(!rules.some((r) => redirectSourcePattern(r.source).test(item.path)), `${study.slug}: breadcrumb ${item.path} redirects`);
    }
  }
});

test("no page copy claims Anvikshiki (or anything else) is peer-reviewed", () => {
  const offenders = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) walk(full);
      else if (/\.(tsx?|mdx?)$/.test(entry) && /peer[- ]review/i.test(readFileSync(full, "utf8"))) offenders.push(full);
    }
  };
  for (const dir of ["app", "components", "lib"]) walk(new URL(`../${dir}`, import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
  assert.deepEqual(offenders, []);
});
