"use cient"
import {SyncConsumerMeter }from "@/lib/actions/consumer-meter";
import {getDB} from "@/lib/db";
type Props = {
    key: number
}
const DownloadConsumerMeter = (
    {key}: Props
) => {
    const handleSync = async () => {
        try {
            const result = await SyncConsumerMeter();
            const transaction = (await getDB()).transaction("consumer_meters", "readwrite");
            const store = transaction.objectStore("consumer_meters");
            await store.clear();
            for (const feature of result){
                await store.add(feature);
            };
            await transaction.done;
        } catch (error) {
            console.error(error);
        }
    }
  return (
    <button key={key} onClick={handleSync}>
        Sync Update
    </button>
      )
}

export default DownloadConsumerMeter