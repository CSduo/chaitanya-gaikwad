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
  | "growth-marketing-b2b"
  | "visualisation-image-production"
  | "video-ai-film-editing"
  | "automation-workflow-systems"
  | "website-design-development";

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
    name: "CAD & Technical Production",
    shortName: "CAD & Technical Production",
    motif: "Deliver",
    summary: "Editable interior drawing packages produced from your design direction, measurements and references.",
    overview: "External drafting and documentation capacity for interior, fit-out and design-led teams. We work from approved layouts, marked-up PDFs, site dimensions, sketches and renders, and return coordinated drawing sets in DWG, DXF and PDF. The geometry stays native and editable, so your own people can open the files and carry the work on.",
    intro: [
      "XIYÀTO works as external production capacity for interior, fit-out and design practices carrying more drawing work than their studio can absorb. You supply the design direction — approved layouts, marked-up drawings, measured dimensions, reference imagery, renders or a dimensioned hand sketch — and we produce the coordinated, editable package your team reviews and issues.",
      "This is drafting and documentation, not design authorship. Your practice keeps design ownership and technical authority throughout; we take on the production load and hand back files built to be worked on rather than merely looked at. Where a dimension has been derived from a render or a reference rather than confirmed on site, it is flagged as provisional instead of presented as fact.",
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
    slug: "growth-marketing-b2b",
    name: "Growth, Marketing & B2B",
    shortName: "Growth & B2B",
    motif: "Grow",
    summary: "Market research, qualified B2B target data, outreach systems and the marketing material that supports them.",
    overview: "Commercial groundwork for design, product and property businesses opening a new market or rebuilding a pipeline. We research the market, identify and score the companies worth approaching, structure the findings into workbooks your team can actually work, and support the outreach and marketing material that follows. Every claim in the data is traceable to a recorded public source.",
    intro: [
      "Growth, Marketing & B2B is the commercial side of the studio: business research, qualified prospect data, outreach operations and the marketing material that sits alongside them. It is built for interior, fit-out, furniture, property and hospitality businesses that know roughly where the opportunity sits — a region, a sector, a trade route, a trade fair — but do not yet have the evidence, the target list or the working system to act on it.",
      "This is research and systems work rather than campaign management or media buying. A workbook is delivered to be worked, not filed: records are scored, segmented and sourced, the scoring method is documented alongside the data, rejected records are kept in an auditable backup rather than quietly deleted, and the outreach structure is mapped record by record so your commercial team can start without repeating the research.",
    ],
    groups: [
      {
        title: "Business and market research",
        intro: "Establishing what the market actually looks like before any list is built.",
        items: [
          "Market and sector mapping across a defined geography",
          "Competitor, supplier and manufacturer landscape research",
          "Export and import trade-route research",
          "City-level segmentation within a target market",
          "Trade fair, exhibition and industry event mapping",
          "Buying-side structure: who specifies, who procures, who signs off",
          "Public-source evidence gathering with a URL logged against every claim",
        ],
      },
      {
        title: "B2B lead generation and qualification",
        intro: "Turning a market map into a defensible target list.",
        items: [
          "Company identification against an agreed target profile",
          "Decision-maker and department route mapping from public sources",
          "Active project, showroom or tender activity used as qualifying evidence",
          "Priority scoring against criteria agreed in advance",
          "Segmentation by city, sector, size or service fit",
          "Deduplication, record cleaning and auditable removal logging",
          "Reachability and contact-route assessment per record",
          "Verification status recorded against each record",
        ],
      },
      {
        title: "Outreach and follow-up",
        intro: "The structure that makes outreach repeatable and reviewable.",
        items: [
          "Email and WhatsApp outreach sequence structuring",
          "Personalised opening angle mapped per record rather than per list",
          "Channel recommendation and send prioritisation",
          "Follow-up cadence, reminder structure and re-approach timing",
          "CRM-style status tracking held in the workbook itself",
          "Enquiry, sample-request and reply logging through to next step",
          "Cross-border communication support across time zones and language register",
        ],
      },
      {
        title: "Marketing and brand presentation support",
        intro: "The material outreach relies on once a conversation opens.",
        items: [
          "Content planning and publishing calendars",
          "Social channel support against a defined posting rhythm",
          "Company profile, capability statement and line-card copy",
          "Campaign support around a launch, trade fair or new-market push",
          "Segment-specific positioning and messaging",
          "Sales and pitch collateral structuring",
          "Coordination with visualisation, film and website output so outreach has a credible destination",
        ],
      },
      {
        title: "Data structure and handover",
        intro: "How the work is assembled so it survives handover to your team.",
        items: [
          "Multi-sheet workbooks with a defined sheet per process step",
          "Field schema agreed before research begins",
          "Source log and verification trail as standard sheets",
          "Backup sheet retaining every removed or rejected record",
          "Scoring methodology documented in-workbook, not held by us",
          "Top-up and refresh rounds against an existing workbook",
        ],
      },
    ],
    process: [
      { step: "01", title: "Define the market", body: "Target geography, sector, company profile, qualification criteria and the fields to be captured are agreed in writing before research starts. This is the step that decides whether the output is usable." },
      { step: "02", title: "Research and evidence", body: "Public sources are worked systematically. Each record is built with supporting evidence and a source URL, and anything that fails the profile is moved to a backup sheet rather than deleted." },
      { step: "03", title: "Qualify, score and segment", body: "Records are verified, deduplicated and scored against the agreed criteria, then segmented by city, sector or fit so the list can be approached in a sensible order." },
      { step: "04", title: "Structure, hand off and support", body: "The workbook is assembled with scoring methodology, source log, contact routes and outreach angles. Where the engagement continues, outreach and follow-up are run and logged against it." },
    ],
    deliverables: [
      "Structured multi-sheet workbooks with a documented field schema",
      "Scored and ranked target shortlists, segmented for use",
      "Decision-maker route mapping and per-record channel recommendations",
      "Source log, verification status and an auditable backup of removed records",
      "Outreach sequences, follow-up cadence and CRM-style tracking sheets",
      "Content plans and campaign material supporting the outreach",
    ],
    boundary: "XIYÀTO provides research, structured data and outreach operations. We do not guarantee response rates, meetings, enquiries or revenue outcomes — those depend on your offer, your market and your commercial follow-through. Research is compiled from publicly available sources with provenance recorded against each record; contact detail is redacted in any published portfolio material.",
    order: 2,
  },

  {
    slug: "visualisation-image-production",
    name: "3D Visualisation & Image Production",
    shortName: "3D Visualisation",
    motif: "Visualise",
    summary: "Still imagery for interiors, products and brands, produced from your layouts, materials and references.",
    overview: "Still image production for design-led businesses: interior and spatial visualisation, product and furniture imagery, dimensioned layout studies and brand visuals. We work from your plans, measurements, material direction and product references, and specify each image around where it will be used — a client pitch, a showroom screen, a catalogue page or a website header.",
    intro: [
      "Most design work has to be sold before it exists. This service covers the still imagery that carries that job: rooms that have not been built, furniture that is not yet on a shop floor, and finishes a client cannot hold in their hand. XIYÀTO produces this material as external capacity for interior, fit-out, furniture, property and hospitality businesses, working from the drawings, dimensions, product photography and material direction you already hold.",
      "Images are produced through a combination of 3D visualisation, AI-assisted generation and compositing, chosen by what the image has to do rather than by tool preference. Every output is specified against its placement — pitch document, showroom screen, catalogue spread, property listing, website header or social frame — and delivered in the ratios and resolutions that placement requires. Directions are put forward as options for your selection rather than as a single fixed image.",
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
        title: "Interior and spatial visualisation",
        items: [
          "Residential room visualisation from plans and layouts",
          "Hospitality interiors — bar, restaurant and lounge settings",
          "Retail and showroom floor visualisation",
          "Dimensioned 3D layout studies produced from marked-up plans",
          "Lighting and atmosphere studies, daylight and evening",
          "Material, finish and colour-scheme variants of a single view",
          "Concept options prepared for client selection",
          "Comparison views showing an existing space against a proposal",
        ],
      },
      {
        title: "Product and furniture imagery",
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
    order: 3,
  },

  {
    slug: "video-ai-film-editing",
    name: "Video, AI Film & Editing",
    shortName: "Video & Film",
    motif: "Film",
    summary: "Short-form cinematic film for furniture, interiors and hospitality brands — produced, edited and cut to placement.",
    overview: "Short-form film production for design, furniture, property and hospitality businesses. We produce product campaigns, showroom walkthroughs and interior sequences using filmed material, AI-assisted generation and edit-room work, in whatever combination the brief actually needs. Output is specified around the placement it is made for rather than exported to a generic ratio.",
    intro: [
      "Film is how a piece of furniture, a finished interior or an unbuilt development gets seen by people who will never stand in front of it. XIYÀTO produces short-form film for exactly that job: product campaigns built around a single piece, factory-to-showroom production stories, showroom walkthroughs, hospitality ambience edits, before-and-after interior sequences and commercial films for property. The work delivered to date spans furniture brands, interior studios, showroom operators, hospitality venues and a property developer in the Middle East.",
      "AI-assisted generation sits inside that process rather than standing in for it. Some sequences are filmed, some are generated, most are a combination — and the decision is made shot by shot, against what the material needs and what is realistically available to shoot. What holds a piece together is the edit: shot order, pacing, grade and sound. We state which method a project will use before production begins, so you know what you are commissioning and how it can honestly be described in use.",
    ],
    groups: [
      {
        title: "Film we produce",
        intro: "Formats delivered across furniture, interior, showroom, hospitality and property work.",
        items: [
          "Product and campaign films built around a single piece",
          "Factory-to-showroom production stories",
          "Showroom and point-of-view walkthroughs",
          "Interior and spatial sequences",
          "Hospitality venue and ambience edits",
          "Commercial films for property and development",
          "Before-and-after interior sequences",
          "Material, finish and detail close-up studies",
        ],
      },
      {
        title: "Direction and structure",
        intro: "Agreed before anything is shot or generated, so the cut is built to a plan rather than assembled from whatever exists.",
        items: [
          "Concept direction developed from product, project or brand material",
          "Shot list and sequence planning",
          "Beat structure and storyboarding for short-form",
          "Alignment against supplied reference and mood material",
          "On-screen copy, caption and voiceover scripting",
          "Duration and pacing target set per placement",
        ],
      },
      {
        title: "Production methods",
        intro: "Filmed, generated or built from stills — chosen per shot and recorded so each sequence can be labelled correctly.",
        items: [
          "Direction and assembly from supplied footage, stills and renders",
          "AI-assisted sequence generation",
          "Motion built from still visualisation and product photography",
          "Continuity of set, finish and lighting held across shots",
          "Reconstruction of shots that cannot practically be filmed",
          "Coordination with visualisation output produced alongside the film",
        ],
      },
      {
        title: "Edit and post",
        items: [
          "Sequence structuring and shot order",
          "Pacing and cut rhythm to a target duration",
          "Colour grade and finish consistency across the set",
          "Music selection, sound design and audio mix",
          "Text, caption and lower-third treatment",
          "Logo, brand and end-card placement",
          "Speed ramping, transitions and motion treatment",
          "Revision rounds worked against issued comments",
        ],
      },
      {
        title: "Formats and delivery",
        intro: "One production, cut for every place it has to run.",
        items: [
          "Vertical 9:16 masters for reels and stories",
          "Portrait 4:5 for feed placement",
          "Landscape 16:9 for websites and showroom screens",
          "Cut-downs and shorter edits from the same production",
          "Captioned and subtitled versions",
          "Silent-autoplay versions carrying on-screen copy",
          "Poster frames and thumbnail stills per cut",
          "Compression profiles for web embedding",
        ],
      },
    ],
    process: [
      { step: "01", title: "Brief and material", body: "You send product references, project photography, renders, brand assets and any existing footage. We establish where the film will run, how long it should be and what it has to communicate." },
      { step: "02", title: "Direction and shot plan", body: "Concept, sequence structure and shot list are agreed, along with which shots are filmed, generated or built from existing stills. Duration and delivery ratios are fixed at this point." },
      { step: "03", title: "Production and edit", body: "Shots are produced or generated, then assembled — order, pacing, grade, sound and on-screen copy. A first cut is issued for comment." },
      { step: "04", title: "Revision and delivery", body: "Comments are worked through in defined rounds, then final masters are exported to each agreed ratio with poster frames and web-ready compression." },
    ],
    deliverables: [
      "Final film master in the agreed primary ratio",
      "Vertical, portrait and landscape cut-downs from the same production",
      "Poster frames and thumbnail stills for each cut",
      "Captioned and silent-autoplay versions where the placement requires them",
      "Web-compressed exports for site and showroom embedding",
      "Project and source files retained, available on request",
    ],
    boundary: "Where a sequence is generated or reconstructed rather than filmed, it is representational — it should not be presented as a record of a built space or a finished production item. We identify the method used for each sequence so it can be described accurately in campaign use. Clearance for supplied footage, music, brand assets and any third-party material rests with the client; we work from what is provided and flag anything requiring a licence before delivery.",
    order: 4,
  },

  {
    slug: "automation-workflow-systems",
    name: "Automation & Workflow Systems",
    shortName: "Automation & Workflow",
    motif: "Automate",
    summary: "Working systems for the repetitive parts of studio operations — enquiries, outreach, handovers and admin.",
    overview: "Practical automation built inside the tools a team already uses. We map where information is re-typed, chased or lost between steps, then build, document and hand over the systems that remove the manual repetition. The result is a process your own people can run and amend without us.",
    intro: [
      "Design, fit-out, furniture and property teams lose a surprising amount of time to coordination rather than to work: the same enquiry details typed into three places, follow-ups tracked from memory, project folders rebuilt by hand, reports assembled at the end of every month. Automation & Workflow Systems addresses that layer. We look at how the work is actually done now, identify the steps that repeat without judgement being applied, and build systems that carry the information across instead.",
      "This is capability we run on our own operation before we offer it to anyone else — the enquiry routing, research workbooks, outreach tracking and production handovers behind XIYÀTO's other services are built the same way. We hold no client automation engagement released as published case-study material, and we would rather say that plainly than imply otherwise. Systems are built inside the tools you already use, documented in ordinary language, and handed over with the rules written down.",
    ],
    groups: [
      {
        title: "Enquiry and intake",
        intro: "The first hour after an enquiry arrives is where most manual handling happens. It is usually the first thing worth automating.",
        items: [
          "Web and email enquiries routed into a single logged record",
          "Automatic acknowledgement with a stated response time",
          "Qualification questions captured at first contact",
          "Source, date, owner and status recorded per enquiry",
          "Reminder rules for enquiries left unanswered past an agreed threshold",
          "Handover of the enquiry record into your project or sales tracker",
        ],
      },
      {
        title: "Outreach and follow-up",
        intro: "Sequenced, logged and rule-bound — built so a person can see exactly what was sent, to whom and when.",
        items: [
          "Follow-up sequences with stop-on-reply rules",
          "Merge fields drawn from a structured prospect workbook",
          "Reply logging and status updates written back to the record",
          "Suppression and do-not-contact handling",
          "Sending schedules and daily volume limits",
          "Manual-send checklists where automated sending is not appropriate",
          "Reporting views by stage: contacted, replied, dormant, closed",
        ],
      },
      {
        title: "Project and production workflow",
        intro: "The administrative spine around delivery work — folders, revisions, checkpoints and handover.",
        items: [
          "Standard folder and file-naming structures created per project",
          "Drawing, asset and revision logging",
          "Task templates generated when a project stage opens",
          "Approval and sign-off checkpoints with recorded dates",
          "Notifications when a stage is marked complete",
          "Handover packs assembled against a defined checklist",
          "Status views drawn from the underlying records rather than typed by hand",
        ],
      },
      {
        title: "Data, documents and admin",
        intro: "Repetitive document and spreadsheet work, moved off people and onto rules.",
        items: [
          "Consolidation of records held across multiple sheets and sources",
          "Deduplication and record-cleaning rules with a backup of anything removed",
          "Validation rules that prevent broken records at the point of entry",
          "Quotation, proposal and document generation from templates",
          "Recurring report assembly on a fixed schedule",
          "Scheduled exports and backups of working data",
        ],
      },
      {
        title: "AI-assisted steps",
        intro: "Used where it genuinely saves time, and always with a person between the system and the client.",
        items: [
          "First-pass reply drafting held for human review before sending",
          "Summarising long enquiry or project threads into a record note",
          "Classifying and tagging incoming enquiries and leads",
          "Extracting structured fields from unstructured documents",
          "Drafting content outlines and captions from an agreed brief",
          "Review checkpoints placed before anything client-facing leaves the system",
        ],
      },
    ],
    process: [
      { step: "01", title: "Map the current process", body: "We work through how the task is done today — the tools in use, the steps that repeat, and the points where information is re-entered or chased. Nothing is automated before it is understood." },
      { step: "02", title: "Agree the rules", body: "Triggers, decision rules, exception handling and the points where a person must stay in the loop are written down and agreed in advance, so the system's behaviour is defined rather than discovered." },
      { step: "03", title: "Build and test", body: "The system is built inside your existing tools and run against real cases in a test state until the ordinary path and the exceptions both behave correctly." },
      { step: "04", title: "Handover", body: "You receive the working system, written documentation and a walkthrough for the people who will operate it, along with a plain list of what deliberately remains manual." },
    ],
    deliverables: [
      "A working system built inside the tools your team already uses",
      "Written documentation of triggers, rules and exception handling",
      "A process map showing the workflow before and after",
      "Templates, forms and message structures used by the system",
      "A walkthrough for the people who will run it day to day",
      "A stated list of what remains manual, and the reason it does",
    ],
    boundary: "This service is offered as capability. We hold no client automation engagement released as published case-study material, and we do not present the systems described here as delivered project references. Systems are built inside tools you already hold accounts for; we do not take on IT administration, data-security certification, regulatory compliance sign-off or ongoing managed support unless that is separately agreed in writing. Where a step involves judgement, client communication or a commercial decision, we keep a person in the loop by design.",
    order: 5,
  },

  {
    slug: "website-design-development",
    name: "Website Design & Development",
    shortName: "Website Design & Development",
    motif: "Build",
    summary: "Responsive websites for design-led businesses — structure, front-end build, mobile optimisation and deployment.",
    overview: "Complete responsive websites for portfolios, brands and businesses, taken from page structure and visual direction through to front-end development, integrations and deployment. We work as external build capacity for practices that need a proper public presence without adding a permanent development function. Sites are built on your own domain and hosting, with the source code handed over.",
    intro: [
      "Most design and fit-out businesses do not need a large website. They need a considered one: pages that load quickly, project work presented at the quality it was produced, layouts that hold up on a phone, and an enquiry that reaches a named inbox rather than disappearing. We handle that end to end — page structure, visual direction, content placement, front-end development, mobile optimisation and deployment.",
      "Sites are built around the material they have to carry. Interior and product photography, drawing sets and film are heavy, image-led content, so galleries, viewers and image handling are treated as part of the build rather than bolted on afterwards. Where a site has to do more than present — submissions, structured records, content an in-house team can edit without calling a developer — that is built too, and the codebase is left in a state your own developer can pick up.",
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
  return SERVICES.find((s) => s.slug === slug);
}

export function serviceName(slug: ServiceSlug): string {
  return SERVICES.find((s) => s.slug === slug)?.name ?? slug;
}

/** Anchor id for the matching homepage service chapter. */
export function serviceAnchor(slug: ServiceSlug): string {
  return `service-${slug}`;
}
