import api from "./interceptor";
import { SyncResponseType } from "@/types/response";

export async function SyncNewConnection(newConnection: FormData) {
  try {
    const res = await api.put("/v1/new_connection/sync", newConnection);
    const success = res.data as SyncResponseType;
    return success;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
