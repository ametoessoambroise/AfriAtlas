import { ReactNode, useState, useCallback } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import type { LatLngBoundsExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

// Advanced Controls
import MapSearchControl from "./controls/MapSearchControl";
import MapLayerControl from "./controls/MapLayerControl";

// Frontières strictes pour encadrer le Togo
const TOGO_BOUNDS: LatLngBoundsExpression = [
  [6.0, -0.2], // Extrême Sud-Ouest
  [11.2, 1.8], // Extrême Nord-Est
];

interface InteractiveMapProps {
  children: ReactNode;
  showSearch?: boolean;
  showControls?: boolean;
}

export default function InteractiveMap({ 
  children, 
  showSearch = true, 
  showControls = true 
}: InteractiveMapProps) {
  const [activeLayer, setActiveLayer] = useState<'osm' | 'satellite'>('osm');

  const handleToggleLayer = useCallback((layer: 'osm' | 'satellite') => {
    setActiveLayer(layer);
  }, []);

  // Placeholder for locate logic - actual logic is in UserLocationDot
  // but we can pass a trigger if needed. For now, we rely on the existing 
  // UserLocationDot component which has its own button.
  const handleLocate = useCallback(() => {
    // This is handled by UserLocationDot in the children
    // but if we want to trigger it from the control panel, 
    // we would need a way to communicate.
    // For now, let's trigger a map event that UserLocationDot can listen to.
    const customEvent = new CustomEvent('map:locate');
    window.dispatchEvent(customEvent);
  }, []);

  return (
    <div className="relative h-full w-full">
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
        {/* Base Tile Layer */}
        {activeLayer === 'osm' ? (
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        ) : (
          <TileLayer
            attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        )}

        {/* Search Bar (OpenStreetMap Nominatim) */}
        {showSearch && <MapSearchControl />}

        {/* Advanced Layer & Control Panel */}
        {showControls && (
          <MapLayerControl 
            currentLayer={activeLayer} 
            onToggleLayer={handleToggleLayer}
            onLocate={handleLocate}
          />
        )}

        {children}
      </MapContainer>
    </div>
  );
}
