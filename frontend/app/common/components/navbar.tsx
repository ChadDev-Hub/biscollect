
"use client"
import ThemeToggle from "./theme-toggle"

const NavBar = () => {
  return (
    <nav className="navbar w-full bg-base-300 shadow-sm px-4">
        <div className="flex-1">
            <h1 className="text-lg font-bold text-primary">
                BISCOLLECT
            </h1>
        </div>
        <div className="flex-none">
            <ThemeToggle/>
        </div>
    </nav>
  )
}

export default NavBar