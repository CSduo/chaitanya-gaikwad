import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container, Section, Eyebrow, Breadcrumbs, JsonLd } from "@/components/ui/primitives";
import { ProjectCTA } from "@/components/site/ProjectCTA";
import { FilmPlayer, filmMeta } from "@/components/work/FilmPlayer";
import { VIDEOS, getFilm, filmPath, filmLength, type VideoProject } from "@/lib/portfolio";
import { allCaseStudies } from "@/lib/case-studies";
import { pageMetadata, breadcrumbSchema, webPageSchema, serviceId } from "@/lib/seo";

/*
 * One watch page per portfolio film. Google indexes a video only on a page
 * whose main content is that video ("Video isn't on a watch page" otherwise),
 * so the film leads the page, carries the VideoObject markup, and every other
 * placement links here. Every fact comes from lib/portfolio.ts.
 */

const SERVICE_PATH = "/services/ai-video-production";
const DESCRIPTION_MAX = 155;

export function generateStaticParams() {
  return VIDEOS.map((film) => ({ slug: film.slug }));
}

export const dynamicParams = false;

function filmDescription(film: VideoProject): string {
  const tail = ` A ${filmLength(film.duration)} film by XIYÀTO, a film and AI video production agency.`;
  const full = `${film.description}${tail}`;
  if (full.length <= DESCRIPTION_MAX) return full;
  if (film.description.length <= DESCRIPTION_MAX) return film.description;
  return `${film.description.slice(0, DESCRIPTION_MAX - 1).replace(/\s+\S*$/, "")}…`;
}

function caseStudyFor(film: VideoProject) {
  return allCaseStudies().find((c) => c.video?.some((v) => v.src === film.src));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const film = getFilm(slug);
  if (!film) return {};
  return pageMetadata({ title: film.title, description: filmDescription(film), path: filmPath(film.slug), image: film.poster });
}

export default async function FilmPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const film = getFilm(slug);
  if (!film) notFound();

  const path = filmPath(film.slug);
  const caseStudy = caseStudyFor(film);
  const portrait = film.posterHeight > film.posterWidth;
  const more = VIDEOS.filter((v) => v.slug !== film.slug).sort((a, b) => a.order - b.order).slice(0, 4);
  const trail = [
    { name: "Home", path: "/" },
    { name: "Work", path: "/work" },
    { name: film.title, path },
  ];
  const facts: { label: string; value: string }[] = [
    { label: film.client ? "Client" : "Sector", value: (film.client ?? film.clientDescriptor) || "Commission" },
    { label: "Year", value: film.year },
    { label: "Length", value: filmLength(film.duration) },
    { label: "Format", value: portrait ? "Vertical, for social and mobile" : "Landscape, for web and screens" },
  ];

  return (
    <>
      <JsonLd data={webPageSchema({ name: film.title, description: filmDescription(film), path, aboutId: serviceId(SERVICE_PATH), image: film.poster })} />
      <JsonLd data={breadcrumbSchema(trail)} />

      <header className="border-b border-rule">
        <Container width="page" className="pb-12 pt-10 sm:pb-16">
          <Breadcrumbs trail={trail} />
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="min-w-0 lg:col-span-7">
              <FilmPlayer film={film} structuredData watchHref={null} frame="natural" caption={false} />
            </div>
            <div className="min-w-0 lg:col-span-5">
              <Eyebrow>Film · {filmMeta(film)}</Eyebrow>
              <h1 className="display mt-6 text-4xl leading-[1.1] sm:text-5xl">{film.title}</h1>
              <p className="mt-6 text-lg leading-relaxed text-ink-soft">{film.description}</p>
              <dl className="mt-8 grid grid-cols-2 gap-px border border-rule bg-rule">
                {facts.map((f) => (
                  <div key={f.label} className="bg-paper p-4">
                    <dt className="meta">{f.label}</dt>
                    <dd className="mt-1 text-sm font-medium text-ink">{f.value}</dd>
                  </div>
                ))}
              </dl>
              {film.tags.length ? (
                <ul className="mt-6 flex flex-wrap gap-2" aria-label="Film tags">
                  {film.tags.map((tag) => (
                    <li key={tag} className="rounded-full border border-rule px-3 py-1 text-xs text-ink-soft">{tag}</li>
                  ))}
                </ul>
              ) : null}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={SERVICE_PATH}
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-xs bg-ink px-6 text-sm font-semibold text-paper transition-colors hover:bg-accent"
                >
                  AI video production <span aria-hidden="true">&rarr;</span>
                </Link>
                {caseStudy ? (
                  <Link
                    href={`/work/${caseStudy.slug}`}
                    className="inline-flex min-h-[48px] items-center gap-2 rounded-xs border border-rule-strong px-6 text-sm font-semibold text-ink transition-colors hover:border-ink"
                  >
                    Read the case study <span aria-hidden="true">&rarr;</span>
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </Container>
      </header>

      <Section tone="surface">
        <Container width="page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Eyebrow>Made by XIYÀTO</Eyebrow>
              <h2 className="display mt-5 text-3xl">A film and AI video production agency.</h2>
            </div>
            <div className="space-y-4 text-[0.9375rem] leading-relaxed text-ink-soft lg:col-span-7">
              <p>
                XIYÀTO is a founder-led film and AI video production agency. We make cinematic brand films, product
                campaigns, showroom and interior walkthroughs and social cut-downs for brands, furniture makers,
                interior studios and developers, working with clients in the UK, Europe, the Middle East, India and
                beyond.
              </p>
              <p>
                Each brief runs on a written scope with agreed review rounds, and every film is mastered for where it
                will play: vertical for Reels, TikTok and Shorts, portrait for feeds and landscape for websites and
                screens.
              </p>
              <Link href={SERVICE_PATH} className="inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-ink underline decoration-rule-strong underline-offset-4 hover:text-accent">
                See the AI video production service <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <Section bordered>
        <Container width="page">
          <Eyebrow>More films</Eyebrow>
          <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {more.map((v) => (
              <li key={v.slug}>
                <Link href={filmPath(v.slug)} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden border border-rule bg-ink">
                    <Image
                      src={v.poster}
                      alt={`${v.title} poster`}
                      fill
                      sizes="(min-width: 640px) 25vw, 50vw"
                      className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="meta mt-3">{filmMeta(v)}</p>
                  <p className="mt-1 text-sm font-semibold tracking-tight text-ink group-hover:text-accent">{v.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <ProjectCTA
        eyebrow="Commission a film"
        title="Want a film like this for your brand?"
        body="Send the product, space or campaign you have in mind. We reply with a scope and a quote."
        serviceSlug="ai-video-production"
      />
    </>
  );
}
