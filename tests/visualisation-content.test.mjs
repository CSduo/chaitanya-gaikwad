/**
 * Visualisation demand pages and film markup (2026-10 content step).
 *
 * Protects: the hire-intent page and the freelancer-vs-studio guide being
 * indexable and linked from the places crawlers and buyers arrive; the guide's
 * Article markup crediting the founder and the studio; the hire page not
 * declaring a second, competing Service; new pages showing production renders
 * only; and every portfolio film being a real, indexable <video> with valid
 * VideoObject data.
 */
import assert from "node:assert/strict";
import { test } from "node:test";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { redirectSourcePattern } from "../scripts/seo-audit.ts";
import { CONTENT_SOURCES } from "../scripts/generate-content-dates.mjs";
import { HIRE_PATH, GUIDE_PATH, GUIDE_PUBLISHED } from "../lib/hire.ts";
import { PRIMARY_NAV } from "../lib/site.ts";
import { articleSchema, webPageSchema, videoObjectSchema, serviceId, FOUNDER_ID, ORGANIZATION_ID, WEBSITE_ID } from "../lib/seo.ts";
import { rendersByFile, conceptVisuals } from "../lib/visuals.ts";
import { VIDEOS, filmBySrc } from "../lib/portfolio.ts";
import { getSpecialism, specialismsForService } from "../lib/specialisms.ts";

