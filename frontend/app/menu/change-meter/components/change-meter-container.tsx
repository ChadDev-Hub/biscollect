
"use client"
import Card from '@/app/common/components/card';
import { useState, useEffect } from 'react';
import { getDB } from '@/lib/db';
import { ChangeMeterType } from '@/types/change-meter';

const ChangeMeterContainer = () => {
    const [entries, setEntries] = useState<ChangeMeterType[]>();
    useEffect(()=>{
        const getAllEntries = async () => {
            const idb = await getDB();
            const transaction = idb.transaction("change_meters", "readwrite");
            const store = transaction.objectStore("change_meters");
            const result = await store.getAll();
            const reverse = result.reverse();

            setEntries(reverse.filter((entry: ChangeMeterType) => !entry.is_deleted));
        }
        getAllEntries();
        window.addEventListener("change_meters-updated", getAllEntries);
        return () => {
            window.removeEventListener("change_meters-updated", getAllEntries);
        }
    },[])

  return (
    <div className="flex flex-col justify-center items-center gap-2 w-full">
        {entries?.map((entry) => (
            <Card
            key={entry.uuid}
            uuid={entry.uuid}
            date={entry.date_accomplished}
            name={entry.consumer_name}
            meter_serial_no={entry.new_meter_serial_no}
            meter_brand={entry.new_meter_brand}
            type="CM"
            is_synced={entry.is_synced}
            datetime_synced={entry.datetime_synced}
            />
        ))}
    </div>
  )
}

export default ChangeMeterContainer