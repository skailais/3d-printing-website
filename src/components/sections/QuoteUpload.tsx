"use client";

import { useCallback, useRef, useState, type DragEvent, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { materials } from "@/lib/data";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function QuoteUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback((list: FileList | null) => {
    if (!list) return;
    setFiles((prev) => [...prev, ...Array.from(list)]);
  }, []);

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="quote" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Get Started"
          title="Request a quote."
          subtitle="Upload your model and tell us what you need — we'll follow up with pricing."
        />

        <Reveal delay={0.1} className="mt-16">
          <div className="card-surface relative overflow-hidden rounded-3xl p-2 sm:p-3">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex min-h-[420px] flex-col items-center justify-center gap-4 p-10 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
                    className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/40 text-accent"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.div>
                  <h3 className="font-display text-2xl font-semibold tracking-tight">
                    Request sent.
                  </h3>
                  <p className="max-w-sm text-sm text-text-muted">
                    We&apos;ll review your model and get back to you with a quote shortly.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-2"
                    onClick={() => {
                      setSubmitted(false);
                      setFiles([]);
                    }}
                  >
                    Submit another
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 gap-3 lg:grid-cols-5"
                >
                  {/* Dropzone */}
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragging(true);
                    }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={onDrop}
                    onClick={() => inputRef.current?.click()}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
                    }}
                    className={`focus-ring relative flex min-h-[280px] cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border border-dashed p-8 text-center transition-all duration-300 lg:col-span-2 ${
                      dragging
                        ? "border-accent bg-accent-soft"
                        : "border-border-strong hover:border-accent/50 hover:bg-bg-elevated-2"
                    }`}
                  >
                    <input
                      ref={inputRef}
                      type="file"
                      multiple
                      accept=".stl,.obj,.step,.stp"
                      className="hidden"
                      onChange={(e) => addFiles(e.target.files)}
                    />
                    <motion.div
                      animate={{ y: dragging ? -4 : 0 }}
                      className="flex h-14 w-14 items-center justify-center rounded-full border border-border-strong text-accent"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-6 w-6">
                        <path d="M12 16V4M12 4l-4 4M12 4l4 4" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>
                    <div>
                      <p className="font-medium text-text">Drag & drop your model</p>
                      <p className="mt-1 text-sm text-text-muted">
                        or click to browse — STL, OBJ, STEP
                      </p>
                    </div>

                    {files.length > 0 && (
                      <ul className="mt-2 flex w-full max-w-xs flex-col gap-2 text-left">
                        {files.map((f, i) => (
                          <li
                            key={`${f.name}-${i}`}
                            className="flex items-center justify-between gap-2 rounded-lg border border-border bg-bg px-3 py-2 text-xs"
                          >
                            <span className="truncate text-text-muted">{f.name}</span>
                            <span className="flex shrink-0 items-center gap-2">
                              <span className="font-mono text-text-faint">
                                {formatBytes(f.size)}
                              </span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setFiles((prev) => prev.filter((_, idx) => idx !== i));
                                }}
                                className="text-text-faint hover:text-accent"
                                aria-label={`Remove ${f.name}`}
                              >
                                ×
                              </button>
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Fields */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-3">
                    <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
                      <span className="text-text-muted">Material</span>
                      <select
                        className="focus-ring rounded-xl border border-border bg-bg-elevated px-4 py-3 text-text outline-none"
                        defaultValue={materials[0].name}
                      >
                        {materials.map((m) => (
                          <option key={m.name} value={m.name}>
                            {m.name}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="flex flex-col gap-1.5 text-sm">
                      <span className="text-text-muted">Quantity</span>
                      <div className="flex items-center rounded-xl border border-border bg-bg-elevated">
                        <button
                          type="button"
                          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                          className="focus-ring px-4 py-3 text-text-muted hover:text-accent"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          min={1}
                          value={quantity}
                          onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                          className="w-full min-w-0 flex-1 bg-transparent py-3 text-center text-text outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        />
                        <button
                          type="button"
                          onClick={() => setQuantity((q) => q + 1)}
                          className="focus-ring px-4 py-3 text-text-muted hover:text-accent"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </label>

                    <label className="flex flex-col gap-1.5 text-sm">
                      <span className="text-text-muted">Name</span>
                      <input
                        type="text"
                        required
                        placeholder="Your name"
                        className="focus-ring rounded-xl border border-border bg-bg-elevated px-4 py-3 text-text outline-none placeholder:text-text-faint"
                      />
                    </label>

                    <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
                      <span className="text-text-muted">Email</span>
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        className="focus-ring rounded-xl border border-border bg-bg-elevated px-4 py-3 text-text outline-none placeholder:text-text-faint"
                      />
                    </label>

                    <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
                      <span className="text-text-muted">Comment</span>
                      <textarea
                        rows={3}
                        placeholder="Anything we should know?"
                        className="focus-ring resize-none rounded-xl border border-border bg-bg-elevated px-4 py-3 text-text outline-none placeholder:text-text-faint"
                      />
                    </label>

                    <div className="sm:col-span-2">
                      <Button variant="primary" className="w-full sm:w-auto">
                        Request a Quote
                      </Button>
                    </div>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
