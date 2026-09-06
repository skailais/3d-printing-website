"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Quote, QuoteStatus } from "@/lib/server/quotes";

const STATUSES: QuoteStatus[] = ["new", "quoted", "printing", "shipped", "declined"];

const statusTone: Record<QuoteStatus, string> = {
  new: "text-[#e15a3c] border-[#e15a3c]/40",
  quoted: "text-[#17a394] border-[#17a394]/40",
  printing: "text-[#c9a227] border-[#c9a227]/40",
  shipped: "text-paper/50 border-paper/20",
  declined: "text-paper/35 border-paper/12",
};

function bytes(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

function when(iso: string) {
  return new Date(iso).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function QuoteQueue({ quotes }: { quotes: Quote[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null>(null);

  const changeStatus = async (id: string, status: QuoteStatus) => {
    setBusy(id);
    try {
      await fetch(`/api/quotes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      router.refresh();
    } finally {
      setBusy(null);
    }
  };

  return (
    <section className="border border-paper/12 bg-paper/[0.03] p-7">
      <h2 className="font-display text-lg text-paper">Quote requests</h2>

      {quotes.length === 0 ? (
        <p className="mt-6 text-sm leading-relaxed text-paper/45">
          The queue is empty. Requests sent through the quote form land here, with
          their files.
        </p>
      ) : (
        <ul className="mt-6 divide-y divide-paper/8">
          {quotes.map((quote) => {
            const expanded = open === quote.id;
            return (
              <li key={quote.id} className="py-4">
                <div className="grid grid-cols-[5.5rem_1fr_auto] items-start gap-4 sm:grid-cols-[6rem_1fr_8rem_7rem]">
                  <button
                    onClick={() => setOpen(expanded ? null : quote.id)}
                    className="focus-ring text-left font-mono text-[0.68rem] text-paper/80 hover:text-[#e15a3c]"
                    aria-expanded={expanded}
                  >
                    {quote.ref}
                  </button>

                  <div className="min-w-0">
                    <div className="truncate text-sm text-paper/90">{quote.name}</div>
                    <div className="mt-1 font-mono text-[0.58rem] text-paper/40">
                      {when(quote.receivedAt)} · {quote.material} · ×{quote.quantity}
                      {quote.files.length > 0 && ` · ${quote.files.length} file${quote.files.length > 1 ? "s" : ""}`}
                    </div>
                  </div>

                  <span className="hidden sm:block">
                    <span
                      className={`border px-2 py-1 font-mono text-[0.52rem] tracked-label ${statusTone[quote.status]}`}
                    >
                      {quote.status}
                    </span>
                  </span>

                  <select
                    aria-label={`Status for ${quote.ref}`}
                    value={quote.status}
                    disabled={busy === quote.id}
                    onChange={(e) => changeStatus(quote.id, e.target.value as QuoteStatus)}
                    className="focus-ring border border-paper/15 bg-transparent px-2 py-1.5 font-mono text-[0.58rem] tracked-label text-paper/70"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s} className="bg-[#12100e]">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {expanded && (
                  <div className="mt-4 grid gap-4 border-l-2 border-[#17a394]/40 pl-5 sm:grid-cols-2">
                    <div>
                      <div className="font-mono text-[0.55rem] tracked-label text-paper/40">
                        Contact
                      </div>
                      <a
                        href={`mailto:${quote.email}?subject=${encodeURIComponent(`Your quote ${quote.ref}`)}`}
                        className="ink-link mt-2 inline-block text-sm text-paper/85 hover:text-[#e15a3c]"
                      >
                        {quote.email}
                      </a>
                      {quote.comment && (
                        <p className="mt-4 max-w-md whitespace-pre-wrap text-sm leading-relaxed text-paper/70">
                          {quote.comment}
                        </p>
                      )}
                    </div>

                    <div>
                      <div className="font-mono text-[0.55rem] tracked-label text-paper/40">
                        Files
                      </div>
                      {quote.files.length === 0 ? (
                        <p className="mt-2 text-sm text-paper/45">None attached.</p>
                      ) : (
                        <ul className="mt-2 space-y-2">
                          {quote.files.map((file) => (
                            <li key={file.stored}>
                              {/* the underline goes on the name, not the row:
                                  .ink-link is inline-block and would cancel
                                  the flex gap, butting the size against it */}
                              <a
                                href={`/api/quotes/${quote.id}/files/${encodeURIComponent(file.stored)}`}
                                className="focus-ring flex items-baseline gap-3 text-sm text-paper/85 transition-colors hover:text-[#e15a3c]"
                              >
                                <span className="ink-link truncate">{file.original}</span>
                                <span className="shrink-0 font-mono text-[0.55rem] text-paper/40">
                                  {bytes(file.bytes)}
                                </span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
