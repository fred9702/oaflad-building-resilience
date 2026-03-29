import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ProgrammeMilestone } from "@/components/programme/ProgrammeMilestone";
import { ProgrammePanels } from "@/components/programme/ProgrammePanels";
import { ProgrammeCap241Cta } from "@/components/programme/ProgrammeCap241Cta";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "programme" });
  return { title: `${t("title")} | ${locale === "fr" ? "OPDAD" : "OAFLAD"} #BuildingResilience` };
}

export default async function ProgrammePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ProgrammeMilestone />
      <ProgrammePanels />
      <ProgrammeCap241Cta />
    </>
  );
}
