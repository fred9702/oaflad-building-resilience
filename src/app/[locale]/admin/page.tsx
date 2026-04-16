import { setRequestLocale, getTranslations } from "next-intl/server";
import { createServerClient } from "@/lib/supabase/server";
import { AdminDashboardClient } from "./AdminDashboardClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AdminPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");

  const supabase = createServerClient();
  const { data: registrations } = await supabase
    .from("registrations")
    .select("id, title, first_name, last_name, email, organisation, category, language_pref, created_at")
    .order("created_at", { ascending: false });

  const rows = registrations ?? [];

  const categoryBreakdown: Record<string, number> = {};
  for (const r of rows) {
    categoryBreakdown[r.category] = (categoryBreakdown[r.category] || 0) + 1;
  }

  // Build label lookup including all known keys (new groups + legacy categories)
  const ALL_KEYS = [
    "firstLadies", "government", "senate", "nationalAssembly",
    "constitutionalCourt", "highCourts", "cesec", "diplomaticCorps",
    "internationalOrgs", "presidency", "associations", "other",
    "opdad", "partner", "civilSociety", "community",
  ] as const;
  const categoryLabels: Record<string, string> = {};
  for (const key of ALL_KEYS) {
    try {
      categoryLabels[key] = t(`categories.${key}`);
    } catch {
      categoryLabels[key] = key;
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-2xl md:text-3xl font-extrabold text-crimson">
          {t("title")}
        </h1>
        <a
          href={`/api/admin/export?locale=${locale}`}
          className="font-heading text-sm font-semibold text-white bg-brown hover:bg-brown/90 px-4 py-2 rounded transition-colors"
        >
          {t("exportCsv")}
        </a>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-brown/10">
          <p className="font-body text-sm text-near-black/60 mb-1">{t("totalRegistrations")}</p>
          <p className="font-heading text-3xl font-extrabold text-crimson">{rows.length}</p>
        </div>

        {Object.entries(categoryBreakdown).map(([cat, count]) => (
          <div key={cat} className="bg-white rounded-lg p-6 shadow-sm border border-brown/10">
            <p className="font-body text-sm text-near-black/60 mb-1">{t(`categories.${cat}`)}</p>
            <p className="font-heading text-2xl font-bold text-brown">{count}</p>
          </div>
        ))}
      </div>

      {/* Client component for search + table */}
      <AdminDashboardClient
        registrations={rows}
        labels={{
          search: t("searchPlaceholder"),
          noResults: t("noResults"),
          recent: t("recentRegistrations"),
          name: t("tableHeaders.name"),
          email: t("tableHeaders.email"),
          organisation: t("tableHeaders.organisation"),
          category: t("tableHeaders.category"),
          language: t("tableHeaders.language"),
          date: t("tableHeaders.date"),
        }}
        categoryLabels={categoryLabels}
      />
    </div>
  );
}
