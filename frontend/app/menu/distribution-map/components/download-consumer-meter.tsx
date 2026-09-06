"use cient";
import { SyncConsumerMeter } from "@/lib/actions/consumer-meter";
import { getDB } from "@/lib/db";
import { useOnline } from "@/app/common/components/hooks/online-provider";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useProgress } from "@/app/common/components/hooks/progress";
import {Feature} from "@/types/geojson";
const DownloadConsumerMeter = () => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const { isOnline } = useOnline();
  const { setShowProgress, setProgress } = useProgress();
  const handleSync = async () => {
    try {
      const readtransaction = (await getDB()).transaction(
        "consumer_meters",
        "readonly",
      );
      const readStore = readtransaction.objectStore("consumer_meters");
      const feature = await readStore.index("hash").getAll();
      const consumers_hash = feature.map((item:Feature)=>item.properties.hash);
      
      await readtransaction.done;
      setIsFetching(true);
      setShowProgress(true);
      const result = await SyncConsumerMeter(consumers_hash);
      

      const writeTransaction = (await getDB()).transaction(
        "consumer_meters",
        "readwrite",
      )
      
      const writeStore = writeTransaction.objectStore("consumer_meters");

      let completes = 0;
      for (const feature of result) {
        await writeStore.put(feature);
        setProgress(Math.floor((completes / result.length) * 100));
        completes++;
      }
      console.log("transaction finished")
      await writeTransaction.done;
      window.dispatchEvent(new Event("consumer-meters-updated"));
    } catch (error) {
      console.error(error);
    } finally {
      setProgress(0);
      setIsFetching(false);
      setShowProgress(false);
    }
  };
  return (
    <button disabled={!isOnline} onClick={handleSync} className="btn btn-soft">
      Sync Update {isFetching && <Loader className="animate-spin" />}
    </button>
  );
};

export default DownloadConsumerMeter;
