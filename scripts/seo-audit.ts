import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { pathToFileURL } from "node:url";
import sitemap from "../app/sitemap";
import nextConfig from "../next.config";
import { SITE } from "../lib/site";

/** Live but deliberately excluded from the index (and from the sitemap). */
const NOINDEX_PREFIXES = ["/work/research/"];

function builtHtmlFiles(dir = ".next/server/app"): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? builtHtmlFiles(full) : full.endsWith(".html") ? [full] : [];
  });
}

function attributes(tag: string): Record<string, string> {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*["']([^"']*)["']/g)].map((m) => [m[1].toLowerCase(), m[2]]));
}

export function inspectPage(html: string, canonical: string, robotsHeader = "") {
  const errors: string[] = [];
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? "";
  const tags = [...html.matchAll(/<(?:meta|link)\b[^>]*>/gi)].map((m) => attributes(m[0]));
  const meta = (name: string) => tags.find((tag) => tag.name?.toLowerCase() === name)?.content ?? "";
  const description = meta("description").trim();
  const canonicalTags = tags.filter((tag) => tag.rel === "canonical");
  if (!title) errors.push("Missing page title");
  if (!description) errors.push("Missing meta description");
  let canonicalMatches = false;
  try { canonicalMatches = canonicalTags.length === 1 && new URL(canonicalTags[0].href).href === new URL(canonical).href; } catch { /* Report malformed canonical below. */ }
  if (!canonicalMatches) errors.push("Missing, duplicate or incorrect canonical URL");
  if (/\b(noindex|none)\b/i.test(`${meta("robots")} ${meta("googlebot")} ${robotsHeader}`)) errors.push("Indexable page contains noindex");
  if ([...html.matchAll(/<h1(?:\s|>)/gi)].length !== 1) errors.push("Expected one primary heading");
  if (!/<html\b[^>]*\blang=["'][^"']+["']/i.test(html)) errors.push("Missing document language");
  if (!meta("viewport")) errors.push("Missing mobile viewport");
  for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try { JSON.parse(match[1]); } catch { errors.push("Malformed JSON-LD structured data"); }
  }
  return { title, description, errors };
}

export function sitemapUrls(xml: string): string[] {
  // Only page <loc> elements, not image:loc entries.
  return [...xml.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/g)].map((m) => m[1].trim().replaceAll("&amp;", "&"));
}

/** Page URLs whose <url> entry has no <lastmod>. */
export function sitemapUrlsMissingLastmod(xml: string): string[] {
  return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)]
    .filter((m) => !/<lastmod>\s*[^<\s][^<]*<\/lastmod>/.test(m[1]))
    .map((m) => m[1].match(/<loc>\s*([^<]+)\s*<\/loc>/)?.[1]?.trim() ?? "(unknown)");
}

type RedirectRule = { source: string; has?: unknown[]; missing?: unknown[] };

/** Converts a path-only next.config redirect source into a RegExp. */
export function redirectSourcePattern(source: string): RegExp {
  const escaped = source
    .split("/")
    .map((segment) => {
      if (segment.startsWith(":")) return segment.endsWith("*") ? "?.*" : "[^/]+";
      return segment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    })
    .join("/");
  return new RegExp(`^${escaped}/?$`);
}

/**
 * Internal links that point at a URL next.config.ts permanently redirects.
 * Host-conditional rules (www, vercel.app aliases) are ignored: they never
 * apply to links on the canonical host.
 */
