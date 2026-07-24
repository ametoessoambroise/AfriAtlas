import { useState, useEffect } from "react";
import { Locate, Navigation } from "lucide-react";
import { useMapEvents, CircleMarker } from "react-leaflet";
import { motion, AnimatePresence } from "framer-motion";

export default function UserLocationDot() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [askPermission, setAskPermission] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);

  // leaflet hook pour intercepter la position
  const map = useMapEvents({
    locationfound(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      map.flyTo(e.latlng, map.getZoom(), { duration: 1 });
      setLoading(false);
    },
    locationerror(e) {
      console.warn("Location error: ", e);
      setLoading(false);
      setErrorVisible(true);
      setTimeout(() => setErrorVisible(false), 3000);
    },
  });

  const requestLocation = () => {
    setLoading(true);
    setAskPermission(false);
    map.locate({ setView: true, maxZoom: 14 });
  };

  // Listen for external locate requests (from MapLayerControl)
  useEffect(() => {
    const handleLocateRequest = () => {
      if (!position) {
        setAskPermission(true);
      } else {
        map.flyTo(position, 14);
      }
    };

    window.addEventListener('map:locate', handleLocateRequest);
    return () => window.removeEventListener('map:locate', handleLocateRequest);
  }, [position, map]);

  return (
    <>
      <div className="absolute right-4 bottom-8 z-[1000]">
        <button
          onClick={() => (!position ? setAskPermission(true) : map.flyTo(position, 14))}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-105 active:scale-95"
          aria-label="Ma position"
        >
          {loading ? (
             <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
          ) : (
             <Navigation className={`h-5 w-5 ${position ? 'fill-current' : ''}`} />
          )}
        </button>
        {errorVisible && (
            <div className="absolute right-14 top-1 -translate-y-1 bg-destructive text-destructive-foreground text-xs whitespace-nowrap px-3 py-1.5 rounded-md font-medium shadow-md">
              Localisation introuvable
            </div>
        )}
      </div>

      {position && (
        <CircleMarker
          center={position}
          radius={8}
          pathOptions={{ fillColor: "#3b82f6", color: "#ffffff", weight: 3, fillOpacity: 1 }}
        />
      )}

      {/* Permission UX Popup demandée par l'user */}
      <AnimatePresence>
        {askPermission && (
          <div className="absolute inset-0 z-[2000] flex items-center justify-center bg-background/60 backdrop-blur-sm px-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm rounded-md bg-card p-6 shadow-2xl text-center border border-border"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Locate className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-extrabold text-foreground">
                Position GPS
              </h3>
              <p className="mb-6 text-sm text-muted-foreground">
                Afriatlas a besoin de votre position pour afficher les destinations à proximité et vous guider facilement.
              </p>
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={requestLocation}
                  className="btn-primary w-full py-3 text-sm font-bold"
                >
                  Partager ma position
                </button>
                <button
                  type="button"
                  onClick={() => setAskPermission(false)}
                  className="w-full py-3 text-sm font-semibold text-muted-foreground hover:bg-muted/50 rounded-md transition-colors"
                >
                  Plus tard
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
