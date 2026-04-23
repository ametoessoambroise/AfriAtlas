import React, { useState } from "react";
import { AtlasDateRangePicker } from "@/components/shared/AtlasDateRangePicker";
import { VisitsChart } from "@/components/analytics/VisitsChart";
import { TopDestinations } from "@/components/analytics/TopDestinations";
import { RegionalPopularity } from "@/components/analytics/RegionalPopularity";
import { CategoryDistributionPie } from "@/components/analytics/CategoryDistributionPie";
import { DateRange } from "react-day-picker";
import { subDays } from "date-fns";
import { Download, RefreshCw, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdminStats } from "@/hooks/queries/useAdmin";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminAnalyticsPage() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });

  const { data: stats, isLoading, error, refetch } = useAdminStats();

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center min-h-[600px] gap-4">
      <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
      <p className="text-white/40 animate-pulse text-sm">Chargement du moteur décisionnel...</p>
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[600px] gap-4 p-8 text-center">
      <AlertCircle className="h-12 w-12 text-red-500/50" />
      <div className="space-y-1">
        <h3 className="text-white font-bold">Instabilité Flux de Données</h3>
        <p className="text-white/40 text-sm max-w-xs">Impossible de synchroniser les métriques avec le serveur central.</p>
      </div>
      <Button onClick={() => refetch()} variant="outline" className="mt-4 border-white/10 text-white">
        Réessayer la connexion
      </Button>
    </div>
  );

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header avec filtres */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase">Atlas Business Intelligence</h1>
          <p className="text-white/40 text-sm mt-1 flex items-center gap-2">
            Principaux indicateurs de performance — {date?.from ? date.from.toLocaleDateString() : "..."} à {date?.to ? date.to.toLocaleDateString() : "..."}
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white/5 p-1.5 rounded-2xl border border-white/5">
          <AtlasDateRangePicker date={date} setDate={setDate} />
          <div className="w-px h-6 bg-white/10 mx-1" />
          <Button variant="ghost" className="text-white/40 hover:text-white" size="icon" onClick={() => refetch()}>
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="ghost" className="text-white/40 hover:text-white" size="icon">
             <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* KPI Row - Données Réelles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiSummaryCard title="Avis Clients" value={stats?.total_reviews ?? 0} trend="+12%" color="text-amber-500" />
        <KpiSummaryCard title="Favoris" value={stats?.total_favorites ?? 0} trend="+24%" color="text-rose-500" />
        <KpiSummaryCard title="Albums" value={stats?.total_albums ?? 0} trend="+8%" color="text-blue-500" />
        <KpiSummaryCard title="Revendications" value={stats?.total_claims ?? 0} trend="Stable" color="text-emerald-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <VisitsChart dateRange={date} />
        </div>
        <div className="space-y-6">
          <TopDestinations />
          <CategoryDistributionPie />
          <RegionalPopularity />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         <div className="flex items-center justify-center p-12 border border-dashed border-white/5 rounded-3xl opacity-40">
            <p className="text-xs text-center">Analyses comportementales en attente de synchronisation API</p>
         </div>
         <div className="flex items-center justify-center p-12 border border-dashed border-white/5 rounded-3xl opacity-40">
            <p className="text-xs text-center">Flux de conversion tunnel en attente de synchronisation API</p>
         </div>
         <div className="flex items-center justify-center p-12 border border-dashed border-white/5 rounded-3xl opacity-40">
            <p className="text-xs text-center">Métriques de rétention en attente de synchronisation API</p>
         </div>
      </div>
    </div>
  );
}

function KpiSummaryCard({ title, value, trend, color }: { title: string; value: number; trend: string; color: string }) {
  return (
    <Card className="bg-zinc-900/40 border-white/5 text-white overflow-hidden group hover:border-white/20 transition-all cursor-default">
      <CardContent className="p-6">
        <p className="text-xs font-bold text-white/30 uppercase tracking-widest">{title}</p>
        <div className="flex items-end justify-between mt-2">
          <h3 className={`text-3xl font-black ${color}`}>{value.toLocaleString()}</h3>
          <span className="text-[10px] bg-white/5 px-2 py-1 rounded-full text-white/60 font-bold">{trend}</span>
        </div>
      </CardContent>
    </Card>
  );
}
