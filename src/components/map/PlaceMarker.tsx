import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import type { Destination } from "@/lib/models/ui";
import PlacePopup from "./PlacePopup";
import { getCategoryColor, getCategorySVG } from "./MapIconMapper";

interface PlaceMarkerProps {
  destination: Destination;
  isSelected?: boolean;
  onClick: (slug: string) => void;
}

export default function PlaceMarker({ destination, isSelected, onClick }: PlaceMarkerProps) {
  const color = getCategoryColor(destination.category);
  const iconSvg = getCategorySVG(destination.category, "white", 16);

  // Création d'un icône personnalisé avec un "pin" et l'icône de catégorie
  const customIcon = L.divIcon({
    className: "custom-place-marker",
    html: `
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        width: ${isSelected ? '40px' : '32px'};
        height: ${isSelected ? '40px' : '32px'};
        background-color: ${color};
        border: 2px solid white;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        transition: all 0.3s ease;
      ">
        <div style="
          transform: rotate(45deg);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          ${iconSvg}
        </div>
      </div>
    `,
    iconSize: [isSelected ? 40 : 32, isSelected ? 40 : 32],
    iconAnchor: [isSelected ? 20 : 16, isSelected ? 40 : 32],
    popupAnchor: [0, isSelected ? -40 : -32],
  });

  return (
    <Marker
      position={[destination.coordinates.lat, destination.coordinates.lng]}
      icon={customIcon}
      eventHandlers={{ 
         click: () => onClick(destination.slug) 
      }}
    >
      <Popup className="rounded-md overflow-hidden shadow-2xl border-none">
        <PlacePopup destination={destination} />
      </Popup>
    </Marker>
  );
}
