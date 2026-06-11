const VAPID_PUBLIC_KEY = 'BNARnjB1L6QMfkukxCgUnYZ2T8z3RVpjRIOIQ5OEBvAoltA8V-CBPQtMz5Q42Ju0p2NuIpgeWpRz8VQilA9H6KQ';
const PUSH_API = '/api/subscribe';

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map(ch => ch.charCodeAt(0)));
}

async function subscribeToPush(email) {
  try {
    const reg = await navigator.serviceWorker.ready;
    let sub = await reg.pushManager.getSubscription();
    if (!sub) {
      sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
      });
    }
    const json = sub.toJSON();
    await fetch(PUSH_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ endpoint: json.endpoint, keys: json.keys, email: email || '' })
    });
  } catch (e) {
    console.warn('Push subscribe failed:', e);
  }
}

window.subscribeToPush = subscribeToPush;

window.claimOwner = async function () {
  for (let attempt = 0; attempt < 20; attempt++) {
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      if (!sub) { await new Promise(r => setTimeout(r, 2000)); continue; }
      const json = sub.toJSON();
      await fetch('/api/claim-owner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endpoint: json.endpoint, keys: json.keys })
      });
      return;
    } catch (e) { await new Promise(r => setTimeout(r, 2000)); }
  }
};

window.requestNotificationPermission = async function (email) {
  if (typeof Notification === 'undefined') return;
  if (Notification.permission === 'granted') {
    subscribeToPush(email);
  } else if (Notification.permission === 'default') {
    const perm = await Notification.requestPermission();
    if (perm === 'granted') subscribeToPush(email);
  }
};
