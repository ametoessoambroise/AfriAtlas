import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Building2,
  Mail,
  User,
  DollarSign,
  Calendar,
  ShoppingBag,
  TrendingUp,
  Clock,
  ArrowRight,
  Wallet,
} from "lucide-react";
import type { OwnerRevenueSummary } from "@/lib/types";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface OwnerDetailPanelProps {
  summary: OwnerRevenueSummary | undefined;
  isLoading: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export function OwnerDetailPanel({
  summary,
  isLoading,
  isOpen,
  onClose,
}: OwnerDetailPanelProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      maximumFractionDigits: 0,
    }).format(amount);
  };
  const Wallet = DollarSign; // Fallback helper

  const stats = [
    {
      label: "Volume d'Affaire",
      value: formatCurrency(summary?.total_gross_revenue ?? 0),
      icon: DollarSign,
      color: "text-amber-400",
    },
    {
      label: "Commission Atlas",
      value: formatCurrency(summary?.total_platform_fees ?? 0),
      icon: TrendingUp,
      color: "text-zinc-400",
    },
    {
      label: "Total Net Owner",
      value: formatCurrency(summary?.total_net_revenue ?? 0),
      icon: Wallet,
      color: "text-emerald-400",
    },
    {
      label: "En Attente",
      value: formatCurrency(summary?.pending_revenue ?? 0),
      icon: Clock,
      color: "text-red-400",
    },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="bg-zinc-950 border-white/5 text-white w-full sm:max-w-md overflow-y-auto custom-scrollbar">
        <SheetHeader className="text-left space-y-4">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center w-fit mx-auto mb-2 shadow-2xl shadow-amber-500/10">
            <User className="h-8 w-8 text-amber-500" />
          </div>
          <div className="text-center">
            <SheetTitle className="text-2xl font-bold tracking-tight text-white mb-1">
              {isLoading ? "Chargement..." : summary?.owner_name}
            </SheetTitle>
            <SheetDescription className="text-white/40 flex items-center justify-center gap-2">
              <Mail className="h-3 w-3" /> {summary?.owner_email}
            </SheetDescription>
          </div>

          <div className="grid grid-cols-2 gap-3 pb-4">
            <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-center">
              <div className="text-xl font-bold text-white">
                {summary?.total_transactions ?? 0}
              </div>
              <div className="text-[10px] uppercase text-white/30 font-bold tracking-widest mt-0.5">
                Transactions
              </div>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-center">
              <div className="text-xl font-bold text-white">
                {summary?.pending_count ?? 0}
              </div>
              <div className="text-[10px] uppercase text-white/30 font-bold tracking-widest mt-0.5">
                Periods en attente
              </div>
            </div>
          </div>
        </SheetHeader>

        <Separator className="my-6 bg-white/5" />

        <div className="space-y-6">
          <section>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4 flex items-center gap-2">
              <TrendingUp className="h-3 w-3" /> Performance Financière
            </h3>
            <div className="space-y-3">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 group hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-zinc-900 border border-white/5 group-hover:border-white/10">
                      <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    </div>
                    <span className="text-sm text-white/60 font-medium">
                      {stat.label}
                    </span>
                  </div>
                  <span className={`text-sm font-bold ${stat.color}`}>
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4 flex items-center gap-2">
              <Building2 className="h-3 w-3" /> Répartition par Activité
            </h3>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-emerald-500/10 to-transparent border-l-2 border-emerald-500">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-emerald-400" />
                  <div>
                    <div className="text-xs font-bold text-white">
                      Réservations VR
                    </div>
                    <div className="text-[10px] text-white/40">
                      {summary?.total_bookings ?? 0} sessions
                    </div>
                  </div>
                </div>
                <div className="text-sm font-bold text-emerald-400">
                  {formatCurrency(summary?.total_booking_revenue ?? 0)}
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-transparent border-l-2 border-blue-500">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="h-4 w-4 text-blue-400" />
                  <div>
                    <div className="text-xs font-bold text-white">
                      Ventes Catalogue
                    </div>
                    <div className="text-[10px] text-white/40">
                      {summary?.total_orders ?? 0} commandes
                    </div>
                  </div>
                </div>
                <div className="text-sm font-bold text-blue-400">
                  {formatCurrency(summary?.total_order_revenue ?? 0)}
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-10 mb-6">
          <Button
            variant="outline"
            className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10 group rounded-xl py-6 underline-offset-4 hover:underline"
          >
            Voir Historique Complet{" "}
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
