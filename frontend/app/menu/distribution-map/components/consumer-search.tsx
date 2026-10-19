"use client";
import { handleSearch } from "@/lib/actions/consumer-meter";
import { useState,  useRef, Dispatch, SetStateAction } from "react";
import { Feature, FeatureCollection } from '../../../../types/geojson';



type Props = {
  setSelectedFeature: Dispatch<SetStateAction<FeatureCollection | null>>
}


const ConsumerSearch = ({ setSelectedFeature }: Props) => {
  const [searchConsumer, setSearchConsumer] = useState<Feature[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  



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
        onChange={(e) => handleSearch(e, setSearchConsumer, setSelectedFeature)}
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
