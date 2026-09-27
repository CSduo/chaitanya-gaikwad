import { execFileSync } from "node:child_process";

const cache = new Map<string, Date | undefined>();
let hasCompleteHistory: boolean | undefined;

/** Build-time Git dates, never a deployment timestamp. Omit when unprovable. */
export function contentModified(paths: string[]): Date | undefined {
  const key = paths.join("\n");
  if (cache.has(key)) return cache.get(key);
  let date: Date | undefined;
  try {
    hasCompleteHistory ??= execFileSync("git", ["rev-parse", "--is-shallow-repository"], {
      encoding: "utf8", stdio: ["ignore", "pipe", "ignore"], timeout: 5000,
    }).trim() === "false";
    if (hasCompleteHistory) {
      const value = execFileSync("git", ["log", "-1", "--format=%cI", "--", ...paths.map((path) => `:(literal)${path}`)], {
        encoding: "utf8", stdio: ["ignore", "pipe", "ignore"], timeout: 5000,
      }).trim();
      if (value && Number.isFinite(Date.parse(value))) date = new Date(value);
    }
  } catch {
    // Source archives and some hosting checkouts intentionally omit .git.
  }
  cache.set(key, date);
  return date;
}
