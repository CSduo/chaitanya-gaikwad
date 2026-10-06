import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
import { ImageGrid } from "@/components/media/viewers";
import { ProjectCTA } from "@/components/site/ProjectCTA";
import { CapabilityShowcase } from "@/components/services/CapabilityShowcase";
import { pageMetadata, webPageSchema, breadcrumbSchema, serviceId } from "@/lib/seo";
import { getService } from "@/lib/services";
import { getServiceWhatsAppHref } from "@/lib/site";
import { cadImages } from "@/lib/service-visuals";
import { CAD_HIRE_PATH } from "@/lib/hire";

/*
 * Hire intent for CAD drafting: "freelance CAD drafter", "hire a CAD drafter",
 * "outsource CAD drafting". The service page keeps "CAD drafting services";
 * this page answers the person who would otherwise hire a freelancer.
 * Every fact on it comes from the CAD service content in lib/services.ts.
 */

const SERVICE_SLUG = "cad-technical-production";
const SERVICE_PATH = `/services/${SERVICE_SLUG}`;
const CONTACT_HREF = `/contact?service=${SERVICE_SLUG}`;
const TITLE = "Freelance CAD Drafter for Hire, Interiors & Fit-Out | XIYÀTO";
const DESCRIPTION =
  "Need a freelance CAD drafter? Editable DWG plans, elevations, RCPs and joinery details from your PDFs or sketches. Founder-led. Message us on WhatsApp.";

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: CAD_HIRE_PATH });

const TRAIL = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "CAD Drafting", path: SERVICE_PATH },
  { name: "Hire a CAD drafter", path: CAD_HIRE_PATH },
];

export default function HireCadDrafterPage() {
  const service = getService(SERVICE_SLUG)!;
  const drawings = cadImages();
  const lead = drawings[0];
  const gallery = drawings.slice(0, 6).map((d) => ({ src: d.src, alt: d.alt, width: d.width, height: d.height, title: d.label }));
  const whatsapp = getServiceWhatsAppHref(SERVICE_SLUG);

  return (
    <>
      <JsonLd data={webPageSchema({ name: TITLE.replace(" | XIYÀTO", ""), description: DESCRIPTION, path: CAD_HIRE_PATH, aboutId: serviceId(SERVICE_PATH), image: lead?.src })} />
      <JsonLd data={breadcrumbSchema(TRAIL)} />

      <header className="border-b border-rule">
        <Container width="page" className="pb-12 pt-10 sm:pb-16">
          <Breadcrumbs trail={TRAIL} />
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="min-w-0 lg:col-span-6">
              <Eyebrow>Hire · CAD drafting</Eyebrow>
              <h1 className="display mt-6 text-4xl leading-[1.1] sm:text-5xl">
                Freelance CAD drafter for hire, founder-led and run like a studio.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">{service.summary}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[50px] items-center gap-2 rounded-xs bg-[#1f7a4d] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#17603c]"
                >
                  Message us on WhatsApp <span aria-hidden="true">↗</span>
                </a>
                <Link
                  href={CONTACT_HREF}
                  className="inline-flex min-h-[50px] items-center gap-2 rounded-xs bg-ink px-6 text-sm font-semibold text-paper transition-colors hover:bg-accent"
                >
                  Send your drawings <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
            {lead ? (
              <div className="min-w-0 lg:col-span-6">
                <figure className="relative aspect-[4/3] overflow-hidden rounded-sm border border-rule bg-white shadow-[0_30px_70px_-35px_rgba(0,0,0,0.45)]">
                  <Image src={lead.src} alt={lead.alt} fill priority sizes="(min-width: 1024px) 560px, 92vw" className="object-contain p-6" />
                </figure>
              </div>
            ) : null}
          </div>
        </Container>
      </header>

      <Section tone="surface">
        <Container width="page">
          <SectionHeading eyebrow="What you can hand over" title="From your PDFs and sketches to an issued DWG set." />
          <CapabilityShowcase groups={service.groups} visuals={drawings} graphic="grid" />
        </Container>
      </Section>

      <Section bordered>
        <Container width="wide">
          <SectionHeading
            eyebrow="Drawing samples"
            title="Sheets from a delivered interior package."
            action={{ label: "See the full project", href: "/work/bahrain-luxury-interior-cad-package" }}
          />
          <div className="mt-10">
            <ImageGrid items={gallery} columns={3} aspect="4/3" fit="contain" />
          </div>
        </Container>
      </Section>

      <Section tone="surface" bordered>
        <Container width="page">
          <SectionHeading eyebrow="How it works" title="How a drafting brief runs." />
          <ProcessList className="mt-12 lg:grid-cols-4" steps={service.process} />
        </Container>
      </Section>

      <Section bordered>
        <Container width="page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Eyebrow>Deliverables</Eyebrow>
              <h2 className="display mt-5 text-3xl">What you receive.</h2>
              <Link href={SERVICE_PATH} className="mt-6 inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-ink underline decoration-rule-strong underline-offset-4 hover:text-accent">
                Full CAD drafting service <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="lg:col-span-8">
              <CapabilityList items={service.deliverables} columns={2} />
            </div>
          </div>
        </Container>
      </Section>

      <ProjectCTA
        eyebrow="Hire a CAD drafter"
        title="Send the drawings you have."
        body="Marked-up PDFs, a sketch or a layout is enough to start. We confirm what is workable and propose a scope."
        serviceSlug={SERVICE_SLUG}
      />
    </>
  );
}
