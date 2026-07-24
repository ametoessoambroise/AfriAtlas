import React, { memo } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Compass, CheckCircle2, Circle } from "lucide-react";
import { BookingListResponse } from "@/lib/types/booking";

const tasks = [
  { name: "Validation hôte", progress: 100, completed: true },
  { name: "Préparation itinéraire", progress: 80, completed: false },
  { name: "Guide local assigné", progress: 40, completed: false },
];

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
      <div
        className="h-full rounded-full bg-primary transition-all duration-1000"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

interface NextBookingCardProps {
  booking?: BookingListResponse;
  isLoading?: boolean;
}

export const NextBookingCard = memo(({ booking, isLoading }: NextBookingCardProps) => {
  return (
    <Card className="border border-border shadow-none h-full overflow-hidden">
      <CardHeader className="pb-2 px-5 pt-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-foreground uppercase tracking-tight">Préparation Voyage</span>
          </div>
          <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest bg-primary/5 border-primary/20 text-primary">
            {booking ? "En cours" : "Inactif"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="px-5 pb-5 space-y-5">
        {!booking && !isLoading ? (
          <div className="py-8 text-center space-y-3">
             <p className="text-sm font-medium text-muted-foreground italic">Aucun voyage planifié</p>
             <button className="text-xs font-black text-primary uppercase tracking-widest hover:underline">Découvrir le Togo</button>
          </div>
        ) : (
          <>
            <div className="mb-4">
               <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-1 opacity-60">Status actuel</p>
               <p className="text-lg font-black text-foreground leading-tight">Itinéraire en cours de finalisation</p>
            </div>
            
            <div className="space-y-5">
              {tasks.map((t) => (
                <div key={t.name} className="group">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      {t.completed ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Circle className="w-3.5 h-3.5 text-muted-foreground opacity-40" />
                      )}
                      <span className="text-[11px] font-bold text-foreground group-hover:text-primary transition-colors">{t.name}</span>
                    </div>
                    <span className="text-[10px] font-black text-muted-foreground">{t.progress}%</span>
                  </div>
                  <ProgressBar value={t.progress} />
                </div>
              ))}
            </div>

            <div className="pt-2">
               <button className="w-full py-2.5 rounded-md bg-muted text-[10px] font-black uppercase tracking-widest text-foreground hover:bg-border transition-all">
                  Gérer ma réservation
               </button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
});
