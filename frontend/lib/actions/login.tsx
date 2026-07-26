
const baseUrl = process.env.NEXT_PUBLIC_BASESERVERURL
type resultType = {
    url: string;
}

type errorType = {
    code: number;
    detail: string;
}
export async function Login(data: FormData) {
    const params = new URLSearchParams();
    params.append("secret", data.get("secret") as string);
    const res = await fetch(`${baseUrl}/v1/auth/google/validate?${params}`, {
        method: "POST",
    });
    const result = await res.json();
    if(!res.ok) {
        const error = result as errorType;
        switch (error.code) {
            case 401:
                throw new Error("Invalid secret key");
            default:
                throw new Error(error.detail ?? "Failed to login");
        }
    }
    const success = result as resultType;
   
    return success
}