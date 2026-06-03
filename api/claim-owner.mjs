import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { endpoint, keys } = req.body;
  if (!endpoint || !keys || !keys.p256dh || !keys.auth) {
    return res.status(400).json({ error: 'Missing or invalid subscription' });
  }

  const sb = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );

  const { error } = await sb.from('push_subscriptions').upsert(
    { endpoint, keys, owner: true },
    { onConflict: 'endpoint' }
  );

  if (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }

  res.json({ ok: true });
}
