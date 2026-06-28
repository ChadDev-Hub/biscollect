"use client";

import { useTheme } from "./theme-provider";
import { Moon, Sun } from "lucide-react";
const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const handleChange = () => {
    setTheme(() => {
      return theme === "emerald" ? "synthwave" : "emerald";
    });
  };

  return (
    // theme toggle
    <label className="swap swap-rotate">
      <input
        checked={theme === "synthwave"}
        title="Theme Toggle"
        onChange={handleChange}
        type="checkbox"
      />
    
      {/* moon icon */}
      <Moon className={`swap-off size-8 text-blue-900 fill-blue-900`} />

      {/* sun icon */}
      <Sun className={`swap-on size-8 fill-yellow-500 text-yellow-500`} />
    </label>
  );
};

export default ThemeToggle;
