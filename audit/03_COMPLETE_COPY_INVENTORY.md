# 03 — COMPLETE COPY INVENTORY

**Audit date:** 2026-08-11 · Copy transcribed verbatim from the live site and from `src/`. Nothing here is rewritten.
Sources: `index.html`, `src/App.tsx`, `src/components/CadAutomationSection.tsx`, `src/data/projects.ts`, `src/data/projects.json`.

---

## 1. BRAND NAME

| Context | Exact string |
|---|---|
| Hero H1 | `Chaitanya Gaikwad` |
| Nav logo | `CG.` |
| Footer | `PORTFOLIO 2026 • CHAITANYA GAIKWAD` |
| `<title>` | `Chaitanya Gaikwad — Portfolio & Capabilities` |
| Instagram handle | `@xiyato22` |
| Domain | `xiyato.uk` |

**No logo mark, wordmark, or brand graphic exists.** The brand is the text `CG.` in Playfair Display.

## 2. BRAND DESCRIPTOR

- Footer: `CREATIVE & B2B STRATEGY`
- Meta description: `AI Visual Designer, Visual Content Creator, B2B Research Specialist, and Architectural CAD Drafting.`
- Hero role row: `CAD DRAFTER` · `AI VISUAL DESIGNER` · `MARKETING & B2B SPECIALIST` · `VISUAL CONTENT CREATOR`
- Mobile-only variant of the third: `MARKETING & B2B`

> **No tagline, no positioning line, no value proposition sentence exists.** The descriptor is a list of job titles in four places, and the four lists do not agree with each other (see doc 11 §Inconsistencies).

## 3. HERO HEADLINE

- **H1:** `Chaitanya Gaikwad`
- **H2 (sub-headline):** `Architectural CAD Drafter, AI Visual Designer, and B2B Marketing Specialist.`

## 4. HERO SUPPORTING COPY

`I help architecture firms, brands, and international businesses elevate their visual presentation, market services, and grow through precision CAD work, AI-powered content creation, cinematic video production, B2B lead generation, market research, and responsive web development.`

## 5. HERO SKILL LABELS (desktop only, ≥768 px)

| Label | Sub-label |
|---|---|
| `CAD DRAFTING` | `AutoCAD · Architecture` |
| `AI VISUALS` | `Midjourney · Gen AI` |
| `WEB DEV` | `React · Vite · Deploy` |
| `CINEMATIC VIDEO` | `Reels · AI Films` |
| `B2B RESEARCH` | `Lead Gen · Excel` |
| `MARKETING` | `Strategy · Growth` |

> These 12 strings are the **only place the site names its tools** (AutoCAD, Midjourney, React, Vite, Excel). All 12 disappear below 768 px.

## 6. ABOUT COPY / FOUNDER INTRODUCTION

Section eyebrow: `MY JOURNEY` · Section heading: `Professional Experience`

**¶1:** `I partner with interior design studios, manufacturers, and international business startups. My work bridges the gap between high-fidelity media campaigns (videos, renders) and operational business setups (spreadsheets, lead qualification pipelines, and complete website creation).`

**¶2:** `By combining digital development and structured outreach with visual content production, I help businesses clarify their presence and build solid lead pipelines that convert.`

> There is **no personal biography, no origin story, no location, no education, no photo caption**. The portrait carries only the alt text `Portrait of Chaitanya Gaikwad`.

## 7. APPROACH COPY

Panel heading: `APPROACH`
- `Visual Storytelling` — `Using state-of-the-art AI generation tools to create custom product mockups, cinematic video content, and high-impact visual campaigns.`
- `Systems & Outreach` — `Building solid B2B lead pipelines, managing CRM trackers, automating follow-up campaigns, and executing cold outreach that converts.`

## 8. KEY STRENGTHS

Panel heading: `KEY STRENGTHS`
`AI image & video generation` · `Short-form video content & reels` · `B2B lead generation & business research` · `Email & WhatsApp outreach automation` · `CRM tracking & follow-up systems` · `Website Creation & Development`

## 9. SERVICE NAMES & DESCRIPTIONS (homepage `#services`, 9 items)

