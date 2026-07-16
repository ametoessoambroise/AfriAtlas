import React, { useState, useMemo } from "react";
import { Loader2, TrendingUp, Download, Filter, RefreshCw, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RevenueStatsCards } from "@/components/admin/revenues/RevenueStatsCards";
import { RevenueTable } from "@/components/admin/revenues/RevenueTable";
import { RevenueChart } from "@/components/admin/revenues/RevenueChart";
import { OwnerDetailPanel } from "@/components/admin/revenues/OwnerDetailPanel";
import { AtlasDateRangePicker } from "@/components/shared/AtlasDateRangePicker";
import { 
  useAllOwnerRevenues, 
  useRevenueStats, 
  useUpdateRevenuePayment, 
  useOwnerRevenueSummary 
} from "@/hooks/queries/useRevenues";
import { DateRange } from "react-day-picker";
import { startOfMonth, subMonths, format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { RevenuePeriod, PaymentStatus } from "@/lib/api/enums";
import { toast } from "sonner";
import { revenuesApi } from "@/lib/api";

export default function AdminOwnerRevenuesPage() {
  // ─── State ───────────────────────────────────────────────────────────────────
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subMonths(new Date(), 6),
    to: new Date(),
  });
  const [periodType, setPeriodType] = useState<RevenuePeriod>("monthly");
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | "all">("all");
  const [selectedOwnerId, setSelectedOwnerId] = useState<number | undefined>(undefined);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // ─── Queries ─────────────────────────────────────────────────────────────────
  const { 
    data: revenues, 
    isLoading: revenuesLoading, 
    refetch: refetchRevenues 
  } = useAllOwnerRevenues({
    period_type: periodType,
    payment_status: paymentStatus === "all" ? undefined : paymentStatus,
    start_date: dateRange?.from?.toISOString(),
    end_date: dateRange?.to?.toISOString(),
  });

  const { data: stats, isLoading: statsLoading } = useRevenueStats();
  const { data: ownerSummary, isLoading: summaryLoading } = useOwnerRevenueSummary(selectedOwnerId);
  const updatePaymentMutation = useUpdateRevenuePayment();

  // ─── Handlers ────────────────────────────────────────────────────────────────
  const handleUpdateStatus = (revenueId: number, statusData: any) => {
    updatePaymentMutation.mutate({ revenueId, data: statusData });
  };

  const handleOpenOwnerDetails = (ownerId: number) => {
    setSelectedOwnerId(ownerId);
    setIsDetailOpen(true);
  };

  const handleExport = async () => {
    try {
      setIsExporting(true);
      const blob = await revenuesApi.exportOwnerRevenuesCsv({
        period_type: periodType,
        payment_status: paymentStatus === 'all' ? undefined : paymentStatus,
        start_date: dateRange?.from?.toISOString(),
        end_date: dateRange?.to?.toISOString(),
      });
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `atlas_revenus_${format(new Date(), 'yyyy-MM-dd')}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success("Téléchargé avec succès");
    } catch (error) {
      toast.error("Échec de l'exportation");
      console.error("Export error:", error);
    } finally {
      setIsExporting(false);
    }
  };

  // ─── Data Mapping ────────────────────────────────────────────────────────────
  // On transforme les périodes en points de données pour le graphique
  const chartData = useMemo(() => {
    if (!revenues) return [];
    
    // On agrège par période (label) pour la visualisation globale
    const aggregated = revenues.reduce((acc: any, rev) => {
      const existing = acc.find((a: any) => a.date === rev.period_label);
      if (existing) {
        existing.value += rev.total_revenue;
      } else {
        acc.push({ date: rev.period_label, value: rev.total_revenue });
      }
      return acc;
    }, []);

    // On trie par date (approximatif via label ou on peut mapper vers start_date)
    return aggregated.sort((a: any, b: any) => a.date.localeCompare(b.date));
  }, [revenues]);

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tighter">Gestion des Revenus</h1>
          <p className="text-white/40 mt-1.5 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-500" />
            Suivi des flux financiers et paiements aux propriétaires
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <Button 
            variant="outline" 
            disabled={isExporting || revenuesLoading}
            className="bg-white/5 border-white/5 text-white/50 hover:text-white hover:bg-white/10 h-11 px-5 rounded-md border-dashed"
            onClick={handleExport}
          >
            {isExporting ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Download className="h-4 w-4 mr-2" />
            )}
            Exporter
          </Button>
          <Button 
            className="bg-amber-500 text-zinc-950 hover:bg-amber-400 font-bold h-11 px-6 rounded-md shadow-lg shadow-amber-500/20"
            onClick={() => refetchRevenues()}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${revenuesLoading ? "animate-spin" : ""}`} /> Actualiser
          </Button>
        </div>
      </div>

      <RevenueStatsCards stats={stats} isLoading={statsLoading} />

      {/* Main Analysis Chart */}
      <RevenueChart 
        data={chartData} 
        isLoading={revenuesLoading} 
        description={`Performances globales sur la période de ${format(dateRange?.from || new Date(), "MMMM yyyy")} à aujourd'hui.`}
      />

      {/* Control Bar (Filters) */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 bg-zinc-900/40 p-6 rounded-md border border-white/5">
        <div className="flex flex-wrap items-center gap-4">
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-white/20 ml-1">Période d'analyse</label>
            <AtlasDateRangePicker date={dateRange} setDate={setDateRange} />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-white/20 ml-1">Type de Période</label>
            <Select value={periodType} onValueChange={(val: any) => setPeriodType(val)}>
              <SelectTrigger className="w-[180px] bg-zinc-950/50 border-white/10 text-white h-10 rounded-md">
                <SelectValue placeholder="Format" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-950 border-white/10 text-white">
                <SelectItem value="monthly">Mensuel</SelectItem>
                <SelectItem value="quarterly">Trimestriel</SelectItem>
                <SelectItem value="yearly">Annuel</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-white/20 ml-1">Statut Paiement</label>
            <Select value={paymentStatus} onValueChange={(val: any) => setPaymentStatus(val)}>
              <SelectTrigger className="w-[180px] bg-zinc-950/50 border-white/10 text-white h-10 rounded-md">
                <SelectValue placeholder="Tous les statuts" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-950 border-white/10 text-white">
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="processing">En traitement</SelectItem>
                <SelectItem value="paid">Payé</SelectItem>
                <SelectItem value="failed">Échoué</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-3 text-white/40 text-xs mt-auto self-end lg:self-center">
          <Layers className="h-4 w-4" />
          <span>{revenues?.length ?? 0} enregistrements filtrés</span>
        </div>
      </div>

      {/* Main Table */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <Filter className="h-4 w-4 text-amber-500" />
          <h3 className="text-lg font-bold text-white tracking-tight">Détail des Échéances</h3>
        </div>
        <RevenueTable 
          data={revenues} 
          isLoading={revenuesLoading} 
          onUpdateStatus={handleUpdateStatus}
          onViewOwner={handleOpenOwnerDetails}
        />
      </div>

      {/* Detail Slideover */}
      <OwnerDetailPanel 
        summary={ownerSummary}
        isLoading={summaryLoading}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />
    </div>
  );
}
