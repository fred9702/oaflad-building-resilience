# resilience241 Opt-In Flow Refinements — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve the registration form phone field with country code selector and E.164 validation, compute email_hash on registration, and replace the Cadidi CTA in the confirmation email with a direct wa.me link containing a prepopulated consent message.

**Architecture:** Phone field becomes a composite input (country code select + local number). Registration API normalizes to E.164 and computes email_hash via Web Crypto. Confirmation email edge function builds a per-recipient `wa.me` URL using the registrant's email and language preference.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Supabase Edge Functions (Deno), next-intl

---

### Task 1: Add i18n Keys for Phone Field

**Files:**
- Modify: `messages/en.json`
- Modify: `messages/fr.json`

- [ ] **Step 1: Add translation keys**

In `messages/en.json`, inside the `"register"` object, add:

```json
"phoneCountryCode": "Country code",
"phoneLocal": "Phone number (without country code)",
"invalidPhone": "Invalid phone number."
```

In `messages/fr.json`, inside the `"register"` object, add:

```json
"phoneCountryCode": "Indicatif pays",
"phoneLocal": "Numéro de téléphone (sans indicatif)",
"invalidPhone": "Numéro de téléphone invalide."
```

- [ ] **Step 2: Commit**

```bash
git add messages/en.json messages/fr.json
git commit -m "feat: add i18n keys for phone country code field"
```

---

### Task 2: Create Country Code Data File

**Files:**
- Create: `src/data/country-codes.ts`

- [ ] **Step 1: Create the data file**

Create `src/data/country-codes.ts`:

```typescript
export interface CountryCode {
  code: string;   // e.g. "+241"
  country: string; // e.g. "Gabon"
  iso: string;     // e.g. "GA"
}

/** Featured codes shown at top of selector, in display order. */
export const FEATURED_CODES: CountryCode[] = [
  { code: "+241", country: "Gabon", iso: "GA" },
  { code: "+33", country: "France", iso: "FR" },
  { code: "+1", country: "US / Canada", iso: "US" },
  { code: "+44", country: "United Kingdom", iso: "UK" },
  { code: "+351", country: "Portugal", iso: "PT" },
  { code: "+34", country: "Spain", iso: "ES" },
  { code: "+55", country: "Brazil", iso: "BR" },
];

/** African country codes, alphabetical. */
export const AFRICAN_CODES: CountryCode[] = [
  { code: "+213", country: "Algeria", iso: "DZ" },
  { code: "+244", country: "Angola", iso: "AO" },
  { code: "+229", country: "Benin", iso: "BJ" },
  { code: "+267", country: "Botswana", iso: "BW" },
  { code: "+226", country: "Burkina Faso", iso: "BF" },
  { code: "+257", country: "Burundi", iso: "BI" },
  { code: "+237", country: "Cameroon", iso: "CM" },
  { code: "+238", country: "Cape Verde", iso: "CV" },
  { code: "+236", country: "Central African Republic", iso: "CF" },
  { code: "+235", country: "Chad", iso: "TD" },
  { code: "+269", country: "Comoros", iso: "KM" },
  { code: "+242", country: "Congo", iso: "CG" },
  { code: "+243", country: "DR Congo", iso: "CD" },
  { code: "+253", country: "Djibouti", iso: "DJ" },
  { code: "+20", country: "Egypt", iso: "EG" },
  { code: "+240", country: "Equatorial Guinea", iso: "GQ" },
  { code: "+291", country: "Eritrea", iso: "ER" },
  { code: "+268", country: "Eswatini", iso: "SZ" },
  { code: "+251", country: "Ethiopia", iso: "ET" },
  { code: "+241", country: "Gabon", iso: "GA" },
  { code: "+220", country: "Gambia", iso: "GM" },
  { code: "+233", country: "Ghana", iso: "GH" },
  { code: "+224", country: "Guinea", iso: "GN" },
  { code: "+245", country: "Guinea-Bissau", iso: "GW" },
  { code: "+225", country: "Ivory Coast", iso: "CI" },
  { code: "+254", country: "Kenya", iso: "KE" },
  { code: "+266", country: "Lesotho", iso: "LS" },
  { code: "+231", country: "Liberia", iso: "LR" },
  { code: "+218", country: "Libya", iso: "LY" },
  { code: "+261", country: "Madagascar", iso: "MG" },
  { code: "+265", country: "Malawi", iso: "MW" },
  { code: "+223", country: "Mali", iso: "ML" },
  { code: "+222", country: "Mauritania", iso: "MR" },
  { code: "+230", country: "Mauritius", iso: "MU" },
  { code: "+212", country: "Morocco", iso: "MA" },
  { code: "+258", country: "Mozambique", iso: "MZ" },
  { code: "+264", country: "Namibia", iso: "NA" },
  { code: "+227", country: "Niger", iso: "NE" },
  { code: "+234", country: "Nigeria", iso: "NG" },
  { code: "+250", country: "Rwanda", iso: "RW" },
  { code: "+239", country: "São Tomé and Príncipe", iso: "ST" },
  { code: "+221", country: "Senegal", iso: "SN" },
  { code: "+248", country: "Seychelles", iso: "SC" },
  { code: "+232", country: "Sierra Leone", iso: "SL" },
  { code: "+252", country: "Somalia", iso: "SO" },
  { code: "+27", country: "South Africa", iso: "ZA" },
  { code: "+211", country: "South Sudan", iso: "SS" },
  { code: "+249", country: "Sudan", iso: "SD" },
  { code: "+255", country: "Tanzania", iso: "TZ" },
  { code: "+228", country: "Togo", iso: "TG" },
  { code: "+216", country: "Tunisia", iso: "TN" },
  { code: "+256", country: "Uganda", iso: "UG" },
  { code: "+260", country: "Zambia", iso: "ZM" },
  { code: "+263", country: "Zimbabwe", iso: "ZW" },
];

/** All codes: featured first, then African alphabetical. */
export const ALL_CODES = [...FEATURED_CODES, ...AFRICAN_CODES];
```

