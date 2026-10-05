import type { Metadata } from "next";
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
import { FilmPlayer } from "@/components/work/FilmPlayer";
import { pageMetadata, serviceSchema, breadcrumbSchema } from "@/lib/seo";
import { getSpecialism, specialismBreadcrumbTrail } from "@/lib/specialisms";
import { rendersByFile, type VisualItem } from "@/lib/visuals";
import { filmBySrc } from "@/lib/portfolio";
import { getService } from "@/lib/services";
import { getServiceWhatsAppHref } from "@/lib/site";

const PATH = "/services/visualisation/interior-rendering";
const TITLE = "Interior Rendering & 3D Interior Visualisation | XIYÀTO";
const DESCRIPTION =
  "Photorealistic interior renders of homes, hospitality spaces, offices and showrooms, made from your plans and finishes, with lighting and finish variants.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  image: "/media/visual/vis-41.webp",
});

/** Home > Services > 3D Rendering & Visualisation > Interior Rendering (visible and JSON-LD). */
const TRAIL = specialismBreadcrumbTrail(getSpecialism(PATH)!);

/** The parent service's published input list: one source for what clients are asked to send. */
const INPUTS = getService("visualisation-image-production")!.groups.find((g) => g.title === "Inputs we work from")!.items;

const gridItems = (visuals: VisualItem[]) =>
  visuals.map(({ src, alt, width, height, title }) => ({ src, alt, width, height, title }));

/* Production renders only: rendersByFile() refuses AI concept studies. */
const ROOM_GROUPS: { title: string; body: string; files: string[] }[] = [
  {
    title: "Living rooms and bedrooms",
    body:
      "Residential work is mostly about atmosphere you can defend. The formal living room below is lit for evening, with table lamps carrying the light and the staircase read through an opening. The bedroom studies set a tall upholstered headboard against panelling under a crystal chandelier, or a textured accent wall washed by concealed cove lighting. Each is a decision about finish, light and furniture that a client can approve or change before anything is ordered.",
    files: ["vis-41.webp", "vis-20.webp", "vis-23.webp", "vis-2.webp", "vis-33.webp", "vis-22.webp"],
  },
  {
    title: "Bathrooms, utility rooms and joinery",
    body:
      "Small rooms are where joinery and finishes have to work hardest, and where a render settles arguments early. The travertine-look bathroom shows a wall-hung toilet, a vessel basin on a stone ledge, backlit shelving and matte black tapware in a narrow plan. The laundry room resolves pale oak overhead cabinets, a pull-out ironing board and stacked appliances. The hallway study is a floor-to-ceiling dark wood wardrobe with slim brass handles, drawn tight to the corridor width.",
    files: ["render-1.webp", "render-6.webp", "render-3.webp"],
  },
  {
    title: "Hospitality, workplace and showroom interiors",
    body:
      "Commercial interiors are judged on first impression. The pavilion lounge is a double-height timber room at night, with folding doors open to a terrace and water. The lounge bar pairs a curved sofa and bronze tables with a vaulted arched corridor. The office waiting area combines green armchairs, a moss and brass wall panel and a fluted grey wall. The showroom studies set out curtain styles in labelled alcoves and a textile display of cushions and swatch racks.",
    files: ["vis-42.webp", "vis-43.webp", "vis-19.webp", "vis-36.webp", "vis-27.webp", "vis-6.webp"],
  },
];

/** One bedroom shown three ways: the dimensioned layout study the parent service lists. */
const LAYOUT_STUDY = rendersByFile(["vis-15.webp", "vis-16.webp", "vis-14.webp"]);

const VARIANTS = [
  "Daylight and evening versions of the same view",
  "Material, finish and colour-scheme variants of a single camera",
  "Concept options prepared side by side for client selection",
  "Comparison views of an existing room against the proposal",
  "Dimensioned 3D layout studies produced from marked-up plans",
  "Consistency rules held across every room in a set",
];

const STEPS = [
  {
    step: "01",
    title: "Brief and placement",
    body: "You send the plan, finishes and references, and say where each image will be used: a client presentation, a brochure, a listing or a website. Placement sets the ratio, resolution and level of detail before modelling starts.",
  },
  {
    step: "02",
    title: "Direction",
    body: "Camera positions, lighting, material treatment and mood are agreed against reference. For a set of rooms, the rules that keep the set consistent are fixed here, not after the first image.",
  },
  {
    step: "03",
    title: "Production and review",
    body: "Selected views are produced and put forward as options rather than a single take. Revisions are worked against your written comments on the chosen route, within the rounds agreed in the scope.",
  },
  {
    step: "04",
    title: "Delivery",
    body: "Final renders are exported to the formats, ratios and resolutions each placement needs. Working files are retained, so the set can be extended when another room or a revised finish comes in.",
  },
];

