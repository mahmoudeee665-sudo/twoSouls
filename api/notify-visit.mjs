import webpush from 'web-push';
import { createClient } from '@supabase/supabase-js';

webpush.setVapidDetails(
  'mailto:admin@twosouls.app',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sb = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );

  const { data: subscriptions, error } = await sb
    .from('push_subscriptions')
    .select('endpoint, keys')
    .eq('owner', true);

  if (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }

  if (!subscriptions || subscriptions.length === 0) {
    return res.json({ sent: 0, message: 'No owner subscribed' });
  }

  const payload = JSON.stringify({
    title: 'Someone opened Two Souls 💕',
    body: '',
    url: '/'
  });

  let sent = 0;
  let expired = [];

  for (const sub of subscriptions) {
    try {
      await webpush.sendNotification(
        { endpoint: sub.endpoint, keys: sub.keys },
        payload
      );
      sent++;
    } catch (err) {
      if (err.statusCode === 410 || err.statusCode === 404) {
        expired.push(sub.endpoint);
      }
    }
  }

  if (expired.length > 0) {
    for (const endpoint of expired) {
      await sb.from('push_subscriptions').delete().eq('endpoint', endpoint);
    }
  }

  res.json({ sent, expired: expired.length });
}
