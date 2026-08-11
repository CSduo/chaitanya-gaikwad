# XIYÀTO — PROPOSED INFORMATION ARCHITECTURE

**Stage:** Information architecture only
**Date:** 2026-08-11
**Status:** PROPOSAL — awaiting approval before visual design, copywriting, or implementation

**Scope discipline applied throughout this document:**
No final copy. No portfolio projects assigned. No clients, people, addresses, registration details, testimonials, or metrics invented. No existing content evaluated, moved, or deleted. Where the specification is silent or ambiguous, the gap is marked **[DECISION REQUIRED]** rather than filled in.

Placeholder convention: `{{TO BE SUPPLIED}}` marks a slot the architecture reserves but does not populate.

---

# 1. PROPOSED PRIMARY SITEMAP

```
XIYÀTO
│
├── HOME                                    /
│
├── SERVICES                                /services
│   ├── CAD & Technical Production          /services/cad-technical-production
│   ├── Growth Operations                   /services/growth-operations
│   └── Visual Content                      /services/visual-content
│
├── WORK                                    /work
│   └── Case study (template, ×N)           /work/{project-slug}
│
├── COMPANY                                 /company
│   ├── About XIYÀTO                        /company/about
│   ├── Founder & People                    /company/people
│   └── Locations                           /company/locations
│
├── CAREERS                                 /careers
│
├── CONTACT                                 /contact
│
└── LEGAL                                   (footer-linked, not in header)
    ├── Privacy Policy                      /legal/privacy
    ├── Terms of Use                        /legal/terms
    ├── Cookie Policy                       /legal/cookies
    ├── Accessibility Statement             /legal/accessibility
    └── Company Information                 /legal/company-information
```

**Structural facts**

| Metric | Value |
|---|---|
| Primary navigation areas | 5 (Services, Work, Company, Careers, Contact) |
| Top-level pages | 7 (Home + 5 nav areas + Legal group) |
| Fixed pages at launch | 13 (+ N case studies) |
| Maximum depth | 3 levels (Home → Section → Page) |
| Templated/repeating page types | 1 (case study) |
| Pages carrying a conversion CTA | **all of them** |

**Depth rule:** nothing sits deeper than level 3. Any future expansion that would require level 4 is a signal that a new level-1 area is needed instead.

---

# 2. PROPOSED NAVIGATION HIERARCHY

## 2.1 — Global header

```
[XIYÀTO]     Work   Services ▾   Company ▾   Careers   Contact     [ Start a project ]
```

| Slot | Type | Target | Dropdown |
|---|---|---|---|
| Brand / logo | link | `/` | — |
| Work | link | `/work` | none (see 2.3) |
| Services | link + dropdown | `/services` | 4 items |
| Company | link + dropdown | `/company` | 4 items |
| Careers | link | `/careers` | none |
| Contact | link | `/contact` | none |
| Primary CTA | button | `/contact` (project enquiry) | — |

**Header behaviour requirements (structural, not visual):**
- Persistent across every primary page, including case studies and legal pages
- Parent items are themselves links, not dropdown-only triggers — `/services` and `/company` must be reachable directly
- Active-state indication required for the current section (the current site has none)
- Keyboard operable end to end; visible focus state mandatory on every item
- Dropdowns openable by keyboard and dismissible with `Esc`

## 2.2 — Dropdown contents

**Services ▾**
| Item | Target |
|---|---|
| Services Overview | `/services` |
| CAD & Technical Production | `/services/cad-technical-production` |
| Growth Operations | `/services/growth-operations` |
| Visual Content | `/services/visual-content` |

**Company ▾**
| Item | Target |
|---|---|
| Company Overview | `/company` |
| About XIYÀTO | `/company/about` |
| Founder & People | `/company/people` |
| Locations | `/company/locations` |

## 2.3 — Work: no dropdown

Work is a single index page with an on-page filter system. Putting categories in a dropdown would duplicate the filter and create two competing entry paths into the same content. **[DECISION REQUIRED]** — if you want category shortcuts in the header, the alternative is a Work ▾ dropdown containing: Work Overview, Technical Production, Growth Operations, Visual Content, Multi-disciplinary Engagements.

## 2.4 — Ordering discrepancy in the specification

**[DECISION REQUIRED]** The brief specifies two different orders:

- *Global website architecture:* HOME · **SERVICES** · **WORK** · COMPANY · CAREERS · CONTACT · LEGAL
- *Global header:* brand · **Work** · **Services** · Company · Careers · Contact · CTA

This document uses the **header order (Work first)** because that section is explicitly about the navigation component. The sitemap in §1 uses the architecture order. Both are internally consistent; they only differ in the position of Work and Services relative to each other.

Recommendation: **Work first** in the header. It leads with proof rather than with claims, and it is the strongest differentiator for a founder-led business. Confirm or override.

## 2.5 — Secondary navigation systems

| System | Where it appears | Purpose |
|---|---|---|
| **Breadcrumbs** | all level-2 and level-3 pages | Orientation + structured-data eligibility |
| **In-page section nav** | long pages (service pages, case studies, About) | Jump-to within a page |
| **Related services** | case studies, service pages | Lateral movement |
| **Related work** | case studies, service pages | Lateral movement |
| **Footer navigation** | every page | Full site access from any depth |
| **Contextual CTA** | end of every page | Forward movement into enquiry |

