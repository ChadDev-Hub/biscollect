"use client";
import { Calendar, User, Hash, Cpu, CloudAlert, CloudCheck } from "lucide-react";
import {useSearchParams} from "next/navigation";

type Props = {
  uuid?: string;
  date: string;
  name: string;
  meter_serial_no: string;
  meter_brand: string;
  type: Type;
  is_synced: boolean;
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
}: Props) {
  const searchParams = useSearchParams();
  
  return (
    <div
      key={uuid}
      className="card w-full max-w-md p-4 bg-base-100 shadow-md border border-base-200 hover:border-primary/20 transition-all duration-300 group"
    >
      {/* Top Accent Bar */}
      <div className="h-1.5 w-full bg-linear-to-r from-primary mb-3 to-secondary rounded-t-2xl" />

      {/* Consumer Name */}
      <div className="flex items-center  gap-3 mb-5">
        <div className="p-2.5 bg-primary/10 text-primary rounded-xl mt-0.5">
          <User className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-base-content tracking-wide mt-0.5">
            {name}
          </h3>
        </div>
        {/* TYPE BADGE */}
        <div className="badge justify-self-end badge-info">{type}</div>

        {/* SYNC INDICATOR */}
        <div className="flex-1 flex justify-end items-center">
          <button
          className="btn btn-ghost btn-circle tooltip tooltip-left tooltip-info"
          title={is_synced ? "Synced" : "Not Synced"}
          data-tip={is_synced ? "Synced" : "Not Synced"}>
            {is_synced ? (
              <CloudCheck className="w-5 h-5 text-success" />
            ) : (
              <CloudAlert className="w-5 h-5 text-warning" />
            )}
          </button>
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
            <div className="text-sm font-bold text-base-content">
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
            <div className="text-sm font-mono font-bold text-base-content">
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
      <div className="card-actions justify-end mt-5">
        <button type="button" className="btn btn-primary btn-sm btn-block normal-case font-medium gap-2 shadow-md shadow-primary/10">
          View Full Details
        </button>
      </div>
    </div>
  );
}
