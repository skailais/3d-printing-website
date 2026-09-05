import { Reveal } from "@/components/ui/Reveal";
import { BrushStroke } from "@/components/art/BrushStroke";
import { clsx } from "clsx";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "ink",
  swash = true,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  tone?: "ink" | "paper";
  swash?: boolean;
}) {
  const onPaper = tone === "paper";

  return (
    <div className={clsx(align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl")}>
      <Reveal>
        <span
          className={clsx(
            "font-mono text-[0.62rem] tracked-label",
            onPaper ? "text-vermilion-bright" : "text-vermilion"
          )}
        >
          {eyebrow}
        </span>
      </Reveal>

      <Reveal delay={0.08}>
        <h2
          className={clsx(
            "relative mt-5 font-display text-4xl font-semibold leading-[1.12] tracking-tight text-balance sm:text-5xl md:text-[3.4rem]",
            onPaper ? "text-paper" : "text-ink"
          )}
        >
          {title}
        </h2>
      </Reveal>

      {swash && (
        <div className={clsx("mt-4 h-4 w-40", align === "center" && "mx-auto")}>
          <BrushStroke
            variant="swash"
            color={onPaper ? "rgba(243,239,230,0.5)" : "var(--vermilion)"}
            className="h-full w-full"
            opacity={0.85}
          />
        </div>
      )}

      {subtitle && (
        <Reveal delay={0.16}>
          <p
            className={clsx(
              "mt-6 text-[0.98rem] leading-relaxed text-balance",
              onPaper ? "text-paper/65" : "text-ink-muted"
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
