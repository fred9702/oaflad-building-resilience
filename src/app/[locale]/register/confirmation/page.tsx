"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

function generateICS(): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//OAFLAD//BuildingResilience//EN",
    "BEGIN:VEVENT",
    "DTSTART:20260417T080000Z",
    "DTEND:20260418T180000Z",
    "SUMMARY:OAFLAD #BuildingResilience Conference",
    "LOCATION:Libreville\\, Gabon",
    "DESCRIPTION:Pan-African conference organised by OAFLAD — Organisation of African First Ladies for Development",
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}

function downloadICS() {
  const blob = new Blob([generateICS()], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "oaflad-building-resilience-2026.ics";
  a.click();
  URL.revokeObjectURL(url);
}

export default function ConfirmationPage() {
  const t = useTranslations("confirmation");
  const locale = useLocale();

  return (
    <section className="py-20">
      <div className="mx-auto max-w-xl px-4 text-center">
        <div className="mb-8">
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            className="mx-auto"
            aria-hidden="true"
          >
            <circle cx="32" cy="32" r="30" fill="#2D7B3F" />
            <path
              d="M20 32L28 40L44 24"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-navy">
          {t("title")}
        </h1>

        <p className="mt-4 font-body text-lg text-near-black/80">
          {t("message")}
        </p>

        <p className="mt-2 font-body text-sm text-mid-grey">{t("details")}</p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={downloadICS}
            className="font-heading font-semibold text-base text-white bg-green hover:bg-green/90 px-6 py-3 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-green focus:ring-offset-2"
          >
            {t("downloadIcs")}
          </button>
          <Link
            href={`/${locale}`}
            className="font-heading font-semibold text-base text-navy border-2 border-navy hover:bg-navy hover:text-white px-6 py-3 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2"
          >
            {t("backHome")}
          </Link>
        </div>
      </div>
    </section>
  );
}
