
import type {TransformerType} from "@/types/transformer";

export const GetTransformerType = async () => {
    try{
        const cache  = await window.caches.open("gis-data-transformer")
        const data = await cache.match("/v1/dt/type");
        if (data){
            return await data.json() as TransformerType[]
        }
    }catch(err){
        console.error("Failed:", "v1/dt/type", err);
    }
    
}