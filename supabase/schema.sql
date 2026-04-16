-- OAFLAD #BuildingResilience — Database Schema
-- Run this in the Supabase SQL Editor after creating your project.

-- 1. Registrations
create table if not exists registrations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  title text,
  first_name text not null,
  last_name text not null,
  email text unique not null,
  phone text,
  email_hash text,
  organisation text,
  role text,
  category text not null, -- stores the group (Premières Dames, Gouvernement, etc.)
  language_pref text not null default 'fr',
  gdpr_consent boolean not null default true,
  consent_timestamp timestamptz
);

-- 2. Contact messages
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text not null,
  email text not null,
  organisation text,
  inquiry_type text not null default 'general',
  subject text not null,
  message text not null
);

-- 3. Media items
create table if not exists media_items (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  type text not null,           -- 'photo', 'video', 'document'
  category text,                -- 'conference', 'press', etc.
  title_fr text,
  title_en text,
  storage_path text,
  thumbnail_path text,
  video_url text,
  published boolean default false,
  sort_order int default 0
);

-- 4. Registration tokens (QR code gating)
create table if not exists registration_tokens (
  id uuid primary key default gen_random_uuid(),
  token text unique not null,
  label text not null default 'Event QR Code',
  is_active boolean not null default true,
  opens_at timestamptz,
  closes_at timestamptz,
  created_at timestamptz default now()
);

-- RLS Policies

-- Enable RLS on all tables
alter table registrations enable row level security;
alter table contact_messages enable row level security;
alter table media_items enable row level security;

-- Public can insert registrations
create policy "Public can insert registrations"
  on registrations for insert
  to anon
  with check (true);

-- Only authenticated (admin) can read registrations
create policy "Admin can read registrations"
  on registrations for select
  to authenticated
  using (true);

-- Public can insert contact messages
create policy "Public can insert contact messages"
  on contact_messages for insert
  to anon
  with check (true);

-- Only authenticated (admin) can read contact messages
create policy "Admin can read contact messages"
  on contact_messages for select
  to authenticated
  using (true);

-- Public can read published media
create policy "Public can read published media"
  on media_items for select
  to anon
  using (published = true);

-- Authenticated users can manage media
create policy "Admin can manage media"
  on media_items for all
  to authenticated
  using (true)
  with check (true);

-- Registration tokens: only authenticated (admin) can manage
alter table registration_tokens enable row level security;

create policy "Admin can manage registration tokens"
  on registration_tokens for all
  to authenticated
  using (true)
  with check (true);

-- Anon can read active tokens (for validation)
create policy "Public can validate tokens"
  on registration_tokens for select
  to anon
  using (is_active = true);
