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

function detectOSVersion(ua) {
  if (!ua) return '';
  let m;
  m = ua.match(/iPhone OS ([\d_]+)/);
  if (m) return 'iOS ' + m[1].replace(/_/g, '.');
  m = ua.match(/Android ([\d.]+)/);
  if (m) return 'Android ' + m[1];
  m = ua.match(/Windows NT ([\d.]+)/);
  if (m) return 'Windows ' + m[1];
  m = ua.match(/Mac OS X ([\d_]+)/);
  if (m) return 'macOS ' + m[1].replace(/_/g, '.');
  return '';
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

  const { visitorEndpoint, screenSize } = req.body || {};
  const userAgent = req.headers['user-agent'] || '';
  const deviceType = detectDevice(userAgent);
  const browser = detectBrowser(userAgent);
  const osVersion = detectOSVersion(userAgent);

  const country = req.headers['x-vercel-ip-country'] || '';
  const city = req.headers['x-vercel-ip-city'] || '';
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || '';

  const sb = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );

  // Identify visitor
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

  // Log visit with geo data
  let visitId = null;
  const logBody = {
    visitor: visitorName,
    device: deviceType,
    browser,
    country,
    city,
    ip,
    screen_size: screenSize || '',
    os_version: osVersion,
    user_agent: userAgent.slice(0, 200)
  };

  try {
    const { data: inserted } = await sb
      .from('visit_logs')
      .insert(logBody)
      .select('id');
    if (inserted && inserted.length > 0) visitId = inserted[0].id;
  } catch (e) {
    // table might not exist yet
  }

  // Send push notification to owner
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

  if (!subscriptions || subscriptions.length === 0) {
    return res.json({ sent: 0, visitId, message: 'No owner subscribed' });
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

  res.json({ sent, expired: expired.length, visitId });
}
