import { NextResponse } from "next/server";
import {
  validateEnquiry,
  hasErrors,
  formatEnquiry,
  type EnquiryPayload,
} from "@/lib/enquiry";
import { saveLead } from "@/lib/crm/leads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Enquiry submission endpoint.
 *
 * ENVIRONMENT CONTRACT — all three are required for delivery to work:
 *   ENQUIRY_PROVIDER_API_KEY  Resend API key (https://resend.com)
 *   ENQUIRY_FROM_EMAIL        Verified sender, e.g. "XIYATO <site@xiyato.uk>"
 *   ENQUIRY_TO_EMAIL          Destination inbox for enquiries
 *   ENQUIRY_TO_EMAIL_CAREERS  Optional separate inbox for talent submissions
 *
 * If the provider is not configured the endpoint returns HTTP 503 and the UI
 * shows a failure state with an alternate contact route. It never reports a
 * false success.
 */

/** Very small in-memory rate limit. Best-effort only — resets on cold start. */
const RECENT = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(key: string): boolean {
  const now = Date.now();
  const hits = (RECENT.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  RECENT.set(key, hits);
  if (RECENT.size > 500) RECENT.clear();
  return hits.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  let body: Partial<EnquiryPayload>;

  try {
    body = (await request.json()) as Partial<EnquiryPayload>;
  } catch {
    return NextResponse.json(
      { ok: false, reason: "invalid", message: "Could not read the submission." },
      { status: 400 },
    );
  }

  // Honeypot: real users never fill this. Accept silently so bots learn nothing.
  if (body.website && String(body.website).trim() !== "") {
    return NextResponse.json({ ok: true, delivered: false }, { status: 200 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      {
        ok: false,
        reason: "rate_limited",
        message: "Too many submissions in a short period. Please try again shortly.",
      },
      { status: 429 },
    );
  }

  // Server-side validation is authoritative.
  const errors = validateEnquiry(body);
  if (hasErrors(errors)) {
    return NextResponse.json(
      { ok: false, reason: "validation", errors },
      { status: 422 },
    );
  }

  const payload = body as EnquiryPayload;
  const isTalent = payload.kind === "talent";

  // Record valid commercial project enquiries in the CRM lifecycle database
  if (!isTalent) {
    try {
      saveLead({
        contactName: payload.name,
        company: payload.company || "Direct Client",
        email: payload.email,
        country: payload.country || "Not specified",
        serviceLine: payload.service || "general",
        acquisitionSource: "Website Inbound Form",
        landingPage: "/contact",
        conversionChannel: "form",
        nextAction: "Review project brief within 1 business day and scope feasibility",
        projectScope: payload.brief,
      });
    } catch (e) {
      console.error("CRM lead save error:", e);
    }
  }

  const apiKey = process.env.ENQUIRY_PROVIDER_API_KEY;
  const from = process.env.ENQUIRY_FROM_EMAIL;
  const to = isTalent
    ? process.env.ENQUIRY_TO_EMAIL_CAREERS ?? process.env.ENQUIRY_TO_EMAIL
    : process.env.ENQUIRY_TO_EMAIL;

  // No provider configured — fail honestly rather than pretending to deliver.
  if (!apiKey || !from || !to) {
    return NextResponse.json(
      {
        ok: false,
        reason: "not_configured",
        message:
          "The enquiry system is not connected to an email provider yet, so this message was not delivered.",
      },
      { status: 503 },
    );
  }

  const subject = isTalent
    ? `Talent network — ${payload.name}`
    : `Project enquiry — ${payload.name}${payload.company ? ` (${payload.company})` : ""}`;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: payload.email,
        subject,
        text: formatEnquiry(payload),
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error("Enquiry delivery failed", response.status, detail);
      return NextResponse.json(
        {
          ok: false,
          reason: "provider_error",
          message: "The message could not be delivered. Please try the alternate route below.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, delivered: true }, { status: 200 });
  } catch (error) {
    console.error("Enquiry delivery threw", error);
    return NextResponse.json(
      {
        ok: false,
        reason: "network_error",
        message: "The message could not be sent. Please try the alternate route below.",
      },
      { status: 502 },
    );
  }
}
