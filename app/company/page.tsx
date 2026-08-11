import type { Metadata } from "next";
import Image from "next/image";
import {
  Container,
  Section,
  SectionHeading,
  Eyebrow,
  CapabilityList,
  TextLink,
  JsonLd,
} from "@/components/ui/primitives";
import { ProjectCTA } from "@/components/site/ProjectCTA";
import { ServiceCard } from "@/components/work/cards";
import { SERVICES } from "@/lib/services";
import {
  founder,
  publishedLocations,
  teamMembers,
  specialists,
  DISCIPLINES,
} from "@/lib/company";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Company",
  description:
    "XIYÀTO is a founder-led production studio delivering technical documentation, growth operations and visual content for design-led businesses across the UK, Europe, the Middle East and Asia.",
  path: "/company",
});

const PRINCIPLES = [
  {
    title: "Establish what is actually known",
    body: "Every engagement starts by separating confirmed information from assumption. Anything derived from visual reference is flagged as provisional rather than presented as fact.",
  },
  {
    title: "Produce work that can be continued",
    body: "Deliverables are structured so the client's own team can open, interrogate and extend them. Native geometry, documented methodology, no locked black boxes.",
  },
  {
    title: "Stay inside our remit",
    body: "We are production capacity. Design authorship, technical authority and statutory responsibility remain with the client's qualified people.",
  },
  {
    title: "Say what the evidence supports",
    body: "Claims about output are stated in operational terms — what was produced, at what scale, in what structure. Outcome figures we cannot substantiate are not published.",
  },
];

const INDUSTRIES = [
  "Interior design practices",
  "Architecture and design studios",
  "Fit-out and design-build contractors",
  "Furniture and product businesses",
  "Hospitality and commercial developers",
  "Manufacturers and export businesses",
];

