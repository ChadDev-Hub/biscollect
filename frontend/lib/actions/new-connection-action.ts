"use server"

const baseUrl = process.env.BASESERVERURL

export async function SyncNewConnection(newConnection: FormData) {
    console.log(newConnection);
    const res = await fetch(`${baseUrl}/v1/new_connection/sync`, {
        method: "PUT",
        body: newConnection,
    });
    return res.json();
}