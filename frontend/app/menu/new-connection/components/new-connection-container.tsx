"use client";
import {  useState, useEffect } from "react";
import { getDB } from "@/lib/db";
import Card from "@/app/common/components/card";
import { NewConnectionType } from "@/types/new-connection";

const NewConnectionContainer = () => {

  const [entries, setEntries] = useState<NewConnectionType[]>();
  
  useEffect(() => {
    const getAllEntries = async () => {
      const idb = await getDB();
      const transaction = idb.transaction("new_connections", "readwrite");
      const store = transaction.objectStore("new_connections");
      const result = await store.getAll();
      const reverse = result.reverse();
      setEntries(reverse.filter((entry: NewConnectionType) => !entry.is_deleted));
    
    };
    getAllEntries();
    window.addEventListener("new_connections-updated", getAllEntries);
    return () => {
      window.removeEventListener("new_connections-updated", getAllEntries);
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-2 w-full">
      {entries?.map((entry) => (
        <Card
          key={entry.uuid}
          uuid={entry.uuid}
          date={entry.date_accomplished}
          name={entry.consumer_name}
          meter_serial_no={entry.meter_serial_no}
          meter_brand={entry.meter_brand}
          type="NC"
          is_synced={entry.is_synced}
          datetime_synced={entry.datetime_synced}
        />
      ))}
    </div>
  );
};

export default NewConnectionContainer;
