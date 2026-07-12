
import {SyncResponseType} from "@/types/response";
const baseUrl = process.env.NEXT_PUBLIC_BASESERVERURL



export async function SyncChangeMeter(changeMeter: FormData) {
    const res = await fetch(`${baseUrl}/v1/change_meter/sync`, {
        method: "PUT",
        body: changeMeter,
    });
    const result = await res.json();
    if(!res.ok) {
        throw new Error(result.detail ?? "Failed to sync change meter");
    }
    return result as SyncResponseType;
}