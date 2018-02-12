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

// <!-- Step 3b: Add push event handler to show notification with configurable options -->
// <!-- Step 3b: Add push event handler to show notification with configurable options -->

// <!-- Step 3c: Add notification click action -->
// <!-- Step 3c: Add notification click action -->
