"use client";
import { UtilityPole, CircuitBoard } from "lucide-react";

import Header from "@/app/common/components/header";
import Tool from "@/app/common/components/tool";

const Construction = () => {
  return (
    <div className="bg-base-300 flex flex-col items-center min-h-screen justify-center">
      <Header title="DATA COLLECTION TOOLS" />
      <main className="flex flex-1 w-full max-w-2xl flex-col items-center justify-between py-15 px-4">
        <div className="grid grid-cols-2 gap-2">
          <Tool
            label="Line Construction"
            icon={<UtilityPole className="text-neutral-content size-6" />}
            route="/menu/construction/line-construction"
          />
          <Tool
            label="Transformer Construction"
            icon={<CircuitBoard className="text-neutral-content size-6" />}
            route="/menu/construction/transformer-construction"
            isCommingSoon={true}
          />
        </div>
      </main>
    </div>
  );
};

export default Construction;
