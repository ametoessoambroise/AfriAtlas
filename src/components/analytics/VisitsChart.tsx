import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGlobalAnalytics } from "@/hooks/queries/useAdmin";
import { Eye, Loader2 } from "lucide-react";
import { DateRange } from "react-day-picker";

interface VisitsChartProps {
  dateRange: DateRange | undefined;
}

export function VisitsChart({ dateRange }: VisitsChartProps) {
  const { data: analytics, isLoading } = useGlobalAnalytics(
    dateRange?.from?.toISOString(),
    dateRange?.to?.toISOString(),
  );

  // Mappage des données ou fallback
  const data =
    analytics && Array.isArray(analytics) && analytics.length > 0
      ? analytics.map((item: any) => ({
          date: item.date || "N/A",
          visits: item.visits || item.count || 0,
        }))
      : [
          { date: "01/04", visits: 120 },
          { date: "02/04", visits: 150 },
          { date: "03/04", visits: 180 },
          { date: "04/04", visits: 140 },
          { date: "05/04", visits: 210 },
          { date: "06/04", visits: 250 },
          { date: "07/04", visits: 190 },
        ];

  if (isLoading)
    return (
      <Card className="bg-zinc-900/40 border-white/5 h-[400px] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </Card>
    );

  return (
    <Card className="bg-zinc-900/40 border-white/5 text-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl">Flux de Visites</CardTitle>
          <CardDescription className="text-white/40">
            Visites uniques par jour sur la période sélectionnée.
          </CardDescription>
        </div>
        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
          <Eye className="h-5 w-5 text-blue-500" />
        </div>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#ffffff05"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              stroke="#ffffff15"
              tick={{ fill: "#ffffff40", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              stroke="#ffffff15"
              tick={{ fill: "#ffffff40", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#09090b",
                border: "1px solid #ffffff10",
                borderRadius: "12px",
              }}
              itemStyle={{ color: "#fff" }}
            />
            <Area
              type="monotone"
              dataKey="visits"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#colorVisits)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
