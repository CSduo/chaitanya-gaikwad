/**
 * Per-route search metadata.
 *
 * Titles and descriptions are unique per route — no service page inherits
 * another's wording. Keyword clusters record the search intent each page is
 * written against; they are documentation for future edits, not text that gets
 * stuffed into the page.
 */

export type RouteSeo = {
  metaTitle: string;
  metaDescription: string;
  searchIntent: string;
  primaryKeywords: string[];
  secondaryKeywords: string[];
};

export const SERVICE_SEO: Record<string, RouteSeo> = {
  "cad-technical-production": {
    metaTitle: "CAD Drafting Services for Architecture & Interiors | XIYÀTO",
    metaDescription: "Outsourced CAD drafting for architects, interior designers & fit-out contractors. Send marked-up PDFs or site sketches; receive coordinated, editable DWG sets.",
    searchIntent: "Can I hire an outsourced CAD drafting partner to turn our sketches and marked-up PDFs into coordinated, editable AutoCAD DWG drawing sets our team can issue?",
    primaryKeywords: ["CAD drafting services", "outsourced CAD drafting", "interior CAD drafting", "AutoCAD drafting services", "architectural drafting services", "CAD drafting company"],
    secondaryKeywords: ["interior technical drawings", "joinery shop drawings", "reflected ceiling plans", "millwork drafting services", "floor plan drafting", "editable DWG drawings", "PDF to CAD conversion", "fit-out drawing packages"],
  },
  "b2b-lead-generation": {
    metaTitle: "B2B Lead Generation Services | XIYÀTO",
    metaDescription: "Targeted B2B lead files from $20 and marketing support from $50. Buyer research, Excel datasets and outreach planning scoped for your commercial team.",
    searchIntent: "Who can build a verified B2B prospect list with direct decision-maker contact details for our commercial sales team?",
    primaryKeywords: ["B2B lead generation services", "B2B lead generation agency", "outbound lead generation services", "B2B prospecting services", "prospect research services", "lead list building services"],
    secondaryKeywords: ["decision maker research", "ICP research services", "verified B2B leads", "target account research", "sales qualified lead generation", "commercial lead research", "B2B contact research", "account based prospecting"],
  },
  "market-intelligence-research": {
    metaTitle: "Market Intelligence & Commercial Research | XIYÀTO",
    metaDescription: "Commercial market intelligence and B2B market research for new markets, buyers, and opportunities. Competitor analysis, territory mapping & distributor discovery.",
    searchIntent: "Who can research a new commercial market, map competitor landscapes, identify distributors and buyers, and give our leadership actionable commercial intelligence?",
    primaryKeywords: ["market intelligence services", "B2B market intelligence", "market research services", "commercial market research", "market entry research", "competitor research services"],
    secondaryKeywords: ["buyer research services", "distributor identification services", "industry intelligence services", "trade intelligence services", "Middle East market intelligence", "territory research services", "competitor landscape analysis", "wholesale market mapping"],
  },
  "visualisation-image-production": {
    metaTitle: "3D Rendering & Architectural Visualization Services | XIYÀTO",
    metaDescription: "3D renders from $10 per image. Architectural visualization for interiors, furniture and products, with clear scope and formats for your next presentation.",
    searchIntent: "Who can turn my architectural plans, interior layouts, or furniture specifications into photorealistic 3D rendering and CGI for client presentations and marketing?",
    primaryKeywords: ["3D rendering services", "architectural visualization services", "3D visualisation services", "interior rendering services", "photorealistic 3D rendering", "product visualization services"],
    secondaryKeywords: ["furniture rendering services", "property CGI services", "interior design rendering", "luxury interior rendering", "exterior visualization services", "architectural CGI studio", "3D architectural rendering", "commercial interior rendering"],
  },
  "ai-video-production": {
    metaTitle: "AI Video Production Services | XIYÀTO",
    metaDescription: "AI video production from $25 per reel. Cinematic brand films, product motion and social cutdowns, with scope and delivery agreed for your campaign.",
    searchIntent: "Who can produce and edit cinematic commercial AI video for our brand, product launch, showroom, or architectural campaign across social and web formats?",
    primaryKeywords: ["AI video production services", "AI video production agency", "commercial video production", "generative AI video production", "AI product video production", "cinematic video production"],
    secondaryKeywords: ["AI video editing services", "brand film production", "showroom walkthrough video", "AI commercial video production", "social media video production", "short form video production", "AI campaign video production", "product launch video"],
  },
  "website-design-development": {
    metaTitle: "Website Design & Development for Architecture & B2B | XIYÀTO",
    metaDescription: "Website design and development from $250 per project for design practices and B2B brands. Responsive builds, enquiry flows and source code handover.",
    searchIntent: "Who can design and build a bespoke, responsive Next.js portfolio or business website for our architecture studio, interior practice, or B2B brand?",
    primaryKeywords: ["website design and development services", "B2B website design", "custom website development", "website design for architects", "portfolio website design", "responsive website development"],
    secondaryKeywords: ["architecture firm website design", "interior design website development", "technical SEO website development", "Next.js website development", "high converting website development", "website development company", "design studio website", "performance optimized website"],
  },

  // Backward compatibility mappings for legacy routes and components
  "growth-marketing-b2b": {
    metaTitle: "B2B Lead Generation Services | XIYÀTO",
    metaDescription: "Targeted B2B lead files from $20 and marketing support from $50. Buyer research, Excel datasets and outreach planning scoped for your commercial team.",
    searchIntent: "Who can build a verified B2B prospect list with direct decision-maker contact details for our commercial sales team?",
    primaryKeywords: ["B2B lead generation services", "B2B lead generation agency", "outbound lead generation services"],
    secondaryKeywords: ["decision maker research", "ICP research services", "verified B2B leads"],
  },
  "video-ai-film-editing": {
    metaTitle: "AI Video Production Services | XIYÀTO",
    metaDescription: "AI video production from $25 per reel. Cinematic brand films, product motion and social cutdowns, with scope and delivery agreed for your campaign.",
    searchIntent: "Who can produce and edit cinematic commercial AI video for our brand, product launch, showroom, or architectural campaign across social and web formats?",
    primaryKeywords: ["AI video production services", "AI video production agency", "commercial video production"],
    secondaryKeywords: ["AI video editing services", "brand film production", "showroom walkthrough video"],
  },
  "automation-workflow-systems": {
    metaTitle: "Automation & Workflow Systems from $50 | XIYÀTO",
    metaDescription: "Automation campaigns from $50. Connect forms, spreadsheets, CRM and reporting with custom workflow systems, review points and a documented handover.",
    searchIntent: "Who can map how my business actually runs and automate the repetitive parts of it, from lead management and outreach to reporting?",
    primaryKeywords: ["workflow automation services", "custom workflow systems", "business process automation"],
    secondaryKeywords: ["lead management workflow", "automated follow-up systems", "CRM-ready prospect data"],
  },
};