**Breadcrumb patterns:**
```
Home / Services / CAD & Technical Production
Home / Work / {Project Name}
Home / Company / Founder & People
Home / Legal / Privacy Policy
```

---

# 3. PROPOSED HOMEPAGE SECTION ORDER

Twelve sections, in the sequence specified. Each entry states its structural job and the components it composes from — no copy.

| # | Section | Structural job | Composed of |
|---|---|---|---|
| **01** | **Hero** | Name the business, state what it does, offer the primary action | Brand statement slot · positioning statement slot · primary CTA · secondary CTA · hero media slot |
| **02** | **Company / value proposition introduction** | Establish XIYÀTO as a business, not an individual | Introduction block · supporting statement slots · link → `/company` |
| **03** | **Primary service areas** | Present the three service pillars as equal, navigable entities | 3 × Service card → the three service pages · link → `/services` |
| **04** | **CAD / technical production feature** | Give the most technical capability its own weight on the homepage | Feature block · capability list · media slot · link → `/services/cad-technical-production` |
| **05** | **Operating / delivery process** | Show how work is actually delivered | Process/timeline component (N steps) · link → `/services` |
| **06** | **Selected work / featured case studies** | Provide proof | 2–3 × Case-study card · link → `/work` |
| **07** | **Business capabilities / service model** | Show engagement types and how the business is structured to deliver | Capability list · engagement-model block |
| **08** | **Founder introduction** | Establish founder-led credibility | Founder card · link → `/company/people` |
| **09** | **Company / people preview** | Show the business has depth beyond one person | People preview (team + specialist network slots) · link → `/company/people` |
| **10** | **Locations / international presence** | Establish UK presence, India operations, international delivery | 2 × Location card (UK, India) · international delivery block · link → `/company/locations` |
| **11** | **Primary contact / project CTA** | Convert | Project enquiry CTA component · contact channel slots |
| **12** | **Global footer** | Full-site access + business legitimacy | Footer component (§11) |

**Narrative logic of the sequence:** what we are (01–02) → what we do (03–05) → proof that we do it (06–07) → who does it (08–09) → where we do it from (10) → how to start (11) → everything else (12).

**Constraint carried from the brief:** the homepage is a gateway, not a container. Each section is a **preview that links onward**. Full depth lives on the destination pages. The homepage must not re-host the entire Services, Work, Company, and Contact content.

---

# 4. PROPOSED SERVICES HIERARCHY

```
/services                                   SERVICES OVERVIEW
├── /services/cad-technical-production       CAD & TECHNICAL PRODUCTION
├── /services/growth-operations              GROWTH OPERATIONS
└── /services/visual-content                 VISUAL CONTENT
```

## 4.1 — Services Overview `/services`

| # | Section | Components |
|---|---|---|
| 01 | Services introduction | Page hero · introduction block |
| 02 | CAD & Technical Production overview | Service summary block · capability list · link → service page |
| 03 | Growth Operations overview | Service summary block · capability list · link → service page |
| 04 | Visual Content overview | Service summary block · capability list · link → service page |
| 05 | How engagements work | Process/timeline component · engagement-model block |
| 06 | Related work / case studies | Case-study card grid |
| 07 | Project enquiry CTA | Project enquiry CTA component |

## 4.2 — Shared service-page template

All three service pages share one template so they stay visually and structurally parallel. Sections 3–5 are the **variable slots**; everything else is fixed.

| # | Section | CAD & Technical Production | Growth Operations | Visual Content |
|---|---|---|---|---|
| 01 | Service hero | ✓ | ✓ | ✓ |
| 02 | Service overview | ✓ | ✓ | ✓ |
| 03 | **Variable slot A** | Input / source material | Research capabilities | Architectural / interior visualisation |
| 04 | **Variable slot B** | Production capabilities | Prospect / market intelligence | Product / furniture visualisation |
| 05 | **Variable slot C** | Output / drawing categories | Qualification / verification | Video / motion content |
| 06 | **Variable slot D** | Technical QA / validation | Outreach systems | Project presentation content |
| 07 | **Variable slot E** | — | Tracking / organisation | Campaign / digital assets |
| 08 | Workflow / process | ✓ | ✓ | ✓ (production process) |
| 09 | Deliverables | ✓ | ✓ | ✓ |
| 10 | Related case studies | ✓ | ✓ | ✓ |
| 11 | Engagement / project CTA | ✓ | ✓ | ✓ |

**Section counts as specified:** CAD 10 · Growth Operations 11 · Visual Content 11. The template above reconciles all three by treating the middle band as a variable-length capability sequence (4 slots for CAD, 5 for the other two).

**Structural requirement:** each service page must be able to declare which case studies belong to it, and each case study must be able to declare which services it used. This is a **two-way relationship**, not a hard-coded list on either side.

---

# 5. PROPOSED WORK / CASE-STUDY ARCHITECTURE

```
/work                                       WORK INDEX
├── (filter state)                          /work?category={slug}
└── /work/{project-slug}                    CASE STUDY (template)
```

## 5.1 — Work index `/work`

| # | Section | Components |
|---|---|---|
| 01 | Work hero | Page hero |
| 02 | Featured engagements | 2–3 × Case-study card (featured variant) |
| 03 | Project / category filtering | Filter component |
| 04 | Project grid / case-study index | Case-study card grid |
| 05 | Capabilities represented across work | Capability list |
| 06 | Contact CTA | Project enquiry CTA component |

