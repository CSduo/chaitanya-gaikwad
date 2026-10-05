import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { ALL_SERVICES } from "@/lib/services";
import { allCaseStudies } from "@/lib/case-studies";
import { publishedLegalPages } from "@/lib/company";
import { contentModified } from "@/lib/sitemap-dates";
import { VISUALS } from "@/lib/visuals";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (p: string) => `${SITE.url}${p}`;

  const modified = (...paths: string[]) => contentModified([
    ...paths, "lib/seo.ts", "lib/seo-copy.ts", "lib/site.ts", "app/layout.tsx", "components/site",
  ]);
  const serviceDate = modified("app/services", "lib/services.ts", "lib/pricing.ts", "lib/visuals.ts", "lib/new-visuals.ts", "lib/portfolio.ts");

  const core: MetadataRoute.Sitemap = [
    { url: url("/"), lastModified: modified("app/page.tsx", "components/home", "lib/home-copy.ts", "lib/services.ts", "lib/pricing.ts", "lib/visuals.ts", "lib/new-visuals.ts", "lib/portfolio.ts") },
    { url: url("/services"), lastModified: serviceDate },
    { url: url("/company"), lastModified: modified("app/company/page.tsx", "lib/company.ts") },
    { url: url("/company/people"), lastModified: modified("app/company/people", "lib/company.ts") },
    { url: url("/company/locations"), lastModified: modified("app/company/locations", "lib/company.ts") },
    { url: url("/careers"), lastModified: modified("app/careers", "components/forms", "lib/company.ts") },
    { url: url("/contact"), lastModified: modified("app/contact", "components/forms", "lib/site.ts") },
  ];

  const services: MetadataRoute.Sitemap = ALL_SERVICES.map((s) => ({
    url: url(`/services/${s.slug}`),
    lastModified: serviceDate,
    ...(s.slug === "visualisation-image-production" ? { images: VISUALS.map((visual) => url(visual.src)) } : {}),
  }));

  const subServices: MetadataRoute.Sitemap = [
    {
      url: url("/services/cad/interior-fit-out-shop-drawings"),
      lastModified: modified("app/services/cad/interior-fit-out-shop-drawings"),
    },
    {
      url: url("/services/growth/middle-east-market-intelligence"),
      lastModified: modified("app/services/growth/middle-east-market-intelligence"),
    },
    {
      url: url("/services/visualisation/photorealistic-furniture-rendering"),
      lastModified: modified("app/services/visualisation/photorealistic-furniture-rendering", "lib/visuals.ts", "lib/new-visuals.ts"),
    },
  ];

  const work: MetadataRoute.Sitemap = allCaseStudies().map((c) => ({
    url: url(`/work/${c.slug}`),
    lastModified: modified("app/work/[slug]", "lib/case-studies.ts"),
  }));

  // /work/research/* pages are noindex,follow and intentionally absent here.

  // Unpublished legal routes are excluded — they 404 rather than existing as shells.
  const legal: MetadataRoute.Sitemap = publishedLegalPages().map((p) => ({
    url: url(`/legal/${p.slug}`),
    lastModified: modified("app/legal", "lib/company.ts"),
  }));

  return [...core, ...services, ...subServices, ...work, ...legal];
}
