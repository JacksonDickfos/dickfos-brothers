-- Competitions table
create table if not exists competitions (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  summary text,
  prize text,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  rules_md text,
  sponsor text,
  hero_image text,
  is_active boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Competition entries table
create table if not exists competition_entries (
  id uuid primary key default gen_random_uuid(),
  competition_id uuid references competitions(id) on delete cascade,
  full_name text not null,
  email text not null,
  instagram_handle text,
  tiktok_handle text,
  caption text,
  media_url text, -- S3/Supabase Storage URL
  created_at timestamptz default now(),
  is_featured boolean default false,
  is_winner boolean default false
);

-- Indexes for performance
create index if not exists idx_competitions_slug on competitions(slug);
create index if not exists idx_competitions_active on competitions(is_active);
create index if not exists idx_entries_competition on competition_entries(competition_id);
create index if not exists idx_entries_featured on competition_entries(is_featured);
create index if not exists idx_entries_winner on competition_entries(is_winner);

