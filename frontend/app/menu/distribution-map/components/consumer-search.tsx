"use client";
import { getDB } from "../../../../lib/db";
import { useState,  useRef, Dispatch, SetStateAction } from "react";
import { Feature, FeatureCollection } from '../../../../types/geojson';



type Props = {
  setSelectedFeature: Dispatch<SetStateAction<FeatureCollection | null>>
}


const ConsumerSearch = ({ setSelectedFeature }: Props) => {
  const [searchConsumer, setSearchConsumer] = useState<Feature[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    const db = await getDB();
    const consumerdata = await db.getAll("consumer_meters");
    if (e.target.value === "") {
      setSearchConsumer([]);
      setSelectedFeature(null);
      return;
    }
    if (!e.target.value) {
      setSearchConsumer([]);
      setSelectedFeature(null);
      return;
    };
    const filtered = consumerdata.filter((item: Feature) => {
      const data = (
        String(item.properties.account_name).toLowerCase().includes(value) ||
        String(item.properties.account_no).toLowerCase().includes(value) ||
        String(item.properties.meter_no).toLowerCase().includes(value) ||
        String(item.properties.meter_brand).toLowerCase().includes(value)
      );
      return data;
    });
    setSearchConsumer(filtered.slice(0, 60));
  };


  const handleSelection = (item: Feature) => {
    if (!inputRef.current) return;
    const selectedFeature:FeatureCollection = {
      type: "FeatureCollection",
      features: [item]
    }
    setSelectedFeature(selectedFeature);
    inputRef.current.value = item.properties.account_name;
    setSearchConsumer([]);
  };
  return (
    <label className="absolute top-18 left-2 z-50 max-w-xs w-full">
      <input
        ref={inputRef}
        type="text"
        onChange={handleSearch}
        placeholder="Search Consumer"
        className="input  input-sm input-bordered w-full max-w-xs"
      />
      {searchConsumer.length > 0 && (
        <ul className="p-3 m-2 list w-full menu-vertical bg-base-300 rounded-box max-h-96 overflow-y-scroll">
          {searchConsumer.map((item: Feature) => (
            <li
              onClick={() => handleSelection(item)}
              className="hover:bg-base-200 list-row hover:text-primary hover:cursor-pointer"
              key={item.properties.hash}
            >
              <div>
                <p className="text-xs">{item.properties.account_name}</p>
              </div>
              
            </li>
          ))}
        </ul>
      )}
    </label>
  );
};

export default ConsumerSearch;
