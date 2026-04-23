import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Heart } from "lucide-react";

const data = [
  { day: "Lun", count: 24 },
  { day: "Mar", count: 35 },
  { day: "Mer", count: 48 },
  { day: "Jeu", count: 32 },
  { day: "Ven", count: 64 },
  { day: "Sam", count: 58 },
  { day: "Dim", count: 72 },
];

export function FavoritesChart() {
  return (
    <Card className="bg-zinc-900/40 border-white/5 text-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-white/70">Engagement (Favoris)</CardTitle>
        <Heart className="h-4 w-4 text-rose-500" />
      </CardHeader>
      <CardContent className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
            <XAxis 
              dataKey="day" 
              stroke="#ffffff15" 
              tick={{ fill: '#ffffff40', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              stroke="#ffffff15" 
              tick={{ fill: '#ffffff40', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#09090b', border: '1px solid #ffffff10', fontSize: '10px' }}
            />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#f43f5e"
              strokeWidth={2}
              dot={{ r: 3, fill: '#f43f5e', strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
