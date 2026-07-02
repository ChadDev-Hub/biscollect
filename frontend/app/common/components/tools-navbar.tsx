
"use client"

import ReturnMenu from "./return-menu"
import AddEntries from "./add-entry"
import ClaudeSyncButton from './claude-sync-button';



const ToolsNavar = () => {
  return (
    <nav className="flex gap-2 navbar px-4 bg-base-200 border-base-100">
        <div className="flex-1">
            <ReturnMenu />
        </div>
       
        <div className="flex-none">
            <AddEntries />
        </div>

        <div>
            <ClaudeSyncButton />
        </div>
    </nav>
  )
}

export default ToolsNavar