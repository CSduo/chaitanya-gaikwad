# XIYÀTO — APPROVED INFORMATION ARCHITECTURE

**Status:** APPROVED — supersedes `IA_01_PROPOSED_ARCHITECTURE.md`
**Stage:** Information architecture only
**Date:** 2026-08-11
**Canonical host:** `https://xiyato.uk`

All decisions raised in IA_01 have been resolved by the owner and are incorporated below. Resolved `[DECISION REQUIRED]` markers have been removed. The marker is retained **only** where a real fact has not yet been supplied — addresses, email addresses, legal registration details, storage provider, and comparable operational information.

**Scope discipline maintained:** no final copy, no visual direction, no implementation, no live-site changes. No client, person, address, registration detail, testimonial, or metric is invented. Placeholder convention: `{{TO BE SUPPLIED}}`.

---

# 1. FINAL SITEMAP

```
XIYÀTO — https://xiyato.uk
│
├── HOME                                    /
│
├── WORK                                    /work
│   └── Case study (template, ×N)           /work/{project-slug}
│
├── SERVICES                                /services
│   ├── CAD & Technical Production          /services/cad-technical-production
│   ├── Growth Operations                   /services/growth-operations
│   └── Visual Content                      /services/visual-content
│
├── COMPANY                                 /company          ← complete Company / About page
│   ├── Founder & People                    /company/people
│   └── Locations                           /company/locations
│
├── CAREERS                                 /careers
│
├── CONTACT                                 /contact
│
└── LEGAL                                   (footer-linked only — no /legal index page)
    ├── Privacy Policy                      /legal/privacy
    ├── Terms of Use                        /legal/terms
    ├── Cookie Policy                       /legal/cookies
    ├── Accessibility Statement             /legal/accessibility
    └── Company Information                 /legal/company-information
```

## 1.1 — Corrected route and page totals

IA_01 stated "13 fixed pages at launch." That figure was wrong. Corrected, with `/company/about` removed:

| Count | Value | Composition |
|---|---:|---|
| **Fixed routes defined** | **16** | 11 core + 5 legal |
| Core pages (non-legal) | 11 | Home 1 · Work index 1 · Services 4 · Company 3 · Careers 1 · Contact 1 |
| Legal routes | 5 | privacy · terms · cookies · accessibility · company-information |
| **Templated route patterns** | **1** | `/work/{project-slug}`, N instances |
| **Total route-table entries** | **17** | 16 fixed + 1 templated pattern |
| Utility routes / files | 4 | `/404` · `/sitemap.xml` · `/robots.txt` · `/site.webmanifest` |
| **Published at launch** | **13** | 11 core + Privacy + Terms |
| Deferred / conditional at launch | 3 | Cookies · Accessibility · Company Information (see §12) |
| Primary navigation areas | 5 | Work · Services · Company · Careers · Contact |
| Maximum URL depth | **2 segments** | 3 tiers including Home |
| Templated page types | 1 | Case study |

**Change from IA_01:** one fixed route removed (`/company/about`), reducing fixed routes from 17 to 16 and total route-table entries from 18 to 17. These corrected figures are used consistently throughout this document.

---

# 2. NAVIGATION HIERARCHY

## 2.1 — Global header (final)

```
[XIYÀTO]     Work   Services ▾   Company ▾   Careers   Contact     [ Start a project ]
```

| Slot | Type | Target | Dropdown |
|---|---|---|---|
| Brand / logo | link | `/` | — |
| **Work** | link | `/work` | **none** |
| **Services** | link + dropdown | `/services` | 4 items |
| **Company** | link + dropdown | `/company` | 3 items |
| Careers | link | `/careers` | none |
| Contact | link | `/contact` | none |
| Primary CTA | button | `/contact` | — |

Work precedes Services. Work has no dropdown; its category filtering lives on the Work index (§5.2).

## 2.2 — Dropdown contents (final)

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
| Company | `/company` |
| Founder & People | `/company/people` |
| Locations | `/company/locations` |

## 2.3 — Header requirements

- Present on every route, including case studies and legal pages
- Parent items are real links — `/services` and `/company` must be reachable without opening a dropdown
- Active-state indication for the current section
- Dropdowns openable and traversable by keyboard, dismissible with `Esc`, closing returns focus to the trigger
- Visible focus state on every interactive element
- Every navigation element is a real `<a>` with an `href` — no clickable-div patterns (§16)

## 2.4 — Secondary navigation systems

| System | Appears on | Purpose |
|---|---|---|
| Breadcrumbs | all level-2 pages | Orientation + `BreadcrumbList` structured data |
| In-page section navigation | service pages, case studies, `/company` | Jump-to within long pages |
| Related services | case studies, work index | Lateral movement |
| Related work | case studies, service pages | Lateral movement |
| Footer navigation | every page | Full-site access from any depth |
| Contextual CTA | every page | Forward movement into enquiry |

Breadcrumb patterns:
```
Home / Work / {Project Name}
Home / Services / CAD & Technical Production
Home / Company / Founder & People
Home / Privacy Policy
```
Legal pages carry a two-level breadcrumb because there is no `/legal` index to point at.

---

# 3. HOMEPAGE SECTION ORDER

Twelve sections, unchanged from the approved specification. Each is a **preview that links onward** — the homepage may preview any domain but may not own one.