## 5.2 — Filter taxonomy

Primary axis — **category** (mutually exclusive, one per project):

| Category | Slug |
|---|---|
| Technical Production | `technical-production` |
| Growth Operations | `growth-operations` |
| Visual Content | `visual-content` |
| Multi-disciplinary Engagements | `multi-disciplinary` |

**Filter state must be URL-addressable** (`/work?category=technical-production`) so a filtered view can be linked, shared, and indexed. **[DECISION REQUIRED]** — whether filtered views should later be promoted to real routes (`/work/category/technical-production`) with their own metadata. Recommendation: start with query parameters, keep the promotion path open.

**Secondary filter axes — [DECISION REQUIRED], architecture supports all, expose none by default:** sector · location/region · engagement type · year.

## 5.3 — Case-study template `/work/{project-slug}`

Fifteen sections, applied consistently to every major case study.

| # | Section | Components | Required |
|---|---|---|---|
| 01 | Project hero | Page hero · hero media slot | Always |
| 02 | Client / sector / location metadata | Project metadata component | Always |
| 03 | Engagement overview | Summary block | Always |
| 04 | Requirement / challenge | Content block | Always |
| 05 | Scope | Capability list | Always |
| 06 | Inputs | Content block · media slot | Conditional |
| 07 | Approach / process | Process/timeline component | Always |
| 08 | Production | Content block · media slot | Always |
| 09 | QA / validation | Content block · validation list | Conditional |
| 10 | Outputs / deliverables | Deliverables component | Always |
| 11 | Results / evidence | Case-study metrics component | Conditional |
| 12 | Visual gallery | Gallery component (image / video / document preview) | Always |
| 13 | Related capabilities | Related services component | Always |
| 14 | Related projects | Case-study card grid | Always |
| 15 | Contact / enquiry CTA | Project enquiry CTA component | Always |

**"Conditional" means the section is omitted cleanly when its data is absent** — it must never render as an empty shell or a placeholder heading.

## 5.4 — Case-study data model

Every case study is a structured record, not a hand-built page. Fields the schema must support:

| Field | Type | Required | Notes |
|---|---|---|---|
| `projectName` | string | ✓ | |
| `slug` | string | ✓ | URL segment |
| `client` | string | — | Must support an anonymised descriptor instead of a name |
| `clientAnonymised` | boolean | ✓ | Drives whether a name or a descriptor renders |
| `sector` | string | — | |
| `location` | string | — | |
| `category` | enum | ✓ | The four §5.2 categories |
| `services[]` | ref[] | ✓ | Links to service pages — powers "related" both ways |
| `date` / `dateRange` | string | — | |
| `engagementType` | enum | — | e.g. project / retained / advisory — vocabulary TBC |
| `scope[]` | string[] | — | |
| `summary` | rich text | ✓ | |
| `challenge` | rich text | — | |
| `process[]` | step[] | — | Feeds the process component |
| `inputs` | rich text + media | — | |
| `production` | rich text + media | — | |
| `qaValidation` | rich text + list | — | |
| `deliverables[]` | string[] | ✓ | |
| `metrics[]` | metric[] | — | **Empty until real evidence exists** |
| `images[]` | media[] | — | |
| `video[]` | media[] | — | |
| `documents[]` | media[] | — | Downloadable/previewable |
| `relatedProjects[]` | ref[] | — | Manual override; otherwise derived from category + services |
| `featured` | boolean | ✓ | Drives the homepage and Work-index featured slots |
| `order` | number | — | |
| `seo` | object | ✓ | Per-page title, description, canonical, share image |

**Scalability requirement:** adding a case study must be a data operation, never a code operation. Nothing in this architecture may require editing a page component to publish a new project.

---

# 6. PROPOSED COMPANY HIERARCHY

```
/company                                    COMPANY OVERVIEW
├── /company/about                          ABOUT XIYÀTO
├── /company/people                         FOUNDER & PEOPLE
└── /company/locations                      LOCATIONS
```

## 6.1 — Company Overview `/company`

Hub page. Every section is a preview that links to its full destination.

| # | Section | Components | Links to |
|---|---|---|---|
| 01 | Company hero | Page hero | — |
| 02 | Company introduction | Introduction block | `/company/about` |
| 03 | What XIYÀTO does | Capability list · service cards | `/services` |
| 04 | Who XIYÀTO works with | Client/sector list | — |
| 05 | Operating model | Content block | `/company/about` |
| 06 | Values / working principles | Principles list | `/company/about` |
| 07 | Founder preview | Founder card | `/company/people` |
| 08 | People / specialist network preview | People card grid | `/company/people` |
| 09 | Locations | 2 × Location card | `/company/locations` |
| 10 | Careers preview | Careers preview block | `/careers` |
| 11 | Contact CTA | Project enquiry CTA | `/contact` |

## 6.2 — About XIYÀTO `/company/about`

| # | Section | Components |
|---|---|---|
| 01 | About hero | Page hero |
| 02 | Company story | Narrative block |
| 03 | Purpose | Content block |
| 04 | Business model | Content block · engagement-model component |
| 05 | Industries served | Sector list |
| 06 | How the company operates | Operating-model block |
| 07 | Working principles | Principles list |
| 08 | Technology / systems approach | Content block · capability list |
| 09 | Geographic operating model | Location summary · international delivery block |
| 10 | Founder / people links | Founder card · link → `/company/people` |
| 11 | Contact CTA | Project enquiry CTA |

