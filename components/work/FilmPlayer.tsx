import { JsonLd } from "@/components/ui/primitives";
import { videoObjectSchema } from "@/lib/seo";
import type { VideoProject } from "@/lib/portfolio";

/**
 * A portfolio film as a real, server-rendered <video> element, with its
 * VideoObject markup emitted alongside it.
 *
 * The MP4 source and poster are in the HTML, so crawlers can find the film and
 * pair it with the structured data. preload="none" keeps the cost of the old
 * click-to-load player: until the visitor presses play, only the poster image
 * is fetched.
 *
 * Because the JSON-LD is rendered by this component, VideoObject markup can
 * only ever appear where the film is visibly playable, and its name,
 * description and thumbnail are the ones shown on the page.
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
}) {
  const Title = headingLevel;
  return (
    <figure className={className}>
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
      <div className="aspect-[4/5] overflow-hidden border border-rule bg-ink">
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
      <figcaption className="mt-3">
        {meta ? <p className="meta">{meta}</p> : null}
        <Title className="mt-1 text-sm font-semibold tracking-tight text-ink">{title}</Title>
        {description ? <p className="mt-1 text-sm leading-relaxed text-ink-muted">{description}</p> : null}
      </figcaption>
    </figure>
  );
}

/** "Client or sector · year", as the portfolio lists it. */
export function filmMeta(film: VideoProject): string {
  return [film.client ?? film.clientDescriptor, film.year].filter(Boolean).join(" · ");
}
