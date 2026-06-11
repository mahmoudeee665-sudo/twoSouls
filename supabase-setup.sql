-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/bgfmlaawqkldjxuztfyw/sql/new)
-- Step 1: Create table (if not exists)
CREATE TABLE IF NOT EXISTS public.push_subscriptions (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  endpoint TEXT NOT NULL UNIQUE,
  keys JSONB NOT NULL,
  owner BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;

-- Anyone can subscribe (insert)
CREATE POLICY "Anyone can subscribe" ON public.push_subscriptions
  FOR INSERT WITH CHECK (true);

-- Anyone can read subscriptions
CREATE POLICY "Anyone can read" ON public.push_subscriptions
  FOR SELECT USING (true);

-- Anyone can delete
CREATE POLICY "Anyone can delete" ON public.push_subscriptions
  FOR DELETE USING (true);

-- Anyone can update (needed for claim-owner upsert)
CREATE POLICY "Anyone can update" ON public.push_subscriptions
  FOR UPDATE USING (true) WITH CHECK (true);

-- Step 2: Add owner column if upgrading from old version
ALTER TABLE public.push_subscriptions ADD COLUMN IF NOT EXISTS owner BOOLEAN DEFAULT false;

-- Step 3: Add email column to identify visitors
ALTER TABLE public.push_subscriptions ADD COLUMN IF NOT EXISTS email TEXT DEFAULT '';

-- Step 4: Visit logs table (device tracking)
CREATE TABLE IF NOT EXISTS public.visit_logs (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  visitor TEXT NOT NULL DEFAULT 'Someone',
  device TEXT NOT NULL DEFAULT 'Unknown',
  browser TEXT NOT NULL DEFAULT 'Unknown',
  user_agent TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.visit_logs ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anon key (anyone can log a visit)
CREATE POLICY "Anyone can log visits" ON public.visit_logs
  FOR INSERT WITH CHECK (true);

-- Allow reads from anon key (so you can query it from a mini dashboard)
CREATE POLICY "Anyone can read visits" ON public.visit_logs
  FOR SELECT USING (true);
