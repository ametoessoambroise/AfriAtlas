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
      const dayLabels = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
      const data = dayLabels.map((label) => ({
        week: label,
        current: Math.floor(Math.random() * 800) + 200,
        prev: Math.floor(Math.random() * 500) + 100,
      }));

      if (!analytics) return data;
      return data;
    }, [analytics]);

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

        <CardContent className="px-5 pb-5">
          <div className="h-[220px] w-full min-h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barGap={2} barCategoryGap="30%">
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                />
                <XAxis
                  dataKey="week"
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                  axisLine={false}
                  tickLine={false}
                  width={40}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    fontSize: 12,
                  }}
                  cursor={{ fill: "var(--muted-foreground)", opacity: 0.3 }}
                />
                <Bar
                  dataKey="current"
                  fill="var(--primary)"
                  radius={[3, 3, 0, 0]}
                  name="Période en cours"
                />
                <Bar
                  dataKey="prev"
                  fill="var(--destructive)"
                  radius={[3, 3, 0, 0]}
                  name="Période précédente"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    );
  },
);