export default function CompanyPage() {
  const person = founder();
  const locations = publishedLocations();
  const team = teamMembers();
  const network = specialists();
  const hasWiderTeam = team.length > 0 || network.length > 0;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Company", path: "/company" },
        ])}
      />

      {/* 01 — Company hero */}
      <section className="border-b border-rule">
        <Container width="page" className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <Eyebrow>Company</Eyebrow>
            <h1 className="display mt-6 text-4xl sm:text-5xl lg:text-[3.5rem]">
              A production studio built around one idea.
            </h1>
            <p className="mt-7 text-lg leading-relaxed text-ink-soft">
              Design businesses need drawings, data and visual material produced to a
              professional standard, on a schedule they do not control, in volumes that do
              not justify permanent hires. XIYÀTO exists to be that capacity.
            </p>
          </div>
        </Container>
      </section>

      {/* 02 — Introduction / what XIYÀTO does */}
      <Section tone="surface">
        <Container width="page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Eyebrow>What we do</Eyebrow>
            </div>
            <div className="lg:col-span-8">
              <div className="prose-body max-w-2xl">
                <p>
                  XIYÀTO operates across three disciplines: technical documentation and CAD
                  production, market research and outreach systems, and visual content. Most
                  engagements draw on more than one, because most projects need drawings,
                  data and presentation material at different points.
                </p>
                <p>
                  We are engaged as external capacity behind a practice or business rather
                  than as a front-facing agency. Clients keep design authorship and client
                  relationships; we take on production work and return it in a state that can
                  be checked and continued internally.
                </p>
              </div>
              <div className="mt-10 grid gap-px border border-rule bg-rule sm:grid-cols-3">
                {SERVICES.map((s) => (
                  <ServiceCard key={s.slug} service={s} />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 03 — Story + 04 — Purpose */}
      <Section bordered>
        <Container width="page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Eyebrow>Background</Eyebrow>
              <h2 className="display mt-5 text-3xl">Why the studio exists.</h2>
            </div>
            <div className="lg:col-span-8">
              <div className="prose-body max-w-2xl">
                <p>
                  XIYÀTO grew out of freelance production work for interior studios, fit-out
                  businesses and manufacturers. The same pattern kept appearing: the design
                  thinking was resolved, but the documentation, the market groundwork or the
                  presentation material was the bottleneck — and the work was too irregular
                  to justify hiring for.
                </p>
                <p>
                  The studio was formed to make that capacity dependable rather than
                  ad hoc: a defined scope, a defined process, a defined standard of handover,
                  available when a practice needs it and not carried as overhead when it does
                  not.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 05 — Operating model */}
      <Section tone="deep" bordered>
        <Container width="page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Eyebrow>Operating model</Eyebrow>
              <h2 className="display mt-5 text-3xl">How the business runs.</h2>
            </div>
            <div className="lg:col-span-8">
              <dl className="border-t border-rule">
                {[
                  {
                    t: "Founder-led delivery",
                    d: "Scoping, production leadership and final quality checks sit with the founder on every engagement. There is no account layer between the client and the work.",
                  },
                  {
                    t: "Scope before production",
                    d: "Nothing is produced against an unresolved brief. Deliverables, formats and assumptions are agreed in writing first.",
                  },
                  {
                    t: "Engagement shapes",
                    d: "Defined projects, ongoing production capacity, and short-notice overflow support when an internal team is at capacity.",
                  },
                  {
                    t: "Two-timezone working",
                    d: "A UK-facing commercial presence with production running from India, which gives usable overlap for review and a working turnaround across the day.",
                  },
                ].map((row) => (
                  <div key={row.t} className="border-b border-rule py-6">
                    <dt className="text-base font-semibold tracking-tight text-ink">
                      {row.t}
                    </dt>
                    <dd className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">
                      {row.d}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </Section>

      {/* 06 — Industries served */}
      <Section bordered>
        <Container width="page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Eyebrow>Who we work with</Eyebrow>
              <h2 className="display mt-5 text-3xl">Design-led businesses.</h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                Common thread: a professional output standard, an irregular production load,
                and internal teams that would rather not be drafting or list-building.
              </p>
            </div>
            <div className="lg:col-span-8">
              <CapabilityList items={INDUSTRIES} columns={2} />
            </div>
          </div>
        </Container>
      </Section>

      {/* 07 — Working principles */}
      <Section tone="surface" bordered>
        <Container width="page">
          <SectionHeading eyebrow="Principles" title="How we work, in practice." />
          <div className="mt-14 grid gap-px border border-rule bg-rule sm:grid-cols-2">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="bg-surface p-7 lg:p-8">
                <h3 className="text-base font-semibold tracking-tight text-ink">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 08 — Technology and systems approach */}
      <Section bordered>
        <Container width="page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Eyebrow>Technology</Eyebrow>
              <h2 className="display mt-5 text-3xl">Tools serve the handover.</h2>
            </div>
            <div className="lg:col-span-8">
              <div className="prose-body max-w-2xl">
                <p>
                  We are deliberately unromantic about tooling. Software choices are made
                  against one test: does the client receive something their own team can open,
                  edit and continue without depending on us?
                </p>
                <p>
                  That means native CAD geometry rather than traced raster, structured and
                  documented data rather than exported screenshots, and delivery formats
                  chosen for the receiving team rather than for our convenience. Where
                  automation or generative tooling speeds up production, it is used — but the
                  output is checked by a person and the methodology is disclosed rather than
                  presented as a selling point in itself.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 09 — Geographic operating model */}
      <Section tone="deep" bordered>
        <Container width="page">
          <SectionHeading
            eyebrow="Geography"
            title="UK-facing, delivered from India, working internationally."
            action={{ label: "Locations", href: "/company/locations" }}
          />
          <div className="mt-14 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
            {locations.map((loc) => (
              <div key={loc.slug} className="bg-paper p-7">
                <h3 className="display text-xl">{loc.name}</h3>
                {loc.timezone ? <p className="meta mt-2">{loc.timezone}</p> : null}
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">{loc.summary}</p>
              </div>
            ))}
            <div className="bg-paper p-7">
              <h3 className="display text-xl">International delivery</h3>
              <p className="meta mt-2">Remote</p>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                Engagements run across the United Kingdom, Europe, the Middle East and Asia,
                delivered digitally and scheduled around the client&rsquo;s working day.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 10 — Founder preview + 11 — People preview */}
      {person ? (
        <Section bordered>
          <Container width="page">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              {person.image ? (
                <div className="lg:col-span-4">
                  <div className="relative aspect-[4/5] w-full max-w-xs overflow-hidden border border-rule bg-surface">
                    <Image
                      src={person.image.src}
                      alt={person.image.alt}
                      fill
                      loading="lazy"
                      sizes="(min-width: 1024px) 320px, 60vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              ) : null}
              <div className="lg:col-span-8">
                <Eyebrow>Accountability</Eyebrow>
                <h2 className="display mt-5 text-3xl">{person.name}</h2>
                <p className="meta mt-2">{person.role}</p>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft">
                  {person.biography[0]}
                </p>
                {hasWiderTeam ? (
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-muted">
                    Production is supported by a wider group of specialists engaged per
                    project.
                  </p>
                ) : null}
                <div className="mt-8">
                  <TextLink href="/company/people">Founder &amp; people</TextLink>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      {/* 12 — Careers preview */}
      <Section tone="surface" bordered>
        <Container width="page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Eyebrow>Careers</Eyebrow>
              <h2 className="display mt-5 text-3xl">Working with XIYÀTO.</h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                We keep a talent network of specialists across the three disciplines, and
                approach it when an engagement calls for it.
              </p>
              <div className="mt-6">
                <TextLink href="/careers">Careers and talent network</TextLink>
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className="grid gap-px border border-rule bg-rule sm:grid-cols-3">
                {DISCIPLINES.map((d) => (
                  <div key={d.title} className="bg-surface p-6">
                    <h3 className="label mb-3">{d.title}</h3>
                    <p className="text-sm leading-relaxed text-ink-muted">{d.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 13 — CTA */}
      <ProjectCTA />
    </>
  );
}
