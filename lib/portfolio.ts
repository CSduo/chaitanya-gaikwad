/**
 * The portfolio library.
 *
 * Every item here is restored from the previous site's real project data and
 * assets. Titles, clients, years and descriptions are the originals unless a
 * rewrite is noted. Nothing is invented.
 *
 * Media lives under /public/media and is referenced by absolute path.
 */

/* ================================================================== */
/* VIDEO — 9 projects                                                  */
/* ================================================================== */

export type VideoProject = {
  slug: string;
  title: string;
  /** null when the client was not public on the original site. */
  client: string | null;
  clientDescriptor?: string;
  year: string;
  tags: string[];
  description: string;
  src: string;
  poster: string;
  posterWidth: number;
  posterHeight: number;
  featured: boolean;
  order: number;
};

export const VIDEOS: VideoProject[] = [
  {
    slug: "sultanah-co-moon-chair-cinematic-campaign",
    title: "Moon Chair Cinematic Campaign",
    client: "Sultanah & Co. Interiors",
    year: "2025",
    tags: ["Cinematic", "Product campaign", "Luxury furniture"],
    description:
      "A cinematic campaign built around a single furniture piece, carrying the product story from factory floor through to showroom setting in short-form.",
    src: "/media/video/sultanah-co-moon-chair-cinematic-campaign.mp4",
    poster: "/media/posters/sultanah-co-moon-chair-cinematic-campaign-poster.webp",
    posterWidth: 1080,
    posterHeight: 1350,
    featured: true,
    order: 1,
  },
  {
    slug: "kozena-luxury-furniture-campaign",
    title: "Kozena Luxury Furniture Campaign",
    client: "Kozena",
    year: "2026",
    tags: ["Cinematic", "Product campaign", "Furniture"],
    description:
      "A premium cinematic product showcase for a luxury sofa and furniture range.",
    src: "/media/video/kozena-luxury-furniture-campaign.mp4",
    poster: "/media/posters/kozena-luxury-furniture-campaign-poster.webp",
    posterWidth: 1080,
    posterHeight: 1920,
    featured: true,
    order: 2,
  },
  {
    slug: "bingxi-factory-video",
    title: "Bingxi Factory-to-Showroom Film",
    client: "Bingxi",
    year: "2026",
    tags: ["Cinematic", "Industrial", "Product story"],
    description:
      "A visual campaign tracking production from the factory floor through to a luxury furniture showroom.",
    src: "/media/video/bingxi-factory-video.mp4",
    poster: "/media/posters/bingxi-factory-video-poster.webp",
    posterWidth: 832,
    posterHeight: 464,
    featured: true,
    order: 3,
  },
  {
    slug: "the-bar-edit-cinematic",
    title: "The Bar Edit",
    client: null,
    clientDescriptor: "Hospitality client",
    year: "2026",
    tags: ["Cinematic", "Hospitality", "Short-form"],
    description:
      "A commercial edit showcasing ambience, luxury finishes and design detail for an upscale bar.",
    src: "/media/video/the-bar-edit-cinematic.mp4",
    poster: "/media/posters/the-bar-edit-cinematic-poster.webp",
    posterWidth: 1080,
    posterHeight: 1350,
    featured: false,
    order: 4,
  },
  {
    slug: "premium-bar-red-restaurant-concept",
    title: "Premium Bar & Restaurant Concept",
    client: null,
    clientDescriptor: "Hospitality client",
    year: "2026",
    tags: ["Hospitality", "Interior walkthrough", "Concept"],
    description:
      "A visual walkthrough and promotional concept for a high-end bar and restaurant design proposal.",
    src: "/media/video/premium-bar-red-restaurant-concept.mp4",
    poster: "/media/posters/premium-bar-red-restaurant-concept-poster.webp",
    posterWidth: 1080,
    posterHeight: 1920,
    featured: false,
    order: 5,
  },
  {
    slug: "bahrain-client-commercial-ad",
    title: "Bahrain Commercial Ad",
    client: null,
    clientDescriptor: "Middle East developer",
    year: "2026",
    tags: ["Commercial", "Real estate", "Walkthrough"],
    description:
      "A cinematic visual advertisement and walkthrough campaign for a premium real estate developer in Bahrain.",
    src: "/media/video/bahrain-client-commercial-ad.mp4",
    poster: "/media/posters/bahrain-client-commercial-ad-poster.webp",
    posterWidth: 1080,
    posterHeight: 1350,
    featured: false,
    order: 6,
  },
  {
    slug: "room-transformation-interior-walkthrough",
    title: "Room Transformation Walkthrough",
    client: null,
    clientDescriptor: "Interior design studio",
    year: "2026",
    tags: ["Interior", "Before and after", "Material study"],
    description:
      "A before-and-after room transformation reel and material study.",
    src: "/media/video/room-transformation-interior-walkthrough.mp4",
    poster: "/media/posters/room-transformation-interior-walkthrough-poster.webp",
    posterWidth: 1080,
    posterHeight: 1920,
    featured: false,
    order: 7,
  },
  {
    slug: "great-design-holds-attention-walkthrough",
    title: "Spatial Rhythm Walkthrough",
    client: null,
    clientDescriptor: "Internal visual study",
    year: "2026",
    tags: ["Spatial study", "Interior", "Texture"],
    description:
      "A walkthrough study exploring visual rhythm, spatial comfort and premium textures.",
    src: "/media/video/great-design-holds-attention-walkthrough.mp4",
    poster: "/media/posters/great-design-holds-attention-walkthrough-poster.webp",
    posterWidth: 720,
    posterHeight: 1280,
    featured: false,
    order: 8,
  },
];

