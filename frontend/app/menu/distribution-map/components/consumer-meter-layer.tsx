"use client";
import { getDB } from "@/lib/db";
import { useEffect, useState } from "react";
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
  const [consumer, setConsumer] = useState<FeatureCollection>();
  const { mapRef } = useMap();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchConsumer = async () => {
      const db = await getDB();
      const consumerdata = await db.getAll("consumer_meters");

      if (!consumerdata) return;

      const query = searchParams.get("q");
      const consumerFiltered: Feature[] = query
        ? consumerdata.filter((item: Feature) => item.properties.hash === query)
        : consumerdata;

      const featureCollection = {
        type: "FeatureCollection",
        features: consumerFiltered,
      };
      setConsumer(featureCollection);
    };
    fetchConsumer();
  }, [searchParams]);

  useEffect(() => {
    if (!mapRef?.current) return;
    if (!consumer) return;

    const map = mapRef.current;
    const sourceId = "consumer-meter";
    const LayerId = "consumer-meter-layer";
    const unclusteredPointId = "consumer-unclustered-point";
    const clusterId = "consumer-cluster";

    const ImageSetup = async () => {
      if (!map) return;
      if (map.hasImage("consumer-icon")) return;
      const image = renderToStaticMarkup(
        <CircleGauge
          strokeWidth={2}
          fill="blue"
          color="orange"
        />,
      );
      const imageData = `data:image/svg+xml;utf8,${encodeURIComponent(image)}`;
      const ImageIcon = new Image();

      ImageIcon.onload = () => {
        if (!map.hasImage("consumer-icon")) {
          map.addImage("consumer-icon", ImageIcon);
        }
      };
      ImageIcon.src = imageData;
    };

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
    };

    // POPUP EVENT
    const addPopupEvent = async () => {
      if (!map.getLayer(LayerId)) return;
      const handleMouseClick = (
        e: MapMouseEvent & { features?: MapGeoJSONFeature[] },
      ) => {
        if (!e.features) return;
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

      map.on("click", unclusteredPointId, handleMouseClick);
      return () => {
        map.off("click", unclusteredPointId, handleMouseClick);
      };
    };

    // MOUSE EVENT
    const addEvents = async () => {
      if (!map.getLayer(LayerId)) return;

      const handleMouseEnter = () => (map.getCanvas().style.cursor = "pointer");
      const handleMouseLeave = () => (map.getCanvas().style.cursor = "");

      map.on("mouseenter", unclusteredPointId, handleMouseEnter);
      map.on("mouseleave", unclusteredPointId, handleMouseLeave);

      return () => {
        map.off("mouseenter", unclusteredPointId, handleMouseEnter);
        map.off("mouseleave", unclusteredPointId, handleMouseLeave);
      };
    };

    const addLocateEvent = async () => {
      if (consumer?.features.length > 1) return;
      map.flyTo({
        center: [
          consumer?.features[0].geometry.coordinates[0] as number,
          consumer?.features[0].geometry.coordinates[1] as number,
        ],
        zoom: 18,
      });
    };
    const run = async () => {
      await ImageSetup();
      await setup();
      await addEvents();
      await addPopupEvent();
      await addLocateEvent();
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
  }, [mapRef, consumer]);

  useEffect(() => {
    if (!mapRef?.current) return;

    const map = mapRef.current;

    if (!map.isStyleLoaded()) return;

    const source = map.getSource("consumer-meter") as GeoJSONSource | undefined;

    if (!source) return;

    source.setData(consumer);
  }, [consumer, mapRef]);

  return null;
};

export default ConsumerMeterLayer;
