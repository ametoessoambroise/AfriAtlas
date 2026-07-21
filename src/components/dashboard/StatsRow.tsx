import React, { memo } from "react";
import {
  ArrowUpRight,
  Heart,
  ShoppingBag,
  Image as ImageIcon,
  CalendarDays,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { formatNumber } from "@/lib/utils/formatters";
import StatCardSkeleton from "./skeletons/StatCardSkeleton";

interface StatCardProps {
  label: string;
  value: string | number;
  sub: string;
  trend: string;
  link?: string;
}

const StatCard = memo(({ label, value, sub, trend, link }: StatCardProps) => {
  const Content = (
    <Card className="border border-border shadow-none hover:border-primary/30 transition-colors">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-muted-foreground font-medium">
            {label}
          </span>
          <Badge
            variant="secondary"
            className="bg-primary/10 text-primary border-0 text-xs font-semibold gap-1 dark:bg-primary/20"
          >
            <ArrowUpRight className="h-3 w-3" />
            {trend}
          </Badge>
        </div>
        <p className="text-3xl font-black text-foreground tracking-tight mb-2 font-premium">
          {typeof value === "number" ? formatNumber(value) : value}
        </p>
        <p className="text-xs text-primary font-bold uppercase tracking-wider">
          {sub}
        </p>
        <p className="text-[10px] text-muted-foreground mt-1 font-medium italic">
          Données en temps réel
        </p>
      </CardContent>
    </Card>
  );

  if (link) {
    return (
      <Link to={link} className="block h-full outline-none">
        {Content}
      </Link>
    );
  }

  return Content;
});

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
      sub: "Lieux préférés",
      trend: "LIVE",
    },
    {
      label: "Albums",
      link: "/albums",
      value: stats.albums_count,
      sub: "Souvenirs",
      trend: "+1.2%",
    },
    {
      label: "Commandes",
      link: "/orders",
      value: stats.orders_count,
      sub: "Transactions",
      trend: "+5.4%",
    },
    {
      label: "Réservations",
      link: "/bookings",
      value: stats.bookings_count,
      sub: "Voyages prévus",
      trend: "ACTIVE",
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
