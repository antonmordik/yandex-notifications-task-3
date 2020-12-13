const version = 'v1';
const files = [
  './',
  './favicon.ico',
  './index.html',
  './dist/main.js',
  './dist/assets/Calendar.png'
  ];

self.addEventListener('install', event => {
  console.log('installing sw.js');
  event.waitUntil(
    caches.open(version)
      .then(cache => cache.addAll(files)
        .then(() => {
          console.log('All files added to cache!');
      })
    )
  )
});

self.addEventListener('activate', event => {
  console.log('activating sw.js');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(cacheNames.map(name => {
        if (name !== version) {
          console.log('removing files from cache');
          return caches.delete(name);
        }
      }))
    })
  )
})

self.addEventListener('fetch', event => {
  console.log('fetching url: ', event.request.url);
  event.respondWith(caches.match(event.request)
    .then(cacheResponse => {
      if (cacheResponse) {
        console.log('found in cache');
        return cacheResponse;
      }
      fetch(event.request)
    })
  );
})