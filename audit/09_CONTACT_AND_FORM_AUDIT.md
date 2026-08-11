# 09 — CONTACT & FORM AUDIT

**Audit date:** 2026-08-11 · No form was submitted; none exists to submit.

---

## 1. HEADLINE FINDING

**The website has zero `<form>` elements and zero submit paths.**

Verified live on every route: `document.querySelectorAll('form').length === 0`.

Every enquiry on this site leaves through **WhatsApp or Instagram**. There is no email address, no telephone link, no contact form, no booking link, and no file-upload mechanism anywhere on the site.

---

## 2. COMPLETE CONTACT-MECHANISM REGISTER

| Mechanism | Present | Count | Notes |
|---|---|---|---|
| Contact form | **NO** | 0 | |
| Email address / `mailto:` | **NO** | 0 | No email is published anywhere |
| Telephone `tel:` | **NO** | 0 | Two numbers are shown, but both link to WhatsApp, not the dialer |
| WhatsApp | YES | **9 links** | Primary conversion path |
| Instagram | YES | **8 links** | 6 profiles: 1 own + 5 client |
| LinkedIn | **NO** | 0 | |
| Calendar / booking | **NO** | 0 | |
| File upload | **NO** | 0 | |
| CV / résumé download | **NO** | 0 | |
| Newsletter signup | **NO** | 0 | |
| Live chat widget | **NO** | 0 | |
| Physical address | **NO** | 0 | |
| Contact page | **NO** | 0 | `#contact` is a footer anchor on the homepage |

---

## 3. WHATSAPP — FULL INVENTORY

Two numbers are used throughout: **+44 7882 746212** (UK) and **+91 70283 11226** (India).

| # | Page | Location | Label | Pre-filled message | Number |
|---|---|---|---|---|---|
| 1 | Homepage | Hero CTA grid | `+44 7882 746212` | none | UK |
| 2 | Homepage | Hero CTA grid | `+91 70283 11226` | none | IN |
| 3 | Homepage | Footer contact list | `+44 7882 746212` | none | UK |
| 4 | Homepage | Footer contact list | `+91 70283 11226` | none | IN |
| 5 | Homepage | Footer social icon row | `WHATSAPP` (label hover-only) | none | UK |
| 6 | CAD | Main CTA | `Start a CAD Project` | *"Hello, I would like to discuss an AutoCAD drafting project. I have a plan/reference and need editable CAD drawings."* | UK |
| 7 | CAD | Lightbox top bar (≥640 px) | `Generate` | same as #6 | UK |
| 8 | CAD | Lightbox bottom bar (<640 px) | `Generate CAD →` | same as #6 | UK |
| 9 | Startup | CTA | `WhatsApp +44 7882 746212` | *"Hello, I am interested in Ciyato and would like to learn more about the startup."* | UK |
| 10 | Startup | CTA | `WhatsApp +91 70283 11226` | same as #9 | IN |
| — | Websites | *(dead code)* | `Inquire Website Acquisition` | *"Hi Chaitanya, I am inquiring about acquiring the Export Brand Website listed on your portfolio."* | UK |

**Technical form:** all use `https://wa.me/<number>` (some with `?text=`), `target="_blank"`, `rel="noopener noreferrer"`.
**Verified live:** all resolve HTTP 200 and redirect to `https://api.whatsapp.com/send/?phone=…&type=phone_number&app_absent=0`.

**Distribution gap:** the India number appears **only** in the homepage hero, homepage footer, and the Startup CTA. The CAD page — the most developed service page on the site — offers the UK number only.

**Coverage gap:** four of the eight pages (Videos, B2B list, Spreadsheet viewer, Visualisations, Websites) contain **no contact affordance at all** beyond the header nav.

---

## 4. INSTAGRAM — FULL INVENTORY

| # | Page | Location | Handle | `aria-label` | Verified tick shown |
|---|---|---|---|---|---|
| 1 | Homepage | Experience card 1 | `@sultanahco` | `View Sultanah & Co. Interiors on Instagram` | Yes |
| 2 | Homepage | Experience card 2 | `@redchandelier.studio` | `View Red Chandelier Studio on Instagram` | Yes |
| 3 | Homepage | Experience card 4 | `@erenodesignstudio` | `View Ereno Design Studio on Instagram` | Yes |
| 4 | Homepage | Experience card 5 | `@fitout360uae` | `View Fitout 360 Interiors on Instagram` | Yes |
| 5 | Homepage | Experience card 6 | `@jovialdecoure` | `View Jovial Decoure on Instagram` | Yes |
| 6 | Homepage | Footer contact list | `@xiyato22` | — | No |
| 7 | Homepage | Footer social icon row | `INSTAGRAM` (label hover-only) | `Visit on Instagram` | No |

Experience card 3 (`Chinese Company`) shows a `PRIVATE` chip and the italic text `Instagram account not publicly available` instead of a link.

> **Note:** five of the seven Instagram links point at **client** accounts, not the site owner's. The Experience section's only interactive element sends visitors **off-site to a third party**.

---

## 5. THE ONLY INPUT ON THE SITE

The spreadsheet row filter, on `/#/projects/b2b-research/<slug>`.

