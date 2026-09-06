"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  TextField,
  TextArea,
  SelectField,
  CheckboxField,
  Honeypot,
} from "./fields";
import {
  validateEnquiry,
  hasErrors,
  SERVICE_OPTIONS,
  TIMELINE_OPTIONS,
  type FieldErrors,
} from "@/lib/enquiry";
import { DIRECT_CHANNELS } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

type SubmittedLeadData = {
  subject: string;
  body: string;
  mailtoUrl: string;
  gmailUrl: string;
  leadReference?: string;
};

const EMPTY = {
  name: "",
  email: "",
  company: "",
  role: "",
  phone: "",
  country: "",
  sector: "",
  service: "",
  timeline: "",
  brief: "",
  website: "",
};

export function EnquiryForm() {
  const [values, setValues] = useState(EMPTY);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [failure, setFailure] = useState<string | null>(null);
  const [attachment, setAttachment] = useState<{ name: string; size: string } | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [attachmentError, setAttachmentError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<SubmittedLeadData | null>(null);
  const [copied, setCopied] = useState(false);
  const statusRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setAttachmentError(null);
    const MAX_SIZE = 50 * 1024 * 1024; // 50MB
    if (file.size > MAX_SIZE) {
      setAttachmentError("File exceeds 50MB limit. For large CAD archives or 3D models, please share a cloud link in the brief.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    const formattedSize =
      file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${Math.round(file.size / 1024)} KB`;

    setSelectedFile(file);
    setAttachment({
      name: file.name,
      size: formattedSize,
    });
  }

  function removeAttachment() {
    setAttachment(null);
    setSelectedFile(null);
    setAttachmentError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function set(field: keyof typeof EMPTY) {
    return (value: string) => {
      setValues((v) => ({ ...v, [field]: value }));
      setErrors((e) => ({ ...e, [field]: undefined }));
    };
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let uploadedFileId: string | undefined;

    // If a drawing or specification file is attached, upload it first to the secure private vault
    if (selectedFile) {
      try {
        const uploadForm = new FormData();
        uploadForm.append("file", selectedFile);
        const upRes = await fetch("/api/upload", {
          method: "POST",
          body: uploadForm,
        });
        if (upRes.ok) {
          const upData = await upRes.json();
          uploadedFileId = upData.fileId;
        } else {
          const errData = await upRes.json().catch(() => ({}));
          setAttachmentError(errData.error || "Failed to upload file package.");
          return;
        }
      } catch {
        setAttachmentError("Network error uploading attachment. Please check your connection.");
        return;
      }
    }

    const payload = {
      ...values,
      consent,
      kind: "project" as const,
      attachmentName: attachment?.name,
      attachmentSize: attachment?.size,
      fileId: uploadedFileId,
    };
    const found = validateEnquiry(payload);

    if (hasErrors(found)) {
      setErrors(found);
      setStatus("idle");
      // Move focus to the first invalid control.
      const firstKey = Object.keys(found)[0];
      const el = document.querySelector<HTMLElement>(`[name="${firstKey}"]`);
      el?.focus();
      return;
    }

    const serviceOption = SERVICE_OPTIONS.find((s) => s.value === payload.service);
    const serviceName = serviceOption?.label || payload.service || "General enquiry";
    const subject = `Project enquiry — ${payload.name}${payload.company ? ` (${payload.company})` : ""} [${serviceName}]`;

    const emailBody = [
      "XIYÀTO PROJECT ENQUIRY BRIEF",
      "==================================================",
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      payload.company ? `Company: ${payload.company}` : null,
      payload.role ? `Role: ${payload.role}` : null,
      payload.phone ? `Phone: ${payload.phone}` : null,
      payload.country ? `Country: ${payload.country}` : null,
      payload.sector ? `Sector: ${payload.sector}` : null,
      `Service: ${serviceName}`,
      payload.timeline ? `Timeline: ${payload.timeline}` : null,
      attachment ? `Attached Drawing/Spec: ${attachment.name} (${attachment.size})` : null,
      uploadedFileId ? `Private Vault Reference: ${uploadedFileId}` : null,
      "",
      "==================================================",
      "PROJECT BRIEF & SCOPE:",
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
        setAttachment(null);
        setSelectedFile(null);
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

      // Even if server dispatch is unconfigured or unavailable, prepare email immediately for user
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
      setAttachment(null);
      setSelectedFile(null);
      statusRef.current?.focus();

      try {
        window.location.href = mailtoUrl;
      } catch {
        // Fallback safely to on-page buttons
      }
      return;
    } catch {
      // Network failure: ensure client can still send via their email client without loss
      setSubmittedData({
        subject,
        body: emailBody,
        mailtoUrl,
        gmailUrl,
      });
      setStatus("success");
      setValues(EMPTY);
      setConsent(false);
      setAttachment(null);
      setSelectedFile(null);
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
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 text-white">
              <path d="M3.5 8.5l3 3 6-6" />
            </svg>
          </span>
          <p className="label text-success text-xs uppercase tracking-wider font-mono">Enquiry structured &amp; recorded</p>
        </div>

        <h3 className="display mt-3 text-2xl sm:text-3xl">
          Your brief is prepared and ready to send.
        </h3>

        {submittedData.leadReference ? (
          <div className="mt-3 inline-flex items-center gap-2 rounded-xs border border-rule bg-paper px-3 py-1 font-mono text-xs text-ink-muted">
            <span>Reference:</span>
            <span className="font-semibold text-ink">{submittedData.leadReference}</span>
          </div>
        ) : null}

        <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">
          We have formatted your brief with all project specifications. Your email app or Gmail should have opened with this prefilled message. If not, click below to open and send directly:
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
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ink-muted">
              <rect width="20" height="16" x="2" y="4" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
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
              <span>Copy brief text</span>
            )}
          </button>
        </div>

        {/* Structured Email Preview Box */}
        <div className="mt-8 rounded-xs border border-rule bg-paper p-4 sm:p-5">
          <div className="border-b border-rule pb-3 text-xs text-ink-muted space-y-1 font-mono">
            <p><span className="font-semibold text-ink">To:</span> hello@xiyato.uk</p>
            <p><span className="font-semibold text-ink">Subject:</span> {submittedData.subject}</p>
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
          &larr; Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-10">
      {status === "error" ? (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="border border-error/40 bg-accent-wash p-6"
        >
          <p className="text-sm font-semibold text-error">Your message was not sent</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{failure}</p>
          {DIRECT_CHANNELS.length > 0 ? (
            <div className="mt-4">
              <p className="text-sm text-ink-soft">
                In the meantime you can reach the studio directly:
              </p>
              <ul className="mt-2 space-y-1">
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
            </div>
          ) : null}
        </div>
      ) : null}

      {/* --- About you --- */}
      <fieldset className="space-y-6">
        <legend className="label mb-2">About you</legend>
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
          <TextField
            label="Company"
            name="company"
            autoComplete="organization"
            value={values.company}
            onChange={set("company")}
          />
          <TextField
            label="Your role"
            name="role"
            autoComplete="organization-title"
            value={values.role}
            onChange={set("role")}
          />
          <TextField
            label="Phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={set("phone")}
          />
          <TextField
            label="Country"
            name="country"
            autoComplete="country-name"
            value={values.country}
            onChange={set("country")}
          />
        </div>
      </fieldset>

      {/* --- The project --- */}
      <fieldset className="space-y-6">
        <legend className="label mb-2">The project</legend>
        <div className="grid gap-6 sm:grid-cols-2">
          <SelectField
            label="Service"
            name="service"
            required
            value={values.service}
            onChange={set("service")}
            options={SERVICE_OPTIONS}
            error={errors.service}
            placeholder="Select the closest fit"
          />
          <SelectField
            label="Timeline"
            name="timeline"
            value={values.timeline}
            onChange={set("timeline")}
            options={TIMELINE_OPTIONS}
            placeholder="Select a timeframe"
          />
        </div>

        <TextField
          label="Sector"
          name="sector"
          hint="For example: interior design, fit-out, furniture, hospitality."
          value={values.sector}
          onChange={set("sector")}
        />

        <TextArea
          label="Project brief"
          name="brief"
          required
          rows={8}
          hint="What needs producing, what material already exists, and what is fixed. It does not need to be complete — establishing that is the first step."
          value={values.brief}
          onChange={set("brief")}
          error={errors.brief}
        />

        {/* Project Drawings & Specifications Attachment */}
        <div className="rounded-lg border border-rule bg-surface p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label htmlFor="project-attachment" className="label text-[0.6875rem] text-ink">
              Project drawings or specification (Optional)
            </label>
            <span className="text-[0.625rem] text-ink-muted">PDF, DWG, DXF, ZIP, JPG (Max 50MB)</span>
          </div>

          <div className="mt-3">
            {!attachment ? (
              <div>
                <input
                  ref={fileInputRef}
                  id="project-attachment"
                  type="file"
                  accept=".pdf,.dwg,.dxf,.zip,.jpg,.jpeg,.png,.rar,.7z"
                  onChange={handleFileChange}
                  className="block w-full text-xs text-ink file:mr-4 file:rounded-xs file:border file:border-rule file:bg-paper file:px-4 file:py-2 file:text-xs file:font-medium file:text-ink hover:file:border-ink hover:file:bg-surface cursor-pointer"
                />
              </div>
            ) : (
              <div className="flex items-center justify-between rounded-xs border border-rule bg-paper px-4 py-2.5">
                <div className="flex items-center gap-2 truncate">
                  <span className="font-mono text-xs text-ink truncate">{attachment.name}</span>
                  <span className="text-[0.625rem] text-ink-muted shrink-0">({attachment.size})</span>
                </div>
                <button
                  type="button"
                  onClick={removeAttachment}
                  className="ml-3 text-xs text-accent hover:underline shrink-0"
                >
                  Remove
                </button>
              </div>
            )}

            {attachmentError ? (
              <p className="mt-2 text-xs text-accent">{attachmentError}</p>
            ) : null}

            <p className="mt-3 text-[0.6875rem] leading-relaxed text-ink-muted">
              Files are encrypted in transit, retained solely for technical review, and deleted after 30 days. For confidential packages or archives &gt;50MB, share a private link in the brief or reply to our email.
            </p>
          </div>
        </div>
      </fieldset>

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

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex min-h-[48px] items-center justify-center rounded-xs bg-ink px-8 text-sm font-medium tracking-tight text-paper transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Send enquiry"}
        </button>
        <p className="text-xs text-ink-muted">Fields marked * are required.</p>
      </div>
    </form>
  );
}
