import {
  createLead,
  listLeads,
  
  LeadLifecycleStatus,
  LeadRecord,
  CreateLeadInput,
} from "./leads-repository";
import { logger } from "@/lib/logger";

export type { LeadLifecycleStatus, LeadRecord };

export interface CrmDatabase {
  version: string;
  description: string;
  lifecycleStages: LeadLifecycleStatus[];
  leads: LeadRecord[];
}

export const LIFECYCLE_STAGES: LeadLifecycleStatus[] = [
  "NEW ENQUIRY",
  "REVIEWED",
  "QUALIFIED",
  "UNQUALIFIED",
  "PROPOSAL",
  "NEGOTIATION",
  "WON",
  "LOST",
];

/**
 * Backwards-compatible saveLead function.
 * Connects asynchronously to the durable PostgreSQL repository.
 */
export async function saveLead(
  leadInput: Omit<CreateLeadInput, "leadReference">
): Promise<LeadRecord> {
  return await createLead(leadInput);
}

/**
 * Backwards-compatible getCrmData function.
 * Fetches recent leads from PostgreSQL.
 */
export async function getCrmData(): Promise<CrmDatabase> {
  try {
    const { leads } = await listLeads({ limit: 100 });
    return {
      version: "2.0.0",
      description: "XIYÀTO Production PostgreSQL Lead Database",
      lifecycleStages: LIFECYCLE_STAGES,
      leads,
    };
  } catch (error) {
    logger.error("Failed to query CRM leads", { error: String(error) });
    return {
      version: "2.0.0",
      description: "XIYÀTO Production PostgreSQL Lead Database (Unavailable)",
      lifecycleStages: LIFECYCLE_STAGES,
      leads: [],
    };
  }
}
