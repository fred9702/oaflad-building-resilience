import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

/* ------------------------------------------------------------------ */
/*  Environment                                                        */
/* ------------------------------------------------------------------ */

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";
const FROM_EMAIL =
  Deno.env.get("FROM_EMAIL") ?? "noreply@send.resilience241.com";
const APP_URL = (Deno.env.get("APP_URL") ?? "https://resilience241.com").replace(
  /\/$/,
  "",
);
const WEBHOOK_SECRET = Deno.env.get("WEBHOOK_SECRET") ?? "";

/* ------------------------------------------------------------------ */
/*  Placeholders — replace with real links when available              */
/* ------------------------------------------------------------------ */

const WHATSAPP_LINK = "https://chat.whatsapp.com/FvnwWW94uVQ0fy7HbUPzYR";
const CADIDI_OPTIN_LINK = `${APP_URL}/cadidi`;

/* Social links */
const SOCIAL_X = "https://x.com/resilience241";
const SOCIAL_FB = "https://facebook.com/resilience241";
const SOCIAL_IG = "https://instagram.com/resilience_241";

/* ------------------------------------------------------------------ */
/*  Brand tokens (from VISUAL-GUIDELINE.md warm theme)                 */
/* ------------------------------------------------------------------ */

const BRAND = {
  orange: "#E07B39",
  crimson: "#9B1C37",
  brown: "#6B3417",
  warmCream: "#FBF0E6",
  lightBeige: "#F5EDE0",
  nearBlack: "#2D2D2D",
  fontHeading: "'Montserrat', Arial, Helvetica, sans-serif",
  fontBody: "'Source Sans 3', Arial, Helvetica, sans-serif",
} as const;

/* ------------------------------------------------------------------ */
/*  i18n — translations keyed by language_pref                         */
/* ------------------------------------------------------------------ */

type Lang = "fr" | "en" | "pt" | "es";

interface Strings {
  subject: (name: string) => string;
  title: string;
  greeting: (name: string) => string;
  body: string;
  stayConnected: string;
  ctaWhatsapp: string;
  ctaCadidi: string;
  followUs: string;
  footer: string;
}

const i18n: Record<Lang, Strings> = {
  fr: {
    subject: (name) => `Bienvenue ${name} — #BuildingResilience`,
    title: "Inscription confirmée !",
    greeting: (name) => `Bonjour ${name},`,
    body: "Merci pour votre inscription à la campagne <strong style=\"color:#9B1C37;\">#BuildingResilience</strong>. Votre participation contribue à renforcer la résilience à travers le continent africain.",
    stayConnected: "Voici deux façons de rester connecté(e)\u00a0:",
    ctaWhatsapp: "Rejoindre la communauté WhatsApp",
    ctaCadidi: "Découvrir Cadidi — Assistant IA",
    followUs: "Suivez-nous",
    footer: "Organisation Africaine de Lutte Anti-Drogue",
  },
  en: {
    subject: (name) => `Welcome ${name} — #BuildingResilience`,
    title: "Registration confirmed!",
    greeting: (name) => `Hello ${name},`,
    body: "Thank you for registering for the <strong style=\"color:#9B1C37;\">#BuildingResilience</strong> campaign. Your participation helps strengthen resilience across the African continent.",
    stayConnected: "Here are two ways to stay connected:",
    ctaWhatsapp: "Join the WhatsApp Community",
    ctaCadidi: "Discover Cadidi — AI Assistant",
    followUs: "Follow us",
    footer: "African Organisation Against Drugs",
  },
  pt: {
    subject: (name) => `Bem-vindo(a) ${name} — #BuildingResilience`,
    title: "Inscrição confirmada!",
    greeting: (name) => `Olá ${name},`,
    body: "Obrigado(a) por se inscrever na campanha <strong style=\"color:#9B1C37;\">#BuildingResilience</strong>. A sua participação contribui para fortalecer a resiliência em todo o continente africano.",
    stayConnected: "Aqui estão duas formas de permanecer conectado(a):",
    ctaWhatsapp: "Juntar-se à comunidade WhatsApp",
    ctaCadidi: "Descobrir Cadidi — Assistente IA",
    followUs: "Siga-nos",
    footer: "Organização Africana de Luta Contra a Droga",
  },
  es: {
    subject: (name) => `Bienvenido(a) ${name} — #BuildingResilience`,
    title: "¡Inscripción confirmada!",
    greeting: (name) => `Hola ${name},`,
    body: "Gracias por inscribirte en la campaña <strong style=\"color:#9B1C37;\">#BuildingResilience</strong>. Tu participación contribuye a fortalecer la resiliencia en todo el continente africano.",
    stayConnected: "Aquí tienes dos formas de mantenerte conectado(a):",
    ctaWhatsapp: "Unirse a la comunidad de WhatsApp",
    ctaCadidi: "Descubrir Cadidi — Asistente IA",
    followUs: "Síguenos",
    footer: "Organización Africana de Lucha Contra la Droga",
  },
};

