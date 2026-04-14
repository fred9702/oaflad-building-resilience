import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { HeroSection } from "@/components/home/HeroSection";
import { MissionStatement } from "@/components/home/MissionStatement";
import { ImpactNumbers } from "@/components/home/ImpactNumbers";
import { PressTeaser } from "@/components/home/PressTeaser";
import { HomeFinalCta } from "@/components/home/HomeFinalCta";
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
      <MissionStatement />
      <ImpactNumbers />
      <PressTeaser />
      <HomeFinalCta />
    </>
  );
}
