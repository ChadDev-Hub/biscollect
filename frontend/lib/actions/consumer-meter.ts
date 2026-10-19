import api from './interceptor';
import { Feature, FeatureCollection } from '../../types/geojson';
import { Dispatch, SetStateAction } from 'react';
import { getDB } from '../db';


export async function SyncConsumerMeter(hash:string[] | [] = []){
    try {
        const res = await api.post("/v1/consumers/all",{
            hashed: hash
        });
        const result = res.data;
        return result as Feature[];
    } catch (error) {
        throw error
    }
}


  export const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>, setSearched:Dispatch<SetStateAction<Feature[] | []>>,
    setSelectedFeature?:Dispatch<SetStateAction<FeatureCollection | null>>) => {
    const value = e.target.value.toLowerCase();
    const db = await getDB();
    const consumerdata = await db.getAll("consumer_meters");
    if (e.target.value === "" || !e.target.value) {
      setSearched([]);
      setSelectedFeature?.(null);
      return;
    }
    const filtered = consumerdata.filter((item: Feature) => {
      const data = (
        String(item.properties.account_name).toLowerCase().includes(value) ||
        String(item.properties.account_no).toLowerCase().includes(value) ||
        String(item.properties.meter_no).toLowerCase().includes(value) ||
        String(item.properties.meter_brand).toLowerCase().includes(value)
      );
      return data;
    });
    setSearched(filtered.slice(0, 30));
  };