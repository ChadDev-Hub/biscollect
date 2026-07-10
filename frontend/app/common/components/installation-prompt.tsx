"use client";
import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
}

const InstallationPrompt = () => {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  useEffect(() => {
    const SetIos = () => {
      setIsIOS(
        /iPad|iPhone|iPod/.test(navigator.userAgent) &&
          !(window as Window & { MSStream?: unknown }).MSStream,
      );
    };
    SetIos();

    const SetStandAlone = () => {
      setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);
    };
    SetStandAlone();

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  if (isStandalone) {
    return null; // Don't show install button if already installed
  }
  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
    }
    const choice = await deferredPrompt?.userChoice;
    if (choice?.outcome === "accepted") {
      console.log("User accepted the installation");
    } else {
      console.log("User dismissed the installation");
    }
    setDeferredPrompt(null);
  };
  return (
    <>
      <div className="w-full text-sm flex gap-2 items-center py-4 px-8">
        <h3>Install App</h3>
        <button type="button" onClick={handleInstall} className="btn">
          Add to Home Screen
        </button>
      </div>
      {isIOS && (
        <div className="px-8 text-sm">
          <p>
            To install this app on your iOS device, tap the share button
            <span role="img" aria-label="share icon">
              {" "}
              ⎋{" "}
            </span>
            {`and then "Add to Home Screen"`}
            <span role="img" aria-label="plus icon">
              {" "}
              ➕{" "}
            </span>
            .
          </p>
        </div>
      )}
    </>
  );
};

export default InstallationPrompt;
