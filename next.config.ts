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
    ];
  },

  async redirects() {
    return [
      // ---- Legacy path redirects (see REDIRECT_MAP_FINAL.md) ----
      { source: "/cad-automation", destination: "/services/cad-technical-production", permanent: true },
      { source: "/projects/videos", destination: "/work?category=visual-content", permanent: true },
      { source: "/projects/visualisations", destination: "/work?category=visual-content", permanent: true },
      { source: "/projects/b2b-research", destination: "/work?category=growth-operations", permanent: true },
      { source: "/projects/b2b-research/:slug", destination: "/work?category=growth-operations", permanent: true },
      { source: "/projects/websites", destination: "/work?category=multi-disciplinary", permanent: true },
      { source: "/projects", destination: "/work", permanent: true },
      { source: "/startup", destination: "/work", permanent: true },
      { source: "/about", destination: "/company", permanent: true },
      { source: "/services/cad", destination: "/services/cad-technical-production", permanent: true },
      { source: "/company/about", destination: "/company", permanent: true },
      { source: "/legal", destination: "/legal/privacy", permanent: true },

      // ---- Service taxonomy expanded from three areas to six ----
      { source: "/services/growth-operations", destination: "/services/growth-marketing-b2b", permanent: true },
      // "Visual content" split into visualisation and video; visualisation was
      // the larger body of work, so it takes the legacy slug.
      { source: "/services/visual-content", destination: "/services/visualisation-image-production", permanent: true },
    ];
  },
};

export default nextConfig;
