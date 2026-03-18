"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { List, X } from "@phosphor-icons/react";

const NAV_LINKS = [
  { key: "about", href: "/about" },
  { key: "programme", href: "/programme" },
  { key: "speakers", href: "/speakers" },
  { key: "partners", href: "/partners" },
  { key: "media", href: "/media" },
  { key: "contact", href: "/contact" },
] as const;

export function Navbar({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const tLang = useTranslations("lang");
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const otherLocale = locale === "fr" ? "en" : "fr";

  function switchLocale() {
    const pathWithoutLocale = pathname.replace(/^\/(fr|en)/, "") || "/";
    router.push(`/${otherLocale}${pathWithoutLocale}`);
  }

  return (
    <header className="sticky top-0 z-50 bg-navy" role="banner">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-orange rounded"
          aria-label="OAFLAD - Home"
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            aria-hidden="true"
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
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map(({ key, href }) => (
            <Link
              key={key}
              href={`/${locale}${href}`}
              className="font-heading text-base font-semibold text-white hover:text-orange border-b-2 border-transparent hover:border-orange transition-colors focus:outline-none focus:ring-2 focus:ring-orange rounded px-1 py-1"
            >
              {t(key)}
            </Link>
          ))}

          {/* Register CTA */}
          <Link
            href={`/${locale}/register`}
            className="font-heading text-base font-semibold text-white bg-orange hover:bg-orange/90 px-4 py-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:ring-offset-navy"
          >
            {t("register")}
          </Link>

          {/* Language switcher */}
          <button
            onClick={switchLocale}
            className="font-heading text-sm font-semibold text-white/80 hover:text-white border border-white/30 hover:border-white px-3 py-1 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-orange"
            aria-label={`Switch to ${otherLocale.toUpperCase()}`}
          >
            {tLang("switchTo")}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={switchLocale}
            className="font-heading text-sm font-semibold text-white/80 hover:text-white border border-white/30 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-orange"
            aria-label={`Switch to ${otherLocale.toUpperCase()}`}
          >
            {tLang("switchTo")}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white p-2 focus:outline-none focus:ring-2 focus:ring-orange rounded"
            aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={28} /> : <List size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="lg:hidden bg-navy border-t border-white/10">
          <div className="flex flex-col px-4 py-4 gap-2">
            {NAV_LINKS.map(({ key, href }) => (
              <Link
                key={key}
                href={`/${locale}${href}`}
                onClick={() => setMenuOpen(false)}
                className="font-heading text-lg font-semibold text-white hover:text-orange py-2 border-b border-white/10 focus:outline-none focus:ring-2 focus:ring-orange rounded"
              >
                {t(key)}
              </Link>
            ))}
            <Link
              href={`/${locale}/register`}
              onClick={() => setMenuOpen(false)}
              className="font-heading text-lg font-semibold text-white bg-orange hover:bg-orange/90 px-4 py-3 rounded text-center mt-2 focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:ring-offset-navy"
            >
              {t("register")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
