// frontend/components/LineConstruction.tsx
"use client";

import {
  CloudCheck,
  CloudAlert,
  LucideIcon,
  CalendarDays,
} from "lucide-react";
import DeleteRecord from "../../../../common/components/delete";
import Link from "next/link";
import {usePathname} from "next/navigation";
type Props = {
  uuid: string;
  is_synced: boolean;
  title: Title;
  date_accomplished: Date;
  description?: string;
  datetime_synced?: string;
  information: Information[];
};

type Title = {
  title: string;
  icon: LucideIcon;
  className: string;
}

type Information = {
  label: string;
  value: string;
  icon: Icon;
};

type Icon = {
  icon: LucideIcon;
  className: string;
};

const ConstructionCard = ({
  uuid,
  title,
  is_synced,
  datetime_synced,
  description,
  date_accomplished,
  information,
}: Props) => {
  const currentPath = usePathname();
  
  return (
    <div className="card w-full max-w-md  p-4 bg-base-100 shadow-md border border-base-200 hover:border-primary/20 transition-all duration-300 group">
      <div className="h-1.5 w-full bg-linear-to-r from-primary mb-3 to-secondary rounded-t-2xl" />

      <div className="card-body p-0">
        <div className=" flex items-center  gap-3 mb-5">
          <div className="p-2.5 glass  text-primary rounded-xl mt-0.5">
            <title.icon className={title.className} />
          </div>
          {/* TITLE */}
          <div className="flex flex-col">
            <h1 className=" text-[12px] font-bold text-base-content tracking-wide mt-0.5 card-title">
              {title.title}
            </h1>

            <label className="text-xs font-bold text-base-content label ">
              <CalendarDays className="inline-block mr-1 size-3 " />
              {new Date(date_accomplished).toLocaleDateString()}
            </label>
          </div>

          {/* SYNC INDICATOR */}
          <div className="flex-1  flex justify-end items-center">
            <div
              className="btn btn-ghost btn-circle tooltip tooltip-left tooltip-info"
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
                <CloudCheck className="w-5 h-5 text-success" />
              ) : (
                <CloudAlert className="w-5 h-5 text-warning" />
              )}
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}

        <p className="text-xs italic text-base-content">
          {description && description}
        </p>

        <div className="divider my-1 opacity-60"></div>
        {/* INFORMATIONS */}
        <div className="grid grid-cols-2 gap-2">
          {information.map((info, index) => (
            <div
              key={index}
              className="flex items-center gap-2.5 p-2 rounded-xl bg-base-200/40 border border-base-200"
            >
              <div className="p-2.5 glass text-primary rounded-xl mt-0.5">
                <info.icon.icon className={info.icon.className} />
              </div>
              <div className="flex-1 flex flex-col">
                <label className="text-[10px] label font-bold">
                  {info.label}
                </label>
                <p className="text-xs italic">{info.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="divider my-1 opacity-60"></div>
        {/* CARD ACTIONS */}
        <div className="card-actions justify-end">
          <DeleteRecord store="line_constructions" uuid={uuid} />
          <Link
            href={`${currentPath}/full-detail?uuid=${uuid}`}
            className="btn btn-primary btn-sm"
          >
            Full Detail
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConstructionCard;