function getStrings(lang: string): Strings {
  return i18n[lang as Lang] ?? i18n.fr;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* ------------------------------------------------------------------ */
/*  HTML email builder                                                 */
/* ------------------------------------------------------------------ */

function buildHtml(firstName: string, lang: string): string {
  const t = getStrings(lang);
  const safe = escapeHtml(firstName);
  const logoUrl = `${APP_URL}/images/${lang}/campaign-logo.svg`;

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${t.title} — #BuildingResilience</title>
</head>
<body style="margin:0;padding:0;background-color:${BRAND.warmCream};font-family:${BRAND.fontBody};color:${BRAND.nearBlack};line-height:1.7;">

<!-- Outer wrapper -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND.warmCream};">
<tr><td align="center" style="padding:32px 16px;">

<!-- Inner card -->
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#FFFFFF;border-radius:8px;overflow:hidden;">

  <!-- Brand stripe -->
  <tr>
    <td style="height:4px;background-color:${BRAND.orange};background:linear-gradient(90deg,${BRAND.orange},${BRAND.crimson},${BRAND.brown});font-size:0;line-height:0;">&nbsp;</td>
  </tr>

  <!-- Logo -->
  <tr>
    <td align="center" style="padding:32px 24px 16px;">
      <img src="${logoUrl}" alt="OAFLAD #BuildingResilience" width="240" style="display:block;max-width:240px;height:auto;" />
    </td>
  </tr>

  <!-- Heading -->
  <tr>
    <td align="center" style="padding:0 24px;">
      <h1 style="margin:0;font-family:${BRAND.fontHeading};font-size:24px;font-weight:800;color:${BRAND.crimson};letter-spacing:-0.02em;">
        ${t.title}
      </h1>
    </td>
  </tr>

  <!-- Divider -->
  <tr>
    <td align="center" style="padding:16px 24px;">
      <div style="width:64px;height:3px;background-color:${BRAND.orange};background:linear-gradient(90deg,${BRAND.orange},${BRAND.crimson});border-radius:4px;"></div>
    </td>
  </tr>

  <!-- Body -->
  <tr>
    <td style="padding:0 32px;">
      <p style="margin:0 0 16px;font-size:16px;">
        ${t.greeting(`<strong style="color:${BRAND.brown};">${safe}</strong>`)}
      </p>
      <p style="margin:0 0 16px;font-size:16px;">
        ${t.body}
      </p>
      <p style="margin:0 0 24px;font-size:16px;">
        ${t.stayConnected}
      </p>
    </td>
  </tr>

  <!-- CTA 1 — WhatsApp -->
  <tr>
    <td align="center" style="padding:0 32px 12px;">
      <table role="presentation" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center" style="background-color:${BRAND.orange};border-radius:6px;">
            <a href="${WHATSAPP_LINK}" target="_blank" style="display:inline-block;padding:14px 32px;font-family:${BRAND.fontHeading};font-size:16px;font-weight:600;color:#FFFFFF;text-decoration:none;">
              ${t.ctaWhatsapp}
            </a>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- CTA 2 — Cadidi AI -->
  <tr>
    <td align="center" style="padding:0 32px 32px;">
      <table role="presentation" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center" style="border:2px solid ${BRAND.crimson};border-radius:6px;">
            <a href="${CADIDI_OPTIN_LINK}" target="_blank" style="display:inline-block;padding:14px 32px;font-family:${BRAND.fontHeading};font-size:16px;font-weight:600;color:${BRAND.crimson};text-decoration:none;">
              ${t.ctaCadidi}
            </a>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Separator -->
  <tr>
    <td style="padding:0 32px;">
      <div style="border-top:1px solid ${BRAND.lightBeige};"></div>
    </td>
  </tr>

  <!-- Social links -->
  <tr>
    <td align="center" style="padding:24px 32px 8px;">
      <p style="margin:0 0 12px;font-family:${BRAND.fontHeading};font-size:13px;font-weight:600;color:${BRAND.brown};text-transform:uppercase;letter-spacing:0.1em;">
        ${t.followUs}
      </p>
      <p style="margin:0;font-size:14px;">
        <a href="${SOCIAL_X}" target="_blank" style="color:${BRAND.orange};text-decoration:none;font-weight:600;padding:0 8px;">X (Twitter)</a>
        &middot;
        <a href="${SOCIAL_FB}" target="_blank" style="color:${BRAND.orange};text-decoration:none;font-weight:600;padding:0 8px;">Facebook</a>
        &middot;
        <a href="${SOCIAL_IG}" target="_blank" style="color:${BRAND.orange};text-decoration:none;font-weight:600;padding:0 8px;">Instagram</a>
      </p>
    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td align="center" style="padding:16px 32px 32px;">
      <p style="margin:0;font-size:12px;color:#8A8A8A;">
        OAFLAD — ${t.footer}<br />
        <a href="${APP_URL}" style="color:${BRAND.orange};text-decoration:none;">resilience241.com</a>
      </p>
    </td>
  </tr>

</table>
<!-- /Inner card -->

</td></tr>
</table>
<!-- /Outer wrapper -->

</body>
</html>`;
}

/* ------------------------------------------------------------------ */
/*  Plain-text fallback                                                */
/* ------------------------------------------------------------------ */

function buildText(firstName: string, lang: string): string {
  const t = getStrings(lang);

  return `${t.greeting(firstName)}

${t.body.replace(/<[^>]*>/g, "")}

${t.stayConnected}

${t.ctaWhatsapp}:
${WHATSAPP_LINK}

${t.ctaCadidi}:
${CADIDI_OPTIN_LINK}

${t.followUs}:
X (Twitter) : ${SOCIAL_X}
Facebook    : ${SOCIAL_FB}
Instagram   : ${SOCIAL_IG}

---
OAFLAD — ${t.footer}
${APP_URL}`;
}

/* ------------------------------------------------------------------ */
/*  Handler                                                            */
/* ------------------------------------------------------------------ */

serve(async (req: Request) => {
  // Only accept POST
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  // Validate webhook secret
  const secret = req.headers.get("x-webhook-secret");
  if (!WEBHOOK_SECRET) {
    console.error("WEBHOOK_SECRET is not configured — rejecting request");
    return new Response("Unauthorized", { status: 401 });
  }
  if (secret !== WEBHOOK_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Fail fast if Resend API key is missing
  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not configured");
    return new Response("Email service not configured", { status: 500 });
  }

  try {
    const payload = await req.json();
    const record = payload.record;

    if (!record?.email || !record?.first_name) {
      return new Response("Missing required fields in payload", {
        status: 400,
      });
    }

    const { email, first_name: rawFirstName, language_pref: lang = "fr" } = record;
    const firstName = escapeHtml(rawFirstName);
    const t = getStrings(lang);

    // Send via Resend API
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `OAFLAD #BuildingResilience <${FROM_EMAIL}>`,
        to: [email],
        subject: t.subject(firstName),
        html: buildHtml(firstName, lang),
        text: buildText(firstName, lang),
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend API error:", res.status, err);
      return new Response(`Resend error: ${res.status}`, { status: 502 });
    }

    const data = await res.json();
    console.log("Email sent:", data.id, "→", email, `(${lang})`);

    return new Response(JSON.stringify({ success: true, id: data.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("send-confirmation error:", err);
    return new Response("Internal error", { status: 500 });
  }
});
