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
 */
export function TalentForm() {
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

    const payload = { ...values, consent, kind: "talent" as const };
    const found = validateEnquiry(payload);

    if (hasErrors(found)) {
      setErrors(found);
      const firstKey = Object.keys(found)[0];
      document.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
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
        typeof data.message === "string" ? data.message : "The submission was not sent.",
      );
      statusRef.current?.focus();
    } catch {
      setStatus("error");
      setFailure("The submission was not sent — the network request failed.");
      statusRef.current?.focus();
    }
  }

  if (status === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="border border-rule bg-paper p-8"
      >
        <p className="label text-success">Submission received</p>
        <h3 className="display mt-4 text-2xl">Thank you — that is on file.</h3>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          Your details have been added to the talent network. We will be in touch directly if
          an engagement matches your discipline. We do not send newsletters or bulk mail.
        </p>
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
