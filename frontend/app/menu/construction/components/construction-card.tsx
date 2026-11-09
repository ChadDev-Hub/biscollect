"use client";
import {
  CalendarDays,
  HardHat,
  CloudCheck,
  CloudAlert,
} from "lucide-react";
import type { ConstructionType } from "@/types/construction";
import Link from "next/link";
type Props = {
  data: ConstructionType;
  onClick?: (data: ConstructionType) => void;
};

const ConstructionCard = ({ data}: Props) => {


  return (
      <div className="card w-full hover:shadow-2xl 
      active:shadow-2xl active:border-primary 
      focus-within:shadow-2xl focus-within:border-primary
      max-w-md  p-4 bg-base-100 shadow-md border border-base-200 hover:border-primary transition-all duration-300 group">
          <div className="card-body rounded-box p-5 gap-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <div
              className={`size-11 rounded-xl flex items-center
              justify-center shrink-0 bg-primary/10 text-primary
             `}
            >
              <HardHat className="size-6" />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-xs  leading-tight ">
                {data.activity}
              </h3>
              <p className="text-xs text-base-content/50 mt-1">
                Project #{data.id ?? "N/A"}
              </p>
            </div>
          </div>

          {/* Sync status */}
          {data.is_synced ? (
            <span className="badge badge-success badge-outline gap-1">
              <CloudCheck size={15} />
              Synced
            </span>
          ) : (
            <span className="badge badge-warning badge-outline gap-1">
              <CloudAlert size={15} />
              Pending
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-base-content/70 leading-relaxed line-clamp-3">
          {data.description}
        </p>

        <div className="divider my-0 opacity-60" />

        {/* Footer */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs text-base-content/50">
            <CalendarDays size={15} />
            <time dateTime={data.date}>
              {new Date(data.date).toLocaleDateString("en-PH", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
          </div>

          <Link href={`/menu/construction/project?cuuid=${data.uuid}`}
            className="text-xs font-semibold text-primary
              opacity-70 group-hover:opacity-100 transition-opacity group-active:opacity-100 group-focus-within:opacity-100"
          >
            View details →
          </Link>
        </div>
      </div>

      </div>
      
  );
};

export default ConstructionCard;
