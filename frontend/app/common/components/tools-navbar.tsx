
"use client"
import {ReactNode} from "react"


type Props = {
    children:ReactNode
    className?:string;
}

const ToolsNavar = ({
    className,
    children
}:Props) => {
  return (
    <nav className={`${className ? className : "flex gap-2 navbar px-4 bg-base-200 border-base-100 "}`}>
        {children}
    </nav>
  )
}

export default ToolsNavar