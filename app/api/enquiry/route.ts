import { NextResponse } from "next/server";
import {
  validateEnquiry,
  hasErrors,
  formatEnquiry,
  type EnquiryPayload,
} from "@/lib/enquiry";
import { createLead, updateLeadEmailDelivery } from "@/lib/crm/leads-repository";
import { attachUploadToLead } from "@/lib/storage/uploads-repository";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { logger } from "@/lib/logger";
import crypto from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const correlationId = logger.createCorrelationId();
  let body: Partial<EnquiryPayload>;

  try {
    body = (await request.json()) as Partial<EnquiryPayload>;
  } catch {
    return NextResponse.json(
      { ok: false, reason: "invalid", message: "Could not read the submission." },
      { status: 400 }
    );
  }

  // Honeypot: real users never fill this. Accept silently so bots learn nothing.
  if (body.website && String(body.website).trim() !== "") {
    logger.info("Honeypot triggered, silently swallowed", { correlationId });
    return NextResponse.json({ ok: true, delivered: false }, { status: 200 });
  }

  const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  // Distributed Rate Limiting: max 5 submissions per 60 seconds
  const rate = await checkRateLimit(`enquiry:${clientIp}`, 5, 60);
  if (!rate.allowed) {
    logger.warn("Enquiry rate limit exceeded", { correlationId, clientIp });
    return NextResponse.json(
      {
        ok: false,
        reason: "rate_limited",
        message: "Too many submissions in a short period. Please try again shortly.",
      },
      {
        status: 429,
        headers: { "Retry-After": String(rate.resetSeconds) },
      }
    );
  }

  // Authoritative server-side validation
  const errors = validateEnquiry(body);
  if (hasErrors(errors)) {
    return NextResponse.json(
      { ok: false, reason: "validation", errors },
      { status: 422 }
    );
  }

  const payload = body as EnquiryPayload;
  const isTalent = payload.kind === "talent";

  // Compute idempotency key to prevent duplicate leads on network retries
  // Hashes normalized email + brief + 5-minute time window
  const timeWindowBucket = Math.floor(Date.now() / (5 * 60 * 1000));
  const idempotencyKey = crypto
    .createHash("sha256")
    .update(`${payload.email.toLowerCase().trim()}:${payload.brief.trim()}:${timeWindowBucket}`)
    .digest("hex");

  let savedLeadRecord: any = null;

  // 1. Transactional Database Persistence FIRST
  try {
    savedLeadRecord = await createLead({
      contactName: payload.name,
      company: payload.company || "Direct Client",
      email: payload.email,
      phone: payload.phone,
      country: payload.country || "Not specified",
      serviceLine: payload.service || (isTalent ? "talent" : "general"),
      acquisitionSource: isTalent ? "Talent Network Inbound" : "Website Inbound Form",
      landingPage: "/contact",
      conversionChannel: "form",
      nextAction: isTalent
        ? "Review portfolio and candidate profile"
        : "Review project brief and scope technical deliverables",
      projectScope: payload.brief,
      attachmentFileId: payload.fileId,
      idempotencyKey,
    });

    // If a file upload was attached, associate it with the lead in the database
    if (payload.fileId && savedLeadRecord.id) {
      attachUploadToLead(payload.fileId, savedLeadRecord.id).catch((e) => {
        logger.error("Failed to associate upload with lead", { error: String(e) });
      });
    }
  } catch (dbErr) {
    logger.error("Failed to persist lead to database", {
      correlationId,
      error: dbErr instanceof Error ? dbErr.message : String(dbErr),
    });
    return NextResponse.json(
      {
        ok: false,
        reason: "database_error",
        message: "Could not record enquiry in our system. Please try calling or messaging us directly.",
      },
      { status: 503 }
    );
  }

  // 2. Notification Dispatch via Resend
  const apiKey = process.env.ENQUIRY_PROVIDER_API_KEY;
  const from = process.env.ENQUIRY_FROM_EMAIL;
  const to = isTalent
    ? process.env.ENQUIRY_TO_EMAIL_CAREERS ?? process.env.ENQUIRY_TO_EMAIL
    : process.env.ENQUIRY_TO_EMAIL;

  // If email provider is unconfigured, the lead is ALREADY safely stored in DB!
  if (!apiKey || !from || !to) {
    logger.warn("Email provider unconfigured. Lead persisted in database but email notification pending.", {
      correlationId,
      leadReference: savedLeadRecord.leadReference,
    });
    await updateLeadEmailDelivery(savedLeadRecord.id, "NOT_CONFIGURED");

    return NextResponse.json(
      {
        ok: true,
        delivered: false,
        leadReference: savedLeadRecord.leadReference,
        message: "Your project enquiry has been securely recorded. Our team will review your brief directly.",
      },
      { status: 200 }
    );
  }

  const subject = isTalent
    ? `Talent network — ${payload.name}`
    : `Project enquiry [${savedLeadRecord.leadReference}] — ${payload.name}${payload.company ? ` (${payload.company})` : ""}`;

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
      logger.error("Email notification dispatch failed", {
        correlationId,
        status: response.status,
        detail,
        leadReference: savedLeadRecord.leadReference,
      });
      await updateLeadEmailDelivery(savedLeadRecord.id, "FAILED");

      // The lead is safe! Return 200 with honest delivery note
      return NextResponse.json(
        {
          ok: true,
          delivered: false,
          leadReference: savedLeadRecord.leadReference,
          message: "Your enquiry is recorded in our system. Email notification is queued for delivery.",
        },
        { status: 200 }
      );
    }

    const resData = await response.json().catch(() => ({}));
    await updateLeadEmailDelivery(savedLeadRecord.id, "DELIVERED", resData.id);

    logger.info("Enquiry successfully recorded and dispatched", {
      correlationId,
      leadReference: savedLeadRecord.leadReference,
      emailId: resData.id,
    });

    return NextResponse.json(
      {
        ok: true,
        delivered: true,
        leadReference: savedLeadRecord.leadReference,
      },
      { status: 200 }
    );
  } catch (error) {
    logger.error("Email delivery network exception", {
      correlationId,
      leadReference: savedLeadRecord.leadReference,
      error: String(error),
    });
    await updateLeadEmailDelivery(savedLeadRecord.id, "FAILED");

    // Lead is safe in DB!
    return NextResponse.json(
      {
        ok: true,
        delivered: false,
        leadReference: savedLeadRecord.leadReference,
        message: "Your enquiry is safely logged in our database. Scoping assessment will proceed directly.",
      },
      { status: 200 }
    );
  }
}
