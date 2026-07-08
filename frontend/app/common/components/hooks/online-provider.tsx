"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";

import React from "react";

type Props = {
  children: ReactNode;
};
type ContextType = {
  isOnline: boolean;
  isMounted: boolean;
};

const OnlineContext = createContext<ContextType | undefined>(undefined);

const OnlineContextProvider = ({ children }: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  useEffect(() => {
    const handleOnline = () => {
        console.log('Online');
        setIsOnline(true)};
    const handleOffline = () => {
        console.log('Offline');
        setIsOnline(false)};
    const Initial = async () => {
      setIsMounted(true);
      setIsOnline(navigator.onLine);
      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);
    };
    Initial();
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  return (
    <OnlineContext.Provider value={{ isOnline, isMounted }}>
      {children}
    </OnlineContext.Provider>
  );
};

const useOnline = () => {
  const context = useContext(OnlineContext);
  if (context === undefined) {
    throw new Error("useOnline must be used within a OnlineContextProvider");
  }
  return context;
};

export { useOnline };
export default OnlineContextProvider;
