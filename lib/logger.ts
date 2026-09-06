import crypto from "crypto";

export type LogLevel = "info" | "warn" | "error" | "debug";

export interface LogContext {
  correlationId?: string;
  route?: string;
  operation?: string;
  statusCode?: number;
  durationMs?: number;
  [key: string]: unknown;
}

/**
 * Redacts sensitive fields, credentials, connection strings, and PII from log payloads.
 */
function sanitizeValue(key: string, val: unknown): unknown {
  if (val === null || val === undefined) return val;

  const lowerKey = key.toLowerCase();
  if (
    lowerKey.includes("password") ||
    lowerKey.includes("secret") ||
    lowerKey.includes("token") ||
    lowerKey.includes("key") ||
    lowerKey.includes("authorization") ||
    lowerKey.includes("database_url") ||
    lowerKey.includes("apikey")
  ) {
    return "[REDACTED_CREDENTIAL]";
  }

  if (lowerKey.includes("email") && typeof val === "string") {
    const parts = val.split("@");
    if (parts.length === 2) {
      return `${parts[0].slice(0, 2)}***@${parts[1]}`;
    }
    return "[REDACTED_EMAIL]";
  }

  if ((lowerKey.includes("phone") || lowerKey.includes("tel")) && typeof val === "string") {
    return val.slice(0, 4) + "******" + val.slice(-2);
  }

  if (lowerKey.includes("brief") || lowerKey.includes("scope") || lowerKey.includes("content")) {
    if (typeof val === "string" && val.length > 30) {
      return `[REDACTED_TEXT: ${val.length} chars]`;
    }
  }

  if (typeof val === "object" && !Array.isArray(val)) {
    const sanitizedObj: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(val as Record<string, unknown>)) {
      sanitizedObj[k] = sanitizeValue(k, v);
    }
    return sanitizedObj;
  }

  return val;
}

export const logger = {
  createCorrelationId(): string {
    return crypto.randomUUID();
  },

  log(level: LogLevel, message: string, context?: LogContext): void {
    const correlationId = context?.correlationId || "system";
    const timestamp = new Date().toISOString();

    const sanitizedContext: Record<string, unknown> = {};
    if (context) {
      for (const [k, v] of Object.entries(context)) {
        sanitizedContext[k] = sanitizeValue(k, v);
      }
    }

    const logEntry = {
      timestamp,
      level,
      message,
      correlationId,
      ...sanitizedContext,
    };

    const serialized = JSON.stringify(logEntry);

    if (level === "error") {
      console.error(serialized);
    } else if (level === "warn") {
      console.warn(serialized);
    } else {
      console.log(serialized);
    }
  },

  info(message: string, context?: LogContext): void {
    this.log("info", message, context);
  },

  warn(message: string, context?: LogContext): void {
    this.log("warn", message, context);
  },

  error(message: string, context?: LogContext): void {
    this.log("error", message, context);
  },
};
