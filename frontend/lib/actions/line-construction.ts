import api from './interceptor';
import {SyncResponseType} from '@/types/response';



export async function SyncLineConstruction(lineConstruction: FormData) {
    try {
        console.log("lineConstruction",[...lineConstruction.entries()]);
        const res = await api.post("/v1/construction/primary_lines/sync", lineConstruction);
        
        const result = res.data;
        return result as SyncResponseType;
    } catch (error) {
        throw new Error((error as Error).message);
    }
}