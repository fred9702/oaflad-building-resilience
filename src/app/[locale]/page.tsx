import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { HeroSection } from "@/components/home/HeroSection";
import { Countdown } from "@/components/home/Countdown";
import { CTABanner } from "@/components/home/CTABanner";
import { BASE_URL } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });
  const org = locale === "fr" ? "OPDAD" : "OAFLAD";
  return {
    title: locale === "fr" ? `Accueil | ${org} #BuildingResilience` : `Home | ${org} #BuildingResilience`,
    description: t("metaDescription"),
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: { fr: `${BASE_URL}/fr`, en: `${BASE_URL}/en` },
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <Countdown />
      <CTABanner />
    </>
  );
}