const unwrap = (mod) => (typeof mod.default === "object" && mod.default?.default !== undefined ? mod.default.default : mod.default);
const sitemap = unwrap(await import("../app/sitemap.ts"));
const nextConfig = unwrap(await import("../next.config.ts"));
const pathRules = (await nextConfig.redirects()).filter((rule) => !rule.has && !rule.missing);
const redirects = (path) => pathRules.some((rule) => redirectSourcePattern(rule.source).test(path));
const sitemapUrls = new Set(sitemap().map((entry) => entry.url));
const source = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const ROOT = new URL("../", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");

const NEW_PAGES = [
  { path: HIRE_PATH, file: "app/hire-a-3d-visualiser/page.tsx" },
  { path: GUIDE_PATH, file: "app/guides/freelancer-vs-3d-visualisation-studio/page.tsx" },
  { path: "/services/visualisation/interior-rendering", file: "app/services/visualisation/interior-rendering/page.tsx" },
];

test("each new page exists, is not redirected, and is in the sitemap with its own content-date group", () => {
  for (const { path, file } of NEW_PAGES) {
    assert.ok(existsSync(join(ROOT, file)), `${file} missing`);
    assert.ok(!redirects(path), `${path} must not redirect`);
    assert.ok(sitemapUrls.has(`https://xiyato.uk${path}`), `${path} not in sitemap`);
    const dir = file.replace(/\/page\.tsx$/, "");
    assert.ok(CONTENT_SOURCES[path]?.includes(dir), `${path} needs a CONTENT_SOURCES group covering ${dir}`);
  }
});

test("the interior page is a registered 3D specialism, so its parent and /services link it", () => {
  const interior = getSpecialism("/services/visualisation/interior-rendering");
  assert.equal(interior?.parent, "visualisation-image-production");
  assert.ok(specialismsForService("visualisation-image-production").includes(interior));
});

test("/guides does not 404: it forwards to the guide until a guides index exists", () => {
  const rule = pathRules.find((r) => r.source === "/guides");
  assert.equal(rule?.destination, GUIDE_PATH);
  assert.equal(rule.permanent, false, "temporary, so a later /guides hub is not shadowed by a cached 308");
});

test("the hire page and guide are linked from the header, footer, /services, the 3D page, /work and the homepage", () => {
  const services = PRIMARY_NAV.find((item) => item.label === "Services");
  assert.ok(services?.children?.some((c) => c.href === HIRE_PATH), "header Services menu must link the hire page");
  const footer = source("components/site/Footer.tsx");
  assert.match(footer, /href=\{HIRE_PATH\}/);
  assert.match(footer, /href=\{GUIDE_PATH\}/);
  const hireLinks = source("components/services/HireLinks.tsx");
  assert.match(hireLinks, /HIRE_PATH/);
  assert.match(hireLinks, /GUIDE_PATH/);
  assert.match(source("app/services/page.tsx"), /<HireLinks \/>/);
  const servicePage = source("app/services/[slug]/page.tsx");
  assert.match(servicePage, /service\.slug === "visualisation-image-production" \? \(\s*<Section id="hire"/);
  assert.match(source("app/work/page.tsx"), /href: HIRE_PATH/);
  assert.match(source("app/page.tsx"), /href: HIRE_PATH/);
  // The pages link each other, the 3D service, /work and the contact form with the visualisation service preselected.
  const hire = source("app/hire-a-3d-visualiser/page.tsx");
  for (const needle of ["GUIDE_PATH", "/services/visualisation-image-production", "/work", "/contact?service=visualisation-image-production"]) {
    assert.ok(hire.includes(needle), `hire page must link ${needle}`);
  }
  const guide = source("app/guides/freelancer-vs-3d-visualisation-studio/page.tsx");
  for (const needle of ["HIRE_PATH", "/services/visualisation-image-production", "/work"]) {
    assert.ok(guide.includes(needle), `guide must link ${needle}`);
  }
});

test("the guide's Article markup credits the founder and the studio, dated as printed", () => {
  const article = articleSchema({ headline: "h", description: "d", path: GUIDE_PATH, datePublished: GUIDE_PUBLISHED });
  assert.equal(article["@type"], "Article");
  assert.equal(article.author["@id"], FOUNDER_ID);
  assert.equal(article.publisher["@id"], ORGANIZATION_ID);
  assert.equal(article.isPartOf["@id"], WEBSITE_ID);
  assert.equal(article.datePublished, "2026-10-05");
  assert.equal(article.mainEntityOfPage["@id"], `https://xiyato.uk${GUIDE_PATH}`);
  const guide = source("app/guides/freelancer-vs-3d-visualisation-studio/page.tsx");
  assert.match(guide, /dateTime=\{GUIDE_PUBLISHED\}/, "the publication date must be visible on the page");
  assert.match(guide, /headline: HEADLINE/);
  assert.match(guide, /\{HEADLINE\}<\/h1>/, "Article headline must be the visible H1");
});

test("the hire page is a WebPage about the existing 3D Service, not a second Service; no FAQPage anywhere", () => {
  const page = webPageSchema({ name: "n", description: "d", path: HIRE_PATH, aboutId: serviceId("/services/visualisation-image-production") });
  assert.equal(page["@type"], "WebPage");
  assert.equal(page.about["@id"], "https://xiyato.uk/services/visualisation-image-production#service");
  const hire = source("app/hire-a-3d-visualiser/page.tsx");
  assert.ok(!hire.includes("serviceSchema("), "the hire page must not declare its own Service");
  const files = (dir) => readdirSync(dir).flatMap((f) => (statSync(join(dir, f)).isDirectory() ? files(join(dir, f)) : [join(dir, f)]));
  for (const file of [...files(join(ROOT, "app")), ...files(join(ROOT, "components")), ...files(join(ROOT, "lib"))].filter((f) => /\.tsx?$/.test(f))) {
    assert.ok(!readFileSync(file, "utf8").includes('"FAQPage"'), `${file}: FAQPage markup is not allowed`);
  }
});

test("new pages can only show production renders: rendersByFile refuses AI concepts and missing files", () => {
  assert.equal(rendersByFile(["vis-41.webp"])[0].src, "/media/visual/vis-41.webp");
  const concept = conceptVisuals()[0].src.replace("/media/visual/", "");
  assert.throws(() => rendersByFile([concept]), /AI concept study/);
  assert.throws(() => rendersByFile(["does-not-exist.webp"]), /No published visual/);
});

test("every portfolio film has an MP4 and poster on disk, an ISO upload date and an ISO duration", () => {
  assert.ok(VIDEOS.length >= 8);
  for (const film of VIDEOS) {
    assert.ok(existsSync(join(ROOT, "public", film.src)), `${film.src} missing`);
    assert.ok(existsSync(join(ROOT, "public", film.poster)), `${film.poster} missing`);
    assert.match(film.uploadDate, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/, `${film.slug} uploadDate`);
    assert.match(film.duration, /^PT(\d+M)?\d+S$/, `${film.slug} duration`);
    assert.equal(filmBySrc(film.src), film);
  }
});

test("films are real <video preload=\"none\"> elements whose VideoObject carries the required properties", () => {
  const player = source("components/work/FilmPlayer.tsx");
  assert.match(player, /<video[\s\S]*preload="none"[\s\S]*poster=\{poster\}/);
  assert.match(player, /<source src=\{film\.src\} type="video\/mp4" \/>/);
  assert.match(player, /videoObjectSchema\(/, "markup is emitted by the player, so only where the film plays");
  const film = VIDEOS[0];
  const schema = videoObjectSchema({ name: film.title, description: film.description, thumbnailUrl: film.poster, uploadDate: film.uploadDate, contentUrl: film.src, duration: film.duration });
  for (const key of ["name", "description", "thumbnailUrl", "uploadDate", "contentUrl", "duration"]) assert.ok(schema[key], key);
  assert.match(schema.contentUrl, /^https:\/\/xiyato\.uk\/media\/video\/.+\.mp4$/);
  assert.match(schema.thumbnailUrl, /^https:\/\/xiyato\.uk\/media\//);
  // The film gallery on the video service page and the /work hub use the real player.
  const proof = source("components/home/ServiceProof.tsx");
  assert.ok(!proof.includes("VideoGallery"), "the video service gallery must not be click-to-load");
  assert.match(proof, /<FilmPlayer film=\{film\}/);
  assert.match(source("app/work/page.tsx"), /<FilmPlayer film=\{v\}/);
  assert.match(source("app/work/[slug]/page.tsx"), /filmBySrc\(v\.src\)/);
});
