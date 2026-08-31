import api from './interceptor';
import { Feature } from '../../types/geojson';



export async function SyncConsumerMeter(){
    try {
        const res = await api.get("/v1/consumers/all");
        const result = res.data;
        return result as Feature[];
    } catch (error) {
        throw error
    }
}