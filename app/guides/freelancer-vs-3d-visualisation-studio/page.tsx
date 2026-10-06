import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section, Eyebrow, Breadcrumbs, JsonLd, TextLink } from "@/components/ui/primitives";
import { ProjectCTA } from "@/components/site/ProjectCTA";
import { pageMetadata, articleSchema, breadcrumbSchema } from "@/lib/seo";
import { founder } from "@/lib/company";
import { getServicePricing } from "@/lib/pricing";
import { HIRE_PATH, GUIDE_PATH, GUIDE_PUBLISHED } from "@/lib/hire";

const TITLE = "Freelancer vs 3D Studio: How to Choose a Visualiser | XIYÀTO";
const HEADLINE = "Freelance 3D visualiser or 3D visualisation studio: how to choose";
const DESCRIPTION =
  "An honest guide to choosing a freelance 3D visualiser or a studio: cost, risk, quality, turnaround, communication and IP, with a checklist and red flags.";
const SERVICE_PATH = "/services/visualisation-image-production";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: GUIDE_PATH,
  type: "article",
});

const TRAIL = [
  { name: "Home", path: "/" },
  { name: "Freelancer or Studio Guide", path: GUIDE_PATH },
];

const PUBLISHED_LABEL = new Date(`${GUIDE_PUBLISHED}T00:00:00Z`).toLocaleDateString("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const FREELANCER_FITS = [
  {
    title: "A small, well-defined job",
    body: "One or two views of a room or a product, with drawings and finishes already settled. There is little to coordinate, and one skilled person can carry it from start to finish.",
  },
  {
    title: "You have found the right person",
    body: "If a freelancer's portfolio already shows your kind of project at the quality you want, that is strong evidence. Experience in your typology matters more than the size of the business behind it.",
  },
  {
    title: "A signature style",
    body: "Some visualisers have a recognisable look that is exactly what a project needs. If you are hiring the style, hire the artist.",
  },
  {
    title: "A tight budget with flexible dates",
    body: "Lower overheads often mean a lower price. If the deadline can move when the visualiser's calendar does, the saving can be worth it.",
  },
];

const STUDIO_FITS = [
  {
    title: "Sets that must match",
    body: "A full scheme, a development or a product range needs the same camera language, lighting and finish treatment across every image, often over months. Written consistency rules and retained working files make that repeatable.",
  },
  {
    title: "Deadlines that cannot move",
    body: "A launch, a planning submission or a client presentation is a fixed date. A studio can usually move work between people when something goes wrong; a single freelancer may have no one to hand over to.",
  },
  {
    title: "More than one discipline",
    body: "When the same project needs stills, a short film, drawings or a website, one supplier working from one set of inputs avoids each specialist rebuilding the scene from scratch.",
  },
  {
    title: "Process you can audit",
    body: "If you need a written scope, defined review stages, counted revision rounds and checks before delivery as standard, not as a favour, a studio is more likely to work that way by default.",
  },
];

const COMPARISON: { factor: string; freelancer: string; studio: string }[] = [
  {
    factor: "Cost",
    freelancer: "Often lower per image, because overheads are lower. Check what is included: revision rounds, resolution and file formats.",
    studio: "Often higher per image, because the price includes coordination and review time. Usually quoted against a written scope.",
  },
  {
    factor: "Risk and continuity",
    freelancer: "Depends on one person's availability. Illness, holidays or a bigger client can stall a project with no one to take over.",
    studio: "Work can usually be covered by someone else, and files are normally kept so a set can be extended later.",
  },
  {
    factor: "Quality and consistency",
    freelancer: "Can be outstanding, and is as consistent as that individual. Quality varies widely between freelancers, so the portfolio is the evidence.",
    studio: "Depends on the studio's review process. Consistency across large sets is easier to hold when the rules are written down.",
  },
  {
    factor: "Turnaround",
    freelancer: "Fast when they are free, slow when they are booked. A single calendar sets the pace.",
    studio: "Can split a deadline across people, but you may queue behind other projects. Ask for a delivery date in writing either way.",
  },
  {
    factor: "Communication",
    freelancer: "Direct: you talk to the person doing the work, which keeps feedback loops short.",
    studio: "Can involve an account manager between you and the artist. Ask who you will actually speak to.",
  },
  {
    factor: "IP and usage rights",
    freelancer: "Set by your agreement, or by the marketplace's terms if you hire through one. Read them.",
    studio: "Set by the studio's terms or your contract. Either way, get ownership, usage and portfolio rights in writing.",
  },
];