| # | Section | Structural job | Composed of | Links to |
|---|---|---|---|---|
| 01 | Hero | Name the business, state what it does, offer the primary action | Brand statement · positioning statement · primary CTA · secondary CTA · hero media | `/contact`, `/work` |
| 02 | Company / value proposition introduction | Establish XIYÀTO as a business, not an individual | Introduction block · supporting statements | `/company` |
| 03 | Primary service areas | Present three service pillars as equal, navigable entities | 3 × Service card | `/services` + 3 service pages |
| 04 | CAD / technical production feature | Give the most technical capability dedicated weight | Feature block · capability list · media | `/services/cad-technical-production` |
| 05 | Operating / delivery process | Show how work is delivered | Process/timeline component | `/services` |
| 06 | Selected work / featured case studies | Provide proof | 2–3 × Case-study card (featured) | `/work` |
| 07 | Business capabilities / service model | Show engagement types and delivery structure | Capability list · engagement-model block | `/services` |
| 08 | Founder introduction | Establish founder-led credibility | Founder card | `/company/people` |
| 09 | Company / people preview | Show depth beyond one person | People preview grid | `/company/people` |
| 10 | Locations / international presence | Establish UK presence, India operations, international delivery | 2 × Location card · delivery block | `/company/locations` |
| 11 | Primary contact / project CTA | Convert | Project enquiry CTA · channel slots | `/contact` |
| 12 | Global footer | Full-site access + business legitimacy | Footer component (§11) | all |

**Sequence logic:** what we are (01–02) → what we do (03–05) → proof (06–07) → who does it (08–09) → where from (10) → how to start (11) → everything else (12).

**Binding constraint:** no content may exist solely on the homepage. Every section resolves to a destination page holding the full version.

---

# 4. SERVICES HIERARCHY

```
/services                                   SERVICES OVERVIEW
├── /services/cad-technical-production       CAD & TECHNICAL PRODUCTION
├── /services/growth-operations              GROWTH OPERATIONS
└── /services/visual-content                 VISUAL CONTENT
```

Full descriptive slugs are confirmed. No abbreviated variants.

## 4.1 — Services Overview `/services`

| # | Section | Components |
|---|---|---|
| 01 | Services introduction | Page hero · introduction block |
| 02 | CAD & Technical Production overview | Service summary · capability list · link → service page |
| 03 | Growth Operations overview | Service summary · capability list · link → service page |
| 04 | Visual Content overview | Service summary · capability list · link → service page |
| 05 | How engagements work | Process/timeline · engagement-model block |
| 06 | Related work / case studies | Case-study card grid |
| 07 | Project enquiry CTA | Project enquiry CTA |

## 4.2 — Shared service-page template

One template across all three pages. Sections 03–07 are variable capability slots; everything else is fixed.

| # | Section | CAD & Technical Production | Growth Operations | Visual Content |
|---|---|---|---|---|
| 01 | Service hero | ✓ | ✓ | ✓ |
| 02 | Service overview | ✓ | ✓ | ✓ |
| 03 | Variable slot A | Input / source material | Research capabilities | Architectural / interior visualisation |
| 04 | Variable slot B | Production capabilities | Prospect / market intelligence | Product / furniture visualisation |
| 05 | Variable slot C | Output / drawing categories | Qualification / verification | Video / motion content |
| 06 | Variable slot D | Technical QA / validation | Outreach systems | Project presentation content |
| 07 | Variable slot E | — | Tracking / organisation | Campaign / digital assets |
| 08 | Workflow / process | ✓ | ✓ | ✓ (production process) |
| 09 | Deliverables | ✓ | ✓ | ✓ |
| 10 | Related case studies | ✓ | ✓ | ✓ |
| 11 | Engagement / project CTA | ✓ | ✓ | ✓ |

Section totals: CAD 10 · Growth Operations 11 · Visual Content 11.

## 4.3 — Service ↔ work relationship

Two-way and data-driven. A case study declares the services it used; a service page derives its related case studies from that declaration. Neither side hard-codes a list.

---

# 5. WORK / CASE-STUDY ARCHITECTURE

```
/work                                       WORK INDEX
├── /work?category={slug}                    Filter state (URL-addressable)
└── /work/{project-slug}                     CASE STUDY (template)
```

## 5.1 — Work index `/work`

| # | Section | Components |
|---|---|---|
| 01 | Work hero | Page hero |
| 02 | Featured engagements | 2–3 × Case-study card (featured) |
| 03 | Project / category filtering | Filter component |
| 04 | Project grid / case-study index | Case-study card grid |
| 05 | Capabilities represented across work | Capability list |
| 06 | Contact CTA | Project enquiry CTA |

## 5.2 — Filtering (final)

**Query-parameter filtering at launch.** Filter state is URL-addressable so a filtered view can be linked and shared.

```
/work?category=technical-production
```

Primary axis — **category**, one per project:

| Category | Slug |
|---|---|
| Technical Production | `technical-production` |
| Growth Operations | `growth-operations` |
| Visual Content | `visual-content` |
| Multi-disciplinary Engagements | `multi-disciplinary` |

**Not exposed at launch, architecture retains full support:** sector · location/region · engagement type · year. These fields exist on every case-study record from day one, so enabling a filter later is a UI change, not a data migration.

**Reserved for later promotion:** `/work/category/{category-slug}` as indexable routes with their own metadata. Not built now.

## 5.3 — Engagement-type vocabulary (final, controlled)

| Value | Slug |
|---|---|
| Project | `project` |
| Ongoing Support | `ongoing-support` |
| Advisory / Consulting | `advisory-consulting` |

**Population rule:** `engagementType` is optional and must remain empty unless the real engagement supports the classification. The field must never be defaulted, inferred, or auto-filled. A case study with no engagement type renders without that metadata line rather than with a guess.

## 5.4 — Case-study template `/work/{project-slug}`

