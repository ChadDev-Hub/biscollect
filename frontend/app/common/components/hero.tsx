"use client";
import Link from "next/link";
import { ToolCase } from "lucide-react";
import {Loader} from "lucide-react"
import {useState, useEffect} from "react"


const Hero = () => {
  const [serviceWorkerActive, setServiceWorkerActive] = useState(false);
  useEffect (() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then(() => {
        setServiceWorkerActive(true);
      });
    }
  },[]);
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full">
      <div className="bg-neutral rounded-2xl shadow-xl backdrop-blur-sm p-4 animate-pulse">
        <div className="p-4 relative rounded-box ">
          <ToolCase className="size-10 text-orange-500" />
      </div>

      </div>
      

      <h1 className="text-3xl font-bold text-center">
        Welcome to BISCOLLECT
      </h1>
      <p className="font text-center italic">
        Collect offline data in the field and sync it to the cloud.
      </p>
      {/* CTA Button */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {
            serviceWorkerActive ? 
          <Link  href="/menu" type="button" className={`group btn relative px-8 py-3.5 font-semibold text-sm bg-neutral`}>
          <span className="text-white font-bold">Get Started</span>
          <span className="inline-block text-white transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link> : 
  
          <label className="group flex flex-col items-center gap-2 justify-center">
              <p className="skeleton skeleton-text">Preparing Services</p>
              <Loader className="animate-spin text-primary" />
          </label>
          
     
        
        }
      </div>
    </div>
  );
};

export default Hero;
