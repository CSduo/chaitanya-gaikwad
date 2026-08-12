/**
 * Company narrative.
 *
 * The page is substantial because the operating model is, not because of
 * corporate filler. Nothing here asserts headcount, offices, revenue, legal
 * status or trading history — none of which has been established.
 */

export type CompanySection = {
  key: string;
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  points?: { title: string; body: string }[];
};

export const COMPANY_COPY = {
  h1: "One partner for the work that usually takes six specialists.",
  standfirst: "Producing technical documentation, presenting ideas visually, creating marketing content, researching markets, reaching prospects, building workflows and building a digital presence normally means assembling several specialists. XIYÀTO holds those capabilities in one place, so the disciplines connect instead of sitting in silos, and the work moves between them without being rebuilt at every handover.",
} as const;

export const COMPANY_SECTIONS: CompanySection[] = [
  {
    key: "what-xiyato-is",
    eyebrow: "What XIYÀTO is",
    heading: "A multidisciplinary partner, not a single-service supplier.",
    paragraphs: ["XIYÀTO covers six operational disciplines that most businesses otherwise buy from six unrelated suppliers: CAD and technical production; growth, marketing and B2B; 3D visualisation and image production; video, AI film and editing; automation and workflow systems; and website design and development.","The premise is straightforward. A business that designs, makes, specifies or sells something has to build the work, present it, operate around it and grow from it. Those four demands are usually met by suppliers who never speak to one another. We hold them in one place, under one standard of handover.","We are engaged as an operating partner rather than a front-facing agency. Clients keep design authorship, technical authority and their own client relationships. XIYÀTO takes on the production, research, systems and build work, and returns it in a state the client's own team can check, use and continue."],
  },
  {
    key: "what-we-solve",
    eyebrow: "What we solve",
    heading: "Capability that arrives in pieces costs more than it looks.",
    paragraphs: ["The usual arrangement is a drafting freelancer, a visualiser, a video editor, a research contractor, a web developer and whoever inside the business is left holding it together. Each is briefed separately, works to a different standard, and hands back files the next person has to rebuild.","The cost is rarely visible on the invoices. It sits in the coordination: the same background explained repeatedly, the same measurements re-entered, the same brand direction interpreted several different ways, and the gap between a project being finished and being presentable.","XIYÀTO removes those joins. One brief, one standard of handover, one point of accountability, and disciplines that already understand how the others work."],
    points: [{"title":"Repeated briefing","body":"Every supplier needs the same context explained again, and each retelling loses a little of the original intent."},{"title":"Rebuilt inputs","body":"Drawings, dimensions and brand material get re-created at each handover because nobody receives them in a form they can use."},{"title":"Inconsistent standards","body":"Six suppliers produce six house styles, and the difference shows in the material a client eventually sees."},{"title":"No ownership of the whole","body":"When work is split across specialists, nobody is responsible for whether the parts add up."}],
  },
  {
    key: "one-partner-multiple-capabilities",
    eyebrow: "One partner, six capabilities",
    heading: "Six disciplines held to a single standard.",
    paragraphs: ["Each discipline is scoped, priced and delivered on its own terms. A practice that only needs drawing capacity is never asked to take anything else, and nothing is bundled to make a number look larger.","Most engagements draw on more than one. Some use a single discipline for a defined piece of work, which is a perfectly sensible way to start."],
    points: [{"title":"CAD & Technical Production","body":"Editable interior and fit-out drawing packages produced from your design direction, measurements and references, issued as native DWG and DXF your team can open and carry on."},{"title":"Growth, Marketing & B2B","body":"Market research, qualified B2B target data, outreach systems and the marketing material that supports them, with the larger studies carrying a source log."},{"title":"3D Visualisation & Image Production","body":"Still imagery for interiors, products and brands, specified around where each image will actually be used and delivered in the ratios that placement requires."},{"title":"Video, AI Film & Editing","body":"Short-form film for furniture, interiors, hospitality and property, built from filmed material, generated sequences and edit-room work, then cut for every placement it has to run in."},{"title":"Automation & Workflow Systems","body":"Working systems for the repetitive parts of operations: enquiry handling, follow-up, project admin and reporting, documented in plain language and handed over."},{"title":"Website Design & Development","body":"Responsive websites taken from structure and visual direction through front-end build, integrations and deployment, with the source code handed to you."}],
  },
  {
    key: "how-the-disciplines-connect",
    eyebrow: "How the disciplines connect",
    heading: "The advantage is in the handovers, not the headcount.",
    paragraphs: ["A measured layout is the same information whether it becomes a drawing package, a dimensioned 3D study or a showroom film. A material schedule feeds both the specification and the visualisation. A prospect workbook is only as useful as the website and capability material a prospect reaches afterwards.","Because those relationships are internal, they get resolved once. Visualisation is produced against the drawings rather than an approximation of them. Film and stills share the same set, finish and lighting direction. Outreach points to material that exists and reflects the current standard of work. The automation layer carries records between steps instead of somebody re-typing them.","That is the practical case for a multidisciplinary partner. Not a longer menu, but fewer translation losses between parts of a project that were always related."],
    points: [{"title":"Drawings into imagery","body":"Approved layouts and confirmed dimensions become visualisation and film without the geometry being interpreted a second time."},{"title":"Production into presentation","body":"The same project material feeds the website, the pitch document and the campaign, held to one visual direction throughout."},{"title":"Research into reach","body":"Market research, target data and outreach run against a public presence built to receive the enquiries they generate."}],
  },
  {
    key: "how-projects-are-run",
    eyebrow: "How projects are run",
    heading: "Scope agreed in writing before anything is produced.",
    paragraphs: ["Every engagement begins by separating what is confirmed from what is assumed and what is still missing. Deliverables, formats, standards and the drawing list or field schema to be produced are agreed in writing before production starts, so finished work is measured against a defined scope rather than an impression of one.","Work is then produced, checked and issued in a form that can be continued: native geometry rather than traced raster, documented methodology alongside data, and delivery formats chosen for the receiving team. Anything derived from visual reference rather than confirmed measurement is flagged as provisional instead of presented as fact."],
    points: [{"title":"Scope before production","body":"Deliverables, assumptions, output formats and revision rounds are settled in writing first."},{"title":"Production to your conventions","body":"File structure, naming, annotation, templates and visual direction follow the standards your own team already uses."},{"title":"Checks before issue","body":"Nothing is released without a review against the agreed scope, including a reopen check on the delivered files."},{"title":"A handover you can continue","body":"Editable files, written documentation and a record of anything provisional, so the work does not depend on us to move forward."}],
  },
  {
    key: "who-we-work-with",
    eyebrow: "Who we work with",
    heading: "Businesses with a professional output standard and an irregular production load.",
    paragraphs: ["The common thread is not a sector. It is a business that has to produce work to a professional standard, on a schedule it does not fully control, in volumes that would not justify a permanent hire in every discipline involved.","Engagements run as defined projects, as ongoing production capacity, or as short-notice support when an internal team is already at full stretch."],
    points: [{"title":"Architecture and interior practices","body":"Drawing packages, documentation and presentation material produced alongside an in-house team that keeps design authorship and technical authority."},{"title":"Fit-out and design-build contractors","body":"Coordinated sets, setting-out and detail drawings produced from approved layouts, marked-up drawings and site dimensions."},{"title":"Furniture and product businesses","body":"Catalogue and campaign imagery, product film, and the research and outreach behind entering a new market."},{"title":"Brands and marketing teams","body":"Visual production, short-form film, content material and the digital presence it all runs on, held to one direction."},{"title":"Manufacturers and export businesses","body":"Market and trade-route research, qualified target data and cross-border outreach systems built to be worked rather than filed."},{"title":"International companies","body":"Work delivered digitally across time zones and scheduled around the client's working day rather than ours."}],
  },
  {
    key: "operating-presence",
    eyebrow: "Operating presence",
    heading: "United Kingdom and India, working across the day.",
    paragraphs: ["XIYÀTO operates across the United Kingdom and India. The UK-facing presence handles client relationships and commercial contact for work delivered into the United Kingdom and Europe. Production is scheduled and delivered from India.","The practical effect is a usable overlap for review and instruction, and a turnaround that continues after a UK working day has closed. Everything is delivered digitally, which is also how we work with clients based outside either country."],
    points: [{"title":"United Kingdom","body":"Client relationships and commercial contact for work delivered into the United Kingdom and Europe."},{"title":"India","body":"Where drawing work, research, visual production and build work are scheduled, produced and delivered."},{"title":"Delivered digitally","body":"Files, reviews and instructions move through the channels a client already uses, on their working day."}],
  },
  {
    key: "founder-accountability",
    eyebrow: "Accountability",
    heading: "Founder-led, with specialists engaged against a defined brief.",
    paragraphs: ["XIYÀTO was founded by Chaitanya Gaikwad and remains founder-led. Scoping, production leadership and the final check before anything is issued sit with the founder on every engagement. There is no account layer between the client and the work.","Capacity is extended through a network of independent specialists brought in against a defined brief when an engagement calls for it. That keeps standing overhead low and means a client is never carrying a team that is not working on their project. Whoever produces the work, the scope and the final check stay in the same hands.","The same discipline applies to what we publish. Claims are stated in operational terms: what was produced, at what scale and in what structure."],
  },
];

