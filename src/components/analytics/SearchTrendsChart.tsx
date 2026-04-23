import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Search } from "lucide-react";

const data = [
  { trend: "Kpalimé", count: 450 },
  { trend: "Plage", count: 380 },
  { trend: "Hôtel", count: 320 },
  { trend: "Cascade", count: 290 },
  { trend: "Aného", count: 210 },
];

export function SearchTrendsChart() {
  return (
    <Card className="bg-zinc-900/40 border-white/5 text-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-white/70">
          Tendances de Recherche
        </CardTitle>
        <Search className="h-4 w-4 text-amber-500" />
      </CardHeader>
      <CardContent className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: -20 }}>
            <XAxis type="number" hide />
            <YAxis
              dataKey="trend"
              type="category"
              stroke="#ffffff30"
              fontSize={10}
              axisLine={false}
              tickLine={false}
              width={80}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#09090b",
                border: "1px solid #ffffff10",
                fontSize: "10px",
              }}
              itemStyle={{ color: "#fbbf24" }}
              cursor={{ fill: "#ffffff05" }}
            />
            <Bar
              dataKey="count"
              fill="#f59e0b"
              radius={[0, 4, 4, 0]}
              barSize={12}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
