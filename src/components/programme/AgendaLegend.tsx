"use client";

const LEGEND_ITEMS = {
  fr: [
    { label: "Cérémonie", color: "bg-crimson" },
    { label: "Panel", color: "bg-orange" },
    { label: "Networking", color: "bg-green" },
    { label: "Pause", color: "bg-brown" },
  ],
  en: [
    { label: "Ceremony", color: "bg-crimson" },
    { label: "Panel", color: "bg-orange" },
    { label: "Networking", color: "bg-green" },
    { label: "Break", color: "bg-brown" },
  ],
};

export function AgendaLegend({ locale }: { locale: string }) {
  const items = LEGEND_ITEMS[locale as keyof typeof LEGEND_ITEMS] ?? LEGEND_ITEMS.fr;

  return (
    <div className="flex flex-wrap gap-4 mb-8" aria-label="Agenda legend">
      {items.map(({ label, color }) => (
        <div key={label} className="flex items-center gap-1.5">
          <span className={`w-2.5 h-2.5 rounded-full ${color} shrink-0`} aria-hidden="true" />
          <span className="font-body text-xs text-near-black/60">{label}</span>
        </div>
      ))}
    </div>
  );
}
