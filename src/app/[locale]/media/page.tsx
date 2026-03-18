import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "media" });
  return { title: `${t("title")} | OAFLAD #BuildingResilience` };
}

export default async function MediaPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("media");

  return (
    <section className="py-20">
      <div className="mx-auto max-w-xl px-4 text-center">
        <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-navy">
          {t("title")}
        </h1>
        <p className="mt-4 font-body text-lg text-near-black/80">
          {t("comingSoon")}
        </p>
        <Link
          href={`/${locale}`}
          className="mt-8 inline-block font-heading font-semibold text-base text-navy border-2 border-navy hover:bg-navy hover:text-white px-6 py-3 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2"
        >
          {t("backHome")}
        </Link>
      </div>
    </section>
  );
}
