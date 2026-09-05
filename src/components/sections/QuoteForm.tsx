"use client";

import { useCallback, useRef, useState, type DragEvent, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Seal, SealGlyph } from "@/components/art/Seal";
import { InkWash } from "@/components/art/InkWash";
import { InkPlate } from "@/components/art/InkPlate";
import { materials } from "@/lib/data";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const fieldClass =
  "focus-ring w-full border-b border-ink/20 bg-transparent px-0 py-3.5 text-ink outline-none transition-colors placeholder:text-ink-faint hover:border-ink/40 focus:border-vermilion";

const labelClass = "font-mono text-[0.58rem] tracked-label text-ink-faint";

export default function QuoteForm() {
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
    <section className="relative overflow-hidden py-24 sm:py-32">
      <InkWash pigment="jade" size={520} style={{ top: "10%", left: "-12rem" }} />
      <InkWash pigment="vermilion" size={400} style={{ bottom: "0%", right: "-8rem" }} />

      <div className="relative mx-auto max-w-[74rem] px-6 lg:px-10">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="sent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex min-h-[26rem] flex-col items-center justify-center border border-rule bg-paper-warm/60 px-8 text-center"
            >
              <motion.div
                initial={{ scale: 1.5, opacity: 0, rotate: -14 }}
                animate={{ scale: 1, opacity: 1, rotate: -4 }}
                transition={{ duration: 0.55, delay: 0.15, ease: [0.34, 1.4, 0.64, 1] }}
              >
                <Seal size={68}>
                  <SealGlyph className="h-7 w-7" />
                </Seal>
              </motion.div>
              <h2 className="mt-10 font-display text-4xl font-semibold tracking-tight text-ink">
                Received.
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-muted">
                We will look at your geometry and come back with pricing and a
                date — usually the same working day.
              </p>
              <Button
                variant="outline"
                className="mt-10"
                onClick={() => {
                  setSubmitted(false);
                  setFiles([]);
                  setQuantity(1);
                }}
              >
                Send another
              </Button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={onSubmit}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 gap-x-16 gap-y-14 lg:grid-cols-2"
            >
              {/* dropzone */}
              <Reveal>
                {/* The whole panel is the drop target, but only the inner
                    button is focusable — a role="button" wrapper holding the
                    per-file remove buttons would be invalid nesting. */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={onDrop}
                  className={`group/zone relative flex min-h-[28rem] flex-col items-center justify-center gap-6 overflow-hidden border p-10 text-center transition-all duration-500 ${
                    dragging
                      ? "border-vermilion bg-vermilion/5"
                      : "border-dashed border-ink/25 hover:border-ink/45 hover:bg-paper-warm/50"
                  }`}
                >
                  {/* a plate waiting under the drop area, warming as a file arrives */}
                  <motion.span
                    aria-hidden="true"
                    animate={{ opacity: dragging ? 0.24 : 0.1, scale: dragging ? 1.04 : 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="pointer-events-none absolute inset-x-0 bottom-[-8%] mx-auto h-[62%] w-[76%]"
                  >
                    <InkPlate scene="vessel" pigment="jade" className="h-full w-full" />
                  </motion.span>
                  <input
                    ref={inputRef}
                    type="file"
                    multiple
                    accept=".stl,.obj,.step,.stp"
                    className="hidden"
                    onChange={(e) => addFiles(e.target.files)}
                  />

                  <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="focus-ring group flex cursor-pointer flex-col items-center gap-6"
                  >
                    <motion.span
                      aria-hidden="true"
                      animate={{ y: dragging ? -6 : 0 }}
                      transition={{ duration: 0.4 }}
                      className="flex h-16 w-16 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors duration-500 group-hover:border-vermilion group-hover:text-vermilion"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-6 w-6">
                        <path d="M12 17V4M12 4l-5 5M12 4l5 5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M4 17v1.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V17" strokeLinecap="round" />
                      </svg>
                    </motion.span>

                    <span className="block">
                      <span className="block font-display text-2xl text-ink">
                        Drop your model here
                      </span>
                      <span className="mt-2 block font-mono text-[0.58rem] tracked-label text-ink-faint">
                        STL · OBJ · STEP — or click to browse
                      </span>
                    </span>
                  </button>

                  {files.length > 0 && (
                    <ul aria-live="polite" className="mt-2 w-full max-w-sm space-y-2 text-left">
                      {files.map((f, i) => (
                        <li
                          key={`${f.name}-${i}`}
                          className="flex items-center justify-between gap-3 border border-rule bg-paper px-3 py-2"
                        >
                          <span className="truncate text-xs text-ink-soft">{f.name}</span>
                          <span className="flex shrink-0 items-center gap-3">
                            <span className="font-mono text-[0.55rem] text-ink-faint">
                              {formatBytes(f.size)}
                            </span>
                            <button
                              type="button"
                              aria-label={`Remove ${f.name}`}
                              onClick={() =>
                                setFiles((prev) => prev.filter((_, idx) => idx !== i))
                              }
                              className="focus-ring text-ink-faint transition-colors hover:text-vermilion"
                            >
                              ×
                            </button>
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>

              {/* fields */}
              <Reveal delay={0.1}>
                <div className="flex flex-col gap-10">
                  <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
                    <label className="flex flex-col gap-2">
                      <span className={labelClass}>Material</span>
                      <select className={`${fieldClass} appearance-none`} defaultValue={materials[0].name}>
                        {materials.map((m) => (
                          <option key={m.name} value={m.name}>
                            {m.name}
                          </option>
                        ))}
                      </select>
                    </label>

                    <div className="flex flex-col gap-2">
                      <span className={labelClass}>Quantity</span>
                      <div className="flex items-center justify-between border-b border-ink/20 py-2">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                          className="focus-ring px-2 text-lg text-ink-muted transition-colors hover:text-vermilion"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          min={1}
                          aria-label="Quantity"
                          value={quantity}
                          onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                          className="w-full min-w-0 bg-transparent text-center font-display text-lg text-ink outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        />
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() => setQuantity((q) => q + 1)}
                          className="focus-ring px-2 text-lg text-ink-muted transition-colors hover:text-vermilion"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <label className="flex flex-col gap-2">
                    <span className={labelClass}>Name</span>
                    <input type="text" required placeholder="Your name" className={fieldClass} />
                  </label>

                  <label className="flex flex-col gap-2">
                    <span className={labelClass}>Email</span>
                    <input type="email" required placeholder="you@example.com" className={fieldClass} />
                  </label>

                  <label className="flex flex-col gap-2">
                    <span className={labelClass}>What are you making?</span>
                    <textarea
                      rows={3}
                      placeholder="A sentence is plenty."
                      className={`${fieldClass} resize-none`}
                    />
                  </label>

                  <div>
                    <Button variant="ink" className="w-full sm:w-auto">
                      Request a Quote
                    </Button>
                    <p className="mt-4 text-xs text-ink-faint">
                      No account, no obligation. We reply to every file.
                    </p>
                  </div>
                </div>
              </Reveal>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
