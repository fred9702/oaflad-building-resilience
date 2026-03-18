import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

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
