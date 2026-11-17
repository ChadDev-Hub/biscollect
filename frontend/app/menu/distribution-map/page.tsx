"use client";
import ReturnMenu from '@/app/common/components/buttons/return-menu';
import Header from "@/app/common/components/header";
import DownloadConsumerMeter from "./components/download-consumer-meter";
import ConsumerMeterLayer from "./components/consumer-meter-layer";
import { Suspense } from 'react';
import MapProvider from '@/app/common/components/context/mapProvider';

const DistributionMapPage = () => {
  return (
    <div className="bg-base-300">
      <Header title="Distribution Map"
        tools={[<DownloadConsumerMeter key="consumer-meter" />]}
        returnMenu={<ReturnMenu />} />
      <MapProvider>
        
      </MapProvider>
      {/* <Suspense fallback={<div>Loading...</div>}>
        <ConsumerMeterLayer />
      </Suspense> */}
    </div>
  )
}

export default DistributionMapPage