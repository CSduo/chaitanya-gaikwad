# XIYÀTO — Website

Marketing and business website for XIYÀTO, a production studio delivering technical
documentation, growth operations and visual content for design-led businesses.

**Production:** https://xiyato.uk

---

## Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript, `strict` enabled |
| Styling | Tailwind CSS v4 (tokens declared in `app/globals.css`) |
| Fonts | `next/font` — Newsreader, IBM Plex Sans, IBM Plex Mono (self-hosted at build) |
| Rendering | Static prerendering; every route returns crawlable HTML |
| Hosting | Vercel |

Pages are prerendered at build time. `/work` is server-rendered on demand because it reads
the `?category` search param. `/api/enquiry` is a dynamic route handler.

---

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

| Script | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |

---

## Project structure

```
app/                      Routes (App Router)
  page.tsx                Home
  work/                   Work index + [slug] case studies
  services/               Services overview + [slug] service pages
  company/                Company, people, locations
  careers/  contact/      Careers and contact
  legal/[slug]/           Legal pages, gated by publication flags
  api/enquiry/            Enquiry submission handler
  sitemap.ts robots.ts    Generated from the route data
  opengraph-image.tsx     Generated share image
components/
  site/                   Header, Footer, MobileNav, CTA, legacy hash shim
  work/                   Case-study cards, drawing set, gallery, video, filter
  forms/                  Enquiry and talent forms, field primitives
  ui/                     Layout and typographic primitives
lib/
  site.ts                 Brand, navigation, contact channels
  services.ts             The three services
  case-studies.ts         Case-study data model and records
  company.ts              People, locations, careers, legal publication state
  enquiry.ts              Shared form validation
  seo.ts                  Metadata and structured-data builders
public/media/             Curated production assets only
```

---

## Content model

Content lives in typed data under `lib/`, not in components. Adding a case study, person,
location or role is a data operation.

**Publication is gated by data.** Anything unverified stays `null` or `false` and the UI
omits it entirely rather than rendering a placeholder:

- `COMPANY_REGISTRATION` is `null` → the footer legal block renders nothing
- `LOCATIONS[].addressLines` is empty → no address is output
- `LOCATIONS[].type` is `null` → no classification is claimed
- `CONTACT_CHANNELS[].email` is `null` → that channel is not published
- `LEGAL_PAGES[].published` is `false` → no footer link, no sitemap entry, and a real 404
- `ROLES` is empty → Careers renders its designed zero-vacancy state

See `IMPLEMENTATION_OPEN_FACTS.md` for what is still outstanding.

---

## Environment

The enquiry form needs an email provider to deliver. Without it the form still validates and
fails honestly — it never reports a false success.

```bash
# .env.local
ENQUIRY_PROVIDER_API_KEY=   # Resend API key
ENQUIRY_FROM_EMAIL=         # Verified sender, e.g. "XIYATO <site@xiyato.uk>"
ENQUIRY_TO_EMAIL=           # Destination for project enquiries
ENQUIRY_TO_EMAIL_CAREERS=   # Optional: separate inbox for talent submissions
```

No other environment variables are used. No analytics or tracking is installed.

---

## Conventions

- Navigation is always a real `<a href>`. No clickable-div navigation.
- Focus is never removed without a visible replacement.
- Images use `next/image` with intrinsic dimensions; only the LCP image is prioritised.
- Video is poster-first and click-to-load — no autoplay, no preload.
- Conditional sections omit entirely when their data is absent.
- No invented clients, people, addresses, registration details, testimonials or metrics.
