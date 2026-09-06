import type { Metadata } from "next";
import Link from "next/link";
import {
  Container,
  Section,
  SectionHeading,
  Eyebrow,
  ProcessList,
  CapabilityList,
  Breadcrumbs,
  JsonLd,
} from "@/components/ui/primitives";
import { ProjectCTA } from "@/components/site/ProjectCTA";
import { pageMetadata, serviceSchema, breadcrumbSchema } from "@/lib/seo";
import { getServiceWhatsAppHref, WHATSAPP } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Middle East B2B Market Research & Lead Intelligence | XIYÀTO",
  description:
    "Human-researched, telephone-verified B2B intelligence on architecture, fit-out, and commercial procurement decision-makers across UAE, Saudi Arabia, and Qatar.",
  path: "/services/growth/middle-east-market-intelligence",
});

const RESEARCH_CAPABILITIES = [
  {
    title: "GCC Decision-Maker Discovery",
    intro: "We uncover high-value commercial buyers across the Gulf Cooperation Council that standard automated databases miss.",
    items: [
      "Managing Directors and Partners at tier-1 architectural studios",
      "Procurement and commercial directors at turnkey fit-out contractors",
      "Hospitality asset managers and luxury hotel project developers",
      "High-end residential development directors in Dubai, Riyadh & Doha",
      "Bespoke FF&E and joinery specification heads",
      "Corporate entity mapping covering local sponsorship and holding groups",
    ],
  },
  {
    title: "Human Verification Protocol",
    intro: "Every contact record is researched by hand and validated through multi-step verification.",
    items: [
      "Zero automated scrapers or generic info@ mailbox exports",
      "Direct corporate telephone verification with regional offices",
      "Verified executive mobile and WhatsApp contact numbers",
      "Active project validation confirming ongoing procurement cycles",
      "Corporate email validation with strict deliverability testing",
      "Regular dataset refreshes removing departed executives",
    ],
  },
  {
    title: "Deliverable Formats & Data Governance",
    intro: "Data delivered in structured formats ready for immediate commercial activation.",
    items: [
      "Native Microsoft Excel (.XLSX) workbooks with multi-tab categorization",
      "Clean CSV files formatted for instant CRM import (HubSpot, Salesforce)",
      "Strict compliance with UK PECR and international data privacy norms",
      "Clear corporate subscriber classification (B2B corporate entities only)",
      "Complete suppression list integration and opt-out mechanisms",
      "Full source provenance notes and date-stamped verification logs",
    ],
  },
];

const RESEARCH_WORKFLOW = [
  {
    step: "01",
    title: "Market & ICP Definition",
    body: "We establish your ideal client profile: specific GCC territories (UAE, KSA, Qatar), target company revenue tiers, sub-sectors, and exact procurement titles.",
  },
  {
    step: "02",
    title: "Primary Entity Mapping",
    body: "Our analysts identify all operating commercial entities in the target geography, mapping holding groups, joint ventures, and regional subsidiary offices.",
  },
  {
    step: "03",
    title: "Direct Contact Verification",
    body: "We discover and verify the active decision-makers through corporate directories, local registry checks, and telephone verification.",
  },
  {
    step: "04",
    title: "Clean Issue & CRM Handover",
    body: "You receive the completed intelligence database with executive summaries, source documentation, and formatted imports for your sales team.",
  },
];

const DELIVERABLES = [
  "Custom multi-tab Excel (.XLSX) and CSV intelligence workbook",
  "Verified C-suite, Procurement, and Project Director contact profiles",
  "Direct telephone, corporate email, and WhatsApp coordinates",
  "Active project portfolio notes and company specialization tags",
  "Executive market summary outlining regional procurement dynamics",
  "Optional direct WhatsApp and email outbound messaging copy",
];

