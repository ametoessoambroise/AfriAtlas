import { ReactNode } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import type { LatLngBoundsExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

// Frontières strictes pour encadrer le Togo
const TOGO_BOUNDS: LatLngBoundsExpression = [
  [6.0, -0.2], // Extrême Sud-Ouest
  [11.2, 1.8], // Extrême Nord-Est
];

interface InteractiveMapProps {
  children: ReactNode;
}

export default function InteractiveMap({ children }: InteractiveMapProps) {
  return (
    <MapContainer
      center={[8.6195, 0.8248]} // Centre approximatif du Togo
      zoom={7}
      minZoom={7}
      maxZoom={18}
      maxBounds={TOGO_BOUNDS}
      maxBoundsViscosity={1.0} // Empêche le rebond hors des bordures
      style={{ height: "100%", width: "100%", zIndex: 0 }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
}
