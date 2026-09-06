import { createHash } from "node:crypto";
import { appendCapped, readCollection } from "@/lib/server/store";

/**
 * First-party, minimal page counting. No cookies, no third party, no IP kept.
 *
 * A visitor is identified by a hash of address + user-agent + the day, salted
 * with the session secret. That is enough to count sessions and lets the value
 * rotate every midnight, so it cannot be used to follow anyone across days.
 */

export const EVENTS_FILE = "events.json";
const EVENT_CAP = 50_000;

export type PageView = {
  at: string;
  path: string;
  visitor: string;
};

export function visitorHash(request: Request): string {
  const address =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "local";
  const agent = request.headers.get("user-agent") ?? "";
  const day = new Date().toISOString().slice(0, 10);
  const salt = process.env.SESSION_SECRET ?? "unsalted";

  return createHash("sha256")
    .update(`${address}|${agent}|${day}|${salt}`)
    .digest("hex")
    .slice(0, 16);
}

export async function recordView(path: string, visitor: string) {
  await appendCapped<PageView>(
    EVENTS_FILE,
    { at: new Date().toISOString(), path, visitor },
    EVENT_CAP
  );
}

export async function readViews(): Promise<PageView[]> {
  return readCollection<PageView>(EVENTS_FILE);
}

export type DailyTraffic = { date: string; views: number; sessions: number };

/** Buckets the log into the last `days` days, including days with nothing. */
export function dailyTraffic(views: PageView[], days = 30): DailyTraffic[] {
  const byDate = new Map<string, { views: number; visitors: Set<string> }>();

  for (const view of views) {
    const date = view.at.slice(0, 10);
    const bucket = byDate.get(date) ?? { views: 0, visitors: new Set<string>() };
    bucket.views += 1;
    bucket.visitors.add(view.visitor);
    byDate.set(date, bucket);
  }

  const out: DailyTraffic[] = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const date = d.toISOString().slice(0, 10);
    const bucket = byDate.get(date);
    out.push({ date, views: bucket?.views ?? 0, sessions: bucket?.visitors.size ?? 0 });
  }
  return out;
}

export function countPath(views: PageView[], predicate: (path: string) => boolean): number {
  const seen = new Set<string>();
  for (const view of views) {
    if (predicate(view.path)) seen.add(view.visitor);
  }
  return seen.size;
}
