import { NextResponse } from "next/server";
import { SITE } from "@/lib/site";
import { logger } from "@/lib/logger";
import crypto from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CANONICAL_HOSTS = ["xiyato.uk", "www.xiyato.uk"];
const MAX_URLS_PER_SUBMISSION = 20;

/**
 * Protected IndexNow discovery notification endpoint.
 * Requires internal server authorization (Bearer INDEXNOW_SECRET or CRON_SECRET).
 * Fails closed. Validates that all submitted URLs strictly belong to canonical xiyato.uk hosts.
 */
export async function POST(request: Request) {
  const correlationId = logger.createCorrelationId();
  const authHeader = request.headers.get("authorization") || "";
  const indexnowSecret = process.env.INDEXNOW_SECRET || process.env.CRON_SECRET;
  const apiKey = process.env.INDEXNOW_KEY;

  // 1. FAIL CLOSED: Require secret configuration
  if (!indexnowSecret || indexnowSecret.trim().length === 0) {
    logger.error("INDEXNOW_SECRET is not configured on server", { correlationId });
    return NextResponse.json(
      { ok: false, error: "IndexNow submission is not configured on this environment." },
      { status: 500 }
    );
  }

  // 2. Verify authorization token in constant time
  const expectedToken = `Bearer ${indexnowSecret}`;
  let isAuthorized = false;
  try {
    const authBuf = Buffer.from(authHeader);
    const expBuf = Buffer.from(expectedToken);
    if (authBuf.length === expBuf.length) {
      isAuthorized = crypto.timingSafeEqual(authBuf, expBuf);
    }
  } catch {
    isAuthorized = false;
  }

  if (!isAuthorized) {
    logger.warn("Unauthorized IndexNow submission attempt", { correlationId });
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  if (!apiKey) {
    logger.error("INDEXNOW_KEY is not configured", { correlationId });
    return NextResponse.json({ ok: false, error: "IndexNow key missing." }, { status: 503 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const rawUrls: string[] = Array.isArray(body.urls) && body.urls.length > 0
      ? body.urls
      : [`${SITE.url}/`];

    if (rawUrls.length > MAX_URLS_PER_SUBMISSION) {
      return NextResponse.json(
        { ok: false, error: `Exceeded maximum of ${MAX_URLS_PER_SUBMISSION} URLs per request.` },
        { status: 400 }
      );
    }

    // 3. Strict Domain Validation: Must strictly belong to xiyato.uk
    const validatedUrls: string[] = [];
    for (const u of rawUrls) {
      try {
        const parsed = new URL(u);
        if (parsed.protocol !== "https:") {
          return NextResponse.json(
            { ok: false, error: `URL must use HTTPS protocol: ${u}` },
            { status: 400 }
          );
        }
        if (!CANONICAL_HOSTS.includes(parsed.hostname.toLowerCase())) {
          logger.warn("Attempt to submit non-canonical domain to IndexNow rejected", {
            correlationId,
            host: parsed.hostname,
          });
          return NextResponse.json(
            { ok: false, error: `Domain ${parsed.hostname} is not authorized for submission.` },
            { status: 400 }
          );
        }
        validatedUrls.push(parsed.href);
      } catch {
        return NextResponse.json({ ok: false, error: `Malformed URL: ${u}` }, { status: 400 });
      }
    }

    const payload = {
      host: "xiyato.uk",
      key: apiKey,
      keyLocation: `${SITE.url}/${apiKey}.txt`,
      urlList: validatedUrls,
    };

    // 4. Upstream call with 5-second timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    }).finally(() => clearTimeout(timeout));

    logger.info("IndexNow submitted successfully", {
      correlationId,
      submittedCount: validatedUrls.length,
      status: res.status,
    });

    return NextResponse.json({
      ok: res.ok || res.status === 200 || res.status === 202,
      status: res.status,
      submittedUrls: validatedUrls.length,
    });
  } catch (error) {
    logger.error("IndexNow upstream dispatch error", {
      correlationId,
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json(
      { ok: false, error: "IndexNow dispatch failed or timed out." },
      { status: 502 }
    );
  }
}
