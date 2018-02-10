// <!-- START: {Adding Service Worker} {3} out of {3} -->
importScripts('workbox-sw.prod.v2.1.2.js');
const workboxSW = new WorkboxSW();
workboxSW.precache([]);
// <!-- END: {Adding Service Worker} {3} out of {3} -->

// <!-- START: {Adding Service Worker} {1} out of {3} -->
self.addEventListener('install', function (event) {
  console.log('%c ServiceWorker installation successful', 'color: #FF00ff');
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
  console.log('%c ServiceWorker activation successful', 'color: #CDDC39');
  event.waitUntil(self.clients.claim());
});
// <!-- END: {Adding Service Worker} {1} out of {3} -->

// <!-- START: {Adding Sync} {1} out of {2} -->
self.addEventListener('message', function(event) {
  console.log("SW Received Message", event.data[0]);
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
// <!-- END: {Adding Sync} {1} out of {2} -->


// <!-- START: {Caching files} {1} out of {1} -->
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

workboxSW.router.registerRoute(/.*\/api\/search*/,
  workboxSW.strategies.cacheFirst({
    cacheName: 'user',
    cacheExpiration: {
      maxEntries: 30
    },
    cacheableResponse: {statuses: [0, 200]}
  })
);
// <!-- END:  {Caching files} {1} out of {1} -->

// <!-- START: {Add to homescreen banner } {1} out of {1} -->
self.addEventListener('beforeinstallprompt', function(e) {
  console.log('%c beforeinstallprompt Event fired', 'color: #ff00ff', e.platforms);
  e.userChoice.then(function(choiceResult) {

    console.log(choiceResult.outcome);

    if(choiceResult.outcome == 'dismissed') {
      console.log('%c User cancelled home screen install', 'color: #FF5722');
    }
    else {
      console.log('%c User added to home screen', 'color: #00ff00');
    }
  });
});
// <!-- END: {Add to homescreen banner } {1} out of {1} -->
// <!-- START: {Push } {1} out of {1} -->
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
      console.log('Error while parsing JSON string', err)
    }

  }

  var options = {
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

self.addEventListener('notificationclick', function(event) {

  const siteUrl = (event.target && event.target.origin) + "/"

  console.log('[Service Worker] Notification click Received.');
  //Listen to custom action buttons in push notification
  if (event.action === 'explore') {
    console.log(`I ♥ this collection! : ${self.collectionName}`);
    clients.openWindow(self.collectionViewUrl);
  }

  // event.notification.close(); //Close the notification

  //To open the app after clicking notification
  event.waitUntil(
    clients.matchAll({"type":"window"})
    .then((clients) => {
      let found = false;
      for (i = 0; i < clients.length; i++) {
        if (clients[i].url === siteUrl) {
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
    })
  );
});
// <!-- END: {Push } {1} out of {1} -->