| # | Section | Components | Required |
|---|---|---|---|
| 01 | Project hero | Page hero · hero media | Always |
| 02 | Client / sector / location metadata | Project metadata | Always |
| 03 | Engagement overview | Summary block | Always |
| 04 | Requirement / challenge | Content block | Always |
| 05 | Scope | Capability list | Always |
| 06 | Inputs | Content block · media | Conditional |
| 07 | Approach / process | Process/timeline | Always |
| 08 | Production | Content block · media | Always |
| 09 | QA / validation | Content block · validation list | Conditional |
| 10 | Outputs / deliverables | Deliverables | Always |
| 11 | Results / evidence | Case-study metrics | Conditional |
| 12 | Visual gallery | Gallery (image / video / document) | Always |
| 13 | Related capabilities | Related services | Always |
| 14 | Related projects | Case-study card grid | Always |
| 15 | Contact / enquiry CTA | Project enquiry CTA | Always |

**Conditional** = the section is omitted entirely when its data is absent. It must never render as an empty shell, a bare heading, or a placeholder.

## 5.5 — Case-study data model

| Field | Type | Required | Notes |
|---|---|---|---|
| `projectName` | string | ✓ | |
| `slug` | string | ✓ | URL segment |
| `client` | string | — | Supports an anonymised descriptor instead of a name |
| `clientAnonymised` | boolean | ✓ | Drives name vs descriptor rendering |
| `sector` | string | — | Filter-ready, not exposed at launch |
| `location` | string | — | Filter-ready, not exposed at launch |
| `category` | enum | ✓ | The four §5.2 categories |
| `services[]` | ref[] | ✓ | Powers the two-way service relationship |
| `date` / `dateRange` | string | — | Filter-ready, not exposed at launch |
| `engagementType` | enum | — | §5.3 vocabulary; empty unless real |
| `scope[]` | string[] | — | |
| `summary` | rich text | ✓ | |
| `challenge` | rich text | — | |
| `process[]` | step[] | — | |
| `inputs` | rich text + media | — | |
| `production` | rich text + media | — | |
| `qaValidation` | rich text + list | — | |
| `deliverables[]` | string[] | ✓ | |
| `metrics[]` | metric[] | — | **Empty until real evidence exists** |
| `images[]` | media[] | — | |
| `video[]` | media[] | — | |
| `documents[]` | media[] | — | |
| `relatedProjects[]` | ref[] | — | Manual override; otherwise derived |
| `featured` | boolean | ✓ | Drives homepage + work-index featured slots |
| `order` | number | — | |
| `seo` | object | ✓ | Route-specific title, description, canonical, share image |

**Hard rule:** publishing a case study is a data operation. No page component may require editing to add, remove, or reorder a project.

---

# 6. COMPANY HIERARCHY (REVISED)

```
/company                                    COMPANY / ABOUT XIYÀTO   ← single consolidated page
├── /company/people                         FOUNDER & PEOPLE
└── /company/locations                      LOCATIONS
```

**Change from IA_01:** `/company/about` is removed. `/company` is now the complete Company / About page. This eliminates the duplication risk between a Company Overview and an About page that IA_01 flagged and could not fully resolve.

## 6.1 — `/company` — final section order

| # | Section | Components | Links to |
|---|---|---|---|
| 01 | Company hero | Page hero | — |
| 02 | Company introduction — including what XIYÀTO does | Introduction block · service summary | `/services` |
| 03 | Company story | Narrative block | — |
| 04 | Purpose | Content block | — |
| 05 | Operating model — including business model | Operating-model block · engagement-model component | — |
| 06 | Industries served — who XIYÀTO works with | Sector list | — |
| 07 | Working principles / values | Principles list | — |
| 08 | Technology / systems approach | Content block · capability list | — |
| 09 | Geographic operating model — including international delivery | Location summary · delivery-model block | `/company/locations` |
| 10 | Founder preview | Founder card | `/company/people` |
| 11 | People / specialist network preview | People card grid | `/company/people` |
| 12 | Locations preview | 2 × Location card | `/company/locations` |
| 13 | Careers preview | Careers preview block | `/careers` |
| 14 | Contact CTA | Project enquiry CTA | `/contact` |

Fourteen sections. `/company` is the longest fixed page in the architecture and carries the full company narrative; `/company/people` and `/company/locations` hold the detail its previews point to.

## 6.2 — Merge reconciliation

Confirms that consolidating two pages into one dropped nothing.

| IA_01 source | Section | Landed in `/company` |
|---|---|---|
| Company Overview 01 | Company hero | 01 |
| Company Overview 02 | Company introduction | 02 |
| Company Overview 03 | What XIYÀTO does | **folded into 02** |
| Company Overview 04 | Who XIYÀTO works with | **merged with 06 (Industries served)** |
| Company Overview 05 | Operating model | 05 |
| Company Overview 06 | Values / working principles | 07 |
| Company Overview 07 | Founder preview | 10 |
| Company Overview 08 | People preview | 11 |
| Company Overview 09 | Locations | 12 |
| Company Overview 10 | Careers preview | 13 |
| Company Overview 11 | Contact CTA | 14 |
| About 02 | Company story | 03 |
| About 03 | Purpose | 04 |
| About 04 | Business model | **merged into 05** |
| About 05 | Industries served | 06 |
| About 06 | How the company operates | **merged into 05** |
| About 07 | Working principles | **merged into 07** |
| About 08 | Technology / systems approach | 08 |
| About 09 | Geographic operating model | 09 |
| About 10 | Founder / people links | **merged into 10 + 11** |
| About 11 | Contact CTA | **merged into 14** |

Twenty-two source sections resolve to fourteen, with seven merges and zero losses.

---

# 7. FOUNDER & PEOPLE HIERARCHY

`/company/people`

| # | Section | Components | Population rule |
|---|---|---|---|
| 01 | People hero | Page hero | — |
| 02 | Founder section | Founder card (expanded) | One founder record |
| 03 | Founder biography | Biography block | `{{TO BE SUPPLIED}}` |
| 04 | Founder responsibilities / role | Role list | `{{TO BE SUPPLIED}}` |
| 05 | Team / people | People card grid | Renders only when ≥1 team record exists |
| 06 | Specialist network / collaborators | People card grid (specialist) | Renders only when ≥1 specialist record exists |
| 07 | Working-with-us link | Content block → `/careers` | — |
| 08 | Careers CTA | Careers CTA | — |

