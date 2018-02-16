importScripts('workbox-sw.prod.v2.1.2.js');
const workboxSW = new WorkboxSW();
workboxSW.precache([]);

const cdnUrls = [
	'https://fonts.googleapis.com/icon?family=Material+Icons',
	'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css',
	'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js',
	'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js',
	'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/fonts/roboto/Roboto-Regular.woff2',
	'https://fonts.gstatic.com/s/materialicons/v36/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
	'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/fonts/roboto/Roboto-Regular.woff'
];

// <!-- Step 1b: Add service worker lifecycle events -->
self.addEventListener('install', function (event) {
  console.log('%c ServiceWorker installation successful', 'color: #FF00ff');
		
	event.waitUntil(Promise.all([
		self.skipWaiting,
		caches.open('cdnprecache').then(
			function(cache) {
				cache.addAll(cdnUrls)
			}
		)
	]));
});

self.addEventListener('fetch', function(event) {
	const matchedCdnUrl = cdnUrls.filter(function(url) { return url === event.request.url });
	console.log(matchedCdnUrl);
	if (matchedCdnUrl.length) {
		event.respondWith(caches.open('cdnprecache').then(function(cache) {
			return cache.match(event.request).then(function(response) {
				return response;
			});
		}));
	} else {
		event.respondWith(fetch(event.request));
	}
});

self.addEventListener('activate', event => {
  console.log('%c ServiceWorker activation successful', 'color: #CDDC39');
  event.waitUntil(self.clients.claim());
});
// <!-- Step 1b: Add service worker lifecycle events -->
