import type { Metadata } from "next";
import Link from "next/link";
import { Enso } from "@/components/art/Enso";
import { InkWash } from "@/components/art/InkWash";
import { BrushStroke } from "@/components/art/BrushStroke";
import { Button } from "@/components/ui/Button";
import { navLinks } from "@/lib/data";

export const metadata: Metadata = {
  title: "Nothing here",
  robots: { index: false, follow: true },
};

/**
 * The default Next.js 404 is a system-font line on a blank page with no way
 * back into the site. This one is in the studio's own idiom and, more to the
 * point, offers somewhere to go.
 */
export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden py-28">
      <InkWash pigment="jade" size={620} style={{ top: "-14rem", right: "-10rem" }} />
      <InkWash pigment="vermilion" size={420} style={{ bottom: "-8rem", left: "-8rem" }} />

      {/* an ensō with nothing framed inside it */}
      <div className="pointer-events-none absolute right-6 top-1/2 hidden h-[26rem] w-[26rem] -translate-y-1/2 opacity-70 lg:block xl:right-20 xl:h-[32rem] xl:w-[32rem]">
        <Enso className="h-full w-full" color="var(--stroke)" strokeWidth={5} />
      </div>

      <div className="relative mx-auto w-full max-w-[86rem] px-6 lg:px-10">
        <div className="max-w-xl">
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-vermilion" aria-hidden="true" />
            <span className="font-mono text-[0.62rem] tracked-label text-vermilion">404</span>
          </div>

          <h1 className="mt-8 font-display text-[2.8rem] font-semibold leading-[1.05] tracking-tight text-body sm:text-6xl">
            Nothing at this
            <br />
            address.
          </h1>

          <div className="mt-7 h-5 w-52">
            <BrushStroke variant="swash" color="var(--stroke)" className="h-full w-full" opacity={0.85} />
          </div>

          <p className="mt-7 max-w-md text-[1.02rem] leading-relaxed text-body-muted">
            The page you asked for is not here — it may have moved, or never
            existed. The work itself is all still where you left it.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href="/" variant="ink">
              Back to the studio
            </Button>
            <Button href="/quote" variant="outline">
              Request a Quote
            </Button>
          </div>

          <nav aria-label="Site sections" className="mt-14 border-t border-rule pt-7">
            <span className="font-mono text-[0.58rem] tracked-label text-body-faint">
              Or go straight to
            </span>
            <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="ink-link focus-ring font-mono text-[0.66rem] tracked-label text-body-soft transition-colors hover:text-vermilion"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
