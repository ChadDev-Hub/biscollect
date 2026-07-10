"use client";
import { useEffect, useState } from "react";

const InitialCacheProgress = () => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
        const catched = localStorage.getItem("precache_complete");
        if (catched !== "true") {
            setVisible(true);
        }
      switch (e.data.type) {
        case "PRECACHE_PROGRESS":
          setProgress(Math.round((e.data.current / e.data.total) * 100));
          break;
        case "PRECACHE_COMPLETE":
          localStorage.setItem("precache_complete", "true");
          setProgress(100);
          setTimeout(() => {
            setVisible(false);
          }, 500);
          break;
        default:
          break;
      }
    };
    navigator.serviceWorker.addEventListener("message", onMessage);
    return () => {
      navigator.serviceWorker.removeEventListener("message", onMessage);
    };
  }, []);
  if (!visible) return null;
  return (
    <div className="w-80">
      <progress
        className="progress progress-primary w-full"
        value={progress}
        max={100}
      />
      <p className="text-xs">
        <span className="skeleton skeleton-text">Downloading Resources</span>{" "}
        <span>{progress}%</span>
      </p>
    </div>
  );
};

export default InitialCacheProgress;
