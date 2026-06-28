"use client";
import { ToolCase } from "lucide-react";

const Hero = () => {
  return (
    <>
      <div className="p-4 bg-base-300 rounded-2xl shadow-xl backdrop-blur-sm animate-bounce">
        <ToolCase className="size-20 text-primary" />
      </div>

      {/* CTA Button */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button className="group relative px-8 py-3.5 font-semibold text-sm bg-indigo-600 hover:bg-indigo-500 transition-all duration-200 rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/40 active:scale-95 flex items-center gap-2">
          Get Started
          <span className="inline-block transition-transform group-hover:translate-x-1">
            →
          </span>
        </button>
      </div>
    </>
  );
};

export default Hero;
