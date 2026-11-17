
import WithSerwistInit from '@serwist/next'
import {NextConfig} from "next"

const withSerwist = WithSerwistInit({
  swSrc: "worker/sw.ts",
  swDest: "public/sw.js",
  register: true,
  disable: process.env.NODE_ENV === "development",
});
const nextConfig: NextConfig = {
  reactStrictMode: false,
  experimental: {
    serverActions:{
      bodySizeLimit: '50mb'
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ]
  }
};


export default withSerwist(nextConfig);