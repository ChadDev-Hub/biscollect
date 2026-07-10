import { clientsClaim } from "workbox-core";
import {OfflinePages} from "../lib/offline-page";
clientsClaim();



self.addEventListener("fetch", (event) => {
  if (event.request.mode !== "navigate") return;

  const url = new URL(event.request.url);

  if (
    url.pathname === "/menu/new-connection/full-detail" ||
    url.pathname === "/menu/change-meter/full-detail"
  ) {
    event.respondWith(
      caches.match(event.request, {
        ignoreSearch: true,
      }).then((response) => response || fetch(event.request))
    );
  }
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

// self.addEventListener("activate", (event) => {
//   event.waitUntil(
//     (async () => {
//       const cache = await caches.open("pages-cache");

//       await Promise.all(
//         OfflinePages.map(async (page) => {
//           try {
//             await cache.add(page);
//             console.log("Cached:", page);
//           } catch (err) {
//             console.error("Failed:", page, err);
//           }
//         })
//       );
//     })()
//   );
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