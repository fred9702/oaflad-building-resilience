"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { Partner } from "@/data/partners";
import { FirstLadiesPanel } from "./FirstLadiesPanel";

const COLOR_MAP = {
  crimson: {
    badge: "text-crimson bg-crimson/10",
    border: "border-crimson/15",
    bg: "bg-crimson/5",
    link: "text-crimson hover:text-crimson/80",
    button: "bg-crimson text-white hover:bg-crimson/90",
  },
  brown: {
    badge: "text-brown bg-brown/10",
    border: "border-brown/15",
    bg: "bg-brown/5",
    link: "text-brown hover:text-brown/80",
    button: "bg-brown text-white hover:bg-brown/90",
  },
  green: {
    badge: "text-green bg-green/10",
    border: "border-green/15",
    bg: "bg-green/5",
    link: "text-green hover:text-green/80",
    button: "bg-green text-white hover:bg-green/90",
  },
  orange: {
    badge: "text-orange bg-orange/10",
    border: "border-orange/15",
    bg: "bg-orange/5",
    link: "text-orange hover:text-orange/80",
    button: "bg-orange text-white hover:bg-orange/90",
  },
} as const;

export function PartnerCard({ partner }: { partner: Partner }) {
  const t = useTranslations("partners");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const colors = COLOR_MAP[partner.color];

  return (
    <>
      <div
        className={`relative rounded-2xl p-8 border ${colors.border} ${colors.bg} backdrop-blur-sm transition-all duration-300`}
      >
        {/* Partner name */}
        <h3 className="font-heading text-xl font-bold text-near-black mb-3">
          {t(`${partner.id}.name`)}
        </h3>

        {/* Description */}
        <p className="font-body text-near-black/70 leading-relaxed mb-5">
          {t(`${partner.id}.description`)}
        </p>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={partner.website}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-heading text-sm font-semibold ${colors.link} underline underline-offset-4 transition-colors`}
          >
            {t("visitWebsite")} &rarr;
          </a>

          {partner.expandable && (
            <button
              onClick={() => setIsModalOpen(true)}
              className={`inline-flex items-center gap-2 font-heading text-sm font-semibold px-4 py-2 rounded-full ${colors.button} transition-all duration-200`}
            >
              {t("expandFirstLadies")}
            </button>
          )}
        </div>
      </div>

      {/* First Ladies modal */}
      {partner.expandable && (
        <FirstLadiesPanel
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
