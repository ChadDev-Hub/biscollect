
"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const registerSW = async () => {
      try {
        const reg = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
        });

        console.log("SW registered:", reg);

        const monitor = (worker: ServiceWorker) => {
          console.log("SW initial state:", worker.state);

          worker.addEventListener("statechange", () => {
            console.log("SW state changed:", worker.state);
          });
        };

        if (reg.installing) monitor(reg.installing);
        if (reg.waiting) monitor(reg.waiting);
        if (reg.active) monitor(reg.active);

        reg.addEventListener("updatefound", () => {
          console.log("SW update found");

          if (reg.installing) {
            monitor(reg.installing);
          }
        });

        navigator.serviceWorker.addEventListener(
          "controllerchange",
          () => {
            console.log("SW is now controlling this page");
          }
        );

        console.log("Registration status:", {
          installing: reg.installing?.state,
          waiting: reg.waiting?.state,
          active: reg.active?.state,
        });
      } catch (error) {
        console.error("SW registration error:", error);
      }
    };

    registerSW();
  }, []);

  return null;
}