export const ROUTE_SEO = {
  home: {
    // Leads with the core discipline; supporting services stay in the description's tail.
    metaTitle: "3D Visualisation & Film for Interiors and Products | XIYÀTO",
    metaDescription: "Founder-led 3D visualisation and film studio for interior designers, architects, developers and furniture brands, with CAD, web and research support.",
  },
  work: {
    metaTitle: "3D Visualisation, Film & CAD Portfolio",
    metaDescription: "XIYÀTO portfolio: 3D interior and furniture visualisation, product films, CAD drawing packages and website builds, with case studies and selected work.",
  },
  services: {
    metaTitle: "Commercial Production & Growth Services — XIYÀTO",
    metaDescription: "3D renders, AI video, websites, CAD drafting, marketing and B2B lead generation, and automation. Clear starting prices and a defined scope for every brief.",
  },
  company: {
    metaTitle: "One Partner Across Six Disciplines — XIYÀTO",
    metaDescription: "One partner for 3D renders, AI video, websites, CAD drafting, marketing and B2B research, and automation. Founder-led, operating across the UK and India.",
  },
  people: {
    metaTitle: "Founder, Chaitanya Gaikwad — XIYÀTO",
    metaDescription: "Chaitanya Gaikwad founded XIYÀTO and leads production across all six commercial disciplines. Scoping, quality checks and client contact sit with him directly.",
  },
  careers: {
    metaTitle: "Careers & Talent Network — XIYÀTO",
    metaDescription: "XIYÀTO engages independent specialists across drafting, research, visualisation, film, and web work. Open talent network applications reviewed weekly.",
  },
  contact: {
    metaTitle: "Contact XIYÀTO — Commission Production or Growth",
    metaDescription: "Send a brief and whatever material exists. XIYÀTO will confirm what is workable, what is still needed, and propose a defined commercial scope.",
  },
} as const;
