# XIYÀTO — OPEN FACTS

**Date:** 2026-08-11

Facts only you can supply. **None of these blocks the site** — every one is handled by data
that renders nothing until it is filled in, so the site is complete and coherent without
them. Nothing here is a design or engineering question.

Each item lists where to put the value.

---

## 1. BLOCKS FORM DELIVERY (one external setup action)

The enquiry form validates, rate-limits and fails honestly today. To make it deliver, set
four environment variables in the Vercel project (and `.env.local` for development).

| Variable | Value needed |
|---|---|
| `ENQUIRY_PROVIDER_API_KEY` | A Resend API key — https://resend.com |
| `ENQUIRY_FROM_EMAIL` | Verified sender on a domain you control, e.g. `XIYATO <site@xiyato.uk>` |
| `ENQUIRY_TO_EMAIL` | Destination inbox for project enquiries |
| `ENQUIRY_TO_EMAIL_CAREERS` | Optional — separate inbox for talent submissions |

Any transactional provider works; only the call in `app/api/enquiry/route.ts` would change.

**Until set:** submissions return HTTP 503, the UI states the message was not delivered, and
the visitor is offered the verified WhatsApp channels. No false success is ever shown.

---

## 2. PROFESSIONAL EMAIL ADDRESSES

**Where:** `lib/site.ts` → `CONTACT_CHANNELS[].email`

| Channel | Purpose | Status |
|---|---|---|
| Project enquiries | Primary CTA target | `null` |
| General enquiries | Non-project contact | `null` |
| Careers | Applications and talent network | `null` |
| Founder / direct | Direct commercial line | `null` |

All four are `null`, so no email address is published anywhere. Set an address and it appears
automatically in the footer, contact page, locations page and mobile menu.

**The founder channel additionally needs a decision:** whether to publish it at all. No
personal address has been used as a stand-in.

---

## 3. ADDRESSES AND LOCATION CLASSIFICATION

**Where:** `lib/company.ts` → `LOCATIONS[]`

| Field | UK | India |
|---|---|---|
| `addressLines` | `[]` | `[]` |
| `type` | `null` | `null` |
| `email` | `null` | `null` |
| `mapEnabled` | `false` | `false` |

Both locations currently render a description of what happens there, plus timezone and the
verified phone number. No street address is output and **no classification is claimed** —
specifically, the UK presence is not described as a registered office.

To publish, supply:
1. **UK address lines** and its accurate classification
2. **India address lines** and its accurate classification
3. Whether either is public and suitable to show on a map

Permitted classifications: `correspondence`, `operations`, `registered-office`,
`delivery-remote`. Do not set `registered-office` unless one genuinely exists.

---

## 4. COMPANY REGISTRATION IDENTITY

**Where:** `lib/company.ts` → `COMPANY_REGISTRATION` (currently `null`)

While `null`, the reserved footer legal block renders nothing at all — no heading, no empty
container — and `/legal/company-information` returns a genuine 404 with no footer link and no
sitemap entry.

When formal registration exists, supply: legal entity name, registration number, registered
office address, and VAT/tax identifiers if applicable. Then set
`LEGAL_PAGES` → `company-information` → `published: true`.

**No `Ltd`, `Limited`, company number, VAT number or registered office has been fabricated
anywhere.**

---

## 5. LEGAL REVIEW ITEMS

| Item | Status | Needs |
|---|---|---|
| Privacy Policy | **Published** | Review. It describes the implemented behaviour accurately (form fields collected, email delivery, no cookies, no analytics). Confirm the retention position matches your intent |
| Terms of Use | **Published** | Review. Conservative website-use terms. **Governing-law jurisdiction is deliberately unstated** given UK and India operations — confirm which applies |
| Cookie Policy | Unpublished → 404 | Only needed if analytics or non-essential cookies are added. None are installed |
| Accessibility Statement | Unpublished → 404 | Publish after a formal accessibility review |
| Employment statement (Careers) | Section reserved, renders nothing | Wording, after legal review across both jurisdictions |

Legal text was written to describe actual behaviour. It is not legal advice and should be
reviewed by a qualified adviser before commercial reliance.

---

## 6. SOCIAL AND PROFESSIONAL CHANNELS

**Where:** `lib/site.ts` → `SOCIAL_CHANNELS`

Currently one entry: Instagram `@xiyato22`. The audit could not verify this profile exists —
Instagram returns HTTP 200 even for nonsensical handles, so status alone proves nothing.

**Confirm** it is correct and public, and supply any additional professional channel
(LinkedIn is a common expectation for a B2B consultancy and is currently absent).

The five client Instagram accounts from the old Experience section were **not** carried over;
client credit now lives in case studies.

---

## 7. VERIFY BEFORE LAUNCH

Carried forward from the audit, still unverified:

1. **Both WhatsApp numbers are live and monitored** — `+44 7882 746212` and
   `+91 70283 11226`. They are the only working conversion channel until email is configured.
2. **The Bahrain engagement description is accurate** — client anonymised as "Luxury interior
   design practice", location Bahrain, scope as documented.
3. **Sultanah & Co. Interiors consent to being named** in a published case study. They are
   the only named client on the site.
4. **The Interior Visualisation case study framing is right** — presented as concept and
   material studies rather than delivered client commissions, which is what the source
   material supported.

---

## 8. DEPLOYMENT CONFIGURATION (dashboard, not code)

1. **Canonical host redirects** — point `www.xiyato.uk` and
   `chaitanya-gaikwad.vercel.app` at `https://xiyato.uk` with permanent redirects. Application
   canonicals already all point at the apex; this is the remaining domain-level step.
2. **Environment variables** — the four from §1.

---

## 9. DEFERRED — NOT BLOCKING

- **Case-study expansion.** Six are published. The data model supports more as a pure data
  operation; the archived material is on `legacy/pre-rebuild-snapshot`.
- **Secure file upload.** Architecture supports it; needs a storage provider, retention
  policy and size/type limits, which also feed the Privacy Policy.
- **Team and specialist records.** `PEOPLE` holds only the founder. Adding real people makes
  those sections appear; no placeholder person exists.
- **Vacancies.** `ROLES` is empty and the zero-vacancy state is the designed default.
