import React from "react";
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
import { TrendingUp } from "lucide-react";

interface RevenueChartProps {
  data: any[];
  isLoading: boolean;
  title?: string;
  description?: string;
}

export function RevenueChart({
  data,
  isLoading,
  title = "Évolution du Revenu Brut",
  description = "Vue d'ensemble de la croissance financière",
}: RevenueChartProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (isLoading) {
    return (
      <Card className="bg-zinc-900/40 border-white/5 h-[400px] animate-pulse" />
    );
  }

  return (
    <Card className="bg-zinc-900/40 border-white/5 text-white overflow-hidden group hover:border-white/10 transition-all duration-300">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold tracking-tight">
              {title}
            </CardTitle>
            <CardDescription className="text-white/40">
              {description}
            </CardDescription>
          </div>
          <div className="p-2 rounded-md bg-emerald-500/10 text-emerald-400">
            <TrendingUp className="h-5 w-5" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="h-[300px] pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
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
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#ffffff40" }}
              dy={10}
            />
            <YAxis
              stroke="#ffffff15"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#ffffff40" }}
              tickFormatter={(val) => `${val / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#18181b",
                border: "1px solid #ffffff10",
                borderRadius: "12px",
                fontSize: "12px",
              }}
              itemStyle={{ color: "#f59e0b" }}
              formatter={(value: number) => [formatCurrency(value), "Revenu"]}
              labelStyle={{ color: "#ffffff40", marginBottom: "8px" }}
              cursor={{ stroke: "#f59e0b20", strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#f59e0b"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
