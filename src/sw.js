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

// <!-- Step 3d: Add push event handler to show notification with configurable options -->
self.addEventListener('push', function(event) {
  let body = '';

  if (event.data) {
    body = event.data.text();
    try {
      const {userID, favorite} = JSON.parse(body)
      body = `${userID} has upvoted ${favorite.collectionName}`;
      self.collectionName = favorite.collectionName
      self.artworkUrl = favorite.artworkUrl30;
      self.collectionViewUrl = favorite.collectionViewUrl
    } catch(err) {
      console.error('Error while parsing JSON string', err)
    }

  }

  const options = {
    body: body,
    image: self.artworkUrl,
    icon: 'images/icons/favicon-32x32.png',
    badge: 'images/icons/favicon-32x32.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      { action: 'explore',
        title: 'Explore this collection!',
        icon: self.artworkUrl}
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Music Finder', options)
  );
});
// <!-- Step 3d: Add push event handler to show notification with configurable options -->

// <!-- Step 3d: Add notification click action -->
self.addEventListener('notificationclick', function(event) {

  //Listen to custom action buttons in push notification
  if (event.action === 'explore') {
    console.log(`I ♥ this collection! : ${self.collectionName}`);
    clients.openWindow(self.collectionViewUrl);
  }

  event.notification.close(); //Close the notification

  //To open the app after clicking notification
  const siteUrl = (event.target && event.target.origin) + "/"

  event.waitUntil(
    clients.matchAll({
      type: 'window'
    }).then((clients) => {
      let found = false;
      for (i = 0; i < clients.length; i++) {
        if (clients[i].url.split("#")[0] === siteUrl) {
          // We already have a window to use, focus it.
          found = true;
          clients[i].focus();
          break;
        }
      }
      if (!found) {
        // Create a new window.
        clients.openWindow(siteUrl)
          .then((windowClient) => {
            // do something with the windowClient.
          })
      }
    }).catch((err) => {
      console.error("Error on notificationclick event \n", err);
    })
  );

});
// <!-- Step 3d: Add notification click action -->

// <!-- Step 4a: Add sync handler -->
self.addEventListener('message', function(event) {
  if(event.data[0].eventName === 'upvote') {
    self.upvoteUrl = event.data[0].url;
    self.upvoteRequestItem = event.data[0].requestItem;
  }
});

self.addEventListener('sync', event => {
  if (event.tag == 'upvoteSync') {
    event.waitUntil(
      fetch(self.upvoteUrl, self.upvoteRequestItem)
        .then(res => res.json())
        .then(res => console.log)
        .catch(e => console.log)
    );
  }
});
// <!-- Step 4a: Add sync handler -->

// <!-- Step 5a: Caching assets from cdn -->
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
// <!-- Step 5a: Caching assets from cdn -->

// <!-- Step 5b: Caching api responses -->
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
// <!-- Step 5b: Caching api responses -->

// <!-- Step 6b: Caching api responses -->

// <!-- Step 6b: Caching api responses -->
