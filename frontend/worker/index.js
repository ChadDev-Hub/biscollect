import { clientsClaim } from "workbox-core";
import {OfflinePages} from "./lib/offline-page";
clientsClaim();



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