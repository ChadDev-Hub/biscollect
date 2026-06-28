import Header from "./common/components/header";
import Hero from "./common/components/hero";
export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans ">
      <Header
        title="DATA COLLECTION UTILITY"/>
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16  sm:items-start">
        <Hero />
      </main>   
    </div>
  );
}