**Separation of concerns between §6.1 and §6.2:** `/company` answers *"what is this business?"* in previews. `/company/about` answers *"how does this business actually work?"* in full. They must not duplicate each other's content — the overview links, the about page explains.

---

# 7. PROPOSED FOUNDER & PEOPLE HIERARCHY

`/company/people`

| # | Section | Components | Population rule |
|---|---|---|---|
| 01 | People hero | Page hero | — |
| 02 | Founder section | Founder card (expanded) | One founder record |
| 03 | Founder biography | Biography block | `{{TO BE SUPPLIED}}` |
| 04 | Founder responsibilities / role | Role/responsibility list | `{{TO BE SUPPLIED}}` |
| 05 | Team / people section | People card grid | **Renders only when ≥1 team record exists** |
| 06 | Specialist network / collaborators | People card grid (specialist variant) | **Renders only when ≥1 specialist record exists** |
| 07 | Working-with-us link | Content block → `/careers` | — |
| 08 | Careers CTA | Careers CTA component | — |

## 7.1 — People data model

| Field | Type | Notes |
|---|---|---|
| `name` | string | |
| `slug` | string | Reserved for a future individual profile page |
| `role` | string | |
| `type` | enum | `founder` \| `team` \| `specialist` \| `advisor` |
| `discipline[]` | string[] | Maps to careers disciplines and service areas |
| `location` | ref | Links to a location record |
| `biography` | rich text | |
| `responsibilities[]` | string[] | |
| `image` | media | |
| `links[]` | link[] | Professional channels |
| `visible` | boolean | Controls publication |
| `order` | number | |

## 7.2 — Empty-state rules

**No person, role, title, or headcount is invented at this stage.** Sections 05 and 06 must degrade cleanly:
- 0 records → section does not render at all
- 1+ records → section renders as a grid

The architecture must never require a minimum number of people to look correct. A founder-only state and a founder-plus-fifteen state must both be structurally valid.

---

# 8. PROPOSED LOCATIONS HIERARCHY

`/company/locations`

| # | Section | Components | Population rule |
|---|---|---|---|
| 01 | Locations hero | Page hero | — |
| 02 | United Kingdom presence | Location card (expanded) | `{{TO BE SUPPLIED}}` |
| 03 | India presence | Location card (expanded) | `{{TO BE SUPPLIED}}` |
| 04 | International delivery model | Content block · delivery-model component | — |
| 05 | Contact details by location | Contact block × N | `{{TO BE SUPPLIED}}` |
| 06 | Business correspondence information | Correspondence block | `{{TO BE SUPPLIED}}` |
| 07 | Map / location presentation | Map component | **Conditional — see 8.3** |
| 08 | General enquiry CTA | Contact CTA component | — |

## 8.1 — Location data model

| Field | Type | Notes |
|---|---|---|
| `name` | string | e.g. United Kingdom |
| `slug` | string | |
| `type` | enum | `registered` \| `operations` \| `correspondence` \| `delivery` — **[DECISION REQUIRED]**, vocabulary must be legally accurate and will follow your input |
| `addressLines[]` | string[] | `{{TO BE SUPPLIED}}` |
| `region` / `country` | string | |
| `phone[]` | string[] | |
| `email` | string | |
| `hours` / `timezone` | string | |
| `mapEnabled` | boolean | |
| `correspondenceNote` | rich text | |
| `order` | number | |

## 8.2 — Non-invention constraint

Addresses, phone numbers, correspondence terms, and the legal characterisation of each location **will be supplied separately**. The architecture reserves the slots and enforces nothing about their contents. Until supplied, location cards must render in an explicit incomplete state rather than with placeholder text that could be mistaken for real detail.

## 8.3 — Map conditionality

A map is only appropriate where an address is public and visitable. **[DECISION REQUIRED]** per location. The `mapEnabled` flag exists so this is a data decision, not a layout decision.

---

# 9. PROPOSED CAREERS HIERARCHY

`/careers` — single page at launch, with a reserved expansion route.

| # | Section | Components | Population rule |
|---|---|---|---|
| 01 | Careers hero | Page hero | — |
| 02 | Working at / with XIYÀTO | Content block · principles list | — |
| 03 | Areas of expertise / disciplines | Discipline list | Maps to the three service areas |
| 04 | Current opportunities | Role card list | **See 9.2 — zero-state required** |
| 05 | Project-based / specialist opportunities | Role card list (specialist variant) | Zero-state required |
| 06 | Talent network | Talent-network block + form entry | Always available |
| 07 | Application / portfolio submission | Submission form + file upload | Always available |
| 08 | Careers contact | Contact block | `{{TO BE SUPPLIED}}` |
| 09 | Equal opportunity / employment statement | Legal statement block | **[DECISION REQUIRED]** — see 9.4 |

## 9.1 — Role data model

| Field | Type | Notes |
|---|---|---|
| `title` | string | |
| `slug` | string | Reserved for `/careers/{role-slug}` |
| `employmentType` | enum | `permanent` \| `contract` \| `freelance-project` |
| `discipline` | enum | Maps to service areas |
| `location` | ref | Location record, or `remote` |
| `status` | enum | `open` \| `closed` \| `always-accepting` |
| `summary` / `description` | rich text | |
| `applicationRoute` | enum | Form \| email \| external |
| `postedDate` / `closingDate` | date | |