/* ================================================================== */
/* GROWTH / B2B — 8 workbooks                                          */
/* ================================================================== */

export type Workbook = {
  slug: string;
  title: string;
  summary: string;
  region: string;
  tags: string[];
  sheetCount: number;
  sheetNames: string[];
  /** Redacted JSON preview rendered by the data viewer. */
  dataUrl: string;
  /** Redacted portfolio copy. Document metadata has been stripped. */
  downloadUrl: string;
  featured: boolean;
  order: number;
};

export const WORKBOOKS: Workbook[] = [
  {
    slug: "saudi-riyadh-jeddah-55-lead-intelligence",
    title: "Saudi Market Entry — Lead Intelligence",
    summary:
      "Developers, luxury hotel projects and pre-opening opportunities mapped across Riyadh and Jeddah, scored and routed for outreach.",
    region: "Saudi Arabia",
    tags: ["Market entry", "Lead intelligence", "Decision-maker routes"],
    sheetCount: 6,
    sheetNames: ["Master Leads", "Ongoing Projects", "Decision Maker Routes", "Outreach Angles", "Source Log", "Send Guidance"],
    dataUrl: "/media/data/saudi-riyadh-jeddah-55-lead-intelligence.json",
    downloadUrl: "/media/downloads/saudi-riyadh-jeddah-55-lead-intelligence-redacted.xlsx",
    featured: true,
    order: 1,
  },
  {
    slug: "cleaned-premium-fabric-import-buyer-shortlist",
    title: "Premium Fabric Import Buyer Shortlist",
    summary:
      "A cleaned and ranked shortlist of premium fabric importers across three Indian cities, with an auditable log of every excluded record.",
    region: "India",
    tags: ["Buyer discovery", "Segmentation", "Export support"],
    sheetCount: 4,
    sheetNames: ["Top 30 Strategic Targets", "Mumbai", "Pune", "Bangalore"],
    dataUrl: "/media/data/cleaned-premium-fabric-import-buyer-shortlist.json",
    downloadUrl: "/media/downloads/cleaned-premium-fabric-import-buyer-shortlist-redacted.xlsx",
    featured: true,
    order: 2,
  },
  {
    slug: "automotive-showroom-lead-intelligence",
    title: "Automotive Showroom Lead Intelligence",
    summary:
      "Dealership showroom targets and EV and emerging-brand distributors ranked for design-build fit-out outreach.",
    region: "Middle East",
    tags: ["Design-build", "Ranking", "Outreach strategy"],
    sheetCount: 2,
    sheetNames: ["Lead Intelligence", "Outreach Strategy"],
    dataUrl: "/media/data/automotive-showroom-lead-intelligence.json",
    downloadUrl: "/media/downloads/automotive-showroom-lead-intelligence-redacted.xlsx",
    featured: true,
    order: 3,
  },
  {
    slug: "philippines-vip-approachable-lead-intelligence",
    title: "Philippines VIP Contact Route Mapping",
    summary:
      "Upper-echelon public contact routes mapped for premium architectural outreach, with source logging and use notes.",
    region: "Philippines",
    tags: ["Contact routes", "Source logging", "Premium outreach"],
    sheetCount: 4,
    sheetNames: ["VIP Lead Intelligence", "Outreach Routes", "Source Log", "Use Notes"],
    dataUrl: "/media/data/philippines-vip-approachable-lead-intelligence.json",
    downloadUrl: "/media/downloads/philippines-vip-approachable-lead-intelligence-redacted.xlsx",
    featured: false,
    order: 4,
  },
  {
    slug: "china-interior-markets-100plus",
    title: "China Interior Markets & Hubs",
    summary:
      "Wholesale interior decor markets and furniture hubs mapped across Tier 1, 2 and 3 cities.",
    region: "China",
    tags: ["Market mapping", "Supplier discovery", "Tiered segmentation"],
    sheetCount: 4,
    sheetNames: ["MASTER", "Tier_1", "Tier_2", "Tier_3"],
    dataUrl: "/media/data/china-interior-markets-100plus.json",
    downloadUrl: "/media/downloads/china-interior-markets-100plus-redacted.xlsx",
    featured: false,
    order: 5,
  },
  {
    slug: "middle-east-interiors-fitout-whatsapp-expanded",
    title: "GCC Interiors & Fit-out Firms",
    summary:
      "An expanded database mapping interior and fit-out firms across the GCC with reachable business channels.",
    region: "GCC",
    tags: ["Fit-out", "Contact channels", "Lead generation"],
    sheetCount: 1,
    sheetNames: ["Expanded ME Leads"],
    dataUrl: "/media/data/middle-east-interiors-fitout-whatsapp-expanded.json",
    downloadUrl: "/media/downloads/middle-east-interiors-fitout-whatsapp-expanded-redacted.xlsx",
    featured: false,
    order: 6,
  },
  {
    slug: "electronics-middle-east-selected-leads",
    title: "Electronics Retail — UAE Market Mapping",
    summary:
      "Market mapping and a selected lead shortlist for electronics retail across target UAE regions.",
    region: "United Arab Emirates",
    tags: ["Retail", "Market mapping", "Shortlisting"],
    sheetCount: 1,
    sheetNames: ["selected_leads"],
    dataUrl: "/media/data/electronics-middle-east-selected-leads.json",
    downloadUrl: "/media/downloads/electronics-middle-east-selected-leads-redacted.xlsx",
    featured: false,
    order: 7,
  },
  {
    slug: "laminate-events-in-india",
    title: "Building & Materials Expo Calendar",
    summary:
      "An events calendar mapping architecture, construction and building-material exhibitions across India.",
    region: "India",
    tags: ["Events research", "Trade exhibitions", "Planning"],
    sheetCount: 1,
    sheetNames: ["Events Calendar"],
    dataUrl: "/media/data/laminate-events-in-india.json",
    downloadUrl: "/media/downloads/laminate-events-in-india-redacted.xlsx",
    featured: false,
    order: 8,
  },
];

