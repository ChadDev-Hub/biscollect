"use client";


import { CircleGauge, Gauge, UtilityPole, Cable, MapPinnedIcon} from "lucide-react";
import Tool from "@/app/common/components/tool";




const Tools = () => {
  const params = new URLSearchParams({
    returnTo: "/menu",
  });
  
  return (
    <div className="grid grid-cols-2 gap-2 w-full ">
      <Tool
        route={`/menu/new-connection?${params.toString()}`}
        label="New Connection"
        icon={<CircleGauge className="text-neutral-content size-6" />}
      />
      <Tool
        route={`/menu/change-meter?${params.toString()}`}
        label="Change Meter"
        icon={<Gauge className="text-neutral-content size-6" />}
      />
      <Tool
        route={`/menu/construction?${params.toString()}`}
        label="Construction"
        icon={<UtilityPole className="text-neutral-content size-6" />}
      />
      <Tool
        route={`/menu/maintenance?${params.toString()}`}
        label="Maintenance"
        icon={<Cable className="text-neutral-content size-6" />}
        isCommingSoon
      />

      <Tool
        route={`/menu/distribution-map?${params.toString()}`}
        label="Distribution Map"
        icon={<MapPinnedIcon className="text-neutral-content size-6" />}
      />
    </div>
  );
};

export default Tools;
