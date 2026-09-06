import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { SERVICES } from "@/lib/services";
import { allCaseStudies } from "@/lib/case-studies";
import { allWorkbooks } from "@/lib/portfolio";
import { publishedLegalPages } from "@/lib/company";

export default function sitemap(): MetadataRoute.Sitemap {
  // Stable date representing the latest verified content update.
  // Must only be updated after meaningful content changes, not on every build.
  const lastContentUpdate = new Date("2026-09-06T00:00:00.000Z");
  const url = (p: string) => `${SITE.url}${p}`;

  const core: MetadataRoute.Sitemap = [
    { url: url("/"), lastModified: lastContentUpdate },
    { url: url("/services"), lastModified: lastContentUpdate },
    { url: url("/company"), lastModified: lastContentUpdate },
    { url: url("/company/people"), lastModified: lastContentUpdate },
    { url: url("/company/locations"), lastModified: lastContentUpdate },
    { url: url("/careers"), lastModified: lastContentUpdate },
    { url: url("/contact"), lastModified: lastContentUpdate },
  ];

  const services: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: url(`/services/${s.slug}`),
    lastModified: lastContentUpdate,
  }));

  const work: MetadataRoute.Sitemap = allCaseStudies().map((c) => ({
    url: url(`/work/${c.slug}`),
    lastModified: lastContentUpdate,
  }));

  const research: MetadataRoute.Sitemap = allWorkbooks().map((w) => ({
    url: url(`/work/research/${w.slug}`),
    lastModified: lastContentUpdate,
  }));

  // Unpublished legal routes are excluded — they 404 rather than existing as shells.
  const legal: MetadataRoute.Sitemap = publishedLegalPages().map((p) => ({
    url: url(`/legal/${p.slug}`),
    lastModified: lastContentUpdate,
  }));

  return [...core, ...services, ...work, ...research, ...legal];
}
