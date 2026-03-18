"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export function HeroSection() {
  const t = useTranslations("hero");
  const locale = useLocale();

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient placeholder (replace with photo later) */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-navy via-navy/90 to-brown/70"
        aria-hidden="true"
      />
      {/* Navy overlay */}
      <div className="absolute inset-0 bg-navy/70" aria-hidden="true" />

      {/* Top decorative strip */}
      <div
        className="absolute top-0 left-0 right-0 h-8 opacity-15"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='32' viewBox='0 0 40 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='20,0 40,32 0,32' fill='white'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat-x",
          backgroundSize: "40px 32px",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 text-center">
        {/* Logo placeholder */}
        <div className="mb-8 flex justify-center">
          <svg
            width="120"
            height="120"
            viewBox="0 0 48 48"
            fill="none"
            aria-label="OAFLAD logo"
          >
            <circle cx="24" cy="24" r="22" stroke="#E07B39" strokeWidth="2" />
            <text
              x="24"
              y="20"
              textAnchor="middle"
              fill="white"
              fontSize="8"
              fontWeight="bold"
              fontFamily="Montserrat, sans-serif"
            >
              OAFLAD
            </text>
            <text
              x="24"
              y="32"
              textAnchor="middle"
              fill="#E07B39"
              fontSize="5"
              fontFamily="Source Sans 3, sans-serif"
            >
              #BR
            </text>
          </svg>
        </div>

        <h1 className="font-heading text-5xl md:text-7xl font-extrabold text-white leading-tight">
          {t("title")}
        </h1>

        <p className="mt-4 font-heading text-2xl md:text-3xl font-bold text-orange">
          {t("hashtag")}
        </p>

        <p className="mt-4 font-body text-lg md:text-xl text-white/90">
          {t("subtitle")}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={`/${locale}/register`}
            className="font-heading font-semibold text-lg text-white bg-orange hover:bg-orange/90 px-8 py-3 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:ring-offset-navy"
          >
            {t("register")}
          </Link>
          <Link
            href={`/${locale}/programme`}
            className="font-heading font-semibold text-lg text-white border-2 border-white hover:bg-white/10 px-8 py-3 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:ring-offset-navy"
          >
            {t("programme")}
          </Link>
        </div>
      </div>
    </section>
  );
}