| Service name | Description |
|---|---|
| Architectural & Interior CAD Drafting | Professional AutoCAD drafting transforming measurements, hand sketches, and design references into editable DWG, DXF, and PDF drawing packages. |
| AI Visual Content | AI-generated images, cinematic product visuals, website hero images, mockups, brand visuals, and creative visual direction. |
| AI Video & Short-Form Content | Short-form videos, reels, product explainers, promotional content, AI-assisted video production, and visual storytelling. |
| Digital Marketing Support | Content planning, campaign assistance, brand presentation, social media support, marketing execution, and digital growth strategy. |
| B2B Lead Generation | Researching relevant companies, identifying decision-makers, preparing organized lead lists, and finding potential business opportunities. |
| Business Research | Company research, market research, competitor research, supplier research, export-business research, and opportunity identification. |
| Outreach & Follow-Up | Email outreach, WhatsApp outreach, personalized messaging, follow-up systems, CRM-style tracking, and international communication support. |
| Website Creation & Development | Complete responsive websites for portfolios, brands, and businesses—from page structure, visual direction, content placement to front-end development, mobile optimisation, integrations, and deployment. |
| Automation & Workflow Systems | Email automation, outreach workflows, lead-management systems, content workflows, repetitive-task automation, and practical AI-assisted systems. |

**No pricing, package, timeline, or deliverable copy accompanies any service.**

## 10. CATEGORY COPY (homepage `#projects`, 5 cards — each card's eyebrow is `CATEGORY PORTFOLIO`)

| Title | Subtitle *(defined in source, never rendered)* | Description (rendered, `line-clamp-2`) |
|---|---|---|
| Architectural & Interior CAD Drafting | Professional AutoCAD Drawing Packages | Professional AutoCAD drafting transforming measurements, hand sketches, and design references into editable DWG, DXF, and PDF drawing packages. |
| Cinematic Videos | AI-Assisted Films, Reels & Product Stories | Cinematic short-form videos, product campaigns, interior walkthroughs, and brand stories created through AI-assisted production, visual direction, editing, prompt engineering, and structured storytelling. |
| B2B Research & Excel Systems | Lead Intelligence, Market Mapping & Outreach Workflows | Structured research and spreadsheet systems created for lead generation, buyer mapping, supplier discovery, competitor research, outreach tracking, sample evaluation, and cross-border business development. |
| 3D Renders & Visualisations | Interior Concepts, Product Mockups & Spatial Studies | A curated collection of interior renders, architectural concepts, product visualisations, material studies, showroom previews, and presentation-ready imagery created for client communication and design exploration. |
| Websites Developed | Responsive Portfolio, Brand & Business Websites | Complete responsive websites developed through page planning, visual direction, content organisation, front-end implementation, mobile optimisation, contact integrations, and deployment. |

> The `subtitle` field exists on all 5 categories in `src/data/projects.ts` and is **never rendered anywhere**.

## 11. CATEGORY PAGE INTROS

- **Cinematic Videos:** `Short-form films, luxury product campaigns, and retail walkthroughs created using advanced AI text-to-video systems, prompt engineering, custom storyboarding, and pacing edits.`
- **B2B Research & Excel Systems:** `Clean, structured lead generation pipelines, buyer shortlists, and competitor market intelligence. Original phone numbers and emails have been safely redacted to safeguard confidentiality.`
- **3D Renders & Visualisations:** `High-fidelity 3D spatial concept renders and visualisations exploring texture matching, lighting design, and creative composition. Click on any panel to launch the lightbox.`
- **Websites Developed:** `Complete responsive websites built from layout wireframing, content planning, and visual styling to front-end development, mobile optimisation, and live deployment.`
- **Interactive viewer eyebrow:** `INTERACTIVE SPREADSHEET PREVIEWS`

## 12. PROJECT TITLES & DESCRIPTIONS

### 12.1 — Cinematic Videos (9)