## 7.1 — People data model

| Field | Type | Notes |
|---|---|---|
| `name` | string | |
| `slug` | string | Reserved for a future individual profile page |
| `role` | string | |
| `type` | enum | `founder` \| `team` \| `specialist` \| `advisor` |
| `discipline[]` | string[] | Maps to careers disciplines and service areas |
| `location` | ref | Location record |
| `biography` | rich text | |
| `responsibilities[]` | string[] | |
| `image` | media | |
| `links[]` | link[] | Professional channels |
| `visible` | boolean | Controls publication |
| `order` | number | |

## 7.2 — Non-invention and empty-state rules

**No person, role, title, or headcount is created at this stage.**

- 0 records → sections 05 and 06 do not render at all
- 1+ records → the section renders as a grid

A founder-only state and a founder-plus-fifteen state must both be structurally valid. The page may never require a minimum number of people to look complete.

---

# 8. LOCATIONS HIERARCHY

`/company/locations`

| # | Section | Components | Population |
|---|---|---|---|
| 01 | Locations hero | Page hero | — |
| 02 | United Kingdom presence | Location card (expanded) | `{{TO BE SUPPLIED}}` |
| 03 | India presence | Location card (expanded) | `{{TO BE SUPPLIED}}` |
| 04 | International delivery model | Content block · delivery-model | — |
| 05 | Contact details by location | Contact block × N | `{{TO BE SUPPLIED}}` |
| 06 | Business correspondence information | Correspondence block | `{{TO BE SUPPLIED}}` |
| 07 | Map / location presentation | Map component | Conditional — §8.3 |
| 08 | General enquiry CTA | Contact CTA | — |

## 8.1 — Location classification vocabulary (supported)

| Value | Slug |
|---|---|
| Correspondence | `correspondence` |
| Operations | `operations` |
| Registered Office | `registered-office` |
| Delivery / Remote | `delivery-remote` |

## 8.2 — Publication rules (binding)

1. **No classification may be published unless it is legally and factually accurate.**
2. **A UK location must not be presented, labelled, or implied as a registered office** unless a registered office genuinely exists and has been confirmed.
3. **No address may be invented, approximated, or partially rendered.** Until supplied, a location card renders in an explicit incomplete state — never with placeholder text that could be mistaken for a real address.
4. `type` is optional. An unclassified location renders without a classification line rather than with a default.

## 8.3 — Map rendering

Controlled by a per-location `mapEnabled` flag. A map renders **only** where the location is intentionally public and suitable to map. This is a data decision per location, never a layout default.

`[DECISION REQUIRED]` — which locations are public and map-suitable, once addresses are supplied.

## 8.4 — Location data model

| Field | Type | Notes |
|---|---|---|
| `name` | string | e.g. United Kingdom |
| `slug` | string | |
| `type` | enum | §8.1 vocabulary; optional, accuracy-gated by §8.2 |
| `addressLines[]` | string[] | `{{TO BE SUPPLIED}}` |
| `region` / `country` | string | |
| `phone[]` | string[] | `{{TO BE SUPPLIED}}` |
| `email` | string | `{{TO BE SUPPLIED}}` |
| `hours` / `timezone` | string | |
| `mapEnabled` | boolean | Default `false` |
| `correspondenceNote` | rich text | |
| `published` | boolean | Allows a location to exist as a record before it is publicly shown |
| `order` | number | |

---

# 9. CAREERS HIERARCHY

`/careers` — single page at launch.

| # | Section | Components | Population |
|---|---|---|---|
| 01 | Careers hero | Page hero | — |
| 02 | Working at / with XIYÀTO | Content block · principles list | — |
| 03 | Areas of expertise / disciplines | Discipline list | Maps to the three service areas |
| 04 | Current opportunities | Role card list | Zero-state required — §9.2 |
| 05 | Project-based / specialist opportunities | Role card list (specialist) | Zero-state required |
| 06 | Talent network | Talent-network block + form entry | Always available |
| 07 | Application / portfolio submission | Careers form + file upload | Always available |
| 08 | Careers contact | Contact block | `{{TO BE SUPPLIED}}` |
| 09 | Employment statement | Legal statement block | **Reserved, deferred** — §9.4 |

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

**Reserved expansion route:** `/careers/{role-slug}` for individual role pages. Not built now; the slug field exists so it can be added without restructuring.

## 9.2 — Zero-vacancy state is the default

**No vacancy is invented.** Sections 04 and 05 ship with a designed zero-state that routes visitors to the talent network (06). The page must read as complete and intentional with zero open roles. Not an empty container, not a hidden section.

## 9.3 — Channel separation

Careers submissions must not enter the project-enquiry pipeline. Separate form, separate destination, separate confirmation state.

## 9.4 — Employment statement (deferred)

The architecture reserves section 09. **No elaborate equal-opportunity statement is produced at this stage.** Wording is deferred to legal and copy review, and depends on the eventual UK/India employment position. The section renders only when populated.

---

# 10. CONTACT HIERARCHY

`/contact` — a business enquiry system.

| # | Section | Components |
|---|---|---|
| 01 | Contact hero | Page hero |
| 02 | Project enquiry | Enquiry form — §10.1 |
| 03 | Service selection | Form field — service area picker |
| 04 | Company / client information | Form fieldset |
| 05 | Project brief | Form fieldset |
| 06 | Timeline | Form field |
| 07 | File / brief upload | File upload — §10.3 |
| 08 | General contact information | Contact block |
| 09 | Email contact | Channel list |
| 10 | United Kingdom contact / location | Location card |
| 11 | India contact / location | Location card |
| 12 | Careers contact | Contact block → `/careers` |
| 13 | Social / professional channels | Channel list |
| 14 | Form confirmation state | Confirmation component |

