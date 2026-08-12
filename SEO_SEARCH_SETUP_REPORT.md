# XIYÀTO — SEO and search setup report

Every figure below is measured against the rendered production HTML served by
`next start`, with HTML entities decoded before counting.

---

## 1. Title and description map

All unique — no route inherits another's wording, and no two service pages share metadata.

| Route | Title | Len | Description | Len |
|---|---|---:|---|---:|
| `/` | XIYÀTO — Technical, Creative & Growth Services | UK & India | 59 | CAD and technical production, B2B growth, 3D visualisation, film, automation and websites for design practices, brands and manufacturers. UK and India. | 151 |
| `/work` | Work — XIYÀTO | 13 | Interior drawing packages, B2B research workbooks, visualisation, short-form film and website builds, published with the inputs and method alongside each output. | 161 |
| `/services` | Services — XIYÀTO | 17 | Six service areas under one partner: technical drafting, B2B research, visualisation, film, workflow automation and web development. Commission one or several. | 159 |
| `/services/cad-technical-production` | CAD Drafting & Technical Production Services — XIYÀTO | 53 | Outsourced CAD drafting for interior and fit-out teams. Send marked-up PDFs, site dimensions or a sketch; receive a coordinated, editable DWG set you can issue. | 160 |
| `/services/growth-marketing-b2b` | B2B Lead Generation & Market Research — XIYÀTO | 46 | Research-led B2B lead generation and market research: target companies identified and scored, contact routes mapped, outreach structured for your team. | 151 |
| `/services/visualisation-image-production` | Interior & Product 3D Visualisation Services — XIYÀTO | 53 | 3D visualisation for interiors, architecture, furniture and products. Produced from your plans, materials and references, and specified for each placement. | 155 |
| `/services/video-ai-film-editing` | Video Production, Film & Editing — XIYÀTO | 41 | Short-form cinematic film for furniture, interior and property brands: product films, showroom reels and interior walkthroughs, cut for every placement. | 152 |
| `/services/automation-workflow-systems` | Business Workflow Automation Systems — XIYÀTO | 45 | Workflow design and business process automation built inside your existing tools: enquiry routing, lead management, outreach, reporting and internal tooling. | 157 |
| `/services/website-design-development` | Website Design & Development Services — XIYÀTO | 46 | Website design and development for businesses, portfolios and brands: responsive build, content architecture, integrations, deployment and code handover. | 153 |
| `/company` | One Partner Across Six Disciplines — XIYÀTO | 43 | One partner for CAD and technical production, B2B growth, visualisation, film, automation and websites. Founder-led, working across the UK and India. | 149 |
| `/company/people` | Founder, Chaitanya Gaikwad — XIYÀTO | 35 | Chaitanya Gaikwad founded XIYÀTO and leads production across all six disciplines. Scoping, quality checks and client contact sit with him on every engagement. | 158 |
| `/company/locations` | Locations — XIYÀTO | 18 | XIYÀTO maintains a UK-facing presence with production running from India, delivering internationally across Europe, the Middle East and Asia. | 141 |
| `/careers` | Careers — XIYÀTO | 16 | XIYÀTO engages independent specialists across drafting, research, visualisation, film, automation and web work. No open vacancies; the network stays open. | 154 |
| `/contact` | Contact — XIYÀTO | 16 | Send a brief and whatever material exists. XIYÀTO will confirm what is workable, what is still needed, and propose a scope. UK and India. | 137 |
| `/legal/privacy` | Privacy Policy — XIYÀTO | 23 | How XIYÀTO collects, uses and stores the information you submit through this website, including enquiry forms, and how to ask for it to be removed. | 147 |
| `/legal/terms` | Terms of Use — XIYÀTO | 21 | The terms on which XIYÀTO makes this website available, covering acceptable use, the ownership of published work and the limits of what is offered here. | 152 |

Titles 13–59 characters (limit 62). Descriptions 137–161 (target 120–165).

---

## 2. Per-route technical state

