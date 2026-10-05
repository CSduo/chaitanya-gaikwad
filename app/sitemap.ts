import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { ALL_SERVICES } from "@/lib/services";
import { SPECIALISMS } from "@/lib/specialisms";
import { allCaseStudies } from "@/lib/case-studies";
import { publishedLegalPages } from "@/lib/company";
import { renderVisuals } from "@/lib/visuals";
import { HIRE_PATH } from "@/lib/hire";
import contentDates from "@/data/content-dates.json";

type ContentGroup = keyof typeof contentDates.groups;

/**
 * lastmod comes from data/content-dates.json, generated from complete Git
 * history by scripts/generate-content-dates.mjs (Vercel builds from a shallow
 * clone, where Git dates cannot be trusted). A route whose group is unknown
 * gets no lastmod rather than a fabricated build timestamp.
 */
function lastModified(group: ContentGroup | string): Date | undefined {
  const value = (contentDates.groups as Record<string, { lastModified: string } | undefined>)[group]?.lastModified;
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isFinite(date.getTime()) ? date : undefined;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (p: string) => `${SITE.url}${p}`;

  const core: MetadataRoute.Sitemap = [
    { url: url("/"), lastModified: lastModified("/") },
    { url: url("/work"), lastModified: lastModified("/work") },
    { url: url("/services"), lastModified: lastModified("/services") },
    { url: url(HIRE_PATH), lastModified: lastModified(HIRE_PATH) },
    { url: url("/company"), lastModified: lastModified("/company") },
    { url: url("/company/people"), lastModified: lastModified("/company/people") },
    { url: url("/company/locations"), lastModified: lastModified("/company/locations") },
    { url: url("/careers"), lastModified: lastModified("/careers") },
    { url: url("/contact"), lastModified: lastModified("/contact") },
  ];

  const services: MetadataRoute.Sitemap = ALL_SERVICES.map((s) => ({
    url: url(`/services/${s.slug}`),
    lastModified: lastModified("/services/[slug]"),
    // Production renders only: AI-generated concept studies are shown on the page,
    // labelled, but are not submitted to image search as the studio's 3D work.
    ...(s.slug === "visualisation-image-production" ? { images: renderVisuals().map((visual) => url(visual.src)) } : {}),
  }));

  // Each specialism page is its own content group, keyed by its path.
  const subServices: MetadataRoute.Sitemap = SPECIALISMS.map(({ path }) => ({
    url: url(path),
    lastModified: lastModified(path),
  }));

  const work: MetadataRoute.Sitemap = allCaseStudies().map((c) => ({
    url: url(`/work/${c.slug}`),
    lastModified: lastModified("/work/[slug]"),
  }));

  // /work/research/* pages are noindex,follow and intentionally absent here.

  // Unpublished legal routes are excluded — they 404 rather than existing as shells.
  const legal: MetadataRoute.Sitemap = publishedLegalPages().map((p) => ({
    url: url(`/legal/${p.slug}`),
    lastModified: lastModified("/legal/[slug]"),
  }));

  return [...core, ...services, ...subServices, ...work, ...legal];
}
