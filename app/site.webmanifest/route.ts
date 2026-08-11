import { SITE } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const manifest = {
    name: `${SITE.name} — ${SITE.descriptor}`,
    short_name: SITE.nameAscii,
    description: SITE.defaultDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#faf8f5",
    theme_color: "#faf8f5",
    lang: SITE.language,
    icons: [
      { src: "/icon", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: {
      "Content-Type": "application/manifest+json",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
