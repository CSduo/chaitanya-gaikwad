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
    "@type": "ProfessionalService",
    name: SITE.name,
    alternateName: SITE.nameAscii,
    url: SITE.url,
    description: SITE.defaultDescription,
    areaServed: [
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "India" },
    ],
    logo: absoluteUrl("/brand/emblem-512.png"),
    image: absoluteUrl("/opengraph-image.png"),
    founder: { "@type": "Person", name: "Chaitanya Gaikwad" },
    knowsAbout: [
      "CAD drafting",
      "Interior technical documentation",
      "B2B market research",
      "Architectural visualisation",
      "Product visualisation",
      "Video production and editing",
      "Workflow automation",
      "Website design and development",
    ],
    // Deliberately absent: address, telephone, legalName, foundingDate,
    // numberOfEmployees, aggregateRating, award. None has been verified, and
    // structured data is not a place to guess.
  };
}

/** Site-level identity, emitted once from the root layout. */
export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    alternateName: SITE.nameAscii,
    url: SITE.url,
    inLanguage: SITE.language,
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
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
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
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
