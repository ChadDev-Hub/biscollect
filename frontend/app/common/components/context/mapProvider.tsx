"use client"
import {createContext, useContext, ReactNode, Dispatch, SetStateAction,  useState, useRef, useEffect} from "react"
import {FeatureCollection} from "@/types/geojson";
import Map, {MapRef} from "react-map-gl/maplibre"
import { Protocol, PMTiles } from "pmtiles";
import { addProtocol, setWorkerUrl } from "maplibre-gl";
import {CachePMTilesSource} from "./pmtileSource"
type MapContextType = {
    mapRef: React.RefObject<MapRef | null> | null
    isMapReady: boolean
    selectedFeature: FeatureCollection | null
    setSelectedFeature: Dispatch<SetStateAction<FeatureCollection | null>>
}

const MapContext = createContext<MapContextType | null>({
    mapRef: null,
    isMapReady: false,
    selectedFeature: null,
    setSelectedFeature: () => {}
})

export const useMapContext = () => useContext(MapContext)

type Props = {
    children?: ReactNode
}

const MapProvider = ({children}: Props) => {
    const [selectedFeature, setSelectedFeature] = useState<FeatureCollection | null>(null);
    const mapRef = useRef<MapRef | null>(null);
    const [isMapReady, setIsMapReady] = useState(false);

    useEffect(() => {
        const protocol = new Protocol();
        addProtocol("pmtiles", protocol.tile);
        const PMTILEURL = "/maps/calamian.pmtiles";
        const source = new CachePMTilesSource(PMTILEURL);
        const p = new PMTiles(source);
        protocol.add(p);
    },[]);


    useEffect(() => {
        setWorkerUrl(
      new URL(
        "maplibre-gl/dist/maplibre-gl-worker.mjs",
        import.meta.url
      ).toString()
    );
  }, []);
    return (
        <MapContext.Provider value={{mapRef, isMapReady, selectedFeature, setSelectedFeature}}>
            <Map
                ref={mapRef}
                style={{width: "100%", height: "100%"}}
                mapStyle="/maps/style.json"
                onLoad={() => setIsMapReady(true)}
                >
                
                {children}
            </Map>
            
        </MapContext.Provider>
    )
}

export const useMap = () => {
    const context = useContext(MapContext);
    if (!context) {
        throw new Error("useMap must be used within a MapProvider");
    }
    return context;
};
export default MapProvider
