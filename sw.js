self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());

self.addEventListener('push', function (event) {
  let data = { title: 'Two Souls', body: 'A new memory was added!', url: '/' };
  if (event.data) {
    try { data = Object.assign(data, event.data.json()); } catch (e) { data.body = event.data.text(); }
  }
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/img/icon-192.png',
      badge: '/img/icon-192.png',
      image: data.image,
      vibrate: [200, 100, 200],
      dir: data.dir || 'rtl',
      lang: data.lang || 'ar',
      data: { url: data.url }
    })
  );
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});
