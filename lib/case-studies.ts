import type { ServiceSlug } from "./services";

/**
 * Case-study system.
 * Adding a case study is a data operation — no component work required.
 *
 * Rules enforced by the templates that consume this data:
 *  - Optional fields omit their whole section rather than rendering an empty shell.
 *  - `metrics` carries operational/technical evidence only. No invented outcomes.
 *  - `clientAnonymised` drives whether a client name or a sector descriptor renders.
 */

export type WorkCategory =
  | "technical-production"
  | "growth-b2b"
  | "visualisation"
  | "video"
  | "automation"
  | "websites";

export type EngagementType = "project" | "ongoing-support" | "advisory-consulting";

export const WORK_CATEGORIES: { slug: WorkCategory; label: string; blurb: string }[] = [
  {
    slug: "technical-production",
    label: "CAD & Technical",
    blurb: "Interior drawing packages: plans, elevations, ceilings, flooring setting-out and joinery details, delivered as editable sets.",
  },
  {
    slug: "growth-b2b",
    label: "Growth & B2B",
    blurb: "Eight research workbooks mapping markets across the Gulf, India, China and the Philippines, scored and ranked for outreach.",
  },
  {
    slug: "visualisation",
    label: "Visualisation",
    blurb: "Forty-one published images across interiors, product and furniture, retail, workspace, hospitality and architectural subjects.",
  },
  {
    slug: "video",
    label: "Video",
    blurb: "Eight client films for furniture brands, showrooms, interior studios, hospitality venues and a Middle East developer, plus one internal visual study.",
  },
  {
    slug: "automation",
    label: "Automation",
    blurb: "Offered as capability and run on our own operation. No client automation engagement is published as a case study yet.",
  },
  {
    slug: "websites",
    label: "Websites",
    blurb: "Three responsive builds: an export brand site, an academic journal platform with author submissions, and this studio site.",
  },
];

export const ENGAGEMENT_LABELS: Record<EngagementType, string> = {
  project: "Project",
  "ongoing-support": "Ongoing Support",
  "advisory-consulting": "Advisory / Consulting",
};

export type MediaItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export type VideoItem = {
  src: string;
  poster: string;
  width: number;
  height: number;
  title: string;
  description: string;
};

/** Structural evidence: what was produced, expressed as verifiable counts. */
export type EvidenceItem = { value: string; label: string };

/** A schema table communicates a data system without republishing its records. */
export type SchemaTable = {
  caption: string;
  note?: string;
  columns: string[];
  rows: string[][];
};

export type CaseStudy = {
  slug: string;
  projectName: string;
  client: string | null;
  clientAnonymised: boolean;
  /** Rendered in place of a client name when anonymised. */
  clientDescriptor?: string;
  sector?: string;
  location?: string;
  category: WorkCategory;
  services: ServiceSlug[];
  dateRange?: string;
  engagementType?: EngagementType;
  scope?: string[];
  summary: string;
  challenge?: string;
  inputs?: { intro: string; items: string[] };
  process?: { step: string; title: string; body: string }[];
  production?: { intro: string; items?: string[] };
  qaValidation?: { intro: string; items: string[] };
  deliverables?: string[];
  /** Operational evidence only. Never financial or client-impact claims. */
  metrics?: EvidenceItem[];
  schemaTables?: SchemaTable[];
  images?: MediaItem[];
  video?: VideoItem[];
  relatedProjects?: string[];
  featured: boolean;
  order: number;
  seo: { title: string; description: string; image?: string };
};

/* ================================================================== */

