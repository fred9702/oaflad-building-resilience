"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps {
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const base =
  "relative inline-flex items-center justify-center font-heading font-semibold text-lg rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 min-h-[44px]";

const variants: Record<Variant, string> = {
  primary:
    "text-white bg-orange hover:bg-orange/90 px-8 py-3 shadow-lg shadow-orange/30 hover:scale-[1.02] active:scale-[0.98] focus:ring-offset-navy overflow-hidden",
  secondary:
    "text-white border-2 border-white hover:bg-white/10 px-8 py-3 hover:scale-[1.02] active:scale-[0.98] focus:ring-offset-navy overflow-hidden",
  ghost:
    "text-white underline underline-offset-4 px-4 py-2 hover:text-orange focus:ring-offset-navy",
};

export function Button({ href, variant = "primary", children, className = "", onClick }: ButtonProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
      {(variant === "primary" || variant === "secondary") && (
        <span
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent hover-shimmer pointer-events-none"
          aria-hidden="true"
          style={{
            animation: "none",
          }}
        />
      )}
    </Link>
  );
}
