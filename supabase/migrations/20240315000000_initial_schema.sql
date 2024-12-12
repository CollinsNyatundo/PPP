-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create projects table
create table if not exists public.projects (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text not null,
  image text not null,
  tags text[] not null default '{}',
  github text not null,
  category text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create articles table
create table if not exists public.articles (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  content text not null,
  excerpt text not null,
  image text not null,
  slug text not null unique,
  category text not null,
  read_time text not null,
  published boolean not null default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add RLS policies
alter table public.projects enable row level security;
alter table public.articles enable row level security;

-- Create policies for projects
create policy "Enable read access for all users" on public.projects
  for select using (true);

create policy "Enable insert for authenticated users only" on public.projects
  for insert with check (auth.role() = 'authenticated');

create policy "Enable update for authenticated users only" on public.projects
  for update using (auth.role() = 'authenticated');

create policy "Enable delete for authenticated users only" on public.projects
  for delete using (auth.role() = 'authenticated');

-- Create policies for articles
create policy "Enable read access for all users" on public.articles
  for select using (true);

create policy "Enable insert for authenticated users only" on public.articles
  for insert with check (auth.role() = 'authenticated');

create policy "Enable update for authenticated users only" on public.articles
  for update using (auth.role() = 'authenticated');

create policy "Enable delete for authenticated users only" on public.articles
  for delete using (auth.role() = 'authenticated');

-- Create function to handle updated_at
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create triggers for updated_at
create trigger set_projects_updated_at
  before update on public.projects
  for each row
  execute function handle_updated_at();

create trigger set_articles_updated_at
  before update on public.articles
  for each row
  execute function handle_updated_at();