import { useUserDashboard } from "@/hooks/queries/useUserDashboard";
import WelcomeBanner from "@/components/dashboard/WelcomeBanner";
import StatsRow from "@/components/dashboard/StatsRow";
import { RecentFavorites, RecentOrders, GlobalTopPlaces } from "@/components/dashboard/DashboardLists";
import { ActiveSubscriptionCard } from "@/components/dashboard/ActiveSubscriptionCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const { dashboard, orders, favorites, bookings, topPlaces, isLoading } = useUserDashboard();

  if (isLoading || !dashboard) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 pt-6">
      <div className="container mx-auto px-4 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* En-tête */}
        <WelcomeBanner user={dashboard.user} />

        {/* Statistiques (Desktop: 4 cols, Mobile: useMobile adapt) */}
        <StatsRow stats={{
            favorites_count: dashboard.favorites_count,
            albums_count: dashboard.albums_count,
            orders_count: orders.length,
            bookings_count: bookings.length
        }} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Colonne Principale (8/12) */}
          <div className="lg:col-span-8 space-y-8">
            <RecentFavorites favorites={favorites.map(f => {
              const coverMedia = f.media?.find(m => m.is_cover) || f.media?.[0];
              return {
                id: String(f.id),
                name: f.name,
                slug: f.name.toLowerCase().replace(/\s+/g, "-"),
                city: f.city || "Togo",
                category: "Destination",
                main_image: coverMedia?.media_url || "/placeholder.jpg"
              };
            }) as any} />
            <RecentOrders orders={orders} />
            <GlobalTopPlaces places={topPlaces} />
          </div>

          {/* Sidebar (4/12) */}
          <div className="lg:col-span-4 space-y-8">
            <ActiveSubscriptionCard user={dashboard.user} />
            <QuickActions />
          </div>

        </div>
      </div>
    </div>
  );
}
