import React, { memo } from "react";
import {
  ArrowUpRight,
  TrendingUp,
  Globe,
  MapPin,
  Compass,
  CalendarDays,
  Heart,
  ShoppingBag,
  Image as ImageIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { formatNumber } from "@/lib/utils/formatters";
import StatCardSkeleton from "./skeletons/StatCardSkeleton";

interface StatCardProps {
  label: string;
  value: string | number;
  sub: string;
  icon: React.ReactNode;
  accent?: boolean;
  link?: string;
}

const StatCard = memo(
  ({ label, value, sub, icon, accent, link }: StatCardProps) => {
    const Content = (
      <div
        className={`rounded-[32px] p-6 h-full relative overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-xl group ${
          accent
            ? "bg-primary text-primary-foreground"
            : "bg-card border border-border"
        }`}
      >
        <div className="flex items-center justify-between mb-4 relative z-10">
          <p
            className={`text-sm font-bold ${
              accent ? "opacity-80" : "text-muted-foreground"
            }`}
          >
            {label}
          </p>
          <div
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all group-hover:scale-110 ${
              accent
                ? "border-primary-foreground/30 text-primary-foreground"
                : "border-border text-muted-foreground"
            }`}
          >
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        <p
          className={`text-4xl font-black tracking-tight mb-3 font-premium relative z-10`}
        >
          {typeof value === "number" ? formatNumber(value) : value}
        </p>

        <div className="flex items-center gap-2 relative z-10">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center ${
              accent ? "bg-primary-foreground/20" : "bg-muted text-secondary"
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
          </div>
          <span
            className={`text-xs font-bold ${
              accent ? "text-primary-foreground/70" : "text-muted-foreground"
            }`}
          >
            {sub}
          </span>
        </div>

        {/* Background Icon Decoration */}
        <div
          className={`absolute -bottom-4 -right-4 w-24 h-24 opacity-5 transition-transform duration-700 group-hover:scale-125 group-hover:rotate-12 ${accent ? "text-primary-foreground" : "text-primary"}`}
        >
          {icon}
        </div>
      </div>
    );

    if (link) {
      return (
        <Link to={link} className="block h-full outline-none">
          {Content}
        </Link>
      );
    }

    return Content;
  },
);

interface StatsRowProps {
  stats?: {
    favorites_count: number;
    albums_count: number;
    orders_count: number;
    bookings_count: number;
  };
  isLoading?: boolean;
}

export default function StatsRow({ stats, isLoading }: StatsRowProps) {
  if (isLoading || !stats) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  const statItems = [
    {
      label: "Favoris",
      link: "/favorites",
      value: stats.favorites_count,
      sub: "Vos lieux préférés",
      accent: true,
      icon: <Heart className="w-full h-full" />,
    },
    {
      label: "Albums",
      link: "/albums",
      value: stats.albums_count,
      sub: "Souvenirs de voyage",
      icon: <ImageIcon className="w-full h-full" />,
    },
    {
      label: "Commandes",
      link: "/orders",
      value: stats.orders_count,
      sub: "Transactions",
      icon: <ShoppingBag className="w-full h-full" />,
    },
    {
      label: "Réservations",
      link: "/bookings",
      value: stats.bookings_count,
      sub: "Voyages prévus",
      icon: <CalendarDays className="w-full h-full" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item, i) => (
        <StatCard key={i} {...item} />
      ))}
    </div>
  );
}
