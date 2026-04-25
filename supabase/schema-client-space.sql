-- =============================================================================
-- Agency A — Espace Client Supabase Schema
-- Tables: profiles, projects, project_images, image_selections,
--         project_documents, project_messages, project_access
-- + RLS policies + Storage buckets + trigger auto-profile
-- =============================================================================

-- ────────────────────────────────────────────────
-- PROFILES
-- Étend auth.users avec rôle et informations client
-- ────────────────────────────────────────────────
create table if not exists public.profiles (
  id          uuid        primary key references auth.users(id) on delete cascade,
  role        text        not null default 'client' check (role in ('client', 'admin')),
  first_name  text,
  last_name   text,
  email       text,
  phone       text,
  company     text,
  siret       text,
  address     text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

create policy "profiles_select_admin" on public.profiles
  for select using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

create policy "profiles_update_admin" on public.profiles
  for update using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy "profiles_insert_admin" on public.profiles
  for insert with check (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- ────────────────────────────────────────────────
-- PROJECTS
-- Un projet = une séance photo pour un client
-- ────────────────────────────────────────────────
create table if not exists public.projects (
  id               uuid    primary key default gen_random_uuid(),
  client_id        uuid    not null references public.profiles(id) on delete cascade,
  title            text    not null,
  status           text    not null default 'en_cours'
                           check (status in ('en_cours','en_retouche','livraison','termine','archive')),
  session_date     date,
  session_type     text,
  session_location text,
  notes            text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

alter table public.projects enable row level security;

create policy "projects_select" on public.projects
  for select using (
    client_id = auth.uid()
    or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy "projects_insert_admin" on public.projects
  for insert with check (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy "projects_update_admin" on public.projects
  for update using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy "projects_delete_admin" on public.projects
  for delete using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- ────────────────────────────────────────────────
-- PROJECT IMAGES
-- Images uploadées par l'admin dans un projet
-- ────────────────────────────────────────────────
create table if not exists public.project_images (
  id           uuid    primary key default gen_random_uuid(),
  project_id   uuid    not null references public.projects(id) on delete cascade,
  storage_path text    not null,
  filename     text    not null,
  size_bytes   bigint,
  sort_order   int     not null default 0,
  created_at   timestamptz not null default now()
);

alter table public.project_images enable row level security;

create policy "project_images_select" on public.project_images
  for select using (
    exists (
      select 1 from public.projects pr
      where pr.id = project_id
        and (
          pr.client_id = auth.uid()
          or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
        )
    )
  );

create policy "project_images_admin" on public.project_images
  for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- ────────────────────────────────────────────────
-- IMAGE SELECTIONS
-- Sélections faites par le client
-- ────────────────────────────────────────────────
create table if not exists public.image_selections (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid not null references public.projects(id) on delete cascade,
  image_id    uuid not null references public.project_images(id) on delete cascade,
  selected_by uuid not null references public.profiles(id),
  selected_at timestamptz not null default now(),
  unique (project_id, image_id, selected_by)
);

alter table public.image_selections enable row level security;

create policy "selections_all" on public.image_selections
  for all using (
    selected_by = auth.uid()
    or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- ────────────────────────────────────────────────
-- PROJECT DOCUMENTS
-- Contrats, droits à l'image, livrables…
-- ────────────────────────────────────────────────
create table if not exists public.project_documents (
  id            uuid primary key default gen_random_uuid(),
  project_id    uuid not null references public.projects(id) on delete cascade,
  title         text not null,
  storage_path  text not null,
  filename      text not null,
  size_bytes    bigint,
  document_type text default 'other'
                check (document_type in ('contrat','droit_image','livraison','facture','other')),
  created_at    timestamptz not null default now()
);

alter table public.project_documents enable row level security;

create policy "documents_select" on public.project_documents
  for select using (
    exists (
      select 1 from public.projects pr
      where pr.id = project_id
        and (
          pr.client_id = auth.uid()
          or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
        )
    )
  );

create policy "documents_admin" on public.project_documents
  for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- ────────────────────────────────────────────────
-- PROJECT MESSAGES
-- Fil de messages entre client et admin
-- ────────────────────────────────────────────────
create table if not exists public.project_messages (
  id         uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  sender_id  uuid not null references public.profiles(id),
  content    text not null,
  read_at    timestamptz,
  created_at timestamptz not null default now()
);

alter table public.project_messages enable row level security;

create policy "messages_select" on public.project_messages
  for select using (
    exists (
      select 1 from public.projects pr
      where pr.id = project_id
        and (
          pr.client_id = auth.uid()
          or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
        )
    )
  );

create policy "messages_insert" on public.project_messages
  for insert with check (
    sender_id = auth.uid()
    and exists (
      select 1 from public.projects pr
      where pr.id = project_id
        and (
          pr.client_id = auth.uid()
          or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
        )
    )
  );

create policy "messages_update_admin" on public.project_messages
  for update using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- ────────────────────────────────────────────────
-- PROJECT ACCESS
-- Accès limité dans le temps par client/projet
-- ────────────────────────────────────────────────
create table if not exists public.project_access (
  id           uuid primary key default gen_random_uuid(),
  project_id   uuid not null references public.projects(id) on delete cascade,
  client_id    uuid not null references public.profiles(id) on delete cascade,
  access_start timestamptz not null default now(),
  access_end   timestamptz,
  created_at   timestamptz not null default now(),
  unique (project_id, client_id)
);

alter table public.project_access enable row level security;

create policy "access_select" on public.project_access
  for select using (
    client_id = auth.uid()
    or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy "access_admin" on public.project_access
  for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- ────────────────────────────────────────────────
-- STORAGE BUCKETS
-- ────────────────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('client-images', 'client-images', false)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('client-documents', 'client-documents', false)
on conflict (id) do nothing;

-- Storage policies — client-images
create policy "storage_images_select" on storage.objects
  for select using (
    bucket_id = 'client-images'
    and exists (
      select 1 from public.projects pr
      join public.profiles prf on prf.id = auth.uid()
      where (pr.client_id = auth.uid() or prf.role = 'admin')
        and split_part(name, '/', 1) = pr.id::text
    )
  );

create policy "storage_images_admin" on storage.objects
  for all using (
    bucket_id = 'client-images'
    and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- Storage policies — client-documents
create policy "storage_docs_select" on storage.objects
  for select using (
    bucket_id = 'client-documents'
    and exists (
      select 1 from public.projects pr
      join public.profiles prf on prf.id = auth.uid()
      where (pr.client_id = auth.uid() or prf.role = 'admin')
        and split_part(name, '/', 1) = pr.id::text
    )
  );

create policy "storage_docs_admin" on storage.objects
  for all using (
    bucket_id = 'client-documents'
    and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- ────────────────────────────────────────────────
-- TRIGGER — Auto-création du profil à l'inscription
-- ────────────────────────────────────────────────
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role, first_name, last_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'role', 'client'),
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name'
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ────────────────────────────────────────────────
-- UPDATED_AT auto-update helpers
-- ────────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();
create trigger projects_updated_at before update on public.projects
  for each row execute function public.set_updated_at();
