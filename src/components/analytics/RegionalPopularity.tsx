import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePlaces } from '@/hooks/queries/usePlaces';
import { Map, Loader2 } from 'lucide-react';

export function RegionalPopularity() {
  const { data: places, isLoading } = usePlaces({ page_size: 100 });

  // Calculer la distribution par ville à partir des lieux réels
  const cityStats = React.useMemo(() => {
    if (!places?.items) return [];
    
    const counts: Record<string, number> = {};
    places.items.forEach(p => {
      const city = p.city || "Inconnue";
      counts[city] = (counts[city] || 0) + (p.view_count || 0);
    });

    const totalViews = Object.values(counts).reduce((a, b) => a + b, 0);

    return Object.entries(counts)
      .map(([name, views]) => ({
        name,
        percentage: totalViews > 0 ? Math.round((views / totalViews) * 100) : 0,
        views
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);
  }, [places]);

  if (isLoading) return (
    <Card className="bg-zinc-900/40 border-white/5 h-[300px] flex items-center justify-center">
      <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
    </Card>
  );

  return (
    <Card className="bg-zinc-900/40 border-white/5 text-white overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2 bg-white/[0.02] border-b border-white/5">
        <CardTitle className="text-sm font-bold text-white/70 uppercase tracking-tighter">Popularité Régionale</CardTitle>
        <Map className="h-4 w-4 text-emerald-400" />
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {cityStats.map((city, i) => (
          <div key={city.name} className="space-y-1.5">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-white/40">
              <span>{city.name}</span>
              <span>{city.percentage}%</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 rounded-full transition-all duration-1000" 
                style={{ width: `${city.percentage}%`, transitionDelay: `${i * 100}ms` }} 
              />
            </div>
          </div>
        ))}
        {cityStats.length === 0 && (
          <div className="p-8 text-center text-white/20 text-[10px]">Aucune donnée géographique disponible</div>
        )}
      </CardContent>
    </Card>
  );
}
