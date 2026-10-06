import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  Container,
  Section,
  SectionHeading,
  Eyebrow,
  ProcessList,
  CapabilityList,
  Breadcrumbs,
  JsonLd,
  TextLink,
} from "@/components/ui/primitives";
import { ImageGrid } from "@/components/media/viewers";
import { ProjectCTA } from "@/components/site/ProjectCTA";
import { FilmPlayer, filmMeta } from "@/components/work/FilmPlayer";
import { pageMetadata, webPageSchema, breadcrumbSchema, serviceId } from "@/lib/seo";
import { rendersByFile } from "@/lib/visuals";
import { filmBySrc } from "@/lib/portfolio";
import { getService } from "@/lib/services";
import { getServicePricing, PRICING_NOTE } from "@/lib/pricing";
import { founder } from "@/lib/company";
import { HIRE_PATH, GUIDE_PATH } from "@/lib/hire";

const TITLE = "Freelance 3D Visualiser for Hire, Founder-Led | XIYÀTO";
const DESCRIPTION =
  "Need a freelance 3D visualiser or 3D artist? Interior, furniture and product renders from $10, founder-led with checked files. Message us on WhatsApp.";
const SERVICE_PATH = "/services/visualisation-image-production";
const CONTACT_HREF = "/contact?service=visualisation-image-production";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: HIRE_PATH,
  image: "/media/visual/vis-21.webp",
});

const TRAIL = [
  { name: "Home", path: "/" },
  { name: "Hire a 3D Visualiser", path: HIRE_PATH },
];

const service = getService("visualisation-image-production")!;
/** The 3D service's published input list, so both pages ask for the same material. */
const INPUTS = service.groups.find((g) => g.title === "Inputs we work from")!.items;

const AUDIENCES = [
  {
    title: "Interior designers and architects",
    body: "Renders for client sign-off, presentation boards and planning material, produced alongside your team while you keep design authorship.",
  },
  {
    title: "Developers and property marketing",
    body: "Interior and lifestyle imagery for brochures, listings and launch material while a scheme is still on paper.",
  },
  {
    title: "Furniture and product brands",
    body: "Catalogue, e-commerce and lifestyle imagery, with fabric, finish and colourway variants held to one treatment across a range.",
  },
  {
    title: "Fit-out and design-build contractors",
    body: "Dimensioned 3D layout studies and finished views produced from approved layouts and marked-up drawings.",
  },
  {
    title: "Studios and marketing teams at full stretch",
    body: "Rendering capacity for a defined project or for regular production work, when an internal team is already stretched.",
  },
];

const COMMISSIONS: { title: string; body: string; href?: string; link?: string }[] = [
  {
    title: "Interior renders",
    body: "Living rooms, bedrooms, bathrooms, hotel lounges, offices and showrooms, with daylight and evening versions and finish variants.",
    href: "/services/visualisation/interior-rendering",
    link: "Interior rendering",
  },
  {
    title: "Furniture and product CGI",
    body: "Studio packshots, styled room settings and colourway sets for furniture, lighting, décor and accessories.",
    href: "/services/visualisation/photorealistic-furniture-rendering",
    link: "Furniture 3D rendering",
  },
  {
    title: "Layout and cutaway studies",
    body: "Top-down and angled 3D cutaways produced from marked-up plans, so a layout can be agreed before finished views.",
  },
  {
    title: "Architectural and exterior views",
    body: "Exterior visualisation is part of the 3D service. The published portfolio is mostly interiors and products, so ask for relevant samples when you send the brief.",
  },
  {
    title: "Brand and campaign visuals",
    body: "Website hero images, launch key visuals, pitch-deck and tender imagery, and frames sized for social formats.",
  },
  {
    title: "Short films and walkthroughs",
    body: "Product campaigns, interior walkthroughs and before-and-after reels, scoped through the video service.",
    href: "/services/ai-video-production",
    link: "Video production",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Brief",
    body: "Send the brief and whatever material exists. It does not need to be complete, and it reaches the founder directly. The first step is separating what is confirmed from what is assumed and what is still missing.",
  },
  {
    step: "02",
    title: "Inputs checklist",
    body: "We list what is in hand and what is still needed: plans, dimensions, finishes, references and where each image will be used. Anything taken from reference rather than measurement is flagged as provisional.",
  },
  {
    step: "03",
    title: "Written scope and price",
    body: "Deliverables, assumptions, formats, revision rounds, delivery and price are agreed in writing before production starts, so the finished work is measured against a defined scope.",
  },
  {
    step: "04",
    title: "Direction and drafts",
    body: "Composition, lighting, materials and mood are agreed against reference. Selected directions are then produced and put forward as options to choose from, not a single take.",
  },
  {
    step: "05",
    title: "Revisions",
    body: "Revisions are worked against your written comments on the chosen route, within the rounds agreed in the scope, so changes are traceable rather than remembered.",
  },
  {
    step: "06",
    title: "Checks and final files",
    body: "Nothing is issued without a review against the agreed scope, including reopening the delivered files. Finals are exported in the formats, ratios and resolutions each placement needs.",
  },
];

