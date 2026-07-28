import api from "./interceptor";
import { SyncResponseType } from "@/types/response";
const baseUrl = process.env.NEXT_PUBLIC_BASESERVERURL;

export async function SyncChangeMeter(changeMeter: FormData) {
  try {
    const res = await api.put("/v1/change_meter/sync", changeMeter);
    const result = res.data;
    return result as SyncResponseType;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
