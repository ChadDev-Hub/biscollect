"use client";
import { getDB } from "../../../../lib/db";
import { useState,  useRef } from "react";
import { Feature } from "../../../../types/geojson";
import { useSearchParams, useRouter } from "next/navigation";
const ConsumerSearch = () => {
  const [searchConsumer, setSearchConsumer] = useState<Feature[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    const db = await getDB();
    const consumerdata = await db.getAll("consumer_meters");
    if (e.target.value === "") {
      setSearchConsumer([]);
      router.replace(`/menu/distribution-map`);
      return;
    }
    if (!e.target.value) {
      setSearchConsumer([]);
      router.replace(`/menu/distribution-map`);
      return;
    };
    const filtered = consumerdata.filter((item: Feature) => {
      return (
        String(item.properties.account_name).toLowerCase().includes(value) ||
        String(item.properties.account_no).toLowerCase().includes(value) ||
        String(item.properties.meter_no).toLowerCase().includes(value) ||
        String(item.properties.meter_brand).toLowerCase().includes(value)
      );
    });
    setSearchConsumer(filtered);
  };


  const handleSelection = (item: Feature) => {
    if (!inputRef.current) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("q", item.properties.hash);
    router.push(`/menu/distribution-map?${params.toString()}`);
    inputRef.current.value = item.properties.account_name;
    setSearchConsumer([]);
  };
  return (
    <label className="absolute top-3 left-3 z-50 max-w-xs w-full">
      <input
        
        ref={inputRef}
        type="text"
        onChange={handleSearch}
        placeholder="Search Consumer"
        className="input   input-bordered w-full max-w-xs"
      />
      {searchConsumer.length > 0 && (
        <ul className="p-3 m-2 w-full menu-vertical bg-base-300 rounded-box max-h-96 overflow-y-scroll">
          {searchConsumer.map((item: Feature) => (
            <li
              onClick={() => handleSelection(item)}
              className="hover:bg-base-200"
              key={item.properties.hash}
            >
              {item.properties.account_name}
            </li>
          ))}
        </ul>
      )}
    </label>
  );
};

export default ConsumerSearch;