**Expansion route reserved:** `/careers/{role-slug}` for individual role pages. Not built at launch; the slug field exists so it can be added without restructuring.

## 9.2 — Zero-vacancy state is the default

The brief is explicit that a Careers section does not imply vacancies exist. Sections 04 and 05 must have a **designed zero-state** that routes visitors to the talent network (06) instead — not an empty container, and not a hidden section. The page must be fully coherent with zero open roles.

## 9.3 — Careers is a separate contact channel

Careers submissions must not enter the project-enquiry pipeline. Separate form, separate destination, separate confirmation state.

## 9.4 — Employment statement

**[DECISION REQUIRED]** Whether an equal-opportunity or general employment statement is included, and its wording, depends on jurisdiction and on your legal position across UK and India. The architecture reserves the slot. Content will not be drafted without your instruction.

---

# 10. PROPOSED CONTACT HIERARCHY

`/contact` — built as a business enquiry system, not a personal message form.

| # | Section | Components |
|---|---|---|
| 01 | Contact hero | Page hero |
| 02 | Project enquiry | Enquiry form (multi-field, see 10.1) |
| 03 | Service selection | Form field — service area picker |
| 04 | Company / client information | Form fieldset |
| 05 | Project brief | Form fieldset |
| 06 | Timeline | Form field |
| 07 | File / brief upload | File upload component |
| 08 | General contact information | Contact block |
| 09 | Email contact | Email channel list |
| 10 | United Kingdom contact / location | Location card |
| 11 | India contact / location | Location card |
| 12 | Careers contact | Contact block → `/careers` |
| 13 | Social / professional channels | Channel list |
| 14 | Form confirmation state | Confirmation component |

## 10.1 — Project enquiry form — structural field groups

Field *groups* and their behaviour are architecture. Exact labels, validation copy, and confirmation wording are **copy stage, not now**.

| Group | Fields (structural) | Required |
|---|---|---|
| Contact identity | name, email, phone (optional) | name + email |
| Company / client | company name, role, country/region, sector | **[DECISION REQUIRED]** |
| Enquiry classification | service area (maps to the 3 services), engagement type | service area |
| Project brief | free-text brief, scope indication | brief |
| Timeline | expected start, expected duration | — |
| Attachments | file upload, multiple, type + size constrained | — |
| Consent | privacy acknowledgement → `/legal/privacy` | ✓ |

## 10.2 — Required form states

Every one of these must be designed; the current site has none of them because it has no forms:

`empty` · `focused` · `filled` · `field-level validation error` · `form-level error` · `submitting` · `success / confirmation` · `submission failed with a recovery path`

## 10.3 — Channel separation

Four distinct channels, as specified. Exact addresses **will be supplied separately**.

| Channel | Purpose | Destination |
|---|---|---|
| General enquiries | Non-project contact | `{{TO BE SUPPLIED}}` |
| Project enquiries | New business — primary CTA target | `{{TO BE SUPPLIED}}` |
| Careers | Applications, talent network | `{{TO BE SUPPLIED}}` |
| Founder / direct | **[DECISION REQUIRED]** whether exposed publicly | `{{TO BE SUPPLIED}}` |

## 10.4 — Supporting requirements

- Spam protection required (mechanism **[DECISION REQUIRED]**)
- File upload needs a defined storage destination, size cap, and accepted types — **[DECISION REQUIRED]**
- Submissions need a defined recipient and retention position, which interacts with `/legal/privacy`
- Every existing direct channel (messaging, social) is **retained alongside** the form, not replaced by it

---

# 11. PROPOSED FOOTER HIERARCHY

A business footer, structured in four bands.

```
┌─ BAND 1 — BRAND ────────────────────────────────────────────────────┐
│  XIYÀTO wordmark                                                     │
│  Business descriptor slot                                            │
│  Professional / social channels                                      │
└──────────────────────────────────────────────────────────────────────┘
┌─ BAND 2 — NAVIGATION (4 columns) ───────────────────────────────────┐
│  SERVICES          WORK              COMPANY          CONNECT        │
│  Overview          All work          Overview         Contact        │
│  CAD & Technical   Technical Prod.   About XIYÀTO     Careers        │
│  Growth Ops        Growth Ops        Founder & People General email  │
│  Visual Content    Visual Content    Locations        Project email  │
│                    Multi-disciplinary                 Careers email  │
└──────────────────────────────────────────────────────────────────────┘
┌─ BAND 3 — LOCATIONS ────────────────────────────────────────────────┐
│  UNITED KINGDOM                      INDIA                           │
│  {{TO BE SUPPLIED}}                  {{TO BE SUPPLIED}}              │
│  International delivery statement slot                               │
└──────────────────────────────────────────────────────────────────────┘
┌─ BAND 4 — LEGAL ────────────────────────────────────────────────────┐
│  Privacy · Terms · Cookies · Accessibility · Company Information     │
│  © {year} XIYÀTO                                                     │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  LEGAL / COMPANY INFORMATION AREA                              │ │
│  │  Reserved. Must accommodate future formal registration         │ │
│  │  details without redesign. Renders only when populated.        │ │
│  └────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
```

## 11.1 — The reserved legal block

This is an explicit requirement in the brief and drives a hard architectural constraint.

