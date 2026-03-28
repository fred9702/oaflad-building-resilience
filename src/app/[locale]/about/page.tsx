import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { AboutCampaign } from "@/components/about/AboutCampaign";
import { AboutGabon } from "@/components/about/AboutGabon";
import { AboutZon } from "@/components/about/AboutZon";
import { AboutFondation } from "@/components/about/AboutFondation";
import { AboutClosing } from "@/components/about/AboutClosing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: `${t("title")} | ${locale === "fr" ? "OPDAD" : "OAFLAD"} #BuildingResilience` };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <AboutCampaign />
      <AboutGabon />
      <AboutZon />
      <AboutFondation />
      <AboutClosing />
    </>
  );
}
