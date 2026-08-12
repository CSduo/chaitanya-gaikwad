import type { Metadata } from "next";
import {
  Container,
  Section,
  SectionHeading,
  Eyebrow,
  ProcessList,
  CapabilityList,
  TextLink,
  JsonLd,
} from "@/components/ui/primitives";
import { ProjectCTA } from "@/components/site/ProjectCTA";
import { SERVICES } from "@/lib/services";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";
import { ROUTE_SEO } from "@/lib/seo-copy";

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
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />



      {/* 02–04 — One overview block per service */}
      {SERVICES.map((service, index) => (
        <Section
          key={service.slug}
          tone={index % 2 === 0 ? "surface" : "paper"}
          bordered={index > 0}
        >
          <Container width="page">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <Eyebrow>{`0${service.order} — Service`}</Eyebrow>
                <h2 className="display mt-5 text-3xl sm:text-4xl">{service.name}</h2>
                <p className="mt-6 text-base leading-relaxed text-ink-soft">
                  {service.overview}
                </p>
                <div className="mt-8">
                  <TextLink href={`/services/${service.slug}`}>
                    {service.shortName}
                  </TextLink>
                </div>
              </div>

              <div className="lg:col-span-7">
                <h3 className="label mb-2">Capabilities</h3>
                <CapabilityList
                  items={service.groups.map((g) => g.title)}
                  className="mb-8"
                />
                <h3 className="label mb-2">Deliverables</h3>
                <CapabilityList items={service.deliverables} columns={2} />
              </div>
            </div>
          </Container>
        </Section>
      ))}

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
        title="Which of these do you need?"
        body="If you are not sure how the work should be scoped, send what you have. Establishing that is the first step of every engagement."
      />
    </>
  );
}
