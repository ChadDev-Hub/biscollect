"use client";
import ToolsNavar from '../../../common/components/tools-navbar';
import ReturnMenu from '../../../common/components/return-menu';
import AddEntries from '../../../common/components/add-entry';
import ClaudeSyncButton from '../../../common/components/claude-sync-button';
const LineConstruction = () => {
  return (
    <div className="bg-base-300 min-h-screen  flex flex-col items-center">
      <ToolsNavar>
       
        <div className="flex-1">
          <ReturnMenu />
        </div>
        <ClaudeSyncButton />
        <AddEntries />
      </ToolsNavar>
      <main className="flex flex-col gap-2  w-full items-center justify-center py-15 px-4">
      </main>
    </div>
  )
}

export default LineConstruction