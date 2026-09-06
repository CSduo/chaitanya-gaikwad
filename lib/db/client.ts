import { Pool, QueryResult, QueryResultRow } from "pg";
import { logger } from "@/lib/logger";

let pool: Pool | null = null;

export function getDbPool(): Pool {
  if (pool) return pool;

  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    logger.warn("DATABASE_URL is not set. Database persistence will fail closed.");
    // Create a dummy pool that throws on connect if called
    pool = new Pool({ connectionString: "" });
    return pool;
  }

  const isLocal = connectionString.includes("localhost") || connectionString.includes("127.0.0.1");

  pool = new Pool({
    connectionString,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
    ssl: isLocal ? false : { rejectUnauthorized: false },
  });

  pool.on("error", (err) => {
    logger.error("Unexpected error on idle PostgreSQL client", { error: err.message });
  });

  return pool;
}

export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: unknown[]
): Promise<QueryResult<T>> {
  const start = Date.now();
  const db = getDbPool();
  try {
    const res = await db.query<T>(text, params);
    const duration = Date.now() - start;
    if (duration > 1000) {
      logger.warn("Slow DB query detected", { text: text.slice(0, 100), durationMs: duration });
    }
    return res;
  } catch (error) {
    logger.error("Database query error", {
      text: text.slice(0, 100),
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
}

export async function pingDatabase(): Promise<{ ok: boolean; latencyMs: number; error?: string }> {
  const start = Date.now();
  try {
    const res = await query("SELECT 1 as ping");
    const latencyMs = Date.now() - start;
    return { ok: res.rows.length > 0, latencyMs };
  } catch (error) {
    return {
      ok: false,
      latencyMs: Date.now() - start,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
