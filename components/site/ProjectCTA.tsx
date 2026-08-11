import { Container, ButtonLink, Eyebrow } from "@/components/ui/primitives";
import { publishedChannels } from "@/lib/site";

/**
 * The single conversion component, reused on every page.
 * Email channels render only once verified addresses exist.
 */
export function ProjectCTA({
  eyebrow = "Start a project",
  title = "Tell us what needs producing.",
  body = "Send the brief, the drawings or the market you are trying to reach. We will tell you what is workable, what is missing and what it would take.",
  variant = "band",
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  variant?: "band" | "inline";
}) {
  const channels = publishedChannels();

  const content = (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-7">
        <Eyebrow className="text-paper/60">{eyebrow}</Eyebrow>
        <h2 className="display mt-5 text-3xl sm:text-4xl lg:text-[2.75rem]">{title}</h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-paper/75">{body}</p>
      </div>

      <div className="lg:col-span-5 lg:justify-self-end">
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/contact" variant="inverse">
            Start a project
          </ButtonLink>
          <ButtonLink
            href="/work"
            variant="secondary"
            className="border-paper/30 text-paper hover:border-paper hover:bg-paper/10"
          >
            View work
          </ButtonLink>
        </div>

        {channels.length > 0 ? (
          <ul className="mt-8 space-y-2">
            {channels.map((c) => (
              <li key={c.id} className="text-sm text-paper/70">
                <span className="text-paper/50">{c.label}: </span>
                <a
                  href={`mailto:${c.email}`}
                  className="underline decoration-paper/30 underline-offset-4 hover:decoration-paper"
                >
                  {c.email}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );

  if (variant === "inline") {
    return (
      <div className="bg-ink px-6 py-12 text-paper sm:px-10 lg:px-12 lg:py-16">{content}</div>
    );
  }

  return (
    <section className="bg-ink py-16 text-paper sm:py-20 lg:py-24">
      <Container width="page">{content}</Container>
    </section>
  );
}
