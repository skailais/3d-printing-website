"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TrafficChart from "@/components/admin/TrafficChart";
import MaterialBars from "@/components/admin/MaterialBars";
import QuoteQueue from "@/components/admin/QuoteQueue";
import type { DailyTraffic } from "@/lib/server/analytics";
import type { Quote } from "@/lib/server/quotes";

export type DashboardProps = {
  traffic: DailyTraffic[];
  totals: {
    views: number;
    sessions: number;
    quotes: number;
    answered: number;
    allQuotes: number;
  };
  materialDemand: { name: string; count: number }[];
  funnel: { stage: string; count: number }[];
  quotes: Quote[];
};

function StatTile({ value, label, note }: { value: string; label: string; note: string }) {
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

export default function MasterDashboard({
  traffic,
  totals,
  materialDemand,
  funnel,
  quotes,
}: DashboardProps) {
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  const signOut = async () => {
    setSigningOut(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.refresh();
  };

  const quoteRate = totals.sessions > 0 ? (totals.quotes / totals.sessions) * 100 : 0;
  const answeredRate = totals.allQuotes > 0 ? (totals.answered / totals.allQuotes) * 100 : 0;
  const noTrafficYet = totals.views === 0;

  return (
    <div className="ink-panel min-h-screen">
      <div className="mx-auto max-w-[86rem] px-6 py-14 lg:px-10">
        <header className="flex flex-wrap items-end justify-between gap-6 border-b border-paper/15 pb-8">
          <div>
            <span className="font-mono text-[0.58rem] tracked-label text-[#e15a3c]">
              Studio control
            </span>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-paper">
              The last thirty days
            </h1>
          </div>
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="ink-link font-mono text-[0.62rem] tracked-label text-paper/60 transition-colors hover:text-[#e15a3c]"
            >
              ← Back to the site
            </Link>
            <button
              onClick={signOut}
              disabled={signingOut}
              className="focus-ring font-mono text-[0.62rem] tracked-label text-paper/60 transition-colors hover:text-[#e15a3c]"
            >
              {signingOut ? "Signing out…" : "Sign out"}
            </button>
          </div>
        </header>

        {noTrafficYet && (
          <p className="mt-6 border-l-2 border-[#c9a227] bg-[#c9a227]/8 px-5 py-4 text-sm leading-relaxed text-paper/70">
            Nothing recorded yet. Counting starts the first time someone loads a
            page while this server is running — visit the site in another tab and
            these figures will begin to fill.
          </p>
        )}

        <div className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-4">
          <StatTile value={totals.views.toLocaleString("en-US")} label="Page views" note="30 days" />
          <StatTile value={String(totals.quotes)} label="Quote requests" note="30 days" />
          <StatTile
            value={totals.sessions > 0 ? `${quoteRate.toFixed(1)}%` : "—"}
            label="Sessions that quoted"
            note={totals.sessions > 0 ? `of ${totals.sessions} sessions` : "no sessions yet"}
          />
          <StatTile
            value={totals.allQuotes > 0 ? `${Math.round(answeredRate)}%` : "—"}
            label="Answered"
            note={totals.allQuotes > 0 ? `of ${totals.allQuotes} in total` : "no requests yet"}
          />
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Panel className="lg:col-span-2">
            <TrafficChart traffic={traffic} />
          </Panel>
          <Panel>
            <MaterialBars materials={materialDemand} />
          </Panel>
        </div>

        <div className="mt-6">
          <Panel>
            <h2 className="font-display text-lg text-paper">From visit to request</h2>
            {funnel[0].count === 0 ? (
              <p className="mt-6 text-sm text-paper/45">
                Nothing to chart until the first visit is recorded.
              </p>
            ) : (
              <ul className="mt-6 space-y-3">
                {funnel.map((step, i) => {
                  const pct = (step.count / Math.max(funnel[0].count, 1)) * 100;
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
            )}
          </Panel>
        </div>

        <div className="mt-6">
          <QuoteQueue quotes={quotes} />
        </div>
      </div>
    </div>
  );
}
