// ---------------------------------------------------------------------------

// src/components/profile/ProfileStats.tsx
import { Heart, Image as ImageIcon, ShoppingBag, Map } from "lucide-react";

interface ProfileStatsProps {
  stats: {
    favorites: number;
    albums: number;
    orders: number;
    visits: number;
  };
}

export function ProfileStats({ stats }: ProfileStatsProps) {
  const items = [
    { label: "Favoris", val: stats.favorites, icon: <Heart />, color: "text-red-500", bg: "bg-red-500/10" },
    { label: "Albums", val: stats.albums, icon: <ImageIcon />, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "Commandes", val: stats.orders, icon: <ShoppingBag />, color: "text-green-500", bg: "bg-green-500/10" },
    { label: "Visites", val: stats.visits, icon: <Map />, color: "text-blue-500", bg: "bg-blue-500/10" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
      {items.map((it, i) => (
        <div key={i} className="bg-card border border-border p-4 rounded-3xl flex flex-col items-center text-center gap-2">
          <div className={`p-3 rounded-2xl ${it.bg} ${it.color}`}>
            {it.icon}
          </div>
          <p className="text-2xl font-black">{it.val}</p>
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{it.label}</p>
        </div>
      ))}
    </div>
  );
}