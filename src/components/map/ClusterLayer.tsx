import { ReactNode, useCallback } from "react";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import { getCategorySVG } from "./MapIconMapper";

interface ClusterLayerProps {
  children: ReactNode;
}

export default function ClusterLayer({ children }: ClusterLayerProps) {
  const createClusterCustomIcon = useCallback((cluster: any) => {
    const markers = cluster.getAllChildMarkers();
    const count = markers.length;

    // Essayer de trouver la catégorie majoritaire ou représentative
    // En récupérant les catégories depuis les markers (si stockées dans les options ou via d'autres moyens)
    // Ici on va faire simple : si on ne peut pas extraire la catégorie facilement, on utilise une couleur par défaut
    // Mais on peut essayer d'extraire la couleur dominante

    let dominantColor = "#3b82f6";
    let iconSvg = getCategorySVG("default", "#3b82f6", 12);

    try {
      // Les markers créés dans PlaceMarker ont un divIcon avec le style background-color
      // On peut essayer d'extraire l'info si on l'a passée en options
      const firstMarker = markers[0];
      const html = firstMarker.options.icon.options.html;

      // Extraire la couleur
      const colorMatch = html.match(
        /background-color:\s*(#[a-fA-F0-9]+|[a-z]+)/,
      );
      if (colorMatch) dominantColor = colorMatch[1];

      // Extraire l'icône (le contenu du div interne tourné de 45deg)
      const svgMatch = html.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
      if (svgMatch) {
        iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${dominantColor}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${svgMatch[1]}</svg>`;
      }
    } catch (e) {
      // Fallback
    }

    return L.divIcon({
      html: `
        <div style="
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          background-color: ${dominantColor};
          color: white;
          border: 3px solid white;
          border-radius: 50%;
          font-weight: 900;
          font-size: 15px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.4);
          position: relative;
        ">
          ${count}
          <div style="
            position: absolute;
            bottom: -4px;
            right: -4px;
            width: 22px;
            height: 22px;
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid ${dominantColor};
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
          ">
            ${iconSvg}
          </div>
        </div>
      `,
      className: "custom-cluster-icon",
      iconSize: L.point(44, 44),
    });
  }, []);

  return (
    <MarkerClusterGroup
      chunkedLoading
      showCoverageOnHover={false}
      maxClusterRadius={50}
      iconCreateFunction={createClusterCustomIcon}
    >
      {children}
    </MarkerClusterGroup>
  );
}