const DELIVERABLES = [
  "High-resolution interior renders in the agreed ratios",
  "Export variants for web, print, presentation and social",
  "Finish and colourway variants of selected views",
  "Dimensioned 3D layout studies where a plan is supplied",
  "Print-ready files at a specified resolution and colour profile",
  "Working files and source assets on request",
];

export default function InteriorRenderingPage() {
  const roomTransformation = filmBySrc("/media/video/room-transformation-interior-walkthrough.mp4");

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Interior rendering and 3D interior visualisation",
          serviceType: "Interior rendering",
          description: DESCRIPTION,
          path: PATH,
        })}
      />
      <JsonLd data={breadcrumbSchema(TRAIL)} />

      {/* Hero */}
      <section className="border-b border-rule">
        <Container width="page" className="pb-14 pt-10 sm:pb-20">
          <Breadcrumbs trail={TRAIL} />
          <div className="max-w-3xl">
            <Eyebrow>3D visualisation · Interiors</Eyebrow>
            <h1 className="display mt-6 text-4xl leading-[1.1] sm:text-5xl lg:text-[3.25rem]">
              Interior rendering that shows the room before it is built.
            </h1>
            <p className="mt-7 text-lg leading-relaxed text-ink-soft">
              Photorealistic 3D interior renders for interior designers, architects, developers and fit-out teams:
              living rooms, bedrooms, bathrooms, hotel lounges, offices and showrooms, produced from your plans, finishes
              and references. You deal directly with the founder, and every brief runs through the same written scope,
              review stages and checks before delivery.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-2.5">
              <Link
                href="/contact?service=visualisation-image-production"
                className="inline-flex min-h-[46px] items-center gap-2 rounded-xs bg-ink px-6 text-xs font-semibold tracking-tight text-paper transition-colors hover:bg-accent"
              >
                <span>Send an interior rendering brief</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
              <a
                href={getServiceWhatsAppHref("visualisation-image-production", "uk")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[46px] items-center gap-1.5 rounded-xs border border-rule px-4 text-xs font-medium text-ink transition-colors hover:border-ink hover:bg-surface"
              >
                <span>Discuss it on WhatsApp</span>
                <span aria-hidden="true">&#8599;</span>
              </a>
              <Link
                href="/services/visualisation-image-production#pricing"
                className="inline-flex min-h-[46px] items-center gap-1.5 rounded-xs border border-rule px-4 text-xs font-medium text-ink-muted transition-colors hover:border-ink hover:text-ink"
              >
                <span>See starting prices</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Why interiors are rendered */}
      <Section tone="surface">
        <Container width="page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Eyebrow>What it is for</Eyebrow>
              <h2 className="display mt-4 text-2xl sm:text-3xl">A decision made on screen costs less than one made on site.</h2>
            </div>
            <div className="prose-body max-w-2xl space-y-5 text-ink-soft lg:col-span-8">
              <p>
                Most interiors have to be sold before they are built. A client signing off a scheme, a developer
                marketing a unit or a contractor confirming joinery all need to see the finished room, and a plan or a
                mood board only gets them part of the way. Interior rendering closes that gap: the layout, finishes,
                furniture and light are put together in a 3D scene and photographed from the camera positions that
                matter.
              </p>
              <p>
                Whether you call it interior rendering, interior CGI or interior visualization, the deliverable is the
                same: images composed for where they will be used. A presentation board, a brochure spread and a listing
                thumbnail need different ratios and different levels of detail, so placement is settled first and the
                renders are built to it.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Rooms and spaces, with production renders */}
      <Section bordered>
        <Container width="wide">
          <SectionHeading
            eyebrow="Rooms and spaces"
            title="Interiors we render, with the work to show for it."
            intro="Every image on this page is a production render from the studio's portfolio, not an AI-generated concept study."
          />
          <div className="mt-14 space-y-16">
            {ROOM_GROUPS.map((group) => (
              <div key={group.title} className="grid gap-8 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-4">
                  <h3 className="display text-2xl">{group.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-ink-muted">{group.body}</p>
                </div>
                <div className="lg:col-span-8">
                  <ImageGrid items={gridItems(rendersByFile(group.files))} columns={3} aspect="4/5" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* One room, three views */}
      <Section tone="surface" bordered>
        <Container width="page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Eyebrow>Layout studies</Eyebrow>
              <h2 className="display mt-4 text-2xl sm:text-3xl">One bedroom, three views.</h2>
              <div className="mt-5 space-y-4 text-sm leading-relaxed text-ink-muted">
                <p>
                  A top-down cutaway checks the plan: the bed against the wall, the fitted wardrobe, the door and the
                  desk under the window. An angled cutaway shows heights and how the joinery meets the walls. The
                  high-angle view shows the room the way its owner will see it, with the fluted headboard, rug and lit
                  vanity in place.
                </p>
                <p>
                  Cutaway layout studies are produced from marked-up plans, so a layout can be agreed before the
                  finished, eye-level views are produced.
                </p>
              </div>
            </div>
            <div className="lg:col-span-8">
              <ImageGrid items={gridItems(LAYOUT_STUDY)} columns={3} aspect="4/3" />
            </div>
          </div>
        </Container>
      </Section>

      {/* Inputs and variants */}
      <Section bordered>
        <Container width="page">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow>What you send</Eyebrow>
              <h2 className="display mt-4 text-2xl sm:text-3xl">Start with the drawings you already have.</h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                Imagery can be produced from partial information, provided the fixed geometry and the design intent are
                established. The first step is separating what is confirmed from what is assumed and what is still
                missing, and anything taken from reference rather than measurement is flagged as provisional.
              </p>
              <CapabilityList items={INPUTS} className="mt-6" />
            </div>
            <div>
              <Eyebrow>What can be varied</Eyebrow>
              <h2 className="display mt-4 text-2xl sm:text-3xl">Options to choose between, not a single take.</h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                Interior studies are produced as sets, so lighting, finish and composition options can be compared side
                by side while the design is still open to change.
              </p>
              <CapabilityList items={VARIANTS} className="mt-6" />
            </div>
          </div>
        </Container>
      </Section>

      {/* Before-and-after film */}
      {roomTransformation ? (
        <Section tone="surface" bordered>
          <Container width="page">
            <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <Eyebrow>Before and after</Eyebrow>
                <h2 className="display mt-4 text-2xl sm:text-3xl">When a still is not enough.</h2>
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                  A comparison of the existing room against the proposal can also be cut as a short film. This
                  before-and-after transformation reel and material study was produced for an interior design studio.
                  Interior walkthroughs and reels are scoped through the{" "}
                  <Link href="/services/ai-video-production" className="text-ink underline decoration-rule-strong underline-offset-4 hover:text-accent">
                    video production service
                  </Link>
                  .
                </p>
              </div>
              <div className="max-w-sm lg:col-span-7">
                <FilmPlayer film={roomTransformation} meta="Interior design studio · 2026" headingLevel="h3" />
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      {/* Process */}
      <Section bordered>
        <Container width="page">
          <SectionHeading eyebrow="Process" title="How an interior rendering brief runs." />
          <ProcessList className="mt-14 lg:grid-cols-4" steps={STEPS} />
        </Container>
      </Section>

      {/* Deliverables and boundary */}
      <Section tone="deep" bordered>
        <Container width="page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Eyebrow>Deliverables</Eyebrow>
              <h2 className="display mt-5 text-3xl">What you receive.</h2>
            </div>
            <div className="lg:col-span-8">
              <CapabilityList items={DELIVERABLES} columns={2} />
              <div className="mt-10 border-l border-accent/40 bg-accent-wash px-6 py-5">
                <h3 className="label mb-2">Scope of responsibility</h3>
                <p className="text-sm leading-relaxed text-ink-soft">
                  An interior render is representational. It interprets the design direction you supply; it is not a
                  specification, a technical drawing or an approval document. Colours and finishes on screen are
                  indicative and should be confirmed against physical samples and supplier data before ordering. Where
                  AI-assisted generation is used in a project, we say plainly which images are generated.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Related */}
      <Section bordered>
        <Container width="page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Eyebrow>Related</Eyebrow>
              <h2 className="display mt-4 text-2xl sm:text-3xl">Drawings, products and the wider portfolio.</h2>
            </div>
            <div className="space-y-5 text-sm leading-relaxed text-ink-muted lg:col-span-8">
              <p>
                Where the same studio produces the drawings, approved layouts and confirmed dimensions become the 3D
                scene without the geometry being interpreted a second time. Furniture and lighting pieces that need
                catalogue-grade material accuracy have their own specialism.
              </p>
              <ul className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:gap-x-8">
                <li><TextLink href="/work/interior-visualisation-studies">Interior visualisation case study</TextLink></li>
                <li><TextLink href="/services/visualisation-image-production">3D rendering and visualisation services</TextLink></li>
                <li><TextLink href="/services/visualisation/photorealistic-furniture-rendering">Photorealistic furniture 3D rendering</TextLink></li>
                <li><TextLink href="/services/cad/interior-fit-out-shop-drawings">Interior fit-out and joinery shop drawings</TextLink></li>
                <li><TextLink href="/hire-a-3d-visualiser">Hire a 3D visualiser for a single project</TextLink></li>
                <li><TextLink href="/work">See all work</TextLink></li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <ProjectCTA
        serviceSlug="visualisation-image-production"
        eyebrow="Interior rendering"
        title="Send the plan. Get a defined scope."
        body="Share the layout, finishes and references you have. We will confirm what is workable, list anything missing and propose the views, formats and price before production starts."
        services={[
          { label: "3D Rendering & Visualisation", href: "/services/visualisation-image-production" },
          { label: "Furniture 3D Rendering", href: "/services/visualisation/photorealistic-furniture-rendering" },
          { label: "Interior Shop Drawings", href: "/services/cad/interior-fit-out-shop-drawings" },
        ]}
      />
    </>
  );
}
