importScripts('workbox-sw.prod.v2.1.2.js');
const workboxSW = new WorkboxSW();
workboxSW.precache([]);

// <!-- Step 1b: Add service worker lifecycle events -->
self.addEventListener('install', function (event) {
  console.log('%c ServiceWorker installation successful', 'color: #FF00ff');
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
  console.log('%c ServiceWorker activation successful', 'color: #CDDC39');
  event.waitUntil(self.clients.claim());
});
// <!-- Step 1b: Add service worker lifecycle events -->

// <!-- Step 3a: Caching assets from cdn -->
workboxSW.router.registerRoute(/.*(?:googleapis|gstatic)\.com.*$/,
  workboxSW.strategies.cacheFirst({
    cacheName: 'googleapis',
    cacheExpiration: {
      maxEntries: 30
    },
    cacheableResponse: {statuses: [0, 200]}
  })
);
workboxSW.router.registerRoute(/.*(?:cdnjs)(?:\.cloudflare)\.com*/,
  workboxSW.strategies.cacheFirst({
    cacheName: 'cdnjs',
    cacheExpiration: {
      maxEntries: 30
    },
    cacheableResponse: {statuses: [0, 200]}
  })
);
// <!-- Step 3a: Caching assets from cdn -->

// <!-- Step 3b: Caching api responses -->
workboxSW.router.registerRoute(/.*\/api\/search*/,
  workboxSW.strategies.cacheFirst({
    cacheName: 'user',
    cacheExpiration: {
      maxEntries: 30
    },
    cacheableResponse: {statuses: [0, 200]}
  })
);

workboxSW.router.registerRoute(/.*\/api\/upvote*/,
  workboxSW.strategies.networkFirst({
    cacheName: 'user',
    cacheExpiration: {
      maxEntries: 30
    },
    cacheableResponse: {statuses: [0, 200]}
  })
);
// <!-- Step 3b: Caching api responses -->

// <!-- Step 4d: Add push event handler to show notification with configurable options -->
self.addEventListener('push', function(e) {
  var title = e.data.text();
  e.waitUntil(
    self.registration.showNotification(title)
  );
});
// <!-- Step 4d: Add push event handler to show notification with configurable options -->

