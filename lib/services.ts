/**
 * Service definitions — six primary service areas.
 *
 * Restored and expanded from the nine services the previous site described.
 * Content is grounded in the legacy copy and the real project evidence in this
 * repository. No client, metric or outcome is invented; where a service has no
 * published case-study evidence, its `boundary` says so plainly.
 */

export type ServiceSlug =
  | "cad-technical-production"
  | "b2b-lead-generation"
  | "market-intelligence-research"
  | "visualisation-image-production"
  | "ai-video-production"
  | "website-design-development"
  | "growth-marketing-b2b"
  | "video-ai-film-editing"
  | "automation-workflow-systems";

export type CapabilityGroup = {
  title: string;
  intro?: string;
  items: string[];
};

export type Service = {
  slug: ServiceSlug;
  name: string;
  shortName: string;
  /** Secondary brand register. Never used as the service name. */
  motif: string;
  /** One sentence, used on cards and in navigation contexts. */
  summary: string;
  /** Two to three sentences for the services index. */
  overview: string;
  /** Opening paragraphs on the service page. */
  intro: string[];
  groups: CapabilityGroup[];
  process: { step: string; title: string; body: string }[];
  deliverables: string[];
  /** Scope-of-responsibility statement, where one is genuinely needed. */
  boundary?: string;
  order: number;
};

