"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { TextField, TextArea, SelectField, CheckboxField, Honeypot } from "./fields";
import {
  validateEnquiry,
  hasErrors,
  DISCIPLINE_OPTIONS,
  type FieldErrors,
} from "@/lib/enquiry";
import { DIRECT_CHANNELS } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

type SubmittedTalentData = {
  subject: string;
  body: string;
  mailtoUrl: string;
  gmailUrl: string;
  leadReference?: string;
};

const EMPTY = {
  name: "",
  email: "",
  discipline: "",
  portfolio: "",
  brief: "",
  website: "",
};

/**
 * Talent-network submission.
 * Shares the backend with project enquiries but is routed and labelled
 * separately — candidate submissions never enter the project pipeline.
 * Formats structured email directly to hello@xiyato.uk and opens candidate's mail client.
 */
export function TalentForm() {
  const [values, setValues] = useState(EMPTY);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [failure, setFailure] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<SubmittedTalentData | null>(null);
  const [copied, setCopied] = useState(false);
  const statusRef = useRef<HTMLDivElement>(null);

  function set(field: keyof typeof EMPTY) {
    return (value: string) => {
      setValues((v) => ({ ...v, [field]: value }));
      setErrors((e) => ({ ...e, [field]: undefined }));
    };
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload = { ...values, consent, kind: "talent" as const };
    const found = validateEnquiry(payload);

    if (hasErrors(found)) {
      setErrors(found);
      const firstKey = Object.keys(found)[0];
      document.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
      return;
    }

    const disciplineOption = DISCIPLINE_OPTIONS.find((d) => d.value === payload.discipline);
    const disciplineName = disciplineOption?.label || payload.discipline || "Specialist Application";
    const subject = `Talent network application — ${payload.name} [${disciplineName}]`;

    const emailBody = [
      "XIYÀTO TALENT NETWORK APPLICATION",
      "==================================================",
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Discipline: ${disciplineName}`,
      payload.portfolio ? `Portfolio / Work Link: ${payload.portfolio}` : null,
      "",
      "==================================================",
      "ABOUT YOUR WORK & CAPABILITIES:",
      "==================================================",
      payload.brief,
      "==================================================",
    ]
      .filter((line) => line !== null)
      .join("\n");

    const toEmail = "hello@xiyato.uk";
    const mailtoUrl = `mailto:${toEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${toEmail}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

    setErrors({});
    setStatus("submitting");
    setFailure(null);

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setSubmittedData({
          subject,
          body: emailBody,
          mailtoUrl,
          gmailUrl,
          leadReference: data.leadReference,
        });
        setStatus("success");
        setValues(EMPTY);
        setConsent(false);
        statusRef.current?.focus();

        // Attempt automatic mailto trigger for immediate composition
        try {
          window.location.href = mailtoUrl;
        } catch {
          // Fallback safely to on-page buttons
        }
        return;
      }

      if (res.status === 422 && data.errors) {
        setErrors(data.errors as FieldErrors);
        setStatus("idle");
        return;
      }

      // Even if server dispatch is unconfigured or unavailable, prepare email immediately for applicant
      setSubmittedData({
        subject,
        body: emailBody,
        mailtoUrl,
        gmailUrl,
        leadReference: data?.leadReference,
      });
      setStatus("success");
      setValues(EMPTY);
      setConsent(false);
      statusRef.current?.focus();

      try {
        window.location.href = mailtoUrl;
      } catch {
        // Fallback safely to on-page buttons
      }
      return;
    } catch {
      // Network failure: ensure applicant can still send via their email client without data loss
      setSubmittedData({
        subject,
        body: emailBody,
        mailtoUrl,
        gmailUrl,
      });
      setStatus("success");
      setValues(EMPTY);
      setConsent(false);
      statusRef.current?.focus();

      try {
        window.location.href = mailtoUrl;
      } catch {
        // Fallback safely to on-page buttons
      }
      return;
    }
  }

  if (status === "success" && submittedData) {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="rounded-lg border border-rule-strong bg-surface p-6 sm:p-8 lg:p-10 shadow-xs"
      >
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink text-paper">
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5 text-white"
            >
              <path d="M3.5 8.5l3 3 6-6" />
            </svg>
          </span>
          <p className="label text-success text-xs uppercase tracking-wider font-mono">
            Application structured &amp; recorded
          </p>
        </div>

        <h3 className="display mt-3 text-2xl sm:text-3xl">
          Your candidate brief is prepared and ready to send.
        </h3>

        {submittedData.leadReference ? (
          <div className="mt-3 inline-flex items-center gap-2 rounded-xs border border-rule bg-paper px-3 py-1 font-mono text-xs text-ink-muted">
            <span>Reference:</span>
            <span className="font-semibold text-ink">{submittedData.leadReference}</span>
          </div>
        ) : null}

        <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">
          We have formatted your profile details into a direct application. Your email client or Gmail should have opened with this prefilled message to <strong className="text-ink font-mono font-medium">hello@xiyato.uk</strong>. If not, click below to open and dispatch:
        </p>

        {/* Action Buttons to Open Email */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={submittedData.gmailUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xs bg-ink px-5 text-xs sm:text-sm font-semibold tracking-tight text-paper transition-colors hover:bg-accent"
          >
            <span>Open in Gmail (Web)</span>
            <span aria-hidden="true">&#8599;</span>
          </a>

          <a
            href={submittedData.mailtoUrl}
            className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xs border border-rule-strong bg-paper px-5 text-xs sm:text-sm font-semibold tracking-tight text-ink transition-colors hover:border-ink hover:bg-paper-deep"
          >
            <svg
              viewBox="0 0 24 24"
              width="15"
              height="15"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-ink-muted"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span>Open in Mail App</span>
          </a>

          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(submittedData.body);
              setCopied(true);
              setTimeout(() => setCopied(false), 3000);
            }}
            className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xs border border-rule bg-paper px-4 text-xs font-medium text-ink-soft transition-colors hover:border-ink hover:text-ink"
          >
            {copied ? (
              <span className="text-success font-medium">✓ Copied to clipboard</span>
            ) : (
              <span>Copy application text</span>
            )}
          </button>
        </div>

        {/* Structured Email Preview Box */}
        <div className="mt-8 rounded-xs border border-rule bg-paper p-4 sm:p-5">
          <div className="border-b border-rule pb-3 text-xs text-ink-muted space-y-1 font-mono">
            <p>
              <span className="font-semibold text-ink">To:</span> hello@xiyato.uk
            </p>
            <p>
              <span className="font-semibold text-ink">Subject:</span> {submittedData.subject}
            </p>
          </div>
          <pre className="mt-3 max-h-72 overflow-y-auto font-mono text-[0.75rem] leading-relaxed text-ink-soft whitespace-pre-wrap select-all">
            {submittedData.body}
          </pre>
        </div>

        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setSubmittedData(null);
          }}
          className="mt-8 min-h-[44px] text-xs font-medium text-ink underline decoration-rule-strong underline-offset-4 hover:text-accent"
        >
          &larr; Register another specialist profile
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8 border border-rule bg-paper p-7 lg:p-8">
      {status === "error" ? (
        <div ref={statusRef} tabIndex={-1} role="alert" className="border border-error/40 bg-accent-wash p-5">
          <p className="text-sm font-semibold text-error">Your submission was not sent</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{failure}</p>
          {DIRECT_CHANNELS.length > 0 ? (
            <ul className="mt-3 space-y-1">
              {DIRECT_CHANNELS.map((c) => (
                <li key={c.id}>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-ink underline decoration-rule-strong underline-offset-4 hover:text-accent"
                  >
                    {c.label} — {c.value}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          label="Name"
          name="name"
          required
          autoComplete="name"
          value={values.name}
          onChange={set("name")}
          error={errors.name}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={values.email}
          onChange={set("email")}
          error={errors.email}
        />
      </div>

      <SelectField
        label="Discipline"
        name="discipline"
        value={values.discipline}
        onChange={set("discipline")}
        options={DISCIPLINE_OPTIONS}
        placeholder="Select your discipline"
      />

      <TextField
        label="Portfolio link"
        name="portfolio"
        type="url"
        hint="A website, drive folder or profile we can review."
        value={values.portfolio}
        onChange={set("portfolio")}
      />

      <TextArea
        label="About your work"
        name="brief"
        required
        rows={6}
        hint="What you do, the tools you work in, and the kind of engagement you are looking for."
        value={values.brief}
        onChange={set("brief")}
        error={errors.brief}
      />

      <Honeypot value={values.website} onChange={set("website")} />

      <CheckboxField
        name="consent"
        checked={consent}
        onChange={(v) => {
          setConsent(v);
          setErrors((e) => ({ ...e, consent: undefined }));
        }}
        error={errors.consent}
        label={
          <>
            I have read how XIYÀTO handles the information submitted through this form, set
            out in the{" "}
            <Link
              href="/legal/privacy"
              className="text-ink underline decoration-rule-strong underline-offset-4 hover:text-accent"
            >
              privacy policy
            </Link>
            .
          </>
        }
      />

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex min-h-[48px] items-center justify-center rounded-xs bg-ink px-8 text-sm font-medium tracking-tight text-paper transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Join the talent network"}
      </button>
    </form>
  );
}