| # | Title | Client | Year | Tags | Description |
|---|---|---|---|---|---|
| 1 | Moon Chair Cinematic Reel — Sultanah & Co. Interiors | Sultanah & Co. Interiors | 2025 | Cinematic · AI Video · Product Campaign · Luxury | Directed the "Moon Chair" cinematic campaign and created premium factory-to-showroom reel concepts, visual sequences, transitions, and social content designed to strengthen luxury product storytelling. |
| 2 | Kozena Luxury Furniture Campaign | Kozena | 2026 | Cinematic · Luxury · Short-Form · Furniture | A premium cinematic product showcase campaign for Kozena's luxury sofa and furniture range. |
| 3 | Premium Bar Red Restaurant Concept | Hospitality Client | 2026 | Cinematic · Hospitality · Interior Walkthrough | Visual walk-through and promotional media concept for a premium high-end red bar and restaurant design proposal. |
| 4 | Room Transformation Walkthrough | Interior Design Studio | 2026 | Cinematic · Interior · Walkthrough · Transformation | Before-and-after room transformation visual reel and material spatial study. |
| 5 | Bahrain Client Commercial Ad | Middle East Developer | 2026 | Cinematic · Commercial Ad · Real Estate | Cinematic visual ad and walkthrough campaign for a premium real estate developer in Bahrain. |
| 6 | The Bar Edit Cinematic | Hospitality Client | 2026 | Cinematic · Luxury · Short-Form · Hospitality | Cinematic commercial edit showcasing ambience, luxury finishes, and design details for an upscale bar. |
| 7 | Great Design Holds Attention Walkthrough | Visual Design Study | 2026 | Cinematic · AI Video · Spatial Study | Cinematic walkthrough study exploring visual rhythm, spatial comfort, and premium textures. |
| 8 | Bingxi Factory-to-Showroom Video | Bingxi | 2026 | Cinematic · Industrial · Showroom · Product Story | Cinematic visual campaign tracking production from factory floor to luxury furniture showroom. |
| 9 | One Design District Showroom Reel | One Design District | 2026 | Cinematic · Showroom Reel · Interior · POV | POV walkthrough showing statement furniture pieces and premium finishes at One Design District showroom. |

All nine share the role string `Cinematic Content Creator & Visual Director`, and on all nine the `location` field is a duplicate of the `client` field. **`role`, `location`, `subcategory`, `dateRange` and `shortDescription` are never rendered on this page.**

### 12.2 — 3D Renders & Visualisations (49)

Titles are auto-numbered only:
- `Spatial Study Concept 01` – `06` (subcategory `3D Renders`)
- `Visualisation Study Concept 01` – `43` (subcategory `Visualisations`)

**There are only two description strings across all 49 items**, differing only by the trailing concept number:

1. *(the 6 renders)* `A high-fidelity rendering study showcasing spatial layout, lighting, furniture design details, and material textures. Created as part of spatial concept development and visual design study. Concept NN.`
2. *(the 43 visualisations)* `A high-fidelity visual concept exploring texture matching, spatial arrangement, lighting design, and creative aesthetics. Concept NN.`

Two `shortDescription` strings (never rendered), two `client` values (`Interior & Visual Exploration`, `Visual Content & Design Exploration`), two `role` values (`AI Visualizer & 3D Spatial Designer`, `AI Visualizer & Creative Director`). **No client, brief, tool, or material is named for any of the 49.**

Section count chips: `6 Concepts` · `43 Concepts`

### 12.3 — B2B Research & Excel Systems (8)