export const SERVICES: Service[] = [
  {
    slug: "cad-technical-production",
    name: "CAD Drafting & Technical Production",
    shortName: "CAD Drafting",
    motif: "Deliver",
    summary: "Outsourced CAD drafting for interior and fit-out teams: plans, elevations, RCPs, joinery details and flooring setting-out, issued as editable DWG.",
    overview: "External CAD drafting and documentation capacity for interior, fit-out and architectural practices, working from your layouts, sketches, marked-up PDFs and 3D renders to coordinated DWG, DXF and PDF sets.",
    intro: [
      "XIYÀTO works as external drafting capacity for interior, fit-out and design practices carrying more drawing work than the studio can absorb. You supply the design direction: approved layouts, marked-up PDFs, measured site dimensions, renders or a dimensioned hand sketch. We return the coordinated package your team reviews and issues, covering general arrangement plans, wall elevations, reflected ceiling plans, flooring setting-out and joinery detail.",
      "This is drafting and documentation, not design authorship. Your practice keeps design ownership and technical authority. We take on the production load and return native DWG and DXF built to your layer convention and title block, so the set can be revised and issued from your office. Every package is dimension-checked and reopened before issue, and any dimension taken from a render rather than confirmed on site is flagged as provisional.",
    ],
    groups: [
      {
        title: "Inputs we work from",
        intro: "A package can begin from partial information. What matters is that the design intent is settled and the fixed dimensions are identifiable.",
        items: [
          "Marked-up PDFs and previously issued drawings",
          "Measured site dimensions and survey notes",
          "Dimensioned hand sketches with annotated constraints",
          "Approved layouts and space plans",
          "3D renders and visual references",
          "Material and finish direction",
          "Written revision instructions across a set",
        ],
      },
      {
        title: "Drawing production",
        intro: "Drawing types produced across residential, hospitality and commercial interior work.",
        items: [
          "General arrangement and layout plans",
          "Interior wall elevations, taken wall by wall",
          "Reflected ceiling plans with lighting arrangement",
          "Flooring setting-out, including patterned layouts such as herringbone",
          "Feature wall elevations and panelling detail",
          "Joinery and construction details",
          "Sanitary, fixture, door and window coordination",
          "Complete multi-sheet packages covering several spaces at once",
        ],
      },
      {
        title: "File standards and coordination",
        intro: "The package is built to be opened and continued by your team, not delivered as a closed output.",
        items: [
          "Layer structure and naming set to your office convention",
          "Consistent annotation, dimensioning and text styles",
          "Title block and sheet setup to your template",
          "Drawing list and sheet numbering issued with the set",
          "Scale and setting-out held consistent across sheets",
          "Native DWG and DXF that reopens in your own environment",
          "Revision rounds produced against written comments",
        ],
      },
      {
        title: "Checks before issue",
        intro: "Every package is checked before it leaves the studio, and anything estimated is recorded as such.",
        items: [
          "Dimensional agreement between plan and elevation",
          "Room geometry, orientation and alignment",
          "Door, window and fixture relationships across the set",
          "Layer structure, naming and organisation",
          "Native editable geometry — no traced raster or proxy content",
          "Reopen check performed on the delivered DWG",
          "Provisional dimensions flagged for your review",
        ],
      },
    ],
    process: [
      { step: "01", title: "Brief and inputs", body: "You send whatever material exists. We review it and separate what is confirmed, what is assumed from visual reference and what is still missing, before any drafting starts." },
      { step: "02", title: "Scope confirmation", body: "Fixed dimensions, design rules, the drawing list, layer convention and output formats are agreed in writing, so the finished package is measured against a defined scope rather than an impression." },
      { step: "03", title: "Drafting and coordination", body: "Drawings are produced as native geometry with structured layers and consistent annotation, then cross-checked so plan, elevation and ceiling agree with one another." },
      { step: "04", title: "QA and handover", body: "The set is dimension-checked, reopened from the delivered files and issued as editable DWG and DXF alongside presentation-ready PDFs, with revision notes attached." },
    ],
    deliverables: [
      "Editable DWG drawing files with structured layers",
      "DXF exchange files",
      "Presentation-ready PDF sheet set",
      "Raster previews for quick review and sign-off",
      "Drawing list, revision notes and a record of any provisional dimensions",
    ],
    boundary: "XIYÀTO provides drafting, documentation and production capacity working from design direction supplied by the client. We do not provide architectural or engineering certification, statutory or planning approval, building-code compliance sign-off, or architect-of-record responsibility, and we do not act as the designer of record. Drawings are issued for the practice's own review; any dimension derived from visual reference rather than confirmed measurement is flagged as provisional and should be verified, along with the wider set, by the project's qualified designer or technical consultant before construction.",
    order: 1,
  },

  {
    slug: "b2b-lead-generation",
    name: "B2B Lead Generation Services",
    shortName: "B2B Lead Generation",
    motif: "Pipeline",
    summary: "Targeted B2B lead generation: bespoke prospect research, hand-verified decision-maker data, ICP qualification and outreach-ready pipelines.",
    overview: "Proprietary B2B lead generation and sales prospecting for companies expanding into new markets or rebuilding pipeline. Every target account is researched, qualified, and verified by hand with direct decision-maker contact routes.",
    intro: [
      "XIYÀTO builds targeted B2B lead generation programmes for architecture practices, interior fit-out contractors, furniture manufacturers, luxury exporters and B2B service companies. We identify high-probability target accounts, research verified decision-makers across C-suite and procurement, and build structured prospect databases your commercial team can immediately work.",
      "This is bespoke, human-verified research rather than scraped database exports or automated bulk blasts. Every company is qualified against your Ideal Customer Profile (ICP) using active project evidence, physical premises validation, and corporate registry records. We map direct executive phone numbers, verified corporate emails, and WhatsApp business coordinates, complete with tailored opening angles mapped per prospect.",
    ],
    groups: [
      {
        title: "Target account & ICP discovery",
        intro: "Building a defensible target account universe before any outreach begins.",
        items: [
          "Ideal Customer Profile (ICP) definition and criteria scoring",
          "Target account identification across defined geographies and sectors",
          "Active project, showroom or tender activity used as qualifying evidence",
          "Segmentation by territory, company revenue, sector and project scale",
          "Exclusion of non-commercial entities, shell companies and defunct businesses",
          "Auditable removal logging retaining reason for exclusion",
        ],
      },
      {
        title: "Decision-maker research & verification",
        intro: "Identifying the real signing authorities rather than generic switchboard addresses.",
        items: [
          "Managing Directors, Partners, and Commercial Directors identified by name",
          "Procurement and specification heads mapped for contractors and developers",
          "Direct corporate telephone verification with regional offices",
          "Deliverability-tested executive email addresses with SMTP validation",
          "Verified executive WhatsApp business coordinates where accessible",
          "Regular contact hygiene checks removing departed personnel",
        ],
      },
      {
        title: "Outreach structuring & sequencing",
        intro: "Creating structured messaging frameworks that respect commercial context.",
        items: [
          "Multi-channel outreach sequences for corporate email and WhatsApp",
          "Individualized opening angles referencing real prospect activity",
          "Follow-up cadences, reminder intervals and re-approach timing",
          "Cross-border communication phrasing tailored to local business culture",
          "CRM-ready field mapping for HubSpot, Salesforce and Pipedrive",
          "Response logging and status tracking held in the master workbook",
        ],
      },
      {
        title: "Data governance & handover",
        intro: "How the intelligence is assembled so it survives handover to your sales team.",
        items: [
          "Multi-sheet Microsoft Excel (.XLSX) master workbooks and CSV files",
          "Documented field schema agreed before research begins",
          "Source log recording public evidence URLs for every claim",
          "Full compliance with UK PECR and international B2B privacy standards",
          "Suppression list integration and opt-out mechanisms",
          "Periodic database refreshes and top-up rounds on request",
        ],
      },
    ],
    process: [
      { step: "01", title: "Profile & criteria", body: "We agree your target sector, geography, decision-maker roles, company size, and qualifying thresholds in writing before research begins." },
      { step: "02", title: "Account research", body: "Analysts examine commercial registries, project permits, and public records, building verified corporate dossiers with source evidence." },
      { step: "03", title: "Contact verification", body: "Decision-makers are identified, and emails and phone numbers are verified through direct validation to eliminate dead data." },
      { step: "04", title: "Handover & activation", body: "You receive the master intelligence workbook structured with contact routes, outreach angles, and CRM-ready import formatting." },
    ],
    deliverables: [
      "Structured multi-sheet Excel (.XLSX) workbook and clean CSV files",
      "Scored and ranked target account list segmented by priority",
      "Verified C-suite, Procurement, and Project Director contact profiles",
      "Direct telephone, corporate email, and WhatsApp coordinates",
      "Source verification log and auditable record of excluded entities",
      "CRM import templates formatted for immediate sales activation",
    ],
    boundary: "XIYÀTO provides research, data enrichment, and structured outreach workflows. We do not provide cold telemarketing, consumer lead generation, or guaranteed sales conversion figures — outcomes depend on your commercial offer, pricing, and follow-through. All data is gathered from public and verifiable business sources in compliance with B2B regulations; contact details are redacted in published portfolio samples.",
    order: 2,
  },

  {
    slug: "market-intelligence-research",
    name: "Market Intelligence & Commercial Research",
    shortName: "Market Intelligence",
    motif: "Intelligence",
    summary: "Commercial market intelligence: competitive landscape mapping, distributor and buyer research, trade route discovery and territory analysis.",
    overview: "In-depth market intelligence and commercial research for businesses entering new geographic territories, evaluating competitors, or mapping distribution networks across the UK, GCC, India and Asia.",
    intro: [
      "Entering a new market or launching a high-ticket commercial offering requires clear market visibility before committing capital. XIYÀTO delivers commercial market intelligence and strategic industry research for design brands, manufacturers, exporters and developers across the UK, Middle East, India and international trade corridors.",
      "Our studies map market structure, competitor positioning, distributor networks, wholesale hubs, and commercial procurement practices. From wholesale interior market mapping across Tier 1–3 cities in China to automotive showroom networks in the GCC and exhibition calendars in India, every study is grounded in verifiable evidence, source URLs, and actionable commercial data.",
    ],
    groups: [
      {
        title: "Territory & sector mapping",
        intro: "Understanding the commercial geography and demand landscape before entry.",
        items: [
          "Geographic and city-level commercial segmentation (UK, GCC, India, China)",
          "Wholesale trade market, showroom cluster, and distribution hub mapping",
          "Trade fair, exhibition, and industry event calendars with attendee profiles",
          "Import/export trade route analysis and tariff/regulatory context",
          "Local market pricing dynamics and procurement conventions",
          "Macro-economic indicators and construction pipeline tracking",
        ],
      },
      {
        title: "Competitor & distributor research",
        intro: "Analyzing existing market players and identifying potential commercial partners.",
        items: [
          "Direct and indirect competitor landscape benchmarking",
          "Importer, wholesaler, and exclusive distributor identification",
          "Channel partner evaluation against capacity and coverage",
          "Supplier, manufacturer, and fabrication partner discovery",
          "Brand positioning, product tiering, and catalogue comparisons",
          "Market gap and unserved niche identification",
        ],
      },
      {
        title: "Buyer & procurement dynamics",
        intro: "Mapping how purchasing decisions are actually made in the target sector.",
        items: [
          "Procurement structure mapping: who specifies, who approves, who procures",
          "Turnkey contractor, fit-out specialist, and developer relationships",
          "Hospitality and commercial real estate development project tracking",
          "Corporate holding group and local sponsorship relationship mapping",
          "Tender pre-qualification criteria and vendor registration requirements",
          "Commercial buyer shortlists with verified corporate credentials",
        ],
      },
      {
        title: "Intelligence delivery & briefings",
        intro: "How research findings are structured for strategic decision-making.",
        items: [
          "Executive market summary reports with actionable strategic takeaways",
          "Interactive data workbooks with multi-tab categorization",
          "Source log recording public URLs and verification timestamps",
          "Structured company profiles with operational notes and project evidence",
          "Briefing sessions with founders and leadership teams",
          "Custom follow-up research sprints addressing specific target accounts",
        ],
      },
    ],
    process: [
      { step: "01", title: "Research brief", body: "We define the exact questions your business needs answered: target territory, competitor scope, distribution channels, and buyer profiles." },
      { step: "02", title: "Investigation", body: "Analysts gather data across trade registries, industry directories, local intelligence sources, and active market projects." },
      { step: "03", title: "Synthesis & audit", body: "Findings are cross-referenced, deduplicated, and verified. Source provenance is logged for every claim and data point." },
      { step: "04", title: "Report & dataset", body: "You receive the master intelligence dossier, executive briefing notes, and structured workbooks ready for strategic deployment." },
    ],
    deliverables: [
      "Comprehensive market intelligence report with executive summary",
      "Interactive multi-sheet Excel (.XLSX) database of mapped markets/entities",
      "Competitor and distributor comparison matrices",
      "Source verification log detailing evidence URLs and dates",
      "Actionable market entry recommendations and partner shortlists",
      "Executive briefing call to walk your team through the findings",
    ],
    boundary: "Market intelligence reflects verified public records, commercial filings, and industry research at the time of publication. We provide strategic commercial insight and actionable evidence, not legal advice, tax structuring, or guaranteed investment returns. All sensitive client strategies and proprietary research are protected under strict non-disclosure agreements.",
    order: 3,
  },

  {
    slug: "visualisation-image-production",
    name: "3D Rendering & Architectural Visualization",
    shortName: "3D Rendering & Visualisation",
    motif: "Visualise",
    summary: "Photorealistic 3D rendering and architectural visualization for interiors, developments, furniture and luxury products, tailored for presentations and campaigns.",
    overview: "Still 3D rendering and architectural visualization (visualisation) for design practices, developers, furniture makers and luxury brands, turning CAD plans and material references into client-ready imagery.",
    intro: [
      "Most spatial design and bespoke products have to be sold before they are built. XIYÀTO produces photorealistic 3D architectural rendering and spatial visualization for interior studios, architectural practices, real estate developers, furniture manufacturers and luxury brands. We translate 2D CAD drawings, material swatches, lighting direction and sketches into images built for presentations, planning submissions, and marketing campaigns.",
      "Our CGI work covers residential and commercial interior rendering, architectural exterior visualization, bespoke furniture lifestyle sets, and e-commerce hero visuals. Every image is composed to its specific placement—whether a pitch deck, client presentation board, luxury print brochure, or digital campaign. Directions are put forward as options for your selection, not as a single fixed image.",
    ],
    groups: [
      {
        title: "Inputs we work from",
        intro: "Imagery can be produced from partial information, provided the fixed geometry and the design intent are established.",
        items: [
          "Floor plans, layouts and marked-up drawings",
          "Measured dimensions and site photographs",
          "Material, finish and colour references",
          "Existing product photography and specification sheets",
          "Mood boards and reference imagery",
          "Brand guidelines, palettes and typefaces",
          "Written direction on mood, audience and intended placement",
        ],
      },
      {
        title: "Interior and spatial rendering",
        intro: "High-end interior visualization for client sign-off and marketing.",
        items: [
          "Residential room visualization from plans and layouts",
          "Hospitality interiors — bar, restaurant and lounge settings",
          "Retail and showroom floor visualization",
          "Dimensioned 3D layout studies produced from marked-up plans",
          "Lighting and atmosphere studies, daylight and evening",
          "Material, finish and colour-scheme variants of a single view",
          "Concept options prepared for client selection",
          "Comparison views showing an existing space against a proposal",
        ],
      },
      {
        title: "Product and furniture CGI",
        intro: "Lifestyle environments and studio catalogue imagery.",
        items: [
          "Furniture and lighting pieces shown in a styled context",
          "Product imagery on plain and set backgrounds",
          "Fabric, finish and colourway variants across a range",
          "Wall art, décor and accessory placement in room settings",
          "Range and catalogue sets held to one consistent treatment",
          "Detail and scale views for specification sheets",
          "Packaging and product mockups",
        ],
      },
      {
        title: "Brand and commercial visuals",
        intro: "Visual assets engineered for commercial campaigns and digital touchpoints.",
        items: [
          "Website hero and section header images",
          "Campaign and product-launch key visuals",
          "Still frames sized for social and channel formats",
          "Presentation, pitch-deck and tender imagery",
          "Brochure, catalogue and print-ready visuals",
          "Mockups of collateral, signage and point-of-sale",
          "Listing and directory imagery for marketplaces",
        ],
      },
      {
        title: "Direction, consistency and finishing",
        intro: "Rigorous quality control ensuring physical believability.",
        items: [
          "Visual direction and reference boards agreed before production",
          "Composition, framing and camera-height decisions",
          "Lighting scheme and mood definition",
          "Colour and material alignment to existing brand assets",
          "Consistency rules applied across a set or a full range",
          "Retouching, clean-up and background replacement",
          "Format, ratio and resolution planning for each placement",
        ],
      },
    ],
    process: [
      { step: "01", title: "Brief and placement", body: "You send plans, references and product material, and we establish where each image will be used. Placement sets the ratio, resolution and level of detail before anything is produced." },
      { step: "02", title: "Direction", body: "Composition, lighting, material treatment and mood are agreed against reference. Where a set is involved, the rules that hold it consistent are fixed at this stage." },
      { step: "03", title: "Production and review", body: "Selected directions are produced and put forward as options rather than a single take. Revisions are worked against your written comments on the chosen route." },
      { step: "04", title: "Delivery", body: "Final images are exported to the formats, ratios and resolutions each placement requires, with working files retained so the set can be extended later." },
    ],
    deliverables: [
      "High-resolution still images in the agreed ratios",
      "Placement-specific export variants for web, print, presentation and social",
      "Material, finish and colourway variants of selected views",
      "Dimensioned 3D layout studies where a plan is supplied",
      "Print-ready files at specified resolution and colour profile",
      "Working files and source assets on request",
    ],
    boundary: "Visualisation is representational. Images are an interpretation of supplied design direction, not a specification, a technical drawing or an approval document. Colours, finishes and materials shown on screen are indicative and should be confirmed against physical samples and supplier data before ordering or construction. Where AI-assisted generation is used, it is a production method applied under direction; we will state plainly which images are generated rather than photographed.",
    order: 4,
  },

  {
    slug: "ai-video-production",
    name: "AI Video Production Services",
    shortName: "AI Video Production",
    motif: "Film",
    summary: "Cinematic AI video production for brands, products, showrooms and campaigns, cut and mastered for every social and web placement.",
    overview: "Commercial AI video production and cinematic editing for brands, luxury products, interiors, real estate and campaigns. We combine generative AI sequences with professional editing, grading, sound design and multi-format delivery.",
    intro: [
      "Film brings products, spaces, and brand narratives to life across digital channels. XIYÀTO delivers AI video production services for commercial brands, luxury furniture makers, interior studios, real estate developers, and consumer products. We produce cinematic short-form films, product launch teasers, showroom walkthroughs, and campaign visuals that capture attention and drive commercial action.",
      "We integrate advanced generative AI video production with professional post-production: pacing, sequence storyboarding, cinematic colour grading, typography, and bespoke sound design. Each cut is mastered to its native placement—vertical 9:16 for Instagram Reels and TikTok, 4:5 for feed advertising, and 16:9 4K for websites and showroom screens.",
    ],
    groups: [
      {
        title: "Commercial video formats",
        intro: "Formats engineered for digital marketing, brand prestige, and commercial conversions.",
        items: [
          "Product and campaign films built around a flagship piece",
          "Factory-to-showroom production stories tracking craftsmanship",
          "Showroom and point-of-view spatial walkthroughs",
          "Interior and architectural cinematic sequences",
          "Hospitality venue and luxury ambience edits",
          "Commercial films for property and real estate development",
          "Before-and-after interior transformations",
          "Material, finish and detail macro close-up studies",
        ],
      },
      {
        title: "Concept direction & storyboarding",
        intro: "Agreed before anything is generated or edited, ensuring strategic message alignment.",
        items: [
          "Concept direction developed from product, project or brand material",
          "Shot list and sequence pacing planning",
          "Beat structure and storyboarding for short-form video",
          "Alignment against supplied reference and mood material",
          "On-screen copy, caption and voiceover scripting",
          "Duration and pacing target set per distribution placement",
        ],
      },
      {
        title: "Generative AI & motion craft",
        intro: "Filmed footage, generative AI, or motion built from high-resolution stills.",
        items: [
          "Generative AI sequence synthesis from concept prompts and image assets",
          "Image-to-video motion applied to product photography and 3D renders",
          "Direction and assembly from client-supplied footage, stills and 3D models",
          "Visual continuity of materials, lighting and aesthetics across all shots",
          "Reconstruction of angles and scenes that cannot practically be filmed",
          "Seamless integration with 3D architectural and product visualisation",
        ],
      },
      {
        title: "Editing, colour & sound design",
        intro: "The post-production craft that creates emotional resonance and polish.",
        items: [
          "Rhythmic editing and shot arrangement to target time bounds (15s, 30s, 60s)",
          "Cinematic colour grading and finish consistency across scenes",
          "Bespoke music curation, sound design and audio mix",
          "Typography, subtitle styling and lower-third treatments",
          "Brand logo, tagline and animated end-card placement",
          "Revision rounds worked against timestamped client feedback",
        ],
      },
      {
        title: "Multi-channel delivery formats",
        intro: "One core production mastered for every digital and broadcast environment.",
        items: [
          "Vertical 9:16 masters for Instagram Reels, TikTok and YouTube Shorts",
          "Portrait 4:5 for feed placement on LinkedIn, Instagram and Meta Ads",
          "Landscape 16:9 4K for website heroes, showroom displays and presentations",
          "Short cut-downs and teaser edits from the master film",
          "Captioned and silent-autoplay editions with styled subtitles",
          "High-impact poster frames and custom thumbnail images per cut",
          "Web-compressed exports optimized for fast page load performance",
        ],
      },
    ],
    process: [
      { step: "01", title: "Brief and assets", body: "You supply product imagery, 3D renders, brand guidelines, and campaign objectives. We define the narrative hook, target duration, and delivery ratios." },
      { step: "02", title: "Storyboard & plan", body: "We map the sequence shot-by-shot, locking the script, visual references, and AI generation parameters before production commences." },
      { step: "03", title: "Generation & cut", body: "Shots are synthesized, assembled, and graded with audio mix, pacing, and on-screen copy. A first master cut is issued for review." },
      { step: "04", title: "Polish & delivery", body: "Revisions are implemented, and the final production is rendered into all required aspect ratios with web and broadcast compression." },
    ],
    deliverables: [
      "Master cinematic film in agreed primary ratio (4K / 1080p)",
      "Vertical 9:16, portrait 4:5, and landscape 16:9 cut-downs",
      "Poster frames and high-resolution thumbnail stills",
      "Captioned and silent-autoplay editions with styled subtitles",
      "Web-optimized video exports for embedding without buffering",
      "Archived project files and generated visual assets",
    ],
    boundary: "Where a sequence is generated with AI or animated from still imagery rather than filmed on set, it is representational — it should not be presented as a documentary record of a built physical space or a certified engineering prototype. We identify the production methods used for each sequence so the asset can be transparently and truthfully labelled in campaign use. Client is responsible for licensing of any client-supplied footage or third-party trademarks.",
    order: 5,
  },

  {
    slug: "website-design-development",
    name: "Website Design & Development Services",
    shortName: "Website Design & Development",
    motif: "Build",
    summary: "High-performance custom Next.js websites for architecture firms, interior studios, B2B companies and export brands: design, build, SEO and code handover.",
    overview: "Custom website design and development for architecture practices, interior designers, B2B service firms and export manufacturers. Statically pre-rendered, search-optimized, responsive, and handed over with full code ownership.",
    intro: [
      "Architecture practices, design studios, manufacturers and export brands require websites that reflect their professional calibre. XIYÀTO designs and builds bespoke, high-performance websites engineered for visual sophistication, fast load speeds, technical search engine visibility, and qualified inbound enquiry generation.",
      "Built with modern Next.js and Tailwind architecture, our sites deliver pre-rendered crawlability, structured JSON-LD schema, responsive layout precision across all device viewports, and secure enquiry handling. You retain 100% ownership of your code repository, hosting, and domains.",
    ],
    groups: [
      {
        title: "Structure and direction",
        intro: "Agreed before anything is designed, so the build is measured against a defined scope.",
        items: [
          "Site map and page-by-page structure",
          "Content planning and placement against each page",
          "Portfolio and project organisation for image-led work",
          "Navigation and information architecture",
          "Visual direction developed from existing brand material",
          "Enquiry route and contact structure",
        ],
      },
      {
        title: "Front-end development",
        intro: "Implementation across breakpoints, with the design system built as reusable components rather than one-off pages.",
        items: [
          "Responsive layout across desktop, tablet and mobile",
          "Component-based implementation and a consistent type scale",
          "Project, gallery and case-study page templates",
          "Image handling, sizing and load behaviour",
          "Accessible navigation, focus order and keyboard routes",
          "Media viewers for drawings, stills and film",
          "Interaction and motion where it serves the content",
        ],
      },
      {
        title: "Platform and integrations",
        intro: "Where a site needs to do more than present, the functional layer is built alongside the front end.",
        items: [
          "Server-side enquiry handling routed to a named inbox",
          "Form validation and spam handling",
          "Database-backed content and structured record sets",
          "Submission, review and publication flows",
          "Content administration for non-technical editors",
          "Third-party service integration for mail, analytics and scheduling",
        ],
      },
      {
        title: "Search, performance and accessibility",
        intro: "Handled during the build rather than as a post-launch corrective exercise.",
        items: [
          "Statically pre-rendered pages so content is crawlable",
          "Per-page titles, descriptions and metadata",
          "Sitemap and structured data output",
          "Image format and payload optimisation",
          "Mobile performance checks on real device widths",
          "Semantic markup, contrast and alternative text",
          "Redirect mapping where an existing site is being replaced",
        ],
      },
      {
        title: "Deployment and handover",
        intro: "Full code and infrastructure sovereignty for your business.",
        items: [
          "Hosting setup and deployment pipeline",
          "Domain and DNS configuration",
          "SSL and environment configuration",
          "Analytics installation and verification",
          "Source code handed over in a repository you control",
          "Handover notes covering editing, redeployment and future changes",
        ],
      },
    ],
    process: [
      { step: "01", title: "Scope and structure", body: "We establish who the site is for, what it has to do, and which pages carry that. The site map, functional requirements and content needed per page are agreed in writing before design begins." },
      { step: "02", title: "Direction and layout", body: "Visual direction and the key page layouts are put forward for review. Typography, grid, colour and the component set are fixed at this stage so the full build is consistent." },
      { step: "03", title: "Build", body: "Front-end development across all breakpoints, with content placed, integrations wired and accessibility and performance checked as part of the work rather than after it. Review builds are shared as pages become available." },
      { step: "04", title: "Launch and handover", body: "The site is deployed to your domain and hosting, redirects are mapped where an existing site is being replaced, and the repository and handover notes are passed to you." },
    ],
    deliverables: [
      "A deployed responsive website on your own domain and hosting",
      "Agreed site map, page structure and content plan",
      "Front-end source code in a repository held in your name",
      "Enquiry handling routed to a named inbox, tested before launch",
      "Page metadata, sitemap and redirect mapping for search",
      "Handover notes covering editing, deployment and future changes",
    ],
    boundary: "Hosting, domain and third-party service accounts are set up in your name, so the business retains ownership and control of the site and its data. Ongoing content updates, campaign work and subscription costs sit outside the build unless agreed separately. We implement accessibility and privacy requirements as specified in the brief, but do not provide legal advice or formal conformance certification.",
    order: 6,
  },
];

export function getService(slug: string): Service | undefined {
  const match = SERVICES.find((s) => s.slug === slug);
  if (match) return match;

  // Backward compatibility: map legacy route slugs to their canonical service
  if (slug === "growth-marketing-b2b" || slug === "automation-workflow-systems") {
    return SERVICES.find((s) => s.slug === "b2b-lead-generation");
  }
  if (slug === "video-ai-film-editing") {
    return SERVICES.find((s) => s.slug === "ai-video-production");
  }
  return undefined;
}

export function serviceName(slug: ServiceSlug): string {
  return getService(slug)?.name ?? slug;
}

/** Anchor id for the matching homepage service chapter. */
export function serviceAnchor(slug: ServiceSlug): string {
  // Map legacy slugs to canonical anchor
  if (slug === "growth-marketing-b2b" || slug === "automation-workflow-systems") {
    return "service-b2b-lead-generation";
  }
  if (slug === "video-ai-film-editing") {
    return "service-ai-video-production";
  }
  return `service-${slug}`;
}
