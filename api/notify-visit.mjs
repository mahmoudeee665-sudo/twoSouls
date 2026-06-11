import webpush from 'web-push';
import { createClient } from '@supabase/supabase-js';

function detectDevice(ua) {
  if (!ua) return 'Unknown';
  const u = ua.toLowerCase();
  if (/iphone|ipad|ipod/.test(u)) return 'iOS';
  if (/android/.test(u)) return 'Android';
  if (/windows/.test(u)) return 'Windows';
  if (/macintosh|mac os/.test(u)) return 'macOS';
  if (/linux/.test(u)) return 'Linux';
  return 'Other';
}

function detectBrowser(ua) {
  if (!ua) return 'Unknown';
  const u = ua.toLowerCase();
  if (/samsungbrowser|samsung/.test(u)) return 'Samsung Browser';
  if (/chrome/.test(u) && /edg/.test(u)) return 'Edge';
  if (/chrome/.test(u)) return 'Chrome';
  if (/safari/.test(u) && !/chrome/.test(u)) return 'Safari';
  if (/firefox/.test(u)) return 'Firefox';
  return 'Other';
}

webpush.setVapidDetails(
  'mailto:admin@twosouls.app',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { visitorEndpoint } = req.body || {};
  const userAgent = req.headers['user-agent'] || '';
  const deviceType = detectDevice(userAgent);
  const browser = detectBrowser(userAgent);

  const sb = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );

  let { data: subscriptions, error } = await sb
    .from('push_subscriptions')
    .select('endpoint, keys, email')
    .eq('owner', true);

  if (error) {
    const { data: subs } = await sb
      .from('push_subscriptions')
      .select('endpoint, keys')
      .eq('owner', true);
    subscriptions = subs;
  }

  let visitorName = 'Someone';
  if (visitorEndpoint) {
    const { data: allSubs } = await sb
      .from('push_subscriptions')
      .select('email')
      .eq('endpoint', visitorEndpoint);

    if (allSubs && allSubs.length > 0 && allSubs[0].email !== undefined) {
      const email = allSubs[0].email || '';
      if (email === 'waad@love.com') visitorName = 'Waad';
      else if (email === 'mahmoud@love.com') visitorName = 'You';
    }
  }

  // Log visit
  const logBody = {
    visitor: visitorName,
    device: deviceType,
    browser,
    user_agent: userAgent.slice(0, 200)
  };

  try {
    await sb.from('visit_logs').insert(logBody);
  } catch (e) {
    // table might not exist yet
  }

  if (!subscriptions || subscriptions.length === 0) {
    return res.json({ sent: 0, message: 'No owner subscribed' });
  }

  const payload = JSON.stringify({
    title: visitorName + ' opened Two Souls 💕',
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
