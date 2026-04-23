import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminClaims } from "@/hooks/queries/useAdmin";

import { Clock, Loader2 } from "lucide-react";

export function RecentActivity() {
  const { data: claims, isLoading } = useAdminClaims(undefined, 1);

  const activities = claims && claims.length > 0
    ? claims.map((c: any) => ({
        type: 'claim',
        text: `Revendication en attente: ${c.place_name}`,
        time: `Créé le ${new Date(c.created_at).toLocaleDateString()}`
      }))
    : [
        { type: 'user', text: 'Bienvenue dans la console admin', time: 'Système' },
      ];

  if (isLoading) return (
    <Card className="bg-zinc-900/40 border-white/5 text-white h-[400px] flex items-center justify-center">
      <Loader2 className="h-6 w-6 animate-spin text-amber-500" />
    </Card>
  );

  return (
    <Card className="bg-zinc-900/40 border-white/5 text-white">
      <CardHeader>
        <CardTitle className="text-lg">Journal d'Activité</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {activities.map((log, i) => (
          <div
            key={i}
            className="flex gap-4 items-start relative pb-6 last:pb-0"
          >
            {i !== activities.length - 1 && (
              <div className="absolute left-[3px] top-6 bottom-0 w-px bg-white/5" />
            )}
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium leading-none text-white/80">
                {log.text}
              </div>
              <div className="text-[10px] text-white/30 mt-2 flex items-center gap-1.5 uppercase font-bold tracking-wider">
                <Clock className="h-2.5 w-2.5" /> {log.time}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
