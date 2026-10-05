import Link from "next/link";

/**
 * Legal copy is written to describe what this website actually does.
 * It is deliberately conservative and contains no fabricated corporate,
 * registration or jurisdictional claims. It is not legal advice, and it should
 * be reviewed by a qualified adviser before it is relied upon commercially.
 */

export function PrivacyContent() {
  return (
    <>
      <p>
        This policy explains what happens to information you send to XIYÀTO through this
        website. It covers this website only.
      </p>

      <h2>What this website collects</h2>
      <p>
        We collect information through our project enquiry and talent forms, as well as operational telemetry necessary to evaluate inbound commercial enquiries:
      </p>
      <p><strong>When you submit a project enquiry, you may provide:</strong></p>
      <ul>
        <li>Your name and business email address (required to respond)</li>
        <li>Your company, role, telephone number, country, and sector (optional)</li>
        <li>The service area and delivery timeframe you select</li>
        <li>Your project brief and description</li>
        <li>Optional project drawing packages, CAD files, or specification documents (PDF, DWG, DXF, ZIP, images up to 50MB)</li>
      </ul>
      <p><strong>When you submit to the talent network, you may provide:</strong></p>
      <ul>
        <li>Your name, email address, discipline, and portfolio link</li>
        <li>A summary of your technical production experience</li>
      </ul>
      <p><strong>Visit statistics and attribution:</strong></p>
      <p>
        When you arrive via a marketing link or directory listing, campaign identifiers (such as <code>utm_source</code>, <code>utm_medium</code>, and <code>utm_campaign</code>) are read from the URL to identify which channel referred your visit. We also count visits and a small set of actions, such as clicking a WhatsApp, telephone or email link, opening the enquiry form or sending it, so we can see which pages and contact routes are useful. How this is measured is set out under <a href="#analytics">Analytics</a> below.
      </p>

      <h2>What we do with it</h2>
      <p>
        Submissions and attachments are used solely to evaluate project feasibility, provide technical drafting or CGI quotations, and communicate with you about your request. We do not sell your information, we do not share it with advertising networks, and we do not use your details for unsolicited consumer marketing lists.
      </p>

      <h2>How it is transmitted and stored</h2>
      <p>
        All communications are encrypted in transit using standard Transport Layer Security (HTTPS). Form submissions are processed through secure server-side pipelines and delivered directly to the studio's operational inboxes.
      </p>
      <p>
        Project specification files uploaded through the contact form are retained solely for technical assessment during the scoping period and are permanently deleted after 30 days unless an active commercial engagement is commissioned under separate contract.
      </p>

      <h2 id="analytics">Analytics</h2>
      <p>
        <strong>Vercel Web Analytics and Speed Insights (always on, no cookies).</strong> Our host,
        Vercel, provides aggregated visit statistics and page-speed measurements. They set no
        cookies and store nothing in your browser. Vercel tells visitors apart within a single day
        using a short-lived hash of the request rather than a stored identifier, and we only see
        totals such as page views, referring sites, countries, device types and loading times. Page
        addresses are reported without query parameters other than campaign (<code>utm_</code>)
        identifiers. The actions listed above are counted here with the page they happened on and
        one short detail, for example which WhatsApp line was used or which form was sent.
      </p>
      <p>
        <strong>Google Analytics 4 (only if you accept).</strong> We may use Google Analytics to
        understand in more detail how visitors find and use the site. It is off by default: until
        you choose &ldquo;Accept analytics&rdquo; in the cookie banner, no Google Analytics script is
        loaded and no Google Analytics cookie is set. If you accept, Google Analytics sets the
        cookies <code>_ga</code> and <code>_ga_&lt;ID&gt;</code> (which keep a random visitor and
        session identifier for up to two years) and receives the pages you view, the actions listed
        above, the page you first landed on, the referring site and any campaign identifiers. Google
        processes this data on our behalf and may process it outside the United Kingdom. Advertising
        features stay disabled: the advertising consent signals (<code>ad_storage</code>,{" "}
        <code>ad_user_data</code>, <code>ad_personalization</code>) remain denied.
      </p>
      <p>
        You can change your choice at any time with the &ldquo;Cookie settings&rdquo; link in the
        footer. Declining after accepting stops Google Analytics and removes its cookies from this
        site.
      </p>
      <p>
        None of these tools receive the name, email address, telephone number or brief you type into
        our forms.
      </p>

      <h2>Browser storage and cookies</h2>
      <p>
        This website does not set advertising cookies or cross-site tracking pixels. The only
        cookies it can set are the Google Analytics cookies described above, and only after you
        accept them.
      </p>
      <p>
        Your cookie choice is remembered in your browser&apos;s local storage (under the name{" "}
        <code>xiyato-analytics-consent</code>) so the banner does not reappear on every page. To
        preserve referral attribution while you navigate between pages during a single visit,
        incoming campaign parameters, the page you landed on and the referring site may be
        temporarily held in your browser&apos;s session memory (<code>sessionStorage</code>). This
        data contains no personal identifiers and is erased by your browser when the tab or window
        is closed.
      </p>
      <p>
        Our hosting infrastructure (Vercel) logs standard server access requests (including IP address, user agent, and request path) for infrastructure security, DDoS mitigation, and operational monitoring.
      </p>

      <h2>Links to other sites</h2>
      <p>
        This website links to external platforms, including messaging and social channels.
        Once you follow such a link, the privacy practices of that platform apply rather than
        ours.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on where you are located, you may have the right to ask what information we
        hold about you, to have it corrected, to have it deleted, or to object to how we use
        it. To make any of these requests, contact us through the{" "}
        <Link href="/contact">contact page</Link>.
      </p>

      <h2>Changes</h2>
      <p>
        If what this website collects or how it is handled changes, this page will be updated
        and the date at the top will change with it.
      </p>
    </>
  );
}