- [ ] **Step 2: Commit**

```bash
git add src/data/country-codes.ts
git commit -m "feat: add country code data for phone field"
```

---

### Task 3: Update Phone Field in Registration Form

**Files:**
- Modify: `src/app/[locale]/register/RegisterForm.tsx`

- [ ] **Step 1: Add phone validation and country code imports**

At the top of `RegisterForm.tsx`, add the import:

```typescript
import { FEATURED_CODES, AFRICAN_CODES } from "@/data/country-codes";
```

In the `validate` function, add phone validation after the email check:

```typescript
const phone = form.get("phoneLocal") as string;
if (phone) {
  const digits = phone.replace(/[\s\-().]/g, "");
  if (digits.length < 7 || digits.length > 15 || !/^\d+$/.test(digits)) {
    errors.phone = t("invalidPhone");
  }
}
```

- [ ] **Step 2: Update form data construction**

In `handleSubmit`, replace the phone line in the `body` object:

```typescript
const countryCode = formData.get("phoneCountryCode") as string;
const phoneLocal = formData.get("phoneLocal") as string;
let phone: string | null = null;
if (phoneLocal) {
  const digits = phoneLocal.replace(/[\s\-().]/g, "");
  phone = countryCode + digits;
}

const body = {
  first_name: formData.get("firstName"),
  last_name: formData.get("lastName"),
  email: formData.get("email"),
  phone,
  organisation: formData.get("organisation") || null,
  role: formData.get("role") || null,
  category: formData.get("category"),
  language_pref: formData.get("languagePref") || "fr",
  gdpr_consent: true,
};
```

- [ ] **Step 3: Replace the phone input HTML**

Replace the existing phone `<div>` block (the one with `id="phone"`) with:

```tsx
{/* Phone */}
<div className="md:col-span-2">
  <label className={labelClass}>
    {t("phone")}
  </label>
  <div className="flex gap-2">
    <select
      name="phoneCountryCode"
      defaultValue="+241"
      className={`${inputClass} w-32 shrink-0`}
      aria-label={t("phoneCountryCode")}
    >
      <optgroup label="—">
        {FEATURED_CODES.map((c) => (
          <option key={`f-${c.iso}`} value={c.code}>
            {c.code} {c.country}
          </option>
        ))}
      </optgroup>
      <optgroup label="Africa">
        {AFRICAN_CODES.map((c) => (
          <option key={`a-${c.iso}`} value={c.code}>
            {c.code} {c.country}
          </option>
        ))}
      </optgroup>
    </select>
    <input
      id="phoneLocal"
      name="phoneLocal"
      type="tel"
      placeholder="e.g. 074123456"
      aria-label={t("phoneLocal")}
      aria-invalid={!!fieldErrors.phone}
      aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
      className={`${inputClass} flex-1`}
    />
  </div>
  {fieldErrors.phone && (
    <p id="phone-error" className={errorClass} role="alert">
      {fieldErrors.phone}
    </p>
  )}
</div>
```

- [ ] **Step 4: Test locally**

Run: `npm run dev`
Navigate to `http://localhost:3000/en/register` and verify:
- Country code dropdown shows with +241 Gabon as default
- Featured codes appear first, then African codes
- Entering a number and submitting combines country code + digits
- Validation rejects non-numeric input

- [ ] **Step 5: Build check**

Run: `npm run build`
Expected: Build succeeds with no type errors

- [ ] **Step 6: Commit**

```bash
git add src/app/\[locale\]/register/RegisterForm.tsx
git commit -m "feat: add country code selector and E.164 phone validation"
```

---

### Task 4: Compute `email_hash` in Registration API

