import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Calendar } from "lucide-react";

const bookingData = [
  { name: "Sem 1", count: 45 },
  { name: "Sem 2", count: 72 },
  { name: "Sem 3", count: 58 },
  { name: "Sem 4", count: 94 },
];

export function BookingsChart() {
  return (
    <Card className="bg-zinc-900/40 border-white/5 text-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Réservations VR</CardTitle>
            <CardDescription className="text-white/40">Évolution du volume des sessions VR par semaine.</CardDescription>
          </div>
          <Calendar className="h-5 w-5 text-emerald-500" />
        </div>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={bookingData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
            <XAxis dataKey="name" stroke="#ffffff15" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#ffffff40'}} dy={10} />
            <YAxis stroke="#ffffff15" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#ffffff40'}} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#18181b', border: '1px solid #ffffff10', borderRadius: '12px', fontSize: '11px' }}
              cursor={{fill: '#ffffff05'}}
            />
            <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
