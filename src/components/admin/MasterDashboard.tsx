"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Seal, SealGlyph } from "@/components/art/Seal";
import { InkWash } from "@/components/art/InkWash";
import { Button } from "@/components/ui/Button";
import TrafficChart from "@/components/admin/TrafficChart";
import MaterialBars from "@/components/admin/MaterialBars";
import {
  IS_DEMO_DATA,
  activity,
  funnel,
  recentQuotes,
  totals,
} from "@/lib/admin-demo-data";

/* This gate is a curtain, not a lock. A static site ships every byte to the
   browser, so the check below sits in the bundle where anyone can read it. It
   exists to keep the page out of the way, not to protect anything. Real access
   control needs a server: move the data behind an API route and check a session
   there before any of it is sent. */
const DEMO_PASSPHRASE = "caliprint";

const statusTone: Record<string, string> = {
  new: "text-[#e15a3c] border-[#e15a3c]/40",
  quoted: "text-[#17a394] border-[#17a394]/40",
  printing: "text-[#c9a227] border-[#c9a227]/40",
  shipped: "text-paper/50 border-paper/20",
};

function StatTile({
  value,
  label,
  note,
}: {
  value: string;
  label: string;
  note: string;
}) {
  return (
    <div className="border-t border-paper/15 pt-5">
      <div className="font-display text-4xl font-semibold tracking-tight text-paper">{value}</div>
      <div className="mt-3 font-mono text-[0.58rem] tracked-label text-paper/50">{label}</div>
      <div className="mt-1.5 text-xs text-paper/40">{note}</div>
    </div>
  );
}

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`border border-paper/12 bg-paper/[0.03] p-7 ${className}`}>{children}</section>
  );
}

