import api from './interceptor';
import { Feature, FeatureCollection } from '../../types/geojson';
import { Dispatch, SetStateAction } from 'react';
import { getDB } from '../db';
import Fuse from 'fuse.js';

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
    const fuse = new Fuse(consumerdata, {
      keys: ["properties.account_name", "properties.account_no", "properties.meter_no", "properties.meter_brand"],
    })
    const result = fuse.search(value, {
      limit: 30
    });
    setSearched(result.map((result) => result.item));
  };