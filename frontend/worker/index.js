import { clientsClaim } from "workbox-core";
import {OfflinePages} from "../lib/offline-page";
clientsClaim();



self.addEventListener("fetch", (event) => {
  if (event.request.mode !== "navigate") return;
  event.respondWith(
    caches.open("pages-cache").then(async(cache) => {
      const cached = await cache.match(event.request, {
        ignoreSearch: true,
      });
      return cached || fetch(event.request);
    })
  )
});



self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open("pages-cache");
      const total = OfflinePages.length;
      for (let i = 0; i < total; i++) {
        const page = OfflinePages[i];
        try {
          const response = await fetch(page, {
            cache: "no-cache"
          })
          if(!response.ok){
            console.log(`Failed to fetch ${page}: ${response.status} ${response.statusText}`);
            continue;
          }
          await cache.put(page, response.clone());
          
          const clients = await self.clients.matchAll({
            type: "window",
            includeUncontrolled: true
          }) 
          clients.forEach((client)=>{
            client.postMessage({
              type: "PRECACHE_PROGRESS",
              current: i+1,
              total,
              page,
            })
          })

          console.log("Cached:", page);
        } catch (err) {
          console.error("Failed:", page, err);
        }
      }
      const clients = await self.clients.matchAll({
        type: "window",
        includeUncontrolled: true
      })
      clients.forEach((client)=>{
        client.postMessage({
          type: "PRECACHE_COMPLETE",
        })
      })
      await self.skipWaiting();
    })()
  );
});
// });



self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== "pages-cache")
          .map((name) => caches.delete(name))
      );
    })
  );
});