import { getService, type Service, type ServiceSlug } from "./services";

/**
 * Specialism pages: focused sub-service pages that sit under one parent
 * service. This registry is the single source for everything that links or
 * describes them, so a new specialism page is linked everywhere it should be
 * by adding one entry here:
 *  - the "Specialisms" block on its parent service page and on /services;
 *  - its breadcrumb trail (visible and BreadcrumbList JSON-LD);
 *  - its sitemap entry.
 *
 * Summaries describe what each page itself offers; they add no claims.
 */
export type Specialism = {
  path: string;
  /** Full name, used for link text and headings. */
  name: string;
  /** Short name, used as the final breadcrumb item. */
  shortName: string;
  parent: ServiceSlug;
  summary: string;
};

export const SPECIALISMS: Specialism[] = [
  {
    path: "/services/visualisation/photorealistic-furniture-rendering",
    name: "Photorealistic furniture 3D rendering",
    shortName: "Furniture 3D Rendering",
    parent: "visualisation-image-production",
    summary:
      "Material-accurate furniture CGI for catalogues, e-commerce and lifestyle scenes, for furniture brands, lighting designers and joinery studios.",
  },
  {
    path: "/services/cad/interior-fit-out-shop-drawings",
    name: "Interior fit-out and joinery shop drawings",
    shortName: "Interior Shop Drawings",
    parent: "cad-technical-production",
    summary:
      "Joinery and millwork details, setting-out and reflected ceiling plans for fit-out contractors, joinery makers and interior studios, issued as editable DWG.",
  },
  {
    path: "/services/growth/middle-east-market-intelligence",
    name: "Middle East B2B market intelligence",
    shortName: "Middle East Intelligence",
    parent: "b2b-lead-generation",
    summary:
      "Buyer and decision-maker research across the UAE, Saudi Arabia and Qatar for manufacturers, design studios and contractors entering the region.",
  },
];

export function getSpecialism(path: string): Specialism | undefined {
  return SPECIALISMS.find((s) => s.path === path);
}

/** Specialisms under a service. Legacy slugs resolve to their canonical service. */
export function specialismsForService(slug: string): Specialism[] {
  const service = getService(slug);
  if (!service) return [];
  return SPECIALISMS.filter((s) => s.parent === service.slug);
}

export function specialismParent(specialism: Specialism): Service {
  const parent = getService(specialism.parent);
  if (!parent) throw new Error(`Specialism ${specialism.path} has no parent service ${specialism.parent}`);
  return parent;
}

/**
 * Services > parent service > specialism, shared by the visible breadcrumb and
 * the BreadcrumbList JSON-LD so the two can never disagree.
 */
export function specialismBreadcrumbTrail(specialism: Specialism): { name: string; path: string }[] {
  const parent = specialismParent(specialism);
  return [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: parent.shortName, path: `/services/${parent.slug}` },
    { name: specialism.shortName, path: specialism.path },
  ];
}

/** Every specialism grouped under its parent, in the parent's catalogue order. */
export function specialismsByParent(): { parent: Service; specialisms: Specialism[] }[] {
  const parents = [...new Set(SPECIALISMS.map((s) => s.parent))]
    .map((slug) => getService(slug))
    .filter((s): s is Service => Boolean(s))
    .sort((a, b) => a.order - b.order);
  return parents.map((parent) => ({ parent, specialisms: SPECIALISMS.filter((s) => s.parent === parent.slug) }));
}
