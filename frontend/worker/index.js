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


self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  if (
    url.pathname.startsWith("/maps/fonts/") ||
    url.pathname.startsWith("/maps/sprites/")
  ) {
    event.respondWith(
      caches.open(MAP_CACHE).then(async (cache) => {
        const cached = await cache.match(event.request);

        if (cached) {
          return cached;
        }

        try {
          const response = await fetch(event.request);

          if (response.ok) {
            await cache.put(event.request, response.clone());
          }

          return response;
        } catch (error) {
          console.error("Offline map asset unavailable:", url.pathname);
          throw error;
        }
      })
    );
  }
});

const CONDUCTOR_URL = `${BaseUrl}/v1/wire/conductor`;
const CONDUCTOR_CACHE_URL = "/v1/wire/conductor"
const CONDUCOT_CACHE_NAME = "gis-data-conductor";
const NEUTRAL_CONCENTRIC_WIRE = `${BaseUrl}/v1/wire/neutral`
const NEUTRAL_CONCENTRIC_WIRE_CACHE_URL = "/v1/wire/neutral"
const NEUTRAL_CONCENTRIC_WIRE_CACHE_NAME = "gis-data-neutral-concentric-wire"
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const sendProgres = async(current, total, item)=>{
        const clients = await self.clients.matchAll({
          type: "window",
          includeUncontrolled: true,
        });
        clients.forEach((client) => {
          client.postMessage({
            type: "PRECACHE_PROGRESS",
            current,
            total,
            item,
          });
        });
      }  
      console.log("Caching offline pages...");
      
      const total = OfflinePages.length + 2 + MapTileProvider.length;
      let current = 0;

      
      const Pagecache = await caches.open("pages-cache");
      for (const page of OfflinePages) {
        try {
          const response = await fetch(page);
          if (!response.ok) {
            console.log(
              `Failed to fetch ${page}: ${response.status} ${response.statusText}`,
            );
            continue;
          }
          await Pagecache.put(page, response.clone());
          current ++;
          await sendProgres(current, total, page);
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
        await conductorCache.put(CONDUCTOR_CACHE_URL, response.clone());
        current++;
        sendProgres(current, total, CONDUCTOR_URL);
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
        await neutralConcentricWireCache.put(NEUTRAL_CONCENTRIC_WIRE_CACHE_URL, response.clone());
        current++;
        sendProgres(current, total, NEUTRAL_CONCENTRIC_WIRE);
        console.log("Neutral concentric wire data cached.");
      } catch (err) {
        console.error("Failed:", NEUTRAL_CONCENTRIC_WIRE, err);
      }



      // CACHE MAPTILE PROVIDER
      try{
        console.log("Caching maptile provider");
        const Mapcache = await caches.open("maptile-provider");
        

        for (const provider of MapTileProvider){
          try{
            await Mapcache.add(provider);
            current ++;
            await sendProgres(current, total, provider);
          }catch(err){
            console.error("Failed to open the maptile provider:", provider, err);
          }
        }
      }catch(err){
        console.error("Failed:", MapTileProvider, err);
      }


      try {
        console.log("Cache Complete Status");
        const CacheStatus = await caches.open("cache-status");
        await CacheStatus.put("cache-complete", new Response(true));
      } catch (err) {
        console.error("Failed:", "cache-status", err);
      }
      
      await self.skipWaiting();

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



