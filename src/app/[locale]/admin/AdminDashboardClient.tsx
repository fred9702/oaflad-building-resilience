"use client";

import { useState } from "react";

type Registration = {
  id: string;
  title?: string | null;
  first_name: string;
  last_name: string;
  email: string;
  organisation: string | null;
  category: string;
  language_pref: string;
  created_at: string;
};

const TITLE_LABELS: Record<string, string> = {
  mr: "M.",
  mrs: "Mme",
  hem: "S.E.M.",
  hon: "Hon.",
  prof: "Pr.",
  dr: "Dr",
  ven: "Vén.",
};

type Props = {
  registrations: Registration[];
  labels: {
    search: string;
    noResults: string;
    recent: string;
    name: string;
    email: string;
    organisation: string;
    category: string;
    language: string;
    date: string;
  };
  categoryLabels: Record<string, string>;
};

export function AdminDashboardClient({ registrations, labels, categoryLabels }: Props) {
  const [search, setSearch] = useState("");

  const filtered = registrations.filter((r) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      r.first_name.toLowerCase().includes(q) ||
      r.last_name.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      (r.organisation?.toLowerCase().includes(q) ?? false)
    );
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading text-lg font-bold text-brown">
          {labels.recent}
        </h2>
        <span className="font-body text-sm text-near-black/50">
          {filtered.length} / {registrations.length}
        </span>
      </div>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={labels.search}
        className="w-full rounded border border-mid-grey bg-white px-4 py-2 font-body text-near-black text-sm focus:outline-none focus:ring-2 focus:ring-orange focus:border-orange mb-4"
      />

      <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-brown/10">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-brown/10 bg-brown/5">
              <th className="px-4 py-3 font-heading text-xs font-semibold text-brown uppercase tracking-wider">{labels.name}</th>
              <th className="px-4 py-3 font-heading text-xs font-semibold text-brown uppercase tracking-wider">{labels.email}</th>
              <th className="px-4 py-3 font-heading text-xs font-semibold text-brown uppercase tracking-wider hidden md:table-cell">{labels.organisation}</th>
              <th className="px-4 py-3 font-heading text-xs font-semibold text-brown uppercase tracking-wider hidden sm:table-cell">{labels.category}</th>
              <th className="px-4 py-3 font-heading text-xs font-semibold text-brown uppercase tracking-wider hidden lg:table-cell">{labels.language}</th>
              <th className="px-4 py-3 font-heading text-xs font-semibold text-brown uppercase tracking-wider hidden sm:table-cell">{labels.date}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center font-body text-sm text-near-black/50">
                  {labels.noResults}
                </td>
              </tr>
            ) : (
              filtered.map((r) => (
                <tr key={r.id} className="border-b border-brown/5 hover:bg-warm-cream/50 transition-colors">
                  <td className="px-4 py-3 font-body text-sm text-near-black font-medium">
                    {r.title && TITLE_LABELS[r.title] ? `${TITLE_LABELS[r.title]} ` : ""}{r.first_name} {r.last_name}
                  </td>
                  <td className="px-4 py-3 font-body text-sm text-near-black/70">{r.email}</td>
                  <td className="px-4 py-3 font-body text-sm text-near-black/70 hidden md:table-cell">{r.organisation || "—"}</td>
                  <td className="px-4 py-3 font-body text-sm text-near-black/70 hidden sm:table-cell">
                    {categoryLabels[r.category] || r.category}
                  </td>
                  <td className="px-4 py-3 font-body text-sm text-near-black/70 hidden lg:table-cell">{r.language_pref.toUpperCase()}</td>
                  <td className="px-4 py-3 font-body text-sm text-near-black/50 hidden sm:table-cell">
                    {new Date(r.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
