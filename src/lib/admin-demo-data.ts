/**
 * DEMO DATA — none of this is real.
 *
 * CaliPrint is a static site: the quote form submits nothing and no analytics
 * are collected, so there is nothing to report yet. Everything below is
 * generated so the control page can be designed and reviewed. Replace this
 * module with a real source (an API route reading your store) and the page
 * will render actual figures without further change.
 */

export const IS_DEMO_DATA = true;

export type TrafficDay = { date: string; views: number; sessions: number };

/** Deterministic jitter — same shape on every render, no Math.random. */
function noise(i: number) {
  const n = Math.sin(i * 12.9898) * 43758.5453;
  return (n - Math.floor(n)) * 2 - 1;
}

/* Sunday → Saturday. A real week tails off rather than falling off a cliff. */
const weekdayWeight = [0.8, 1.06, 1.09, 1.07, 1.03, 0.96, 0.83];

function buildTraffic(days: number): TrafficDay[] {
  const out: TrafficDay[] = [];
  const end = new Date("2026-09-05T00:00:00Z");

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(end);
    d.setUTCDate(end.getUTCDate() - i);

    const seasonal = weekdayWeight[d.getUTCDay()];
    const swell = Math.sin(i / 9) * 20;
    const trend = (days - i) * 1.5;

    const views = Math.round((172 + swell + trend + noise(i) * 11) * seasonal);
    const sessions = Math.round(views * (0.6 + noise(i + 99) * 0.03));

    out.push({ date: d.toISOString().slice(0, 10), views, sessions });
  }
  return out;
}

export const traffic = buildTraffic(30);

export const totals = {
  views: traffic.reduce((n, d) => n + d.views, 0),
  sessions: traffic.reduce((n, d) => n + d.sessions, 0),
  quotes: 68,
  replied: 66,
};

export const materialDemand = [
  { name: "PETG", count: 19 },
  { name: "PLA", count: 16 },
  { name: "Resin", count: 11 },
  { name: "ABS", count: 8 },
  { name: "Nylon", count: 6 },
  { name: "ASA", count: 4 },
  { name: "TPU", count: 3 },
  { name: "Carbon Fibre", count: 1 },
];

export const funnel = [
  { stage: "Visited the site", count: 1462 },
  { stage: "Opened the quote page", count: 341 },
  { stage: "Attached a model", count: 112 },
  { stage: "Sent a request", count: 68 },
];

export type QuoteRow = {
  ref: string;
  received: string;
  name: string;
  material: string;
  qty: number;
  status: "new" | "quoted" | "printing" | "shipped";
};

export const recentQuotes: QuoteRow[] = [
  { ref: "CP-2418", received: "2026-09-05 09:12", name: "M. Halloran", material: "PETG", qty: 24, status: "new" },
  { ref: "CP-2417", received: "2026-09-04 17:48", name: "Ridgeline Cycles", material: "Nylon", qty: 6, status: "quoted" },
  { ref: "CP-2416", received: "2026-09-04 14:03", name: "K. Adeyemi", material: "Resin", qty: 2, status: "printing" },
  { ref: "CP-2415", received: "2026-09-04 10:31", name: "Verity Instruments", material: "ABS", qty: 40, status: "printing" },
  { ref: "CP-2414", received: "2026-09-03 16:57", name: "J. Weiss", material: "PLA", qty: 1, status: "shipped" },
  { ref: "CP-2413", received: "2026-09-03 11:20", name: "Northgate Dental", material: "Resin", qty: 12, status: "shipped" },
];

export const activity = [
  { at: "09:12", text: "Quote request CP-2418 received — 24 × PETG bracket" },
  { at: "08:40", text: "CP-2415 moved to printing · plate 2 of 3" },
  { at: "08:04", text: "CP-2413 marked shipped · tracking added" },
  { at: "Yesterday", text: "CP-2417 quoted — £182, 3 day lead" },
  { at: "Yesterday", text: "Geometry repaired on CP-2416 (non-manifold shell)" },
];
