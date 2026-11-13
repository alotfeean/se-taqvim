// Generated at build time — offline support for the web / iPhone app.
const CACHE = 'se-taqvim-1.7.1-34ac9fd1-27cce01f';
const FILES = ["./","./index.html","./apple-touch-icon.png","./assets/core-ZtSjWR0z.js","./assets/dist-js-B9D8asqC.js","./assets/dist-js-Cy3G40MH.js","./assets/dist-js-kpSn1YzZ.js","./assets/event-CRkWERok.js","./assets/app-27cce01f6d.bin","./assets/noto-nastaliq-urdu-arabic-700-normal-CV4fHIsl.woff2","./assets/noto-nastaliq-urdu-arabic-700-normal-DLTMJhMG.woff","./assets/vazirmatn-arabic-300-normal-BYd1kBEw.woff2","./assets/vazirmatn-arabic-300-normal-DLHw88_k.woff","./assets/vazirmatn-arabic-400-normal-C4W5XURk.woff","./assets/vazirmatn-arabic-400-normal-DMZFCm7K.woff2","./assets/vazirmatn-arabic-500-normal-C_lbnnKa.woff2","./assets/vazirmatn-arabic-500-normal-Dqq3-xo3.woff","./assets/vazirmatn-arabic-700-normal-B5nPuCFv.woff","./assets/vazirmatn-arabic-700-normal-Dge_DOjm.woff2","./assets/vazirmatn-latin-400-normal-BT_DHTc7.woff2","./assets/vazirmatn-latin-400-normal-GKyMcI03.woff","./assets/vazirmatn-latin-700-normal-9BlbvDRV.woff2","./assets/vazirmatn-latin-700-normal-DrB0PBU6.woff","./icon-192.png","./icon-512.png","./icon-maskable-512.png","./manifest.webmanifest"];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('se-taqvim-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  if (req.mode === 'navigate') {
    // Fresh page when online (to pick up updates), the stored one when not — or when the network is slow.
    e.respondWith(new Promise((resolve) => {
      let done = false;
      const fallback = () => caches.match('./index.html').then((r) => r || caches.match('./')).then((r) => { if (!done && r) { done = true; resolve(r); } });
      const timer = setTimeout(fallback, 3000);
      fetch(req).then((res) => {
        clearTimeout(timer);
        if (res.ok) caches.open(CACHE).then((c) => c.put('./index.html', res.clone()));
        if (!done) { done = true; resolve(res); }
      }).catch(() => { clearTimeout(timer); fallback().then(() => { if (!done) { done = true; resolve(Response.error()); } }); });
    }));
    return;
  }
  e.respondWith(caches.match(req, { ignoreSearch: true, ignoreVary: true }).then((hit) => hit || fetch(req)));
});
