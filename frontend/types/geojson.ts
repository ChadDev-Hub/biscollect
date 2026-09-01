
import {ConsumerMeter} from "@/types/consumer-meter";
export type FeatureCollection = {
    type: "FeatureCollection";
    features: Feature[];
}

export type Feature = {
    type: "Feature";
    geometry: {
        type: "Point";
        coordinates: number[];
    };
    properties: ConsumerMeter;
}