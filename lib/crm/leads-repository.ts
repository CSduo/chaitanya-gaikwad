import crypto from "crypto";
import { query } from "@/lib/db/client";
import { logger } from "@/lib/logger";

const memoryLeads = new Map<string, LeadRecord>();

export type LeadLifecycleStatus =
  | "NEW ENQUIRY"
  | "REVIEWED"
  | "QUALIFIED"
  | "UNQUALIFIED"
  | "PROPOSAL"
  | "NEGOTIATION"
  | "WON"
  | "LOST";

export type EmailDeliveryStatus =
  | "PENDING"
  | "DELIVERED"
  | "FAILED"
  | "NOT_CONFIGURED";

export interface LeadRecord {
  id: string;
  leadReference: string;
  createdAt: string;
  updatedAt: string;
  company?: string;
  contactName: string;
  email?: string;
  phone?: string;
  country?: string;
  serviceLine: string;
  acquisitionSource: string;
  landingPage: string;
  utmSource?: string;
  utmCampaign?: string;
  conversionChannel: "form" | "whatsapp" | "telephone" | "email";
  lifecycleStatus: LeadLifecycleStatus;
  nextAction: string;
  estimatedValue?: string;
  wonRevenue?: string;
  projectScope?: string;
  attachmentFileId?: string;
  emailDeliveryStatus: EmailDeliveryStatus;
  emailProviderId?: string;
  idempotencyKey?: string;
}

export interface CreateLeadInput {
  company?: string;
  contactName: string;
  email?: string;
  phone?: string;
  country?: string;
  serviceLine: string;
  acquisitionSource: string;
  landingPage: string;
  utmSource?: string;
  utmCampaign?: string;
  conversionChannel: "form" | "whatsapp" | "telephone" | "email";
  nextAction: string;
  projectScope?: string;
  attachmentFileId?: string;
  idempotencyKey?: string;
  estimatedValue?: string;
  wonRevenue?: string;
  lifecycleStatus?: LeadLifecycleStatus;
  createdAt?: string; // For migrations
  leadReference?: string; // For migrations
}

export interface LeadFilterOptions {
  status?: LeadLifecycleStatus;
  limit?: number;
  offset?: number;
}

function mapRowToLead(row: any): LeadRecord {
  return {
    id: row.id,
    leadReference: row.lead_reference,
    createdAt: new Date(row.created_at).toISOString(),
    updatedAt: new Date(row.updated_at).toISOString(),
    company: row.company || undefined,
    contactName: row.contact_name,
    email: row.email || undefined,
    phone: row.phone || undefined,
    country: row.country || undefined,
    serviceLine: row.service_line,
    acquisitionSource: row.acquisition_source,
    landingPage: row.landing_page,
    utmSource: row.utm_source || undefined,
    utmCampaign: row.utm_campaign || undefined,
    conversionChannel: row.conversion_channel,
    lifecycleStatus: row.lifecycle_status,
    nextAction: row.next_action,
    estimatedValue: row.estimated_value || undefined,
    wonRevenue: row.won_revenue || undefined,
    projectScope: row.project_scope || undefined,
    attachmentFileId: row.attachment_file_id || undefined,
    emailDeliveryStatus: row.email_delivery_status,
    emailProviderId: row.email_provider_id || undefined,
    idempotencyKey: row.idempotency_key || undefined,
  };
}

