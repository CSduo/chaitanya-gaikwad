/**
 * Service definitions. Three services only — the approved hierarchy.
 * CAD & Technical Production carries the strongest commercial emphasis.
 */

export type ServiceSlug =
  | "cad-technical-production"
  | "growth-operations"
  | "visual-content";

export type CapabilityGroup = {
  title: string;
  intro?: string;
  items: string[];
};

export type Service = {
  slug: ServiceSlug;
  name: string;
  shortName: string;
  /**
   * Secondary brand motif — DELIVER / GROW / PRESENT.
   * Used as a visual register on the homepage, never as the service name.
   */
  motif: "Deliver" | "Grow" | "Present";
  /** One-line positioning used on cards and in navigation contexts. */
  summary: string;
  /** Two-to-three sentence overview used on the services index. */
  overview: string;
  /** Longer opening paragraph on the service page itself. */
  intro: string[];
  /** Ordered capability groups — the variable middle band of the template. */
  groups: CapabilityGroup[];
  process: { step: string; title: string; body: string }[];
  deliverables: string[];
  /** Constraints and boundaries stated plainly. */
  boundary?: string;
  order: number;
};

export const SERVICES: Service[] = [
  {
    slug: "cad-technical-production",
    name: "CAD & Technical Production",
    shortName: "CAD & Technical Production",
    motif: "Deliver",
    summary:
      "Editable drawing packages produced from your design direction, measurements and references.",
    overview:
      "External drafting and documentation capacity for design-led teams. We take approved layouts, marked-up PDFs, site dimensions and reference imagery, and return coordinated, editable drawing sets in DWG, DXF and PDF.",
    intro: [
      "XIYÀTO operates as external production and documentation capacity for interior, fit-out and design practices. We work from your design direction — approved layouts, marked-up drawings, measured dimensions, reference imagery and renders — and produce coordinated, editable drawing packages ready for your review.",
      "This is drafting and documentation capacity, not design authorship. Your team retains design ownership and technical authority; we absorb the production load and return work that your own people can open, interrogate and continue.",
    ],
    groups: [
      {
        title: "Inputs we work from",
        intro:
          "A package can be produced from partial information. What matters is that the design intent and the fixed dimensions are established.",
        items: [
          "Marked-up PDFs and issued drawings",
          "Measured site dimensions and survey notes",
          "Approved layouts and space plans",
          "Hand sketches with annotated constraints",
          "Reference imagery and material direction",
          "3D renders and visual references",
          "Written design direction and revision instructions",
        ],
      },
      {
        title: "Production",
        intro:
          "Drawing types produced across residential, hospitality and commercial interior work.",
        items: [
          "General arrangement and layout plans",
          "Interior wall elevations",
          "Reflected ceiling plans and lighting coordination",
          "Flooring layouts and setting-out patterns",
          "Feature wall and joinery construction details",
          "Sanitary and fixture coordination",
          "Full interior drawing packages",
          "Revision rounds against issued comments",
        ],
      },
      {
        title: "Technical QA",
        intro:
          "Every package is checked before issue. Anything estimated from visual reference is flagged as provisional rather than presented as confirmed.",
        items: [
          "Dimensional consistency across plan and elevation",
          "Geometry, orientation and alignment checks",
          "Door, window and opening coordination",
          "Layer structure, naming and organisation",
          "Editability — geometry remains native, not traced raster",
          "Reopen check on the delivered file",
          "Handoff validation against the issued brief",
        ],
      },
    ],
    process: [
      {
        step: "01",
        title: "Brief and inputs",
        body: "You send the available material. We review it and identify what is confirmed, what is assumed and what is missing before any drafting begins.",
      },
      {
        step: "02",
        title: "Scope confirmation",
        body: "Fixed dimensions, design rules, drawing list and output formats are agreed in writing so the package is measured against a defined scope.",
      },
      {
        step: "03",
        title: "Drafting and production",
        body: "Drawings are produced with structured layers, consistent annotation and coordinated geometry across the set.",
      },
      {
        step: "04",
        title: "QA and handoff",
        body: "The set is checked, reopened and validated, then issued as editable DWG and DXF alongside presentation-ready PDFs.",
      },
    ],
    deliverables: [
      "Editable DWG drawing files",
      "DXF exchange files",
      "Presentation-ready PDF sheets",
      "Raster previews for review and sign-off",
      "Structured handoff with drawing list and revision notes",
    ],
    boundary:
      "XIYÀTO provides drafting, documentation and production capacity working from supplied design direction. We do not provide architectural or engineering certification, statutory approval, code compliance sign-off or architect-of-record responsibility. Provisional detail remains editable and should be reviewed by the project's qualified designer, draftsman or technical consultant before construction.",
    order: 1,
  },

  {
    slug: "growth-operations",
    name: "Growth Operations",
    shortName: "Growth Operations",
    motif: "Grow",
    summary:
      "Structured market research, qualified prospect data and the systems to work it.",
    overview:
      "Research and operational systems for teams entering new markets or building a pipeline. We map the market, qualify and verify targets, structure the data, and build the tracking that makes outreach repeatable.",
    intro: [
      "Growth Operations is research and systems work, not campaign management. We build the structured groundwork a commercial team needs before outreach is worth running: who is actually in the market, which of them are reachable, through what route, and on what evidence.",
      "Every workbook we produce is built to be worked — ranked, segmented, sourced and structured for a real outreach process rather than delivered as an undifferentiated list.",
    ],
    groups: [
      {
        title: "Research",
        items: [
          "Market and sector mapping",
          "Competitor and supplier landscape research",
          "Regional and city-level market segmentation",
          "Trade event and exhibition mapping",
          "Public-source evidence gathering with source logging",
        ],
      },
      {
        title: "Prospect and market intelligence",
        items: [
          "Company and organisation identification",
          "Active project and opportunity evidence",
          "Decision-maker route mapping from public sources",
          "Priority scoring against defined criteria",
          "Sector and service-fit classification",
        ],
      },
      {
        title: "Qualification and verification",
        items: [
          "Public-source verification with recorded provenance",
          "Deduplication and record cleaning",
          "Reachability and contact-route assessment",
          "Removal and backup logging of discarded records",
          "Verification status recorded per record",
        ],
      },
      {
        title: "Outreach systems",
        items: [
          "Channel recommendation per target",
          "Outreach angle and rationale per record",
          "Message and sequence structuring",
          "Send guidance and prioritisation",
        ],
      },
      {
        title: "Tracking and organisation",
        items: [
          "Structured multi-sheet workbooks",
          "CRM-style status and progress tracking",
          "Source logs and audit trails",
          "Scoring methodology documented alongside the data",
        ],
      },
    ],
    process: [
      {
        step: "01",
        title: "Define the market",
        body: "Target geography, sector, company profile and qualification criteria are agreed before research starts.",
      },
      {
        step: "02",
        title: "Research and map",
        body: "Public sources are worked systematically, with evidence and source URLs recorded against each record.",
      },
      {
        step: "03",
        title: "Qualify and score",
        body: "Records are verified, deduplicated, scored against the agreed criteria and segmented for use.",
      },
      {
        step: "04",
        title: "Structure and hand off",
        body: "The workbook is assembled with scoring methodology, source log and outreach guidance so the team can work it immediately.",
      },
    ],
    deliverables: [
      "Structured multi-sheet workbooks",
      "Scored and ranked target shortlists",
      "Decision-maker route mapping",
      "Source and verification logs",
      "Outreach guidance and channel recommendations",
    ],
    boundary:
      "We do not guarantee response rates, meetings or revenue outcomes. Research is compiled from public sources with provenance recorded, and published portfolio material is redacted.",
    order: 2,
  },

  {
    slug: "visual-content",
    name: "Visual Content",
    shortName: "Visual Content",
    motif: "Present",
    summary:
      "Visualisation, film and presentation material for design and product businesses.",
    overview:
      "Interior and product visualisation, short-form film and presentation assets — produced for client communication, pitch material and campaign use across design, furniture and hospitality businesses.",
    intro: [
      "Visual Content covers the material design businesses need to communicate work that is not yet built, or product that needs to be shown at its best: interior visualisation, product and furniture imagery, short-form film and presentation assets.",
      "Output is specified around where it will be used — a client pitch, a showroom screen, a social channel or a project presentation — and produced to that context rather than to a generic export.",
    ],
    groups: [
      {
        title: "Architectural and interior visualisation",
        items: [
          "Interior concept visualisation",
          "Spatial and material studies",
          "Lighting and atmosphere exploration",
          "Showroom and commercial space previews",
          "Option development for client review",
        ],
      },
      {
        title: "Product and furniture visualisation",
        items: [
          "Furniture and product imagery",
          "Material and finish variants",
          "Catalogue and range presentation",
          "Set and context composition",
        ],
      },
      {
        title: "Film and motion",
        items: [
          "Short-form cinematic sequences",
          "Product and campaign films",
          "Interior and showroom walkthroughs",
          "Sequence structuring, pacing and edit",
        ],
      },
      {
        title: "Project presentation",
        items: [
          "Client-facing presentation sets",
          "Concept and pitch material",
          "Before-and-after comparison material",
          "Board and sheet layout",
        ],
      },
      {
        title: "Campaign and digital assets",
        items: [
          "Social and channel-ready formats",
          "Signage and point-of-sale material",
          "Invitation and event assets",
          "Multi-format export for a defined placement",
        ],
      },
    ],
    process: [
      {
        step: "01",
        title: "Reference and direction",
        body: "Layouts, materials, product references and the intended placement of the output are established up front.",
      },
      {
        step: "02",
        title: "Composition",
        body: "Framing, lighting and material treatment are developed and put forward as options rather than a single fixed take.",
      },
      {
        step: "03",
        title: "Production",
        body: "Selected directions are produced to final quality, with sequences structured and edited where the output is film.",
      },
      {
        step: "04",
        title: "Delivery",
        body: "Assets are exported to the formats and ratios the placement requires, with source material retained for later reuse.",
      },
    ],
    deliverables: [
      "High-resolution still visualisation",
      "Short-form film in delivery-ready ratios",
      "Presentation sets and boards",
      "Channel-specific export variants",
      "Source and working files on request",
    ],
    order: 3,
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function serviceName(slug: ServiceSlug): string {
  return SERVICES.find((s) => s.slug === slug)?.name ?? slug;
}
