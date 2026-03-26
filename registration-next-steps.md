# Registration Email — Next Steps

Remaining setup to wire the confirmation email flow end-to-end.

## 1. Resend Domain Setup

Add DNS records in **Namecheap** for `send.resilience241.com` using values from the **Resend dashboard**:

- MX record
- SPF (TXT record)
- DKIM (TXT record)

Verify the domain in Resend once records propagate.

## 2. Namecheap Email Forwarding

Forward `info@resilience241.com` to `cadidi@chomei.store`.

## 3. Set Edge Function Secrets

```bash
supabase secrets set RESEND_API_KEY=<your-key>
supabase secrets set WEBHOOK_SECRET=<generate-a-random-string>
supabase secrets set FROM_EMAIL=noreply@send.resilience241.com
supabase secrets set APP_URL=https://resilience241.com
```

## 4. Deploy the Function

```bash
supabase functions deploy send-confirmation
```

## 5. Create Database Webhook

In **Supabase Dashboard** > Database > Webhooks:

- **Table**: `registrations`
- **Event**: `INSERT`
- **URL**: `https://<project-ref>.supabase.co/functions/v1/send-confirmation`
- **Header**: `x-webhook-secret` = the same value from step 3

## 6. Replace Placeholder Links

In `supabase/functions/send-confirmation/index.ts`, update:

- `WHATSAPP_LINK` (line 20) — WhatsApp community invite URL
- `CADIDI_OPTIN_LINK` (line 21) — Cadidi AI opt-in URL
- `SOCIAL_X`, `SOCIAL_FB`, `SOCIAL_IG` (lines 24–26) — real social handles
