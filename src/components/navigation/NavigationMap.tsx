import { useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  CircleMarker,
  useMap,
  ZoomControl,
  Popup,
} from "react-leaflet";
import type { Destination } from "@/lib/models/ui";
import type { TravelMode } from "@/hooks/queries/useRealtimeRoute";
import PlacePopup from "@/components/map/PlacePopup";
import type { LatLngBoundsExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

const TOGO_BOUNDS: LatLngBoundsExpression = [
  [6.0, -0.2],
  [11.2, 1.8],
];

/** Recadre la carte seulement au premier tracé ou après changement de mode — pas à chaque tick GPS */
function AutoFitter({
  routeCoords,
  startCoords,
  endCoords,
  travelMode,
}: {
  routeCoords: [number, number][];
  startCoords: [number, number] | null;
  endCoords: [number, number] | null;
  travelMode: TravelMode;
}) {
  const map = useMap();
  const lastModeRef = useRef<TravelMode>(travelMode);
  const didFitRouteRef = useRef(false);

  useEffect(() => {
    if (routeCoords.length === 0) {
      didFitRouteRef.current = false;
      if (startCoords && endCoords) {
        map.fitBounds(
          [startCoords, endCoords] as [[number, number], [number, number]],
          {
            padding: [48, 48],
            maxZoom: 15,
            animate: false,
          },
        );
      }
      return;
    }

    const modeChanged = lastModeRef.current !== travelMode;
    lastModeRef.current = travelMode;

    if (modeChanged || !didFitRouteRef.current) {
      map.fitBounds(routeCoords as [number, number][], {
        padding: [56, 56],
        maxZoom: 15,
        animate: false,
      });
      didFitRouteRef.current = true;
    }
  }, [map, routeCoords, startCoords, endCoords, travelMode]);

  return null;
}

/** Leaflet sous-estime souvent la taille après layout / animation parente */
function MapInvalidateOnLayout() {
  const map = useMap();
  useEffect(() => {
    const run = () => map.invalidateSize({ animate: false });
    run();
    const t1 = window.setTimeout(run, 120);
    const t2 = window.setTimeout(run, 450);
    window.addEventListener("resize", run);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("resize", run);
    };
  }, [map]);
  return null;
}

interface NavigationMapProps {
  destination: Destination;
  currentPosition: [number, number] | null;
  routeCoords: [number, number][];
  travelMode: TravelMode;
}

export default function NavigationMap({
  destination,
  currentPosition,
  routeCoords,
  travelMode,
}: NavigationMapProps) {
  const destCoords: [number, number] = [
    destination.coordinates.lat,
    destination.coordinates.lng,
  ];

  return (
    <MapContainer
      center={destCoords}
      zoom={14}
      className="z-0 h-full w-full min-h-[320px] touch-manipulation [&_.leaflet-container]:font-sans"
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom
      dragging
      touchZoom
      doubleClickZoom
      boxZoom
      keyboard
      zoomControl={false}
      minZoom={7}
      maxBounds={TOGO_BOUNDS}
      maxBoundsViscosity={1.0}
    >
      <MapInvalidateOnLayout />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <ZoomControl position="bottomright" />

      <AutoFitter
        routeCoords={routeCoords}
        startCoords={currentPosition}
        endCoords={destCoords}
        travelMode={travelMode}
      />

      {routeCoords.length > 0 && (
        <Polyline
          positions={routeCoords}
          pathOptions={{
            color: "hsl(var(--primary))",
            weight: 6,
            opacity: 0.92,
            lineCap: "round",
            lineJoin: "round",
          }}
        />
      )}

      <CircleMarker
        center={destCoords}
        radius={11}
        pathOptions={{
          fillColor: "#ea580c",
          color: "#fff",
          weight: 3,
          fillOpacity: 1,
        }}
      >
        <Popup
          className="p-0 border-0 rounded-xl overflow-hidden"
          closeButton={false}
        >
          <PlacePopup destination={destination} />
        </Popup>
      </CircleMarker>

      {currentPosition && (
        <CircleMarker
          center={currentPosition}
          radius={9}
          pathOptions={{
            fillColor: "hsl(var(--primary))",
            color: "#fff",
            weight: 3,
            fillOpacity: 1,
          }}
        />
      )}
    </MapContainer>
  );
}
