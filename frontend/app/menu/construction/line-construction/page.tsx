"use client";
import ToolsNavar from '../../../common/components/tools-navbar';
import ConductorData from './components/line-constructions-container';
const LineConstruction = () => {
  return (
    <div className="bg-base-300 min-h-screen  flex flex-col items-center">
      <ToolsNavar />
      <main className="flex flex-col gap-2  w-full items-center justify-center py-15 px-4">
          <ConductorData/>
      </main>
    </div>
  )
}

export default LineConstruction