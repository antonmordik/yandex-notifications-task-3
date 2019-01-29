const version = 'v1';
const files = [
  './',
  './index.html',
  './dist/',
  './build.js',
  './build.js.map'
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
      return Promise.all(cacheNames.forEach(name => {
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
})