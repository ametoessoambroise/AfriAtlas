import React from "react";
import { Users, MapPin, Calendar, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function KpiCard({ title, value, icon: Icon, trend, color }: any) {
  return (
    <Card className="bg-zinc-900/40 border-white/5 text-white overflow-hidden group hover:border-white/10 transition-all duration-300">
      <CardContent className="p-6 relative">
        <div
          className={`absolute top-0 right-0 w-24 h-24 -mt-8 -mr-8 bg-${color}-500/10 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700`}
        />

        <div className="flex items-center justify-between mb-4">
          <div
            className={`p-3 rounded-xl bg-white/5 border border-white/5 text-${color}-400`}
          >
            <Icon className="h-6 w-6" />
          </div>
          {trend && (
            <Badge
              variant="outline"
              className={`bg-${trend > 0 ? "emerald" : "red"}-500/10 text-${trend > 0 ? "emerald" : "red"}-400 border-${trend > 0 ? "emerald" : "red"}-500/20`}
            >
              {trend > 0 ? "+" : ""}
              {trend}%
            </Badge>
          )}
        </div>

        <div className="text-3xl font-bold tracking-tight">{value}</div>
        <p className="text-white/40 text-xs font-medium uppercase tracking-widest mt-1">
          {title}
        </p>
      </CardContent>
    </Card>
  );
}

export function PlatformKpis({ stats }: { stats: any }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <KpiCard
        title="Utilisateurs"
        value={stats?.total_users || 0}
        icon={Users}
        trend={12}
        color="blue"
      />
      <KpiCard
        title="Lieux"
        value={stats?.total_places || 0}
        icon={MapPin}
        trend={5}
        color="amber"
      />
      <KpiCard
        title="Réservations"
        value={stats?.total_bookings || 0}
        icon={Calendar}
        trend={24}
        color="emerald"
      />
      <KpiCard
        title="Revenu Global"
        value={`${stats?.total_revenue || 0} F`}
        icon={DollarSign}
        trend={8}
        color="indigo"
      />
    </div>
  );
}
