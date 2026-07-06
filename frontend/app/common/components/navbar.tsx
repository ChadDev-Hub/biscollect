
"use client"
import ThemeToggle from "./theme-toggle"
import {usePathname} from "next/navigation"

const NavBarTitle = () =>{
    const path = usePathname()
    switch(path){
        case "/menu/new-connection":
            return "New Connection"
        case "/menu/new-connection/new-entry":
            return "New Connection (new entry)"
        case "/menu/change-meter":
            return "Change Meter"
        case "/menu/change-meter/new-entry":
            return "Change Meter (new entry)"
        case "/menu/change-meter/full-detail":
            return "Change Meter (full detail)"
        default:
            return "BISCOLLECT"
    }
}

const NavBar = () => {
  return (
    <nav className="navbar w-full bg-base-100 shadow-sm px-4">
        <div className="flex-1">
            <h1 className="text-lg font-bold text-primary">
                <NavBarTitle/>
            </h1>
        </div>
        <div className="flex-none">
            <ThemeToggle/>
        </div>
    </nav>
  )
}

export default NavBar