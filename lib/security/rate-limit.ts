import { query } from "@/lib/db/client";
import { logger } from "@/lib/logger";

interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetSeconds: number;
}

// In-memory fallback if DB is not configured
const memoryStore = new Map<string, { count: number; expires: number }>();

export async function checkRateLimit(
  key: string,
  maxRequests: number,
  windowSeconds: number
): Promise<RateLimitResult> {
  const now = Date.now();
  const windowMs = windowSeconds * 1000;
  const bucket = Math.floor(now / windowMs);
  const expiresAt = new Date((bucket + 1) * windowMs);
  const resetSeconds = Math.max(1, Math.ceil(((bucket + 1) * windowMs - now) / 1000));

  try {
    const sql = `
      INSERT INTO rate_limits (rate_key, window_bucket, hit_count, expires_at)
      VALUES ($1, $2, 1, $3)
      ON CONFLICT (rate_key, window_bucket)
      DO UPDATE SET hit_count = rate_limits.hit_count + 1
      RETURNING hit_count;
    `;

    const res = await query(sql, [key, bucket, expiresAt.toISOString()]);
    const currentHits = res.rows[0].hit_count;
    const allowed = currentHits <= maxRequests;
    const remaining = Math.max(0, maxRequests - currentHits);

    // Opportunistic cleanup of expired rows
    if (Math.random() < 0.05) {
      query("DELETE FROM rate_limits WHERE expires_at < NOW()").catch(() => {});
    }

    return { allowed, limit: maxRequests, remaining, resetSeconds };
  } catch (dbError) {
    logger.warn("DB rate limiting unavailable; using memory fallback", { key, error: String(dbError) });

    // Memory fallback
    const memKey = `${key}:${bucket}`;
    const record = memoryStore.get(memKey) || { count: 0, expires: now + windowMs };
    record.count += 1;
    memoryStore.set(memKey, record);

    if (memoryStore.size > 1000) {
      for (const [k, v] of memoryStore.entries()) {
        if (v.expires < now) memoryStore.delete(k);
      }
    }

    const allowed = record.count <= maxRequests;
    const remaining = Math.max(0, maxRequests - record.count);
    return { allowed, limit: maxRequests, remaining, resetSeconds };
  }
}