## 10.1 — Project enquiry form — final field specification

**Required**

| Field | Type | Notes |
|---|---|---|
| Name | text | |
| Email | email | |
| Service | select | Maps to the three service areas |
| Project brief | textarea | |
| Privacy acknowledgement | checkbox | Links to `/legal/privacy` |

**Optional**

| Field | Type |
|---|---|
| Company | text |
| Role | text |
| Phone | tel |
| Country | select / text |
| Sector | select / text |
| Timeline | select / text |
| File upload | file (multiple) |

Field labels, validation messages, and confirmation wording are copy-stage work and are not written here.

## 10.2 — Required form states

Every state must be designed:

`empty` · `focused` · `filled` · `field-level validation error` · `form-level error` · `submitting` · `success / confirmation` · `submission failed with a recovery path`

## 10.3 — File upload

**Architecturally supported and specified now. Implementation may be deferred** if secure storage and processing are not ready at launch.

If deferred, the form ships without the upload field — it must not ship with a non-functional or decorative control. The enquiry flow must remain complete and coherent without it.

`[DECISION REQUIRED]` — storage provider, retention period, size cap, and accepted file types. These are operational facts not yet supplied, and they also feed the Privacy Policy.

## 10.4 — Contact channels (final)

| Channel | Purpose | Address | Publication rule |
|---|---|---|---|
| General enquiries | Non-project contact | `{{TO BE SUPPLIED}}` | Publish when supplied |
| Project enquiries | New business — primary CTA target | `{{TO BE SUPPLIED}}` | Publish when supplied |
| Careers | Applications, talent network | `{{TO BE SUPPLIED}}` | Publish when supplied |
| Founder / direct | Direct communication | `{{TO BE SUPPLIED}}` | **Capability maintained; must not be published until the real professional address is supplied.** No personal or provisional address is used as a stand-in |

`[DECISION REQUIRED]` — all four addresses.

## 10.5 — Supporting requirements

- `[DECISION REQUIRED]` — spam-protection mechanism
- `[DECISION REQUIRED]` — submission recipient, storage, and retention position; these determine Privacy Policy content
- Existing direct channels are **retained alongside** the form, never replaced by it

---

# 11. FOOTER HIERARCHY

```
┌─ BAND 1 — BRAND ────────────────────────────────────────────────────┐
│  XIYÀTO wordmark                                                     │
│  Business descriptor slot                                            │
│  Professional / social channels                                      │
└──────────────────────────────────────────────────────────────────────┘
┌─ BAND 2 — NAVIGATION (4 columns) ───────────────────────────────────┐
│  WORK              SERVICES          COMPANY          CONNECT        │
│  All work          Overview          Company          Contact        │
│  Technical Prod.   CAD & Technical   Founder & People Careers        │
│  Growth Ops        Growth Ops        Locations        General email  │
│  Visual Content    Visual Content                     Project email  │
│  Multi-disciplinary                                   Careers email  │
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
│  │  Reserved. Accommodates future formal registration details     │ │
│  │  without redesign. Renders only when populated.                │ │
│  └────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
```

Band 2 column order follows the header: Work first, then Services.

## 11.1 — Reserved legal / company information block

- A **first-class region of Band 4**, not an appendix beneath the copyright
- Accepts a variable number of lines: registered company name, registration number, registered office address, VAT/tax identifiers, regulatory statements, jurisdiction notices
- Renders **nothing at all** when unpopulated — no placeholder, no empty container, no heading
- Adding these details later is a **content operation only**; no layout, spacing, or component change may be required
- Legal-page links in Band 4 render only for legal pages that are actually published (§12)

## 11.2 — Copyright year

Derived at build or render time. Never hard-coded.

---

# 12. LEGAL HIERARCHY

**No `/legal` index page.** All five routes are linked directly from the footer.

| Page | Route | Publication trigger | Launch status |
|---|---|---|---|
| Privacy Policy | `/legal/privacy` | **Publishes once a live contact form collects personal data** | Published at launch if the form ships |
| Terms of Use | `/legal/terms` | Required for a business site | **Published at launch** |
| Cookie Policy | `/legal/cookies` | Content depends on the actual analytics / non-essential cookie implementation | Conditional |
| Accessibility Statement | `/legal/accessibility` | Published **after** accessibility review | Deferred |
| Company Information | `/legal/company-information` | **Remains unpublished and inactive until genuine company and legal information exists** | Not published |

## 12.1 — Publication mechanics

Each legal route has a `published` flag. When `false`:
- the route is not exposed in the footer
- the route is excluded from `sitemap.xml`
- the route returns a genuine **404**, not an empty page

This prevents an unpublished Company Information page from being crawled, indexed, or discovered as a hollow shell.

## 12.2 — Shared legal page template

Page hero · last-updated date · body content · links to the other published legal pages · contact route for legal queries.

## 12.3 — Non-fabrication constraint

**No company registration details are fabricated, and no legal text is drafted at this stage.** These are routes, templates, publication flags, and footer integration only. Legal content requires qualified input, particularly across two jurisdictions.

`[DECISION REQUIRED]` — governing jurisdiction for Terms of Use, and the formal company/legal identity, once established.

---

# 13. REUSABLE COMPONENT INVENTORY

Components marked ⊕ are structural additions required to make the specified set function.

## 13.1 — Layout & global (8)

| Component | Used by | Variants |
|---|---|---|
| Global header | all pages | default, condensed |
| Navigation dropdown | header | services, company |
| Mobile navigation | all pages (<1024 px) | — |
| Global footer | all pages | — |
| Breadcrumbs | all level-2 pages | — |
| Page hero ⊕ | every page | home, section, service, case study, legal |
| Section header ⊕ | throughout | with/without eyebrow, with/without link |
| Content block ⊕ | throughout | text, text+media, two-column |

