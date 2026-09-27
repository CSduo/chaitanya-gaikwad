import { readFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import sitemap from "../app/sitemap";
import { SITE } from "../lib/site";

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
  if (errors.length) throw new Error(`SEO audit failed:\n${errors.join("\n")}`);
  console.log(`SEO audit passed: ${urls.length} ${live ? "production" : "built"} pages; canonical URLs, metadata, headings, indexability and structured-data syntax checked.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  audit(process.argv.includes("--live")).catch((error) => { console.error(error.message); process.exitCode = 1; });
}
