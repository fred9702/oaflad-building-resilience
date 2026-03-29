"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import type { FirstLady } from "@/data/first-ladies";

export function FirstLadyCard({ lady }: { lady: FirstLady }) {
  const t = useTranslations("partners");

  const name = t(`firstLadies.${lady.id}.name`);
  const country = t(`firstLadies.${lady.id}.country`);

  const titleLabel = lady.isHost
    ? t("hostLabel")
    : lady.isFirstGentleman
      ? t("firstGentlemanLabel")
      : t("firstLadyLabel");

  return (
    <div
      className={`group relative rounded-xl overflow-hidden border ${
        lady.isHost
          ? "border-crimson/30 bg-crimson/5 ring-2 ring-crimson/20"
          : "border-brown/10 bg-white/60"
      }`}
    >
      {/* Photo or flag placeholder */}
      <div className="relative aspect-[3/4] bg-light-beige overflow-hidden">
        {lady.photoPath ? (
          <Image
            src={lady.photoPath}
            alt={name}
            width={183}
            height={246}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-light-beige to-warm-cream">
            <span className="text-6xl">{lady.countryFlag}</span>
          </div>
        )}

        {/* Title badge overlay */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent pt-8 pb-2 px-2">
          <span
            className={`inline-block text-[10px] font-heading font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
              lady.isHost
                ? "bg-crimson text-white"
                : "bg-white/80 text-near-black/70"
            }`}
          >
            {titleLabel}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-lg leading-none">{lady.countryFlag}</span>
          <span className="font-body text-xs text-near-black/50 truncate">
            {country}
          </span>
        </div>
        <p className="font-heading text-sm font-bold text-near-black leading-tight truncate">
          {name}
        </p>
      </div>
    </div>
  );
}
