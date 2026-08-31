"use client";

import { useRef, useEffect, createContext, useContext } from "react";
import { PMTiles, Protocol, Source } from "pmtiles";
import { Map, addProtocol, GeolocateControl } from "maplibre-gl";

type MapContextType = {
  mapRef: React.RefObject<Map | null> | null;
};

const MapContext = createContext<MapContextType | null>({
  mapRef: null,
});

type Props = {
  children: React.ReactNode;
};

class CachePMTilesSource implements Source {
  private blob: Blob | null = null;

  constructor(private readonly url: string) {}

  private async getBlob(): Promise<Blob> {
    if (this.blob) {
      return this.blob;
    }

    const cache = await caches.open("maptile-provider");

    const response = await cache.match(this.url);

    if (!response) {
      throw new Error(`PMTiles not found in cache: ${this.url}`);
    }

    this.blob = await response.blob();

    console.log("PMTiles loaded from Cache Storage:", this.blob.size);

    return this.blob;
  }

  getKey(): string {
    return this.url;
  }

  async getBytes(offset: number, length: number, signal?: AbortSignal) {
    const blob = await this.getBlob();

    if (signal?.aborted) {
      throw new DOMException("Aborted", "AbortError");
    }

    const chunk = blob.slice(offset, offset + length);

    const buffer = await chunk.arrayBuffer();

    return {
      data: buffer,
    };
  }
}

const BiselcoMap = ({ children }: Props) => {
  const mapRefContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);

  useEffect(() => {
    if (!mapRefContainer.current) return;
    const protocol = new Protocol();
    addProtocol("pmtiles", protocol.tile);

    const PMTILEURL = "/maps/calamian.pmtiles";
    const source = new CachePMTilesSource(PMTILEURL);
    const p = new PMTiles(source);
    protocol.add(p);

    const map = new Map({
      container: mapRefContainer.current,
      style: "/maps/style.json",
      zoom: 8,
      center: [120.2043, 11.9986],
    });

    map.addControl(
      new GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      }),
    );

    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <MapContext.Provider value={{ mapRef }}>
      <div className="flex flex-col gap-2">
        {children}
        <div className="w-full h-full min-h-screen" ref={mapRefContainer}></div>
      </div>
    </MapContext.Provider>
  );
};

const useMap = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMap must be used within a MapProvider");
  }
  return context;
};

export { useMap };

export default BiselcoMap;