| # | Title | Chip | shortDescription (rendered on the card) | Tags |
|---|---|---|---|---|
| 1 | Premium Fabric Import Buyer Shortlist | 7 SHEETS | A cleaned shortlist of premium fabric importers in India segmenting targets by cities. | B2B Research · Data Organisation · Export Support |
| 2 | Electronics Middle East Selected Leads | 1 SHEETS | Market mapping and B2B lead generation shortlist for electronics shops in target UAE regions. | B2B Research · Lead Generation · Market Mapping |
| 3 | Middle East Interiors & Fitout WhatsApp Leads | 1 SHEETS | Expanded B2B lead generation database mapping interior and fit-out firms in the GCC. | B2B Research · Lead Generation · Outreach |
| 4 | Automotive Showroom Lead Intelligence | 2 SHEETS | Dealership showroom targets and EV/Chinese brand distributors ranked for design-build outreach. | B2B Research · Lead Generation · Market Mapping |
| 5 | China Interior Markets & Hubs | 4 SHEETS | Wholesale interior decor markets and furniture hubs mapped across Tier 1, 2, and 3 cities. | B2B Research · Market Mapping · Data Organisation |
| 6 | Laminate Events & Building Expos Calendar | 1 SHEETS | Events calendar mapping architecture, construction, and building material exhibitions in India. | B2B Research · Market Mapping · Events Research |
| 7 | Philippines VIP Approachable Lead Intelligence | 4 SHEETS | Upper-echelon VIP public contact routes mapped for premium architectural outreach. | B2B Research · Lead Generation · Outreach |
| 8 | Saudi Riyadh & Jeddah Lead Intelligence | 6 SHEETS | Developer, luxury hotel projects, and pre-opening opportunities mapped for Saudi market entry. | B2B Research · Lead Generation · Saudi Market |

**All eight workbooks share one identical `fullDescription`**, shown on every viewer page:
`This workbook was developed to organize B2B intelligence into usable commercial systems. It covers buyer discovery, supplier research, outreach prioritization, contact-route mapping, sample evaluation, and progress tracking across international markets. Built for practical outreach and decision-making—not simply data collection.`

All eight also share the subcategory string `Lead Intelligence, Market Mapping & Outreach Workflows`, the client string `B2B Client Systems`, and the role string `B2B Research & Outreach Specialist`.

### 12.4 — Websites Developed (3)

| # | Title | Client | Role eyebrow | Description |
|---|---|---|---|---|
| 1 | Personal Portfolio Website | Chaitanya Gaikwad | DESIGNER & FRONT-END WEBSITE DEVELOPER | A refined editorial portfolio designed and developed to present cinematic content, B2B research systems, visualisations, professional experience, and digital-development work through one responsive experience. |
| 2 | Export Brand Website | International Bedding & Hotel-Linen Client | FRONT-END WEBSITE DEVELOPER & DIGITAL PRESENTATION SPECIALIST | A complete responsive brand website originally developed for an international bedding and hotel-linen export opportunity. The original commercial opportunity is now proceeding independently, while the finished website build remains available for acquisition, licensing, or adaptation by a suitable business. |
| 3 | Anvikshiki Journal | Academic & Research Community | FULL-STACK DEVELOPER & TECHNICAL ADMINISTRATOR | A clean, responsive academic journal platform designed and developed to manage and publish scholarly articles, indexing, peer-reviewed research papers, and author submissions. |

Tags — 1: `Portfolio · Responsive Design · Front-End Development · Project Architecture · Media Presentation · Contact Integration · Vercel Deployment` · 2: `Export Business · Responsive Website · Front-End Development · B2B Presentation · Lead Capture · International Brand · Foreign Trade` · 3: `Academic Journal · Publication Platform · Full-Stack Development · Responsive Layout · Scholarly Research · Database Integration`

### 12.5 — CAD project copy

Card titles: `Master Bathroom CAD Package` · `Cigar Lounge Ceiling & Flooring` · `Custom Interior Wall Drafting`
Featured banner: `Bahrain Luxury Interior & Architectural CAD Package`
*(Full body copy for each is transcribed in doc 02, Page 2 §04 and §03.)*

Drawing titles used in the lightbox and as alt text: `Master Bathroom - General Layout Plan` · `Master Bathroom - Bathtub & Window Elevation` · `Master Bathroom - General Arrangement Plan` · `Master Bathroom - Wall 1: Bathtub & Window Elevation` · `Master Bathroom - Wall 2: Vanity & WC Wall Elevation` · `Master Bathroom - Wall 3: Walk-in Shower Wall Elevation` · `Cigar Lounge - Reflected Ceiling Plan (RCP)` · `Cigar Lounge - Herringbone Flooring Plan` · `Cigar Lounge - General Furniture Layout` · `Cigar Lounge - Herringbone Flooring Layout` · `Custom Interior Walls - General Arrangement & Layout` · `Toilet Feature Wall - Vanity & Mirror Elevation Details` · `Wash Feature Wall - Decorative Panelling & Fixture Elevation` · `Stair Feature Wall - Architectural Joinery Construction Detail` · `Client Reference - 3D Visual Render` · `Client Reference - Measured Hand Sketch & CAD Notes` · `Client Input - Visual 3D Render Reference` · `Client Input - Dimensioned Layout & Markups` · `Editable CAD Output - Vector General Arrangement Plan` · `Editable CAD Output - Vector Wall Elevation with Dimensions`

