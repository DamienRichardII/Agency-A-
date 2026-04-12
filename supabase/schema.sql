-- Agency A quotes schema
create extension if not exists pgcrypto;

create table if not exists public.quotes (
  id uuid primary key default gen_random_uuid(),
  quote_id text unique,
  created_at timestamptz not null default now(),
  last_name text not null,
  first_name text,
  profile text,
  email text not null,
  service text,
  service_label text,
  description text,
  destination text,
  duration text,
  photos_requested text,
  attachments jsonb not null default '[]'::jsonb
);

alter table public.quotes enable row level security;

create policy if not exists "Public can insert quotes" on public.quotes
for insert to anon, authenticated
with check (true);

create policy if not exists "Public can read quotes" on public.quotes
for select to anon, authenticated
using (true);

insert into storage.buckets (id, name, public)
values ('quote-attachments', 'quote-attachments', false)
on conflict (id) do nothing;

create policy if not exists "Public can upload quote attachments" on storage.objects
for insert to anon, authenticated
with check (bucket_id = 'quote-attachments');

create policy if not exists "Public can read quote attachments" on storage.objects
for select to anon, authenticated
using (bucket_id = 'quote-attachments');
