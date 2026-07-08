import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ThemeProvider from "./common/components/theme-provider";
import Navbar from "./common/components/navbar";
import "./globals.css";
import ServiceWorkerRegister from "./common/components/serviceworker-register";
import type { Viewport } from "next";
import OnlineContextProvider from "./common/components/hooks/online-provider";
import Alert from "./common/components/alert";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BisCollect",
  description: "A simple way to collect data in the field and sync it to the cloud.",
  manifest: "/manifest.webmanifest",
  authors: {
    name: "Richard Rojo Jr.",
    url: "https://github.com/ChadDev-Hub"
  },
  openGraph: {
    type:"website",
    title: "BisCollect",
    description: "A simple way to collect data in the field and sync it to the cloud.",
    url: "https://biscollect.biselco79.com",
    siteName: "BisCollect",
    images: [
      {
        url: "https://biscollect.biselco79.com/web-app-manifest-512x512.png",
        width: 512,
        height: 512,
      },
      {
        url: "https://biscollect.biselco79.com/web-app-manifest-192x192.png",
        width: 192,
        height: 192,
      },
    ],
    locale: "en-US",
  }
  
};




export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ServiceWorkerRegister />
        <Alert>
          <OnlineContextProvider>
            <ThemeProvider>
              <Navbar />
              {children}
            </ThemeProvider>
          </OnlineContextProvider>
        </Alert>
      </body>
    </html>
  );
}
