"use client";
import { use, useState, useEffect } from "react";
import { db } from "@/lib/db";
import Card from "@/app/common/components/card";
import { NewConnectionType } from "@/types/new-connection";

const NewConnectionContainer = () => {
  const idb = use(db);
  const [entries, setEntries] = useState<NewConnectionType[]>();

  useEffect(() => {
    const getAllEntries = async () => {
      const transaction = idb.transaction("new_connections", "readwrite");
      const store = transaction.objectStore("new_connections");
      const result = await store.getAll();
      setEntries(result);
    };
    getAllEntries();
  }, [idb]);

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
        />
      ))}
    </div>
  );
};

export default NewConnectionContainer;
