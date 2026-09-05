import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { BrushStroke } from "@/components/art/BrushStroke";
import { Bamboo } from "@/components/art/Bamboo";
import { navLinks } from "@/lib/data";

const socials = [
  { label: "Instagram", href: "#" },
  { label: "X", href: "#" },
  { label: "LinkedIn", href: "#" },
];

export default function Footer() {
  return (
    <footer className="ink-panel relative z-10 overflow-hidden">
      <div className="pointer-events-none absolute -top-6 left-0 h-16 w-[140%] opacity-30">
        <BrushStroke variant="band" color="rgba(243,239,230,0.35)" className="h-full w-full" animate={false} />
      </div>

      {/* bamboo standing at the right edge of the ink */}
      <div className="pointer-events-none absolute -right-6 bottom-0 top-0 hidden w-56 opacity-[0.14] md:block lg:right-4 lg:w-64">
        <Bamboo className="h-full w-full" color="var(--paper)" rough={false} />
      </div>

      <div className="mx-auto max-w-[86rem] px-6 py-20 lg:px-10">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo tone="paper" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-paper/70">
              A small print studio. Digital models in, finished objects out —
              prototypes, functional parts and short production runs.
            </p>
            <Link
              href="/quote"
              className="ink-link mt-8 inline-block font-display text-2xl text-paper transition-colors hover:text-vermilion-bright"
            >
              Start a project →
            </Link>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <h3 className="font-mono text-[0.6rem] tracked-label text-paper/60">Pages</h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-paper/70 transition-colors hover:text-vermilion-bright"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/quote" className="text-sm text-paper/70 transition-colors hover:text-vermilion-bright">
                  Quote
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="font-mono text-[0.6rem] tracked-label text-paper/60">Studio</h3>
            <ul className="mt-5 space-y-3 text-sm text-paper/70">
              <li>
                <a href="mailto:studio@caliprint.example.com" className="transition-colors hover:text-vermilion-bright">
                  studio@caliprint.example.com
                </a>
              </li>
              <li>Mon – Fri, 9 – 18</li>
              <li className="flex gap-4 pt-2">
                {socials.map((s) => (
                  <Link
                    key={s.label}
                    href={s.href}
                    className="font-mono text-[0.6rem] tracked-label text-paper/65 transition-colors hover:text-vermilion-bright"
                  >
                    {s.label}
                  </Link>
                ))}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col-reverse items-start justify-between gap-4 border-t border-paper/12 pt-8 sm:flex-row sm:items-center">
          <p className="font-mono text-[0.6rem] tracked-label text-paper/60">
            © {new Date().getFullYear()} CaliPrint
          </p>
          <p className="font-mono text-[0.6rem] tracked-label text-paper/60">
            Ideas, made solid
          </p>
        </div>
      </div>
    </footer>
  );
}
