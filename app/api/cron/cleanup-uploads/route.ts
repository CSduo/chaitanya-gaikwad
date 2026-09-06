import { NextResponse } from "next/server";
import { cleanupExpiredUploads } from "@/lib/storage/upload";
import { logger } from "@/lib/logger";
import crypto from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Automated 30-Day Retention Enforcement Endpoint.
 * Purges expired project uploads from durable private object storage and marks DB metadata as PURGED.
 * Fails closed if CRON_SECRET is not configured or token does not match.
 */
export async function GET(request: Request) {
  const correlationId = logger.createCorrelationId();
  const authHeader = request.headers.get("authorization") || "";
  const cronSecret = process.env.CRON_SECRET;

  // FAIL CLOSED: If CRON_SECRET is missing, deny invocation
  if (!cronSecret || cronSecret.trim().length === 0) {
    logger.error("CRON_SECRET is not configured on server. Denying invocation.", { correlationId });
    return NextResponse.json(
      { ok: false, error: "Cron execution is not authorized on this environment." },
      { status: 500 }
    );
  }

  const expectedToken = `Bearer ${cronSecret}`;
  
  // Constant-time token comparison to prevent timing attacks
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
    logger.warn("Unauthorized cron attempt rejected", { correlationId });
    return NextResponse.json({ ok: false, error: "Unauthorized cron invocation." }, { status: 401 });
  }

  try {
    logger.info("Executing retention cleanup cron", { correlationId });
    const result = await cleanupExpiredUploads();

    return NextResponse.json({
      ok: true,
      timestamp: new Date().toISOString(),
      retentionEnforced: "30-day strict purge",
      ...result,
    });
  } catch (error) {
    logger.error("Retention purge failed with exception", {
      correlationId,
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json({ ok: false, error: "Failed to execute retention cleanup." }, { status: 500 });
  }
}
