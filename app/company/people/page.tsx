import type { Metadata } from "next";
import Image from "next/image";
import {
  Container,
  Section,
  SectionHeading,
  Eyebrow,
  CapabilityList,
  TextLink,
  Breadcrumbs,
  JsonLd,
} from "@/components/ui/primitives";
import { ProjectCTA } from "@/components/site/ProjectCTA";
import { founder, teamMembers, specialists, DISCIPLINES } from "@/lib/company";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Founder & People",
  description:
    "XIYÀTO is founder-led. Scoping, production leadership and quality assurance sit with the founder on every engagement.",
  path: "/company/people",
});

export default function PeoplePage() {
  const person = founder();
  const team = teamMembers();
  const network = specialists();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Company", path: "/company" },
          { name: "Founder & People", path: "/company/people" },
        ])}
      />

      {/* 01 — People hero */}
      <section className="border-b border-rule">
        <Container width="page" className="pb-16 pt-10 sm:pb-20">
          <Breadcrumbs
            trail={[
              { name: "Home", path: "/" },
              { name: "Company", path: "/company" },
              { name: "Founder & People", path: "/company/people" },
            ]}
          />
          <div className="max-w-3xl">
            <Eyebrow>Founder &amp; People</Eyebrow>
            <h1 className="display mt-6 text-4xl sm:text-5xl">
              Founder-led, with specialists engaged per project.
            </h1>
            <p className="mt-7 text-lg leading-relaxed text-ink-soft">
              XIYÀTO is deliberately small. Scoping, production leadership and the final
              quality check sit with the founder on every engagement, which is what keeps the
              standard consistent and the accountability unambiguous.
            </p>
          </div>
        </Container>
      </section>

      {/* 02–04 — Founder */}
      {person ? (
        <Section tone="surface">
          <Container width="page">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              {person.image ? (
                <div className="lg:col-span-4">
                  <div className="relative aspect-[4/5] w-full overflow-hidden border border-rule bg-paper-deep">
                    <Image
                      src={person.image.src}
                      alt={person.image.alt}
                      fill
                      priority
                      sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 90vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-5 border-t border-rule pt-5">
                    <p className="text-base font-semibold tracking-tight text-ink">
                      {person.name}
                    </p>
                    <p className="meta mt-1">{person.role}</p>
                  </div>
                </div>
              ) : null}

              <div className="lg:col-span-8">
                <Eyebrow>Biography</Eyebrow>
                <div className="prose-body mt-5 max-w-2xl">
                  {person.biography.map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                </div>

                <div className="mt-12">
                  <Eyebrow>Direct responsibility on every engagement</Eyebrow>
                  <CapabilityList items={person.responsibilities} className="mt-5" />
                </div>

                <div className="mt-12">
                  <Eyebrow>Disciplines</Eyebrow>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {person.disciplines.map((d) => (
                      <li
                        key={d}
                        className="border border-rule px-3 py-1.5 text-sm text-ink-soft"
                      >
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      {/* 05 — Team: renders only when real team records exist */}
      {team.length > 0 ? (
        <Section bordered>
          <Container width="page">
            <SectionHeading eyebrow="Team" title="The people delivering the work." />
            <ul className="mt-14 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
              {team.map((m) => (
                <li key={m.slug} className="bg-surface p-7">
                  <h3 className="display text-xl">{m.name}</h3>
                  <p className="meta mt-2">{m.role}</p>
                  <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                    {m.biography[0]}
                  </p>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      {/* 06 — Specialist network: renders only when real records exist */}
      {network.length > 0 ? (
        <Section tone="deep" bordered>
          <Container width="page">
            <SectionHeading eyebrow="Specialist network" title="Engaged per project." />
            <ul className="mt-14 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
              {network.map((m) => (
                <li key={m.slug} className="bg-paper p-7">
                  <h3 className="display text-xl">{m.name}</h3>
                  <p className="meta mt-2">{m.role}</p>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      {/* How the studio scales — the honest answer while founder-only */}
      <Section bordered>
        <Container width="page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Eyebrow>Capacity</Eyebrow>
              <h2 className="display mt-5 text-3xl">How the studio scales.</h2>
            </div>
            <div className="lg:col-span-8">
              <div className="prose-body max-w-2xl">
                <p>
                  Production capacity is extended through independent specialists brought in
                  against a defined brief when an engagement requires it. That keeps the
                  studio&rsquo;s standing overhead low, and it means clients are never paying
                  for a team that is not working on their project.
                </p>
                <p>
                  Whoever produces the work, scoping and the final quality check remain with
                  the founder. Where a specialist has contributed materially to a published
                  engagement, that will be stated on the case study rather than absorbed into
                  a collective &ldquo;we&rdquo;.
                </p>
              </div>
              <div className="mt-10 grid gap-px border border-rule bg-rule sm:grid-cols-3">
                {DISCIPLINES.map((d) => (
                  <div key={d.title} className="bg-surface p-6">
                    <h3 className="label mb-3">{d.title}</h3>
                    <p className="text-sm leading-relaxed text-ink-muted">{d.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <TextLink href="/careers">Join the talent network</TextLink>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <ProjectCTA
        eyebrow="Work with us"
        title="Talk to the person who will do the work."
        body="Enquiries go straight to the founder. There is no account layer to route a brief through."
      />
    </>
  );
}
