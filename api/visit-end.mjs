import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { visitId } = req.body || {};
  if (!visitId) {
    return res.status(400).json({ error: 'visitId required' });
  }

  const sb = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );

  const now = new Date().toISOString();

  // Get the row to calculate duration from created_at
  const { data: row } = await sb
    .from('visit_logs')
    .select('created_at')
    .eq('id', visitId)
    .single();

  let durationSeconds = null;
  if (row && row.created_at) {
    const start = new Date(row.created_at).getTime();
    const end = new Date(now).getTime();
    durationSeconds = Math.round((end - start) / 1000);
  }

  await sb
    .from('visit_logs')
    .update({ left_at: now, duration_seconds: durationSeconds })
    .eq('id', visitId);

  res.json({ ok: true, duration_seconds: durationSeconds });
}
