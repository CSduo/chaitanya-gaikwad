import { SERVICES } from "./services";

/**
 * Shared enquiry validation.
 * Used by the client for immediate feedback and by the route handler as the
 * authoritative check — the client copy is a convenience, never the gate.
 */

export type EnquiryKind = "project" | "talent";

export type EnquiryPayload = {
  kind: EnquiryKind;
  name: string;
  email: string;
  service?: string;
  brief: string;
  consent: boolean;
  // Optional
  company?: string;
  role?: string;
  phone?: string;
  country?: string;
  sector?: string;
  timeline?: string;
  portfolio?: string;
  discipline?: string;
  // Anti-spam honeypot — must stay empty.
  website?: string;
};

export type FieldErrors = Partial<Record<keyof EnquiryPayload, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const SERVICE_OPTIONS = [
  ...SERVICES.map((s) => ({ value: s.slug, label: s.name })),
  { value: "multiple", label: "More than one / not sure yet" },
];

export const DISCIPLINE_OPTIONS = [
  ...SERVICES.map((s) => ({ value: s.slug, label: s.shortName })),
  { value: "other", label: "Other" },
];

export const TIMELINE_OPTIONS = [
  { value: "urgent", label: "Immediate — deadline already fixed" },
  { value: "weeks", label: "Within the next few weeks" },
  { value: "quarter", label: "This quarter" },
  { value: "exploring", label: "Exploring / no fixed date" },
];

export function validateEnquiry(input: Partial<EnquiryPayload>): FieldErrors {
  const errors: FieldErrors = {};
  const kind = input.kind === "talent" ? "talent" : "project";

  if (!input.name?.trim()) {
    errors.name = "Enter your name.";
  } else if (input.name.trim().length > 120) {
    errors.name = "That name is longer than we can accept.";
  }

  if (!input.email?.trim()) {
    errors.email = "Enter an email address so we can reply.";
  } else if (!EMAIL_RE.test(input.email.trim())) {
    errors.email = "That email address does not look valid.";
  }

  if (kind === "project") {
    if (!input.service?.trim()) {
      errors.service = "Select the service closest to what you need.";
    } else if (!SERVICE_OPTIONS.some((o) => o.value === input.service)) {
      errors.service = "Select one of the listed services.";
    }
  }

  if (!input.brief?.trim()) {
    errors.brief =
      kind === "project"
        ? "Describe the project, even briefly."
        : "Describe the work you do.";
  } else if (input.brief.trim().length < 20) {
    errors.brief = "A little more detail would help — around twenty characters minimum.";
  } else if (input.brief.trim().length > 5000) {
    errors.brief = "That is longer than the form accepts. Please summarise.";
  }

  if (!input.consent) {
    errors.consent = "Please confirm you have read how we handle your information.";
  }

  return errors;
}

export function hasErrors(errors: FieldErrors): boolean {
  return Object.keys(errors).length > 0;
}

/** Plain-text body for the notification email. */
export function formatEnquiry(payload: EnquiryPayload): string {
  const rows: [string, string | undefined][] =
    payload.kind === "project"
      ? [
          ["Type", "Project enquiry"],
          ["Name", payload.name],
          ["Email", payload.email],
          ["Company", payload.company],
          ["Role", payload.role],
          ["Phone", payload.phone],
          ["Country", payload.country],
          ["Sector", payload.sector],
          ["Service", payload.service],
          ["Timeline", payload.timeline],
        ]
      : [
          ["Type", "Talent network"],
          ["Name", payload.name],
          ["Email", payload.email],
          ["Discipline", payload.discipline],
          ["Portfolio", payload.portfolio],
        ];

  const lines = rows
    .filter(([, v]) => Boolean(v && String(v).trim()))
    .map(([k, v]) => `${k}: ${v}`);

  return `${lines.join("\n")}\n\n---\n\n${payload.brief}\n`;
}
