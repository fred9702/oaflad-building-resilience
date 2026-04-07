import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ProgrammeMilestone } from "@/components/programme/ProgrammeMilestone";
import { ProgrammeTimeline } from "@/components/programme/ProgrammeTimeline";
import { ProgrammePanels } from "@/components/programme/ProgrammePanels";
import { ProgrammeCap241Cta } from "@/components/programme/ProgrammeCap241Cta";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale, "programme", "/programme");
}

export default async function ProgrammePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ProgrammeMilestone />
      <ProgrammeTimeline />
      <ProgrammePanels />
      <ProgrammeCap241Cta />
    </>
  );
}