| Property | Value |
|---|---|
| **FIELDS** | 1 — `<input type="text">` |
| **PLACEHOLDER** | `Search rows...` |
| **LABEL** | **NONE** — no `<label>`, no `aria-label`, no `aria-labelledby` (verified live) |
| **NAME / ID** | **NONE** |
| **REQUIRED FIELDS** | none — the field is optional |
| **VALIDATION** | **NONE** — any string is accepted; no min/max, no pattern, no sanitisation |
| **SUBMISSION ENDPOINT** | **NONE** — no form wrapper, no submit event, no network call. Filtering is local React state |
| **SUCCESS STATE** | rows filter in place; footer updates to `Showing {n} of {n} rows` |
| **ERROR STATE** | none possible |
| **EMPTY STATE** | `No matching records found` |
| **SPAM PROTECTION** | not applicable — nothing is transmitted |
| **WHERE SUBMISSIONS GO** | nowhere — no data leaves the browser |
| **DEBOUNCE** | none — filtering runs on every keystroke across every cell of the active sheet |
| **RESET** | cleared automatically when a different sheet tab is selected |

**Filter logic:** case-insensitive substring match; a row is kept if **any** cell contains the query. Runs over up to 6,777 cells with no memoisation.

---

## 6. DATA COLLECTED BY THE SITE

| Category | Status |
|---|---|
| Form submissions | none — no forms |
| Cookies set | **NONE** (verified) |
| `localStorage` / `sessionStorage` | **NOT USED** |
| Analytics / tracking | **NONE** — no GA, no pixel, no Vercel Analytics |
| Third-party embeds | **NONE** |
| Server-side logging | Vercel platform access logs only |

**The site collects no personal data.** This is why the absence of a privacy policy has not created a live compliance problem — but note that the **outbound** WhatsApp and Instagram links do transfer the visitor to third parties, and Google Fonts is requested from `fonts.googleapis.com` on every page load (an IP-address transfer to Google that some EU interpretations treat as requiring disclosure).

---

## 7. OUTBOUND DATA IN DOWNLOADABLE FILES

The 8 `.xlsx` downloads are the only files the site distributes.

**Redaction claim verified.** The site states `Phone & Email Redacted` and *"Original phone numbers and emails have been safely redacted to safeguard confidentiality."* A pattern scan across all 8 workbooks (unzipped OOXML) and all 8 public JSON previews found:

- **0 email addresses in cell data**
- **0 telephone numbers in cell data**

**The claim holds.**

**Two incidental findings, recorded for completeness:**

1. **Author metadata.** `automotive-showroom-lead-intelligence-redacted.xlsx` and `saudi-riyadh-jeddah-55-lead-intelligence-redacted.xlsx` carry `chaitanyagaikwad022@gmail.com` in `docProps/core.xml` (`dc:creator`). This is the site owner's own address, not client data — but it is publicly downloadable and is **not published anywhere on the site itself**, so it is disclosed unintentionally.

2. **Named third parties in public business-intelligence data.** The spreadsheet viewer publishes, at a public URL with no authentication, columns including `COMPANY / LEAD`, `DECISION-MAKER ROUTE`, `NAMED PERSON PUBLICLY SEEN`, `PUBLIC CONTACT / ROUTE`, `SUGGESTED OUTREACH ANGLE`, `WHY THIS LEAD MATTERS`, and `SOURCE URLS`. Sampled row 1 of `saudi-riyadh-jeddah-55-lead-intelligence` names a company, a named individual with their role, an active project, and a recommended pitch angle — all attributed to public sources. Phone and email are genuinely absent, but **the material is competitive-intelligence content about identifiable companies and people, indexed at a public URL, describing how to approach them.** Whether that is intended is a business decision, not a technical defect — it is recorded here as a fact of the current site, not as a recommendation.

---

## 8. CONVERSION-PATH ANALYSIS

### Paths that exist

| Entry point | Steps to contact | Channel |
|---|---|---|
| Homepage hero | **1 click** | WhatsApp (no context) |
| Homepage footer | 1 click after scrolling ~13 screens on mobile | WhatsApp / Instagram |
| CAD page | 1 click, anywhere on the page | WhatsApp (pre-filled, contextual) |
| CAD lightbox | 1 click while viewing a drawing | WhatsApp (pre-filled) |
| Startup page | 1 click | WhatsApp (pre-filled) |
| Header nav → Contact | 1 click → footer | WhatsApp / Instagram |

### Paths that do not exist

- **Services → enquiry.** All 9 service cards are inert — no link, no CTA, no price, no "discuss this".
- **Project → enquiry.** No video, render, workbook, or website card offers a CTA. Only the CAD page does.
- **Experience → enquiry.** The 6 cards link outward to Instagram only.
- **Email.** No address is published, so no email enquiry is possible.
- **Phone call.** Both numbers are WhatsApp-only; a visitor who wants to call must copy the digits manually.
- **Asynchronous / written enquiry with attachments.** The CAD CTA asks the visitor to *"Send the available layout, measurements and design references"* — but the only channel offered is WhatsApp, and there is no upload field anywhere on the site.
- **Any lead capture.** Nothing is captured; if a visitor does not initiate a WhatsApp message, they leave no trace, and with no analytics installed there is no record they were ever there.

### Channel concentration

**100 % of conversions depend on WhatsApp or Instagram.** A visitor who does not use WhatsApp — common in corporate, US, and much of the EU B2B context, which is precisely the audience the B2B and CAD pages address — **has no way to make contact at all.**