const CHECKLIST: { title: string; body: string }[] = [
  { title: "Relevant portfolio", body: "Look for your kind of project: interiors, exteriors, products or furniture, at the quality you need, not just images that look impressive." },
  { title: "Proof of what is real", body: "Ask which portfolio images were client commissions and which were personal or concept studies." },
  { title: "Who does the work", body: "Ask who will produce your images, who checks them before you see them, and who you will speak to day to day." },
  { title: "A written scope", body: "Number of views, ratios, resolution, file formats, revision rounds and the delivery date, agreed before production starts." },
  { title: "An inputs list", body: "A good visualiser tells you exactly what they need: plans, dimensions, finishes, references and where each image will be used." },
  { title: "Review stages", body: "Find out what you will see before the final render, such as camera angles, a draft or a set of options, and when." },
  { title: "How revisions are counted", body: "What counts as a revision, how many rounds are included, and what a change to the design itself costs." },
  { title: "File standards", body: "Delivery formats, colour profile and print resolution, and whether working files are kept so the set can be extended later." },
  { title: "Rights", body: "Who owns the final images and working files, where you may use them, and whether the visualiser may show the work in a portfolio." },
  { title: "Confidentiality", body: "Whether confidentiality terms can be agreed before you share unreleased designs." },
  { title: "Communication and time zones", body: "Which channel, how quickly they reply, and how much of their working day overlaps with yours for reviews." },
  { title: "A plan B", body: "What happens if the person producing your images becomes unavailable mid-project." },
];

const RED_FLAGS: { title: string; body: string }[] = [
  { title: "A firm price before they have seen your inputs", body: "Without drawings and references, a fixed price is a guess, and the difference usually comes back later as extras." },
  { title: "\"Unlimited revisions\" instead of a scope", body: "Revisions work best against agreed direction. An unlimited offer often means the direction was never defined." },
  { title: "A portfolio with no context", body: "No clients, sectors or dates, and no way to tell commissioned work from stock images or personal studies." },
  { title: "No one can say who does the work", body: "If the person quoting cannot tell you who will produce and check your images, nobody may be accountable for them." },
  { title: "Nothing to review until the end", body: "If the first thing you will see is a finished render, every correction costs a full re-render." },
  { title: "Vague answers about files", body: "If formats, resolution, colour profile and working files are \"whatever you need\", agree them in writing before you start." },
  { title: "Reluctance to put rights in writing", body: "Ownership and usage of the images should never be left to assumption, especially for marketing material." },
];

