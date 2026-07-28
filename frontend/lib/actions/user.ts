
import api from "./interceptor"
const baseUrl = process.env.NEXT_PUBLIC_BASESERVERURL


export async function GetUser() {
    const res = await api.get(`${baseUrl}/v1/users/me`);
    if (res.status === 401) {
        throw new Error(res.statusText);
    }
    return res.data
}