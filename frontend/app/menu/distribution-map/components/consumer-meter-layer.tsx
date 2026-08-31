"use client";
import { getDB } from "@/lib/db";
import { useEffect, useState } from "react";
import { FeatureCollection } from "@/types/geojson";
import { useMap } from "./map";
import { MapMouseEvent, Popup, MapGeoJSONFeature,PaddingOptions } from "maplibre-gl";
import { createRoot } from "react-dom/client";
import MapPopupCard from './map-popupcard';


const ConsumerMeterLayer = () => {
  const [consumer, setConsumer] = useState<FeatureCollection>();
  const { mapRef } = useMap();
  useEffect(() => {
    const fetchConsumer = async () => {
      const db = await getDB();
      const consumerdata = await db.getAll("consumer_meters");
      const featureCollection = {
        type: "FeatureCollection",
        features: consumerdata,
      };
      setConsumer(featureCollection);
    };
    fetchConsumer();
  }, []);

  useEffect(() => {
    if (!mapRef?.current) return;
    if (!consumer) return;

    const map = mapRef.current;
    const sourceId = "consumer-meter";
    const LayerId = "consumer-meter-layer";
    const unclusteredPointId = "consumer-unclustered-point";
    const clusterId = "consumer-cluster";

    const setup = async () => {
      if (!map) return;
      if (!consumer) return;

      if (!map.getSource(sourceId)) {
        map.addSource(sourceId, {
          type: "geojson",
          data: consumer,
          cluster: true,
        });
      }

      if (!map.getLayer(LayerId)) {
        map.addLayer({
          id: LayerId,
          type: "circle",
          source: sourceId,
          filter: ["has", "point_count"],
          paint: {
            "circle-color": [
              "step",
              ["get", "point_count"],
              "#51bbd6",
              100,
              "#f1f075",
              750,
              "#f28cb1",
            ],
            "circle-radius": [
              "step",
              ["get", "point_count"],
              20,
              100,
              30,
              750,
              40,
            ],
          },
        });
      }
      if (!map.getLayer(clusterId)) {
        map.addLayer({
          id: clusterId,
          type: "symbol",
          source: sourceId,
          layout: {
            "text-field": "{point_count_abbreviated}",
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 12,
          },
          paint: {
            "text-color": "#fff",
          },
        });
      }

      if (!map.getLayer(unclusteredPointId)) {
        map.addLayer({
          id: unclusteredPointId,
          type: "circle",
          source: sourceId,
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-color": "#11b4da",
            "circle-radius": 4,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#fff",
          },
        });
      }
    };

    const addPopupEvent = async () => {
      if (!map.getLayer(LayerId)) return;
      const handleMouseClick = (
        e: MapMouseEvent & { features?: MapGeoJSONFeature[]},
      ) => {
        if (!e.features) return;
        const properties = e.features[0].properties;
        console.log(properties);

        const popupNode = document.createElement("div");
        const root = createRoot(popupNode);
        root.render(<MapPopupCard  
          account_no={properties.account_no} 
          consumer_name={properties.consumer_name} 
          meter_no={properties.meter_no} 
          meter_brand={properties.meter_brand} hash={properties.hash} />);
        new Popup({
          closeButton: false,
          closeOnClick: true,
          className: "maplibregl-popup",
          padding: { top: 0, bottom: 0, left: 0, right: 0 } as PaddingOptions,
          maxWidth: "none",
          anchor: "bottom",
          offset: [0, -10],      
      }).setLngLat(e.lngLat)
    
      .setDOMContent(popupNode)
      .addTo(map)};
      

      map.on("click", unclusteredPointId, handleMouseClick);
      return () => {
        map.off("click",unclusteredPointId, handleMouseClick);
      };
    }; 
    
    

    const addEvents = async () => {
      if (!map.getLayer(LayerId)) return;

      const handleMouseEnter = () => (map.getCanvas().style.cursor = "pointer");
      const handleMouseLeave = () => (map.getCanvas().style.cursor = "");

      map.on("mouseenter", unclusteredPointId, handleMouseEnter);
      map.on("mouseleave", unclusteredPointId, handleMouseLeave);
    

      return () => {
        map.off("mouseenter", unclusteredPointId, handleMouseEnter);
        map.off("mouseleave", unclusteredPointId, handleMouseLeave);
       
      }
    };

    const run = async () => {
      await setup();
      await addEvents();
      await addPopupEvent();
    };
    if (map.isStyleLoaded()) {
      run();
    } else {
      map.once("load", run);
    }
    return () => {
      if (map && map.isStyleLoaded()) {
        map.removeLayer(LayerId);
        map.removeLayer(unclusteredPointId);
        map.removeLayer(clusterId);
        map.removeSource(sourceId);
      }
    };
  }, [consumer, mapRef]);
  return () => null;
};

export default ConsumerMeterLayer;
