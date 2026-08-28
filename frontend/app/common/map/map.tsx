"use client";
import * as maplibregl from "maplibre-gl";
import { useRef, useEffect } from "react";
import { PMTiles, Protocol } from "pmtiles";
import "maplibre-gl/dist/maplibre-gl.css";

const BiselcoMap = () => {
  const mapRefContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRefContainer.current) return;

    const protocol = new Protocol();
    maplibregl.addProtocol("pmtiles", protocol.tile);

    const PMTILEURL = "maps/calamian.pmtiles";
    const p = new PMTiles(PMTILEURL);
    protocol.add(p);
    p.getHeader().then((h) => {
      console.log(h.centerLon, h.centerLat);
      console.log(h.maxZoom)
      console.log(h.tileType)
    });
    const map = new maplibregl.Map({
      container: mapRefContainer.current!,
      style: "./maps/style.json",
      center: [120.2043, 11.9986],
      zoom: 10,
    });

    map.on("load", () => {
      console.log("MAP LOADED");
    });

    map.on("idle", () => {
      console.log("MAP IDLE");
    });

    map.on("render", () => {
      console.log("RENDERING");
    });

    map.on("error", (event) => {
      console.error("MAP ERROR:", event.error);
    });

    map.on("style.load", () => {
      console.log("STYLE LOADED");

      console.log(
        "MAP SIZE:",
        map.getContainer().clientWidth,
        map.getContainer().clientHeight,
      );

      console.log("CANVAS:", map.getCanvas());
    });

    return () => {
      map.remove();
      maplibregl.removeProtocol("pmtiles");
    };
  }, []);
  return (
    <div className="relative w-full h-64 rounded-lg">
      <div className="h-full w-full" ref={mapRefContainer}></div>
    </div>
  );
};

export default BiselcoMap;
