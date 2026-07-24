import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Tag, Loader2 } from 'lucide-react';
import { usePlaces } from '@/hooks/queries/usePlaces';

export function CategoryDistributionPie() {
  const { data: places, isLoading } = usePlaces({ page_size: 100 });

  const chartData = React.useMemo(() => {
    if (!places?.items) return [];
    
    const counts: Record<string, number> = {};
    places.items.forEach(p => {
      const cat = p.category || "Autre";
      counts[cat] = (counts[cat] || 0) + 1;
    });

    const colors = ['#3b82f6', '#8b5cf6', '#f59e0b', '#10b981', '#f43f5e', '#64748b'];

    return Object.entries(counts)
      .map(([name, value], i) => ({
        name,
        value,
        color: colors[i % colors.length]
      }))
      .sort((a, b) => b.value - a.value);
  }, [places]);

  if (isLoading) return (
    <Card className="bg-zinc-900/40 border-white/5 h-[300px] flex items-center justify-center">
      <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
    </Card>
  );

  return (
    <Card className="bg-zinc-900/40 border-white/5 text-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2 bg-white/[0.02] border-b border-white/5">
        <CardTitle className="text-sm font-bold text-white/70 uppercase tracking-tighter">Mix des Catégories</CardTitle>
        <Tag className="h-4 w-4 text-blue-400" />
      </CardHeader>
      <CardContent className="h-[250px] flex flex-col justify-center">
        <ResponsiveContainer width="100%" height={160}>
          <PieChart>
            <Pie
              data={chartData}
              innerRadius={45}
              outerRadius={65}
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#09090b', border: '1px solid #ffffff10', fontSize: '10px', borderRadius: '8px' }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-2 gap-2 mt-4">
           {chartData.slice(0, 4).map(d => (
             <div key={d.name} className="flex items-center gap-1.5 overflow-hidden">
               <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
               <span className="text-[9px] text-white/40 uppercase tracking-tighter truncate">{d.name}</span>
             </div>
           ))}
        </div>
      </CardContent>
    </Card>
  );
}
