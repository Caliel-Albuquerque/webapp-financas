// var cacheName = 'pwaTeste+-v1.2';

// self.addEventListener('install', event => {

//   self.skipWaiting();

//   event.waitUntil(
//     caches.open(cacheName)
//       .then(cache => cache.addAll([

//         'index.html',

//         './assets/css/main.css',

//         './assets/js/main.js',


//         './assets/img/blog/blog-1.webp',
//         './assets/img/blog/blog-2.webp',
//         './assets/img/blog/blog-3.webp',
//         './assets/img/blog/blog-4.webp',
//         './assets/img/blog/blog-5.webp',
//         './assets/img/blog/blog-6.webp',
//         './assets/img/favicon1.png',
//         './assets/cta-bg.webp'

//       ]))
//   );
// });

// self.addEventListener('message', function (event) {
//   if (event.data.action === 'skipWaiting') {
//     self.skipWaiting();
//   }
// });

// self.addEventListener('fetch', function (event) {
//   //Atualizacao internet
//   event.respondWith(async function () {
//      try {
//        return await fetch(event.request);
//      } catch (err) {
//        return caches.match(event.request);
//      }
//    }());

//   //Atualizacao cache
//   /*event.respondWith(
//     caches.match(event.request)
//       .then(function (response) {
//         if (response) {
//           return response;
//         }
//         return fetch(event.request);
//       })
//   );*/

// });
const CACHE_NAME = 'pwaTeste+-v1.2';
const urlsToCache = [
  '/index.html',
  '/styles/main.css',
  '/script/main.js',
  './assets/css/main.css',

  './assets/js/main.js',


  './assets/img/blog/blog-1.webp',
  './assets/img/blog/blog-2.webp',
  './assets/img/blog/blog-3.webp',
  './assets/img/blog/blog-4.webp',
  './assets/img/blog/blog-5.webp',
  './assets/img/blog/blog-6.webp',
  './assets/img/favicon1.png',
  './assets/cta-bg.webp'
];

self.addEventListener('install', function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // Clone the request because it's a stream and can only be consumed once
        var fetchRequest = event.request.clone();
        // Make a network request and add it to the cache if successful
        return fetch(fetchRequest)
          .then(function (response) {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            // Clone the response because it's a stream and can only be consumed once
            var responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(function (cache) {
                cache.put(event.request, responseToCache);
              });
            return response;
          }
          );
      })
  );
});

self.addEventListener('activate', function (event) {
  // Remove outdated caches
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (cacheName) {
          return cacheName.startsWith('my-site-cache-') && cacheName !== CACHE_NAME;
        }).map(function (cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});