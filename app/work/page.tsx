import type { Metadata } from "next";
import Link from "next/link";
import {
  Container,
  Section,
  SectionHeading,
  Eyebrow,
  Breadcrumbs,
  TextLink,
  JsonLd,
} from "@/components/ui/primitives";
import { ProjectCTA } from "@/components/site/ProjectCTA";
import { RelatedWork } from "@/components/work/cards";
import { ImageGrid } from "@/components/media/viewers";
import {
  WORK_CATEGORIES,
  WORK_HUB_PATH,
  caseStudiesByCategory,
  hubCaseStudies,
  type WorkCategory,
} from "@/lib/case-studies";
import { allVideos, allWebsites, allWorkbooks, CAD_PROJECTS } from "@/lib/portfolio";
import { FilmPlayer, filmMeta } from "@/components/work/FilmPlayer";
import { HIRE_PATH } from "@/lib/hire";
import { featuredRenders, renderVisuals } from "@/lib/visuals";
import { specialismsForService } from "@/lib/specialisms";
import { SITE } from "@/lib/site";
import { pageMetadata, breadcrumbSchema, collectionPageSchema } from "@/lib/seo";
import { ROUTE_SEO } from "@/lib/seo-copy";

export const metadata: Metadata = pageMetadata({
  title: ROUTE_SEO.work.metaTitle,
  description: ROUTE_SEO.work.metaDescription,
  path: WORK_HUB_PATH,
});

const TRAIL = [
  { name: "Home", path: "/" },
  { name: "Work", path: WORK_HUB_PATH },
];

/** Hub sections, in display order. Visualisation and film lead. */
const SECTIONS = [
  { id: "visualisation", label: "3D visualisation" },
  { id: "film", label: "Film" },
  { id: "cad", label: "CAD & technical" },
  { id: "websites", label: "Websites" },
  { id: "research", label: "B2B research" },
] as const;

function blurb(category: WorkCategory): string {
  return WORK_CATEGORIES.find((c) => c.slug === category)?.blurb ?? "";
}

function SectionLinks({ links }: { links: { href: string; label: string }[] }) {
  return (
    <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-1">
      {links.map((link) => (
        <li key={link.href}>
          <TextLink href={link.href}>{link.label}</TextLink>
        </li>
      ))}
    </ul>
  );
}

