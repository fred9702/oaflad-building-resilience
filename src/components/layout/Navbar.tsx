"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { List, X, FacebookLogo, TwitterLogo, InstagramLogo } from "@phosphor-icons/react";
import { LanguageToggle } from "@/components/ui/LanguageToggle";

const NAV_LINKS = [
  { key: "about", href: "/about" },
  { key: "cap241", href: "/cap-241" },
  { key: "programme", href: "/programme" },
  { key: "speakers", href: "/speakers" },
  { key: "partners", href: "/partners" },
  { key: "media", href: "/media" },
  { key: "contact", href: "/contact" },
  { key: "faq", href: "/faq" },
] as const;

const NAVBAR_LOGOS: Record<string, string> = {
  fr: "/images/fr/campaign-navbar.png",
  en: "/images/en/campaign-navbar.png",
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
        menuOpen ? "bg-warm-cream shadow-lg" : scrolled ? "glass-cream shadow-lg" : "bg-warm-cream"
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

          {/* Language switcher pill */}
          <LanguageToggle locale={locale} />
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 lg:hidden">
          <LanguageToggle locale={locale} />
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

      {/* Mobile menu — fixed full-screen overlay below navbar, slides in from right */}
      <div
        ref={menuRef}
        id="mobile-menu"
        role={menuOpen ? "dialog" : undefined}
        aria-modal={menuOpen ? true : undefined}
        aria-label={menuOpen ? "Mobile navigation" : undefined}
        aria-hidden={!menuOpen}
        className={`lg:hidden fixed inset-x-0 top-[68px] bottom-0 bg-brown transition-transform duration-300 ease-in-out ${
          menuOpen
            ? "pointer-events-auto translate-x-0"
            : "pointer-events-none translate-x-full"
        }`}
      >
        {/* Campaign logo at top */}
        <div className="px-6 py-5 border-b border-warm-cream/10">
          <Image
            src={navbarLogo}
            alt=""
            width={140}
            height={42}
            className="h-10 w-auto brightness-0 invert"
            aria-hidden="true"
          />
        </div>

        {/* Nav links */}
        <div className="flex flex-col px-6 py-4 gap-1">
          {NAV_LINKS.map(({ key, href }) => (
            <Link
              key={key}
              href={`/${locale}${href}`}
              onClick={() => setMenuOpen(false)}
              tabIndex={menuOpen ? 0 : -1}
              className={`font-heading text-xl font-semibold min-h-[56px] flex items-center px-3 border-b border-warm-cream/10 focus:outline-none focus:ring-2 focus:ring-orange rounded ${
                isActive(href)
                  ? "text-orange border-l-4 border-l-orange pl-2"
                  : "text-warm-cream hover:text-orange"
              }`}
            >
              {t(key)}
            </Link>
          ))}
        </div>

        {/* Bottom: language toggle + social icons */}
        <div className="absolute bottom-0 left-0 right-0 px-6 py-6 border-t border-warm-cream/10 flex items-center justify-between">
          <button
            onClick={switchLocale}
            tabIndex={menuOpen ? 0 : -1}
            className="font-heading text-sm font-semibold text-warm-cream border border-warm-cream/30 min-h-[44px] min-w-[44px] px-4 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-orange"
            aria-label={`Switch to ${otherLocale.toUpperCase()}`}
          >
            {tLang("switchTo")}
          </button>

          <div className="flex gap-3">
            {[
              { Icon: FacebookLogo, label: "Facebook", href: "https://www.facebook.com/share/1B4pNuGHt7/?mibextid=wwXIfr" },
              { Icon: TwitterLogo, label: "Twitter / X", href: "https://x.com/resilience241" },
              { Icon: InstagramLogo, label: "Instagram", href: "https://instagram.com/resilience_241" },
            ].map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                tabIndex={menuOpen ? 0 : -1}
                className="text-warm-cream hover:text-orange transition-colors focus:outline-none focus:ring-2 focus:ring-orange rounded-full flex items-center justify-center min-w-[44px] min-h-[44px] p-2"
              >
                <Icon size={22} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
