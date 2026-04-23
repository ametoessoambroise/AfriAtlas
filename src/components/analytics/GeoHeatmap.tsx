import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, MapPin } from 'lucide-react';

const regions = [
  { name: 'Maritime (Lomé)', visits: '45%', color: 'bg-blue-500' },
  { name: 'Plateaux (Kpalimé)', visits: '28%', color: 'bg-emerald-500' },
  { name: 'Kara', visits: '15%', color: 'bg-amber-500' },
  { name: 'Centrale', visits: '8%', color: 'bg-rose-500' },
  { name: 'Savanes', visits: '4%', color: 'bg-zinc-500' },
];

export function GeoHeatmap() {
  return (
    <Card className="bg-zinc-900/40 border-white/5 text-white overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-white/70">Répartition Géographique</CardTitle>
        <Globe className="h-4 w-4 text-emerald-400" />
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[200px] relative bg-zinc-950/50 flex items-center justify-center">
            {/* SVG Illustration simple d'une carte ou d'un pattern de points */}
            <div className="absolute inset-0 opacity-20 flex items-center justify-center p-8">
               <div className="w-full h-full border-2 border-dashed border-emerald-500/20 rounded-full animate-pulse" />
               <div className="absolute w-2/3 h-2/3 border-2 border-dotted border-emerald-500/10 rounded-full" />
            </div>
            <div className="z-10 text-center">
               <MapPin className="h-8 w-8 text-emerald-500 mx-auto mb-2 animate-bounce" />
               <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Live Traffic Heatmap</div>
            </div>
        </div>
        <div className="p-4 space-y-3">
          {regions.map((reg) => (
            <div key={reg.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${reg.color}`} />
                <span className="text-[10px] text-white/60">{reg.name}</span>
              </div>
              <span className="text-[10px] font-bold text-white/40">{reg.visits}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
