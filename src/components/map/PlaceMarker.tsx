import { CircleMarker, Popup } from "react-leaflet";
import type { Destination } from "@/lib/models/ui";
import PlacePopup from "./PlacePopup";

const typeColors: Record<string, string> = {
  city: "#3dc2c7",
  hotel: "#f59e0b",
  restaurant: "#f97316",
  supermarket: "#22c55e",
  museum: "#33eac5ff",
  market: "#ea3333ff",
  university: "#95e6f2ff",
  stadium: "#e4ea33ff",
  mosque: "#223011ff",
  church: "#3352eaff",
  gasStation: "#9333ea",
};

interface PlaceMarkerProps {
  destination: Destination;
  isSelected?: boolean;
  onClick: (slug: string) => void;
}

export default function PlaceMarker({ destination, isSelected, onClick }: PlaceMarkerProps) {
  const color = typeColors[destination.category] || "#3dc2c7";

  return (
    <CircleMarker
      center={[destination.coordinates.lat, destination.coordinates.lng]}
      radius={isSelected ? 10 : 7}
      pathOptions={{
        fillColor: color,
        color: isSelected ? "#000" : "#fff",
        weight: isSelected ? 3 : 2,
        fillOpacity: 0.9,
      }}
      eventHandlers={{ 
         click: () => onClick(destination.slug) 
      }}
    >
      <Popup className="rounded-xl overflow-hidden shadow-2xl border-none">
        <PlacePopup destination={destination} />
      </Popup>
    </CircleMarker>
  );
}
