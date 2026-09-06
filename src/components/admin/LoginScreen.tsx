"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Seal, SealGlyph } from "@/components/art/Seal";
import { InkWash } from "@/components/art/InkWash";
import { Button } from "@/components/ui/Button";

/**
 * The password never leaves this form except to /api/auth/login, and the
 * dashboard's data is not in the page at all until the server sees a valid
 * session cookie — so failing here reveals nothing.
 */
export default function LoginScreen({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (busy) return;

    setBusy(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setPassword("");
        router.refresh(); // the server re-renders, now with the session
        return;
      }

      const payload = await response.json().catch(() => ({}));
      setError(payload.error ?? "Not that one.");
    } catch {
      setError("Could not reach the server.");
    } finally {
      setBusy(false);
    }
  };

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

        {configured ? (
          <>
            <label className="mt-8 block text-left">
              <span className="font-mono text-[0.55rem] tracked-label text-paper/45">
                Password
              </span>
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                value={password}
                autoFocus
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(null);
                }}
                className="mt-2 w-full border-b border-paper/25 bg-transparent py-2.5 text-paper outline-none transition-[border-color,box-shadow] focus:border-[#e15a3c] focus:shadow-[0_1px_0_0_#e15a3c]"
              />
            </label>

            <div className="min-h-[1.25rem] pt-2 text-left">
              {error && (
                <span role="alert" className="font-mono text-[0.58rem] tracked-label text-[#e15a3c]">
                  {error}
                </span>
              )}
            </div>

            <Button variant="paper" className="mt-4 w-full" disabled={busy}>
              {busy ? "Checking…" : "Enter"}
            </Button>
          </>
        ) : (
          <p className="mt-8 border border-[#c9a227]/40 bg-[#c9a227]/10 p-4 text-left text-xs leading-relaxed text-paper/75">
            No credentials are set on this server. Run{" "}
            <code className="font-mono text-[#c9a227]">npm run setup:admin</code> to
            create a password and session secret, then restart.
          </p>
        )}
      </motion.form>
    </div>
  );
}
