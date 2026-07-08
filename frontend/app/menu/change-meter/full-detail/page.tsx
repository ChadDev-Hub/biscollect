"use client";
import DetailForm from "./components/detail-form";
import ReturnMenu from "@/app/common/components/return-menu";
import {Suspense} from "react"

const FullDetail = () => {
  return (
    <div className="bg-base-300 min-h-screen  flex flex-col items-center">
        <header className="w-full p-4">
            <ReturnMenu />
        </header>
      <main className="flex flex-col gap-2 w-full max-w-lg place-content-center place-items-center justify-between py-15 px-2">
        <Suspense fallback={<div>Loading...</div>}>
          <DetailForm />
        </Suspense>
        
      </main>
    </div>
  );
};

export default FullDetail;
