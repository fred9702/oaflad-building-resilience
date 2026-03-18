import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "partners" });
  return { title: `${t("title")} | OAFLAD #BuildingResilience` };
}

export default async function PartnersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("partners");

  return (
    <section className="py-20">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-navy">
          {t("title")}
        </h1>
        <p className="mt-4 font-body text-lg text-near-black/80">{t("content")}</p>
      </div>
    </section>
  );
}
