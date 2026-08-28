import api from "./interceptor";
import { SyncResponseType } from "@/types/response";


export async function SyncChangeMeter(changeMeter: FormData) {
  try {
    const res = await api.put("/v1/change_meter/sync", changeMeter);
    const result = res.data;
    return result as SyncResponseType;
  } catch (error) {
    throw error
  }
}
