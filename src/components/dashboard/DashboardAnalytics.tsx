import { memo, useMemo } from "react";
import { TrendingUp, Activity } from "lucide-react";
import { formatNumber } from "@/lib/utils/formatters";
import { useUserVisitHistory } from "@/hooks/queries/useAnalytics";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface DashboardAnalyticsProps {
  ordersCount: number;
  bookingsCount: number;
}

export const DashboardAnalytics = memo(
  ({ ordersCount, bookingsCount }: DashboardAnalyticsProps) => {
    const { data: analytics, isLoading } = useUserVisitHistory({
      per_page: 100,
    });

    const chartData = useMemo(() => {
      // Days order for display (Lundi to Dimanche)
      const dayLabels = ["L", "M", "M", "J", "V", "S", "D"];
      const data = dayLabels.map((label) => ({
        name: label,
        value: 0,
        fullDay: "",
      }));

      const fullDays = [
        "Lundi",
        "Mardi",
        "Mercredi",
        "Jeudi",
        "Vendredi",
        "Samedi",
        "Dimanche",
      ];
      data.forEach((d, i) => (d.fullDay = fullDays[i]));

      if (!analytics?.visits || analytics.visits.length === 0) {
        return data.map((d) => ({ ...d, value: 0 }));
      }

      const now = new Date();
      const today = now.getDay();
      const startOfWeek = new Date(now);
      const diff = now.getDate() - today + (today === 0 ? -6 : 1);
      startOfWeek.setDate(diff);
      startOfWeek.setHours(0, 0, 0, 0);

      analytics.visits.forEach((visit) => {
        if (!visit.visited_at) return;
        const visitDate = new Date(visit.visited_at);
        if (visitDate >= startOfWeek) {
          const dayIdx = visitDate.getDay();
          const chartIdx = dayIdx === 0 ? 6 : dayIdx - 1;
          if (data[chartIdx]) {
            data[chartIdx].value += 1;
          }
        }
      });

      return data;
    }, [analytics]);

    const totalActivity = useMemo(() => {
      return (analytics?.total_visits || 0) + ordersCount + bookingsCount;
    }, [analytics, ordersCount, bookingsCount]);

    if (isLoading) {
      return (
        <div className="bg-card rounded-[32px] p-6 border border-border flex flex-col h-full animate-pulse">
          <div className="w-1/2 h-6 bg-muted rounded mb-6" />
          <div className="flex-1 flex items-end justify-between gap-2 px-2 pb-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton
                key={i}
                className="w-full rounded-t-xl"
                style={{ height: `${20 + i * 10}%` }}
              />
            ))}
          </div>
        </div>
      );
    }

    const currentDayIdx = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;

    return (
      <div className="bg-card rounded-[32px] p-6 border border-border flex flex-col h-full shadow-sm hover:shadow-md transition-shadow group">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Activity className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                Activité
              </h3>
            </div>
            <p className="text-2xl font-black font-premium text-foreground">
              {formatNumber(totalActivity)}{" "}
              <span className="text-xs font-bold text-muted-foreground ml-1">
                interactions
              </span>
            </p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
        </div>

        {/* Recharts Area */}
        <div className="flex-1 min-h-[160px] -ml-4 -mr-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 900, fill: "hsl(var(--muted-foreground))" }}
                dy={10}
              />
              <YAxis hide />
              <Tooltip
                cursor={{ fill: "hsl(var(--muted))", opacity: 0.4 }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-popover border border-border p-3 rounded-2xl shadow-xl">
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">
                          {payload[0].payload.fullDay}
                        </p>
                        <p className="text-sm font-black text-foreground">
                          {payload[0].value} visites
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar 
                dataKey="value" 
                radius={[8, 8, 0, 0]} 
                barSize={32}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={index === currentDayIdx ? "#0F4C75" : "rgba(15, 76, 117, 0.2)"}
                    className="transition-all duration-500"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <p className="text-[11px] text-muted-foreground mt-4 italic">
          * Basé sur vos interactions et réservations récentes.
        </p>
      </div>
    );
  }
);
