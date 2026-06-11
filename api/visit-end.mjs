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
  let durationSeconds = null;

  try {
    const { data: rows } = await sb
      .from('visit_logs')
      .select('created_at')
      .eq('id', visitId);

    if (rows && rows.length > 0 && rows[0].created_at) {
      const start = new Date(rows[0].created_at).getTime();
      const end = new Date(now).getTime();
      durationSeconds = Math.round((end - start) / 1000);
    }
  } catch (e) {
    // ignore
  }

  try {
    await sb
      .from('visit_logs')
      .update({ left_at: now, duration_seconds: durationSeconds })
      .eq('id', visitId);
  } catch (e) {
    // ignore
  }

  res.json({ ok: true, duration_seconds: durationSeconds });
}
