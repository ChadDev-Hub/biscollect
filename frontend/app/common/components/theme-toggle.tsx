"use client";
import { useState } from "react";
import { useTheme } from "./theme-provider";
import { Moon, Sun } from "lucide-react";
const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [isActive, setIsActive] = useState(false);
  const handleChange = () => {
    setTheme(() => {
      return theme === "lighttheme" ? "darktheme" : "lighttheme";
    });
    setIsActive(!isActive);
  };

  return (
    // theme toggle
    <button
      className="flex items-center btn justify-between w-full"
      onClick={handleChange}
    >
      <div>
        <span className="">Theme Toggle</span>
      </div>
      <div>
        {isActive ? (
          <label className="swap swap-rotate">
            {/* moon icon */}
            <Moon className={`swap-on  size-8 text-blue-900 fill-blue-900`} />

            {/* sun icon */}
            <Sun
              className={`swap-off size-8 fill-yellow-500 text-yellow-500`}
            />
          </label>
        ) : (
          <label className="swap swap-rotate swap-active">
            <Moon className={`swap-on  size-8 text-blue-900 fill-blue-900`} />

            <Sun
              className={`swap-off size-8 fill-yellow-500 text-yellow-500`}
            />
          </label>
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