export const CASE_STUDIES: CaseStudy[] = [
  /* ---------------------------------------------------------------- */
  {
    slug: "bahrain-luxury-interior-cad-package",
    projectName: "Bahrain Luxury Interior — Complete Drawing Package",
    client: null,
    clientAnonymised: true,
    clientDescriptor: "Luxury interior design practice",
    sector: "Luxury residential and hospitality interiors",
    location: "Bahrain",
    category: "technical-production",
    services: ["cad-technical-production"],
    dateRange: "2026",
    engagementType: "project",
    scope: [
      "General arrangement and layout plans",
      "Interior wall elevations",
      "Reflected ceiling plan and lighting coordination",
      "Herringbone flooring setting-out",
      "Feature wall and joinery construction detail",
      "Sanitary fixture and window coordination",
    ],
    summary:
      "A multi-sheet interior drawing package produced for a luxury project in Bahrain, covering a master bathroom, a cigar lounge and a set of custom feature walls. The practice supplied design direction, measured dimensions and visual references; XIYÀTO produced the coordinated, editable documentation set.",
    challenge:
      "The design intent existed as renders, a measured hand sketch and written direction rather than as drawings. The package needed to resolve that material into a coordinated set where plan, elevation and ceiling geometry agreed with one another, remained fully editable by the practice, and made clear which dimensions were confirmed on site and which were derived from visual reference.",
    inputs: {
      intro:
        "The engagement began from partial information — normal for this kind of work, and the reason the scope step matters.",
      items: [
        "3D visual render of the intended master bathroom",
        "Measured hand sketch with dimensioned layout and CAD notes",
        "Interior design references and material direction",
        "Supplied furniture layout for the cigar lounge",
        "Written revision instruction across the drawing set",
      ],
    },
    process: [
      {
        step: "01",
        title: "Input review",
        body: "Supplied material was assessed to separate confirmed dimensions from those implied by the render, and to identify what was missing before drafting.",
      },
      {
        step: "02",
        title: "Scope and drawing list",
        body: "The sheet list, output formats and layer convention were fixed, and provisional dimensions were recorded as such.",
      },
      {
        step: "03",
        title: "Drafting and coordination",
        body: "Plans, elevations, ceiling and flooring layouts were produced as native geometry and cross-checked so the set agreed across sheets.",
      },
      {
        step: "04",
        title: "QA and issue",
        body: "The package was dimension-checked, reopened from the delivered files and issued as editable DWG and DXF with presentation PDFs.",
      },
    ],
    production: {
      intro:
        "Three spaces were documented within one coordinated package.",
      items: [
        "Master bathroom — general arrangement plus three wall elevations covering the bathtub and window wall, the vanity and WC wall, and the walk-in shower",
        "Cigar lounge — furniture layout, reflected ceiling plan with coffered ceiling and lighting arrangement, and an editable herringbone flooring pattern",
        "Feature walls — general arrangement with toilet and wash wall elevations, plus a stair feature wall joinery construction detail",
      ],
    },
    qaValidation: {
      intro: "Checks applied before the package was issued.",
      items: [
        "Dimensional consistency between plan and elevation",
        "Room geometry, orientation and alignment",
        "Door, window and fixture relationships",
        "Layer structure, naming and organisation",
        "Editable native geometry — no traced raster or proxy content",
        "Reopen check performed on the delivered DWG",
        "Provisional dimensions flagged for practice review",
      ],
    },
    deliverables: [
      "Editable DWG drawing files",
      "DXF exchange files",
      "Presentation-ready PDF sheet set",
      "Raster previews for review",
    ],
    metrics: [
      { value: "3", label: "Spaces documented" },
      { value: "4", label: "Wall elevations" },
      { value: "DWG · DXF · PDF", label: "Issued formats" },
    ],
    images: [
      { src: "/media/cad/mb-plan.png", alt: "Master bathroom general arrangement plan with dimensions and fixture setting-out", width: 7629, height: 5389, caption: "Master bathroom — general arrangement plan" },
      { src: "/media/cad/mb-wall-1.png", alt: "Master bathroom wall elevation showing bathtub and window setting-out", width: 7629, height: 5389, caption: "Wall 1 — bathtub and window elevation" },
      { src: "/media/cad/mb-wall-2.png", alt: "Master bathroom wall elevation showing vanity and WC wall", width: 7629, height: 5389, caption: "Wall 2 — vanity and WC elevation" },
      { src: "/media/cad/mb-wall-3.png", alt: "Master bathroom wall elevation showing walk-in shower", width: 7629, height: 5389, caption: "Wall 3 — walk-in shower elevation" },
      { src: "/media/cad/mb-wall-4.png", alt: "Master bathroom wall elevation showing entrance portal and reveals", width: 7573, height: 5389, caption: "Wall 4 — entrance door and architrave elevation" },
      { src: "/media/cad/cl-layout.png", alt: "Cigar lounge general furniture layout plan", width: 7629, height: 5389, caption: "Cigar lounge — furniture layout" },
      { src: "/media/cad/cl-ceiling.png", alt: "Cigar lounge reflected ceiling plan showing coffered ceiling and lighting arrangement", width: 7629, height: 5389, caption: "Cigar lounge — reflected ceiling plan (RCP)" },
      { src: "/media/cad/cl-flooring.png", alt: "Cigar lounge herringbone flooring setting-out plan", width: 7629, height: 5389, caption: "Cigar lounge — herringbone flooring layout" },
      { src: "/media/cad/mbr-plan.png", alt: "Master bedroom suite general arrangement plan", width: 8344, height: 5894, caption: "Master bedroom — general arrangement plan" },
      { src: "/media/cad/mbr-elevation-1.png", alt: "Master bedroom bed headboard and wardrobe joinery elevations", width: 8344, height: 5894, caption: "Master bedroom — headboard & wardrobe elevations" },
      { src: "/media/cad/tw-toilet-elevation.png", alt: "Toilet feature wall elevation detailing fluted panelling and mirror", width: 4764, height: 3274, caption: "Toilet feature wall — elevation detail" },
      { src: "/media/cad/tw-wash-elevation.png", alt: "Wash feature wall elevation detailing decorative panelling and fixtures", width: 4764, height: 3274, caption: "Wash feature wall — panelling and fixture elevation" },
      { src: "/media/cad/sw-joinery-detail.png", alt: "Stair feature wall architectural joinery construction detail drawing", width: 5064, height: 6388, caption: "Stair feature wall — joinery construction detail" },
    ],
    relatedProjects: ["interior-visualisation-studies"],
    featured: true,
    order: 1,
    seo: {
      title: "Bahrain Luxury Interior — Complete CAD Drawing Package",
      description:
        "A multi-sheet interior drawing package produced for a luxury project in Bahrain: plans, elevations, reflected ceiling, flooring setting-out and joinery detail, issued as editable DWG, DXF and PDF.",
      image: "/media/cad/mb-plan.png",
    },
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "saudi-market-entry-lead-intelligence",
    projectName: "Saudi Market Entry — Lead Intelligence System",
    client: null,
    clientAnonymised: true,
    clientDescriptor: "Design and fit-out business entering the Saudi market",
    sector: "Luxury development, hospitality and interiors",
    location: "Riyadh and Jeddah, Saudi Arabia",
    category: "growth-b2b",
    services: ["growth-marketing-b2b"],
    dateRange: "2026",
    engagementType: "project",
    scope: [
      "Market and developer mapping across two cities",
      "Priority scoring against defined criteria",
      "Decision-maker route mapping from public sources",
      "Active project and evidence logging",
      "Outreach angle and channel guidance",
      "Source log and verification trail",
    ],
    summary:
      "A six-sheet lead intelligence workbook built to support market entry into Riyadh and Jeddah. Targets were identified, scored and segmented from public sources, with active project evidence, contact routes and outreach guidance recorded against every record.",
    challenge:
      "Entering an unfamiliar market without a defined target list means outreach is guesswork. The requirement was a workbook the commercial team could act on immediately — ranked by fit, evidenced against live project activity, and structured so that every claim in it could be traced back to a public source.",
    process: [
      {
        step: "01",
        title: "Criteria definition",
        body: "Target geography, segment, company profile and the scoring dimensions were agreed before research began.",
      },
      {
        step: "02",
        title: "Research and evidence",
        body: "Public sources were worked systematically. Active projects and announcements were recorded as evidence alongside each organisation.",
      },
      {
        step: "03",
        title: "Scoring and segmentation",
        body: "Each record was scored out of 100 and assigned a priority band, with the scoring method documented in the workbook itself.",
      },
      {
        step: "04",
        title: "Outreach structuring",
        body: "Contact route, best channel, outreach angle and send guidance were mapped per record so the workbook could be worked without further research.",
      },
    ],
    production: {
      intro:
        "The workbook was built as a working system rather than a list, with each sheet serving a distinct step in the outreach process.",
    },
    qaValidation: {
      intro: "Data integrity controls applied across the workbook.",
      items: [
        "Every record carries a verification status",
        "Source URLs recorded per record",
        "Scoring methodology documented in-workbook",
        "Public-source provenance only",
        "Contact detail redacted in any portfolio copy",
      ],
    },
    deliverables: [
      "Six-sheet structured workbook",
      "Scored and ranked target shortlist",
      "Decision-maker route mapping",
      "Source log and verification trail",
      "Send guidance and outreach angles",
    ],
    metrics: [
      { value: "55", label: "Scored target records" },
      { value: "6", label: "Structured sheets" },
      { value: "18", label: "Data fields per record" },
      { value: "31", label: "Logged sources" },
    ],
    schemaTables: [
      {
        caption: "Workbook structure",
        note: "Target records are withheld from public display. The structure below shows how the system is organised.",
        columns: ["Sheet", "Records", "Purpose"],
        rows: [
          ["Master Leads", "55", "Scored and ranked target records"],
          ["Ongoing Projects", "15", "Live project activity used as qualifying evidence"],
          ["Decision Maker Routes", "6", "Route patterns for reaching leadership"],
          ["Outreach Angles", "5", "Positioning angles mapped to segment"],
          ["Source Log", "31", "Provenance for every claim in the workbook"],
          ["Send Guidance", "12", "Sequencing and prioritisation for the team"],
        ],
      },
      {
        caption: "Fields captured per target record",
        columns: ["Field group", "Fields"],
        rows: [
          ["Ranking", "Rank · Priority band · Final score /100"],
          ["Identity", "Company · Segment · City focus · Website"],
          ["Route", "Public contact route · Decision-maker route"],
          ["Evidence", "Active project · Verification status · Source URLs"],
          ["Fit", "Service fit · Why the lead matters"],
          ["Action", "Suggested outreach angle · Best channel · Notes"],
        ],
      },
    ],
    relatedProjects: ["automotive-showroom-target-mapping", "hotel-linen-export-market-programme"],
    featured: true,
    order: 2,
    seo: {
      title: "Saudi Market Entry — Lead Intelligence System",
      description:
        "A six-sheet lead intelligence workbook supporting market entry into Riyadh and Jeddah: 55 scored targets, decision-maker routes, project evidence and a full source log.",
    },
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "sultanah-moon-chair-cinematic-campaign",
    projectName: "Moon Chair — Cinematic Product Campaign",
    client: "Sultanah & Co. Interiors",
    clientAnonymised: false,
    sector: "Luxury furniture and interiors",
    location: "Remote delivery",
    category: "video",
    services: ["video-ai-film-editing"],
    dateRange: "2025",
    engagementType: "ongoing-support",
    scope: [
      "Cinematic product campaign direction",
      "Factory-to-showroom sequence concepts",
      "Visual sequencing and transitions",
      "Short-form social edit",
    ],
    summary:
      "A cinematic campaign built around a single furniture piece, developed to carry a luxury product story from factory floor through to showroom setting in short-form.",
    challenge:
      "A single product needed to read as a considered object rather than a catalogue item, in a format short enough for social distribution but composed well enough to sit alongside the brand's showroom presentation.",
    process: [
      { step: "01", title: "Direction", body: "Product story, sequence order and the intended placement were established before production." },
      { step: "02", title: "Sequence build", body: "Factory-to-showroom sequences were developed as discrete beats that could be recombined for different cuts." },
      { step: "03", title: "Edit and pacing", body: "Transitions and pacing were resolved against the short-form format." },
      { step: "04", title: "Delivery", body: "Delivered in vertical short-form ratio for social and showroom screen use." },
    ],
    deliverables: [
      "Short-form cinematic edit",
      "Vertical delivery ratio for social placement",
      "Sequence concepts for reuse across the campaign",
    ],
    video: [
      {
        src: "/media/video/sultanah-co-moon-chair-cinematic-campaign.mp4",
        poster: "/media/video/sultanah-co-moon-chair-cinematic-campaign-poster.webp",
        width: 1080,
        height: 1350,
        title: "Moon Chair cinematic campaign",
        description: "Short-form cinematic product sequence produced for Sultanah & Co. Interiors.",
      },
    ],
    relatedProjects: ["interior-visualisation-studies"],
    featured: true,
    order: 3,
    seo: {
      title: "Moon Chair — Cinematic Product Campaign",
      description:
        "A short-form cinematic product campaign for Sultanah & Co. Interiors, carrying a luxury furniture story from factory floor to showroom setting.",
      image: "/media/video/sultanah-co-moon-chair-cinematic-campaign-poster.webp",
    },
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "hotel-linen-export-market-programme",
    projectName: "Hotel Linen Export — Market and Commercial Programme",
    client: null,
    clientAnonymised: true,
    clientDescriptor: "International bedding and hotel-linen exporter",
    sector: "Textile manufacturing and export",
    location: "Cross-border — India, China and GCC markets",
    category: "growth-b2b",
    services: ["growth-marketing-b2b", "website-design-development"],
    dateRange: "2025 — 2026",
    engagementType: "ongoing-support",
    scope: [
      "Buyer discovery and shortlist construction",
      "Cross-border outreach workflow",
      "Buyer qualification and sample-evaluation tracking",
      "Commercial web presence",
    ],
    summary:
      "A long-running engagement supporting an export business across buyer research, outreach operations and commercial presentation — including a structured importer shortlist and a responsive brand website built to carry enquiries.",
    challenge:
      "Export outreach was being run without a qualified buyer list or a consistent way of tracking which prospects had been evaluated. The engagement needed to produce both the underlying data system and the commercial presence that outreach could point at.",
    process: [
      { step: "01", title: "Buyer discovery", body: "Importers were identified and segmented by city, scale and export relevance across target markets." },
      { step: "02", title: "Cleaning and ranking", body: "Directory-style and low-value records were removed to a backup sheet, and the remainder ranked against a documented scoring method." },
      { step: "03", title: "Outreach operations", body: "Contact routes, sample evaluation and follow-up were tracked in a structured workbook." },
      { step: "04", title: "Commercial presence", body: "A responsive brand website was produced to give outreach a credible destination and a route for enquiries." },
    ],
    production: {
      intro:
        "The engagement spanned two capabilities: the research and tracking system, and the customer-facing presentation built on top of it.",
    },
    deliverables: [
      "Seven-sheet buyer shortlist workbook",
      "City-segmented target lists",
      "Documented scoring methodology",
      "Backup log of removed records",
      "Responsive brand website",
    ],
    metrics: [
      { value: "7", label: "Structured sheets" },
      { value: "459", label: "Records processed" },
      { value: "3", label: "City segments" },
      { value: "294", label: "Records removed to backup" },
    ],
    schemaTables: [
      {
        caption: "Buyer shortlist workbook structure",
        note: "Buyer records are withheld from public display.",
        columns: ["Sheet", "Records", "Purpose"],
        rows: [
          ["Executive Summary", "—", "Purpose, method and how to work the shortlist"],
          ["Top 30 Strategic Targets", "30", "Highest-priority buyers across all segments"],
          ["Mumbai", "30", "City-segmented targets"],
          ["Pune", "25", "City-segmented targets"],
          ["Bangalore", "51", "City-segmented targets"],
          ["Removed — Backup Rows", "294", "Auditable log of every excluded record"],
          ["Scoring Method", "—", "Documented ranking criteria"],
        ],
      },
    ],
    relatedProjects: ["saudi-market-entry-lead-intelligence"],
    featured: false,
    order: 4,
    seo: {
      title: "Hotel Linen Export — Market and Commercial Programme",
      description:
        "A cross-border export engagement: a seven-sheet buyer shortlist across three city segments, outreach tracking, and a responsive brand website.",
    },
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "automotive-showroom-target-mapping",
    projectName: "Automotive Showroom — Design-Build Target Mapping",
    client: null,
    clientAnonymised: true,
    clientDescriptor: "Design-build and fit-out contractor",
    sector: "Automotive retail and showroom fit-out",
    location: "Middle East",
    category: "growth-b2b",
    services: ["growth-marketing-b2b"],
    dateRange: "2026",
    engagementType: "project",
    scope: [
      "Showroom and dealership target identification",
      "EV and emerging-brand distributor mapping",
      "Ranking for design-build outreach",
      "Contact route and source logging",
    ],
    summary:
      "A ranked database of automotive showroom and dealership targets built for design-build outreach, including emerging EV and international brand distributors entering the region.",
    challenge:
      "Showroom fit-out opportunity concentrates around brands that are opening, relocating or refreshing sites. The mapping needed to surface that activity rather than simply listing every dealership in the market.",
    process: [
      { step: "01", title: "Segment definition", body: "Dealership, distributor and emerging-brand segments were defined against design-build relevance." },
      { step: "02", title: "Identification", body: "Targets were compiled from public sources with contact routes recorded row by row." },
      { step: "03", title: "Ranking", body: "Records were ranked for commercial value to a design-build contractor." },
      { step: "04", title: "Outreach structuring", body: "A separate outreach strategy sheet translated the data into an approach per segment." },
    ],
    deliverables: [
      "Two-sheet lead intelligence workbook",
      "Ranked showroom and distributor targets",
      "Row-level source links and contact routes",
      "Outreach strategy by segment",
    ],
    metrics: [
      { value: "117", label: "Ranked target records" },
      { value: "22", label: "Data fields per record" },
      { value: "2", label: "Structured sheets" },
    ],
    relatedProjects: ["saudi-market-entry-lead-intelligence"],
    featured: false,
    order: 5,
    seo: {
      title: "Automotive Showroom — Design-Build Target Mapping",
      description:
        "A ranked database of automotive showroom, dealership and EV distributor targets built for design-build fit-out outreach in the Middle East.",
    },
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "interior-visualisation-studies",
    projectName: "Interior Visualisation — Concept and Material Studies",
    client: null,
    clientAnonymised: true,
    clientDescriptor: "Internal studio programme and design-studio commissions",
    sector: "Interior, hospitality and commercial design",
    location: "Remote delivery",
    category: "visualisation",
    services: ["visualisation-image-production", "video-ai-film-editing"],
    dateRange: "2026",
    engagementType: "ongoing-support",
    scope: [
      "Interior concept visualisation",
      "Material and finish studies",
      "Lighting and atmosphere exploration",
      "Commercial and showroom space previews",
    ],
    summary:
      "An ongoing body of interior visualisation work used to develop and communicate spatial concepts before they are built — covering material treatment, lighting, and the atmosphere of residential, hospitality and commercial spaces.",
    challenge:
      "Design conversations stall when a space can only be described. These studies exist to move a concept from written direction to something a client can react to, at the point where the design is still open to change.",
    production: {
      intro:
        "Studies are produced as sets rather than single images, so that material, lighting and composition options can be compared side by side.",
      items: [
        "Spatial layout and circulation studies",
        "Material and finish comparison sets",
        "Lighting and atmosphere variants",
        "Furniture and detail composition",
        "Showroom and commercial space previews",
      ],
    },
    deliverables: [
      "High-resolution visualisation sets",
      "Material and lighting variants for comparison",
      "Presentation-ready framing for client review",
    ],
    images: [
      { src: "/media/visual/vis-3.webp", alt: "Interior concept visualisation study exploring material and lighting treatment", width: 1440, height: 1440 },
      { src: "/media/visual/vis-8.webp", alt: "Interior spatial concept visualisation with layered lighting", width: 1440, height: 960 },
      { src: "/media/visual/vis-11.webp", alt: "Interior visualisation study showing vertical spatial composition", width: 1440, height: 1920 },
      { src: "/media/visual/vis-14.webp", alt: "Commercial interior visualisation exploring material contrast", width: 1439, height: 1079 },
      { src: "/media/visual/vis-23.webp", alt: "Interior concept study with detailed furniture composition", width: 1440, height: 1919 },
      { src: "/media/visual/vis-24.webp", alt: "Hospitality interior visualisation exploring atmosphere and lighting", width: 1440, height: 1919 },
      { src: "/media/visual/vis-28.webp", alt: "Interior material and finish study", width: 1386, height: 1440 },
      { src: "/media/visual/vis-31.webp", alt: "Interior concept visualisation with considered surface treatment", width: 1440, height: 1440 },
      { src: "/media/visual/vis-32.webp", alt: "Spatial visualisation study exploring proportion and light", width: 1440, height: 1440 },
      { src: "/media/visual/vis-36.webp", alt: "Interior visualisation exploring vertical volume and finish", width: 1440, height: 1920 },
      { src: "/media/visual/vis-39.webp", alt: "Interior concept study with layered material palette", width: 1440, height: 1919 },
      { src: "/media/visual/vis-40.webp", alt: "Interior visualisation study of a residential space", width: 1438, height: 1920 },
      { src: "/media/visual/render-1.webp", alt: "Spatial interior render showing lighting and material texture", width: 999, height: 1230 },
      { src: "/media/visual/render-2.webp", alt: "Interior spatial render exploring furniture detail", width: 991, height: 1236 },
      { src: "/media/visual/render-3.webp", alt: "Interior render study of a contemporary space", width: 975, height: 1226 },
      { src: "/media/visual/render-4.webp", alt: "Spatial concept render with material study", width: 988, height: 1232 },
      { src: "/media/visual/render-5.webp", alt: "Interior render exploring lighting design", width: 988, height: 1226 },
      { src: "/media/visual/render-6.webp", alt: "Interior spatial render with contemporary material treatment", width: 978, height: 1232 },
    ],
    video: [
      {
        src: "/media/video/room-transformation-interior-walkthrough.mp4",
        poster: "/media/video/room-transformation-interior-walkthrough-poster.webp",
        width: 1080,
        height: 1920,
        title: "Room transformation walkthrough",
        description: "Before-and-after interior transformation study exploring material and spatial change.",
      },
      {
        src: "/media/video/one-design-district-showroom-reel.mp4",
        poster: "/media/video/one-design-district-showroom-reel-poster.webp",
        width: 720,
        height: 1280,
        title: "Showroom walkthrough",
        description: "Point-of-view showroom walkthrough showing statement pieces and premium finishes.",
      },
    ],
    relatedProjects: ["bahrain-luxury-interior-cad-package", "sultanah-moon-chair-cinematic-campaign"],
    featured: false,
    order: 6,
    seo: {
      title: "Interior Visualisation — Concept and Material Studies",
      description:
        "An ongoing body of interior visualisation work: spatial concepts, material studies, lighting exploration and showroom previews for design-led businesses.",
      image: "/media/visual/vis-3.webp",
    },
  },
];