## 13.2 — Cards (6)

| Component | Used by | Variants |
|---|---|---|
| Service card | home, services, company | default, compact, featured |
| Case-study card | home, work, services, case studies | default, featured, compact |
| Location card | home, company, locations, contact, footer | summary, expanded |
| Founder card | home, company, people | preview, expanded |
| People / team card | company, people | team, specialist, advisor |
| Role card ⊕ | careers | permanent, contract, freelance |

## 13.3 — Content structures (10)

| Component | Used by |
|---|---|
| Process / timeline section | home, services ×4, case studies |
| Deliverables section | services ×3, case studies |
| Capability list | home, services, work, company, case studies |
| Case-study metrics | case studies, home *(renders only with real data)* |
| Project metadata | case studies |
| Client / company metadata | case studies |
| Gallery ⊕ | case studies, service pages |
| Media block ⊕ | throughout |
| Principles / values list ⊕ | company, careers |
| Engagement-model block ⊕ | home, services, company |

## 13.4 — Relationship & navigation (4)

| Component | Used by |
|---|---|
| Related work | case studies, service pages |
| Related services | case studies, work index |
| Filter / category system ⊕ | work index |
| In-page section navigation ⊕ | long pages |

## 13.5 — Conversion (8)

| Component | Used by | Variants |
|---|---|---|
| Project enquiry CTA | every page | full-width band, inline, compact |
| Contact form | contact | project enquiry |
| Careers form ⊕ | careers | application, talent network |
| File upload ⊕ | contact, careers | — |
| Form field set ⊕ | all forms | text, textarea, select, checkbox, file |
| Form state display ⊕ | all forms | error, submitting, success, failure |
| Contact block ⊕ | contact, locations, footer, careers | — |
| Channel list ⊕ | contact, footer | email, social/professional |

## 13.6 — Legal & system (4)

| Component | Used by |
|---|---|
| Legal information block | footer, company information |
| Legal page template ⊕ | 5 legal routes |
| Empty state ⊕ | careers, people, filtered work |
| Error page template ⊕ | `/404` |

## 13.7 — Corrected component total

IA_01 stated 41. Recounted:

| Group | Count |
|---|---:|
| Layout & global | 8 |
| Cards | 6 |
| Content structures | 10 |
| Relationship & navigation | 4 |
| Conversion | 8 |
| Legal & system | 4 |
| **Total** | **40** |

Composition: **20 components from the approved component list + global header (implied by the header specification) = 21 specified**, plus **19 structural additions (⊕) = 40 total.**

**Governing rule:** no page introduces a bespoke one-off pattern. If a page needs something absent from this inventory, the inventory gains a component — the page does not gain an exception.

---

# 14. MOBILE NAVIGATION ARCHITECTURE

**Breakpoint: 1024 px (preliminary, subject to visual testing).** Below 1024 px the mobile pattern applies, placing tablet portrait on the mobile navigation.

## 14.1 — Collapsed state

```
[XIYÀTO]                        [ Start ]   [☰]
```

A **persistent compact project CTA** sits in the header bar, provided it does not crowd the brand or the menu trigger. If space is constrained at the narrowest supported widths, the compact CTA drops out of the bar and the panel CTA (§14.2) carries the action. This is a visual-testing outcome, not an architectural one.

## 14.2 — Expanded state — submenus collapsed by default

```
┌──────────────────────────────────────────┐
│  [XIYÀTO]                          [✕]   │
├──────────────────────────────────────────┤
│  Work                                 →  │
│  Services                             ▾  │   ← collapsed
│  Company                              ▾  │   ← collapsed
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

Expanded, Services reveals: Services Overview · CAD & Technical Production · Growth Operations · Visual Content.
Expanded, Company reveals: Company · Founder & People · Locations.

## 14.3 — Sub-navigation pattern

In-panel accordions. No second-level slide-in panel.

Parent rows are **split targets**: the label navigates to the parent page; the chevron expands the children. A parent must never be reachable only by expanding it.

## 14.4 — Mandatory behaviours

| Requirement |
|---|
| Body scroll locked while the panel is open |
| Dismissible by backdrop interaction |
| Dismissible by `Esc` |
| Focus moves into the panel on open |
| Focus trapped within the panel while open |
| Focus returns to the trigger on close |
| Exit transition on close |
| Active section indicated |
| Visible focus state on every item |
| Navigation links not duplicated in the DOM between desktop and mobile |
| Minimum 44 × 44 px touch target on every interactive element |

---

# 15. URL / ROUTE POLICY

## 15.1 — Conventions (final)

| Rule | Value |
|---|---|
| Routing | **Real paths. No hash routing.** |
| Case | lowercase only |
| Word separator | hyphen |
| Trailing slash | none |
| Depth limit | 2 segments |
| Rendering | server-rendered or pre-rendered crawlable HTML |
| Status codes | true HTTP status codes — 200 for real pages, **404 for unknown paths** |
| Canonical | one self-referencing canonical per route on `https://xiyato.uk` |
| Metadata | unique title, description, and share image per route |

## 15.2 — Final route table