export async function createLead(input: CreateLeadInput): Promise<LeadRecord> {
  const currentYear = new Date().getFullYear();

  // If idempotency key provided, check for existing lead first
  if (input.idempotencyKey) {
    const existing = await query(
      "SELECT * FROM leads WHERE idempotency_key = $1 LIMIT 1",
      [input.idempotencyKey]
    );
    if (existing.rows.length > 0) {
      logger.info("Idempotent enquiry match returned", {
        leadReference: existing.rows[0].lead_reference,
      });
      return mapRowToLead(existing.rows[0]);
    }
  }

  // Generate reference if not specified
  let leadRef = input.leadReference;
  if (!leadRef) {
    try {
      const seqRes = await query("SELECT nextval('lead_reference_seq') as seq");
      const seq = seqRes.rows[0].seq;
      leadRef = `XIY-${currentYear}-${String(seq).padStart(3, "0")}`;
    } catch {
      // Fallback if sequence not yet created
      const rnd = Math.floor(100 + Math.random() * 900);
      leadRef = `XIY-${currentYear}-${rnd}`;
    }
  }

  const sql = `
    INSERT INTO leads (
      lead_reference,
      company,
      contact_name,
      email,
      phone,
      country,
      service_line,
      acquisition_source,
      landing_page,
      utm_source,
      utm_campaign,
      conversion_channel,
      lifecycle_status,
      next_action,
      project_scope,
      attachment_file_id,
      idempotency_key,
      estimated_value,
      won_revenue,
      created_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, COALESCE($20::timestamptz, NOW()))
    ON CONFLICT (lead_reference) DO UPDATE SET updated_at = NOW()
    RETURNING *;
  `;

  const params = [
    leadRef,
    input.company || null,
    input.contactName,
    input.email || null,
    input.phone || null,
    input.country || null,
    input.serviceLine,
    input.acquisitionSource,
    input.landingPage,
    input.utmSource || null,
    input.utmCampaign || null,
    input.conversionChannel,
    input.lifecycleStatus || "NEW ENQUIRY",
    input.nextAction,
    input.projectScope || null,
    input.attachmentFileId || null,
    input.idempotencyKey || null,
    input.estimatedValue || null,
    input.wonRevenue || null,
    input.createdAt || null,
  ];

  try {
    const res = await query(sql, params);
    const lead = mapRowToLead(res.rows[0]);
    logger.info("Lead durably created in PostgreSQL", {
      leadReference: lead.leadReference,
      serviceLine: lead.serviceLine,
    });
    memoryLeads.set(lead.id, lead);
    return lead;
  } catch (err) {
    logger.info("Database not connected; saving lead to local memory registry", {
      leadReference: leadRef,
      error: err instanceof Error ? err.message : String(err),
    });
    const fallbackLead: LeadRecord = {
      id: crypto.randomUUID(),
      leadReference: leadRef,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      company: input.company,
      contactName: input.contactName,
      email: input.email,
      phone: input.phone,
      country: input.country,
      serviceLine: input.serviceLine,
      acquisitionSource: input.acquisitionSource,
      landingPage: input.landingPage,
      utmSource: input.utmSource,
      utmCampaign: input.utmCampaign,
      conversionChannel: input.conversionChannel,
      lifecycleStatus: input.lifecycleStatus || "NEW ENQUIRY",
      nextAction: input.nextAction,
      projectScope: input.projectScope,
      attachmentFileId: input.attachmentFileId,
      emailDeliveryStatus: "PENDING",
      idempotencyKey: input.idempotencyKey,
    };
    memoryLeads.set(fallbackLead.id, fallbackLead);
    return fallbackLead;
  }
}

export async function getLeadById(id: string): Promise<LeadRecord | null> {
  try {
    const res = await query("SELECT * FROM leads WHERE id = $1 LIMIT 1", [id]);
    return res.rows.length > 0 ? mapRowToLead(res.rows[0]) : (memoryLeads.get(id) || null);
  } catch {
    return memoryLeads.get(id) || null;
  }
}

export async function getLeadByReference(ref: string): Promise<LeadRecord | null> {
  try {
    const res = await query("SELECT * FROM leads WHERE lead_reference = $1 LIMIT 1", [ref]);
    return res.rows.length > 0 ? mapRowToLead(res.rows[0]) : null;
  } catch {
    for (const lead of memoryLeads.values()) {
      if (lead.leadReference === ref) return lead;
    }
    return null;
  }
}

export async function updateLeadLifecycle(
  id: string,
  status: LeadLifecycleStatus,
  nextAction?: string
): Promise<LeadRecord | null> {
  const sql = nextAction
    ? "UPDATE leads SET lifecycle_status = $1, next_action = $2, updated_at = NOW() WHERE id = $3 RETURNING *"
    : "UPDATE leads SET lifecycle_status = $1, updated_at = NOW() WHERE id = $2 RETURNING *";
  const params = nextAction ? [status, nextAction, id] : [status, id];
  const res = await query(sql, params);
  return res.rows.length > 0 ? mapRowToLead(res.rows[0]) : null;
}

export async function updateLeadEmailDelivery(
  id: string,
  status: EmailDeliveryStatus,
  providerId?: string
): Promise<void> {
  await query(
    "UPDATE leads SET email_delivery_status = $1, email_provider_id = $2, updated_at = NOW() WHERE id = $3",
    [status, providerId || null, id]
  );
}

export async function listLeads(options: LeadFilterOptions = {}): Promise<{ leads: LeadRecord[]; total: number }> {
  const limit = Math.min(options.limit || 50, 100);
  const offset = options.offset || 0;

  let whereClause = "";
  const params: any[] = [];

  if (options.status) {
    params.push(options.status);
    whereClause = "WHERE lifecycle_status = $1";
  }

  const countSql = `SELECT COUNT(*) as count FROM leads ${whereClause}`;
  const countRes = await query(countSql, params);
  const total = parseInt(countRes.rows[0].count, 10);

  const queryParams = [...params, limit, offset];
  const listSql = `
    SELECT * FROM leads
    ${whereClause}
    ORDER BY created_at DESC
    LIMIT $${params.length + 1} OFFSET $${params.length + 2}
  `;

  const listRes = await query(listSql, queryParams);
  const leads = listRes.rows.map(mapRowToLead);

  return { leads, total };
}
