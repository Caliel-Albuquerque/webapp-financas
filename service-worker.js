var cacheName = 'pwaTeste+-v1.2';

self.addEventListener('install', event => {

  self.skipWaiting();

  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll([

        'index.html',

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
        
      ]))
  );
});

self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', function (event) {
  //Atualizacao internet
  event.respondWith(async function () {
     try {
       return await fetch(event.request);
     } catch (err) {
       return caches.match(event.request);
     }
   }());

  //Atualizacao cache
  /*event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );*/

});