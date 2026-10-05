import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/**
 * One group for every crawler (Bingbot and Googlebot follow `*`), one sitemap.
 * No `Host:` line: it is a non-standard, Yandex-only directive. Host
 * canonicalisation is handled by 308 redirects in next.config.ts.
 *
 * The /_next allows are explicit on purpose: robots.txt once disallowed /_next/
 * and blocked CSS and JS from crawlers. "/_next/image" has no trailing slash so
 * it matches the optimiser URL (/_next/image?url=...).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/_next/static/", "/_next/image"],
        disallow: ["/api/", "/admin"],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
