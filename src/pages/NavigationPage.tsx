import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageWrapper from "@/components/layout/PageWrapper";
import { usePlace } from "@/hooks/queries/usePlaces";
import { mapPlaceResponseToDestination } from "@/lib/mappers/placeMapper";
import { ApiErrorState, PageLoading } from "@/components/feedback/ApiQueryState";
import { getErrorMessage } from "@/lib/utils/errorMessages";

// Hooks de Navigation
import { useRealtimeRoute, TravelMode } from "@/hooks/queries/useRealtimeRoute";
import { useRealtimeTracker } from "@/components/navigation/UserTracker";

// UI Components
import RoutePanel from "@/components/navigation/RoutePanel";
import RouteProgress from "@/components/navigation/RouteProgress";
import ArrivalBanner from "@/components/navigation/ArrivalBanner";
import RerouteAlert from "@/components/navigation/RerouteAlert";
import NavigationMap from "@/components/navigation/NavigationMap";

const NavigationPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [mode, setMode] = useState<TravelMode>("driving");
  
  // States de progression
  const [initialDistance, setInitialDistance] = useState<number | null>(null);
  const [deviated, setDeviated] = useState(false);

  // 1. Data de Destination
  const query = usePlace(slug as string);
  const destination = query.data ? mapPlaceResponseToDestination(query.data) : null;

  // 2. Traqueur GPS Haute Précision
  const tracker = useRealtimeTracker();
  
  useEffect(() => {
    // Force la demande GPS lorsqu'on atterrit sur la page
    const timer = setTimeout(() => tracker.setIsTracking(true), 500);
    return () => clearTimeout(timer);
  }, [tracker.setIsTracking]);

  // 3. Routage OSRM Réel
  const destCoords: [number, number] | null = destination
    ? [destination.coordinates.lat, destination.coordinates.lng]
    : null;

  const {
    route,
    loading: routeLoading,
    error: routeError,
  } = useRealtimeRoute(tracker.position, destCoords, mode);

  // Analyser la progression
  useEffect(() => {
    if (!route) return;
    
    if (initialDistance === null) {
      setInitialDistance(route.distance);
    } else {
      // Déviation basique si la distance soudaine explose au-delà des 500m de l'initial (faux tournant)
      if (route.distance > initialDistance + 500) {
        setDeviated(true);
      } else {
        setDeviated(false);
      }
    }
  }, [route, initialDistance]);

  const handleManualReroute = () => {
    // Un recalcul force est purement esthétique car useRealtimeRoute ping automatiquement
    setInitialDistance(route?.distance || null);
    setDeviated(false);
  };

  // Rendering
  if (query.isLoading) {
    return <PageWrapper><PageLoading label="Chargement de l'itinéraire..." /></PageWrapper>;
  }

  if (query.isError || !destination) {
    return (
      <PageWrapper>
        <div className="container py-12 flex h-[80vh] items-center justify-center">
           <ApiErrorState message={getErrorMessage(query.error)} onRetry={() => query.refetch()} />
        </div>
      </PageWrapper>
    );
  }

  // Si le tracker n'a pas encore la position, on affiche un message d'attente propre
  if (!tracker.position) {
    return (
       <PageWrapper>
         <div className="flex h-[calc(100vh-72px)] flex-col items-center justify-center px-4 text-center">
            <div className="w-16 h-16 animate-pulse rounded-full bg-primary/20 flex items-center justify-center mb-6">
               <div className="w-6 h-6 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
            <h2 className="text-2xl font-black mb-2">Acquisition GPS...</h2>
            <p className="text-muted-foreground font-medium">
              Veuillez autoriser l'accès à votre position pour démarrer la navigation.
            </p>
         </div>
       </PageWrapper>
    );
  }

  const distance = route?.distance ?? null;
  const duration = route?.duration ?? null;

  return (
    <PageWrapper>
      <div
        className="relative w-full mt-20 overflow-hidden bg-muted/30"
        style={{ height: "min(100dvh, calc(100vh - 72px))" }}
      >
        {/* Panneau de contrôle HUD */}
        <RoutePanel
          destination={destination}
          travelMode={mode}
          setTravelMode={setMode}
          distance={distance}
          duration={duration}
          isLoading={routeLoading}
          routeError={routeError}
        >
          {/* Progression intégrée au panneau */}
          <RouteProgress initialDistance={initialDistance} currentDistance={distance} />
          
          {/* Alerte Déviation sous la barre */}
          <RerouteAlert deviated={deviated} onReroute={handleManualReroute} />
        </RoutePanel>

        {/* Bannière de Fin de Trajet (Moins de 50m) */}
        <ArrivalBanner distanceMeters={distance} threshold={50} />

        {/* Moteur Rendu Leaflet */}
        <NavigationMap
          destination={destination}
          currentPosition={tracker.position}
          routeCoords={route?.geometry || []}
          travelMode={mode}
        />

      </div>
    </PageWrapper>
  );
};

export default NavigationPage;
