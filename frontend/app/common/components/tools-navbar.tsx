
"use client"

import ReturnMenu from "./return-menu"
import AddEntries from "./add-entry"



const ToolsNavar = () => {
  return (
    <nav className="navbar px-4 bg-base-200 border-base-100">
        <div className="flex-1">
            <ReturnMenu />
        </div>
       
        <div className="flex-none">
            <AddEntries />
        </div>
    </nav>
  )
}

export default ToolsNavar