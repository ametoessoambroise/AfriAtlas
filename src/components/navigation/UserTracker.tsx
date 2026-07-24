import { useEffect, useState } from "react";

/**
 * Hook personnalisé pour traquer l'utilisateur de force (gps haute précision).
 * Retourne le state position [lat, lng], un état d'erreur et la permission.
 */
export function useRealtimeTracker() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    if (!isTracking) return;

    let watchId: number;

    const successParams = (pos: GeolocationPosition) => {
      setPosition([pos.coords.latitude, pos.coords.longitude]);
      setError(null);
    };

    const errorParams = (err: GeolocationPositionError) => {
      setError(err.message);
    };

    if ("geolocation" in navigator) {
      watchId = navigator.geolocation.watchPosition(successParams, errorParams, {
        enableHighAccuracy: true,
        maximumAge: 2000,
        timeout: 10000,
      });
    } else {
      setError("La géolocalisation n'est pas supportée par ce navigateur.");
    }

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, [isTracking]);

  return { position, error, isTracking, setIsTracking };
}