| Route | H1 | Canonical | OG + image | Twitter | JSON-LD |
|---|:-:|:-:|:-:|---|---|
| `/` | 1 | yes | yes | summary_large_image | ProfessionalService, WebSite |
| `/work` | 1 | yes | yes | summary_large_image | ProfessionalService, WebSite, BreadcrumbList |
| `/services` | 1 | yes | yes | summary_large_image | ProfessionalService, WebSite, BreadcrumbList |
| `/services/cad-technical-production` | 1 | yes | yes | summary_large_image | ProfessionalService, WebSite, Service, BreadcrumbList |
| `/services/growth-marketing-b2b` | 1 | yes | yes | summary_large_image | ProfessionalService, WebSite, Service, BreadcrumbList |
| `/services/visualisation-image-production` | 1 | yes | yes | summary_large_image | ProfessionalService, WebSite, Service, BreadcrumbList |
| `/services/video-ai-film-editing` | 1 | yes | yes | summary_large_image | ProfessionalService, WebSite, Service, BreadcrumbList |
| `/services/automation-workflow-systems` | 1 | yes | yes | summary_large_image | ProfessionalService, WebSite, Service, BreadcrumbList |
| `/services/website-design-development` | 1 | yes | yes | summary_large_image | ProfessionalService, WebSite, Service, BreadcrumbList |
| `/company` | 1 | yes | yes | summary_large_image | ProfessionalService, WebSite, BreadcrumbList |
| `/company/people` | 1 | yes | yes | summary_large_image | ProfessionalService, WebSite, BreadcrumbList, Person |
| `/company/locations` | 1 | yes | yes | summary_large_image | ProfessionalService, WebSite, BreadcrumbList |
| `/careers` | 1 | yes | yes | summary_large_image | ProfessionalService, WebSite, BreadcrumbList |
| `/contact` | 1 | yes | yes | summary_large_image | ProfessionalService, WebSite, BreadcrumbList |
| `/legal/privacy` | 1 | yes | yes | summary_large_image | ProfessionalService, WebSite, BreadcrumbList |
| `/legal/terms` | 1 | yes | yes | summary_large_image | ProfessionalService, WebSite, BreadcrumbList |

Exactly one H1 per route. Every canonical is self-referencing on `https://xiyato.uk`. No route carries `noindex`.

---

## 3. Search intent and keyword map

These clusters record the intent each page is written *against*. They are
documentation for future edits, not text stuffed into the page. Seeds supplied
in the brief were treated as hypotheses and reworded where the natural phrasing
differed.

### `/services/cad-technical-production`

**Question being answered:** Can I outsource our interior drawing packages to someone who will return editable AutoCAD files our own team can revise and issue?

**Primary cluster:** CAD drafting services · outsourced CAD drafting · interior CAD drafting · AutoCAD drafting services · architectural drafting support · CAD outsourcing UK

**Secondary cluster:** interior technical drawings · RCP drafting services · floor plan drafting · reflected ceiling plan drawings · joinery detail drawings · editable DWG drawing packages · fit-out drawing packages · CAD drafting for interior designers

### `/services/growth-marketing-b2b`

**Question being answered:** Who can research a new market for me, identify the companies actually worth approaching, work out how to reach the right people, and hand it over in a form my commercial team can work from?

**Primary cluster:** B2B lead generation · B2B research services · market research support · prospect research · lead list building · B2B outreach support

**Secondary cluster:** business development research · contact verification · market entry research · decision-maker mapping · competitor and supplier research · trade fair and exhibition research · B2B lead qualification · CRM-ready prospect data

### `/services/video-ai-film-editing`

**Question being answered:** Who can produce and edit a cinematic short-form film for my product, showroom or interior project and deliver it in the reel, feed and website formats I actually need?

**Primary cluster:** cinematic video production · video editing services · short-form video production · product video production · interior design reels · cinematic brand videos

**Secondary cluster:** cinematic brand videos · architectural video content · showroom walkthrough video · furniture product film production · hospitality venue video production · real estate development video · video content for interior designers

### `/services/visualisation-image-production`

**Question being answered:** Who can turn my plans, materials and product references into interior, architectural and product images good enough to put in front of a client?

**Primary cluster:** 3D visualisation services · interior visualisation · architectural visualisation · interior rendering services · product visualisation · furniture visualisation

**Secondary cluster:** 3D interior rendering · showroom and retail visualisation · material and finish studies · furniture and product imagery · hospitality interior visualisation · dimensioned 3D layout studies · concept imagery for client presentations · campaign and hero image production

### `/services/automation-workflow-systems`

**Question being answered:** Who can map how my business actually runs and automate the repetitive parts of it, from lead management and outreach to reporting, inside the tools we already use?

**Primary cluster:** business workflow automation · business process automation · AI workflow automation · custom workflow systems · outreach automation · lead generation automation

**Secondary cluster:** lead management workflow · automated follow-up systems · research workflow automation · content workflow automation · data organisation and consolidation · automated reporting systems · lightweight internal tools · enquiry management automation

### `/services/website-design-development`

