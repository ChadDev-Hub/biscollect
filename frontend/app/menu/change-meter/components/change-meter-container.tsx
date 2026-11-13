"use client";
import Card from "@/app/common/components/card";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchChangeMeters, filterChangeMeter } from "./changeMeterSlice";
import Search from "@/app/common/components/search";
import NoItemsFound from "@/app/common/components/noItemFound";

const ChangeMeterContainer = () => {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector((state) => state.changeMeter);
  console.log(data);

  useEffect(() => {
    dispatch(fetchChangeMeters());
  }, [dispatch]);

  return (
    <div className="flex w-full max-w-6xl gap-4 flex-col justify-center py-15 px-4">
      <div>
        <Search
          loading={loading}
          resetActions={() => dispatch(fetchChangeMeters())}
          data={data ?? []}
          actions={filterChangeMeter}
        />
      </div>
      {data.length === 0 ? (
        <NoItemsFound
          title="Change Meter"
          description="There are currently no change meters to display."
          actionLabel="Search"
        />
      ) : (
        <div className="grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3 gap-2 w-full">
          {data?.map((entry) => (
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
      )}
    </div>
  );
};

export default ChangeMeterContainer;
