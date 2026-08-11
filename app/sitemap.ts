import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { SERVICES } from "@/lib/services";
import { allCaseStudies } from "@/lib/case-studies";
import { publishedLegalPages } from "@/lib/company";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (p: string) => `${SITE.url}${p}`;

  const core: MetadataRoute.Sitemap = [
    { url: url("/"), lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: url("/work"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: url("/services"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: url("/company"), lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: url("/company/people"), lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: url("/company/locations"), lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: url("/careers"), lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: url("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.8 },
  ];

  const services: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: url(`/services/${s.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: s.order === 1 ? 0.9 : 0.8,
  }));

  const work: MetadataRoute.Sitemap = allCaseStudies().map((c) => ({
    url: url(`/work/${c.slug}`),
    lastModified: now,
    changeFrequency: "yearly",
    priority: c.featured ? 0.8 : 0.6,
  }));

  // Unpublished legal routes are excluded — they 404 rather than existing as shells.
  const legal: MetadataRoute.Sitemap = publishedLegalPages().map((p) => ({
    url: url(`/legal/${p.slug}`),
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.2,
  }));

  return [...core, ...services, ...work, ...legal];
}
