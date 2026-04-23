import { useState, useEffect, useMemo, useRef } from "react";

export type TravelMode = "driving" | "walking" | "cycling";

interface RouteInfo {
  distance: number; // en mètres
  duration: number; // en secondes
  geometry: [number, number][]; // lat, lng polyline
}

/** Réduit les recalculs OSRM à chaque tick GPS (référence tableau instable) tout en gardant une précision ~10–15 m */
function quantizeCoord(n: number) {
  return Math.round(n * 1e4) / 1e4;
}

export function useRealtimeRoute(
  startLatLng: [number, number] | null,
  endLatLng: [number, number] | null,
  mode: TravelMode = "driving"
) {
  const [route, setRoute] = useState<RouteInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startKey = startLatLng
    ? `${quantizeCoord(startLatLng[0])},${quantizeCoord(startLatLng[1])}`
    : "";
  const endKey = endLatLng
    ? `${quantizeCoord(endLatLng[0])},${quantizeCoord(endLatLng[1])}`
    : "";

  const requestKey = useMemo(
    () => `${startKey}|${endKey}|${mode}`,
    [startKey, endKey, mode]
  );

  const prevModeRef = useRef<TravelMode>(mode);

  useEffect(() => {
    if (!startLatLng || !endLatLng || !startKey || !endKey) {
      setRoute(null);
      setLoading(false);
      setError(null);
      return;
    }

    const modeChanged = prevModeRef.current !== mode;
    prevModeRef.current = mode;

    const controller = new AbortController();
    let cancelled = false;

    const fetchRoute = async () => {
      setLoading(true);
      setError(null);
      if (modeChanged) {
        setRoute(null);
      }

      let osrmProfile = "driving";
      if (mode === "walking") osrmProfile = "foot";
      if (mode === "cycling") osrmProfile = "bike";

      try {
        const startParts = startKey.split(",");
        const endParts = endKey.split(",");
        const url = `https://router.project-osrm.org/route/v1/${osrmProfile}/${startParts[1]},${startParts[0]};${endParts[1]},${endParts[0]}?overview=full&geometries=geojson`;
        const res = await fetch(url, { signal: controller.signal });
        const data = await res.json();

        if (cancelled) return;

        if (data.code !== "Ok" || !data.routes || data.routes.length === 0) {
          throw new Error("Impossible de calculer l'itinéraire.");
        }

        const primaryRoute = data.routes[0];

        const leafletCoords: [number, number][] = primaryRoute.geometry.coordinates.map(
          (coord: [number, number]) => [coord[1], coord[0]]
        );

        setRoute({
          distance: primaryRoute.distance,
          duration: primaryRoute.duration,
          geometry: leafletCoords,
        });
      } catch (err: unknown) {
        if (cancelled) return;
        const e = err as { name?: string; message?: string };
        if (e?.name === "AbortError") return;
        setError(e?.message || "Erreur réseau.");
        setRoute(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchRoute();

    return () => {
      cancelled = true;
      controller.abort();
    };
    // `requestKey` regroupe position quantifiée + destination + mode (évite courses entre réponses OSRM)
  }, [requestKey, startKey, endKey, mode]);

  return { route, loading, error };
}
