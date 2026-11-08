
"use client"
import {ReactNode} from "react"


type Props = {
    children:ReactNode
}

const ToolsNavar = ({
    children
}:Props) => {
  return (
    <nav className="flex gap-2 navbar px-4 bg-base-200 border-base-100">
        {children}
    </nav>
  )
}

export default ToolsNavar