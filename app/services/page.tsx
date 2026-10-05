import type { Metadata } from "next";
import Link from "next/link";
import {
  Container,
  Section,
  SectionHeading,
  Eyebrow,
  Breadcrumbs,
  ProcessList,
  CapabilityList,
  TextLink,
  JsonLd,
} from "@/components/ui/primitives";
import { ProjectCTA } from "@/components/site/ProjectCTA";
import { ServicePreview } from "@/components/home/ServicePreview";
import { SERVICES } from "@/lib/services";
import { getServicePricing, PRICING_NOTE } from "@/lib/pricing";
import { getServiceWhatsAppHref } from "@/lib/site";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";
import { ROUTE_SEO } from "@/lib/seo-copy";
import { specialismsByParent } from "@/lib/specialisms";
import { SpecialismLinks } from "@/components/services/SpecialismLinks";

export const metadata: Metadata = pageMetadata({
  title: ROUTE_SEO.services.metaTitle,
  description: ROUTE_SEO.services.metaDescription,
  path: "/services",
});

const ENGAGEMENT_STEPS = [
  {
    step: "01",
    title: "Enquiry",
    body: "You send the brief and whatever material exists. There is no requirement for it to be complete.",
  },
  {
    step: "02",
    title: "Review and scope",
    body: "We assess what is confirmed, what is assumed and what is missing, then propose a defined scope and deliverable list.",
  },
  {
    step: "03",
    title: "Production",
    body: "Work runs against the agreed scope with progress visible and revisions handled against issued comments.",
  },
  {
    step: "04",
    title: "Handoff",
    body: "Everything is checked and issued in formats your team can open, interrogate and continue.",
  },
];

