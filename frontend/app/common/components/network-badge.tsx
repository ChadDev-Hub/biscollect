"use client";
import React from "react";
import { useOnline } from "./hooks/online-provider";
import { Globe, GlobeOff, Loader } from "lucide-react";

const NetWorkBadge = () => {
  const { isOnline, isMounted } = useOnline();
  if (!isMounted) return (
    <div className="badge badge-outline badge-info">
      <Loader className="animate-spin size-4" />
    </div>
  );
  return (
    <div
      className={`badge badge-outline  ${isOnline ? " badge-success" : "badge-warning"}`}
    >
      {isOnline ? (
        <Globe className=" size-4" />
      ) : (
        <GlobeOff className="size-4" />
      )}
      {isOnline ? "Online" : "Offline"}
    </div>
  );
};

export default NetWorkBadge;
