import type { Metadata } from "next";
import { SITE } from "./site";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
};

/** Absolute URL on the canonical host. */
export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Builds route-specific metadata with a self-referencing canonical,
 * Open Graph and Twitter cards. Every route uses this — no route
 * inherits a generic site-wide title.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  noIndex = false,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image ? absoluteUrl(image) : absoluteUrl("/opengraph-image.png");

  /*
    The root layout appends "— XIYÀTO" via the title template. A written title
    that already carries the brand would otherwise be branded twice and run
    past the ~60-character SERP limit, so it is emitted absolutely instead.
  */
  const carriesBrand = title.includes(SITE.name) || title.includes(SITE.nameAscii);

  return {
    title: carriesBrand ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, "max-image-preview": "large" },
    openGraph: {
      type,
      url,
      siteName: SITE.name,
      title,
      description,
      locale: SITE.locale,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

/* ------------------------------------------------------------------ */
/* Structured data — only properties backed by verified facts.         */
/* ------------------------------------------------------------------ */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    legalName: SITE.name,
    alternateName: [SITE.nameAscii, "Xiyato", "Xiyato Studio", "Xiyato UK", "Xiyato India"],
    url: SITE.url,
    description: SITE.defaultDescription,
    sameAs: [
      "https://www.instagram.com/xiyato22",
      "https://xiyato.uk",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+44 7882 746212",
        contactType: "customer service",
        areaServed: ["GB", "US", "AE", "SA", "QA"],
        availableLanguage: ["English"],
      },
      {
        "@type": "ContactPoint",
        telephone: "+91 70283 11226",
        contactType: "technical support",
        areaServed: ["IN", "AE", "SA", "Worldwide"],
        availableLanguage: ["English", "Hindi", "Marathi"],
      },
    ],
    areaServed: [
      { "@type": "Country", name: "United Kingdom", identifier: "GB" },
      { "@type": "Country", name: "United States", identifier: "US" },
      { "@type": "Country", name: "United Arab Emirates", identifier: "AE" },
      { "@type": "Country", name: "Saudi Arabia", identifier: "SA" },
      { "@type": "Country", name: "Qatar", identifier: "QA" },
      { "@type": "Country", name: "India", identifier: "IN" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "XIYÀTO Commercial Production & Growth Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "CAD & Technical Production",
            url: absoluteUrl("/services/cad-technical-production"),
            description: "Outsourced CAD drafting for interior and fit-out teams: plans, elevations, RCPs and flooring setting-out, issued as editable DWG.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Growth, Marketing & B2B Research",
            url: absoluteUrl("/services/growth-marketing-b2b"),
            description: "Research-led B2B lead generation and market research: verified buyer shortlists, decision-maker mapping, and outreach workflows.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "3D Visualisation & Image Production",
            url: absoluteUrl("/services/visualisation-image-production"),
            description: "Photorealistic 3D interior, architectural and furniture visualisation produced from approved plans, materials and references.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Video, AI Film & Editing",
            url: absoluteUrl("/services/video-ai-film-editing"),
            description: "Cinematic short-form video production and editing for luxury furniture, interior design showrooms and architectural projects.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Website Design & Development",
            url: absoluteUrl("/services/website-design-development"),
            description: "High-performance custom Next.js website design and development for design studios, architecture practices and export manufacturers.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Automation & Workflow Systems",
            url: absoluteUrl("/services/automation-workflow-systems"),
            description: "Business process automation, CRM enquiry routing, WhatsApp lead capture and pipeline integrations built in existing tooling.",
          },
        },
      ],
    },
    logo: absoluteUrl("/brand/emblem-512.png"),
    image: absoluteUrl("/opengraph-image.png"),
    founder: {
      "@type": "Person",
      name: "Chaitanya Gaikwad",
      jobTitle: "Founder & Creative Production Lead",
      url: absoluteUrl("/company/people"),
    },
    knowsAbout: [
      "CAD drafting and technical production",
      "Outsourced AutoCAD drafting services",
      "Interior technical documentation and detailing",
      "B2B market research and lead intelligence",
      "3D architectural visualisation and rendering",
      "Photorealistic furniture product rendering",
      "Cinematic video production and AI video editing",
      "Marketing automation and CRM routing systems",
      "Website design and Next.js development",
    ],
  };
}

/** Site-level identity, emitted once from the root layout. */
export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    alternateName: [SITE.nameAscii, "Xiyato Studio"],
    url: SITE.url,
    inLanguage: SITE.language,
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      logo: absoluteUrl("/brand/emblem-512.png"),
    },
  };
}

/**
 * Founder identity. Only name, role and affiliation are asserted — the
 * properties a public page actually evidences.
 */
export function personSchema(input: {
  name: string;
  role: string;
  path: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: input.name,
    jobTitle: input.role,
    url: absoluteUrl(input.path),
    ...(input.image ? { image: absoluteUrl(input.image) } : {}),
    worksFor: { "@type": "Organization", name: SITE.name, url: SITE.url },
  };
}

export function serviceSchema(input: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    serviceType: input.serviceType ?? input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
    areaServed: [
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Country", name: "Saudi Arabia" },
      { "@type": "Place", name: "Worldwide" },
    ],
  };
}

export function videoObjectSchema(input: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  contentUrl: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: input.name,
    description: input.description,
    thumbnailUrl: absoluteUrl(input.thumbnailUrl),
    uploadDate: input.uploadDate,
    contentUrl: absoluteUrl(input.contentUrl),
  };
}


export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function caseStudySchema(input: {
  name: string;
  description: string;
  path: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    ...(input.image ? { image: absoluteUrl(input.image) } : {}),
    creator: { "@type": "Organization", name: SITE.name, url: SITE.url },
  };
}
