import React from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Polyline,
  Popup,
} from "react-leaflet";
import type { PlaceListResponse } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import InteractiveMap from "@/components/map/InteractiveMap";

const TOGO_BOUNDS: any = [
  [6.0, -0.2],
  [11.2, 1.8],
];

export default function TravelMapWidget({
  places,
}: {
  places: PlaceListResponse[];
}) {
  // Extract coordinates for places that have them
  const validPlaces = places.filter((p) => p.latitude && p.longitude);

  const coords: [number, number][] = validPlaces.map((p) => [
    parseFloat(p.latitude as string),
    parseFloat(p.longitude as string),
  ]);

  // Aggregate by country (or city if country is missing)
  const stats = places.reduce(
    (acc, place) => {
      const loc = place.country || place.city || "Togo"; // Fallback to Togo
      if (!acc[loc]) {
        acc[loc] = 1; // Simplification: we count 1 per place. TODO : Ideally we count photos linked to this place.
      } else {
        acc[loc]++;
      }
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-2xl font-black">Carte de mon voyage</h2>
        <p className="text-muted-foreground text-sm font-medium">
          Clique sur un pays pour voir les photos
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 h-[400px]">
        {/* Map Container (2/3) */}
        <div className="md:col-span-2 relative rounded-[2rem] overflow-hidden border border-border shadow-sm">
          <InteractiveMap>
            {/* Dashed line connecting places */}
            {coords.length > 1 && (
              <Polyline
                positions={coords}
                pathOptions={{
                  color: "#1d4ed8",
                  weight: 2,
                  dashArray: "10, 15",
                  opacity: 0.5,
                }}
              />
            )}

            {/* Markers */}
            {validPlaces.map((place, index) => (
              <CircleMarker
                key={place.id}
                center={[
                  parseFloat(place.latitude!),
                  parseFloat(place.longitude!),
                ]}
                radius={12}
                pathOptions={{
                  fillColor: "#1d4ed8",
                  color: "white",
                  weight: 3,
                  fillOpacity: 1,
                }}
              >
                <Popup className="rounded-xl overflow-hidden p-0 border-0 shadow-xl">
                  <div className="w-48">
                    <img
                      src={place.primary_image?.url || "/placeholder.png"}
                      alt={place.name}
                      className="w-full h-24 object-cover"
                    />
                    <div className="p-3">
                      <h4 className="font-bold text-sm truncate">
                        {place.name}
                      </h4>
                      <p className="text-[10px] uppercase text-muted-foreground font-bold mt-1 tracking-wider">
                        {place.category}
                      </p>
                      <Link
                        to={`/destinations/${place.slug}`}
                        className="mt-2 block w-full text-center text-xs font-bold text-white bg-primary py-1.5 rounded-lg"
                      >
                        Voir le lieu
                      </Link>
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </InteractiveMap>
        </div>

        {/* Stats Sidebar (1/3)
        <div className="bg-white border border-border rounded-[2rem] p-6 shadow-sm flex flex-col">
          <div className="space-y-4 flex-1">
            {Object.entries(stats).map(([location, count], idx) => (
              <div key={idx} className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-sm font-bold">
                  <div className="flex items-center gap-2">
                    <span className="text-base">
                      {location === "Togo" ? "🇹🇬" : "🌍"}
                    </span>
                    {location}
                  </div>
                  <span className="text-muted-foreground font-medium">
                    {count} lieu{count > 1 ? "x" : ""}
                  </span>
                </div>
                {idx < Object.entries(stats).length - 1 && (
                  <hr className="border-border/50 my-2" />
                )}
              </div>
            ))}

            {Object.keys(stats).length === 0 && (
              <div className="text-center py-8 text-sm text-muted-foreground italic">
                Aucun lieu assigné.
              </div>
            )}
          </div>

          <Button
            variant="outline"
            className="w-full rounded-xl border-border/50 mt-4 text-xs font-bold h-10 hover:bg-muted/50"
          >
            Voir tous les pays
          </Button>
        </div> */}
      </div>
    </div>
  );
}
