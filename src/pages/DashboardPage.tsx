import { useUserDashboard } from "@/hooks/queries/useUserDashboard";
import StatsRow from "@/components/dashboard/StatsRow";
import {
  RecentFavorites,
  RecentOrders,
  GlobalTopPlaces,
} from "@/components/dashboard/DashboardLists";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardAnalytics } from "@/components/dashboard/DashboardAnalytics";
import { NextBookingCard } from "@/components/dashboard/NextBookingCard";
import { SubscriptionGauge } from "@/components/dashboard/SubscriptionGauge";
import DashboardSkeleton from "@/components/dashboard/skeletons/DashboardSkeleton";
import { AlertCircle, Plus, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const navigate = useNavigate();
  const {
    dashboard,
    orders,
    favorites,
    bookings,
    topPlaces,
    isLoading,
    isError,
    refetch,
  } = useUserDashboard();

  if (isLoading && !dashboard) {
    return <DashboardSkeleton />;
  }

  if (isError && !dashboard) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4 max-w-md px-4">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto" />
          <h2 className="text-xl font-bold font-premium">
            Erreur de chargement
          </h2>
          <p className="text-muted-foreground">
            Impossible de charger le tableau de bord. Vérifiez votre connexion.
          </p>
          <Button
            onClick={() => refetch()}
            variant="outline"
            className="rounded-md"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Réessayer
          </Button>
        </div>
      </div>
    );
  }

  const firstName = dashboard?.user?.fullname?.split(" ")[0] || "Voyageur";

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6 animate-in fade-in duration-700">
        {/* ── PAGE HEADER ─────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-black text-foreground tracking-tight uppercase">
              Vue d'ensemble <span className="text-primary">Voyageur</span>
            </h1>
            <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest mt-1 opacity-70">
              Baromètre de vos aventures et réservations.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center hover:bg-primary/90 transition-all gap-2 px-4 py-2.5 rounded-xl border border-border bg-primary text-primary-foreground text-sm font-bold sm:text-xs lg:text-base shadow-sm">
              <Plus className="w-4 h-4" /> Planifier
            </button>
          </div>
        </div>

        {/* Metric Cards (Row 1) */}
        <div className="animate-in slide-in-from-bottom-4 duration-500 delay-100">
          <StatsRow
            isLoading={isLoading && !dashboard}
            stats={
              dashboard
                ? {
                    favorites_count: dashboard.favorites_count,
                    albums_count: dashboard.albums_count,
                    orders_count: orders.length,
                    bookings_count: bookings.length,
                  }
                : undefined
            }
          />
        </div>

        {/* Middle Row (Analytics + Budget/Gauge) */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6 animate-in slide-in-from-bottom-4 duration-500 delay-200">
          <DashboardAnalytics
            ordersCount={orders.length}
            bookingsCount={bookings.length}
          />
          <SubscriptionGauge status={dashboard?.user?.subscription_status} />
        </div>

        {/* Bottom Row (Orders + Fulfillment/NextBooking) */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6 animate-in slide-in-from-bottom-4 duration-500 delay-300">
          <RecentOrders
            orders={orders}
            isLoading={isLoading && orders.length === 0}
          />
          <NextBookingCard
            booking={bookings[0]}
            isLoading={isLoading && bookings.length === 0}
          />
        </div>

        {/* Extra Row for Favorites/Top Places if needed, or remove to match new design strictly */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in slide-in-from-bottom-4 duration-500 delay-400">
          <RecentFavorites
            favorites={favorites}
            isLoading={isLoading && favorites.length === 0}
          />
          <GlobalTopPlaces
            places={topPlaces}
            isLoading={isLoading && topPlaces.length === 0}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
