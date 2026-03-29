import type { MetadataRoute } from "next";

const BASE_URL = "https://www.resilience241.com";

const locales = ["fr", "en"] as const;

const routes = [
  "",
  "/about",
  "/cap-241",
  "/contact",
  "/media",
  "/partners",
  "/programme",
  "/register",
  "/speakers",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: new Date(),
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${BASE_URL}/${l}${route}`])
          ),
        },
      });
    }
  }

  return entries;
}
