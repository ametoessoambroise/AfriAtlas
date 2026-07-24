import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { CreditCard } from "lucide-react";

const data = [
  { name: "Gratuit", value: 65, color: "#94a3b8" },
  { name: "Premium", value: 25, color: "#3b82f6" },
  { name: "Famille", value: 10, color: "#8b5cf6" },
];

export function PlanDistributionPie() {
  return (
    <Card className="bg-zinc-900/40 border-white/5 text-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-white/70">
          Répartition des Offres
        </CardTitle>
        <CreditCard className="h-4 w-4 text-blue-400" />
      </CardHeader>
      <CardContent className="h-[200px] flex flex-col justify-center">
        <ResponsiveContainer width="100%" height={140}>
          <PieChart>
            <Pie
              data={data}
              innerRadius={45}
              outerRadius={65}
              paddingAngle={8}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#09090b",
                border: "1px solid #ffffff10",
                fontSize: "10px",
                borderRadius: "8px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-4 mt-4">
          {data.map((d) => (
            <div key={d.name} className="flex items-center gap-1.5">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: d.color }}
              />
              <span className="text-[10px] text-white/40 uppercase tracking-tighter">
                {d.name}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
