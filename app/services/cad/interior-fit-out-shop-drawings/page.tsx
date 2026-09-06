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
  title: "Interior Fit-Out Shop Drawings & Joinery CAD Services | XIYÀTO",
  description:
    "Specialist outsourced interior fit-out shop drawings, joinery drafting, and architectural documentation for contractors and design practices. Editable DWG, DXF & PDF.",
  path: "/services/cad/interior-fit-out-shop-drawings",
});

const CAPABILITY_GROUPS = [
  {
    title: "Joinery & Millwork Detailing",
    intro: "Detailed production drawings translating architectural design intent into fabrication-ready joinery packages.",
    items: [
      "Bespoke cabinetry, vanity units and wardrobe elevations",
      "Section details showing carcass construction, reveals and hardware",
      "Internal layout setting-out, shelf spacing and lighting integration",
      "Material transitions, shadow gaps, plinth and cornice details",
      "Ironmongery, hinge and runner coordination",
      "Reeded glass, metal framing and stone cladding junctions",
    ],
  },
  {
    title: "Setting-Out & Coordination Plans",
    intro: "Full-floor and room-by-room setting-out drawings coordinated with MEP constraints.",
    items: [
      "General arrangement layout plans with dimensioned datum lines",
      "Reflected ceiling plans (RCP) with lighting, diffusers and access panels",
      "Flooring setting-out, pattern centres and herringbone alignment",
      "Interior wall elevations, taken wall-by-wall across the space",
      "Door, frame and architrave schedules with finish specifications",
      "Sanitary ware, brassware and fixture coordination",
    ],
  },
  {
    title: "CAD Layer Standards & Protocols",
    intro: "Every package is built in native DWG/DXF strictly adhering to professional drawing standards.",
    items: [
      "Layer naming configured to ISO 13567, BS 1192 or your studio template",
      "Standardised line weights, pen tables and monochrome CTB setup",
      "Full title block integration matching your office identity",
      "Clean model-space geometry with zero stray elements or nested blocks",
      "Paper-space viewports scaled to 1:20, 1:50 or 1:100 standard layouts",
      "Dimension and text styles locked to standard architectural heights",
    ],
  },
];

const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Design Inputs & Constraint Intake",
    body: "You share approved concept sketches, marked-up PDFs, site surveys or 3D renders. We confirm fixed dimensions, identify missing tolerances, and align on layer standards.",
  },
  {
    step: "02",
    title: "Setting-Out & Core Drafting",
    body: "We construct the primary general arrangements, partition setting-out, and initial wall elevations, flagging any site discrepancies for immediate contractor clarification.",
  },
  {
    step: "03",
    title: "Detailing & Coordination Pass",
    body: "Joinery sections, ceiling interfaces, and flooring transition details are drawn wall-by-wall with full hardware and material annotations.",
  },
  {
    step: "04",
    title: "Internal QA & Multi-Format Issue",
    body: "Senior review verifies dimensional continuity across sheets before issuing clean, editable DWG, DXF and high-resolution vector PDF packages.",
  },
];

const DELIVERABLES = [
  "Editable native AutoCAD DWG and DXF files",
  "Vector-optimised high-resolution multi-sheet PDF packages",
  "Standardised drawing register and revision tracking sheet",
  "Custom CTB plot style file matching drawing lineweights",
  "Flagged discrepancy report identifying unconfirmed site constraints",
  "One included revision round against written contractor markups",
];

export default function InteriorFitOutShopDrawingsPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Interior Fit-Out Shop Drawing Production",
          description:
            "Specialist outsourced interior fit-out shop drawings, joinery drafting, and architectural documentation for contractors and design practices.",
          path: "/services/cad/interior-fit-out-shop-drawings",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "CAD & Technical Production", path: "/services/cad-technical-production" },
          { name: "Interior Fit-Out Shop Drawings", path: "/services/cad/interior-fit-out-shop-drawings" },
        ])}
      />

      <section className="border-b border-rule">
        <Container width="page" className="pb-16 pt-10 sm:pb-20 lg:pb-24">
          <Breadcrumbs
            trail={[
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: "CAD Production", path: "/services/cad-technical-production" },
              { name: "Interior Shop Drawings", path: "/services/cad/interior-fit-out-shop-drawings" },
            ]}
          />
          <div className="max-w-3xl">
            <Eyebrow>Specialist CAD Service · Commercial & Residential Fit-Out</Eyebrow>
            <h1 className="display mt-6 text-4xl sm:text-5xl lg:text-[3.25rem] leading-[1.1]">
              Interior Fit-Out Shop Drawings & Joinery CAD Production
            </h1>
            <p className="mt-7 text-lg leading-relaxed text-ink-soft">
              Outsourced drawing documentation for fit-out contractors, joinery manufacturers, and interior design studios. We transform design concepts, survey markups, and visual renders into editable, coordinated DWG shop packages ready for site submittal and workshop fabrication.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={getServiceWhatsAppHref("cad-technical-production", "uk")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[46px] items-center gap-2 rounded-xs bg-ink px-6 text-xs font-semibold tracking-tight text-paper transition-colors hover:bg-accent"
              >
                <span>Direct WhatsApp (UK)</span>
                <span aria-hidden="true">&#8599;</span>
              </a>
              <a
                href={getServiceWhatsAppHref("cad-technical-production", "india")}
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
                <span>Submit Drawing Brief</span>
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
              <Eyebrow>The Fit-Out Challenge</Eyebrow>
              <h2 className="display mt-4 text-2xl sm:text-3xl">Eliminating drawing bottlenecks before site handoff.</h2>
            </div>
            <div className="lg:col-span-8">
              <div className="prose-body max-w-2xl space-y-5 text-ink-soft">
                <p>
                  Interior fit-out contractors and specialist joinery manufacturers operate under unforgiving project schedules. When design packages from architects lack site tolerances or joinery sections, project managers face an expensive choice: hire full-time draftspeople or pull senior engineers into repetitive AutoCAD detailing.
                </p>
                <p>
                  XIYÀTO functions as your flexible external CAD drawing studio. Your team supplies the design direction—architectural tender drawings, interior design concept renders, site survey notes, or marked-up PDFs. We return fully coordinated, multi-sheet CAD packages built to your office layer standards, ready for client sign-off and workshop production.
                </p>
                <p className="border-l-2 border-accent/60 pl-4 italic text-ink">
                  This is strict technical drafting and documentation—we never claim design authorship. Your practice retains complete design ownership and technical sign-off authority.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section bordered>
        <Container width="wide">
          <SectionHeading
            eyebrow="Verified Studio Proof"
            title="The Bahrain Luxury Residence CAD Package"
            intro="A 20-sheet coordinated interior fit-out and joinery documentation package produced from client space plans and finish schedules."
          />
          <div className="mt-10 rounded-lg border border-rule bg-surface p-6 sm:p-8">
            <div className="grid gap-6 sm:grid-cols-3">
              <div>
                <span className="label text-[0.625rem]">Project Scope</span>
                <p className="mt-1 text-base font-semibold text-ink">Full Residence Interior Fit-Out</p>
                <p className="mt-1 text-xs text-ink-muted">Master suite, living areas, bespoke walk-in wardrobe, bathrooms</p>
              </div>
              <div>
                <span className="label text-[0.625rem]">Sheets Delivered</span>
                <p className="mt-1 text-base font-semibold text-ink">20 Coordinated Architectural Sheets</p>
                <p className="mt-1 text-xs text-ink-muted">GA plans, RCPs, wall elevations, joinery details, flooring layouts</p>
              </div>
              <div>
                <span className="label text-[0.625rem]">File Deliverables</span>
                <p className="mt-1 text-base font-semibold text-ink">Editable DWG + High-Res PDF</p>
                <p className="mt-1 text-xs text-ink-muted">Strict layer convention matching client office standards</p>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/work/bahrain-luxury-interior-cad-package"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xs bg-ink px-5 text-xs font-semibold text-paper hover:bg-accent"
              >
                <span>Inspect Full 20-Sheet CAD Case Study</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link
                href="/services/cad-technical-production"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xs border border-rule px-4 text-xs font-medium text-ink hover:border-ink"
              >
                <span>View Primary CAD Service Pillar</span>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="surface" bordered>
        <Container width="page">
          <SectionHeading eyebrow="Capabilities" title="What our fit-out CAD packages include." />
          <div className="mt-14 space-y-14">
            {CAPABILITY_GROUPS.map((group) => (
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
          <SectionHeading eyebrow="Production Workflow" title="How your fit-out package is drafted." />
          <ProcessList className="mt-14 lg:grid-cols-4" steps={WORKFLOW_STEPS} />
        </Container>
      </Section>

      <Section tone="deep" bordered>
        <Container width="page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Eyebrow>Deliverables</Eyebrow>
              <h2 className="display mt-5 text-3xl">What your team receives.</h2>
            </div>
            <div className="lg:col-span-8">
              <CapabilityList items={DELIVERABLES} columns={2} />
              <div className="mt-10 border-l border-accent/40 bg-accent-wash px-6 py-5">
                <h3 className="label mb-2">Scope of Responsibility</h3>
                <p className="text-sm leading-relaxed text-ink-soft">
                  XIYÀTO provides external drafting capacity, geometry coordination and CAD documentation. We do not act as statutory architects or engineer of record. Structural calculations, site setting-out verification, and statutory local authority approvals remain the responsibility of the client's appointed team.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <ProjectCTA
        serviceSlug="cad-technical-production"
        eyebrow="Interior CAD Capacity"
        title="Ready to issue your next fit-out shop drawing package?"
        body="Send whatever drawings, sketches, or site markups exist. We will review dimensions, confirm the required sheet list, and provide a fixed-price turnaround quote."
        services={[
          { label: "CAD & Technical Production Pillar", href: "/services/cad-technical-production" },
          { label: "3D Visualisation & Image Production", href: "/services/visualisation-image-production" },
          { label: "Website Design & Development", href: "/services/website-design-development" },
        ]}
      />
    </>
  );
}
