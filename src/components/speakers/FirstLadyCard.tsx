"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import type { FirstLady } from "@/data/first-ladies";

export function FirstLadyCard({
  lady,
  featured = false,
  hasMessage = false,
  onReadMessage,
}: {
  lady: FirstLady;
  featured?: boolean;
  hasMessage?: boolean;
  onReadMessage?: () => void;
}) {
  const t = useTranslations("speakers");

  const name = t(`firstLadies.${lady.id}.name`);
  const country = t(`firstLadies.${lady.id}.country`);

  const titleLabel = lady.isHost
    ? t("hostLabel")
    : lady.isFirstGentleman
      ? t("firstGentlemanLabel")
      : t("firstLadyLabel");

  const honorific = lady.isFirstGentleman ? t("honorificMr") : t("honorificMrs");

  if (featured) {
    return (
      <div className="group relative flex flex-col sm:flex-row items-center gap-6 rounded-2xl overflow-hidden border-2 border-crimson/30 bg-crimson/5 ring-2 ring-crimson/20 p-4 sm:p-0">
        {/* Featured photo */}
        <div className="relative w-full sm:w-48 md:w-56 aspect-[3/4] sm:aspect-auto sm:h-64 bg-light-beige overflow-hidden rounded-xl sm:rounded-none sm:rounded-l-2xl shrink-0">
          {lady.photoPath ? (
            <Image
              src={lady.photoPath}
              alt={name}
              width={224}
              height={300}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-light-beige to-warm-cream">
              <span className="text-7xl">{lady.countryFlag}</span>
            </div>
          )}
        </div>

        {/* Featured info */}
        <div className="flex-1 py-4 sm:py-6 px-2 sm:pr-6 text-center sm:text-left">
          <span className="inline-block text-xs font-heading font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-crimson text-white mb-3">
            {titleLabel}
          </span>
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
            <span className="text-2xl leading-none">{lady.countryFlag}</span>
            <span className="font-body text-sm text-near-black/60">{country}</span>
          </div>
          <p className="font-heading text-xl md:text-2xl font-bold text-near-black">
            {honorific} {name}
          </p>
          {hasMessage && (
            <button
              onClick={onReadMessage}
              className="mt-3 font-heading text-sm font-semibold text-crimson hover:text-crimson/80 transition-colors"
            >
              {t("readMessage")}
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`group relative rounded-xl overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
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
        <p className="font-heading text-sm font-bold text-near-black leading-tight">
          {honorific} {name}
        </p>
        {hasMessage && (
          <button
            onClick={onReadMessage}
            className="mt-2 font-heading text-xs font-semibold text-crimson hover:text-crimson/80 transition-colors"
          >
            {t("readMessage")}
          </button>
        )}
      </div>
    </div>
  );
}