export function linksToRedirects(html: string, rules: RedirectRule[]): string[] {
  const patterns = rules.filter((r) => !r.has && !r.missing).map((r) => redirectSourcePattern(r.source));
  const hrefs = [...html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["']/gi)].map((m) => m[1].replaceAll("&amp;", "&"));
  return [...new Set(hrefs)].filter((href) => {
    if (!href.startsWith("/") || href.startsWith("//")) return false;
    const pathname = href.split(/[?#]/)[0];
    return patterns.some((pattern) => pattern.test(pathname));
  });
}

/**
 * /media paths (public/media) referenced by a page, including through the
 * image optimiser. Paths inside another directory, such as Next's own
 * /_next/static/media/ font files, are not public/media references.
 */
export function mediaReferences(html: string): string[] {
  const decoded = html.replace(/%2F/gi, "/");
  return [...new Set([...decoded.matchAll(/(?<![A-Za-z0-9_.-])\/media\/[A-Za-z0-9_./-]+\.[A-Za-z0-9]+/g)].map((m) => m[0]))];
}

async function fetchText(url: string) {
  const response = await fetch(url, { redirect: "manual", signal: AbortSignal.timeout(20_000), headers: { "User-Agent": "XIYATO-SEO-Health/1.0" } });
  if (response.status !== 200) throw new Error(`${url}: expected HTTP 200, got ${response.status}`);
  return { text: await response.text(), robots: response.headers.get("x-robots-tag") ?? "" };
}

export async function audit(live = false) {
  const entries = sitemap();
  const errors: string[] = [];
  const titles = new Map<string, string>();
  const descriptions = new Map<string, string>();
  const sitemapText = live ? (await fetchText(`${SITE.url}/sitemap.xml`)).text : readFileSync(".next/server/app/sitemap.xml.body", "utf8");
  const urls = sitemapUrls(sitemapText);
  if (urls.length !== new Set(urls).size) errors.push("Duplicate sitemap URLs");
  const expected = new Set(entries.map((entry) => entry.url));
  if (urls.length !== expected.size || urls.some((url) => !expected.has(url))) errors.push("Deployed/built sitemap differs from the canonical route catalog");
  for (const url of sitemapUrlsMissingLastmod(sitemapText)) errors.push(`Sitemap entry without <lastmod>: ${url} (run npm run content:dates)`);
  for (const url of urls) {
    if (NOINDEX_PREFIXES.some((prefix) => new URL(url).pathname.startsWith(prefix))) errors.push(`Noindexed route listed in sitemap: ${url}`);
  }
  if (live) {
    const robots = (await fetchText(`${SITE.url}/robots.txt`)).text;
    if (!robots.includes(`Sitemap: ${SITE.url}/sitemap.xml`)) errors.push("robots.txt does not advertise sitemap.xml");
    if (/^Disallow:\s*\/\s*$/mi.test(robots)) errors.push("robots.txt blocks the site root");
  }
  for (const url of urls) {
    const parsed = new URL(url);
    if (parsed.origin !== SITE.url || parsed.search || parsed.hash) {
      errors.push(`Noncanonical sitemap URL: ${url}`);
      continue;
    }
    const pathname = parsed.pathname;
    try {
      const page = live ? await fetchText(url) : { text: readFileSync(join(".next/server/app", pathname === "/" ? "index.html" : `${pathname.slice(1)}.html`), "utf8"), robots: "" };
      const result = inspectPage(page.text, url, page.robots);
      errors.push(...result.errors.map((error) => `${pathname}: ${error}`));
      for (const [label, value, seen] of [["title", result.title, titles], ["description", result.description, descriptions]] as const) {
        if (value && seen.has(value)) errors.push(`${pathname}: duplicate ${label} shared with ${seen.get(value)}`);
        seen.set(value, pathname);
      }
    } catch (error) {
      errors.push(error instanceof Error ? error.message : `${pathname}: unable to read page`);
    }
  }
  if (!live) errors.push(...(await auditBuiltHtml()));
  if (errors.length) throw new Error(`SEO audit failed:\n${errors.join("\n")}`);
  console.log(`SEO audit passed: ${urls.length} ${live ? "production" : "built"} pages; canonical URLs, metadata, headings, indexability, structured-data syntax and sitemap lastmod checked${live ? "" : "; internal links, media files and noindex routes checked across all prerendered pages"}.`);
}

/**
 * Checks across every prerendered page, not only sitemap URLs: no internal link
 * may point at a redirect source, every referenced /media file must exist, and
 * noindexed routes must actually carry noindex.
 */
async function auditBuiltHtml(): Promise<string[]> {
  const errors: string[] = [];
  const rules = nextConfig.redirects ? await nextConfig.redirects() : [];
  for (const file of builtHtmlFiles()) {
    const route = `/${relative(".next/server/app", file).replaceAll("\\", "/").replace(/\.html$/, "").replace(/^index$/, "")}`;
    const html = readFileSync(file, "utf8");
    for (const href of linksToRedirects(html, rules)) errors.push(`${route}: links to redirecting URL ${href}`);
    for (const media of mediaReferences(html)) {
      if (!existsSync(join("public", media))) errors.push(`${route}: references missing file ${media}`);
    }
    if (NOINDEX_PREFIXES.some((prefix) => route.startsWith(prefix)) && !/<meta name="robots" content="noindex/.test(html)) {
      errors.push(`${route}: expected robots noindex`);
    }
  }
  return errors;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  audit(process.argv.includes("--live")).catch((error) => { console.error(error.message); process.exitCode = 1; });
}
