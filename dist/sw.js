var CACHE_NAME = 'my-site-cache-v1'
var urlsToCache = [
  '/',
  '/main.a915ab5a.css'
]

// Installing the service worker
self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache')
        return cache.addAll(urlsToCache)
      })
      .then(() => self.skipWaiting())
  )
})

// activating the sw
self.addEventListener('activate', event => {
  console.log('Service worker activated')
})

// Cache and return request
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response
        }
        return fetch(event.request)
      }
      ).catch(err => {
        console.log('failed to fetch: ', err)
      })
  )
})
