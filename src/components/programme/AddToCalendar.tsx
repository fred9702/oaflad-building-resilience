"use client";

import { CalendarPlus } from "@phosphor-icons/react";

interface AddToCalendarProps {
  title: string;
  startTime: string; // HH:MM
  endTime?: string;  // HH:MM
  description?: string;
}

function timeToICS(date: string, time: string): string {
  // date: YYYYMMDD, time: HH:MM
  const [h, m] = time.split(":");
  return `${date}T${h.padStart(2, "0")}${m.padStart(2, "0")}00`;
}

export function AddToCalendar({ title, startTime, endTime, description }: AddToCalendarProps) {
  function handleClick() {
    const date = "20260417";
    const dtStart = timeToICS(date, startTime);
    const dtEnd = endTime ? timeToICS(date, endTime) : timeToICS(date, startTime);

    const lines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//BuildingResilience//EN",
      "BEGIN:VEVENT",
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      `SUMMARY:${title}`,
      description ? `DESCRIPTION:${description}` : "",
      "LOCATION:Libreville, Gabon",
      `UID:${Date.now()}@buildingresilience.ga`,
      "END:VEVENT",
      "END:VCALENDAR",
    ]
      .filter(Boolean)
      .join("\r\n");

    const blob = new Blob([lines], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.replace(/\s+/g, "-")}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-1 text-xs font-semibold text-orange hover:text-orange/80 transition-colors focus:outline-none focus:ring-2 focus:ring-orange rounded"
      aria-label={`Add "${title}" to calendar`}
    >
      <CalendarPlus size={14} />
      <span>{startTime}</span>
    </button>
  );
}
