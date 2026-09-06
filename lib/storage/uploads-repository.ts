import { query } from "@/lib/db/client";
import { logger } from "@/lib/logger";

export interface UploadRecord {
  id: string;
  storageKey: string;
  provider: string;
  originalFilename: string;
  sanitizedFilename: string;
  mimeType: string;
  extension: string;
  sizeBytes: number;
  status: "UPLOADED" | "ATTACHED" | "PURGED" | "DELETED";
  uploadedAt: string;
  expiresAt: string;
  deletedAt?: string;
  leadId?: string;
}

export interface CreateUploadRecordInput {
  storageKey: string;
  provider?: string;
  originalFilename: string;
  sanitizedFilename: string;
  mimeType: string;
  extension: string;
  sizeBytes: number;
  expiresAt: Date;
}

function mapRowToUpload(row: any): UploadRecord {
  return {
    id: row.id,
    storageKey: row.storage_key,
    provider: row.provider,
    originalFilename: row.original_filename,
    sanitizedFilename: row.sanitized_filename,
    mimeType: row.mime_type,
    extension: row.extension,
    sizeBytes: parseInt(row.size_bytes, 10),
    status: row.status,
    uploadedAt: new Date(row.uploaded_at).toISOString(),
    expiresAt: new Date(row.expires_at).toISOString(),
    deletedAt: row.deleted_at ? new Date(row.deleted_at).toISOString() : undefined,
    leadId: row.lead_id || undefined,
  };
}

export async function createUploadRecord(input: CreateUploadRecordInput): Promise<UploadRecord> {
  const sql = `
    INSERT INTO uploads (
      storage_key,
      provider,
      original_filename,
      sanitized_filename,
      mime_type,
      extension,
      size_bytes,
      status,
      expires_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, 'UPLOADED', $8)
    RETURNING *;
  `;

  const params = [
    input.storageKey,
    input.provider || "s3",
    input.originalFilename,
    input.sanitizedFilename,
    input.mimeType,
    input.extension,
    input.sizeBytes,
    input.expiresAt.toISOString(),
  ];

  const res = await query(sql, params);
  const record = mapRowToUpload(res.rows[0]);
  logger.info("Upload metadata tracked in DB", { uploadId: record.id, storageKey: record.storageKey });
  return record;
}

export async function getUploadById(id: string): Promise<UploadRecord | null> {
  const res = await query("SELECT * FROM uploads WHERE id = $1 LIMIT 1", [id]);
  return res.rows.length > 0 ? mapRowToUpload(res.rows[0]) : null;
}

export async function getUploadByKey(key: string): Promise<UploadRecord | null> {
  const res = await query("SELECT * FROM uploads WHERE storage_key = $1 LIMIT 1", [key]);
  return res.rows.length > 0 ? mapRowToUpload(res.rows[0]) : null;
}

export async function attachUploadToLead(uploadId: string, leadId: string): Promise<void> {
  await query(
    "UPDATE uploads SET status = 'ATTACHED', lead_id = $1 WHERE id = $2",
    [leadId, uploadId]
  );
}

export async function findExpiredUploads(limit = 100): Promise<UploadRecord[]> {
  const res = await query(
    "SELECT * FROM uploads WHERE expires_at <= NOW() AND status != 'PURGED' LIMIT $1",
    [limit]
  );
  return res.rows.map(mapRowToUpload);
}

export async function markUploadPurged(id: string): Promise<void> {
  await query(
    "UPDATE uploads SET status = 'PURGED', deleted_at = NOW() WHERE id = $1",
    [id]
  );
}
