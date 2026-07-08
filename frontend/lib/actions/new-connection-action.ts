

"use server"
import { NewConnectionResponseType} from '../../types/new-connection';
const baseUrl = process.env.BASESERVERURL

export async function SyncNewConnection(newConnection: FormData) {
    const res = await fetch(`${baseUrl}/v1/new_connection/sync`, {
        method: "PUT",
        body: newConnection,
    });
    const result = await res.json();
    if(!res.ok) {
        throw new Error(result.detail ?? "Failed to sync new connection");
    }
    return result as NewConnectionResponseType;
}