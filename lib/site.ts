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
    "Technical production, growth operations and visual content for design-led businesses.",
  defaultDescription:
    "XIYÀTO is a specialist production studio delivering CAD and technical documentation, growth operations and visual content for architecture, interior, fit-out and furniture businesses.",
  locale: "en_GB",
  language: "en-GB",
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
    label: "WhatsApp (UK)",
    value: "+44 7882 746212",
    href: "https://wa.me/447882746212",
    secondary: true,
  },
  {
    id: "whatsapp-in",
    label: "WhatsApp (India)",
    value: "+91 70283 11226",
    href: "https://wa.me/917028311226",
    secondary: true,
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
      { label: "Growth Operations", href: "/services/growth-operations" },
      { label: "Visual Content", href: "/services/visual-content" },
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

export const PRIMARY_CTA = { label: "Start a project", href: "/contact" } as const;