export const FOUNDER_COPY = {
  h1: "Accountability sits in one place.",
  standfirst: "XIYÀTO is founder-led by design. Chaitanya Gaikwad scopes each engagement, leads production across the six disciplines and carries out the final check before anything is issued. Where a project needs additional hands, independent specialists are brought in against a written brief, but the scope and the sign-off stay in one place.",
  role: "Founder",
  paragraphs: ["XIYÀTO was built around a practical observation. A design, fit-out, furniture or property business rarely needs one thing at a time: the same project usually wants drawings, research, imagery, film, a website and a sensible way of running the admin around all of it. Bought separately, much of the cost lands in the handovers rather than the work itself, in the re-explaining, the mismatched files and the version that never reached the person who needed it. Chaitanya Gaikwad founded the studio to hold those disciplines in one place, under one person answerable for how they fit together.","He works across all six of them rather than fronting them. Interior and fit-out documentation, market and buyer research, visualisation, short-form film, workflow systems and website builds are scoped, directed and reviewed by the same person, which is what allows a drawing package, the imagery that presents it and the site it eventually sits on to be planned as one piece of work rather than three unrelated ones. Specialists are engaged where an engagement calls for them, against a written brief and into the same review.","What holds the standard steady is procedural rather than stylistic. Each engagement opens by separating what is confirmed from what is assumed and what is still missing, and that separation is recorded before production starts. Scoring methods are documented alongside research data. A dimension taken from a render rather than a measurement is flagged as provisional. Delivered drawing files are reopened and checked before they are issued. Where a system is built, the rules behind it are written down in ordinary language so your own people can run and amend it without calling us.","Clients deal with him directly, from the first conversation through to handover. There is no account layer sitting between a brief and the person producing against it, which keeps the answer to \"where is this\" short and makes it unambiguous who is responsible when something needs correcting."],
  portraitAlt: "Chaitanya Gaikwad, founder of XIYÀTO, in a head-and-shoulders portrait facing the camera, wearing an open patterned shirt over a dark collared top against a plain pale wall.",
} as const;

