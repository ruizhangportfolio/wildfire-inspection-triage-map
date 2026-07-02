import { useEffect, useMemo, useRef, useState } from "react";
import maplibregl, { type GeoJSONSource, type Map as MapLibreMap } from "maplibre-gl";
import type { FeatureCollection, Geometry, Point, Polygon } from "geojson";
import {
  incidentsFeatureCollection,
  roadAccessFeatureCollection,
  wildfireBoundary
} from "../data/syntheticGeoData";
import type { BasemapKey, LayerVisibility, TriageItem } from "../types";

interface MapViewProps {
  items: TriageItem[];
  selectedItemId: string | null;
  layerVisibility: LayerVisibility;
  basemap: BasemapKey;
  onSelectItem: (id: string) => void;
}

interface ItemFeatureProperties {
  id: string;
  name: string;
  itemType: TriageItem["itemType"];
  priorityLevel: TriageItem["priorityLevel"];
  priorityScore: number;
  status: TriageItem["status"];
  recommendedAction: TriageItem["recommendedAction"];
  assetCategory?: string;
  parcelId?: string;
}

interface HoverTooltip {
  x: number;
  y: number;
  text: string;
}

const emptyFeatureCollection: FeatureCollection = {
  type: "FeatureCollection",
  features: []
};

const itemProperties = (item: TriageItem): ItemFeatureProperties => ({
  id: item.id,
  name: item.name,
  itemType: item.itemType,
  priorityLevel: item.priorityLevel,
  priorityScore: item.priorityScore,
  status: item.status,
  recommendedAction: item.recommendedAction,
  assetCategory: item.assetCategory,
  parcelId: item.parcelId
});

const toFeatureCollection = <TGeometry extends Geometry>(
  items: TriageItem[],
  geometryType: TGeometry["type"]
): FeatureCollection<TGeometry, ItemFeatureProperties> => ({
  type: "FeatureCollection",
  features: items
    .filter((item) => item.geometry.type === geometryType)
    .map((item) => ({
      type: "Feature",
      properties: itemProperties(item),
      geometry: item.geometry as TGeometry
    }))
});

const selectedFeatureCollection = (
  selectedItem: TriageItem | null
): FeatureCollection<Geometry, ItemFeatureProperties> => {
  if (!selectedItem) {
    return emptyFeatureCollection as FeatureCollection<Geometry, ItemFeatureProperties>;
  }

  return {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: itemProperties(selectedItem),
        geometry: selectedItem.geometry
      }
    ]
  };
};

const source = (map: MapLibreMap, id: string) => map.getSource(id) as GeoJSONSource | undefined;
const ESRI_MAX_ZOOM = 16;
const DEFAULT_MAX_ZOOM = 20;
const QUEUE_FLY_TO_ZOOM = 14.5;
const interactiveHoverLayerIds = [
  "assets-hitbox",
  "incidents-hitbox",
  "roads-hitbox",
  "parcels-hitbox"
];
const clickableLayerIds = ["assets-hitbox", "parcels-hitbox"];

const mapContextLabels = [
  {
    label: "San Pasqual Valley",
    coordinates: [-117.0505, 33.0954] as [number, number],
    className: "contextMapAnnotation"
  },
  {
    label: "Highland Valley Rd",
    coordinates: [-117.0522, 33.0916] as [number, number],
    className: "contextMapAnnotation roadContext"
  },
  {
    label: "Escondido",
    coordinates: [-117.081, 33.1005] as [number, number],
    className: "contextMapAnnotation"
  }
];

const geometryCenter = (geometry: Geometry): [number, number] => {
  if (geometry.type === "Point") {
    return geometry.coordinates as [number, number];
  }

  if (geometry.type === "Polygon") {
    const coordinates = geometry.coordinates[0] as [number, number][];
    const bounds = coordinates.reduce(
      (current, coordinate) => ({
        minLng: Math.min(current.minLng, coordinate[0]),
        maxLng: Math.max(current.maxLng, coordinate[0]),
        minLat: Math.min(current.minLat, coordinate[1]),
        maxLat: Math.max(current.maxLat, coordinate[1])
      }),
      {
        minLng: Number.POSITIVE_INFINITY,
        maxLng: Number.NEGATIVE_INFINITY,
        minLat: Number.POSITIVE_INFINITY,
        maxLat: Number.NEGATIVE_INFINITY
      }
    );

    return [(bounds.minLng + bounds.maxLng) / 2, (bounds.minLat + bounds.maxLat) / 2];
  }

  return [-117.0665, 33.085];
};

