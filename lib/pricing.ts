import type { ServiceSlug } from "./services";
import { WHATSAPP } from "./site";

export type ServicePrice = {
  id: "render" | "reel" | "website" | "lead-file" | "marketing" | "automation";
  serviceSlug: ServiceSlug;
  name: string;
  amount: number;
  currency: "USD";
  unit: string | null;
  label: string;
  cta: string;
  href: string;
  note: string;
};

export const PRICING_NOTE =
  "Starting prices in USD. Final scope, quantities, revisions and delivery are agreed before work begins. Send your brief for a tailored quote.";

/** Every offer opens a scoped enquiry; this site does not take payment. */
export function getPricingWhatsAppHref(
  tier: Pick<ServicePrice, "name" | "label">,
  territory: "uk" | "india" = "uk",
): string {
  const message = `Hello XIYÀTO, I am interested in ${tier.name} (${tier.label}, USD). Please confirm the scope and delivery for my brief.`;
  return `${WHATSAPP[territory].plain}?text=${encodeURIComponent(message)}`;
}

const offers: Omit<ServicePrice, "currency" | "label" | "href">[] = [
  {
    id: "render",
    serviceSlug: "visualisation-image-production",
    name: "3D Visualization / Renders",
    amount: 10,
    unit: "image",
    cta: "Order a $10 Render",
    note: "Share your interior, furniture or product brief. Image complexity and source assets define the final scope.",
  },
  {
    id: "reel",
    serviceSlug: "ai-video-production",
    name: "AI Video Production",
    amount: 25,
    unit: "reel",
    cta: "Get a $25 Reel Concept",
    note: "Start with a brand or product idea. Duration, formats and production needs are agreed with your brief.",
  },
  {
    id: "website",
    serviceSlug: "website-design-development",
    name: "Website Development",
    amount: 250,
    unit: "project",
    cta: "Start a $250 Website",
    note: "Tell us the pages and features you need. Hosting, domains and third-party subscriptions are scoped separately.",
  },
  {
    id: "lead-file",
    serviceSlug: "b2b-lead-generation",
    name: "B2B Lead Generation",
    amount: 20,
    unit: "lead file",
    cta: "Request a $20 Lead File",
    note: "A scoped Excel dataset for your target market. Record count, fields and research depth are agreed before production.",
  },
  {
    id: "marketing",
    serviceSlug: "b2b-lead-generation",
    name: "Marketing Support",
    amount: 50,
    unit: null,
    cta: "Explore $50 Marketing Support",
    note: "Campaign planning, outreach copy or launch support, scoped to the work you need. Media spend is separate.",
  },
  {
    id: "automation",
    serviceSlug: "automation-workflow-systems",
    name: "Automation Campaigns",
    amount: 50,
    unit: null,
    cta: "Plan a $50 Automation",
    note: "Begin with one workflow. Integration complexity, ongoing support and software subscriptions are agreed separately.",
  },
];

export const PRICING_TIERS: ServicePrice[] = offers.map((offer) => {
  const label = `Starting at $${offer.amount}${offer.unit ? ` / ${offer.unit}` : ""}`;
  return { ...offer, currency: "USD", label, href: getPricingWhatsAppHref({ name: offer.name, label }) };
});

export function getServicePricing(slug: string): ServicePrice[] {
  const canonical = slug === "growth-marketing-b2b"
    ? "b2b-lead-generation"
    : slug === "video-ai-film-editing"
      ? "ai-video-production"
      : slug;
  return PRICING_TIERS.filter((tier) => tier.serviceSlug === canonical);
}
