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
        This website collects information in one place: the enquiry forms on the contact and
        careers pages. Nothing is collected automatically as you browse.
      </p>
      <p>When you submit a project enquiry, you may provide:</p>
      <ul>
        <li>Your name and email address, which are required so that we can reply</li>
        <li>Your company, role, telephone number, country and sector, all optional</li>
        <li>The service area and timeline you select</li>
        <li>The project brief you write</li>
      </ul>
      <p>When you submit to the talent network, you may provide:</p>
      <ul>
        <li>Your name and email address</li>
        <li>Your discipline and a link to your portfolio, both optional</li>
        <li>A description of your work</li>
      </ul>

      <h2>What we do with it</h2>
      <p>
        Submissions are sent to XIYÀTO by email so that we can read and respond to them. We
        use the information to reply to your enquiry, to scope work you have asked about, and
        — for talent submissions — to contact you if a relevant engagement arises.
      </p>
      <p>
        We do not sell your information, we do not share it for advertising, and we do not
        add you to a marketing list. We do not send newsletters or bulk email.
      </p>

      <h2>How it is transmitted and stored</h2>
      <p>
        Form submissions are transmitted over an encrypted connection and delivered to us
        through a third-party email delivery provider acting on our instructions. Once
        delivered, submissions are held in our email account.
      </p>
      <p>
        Project enquiries and talent submissions are routed separately. Candidate submissions
        are not mixed into the project enquiry pipeline.
      </p>

      <h2>How long it is kept</h2>
      <p>
        Enquiries are kept for as long as needed to respond and, where an engagement follows,
        for the duration of that engagement and our normal business records period
        afterwards. Talent submissions are kept while they remain relevant. You can ask us to
        delete your information at any time and we will do so unless we are required to keep
        it.
      </p>

      <h2>Cookies and analytics</h2>
      <p>
        This website sets no cookies. It runs no analytics, no advertising pixels and no
        third-party tracking scripts. Nothing is stored in your browser by this site.
      </p>
      <p>
        Web fonts are served from a third-party font provider, which will receive your IP
        address as part of that request. Our hosting provider keeps standard server access
        logs for security and operational purposes.
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