/* ================================================================== */
/* CAD — 25 Ultra-HD drawings across seven real project packages        */
/* ================================================================== */

export type CadProjectId =
  | "master-bathroom"
  | "cigar-lounge"
  | "master-bedroom"
  | "toilet-wash"
  | "stair-wall"
  | "villa-concept"
  | "villa-measurement";

export type CadDrawing = {
  src: string;
  title: string;
  category: string;
  alt: string;
  width: number;
  height: number;
  /** "input" = supplied by the client; "output" = produced by XIYÀTO. */
  role: "input" | "output";
  project: CadProjectId;
  downloads?: {
    pdf?: string;
    dwg?: string;
  };
};

export const CAD_PROJECTS: {
  id: CadProjectId;
  title: string;
  summary: string;
  pdfDownload?: string;
  dwgDownload?: string;
}[] = [
  {
    id: "master-bathroom",
    title: "Master Bathroom Package",
    summary:
      "General arrangement plan plus four detailed wall elevations, produced from a client 3D render and measured site sketches.",
    pdfDownload: "/media/cad/downloads/master-bathroom-set.pdf",
    dwgDownload: "/media/cad/downloads/master-bathroom-set.dwg",
  },
  {
    id: "cigar-lounge",
    title: "Cigar Lounge — Ceiling & Flooring",
    summary:
      "Coordinated coffered ceiling plan (RCP), bespoke seating arrangement, and detailed herringbone parquet flooring setting-out.",
    pdfDownload: "/media/cad/downloads/cigar-lounge-set.pdf",
    dwgDownload: "/media/cad/downloads/cigar-lounge-set.dwg",
  },
  {
    id: "master-bedroom",
    title: "Master Bedroom & Joinery Suite",
    summary:
      "Full room layout, bespoke bed headboard millwork, wardrobe elevations, window vanity, and ceiling electrical coordination.",
    pdfDownload: "/media/cad/downloads/master-bedroom-set.pdf",
    dwgDownload: "/media/cad/downloads/master-bedroom-set.dwg",
  },
  {
    id: "toilet-wash",
    title: "Powder Room & Feature Walls",
    summary:
      "Guest powder room plan, vertical fluted wall panelling details, halo-lit vanity mirror, and plumbing fixture elevations.",
    pdfDownload: "/media/cad/downloads/toilet-wash-set.pdf",
  },
  {
    id: "stair-wall",
    title: "Stair Feature Wall Joinery Detail",
    summary:
      "Precision architectural joinery construction detail for custom staircase panelling with panel reveals and hidden fixings.",
    pdfDownload: "/media/cad/downloads/stair-wall-detail.pdf",
  },
  {
    id: "villa-concept",
    title: "Luxury Villa Architectural Concept",
    summary:
      "Multi-sheet architectural layout and concept documentation: master site plan, ground floor, and first floor residential suites.",
    pdfDownload: "/media/cad/downloads/villa-concept-set.pdf",
  },
  {
    id: "villa-measurement",
    title: "Area Measurement & Boundary Survey",
    summary:
      "Verified polyline boundary measurement and gross internal area calculation validated against architectural surveys.",
    pdfDownload: "/media/cad/downloads/villa03-area-measurement.pdf",
  },
];

