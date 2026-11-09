import { ConductorName } from "@/types/conductor-wire"

export const GetConductorName = async () => {
    const cache = await window.caches.open("gis-data-conductor")
    const data = await cache.match(`/v1/wire/conductor`);
    if (data){
        return await data.json() as ConductorName[]
    }
}

export const GetNeutralName = async () => {
    const cache = await window.caches.open("gis-data-neutral-concentric-wire");
    const data = await cache.match(`/v1/wire/neutral`);
    if (data){
        return await data.json() as ConductorName[]
    }
}