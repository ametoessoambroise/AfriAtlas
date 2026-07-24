import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { usePlaces } from "@/hooks/queries/usePlaces";

export function RevenueByOwner() {
  const { data: places, isLoading } = usePlaces({ page_size: 20 });

  const rankData = places?.items
    ? [...places.items]
        .sort((a, b) => b.view_count - a.view_count)
        .slice(0, 5)
        .map(p => ({
          name: p.name,
          value: p.view_count * 1500, // Estimation basée sur vues
        }))
    : [];

  if (isLoading) return (
    <Card className="bg-zinc-900/40 border-white/5 text-white h-[400px] flex items-center justify-center">
      <Loader2 className="h-6 w-6 animate-spin text-amber-500" />
    </Card>
  );

  return (
    <Card className="bg-zinc-900/40 border-white/5 text-white">
      <CardHeader>
        <CardTitle>Top Établissements</CardTitle>
        <CardDescription className="text-white/40">Classement par popularité (vues) et revenus estimés.</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="px-6 pb-6 space-y-6">
          {rankData.map((item, i) => (
            <div key={i} className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-xs font-bold text-white/40 group-hover:bg-amber-500 group-hover:text-zinc-950 transition-colors">
                  {i + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold truncate">{item.name}</div>
                  <div className="text-[10px] text-white/30 uppercase tracking-wider">Premium Partner</div>
                </div>
              </div>
              <div className="text-sm font-bold text-amber-500">{(item.value / 1000).toFixed(0)}k F</div>
            </div>
          ))}
        </div>
        {rankData.length === 0 && (
          <div className="p-12 text-center text-white/20 text-xs">Aucune donnée disponible</div>
        )}
        <div className="p-6 pt-0 border-t border-white/5 mt-auto">
          <Button variant="ghost" className="w-full text-white/40 hover:text-white hover:bg-white/5 text-xs">
            VOIR LE RAPPORT COMPLET <ArrowRight className="h-3 w-3 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