export const CAD_DRAWINGS: CadDrawing[] = [
  // ---- 1. Master bathroom ----
  {
    src: "/media/cad/mb-render-input.jpg",
    title: "Client reference — 3D concept visual",
    category: "Client input",
    alt: "Client-supplied 3D visual render of the luxury master bathroom",
    width: 986,
    height: 1448,
    role: "input",
    project: "master-bathroom",
  },
  {
    src: "/media/cad/mb-sketch-input.jpg",
    title: "Client reference — measured site sketch",
    category: "Client input",
    alt: "Client-supplied measured hand sketch with on-site dimensions and CAD notes",
    width: 247,
    height: 532,
    role: "input",
    project: "master-bathroom",
  },
  {
    src: "/media/cad/mb-plan.png",
    title: "General arrangement floor plan",
    category: "Floor Plan",
    alt: "Master bathroom general arrangement plan with dimension strings, fixture setting-out and door swings",
    width: 7629,
    height: 5389,
    role: "output",
    project: "master-bathroom",
    downloads: {
      pdf: "/media/cad/downloads/master-bathroom-set.pdf",
      dwg: "/media/cad/downloads/master-bathroom-set.dwg",
    },
  },
  {
    src: "/media/cad/mb-wall-1.png",
    title: "Wall 1 — bathtub & window elevation",
    category: "Elevation",
    alt: "Interior wall elevation detailing freestanding bathtub placement, window reveals, and wall tiling setting-out",
    width: 7629,
    height: 5389,
    role: "output",
    project: "master-bathroom",
    downloads: { pdf: "/media/cad/downloads/master-bathroom-set.pdf" },
  },
  {
    src: "/media/cad/mb-wall-2.png",
    title: "Wall 2 — vanity & WC elevation",
    category: "Elevation",
    alt: "Interior wall elevation detailing bespoke vanity unit, mirror lighting, and concealed cistern WC partition",
    width: 7629,
    height: 5389,
    role: "output",
    project: "master-bathroom",
    downloads: { pdf: "/media/cad/downloads/master-bathroom-set.pdf" },
  },
  {
    src: "/media/cad/mb-wall-3.png",
    title: "Wall 3 — walk-in shower elevation",
    category: "Elevation",
    alt: "Interior wall elevation detailing walk-in shower glass partition, niche recess, and concealed mixer heights",
    width: 7629,
    height: 5389,
    role: "output",
    project: "master-bathroom",
    downloads: { pdf: "/media/cad/downloads/master-bathroom-set.pdf" },
  },
  {
    src: "/media/cad/mb-wall-4.png",
    title: "Wall 4 — entrance door & reveal elevation",
    category: "Elevation",
    alt: "Interior wall elevation detailing bathroom entrance portal, architrave profile, and wall finish transition",
    width: 7573,
    height: 5389,
    role: "output",
    project: "master-bathroom",
    downloads: { pdf: "/media/cad/downloads/master-bathroom-set.pdf" },
  },

  // ---- 2. Cigar lounge ----
  {
    src: "/media/cad/cl-render-tv-input.jpg",
    title: "Client reference — TV wall 3D visual",
    category: "Client input",
    alt: "Client-supplied 3D visual render of the cigar lounge media wall",
    width: 675,
    height: 452,
    role: "input",
    project: "cigar-lounge",
  },
  {
    src: "/media/cad/cl-render-bar-input.jpg",
    title: "Client reference — bar counter 3D visual",
    category: "Client input",
    alt: "Client-supplied 3D visual render of the lounge bar and joinery",
    width: 600,
    height: 547,
    role: "input",
    project: "cigar-lounge",
  },
  {
    src: "/media/cad/cl-layout.png",
    title: "General furniture layout & seating plan",
    category: "Floor Plan",
    alt: "Cigar lounge general furniture arrangement plan with custom seating, bar, and circulation clearances",
    width: 7629,
    height: 5389,
    role: "output",
    project: "cigar-lounge",
    downloads: {
      pdf: "/media/cad/downloads/cigar-lounge-set.pdf",
      dwg: "/media/cad/downloads/cigar-lounge-set.dwg",
    },
  },
  {
    src: "/media/cad/cl-ceiling.png",
    title: "Reflected ceiling plan (RCP)",
    category: "RCP",
    alt: "Reflected ceiling plan showing multi-tier coffered ceiling grid, perimeter LED cove lighting, and downlight coordination",
    width: 7629,
    height: 5389,
    role: "output",
    project: "cigar-lounge",
    downloads: { pdf: "/media/cad/downloads/cigar-lounge-set.pdf" },
  },
  {
    src: "/media/cad/cl-flooring.png",
    title: "Herringbone timber flooring setting-out",
    category: "Flooring",
    alt: "Herringbone parquet flooring setting-out plan with centerlines, perimeter borders, and threshold details",
    width: 7629,
    height: 5389,
    role: "output",
    project: "cigar-lounge",
    downloads: { pdf: "/media/cad/downloads/cigar-lounge-set.pdf" },
  },

  // ---- 3. Master Bedroom ----
  {
    src: "/media/cad/mbr-render-window.jpg",
    title: "Client reference — bedroom window visual",
    category: "Client input",
    alt: "Client-supplied 3D visual render of arched window feature and vanity",
    width: 1409,
    height: 1116,
    role: "input",
    project: "master-bedroom",
  },
  {
    src: "/media/cad/mbr-render-bed.jpg",
    title: "Client reference — bed headboard & joinery visual",
    category: "Client input",
    alt: "Client-supplied 3D visual render of custom bed headboard wall and study desk",
    width: 1600,
    height: 971,
    role: "input",
    project: "master-bedroom",
  },
  {
    src: "/media/cad/mbr-plan.png",
    title: "Master bedroom general arrangement plan",
    category: "Floor Plan",
    alt: "Master bedroom general arrangement plan with custom joinery, bed zone, study office, and sitting bench setting-out",
    width: 8344,
    height: 5894,
    role: "output",
    project: "master-bedroom",
    downloads: {
      pdf: "/media/cad/downloads/master-bedroom-set.pdf",
      dwg: "/media/cad/downloads/master-bedroom-set.dwg",
    },
  },
  {
    src: "/media/cad/mbr-elevation-1.png",
    title: "Wall 1 & 2 — bed headboard & wardrobe elevations",
    category: "Elevation",
    alt: "Interior wall elevations detailing custom acoustic headboard panelling, bedside sconces, and full-height wardrobe joinery",
    width: 8344,
    height: 5894,
    role: "output",
    project: "master-bedroom",
    downloads: { pdf: "/media/cad/downloads/master-bedroom-set.pdf" },
  },
  {
    src: "/media/cad/mbr-elevation-2.png",
    title: "Wall 3 & 4 — window vanity & office study desk",
    category: "Elevation",
    alt: "Interior wall elevations detailing integrated window bench seating, vanity mirror lighting, and study desk millwork",
    width: 8344,
    height: 5894,
    role: "output",
    project: "master-bedroom",
    downloads: { pdf: "/media/cad/downloads/master-bedroom-set.pdf" },
  },
  {
    src: "/media/cad/mbr-ceiling.png",
    title: "Reflected ceiling & electrical setting-out",
    category: "RCP",
    alt: "Reflected ceiling plan and electrical layout with recessed lighting, linear magnetic tracks, and AC diffuser positions",
    width: 8344,
    height: 5894,
    role: "output",
    project: "master-bedroom",
    downloads: { pdf: "/media/cad/downloads/master-bedroom-set.pdf" },
  },

  // ---- 4. Toilet & Wash Feature Wall ----
  {
    src: "/media/cad/tw-plan.png",
    title: "Toilet & wash powder room general plan",
    category: "Floor Plan",
    alt: "Powder room and guest toilet general arrangement layout with fixture clearances and partition thicknesses",
    width: 4764,
    height: 3274,
    role: "output",
    project: "toilet-wash",
    downloads: { pdf: "/media/cad/downloads/toilet-wash-set.pdf" },
  },
  {
    src: "/media/cad/tw-toilet-elevation.png",
    title: "Toilet feature wall — panelling & mirror detail",
    category: "Elevation",
    alt: "Toilet feature wall elevation detailing vertical fluted panelling, LED halo backlit mirror, and stone vanity counter",
    width: 4764,
    height: 3274,
    role: "output",
    project: "toilet-wash",
    downloads: { pdf: "/media/cad/downloads/toilet-wash-set.pdf" },
  },
  {
    src: "/media/cad/tw-wash-elevation.png",
    title: "Wash feature wall — joinery & fixture detail",
    category: "Elevation",
    alt: "Wash area feature wall elevation detailing decorative moulding, wall-mounted faucet heights, and towel niche integration",
    width: 4764,
    height: 3274,
    role: "output",
    project: "toilet-wash",
    downloads: { pdf: "/media/cad/downloads/toilet-wash-set.pdf" },
  },

  // ---- 5. Stair Wall Detail ----
  {
    src: "/media/cad/sw-client-markup.jpg",
    title: "Client reference — marked-up design sketch",
    category: "Client input",
    alt: "Client-supplied design intent sketch with on-site height dimensions and material specifications",
    width: 1235,
    height: 1536,
    role: "input",
    project: "stair-wall",
  },
  {
    src: "/media/cad/sw-joinery-detail.png",
    title: "Stair feature wall — architectural joinery detail",
    category: "Construction Detail",
    alt: "Architectural joinery construction detail for custom stair feature wall with panel joint reveals and concealed fixings",
    width: 5064,
    height: 6388,
    role: "output",
    project: "stair-wall",
    downloads: { pdf: "/media/cad/downloads/stair-wall-detail.pdf" },
  },

  // ---- 6. Luxury Villa Architectural Concept ----
  {
    src: "/media/cad/va-site-concept.png",
    title: "Site plan & landscape boundary coordination",
    category: "Site Plan",
    alt: "Master site layout plan showing building footprint, vehicular access, garden setbacks, and boundary wall details",
    width: 2977,
    height: 2105,
    role: "output",
    project: "villa-concept",
    downloads: { pdf: "/media/cad/downloads/villa-concept-set.pdf" },
  },
  {
    src: "/media/cad/va-ground-floor.png",
    title: "Ground floor architectural layout",
    category: "Floor Plan",
    alt: "Ground floor layout with double-height foyer, formal majlis, family living, show kitchen, and service quarters",
    width: 2977,
    height: 2105,
    role: "output",
    project: "villa-concept",
    downloads: { pdf: "/media/cad/downloads/villa-concept-set.pdf" },
  },
  {
    src: "/media/cad/va-first-floor.png",
    title: "First floor residential layout",
    category: "Floor Plan",
    alt: "First floor bedroom suites arrangement with walk-in closets, ensuite bathrooms, family lounge, and terrace balconies",
    width: 2977,
    height: 2105,
    role: "output",
    project: "villa-concept",
    downloads: { pdf: "/media/cad/downloads/villa-concept-set.pdf" },
  },

  // ---- 7. Villa Area Measurement ----
  {
    src: "/media/cad/vm-area-boundary.png",
    title: "Verified area calculation & boundary survey",
    category: "Area Analysis",
    alt: "Accurate polyline boundary measurement and gross internal area calculation validated against architectural surveys",
    width: 1980,
    height: 1810,
    role: "output",
    project: "villa-measurement",
    downloads: { pdf: "/media/cad/downloads/villa03-area-measurement.pdf" },
  },
];