- It is a **first-class region of Band 4**, not an afterthought appended below the copyright
- It must accept a variable number of lines: registered company name, registration number, registered office address, VAT/tax identifiers, regulatory statements, jurisdiction-specific notices
- It must render nothing at all when unpopulated — no placeholder, no empty box
- Adding these details later must be a **content operation only**; no layout, spacing, or component change may be required

## 11.2 — Copyright year

Derived from the current date at build/render time. Never hard-coded.

---

# 12. PROPOSED LEGAL HIERARCHY

```
/legal/privacy                 Privacy Policy
/legal/terms                   Terms of Use
/legal/cookies                 Cookie Policy
/legal/accessibility           Accessibility Statement
/legal/company-information     Legal / Company Information
```

| Page | Route | Trigger for content | Status |
|---|---|---|---|
| Privacy Policy | `/legal/privacy` | **Required** the moment the contact form collects data | Route reserved |
| Terms of Use | `/legal/terms` | Required for a business site | Route reserved |
| Cookie Policy | `/legal/cookies` | Required if analytics or non-essential cookies are introduced | Route reserved |
| Accessibility Statement | `/legal/accessibility` | Recommended for a UK-facing business | **[DECISION REQUIRED]** |
| Company Information | `/legal/company-information` | Required once formal registration exists | **[DECISION REQUIRED]** — may remain unpublished until then |

**Shared legal page template:** page hero · last-updated date · body content · related legal pages · contact route for legal queries.

**[DECISION REQUIRED]** — whether a `/legal` index hub page is wanted. Not required; the footer links each page directly. Recommendation: skip it unless the legal set grows past five documents.

**Constraint:** no legal text is drafted at this stage. These are routes, templates, and footer integration only. Legal content requires qualified input, particularly across two jurisdictions.

---

# 13. REUSABLE COMPONENT INVENTORY

Grouped by layer. Every component listed in the brief is included; components marked ⊕ are structural additions required to make the specified set function.

## 13.1 — Layout & global

| Component | Used by | Variants |
|---|---|---|
| Global header | all pages | default, condensed |
| Navigation dropdown | header | services, company |
| Mobile navigation | all pages (<breakpoint) | — |
| Global footer | all pages | — |
| Breadcrumbs | level-2 and level-3 pages | — |
| Page hero ⊕ | every page | home, section, service, case study, legal |
| Section header ⊕ | throughout | with/without eyebrow, with/without link |
| Content block ⊕ | throughout | text, text+media, two-column |

## 13.2 — Cards

| Component | Used by | Variants |
|---|---|---|
| Service card | home, services, company | default, compact, featured |
| Case-study card | home, work, services, case studies | default, featured, compact |
| Location card | home, locations, contact, footer | summary, expanded |
| Founder card | home, company, people | preview, expanded |
| People / team card | company, people | team, specialist, advisor |
| Role card ⊕ | careers | permanent, contract, freelance |

## 13.3 — Content structures

| Component | Used by |
|---|---|
| Process / timeline section | home, services ×4, case studies |
| Deliverables section | services ×3, case studies |
| Capability list | home, services, work, company, case studies |
| Case-study metrics | case studies, home *(renders only with real data)* |
| Project metadata | case studies |
| Client / company metadata | case studies |
| Gallery ⊕ | case studies, service pages |
| Media block ⊕ (image / video / document preview) | throughout |
| Principles / values list ⊕ | company, about, careers |
| Engagement-model block ⊕ | home, services, about |

## 13.4 — Relationship & navigation

| Component | Used by |
|---|---|
| Related work | case studies, service pages |
| Related services | case studies, work index |
| Filter / category system ⊕ | work index |
| In-page section navigation ⊕ | long pages |

## 13.5 — Conversion

| Component | Used by | Variants |
|---|---|---|
| Project enquiry CTA | every page | full-width band, inline, compact |
| Contact form | contact | project enquiry |
| Careers form ⊕ | careers | application, talent network |
| File upload ⊕ | contact, careers |
| Form field set ⊕ | all forms | text, textarea, select, checkbox, file |
| Form state display ⊕ | all forms | error, submitting, success, failure |
| Contact block ⊕ | contact, locations, footer, careers |
| Channel list ⊕ | contact, footer | email, social/professional |

## 13.6 — Legal & system

| Component | Used by |
|---|---|
| Legal information block | footer, company information |
| Legal page template ⊕ | 5 legal pages |
| Empty state ⊕ | careers, people, filtered work |
| Error page template ⊕ | see §15.5 |

**Component count:** 21 specified + 20 structural additions = **41 reusable components**.

**Governing rule:** no page may introduce a bespoke one-off pattern. If a page needs something not in this inventory, the inventory gains a component — the page does not gain an exception.

---

# 14. MOBILE NAVIGATION ARCHITECTURE

## 14.1 — Collapsed state (header bar)

```
[XIYÀTO]                                        [☰]
```
Brand → `/` · menu trigger. **[DECISION REQUIRED]** — whether a persistent compact CTA sits in the bar alongside the trigger. Recommendation: yes, given that project enquiry is the primary business goal.

## 14.2 — Expanded state (full-screen panel)

