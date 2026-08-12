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
    metaTitle: "CAD Drafting & Technical Production Services — XIYÀTO",
    metaDescription: "Outsourced CAD drafting for interior and fit-out teams. Send marked-up PDFs, site dimensions or a sketch; receive a coordinated, editable DWG set you can issue.",
    searchIntent: "Can I outsource our interior drawing packages to someone who will return editable AutoCAD files our own team can revise and issue?",
    primaryKeywords: ["CAD drafting services","outsourced CAD drafting","interior CAD drafting","AutoCAD drafting services","architectural drafting support","CAD outsourcing UK"],
    secondaryKeywords: ["interior technical drawings","RCP drafting services","floor plan drafting","reflected ceiling plan drawings","joinery detail drawings","editable DWG drawing packages","fit-out drawing packages","CAD drafting for interior designers"],
  },
  "growth-marketing-b2b": {
    metaTitle: "B2B Lead Generation & Market Research — XIYÀTO",
    metaDescription: "Research-led B2B lead generation and market research: target companies identified and scored, contact routes mapped, outreach structured for your team.",
    searchIntent: "Who can research a new market for me, identify the companies actually worth approaching, work out how to reach the right people, and hand it over in a form my commercial team can work from?",
    primaryKeywords: ["B2B lead generation","B2B research services","market research support","prospect research","lead list building","B2B outreach support"],
    secondaryKeywords: ["business development research","contact verification","market entry research","decision-maker mapping","competitor and supplier research","trade fair and exhibition research","B2B lead qualification","CRM-ready prospect data"],
  },
  "video-ai-film-editing": {
    metaTitle: "Video Production, Film & Editing — XIYÀTO",
    metaDescription: "Short-form cinematic film for furniture, interior and property brands: product films, showroom reels and interior walkthroughs, cut for every placement.",
    searchIntent: "Who can produce and edit a cinematic short-form film for my product, showroom or interior project and deliver it in the reel, feed and website formats I actually need?",
    primaryKeywords: ["cinematic video production","video editing services","short-form video production","product video production","interior design reels","cinematic brand videos"],
    secondaryKeywords: ["cinematic brand videos","architectural video content","showroom walkthrough video","furniture product film production","hospitality venue video production","real estate development video","video content for interior designers"],
  },
  "visualisation-image-production": {
    metaTitle: "Interior & Product 3D Visualisation Services — XIYÀTO",
    metaDescription: "3D visualisation for interiors, architecture, furniture and products. Produced from your plans, materials and references, and specified for each placement.",
    searchIntent: "Who can turn my plans, materials and product references into interior, architectural and product images good enough to put in front of a client?",
    primaryKeywords: ["3D visualisation services","interior visualisation","architectural visualisation","interior rendering services","product visualisation","furniture visualisation"],
    secondaryKeywords: ["3D interior rendering","showroom and retail visualisation","material and finish studies","furniture and product imagery","hospitality interior visualisation","dimensioned 3D layout studies","concept imagery for client presentations","campaign and hero image production"],
  },
  "automation-workflow-systems": {
    metaTitle: "Business Workflow Automation Systems — XIYÀTO",
    metaDescription: "Workflow design and business process automation built inside your existing tools: enquiry routing, lead management, outreach, reporting and internal tooling.",
    searchIntent: "Who can map how my business actually runs and automate the repetitive parts of it, from lead management and outreach to reporting, inside the tools we already use?",
    primaryKeywords: ["business workflow automation","business process automation","AI workflow automation","custom workflow systems","outreach automation","lead generation automation"],
    secondaryKeywords: ["lead management workflow","automated follow-up systems","research workflow automation","content workflow automation","data organisation and consolidation","automated reporting systems","lightweight internal tools","enquiry management automation"],
  },
  "website-design-development": {
    metaTitle: "Website Design & Development Services — XIYÀTO",
    metaDescription: "Website design and development for businesses, portfolios and brands: responsive build, content architecture, integrations, deployment and code handover.",
    searchIntent: "Who can design and build a proper responsive website for my business or portfolio, launch it properly, and hand over something I actually own?",
    primaryKeywords: ["website design and development","business website development","portfolio website design","responsive website design","brand website development","website development services"],
    secondaryKeywords: ["design studio website","front-end website development","mobile-optimised website design","website content architecture","website redesign and migration","portfolio website for interior designers","website deployment and handover","website development for manufacturers"],
  },
};

export const ROUTE_SEO = {
  home: {
    metaTitle: "XIYÀTO — Technical, Creative & Growth Services | UK & India",
    metaDescription: "CAD and technical production, B2B growth, 3D visualisation, film, automation and websites for design practices, brands and manufacturers. UK and India.",
  },
  work: {
    metaTitle: "Work — XIYÀTO",
    metaDescription: "Interior drawing packages, B2B research workbooks, visualisation, short-form film and website builds, published with the inputs and method alongside each output.",
  },
  services: {
    metaTitle: "Services — XIYÀTO",
    metaDescription: "Six service areas under one partner: technical drafting, B2B research, visualisation, film, workflow automation and web development. Commission one or several.",
  },
  company: {
    metaTitle: "One Partner Across Six Disciplines — XIYÀTO",
    metaDescription: "One partner for CAD and technical production, B2B growth, visualisation, film, automation and websites. Founder-led, working across the UK and India.",
  },
  people: {
    metaTitle: "Founder, Chaitanya Gaikwad — XIYÀTO",
    metaDescription: "Chaitanya Gaikwad founded XIYÀTO and leads production across all six disciplines. Scoping, quality checks and client contact sit with him on every engagement.",
  },
  careers: {
    metaTitle: "Careers — XIYÀTO",
    metaDescription: "XIYÀTO engages independent specialists across drafting, research, visualisation, film, automation and web work. No open vacancies; the network stays open.",
  },
  contact: {
    metaTitle: "Contact — XIYÀTO",
    metaDescription: "Send a brief and whatever material exists. XIYÀTO will confirm what is workable, what is still needed, and propose a scope. UK and India.",
  },
} as const;
