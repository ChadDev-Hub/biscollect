"use client";
import { getDB } from "@/lib/db";
import { useEffect, useState, } from "react";
import { FeatureCollection, Feature } from "@/types/geojson";
import { useMap } from "./map";
import { renderToStaticMarkup } from "react-dom/server";
import {
  MapMouseEvent,
  Popup,
  MapGeoJSONFeature,
  GeoJSONSource,
} from "maplibre-gl";
import { createRoot } from "react-dom/client";
import MapPopupCard from "./map-popupcard";
import { useSearchParams } from "next/navigation";
import { CircleGauge } from "lucide-react";

const ConsumerMeterLayer = () => {
  const [consumer, setConsumer] = useState<FeatureCollection>({
    type: "FeatureCollection",
    features: [],
  });
 
  const { mapRef, isMapReady } = useMap();
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  
  const sourceId = "consumer-meter";
    const layerId = "consumer-meter-layer";
    const unclusteredPointId = "consumer-unclustered-point";
    const clusterId = "consumer-cluster";

  useEffect(() => {
    if (!isMapReady) return;
    if (!mapRef?.current) return;

    const map = mapRef.current;

    
    const setup = () => {
      // --------------------------------
      // SOURCE
      // --------------------------------
      
      if (!map.getSource(sourceId)) {
        
        map.addSource(sourceId, {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [],
          },
          cluster: true,
        });
      }
      

      // --------------------------------
      // CLUSTER CIRCLE
      // --------------------------------

      if (!map.getLayer(layerId)) {
        map.addLayer({
          id: layerId,
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
              10,
              100,
              20,
              750,
              30,
            ],
          },
        });
      }

      // --------------------------------
      // CLUSTER COUNT
      // --------------------------------

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

      // --------------------------------
      // UNCLUSTERED POINT
      // --------------------------------

      if (!map.getLayer(unclusteredPointId)) {
        map.addLayer({
          id: unclusteredPointId,
          type: "symbol",
          source: sourceId,
          filter: ["!", ["has", "point_count"]],
          layout: {
            "icon-image": "consumer-icon",
            "icon-allow-overlap": true,
            "icon-size": 1,
          },
        });
      }

      // --------------------------------
      // CLICK EVENT
      // --------------------------------

      const handleMouseClick = (
        e: MapMouseEvent & {
          features?: MapGeoJSONFeature[];
        },
      ) => {
        if (!e.features?.length) return;

        const properties = e.features[0].properties;

        const popupNode = document.createElement("div");

        const root = createRoot(popupNode);

        root.render(
          <MapPopupCard
            account_no={properties.account_no}
            account_name={properties.account_name}
            meter_no={properties.meter_no}
            meter_brand={properties.meter_brand}
            hash={properties.hash}
          />,
        );

        new Popup({
          closeButton: false,
          closeOnClick: true,
          className: "map-popup-custom",
          closeOnMove: true,
          maxWidth: "none",
          anchor: "bottom",
        })
          .setLngLat(e.lngLat)
          .setDOMContent(popupNode)
          .addTo(map);
      };

      // --------------------------------
      // MOUSE EVENTS
      // --------------------------------

      const handleMouseEnter = () => {
        map.getCanvas().style.cursor = "pointer";
      };

      const handleMouseLeave = () => {
        map.getCanvas().style.cursor = "";
      };

      map.on("click", unclusteredPointId, handleMouseClick);

      map.on("mouseenter", unclusteredPointId, handleMouseEnter);

      map.on("mouseleave", unclusteredPointId, handleMouseLeave);

      if (!map.hasImage("consumer-icon")) {
        const image = renderToStaticMarkup(
          <CircleGauge strokeWidth={2} fill="blue" color="orange" />,
        );

        const imageData = `data:image/svg+xml;utf8,${encodeURIComponent(
          image,
        )}`;

        const imageIcon = new Image();

        imageIcon.onload = () => {
          if (!map.hasImage("consumer-icon")) {
            map.addImage("consumer-icon", imageIcon);
          }
        };
        imageIcon.src = imageData;
      }

      // --------------------------------
      // CLEANUP
      // --------------------------------
     
      return () => {
        map.off("click", unclusteredPointId, handleMouseClick);

        map.off("mouseenter", unclusteredPointId, handleMouseEnter);

        map.off("mouseleave", unclusteredPointId, handleMouseLeave);
      };
    };

    if (map.isStyleLoaded()) {
      return setup();
    }

    map.once("load", setup);

    return () => {
      map.off("load", setup);
    };
  }, [mapRef,isMapReady]);

  useEffect(() => {
    const fetchConsumer = async () => {
      const db = await getDB();
      const consumerdata = await db.getAll("consumer_meters");

      if (!consumerdata) return;

      const consumerFiltered: Feature[] = query
        ? consumerdata.filter((item: Feature) => item.properties.hash === query)
        : consumerdata;

      const featureCollection: FeatureCollection = {
        type: "FeatureCollection",
        features: consumerFiltered,
      };
      setConsumer(featureCollection);
    };
    fetchConsumer();
  }, [query]);

  useEffect(()=>{
    const assignConsumer = async () => {
      if (!isMapReady) return;
      if (!consumer) {
        console.log("consumer not found");
        return};
      if (!mapRef?.current){
        console.log("map not found");
        return;
      }
      const map = mapRef.current;

      if (!map) {
        console.log("map not found");
        return;
      }
      const source = map.getSource(sourceId) as GeoJSONSource;

      if (!source){
        console.log("source not found");
        return;
      }
      source.setData(consumer);
    }
    assignConsumer();
  },[consumer, mapRef, isMapReady])
  
  useEffect(() => {
    const addLocateEvent = async () => {
      if (!consumer) return;
      if (!mapRef) return;
      const map = mapRef.current;
      if (!map) return;
      if (consumer?.features.length !== 1) return;
      const feature = consumer.features[0];

      const [lng, lat] = feature.geometry.coordinates;

      if (
        typeof lng !== "number" ||
        typeof lat !== "number" ||
        !Number.isFinite(lng) ||
        !Number.isFinite(lat)
      ) {
        return;
      }
      map.flyTo({
        center: [lng, lat],
        zoom: 18,
      });
    };
    addLocateEvent();
  }, [consumer, mapRef]);

  return null;
};

export default ConsumerMeterLayer;