export default function ServicesPage() {

  return (
    <div className="min-w-0 max-w-full">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />

      {/* 01 — Services Hub Header */}
      <section className="border-b border-rule bg-paper-deep">
        <Container width="page" className="pb-10 pt-8 sm:pb-14">
          <Breadcrumbs
            trail={[
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
            ]}
          />
          <div className="max-w-3xl">
            <Eyebrow>XIYÀTO / Services</Eyebrow>
            <h1 className="display mt-4 text-4xl sm:text-5xl lg:text-[3.5rem]">
              Six services. One studio.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft">
              3D visualisation, AI film, websites, CAD drafting, marketing and B2B research, and workflow automation. Specialist production for design studios, brands and growing businesses—commissioned individually or together.
            </p>
            <nav aria-label="Service index" className="mt-7 grid grid-cols-2 gap-x-5 sm:grid-cols-3">
              {SERVICES.map((service) => (
                <Link key={service.slug} href={`#${service.slug}`} className="flex min-h-12 min-w-0 items-center gap-2 border-b border-rule py-2 text-xs text-ink-soft transition-colors hover:border-ink hover:text-ink">
                  <span className="font-mono text-accent">{String(service.order).padStart(2, "0")}</span><span className="min-w-0">{service.shortName}</span>
                </Link>
              ))}
            </nav>
          </div>
        </Container>
      </section>

      {/* 02–04 — One overview block per service */}
      {SERVICES.map((service, index) => {
        const prices = getServicePricing(service.slug);
        return (
          <Section
            key={service.slug}
            id={service.slug}
            tone={index % 2 === 0 ? "surface" : "paper"}
            bordered={index > 0}
            className="service-overview scroll-mt-20"
          >
            <Container width="page">
              <div className="grid min-w-0 gap-7 lg:grid-cols-12 lg:gap-12">
                <div className="min-w-0 lg:col-span-5">
                  <Eyebrow>{`0${service.order} — Service`}</Eyebrow>
                  <h2 className="display mt-5 text-3xl sm:text-4xl">{service.name}</h2>
                  <p className="mt-6 text-base leading-relaxed text-ink-soft">
                    {service.overview}
                  </p>
                  <div className="mt-7 space-y-3">
                    {prices.length ? prices.map((price) => (
                      <div key={price.id} className="border-l-2 border-ink bg-paper-deep p-4 sm:p-5">
                        {prices.length > 1 ? <p className="mb-2 text-xs font-semibold text-ink-muted">{price.name}</p> : null}
                        <p className="text-xl font-semibold tracking-tight text-ink">{price.label}</p>
                        <p className="mt-2 text-xs leading-relaxed text-ink-muted">{price.note}</p>
                        <a href={price.href} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-3 rounded-md bg-ink px-4 text-xs font-semibold text-paper transition-colors hover:bg-accent hover:text-white">
                          {price.cta}<span aria-hidden="true">↗</span>
                        </a>
                      </div>
                    )) : (
                      <div className="border-l-2 border-ink bg-paper-deep p-4 sm:p-5">
                        <p className="text-lg font-semibold text-ink">A precise quote for a precise brief.</p>
                        <p className="mt-2 text-xs leading-relaxed text-ink-muted">CAD packages are priced around the drawing count, detail level and source material.</p>
                        <a href={getServiceWhatsAppHref(service.slug)} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-3 rounded-md bg-ink px-4 text-xs font-semibold text-paper hover:bg-accent hover:text-white">Get a CAD Quote <span aria-hidden="true">↗</span></a>
                      </div>
                    )}
                    {prices.length ? <p className="text-[0.6875rem] leading-relaxed text-ink-muted">{PRICING_NOTE}</p> : null}
                  </div>
                  <div className="mt-8">
                    <TextLink href={`/services/${service.slug}`}>
                      {service.shortName}
                    </TextLink>
                  </div>
                </div>

                <div className="min-w-0 lg:col-span-7">
                  <div className="mb-6 w-full min-w-0 max-w-full overflow-hidden rounded-sm border border-rule bg-paper-deep p-2 shadow-[0_12px_36px_#00000008]"><ServicePreview slug={service.slug} /></div>
                  <h3 className="label mb-2">Deliverables</h3>
                  <CapabilityList items={service.deliverables} columns={2} />
                </div>
              </div>
            </Container>
          </Section>
        );
      })}

      {/* Specialisms — focused pages within a service (lib/specialisms.ts) */}
      <Section id="specialisms" tone="deep" bordered className="scroll-mt-20">
        <Container width="page">
          <SectionHeading
            eyebrow="Specialisms"
            title="Focused services for specific briefs."
            intro="Dedicated pages for work that needs a particular specialism within a service."
          />
          <div className="mt-12 space-y-10">
            {specialismsByParent().map(({ parent, specialisms }) => (
              <div key={parent.slug}>
                <h3 className="label mb-3">
                  <Link href={`/services/${parent.slug}`} className="hover:text-accent">
                    {parent.shortName}
                  </Link>
                </h3>
                <SpecialismLinks specialisms={specialisms} />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 05 — How engagements work */}
      <Section bordered>
        <Container width="page">
          <SectionHeading
            eyebrow="Engagements"
            title="How an engagement runs."
            intro="The same four steps apply whether the deliverable is a drawing package, a research workbook or a film."
          />
          <ProcessList className="mt-14 lg:grid-cols-4" steps={ENGAGEMENT_STEPS} />

          <div className="mt-14 grid gap-px border border-rule bg-rule sm:grid-cols-3">
            {[
              {
                title: "Defined project",
                body: "Fixed scope, agreed deliverable list, delivered against it.",
              },
              {
                title: "Ongoing capacity",
                body: "Recurring production support for a steady flow of work.",
              },
              {
                title: "Overflow support",
                body: "Short-notice capacity when a deadline is fixed and the team is full.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-paper p-7">
                <h3 className="text-base font-semibold tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>



      {/* 07 — CTA */}
      <ProjectCTA
        compact
        title="Which of these do you need?"
        body="If you are not sure how the work should be scoped, send what you have. Establishing that is the first step of every engagement."
      />
    </div>
  );
}