export const WORK_COPY = {
  h1: "Work you can inspect.",
  standfirst: "Drawing packages, research workbooks, visualisation, short-form film and website builds, published with the inputs and the method alongside the output. Where a client cannot be named, the sector and the market are given instead, and research records are shown with contact detail redacted.",
} as const;

export const SERVICES_INDEX_COPY = {
  h1: "Six disciplines, run as one operation.",
  standfirst: "CAD and technical production, growth and B2B, 3D visualisation, video and film, automation and workflow systems, and website design and development. Each takes defined inputs and returns defined outputs: drawings your team can edit, data your team can work, imagery built for a stated placement, film cut to where it runs, systems your own people can operate and sites deployed on your own domain. Where a project needs several of them, they are scoped together rather than sequenced across separate suppliers.",
} as const;

export const CAREERS_COPY = {
  h1: "Specialists, engaged against a defined brief.",
  standfirst: "XIYÀTO is founder-led and adds capacity per project rather than carrying it between engagements. There are no open permanent or contract vacancies at present, and that is the studio's normal state rather than a temporary pause. The talent network is the route in, and it is where we look first when an engagement needs another pair of hands.",
} as const;

export const CONTACT_COPY = {
  h1: "Start with what you already have.",
  standfirst: "Send the brief and whatever material exists: layouts, marked-up PDFs, measured dimensions, references, product photography or a target market. It does not need to be complete. Establishing what is confirmed, what is assumed and what is still missing is the first step of every engagement, and it happens before any scope is proposed. Enquiries reach the founder directly.",
} as const;