| # | Route | Page | Segments | Type | Launch |
|---|---|---|---|---|---|
| 1 | `/` | Home | 0 | Fixed | ✓ |
| 2 | `/work` | Work Index (+ `?category=`) | 1 | Fixed | ✓ |
| 3 | `/work/{project-slug}` | Case Study | 2 | **Templated ×N** | ✓ |
| 4 | `/services` | Services Overview | 1 | Fixed | ✓ |
| 5 | `/services/cad-technical-production` | CAD & Technical Production | 2 | Fixed | ✓ |
| 6 | `/services/growth-operations` | Growth Operations | 2 | Fixed | ✓ |
| 7 | `/services/visual-content` | Visual Content | 2 | Fixed | ✓ |
| 8 | `/company` | Company / About XIYÀTO | 1 | Fixed | ✓ |
| 9 | `/company/people` | Founder & People | 2 | Fixed | ✓ |
| 10 | `/company/locations` | Locations | 2 | Fixed | ✓ |
| 11 | `/careers` | Careers | 1 | Fixed | ✓ |
| 12 | `/contact` | Contact | 1 | Fixed | ✓ |
| 13 | `/legal/privacy` | Privacy Policy | 2 | Fixed | ✓ (if form ships) |
| 14 | `/legal/terms` | Terms of Use | 2 | Fixed | ✓ |
| 15 | `/legal/cookies` | Cookie Policy | 2 | Fixed | Conditional |
| 16 | `/legal/accessibility` | Accessibility Statement | 2 | Fixed | Deferred |
| 17 | `/legal/company-information` | Company Information | 2 | Fixed | **Inactive** |

**16 fixed routes + 1 templated pattern = 17 route-table entries.**

## 15.3 — Approved structural utilities

| Route / file | Requirement |
|---|---|
| `/404` | Genuine not-found page returning **HTTP 404** |
| `/sitemap.xml` | Generated from the route table; excludes unpublished legal routes |
| `/robots.txt` | Crawler directives; references the sitemap |
| `/site.webmanifest` | Icons and application metadata |

**Binding requirement:** the current catch-all rewrite that returns HTTP 200 and the homepage for every unmatched path **must not survive the rebuild.** Unknown paths return 404. `robots.txt` and `sitemap.xml` return their real content types, never HTML.

## 15.4 — Canonical host policy

| Rule | Requirement |
|---|---|
| Canonical host | `https://xiyato.uk` |
| `www.xiyato.uk` | **301 permanent redirect** to the canonical host |
| Deployment/preview host | **301 permanent redirect** to the canonical host; must not serve the public site unredirected |
| Any other alternate host | 301 to the canonical host |
| `http` → `https` | Permanent redirect |
| Canonical tags | Self-referencing, on the canonical host, on every route |

## 15.5 — Reserved routes

Names protected against future collision, not built now:

`/insights` · `/resources` · `/partnerships` · `/careers/{role-slug}` · `/company/people/{person-slug}` · `/work/category/{category-slug}` · `/portal` · `/{locale}/` prefix

---

# 16. MANDATORY TECHNICAL FOUNDATION

These are architectural requirements, not implementation preferences. The architecture is not conformant without all fifteen.

| # | Requirement | Replaces |
|---|---|---|
| 1 | **Server-rendered or pre-rendered crawlable page content** — every route returns real HTML content | An empty `<div id="root">` served to every crawler |
| 2 | **Semantic real links** — every navigation and card target is an `<a href>` | `div onClick` navigation |
| 3 | **Keyboard-accessible navigation** — every interactive element reachable and operable by keyboard | A portfolio grid with zero focusable elements |
| 4 | **Visible focus states** — on every interactive element, never removed without replacement | `focus:outline-none` with no substitute |
| 5 | **True HTTP status codes** — 200 for real pages, 404 for unknown paths, 301 for permanent redirects | Every path returning 200 |
| 6 | **Route-specific metadata** — unique title and description per route | One title and description across all routes |
| 7 | **Self-referencing canonical URLs** — one per route, on the canonical host | No canonical tag anywhere |
| 8 | **Open Graph / share metadata** — including `og:image` and `twitter:card`, per route, pointing at the canonical host | Missing share image and card type; `og:url` pointing at the deployment host |
| 9 | **`sitemap.xml`** — generated, excluding unpublished routes | Absent |
| 10 | **`robots.txt`** — real content type, referencing the sitemap | Absent |
| 11 | **Correct 404 handling** — a genuine 404 page with a 404 status | Soft 404 returning the homepage |
| 12 | **One canonical hostname** | Three hosts serving identical content |
| 13 | **Redirects from alternate hosts** — 301, permanent | No redirect between hosts |
| 14 | **Accessible dropdown behaviour** — keyboard operable, `Esc` dismissible, focus returned, parent links independently reachable | No dropdowns exist |
| 15 | **No clickable-div navigation patterns anywhere** | The primary navigation into all portfolio content |

## 16.1 — Additional conformance requirements

- Every image carries meaningful `alt` text; decorative graphics are hidden from assistive technology
- No content is exposed only on hover
- All modals and overlays implement dialog semantics, focus trapping, and scroll locking
- Reduced-motion preferences are respected
- Every interactive element meets a 44 × 44 px minimum touch target
- Conditional sections omit cleanly; no empty shells render

---

# 17. LEGACY URL REDIRECT MAP

A complete redirect map must be produced and applied before launch. **No retired URL may redirect to `/` as a default.** Each resolves to its closest genuine destination.

## 17.1 — Draft mapping

Derived from the routes verified in the current-site audit. Targets marked ▲ depend on content decisions explicitly out of scope for this stage.

| Current URL(s) | Proposed destination | Status |
|---|---|---|
| `/` | `/` | Direct |
| `/#/cad-automation`, `/cad-automation` | `/services/cad-technical-production` | Confirmed |
| `/#/projects/videos`, `/projects/videos` | `/work?category=visual-content` | Confirmed |
| `/#/projects/visualisations`, `/projects/visualisations` | `/work?category=visual-content` | Confirmed |
| `/#/projects/b2b-research`, `/projects/b2b-research` | `/work?category=growth-operations` | Confirmed |
| `/#/projects/b2b-research/{slug}` × 8 | `/work/{case-study-slug}` where a case study exists; otherwise `/work?category=growth-operations` | ▲ Slug-dependent |
| `/#/projects/websites`, `/projects/websites` | ▲ No service category currently maps to website development | ▲ Open |
| `/#/startup`, `/startup` | ▲ No destination exists in the approved architecture | ▲ Open |
| `/#projects` | `/work` | Confirmed |
| `/#services` | `/services` | Confirmed |
| `/#about` | `/company` | Confirmed |
| `/#contact` | `/contact` | Confirmed |
| `/#home` | `/` | Confirmed |
| Any other path currently returning 200 | **404** — not a redirect | Confirmed |

