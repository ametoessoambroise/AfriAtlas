import React, { useState, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import * as L from 'leaflet';
import { Search } from 'lucide-react';

interface MapSearchControlProps {
  onSearch?: (result: { latLng: [number, number]; name: string }) => void;
}

export default function MapSearchControl({ onSearch }: MapSearchControlProps) {
  const map = useMap();
  const [query, setQuery] = useState('');

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`
      );
      const results = await response.json();
      
      if (results.length > 0) {
        const { lat, lon, display_name } = results[0];
        const latLng: [number, number] = [parseFloat(lat), parseFloat(lon)];
        map.flyTo(latLng, 13, { duration: 1.5 });
        onSearch?.({ latLng, name: display_name });
      }
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  useEffect(() => {
    const SearchControl = L.Control.extend({
      onAdd: function () {
        const div = L.DomUtil.create(
          "div",
          "leaflet-bar leaflet-control leaflet-control-custom",
        );
        div.style.backgroundColor = "white";
        div.style.padding = "4px";
        div.style.borderRadius = "8px";
        div.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
        div.style.display = "flex";
        div.style.alignItems = "center";
        div.style.gap = "4px";
        div.style.border = "none";

        div.innerHTML = `
          <div style="display: flex; items-center; background: #f4f4f5; border-radius: 6px; padding: 0 8px;">
            <span style="display: flex; align-items: center; justify-content: center; height: 32px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search text-muted-foreground"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </span>
            <input 
              id="map-search-input" 
              type="text" 
              placeholder="Search the world..." 
              style="border: none; background: transparent; padding: 6px 4px; font-size: 12px; outline: none; width: 140px; font-family: inherit;"
            />
          </div>
        `;

        L.DomEvent.disableClickPropagation(div);

        const input = div.querySelector("#map-search-input") as HTMLInputElement;

        input.addEventListener("keypress", (e) => {
          if (e.key === "Enter") {
            handleSearch(input.value);
          }
        });

        return div;
      },
    });

    const control = new SearchControl({ position: 'topleft' });

    control.addTo(map);

    return () => {
      control.remove();
    };
  }, [map]);

  return null;
}
