

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
    properties: {
        [key: string]: unknown;
    };
}