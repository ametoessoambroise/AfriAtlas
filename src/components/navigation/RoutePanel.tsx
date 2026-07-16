import { ReactNode } from "react";
import { ChevronLeft, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TravelModeSelector from "./TravelModeSelector";
import EtaDisplay from "./EtaDisplay";
import type { TravelMode } from "@/hooks/queries/useRealtimeRoute";
import type { Destination } from "@/lib/models/ui";
import { cn } from "@/lib/utils";

interface RoutePanelProps {
  destination: Destination;
  travelMode: TravelMode;
  setTravelMode: (m: TravelMode) => void;
  distance: number | null;
  duration: number | null;
  isLoading: boolean;
  routeError?: string | null;
  children?: ReactNode;
}

export default function RoutePanel({
  destination,
  travelMode,
  setTravelMode,
  distance,
  duration,
  isLoading,
  routeError,
  children,
}: RoutePanelProps) {
  const navigate = useNavigate();
  const hasEta = distance !== null && duration !== null;

  return (
    <div className="pointer-events-none absolute left-3 right-3 top-3 z-[1000] flex max-w-[min(100%,22rem)] flex-col gap-2 sm:left-4 sm:right-auto sm:max-w-[380px]">
      <div
        className={cn(
          "pointer-events-auto rounded-md border border-border/60 bg-card/95 p-4 shadow-2xl backdrop-blur-xl",
          "ring-1 ring-black/5 dark:ring-white/10",
        )}
      >
        <div className="mb-4 flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Retour"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-muted/80 text-foreground transition-colors hover:bg-muted touch-manipulation"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="text-lg font-bold leading-tight tracking-tight sm:text-xl">
              {destination.name}
            </h1>
            <p className="text-xs font-medium text-muted-foreground">{destination.city}</p>
          </div>
        </div>

        <TravelModeSelector mode={travelMode} onModeChange={setTravelMode} />

        <div className="relative min-h-[5.5rem]">
          {routeError ? (
            <div
              className="flex min-h-[5.5rem] flex-col items-center justify-center rounded-md border border-destructive/30 bg-destructive/5 px-3 py-3 text-center"
              role="alert"
            >
              <p className="text-sm font-medium text-destructive">{routeError}</p>
              <p className="mt-1 text-xs text-muted-foreground">Vérifiez le mode de déplacement ou réessayez.</p>
            </div>
          ) : isLoading && !hasEta ? (
            <div className="flex h-[5.5rem] w-full items-center justify-center gap-2 rounded-md bg-muted/50 text-muted-foreground">
              <Loader2 className="h-5 w-5 shrink-0 animate-spin" aria-hidden />
              <span className="text-sm font-medium">Calcul de l&apos;itinéraire…</span>
            </div>
          ) : hasEta ? (
            <div className="relative">
              <EtaDisplay distanceMeters={distance} durationSeconds={duration} />
              {isLoading ? (
                <div
                  className="absolute inset-0 flex items-center justify-center rounded-md bg-background/70 backdrop-blur-[2px]"
                  aria-live="polite"
                  aria-busy="true"
                >
                  <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden />
                  <span className="sr-only">Mise à jour de l&apos;itinéraire</span>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="flex h-[5.5rem] w-full items-center justify-center rounded-md bg-muted/50 text-sm font-medium text-muted-foreground">
              En attente du tracé…
            </div>
          )}
        </div>
      </div>

      <div className="pointer-events-auto">{children}</div>
    </div>
  );
}