**Question being answered:** Who can design and build a proper responsive website for my business or portfolio, launch it properly, and hand over something I actually own?

**Primary cluster:** website design and development · business website development · portfolio website design · responsive website design · brand website development · website development services

**Secondary cluster:** design studio website · front-end website development · mobile-optimised website design · website content architecture · website redesign and migration · portfolio website for interior designers · website deployment and handover · website development for manufacturers

**Location modifiers.** Used only where natural — "CAD outsourcing UK" on the CAD
page, and "United Kingdom and India" in the organisation schema and page copy. No
city is claimed as an office, so no city-level modifier is targeted.

---

## 4. Structured data

| Schema | Where | Notes |
|---|---|---|
| `ProfessionalService` | every route (root layout) | now carries `logo` and `image` pointing at the real emblem and OG card |
| `WebSite` | every route (root layout) | added this pass |
| `BreadcrumbList` | every route below the root | |
| `Service` | each of the six service pages | |
| `Person` | `/company/people` | added this pass — name, jobTitle, url, image, worksFor only |
| `CreativeWork` | case studies and research workbooks | |

**Deliberately omitted, because none is verified:** `address`, `telephone`,
`legalName`, `foundingDate`, `numberOfEmployees`, `aggregateRating`, `review`,
`award`, `vatID`, `taxID`. Structured data is not a place to guess.

---

## 5. Sitemap, robots and canonicals

- **Sitemap:** 30 URLs. Every entry verified 200, canonical-host and indexable.
- Unpublished legal routes (`/legal/cookies`, `/legal/accessibility`) are excluded — they 404 rather than existing as empty shells.
- `lastmod` is emitted per entry.

**robots.txt**

```
User-Agent: *
Allow: /

Host: https://xiyato.uk
Sitemap: https://xiyato.uk/sitemap.xml
```

---

## 6. Redirect integrity — five rules corrected

Legacy `/projects/*` redirects still pointed at work categories that no longer
exist. They returned 308 and then 200, so a status check alone would have passed
them — but the filter value was ignored and the visitor landed on the unfiltered
archive instead of the category they asked for.

| Source | Was | Now |
|---|---|---|
| `/projects/videos` | `?category=visual-content` | `?category=video` |
| `/projects/visualisations` | `?category=visual-content` | `?category=visualisation` |
| `/projects/b2b-research` | `?category=growth-operations` | `?category=growth-b2b` |
| `/projects/b2b-research/:slug` | `?category=growth-operations` | `?category=growth-b2b` |
| `/projects/websites` | `?category=multi-disciplinary` | `?category=websites` |

---

## 7. Internal linking

- Each Work category chapter links to the service that produced it (six links, one per category).
- Each homepage service chapter links to its service page and to its proof anchor.
- Service pages link to their work category and their published evidence.
- The footer carries a full crawlable index of services, work categories and company routes.
- The homepage keeps a screen-reader-only crawlable list of all six service pages, independent of the on-page anchors.

---

## 8. Google Search Console and Bing — not performed

**No verification, submission or indexing request was made, and none is claimed.**

Both require an authenticated browser session on the owner's Google and Microsoft
accounts. This environment has an in-app browser with no such session, and signing
in would mean handling the owner's credentials — which is out of bounds. Domain
verification additionally needs a DNS TXT record at the registrar.

The exact steps are in `OPEN_ACTIONS.md`. Everything that does not require that
access — sitemap correctness, robots, canonicals, schema, metadata, redirect
integrity, crawlable markup — is done and verified above.

**No baseline query data could be captured**, because that data lives inside Search
Console. The keyword clusters in section 3 are therefore hypotheses derived from
the brief and the real service content — not observed impressions. They should be
replaced with actual queries once Search Console has collected data.

**IndexNow** was evaluated and not implemented: it needs a key file and a
submission step on every deploy, which is not worth the moving parts for a
39-page static site whose sitemap is already correct.

---

## 9. Known SEO limitations

- Search Console and Bing Webmaster Tools are unverified — see above.
- No query data exists yet, so keyword targeting is unvalidated.
- `www.xiyato.uk` and `chaitanya-gaikwad.vercel.app` still need 301s to the canonical host. Self-referencing canonicals mitigate duplicate-content risk but do not consolidate signals.
- Automation has no published case study, so that service page has no portfolio evidence to rank on. Stated plainly on the page rather than padded.
- Core Web Vitals are not measured here: field data requires real traffic. Structurally, no video loads before a click, images carry dimensions, decoration is SVG/CSS only, and animation is transform/opacity.