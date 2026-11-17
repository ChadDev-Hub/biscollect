
/// <reference lib="esnext" />
/// <reference lib="webworker" />

import {
  Serwist,
  NetworkFirst,
  CacheFirst,
  ExpirationPlugin,
  type PrecacheEntry,
  type SerwistGlobalConfig,
} from "serwist";

import { OfflinePages } from "../lib/offline-page";
import { MapTileProvider } from "../lib/map-assets";
import { defaultCache } from "@serwist/next/worker";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const MAP_CACHE = "map-assets";
const PAGE_CACHE = "pages-cache";

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,

  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,

  runtimeCaching: [
    {
      matcher: ({ request }) => request.mode === "navigate",

      handler: new NetworkFirst({
        cacheName: PAGE_CACHE,
        networkTimeoutSeconds: 3,
        plugins: [
          new ExpirationPlugin({
            maxEntries: 100,
            maxAgeSeconds: 30 * 24 * 60 * 60,
          }),
        ],
      }),
    },

    {
      matcher: ({ url }) =>
        url.pathname === "/maps/style.json" ||
        url.pathname.startsWith("/maps/fonts/") ||
        url.pathname.startsWith("/maps/sprites/"),

      handler: new CacheFirst({
        cacheName: MAP_CACHE,
        plugins: [
          new ExpirationPlugin({
            maxEntries: 300,
            maxAgeSeconds: 30 * 24 * 60 * 60,
          }),
        ],
      }),
    },

    ...defaultCache,
  ],
});

// Register your custom installation logic here.
// Serwist manages its own precaching and activation.
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const total = OfflinePages.length + MapTileProvider.length + 3;
      let current = 0;

      const sendProgress = async (item: string) => {
        current++;

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
      };

      // Offline pages
      const pageCache = await caches.open(PAGE_CACHE);

      for (const page of OfflinePages) {
        try {
          const response = await fetch(page);

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }

          await pageCache.put(page, response.clone());
          await sendProgress(page);
        } catch (error) {
          console.error("Failed to cache page:", page, error);
        }
      }

      // GIS data
      const BASE_URL = process.env.NEXT_PUBLIC_BASESERVERURL;
      console.log(BASE_URL);
      const datasets = [
        {
          url: `${BASE_URL}/v1/wire/conductor`,
          cacheName: "gis-data-conductor",
        },
        {
          url: `${BASE_URL}/v1/wire/neutral`,
          cacheName: "gis-data-neutral-concentric-wire",
        },
        {
          url: `${BASE_URL}/v1/dt/type`,
          cacheName: "gis-data-transformer",
        },
      ];

      for (const dataset of datasets) {
        try {
          const response = await fetch(dataset.url);

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }

          const cache = await caches.open(dataset.cacheName);

          await cache.put(
            new URL(dataset.url).pathname,
            response.clone()
          );

          await sendProgress(dataset.url);
        } catch (error) {
          console.error("Failed to cache GIS data:", dataset.url, error);
        }
      }

      // Map tile provider assets
      const mapCache = await caches.open("maptile-provider");

      for (const provider of MapTileProvider) {
        try {
          await mapCache.add(provider);
          await sendProgress(provider);
        } catch (error) {
          console.error("Failed to cache map provider:", provider, error);
        }
      }

      // Cache completion
      const statusCache = await caches.open("cache-status");

      await statusCache.put(
        "cache-complete",
        new Response("true")
      );

      const clients = await self.clients.matchAll({
        type: "window",
        includeUncontrolled: true,
      });

      clients.forEach((client) => {
        client.postMessage({
          type: "PRECACHE_COMPLETE",
        });
      });
    })()
  );
});

// Let Serwist register its own install, activate and fetch handlers.
serwist.addEventListeners();