```
┌──────────────────────────────────────────┐
│  [XIYÀTO]                          [✕]   │
├──────────────────────────────────────────┤
│  Work                                 →  │
│  Services                             ▾  │
│     Services Overview                    │
│     CAD & Technical Production           │
│     Growth Operations                    │
│     Visual Content                       │
│  Company                              ▾  │
│     Company Overview                     │
│     About XIYÀTO                         │
│     Founder & People                     │
│     Locations                            │
│  Careers                              →  │
│  Contact                              →  │
├──────────────────────────────────────────┤
│  [  Start a project  ]                   │
├──────────────────────────────────────────┤
│  General enquiries    {{TO BE SUPPLIED}} │
│  Project enquiries    {{TO BE SUPPLIED}} │
│  United Kingdom · India                  │
│  Professional channels                   │
└──────────────────────────────────────────┘
```

## 14.3 — Sub-navigation pattern

Services and Company expand as **in-panel accordions**. No second-level slide-in panel — it adds a navigation state without adding clarity at this depth.

Parent rows are **split targets**: the label navigates to the parent page, the chevron expands the children. A parent must never be reachable only by expanding it.

**[DECISION REQUIRED]** — whether Services and Company are expanded by default (all destinations visible immediately, longer panel) or collapsed by default (shorter panel, one extra tap). Recommendation: **expanded by default** — the panel still fits, and it makes the full business structure legible at a glance, which is the point of the remodel.

## 14.4 — Behavioural requirements

These are stated explicitly because the audit found every one of them absent today:

| Requirement | Current site |
|---|---|
| Body scroll locked while the panel is open | absent |
| Dismissible by backdrop tap | absent |
| Dismissible by `Esc` | absent |
| Focus moves into the panel on open | absent |
| Focus trapped within the panel while open | absent |
| Focus returns to the trigger on close | absent |
| Exit animation on close | absent |
| Active section indicated | absent |
| Visible focus state on every item | absent |
| Nav links not duplicated in the DOM between desktop and mobile | absent |
| Minimum 44 × 44 px touch target on every item | absent |

## 14.5 — Breakpoint

**[DECISION REQUIRED]** The current site switches at 768 px, which places tablet-portrait on the desktop nav. Recommendation: evaluate 1024 px so that tablet portrait receives the mobile pattern. To be settled at visual design stage, not now.

---

# 15. URL / ROUTE NAMING PROPOSAL

## 15.1 — Conventions

| Rule | Value |
|---|---|
| Case | lowercase only |
| Word separator | hyphen |
| Trailing slash | none |
| Depth limit | 3 segments |
| Routing style | **real paths, not hash fragments** |
| Rendering | server-rendered or pre-rendered HTML — each route must return real content to a crawler |
| Status codes | real ones — 200 for real pages, **404 for unknown paths** |
| Canonical | one self-referencing canonical per route, on the primary host |
| Metadata | unique title + description + share image per route |

## 15.2 — Complete route table

| # | Route | Page | Level | Type |
|---|---|---|---|---|
| 1 | `/` | Home | 1 | Static |
| 2 | `/services` | Services Overview | 1 | Static |
| 3 | `/services/cad-technical-production` | CAD & Technical Production | 2 | Static |
| 4 | `/services/growth-operations` | Growth Operations | 2 | Static |
| 5 | `/services/visual-content` | Visual Content | 2 | Static |
| 6 | `/work` | Work Index | 1 | Static + filter state |
| 7 | `/work/{project-slug}` | Case Study | 2 | **Templated ×N** |
| 8 | `/company` | Company Overview | 1 | Static |
| 9 | `/company/about` | About XIYÀTO | 2 | Static |
| 10 | `/company/people` | Founder & People | 2 | Static |
| 11 | `/company/locations` | Locations | 2 | Static |
| 12 | `/careers` | Careers | 1 | Static |
| 13 | `/contact` | Contact | 1 | Static + form |
| 14 | `/legal/privacy` | Privacy Policy | 2 | Static |
| 15 | `/legal/terms` | Terms of Use | 2 | Static |
| 16 | `/legal/cookies` | Cookie Policy | 2 | Static |
| 17 | `/legal/accessibility` | Accessibility Statement | 2 | Static |
| 18 | `/legal/company-information` | Company Information | 2 | Static |

## 15.3 — Naming rationale

| Route | Why |
|---|---|
| `/work` not `/portfolio` or `/projects` | The brief requires replacing the personal-portfolio feeling. "Work" reads as business engagement |
| `/services/cad-technical-production` | Matches the service name exactly; descriptive and unambiguous. **[DECISION REQUIRED]** — shorter alternative `/services/cad` is available if you prefer terser URLs |
| `/company` not `/about` | "Company" is the parent area; `/company/about` sits beneath it. Using `/about` at level 1 would collide with the sub-page |
| `/legal/*` grouped | Keeps the footer legal set contained and lets the group grow without polluting the root |
| `/careers` not `/jobs` | Supports the full brief — permanent, contract, freelance, and talent network — where "jobs" implies vacancies only |

## 15.4 — Reserved routes (not built now, names protected)

`/insights` · `/resources` · `/partnerships` · `/careers/{role-slug}` · `/company/people/{person-slug}` · `/work/category/{category-slug}` · `/portal` · `/{locale}/` prefix for future localisation

Reserving these prevents a future collision with a case-study slug or a service slug.

## 15.5 — Structural utilities *(additions beyond the specification — flagged for approval)*

The brief does not mention these. They are proposed because the audit found their absence to be an active defect, and because a business site cannot function correctly without them. **All four require your approval; none is assumed.**