const featureCollectionFromFeature = (
  feature: maplibregl.MapGeoJSONFeature
): FeatureCollection<Geometry> => ({
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: feature.properties ?? {},
      geometry: feature.geometry as Geometry
    }
  ]
});

const formatIncidentTooltip = (type: string, severity: string) => {
  const incidentLabel =
    type === "Blocked Access" ? "Blocked access report" : `${type.toLowerCase()} report`;
  return `${incidentLabel} · ${severity} severity`;
};

const tooltipForFeature = (feature: maplibregl.MapGeoJSONFeature) => {
  const properties = feature.properties ?? {};
  const name = typeof properties.name === "string" ? properties.name : "";
  const priorityLevel =
    typeof properties.priorityLevel === "string" ? properties.priorityLevel : "";
  const priorityScore =
    typeof properties.priorityScore === "number" || typeof properties.priorityScore === "string"
      ? properties.priorityScore
      : "";

  if (name && priorityLevel && priorityScore !== "") {
    return `${name} · ${priorityLevel} · ${priorityScore}/100`;
  }

  if (typeof properties.type === "string" && typeof properties.severity === "string") {
    return formatIncidentTooltip(properties.type, properties.severity);
  }

  if (name && typeof properties.accessStatus === "string") {
    return `${name} · ${properties.accessStatus} access`;
  }

  return null;
};

const firstRenderedFeature = (
  map: MapLibreMap,
  point: maplibregl.PointLike,
  layerIds: string[]
) => {
  for (const layerId of layerIds) {
    const features = map.queryRenderedFeatures(point, { layers: [layerId] });
    if (features[0]) {
      return features[0];
    }
  }

  return undefined;
};

