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
    slug: "one-design-district-showroom-reel",
    title: "One Design District Showroom Reel",
    client: "One Design District",
    year: "2026",
    tags: ["Showroom", "Interior", "Point of view"],
    description:
      "A point-of-view walkthrough showing statement furniture pieces and premium finishes across a showroom floor.",
    src: "/media/video/one-design-district-showroom-reel.mp4",
    poster: "/media/posters/one-design-district-showroom-reel-poster.webp",
    posterWidth: 720,
    posterHeight: 1280,
    featured: false,
    order: 4,
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
    order: 5,
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
    order: 6,
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
    order: 7,
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
    order: 8,
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
    order: 9,
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
    sheetCount: 7,
    sheetNames: ["Executive Summary", "Top 30 Strategic Targets", "Mumbai", "Pune", "Bangalore", "Removed - Backup Rows", "Scoring Method"],
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
/* CAD — 15 unique drawings across three spaces                        */
/* ================================================================== */

export type CadDrawing = {
  src: string;
  title: string;
  category: string;
  alt: string;
  width: number;
  height: number;
  /** "input" = supplied by the client; "output" = produced by XIYÀTO. */
  role: "input" | "output";
  project: "master-bathroom" | "cigar-lounge" | "feature-walls";
};

export const CAD_DRAWINGS: CadDrawing[] = [
  // ---- Master bathroom ----
  {
    src: "/media/cad/master-bathroom-render-input.webp",
    title: "Client reference — 3D visual render",
    category: "Client input",
    alt: "Client-supplied 3D visual render of the master bathroom used as design reference",
    width: 986, height: 1448, role: "input", project: "master-bathroom",
  },
  {
    src: "/media/cad/master-bathroom-plan-input.webp",
    title: "Client reference — measured hand sketch",
    category: "Client input",
    alt: "Client-supplied measured hand sketch with dimensions and CAD notes",
    width: 247, height: 532, role: "input", project: "master-bathroom",
  },
  {
    src: "/media/cad/master-bathroom-plan.webp",
    title: "General arrangement plan",
    category: "Plan",
    alt: "Master bathroom general arrangement plan with dimensions and fixture setting-out",
    width: 3200, height: 2260, role: "output", project: "master-bathroom",
  },
  {
    src: "/media/cad/master-bathroom-elevation.webp",
    title: "Wall 1 — bathtub and window elevation",
    category: "Elevation",
    alt: "Interior wall elevation showing bathtub and window setting-out",
    width: 3200, height: 2260, role: "output", project: "master-bathroom",
  },
  {
    src: "/media/cad/master-bathroom-vanity.webp",
    title: "Wall 2 — vanity and WC elevation",
    category: "Elevation",
    alt: "Interior wall elevation showing the vanity and WC wall",
    width: 3200, height: 2260, role: "output", project: "master-bathroom",
  },
  {
    src: "/media/cad/master-bathroom-shower.webp",
    title: "Wall 3 — walk-in shower elevation",
    category: "Elevation",
    alt: "Interior wall elevation showing the walk-in shower",
    width: 3200, height: 2260, role: "output", project: "master-bathroom",
  },

  // ---- Cigar lounge ----
  {
    src: "/media/cad/cigar-lounge-layout.webp",
    title: "General furniture layout",
    category: "Plan",
    alt: "Cigar lounge general furniture layout plan",
    width: 3200, height: 2260, role: "output", project: "cigar-lounge",
  },
  {
    src: "/media/cad/cigar-lounge-ceiling.webp",
    title: "Reflected ceiling plan",
    category: "RCP",
    alt: "Cigar lounge reflected ceiling plan showing coffered ceiling and lighting arrangement",
    width: 3200, height: 2260, role: "output", project: "cigar-lounge",
  },
  {
    src: "/media/cad/cigar-lounge-flooring.webp",
    title: "Herringbone flooring setting-out",
    category: "Flooring",
    alt: "Cigar lounge herringbone flooring setting-out plan",
    width: 3200, height: 2260, role: "output", project: "cigar-lounge",
  },

  // ---- Feature walls ----
  {
    src: "/media/cad/feature-wall-overview.webp",
    title: "General arrangement and layout",
    category: "Plan",
    alt: "Custom interior feature walls general arrangement and layout drawing",
    width: 3200, height: 2199, role: "output", project: "feature-walls",
  },
  {
    src: "/media/cad/toilet-3d-input.webp",
    title: "Client reference — toilet wall 3D",
    category: "Client input",
    alt: "Client-supplied 3D reference for the toilet feature wall",
    width: 1080, height: 1440, role: "input", project: "feature-walls",
  },
  {
    src: "/media/cad/toilet-elevations.webp",
    title: "Toilet feature wall — elevation detail",
    category: "Elevation",
    alt: "Toilet feature wall elevation detailing vanity and mirror",
    width: 3200, height: 2199, role: "output", project: "feature-walls",
  },
  {
    src: "/media/cad/wash-elevations.webp",
    title: "Wash feature wall — panelling and fixtures",
    category: "Elevation",
    alt: "Wash feature wall elevation detailing decorative panelling and fixtures",
    width: 3200, height: 2199, role: "output", project: "feature-walls",
  },
  {
    src: "/media/cad/stair-wall-input.webp",
    title: "Client reference — stair wall",
    category: "Client input",
    alt: "Client-supplied reference for the stair feature wall",
    width: 1080, height: 1440, role: "input", project: "feature-walls",
  },
  {
    src: "/media/cad/stair-wall-detail.webp",
    title: "Stair feature wall — joinery construction detail",
    category: "Construction detail",
    alt: "Stair feature wall architectural joinery construction detail drawing",
    width: 2536, height: 3200, role: "output", project: "feature-walls",
  },
];

export const CAD_PROJECTS = [
  {
    id: "master-bathroom" as const,
    title: "Master Bathroom Package",
    summary:
      "General arrangement plus three wall elevations, produced from a client render and a measured hand sketch.",
  },
  {
    id: "cigar-lounge" as const,
    title: "Cigar Lounge — Ceiling & Flooring",
    summary:
      "A coordinated coffered-ceiling concept with lighting arrangement, and an editable herringbone flooring pattern.",
  },
  {
    id: "feature-walls" as const,
    title: "Custom Feature Walls",
    summary:
      "Feature wall elevations and a stair joinery construction detail, drawn from supplied 3D references.",
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
