import { Clock, Map } from "lucide-react";

interface EtaDisplayProps {
  durationSeconds: number;
  distanceMeters: number;
}

export default function EtaDisplay({ durationSeconds, distanceMeters }: EtaDisplayProps) {
  // Conversion temps
  const hours = Math.floor(durationSeconds / 3600);
  const minutes = Math.floor((durationSeconds % 3600) / 60);
  const timeFormatted =
    hours > 0 ? `${hours}h ${minutes}m` : `${minutes} min`;

  // Conversion distance
  const km = distanceMeters / 1000;
  const distFormatted =
    km >= 1 ? `${km.toFixed(1)} km` : `${Math.round(distanceMeters)} m`;

  return (
    <div className="flex w-full flex-col gap-1 rounded-xl border border-border/60 bg-gradient-to-br from-card to-muted/20 p-4 shadow-sm">
      <h3 className="mb-2 text-sm font-semibold text-muted-foreground">Résumé du trajet</h3>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-foreground">
          <div className="bg-primary/20 p-2 rounded-full text-primary">
            <Clock className="w-5 h-5" />
          </div>
          <div>
             <span className="block text-2xl font-black">{timeFormatted}</span>
             <span className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Durée estimée</span>
          </div>
        </div>

        <div className="w-[1px] h-10 bg-border/60 mx-2" />

        <div className="flex items-center gap-2 text-foreground">
          <div className="bg-orange-500/20 p-2 rounded-full text-orange-600">
            <Map className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-xl font-bold">{distFormatted}</span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Distance</span>
          </div>
        </div>
      </div>
    </div>
  );
}
