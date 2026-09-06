import api from './interceptor';
import { Feature } from '../../types/geojson';



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