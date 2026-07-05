import type { NextConfig } from "next";
import withPWA from "next-pwa";


const withPWAConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  additionalManifestEntries: [
    {
      url: "/", revision: null
    },
    {
      url: "/manifest.json", revision: null
    },
    {
      url: "/menu", revision: null
    },
    {
      url: "/menu/new-connection/new-entry", revision: null
    },
    {
      url: "/menu/new-connection", revision: null
    },
    {
      url: "/menu/change-meter", revision: null
    },
    {
      url: "/menu/change-meter/new-entry", revision: null
    },
  ],
  disable: process.env.NODE_ENV === "development",
  runtimeCaching: [
  {
    // App Router navigation (IMPORTANT)
    urlPattern: ({ request }: {request: Request}) =>
      request.mode === "navigate" ||
      request.destination === "document",

    handler: "NetworkFirst",
    options: {
      cacheName: "pages-cache",
      networkTimeoutSeconds: 3,
      expiration: {
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      },
    },
  },

  {
    // Next.js assets (VERY IMPORTANT)
    urlPattern: ({ url }:{url: URL}) =>
      url.pathname.startsWith("/_next/static/"),

    handler: "CacheFirst",
    options: {
      cacheName: "next-static",
      expiration: {
        maxEntries: 200,
        maxAgeSeconds: 365 * 24 * 60 * 60,
      },
    },
  },

  {
    // images
    urlPattern: ({ request }:{request: Request}) =>
      request.destination === "image",

    handler: "CacheFirst",
    options: {
      cacheName: "images",
      expiration: {
        maxEntries: 100,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      },
    },
  },
]
})


const nextConfig: NextConfig = {
  reactStrictMode: true,
  /* config options here */
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "X-Frame-Options",
          value: "DENY",
        },
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin",
        }
      ],
    },
    {
      source: "/sw.js",
      headers: [
        {
          key: "Content-Type",
          value: "application/javascript; charset=utf-8",

        },
        {
          key: "Cache-Control",
          value: "no-cache, no-store, must-revalidate",
        },
        {
          key: "Content-Security-Policy",
          value: "default-src 'self'; script-src 'self'"
        }
      ]
    }
  ]
};

export default withPWAConfig(nextConfig);



