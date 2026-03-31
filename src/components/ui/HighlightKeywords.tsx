"use client";

import { type ReactNode } from "react";

const KEYWORDS = [
  "#BuildingResilience",
  "#RenforcerLaRésilience",
  "CAP 241",
  "ÉQUILIBRES",
  "BALANCE",
];

const pattern = new RegExp(`(${KEYWORDS.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");

/**
 * Wraps recognised campaign keywords in <strong> tags.
 * Only processes string children — nested elements pass through untouched.
 */
export function HighlightKeywords({ children }: { children: ReactNode }) {
  if (typeof children === "string") {
    const parts = children.split(pattern);
    if (parts.length === 1) return <>{children}</>;
    return (
      <>
        {parts.map((part, i) =>
          KEYWORDS.includes(part) ? (
            <strong key={i} className="font-bold">
              {part}
            </strong>
          ) : (
            part
          ),
        )}
      </>
    );
  }
  return <>{children}</>;
}
