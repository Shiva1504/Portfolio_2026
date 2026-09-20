import { execFileSync } from "node:child_process";

// Falls back to this date when git history is unavailable at build time (e.g. shallow CI clones).
const FALLBACK = new Date("2026-09-20T00:00:00Z");

export function getLastModified(paths: string[]): Date {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cI", "--", ...paths], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    const date = new Date(out);
    return Number.isNaN(date.getTime()) ? FALLBACK : date;
  } catch {
    return FALLBACK;
  }
}
