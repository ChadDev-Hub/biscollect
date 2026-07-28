import api from "./interceptor";
type resultType = {
    url: string;
}

export async function Login(data: FormData) {
    const params = new URLSearchParams();
    params.append("secret", data.get("secret") as string);
    const res = await api.post("/v1/biscollect/validate",null,{params});
    if (res.status === 401) {
        throw new Error("Invalid secret key");
    }
    const success = res.data as resultType;
   
    return success
}