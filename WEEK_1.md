# OAFLAD #BuildingResilience — Week 1 Implementation Summary

## What was built

| Step | Status | Details |
|------|--------|---------|
| 0. Node.js | Done | nvm + Node v22.22.1 |
| 1. Bootstrap | Done | Next.js 15 + TypeScript + Tailwind v4 + next-intl 4 + Supabase + Phosphor Icons |
| 2–3. Brand tokens & fonts | Done | 9 OAFLAD colours + 3 font families (Montserrat, Source Sans 3, Source Code Pro) |
| 4. i18n routing | Done | FR (default) / EN, middleware redirect, full message files |
| 5. Navbar | Done | Desktop + mobile hamburger, FR/EN switcher, Orange CTA, WCAG focus rings |
| 6. Footer | Done | Brown bg, African chevron pattern, social icons, legal links |
| 7. Supabase | Done | Browser/server clients, `.env.local` placeholder, `supabase/schema.sql` |
| 8. Hero section | Done | Full-width gradient, logo placeholder, title, hashtag, date, dual CTAs |
| 9. Countdown timer | Done | 4-box live timer → April 17 2026 08:00 WAT, hydration-safe |
| 10. Registration form | Done | Full form + client validation + `POST /api/register` + Supabase insert |
| 11. Confirmation page | Done | Success message + `.ics` calendar download |
| 12. CTA banner | Done | Full-width Orange banner with ghost button |
| 13. Stub pages | Done | About, Programme, Speakers, Partners, Media (coming soon), Contact |
| 14. Git commit | Done | Single commit on `main` |

## Project structure

```
oaflad-building-resilience/
├── messages/
│   ├── fr.json                     # French translations
│   └── en.json                     # English translations
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout (fonts, global CSS)
│   │   ├── globals.css             # Tailwind v4 + OAFLAD design tokens
│   │   ├── api/register/route.ts   # Registration API endpoint
│   │   └── [locale]/
│   │       ├── layout.tsx          # Locale layout (NextIntlClientProvider, Navbar, Footer)
│   │       ├── page.tsx            # Homepage (Hero + Countdown + CTA)
│   │       ├── about/page.tsx
│   │       ├── programme/page.tsx
│   │       ├── speakers/page.tsx
│   │       ├── register/
│   │       │   ├── page.tsx
│   │       │   ├── RegisterForm.tsx
│   │       │   └── confirmation/page.tsx
│   │       ├── partners/page.tsx
│   │       ├── media/page.tsx
│   │       └── contact/page.tsx
│   ├── components/
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── Countdown.tsx
│   │   │   └── CTABanner.tsx
│   │   └── layout/
│   │       ├── Navbar.tsx
│   │       └── Footer.tsx
│   ├── i18n/
│   │   ├── routing.ts
│   │   └── request.ts
│   ├── lib/supabase/
│   │   ├── client.ts               # Browser client
│   │   └── server.ts               # Server client (service role)
│   └── middleware.ts               # next-intl locale redirect
├── supabase/
│   └── schema.sql                  # Tables + RLS policies (run manually)
├── next.config.ts
└── .env.local                      # Supabase keys (not committed)
```

## Next steps

1. **Connect to Vercel** — add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

2. **Run `supabase/schema.sql`** in the Supabase SQL Editor to create tables and RLS policies.

3. **Replace logo SVG placeholders** with the real `OAFLAD-Logo-favicon-02.png` when delivered.

4. **Replace hero background** gradient with OC photography when available.

5. **Week 2 priorities:**
   - About page content
   - Programme / agenda page
   - Speakers grid with bios
   - Partners logo wall
   - Contact form wired to `contact_messages` table
   - Media gallery (once assets are provided)
