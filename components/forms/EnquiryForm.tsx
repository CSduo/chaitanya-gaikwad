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
  const statusRef = useRef<HTMLDivElement>(null);

  function set(field: keyof typeof EMPTY) {
    return (value: string) => {
      setValues((v) => ({ ...v, [field]: value }));
      setErrors((e) => ({ ...e, [field]: undefined }));
    };
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload = { ...values, consent, kind: "project" as const };
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
        setStatus("success");
        setValues(EMPTY);
        setConsent(false);
        statusRef.current?.focus();
        return;
      }

      if (res.status === 422 && data.errors) {
        setErrors(data.errors as FieldErrors);
        setStatus("idle");
        return;
      }

      setStatus("error");
      setFailure(
        typeof data.message === "string"
          ? data.message
          : "The message could not be sent.",
      );
      statusRef.current?.focus();
    } catch {
      setStatus("error");
      setFailure("The message could not be sent — the network request failed.");
      statusRef.current?.focus();
    }
  }

  if (status === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="border border-rule bg-surface p-8 lg:p-10"
      >
        <p className="label text-success">Enquiry received</p>
        <h3 className="display mt-4 text-2xl">Thank you — that has come through.</h3>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
          Your enquiry has been sent to the founder directly. You can expect a reply within
          one working day. If the project has supporting drawings or files, you can send them
          in reply to that first message.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 min-h-[44px] text-sm font-medium text-ink underline decoration-rule-strong underline-offset-4 hover:text-accent"
        >
          Send another enquiry
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

        <p className="border-l border-rule-strong pl-4 text-sm leading-relaxed text-ink-muted">
          Drawings, PDFs and reference files can be sent in reply to our first message —
          there is no need to attach anything here.
        </p>
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
