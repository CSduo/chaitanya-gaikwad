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
} from "@/components/ui/primitives";
import { ProjectCTA } from "@/components/site/ProjectCTA";
import { pageMetadata, serviceSchema, breadcrumbSchema } from "@/lib/seo";
import { getServiceWhatsAppHref, WHATSAPP } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Photorealistic Furniture 3D Rendering Studio | XIYÀTO",
  description:
    "Ultra-photorealistic 3D furniture CGI, material shaders, and catalogue visualisation for luxury furniture brands, lighting designers, and joinery studios.",
  path: "/services/visualisation/photorealistic-furniture-rendering",
});

const VIS_CAPABILITIES = [
  {
    title: "Micro-Detail Material Fidelity",
    intro: "Every surface shader is calibrated using physically based rendering (PBR) to recreate genuine tactile realism.",
    items: [
      "Tactile bouclé, velvet, woven linen and patterned fabric shaders",
      "Natural leather grain, patinas, pull-up effects and surface creasing",
      "Wood veneer detailing, open-grain pores, quarter-cut and crown cuts",
      "Polished, brushed and hand-patinated metal finishes (bronze, brass, blackened steel)",
      "Organic cushion deformation, seam stitching, welting and piping details",
      "Micro-scratches, edge softening and natural anisotropic specular highlights",
    ],
  },
  {
    title: "Multi-Format Commercial Imagery",
    intro: "We generate versatile digital assets suitable for luxury catalogues, e-commerce, and print campaigns.",
    items: [
      "Ultra-HD 8K and 12K print catalogue hero images",
      "Seamless studio cyclorama packshots on neutral backgrounds",
      "Architecturally styled interior vignettes and ambient living spaces",
      "Full 360-degree turntable sequences and loopable video assets",
      "Transparent PNG cutout renders for advertising layouts",
      "Material finish variant sets showing complete fabric and timber palettes",
    ],
  },
  {
    title: "CAD & Digital Asset Ingestion",
    intro: "We work seamlessly from your product development data, sketches, or physical samples.",
    items: [
      "3D model ingestion from Rhino, 3ds Max, SolidWorks, STEP, OBJ, and FBX",
      "Ground-up 3D modelling from dimensional 2D CAD drawings or sketches",
      "Reference photography matching for legacy furniture lines",
      "Physical material sample matching via macro photographic reference",
      "Standardised digital asset libraries for rapid catalogue updates",
      "Color-accurate colour-space calibration (sRGB / Adobe RGB)",
    ],
  },
];

const VIS_WORKFLOW = [
  {
    step: "01",
    title: "3D Geometry & Proportions",
    body: "We import your CAD files or model the piece from reference drawings, ensuring exact millimeter proportions, curve transitions, and silhouette accuracy.",
  },
  {
    step: "02",
    title: "Clay Render Review",
    body: "You review untextured clay renders to verify camera angles, focal lengths, cushion softening, and structural silhouettes before texturing begins.",
  },
  {
    step: "03",
    title: "PBR Material Calibration",
    body: "We author custom procedural and scanned shaders, matching physical fabric weaves, timber finishes, and metal hardware down to the stitch.",
  },
  {
    step: "04",
    title: "Lighting, Polish & 8K Delivery",
    body: "Studio lighting rigs and architectural environments are composed, followed by high-resolution rendering and retouching to final master formats.",
  },
];

const DELIVERABLES = [
  "Master print-ready high-resolution TIFF and JPEG renders (up to 8K)",
  "Web-optimised WebP and JPEG imagery for e-commerce stores",
  "Isolated cutout PNG images with transparent backgrounds",
  "Material variant collections across full upholstery and timber ranges",
  "Optional 4K video turntable loops for social and web presentation",
  "Organised digital asset folder matching product SKU codes",
];

export default function PhotorealisticFurnitureRenderingPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Photorealistic Furniture 3D Rendering Studio",
          description:
            "Ultra-photorealistic 3D furniture CGI, material shaders, and catalogue visualisation for luxury furniture brands, lighting designers, and joinery studios.",
          path: "/services/visualisation/photorealistic-furniture-rendering",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "3D Visualisation", path: "/services/visualisation-image-production" },
          { name: "Furniture 3D Rendering", path: "/services/visualisation/photorealistic-furniture-rendering" },
        ])}
      />

      <section className="border-b border-rule">
        <Container width="page" className="pb-16 pt-10 sm:pb-20 lg:pb-24">
          <Breadcrumbs
            trail={[
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: "3D Visualisation", path: "/services/visualisation-image-production" },
              { name: "Furniture 3D Rendering", path: "/services/visualisation/photorealistic-furniture-rendering" },
            ]}
          />
          <div className="max-w-3xl">
            <Eyebrow>Product Visualisation · CGI Studio · Furniture & Lighting</Eyebrow>
            <h1 className="display mt-6 text-4xl sm:text-5xl lg:text-[3.25rem] leading-[1.1]">
              Photorealistic 3D Furniture Rendering & Digital Material Craft
            </h1>
            <p className="mt-7 text-lg leading-relaxed text-ink-soft">
              Replace expensive physical photoshoots with flawless digital CGI. Material-accurate 3D renders that capture fabric weave, leather patina, wood grain, and bespoke metal finishes for luxury furniture brands, lighting designers, and bespoke joinery manufacturers.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={getServiceWhatsAppHref("visualisation-image-production", "uk")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[46px] items-center gap-2 rounded-xs bg-ink px-6 text-xs font-semibold tracking-tight text-paper transition-colors hover:bg-accent"
              >
                <span>Direct WhatsApp (UK)</span>
                <span aria-hidden="true">&#8599;</span>
              </a>
              <a
                href={getServiceWhatsAppHref("visualisation-image-production", "india")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[46px] items-center gap-2 rounded-xs border border-rule px-5 text-xs font-medium tracking-tight text-ink transition-colors hover:border-ink hover:bg-surface"
              >
                <span>Direct WhatsApp (India Hub)</span>
                <span aria-hidden="true">&#8599;</span>
              </a>
              <a
                href={`tel:${WHATSAPP.uk.number.replace(/\s+/g, "")}`}
                className="inline-flex min-h-[46px] items-center gap-1.5 rounded-xs border border-rule px-4 text-xs font-mono text-ink-muted transition-colors hover:border-ink hover:text-ink"
                title="Direct Telephone Line"
              >
                <span>Call: {WHATSAPP.uk.number}</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex min-h-[46px] items-center gap-1.5 rounded-xs border border-rule px-4 text-xs font-medium text-ink-muted transition-colors hover:border-ink hover:text-ink"
              >
                <span>Request Visualisation Scope</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Section tone="surface">
        <Container width="page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Eyebrow>The Physical Photography Dilemma</Eyebrow>
              <h2 className="display mt-4 text-2xl sm:text-3xl">Infinite configurations without logistical overhead.</h2>
            </div>
            <div className="lg:col-span-8">
              <div className="prose-body max-w-2xl space-y-5 text-ink-soft">
                <p>
                  Traditional furniture photography is a logistical nightmare: building physical prototypes before production sign-off, shipping heavy pieces to commercial photo studios, hiring stylists, and repainting room sets. When a new fabric collection launches, the entire expensive process must be repeated.
                </p>
                <p>
                  XIYÀTO creates digital twins of your furniture pieces that are indistinguishable from photography. Once a piece is digitally mastered, you can render it in twenty fabric colourways, place it inside an architectural penthouse or a minimal gallery, and change camera angles at any time without freight costs or studio hire.
                </p>
                <p className="border-l-2 border-accent/60 pl-4 italic text-ink">
                  Every shader is authored from scratch to honor the physical piece—capturing the slight irregularity of hand-stitched leather, the sheen of brushed bronze, and the tactile warmth of looped bouclé.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section bordered>
        <Container width="wide">
          <SectionHeading
            eyebrow="Verified Studio Proof"
            title="The Sultanah Moon Chair Campaign"
            intro="A masterclass in 3D furniture visualisation: custom organic geometry, tactile shader craft, and cinematic multi-angle presentation."
          />
          <div className="mt-10 rounded-lg border border-rule bg-surface p-6 sm:p-8">
            <div className="grid gap-6 sm:grid-cols-3">
              <div>
                <span className="label text-[0.625rem]">Subject</span>
                <p className="mt-1 text-base font-semibold text-ink">Sultanah Moon Chair</p>
                <p className="mt-1 text-xs text-ink-muted">Sculptural luxury armchair with organic curved silhouette</p>
              </div>
              <div>
                <span className="label text-[0.625rem]">Shaders Mastered</span>
                <p className="mt-1 text-base font-semibold text-ink">Textured Bouclé & Antique Bronze</p>
                <p className="mt-1 text-xs text-ink-muted">Physically based anisotropic shaders with micro-creasing</p>
              </div>
              <div>
                <span className="label text-[0.625rem]">Outputs Produced</span>
                <p className="mt-1 text-base font-semibold text-ink">8K Stills & 4K Cinematic Turntable</p>
                <p className="mt-1 text-xs text-ink-muted">Multi-angle catalogue packshots and editorial room vignettes</p>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/work/sultanah-moon-chair-cinematic-campaign"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xs bg-ink px-5 text-xs font-semibold text-paper hover:bg-accent"
              >
                <span>Inspect Sultanah Moon Chair Project</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link
                href="/services/visualisation-image-production"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xs border border-rule px-4 text-xs font-medium text-ink hover:border-ink"
              >
                <span>View Primary 3D Visualisation Pillar</span>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="surface" bordered>
        <Container width="page">
          <SectionHeading eyebrow="Capabilities" title="What our furniture rendering covers." />
          <div className="mt-14 space-y-14">
            {VIS_CAPABILITIES.map((group) => (
              <div key={group.title} className="grid gap-8 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-4">
                  <h3 className="display text-2xl">{group.title}</h3>
                  {group.intro ? (
                    <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                      {group.intro}
                    </p>
                  ) : null}
                </div>
                <div className="lg:col-span-8">
                  <CapabilityList items={group.items} columns={2} />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section bordered>
        <Container width="page">
          <SectionHeading eyebrow="Visualisation Workflow" title="How your digital pieces are developed." />
          <ProcessList className="mt-14 lg:grid-cols-4" steps={VIS_WORKFLOW} />
        </Container>
      </Section>

      <Section tone="deep" bordered>
        <Container width="page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Eyebrow>Deliverables</Eyebrow>
              <h2 className="display mt-5 text-3xl">What your brand receives.</h2>
            </div>
            <div className="lg:col-span-8">
              <CapabilityList items={DELIVERABLES} columns={2} />
              <div className="mt-10 border-l border-accent/40 bg-accent-wash px-6 py-5">
                <h3 className="label mb-2">Color Accuracy & Proofing</h3>
                <p className="text-sm leading-relaxed text-ink-soft">
                  Renders are calibrated against calibrated sRGB and Adobe RGB color spaces with verified white points. Client material swatches can be physically referenced or color-matched to Pantone and manufacturer finish codes.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <ProjectCTA
        serviceSlug="visualisation-image-production"
        eyebrow="Furniture Visualisation"
        title="Transform your furniture collection into 3D CGI"
        body="Send your 3D CAD files, sketches, or photographs. We will review geometry requirements, outline material shaders, and provide a pilot rendering scope."
        services={[
          { label: "3D Visualisation Pillar", href: "/services/visualisation-image-production" },
          { label: "Video, AI Film & Editing", href: "/services/video-ai-film-editing" },
          { label: "Website Design & Development", href: "/services/website-design-development" },
        ]}
      />
    </>
  );
}
