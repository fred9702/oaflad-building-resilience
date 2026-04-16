import { createAuthServerClient } from "@/lib/supabase/auth-server";
import { createServerClient } from "@/lib/supabase/server";

export async function GET() {
  // Verify the user is authenticated
  const authClient = await createAuthServerClient();
  const { data: { user } } = await authClient.auth.getUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Use service role client to fetch all registrations
  const supabase = createServerClient();
  const { data: registrations, error } = await supabase
    .from("registrations")
    .select("title, first_name, last_name, email, phone, organisation, role, category, language_pref, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return new Response("Database error", { status: 500 });
  }

  const rows = registrations ?? [];

  const headers = ["Title", "First Name", "Last Name", "Email", "Phone", "Organisation", "Role", "Group", "Language", "Registered At"];

  const csvRows = [
    headers.join(","),
    ...rows.map((r) =>
      [
        escape(r.title || ""),
        escape(r.first_name),
        escape(r.last_name),
        escape(r.email),
        escape(r.phone || ""),
        escape(r.organisation || ""),
        escape(r.role || ""),
        r.category,
        r.language_pref,
        new Date(r.created_at).toISOString(),
      ].join(",")
    ),
  ];

  const csv = csvRows.join("\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="registrations-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}

function escape(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}
