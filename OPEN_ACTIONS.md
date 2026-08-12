# Open actions

Only items genuinely blocked by access or facts I do not have. Everything else
in the brief is implemented and verified.

---

## 1. Google Search Console — needs the owner's Google account

**Blocked by:** authenticated browser session. This environment has an in-app
browser with no Google session, and signing in would mean handling account
credentials, which is out of bounds. Domain verification additionally needs a
DNS TXT record at the registrar.

Nothing was submitted and no indexing was requested. No verification is claimed.

**Steps:**

1. Open <https://search.google.com/search-console> signed in as the owner.
2. Check whether `xiyato.uk` already exists as a property before adding one —
   do not create a duplicate.
3. If absent, add a **Domain** property (covers `http`/`https`, apex and `www`
   in one) and choose DNS verification. Google will show a TXT record such as:

   ```
   Type: TXT     Host: @     Value: google-site-verification=<token>
   ```

   Add it at the DNS provider for `xiyato.uk`, wait for propagation, then
   press Verify. If DNS is not reachable, fall back to a **URL-prefix** property
   for `https://xiyato.uk` and verify by HTML file or meta tag — send me the
   token and I will deploy it.
4. Submit the sitemap: `https://xiyato.uk/sitemap.xml`
5. Use URL Inspection → Request Indexing on the homepage, `/services`, each of
   the six service pages, `/work`, `/company` and `/contact`. That is ten pages;
   let the sitemap carry the remaining twenty. Do not bulk-request.
6. Record the baseline from Performance, Page Indexing, Core Web Vitals and
   Manual Actions. Send me the top queries and I will retarget the page copy
   against real demand — the keyword clusters in `SEO_SEARCH_SETUP_REPORT.md`
   are hypotheses until then.

## 2. Bing Webmaster Tools — needs the owner's Microsoft account

**Blocked by:** the same authentication limit.

1. Open <https://www.bing.com/webmasters>.
2. Import from Google Search Console once step 1 is done — it carries the
   verification across and is the fastest route.
3. Submit `https://xiyato.uk/sitemap.xml`.
4. Run Site Scan and send me the findings.

IndexNow was evaluated and deliberately not implemented: it needs a key file
plus a submission step on every deploy, which is not worth the moving parts for
a 39-page static site with a correct sitemap.

## 3. Host consolidation — needs DNS or Vercel access

`www.xiyato.uk` and `chaitanya-gaikwad.vercel.app` should 301 to
`https://xiyato.uk`. Self-referencing canonicals are in place and mitigate
duplicate-content risk, but they do not consolidate ranking signals.

In Vercel → Project → Settings → Domains, set `xiyato.uk` as primary and mark
the others as redirects. I can do this if given access.

## 4. Contact form delivery — needs an email provider secret

The enquiry API is built but has no provider configured. It does **not** fake
success. Four environment variables are required in Vercel:

```
ENQUIRY_PROVIDER      the provider name
ENQUIRY_API_KEY       provider API key
ENQUIRY_TO_EMAIL      destination address
ENQUIRY_FROM_EMAIL    verified sender address
```

Set them as encrypted Environment Variables in the Vercel dashboard, never in
the repository. Send them through a channel you are comfortable with and I will
wire and test delivery — or add them yourself and tell me, and I will verify.

## 5. Third-party consent for one withheld image

`vis-12` carries another studio's branding ("ERWIN ERENO DESIGN STUDIO"). It is
excluded from the gallery and removed from the public path. It can be published
only with that studio's written permission.

## 6. Facts I will not invent — supply them and I will publish them

Each of these is deliberately absent rather than guessed:

- **Legal status.** No "Ltd", "Limited", company number, VAT number or
  registered office appears anywhere. Verified: zero occurrences in the
  rendered site.
- **Addresses.** Locations are country-level only. `lib/company.ts` has an
  `addressLines` field that stays empty and a `type` field
  (`registered-office` / `correspondence` / `operations`) that stays `null`
  until the classification is legally accurate.
- **Trading history.** No founding date or years-in-business claim.
- **Team size.** Founder plus a specialist network. No headcount is stated.
- **Outcomes.** No metrics, conversion rates, testimonials, client logos or
  ratings. The Growth service explicitly does not guarantee response rates,
  meetings, enquiries or revenue.

## 7. Security housekeeping

The GitHub personal access token embedded in the original clone URL should be
rotated. It has been in shell history since the first session.

---

## Not blocked — done and verified

Recorded here so nothing above is mistaken for outstanding work: colour system,
media artefact diagnosis and fixes, brand asset generation, founder portrait,
restored section divider, decorative vector system, all copy, Company expansion,
Work reorganisation, mobile composition, touch targets, metadata, schema,
sitemap, robots, canonicals, redirect integrity and internal linking.
