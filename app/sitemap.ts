import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { SERVICES } from "@/lib/services";
import { allCaseStudies } from "@/lib/case-studies";
import { allWorkbooks } from "@/lib/portfolio";
import { publishedLegalPages } from "@/lib/company";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (p: string) => `${SITE.url}${p}`;

  // Per Google Search Central guidelines: <lastmod> must reflect genuine content
  // modification dates rather than build timestamps. Pages that have not been
  // modified retain their genuine publication/update dates.
  const date20260906 = new Date("2026-09-06T00:00:00.000Z");
  const date20260829 = new Date("2026-08-29T00:00:00.000Z");
  const date20260815 = new Date("2026-08-15T00:00:00.000Z");
  const date20260812 = new Date("2026-08-12T00:00:00.000Z");
  const date20260811 = new Date("2026-08-11T00:00:00.000Z");

  const core: MetadataRoute.Sitemap = [
    { url: url("/"), lastModified: date20260829 },
    { url: url("/services"), lastModified: date20260812 },
    { url: url("/company"), lastModified: date20260812 },
    { url: url("/company/people"), lastModified: date20260812 },
    { url: url("/company/locations"), lastModified: date20260812 },
    { url: url("/careers"), lastModified: date20260812 },
    { url: url("/contact"), lastModified: date20260906 },
  ];

  const services: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: url(`/services/${s.slug}`),
    lastModified: date20260812,
  }));

  const subServices: MetadataRoute.Sitemap = [
    {
      url: url("/services/cad/interior-fit-out-shop-drawings"),
      lastModified: date20260906,
    },
    {
      url: url("/services/growth/middle-east-market-intelligence"),
      lastModified: date20260906,
    },
    {
      url: url("/services/visualisation/photorealistic-furniture-rendering"),
      lastModified: date20260906,
    },
  ];

  const work: MetadataRoute.Sitemap = allCaseStudies().map((c) => ({
    url: url(`/work/${c.slug}`),
    lastModified: date20260815,
  }));

  const research: MetadataRoute.Sitemap = allWorkbooks().map((w) => ({
    url: url(`/work/research/${w.slug}`),
    lastModified: date20260906,
  }));

  // Unpublished legal routes are excluded — they 404 rather than existing as shells.
  const legal: MetadataRoute.Sitemap = publishedLegalPages().map((p) => ({
    url: url(`/legal/${p.slug}`),
    lastModified: p.slug === "privacy" ? date20260906 : date20260811,
  }));

  return [...core, ...services, ...subServices, ...work, ...research, ...legal];
}
