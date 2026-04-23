import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Heart, Image as ImageIcon, ShoppingBag, Calendar } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  data: number[];
}

function StatCard({ title, value, icon, color, data }: StatCardProps) {
  const chartData = {
    labels: data.map((_, i) => i.toString()),
    datasets: [
      {
        data,
        borderColor: color,
        backgroundColor: `${color}22`,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: {
      x: { display: false },
      y: { display: false, min: Math.min(...data) - 1, max: Math.max(...data) + 1 },
    },
  };

  return (
    <div className="bg-card border border-border p-6 rounded-[32px] shadow-sm hover:shadow-md transition-all flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="p-3 bg-surface-alt rounded-2xl text-muted-foreground">
          {icon}
        </div>
        <div className="w-20 h-8">
          <Line data={chartData} options={options} />
        </div>
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{title}</p>
        <p className="text-3xl font-black">{value}</p>
      </div>
    </div>
  );
}

interface StatsRowProps {
  stats: {
    favorites_count: number;
    albums_count: number;
    orders_count: number;
    bookings_count: number;
  };
}

export default function StatsRow({ stats }: StatsRowProps) {
  // Mock data pour les graphiques sparklines
  const mockSpark = [3, 5, 4, 8, 6, 9, 8];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Favoris"
        value={stats.favorites_count}
        icon={<Heart className="w-5 h-5" />}
        color="#F43F5E"
        data={[2, 4, 3, 5, 4, 6, 5]}
      />
      <StatCard
        title="Albums"
        value={stats.albums_count}
        icon={<ImageIcon className="w-5 h-5" />}
        color="#8B5CF6"
        data={[1, 2, 2, 3, 2, 4, 3]}
      />
      <StatCard
        title="Commandes"
        value={stats.orders_count}
        icon={<ShoppingBag className="w-5 h-5" />}
        color="#10B981"
        data={[5, 3, 6, 4, 7, 5, 8]}
      />
      <StatCard
        title="Réservations"
        value={stats.bookings_count}
        icon={<Calendar className="w-5 h-5" />}
        color="#3B82F6"
        data={[0, 1, 0, 2, 1, 3, 2]}
      />
    </div>
  );
}
