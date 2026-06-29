"use client";
import Link from "next/link";
import { ToolCase } from "lucide-react";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full">
      <div className="p-4 bg-neutral rounded-2xl shadow-xl backdrop-blur-sm animate-bounce">
        <ToolCase className="size-20 text-neutral-content" />
      </div>

      <h1 className="text-3xl font-bold text-center">
        Welcome to BISCOLLECT
      </h1>
      <p className="font text-center italic">
        Collect offline data in the field and sync it to the cloud.
      </p>
      {/* CTA Button */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link href="/menu" type="button" className="group btn relative px-8 py-3.5 font-semibold text-sm bg-neutral">
          <span className="text-white font-bold">Get Started</span>
          <span className="inline-block text-white transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
