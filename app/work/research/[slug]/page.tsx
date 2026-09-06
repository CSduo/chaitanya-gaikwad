import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Container,
  Section,
  SectionHeading,
  Eyebrow,
  Breadcrumbs,
  JsonLd,
  ProcessList,
} from "@/components/ui/primitives";
import { DataViewer } from "@/components/media/DataViewer";
import { ProjectCTA } from "@/components/site/ProjectCTA";
import { WORKBOOKS, getWorkbook } from "@/lib/portfolio";
import { pageMetadata, breadcrumbSchema, caseStudySchema } from "@/lib/seo";
import { getServiceWhatsAppHref, WHATSAPP } from "@/lib/site";

export function generateStaticParams() {
  return WORKBOOKS.map((w) => ({ slug: w.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const w = getWorkbook(slug);
  if (!w) return {};
  return pageMetadata({
    title: `${w.title} — B2B Research & Market Intelligence | XIYÀTO`,
    description: `Verified B2B research database: ${w.summary} Methodology, qualification criteria, and interactive data viewer.`,
    path: `/work/research/${w.slug}`,
    type: "article",
  });
}

const COMMISSION_STEPS = [
  {
    step: "01",
    title: "ICP & Territory Scoping",
    body: "You define target geographies (UAE, KSA, Qatar, UK, Europe), target revenue thresholds, niche sectors, and exact decision-maker roles.",
  },
  {
    step: "02",
    title: "Ground-Up Research & Verification",
    body: "Our analysts identify operating commercial entities, bypass switchboards, and telephone-verify active C-suite, Procurement, or Project leads.",
  },
  {
    step: "03",
    title: "Deliverability & Hygiene Checks",
    body: "Every email undergoes strict SMTP handshake testing; telephone/WhatsApp numbers are cross-referenced to eliminate departed contacts.",
  },
  {
    step: "04",
    title: "Clean Delivery in XLSX & CRM Formats",
    body: "You receive the unredacted master workbook (.XLSX and CSV) formatted for immediate import into HubSpot, Salesforce, or outreach campaigns.",
  },
];

export default async function ResearchPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const workbook = getWorkbook(slug);
  if (!workbook) notFound();

  const others = WORKBOOKS.filter((w) => w.slug !== workbook.slug).slice(0, 4);

  return (
    <>
      <JsonLd
        data={caseStudySchema({
          name: workbook.title,
          description: workbook.summary,
          path: `/work/research/${workbook.slug}`,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Growth & B2B", path: "/services/growth-marketing-b2b" },
          { name: workbook.title, path: `/work/research/${workbook.slug}` },
        ])}
      />

      {/* 01 — Executive Summary Header */}
      <section className="border-b border-rule">
        <Container width="wide" className="pb-14 pt-10">
          <Breadcrumbs
            trail={[
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: "Growth & B2B", path: "/services/growth-marketing-b2b" },
              { name: workbook.title, path: `/work/research/${workbook.slug}` },
            ]}
          />
          <div className="max-w-4xl">
            <Eyebrow>B2B Market Intelligence · {workbook.region}</Eyebrow>
            <h1 className="display mt-6 text-3xl sm:text-4xl lg:text-5xl leading-[1.15]">
              {workbook.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              {workbook.summary}
            </p>

            {/* Direct Inbound Action Bar */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={getServiceWhatsAppHref("growth-marketing-b2b", "uk")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[46px] items-center gap-2 rounded-xs bg-ink px-6 text-xs font-semibold tracking-tight text-paper transition-colors hover:bg-accent"
              >
                <span>Direct WhatsApp Brief (UK)</span>
                <span aria-hidden="true">&#8599;</span>
              </a>
              <a
                href={getServiceWhatsAppHref("growth-marketing-b2b", "india")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[46px] items-center gap-2 rounded-xs border border-rule px-5 text-xs font-medium tracking-tight text-ink transition-colors hover:border-ink hover:bg-surface"
              >
                <span>Direct WhatsApp (India Hub)</span>
                <span aria-hidden="true">&#8599;</span>
              </a>
              <a
                href={`tel:${WHATSAPP.uk.number.replace(/\s+/g, "")}`}
                className="inline-flex min-h-[46px] items-center gap-1.5 rounded-xs border border-rule px-4 text-xs font-mono text-ink-muted transition-colors hover:border-ink hover:text-ink"
                title="Direct Telephone Line"
              >
                <span>Call: {WHATSAPP.uk.number}</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex min-h-[46px] items-center gap-1.5 rounded-xs border border-rule px-4 text-xs font-medium text-ink-muted transition-colors hover:border-ink hover:text-ink"
              >
                <span>Commission Custom Research</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-lg border border-rule bg-surface p-4">
              <dt className="label text-[0.625rem]">Target Territory</dt>
              <dd className="mt-1 text-sm font-semibold text-ink">{workbook.region}</dd>
            </div>
            <div className="rounded-lg border border-rule bg-surface p-4">
              <dt className="label text-[0.625rem]">Primary Discipline</dt>
              <dd className="mt-1 text-sm font-semibold text-ink truncate">{workbook.tags[0]}</dd>
            </div>
            <div className="rounded-lg border border-rule bg-surface p-4">
              <dt className="label text-[0.625rem]">Research Protocol</dt>
              <dd className="mt-1 text-sm font-semibold text-ink">100% Human-Verified</dd>
            </div>
            <div className="rounded-lg border border-rule bg-surface p-4">
              <dt className="label text-[0.625rem]">Public View Status</dt>
              <dd className="mt-1 text-sm font-semibold text-ink">Redacted Sample</dd>
            </div>
          </dl>
        </Container>
      </section>

      {/* 02 — Research Methodology & Data Governance */}
      <Section tone="surface">
        <Container width="wide">
          <SectionHeading
            eyebrow="Data Governance & Methodology"
            title="How this intelligence database was constructed."
            intro="Commercial intelligence must be accurate, actionable, and compliant. Here is the operational framework behind this research."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-rule bg-paper p-6">
              <h3 className="label text-ink">01 · Research Objective</h3>
              <p className="mt-3 text-xs leading-relaxed text-ink-muted">
                To identify active commercial entities capable of purchasing high-ticket services and materials, establishing direct lines of communication with true signing authorities rather than generic info@ mailboxes.
              </p>
            </div>

            <div className="rounded-lg border border-rule bg-paper p-6">
              <h3 className="label text-ink">02 · Sourcing & Verification</h3>
              <p className="mt-3 text-xs leading-relaxed text-ink-muted">
                Constructed via official company registry records, live project permits, verified corporate directories, and direct telephone verification. Zero scraped bulk lists or unverified automation.
              </p>
            </div>

            <div className="rounded-lg border border-rule bg-paper p-6">
              <h3 className="label text-ink">03 · Qualification Criteria</h3>
              <p className="mt-3 text-xs leading-relaxed text-ink-muted">
                Only operating corporate entities with verifiable physical premises, active project portfolios, and dedicated procurement or managing director roles are admitted into the final database.
              </p>
            </div>

            <div className="rounded-lg border border-rule bg-paper p-6">
              <h3 className="label text-ink">04 · Excluded Records</h3>
              <p className="mt-3 text-xs leading-relaxed text-ink-muted">
                Sole traders without commercial premises, defunct businesses, invalid domain MX records, unconfirmed holding company addresses, and non-responsive switchboards are aggressively purged.
              </p>
            </div>

            <div className="rounded-lg border border-rule bg-paper p-6">
              <h3 className="label text-ink">05 · Deliverable Formats</h3>
              <p className="mt-3 text-xs leading-relaxed text-ink-muted">
                Delivered in multi-sheet Microsoft Excel (.XLSX) workbooks, clean CSV files, and structured imports mapped to standard CRM fields (HubSpot, Salesforce, Pipedrive).
              </p>
            </div>

            <div className="rounded-lg border border-rule bg-paper p-6">
              <h3 className="label text-ink">06 · Privacy & Redaction Notice</h3>
              <p className="mt-3 text-xs leading-relaxed text-ink-muted">
                Direct mobile numbers, direct executive emails, and specific project budgets are masked in this public preview to protect privacy under UK PECR / GDPR. Unredacted datasets are issued upon commercial commissioning.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 03 — Interactive Data Viewer */}
      <Container width="wide" className="py-12 sm:py-16">
        <div className="mb-6 max-w-3xl">
          <h2 className="display text-2xl sm:text-3xl">Interactive Data Viewer</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            Search, sort, and inspect verified records across sheets. Direct personal contact fields are masked in this public demonstration copy.
          </p>
        </div>

        <DataViewer
          dataUrl={workbook.dataUrl}
          downloadUrl={workbook.downloadUrl}
          title={workbook.title}
        />
      </Container>

      {/* 04 — How to Commission Similar Research */}
      <Section tone="surface" bordered>
        <Container width="page">
          <SectionHeading
            eyebrow="Custom Acquisition"
            title="How to commission proprietary B2B intelligence for your business."
          />
          <ProcessList className="mt-14 lg:grid-cols-4" steps={COMMISSION_STEPS} />
        </Container>
      </Section>

      {/* 05 — Other Workbooks */}
      {others.length > 0 ? (
        <section className="border-t border-rule py-16">
          <Container width="page">
            <h2 className="label mb-8">Other proprietary research databases</h2>
            <ul className="grid gap-px border border-rule bg-rule sm:grid-cols-2">
              {others.map((w) => (
                <li key={w.slug} className="group relative bg-paper p-6">
                  <p className="label">{w.region}</p>
                  <h3 className="display mt-3 text-lg leading-snug">
                    <Link
                      href={`/work/research/${w.slug}`}
                      className="inline-flex min-h-[44px] items-center transition-colors after:absolute after:inset-0 hover:text-accent"
                    >
                      {w.title}
                    </Link>
                  </h3>
                  <p className="meta mt-3">
                    {w.sheetCount} {w.sheetCount === 1 ? "sheet" : "sheets"} · Verified B2B Dataset
                  </p>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <ProjectCTA
        serviceSlug="growth-marketing-b2b"
        eyebrow="Growth & B2B Intelligence"
        title="Need verified commercial intelligence for your market?"
        body="Tell us your target geography, sector, and ideal client criteria. We will review feasible market sizes and provide a fixed-price research proposal."
        services={[
          { label: "B2B Growth & Research Pillar", href: "/services/growth-marketing-b2b" },
          { label: "Middle East Market Intelligence", href: "/services/growth/middle-east-market-intelligence" },
          { label: "Automation & Marketing Systems", href: "/services/automation-workflow-systems" },
        ]}
      />
    </>
  );
}
