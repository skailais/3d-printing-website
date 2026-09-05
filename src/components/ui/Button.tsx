import Link from "next/link";
import type { ReactNode, ButtonHTMLAttributes } from "react";
import { clsx } from "clsx";

type Variant = "ink" | "vermilion" | "outline" | "paper";

const base =
  "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-none px-7 py-3.5 text-[0.82rem] tracked-label font-medium transition-all duration-500 focus-ring whitespace-nowrap";

const variants: Record<Variant, string> = {
  ink: "bg-ink text-paper hover:bg-vermilion",
  vermilion: "bg-vermilion text-paper-warm hover:bg-ink",
  outline:
    "border border-ink/25 text-ink hover:border-vermilion hover:text-vermilion",
  paper: "bg-paper text-ink hover:bg-vermilion hover:text-paper-warm",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

type ButtonAsLink = CommonProps & {
  href: string;
  onClick?: () => void;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
    href?: never;
  };

function Inner({ children }: { children: ReactNode }) {
  return (
    <>
      <span className="relative z-10 flex items-center gap-2.5">{children}</span>
      {/* ink bleeding up from the baseline on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-0 h-0 bg-current opacity-10 transition-all duration-500 group-hover:h-full"
      />
    </>
  );
}

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { children, variant = "ink", className } = props;
  const classes = clsx(base, variants[variant], className);

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} onClick={props.onClick} className={classes}>
        <Inner>{children}</Inner>
      </Link>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { href, variant: _variant, className: _className, children: _children, ...rest } = props as ButtonAsButton;

  return (
    <button className={classes} {...rest}>
      <Inner>{children}</Inner>
    </button>
  );
}
