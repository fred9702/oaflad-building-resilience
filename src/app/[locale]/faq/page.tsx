import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { buildMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale, "faq", "/faq");
}

export default async function FaqPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "faq" });

  const questionKeys = [
    "whatIs",
    "attending",
    "when",
    "pillars",
    "oaflad",
    "follow",
    "balance",
  ] as const;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questionKeys.map((key) => ({
      "@type": "Question",
      name: t(`questions.${key}.question`),
      acceptedAnswer: {
        "@type": "Answer",
        text: t(`questions.${key}.answer`),
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="bg-warm-cream pt-20 pb-12 px-4">
        <div className="mx-auto max-w-3xl text-center">
          <SectionBadge color="orange">FAQ</SectionBadge>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-near-black mb-4">
            {t("title")}
          </h1>
          <p className="font-body text-lg text-near-black/70">{t("intro")}</p>
        </div>
      </section>

      {/* Accordion */}
      <section className="bg-warm-cream pb-20 px-4">
        <div className="mx-auto max-w-3xl">
          <FaqAccordion />
        </div>
      </section>
    </>
  );
}
