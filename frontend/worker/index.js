import { clientsClaim } from "workbox-core";
import { OfflinePages } from "../lib/offline-page";
import {MapTileProvider} from "../lib/map-assets"

const BaseUrl = process.env.NEXT_PUBLIC_BASESERVERURL

clientsClaim();

self.addEventListener("fetch", (event) => {
  if (event.request.mode !== "navigate") return;
  event.respondWith(
    caches.open("pages-cache").then(async (cache) => {
      const cached = await cache.match(event.request, {
        ignoreSearch: true,
      });
      return cached || fetch(event.request);
    }),
  );
});

self.addEventListener("fetch", (event) => {
    const url = new URL(event.request.url);

    if (url.pathname === "/maps/style.json") {
        event.respondWith(
            caches.open("maptile-provider").then(async (cache) => {
                const cached = await cache.match(event.request);

                return cached || fetch(event.request);
            })
        );

        return;
    }
});

const CONDUCTOR_URL = `${BaseUrl}/v1/wire/conductor`;
const CONDUCOT_CACHE_NAME = "gis-data-conductor";
const NEUTRAL_CONCENTRIC_WIRE = `${BaseUrl}/v1/wire/neutral`
const NEUTRAL_CONCENTRIC_WIRE_CACHE_NAME = "gis-data-neutral-concentric-wire"
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      console.log("Caching offline pages...");
      const cache = await caches.open("pages-cache");
      const total = OfflinePages.length;
      for (let i = 0; i < total; i++) {
        const page = OfflinePages[i];
        try {
          const response = await fetch(page);
          if (!response.ok) {
            console.log(
              `Failed to fetch ${page}: ${response.status} ${response.statusText}`,
            );
            continue;
          }
          await cache.put(page, response.clone());

          const clients = await self.clients.matchAll({
            type: "window",
            includeUncontrolled: true,
          });
          clients.forEach((client) => {
            client.postMessage({
              type: "PRECACHE_PROGRESS",
              current: i + 1,
              total,
              page,
            });
          });
          console.log("Cached:", page);
        } catch (err) {
          console.error("Failed:", page, err);
        }
      }

      // CACHE CONDUCTOR DATA

      try {
        console.log("Caching conductor data...");
        const response = await fetch(CONDUCTOR_URL);
        console.log("Conductor reponse",
          response.status,
          response.statusText
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch conductor data: ${response.status}`
          );
        }
        const conductorCache = await caches.open(CONDUCOT_CACHE_NAME);
        await conductorCache.put(CONDUCTOR_URL, response.clone());
        console.log("Conductor data cached.");
      } catch (err) {
        console.error("Failed:", CONDUCTOR_URL, err);
      }
      

      // CACHE NEUTRAL CONCENTRIC WIRE DATA

      try {
        console.log("Caching neutral concentric wire data...");
        const response = await fetch(NEUTRAL_CONCENTRIC_WIRE);
        console.log("Neutral concentric wire reponse",
          response.status,
          response.statusText
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch conductor data: ${response.status}`
          );
        }
        const neutralConcentricWireCache = await caches.open(NEUTRAL_CONCENTRIC_WIRE_CACHE_NAME);
        await neutralConcentricWireCache.put(NEUTRAL_CONCENTRIC_WIRE, response.clone());
        console.log("Neutral concentric wire data cached.");
      } catch (err) {
        console.error("Failed:", NEUTRAL_CONCENTRIC_WIRE, err);
      }



      // CACHE MAPTILE PROVIDER
      try{
        console.log("Caching maptile provider");
        const cache = await caches.open("maptile-provider");
        cache.addAll(MapTileProvider);
      }catch(err){
        console.error("Failed:", MapTileProvider, err);
      }
      

      const clients = await self.clients.matchAll({
        type: "window",
        includeUncontrolled: true,
      });
      clients.forEach((client) => {
        client.postMessage({
          type: "PRECACHE_COMPLETE",
        });
      });
      await self.skipWaiting();
    })(),
  );
});



