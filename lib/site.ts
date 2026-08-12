/**
 * Central site configuration.
 * Anything factual and unverified is left null so it renders nothing at all.
 * See IMPLEMENTATION_OPEN_FACTS.md for what the owner still needs to supply.
 */

export const SITE = {
  name: "XIYÀTO",
  /** Plain-ASCII form for metadata contexts where the accent may not survive. */
  nameAscii: "XIYATO",
  url: "https://xiyato.uk",
  descriptor:
    "Technical, creative and growth services for architecture firms, design businesses and international brands.",
  defaultDescription:
    "CAD and technical production, B2B growth, 3D visualisation, film, automation and websites for design practices, brands and manufacturers. UK and India.",
  locale: "en_GB",
  language: "en-GB",
  /** Owner-specified. Not derived from the current year. */
  copyrightYear: 2023,
} as const;

/* ------------------------------------------------------------------ */
/* Primary conversion channel                                          */
/* ------------------------------------------------------------------ */

const PROJECT_MESSAGE = "Hello XIYÀTO, I would like to discuss a project.";

/** The global "Start a project" action opens WhatsApp with a prefilled note. */
export const WHATSAPP = {
  uk: {
    number: "+44 7882 746212",
    href: `https://wa.me/447882746212?text=${encodeURIComponent(PROJECT_MESSAGE)}`,
    plain: "https://wa.me/447882746212",
  },
  india: {
    number: "+91 70283 11226",
    href: `https://wa.me/917028311226?text=${encodeURIComponent(PROJECT_MESSAGE)}`,
    plain: "https://wa.me/917028311226",
  },
} as const;

/* ------------------------------------------------------------------ */
/* Contact channels                                                    */
/* ------------------------------------------------------------------ */

export type ContactChannel = {
  id: "general" | "projects" | "careers" | "founder";
  label: string;
  purpose: string;
  /** null until a verified professional address is supplied. */
  email: string | null;
};

export const CONTACT_CHANNELS: ContactChannel[] = [
  {
    id: "projects",
    label: "Project enquiries",
    purpose: "New briefs, scoping and production capacity.",
    email: null,
  },
  {
    id: "general",
    label: "General enquiries",
    purpose: "Everything that is not a live project brief.",
    email: null,
  },
  {
    id: "careers",
    label: "Careers",
    purpose: "Applications, specialists and the talent network.",
    email: null,
  },
  {
    id: "founder",
    label: "Founder",
    purpose: "Direct line for partnership and commercial discussion.",
    email: null,
  },
];

export function publishedChannels(): ContactChannel[] {
  return CONTACT_CHANNELS.filter((c) => c.email !== null);
}

/* ------------------------------------------------------------------ */
/* Direct channels that are already verified and in use                */
/* ------------------------------------------------------------------ */

export type DirectChannel = {
  id: string;
  label: string;
  value: string;
  href: string;
  /** Secondary channels stay available but never dominate the interface. */
  secondary: boolean;
};

export const DIRECT_CHANNELS: DirectChannel[] = [
  {
    id: "whatsapp-uk",
    label: "United Kingdom",
    value: WHATSAPP.uk.number,
    href: WHATSAPP.uk.href,
    secondary: false,
  },
  {
    id: "whatsapp-in",
    label: "India",
    value: WHATSAPP.india.number,
    href: WHATSAPP.india.href,
    secondary: false,
  },
];

export const SOCIAL_CHANNELS: DirectChannel[] = [
  {
    id: "instagram",
    label: "Instagram",
    value: "@xiyato22",
    href: "https://www.instagram.com/xiyato22",
    secondary: false,
  },
];

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export type NavChild = { label: string; href: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

export const PRIMARY_NAV: NavItem[] = [
  { label: "Work", href: "/work" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Services Overview", href: "/services" },
      { label: "CAD & Technical Production", href: "/services/cad-technical-production" },
      { label: "Growth, Marketing & B2B", href: "/services/growth-marketing-b2b" },
      { label: "3D Visualisation & Image Production", href: "/services/visualisation-image-production" },
      { label: "Video, AI Film & Editing", href: "/services/video-ai-film-editing" },
      { label: "Website Design & Development", href: "/services/website-design-development" },
      { label: "Automation & Marketing Systems", href: "/services/automation-workflow-systems" },
    ],
  },
  {
    label: "Company",
    href: "/company",
    children: [
      { label: "Company", href: "/company" },
      { label: "Founder & People", href: "/company/people" },
      { label: "Locations", href: "/company/locations" },
    ],
  },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

/**
 * The global primary action opens WhatsApp directly — it is the fastest route
 * to a real conversation. The contact form remains for detailed briefs.
 */
export const PRIMARY_CTA = {
  label: "Start a project",
  href: WHATSAPP.uk.href,
  external: true,
} as const;

export const SECONDARY_CTA = {
  label: "Detailed enquiry",
  href: "/contact",
  external: false,
} as const;
