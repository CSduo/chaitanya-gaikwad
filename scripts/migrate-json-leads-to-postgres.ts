import fs from "fs";
import path from "path";
import { createLead, getLeadByReference } from "../lib/crm/leads-repository";
import { runMigrations } from "../lib/db/migrate";


async function run() {
  console.log("=== XIYATO JSON -> POSTGRESQL LEAD MIGRATION ===");

  // Ensure DB schema is ready
  console.log("1. Ensuring schema is up to date...");
  const mig = await runMigrations();
  if (!mig.ok) {
    console.error("Schema migration failed:", mig.error);
    process.exit(1);
  }
  console.log("Schema verified.");

  const jsonPath = path.join(process.cwd(), "data", "crm", "leads.json");
  if (!fs.existsSync(jsonPath)) {
    console.log("No data/crm/leads.json file found. Nothing to migrate.");
    return;
  }

  const raw = fs.readFileSync(jsonPath, "utf8");
  const data = JSON.parse(raw);
  const leads = data.leads || [];

  console.log(`Found ${leads.length} historical records in data/crm/leads.json`);

  let imported = 0;
  let skipped = 0;
  let errors = 0;

  for (const lead of leads) {
    try {
      if (!lead.leadId || !lead.contactName || !lead.serviceLine) {
        console.warn(`Skipping invalid record: ${JSON.stringify(lead)}`);
        errors++;
        continue;
      }

      // Check if already in DB
      const existing = await getLeadByReference(lead.leadId);
      if (existing) {
        console.log(`Lead ${lead.leadId} already exists in DB. Skipping.`);
        skipped++;
        continue;
      }

      await createLead({
        leadReference: lead.leadId,
        contactName: lead.contactName,
        company: lead.company,
        email: lead.email,
        country: lead.country,
        serviceLine: lead.serviceLine,
        acquisitionSource: lead.acquisitionSource || "Historical CRM Import",
        landingPage: lead.landingPage || "/contact",
        utmSource: lead.utmSource,
        utmCampaign: lead.utmCampaign,
        conversionChannel: lead.conversionChannel || "form",
        lifecycleStatus: lead.lifecycleStatus || "NEW ENQUIRY",
        nextAction: lead.nextAction || "Historical record imported from JSON",
        estimatedValue: lead.estimatedValue,
        wonRevenue: lead.wonRevenue,
        projectScope: lead.projectScope,
        createdAt: lead.createdDate,
      });

      console.log(`Successfully imported ${lead.leadId} (${lead.contactName})`);
      imported++;
    } catch (err) {
      console.error(`Failed to migrate ${lead.leadId}:`, err);
      errors++;
    }
  }

  console.log("\n=== MIGRATION SUMMARY ===");
  console.log(`Total records in JSON: ${leads.length}`);
  console.log(`Successfully imported: ${imported}`);
  console.log(`Skipped (already exists): ${skipped}`);
  console.log(`Errors / Invalid: ${errors}`);
  console.log(`Verification: ${leads.length === imported + skipped + errors ? "VERIFIED (All rows accounted for)" : "MISMATCH"}`);
}

run()
  .then(() => {
    console.log("Migration script completed.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Migration error:", err);
    process.exit(1);
  });
