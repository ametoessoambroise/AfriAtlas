interface RouteProgressProps {
  initialDistance: number | null;
  currentDistance: number | null;
}

export default function RouteProgress({ initialDistance, currentDistance }: RouteProgressProps) {
  if (!initialDistance || !currentDistance) return null;

  // Calcul basique du pourcentage (borné entre 0 et 100)
  const ratio = Math.max(0, Math.min(1, 1 - (currentDistance / initialDistance)));
  const percentage = Math.round(ratio * 100);

  return (
    <div className="bg-card w-full p-3 rounded-md border border-border/50 shadow-sm">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Progression</span>
        <span className="text-xs font-black text-primary">{percentage}%</span>
      </div>
      <div className="h-2 w-full bg-surface-alt rounded-full overflow-hidden">
        <div 
           className="h-full bg-primary transition-all duration-1000 ease-out" 
           style={{ width: `${percentage}%` }} 
        />
      </div>
    </div>
  );
}
