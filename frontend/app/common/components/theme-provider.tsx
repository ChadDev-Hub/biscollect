"use client"
import {createContext, useContext, ReactNode, Dispatch, SetStateAction, useEffect, useState} from "react"


type Props = {
  children: ReactNode
}

type ThemeContextType = {
  theme: string
  setTheme: Dispatch<SetStateAction<string>>
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const ThemeProvider = ({children}: Props) => {
  const [theme, setTheme] = useState<string>("lighttheme");

  // INITIAL THEME LOADS
  useEffect(() => {
    const setInitialTheme = () => {
      const userPreferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "darktheme" : "lighttheme";
      setTheme(userPreferredTheme);
    }
    setInitialTheme();
  },[])
  // CHANGE THEME EFFECTS
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}

// Custome Theme Hook
const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

export default ThemeProvider
export {useTheme}