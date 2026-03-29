import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const BASE_URL = "https://www.resilience241.com";

export async function buildMetadata(
  locale: string,
  namespace: string,
  route: string
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });
  const org = locale === "fr" ? "OPDAD" : "OAFLAD";
  return {
    title: `${t("title")} | ${org} #BuildingResilience`,
    description: t("metaDescription"),
    alternates: {
      canonical: `${BASE_URL}/${locale}${route}`,
      languages: {
        fr: `${BASE_URL}/fr${route}`,
        en: `${BASE_URL}/en${route}`,
      },
    },
  };
}
