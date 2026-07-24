import { Car, Bike, Footprints } from "lucide-react";
import type { TravelMode } from "@/hooks/queries/useRealtimeRoute";

interface TravelModeSelectorProps {
  mode: TravelMode;
  onModeChange: (mode: TravelMode) => void;
}

export default function TravelModeSelector({ mode, onModeChange }: TravelModeSelectorProps) {
  const modes: { id: TravelMode; icon: any; label: string }[] = [
    { id: "driving", icon: Car, label: "Voiture" },
    { id: "cycling", icon: Bike, label: "Vélo" },
    { id: "walking", icon: Footprints, label: "Marche" },
  ];

  return (
    <div
      className="mb-4 flex gap-0.5 rounded-md border border-border/50 bg-muted/40 p-1 shadow-inner"
      role="group"
      aria-label="Moyen de déplacement"
    >
      {modes.map((m) => {
        const Icon = m.icon;
        const isActive = mode === m.id;
        return (
          <button
            key={m.id}
            type="button"
            onClick={() => onModeChange(m.id)}
            aria-pressed={isActive}
            aria-label={m.label}
            className={`flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-semibold transition-all touch-manipulation ${
              isActive
                ? "bg-primary text-primary-foreground shadow-md ring-1 ring-primary/20"
                : "text-muted-foreground hover:bg-background/80 hover:text-foreground"
            }`}
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden />
            <span className="hidden sm:inline">{m.label}</span>
          </button>
        );
      })}
    </div>
  );
}

