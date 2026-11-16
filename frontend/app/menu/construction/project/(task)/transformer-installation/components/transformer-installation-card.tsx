
"use client";


import React from 'react'
import type { TransformerInstallation } from '@/types/transformer';
import {LucideCarBattery, CalendarDays} from 'lucide-react'
type Props = {
    data: TransformerInstallation
}

const TransformerInstallationCard = ({ data }: Props) => {
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
      <div className="card-body">
        <div className="p-2.5 glass  text-primary rounded-xl mt-0.5">
            <CalendarDays className="inline-block mr-1 size-3 " />
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
      </div>
    </div>
  )
}

export default TransformerInstallationCard