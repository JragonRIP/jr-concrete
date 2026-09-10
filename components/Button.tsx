import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const variants = {
  primary:
    "bg-accent text-white hover:bg-accent-dark shadow-[0_10px_24px_-12px_rgba(226,74,26,0.9)]",
  secondary: "bg-cream text-ink hover:bg-white",
  outline: "border border-ink/15 bg-transparent text-ink hover:border-ink/40 hover:bg-white",
  outlineLight:
    "border border-white/30 bg-transparent text-white hover:border-white hover:bg-white/10",
  dark: "bg-ink text-white hover:bg-slate",
} as const;

const sizes = {
  md: "min-h-12 px-5 text-[13px]",
  lg: "min-h-12 px-6 text-[13px] sm:min-h-14",
} as const;

type Common = {
  children: ReactNode;
  className?: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  onClick?: () => void;
};

function classes(variant: keyof typeof variants, size: keyof typeof sizes, className: string) {
  return [
    "inline-flex items-center justify-center gap-2 rounded-sm font-display font-bold uppercase tracking-[0.14em] transition-colors duration-200",
    variants[variant],
    sizes[size],
    className,
  ].join(" ");
}

export function ButtonLink({
  href,
  children,
  className = "",
  variant = "primary",
  size = "md",
  onClick,
}: Common & { href: string }) {
  const external = href.startsWith("tel:") || href.startsWith("mailto:");

  if (external) {
    return (
      <a href={href} className={classes(variant, size, className)} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes(variant, size, className)} onClick={onClick}>
      {children}
    </Link>
  );
}

export function Button({
  children,
  className = "",
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={classes(variant, size, className)} {...props}>
      {children}
    </button>
  );
}