const FINAL_FILES = [
  "High-resolution still images in the agreed ratios",
  "Export variants for web, print, presentation and social",
  "Print-ready files at a specified resolution and colour profile",
  "Material, finish and colourway variants of selected views",
  "File structure and naming to your own conventions",
  "Working files retained, and source assets on request",
];

const STANDARDS = [
  {
    title: "A written brief and scope",
    body: "Deliverables, assumptions, output formats and revision rounds are settled in writing before production, on every brief.",
  },
  {
    title: "One accountable lead",
    body: "The founder scopes the work, leads production and carries out the final check. Where an independent specialist is brought in, it is against a written brief and into the same review.",
  },
  {
    title: "Checks before anything is issued",
    body: "Work is reviewed against the agreed scope before delivery, delivered files are reopened, and anything provisional is recorded rather than presented as fact.",
  },
  {
    title: "Revision rounds you can count",
    body: "The number of rounds is agreed up front, and each round is worked against written comments on the route you chose.",
  },
  {
    title: "File standards",
    body: "Ratios, resolution and colour profile are planned for each placement, and files follow the naming and structure your team already uses.",
  },
  {
    title: "Confidentiality",
    body: "Confidentiality terms can be agreed before you share unreleased designs. Clients who are not named in the portfolio stay unnamed; the sector is given instead.",
  },
  {
    title: "Continuity",
    body: "Working files are retained, so a set can be extended later with another room, product or finish, held to the same direction as the original images.",
  },
];

const PROOF_RENDERS = rendersByFile(["vis-41.webp", "vis-21.webp", "render-1.webp", "vis-43.webp", "vis-19.webp", "vis-11.webp"]);

