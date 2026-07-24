import React from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Wallet,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { OwnerRevenueStats } from "@/lib/types";

interface RevenueStatsCardsProps {
  stats: OwnerRevenueStats | undefined;
  isLoading: boolean;
}

export function RevenueStatsCards({
  stats,
  isLoading,
}: RevenueStatsCardsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const kpis = [
    {
      title: "Revenu Brut Total",
      value: stats?.total_gross_revenue ?? 0,
      icon: DollarSign,
      color: "amber",
      trend: stats?.growth_percentage ?? 0,
    },
    {
      title: "Commissions Atlas",
      value: stats?.total_platform_fees ?? 0,
      icon: TrendingUp,
      color: "indigo",
    },
    {
      title: "Net Payé aux Owners",
      value: stats?.total_net_paid_to_owners ?? 0,
      icon: CheckCircle2,
      color: "emerald",
    },
    {
      title: "En Attente de Paiement",
      value: stats?.pending_amount ?? 0,
      icon: Clock,
      color: "zinc",
      subtitle: `${stats?.pending_count ?? 0} périodes en attente`,
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 rounded-md bg-white/5 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi, idx) => (
        <Card
          key={idx}
          className="bg-zinc-900/40 border-white/5 text-white overflow-hidden group hover:border-white/10 transition-all duration-300"
        >
          <CardContent className="p-6 relative">
            <div
              className={`absolute top-0 right-0 w-24 h-24 -mt-8 -mr-8 bg-${kpi.color}-500/10 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700`}
            />

            <div className="flex items-center justify-between mb-4">
              <div
                className={`p-3 rounded-md bg-white/5 border border-white/5 text-${kpi.color}-400`}
              >
                <kpi.icon className="h-5 w-5" />
              </div>
              {kpi.trend !== undefined && (
                <Badge
                  variant="outline"
                  className={`bg-${kpi.trend >= 0 ? "emerald" : "red"}-500/10 text-${kpi.trend >= 0 ? "emerald" : "red"}-400 border-${kpi.trend >= 0 ? "emerald" : "red"}-500/20`}
                >
                  {kpi.trend >= 0 ? (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  )}
                  {Math.abs(kpi.trend)}%
                </Badge>
              )}
            </div>

            <div className="text-2xl font-bold tracking-tight">
              {formatCurrency(kpi.value)}
            </div>
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-1">
              {kpi.title}
            </p>
            {kpi.subtitle && (
              <p className="text-white/20 text-[10px] mt-2 font-medium">
                {kpi.subtitle}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