| Route / file | Purpose | Why proposed |
|---|---|---|
| `/404` | Genuine not-found page returning HTTP 404 | Every URL currently returns 200 + the homepage |
| `/sitemap.xml` | Generated from the route table | Currently absent |
| `/robots.txt` | Crawler directives | Currently absent |
| `/site.webmanifest` | Icons and install metadata | Currently absent |

## 15.6 — Host and canonicalisation policy

**[DECISION REQUIRED]** — one primary host must be chosen; the architecture assumes `xiyato.uk`.

| Rule | Requirement |
|---|---|
| Primary host | One canonical host, all others 301 to it |
| `www` | Single permanent redirect in one direction |
| Deployment host | Must not serve the site publicly and unredirected |
| `http` → `https` | Permanent redirect (already correct today) |
| Legacy URLs | If existing URLs are retired, each needs a defined 301 target — **redirect map to be produced before launch, not now** |

---

# 16. CONTENT HIERARCHY — DOMAIN SEPARATION

The brief requires eight domains to be structurally distinct rather than merged into one long homepage.

| Domain | Owned by | Previewed on the homepage |
|---|---|---|
| **Company information** | `/company`, `/company/about` | §02 |
| **Services** | `/services` + 3 service pages | §03, §04 |
| **Proof / work** | `/work` + case studies | §06 |
| **People** | `/company/people` | §08, §09 |
| **Locations** | `/company/locations` | §10 |
| **Careers** | `/careers` | via `/company` §10 |
| **Contact** | `/contact` | §11 |
| **Legal** | `/legal/*` | footer only |

**Rule:** the homepage may **preview** any domain. It may not **own** one. Every homepage section resolves to a destination page that holds the full content, and no content exists solely on the homepage.

---

# 17. SCALABILITY POSITION

What the architecture must absorb later without restructuring:

| Future addition | How it is absorbed | Blocked? |
|---|---|---|
| Additional services | New child under `/services`, new dropdown item, new work category | No |
| Additional team members | New people records; sections already grid-based | No |
| Additional locations | New location records; footer band and locations page already repeat | No |
| Additional case studies | New data records via `/work/{slug}` | No |
| Insights / articles | New level-1 area at `/insights`; route reserved | No |
| Resources | New level-1 area at `/resources`; route reserved | No |
| Partnerships | Level-1 area or a `/company` child; both available | No |
| Formal registration details | Reserved footer legal block + `/legal/company-information` | No |
| Client portal / project systems | `/portal` reserved; sits outside the marketing IA | No |
| Localisation | `/{locale}/` prefix reserved | No |
| Individual role pages | `/careers/{role-slug}` reserved | No |
| Individual person profiles | `/company/people/{person-slug}` reserved | No |

**The two hard constraints that keep this true:**
1. Case studies, people, roles, and locations are **data records**, never hand-built pages.
2. The footer legal block is a **first-class region** sized for content that does not exist yet.

---

# 18. OPEN DECISIONS REQUIRING YOUR INPUT

Nothing below has been decided or invented.

| # | Decision | Ref | Recommendation |
|---|---|---|---|
| 1 | Header order — Work first or Services first? Spec contradicts itself | §2.4 | Work first |
| 2 | Does Work get a header dropdown? | §2.3 | No |
| 3 | Work filters — query params now, real routes later? | §5.2 | Query params first |
| 4 | Which secondary filter axes to expose (sector / location / type / year)? | §5.2 | None at launch |
| 5 | Engagement-type vocabulary for case studies | §5.4 | Awaiting your terms |
| 6 | Location `type` vocabulary — must be legally accurate | §8.1 | Awaiting your input |
| 7 | Map shown per location? | §8.3 | Per-location flag |
| 8 | Equal-opportunity / employment statement included? | §9.4 | Awaiting your position |
| 9 | Is a founder/direct contact channel public? | §10.3 | — |
| 10 | Company/client fields required or optional on the enquiry form? | §10.1 | — |
| 11 | File upload — destination, size cap, accepted types | §10.4 | — |
| 12 | Spam-protection mechanism | §10.4 | — |
| 13 | Accessibility statement — include? | §12 | Yes, UK-facing |
| 14 | Company Information page — publish now or hold? | §12 | Hold until registration exists |
| 15 | `/legal` index hub page? | §12 | Skip |
| 16 | Persistent CTA in the mobile header bar? | §14.1 | Yes |
| 17 | Mobile sub-nav expanded or collapsed by default? | §14.3 | Expanded |
| 18 | Mobile breakpoint — 768 px or 1024 px? | §14.5 | Evaluate 1024 |
| 19 | Service slug length — full or terse | §15.3 | Full |
| 20 | **Approve the four structural utilities (404, sitemap, robots, manifest)** | §15.5 | Approve |
| 21 | Primary canonical host | §15.6 | `xiyato.uk` |
| 22 | Do any current URLs need preserving via 301? | §15.6 | Map before launch |

---

# 19. WHAT THIS DOCUMENT DELIBERATELY DOES NOT CONTAIN

Per the brief:

- No final or draft marketing copy
- No portfolio projects assigned to any category or case study
- No client names, real or anonymised
- No team members, job titles, or headcount
- No addresses, phone numbers, or email addresses
- No company registration or legal identifiers
- No testimonials
- No performance metrics or evidence figures
- No judgement on which existing content stays, moves, or goes
- No visual design, layout, typography, or colour decisions
- No implementation

**Next stage begins only on your approval of this architecture.**
