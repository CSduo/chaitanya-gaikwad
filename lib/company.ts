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
      "CAD & technical production",
      "Growth, marketing & B2B",
      "3D visualisation & image production",
      "Video, AI film & editing",
      "Automation & workflow systems",
      "Website design & development",
    ],
    biography: [
      "XIYÀTO was built around a practical observation. A design, fit-out, furniture or property business rarely needs one thing at a time: the same project usually wants drawings, research, imagery, film, a website and a sensible way of running the admin around all of it. Bought separately, much of the cost lands in the handovers rather than the work itself, in the re-explaining, the mismatched files and the version that never reached the person who needed it. Chaitanya Gaikwad founded the studio to hold those disciplines in one place, under one person answerable for how they fit together.",
      "He works across all six of them rather than fronting them. Interior and fit-out documentation, market and buyer research, visualisation, short-form film, workflow systems and website builds are scoped, directed and reviewed by the same person, which is what allows a drawing package, the imagery that presents it and the site it eventually sits on to be planned as one piece of work rather than three unrelated ones. Specialists are engaged where an engagement calls for them, against a written brief and into the same review.",
      "What holds the standard steady is procedural rather than stylistic. Each engagement opens by separating what is confirmed from what is assumed and what is still missing, and that separation is recorded before production starts. Scoring methods are documented alongside research data. A dimension taken from a render rather than a measurement is flagged as provisional. Delivered drawing files are reopened and checked before they are issued. Where a system is built, the rules behind it are written down in ordinary language so your own people can run and amend it without calling us.",
      "Clients deal with him directly, from the first conversation through to handover. There is no account layer sitting between a brief and the person producing against it, which keeps the answer to \"where is this\" short and makes it unambiguous who is responsible when something needs correcting.",
    ],
    responsibilities: [
      "Scoping every engagement and confirming what is fixed, assumed or missing before production begins",
      "Production leadership across drawing packages, research systems and visual output",
      "Quality assurance and the final check before any package is issued",
      "Direct client communication throughout an engagement",
    ],
    image: {
      // Supplied portrait, cropped to 4:5 with no retouching. A 1:1 derivative
      // sits alongside it at /media/people/founder-1x1.jpg for compact contexts.
      src: "/media/people/founder-4x5.jpg",
      width: 1000,
      height: 1250,
      alt: "Chaitanya Gaikwad, founder of XIYÀTO, in a head-and-shoulders portrait facing the camera, wearing an open patterned shirt over a dark collared top against a plain pale wall.",
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
    title: "CAD & technical production",
    body: "CAD drafting, interior documentation, drawing coordination and technical QA.",
  },
  {
    title: "Growth, marketing & B2B",
    body: "Market research, prospect qualification, data structuring and outreach systems.",
  },
  {
    title: "3D visualisation & image production",
    body: "Interior, architectural and product imagery, material studies and campaign visuals.",
  },
  {
    title: "Video, AI film & editing",
    body: "Product and interior films, short-form edits, sequencing, grade and sound.",
  },
  {
    title: "Automation & workflow systems",
    body: "Workflow design, research and outreach automation, data organisation and tooling.",
  },
  {
    title: "Website design & development",
    body: "Content architecture, responsive front-end development, integrations and deployment.",
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
    description: "How XIYÀTO collects, uses and stores the information you submit through this website, including enquiry forms, and how to ask for it to be removed.",
    published: true,
  },
  {
    slug: "terms",
    title: "Terms of Use",
    description: "The terms on which XIYÀTO makes this website available, covering acceptable use, the ownership of published work and the limits of what is offered here.",
    published: true,
  },
  {
    slug: "cookies",
    title: "Cookie Policy",
    description:
      "How this website uses cookies and similar technologies, what each is used for, and how to control them in your browser.",
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
