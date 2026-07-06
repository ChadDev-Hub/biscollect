"use client";

import { ReactNode } from "react";
import { CircleGauge, Gauge } from "lucide-react";
import Link from "next/link";
type toolType = {
  label: string;
  icon: ReactNode;
  route: string;
};

const Tool = ({ label, icon, route }: toolType) => {
  return (
    <Link
      prefetch
      href={route}
      type="button"
      className="flex btn-neutral btn rounded-2xl flex-col   min-h-32 items-center justify-center p-4 cursor-pointer shadow-md bg-linear-to-r from-primary/20   via-neutral/10 to-primary/20"
    >
      <div className="border-neutral-content border p-4 rounded-full">
        {icon}
      </div>

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
    </div>
  );
};

export default Tools;
