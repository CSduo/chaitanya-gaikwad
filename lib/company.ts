/**
 * People, locations, careers and legal publication state.
 * Every unverified fact is null/empty so the UI omits it rather than inventing it.
 */

/* ------------------------------------------------------------------ */
/* People                                                              */
/* ------------------------------------------------------------------ */

export type PersonType = "founder" | "team" | "specialist" | "advisor";

export type Person = {
  slug: string;
  name: string;
  role: string;
  type: PersonType;
  disciplines: string[];
  location?: string;
  biography: string[];
  responsibilities: string[];
  image?: { src: string; width: number; height: number; alt: string };
  links?: { label: string; href: string }[];
  visible: boolean;
  order: number;
};

export const PEOPLE: Person[] = [
  {
    slug: "chaitanya-gaikwad",
    name: "Chaitanya Gaikwad",
    role: "Founder",
    type: "founder",
    disciplines: [
      "Technical production",
      "Growth operations",
      "Visual content",
    ],
    biography: [
      "Chaitanya Gaikwad founded XIYÀTO to give design-led businesses a dependable external production partner — one that could absorb drawing work, research work and visual production without the overhead of adding permanent headcount.",
      "The work has run across interior and fit-out documentation, market research and outreach systems for cross-border businesses, and visualisation and film for furniture, hospitality and interior studios. That range is deliberate: the same projects usually need drawings, data and presentation material, and the handovers between them are where time is normally lost.",
    ],
    responsibilities: [
      "Scoping every engagement and confirming what is fixed, assumed or missing before production begins",
      "Production leadership across drawing packages, research systems and visual output",
      "Quality assurance and the final check before any package is issued",
      "Direct client communication throughout an engagement",
    ],
    image: {
      src: "/media/founder/portrait.jpg",
      width: 1024,
      height: 1016,
      alt: "Chaitanya Gaikwad, founder of XIYÀTO",
    },
    visible: true,
    order: 1,
  },
];

export function founder(): Person | undefined {
  return PEOPLE.find((p) => p.type === "founder" && p.visible);
}
export function teamMembers(): Person[] {
  return PEOPLE.filter((p) => p.type === "team" && p.visible).sort((a, b) => a.order - b.order);
}
export function specialists(): Person[] {
  return PEOPLE.filter((p) => (p.type === "specialist" || p.type === "advisor") && p.visible).sort(
    (a, b) => a.order - b.order,
  );
}

/* ------------------------------------------------------------------ */
/* Locations                                                           */
/* ------------------------------------------------------------------ */

export type LocationType = "correspondence" | "operations" | "registered-office" | "delivery-remote";

export const LOCATION_TYPE_LABELS: Record<LocationType, string> = {
  correspondence: "Correspondence",
  operations: "Operations",
  "registered-office": "Registered Office",
  "delivery-remote": "Delivery / Remote",
};

export type Location = {
  slug: string;
  name: string;
  country: string;
  /**
   * Only set once the classification is legally and factually accurate.
   * Left null deliberately — a UK presence must not be implied to be a
   * registered office, and no classification is published on assumption.
   */
  type: LocationType | null;
  /** Empty until a verified address is supplied. Never rendered as a placeholder. */
  addressLines: string[];
  summary: string;
  phone: string[];
  email: string | null;
  timezone?: string;
  mapEnabled: boolean;
  published: boolean;
  order: number;
};

export const LOCATIONS: Location[] = [
  {
    slug: "united-kingdom",
    name: "United Kingdom",
    country: "GB",
    type: null,
    addressLines: [],
    summary:
      "XIYÀTO's UK-facing presence handles client relationships and commercial contact for work delivered into the United Kingdom and Europe.",
    phone: ["+44 7882 746212"],
    email: null,
    timezone: "GMT / BST",
    mapEnabled: false,
    published: true,
    order: 1,
  },
  {
    slug: "india",
    name: "India",
    country: "IN",
    type: null,
    addressLines: [],
    summary:
      "Production runs from India, where drawing work, research and visual output are scheduled and delivered.",
    phone: ["+91 70283 11226"],
    email: null,
    timezone: "IST",
    mapEnabled: false,
    published: true,
    order: 2,
  },
];

export function publishedLocations(): Location[] {
  return LOCATIONS.filter((l) => l.published).sort((a, b) => a.order - b.order);
}

/* ------------------------------------------------------------------ */
/* Careers                                                             */
/* ------------------------------------------------------------------ */

export type EmploymentType = "permanent" | "contract" | "freelance-project";

export const EMPLOYMENT_LABELS: Record<EmploymentType, string> = {
  permanent: "Permanent",
  contract: "Contract",
  "freelance-project": "Freelance / project",
};

export type Role = {
  slug: string;
  title: string;
  employmentType: EmploymentType;
  discipline: string;
  location: string;
  status: "open" | "closed" | "always-accepting";
  summary: string;
};

/** No vacancy is invented. The zero state is the designed default. */
export const ROLES: Role[] = [];

export function openRoles(): Role[] {
  return ROLES.filter((r) => r.status === "open");
}
export function specialistRoles(): Role[] {
  return ROLES.filter((r) => r.status === "always-accepting");
}

export const DISCIPLINES = [
  {
    title: "Technical production",
    body: "CAD drafting, interior documentation, drawing coordination and technical QA.",
  },
  {
    title: "Growth operations",
    body: "Market research, prospect qualification, data structuring and outreach systems.",
  },
  {
    title: "Visual content",
    body: "Interior and product visualisation, short-form film, edit and presentation material.",
  },
];

/* ------------------------------------------------------------------ */
/* Legal publication state                                             */
/* ------------------------------------------------------------------ */

export type LegalPage = {
  slug: string;
  title: string;
  description: string;
  /**
   * When false: no footer link, no sitemap entry, and the route returns a
   * genuine 404 rather than an empty shell.
   */
  published: boolean;
};

export const LEGAL_PAGES: LegalPage[] = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    description: "How XIYÀTO handles the information submitted through this website.",
    published: true,
  },
  {
    slug: "terms",
    title: "Terms of Use",
    description: "The terms on which this website is made available.",
    published: true,
  },
  {
    slug: "cookies",
    title: "Cookie Policy",
    description: "How this website uses cookies and similar technologies.",
    // This site sets no cookies and runs no analytics, so there is nothing to disclose.
    published: false,
  },
  {
    slug: "accessibility",
    title: "Accessibility Statement",
    description: "XIYÀTO's accessibility commitments for this website.",
    // Publishes after a formal accessibility review.
    published: false,
  },
  {
    slug: "company-information",
    title: "Company Information",
    description: "Formal company and registration information for XIYÀTO.",
    // Remains inactive until genuine registration information exists.
    published: false,
  },
];

export function publishedLegalPages(): LegalPage[] {
  return LEGAL_PAGES.filter((p) => p.published);
}
export function getLegalPage(slug: string): LegalPage | undefined {
  return LEGAL_PAGES.find((p) => p.slug === slug);
}

/**
 * Formal registration identity. Stays null until supplied.
 * The footer legal block renders nothing at all while this is null.
 */
export const COMPANY_REGISTRATION: {
  legalName: string;
  registrationNumber: string;
  registeredOffice: string[];
  vatNumber?: string;
} | null = null;
