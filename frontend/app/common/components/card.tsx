"use client";
import {
  Calendar,
  User,
  Hash,
  Cpu,
  CloudAlert,
  CloudCheck,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "@/app/hooks";
import { pushUrl } from "@/app/common/slice/navigationSlice";
import Delete from "./delete";

type Props = {
  uuid: string;
  date: string;
  name: string;
  meter_serial_no: string;
  meter_brand: string;
  type: Type;
  is_synced?: boolean;
  datetime_synced?: string;
};

type Type = "CM" | "NC";

export default function MeterAccomplishedCard({
  uuid,
  date,
  name,
  meter_serial_no,
  meter_brand,
  type,
  is_synced,
  datetime_synced,
}: Props) {
  const currentPath = usePathname();
  const params = new URLSearchParams({
    uuid: uuid,
  });
  let store = "";
  let detailLink = "";
  switch (currentPath) {
    case "/menu/change-meter":
      detailLink = `/menu/change-meter/full-detail?${params.toString()}`;
      store = "change_meters";
      break;
    case "/menu/new-connection":
      detailLink = `/menu/new-connection/full-detail?${params.toString()}`;
      store = "new_connections";
      break;
    default:
      break;
  }
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(pushUrl(currentPath));
  };
  return (
    <div
      key={uuid}
      className="card w-full relative max-w-md p-4 bg-base-100 shadow-md border border-base-200 hover:border-primary/20 transition-all duration-300 group"
    >
      {/* Top Accent Bar */}
      <div className="h-1.5 w-full bg-linear-to-r from-primary mb-3 to-secondary rounded-t-2xl" />

      {/* Consumer Name */}
      <div className="flex items-center  gap-3 mb-5">
        <div className="p-2.5 bg-primary/10 text-primary rounded-xl mt-0.5">
          <User className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-[12px] font-bold text-base-content tracking-wide mt-0.5">
            {name}
          </h3>
        </div>
        {/* TYPE BADGE */}
        <div className="badge badge-xs justify-self-end badge-info">{type}</div>

        {/* SYNC INDICATOR */}
        <div className="absolute top-6 right-4">
          <div
            className="btn btn-ghost w-full btn-circle tooltip tooltip-left tooltip-info"
            title={is_synced ? "Synced" : "Not Synced"}
          >
            <div className="tooltip-content">
              <div className="p-2 text-center">
                <h1 className="text-sm font-bold">
                  {is_synced ? "Synced" : "Not Synced"}
                </h1>
                <p className="text-xs italic">
                  {is_synced ? `${datetime_synced}` : ""}
                </p>
              </div>
            </div>
            {is_synced ? (
              <span className="badge badge-success badge-outline">
                <CloudCheck size={15} />
              </span>
            ) : (
              <span className="badge badge-error badge-outline">
                <CloudAlert size={15} />
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="divider my-1 opacity-60"></div>

      {/* Technical Grid Info */}
      <div className="grid grid-cols-2 gap-4 my-2">
        {/* Meter Brand */}
        <div className="flex items-center gap-2.5 p-2 rounded-xl bg-base-200/40 border border-base-200">
          <div className="p-1.5 bg-secondary/10 text-secondary rounded-lg">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider font-semibold text-base-content/40">
              Brand
            </div>
            <div className="text-[12px] font-bold text-base-content">
              {meter_brand}
            </div>
          </div>
        </div>

        {/* Meter Serial Number */}
        <div className="flex items-center gap-2.5 p-2 rounded-xl bg-base-200/40 border border-base-200">
          <div className="p-1.5 bg-accent/10 text-accent rounded-lg">
            <Hash className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider font-semibold text-base-content/40">
              Serial No.
            </div>
            <div className="text-[12px] font-mono font-bold text-base-content">
              {meter_serial_no}
            </div>
          </div>
        </div>
      </div>

      <div className="divider my-1 opacity-60"></div>

      {/* Card Footer / Date */}
      <div className="flex justify-between items-center mt-3 pt-1">
        <div className="flex items-center gap-2 text-base-content/60">
          <Calendar className="w-4 h-4 text-base-content" />
          <span className="text-xs font-medium">Date Accomplished</span>
        </div>
        <div className="text-sm font-semibold text-base-content">
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      </div>

      {/* Action Button Option */}
      <div className="card-actions justify-end items-center mt-5">
        {/* DELETE BUTTON */}
        <Delete store={store} uuid={uuid} />
        {/* FULL DETAIL BUTTON */}
        <Link
          onClick={handleClick}
          href={detailLink}
          type="button"
          className="btn btn-primary btn-sm  normal-case font-medium gap-2 shadow-md shadow-primary/10"
        >
          View Full Details
        </Link>
      </div>
    </div>
  );
}
