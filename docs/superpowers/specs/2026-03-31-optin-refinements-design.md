# resilience241 — Opt-In Flow Refinements

> Spec date: 2026-03-31

## Summary

Three changes to the registration form and confirmation email to improve the WhatsApp AI opt-in flow.

---

## 1. Phone Field: Country Code Selector + E.164 Validation

### Current
Bare `<input type="tel">` with no validation. Users can enter local formats (`0612345678`) which won't match WhatsApp's E.164 format when cadidi hashes them.

### Change
- Add a country code selector dropdown defaulting to Gabon (`+241`). Use a `<select>` with common African country codes + a full list, no external dependency.
- Combine selected country code + local number into E.164 format (`+241XXXXXXXXX`) before submission.
- Client-side validation: strip spaces/dashes, reject if remaining digits are outside 7-15 range (ITU-T E.164 bounds).
- Server-side: same normalization + validation in `POST /api/register`. Store the full E.164 string in the `phone` column.

### Country codes to feature at top of selector
`+241` (Gabon), `+33` (France), `+1` (US/Canada), `+44` (UK), `+351` (Portugal), `+34` (Spain), `+55` (Brazil) — then separator, then full alphabetical list.

---

## 2. Email Hash in Registration API

### Current
Registration API stores raw email but no hash. cadidi's consent state machine can only look up by `phone_hash`.

### Change
- On insert, compute `SHA-256(email.toLowerCase().trim())` and store in a new `email_hash` column on the `registrations` table.
- Add a Supabase migration: `ALTER TABLE registrations ADD COLUMN IF NOT EXISTS email_hash text;` with index.
- Backfill existing rows: `UPDATE registrations SET email_hash = encode(sha256(lower(trim(email))::bytea), 'hex') WHERE email_hash IS NULL;`
- Server-side (`route.ts`): compute hash using Web Crypto API (`crypto.subtle.digest`) before insert.

---

## 3. Confirmation Email: Direct wa.me Link with Prepopulated Consent

### Current
`CADIDI_OPTIN_LINK` points to `${APP_URL}/cadidi` (a page that doesn't exist). CTA button says "Discover Cadidi — AI Assistant".

### Change
Replace the static `CADIDI_OPTIN_LINK` with a per-recipient dynamic `wa.me` URL in `send-confirmation/index.ts`.

**URL format:**
```
https://wa.me/15559434679?text=<CONSENT_WORD>%20<EMAIL>
```

**Consent words by language_pref:**
| Lang | Word | Example prepopulated text |
|------|------|--------------------------|
| fr   | OUI  | `OUI user@example.com`   |
| en   | YES  | `YES user@example.com`   |
| es   | SÍ   | `SÍ user@example.com`    |
| pt   | SIM  | `SIM user@example.com`   |

**Implementation:**
- Remove the `CADIDI_OPTIN_LINK` constant.
- Add `WHATSAPP_BOT_NUMBER = "15559434679"` constant (digits only, no `+`).
- Add a `consentWord` field to the i18n strings: `{ fr: "OUI", en: "YES", es: "SÍ", pt: "SIM" }`.
- Build URL in `buildHtml`/`buildText`: `https://wa.me/${WHATSAPP_BOT_NUMBER}?text=${encodeURIComponent(consentWord + " " + email)}`.
- CTA button text stays as-is ("Discover Cadidi — AI Assistant" / localized variants).

---

## Out of Scope
- cadidi-side changes (separate spec)
- New `/cadidi` page (no longer needed)
