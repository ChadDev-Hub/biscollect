"use client";


import { CircleGauge, Gauge, UtilityPole, Cable } from "lucide-react";
import Tool from "@/app/common/components/tool";




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
      />
      <Tool
        route="/menu/maintenance"
        label="Maintenance"
        icon={<Cable className="text-neutral-content size-6" />}
        isCommingSoon
      />

      <Tool
        route="/menu/distribution-map"
        label="Distribution Map"
        icon={<UtilityPole className="text-neutral-content size-6" />}
      />
    </div>
  );
};

export default Tools;