export function cadByProject(project: CadDrawing["project"]) {
  return CAD_DRAWINGS.filter((d) => d.project === project);
}

/* ================================================================== */
/* WEBSITES — 3 projects                                               */
/* ================================================================== */

export type WebsiteProject = {
  slug: string;
  title: string;
  client: string | null;
  clientDescriptor?: string;
  role: string;
  description: string;
  scope: string[];
  liveUrl: string | null;
  year: string;
  order: number;
};

export const WEBSITES: WebsiteProject[] = [
  {
    slug: "export-brand-website",
    title: "Export Brand Website",
    client: null,
    clientDescriptor: "International bedding and hotel-linen exporter",
    role: "Front-end development and digital presentation",
    description:
      "A complete responsive brand website built to give cross-border export outreach a credible destination and a route for enquiries.",
    scope: [
      "Page structure and content planning",
      "Visual direction",
      "Responsive front-end implementation",
      "Mobile optimisation",
      "Enquiry route",
      "Deployment",
    ],
    liveUrl: "https://xiyora.vercel.app",
    year: "2025",
    order: 1,
  },
  {
    slug: "anvikshiki-journal",
    title: "Anvikshiki Journal",
    client: "Anvikshiki Journal",
    role: "Full-stack development and technical administration",
    description:
      "A responsive academic journal platform for publishing scholarly articles, indexing, peer-reviewed papers and author submissions.",
    scope: [
      "Publication platform structure",
      "Author submission handling",
      "Indexing and article organisation",
      "Responsive layout",
      "Database integration",
      "Deployment and administration",
    ],
    liveUrl: "https://anvikshikijournal.in/",
    year: "2026",
    order: 2,
  },
  {
    slug: "xiyato-studio-site",
    title: "XIYÀTO Studio Site",
    client: "XIYÀTO",
    role: "Design and front-end development",
    description:
      "This website. Built as a statically pre-rendered application with a typed content layer, accessible navigation and a server-side enquiry pipeline.",
    scope: [
      "Information architecture",
      "Design system",
      "Static pre-rendering for crawlable content",
      "Accessible navigation and media viewers",
      "Server-side enquiry handling",
      "Deployment",
    ],
    liveUrl: "https://xiyato.uk",
    year: "2026",
    order: 3,
  },
];

/* ================================================================== */
/* Cross-cutting accessors                                             */
/* ================================================================== */

export function featuredVideos(limit = 4) {
  return [...VIDEOS].sort((a, b) => a.order - b.order).filter((v) => v.featured).slice(0, limit);
}
export function allVideos() {
  return [...VIDEOS].sort((a, b) => a.order - b.order);
}
export function featuredWorkbooks(limit = 3) {
  return [...WORKBOOKS].sort((a, b) => a.order - b.order).filter((w) => w.featured).slice(0, limit);
}
export function allWorkbooks() {
  return [...WORKBOOKS].sort((a, b) => a.order - b.order);
}
export function getWorkbook(slug: string) {
  return WORKBOOKS.find((w) => w.slug === slug);
}
export function allWebsites() {
  return [...WEBSITES].sort((a, b) => a.order - b.order);
}

/** Portfolio volume, computed from the data rather than asserted. */
export const PORTFOLIO_COUNTS = {
  cad: CAD_DRAWINGS.filter((d) => d.role === "output").length,
  cadInputs: CAD_DRAWINGS.filter((d) => d.role === "input").length,
  workbooks: WORKBOOKS.length,
  videos: VIDEOS.length,
  websites: WEBSITES.length,
} as const;
