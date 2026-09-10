import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: ["*", "Bingbot"],
        allow: ["/", "/_next/static/", "/_next/image/"],
        disallow: ["/api/", "/admin/", "/admin"],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
