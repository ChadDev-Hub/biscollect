"use client"

import React from 'react'
import {ConsumerMeter} from "@/types/consumer-meter";



const MapPopupCard = ({
    account_no,
    consumer_name,
    meter_no,
    meter_brand,
}: ConsumerMeter) => {
  return (
    <div className="text-base-content bg-base-100 p-4 flex flex-col rounded-box overflow-hidden">
        <h1>{consumer_name}</h1>
        <h1>{account_no}</h1>
        <h1>{meter_no}</h1>
        <h1>{meter_brand}</h1>
        
    </div>
  )
}

export default MapPopupCard