Category pills: `Plan Drawing` · `Wall Elevation` · `Ceiling Plan` · `Flooring Plan` · `Elevation` · `Input Material` · `General Layout` · `Construction Detail` · `Client Reference` · `Vector DWG / DXF`

## 13. CLIENT / COMPANY NAMES USED ON THE SITE

**Named employers (Experience section):** `Sultanah & Co. Interiors` · `Red Chandelier Studio` · `Chinese Company` *(anonymised, descriptor `HOTEL LINEN & PREMIUM BEDDING EXPORT CLIENT`)* · `Ereno Design Studio` · `Fitout 360 Interiors` · `Jovial Decor`

**Named project clients:** `Kozena` · `Bingxi` · `One Design District` · `Anvikshiki Journal`

**Anonymised clients:** `Hospitality Client` (×2) · `Interior Design Studio` · `Middle East Developer` · `Visual Design Study` · `International Bedding & Hotel-Linen Client` · `Academic & Research Community` · `B2B Client Systems` · `Interior & Visual Exploration` · `Visual Content & Design Exploration`

**Third-party names inside the public spreadsheet data** (e.g. `Dar Global`, and a named individual in the `NAMED PERSON PUBLICLY SEEN` column) — see doc 09 §5.

> **Note:** the Experience card labelled `Jovial Decor` links to `@jovialdecoure` and its `aria-label` reads `View Jovial Decoure on Instagram` — three spellings of the same client.

## 14. EXPERIENCE STATEMENTS

| Company | Period | Role | Statement |
|---|---|---|---|
| Sultanah & Co. Interiors | Mar 2025 – Present | Freelance Cinematic Content Creator | Directed the "Moon Chair" cinematic campaign and created premium factory-to-showroom reel concepts, visual sequences, transitions, and social content designed to strengthen luxury product storytelling. |
| Red Chandelier Studio | Mar 2026 – Present | Creative Visual Strategist & AI Content Producer | Created luxury interior visuals, cinematic reels, showroom walkthroughs, campaign assets, advanced architectural prompts, and presentation content for residential, hospitality, and commercial projects. |
| Chinese Company | Mar 2025 – Present | Marketing, Lead Generation & Website Specialist | Built structured buyer databases, cross-border outreach workflows, buyer qualification systems, and sample-evaluation tracking while supporting export communication and a complete brand website project. |
| Ereno Design Studio | Mar 2026 – Jun 2026 | Freelance AI Visual Designer | Produced high-end interior concept visuals, showroom-style mockups, realistic short-form video concepts, and structured vendor and material research for design proposals and client presentations. |
| Fitout 360 Interiors | Apr 2026 – May 2026 | Freelance AI Visualizer & Video Creator | Delivered more than nine high-fidelity commercial office renders and developed ultra-realistic AI video concepts, transforming raw layout references into polished visual options for client presentations. |
| Jovial Decor | Feb 2026 – May 2026 | AI Design Specialist | Created interior visuals, product mockups, curtain catalogue layouts, point-of-sale signage, invitation concepts, and social media assets for a home décor showroom covering approximately 10,000 square feet. |

## 15. PROJECT METRICS

The site has **no metric cards, no counters, no statistics block** (KPI cards removed in commit `826c6e5`). Every number on the site is embedded in prose or is a UI count:

