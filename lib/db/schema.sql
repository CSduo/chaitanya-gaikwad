-- XIYATO Production PostgreSQL Schema
-- Concurrency-safe leads, upload metadata, and distributed rate limiting

-- UUID generation extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Sequence for human-readable sequential lead reference codes
CREATE SEQUENCE IF NOT EXISTS lead_reference_seq START WITH 100;

-- 1. Leads Table
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_reference VARCHAR(32) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  company VARCHAR(255),
  contact_name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(64),
  country VARCHAR(128),
  service_line VARCHAR(128) NOT NULL,
  acquisition_source VARCHAR(255) NOT NULL,
  landing_page VARCHAR(255) NOT NULL,
  utm_source VARCHAR(128),
  utm_campaign VARCHAR(128),
  conversion_channel VARCHAR(32) NOT NULL,
  lifecycle_status VARCHAR(32) NOT NULL DEFAULT 'NEW ENQUIRY',
  next_action TEXT NOT NULL,
  estimated_value VARCHAR(64),
  won_revenue VARCHAR(64),
  project_scope TEXT,
  attachment_file_id VARCHAR(128),
  email_delivery_status VARCHAR(32) NOT NULL DEFAULT 'PENDING',
  email_provider_id VARCHAR(255),
  idempotency_key VARCHAR(128) UNIQUE,
  metadata JSONB DEFAULT '{}'::jsonb,
  CONSTRAINT chk_lifecycle_status CHECK (
    lifecycle_status IN (
      'NEW ENQUIRY',
      'REVIEWED',
      'QUALIFIED',
      'UNQUALIFIED',
      'PROPOSAL',
      'NEGOTIATION',
      'WON',
      'LOST'
    )
  ),
  CONSTRAINT chk_conversion_channel CHECK (
    conversion_channel IN ('form', 'whatsapp', 'telephone', 'email')
  ),
  CONSTRAINT chk_email_delivery_status CHECK (
    email_delivery_status IN ('PENDING', 'DELIVERED', 'FAILED', 'NOT_CONFIGURED')
  )
);

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_lifecycle_status ON leads (lifecycle_status);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads (email);
CREATE INDEX IF NOT EXISTS idx_leads_idempotency_key ON leads (idempotency_key);

-- 2. Uploads (File Metadata Table)
CREATE TABLE IF NOT EXISTS uploads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  storage_key VARCHAR(512) UNIQUE NOT NULL,
  provider VARCHAR(64) NOT NULL DEFAULT 's3',
  original_filename VARCHAR(255) NOT NULL,
  sanitized_filename VARCHAR(255) NOT NULL,
  mime_type VARCHAR(128) NOT NULL,
  extension VARCHAR(32) NOT NULL,
  size_bytes BIGINT NOT NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'UPLOADED',
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  deleted_at TIMESTAMPTZ,
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  CONSTRAINT chk_upload_status CHECK (
    status IN ('UPLOADED', 'ATTACHED', 'PURGED', 'DELETED')
  )
);

CREATE INDEX IF NOT EXISTS idx_uploads_expires_at ON uploads (expires_at);
CREATE INDEX IF NOT EXISTS idx_uploads_status ON uploads (status);
CREATE INDEX IF NOT EXISTS idx_uploads_storage_key ON uploads (storage_key);

-- 3. Distributed Rate Limiting Table
CREATE TABLE IF NOT EXISTS rate_limits (
  rate_key VARCHAR(128) NOT NULL,
  window_bucket BIGINT NOT NULL,
  hit_count INT NOT NULL DEFAULT 1,
  expires_at TIMESTAMPTZ NOT NULL,
  PRIMARY KEY (rate_key, window_bucket)
);

CREATE INDEX IF NOT EXISTS idx_rate_limits_expires_at ON rate_limits (expires_at);
