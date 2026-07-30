const C = 'redress-v1';
const ASSETS = ['./', './index.html', './kernel/redress.mjs', './manifest.webmanifest'];
self.addEventListener('install', e => e.waitUntil(caches.open(C).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(res => {
    const cp = res.clone(); caches.open(C).then(c => c.put(e.request, cp)); return res;
  }).catch(() => caches.match('./index.html'))));
});