| Number | Where |
|---|---|
| `more than nine high-fidelity commercial office renders` | Experience — Fitout 360 |
| `approximately 10,000 square feet` | Experience — Jovial Decor |
| `AutoCAD DWG / DXF Output (4 Sheets)` | CAD hero caption |
| `+ 6 Drawings`, `3 CAD Drawings`, `4 Wall Packages` | CAD project chips |
| `4-Step Production Workflow`, `Step 01`–`Step 04` | CAD workflow |
| `6 Concepts`, `43 Concepts` | Visualisations section chips |
| `7 SHEETS`, `1 SHEETS`, `2 SHEETS`, `4 SHEETS`, `6 SHEETS` | B2B cards |
| `Showing {n} of {n} rows` | Spreadsheet viewer footer |
| `RENDER {n} OF 49`, `SCREENSHOT {n} OF 9`, `{n} / {total}` | Lightbox counters |
| `PORTFOLIO 2026` | Footer |
| Phone numbers `+44 7882 746212`, `+91 70283 11226` | Multiple |

**No monetary figures, rates, or earnings appear anywhere** (removed in commit `cca00cd`). Verified: a full-text search of the built bundle and all source files returns no currency-formatted values.

## 16. TESTIMONIALS

**NONE.** There is no testimonial, quote, review, endorsement, or reference anywhere on the site.

## 17. TRUST STATEMENTS

| Statement | Location |
|---|---|
| `Designed for client review. Fully editable for professional refinement.` | CAD intro chip |
| `Quality Control With Verification` + the 6 badges `DIMENSION CHECKED` / `EDITABLE GEOMETRY` / `LAYER ORGANIZED` / `VISUALLY REVIEWED` / `PDF PRESENTATION` / `REVISION READY` | CAD §07 |
| `Professional drafting is only useful when the result remains measurable, editable, and reviewable. Each package is checked for confirmed dimensions, room geometry, door and fixture relationships, layer organisation, file editability, annotation clarity, and presentation quality. Any dimensions estimated from visual references remain clearly editable for final professional adjustment.` | CAD §07 body |
| `Reference plans, dimensions and design images are converted into structured, editable CAD documentation—not simply placed as flat images.` | CAD §05 closing |
| `Phone & Email Redacted` + `PRIVACY STATUS` | Spreadsheet viewer |
| `Original phone numbers and emails have been safely redacted to safeguard confidentiality.` | B2B category intro |
| `Instagram account not publicly available` + `PRIVATE` chip | Experience card 3 |
| Blue verified tick (`aria-label="Verified account"`) on 5 Experience cards | Experience |
| `CURRENTLY IN DEVELOPMENT` | Startup ×2 |

**Only legal/disclaimer text on the site** (CAD §11):
`CAD packages are developed from the measurements and references supplied for each project. Provisional details remain editable and should be reviewed by the project's qualified designer, draftsman or technical consultant before construction.`

## 18. CALLS TO ACTION

| CTA label | Type | Destination | Page |
|---|---|---|---|
| `VIEW PORTFOLIO` | anchor | `#projects` | Home |
| `LET'S CONNECT` | anchor | `#contact` | Home |
| `+44 7882 746212` | WhatsApp | `wa.me/447882746212` | Home hero |
| `+91 70283 11226` | WhatsApp | `wa.me/917028311226` | Home hero |
| `EXPLORE CATEGORY` ×5 | *non-link div click* | 5 category routes | Home |
| `EXPLORE CIYATO LAUNCHER` | hash route | `#/startup` | Home |
| `Start a CAD Project` | WhatsApp (pre-filled) | `wa.me/447882746212?text=…` | CAD |
| `View Drawing Samples` | button → modal | — | CAD |
| `Generate` / `Generate CAD →` | WhatsApp (pre-filled) | `wa.me/447882746212?text=…` | CAD lightbox |
| `VIEW DATA` ×8 | hash route | viewer routes | B2B |
| `DOWNLOAD` ×8 | file download | `.xlsx` | B2B |
| `Download Portfolio Copy` | file download | `.xlsx` | Viewer |
| `VISIT LIVE WEBSITE` ×3 | external | 3 URLs | Websites |
| `WhatsApp +44 7882 746212` / `WhatsApp +91 70283 11226` | WhatsApp (pre-filled) | `wa.me/…?text=…` | Startup |
| `Inquire Website Acquisition` | WhatsApp (pre-filled) | `wa.me/447882746212?text=…` | **DEAD CODE — never renders** |
| `BACK TO HOME` / `BACK TO PROJECTS` / `BACK TO B2B RESEARCH` / `Back to list` | anchor | — | subpages |

