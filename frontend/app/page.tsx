"use client";
import Header from "./common/components/header";
import Hero from "./common/components/hero";
import InstallationPrompt from "./common/components/installation-prompt";
import InitialCacheProgress from './common/components/initial-cache-progress';


export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-base-300 items-center justify-center font-sans">
      <Header
        title="DATA COLLECTION UTILITY"/>
      <InstallationPrompt />
      <InitialCacheProgress />
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-15 px-16  min-h-screen">
        <Hero />
      </main>   
    </div>
  );
}
