"use client";
import ToolsNavar from "../../common/components/tools-navbar";
import ChangeMeterContainer from "./components/change-meter-container";
const ChageMeters = () => {
  return (
    <div className="bg-base-300 min-h-screen  flex flex-col items-center">
      <ToolsNavar />
      <main className="grid grid-cols-1  w-full max-w-2xl place-content-center place-items-center justify-between py-15 px-4">
          <ChangeMeterContainer  />
      </main>
    </div>
  )
}

export default ChageMeters