/* ================================================================== */
/* Accessors                                                           */
/* ================================================================== */

export function allCaseStudies(): CaseStudy[] {
  return [...CASE_STUDIES].sort((a, b) => a.order - b.order);
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}

export function featuredCaseStudies(limit?: number): CaseStudy[] {
  const list = allCaseStudies().filter((c) => c.featured);
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

export function caseStudiesByCategory(category: WorkCategory): CaseStudy[] {
  return allCaseStudies().filter((c) => c.category === category);
}

export function caseStudiesForService(slug: ServiceSlug, limit?: number): CaseStudy[] {
  const list = allCaseStudies().filter((c) => c.services.includes(slug));
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

export function relatedCaseStudies(study: CaseStudy, limit = 2): CaseStudy[] {
  const explicit = (study.relatedProjects ?? [])
    .map(getCaseStudy)
    .filter((c): c is CaseStudy => Boolean(c));

  if (explicit.length >= limit) return explicit.slice(0, limit);

  const derived = allCaseStudies().filter(
    (c) =>
      c.slug !== study.slug &&
      !explicit.some((e) => e.slug === c.slug) &&
      (c.category === study.category ||
        c.services.some((s) => study.services.includes(s))),
  );

  return [...explicit, ...derived].slice(0, limit);
}

/** The display name for a client, honouring anonymisation. */
export function clientLabel(study: CaseStudy): string | null {
  if (!study.clientAnonymised) return study.client;
  return study.clientDescriptor ?? null;
}

/** Categories that actually contain published work. */
export function activeCategories() {
  return WORK_CATEGORIES.filter((c) => caseStudiesByCategory(c.slug).length > 0);
}
