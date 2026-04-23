import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePlaces } from "@/hooks/queries/usePlaces";
import { MapPin, Loader2, TrendingUp } from "lucide-react";

export function TopDestinations() {
  const { data: places, isLoading } = usePlaces({ page_size: 20 });

  const sortedPlaces = places?.items
    ? [...places.items]
        .sort((a, b) => (b.view_count || 0) - (a.view_count || 0))
        .slice(0, 5)
    : [];

  if (isLoading)
    return (
      <Card className="bg-zinc-900/40 border-white/5 h-[350px] flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
      </Card>
    );

  return (
    <Card className="bg-zinc-900/40 border-white/5 text-white overflow-hidden">
      <CardHeader className="border-b border-white/5 bg-white/[0.02]">
        <CardTitle className="text-lg flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-emerald-500" />
          Destinations Phares
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          {sortedPlaces.map((place, i) => (
            <div
              key={place.id}
              className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="text-lg font-black text-white/10 group-hover:text-amber-500/20 transition-colors w-6">
                  {i + 1}
                </div>
                <div>
                  <div className="text-sm font-semibold truncate max-w-[150px]">
                    {place.name}
                  </div>
                  <div className="text-[10px] text-white/40 flex items-center gap-1">
                    <MapPin className="h-2.5 w-2.5" />
                    {place.city}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-emerald-500">
                  {place.view_count || 0}
                </div>
                <div className="text-[8px] text-white/20 uppercase tracking-widest">
                  Vues
                </div>
              </div>
            </div>
          ))}
          {sortedPlaces.length === 0 && (
            <div className="p-12 text-center text-white/20 text-xs">
              Aucune destination trouvée
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