export default function MiddleEastMarketIntelligencePage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Middle East B2B Market Research & Lead Intelligence",
          description:
            "Human-researched, telephone-verified B2B intelligence on architecture, fit-out, and commercial procurement decision-makers across UAE, Saudi Arabia, and Qatar.",
          path: "/services/growth/middle-east-market-intelligence",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Growth & B2B", path: "/services/growth-marketing-b2b" },
          { name: "Middle East Market Intelligence", path: "/services/growth/middle-east-market-intelligence" },
        ])}
      />

      <section className="border-b border-rule">
        <Container width="page" className="pb-16 pt-10 sm:pb-20 lg:pb-24">
          <Breadcrumbs
            trail={[
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: "Growth & B2B", path: "/services/growth-marketing-b2b" },
              { name: "Middle East Intelligence", path: "/services/growth/middle-east-market-intelligence" },
            ]}
          />
          <div className="max-w-3xl">
            <Eyebrow>Market Intelligence · United Arab Emirates · Saudi Arabia · Qatar</Eyebrow>
            <h1 className="display mt-6 text-4xl sm:text-5xl lg:text-[3.25rem] leading-[1.1]">
              Proprietary Middle East B2B Market Research & Buyer Intelligence
            </h1>
            <p className="mt-7 text-lg leading-relaxed text-ink-soft">
              Access verified C-suite, procurement, and project directors across the UAE, Saudi Arabia, and Qatar. Human-researched, telephone-verified B2B intelligence tailored to European, UK, and international manufacturers, design studios, and contractors expanding into the Gulf.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-2.5">
              <a
                href={getServiceWhatsAppHref("growth-marketing-b2b", "uk")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[46px] items-center gap-2 rounded-xs bg-ink px-6 text-xs font-semibold tracking-tight text-paper transition-colors hover:bg-accent"
                aria-label="Discuss Middle East market intelligence with XIYÀTO"
              >
                <span>Discuss Market Intelligence Brief</span>
                <span aria-hidden="true">&#8599;</span>
              </a>
              <a
                href={WHATSAPP.uk.tel}
                className="inline-flex min-h-[46px] items-center gap-1.5 rounded-xs border border-rule px-4 text-xs font-mono text-ink transition-colors hover:border-ink hover:bg-surface"
                title="Direct Telephone Line (UK)"
                aria-label={`Call XIYÀTO UK at ${WHATSAPP.uk.number}`}
              >
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ink-muted">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>Call UK: {WHATSAPP.uk.number}</span>
              </a>
              <a
                href={WHATSAPP.india.tel}
                className="inline-flex min-h-[46px] items-center gap-1.5 rounded-xs border border-rule px-4 text-xs font-mono text-ink-muted transition-colors hover:border-ink hover:bg-surface"
                title="Direct Research & Operations Line (India Hub)"
                aria-label={`Call XIYÀTO India at ${WHATSAPP.india.number}`}
              >
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ink-muted">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>Call India Hub: {WHATSAPP.india.number}</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex min-h-[46px] items-center gap-1.5 rounded-xs border border-rule px-4 text-xs font-medium text-ink-muted transition-colors hover:border-ink hover:text-ink"
              >
                <span>Request Intelligence Scope</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Section tone="surface">
        <Container width="page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Eyebrow>The Gulf Market Reality</Eyebrow>
              <h2 className="display mt-4 text-2xl sm:text-3xl">Why automated contact databases fail in the GCC.</h2>
            </div>
            <div className="lg:col-span-8">
              <div className="prose-body max-w-2xl space-y-5 text-ink-soft">
                <p>
                  Export directors attempting to enter the Middle East often purchase generic database subscriptions (Apollo, ZoomInfo, Lusha), only to discover that 70% of contact numbers connect to generic switchboards, email addresses bounce, or individuals left the region months ago.
                </p>
                <p>
                  In the UAE, Saudi Arabia, and Qatar, commercial relationships and procurement are conducted through direct mobile channels and WhatsApp. Senior executives rarely respond to automated cold email sequences. What wins in the Gulf is proprietary, human-verified intelligence that maps the true corporate structure, confirms active project tenders, and identifies the exact individual with signing authority.
                </p>
                <p className="border-l-2 border-accent/60 pl-4 italic text-ink">
                  XIYÀTO conducts bespoke, ground-up intelligence gathering. We deliver exclusive research workbooks built specifically for your service line, backed by telephone-verified authenticity.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section bordered>
        <Container width="wide">
          <SectionHeading
            eyebrow="Verified Workbooks in Production"
            title="Live Middle East Research Databases"
            intro="Explore our active, proprietary B2B databases built for luxury interior and architectural markets."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-rule bg-surface p-6">
              <span className="label text-[0.625rem]">UAE & GCC Fit-Out</span>
              <h3 className="display mt-2 text-xl">Middle East Luxury Interior Fit-Out Decision Makers</h3>
              <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                100+ verified corporate entities across Dubai, Abu Dhabi, Riyadh, and Doha covering high-end residential fit-out, hospitality operators, and interior architecture principals.
              </p>
              <div className="mt-6">
                <Link
                  href="/work/research/middle-east-interiors-fitout-whatsapp-expanded"
                  className="inline-flex min-h-[40px] items-center gap-1.5 text-xs font-semibold text-ink hover:text-accent"
                >
                  <span>Explore Interactive Workbook</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
            <div className="rounded-lg border border-rule bg-surface p-6">
              <span className="label text-[0.625rem]">Middle East Procurement</span>
              <h3 className="display mt-2 text-xl">Middle East Commercial Procurement & Electronics Leads</h3>
              <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                Verified procurement directors, trade specialists, and commercial buyers handling high-ticket installations across the GCC.
              </p>
              <div className="mt-6">
                <Link
                  href="/work/research/electronics-middle-east-selected-leads"
                  className="inline-flex min-h-[40px] items-center gap-1.5 text-xs font-semibold text-ink hover:text-accent"
                >
                  <span>Explore Interactive Workbook</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="surface" bordered>
        <Container width="page">
          <SectionHeading eyebrow="Capabilities" title="What our market research covers." />
          <div className="mt-14 space-y-14">
            {RESEARCH_CAPABILITIES.map((group) => (
              <div key={group.title} className="grid gap-8 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-4">
                  <h3 className="display text-2xl">{group.title}</h3>
                  {group.intro ? (
                    <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                      {group.intro}
                    </p>
                  ) : null}
                </div>
                <div className="lg:col-span-8">
                  <CapabilityList items={group.items} columns={2} />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section bordered>
        <Container width="page">
          <SectionHeading eyebrow="Research Methodology" title="How the intelligence is gathered." />
          <ProcessList className="mt-14 lg:grid-cols-4" steps={RESEARCH_WORKFLOW} />
        </Container>
      </Section>

      <Section tone="deep" bordered>
        <Container width="page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Eyebrow>Deliverables</Eyebrow>
              <h2 className="display mt-5 text-3xl">What your commercial team receives.</h2>
            </div>
            <div className="lg:col-span-8">
              <CapabilityList items={DELIVERABLES} columns={2} />
              <div className="mt-10 border-l border-accent/40 bg-accent-wash px-6 py-5">
                <h3 className="label mb-2">Data Protection & Privacy Notice</h3>
                <p className="text-sm leading-relaxed text-ink-soft">
                  XIYÀTO researches corporate business subscribers in accordance with UK PECR (Regulation 22) and regional corporate disclosure standards. We do not gather consumer personal data. All research data is provided strictly for direct B2B commercial outreach.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <ProjectCTA
        serviceSlug="growth-marketing-b2b"
        eyebrow="Middle East Expansion"
        title="Commission custom B2B intelligence for your Gulf market entry"
        body="Tell us your target geography, sector, and ideal client profile. We will assess feasible record volumes, define the verification scope, and provide a fixed quote."
        services={[
          { label: "B2B Growth & Research Pillar", href: "/services/growth-marketing-b2b" },
          { label: "Automation & Workflow Systems", href: "/services/automation-workflow-systems" },
          { label: "Website Design & Development", href: "/services/website-design-development" },
        ]}
      />
    </>
  );
}
