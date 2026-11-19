"use client";

import React from "react";
import type { TransformerInstallation } from "@/types/transformer";
import Link from "next/link";

import { usePathname } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useAppDispatch } from '@/app/hooks';
import { pushUrl } from "@/app/common/slice/navigationSlice";
import {
  CarBattery,
  CalendarDays,
  CloudAlert,
  CloudCheck,
  Workflow,
  Zap,
} from "lucide-react";
type Props = {
  children: React.ReactNode;
  data: TransformerInstallation;
};

const TransformerInstallationCard = ({ data, children }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const handleNavigate = () => {
    const url = `${pathname}?${searchParams.toString()}`;
    dispatch(pushUrl(url));
  };

  return (
    <div
      className="
    card 
    w-full max-w-md
     p-4 bg-base-100 
     shadow-md border
      border-base-200 
      transition-all 
      duration-300 
      group 
      hover:shadow-2xl
      hover:border-primary
      active:shadow-2xl 
      active:border-primary"
    >
      <div className="h-1.5 w-full bg-linear-to-r from-primary mb-3 to-secondary rounded-t-2xl" />
      <div className="card-body p-2">
        {/* ICON */}
        <div className="flex gap-3">
          <div className="p-2.5 glass  text-primary rounded-xl mt-0.5">
            <CarBattery className="inline-block mr-1 size-5" />
          </div>
          {/* TITLE */}
          <div className="flex flex-col">
            <h1 className=" text-[12px] font-bold text-base-content tracking-wide mt-0.5 card-title">
              {data.task}
            </h1>

            <label className="text-xs font-bold text-base-content label ">
              <CalendarDays className="inline-block mr-1 size-3 " />
              {data.date}
            </label>
          </div>

          {/* SYNC STATUS */}
          <div className="flex-1  flex justify-end items-center">
            <div
              className="btn btn-ghost btn-circle tooltip tooltip-left tooltip-info"
              title={data.is_synced ? "Synced" : "Not Synced"}
            >
              <div className="tooltip-content">
                <div className="p-2 text-center">
                  <h1 className="text-sm font-bold">
                    {data.is_synced ? "Synced" : "Not Synced"}
                  </h1>
                  <p className="text-xs italic">
                    {data.is_synced ? `${data.datetime_synced}` : ""}
                  </p>
                </div>
              </div>
              {data.is_synced ? (
                <CloudCheck className="w-5 h-5 text-success" />
              ) : (
                <CloudAlert className="w-5 h-5 text-warning" />
              )}
            </div>
          </div>
        </div>

        <div className="py-1 w-full place-items-center">
          <p>{data.use_type}</p>
        </div>

        <div className="divider my-1 opacity-60"></div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-base-200/40 border border-base-200">
            <div className="p-2.5 glass text-primary rounded-xl mt-0.5">
              <Workflow className="w-5 h-5" />
            </div>
            <div className="flex-1 flex flex-col">
              <label className="text-[10px] label font-bold">Phasing</label>
              <p className="text-xs italic">{data.phasing}</p>
            </div>
          </div>
          {/* NEUTRAL */}
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-base-200/40 border border-base-200">
            <div className="p-2.5 glass text-primary rounded-xl mt-0.5">
              <Zap className="w-5 h-5" />
            </div>
            <div className="flex-1 flex flex-col">
              <label className="text-[10px] label font-bold">Transformer Type</label>
              <p className="text-xs italic">{data.transformer_type}</p>
            </div>
          </div>
        </div>

        <div className="divider my-1 opacity-60"></div>

        <div className="card-actions justify-end">
          {children}
          <Link
            onClick={handleNavigate}
            href={`${pathname}/transformer-installation/full-detail?uuid=${data.uuid}`}
            className="btn btn-primary btn-sm"
          >
            Full Detail
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TransformerInstallationCard;