export default function HireA3dVisualiserPage() {
  const person = founder();
  const founderName = person?.name ?? "Chaitanya Gaikwad";
  const price = getServicePricing("visualisation-image-production")[0];
  const films = [
    filmBySrc("/media/video/sultanah-co-moon-chair-cinematic-campaign.mp4"),
    filmBySrc("/media/video/kozena-luxury-furniture-campaign.mp4"),
  ].filter((film) => film !== undefined);

  const faqs: { q: string; a: ReactNode }[] = [
    {
      q: "Are you a freelancer or a studio?",
      a: (
        <>
          A founder-led studio. {founderName} scopes each engagement, leads production and carries out the final check
          before anything is issued, and you deal with him directly from the first message to handover. When a project
          needs more hands, independent specialists are brought in against a written brief, but the scope and the
          sign-off stay with him. <Link href="/company/people" className="underline underline-offset-4 hover:text-accent">About the founder</Link>.
        </>
      ),
    },
    {
      q: "How much does a 3D render cost?",
      a: (
        <>
          {price ? `3D renders start at $${price.amount} (USD) per ${price.unit}. ` : ""}
          The final price depends on image complexity and the source material you can supply, and it is agreed in
          writing before work begins. <Link href={`${SERVICE_PATH}#pricing`} className="underline underline-offset-4 hover:text-accent">See starting prices</Link>.
        </>
      ),
    },
    {
      q: "How long does a render take?",
      a: "There is no fixed turnaround, because timing depends on the number of views, the complexity of the scene and how complete the inputs are. The delivery date is agreed in the written scope before production. Client contact runs from the UK and production is scheduled from India, so work can continue after a UK working day has closed.",
    },
    {
      q: "How many revisions are included?",
      a: "The number of revision rounds is agreed in writing as part of the scope, before production starts. Each round is worked against your written comments on the direction you chose.",
    },
    {
      q: "What do I need to send?",
      a: "Whatever exists: floor plans or marked-up drawings, measured dimensions, site photographs, finish and colour references, product photography, mood boards, brand guidelines and a note on where the images will be used. It does not need to be complete; missing information is listed before any scope is proposed.",
    },
    {
      q: "What files will I receive?",
      a: "High-resolution stills in the agreed ratios, with export variants for web, print, presentation and social, and print-ready files at the resolution and colour profile you specify. Working files are retained so the set can be extended later, and source assets are available on request.",
    },
    {
      q: "Can you keep an unreleased project confidential?",
      a: "Yes. Confidentiality terms can be agreed before you share sensitive drawings or products. Please do not send confidential material through the enquiry form until they are in place. Work is only shown in the portfolio with permission, and unnamed clients are described by sector.",
    },
    {
      q: "Do you work with clients outside the UK?",
      a: "Yes. Everything is delivered digitally, and reviews run on the channels you already use, scheduled around your working day.",
    },
  ];

  return (
    <>
      <JsonLd
        data={webPageSchema({
          name: TITLE.replace(" | XIYÀTO", ""),
          description: DESCRIPTION,
          path: HIRE_PATH,
          aboutId: serviceId(SERVICE_PATH),
          image: "/media/visual/vis-21.webp",
        })}
      />
      <JsonLd data={breadcrumbSchema(TRAIL)} />

      {/* Hero */}
      <section className="border-b border-rule">
        <Container width="page" className="pb-14 pt-10 sm:pb-20">
          <Breadcrumbs trail={TRAIL} />
          <div className="max-w-3xl">
            <Eyebrow>Hire a 3D visualiser · Freelance or studio</Eyebrow>
            <h1 className="display mt-6 text-4xl leading-[1.1] sm:text-5xl lg:text-[3.25rem]">
              Freelance 3D visualiser for hire, founder-led and run like a studio.
            </h1>
            <p className="mt-7 text-lg leading-relaxed text-ink-soft">
              Looking for a freelance 3D visualiser or 3D artist to render an interior, a scheme or a product? At XIYÀTO you deal directly with the person who scopes, produces and checks your images, as you would with
              a good freelancer. Behind that sits a studio process: a written scope, options to choose from, revisions
              against written comments and files checked before they reach you.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-2.5">
              <Link
                href={CONTACT_HREF}
                className="inline-flex min-h-[46px] items-center gap-2 rounded-xs bg-ink px-6 text-xs font-semibold tracking-tight text-paper transition-colors hover:bg-accent"
              >
                <span>Send your rendering brief</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link
                href="/work#visualisation"
                className="inline-flex min-h-[46px] items-center gap-1.5 rounded-xs border border-rule px-4 text-xs font-medium text-ink transition-colors hover:border-ink hover:bg-surface"
              >
                <span>See the portfolio</span>
              </Link>
              <Link
                href={`${SERVICE_PATH}#pricing`}
                className="inline-flex min-h-[46px] items-center gap-1.5 rounded-xs border border-rule px-4 text-xs font-medium text-ink-muted transition-colors hover:border-ink hover:text-ink"
              >
                <span>{price ? `Renders from $${price.amount} per ${price.unit}` : "See starting prices"}</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Who it is for */}
      <Section tone="surface">
        <Container width="page">
          <SectionHeading
            eyebrow="Who this is for"
            title="For teams that need renders without hiring a visualiser full time."
            intro="Businesses that produce work to a professional standard, on a schedule they do not fully control, in volumes that would not justify a permanent hire."
          />
          <ul className="mt-12 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
            {AUDIENCES.map((a) => (
              <li key={a.title} className="bg-paper p-6 lg:p-7">
                <h3 className="text-base font-semibold tracking-tight text-ink">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{a.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* What can be commissioned */}
      <Section bordered>
        <Container width="page">
          <SectionHeading eyebrow="What you can commission" title="Outsource rendering by the image, the room or the range." />
          <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {COMMISSIONS.map((c) => (
              <li key={c.title} className="border-t border-rule pt-5">
                <h3 className="text-base font-semibold tracking-tight text-ink">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{c.body}</p>
                {c.href ? (
                  <div className="mt-1">
                    <TextLink href={c.href}>{c.link}</TextLink>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* How an engagement runs */}
      <Section tone="surface" bordered>
        <Container width="page">
          <SectionHeading
            eyebrow="How an engagement runs"
            title="From brief to final files, in six steps."
            intro="The same sequence applies to a single image and to a full catalogue set."
          />
          <ProcessList className="mt-12 lg:grid-cols-3" steps={STEPS} />
          <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h3 className="display text-2xl">Inputs checklist</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Imagery can be produced from partial information, provided the fixed geometry and the design intent are
                established.
              </p>
              <CapabilityList items={INPUTS} className="mt-5" />
            </div>
            <div>
              <h3 className="display text-2xl">Final files and formats</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Placement decides the format: a presentation board, a brochure spread and a listing thumbnail each get
                their own export.
              </p>
              <CapabilityList items={FINAL_FILES} className="mt-5" />
            </div>
          </div>
        </Container>
      </Section>

      {/* What the studio process adds */}
      <Section bordered>
        <Container width="page">
          <SectionHeading
            eyebrow="Why a studio process"
            title="What you can count on, written into every brief."
            intro="Many freelance visualisers work this carefully, and a good one is worth keeping. The difference here is that these are the standing terms of every engagement, not something to negotiate each time."
          />
          <ul className="mt-12 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
            {STANDARDS.map((s) => (
              <li key={s.title} className="bg-paper p-6">
                <h3 className="text-sm font-semibold tracking-tight text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-ink-muted">
            Still deciding between a freelancer and a studio?{" "}
            <Link href={GUIDE_PATH} className="text-ink underline decoration-rule-strong underline-offset-4 hover:text-accent">
              Read the guide to choosing a freelance 3D visualiser or a studio
            </Link>
            , including a checklist you can use with anyone you are considering.
          </p>
        </Container>
      </Section>

      {/* Pricing and engagement */}
      <Section id="pricing" tone="deep" bordered>
        <Container width="page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Eyebrow>Pricing and engagement</Eyebrow>
              <h2 className="display mt-4 text-2xl sm:text-3xl">A starting price, then a fixed scope.</h2>
              {price ? (
                <p className="mt-6 text-4xl font-semibold tracking-tight text-ink">
                  ${price.amount}
                  <span className="ml-2 text-xs font-normal tracking-normal text-ink-muted">USD / {price.unit}, starting price</span>
                </p>
              ) : null}
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">{PRICING_NOTE}</p>
              <div className="mt-4">
                <TextLink href={`${SERVICE_PATH}#pricing`}>All starting prices on the 3D service page</TextLink>
              </div>
            </div>
            <div className="lg:col-span-7">
              <ul className="grid gap-px border border-rule bg-rule sm:grid-cols-2">
                <li className="bg-paper p-6">
                  <h3 className="text-sm font-semibold tracking-tight text-ink">Project</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    A clear scope, agreed deliverables and a fixed quote. A sensible way to start, even with a single
                    image.
                  </p>
                </li>
                <li className="bg-paper p-6">
                  <h3 className="text-sm font-semibold tracking-tight text-ink">Ongoing support</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    Reliable extra capacity for your team&apos;s regular production work, held to the same direction and
                    file standards from one set to the next.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Portfolio proof */}
      <Section bordered>
        <Container width="wide">
          <SectionHeading
            eyebrow="Portfolio"
            title="Production renders and client films."
            intro="A selection of production renders, followed by two furniture campaign films made for named clients."
            action={{ label: "See all work", href: "/work" }}
          />
          <div className="mt-10">
            <ImageGrid
              items={PROOF_RENDERS.map(({ src, alt, width, height, title }) => ({ src, alt, width, height, title }))}
              columns={3}
              aspect="4/3"
            />
          </div>
          {films.length ? (
            <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:max-w-3xl">
              {films.map((film) => (
                <li key={film.slug}>
                  <FilmPlayer film={film} meta={filmMeta(film)} headingLevel="h3" />
                </li>
              ))}
            </ul>
          ) : null}
          <ul className="mt-10 flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:gap-x-8">
            <li><TextLink href="/work/interior-visualisation-studies">Interior visualisation case study</TextLink></li>
            <li><TextLink href="/work/sultanah-moon-chair-cinematic-campaign">Moon Chair furniture campaign film</TextLink></li>
            <li><TextLink href={SERVICE_PATH}>3D rendering and visualisation services</TextLink></li>
          </ul>
        </Container>
      </Section>

      {/* FAQ: visible HTML only, no FAQPage markup */}
      <Section id="faq" tone="surface" bordered>
        <Container width="page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Eyebrow>Questions</Eyebrow>
              <h2 className="display mt-4 text-2xl sm:text-3xl">Before you hire a 3D visualiser.</h2>
            </div>
            <div className="lg:col-span-8">
              <div className="divide-y divide-rule border-y border-rule">
                {faqs.map((f) => (
                  <div key={f.q} className="py-6">
                    <h3 className="text-base font-semibold tracking-tight text-ink">{f.q}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <ProjectCTA
        serviceSlug="visualisation-image-production"
        eyebrow="Hire a 3D visualiser"
        title="Send the brief you have. Get a defined scope back."
        body="Share plans, references or product photos, even if they are incomplete. We will confirm what is workable, list anything missing and propose a written scope and price before production starts."
        services={[
          { label: "3D Rendering & Visualisation", href: SERVICE_PATH },
          { label: "Interior Rendering", href: "/services/visualisation/interior-rendering" },
          { label: "Furniture 3D Rendering", href: "/services/visualisation/photorealistic-furniture-rendering" },
        ]}
      />
    </>
  );
}
