const staticCacheName = '543663r2sj233994';


const assets = [
  '/',
  '/index.html',
  '/sw.js',
  '/manifest.json',
  '/js/jq.js',
  '/js/bootstrap.min.js',
  '/js/covid.js',
  '/js/ui-val.js',
  '/js/ui.js',
  '/static/json.js',
  '/static/kannada.json',
  'css/bootstrap.min.css',
  'https://fonts.googleapis.com/css?family=Roboto&display=swap',
];
// install event
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});
// activate event
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== staticCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});
// fetch event
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});