function MapView({ items, selectedItemId, layerVisibility, basemap, onSelectItem }: MapViewProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const hasSkippedInitialSelectionRef = useRef(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoverTooltip, setHoverTooltip] = useState<HoverTooltip | null>(null);

  const parcelFeatures = useMemo(
    () => toFeatureCollection<Polygon>(items, "Polygon"),
    [items]
  );
  const assetFeatures = useMemo(() => toFeatureCollection<Point>(items, "Point"), [items]);
  const selectedItem = useMemo(
    () => items.find((item) => item.id === selectedItemId) ?? null,
    [items, selectedItemId]
  );
  const selectedFeatures = useMemo(
    () => selectedFeatureCollection(selectedItem),
    [selectedItem]
  );

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) {
      return;
    }

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      center: [-117.0665, 33.085],
      zoom: 13.65,
      minZoom: 9,
      maxZoom: ESRI_MAX_ZOOM,
      pitch: 34,
      bearing: -13,
      attributionControl: false,
      style: {
        version: 8,
        sources: {
          cartoDarkMatter: {
            type: "raster",
            tiles: [
              "https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
            ],
            tileSize: 256,
            maxzoom: 20,
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          },
          // Public Esri Canvas raster endpoints do not require an API key for this
          // prototype; CARTO Dark and the synthetic grid remain fallbacks.
          esriDarkGrayBase: {
            type: "raster",
            tiles: [
              "https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
            ],
            tileSize: 256,
            maxzoom: ESRI_MAX_ZOOM,
            attribution: "Tiles &copy; Esri"
          },
          esriDarkGrayReference: {
            type: "raster",
            tiles: [
              "https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}"
            ],
            tileSize: 256,
            maxzoom: ESRI_MAX_ZOOM,
            attribution: "Labels &copy; Esri"
          }
        },
        layers: [
          {
            id: "background",
            type: "background",
            paint: {
              "background-color": "#071014"
            }
          },
          {
            id: "carto-dark-matter",
            type: "raster",
            source: "cartoDarkMatter",
            layout: {
              visibility: "none"
            },
            paint: {
              "raster-opacity": 0.96,
              "raster-brightness-min": 0,
              "raster-brightness-max": 1,
              "raster-contrast": 0.08,
              "raster-saturation": -0.08
            }
          },
          {
            id: "esri-dark-gray-base",
            type: "raster",
            source: "esriDarkGrayBase",
            paint: {
              "raster-opacity": 1,
              "raster-brightness-min": 0,
              "raster-brightness-max": 1,
              "raster-contrast": 0.03,
              "raster-saturation": -0.08
            }
          }
        ]
      }
    });

    map.scrollZoom.enable();
    map.doubleClickZoom.enable();
    map.touchZoomRotate.enable();
    map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-right");
    map.addControl(
      new maplibregl.NavigationControl({ showCompass: true, visualizePitch: true }),
      "top-left"
    );

    map.on("load", () => {
      map.addSource("wildfire", { type: "geojson", data: wildfireBoundary });
      map.addSource("parcels", { type: "geojson", data: parcelFeatures });
      map.addSource("assets", { type: "geojson", data: assetFeatures });
      map.addSource("incidents", { type: "geojson", data: incidentsFeatureCollection });
      map.addSource("roads", { type: "geojson", data: roadAccessFeatureCollection });
      map.addSource("selected", { type: "geojson", data: selectedFeatures });
      map.addSource("hovered", { type: "geojson", data: emptyFeatureCollection });

      map.addLayer({
        id: "wildfire-fill",
        type: "fill",
        source: "wildfire",
        paint: {
          "fill-color": "#f97316",
          "fill-opacity": 0.13
        }
      });
      map.addLayer({
        id: "wildfire-glow",
        type: "line",
        source: "wildfire",
        paint: {
          "line-color": "#fb3f20",
          "line-width": 12,
          "line-opacity": 0.18,
          "line-blur": 8
        }
      });
      map.addLayer({
        id: "wildfire-line",
        type: "line",
        source: "wildfire",
        paint: {
          "line-color": "#ff8a2a",
          "line-width": 2.2,
          "line-opacity": 0.85
        }
      });
      map.addLayer({
        id: "esri-dark-gray-reference-overlay",
        type: "raster",
        source: "esriDarkGrayReference",
        paint: {
          "raster-opacity": 0.74,
          "raster-brightness-min": 0,
          "raster-brightness-max": 1,
          "raster-contrast": 0.08
        }
      });

      map.addLayer({
        id: "roads-casing",
        type: "line",
        source: "roads",
        paint: {
          "line-color": "#061013",
          "line-width": 8,
          "line-opacity": 0.82
        }
      });
      map.addLayer({
        id: "roads-open",
        type: "line",
        source: "roads",
        filter: ["==", ["get", "accessStatus"], "Open"],
        paint: {
          "line-color": "#48d597",
          "line-width": 3.4,
          "line-opacity": 0.92
        }
      });
      map.addLayer({
        id: "roads-limited",
        type: "line",
        source: "roads",
        filter: ["==", ["get", "accessStatus"], "Limited"],
        paint: {
          "line-color": "#f59e0b",
          "line-width": 4.2,
          "line-opacity": 0.92,
          "line-dasharray": [2, 1.2]
        }
      });
      map.addLayer({
        id: "roads-blocked",
        type: "line",
        source: "roads",
        filter: ["==", ["get", "accessStatus"], "Blocked"],
        paint: {
          "line-color": "#ef4444",
          "line-width": 4.6,
          "line-opacity": 0.92,
          "line-dasharray": [1, 1]
        }
      });

      map.addLayer({
        id: "parcels-fill",
        type: "fill",
        source: "parcels",
        paint: {
          "fill-color": [
            "match",
            ["get", "priorityLevel"],
            "High",
            "#ff6b35",
            "Medium",
            "#facc15",
            "#36d399"
          ],
          "fill-opacity": [
            "match",
            ["get", "priorityLevel"],
            "High",
            0.24,
            "Medium",
            0.15,
            0.09
          ]
        }
      });
      map.addLayer({
        id: "parcels-outline",
        type: "line",
        source: "parcels",
        paint: {
          "line-color": [
            "match",
            ["get", "priorityLevel"],
            "High",
            "#ffb08a",
            "Medium",
            "#ffe66b",
            "#80f0c1"
          ],
          "line-width": 1.15,
          "line-opacity": 0.82
        }
      });
      map.addLayer({
        id: "parcels-hitbox",
        type: "fill",
        source: "parcels",
        paint: {
          "fill-color": "#ffffff",
          "fill-opacity": 0
        }
      });
      map.addLayer({
        id: "parcels-priority-outline",
        type: "line",
        source: "parcels",
        filter: ["==", ["get", "priorityLevel"], "High"],
        paint: {
          "line-color": "#ff4d2d",
          "line-width": 3,
          "line-opacity": 0.68,
          "line-blur": 1.4
        }
      });

      map.addLayer({
        id: "assets-halo",
        type: "circle",
        source: "assets",
        paint: {
          "circle-radius": [
            "match",
            ["get", "priorityLevel"],
            "High",
            17,
            "Medium",
            14,
            12
          ],
          "circle-color": [
            "match",
            ["get", "priorityLevel"],
            "High",
            "#ff6b35",
            "Medium",
            "#facc15",
            "#36d399"
          ],
          "circle-opacity": 0.2,
          "circle-blur": 0.7
        }
      });
      map.addLayer({
        id: "assets-points",
        type: "circle",
        source: "assets",
        paint: {
          "circle-radius": 7,
          "circle-color": [
            "match",
            ["get", "priorityLevel"],
            "High",
            "#ff784f",
            "Medium",
            "#ffd84d",
            "#50e5a5"
          ],
          "circle-stroke-color": "#e8fbff",
          "circle-stroke-width": 1.6,
          "circle-opacity": 0.96
        }
      });

      map.addLayer({
        id: "incidents-glow",
        type: "circle",
        source: "incidents",
        paint: {
          "circle-radius": [
            "match",
            ["get", "severity"],
            "Severe",
            18,
            "High",
            15,
            12
          ],
          "circle-color": "#ff3b22",
          "circle-opacity": 0.18,
          "circle-blur": 0.8
        }
      });
      map.addLayer({
        id: "incidents-points",
        type: "circle",
        source: "incidents",
        paint: {
          "circle-radius": [
            "match",
            ["get", "severity"],
            "Severe",
            6.5,
            "High",
            5.5,
            4.5
          ],
          "circle-color": "#ff4b33",
          "circle-stroke-color": "#ffd6ce",
          "circle-stroke-width": 1,
          "circle-opacity": 0.95
        }
      });
      map.addLayer({
        id: "assets-hitbox",
        type: "circle",
        source: "assets",
        paint: {
          "circle-radius": 16,
          "circle-color": "#ffffff",
          "circle-opacity": 0.001
        }
      });
      map.addLayer({
        id: "incidents-hitbox",
        type: "circle",
        source: "incidents",
        paint: {
          "circle-radius": 15,
          "circle-color": "#ffffff",
          "circle-opacity": 0.001
        }
      });
      map.addLayer({
        id: "roads-hitbox",
        type: "line",
        source: "roads",
        paint: {
          "line-color": "#ffffff",
          "line-width": 14,
          "line-opacity": 0.001
        }
      });

      map.addLayer({
        id: "hover-parcel-fill",
        type: "fill",
        source: "hovered",
        filter: ["==", ["geometry-type"], "Polygon"],
        paint: {
          "fill-color": "#ffffff",
          "fill-opacity": 0.1
        }
      });
      map.addLayer({
        id: "hover-parcel-line",
        type: "line",
        source: "hovered",
        filter: ["==", ["geometry-type"], "Polygon"],
        paint: {
          "line-color": "#f8fafc",
          "line-width": 2.2,
          "line-opacity": 0.8,
          "line-blur": 0.4
        }
      });
      map.addLayer({
        id: "hover-road-line",
        type: "line",
        source: "hovered",
        filter: ["==", ["geometry-type"], "LineString"],
        paint: {
          "line-color": "#e8fbff",
          "line-width": 6,
          "line-opacity": 0.52
        }
      });
      map.addLayer({
        id: "hover-point-halo",
        type: "circle",
        source: "hovered",
        filter: ["==", ["geometry-type"], "Point"],
        paint: {
          "circle-radius": [
            "case",
            ["has", "severity"],
            14,
            16
          ],
          "circle-color": [
            "case",
            ["has", "severity"],
            "#ff6b4a",
            "#67e8f9"
          ],
          "circle-opacity": 0.22,
          "circle-blur": 0.45
        }
      });
      map.addLayer({
        id: "hover-point-ring",
        type: "circle",
        source: "hovered",
        filter: ["==", ["geometry-type"], "Point"],
        paint: {
          "circle-radius": [
            "case",
            ["has", "severity"],
            7.5,
            8.5
          ],
          "circle-color": "rgba(255, 255, 255, 0)",
          "circle-stroke-color": [
            "case",
            ["has", "severity"],
            "#ffd1c7",
            "#dffbff"
          ],
          "circle-stroke-width": 2.3,
          "circle-opacity": 0.95
        }
      });

      map.addLayer({
        id: "selected-fill",
        type: "fill",
        source: "selected",
        filter: ["==", ["geometry-type"], "Polygon"],
        paint: {
          "fill-color": "#22d3ee",
          "fill-opacity": 0.22
        }
      });
      map.addLayer({
        id: "selected-line",
        type: "line",
        source: "selected",
        filter: ["==", ["geometry-type"], "Polygon"],
        paint: {
          "line-color": "#67e8f9",
          "line-width": 4.5,
          "line-opacity": 0.95,
          "line-blur": 0.4
        }
      });
      map.addLayer({
        id: "selected-point-halo",
        type: "circle",
        source: "selected",
        filter: ["==", ["geometry-type"], "Point"],
        paint: {
          "circle-radius": 22,
          "circle-color": "#22d3ee",
          "circle-opacity": 0.24,
          "circle-blur": 0.5
        }
      });
      map.addLayer({
        id: "selected-point",
        type: "circle",
        source: "selected",
        filter: ["==", ["geometry-type"], "Point"],
        paint: {
          "circle-radius": 9,
          "circle-color": "#67e8f9",
          "circle-stroke-color": "#ecfeff",
          "circle-stroke-width": 2
        }
      });

      const initialBounds = new maplibregl.LngLatBounds(
        [-117.0793, 33.0778],
        [-117.0572, 33.0929]
      );
      map.fitBounds(initialBounds, {
        padding: { top: 48, bottom: 54, left: 54, right: 36 },
        pitch: 30,
        bearing: -10,
        duration: 0
      });

      mapContextLabels.forEach((contextLabel) => {
        const element = document.createElement("div");
        element.className = contextLabel.className;
        element.textContent = contextLabel.label;
        new maplibregl.Marker({
          element,
          anchor: "bottom-left",
          offset: [8, -8],
          pitchAlignment: "viewport",
          rotationAlignment: "viewport"
        })
          .setLngLat(contextLabel.coordinates)
          .addTo(map);
      });

      setIsLoaded(true);
    });

    const visibleLayerIds = (layerIds: string[]) =>
      layerIds.filter(
        (layerId) =>
          map.getLayer(layerId) &&
          map.getLayoutProperty(layerId, "visibility") !== "none"
      );

    const clearHover = () => {
      source(map, "hovered")?.setData(emptyFeatureCollection);
      setHoverTooltip(null);
      map.getCanvas().style.cursor = "";
    };

    const handleClick = (event: maplibregl.MapMouseEvent) => {
      const layers = visibleLayerIds(clickableLayerIds);
      if (layers.length === 0) {
        return;
      }

      const feature = firstRenderedFeature(map, event.point, layers);
      const featureId = feature?.properties?.id;
      if (typeof featureId === "string") {
        onSelectItem(featureId);
      }
    };

    const handleMouseMove = (event: maplibregl.MapMouseEvent) => {
      const layers = visibleLayerIds(interactiveHoverLayerIds);
      if (layers.length === 0) {
        clearHover();
        return;
      }

      const feature = firstRenderedFeature(map, event.point, layers);
      const tooltip = feature ? tooltipForFeature(feature) : null;

      if (!feature || !tooltip) {
        clearHover();
        return;
      }

      source(map, "hovered")?.setData(featureCollectionFromFeature(feature));
      map.getCanvas().style.cursor = "pointer";
      setHoverTooltip({
        x: event.point.x,
        y: event.point.y,
        text: tooltip
      });
    };

    map.on("click", handleClick);
    map.on("mousemove", handleMouseMove);
    map.getCanvasContainer().addEventListener("mouseleave", clearHover);

    mapRef.current = map;

    return () => {
      map.getCanvasContainer().removeEventListener("mouseleave", clearHover);
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !isLoaded) {
      return;
    }

    source(map, "parcels")?.setData(parcelFeatures);
    source(map, "assets")?.setData(assetFeatures);
    source(map, "selected")?.setData(selectedFeatures);
  }, [assetFeatures, isLoaded, parcelFeatures, selectedFeatures]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !isLoaded || !selectedItem) {
      return;
    }

    if (!hasSkippedInitialSelectionRef.current) {
      hasSkippedInitialSelectionRef.current = true;
      return;
    }

    map.flyTo({
      center: geometryCenter(selectedItem.geometry),
      zoom: Math.min(QUEUE_FLY_TO_ZOOM, map.getMaxZoom()),
      pitch: 34,
      bearing: -13,
      duration: 850,
      essential: true
    });
  }, [isLoaded, selectedItemId]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !isLoaded) {
      return;
    }

    const setBasemapVisibility = (layerId: string, visible: boolean) => {
      if (map.getLayer(layerId)) {
        map.setLayoutProperty(layerId, "visibility", visible ? "visible" : "none");
      }
    };

    const maxZoom = basemap === "esriDark" ? ESRI_MAX_ZOOM : DEFAULT_MAX_ZOOM;
    map.setMaxZoom(maxZoom);
    if (map.getZoom() > maxZoom) {
      map.easeTo({ zoom: maxZoom, duration: 250 });
    }

    setBasemapVisibility("carto-dark-matter", basemap === "cartoDark");
    setBasemapVisibility("esri-dark-gray-base", basemap === "esriDark");
    setBasemapVisibility("esri-dark-gray-reference-overlay", basemap === "esriDark");
  }, [basemap, isLoaded]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !isLoaded) {
      return;
    }

    const setVisibility = (layerIds: string[], visible: boolean) => {
      layerIds.forEach((layerId) => {
        if (map.getLayer(layerId)) {
          map.setLayoutProperty(layerId, "visibility", visible ? "visible" : "none");
        }
      });
    };

    setVisibility(["wildfire-fill", "wildfire-glow", "wildfire-line"], layerVisibility.wildfire);
    setVisibility(
      ["parcels-fill", "parcels-outline", "parcels-hitbox", "selected-fill", "selected-line"],
      layerVisibility.parcels
    );
    setVisibility(
      ["assets-halo", "assets-points", "assets-hitbox", "selected-point-halo", "selected-point"],
      layerVisibility.assets
    );
    setVisibility(["incidents-glow", "incidents-points", "incidents-hitbox"], layerVisibility.incidents);
    setVisibility(["roads-casing", "roads-open", "roads-limited", "roads-blocked", "roads-hitbox"], layerVisibility.roads);
    setVisibility(["parcels-priority-outline", "assets-halo"], layerVisibility.priority);
    source(map, "hovered")?.setData(emptyFeatureCollection);
    setHoverTooltip(null);
  }, [isLoaded, layerVisibility]);

  return (
    <div className="mapFrame">
      <div
        className={basemap === "synthetic" ? "mapTexture visible" : "mapTexture"}
        aria-hidden="true"
      />
      <div ref={mapContainerRef} className="mapContainer" />
      {hoverTooltip ? (
        <div
          className="mapHoverTooltip"
          style={{
            left: hoverTooltip.x,
            top: hoverTooltip.y
          }}
        >
          {hoverTooltip.text}
        </div>
      ) : null}
    </div>
  );
}

export default MapView;
