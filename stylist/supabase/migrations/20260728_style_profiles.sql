-- Run this migration in Supabase SQL Editor before using the persistence features.

create table if not exists public.style_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  analysis_result jsonb not null,
  recommendations jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.saved_outfits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  style_profile_id uuid references public.style_profiles(id) on delete set null,
  top_item jsonb not null,
  bottom_item jsonb not null,
  shoes_item jsonb,
  preview jsonb,
  occasion text not null default 'Casual/Daily',
  created_at timestamptz not null default now()
);

create index if not exists saved_outfits_user_created_at_idx
  on public.saved_outfits (user_id, created_at desc);

alter table public.style_profiles enable row level security;
alter table public.saved_outfits enable row level security;

drop policy if exists "Users manage their own style profile" on public.style_profiles;
create policy "Users manage their own style profile"
  on public.style_profiles for all
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users manage their own saved outfits" on public.saved_outfits;
create policy "Users manage their own saved outfits"
  on public.saved_outfits for all
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

