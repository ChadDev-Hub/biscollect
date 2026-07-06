import type { NextConfig } from "next";
import withPWA from "next-pwa";

const withPWAConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  customWorkerDir: "worker",
  runtimeCaching: [
    // RSC / Flight data
    {
      urlPattern: ({ request }: { request: Request }) => request.headers.has("RSC"),
      handler: "NetworkFirst",
      options: {
        cacheName: "rsc-cache",
        networkTimeoutSeconds: 3,
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 24 * 60 * 60,
        },
      },
    },

    // HTML Pages
    {
      urlPattern: ({ request }: { request: Request }) => request.mode === "navigate",
      handler: "NetworkFirst",
      options: {
        cacheName: "pages-cache",
        networkTimeoutSeconds: 3,
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        },
      },
    },

    // JS / CSS
    {
      urlPattern: /\/_next\/static\/.+/,
      handler: "CacheFirst",
      options: {
        cacheName: "next-static",
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 365 * 24 * 60 * 60,
        },
      },
    },

    // Fonts
    {
      urlPattern: /\.(?:woff|woff2|ttf|otf)$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "fonts",
      },
    },

    // Images
    {
      urlPattern: /\.(?:png|jpg|jpeg|gif|svg|webp|ico)$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "images",
      },
    },
  ],
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default withPWAConfig(nextConfig);