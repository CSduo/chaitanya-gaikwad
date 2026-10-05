import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

/**
 * Production hosts that serve this deployment but must never compete with the
 * canonical domain. Only stable production aliases belong here: preview and
 * branch deployments (hosts containing "-git-" or a deployment hash) are left
 * alone so reviewers can still open them.
 *
 * - www.xiyato.uk: custom-domain alias.
 * - chaitanya-gaikwad.vercel.app: the Vercel project's public production alias
 *   (served full 200 duplicates of every page before this rule).
 * - chaitanya-gaikwad-xiyatosaanvi-2995s-projects.vercel.app: the team-scoped
 *   production alias (currently behind Vercel authentication; redirected for
 *   the day that protection is lifted).
 */
export const NON_CANONICAL_PRODUCTION_HOSTS = [
  "www.xiyato.uk",
  "chaitanya-gaikwad.vercel.app",
  "chaitanya-gaikwad-xiyatosaanvi-2995s-projects.vercel.app",
] as const;

/** `has.value` is an anchored regular expression, so dots are escaped. */
const hostPattern = (host: string) => host.replaceAll(".", "\\.");

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 430, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [64, 96, 128, 200, 256, 384, 512],
  },

  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        // Long-lived immutable caching for static media served from /public.
        source: "/media/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // Research data previews and redacted workbook downloads are supporting
        // files for the research pages, not documents to rank on their own.
        source: "/media/:folder(data|downloads)/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
    ];
  },

  async redirects() {
    return [
      // ---- Host canonicalisation (www and production *.vercel.app -> apex) ----
      // /api/* is excluded so platform callers that use a deployment alias
      // (for example the scheduled cleanup cron) are never answered with a 308.
      ...NON_CANONICAL_PRODUCTION_HOSTS.map((host) => ({
        source: "/:path((?!api(?:/|$)).*)",
        has: [{ type: "host" as const, value: hostPattern(host) }],
        destination: "https://xiyato.uk/:path",
        permanent: true,
      })),

      // ---- Legacy path redirects (see REDIRECT_MAP_FINAL.md) ----
      { source: "/cad-automation", destination: "/services/cad-technical-production", permanent: true },
      { source: "/projects/videos", destination: "/services/ai-video-production", permanent: true },
      { source: "/projects/visualisations", destination: "/services/visualisation-image-production", permanent: true },
      { source: "/projects/b2b-research", destination: "/services/market-intelligence-research", permanent: true },
      { source: "/projects/b2b-research/:slug", destination: "/services/market-intelligence-research", permanent: true },
      { source: "/projects/websites", destination: "/services/website-design-development", permanent: true },
      // Legacy portfolio hubs now land on the /work portfolio hub.
      { source: "/projects", destination: "/work", permanent: true },
      { source: "/startup", destination: "/work", permanent: true },
      { source: "/about", destination: "/company", permanent: true },
      { source: "/company/about", destination: "/company", permanent: true },
      { source: "/legal", destination: "/legal/privacy", permanent: true },

      // ---- Service taxonomy canonicalisation & redirects ----
      // Parent paths implied by the specialism URLs (/services/<parent>/<page>).
      { source: "/services/visualisation", destination: "/services/visualisation-image-production", permanent: true },
      { source: "/services/cad", destination: "/services/cad-technical-production", permanent: true },
      { source: "/services/growth", destination: "/services/b2b-lead-generation", permanent: true },
      { source: "/services/growth-operations", destination: "/services/b2b-lead-generation", permanent: true },
      { source: "/services/growth-marketing-b2b", destination: "/services/b2b-lead-generation", permanent: true },
      { source: "/services/video-ai-film-editing", destination: "/services/ai-video-production", permanent: true },
      { source: "/services/visual-content", destination: "/services/visualisation-image-production", permanent: true },
      // /guides has no index page yet; its only guide stands in. Temporary (307), so a
      // future /guides hub can replace it without browsers holding a cached 308.
      { source: "/guides", destination: "/guides/freelancer-vs-3d-visualisation-studio", permanent: false },

      // ---- Legacy work category and project redirects (resolves 404s) ----
      { source: "/work/growth-b2b", destination: "/services/b2b-lead-generation", permanent: true },
      { source: "/work/automation", destination: "/services/automation-workflow-systems", permanent: true },
      { source: "/work/video", destination: "/services/ai-video-production", permanent: true },
      { source: "/work/visualisation", destination: "/services/visualisation-image-production", permanent: true },
      { source: "/work/websites", destination: "/services/website-design-development", permanent: true },
      { source: "/work/research", destination: "/work", permanent: true },
      { source: "/work/saudi-market-entry-lead-intelligence", destination: "/services/market-intelligence-research", permanent: true },
      { source: "/work/hotel-linen-export-market-programme", destination: "/services/b2b-lead-generation", permanent: true },
      { source: "/work/automotive-showroom-target-mapping", destination: "/work/research/automotive-showroom-lead-intelligence", permanent: true },

      // ---- Retired research workbook (removed Aug 2026; returned 404 with no redirect) ----
      { source: "/work/research/saudi-riyadh-jeddah-55-lead-intelligence", destination: "/services/growth/middle-east-market-intelligence", permanent: true },
    ];
  },
};

export default nextConfig;
