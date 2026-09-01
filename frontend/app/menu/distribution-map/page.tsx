"use client";
import ReturnMenu from '@/app/common/components/return-menu';
import Header from "@/app/common/components/header";
import DownloadConsumerMeter from "./components/download-consumer-meter";
import ConsumerMeterLayer from "./components/consumer-meter-layer";

const DistributionMapPage = () => {
  return (
    <div className="bg-base-300">
      <Header title="Distribution Map"
        tools={[<DownloadConsumerMeter key={1} />]}
        returnMenu={<ReturnMenu />} />
      <ConsumerMeterLayer />
    </div>
    
  )
}

export default DistributionMapPage