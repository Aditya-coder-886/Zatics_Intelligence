-- Run in the Supabase SQL editor.
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  company_email text not null,
  booking_date date not null,
  booking_time text not null,
  budget text not null,
  meet_link text,
  calendar_event_id text,
  created_at timestamptz not null default now()
);

alter table public.bookings enable row level security;

-- The Next.js server action uses SUPABASE_SERVICE_ROLE_KEY, which bypasses RLS.
-- Do not expose insert access to the anon key.
