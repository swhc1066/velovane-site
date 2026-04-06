import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
}

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 rounded-lg px-6 py-3 font-mono text-sm font-medium tracking-wide transition-all duration-200";

  const variants = {
    primary: "bg-white text-surface-dark hover:bg-n-200",
    secondary:
      "bg-transparent text-white border border-white/20 hover:border-white/40 hover:bg-white/5",
  };

  const cls = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }

  return <button className={cls}>{children}</button>;
}
