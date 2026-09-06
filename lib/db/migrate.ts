import { query } from "./client";
import { logger } from "@/lib/logger";
import fs from "fs";
import path from "path";

export async function runMigrations(): Promise<{ ok: boolean; applied: string[]; error?: string }> {
  try {
    const schemaPath = path.join(process.cwd(), "lib", "db", "schema.sql");
    const ddl = fs.readFileSync(schemaPath, "utf8");

    logger.info("Executing database migration...", { operation: "db_migrate" });
    await query(ddl);

    return { ok: true, applied: ["schema.sql"] };
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    logger.error("Database migration failure", { error: errMsg });
    return { ok: false, applied: [], error: errMsg };
  }
}
