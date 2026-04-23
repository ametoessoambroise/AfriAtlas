import React from "react";
import { Loader2, Activity, ShieldAlert } from "lucide-react";
import { useAdminStats } from "@/hooks/queries/useAdmin";
import { PlatformKpis } from "@/components/dashboard/admin/PlatformKpis";
import { RevenueByOwner } from "@/components/dashboard/admin/RevenueByOwner";
import { UsersGrowthChart } from "@/components/dashboard/admin/UsersGrowthChart";
import { BookingsChart } from "@/components/dashboard/admin/BookingsChart";
import { PendingClaimsAlert } from "@/components/dashboard/admin/PendingClaimsAlert";
import { RecentActivity } from "@/components/dashboard/admin/RecentActivity";

export default function AdminDashboardPage() {
  const { data: stats, isLoading } = useAdminStats();

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[500px]">
      <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tighter">Console de Pilotage</h1>
          <p className="text-white/40 mt-1.5 flex items-center gap-2">
            <Activity className="h-4 w-4 text-emerald-500" />
            Monitoring en temps réel des actifs Atlas
          </p>
        </div>
        
        <PendingClaimsAlert count={stats?.pending_claims || 0} />
      </div>

      {/* KPI Section */}
      <PlatformKpis stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
        {/* Main Growth Chart */}
        <div className="lg:col-span-4">
          <UsersGrowthChart />
        </div>

        {/* Top Owners / Revenue */}
        <div className="lg:col-span-2">
          <RevenueByOwner />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <RecentActivity />
        <div className="lg:col-span-2">
          <BookingsChart />
        </div>
      </div>
    </div>
  );
}
