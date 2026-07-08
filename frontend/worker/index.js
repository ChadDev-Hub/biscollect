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
      await cache.addAll(OfflinePages);
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open("pages-cache");

      await Promise.all(
        OfflinePages.map(async (page) => {
          try {
            await cache.add(page);
            console.log("Cached:", page);
          } catch (err) {
            console.error("Failed:", page, err);
          }
        })
      );
    })()
  );
});