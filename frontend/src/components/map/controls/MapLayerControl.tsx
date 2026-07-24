import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import * as L from "leaflet";

interface MapLayerControlProps {
  currentLayer: "osm" | "satellite";
  onToggleLayer: (layer: "osm" | "satellite") => void;
  onLocate: () => void;
}

export default function MapLayerControl({
  currentLayer,
  onToggleLayer,
  onLocate,
}: MapLayerControlProps) {
  const map = useMap();

  useEffect(() => {
    const CustomControl = L.Control.extend({
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
        div.style.flexDirection = "column";
        div.style.gap = "4px";
        div.style.border = "none";

        div.innerHTML = `
          <button id="locate-me-btn" title="Ma position" style="width: 32px; height: 32px; border: none; background: white; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #3f3f46;"><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg>
          </button>
          <div style="height: 1px; background: #e4e4e7; margin: 0 4px;"></div>
          <button id="satellite-toggle-btn" title="Changer de vue" style="width: 32px; height: 32px; border: none; background: ${currentLayer === "satellite" ? "#f4f4f5" : "white"}; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s;">
            ${
              currentLayer === "satellite"
                ? '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #0ea5e9;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>'
                : '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #3f3f46;"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>'
            }
          </button>
        `;

        L.DomEvent.disableClickPropagation(div);

        const locateBtn = div.querySelector(
          "#locate-me-btn",
        ) as HTMLButtonElement;
        const satelliteBtn = div.querySelector(
          "#satellite-toggle-btn",
        ) as HTMLButtonElement;

        locateBtn.onclick = () => onLocate();
        satelliteBtn.onclick = () => {
          onToggleLayer(currentLayer === "osm" ? "satellite" : "osm");
        };

        // Hover effects
        locateBtn.onmouseenter = () => {
          locateBtn.style.backgroundColor = "#f4f4f5";
        };
        locateBtn.onmouseleave = () => {
          locateBtn.style.backgroundColor = "white";
        };
        satelliteBtn.onmouseenter = () => {
          satelliteBtn.style.backgroundColor = "#f4f4f5";
        };
        satelliteBtn.onmouseleave = () => {
          satelliteBtn.style.backgroundColor = 
            currentLayer === "satellite" ? "#f4f4f5" : "white";
        };

        return div;
      },
    });

    const control = new CustomControl({ position: "topright" });

    control.addTo(map);

    return () => {
      control.remove();
    };
  }, [map, currentLayer, onToggleLayer, onLocate]);

  return null;
}
