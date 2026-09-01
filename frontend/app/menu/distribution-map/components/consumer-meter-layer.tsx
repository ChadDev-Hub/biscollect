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
  const [consumer, setConsumer] = useState<FeatureCollection>({
    type: "FeatureCollection",
    features: [],
  });
  const { mapRef } = useMap();
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
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
        <CircleGauge strokeWidth={2} fill="blue" color="orange" />,
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

      const existingSource = map.getSource(sourceId) as GeoJSONSource;

      if (!existingSource) {
        map.addSource(sourceId, {
          type: "geojson",
          data: consumer as FeatureCollection,
          cluster: true,
        });
      } else {
        existingSource.setData(consumer as FeatureCollection);
      }
      // SOURCE LAYER
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
      // CLUSTER POINT LAYER
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
      // UNCLUSTER POINT LAYER
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

    const run = async () => {
      await ImageSetup();
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
      if (addPopupEvent) {
        map.off("click", unclusteredPointId, addPopupEvent);
        map.off("mouseenter", unclusteredPointId, addPopupEvent);
        map.off("mouseleave", unclusteredPointId, addPopupEvent);
      }
    };
  }, [mapRef, consumer]);

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
        center: [
          lng,
          lat,
        ],
        zoom: 18,
      });
    };
    addLocateEvent();
  }, [consumer, mapRef]);

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
