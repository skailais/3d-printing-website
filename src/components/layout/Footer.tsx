import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

const columns = [
  {
    title: "Services",
    links: [
      { href: "#services", label: "FDM Printing" },
      { href: "#services", label: "Resin Printing" },
      { href: "#services", label: "Prototyping" },
      { href: "#services", label: "Small Batch" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "#process", label: "Process" },
      { href: "#materials", label: "Materials" },
      { href: "#work", label: "Work" },
      { href: "#faq", label: "FAQ" },
    ],
  },
];

const socials = [
  { label: "Instagram", href: "#" },
  { label: "X", href: "#" },
  { label: "LinkedIn", href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
          <div className="col-span-2 md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-muted">
              Precision 3D printing for prototypes, functional parts and
              small-batch production.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-medium uppercase tracking-wider text-text-faint">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-text-muted transition-colors hover:text-text"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col-reverse items-center justify-between gap-6 border-t border-border pt-8 md:flex-row">
          <p className="text-xs text-text-faint">
            © {new Date().getFullYear()} CaliPrint. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {socials.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                className="text-xs text-text-muted transition-colors hover:text-text"
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