export function TermsContent() {
  return (
    <>
      <p>
        These terms apply to your use of this website. They do not govern any commercial
        engagement with XIYÀTO — that is covered by the separate written scope and terms
        agreed for each project.
      </p>

      <h2>About this website</h2>
      <p>
        This website is operated by XIYÀTO, a production studio working across technical
        documentation, growth operations and visual content, with a UK-facing presence and
        production in India.
      </p>

      <h2>Using this website</h2>
      <p>You may read, browse and share this website. You may not:</p>
      <ul>
        <li>Use it in a way that damages, disables or overburdens it</li>
        <li>Attempt to gain unauthorised access to any part of it or its systems</li>
        <li>Use automated systems to extract content at a scale that disrupts the service</li>
        <li>Submit unlawful, misleading or malicious content through its forms</li>
      </ul>

      <h2>Content and intellectual property</h2>
      <p>
        The text, layout, design and code of this website belong to XIYÀTO unless stated
        otherwise. Project imagery, drawings and film shown in case studies remain the
        property of XIYÀTO or the relevant client and are published here as portfolio
        material with permission. None of it may be reproduced or redistributed without
        written consent.
      </p>
      <p>
        Where a client is not named on a case study, that is deliberate, and you should not
        attempt to infer or publish their identity.
      </p>

      <h2>Accuracy of information</h2>
      <p>
        We aim to keep this website accurate and current. Descriptions of services, processes
        and past engagements are provided for information and do not form an offer, a quote
        or a commitment to deliver on particular terms. Any engagement is governed by the
        written scope agreed for that project.
      </p>

      <h2>Scope of our services</h2>
      <p>
        XIYÀTO provides drafting, documentation, research and visual production capacity
        working from design direction supplied by the client. We do not provide architectural
        or engineering certification, statutory approval, building-control compliance sign-off
        or architect-of-record responsibility. Drawings and other deliverables are issued for
        review by the client&apos;s own qualified designer, draftsman or technical consultant
        and should not be relied upon for construction without that review.
      </p>

      <h2>Enquiries submitted through this site</h2>
      <p>
        Submitting an enquiry does not create a contract or oblige either party to proceed.
        Please do not send confidential or commercially sensitive material through the enquiry
        form before an engagement and any necessary confidentiality terms are agreed.
      </p>

      <h2>External links</h2>
      <p>
        This website links to third-party sites and platforms that we do not control. We are
        not responsible for their content, availability or practices.
      </p>

      <h2>Availability and liability</h2>
      <p>
        This website is provided on an &ldquo;as available&rdquo; basis. We do not warrant
        that it will be uninterrupted or error-free. To the extent permitted by law, we are
        not liable for loss arising from your use of, or inability to use, this website.
        Nothing here limits liability that cannot lawfully be limited.
      </p>

      <h2>Changes to these terms</h2>
      <p>
        These terms may be updated from time to time. The date at the top of this page shows
        when they were last reviewed.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms can be sent through the{" "}
        <Link href="/contact">contact page</Link>.
      </p>
    </>
  );
}
