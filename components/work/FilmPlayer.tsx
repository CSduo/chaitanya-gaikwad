import Link from "next/link";
import { JsonLd } from "@/components/ui/primitives";
import { videoObjectSchema } from "@/lib/seo";
import { filmPath, type VideoProject } from "@/lib/portfolio";

/**
 * A portfolio film as a real, server-rendered <video> element.
 *
 * The MP4 source and poster are in the HTML, so crawlers can find the film and
 * pair it with the structured data. preload="none" keeps the cost of the old
 * click-to-load player: until the visitor presses play, only the poster image
 * is fetched.
 *
 * VideoObject markup is rendered by this component, so it only ever appears
 * where the film is visibly playable. It is emitted on the film's own watch
 * page only (structuredData): Google indexes a video solely on a page whose
 * main content is that video, so markup on gallery and service pages was
 * reported as "Video isn't on a watch page". Elsewhere the caption links to
 * the watch page instead.
 *
 * Frames use one 4:5 ratio so mixed portrait and landscape films line up in a
 * grid; object-contain letterboxes rather than crops the picture.
 */
export function FilmPlayer({
  film,
  title = film.title,
  description = film.description,
  poster = film.poster,
  meta,
  headingLevel = "p",
  className = "",
  structuredData = false,
  watchHref = filmPath(film.slug),
  frame = "grid",
  caption = true,
}: {
  film: VideoProject;
  /** Overrides for a page that captions the film differently (case studies). */
  title?: string;
  description?: string;
  poster?: string;
  /** Client or sector and year, shown above the title. */
  meta?: string;
  /** Render the title as a heading where the film is a section's main item. */
  headingLevel?: "p" | "h3" | "h4";
  className?: string;
  /** Emit VideoObject markup: only on the film's own watch page. */
  structuredData?: boolean;
  /** Link to the film's watch page; null on the watch page itself. */
  watchHref?: string | null;
  /** "grid" letterboxes into a shared 4:5 frame; "natural" keeps the film's own ratio. */
  frame?: "grid" | "natural";
  caption?: boolean;
}) {
  const Title = headingLevel;
  const ratio = `${film.posterWidth} / ${film.posterHeight}`;
  return (
    <figure className={className}>
      {structuredData ? (
        <JsonLd
          data={videoObjectSchema({
            name: title,
            description,
            thumbnailUrl: poster,
            uploadDate: film.uploadDate,
            contentUrl: film.src,
            duration: film.duration,
          })}
        />
      ) : null}
      <div
        className={frame === "grid" ? "aspect-[4/5] overflow-hidden border border-rule bg-ink" : "mx-auto overflow-hidden border border-rule bg-ink"}
        style={frame === "natural" ? { aspectRatio: ratio, width: `min(100%, calc(78vh * ${film.posterWidth} / ${film.posterHeight}))` } : undefined}
      >
        <video
          controls
          playsInline
          preload="none"
          poster={poster}
          width={film.posterWidth}
          height={film.posterHeight}
          aria-label={title}
          className="h-full w-full object-contain"
        >
          <source src={film.src} type="video/mp4" />
          <a href={film.src}>Open the film: {title} (MP4)</a>
        </video>
      </div>
      {caption ? (
        <figcaption className="mt-3">
          {meta ? <p className="meta">{meta}</p> : null}
          <Title className="mt-1 text-sm font-semibold tracking-tight text-ink">{title}</Title>
          {description ? <p className="mt-1 text-sm leading-relaxed text-ink-muted">{description}</p> : null}
          {watchHref ? (
            <Link
              href={watchHref}
              className="mt-2 inline-flex min-h-[32px] items-center gap-1 text-xs font-medium text-ink underline decoration-rule-strong underline-offset-4 transition-colors hover:text-accent"
            >
              Watch the film <span aria-hidden="true">&rarr;</span>
            </Link>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  );
}

/** "Client or sector · year", as the portfolio lists it. */
export function filmMeta(film: VideoProject): string {
  return [film.client ?? film.clientDescriptor, film.year].filter(Boolean).join(" · ");
}
