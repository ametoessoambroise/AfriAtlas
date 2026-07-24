import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useGlobalAnalytics } from "@/hooks/queries/useAdmin";

import { Users, Loader2 } from "lucide-react";

export function UsersGrowthChart() {
  const { data: analytics, isLoading } = useGlobalAnalytics();

  // On fallback sur les données de démo si l'API ne renvoie rien de structuré
  const data = analytics && Array.isArray(analytics) && analytics.length > 0 
    ? analytics.map((item: any) => ({
        name: item.date || item.label || "N/A",
        users: item.count || item.value || 0
      }))
    : [
        { name: "Lun", users: 40 },
        { name: "Mar", users: 65 },
        { name: "Mer", users: 50 },
        { name: "Jeu", users: 85 },
        { name: "Ven", users: 110 },
        { name: "Sam", users: 95 },
        { name: "Dim", users: 140 },
      ];

  if (isLoading) return (
    <Card className="bg-zinc-900/40 border-white/5 text-white h-[400px] flex items-center justify-center">
      <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
    </Card>
  );

  return (
    <Card className="bg-zinc-900/40 border-white/5 text-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Croissance Utilisateurs</CardTitle>
            <CardDescription className="text-white/40">
              Nouveaux comptes créés sur les 7 derniers jours.
            </CardDescription>
          </div>
          <Users className="h-5 w-5 text-blue-500" />
        </div>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
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
              dataKey="name"
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
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#18181b",
                border: "1px solid #ffffff10",
                borderRadius: "12px",
                fontSize: "11px",
              }}
              itemStyle={{ color: "#fff" }}
            />
            <Area
              type="monotone"
              dataKey="users"
              stroke="#3b82f6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorUsers)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
