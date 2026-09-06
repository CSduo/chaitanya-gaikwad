import fs from 'fs';
import path from 'path';

export type LeadLifecycleStatus =
  | 'NEW ENQUIRY'
  | 'REVIEWED'
  | 'QUALIFIED'
  | 'UNQUALIFIED'
  | 'PROPOSAL'
  | 'NEGOTIATION'
  | 'WON'
  | 'LOST';

export interface LeadRecord {
  leadId: string;
  createdDate: string;
  company?: string;
  contactName: string;
  email?: string;
  country?: string;
  serviceLine: string;
  acquisitionSource: string;
  landingPage: string;
  utmSource?: string;
  utmCampaign?: string;
  conversionChannel: 'form' | 'whatsapp' | 'telephone' | 'email';
  lifecycleStatus: LeadLifecycleStatus;
  nextAction: string;
  estimatedValue?: string;
  wonRevenue?: string;
  projectScope?: string;
}

export interface CrmDatabase {
  version: string;
  description: string;
  lifecycleStages: LeadLifecycleStatus[];
  leads: LeadRecord[];
}

const CRM_FILE_PATH = path.join(process.cwd(), 'data', 'crm', 'leads.json');

export function getCrmData(): CrmDatabase {
  try {
    if (fs.existsSync(CRM_FILE_PATH)) {
      const fileData = fs.readFileSync(CRM_FILE_PATH, 'utf8');
      return JSON.parse(fileData) as CrmDatabase;
    }
  } catch (error) {
    console.error('Error reading CRM leads file:', error);
  }
  return {
    version: '1.0.0',
    description: 'XIYATO Inbound Lead Lifecycle Database',
    lifecycleStages: [
      'NEW ENQUIRY',
      'REVIEWED',
      'QUALIFIED',
      'UNQUALIFIED',
      'PROPOSAL',
      'NEGOTIATION',
      'WON',
      'LOST',
    ],
    leads: [],
  };
}

export function saveLead(leadInput: Omit<LeadRecord, 'leadId' | 'createdDate' | 'lifecycleStatus'>): LeadRecord {
  const db = getCrmData();
  const dateStr = new Date().toISOString();
  const nextNumber = db.leads.length + 1;
  const leadId = 'XIY-' + new Date().getFullYear() + '-' + String(nextNumber).padStart(3, '0');

  const newLead: LeadRecord = {
    ...leadInput,
    leadId,
    createdDate: dateStr,
    lifecycleStatus: 'NEW ENQUIRY',
  };

  db.leads.push(newLead);

  try {
    const fileDir = path.dirname(CRM_FILE_PATH);
    if (!fs.existsSync(fileDir)) fs.mkdirSync(fileDir, { recursive: true });
    fs.writeFileSync(CRM_FILE_PATH, JSON.stringify(db, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing to CRM leads file:', error);
  }

  return newLead;
}