## 17.2 — Two open structural gaps

Both are consequences of the approved three-service taxonomy. Neither is a content decision this stage may make.

1. **Website development work** has no home in the service taxonomy (CAD & Technical Production · Growth Operations · Visual Content) and no obvious work category. It can be absorbed under Technical Production, given a fourth service, or excluded — a decision for the content stage.
2. **The Ciyato startup content** has no destination in the approved architecture. It could become a case study, a `/company` child, a reserved future area, or be excluded — again a content-stage decision.

These are recorded here because the redirect map cannot be completed without resolving them. They do not block approval of the architecture itself.

## 17.3 — Redirect requirements

- All redirects are **301 permanent**
- Hash-based URLs cannot be redirected server-side; a client-side hash-to-path translation shim is required at launch to catch inbound links carrying `#/…` fragments
- The map is finalised once case-study slugs exist and the two §17.2 gaps are resolved

---

# 18. CONTENT HIERARCHY — DOMAIN SEPARATION

Eight domains, structurally distinct.

| Domain | Owned by | Previewed on the homepage |
|---|---|---|
| Company information | `/company` | §02 |
| Services | `/services` + 3 service pages | §03, §04 |
| Proof / work | `/work` + case studies | §06 |
| People | `/company/people` | §08, §09 |
| Locations | `/company/locations` | §10 |
| Careers | `/careers` | via `/company` §13 |
| Contact | `/contact` | §11 |
| Legal | `/legal/*` | footer only |

**Rule:** the homepage may preview any domain; it may not own one. No content exists solely on the homepage.

---

# 19. SCALABILITY POSITION

| Future addition | Absorbed by | Blocked? |
|---|---|---|
| Additional services | New child under `/services`, new dropdown item, new work category | No |
| Additional team members | New people records; sections are grid-based | No |
| Additional locations | New location records; footer band and locations page repeat | No |
| Additional case studies | New data records via `/work/{slug}` | No |
| Secondary work filters | Fields already exist on every record; UI change only | No |
| Category routes | `/work/category/{slug}` reserved | No |
| Insights / articles | `/insights` reserved | No |
| Resources | `/resources` reserved | No |
| Partnerships | `/partnerships` reserved, or a `/company` child | No |
| Formal registration details | Reserved footer legal block + `/legal/company-information` | No |
| Client portal / project systems | `/portal` reserved, outside the marketing IA | No |
| Localisation | `/{locale}/` prefix reserved | No |
| Individual role pages | `/careers/{role-slug}` reserved | No |
| Individual person profiles | `/company/people/{person-slug}` reserved | No |

**The three constraints that keep this true:**
1. Case studies, people, roles, and locations are **data records**, never hand-built pages.
2. The footer legal block is a **first-class region** sized for content that does not yet exist.
3. Nothing sits deeper than 2 URL segments; anything that would require a third is a signal for a new level-1 area.

---

# 20. OUTSTANDING INFORMATION REQUIRED

All architectural decisions are closed. What remains is factual information not yet supplied.

| # | `[DECISION REQUIRED]` | Blocks | Ref |
|---|---|---|---|
| 1 | United Kingdom address and its accurate classification | Locations page, footer Band 3, contact page | §8 |
| 2 | India address and its accurate classification | Locations page, footer Band 3, contact page | §8 |
| 3 | Which locations are public and map-suitable | Map rendering | §8.3 |
| 4 | General enquiries email address | Contact, footer, mobile panel | §10.4 |
| 5 | Project enquiries email address | Contact, footer, mobile panel, primary CTA | §10.4 |
| 6 | Careers email address | Careers, contact, footer | §10.4 |
| 7 | Founder / direct professional email address, and whether it is published | Contact | §10.4 |
| 8 | File-upload storage provider, retention, size cap, accepted types | Upload implementation, Privacy Policy | §10.3 |
| 9 | Spam-protection mechanism | Contact and careers forms | §10.5 |
| 10 | Form submission recipient, storage, and retention position | Privacy Policy content | §10.5 |
| 11 | Analytics and non-essential cookie implementation | Cookie Policy publication | §12 |
| 12 | Governing jurisdiction for Terms of Use | Terms content | §12.3 |
| 13 | Formal company and legal registration identity | Footer legal block, `/legal/company-information` | §11.1, §12 |
| 14 | Professional / social channel URLs to publish | Footer Band 1, contact §13, mobile panel | §11 |

**Deferred to later stages, not blocking:**
- Employment statement wording — legal and copy review (§9.4)
- Case-study slugs — content stage; required to finalise the redirect map (§17.1)
- Website-development work placement in the taxonomy — content stage (§17.2)
- Ciyato content placement — content stage (§17.2)
- Mobile breakpoint confirmation at 1024 px — visual testing (§14)

---

# 21. WHAT THIS DOCUMENT DOES NOT CONTAIN

- No final or draft website copy
- No visual direction, layout, typography, or colour decisions
- No code or implementation
- No changes to the live website
- No portfolio projects assigned to categories or case studies
- No client names
- No team members, job titles, or headcount
- No addresses, phone numbers, or email addresses
- No company registration or legal identifiers
- No testimonials, metrics, or evidence figures
- No vacancies
- No judgement on which existing content stays, moves, or goes

**Architecture approved. Next stage begins on your instruction.**
