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

export const SERVICE_WHATSAPP_MESSAGES: Record<string, string> = {
  "cad-technical-production":
    "Hello XIYÀTO, I would like to discuss an outsourced CAD drafting package.",
  "growth-marketing-b2b":
    "Hello XIYÀTO, I would like to discuss B2B market research and lead generation.",
  "visualisation-image-production":
    "Hello XIYÀTO, I would like to discuss a 3D architectural or product visualisation project.",
  "video-ai-film-editing":
    "Hello XIYÀTO, I would like to discuss a cinematic video or product film production.",
  "automation-workflow-systems":
    "Hello XIYÀTO, I would like to discuss a business workflow automation system.",
  "website-design-development":
    "Hello XIYÀTO, I would like to discuss a custom website design and development project.",
};

/** The global "Start a project" action opens WhatsApp with a prefilled note. */
export const WHATSAPP = {
  uk: {
    number: "+44 7882 746212",
    tel: "tel:+447882746212",
    href: `https://wa.me/447882746212?text=${encodeURIComponent(PROJECT_MESSAGE)}`,
    plain: "https://wa.me/447882746212",
  },
  india: {
    number: "+91 70283 11226",
    tel: "tel:+917028311226",
    href: `https://wa.me/917028311226?text=${encodeURIComponent(PROJECT_MESSAGE)}`,
    plain: "https://wa.me/917028311226",
  },
} as const;

/** Helper to generate service-specific or custom prefilled WhatsApp deep-links */
export function getServiceWhatsAppHref(
  serviceSlug?: string,
  territory: "uk" | "india" = "uk",
): string {
  const baseNumber =
    territory === "uk" ? "447882746212" : "917028311226";
  const message =
    (serviceSlug && SERVICE_WHATSAPP_MESSAGES[serviceSlug]) || PROJECT_MESSAGE;
  return `https://wa.me/${baseNumber}?text=${encodeURIComponent(message)}`;
}


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
    id: "general",
    label: "Direct enquiries",
    purpose: "New briefs, scoping and production capacity.",
    email: "hello@xiyato.uk",
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
    value: "@xiyato.uk",
    href: "https://www.instagram.com/xiyato.uk/",
    secondary: false,
  },
];

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export type NavChild = { label: string; href: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

export const PRIMARY_NAV: NavItem[] = [
  { label: "Work", href: "/#capabilities" },
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
