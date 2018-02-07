<!-- START: {Adding Service Worker} {1} out of {2} -->
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/PWA-sw.js').then(function (registration) {
      // Registration was successful
      console.log('%c ServiceWorker registration successful', 'color: #00ab07');
    }, function (err) {
      // registration failed :(
      console.log('%c ServiceWorker registration failed', 'color: #ca0d2c');
      console.log(err)
    });
  });
}

self.addEventListener('install', function (event) {
  console.log('%c ServiceWorker install method', 'color: #FF5722');
});

self.addEventListener('activate', event => {
  console.log('%c ServiceWorker activate method', 'color: #CDDC39');
});
<!-- END: {Adding Service Worker} {1} out of {2} -->
