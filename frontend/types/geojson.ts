
import {ConsumerMeter} from "@/types/consumer-meter";
export type FeatureCollection = {
    type: string;
    features: Feature[];
}

export type Feature = {
    type: string;
    geometry: {
        type: string;
        coordinates: number[];
    };
    properties: ConsumerMeter;
}