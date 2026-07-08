"use client";

import { ReactNode } from "react";
import { CircleGauge, Gauge, UtilityPole, Cable } from "lucide-react";
import Link from "next/link";
type toolType = {
  label: string;
  icon: ReactNode;
  route: string;
  isCommingSoon?: boolean;
};

const Tool = ({ label, icon, route, isCommingSoon }: toolType) => {
  return (
    <Link
      prefetch
      href={isCommingSoon ? "#" : route}
      type="button"
      className="flex relative btn-neutral btn rounded-2xl flex-col   min-h-32 items-center justify-center p-4 cursor-pointer shadow-md bg-linear-to-r from-primary/20   via-neutral/10 to-primary/20"
    >
      <div className="border-neutral-content border p-4 rounded-full">
        {icon}
      </div>
      {isCommingSoon && <span className="absolute badge-xs glass text-xs z-10 top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 badge badge-info badge-outline">Coming Soon</span>}
      <label className="text-xs font-bold text-neutral-content">{label}</label>
    </Link>
  );
};

const Tools = () => {
  return (
    <div className="grid grid-cols-2 gap-2 w-full ">
      <Tool
        route="/menu/new-connection"
        label="New Connection"
        icon={<CircleGauge className="text-neutral-content size-6" />}
      />
      <Tool
        route="/menu/change-meter"
        label="Change Meter"
        icon={<Gauge className="text-neutral-content size-6" />}
      />
      <Tool
        route="/menu/construction"
        label="Construction"
        icon={<UtilityPole className="text-neutral-content size-6" />}
        isCommingSoon
      />
      <Tool
        route="/menu/maintenance"
        label="Maintenance"
        icon={<Cable className="text-neutral-content size-6" />}
        isCommingSoon
      />
    </div>
  );
};

export default Tools;
