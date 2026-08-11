import type { Metadata } from "next";
import {
  Container,
  Section,
  SectionHeading,
  Eyebrow,
  CapabilityList,
  JsonLd,
} from "@/components/ui/primitives";
import { TalentForm } from "@/components/forms/TalentForm";
import {
  openRoles,
  specialistRoles,
  DISCIPLINES,
  EMPLOYMENT_LABELS,
} from "@/lib/company";
import { publishedChannels } from "@/lib/site";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Careers",
  description:
    "XIYÀTO works with independent specialists across technical production, growth operations and visual content. There are no open vacancies at present; the talent network is always open.",
  path: "/careers",
});

const WORKING_WITH = [
  {
    title: "Defined briefs",
    body: "Work comes with an agreed scope, deliverable list and deadline. You are not asked to guess what is wanted.",
  },
  {
    title: "Project-based engagement",
    body: "Specialists are engaged against a specific piece of work rather than retained on standby.",
  },
  {
    title: "Named contribution",
    body: "Where a specialist contributes materially to a published engagement, that is stated rather than absorbed into a collective voice.",
  },
  {
    title: "Direct working relationship",
    body: "Briefing and review are handled by the founder, not passed through a coordination layer.",
  },
];

export default function CareersPage() {
  const open = openRoles();
  const specialist = specialistRoles();
  const channels = publishedChannels();
  const careersChannel = channels.find((c) => c.id === "careers");

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
        ])}
      />

      {/* 01 — Careers hero */}
      <section className="border-b border-rule">
        <Container width="page" className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <Eyebrow>Careers</Eyebrow>
            <h1 className="display mt-6 text-4xl sm:text-5xl lg:text-[3.5rem]">
              We work with specialists, project by project.
            </h1>
            <p className="mt-7 text-lg leading-relaxed text-ink-soft">
              XIYÀTO is a small, founder-led studio. Rather than carrying permanent capacity
              that is idle between engagements, we bring in independent specialists against
              defined briefs — and keep a standing network of people we can approach when the
              work calls for it.
            </p>
          </div>
        </Container>
      </section>

      {/* 02 — Working with XIYÀTO */}
      <Section tone="surface">
        <Container width="page">
          <SectionHeading eyebrow="Working with us" title="What an engagement looks like." />
          <div className="mt-14 grid gap-px border border-rule bg-rule sm:grid-cols-2">
            {WORKING_WITH.map((item) => (
              <div key={item.title} className="bg-surface p-7 lg:p-8">
                <h3 className="text-base font-semibold tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 03 — Disciplines */}
      <Section bordered>
        <Container width="page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Eyebrow>Disciplines</Eyebrow>
              <h2 className="display mt-5 text-3xl">Where we bring people in.</h2>
            </div>
            <div className="lg:col-span-8">
              <dl className="border-t border-rule">
                {DISCIPLINES.map((d) => (
                  <div key={d.title} className="border-b border-rule py-6">
                    <dt className="text-base font-semibold tracking-tight text-ink">
                      {d.title}
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-ink-muted">{d.body}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </Section>

      {/* 04 — Current opportunities (designed zero state) */}
      <Section tone="deep" bordered>
        <Container width="page">
          <SectionHeading eyebrow="Current opportunities" title="Open positions." />
          <div className="mt-12">
            {open.length > 0 ? (
              <ul className="grid gap-px border border-rule bg-rule">
                {open.map((role) => (
                  <li key={role.slug} className="bg-paper p-7">
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <h3 className="display text-xl">{role.title}</h3>
                      <span className="label">{EMPLOYMENT_LABELS[role.employmentType]}</span>
                    </div>
                    <p className="meta mt-2">{role.location}</p>
                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-muted">
                      {role.summary}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="border border-rule bg-paper p-8 lg:p-10">
                <p className="text-lg leading-relaxed text-ink">
                  There are no open permanent or contract vacancies at present.
                </p>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
                  This is the studio&rsquo;s normal state rather than a temporary pause —
                  capacity is added per project. If your work is relevant, the talent network
                  below is the route in, and it is where we look first when an engagement
                  needs additional hands.
                </p>
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* 05 — Project-based / specialist opportunities */}
      <Section bordered>
        <Container width="page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Eyebrow>Project-based</Eyebrow>
              <h2 className="display mt-5 text-3xl">Specialist opportunities.</h2>
            </div>
            <div className="lg:col-span-8">
              {specialist.length > 0 ? (
                <ul className="border-t border-rule">
                  {specialist.map((role) => (
                    <li key={role.slug} className="border-b border-rule py-6">
                      <div className="flex flex-wrap items-baseline justify-between gap-3">
                        <h3 className="text-base font-semibold tracking-tight text-ink">
                          {role.title}
                        </h3>
                        <span className="label">{EMPLOYMENT_LABELS[role.employmentType]}</span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                        {role.summary}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <>
                  <p className="max-w-2xl text-base leading-relaxed text-ink-soft">
                    Specialist work is not advertised as fixed listings. It is scoped when an
                    engagement requires it and offered to people already in the network.
                    Typical shapes:
                  </p>
                  <CapabilityList
                    className="mt-8"
                    columns={2}
                    items={[
                      "Drafting and documentation capacity on a defined drawing package",
                      "Research and data structuring on a defined market",
                      "Visualisation or edit work on a defined asset set",
                      "Overflow support against a fixed deadline",
                    ]}
                  />
                </>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* 06 — Talent network + 07 — Submission */}
      <Section tone="surface" bordered id="talent-network">
        <Container width="page">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Eyebrow>Talent network</Eyebrow>
              <h2 className="display mt-5 text-3xl sm:text-4xl">Register your work.</h2>
              <p className="mt-6 text-base leading-relaxed text-ink-soft">
                Send a link to your portfolio or a description of the work you do. We keep
                these on file by discipline and approach people directly when an engagement
                fits.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                We would rather see three pieces of work you can talk through in detail than
                a broad showreel. Applications are read by the founder.
              </p>
              {careersChannel ? (
                <p className="mt-6 text-sm text-ink-muted">
                  Prefer email?{" "}
                  <a
                    href={`mailto:${careersChannel.email}`}
                    className="text-ink underline decoration-rule-strong underline-offset-4 hover:text-accent"
                  >
                    {careersChannel.email}
                  </a>
                </p>
              ) : null}
            </div>

            <div className="lg:col-span-7">
              <TalentForm />
            </div>
          </div>
        </Container>
      </Section>

      {/* 09 — Employment statement placeholder is intentionally omitted:
             no statement is published until it has had legal review. */}
    </>
  );
}
