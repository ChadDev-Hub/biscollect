
"use client"

import {usePathname} from "next/navigation"
import NetWorkBadge from './network-badge';
import DropDownSettings from './drop-down/drop-down-settings';

const NavBarTitle = () =>{
    const path = usePathname()
    switch(path){
        case "/menu/new-connection":
            return "New Connection"
        case "/menu/new-connection/new-entry":
            return "New Connection (new entry)"
        case "/menu/new-connection/full-detail":
            return "New Connection (full detail)"
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
            <h1 className="text-xs font-bold text-primary">
                <NavBarTitle/>
            </h1>
        </div>
        <div className="flex-none flex gap-2 items-center">
            <NetWorkBadge/>
            <DropDownSettings/>
        </div>
    </nav>
  )
}

export default NavBar