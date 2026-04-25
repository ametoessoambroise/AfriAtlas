import { useUserDashboard } from "@/hooks/queries/useUserDashboard";
import StatsRow from "@/components/dashboard/StatsRow";
import {
  RecentFavorites,
  RecentOrders,
  GlobalTopPlaces,
} from "@/components/dashboard/DashboardLists";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardAnalytics } from "@/components/dashboard/DashboardAnalytics";
import { NextBookingCard } from "@/components/dashboard/NextBookingCard";
import { SubscriptionGauge } from "@/components/dashboard/SubscriptionGauge";
import DashboardSkeleton from "@/components/dashboard/skeletons/DashboardSkeleton";
import {
  AlertCircle,
  Plus,
  RefreshCcw,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
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
            className="rounded-xl"
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-primary font-premium">
              Mes voyages
            </h1>
            <p className="text-muted-foreground text-sm font-medium mt-0.5">
              Voyagez à travers le monde et gardez une trace de vos aventures.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center hover:bg-primary/90 transition-all gap-2 px-4 py-2.5 rounded-xl border border-border bg-primary text-primary-foreground text-sm font-bold sm:text-xs lg:text-base shadow-sm">
              <Plus className="w-4 h-4" /> Planifier
              <span className="sm:block hidden">un voyage</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm font-bold hover:bg-muted transition-all sm:text-xs lg:text-base">
              <RefreshCcw className="w-4 h-4" /> Synchroniser
              <span className="sm:block hidden">les réservations</span>
            </button>
          </div>
        </div>

        {/* ── ROW 1 : Stats (4 cards full width) ──────────────────────────── */}
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

        {/* ── ROW 2 : Analytics + Reminders/Booking + Trips/GlobalPlaces ───── */}
        {/*
            Layout image :
              - col gauche large  : Weekly Bookings (graphe)      → 5/12
              - col centre        : Reminders (next booking)       → 4/12
              - col droite étroite: Trips list (global top places) → 3/12
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 animate-in slide-in-from-bottom-4 duration-500 delay-200">
          {/* Weekly Bookings */}
          <div className="lg:col-span-5">
            <DashboardAnalytics
              ordersCount={orders.length}
              bookingsCount={bookings.length}
            />
          </div>

          {/* Reminders / Next Booking */}
          <div className="lg:col-span-4">
            <NextBookingCard
              booking={bookings[0]}
              isLoading={isLoading && bookings.length === 0}
            />
          </div>

          {/* Trips / Top Places */}
          <div className="lg:col-span-3">
            <GlobalTopPlaces
              places={topPlaces}
              isLoading={isLoading && topPlaces.length === 0}
            />
          </div>
        </div>

        {/* ── ROW 3 : Companions + Completion gauge + Quick Actions ─────────── */}
        {/*
            Layout image :
              - col gauche        : Travel Companions (favorites)  → 5/12
              - col centre        : Travel Completion (gauge)      → 4/12
              - col droite        : Trip Starts In / Quick Actions → 3/12
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 animate-in slide-in-from-bottom-4 duration-500 delay-300">
          {/* Travel Companions */}
          <div className="lg:col-span-5">
            <RecentFavorites
              favorites={favorites}
              isLoading={isLoading && favorites.length === 0}
            />
          </div>

          {/* Travel Completion gauge */}
          <div className="lg:col-span-4">
            <SubscriptionGauge status={dashboard?.user?.subscription_status} />
          </div>

          {/* Quick Actions / Trip countdown */}
          <div className="lg:col-span-3">
            <QuickActions />
          </div>
        </div>

        {/* ── ROW 4 : Recent Orders (full width) ──────────────────────────── */}
        <div className="animate-in slide-in-from-bottom-4 duration-500 delay-400">
          <RecentOrders
            orders={orders}
            isLoading={isLoading && orders.length === 0}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
