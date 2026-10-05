import type { Metadata } from "next";
import { SITE } from "./site";
import { ALL_SERVICES } from "./services";
import { founder } from "./company";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  /**
   * Keep the page live and its links crawlable, but out of the index
   * (robots "noindex, follow"). Such routes must also stay out of the sitemap.
   */
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
    Only the shared 1200x630 card has known dimensions. Route-specific images
    (for example a 7629x5389 CAD sheet) are emitted without width/height rather
    than with dimensions that do not match the file.
  */
  const ogImages = image
    ? [{ url: ogImage, alt: title }]
    : [{ url: ogImage, width: 1200, height: 630, alt: title }];

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
      ? { index: false, follow: true }
      : { index: true, follow: true, "max-image-preview": "large" },
    openGraph: {
      type,
      url,
      siteName: SITE.name,
      title,
      description,
      locale: SITE.locale,
      images: ogImages,
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
/*                                                                     */
/* One entity graph: the Organization, WebSite and founder Person each */
/* have a stable @id, and every other node (Service.provider,          */
/* CreativeWork.creator, Person.worksFor, WebSite.publisher) points at */
/* those ids instead of re-declaring an unlinked copy.                 */
/* No address, telephone-derived LocalBusiness, rating or review is    */
/* emitted: none is verified in this repository.                       */
/* ------------------------------------------------------------------ */

export const ORGANIZATION_ID = `${SITE.url}/#organization`;
export const WEBSITE_ID = `${SITE.url}/#website`;
/** The founder profile lives on /company/people. */
export const FOUNDER_ID = `${SITE.url}/company/people#founder`;

/**
 * External profiles that verifiably belong to XIYÀTO. Only real third-party
 * profiles belong here, never the site's own URL. Add LinkedIn, Behance,
 * Contra or similar once the owner confirms the exact profile URLs.
 */
export const ORGANIZATION_SAME_AS: string[] = ["https://www.instagram.com/xiyato.uk/"];

/** Founder's own external profiles. Empty until supplied by the owner. */
export const FOUNDER_SAME_AS: string[] = [];

/** One place for the countries the studio states it serves. */
const SERVED_COUNTRIES = [
  { name: "United Kingdom", code: "GB" },
  { name: "United States", code: "US" },
  { name: "United Arab Emirates", code: "AE" },
  { name: "Saudi Arabia", code: "SA" },
  { name: "Qatar", code: "QA" },
  { name: "India", code: "IN" },
] as const;

type CountryCode = (typeof SERVED_COUNTRIES)[number]["code"];

function countries(codes?: readonly CountryCode[]) {
  return SERVED_COUNTRIES.filter((c) => !codes || codes.includes(c.code)).map((c) => ({
    "@type": "Country",
    name: c.name,
    identifier: c.code,
  }));
}

/** Compact reference to the Organization node, safe to embed anywhere. */
export function organizationRef() {
  return { "@type": "Organization", "@id": ORGANIZATION_ID, name: SITE.name, url: SITE.url };
}

/** Stable @id for a service page's Service node. */
export function serviceId(path: string): string {
  return `${absoluteUrl(path)}#service`;
}

function founderNode() {
  const person = founder();
  return {
    "@type": "Person",
    "@id": FOUNDER_ID,
    name: person?.name ?? "Chaitanya Gaikwad",
    // Same role string as the /company/people page renders.
    jobTitle: person?.role ?? "Founder",
    url: absoluteUrl("/company/people"),
    ...(FOUNDER_SAME_AS.length ? { sameAs: FOUNDER_SAME_AS } : {}),
  };
}

function organizationNode() {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE.name,
    alternateName: [SITE.nameAscii, "Xiyato"],
    url: SITE.url,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/brand/emblem-512.png"),
      width: 512,
      height: 512,
    },
    image: absoluteUrl("/opengraph-image.png"),
    email: "hello@xiyato.uk",
    description: SITE.defaultDescription,
    sameAs: ORGANIZATION_SAME_AS,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+44 7882 746212",
        email: "hello@xiyato.uk",
        // Both published numbers are WhatsApp lines for new project enquiries.
        contactType: "sales",
        areaServed: ["GB", "US", "AE", "SA", "QA"],
        availableLanguage: ["English"],
      },
      {
        "@type": "ContactPoint",
        telephone: "+91 70283 11226",
        email: "hello@xiyato.uk",
        contactType: "sales",
        areaServed: ["IN", "AE", "SA"],
        availableLanguage: ["English", "Hindi", "Marathi"],
      },
    ],
    areaServed: countries(),
    founder: founderNode(),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${SITE.name} services`,
      itemListElement: ALL_SERVICES.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": serviceId(`/services/${service.slug}`),
          name: service.name,
          url: absoluteUrl(`/services/${service.slug}`),
          description: service.summary,
        },
      })),
    },
    knowsAbout: [
      "3D architectural visualisation and rendering",
      "Interior and product rendering",
      "AI video production and editing",
      "Website design and development",
      "CAD drafting and interior technical documentation",
      "B2B lead generation and market research",
      "Workflow automation",
    ],
  };
}

function webSiteNode() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE.name,
    alternateName: [SITE.nameAscii, "Xiyato"],
    url: SITE.url,
    inLanguage: SITE.language,
    publisher: { "@id": ORGANIZATION_ID },
  };
}

/** Organization node with its own @context (used in tests and standalone). */
export function organizationSchema() {
  return { "@context": "https://schema.org", ...organizationNode() };
}

/** WebSite node with its own @context. */
export function webSiteSchema() {
  return { "@context": "https://schema.org", ...webSiteNode() };
}

/** Site-level identity graph, emitted once from the root layout. */
export function siteGraphSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationNode(), webSiteNode()],
  };
}

/**
 * Founder identity. Only name, role, image and affiliation are asserted — the
 * properties the public page actually evidences. Shares FOUNDER_ID with the
 * Organization's founder reference so both resolve to one entity.
 */
export function personSchema(input: {
  name: string;
  role: string;
  path: string;
  image?: string;
  sameAs?: string[];
}) {
  const sameAs = input.sameAs ?? FOUNDER_SAME_AS;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": FOUNDER_ID,
    name: input.name,
    jobTitle: input.role,
    url: absoluteUrl(input.path),
    ...(input.image ? { image: absoluteUrl(input.image) } : {}),
    ...(sameAs.length ? { sameAs } : {}),
    worksFor: organizationRef(),
  };
}

export function serviceSchema(input: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
  /** Defaults to every country the studio states it serves. */
  areaServed?: readonly CountryCode[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": serviceId(input.path),
    name: input.name,
    serviceType: input.serviceType ?? input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    provider: organizationRef(),
    audience: {
      "@type": "Audience",
      audienceType: "Architectural practices, interior studios, developers, luxury brands",
    },
    areaServed: countries(input.areaServed),
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

/**
 * A portfolio index page. The ItemList names only the case studies the page
 * visibly links, in the order shown, so the markup matches the content.
 */
export function collectionPageSchema(input: {
  name: string;
  description: string;
  path: string;
  items: { name: string; path: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${absoluteUrl(input.path)}#collection`,
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    isPartOf: { "@id": WEBSITE_ID },
    publisher: organizationRef(),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: input.items.length,
      itemListElement: input.items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        url: absoluteUrl(item.path),
      })),
    },
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
    creator: organizationRef(),
  };
}
