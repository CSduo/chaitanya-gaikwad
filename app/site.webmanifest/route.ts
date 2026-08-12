import { SITE } from "@/lib/site";

export const dynamic = "force-static";

/**
 * Icons point at the static brand emblem cropped from the supplied logo
 * artwork, not at a generated letterform.
 */
export function GET() {
  const manifest = {
    name: `${SITE.name} — ${SITE.descriptor}`,
    short_name: SITE.nameAscii,
    description: SITE.defaultDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    lang: SITE.language,
    icons: [
      { src: "/brand/emblem-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/brand/emblem-256.png", sizes: "256x256", type: "image/png", purpose: "any" },
      { src: "/brand/emblem-180.png", sizes: "180x180", type: "image/png" },
    ],
  };

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: {
      "Content-Type": "application/manifest+json",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