export default function MasterDashboard() {
  const [unlocked, setUnlocked] = useState(false);
  const [entry, setEntry] = useState("");
  const [error, setError] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (entry.trim().toLowerCase() === DEMO_PASSPHRASE) {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (!unlocked) {
    return (
      <div className="ink-panel relative flex min-h-screen items-center justify-center overflow-hidden px-6">
        <InkWash pigment="jade" size={560} style={{ top: "-12rem", left: "-8rem" }} />
        <InkWash pigment="vermilion" size={420} style={{ bottom: "-10rem", right: "-6rem" }} />

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-sm border border-paper/15 bg-[#12100e]/80 p-10 text-center"
        >
          <div className="flex justify-center">
            <Seal size={52}>
              <SealGlyph className="h-6 w-6" />
            </Seal>
          </div>

          <h1 className="mt-8 font-display text-2xl font-semibold tracking-tight text-paper">
            Studio control
          </h1>
          <p className="mt-3 text-xs leading-relaxed text-paper/50">
            Back of house. Not linked from the site.
          </p>

          <label className="mt-8 block text-left">
            <span className="font-mono text-[0.55rem] tracked-label text-paper/45">Passphrase</span>
            <input
              type="password"
              value={entry}
              autoFocus
              onChange={(e) => {
                setEntry(e.target.value);
                setError(false);
              }}
              /* underline rather than the site's boxed focus ring: autofocused
                 on load, a vermilion box around an empty field reads as an
                 error before anything has been typed */
              className="mt-2 w-full border-b border-paper/25 bg-transparent py-2.5 text-paper outline-none transition-[border-color,box-shadow] focus:border-[#e15a3c] focus:shadow-[0_1px_0_0_#e15a3c]"
            />
          </label>

          <div className="min-h-[1.25rem] pt-2 text-left">
            {error && (
              <span className="font-mono text-[0.58rem] tracked-label text-[#e15a3c]">
                Not that one.
              </span>
            )}
          </div>

          <Button variant="paper" className="mt-4 w-full">
            Enter
          </Button>

          <p className="mt-8 border-t border-paper/10 pt-5 text-left text-[0.68rem] leading-relaxed text-paper/35">
            This gate is cosmetic — the check ships in the page source. Anything
            genuinely private needs a server to hold it back.
          </p>
        </motion.form>
      </div>
    );
  }

  return (
    <div className="ink-panel min-h-screen">
      <div className="mx-auto max-w-[86rem] px-6 py-14 lg:px-10">
        {/* header */}
        <header className="flex flex-wrap items-end justify-between gap-6 border-b border-paper/15 pb-8">
          <div>
            <span className="font-mono text-[0.58rem] tracked-label text-[#e15a3c]">
              Studio control
            </span>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-paper">
              The last thirty days
            </h1>
          </div>
          <Link
            href="/"
            className="ink-link font-mono text-[0.62rem] tracked-label text-paper/60 transition-colors hover:text-[#e15a3c]"
          >
            ← Back to the site
          </Link>
        </header>

        {IS_DEMO_DATA && (
          <p className="mt-6 border-l-2 border-[#c9a227] bg-[#c9a227]/8 px-5 py-4 text-sm leading-relaxed text-paper/70">
            <strong className="font-medium text-paper">These figures are invented.</strong>{" "}
            The site collects no analytics and the quote form stores nothing, so
            there is nothing real to report yet. Swap{" "}
            <code className="font-mono text-[0.78em] text-[#c9a227]">src/lib/admin-demo-data.ts</code>{" "}
            for a live source and this page will show the real thing.
          </p>
        )}

        {/* headline figures — a number each, no chart needed */}
        <div className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {/* fixed locale — the build machine's default was grouping with
              narrow spaces */}
          <StatTile value={totals.views.toLocaleString("en-US")} label="Page views" note="30 days" />
          <StatTile value={String(totals.quotes)} label="Quote requests" note="2.3 a day" />
          <StatTile
            value={`${((totals.quotes / totals.sessions) * 100).toFixed(1)}%`}
            label="Sessions that quoted"
            note="of all sessions"
          />
          <StatTile
            value={`${Math.round((totals.replied / totals.quotes) * 100)}%`}
            label="Replied to"
            note="within one working day"
          />
        </div>

        {/* charts */}
        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Panel className="lg:col-span-2">
            <TrafficChart />
          </Panel>
          <Panel>
            <MaterialBars />
          </Panel>
        </div>

        {/* funnel + activity */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Panel className="lg:col-span-2">
            <h2 className="font-display text-lg text-paper">From visit to request</h2>
            <ul className="mt-6 space-y-3">
              {funnel.map((step, i) => {
                const pct = (step.count / funnel[0].count) * 100;
                return (
                  <li key={step.stage} className="grid grid-cols-[1fr_auto] gap-3">
                    <div>
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="text-sm text-paper/75">{step.stage}</span>
                        <span className="font-mono text-[0.6rem] text-paper/45">
                          {pct.toFixed(1)}%
                        </span>
                      </div>
                      <span className="mt-2 block h-3.5 bg-paper/6">
                        <span
                          className="block h-full rounded-r-[4px]"
                          style={{
                            width: `${pct}%`,
                            background: i === funnel.length - 1 ? "#e15a3c" : "#17a394",
                            opacity: 1 - i * 0.12,
                          }}
                        />
                      </span>
                    </div>
                    <span className="self-end font-display text-xl text-paper">{step.count}</span>
                  </li>
                );
              })}
            </ul>
          </Panel>

          <Panel>
            <h2 className="font-display text-lg text-paper">Activity</h2>
            <ul className="mt-6 space-y-4">
              {activity.map((a, i) => (
                <li key={i} className="flex gap-4">
                  <span className="w-16 shrink-0 font-mono text-[0.55rem] tracked-label text-paper/40">
                    {a.at}
                  </span>
                  <span className="text-xs leading-relaxed text-paper/70">{a.text}</span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>

        {/* the queue */}
        <Panel className="mt-6">
          <h2 className="font-display text-lg text-paper">Quote requests</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[46rem] text-left">
              <thead>
                <tr className="border-b border-paper/12 font-mono text-[0.55rem] tracked-label text-paper/45">
                  <th className="pb-3 pr-4 font-normal">Ref</th>
                  <th className="pb-3 pr-4 font-normal">Received</th>
                  <th className="pb-3 pr-4 font-normal">From</th>
                  <th className="pb-3 pr-4 font-normal">Material</th>
                  <th className="pb-3 pr-4 font-normal">Qty</th>
                  <th className="pb-3 font-normal">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentQuotes.map((q) => (
                  <tr key={q.ref} className="border-b border-paper/8 transition-colors hover:bg-paper/[0.04]">
                    <td className="py-3 pr-4 font-mono text-[0.68rem] text-paper/80">{q.ref}</td>
                    <td className="py-3 pr-4 font-mono text-[0.62rem] text-paper/50">{q.received}</td>
                    <td className="py-3 pr-4 text-sm text-paper/85">{q.name}</td>
                    <td className="py-3 pr-4 text-sm text-paper/65">{q.material}</td>
                    <td className="py-3 pr-4 font-display text-sm text-paper">{q.qty}</td>
                    <td className="py-3">
                      <span
                        className={`border px-2 py-1 font-mono text-[0.52rem] tracked-label ${statusTone[q.status]}`}
                      >
                        {q.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    </div>
  );
}
