"use client";

import React from "react";
import { ConsumerMeter } from "@/types/consumer-meter";
import { CreditCard, User, Gauge, Tag } from 'lucide-react';
const MapPopupCard = ({
  account_no,
  account_name,
  meter_no,
  meter_brand,
}: ConsumerMeter) => {
  return (
   
      <div className="text-base-content bg-base-300 flex flex-col rounded-2xl overflow-hidden shadow-2xl w-full max-w-sm border border-base-300 relative transition-all transform scale-100">
        
        {/* Decorative Top Accent Bar */}
        <div className="bg-secondary w-full h-5"></div>

        

        {/* Card Content Grid/List */}
        <div className="p-3 pt-2 space-y-4">
          <section title="Account Number" data-tip="Account Number" className="flex items-center bg-base-200 space-x-3  p-1 rounded-xl tooltip tooltip-info tooltip-bottom">
            <div className="p-2 glass text-secondary rounded-lg">
              <CreditCard size={15} />
            </div>
            <div className="justify-self-center w-full">
              <h1 className="font-bold  w-full text-xs ">{account_no}</h1>
            </div>
          </section>

          <section title="Account Name" data-tip="Account Name" className="flex items-center tooltip tooltip-info tooltip-bottom space-x-3 bg-base-200 p-1 rounded-xl">
            <div className="p-2 glass  text-primary rounded-lg">
              <User size={15} />
            </div>
            <div>
              <h1 className="font-bold text-xs">{account_name}</h1>
            </div>
          </section>

          <div className="grid grid-cols-2 gap-3">
            <section className="flex items-center space-x-3 bg-base-200 p-1 rounded-xl">
              <div className="p-2 glass text-accent rounded-lg">
                <Gauge size={15} />
              </div>
              <div>
                <h1 className="font-bold text-xs">{meter_no}</h1>
              </div>
            </section>

            <section className="flex items-center space-x-3 bg-base-200 p-1 rounded-xl">
              <div className="p-2 glass text-info rounded-lg">
                <Tag size={15} />
              </div>
              <div>
                <h1 className="font-bold text-xs">{meter_brand}</h1>
              </div>
            </section>
          </div>
        </div>

      </div>
  
  );
};

export default MapPopupCard;
