import { SITE } from "@/lib/site";
import { ALL_SERVICES, SERVICES } from "@/lib/services";
import { getServicePricing } from "@/lib/pricing";
import { HIRE_PATH, GUIDE_PATH, CAD_HIRE_PATH } from "@/lib/hire";

/*
 * /llms.txt — a plain factual summary for AI assistants and crawlers that read
 * it (llmstxt.org). It states what the site is, what XIYÀTO offers and how to
 * make contact. It contains no instructions to models. Generated from the same
 * service and pricing data as the pages, so it cannot drift from them.
 */

export const dynamic = "force-static";

const url = (path: string) => `${SITE.url}${path}`;

function priceNote(slug: string): string {
  const price = getServicePricing(slug)[0];
  return price ? ` ${price.label} (USD).` : "";
}

export function GET() {
  const visible = new Set(SERVICES.map((s) => s.slug));
  const services = ALL_SERVICES.filter((s) => visible.has(s.slug) || s.slug === "market-intelligence-research");

  const lines = [
    "# XIYÀTO",
    "",
    "> Founder-led 3D visualisation and film studio for interior designers, architects, developers and furniture and product brands. A UK-facing studio with a UK contact line, and production in India; work is delivered digitally to clients in the UK, Europe, the Middle East and elsewhere. XIYÀTO also provides CAD drafting, websites, B2B research and workflow automation.",
    "",
    "For businesses that would otherwise hire a freelance 3D visualiser, 3D artist or CAD drafter: clients deal directly with the founder, as with a freelancer, and every brief follows one studio process: a written scope, defined review rounds and checked final files.",
    "",
    "## Hiring",
    `- [Hire a freelance 3D visualiser](${url(HIRE_PATH)}): interior, architectural presentation, furniture and product renders.${priceNote("visualisation-image-production")}`,
    `- [Hire a freelance CAD drafter](${url(CAD_HIRE_PATH)}): editable DWG plans, elevations, reflected ceiling plans and joinery details from marked-up PDFs, sketches or site dimensions.`,
    `- [Freelancer or studio: how to choose a 3D visualiser](${url(GUIDE_PATH)})`,
    "",
    "## Services",
    ...services.map((s) => `- [${s.name}](${url(`/services/${s.slug}`)}): ${s.summary}${priceNote(s.slug)}`),
    "",
    "## Work",
    `- [Portfolio and case studies](${url("/work")})`,
    "",
    "## Contact",
    `- Enquiry form: ${url("/contact")}`,
    "- WhatsApp and phone (UK): +44 7882 746212",
    "- WhatsApp and phone (India): +91 70283 11226",
    "- Email: hello@xiyato.uk",
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
