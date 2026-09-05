import Link from "next/link";
import type { ReactNode, ButtonHTMLAttributes } from "react";
import { clsx } from "clsx";

type Variant = "primary" | "outline" | "ghost";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-tight transition-all duration-300 focus-ring whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-text text-bg hover:bg-accent hover:shadow-[0_0_0_1px_var(--accent),0_0_28px_-6px_var(--accent)] active:scale-[0.97]",
  outline:
    "border border-border-strong text-text hover:border-accent hover:text-accent hover:bg-accent-soft active:scale-[0.97]",
  ghost: "text-text-muted hover:text-text",
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

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { children, variant = "primary", className } = props;
  const classes = clsx(base, variants[variant], className);

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} onClick={props.onClick} className={classes}>
        {children}
      </Link>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { href, variant: _variant, className: _className, children: _children, ...rest } = props as ButtonAsButton;

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