export default function FreelancerVsStudioGuidePage() {
  const person = founder();
  const authorName = person?.name ?? "Chaitanya Gaikwad";
  const price = getServicePricing("visualisation-image-production")[0];

  return (
    <>
      <JsonLd
        data={articleSchema({
          headline: HEADLINE,
          description: DESCRIPTION,
          path: GUIDE_PATH,
          datePublished: GUIDE_PUBLISHED,
        })}
      />
      <JsonLd data={breadcrumbSchema(TRAIL)} />

      <article>
        {/* Header */}
        <header className="border-b border-rule">
          <Container width="page" className="pb-12 pt-10 sm:pb-16">
            <Breadcrumbs trail={TRAIL} />
            <div className="max-w-3xl">
              <Eyebrow>Guide · Hiring 3D visualisation</Eyebrow>
              <h1 className="display mt-6 text-4xl leading-[1.1] sm:text-5xl lg:text-[3.25rem]">{HEADLINE}</h1>
              <p className="mt-7 text-lg leading-relaxed text-ink-soft">
                Both can produce excellent renders. The real differences are in who carries the risk, how consistency is
                held across a set, and who is accountable when something needs correcting. This guide sets out when
                each is the better choice, and gives you a checklist to use with anyone you are considering.
              </p>
              <p className="meta mt-8">
                By{" "}
                <Link href="/company/people" className="text-ink underline decoration-rule-strong underline-offset-4 hover:text-accent">
                  {authorName}
                </Link>
                , founder of XIYÀTO · Published <time dateTime={GUIDE_PUBLISHED}>{PUBLISHED_LABEL}</time>
              </p>
              <p className="mt-4 border-l-2 border-accent/60 pl-4 text-sm leading-relaxed text-ink-muted">
                A note on interest: XIYÀTO is a 3D visualisation studio, so we have a stake in this question. We have
                tried to answer it fairly, including the cases where a freelancer is the better hire.
              </p>
            </div>
          </Container>
        </header>

        {/* Short answer */}
        <Section tone="surface">
          <Container width="page">
            <div className="max-w-3xl">
              <h2 className="display text-2xl sm:text-3xl">The short answer</h2>
              <ul className="prose-body mt-6 list-disc space-y-3 pl-5 text-ink-soft">
                <li>
                  Hire a <strong>freelance 3D visualiser</strong> for a small, well-defined job, when their portfolio
                  already shows your kind of project, or when you want one artist&apos;s style.
                </li>
                <li>
                  Hire a <strong>3D visualisation studio</strong> when images must match across a large set, when the
                  deadline cannot move, or when the project also needs film, drawings or other disciplines.
                </li>
                <li>
                  Whichever you choose, insist on a written scope, a clear list of inputs, defined review stages and
                  rights agreed in writing. Those protect you more than the size of the supplier.
                </li>
              </ul>
            </div>
          </Container>
        </Section>

        {/* When each fits */}
        <Section bordered>
          <Container width="page">
            <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="display text-2xl sm:text-3xl">When a freelancer is the right choice</h2>
                <div className="mt-6 space-y-6">
                  {FREELANCER_FITS.map((item) => (
                    <div key={item.title} className="border-t border-rule pt-4">
                      <h3 className="text-base font-semibold tracking-tight text-ink">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="display text-2xl sm:text-3xl">When a studio is the right choice</h2>
                <div className="mt-6 space-y-6">
                  {STUDIO_FITS.map((item) => (
                    <div key={item.title} className="border-t border-rule pt-4">
                      <h3 className="text-base font-semibold tracking-tight text-ink">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Comparison table */}
        <Section tone="surface" bordered>
          <Container width="page">
            <h2 className="display max-w-3xl text-2xl sm:text-3xl">Freelancer and studio, factor by factor</h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-muted">
              These are tendencies, not rules. A well-organised freelancer can out-perform a disorganised studio, which
              is why the checklist below matters more than the label.
            </p>
            {/* Scrolls sideways on narrow screens; focusable so keyboard users can scroll it too. */}
            <div
              className="mt-8 overflow-x-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              tabIndex={0}
              role="region"
              aria-label="Freelancer and studio comparison table, scrolls horizontally on small screens"
            >
              <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
                <caption className="sr-only">How a freelance 3D visualiser and a 3D visualisation studio typically compare</caption>
                <thead>
                  <tr className="border-b border-rule-strong">
                    <th scope="col" className="w-1/5 py-3 pr-4 font-semibold text-ink">Factor</th>
                    <th scope="col" className="py-3 pr-4 font-semibold text-ink">Freelancer, typically</th>
                    <th scope="col" className="py-3 font-semibold text-ink">Studio, typically</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row) => (
                    <tr key={row.factor} className="border-b border-rule align-top">
                      <th scope="row" className="py-4 pr-4 font-semibold text-ink">{row.factor}</th>
                      <td className="py-4 pr-4 leading-relaxed text-ink-muted">{row.freelancer}</td>
                      <td className="py-4 leading-relaxed text-ink-muted">{row.studio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Container>
        </Section>

        {/* Checklist */}
        <Section bordered>
          <Container width="page">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <Eyebrow>Checklist</Eyebrow>
                <h2 className="display mt-4 text-2xl sm:text-3xl">Twelve questions for any visualiser.</h2>
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                  Use these with a freelancer, a studio or us. Good suppliers answer them without hesitation.
                </p>
              </div>
              <ol className="grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:col-span-8">
                {CHECKLIST.map((item, i) => (
                  <li key={item.title} className="bg-paper p-5">
                    <span className="label block">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-2 text-sm font-semibold tracking-tight text-ink">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-muted">{item.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </Container>
        </Section>

        {/* Red flags */}
        <Section tone="deep" bordered>
          <Container width="page">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <Eyebrow>Red flags</Eyebrow>
                <h2 className="display mt-4 text-2xl sm:text-3xl">Warning signs, whoever you hire.</h2>
              </div>
              <ul className="space-y-5 lg:col-span-8">
                {RED_FLAGS.map((item) => (
                  <li key={item.title} className="border-t border-rule pt-4">
                    <h3 className="text-base font-semibold tracking-tight text-ink">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-muted">{item.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </Section>

        {/* Where XIYÀTO sits */}
        <Section bordered>
          <Container width="page">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <Eyebrow>Where XIYÀTO sits</Eyebrow>
                <h2 className="display mt-4 text-2xl sm:text-3xl">Founder-led like a freelancer, run like a studio.</h2>
              </div>
              <div className="prose-body max-w-2xl space-y-5 text-ink-soft lg:col-span-8">
                <p>
                  XIYÀTO is a small, founder-led studio. {authorName} scopes every engagement, leads production and
                  carries out the final check, and clients deal with him directly, so feedback loops stay as short as
                  they would with a freelancer. When a project needs more hands, independent specialists are brought in
                  against a written brief and into the same review.
                </p>
                <p>
                  The studio side is the process. Every brief starts by separating what is confirmed from what is
                  assumed and what is missing. Deliverables, formats, revision rounds and price are agreed in writing
                  before production. Directions are shown as options, revisions are worked against written comments,
                  delivered files are reopened and checked before issue, and working files are kept so a set can be
                  extended later.
                </p>
                <p>
                  Where we are not the right fit: if you want a large in-house team on call, or one artist&apos;s
                  signature style, a bigger studio or that artist is the better hire. Our published portfolio is mostly
                  interiors, furniture and products{price ? `, and renders start at $${price.amount} (USD) per ${price.unit}` : ""}.
                </p>
                <ul className="not-prose flex flex-col gap-1 pt-2 sm:flex-row sm:flex-wrap sm:gap-x-8">
                  <li><TextLink href={HIRE_PATH}>How hiring XIYÀTO works</TextLink></li>
                  <li><TextLink href={SERVICE_PATH}>3D rendering and visualisation services</TextLink></li>
                  <li><TextLink href="/work">See the portfolio</TextLink></li>
                </ul>
              </div>
            </div>
          </Container>
        </Section>
      </article>

      <ProjectCTA
        serviceSlug="visualisation-image-production"
        eyebrow="Test us against the checklist"
        title="Send a brief and ask us the twelve questions."
        body="Share plans, references or product photos. You will get straight answers on who does the work, what you will review, how revisions are counted and what you will receive."
        services={[
          { label: "Hire a 3D Visualiser", href: HIRE_PATH },
          { label: "3D Rendering & Visualisation", href: SERVICE_PATH },
          { label: "Interior Rendering", href: "/services/visualisation/interior-rendering" },
        ]}
      />
    </>
  );
}
