"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { List, X } from "@phosphor-icons/react";

const NAV_LINKS = [
  { key: "about", href: "/about" },
  { key: "fondation", href: "/fondation" },
  { key: "cap241", href: "/cap-241" },
  { key: "programme", href: "/programme" },
  { key: "speakers", href: "/speakers" },
  { key: "partners", href: "/partners" },
  { key: "media", href: "/media" },
  { key: "contact", href: "/contact" },
] as const;

const NAVBAR_LOGOS: Record<string, string> = {
  fr: "/images/fr/campaign-navbar.png",
};
const NAVBAR_LOGO_FALLBACK = "/images/common/mark.svg";

export function Navbar({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const tLang = useTranslations("lang");
  const navbarLogo = NAVBAR_LOGOS[locale] ?? NAVBAR_LOGO_FALLBACK;
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const otherLocale = locale === "fr" ? "en" : "fr";

  function switchLocale() {
    const pathWithoutLocale = pathname.replace(/^\/(fr|en)/, "") || "/";
    router.push(`/${otherLocale}${pathWithoutLocale}`);
  }

  function isActive(href: string) {
    return pathname === `/${locale}${href}`;
  }

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    hamburgerRef.current?.focus();
  }, []);

  // Scroll-aware glass effect
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!menuOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeMenu();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, closeMenu]);

  // Close on outside click
  useEffect(() => {
    if (!menuOpen) return;
    function onClick(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target as Node)
      ) {
        closeMenu();
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [menuOpen, closeMenu]);

  // Focus trap within mobile menu
  useEffect(() => {
    if (!menuOpen || !menuRef.current) return;
    const menu = menuRef.current;
    const focusableSelector =
      'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])';

    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      const focusable = menu.querySelectorAll<HTMLElement>(focusableSelector);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    // Focus first link when menu opens
    const firstFocusable = menu.querySelector<HTMLElement>(focusableSelector);
    firstFocusable?.focus();

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-cream shadow-lg" : "bg-warm-cream"
      } border-b border-orange/20`}
      role="banner"
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-orange rounded"
          aria-label="OAFLAD - Home"
        >
          <Image
            src={navbarLogo}
            alt=""
            width={160}
            height={48}
            className="h-12 w-auto"
            aria-hidden="true"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map(({ key, href }) => (
            <Link
              key={key}
              href={`/${locale}${href}`}
              className={`font-heading text-base font-semibold border-b-2 transition-colors focus:outline-none focus:ring-2 focus:ring-orange rounded px-1 py-1 ${
                isActive(href)
                  ? "text-crimson border-crimson"
                  : "text-brown hover:text-crimson border-transparent hover:border-crimson"
              }`}
            >
              {t(key)}
            </Link>
          ))}

          {/* Register CTA */}
          <Link
            href={`/${locale}/register`}
            className="font-heading text-base font-semibold text-white bg-orange hover:bg-orange/90 px-4 py-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:ring-offset-warm-cream"
          >
            {t("register")}
          </Link>

          {/* Language switcher — min 44px touch target */}
          <button
            onClick={switchLocale}
            className="font-heading text-sm font-semibold text-brown/90 hover:text-brown border border-brown/30 hover:border-brown min-h-[44px] min-w-[44px] px-3 py-1 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-orange"
            aria-label={`Switch to ${otherLocale.toUpperCase()}`}
          >
            {tLang("switchTo")}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={switchLocale}
            className="font-heading text-sm font-semibold text-brown/90 hover:text-brown border border-brown/30 min-h-[44px] min-w-[44px] px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-orange"
            aria-label={`Switch to ${otherLocale.toUpperCase()}`}
          >
            {tLang("switchTo")}
          </button>
          <button
            ref={hamburgerRef}
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-brown p-2 min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-orange rounded"
            aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X size={28} /> : <List size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu — fixed full-screen overlay below navbar */}
      <div
        ref={menuRef}
        id="mobile-menu"
        role={menuOpen ? "dialog" : undefined}
        aria-modal={menuOpen ? true : undefined}
        aria-label={menuOpen ? "Mobile navigation" : undefined}
        aria-hidden={!menuOpen}
        className={`lg:hidden fixed inset-x-0 top-[68px] bottom-0 bg-warm-cream/95 backdrop-blur-sm transition-all duration-300 ease-in-out ${
          menuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-2"
        }`}
      >
        <div className="flex flex-col px-6 py-6 gap-1 border-t border-brown/10">
          {NAV_LINKS.map(({ key, href }) => (
            <Link
              key={key}
              href={`/${locale}${href}`}
              onClick={() => setMenuOpen(false)}
              tabIndex={menuOpen ? 0 : -1}
              className={`font-heading text-lg font-semibold px-3 py-3 border-b border-brown/10 focus:outline-none focus:ring-2 focus:ring-orange rounded ${
                isActive(href)
                  ? "text-crimson"
                  : "text-brown hover:text-crimson"
              }`}
            >
              {t(key)}
            </Link>
          ))}
          <Link
            href={`/${locale}/register`}
            onClick={() => setMenuOpen(false)}
            tabIndex={menuOpen ? 0 : -1}
            className="font-heading text-lg font-semibold text-white bg-orange hover:bg-orange/90 px-4 py-3 rounded text-center mt-4 focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:ring-offset-warm-cream"
          >
            {t("register")}
          </Link>
        </div>
      </div>
    </header>
  );
}
