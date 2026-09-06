import { NextResponse } from "next/server";
import { pingDatabase } from "@/lib/db/client";
import { storageProvider } from "@/lib/storage/provider";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Readiness Probe.
 * Verifies that critical backend dependencies (PostgreSQL, Object Storage) are available.
 * Does not expose passwords, credentials, or stack traces.
 */
export async function GET() {
  const dbHealth = await pingDatabase();
  const storageHealth = await storageProvider.checkHealth();

  const isReady = dbHealth.ok;

  const body = {
    status: isReady ? "ready" : "unready",
    timestamp: new Date().toISOString(),
    database: {
      connected: dbHealth.ok,
      latencyMs: dbHealth.latencyMs,
    },
    storage: {
      provider: storageHealth.provider,
      configured: storageProvider.isConfigured(),
      reachable: storageHealth.ok,
    },
  };

  return NextResponse.json(body, { status: isReady ? 200 : 503 });
}
