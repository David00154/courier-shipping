// call Install Event
const cacheName = "trading-site-cache";
// console.log("Installing");
self.addEventListener("install", (e) => {
  // console.log("Service Worker: Installing...");
  // e.waitUntil(
  // 	caches
  // 		.open(cacheName)
  // 		.then((cache) => {
  // 			console.log("Service Worker: Caching Assets");
  // 			cache.addAll(cacheAssets);
  // 		})
  // 		.then(() => self.skipWaiting())
  // );
  console.log("Service Worker: Installed");
});

// call Activate Event

self.addEventListener("activate", (e) => {
  console.log("Service Worker: Activated");
  // Remove Unwanted Cache
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            // console.log('Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (e) => {
  console.log("Service Worker: Fetching...");
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        let resClone = res.clone();
        caches
          .open(cacheName)
          .then((cache) => {
            // console.log('Service Worker: Caching Assets')
            cache.put(e.request, resClone);
          })
          .then(() => self.skipWaiting());
        return res;
      })
      .catch((err) => caches.match(e.request).then((res) => res))
  );
});
