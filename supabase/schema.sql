-- OAFLAD #BuildingResilience — Database Schema
-- Run this in the Supabase SQL Editor after creating your project.

-- 1. Registrations
create table if not exists registrations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  first_name text not null,
  last_name text not null,
  email text unique not null,
  phone text,
  organisation text,
  role text,
  category text not null,
  language_pref text not null default 'fr',
  gdpr_consent boolean not null default false,
  consent_timestamp timestamptz
);

-- 2. Contact messages
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text not null,
  email text not null,
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