**The Services section (9 cards) and the Experience section (6 cards) contain no CTA at all.**

## 19. CONTACT COPY

- Footer heading: `Let's connect.`
- Footer body: `Open to creative direction, B2B campaigns, or website support opportunities.`
- CAD CTA heading: `Have a plan, reference or design that needs drafting?`
- CAD CTA body: `Send the available layout, measurements and design references. I will review the material, identify what is confirmed or missing, and propose the appropriate editable CAD package.`
- Startup CTA heading: `Interested in Ciyato?`
- Startup CTA body: `For product discussions, early collaboration, development opportunities, partnerships, or enquiries relating to Ciyato, contact me directly on WhatsApp.`

**Pre-filled WhatsApp message bodies (3 distinct):**
1. `Hello, I would like to discuss an AutoCAD drafting project. I have a plan/reference and need editable CAD drawings.`
2. `Hello, I am interested in Ciyato and would like to learn more about the startup.`
3. `Hi Chaitanya, I am inquiring about acquiring the Export Brand Website listed on your portfolio.` *(dead code)*

## 20. LOCATION INFORMATION

**NO location is stated anywhere on the site** — no city, no country, no address, no timezone, no service area.

Places named only as *client* context: `Bahrain` · `India` · `UAE` · `GCC` · `Saudi` (Riyadh, Jeddah) · `China` · `Philippines` · `Middle East` · `Global` · `Remote`.

The `+44` (UK) and `+91` (India) phone prefixes are the only geographic signal about the site owner.

## 21. FOOTER COPY

`Let's connect.` · `Open to creative direction, B2B campaigns, or website support opportunities.` · `+44 7882 746212` · `+91 70283 11226` · `@xiyato22` · `INSTAGRAM` · `WHATSAPP` · `PORTFOLIO 2026 • CHAITANYA GAIKWAD` · `CREATIVE & B2B STRATEGY`

## 22. LEGAL COPY

**NONE**, other than the CAD disclaimer quoted in §17. No copyright symbol, privacy policy, terms, cookie notice, or company registration detail exists.

## 23. NAVIGATION LABELS

Header (desktop and mobile use the same six): `Home` · `About` · `Services` · `Projects` · `Startup` · `Contact` — rendered uppercase by CSS. Logo: `CG.`
Back links: `Back to Home` · `Back to Projects` · `Back to B2B Research` · `Back to list`

## 24. BUTTON LABELS (complete set)

`VIEW PORTFOLIO` · `LET'S CONNECT` · `EXPLORE CATEGORY` · `EXPLORE CIYATO LAUNCHER` · `VIEW DATA` · `DOWNLOAD` · `Download Portfolio Copy` · `VISIT LIVE WEBSITE` · `Start a CAD Project` · `View Drawing Samples` · `Generate` · `Generate CAD →` · `Inquire Website Acquisition` *(dead)* · `Back to …` · `Toggle navigation menu` *(aria-label)*

## 25. MICROCOPY

`Click any preview to launch full screen →` · `Click cards or thumbnails to launch full drawing gallery` · `Click on any panel to launch the lightbox.` · `Click to expand.` · `Pinch to zoom · Swipe to navigate` · `Esc to exit` · `Editable Geometry + Layers` · `Reference Materials` · `DWG / DXF / PDF` · `Active Sheet: {name}` · `Showing {n} of {n} rows` · `CAD Drawing` *(lightbox fallback label)* · `Column {i}` *(table header fallback)* · `PRIVATE` · `Category Portfolio` · `Works & Capabilities` · `Offerings` · `My Journey` · `My Startup` · `Capabilities` · `Screenshots` · `Selected CAD Packages` · `Structured Process` · `Transformation Workflow` · `Quality Control & Verification` · `Flexible File Formats` · `Development Milestones` · `Interactive Spreadsheet Previews` · `Privacy Status` · `Client Input` · `Editable CAD Output` · `CAD Drafting & Scripting` · `Featured Client Project • Bahrain` · `Complete Drawing Package`

