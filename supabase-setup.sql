-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/bgfmlaawqkldjxuztfyw/sql/new)
CREATE TABLE IF NOT EXISTS public.push_subscriptions (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  endpoint TEXT NOT NULL UNIQUE,
  keys JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;

-- Anyone can subscribe (insert)
CREATE POLICY "Anyone can subscribe" ON public.push_subscriptions
  FOR INSERT WITH CHECK (true);

-- Anyone can read subscriptions (needed for anon key to read when sending pushes)
CREATE POLICY "Anyone can read" ON public.push_subscriptions
  FOR SELECT USING (true);

-- Anyone can delete (for cleanup of expired subscriptions)
CREATE POLICY "Anyone can delete" ON public.push_subscriptions
  FOR DELETE USING (true);