**Files:**
- Modify: `src/app/api/register/route.ts`

- [ ] **Step 1: Add email hash computation**

At the top of `route.ts`, add a helper function after the import:

```typescript
async function hashEmail(email: string): Promise<string> {
  const normalized = email.toLowerCase().trim();
  const encoded = new TextEncoder().encode(normalized);
  const hashBuffer = await crypto.subtle.digest("SHA-256", encoded);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
```

- [ ] **Step 2: Compute and include email_hash in the insert**

In the `POST` handler, before the `supabase.from("registrations").insert(...)` call, add:

```typescript
const email_hash = await hashEmail(email);
```

Then add `email_hash` to the insert object:

```typescript
const { error } = await supabase.from("registrations").insert({
  first_name,
  last_name,
  email: email.toLowerCase().trim(),
  phone: phone || null,
  organisation: organisation || null,
  role: role || null,
  category,
  language_pref: language_pref || "fr",
  gdpr_consent,
  consent_timestamp: new Date().toISOString(),
  email_hash,
});
```

- [ ] **Step 3: Build check**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add src/app/api/register/route.ts
git commit -m "feat: compute and store email_hash on registration"
```

---

### Task 5: Add Supabase Migration for `email_hash`

**Files:**
- Modify: `supabase/schema.sql`

- [ ] **Step 1: Add `email_hash` column to schema**

In `supabase/schema.sql`, add `email_hash text` after the `phone text,` line in the `registrations` table definition:

```sql
  phone text,
  email_hash text,
```

- [ ] **Step 2: Commit**

```bash
git add supabase/schema.sql
git commit -m "feat: add email_hash column to registrations schema"
```

Note: The actual `ALTER TABLE` migration will be run via cadidi's migration file (`supabase/migrations/20260331120000_add_email_hash_column.sql`) since both repos share the same Supabase project. The schema.sql here is the source-of-truth reference.

---

### Task 6: Update Confirmation Email with Dynamic wa.me Link

**Files:**
- Modify: `supabase/functions/send-confirmation/index.ts`

- [ ] **Step 1: Replace static CADIDI_OPTIN_LINK with dynamic builder**

Remove these lines near the top:

```typescript
const CADIDI_OPTIN_LINK = `${APP_URL}/cadidi`;
```

Add in their place:

```typescript
const WHATSAPP_BOT_NUMBER = "15559434679";
```

- [ ] **Step 2: Add consent words to i18n strings**

Add a `consentWord` field to each language in the `i18n` object:

```typescript
// In fr:
consentWord: "OUI",

// In en:
consentWord: "YES",

// In pt:
consentWord: "SIM",

// In es:
consentWord: "SÍ",
```

Also add `consentWord: string;` to the `Strings` interface.

- [ ] **Step 3: Build the wa.me URL dynamically**

Add a helper function after the i18n block:

```typescript
function buildCadidiLink(email: string, lang: string): string {
  const t = getStrings(lang);
  const text = `${t.consentWord} ${email}`;
  return `https://wa.me/${WHATSAPP_BOT_NUMBER}?text=${encodeURIComponent(text)}`;
}
```

- [ ] **Step 4: Update `buildHtml` to use dynamic link**

In the `buildHtml` function, change the function signature to accept `email`:

```typescript
function buildHtml(firstName: string, lang: string, email: string): string {
```

Replace the CTA 2 href from `${CADIDI_OPTIN_LINK}` to `${buildCadidiLink(email, lang)}`:

```html
<a href="${buildCadidiLink(email, lang)}" target="_blank" style="display:inline-block;padding:14px 32px;font-family:${BRAND.fontHeading};font-size:16px;font-weight:600;color:${BRAND.crimson};text-decoration:none;">
```

- [ ] **Step 5: Update `buildText` to use dynamic link**

Change the signature:

```typescript
function buildText(firstName: string, lang: string, email: string): string {
```

Replace `${CADIDI_OPTIN_LINK}` with `${buildCadidiLink(email, lang)}` in the text body.

- [ ] **Step 6: Update the handler to pass email**

In the `serve` handler, update the calls to pass `email`:

```typescript
html: buildHtml(firstName, lang, email),
text: buildText(firstName, lang, email),
```

- [ ] **Step 7: Verify the function compiles**

Run: `cd supabase && npx supabase functions serve send-confirmation --no-verify-jwt` (or just review the file for syntax errors if Supabase CLI is not installed).

- [ ] **Step 8: Commit**

```bash
git add supabase/functions/send-confirmation/index.ts
git commit -m "feat: replace Cadidi CTA with dynamic wa.me consent link"
```

---

### Task 7: Build and Lint Check

- [ ] **Step 1: Run lint**

Run: `npm run lint`
Expected: No errors

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Verify all commits**

Run: `git log --oneline -7`
Expected: 6 new commits (Tasks 1-6)
