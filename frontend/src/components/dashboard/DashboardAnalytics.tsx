import { memo, useMemo, useState } from "react";
import { BarChart2, ChevronDown } from "lucide-react";
import { formatNumber } from "@/lib/utils/formatters";
import { useUserVisitHistory } from "@/hooks/queries/useAnalytics";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

interface DashboardAnalyticsProps {
  ordersCount: number;
  bookingsCount: number;
}

const quarters = [
  "7 derniers jours",
  "Dernier mois",
  "3 derniers mois",
];

export const DashboardAnalytics = memo(
  ({ ordersCount, bookingsCount }: DashboardAnalyticsProps) => {
    const [period, setPeriod] = useState("7 derniers jours");
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
        <Card className="border border-border shadow-none h-full animate-pulse">
           <CardHeader className="pb-2 px-5 pt-5">
              <Skeleton className="h-6 w-1/3 mb-4" />
              <div className="flex gap-8">
                 <Skeleton className="h-8 w-20" />
                 <Skeleton className="h-8 w-20" />
              </div>
           </CardHeader>
           <CardContent className="p-5">
              <Skeleton className="h-[220px] w-full" />
           </CardContent>
        </Card>
      );
    }

    const currentDayIdx = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;

    return (
      <Card className="border border-border shadow-none h-full">
        <CardHeader className="pb-2 px-5 pt-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-semibold text-foreground">
                Distribution de l'activité
              </span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 gap-1.5 text-xs font-normal"
                >
                  {period}
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {quarters.map((q) => (
                  <DropdownMenuItem key={q} onClick={() => setPeriod(q)}>
                    {q}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-8 mt-3">
            <div>
              <p className="text-xl font-bold text-foreground">{formatNumber(analytics?.total_visits || 0)}</p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mt-0.5">
                Visites Totales
              </p>
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{ordersCount + bookingsCount}</p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mt-0.5">
                Actions directes
              </p>
            </div>
          </div>
        </CardHeader>

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
      </Card>
    );
  },
);