export default function WorkPage() {
  const studies = hubCaseStudies();
  const renders = featuredRenders(8);
  const renderCount = renderVisuals().length;
  const videos = allVideos();
  const websites = allWebsites();
  const workbooks = allWorkbooks();
  const vizSpecialisms = specialismsForService("visualisation-image-production");
  const cadSpecialisms = specialismsForService("cad-technical-production");

  return (
    <>
      <JsonLd data={breadcrumbSchema(TRAIL)} />
      <JsonLd
        data={collectionPageSchema({
          name: ROUTE_SEO.work.metaTitle,
          description: ROUTE_SEO.work.metaDescription,
          path: WORK_HUB_PATH,
          items: studies.map((s) => ({ name: s.projectName, path: `/work/${s.slug}` })),
        })}
      />

      {/* Hub header */}
      <section className="border-b border-rule bg-paper-deep">
        <Container width="page" className="pb-10 pt-8 sm:pb-14">
          <Breadcrumbs trail={TRAIL} />
          <div className="max-w-3xl">
            <Eyebrow>Portfolio</Eyebrow>
            <h1 className="display mt-4 text-4xl sm:text-5xl lg:text-[3.5rem]">
              3D visualisation, film, CAD and web work.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft">
              Case studies and selected work from {SITE.name}, a founder-led studio. 3D visualisation and film for
              interior, architecture and furniture clients come first, followed by CAD drawing packages, website builds
              and redacted B2B research samples. Where a client has not been made public, the sector is named instead.
            </p>
            <nav aria-label="Portfolio sections" className="mt-7 grid grid-cols-2 gap-x-5 sm:grid-cols-3">
              {SECTIONS.map((section, i) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex min-h-12 min-w-0 items-center gap-2 border-b border-rule py-2 text-xs text-ink-soft transition-colors hover:border-ink hover:text-ink"
                >
                  <span className="font-mono text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <span className="min-w-0">{section.label}</span>
                </a>
              ))}
            </nav>
          </div>
        </Container>
      </section>

      {/* 01 — 3D visualisation */}
      <Section id="visualisation" className="scroll-mt-20">
        <Container width="page">
          <SectionHeading
            eyebrow="01 · 3D visualisation"
            title="3D visualisation and rendering."
            intro="Interior, furniture, product and architectural renders. Studies are produced as sets, so material, lighting and composition options can be compared side by side."
          />
          <div className="mt-10">
            <RelatedWork studies={caseStudiesByCategory("visualisation")} />
          </div>

          <h3 className="label mb-4 mt-14">Selected production renders</h3>
          <ImageGrid
            items={renders.map((v) => ({ src: v.src, alt: v.alt, width: v.width, height: v.height, title: v.title }))}
            columns={4}
            aspect="4/3"
          />
          <p className="mt-3 text-xs leading-relaxed text-ink-muted">
            The 3D rendering page also shows AI-assisted concept studies, labelled separately from these production
            renders.
          </p>
          <SectionLinks
            links={[
              { href: "/services/visualisation-image-production#gallery", label: `See all ${renderCount} production renders` },
              { href: "/services/visualisation-image-production", label: "3D rendering and visualisation services" },
              ...vizSpecialisms.map((s) => ({ href: s.path, label: s.name })),
              { href: HIRE_PATH, label: "Hire a 3D visualiser" },
            ]}
          />
        </Container>
      </Section>

      {/* 02 — Film */}
      <Section id="film" tone="surface" bordered className="scroll-mt-20">
        <Container width="page">
          <SectionHeading eyebrow="02 · Film" title="Product, interior and brand films." intro={blurb("video")} />
          <div className="mt-10">
            <RelatedWork studies={caseStudiesByCategory("video")} />
          </div>

          <h3 className="label mb-4 mt-14">All films</h3>
          {/* Real <video> elements (preload="none") with VideoObject markup. */}
          <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {videos.map((v) => (
              <li key={v.slug}>
                <FilmPlayer film={v} meta={filmMeta(v)} headingLevel="h4" />
              </li>
            ))}
          </ul>
          <SectionLinks
            links={[
              { href: "/services/ai-video-production#films", label: "Films on the video service page" },
              { href: "/services/ai-video-production", label: "AI video production services" },
            ]}
          />
        </Container>
      </Section>

      {/* 03 — CAD & technical */}
      <Section id="cad" bordered className="scroll-mt-20">
        <Container width="page">
          <SectionHeading eyebrow="03 · CAD & technical" title="CAD drawing packages." intro={blurb("technical-production")} />
          <div className="mt-10">
            <RelatedWork studies={caseStudiesByCategory("technical-production")} />
          </div>

          <h3 className="label mb-4 mt-14">Drawing packages</h3>
          <ul className="grid gap-px border border-rule bg-rule sm:grid-cols-2">
            {CAD_PROJECTS.map((p) => (
              <li key={p.id} className="bg-paper p-5 lg:p-6">
                <h4 className="text-base font-semibold tracking-tight text-ink">{p.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{p.summary}</p>
              </li>
            ))}
          </ul>
          <SectionLinks
            links={[
              { href: "/services/cad-technical-production", label: "View the drawings and CAD drafting services" },
              ...cadSpecialisms.map((s) => ({ href: s.path, label: s.name })),
            ]}
          />
        </Container>
      </Section>

      {/* 04 — Websites */}
      <Section id="websites" tone="surface" bordered className="scroll-mt-20">
        <Container width="page">
          <SectionHeading eyebrow="04 · Websites" title="Website builds." intro={blurb("websites")} />
          <ul className="mt-10 grid gap-px border border-rule bg-rule">
            {websites.map((site) => {
              const external = site.liveUrl && !site.liveUrl.startsWith(SITE.url) ? site.liveUrl : null;
              return (
                <li key={site.slug} className="bg-paper p-6 lg:p-7">
                  <p className="meta">{[site.client ?? site.clientDescriptor, site.year].filter(Boolean).join(" · ")}</p>
                  <h3 className="display mt-2 text-xl">{site.title}</h3>
                  <p className="mt-1 text-xs text-ink-muted">{site.role}</p>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">{site.description}</p>
                  {external ? (
                    <TextLink href={external} external className="mt-2">
                      {`Visit ${site.title}`}
                    </TextLink>
                  ) : null}
                </li>
              );
            })}
          </ul>
          <SectionLinks links={[{ href: "/services/website-design-development", label: "Website design and development services" }]} />
        </Container>
      </Section>

      {/* 05 — B2B research */}
      <Section id="research" bordered className="scroll-mt-20">
        <Container width="page">
          <SectionHeading
            eyebrow="05 · B2B research"
            title="B2B research samples."
            intro={`${blurb("growth-b2b")} Each is published as a redacted sample that shows how a deliverable is structured.`}
          />
          <ul className="mt-10 grid gap-px border border-rule bg-rule sm:grid-cols-2">
            {workbooks.map((w) => (
              <li key={w.slug} className="bg-paper p-5">
                <p className="meta">{w.region}</p>
                <Link
                  href={`/work/research/${w.slug}`}
                  className="mt-1 inline-flex min-h-[44px] items-center text-sm font-medium text-ink underline decoration-rule-strong underline-offset-4 hover:text-accent"
                >
                  {w.title}
                </Link>
              </li>
            ))}
          </ul>
          <SectionLinks
            links={[
              { href: "/services/market-intelligence-research", label: "Market intelligence and research services" },
              { href: "/services/b2b-lead-generation", label: "B2B lead generation services" },
            ]}
          />
        </Container>
      </Section>

      <ProjectCTA
        serviceSlug="visualisation-image-production"
        title="Have a project in mind?"
        body="Send the brief with any drawings, references or product files. We confirm the scope, timeline and price before production starts."
      />
    </>
  );
}
