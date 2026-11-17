"use client";
import {  useEffect } from "react";
import Card from "@/app/common/components/card";
import {fetchNewConnection, deleteNewConnection} from "./newConnectionSlice";
import {useAppDispatch, useAppSelector} from '@/app/hooks';
import Delete from "@/app/common/components/buttons/delete";
const NewConnectionContainer = () => {
  const dispatch = useAppDispatch();
  const entries = useAppSelector((state) => state.newConnection.data);
  
  
  useEffect(() => {
    const getAllEntries = async () => {
      dispatch(fetchNewConnection());
    };
    getAllEntries();
  
    return () => {
     
    };
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3 gap-2 w-full ">
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
          datetime_synced={entry.datetime_synced ?? "____"}
        >
          <Delete
            onClick={()=>dispatch(deleteNewConnection({uuid: entry.uuid, datetime_deleted: new Date().toISOString(), is_deleted: true}))}
          />
        </Card>
      ))}
    </div>
  );
};

export default NewConnectionContainer;
