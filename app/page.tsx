import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Container,
  Section,
  SectionHeading,
  Eyebrow,
  ButtonLink,
  TextLink,
} from "@/components/ui/primitives";
import { HeroShowreel } from "@/components/home/HeroShowreel";
import {
  CadChapter,
  GrowthChapter,
  VisualChapter,
  ChapterTransition,
} from "@/components/home/ServiceChapters";
import { ProductionTrack } from "@/components/home/ProductionTrack";
import { LocationsPanel } from "@/components/home/LocationsPanel";
import { FeaturedEngagement, SupportingWork } from "@/components/home/FeaturedWork";
import { featuredCaseStudies, allCaseStudies } from "@/lib/case-studies";
import { founder, publishedLocations } from "@/lib/company";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: `${SITE.name} — ${SITE.descriptor}`,
  description: SITE.defaultDescription,
  path: "/",
});

const ENGAGEMENTS = [
  {
    n: "01",
    title: "Project",
    body: "A defined scope with an agreed deliverable list, priced and delivered against it.",
  },
  {
    n: "02",
    title: "Ongoing Support",
    body: "Recurring external production capacity for a steady flow of documentation, research or visual work.",
  },
  {
    n: "03",
    title: "Advisory / Consulting",
    body: "A defined research, systems or workflow engagement where the output is a recommendation rather than production.",
  },
];

export default function HomePage() {
  const featured = featuredCaseStudies(3);
  const lead = featured[0];
  const supporting = featured.slice(1, 3);
  const totalWork = allCaseStudies().length;
  const person = founder();
  const locations = publishedLocations();

  return (
    <>
      {/* ============================================================
          01 — HERO
          Minimal positioning, then a showreel of what the studio does.
         ============================================================ */}
      <section className="border-b border-rule">
        <Container width="page" className="pb-14 pt-12 sm:pt-16 lg:pb-20 lg:pt-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5 lg:pt-6">
              <p className="display text-[1.75rem] tracking-[0.16em] text-ink">{SITE.name}</p>

              <h1 className="display mt-7 text-[2.5rem] leading-[1.04] sm:text-5xl lg:text-[3.5rem]">
                Production capacity for design businesses.
              </h1>

              <p className="mt-7 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg">
                CAD &amp; technical documentation, growth operations and visual content for
                architecture, interior and fit-out teams.
              </p>

              <p className="mt-7 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink-muted">
                United Kingdom · India · International delivery
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink href="/contact">Start a project</ButtonLink>
                <ButtonLink href="/work" variant="secondary">
                  View our work
                </ButtonLink>
              </div>
            </div>

            <div className="lg:col-span-7">
              <HeroShowreel />
            </div>
          </div>
        </Container>
      </section>

      {/* ============================================================
          02 — SERVICES, as three immersive chapters
          Connected by DRAWING → DATA → IMAGE transitions.
         ============================================================ */}
      <Container width="page" className="pt-16 sm:pt-20">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
          <h2 className="display text-3xl sm:text-4xl">What we do.</h2>
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-ink-faint">
            Deliver · Grow · Present
          </p>
        </div>
      </Container>

      <CadChapter />

      <ChapterTransition variant="lines-to-rows" />

      <GrowthChapter />

      <ChapterTransition variant="rows-to-frame" />

      <VisualChapter />

      {/* ============================================================
          03 — SELECTED WORK
         ============================================================ */}
      <Section bordered>
        <Container width="page">
          <SectionHeading
            eyebrow="Selected work"
            title="Recent engagements."
            action={{ label: `All work (${totalWork})`, href: "/work" }}
          />

          {lead ? (
            <div className="mt-14">
              <FeaturedEngagement study={lead} />
            </div>
          ) : null}

          {supporting.length > 0 ? (
            <div className="mt-16 border-t border-rule pt-16">
              <SupportingWork studies={supporting} />
            </div>
          ) : null}
        </Container>
      </Section>

      {/* ============================================================
          04 — HOW XIYÀTO WORKS
         ============================================================ */}
      <Section tone="surface" bordered>
        <Container width="page">
          <SectionHeading
            eyebrow="How we work"
            title="One process, whatever the output."
            intro="The same four stages run whether the deliverable is a drawing package, a research workbook or a film. Only the payload changes."
          />
          <div className="mt-14">
            <ProductionTrack />
          </div>
        </Container>
      </Section>

      {/* ============================================================
          05 — ENGAGEMENT MODEL
         ============================================================ */}
      <Section bordered>
        <Container width="page">
          <SectionHeading
            eyebrow="Engagement model"
            title="Built to plug into your existing team."
          />
          <ol className="mt-14 grid gap-px border border-rule bg-rule lg:grid-cols-3">
            {ENGAGEMENTS.map((e) => (
              <li key={e.title} className="bg-paper p-7 lg:p-9">
                <span className="label">{e.n}</span>
                <h3 className="display mt-4 text-2xl">{e.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">{e.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ============================================================
          06 — FOUNDER
         ============================================================ */}
      {person ? (
        <Section tone="deep" bordered>
          <Container width="page">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <Eyebrow>Founder-led</Eyebrow>
                {person.image ? (
                  <div className="relative mt-6 aspect-[4/5] w-full max-w-xs overflow-hidden border border-rule bg-surface">
                    <Image
                      src={person.image.src}
                      alt={person.image.alt}
                      fill
                      loading="lazy"
                      sizes="(min-width: 1024px) 300px, 60vw"
                      className="object-cover"
                    />
                  </div>
                ) : null}
              </div>

              <div className="lg:col-span-8 lg:pt-12">
                <h2 className="display text-3xl sm:text-4xl">{person.name}</h2>
                <p className="meta mt-3">Founder &amp; Production Lead</p>
                <p className="mt-7 max-w-lg text-base leading-relaxed text-ink-soft">
                  Direct responsibility across project scoping, production systems and
                  quality control. Enquiries reach the person doing the work — there is no
                  account layer in between.
                </p>
                <div className="mt-9">
                  <TextLink href="/company/people">Meet the founder</TextLink>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      {/* ============================================================
          07 — LOCATIONS
         ============================================================ */}
      <section className="border-t border-rule">
        <Container width="page">
          <LocationsPanel locations={locations} />
        </Container>
      </section>

      {/* ============================================================
          08 — PROJECT CTA
         ============================================================ */}
      <section className="bg-ink py-20 text-paper sm:py-28 lg:py-32">
        <Container width="page">
          <div className="max-w-3xl">
            <h2 className="display text-3xl leading-[1.1] sm:text-4xl lg:text-[3rem]">
              Have a project your team needs capacity for?
            </h2>
            <p className="mt-6 text-lg text-paper/70">Tell us what you&rsquo;re working on.</p>
            <div className="mt-10">
              <ButtonLink href="/contact" variant="inverse">
                Start a project
              </ButtonLink>
            </div>
          </div>

          <ul className="mt-16 grid gap-px border border-paper/15 bg-paper/15 sm:grid-cols-3">
            {[
              { label: "CAD & Technical Production", href: "/services/cad-technical-production" },
              { label: "Growth Operations", href: "/services/growth-operations" },
              { label: "Visual Content", href: "/services/visual-content" },
            ].map((s) => (
              <li key={s.href} className="bg-ink">
                <Link
                  href={s.href}
                  className="flex min-h-[64px] items-center justify-between gap-4 px-6 py-5 text-sm text-paper/80 transition-colors hover:bg-paper/5 hover:text-paper"
                >
                  {s.label}
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
