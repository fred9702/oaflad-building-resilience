import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale, getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SetLang } from "@/components/SetLang";
import { BASE_URL } from "@/lib/seo";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: locale === "fr"
          ? "Organisation des Premières Dames d'Afrique pour le Développement"
          : "Organization of African First Ladies for Development",
        alternateName: locale === "fr" ? "OPDAD" : "OAFLAD",
        url: BASE_URL,
        logo: `${BASE_URL}/images/${locale}/campaign-logo-full.svg`,
        sameAs: [
          "https://www.facebook.com/share/1B4pNuGHt7/?mibextid=wwXIfr",
          "https://x.com/resilience241",
          "https://instagram.com/resilience_241",
        ],
      },
      {
        "@type": "Event",
        "@id": `${BASE_URL}/#event`,
        name: "#BuildingResilience",
        description: locale === "fr"
          ? "Conférence panafricaine des Premières Dames sur la résilience des femmes et des filles face aux changements climatiques et aux conflits"
          : "Pan-African First Ladies conference on resilience for women and girls facing climate change and conflict",
        startDate: "2026-04-17",
        endDate: "2026-04-18",
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
          "@type": "Place",
          name: "Libreville",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Libreville",
            addressCountry: "GA",
          },
        },
        organizer: { "@id": `${BASE_URL}/#organization` },
        inLanguage: [locale],
      },
    ],
  };

  return (
    <NextIntlClientProvider messages={messages}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SetLang locale={locale} />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-brown focus:text-white focus:px-4 focus:py-2 focus:rounded focus:font-heading focus:font-semibold focus:text-sm"
      >
        Skip to content
      </a>
      <Navbar locale={locale} />
      <main id="main-content" tabIndex={-1}>{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}