## 26. FORM LABELS / SUCCESS / ERROR TEXT

**The site has zero `<form>` elements and exactly one `<input>` in total** (verified live).

That input is the spreadsheet row filter:
- **Placeholder:** `Search rows...`
- **Label:** none · **`aria-label`:** none · **`name`:** none · **`required`:** false · **validation:** none
- **Empty result text:** `No matching records found`

**There is no contact form anywhere, and therefore no submit button, no success state, no error state, no validation copy, and no spam protection.**

## 27. LOADING / EMPTY / ERROR STATES

| State | Copy |
|---|---|
| Spreadsheet loading | `Parsing Worksheet...` (with a spinner) |
| Spreadsheet, no sheets | `No sheets available` |
| Spreadsheet, no search match | `No matching records found` |
| Invalid workbook slug | `Workbook not found` + `Back to list` |
| Unknown URL | **no error copy — the homepage renders with HTTP 200** |

## 28. MOBILE-ONLY vs DESKTOP-ONLY TEXT

**Mobile-only (<640 px):** `MARKETING & B2B` (hero badge) · `Pinch to zoom · Swipe to navigate` · `Generate CAD →`

**Desktop-only (hidden on mobile):**
- ≥640 px: `MARKETING & B2B SPECIALIST` · `Generate` (lightbox) · zoom −/+ cluster
- ≥768 px: **all 12 hero skill strings** (§5) · `Click cards or thumbnails to launch full drawing gallery` · `Esc to exit`
- Hover-only: `EXPLORE CATEGORY` spotlight, video control pill (`opacity-0` until `group-hover`), social icon labels `INSTAGRAM` / `WHATSAPP`

## 29. SEO / META COPY

Identical on **every** route (static, in `index.html`):

| Tag | Value |
|---|---|
| `<title>` | `Chaitanya Gaikwad — Portfolio & Capabilities` |
| `meta[name=description]` | `Portfolio of Chaitanya Gaikwad: AI Visual Designer, Visual Content Creator, B2B Research Specialist, and Architectural CAD Drafting.` |
| `og:type` | `website` |
| `og:url` | `https://chaitanya-gaikwad.vercel.app/` ← **points at the Vercel host, not `xiyato.uk`** |
| `og:title` | `Chaitanya Gaikwad — Portfolio & Capabilities` |
| `og:description` | `AI Visual Designer, Visual Content Creator, B2B Research Specialist, and Architectural CAD Drafting.` |
| `twitter:title` | `Chaitanya Gaikwad — Portfolio & Capabilities` |
| `twitter:description` | `AI Visual Designer, Visual Content Creator, B2B Research Specialist, and Architectural CAD Drafting.` |
| `og:image` | **ABSENT** |
| `twitter:card` | **ABSENT** |
| `twitter:image` | **ABSENT** |
| `canonical` | **ABSENT** |
| `meta[name=robots]` | **ABSENT** |
| `meta[name=author]` | **ABSENT** |
| `html lang` | `en` |

## 30. STRUCTURED DATA

**NONE.** Verified live: `document.querySelectorAll('script[type="application/ld+json"]')` returns 0 elements. No `Person`, `LocalBusiness`, `Service`, `BreadcrumbList`, `CreativeWork`, or any other schema.org markup exists.

## 31. NON-SITE COPY PRESENT IN THE REPOSITORY

Two files describe a **different person and project** and would ship with any copy of the repo:

- `README.md` — begins `Hi I'm Disha,` and describes a background in AIML and AI alignment/governance
- `metadata.json` — `"name": "Disha Singha Portfolio"`, `"description": "Academic portfolio for Disha Singha, specializing in AI Safety and Philosophy of AI."`
- `package.json` — `"name": "react-example"`

These are not served to visitors, but they are the repository's identity.
