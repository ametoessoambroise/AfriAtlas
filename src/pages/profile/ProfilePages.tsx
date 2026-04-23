// src/pages/profile/ProfilePage.tsx
import { useAuth } from "@/hooks/useAuth";
import { useUserDashboard } from "@/hooks/queries/useUserDashboard";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileStats } from "@/components/profile/ProfilesStats";
import { Loader2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const { dashboard, orders, bookings, isLoading: isDashLoading } = useUserDashboard();

  if (isAuthLoading || isDashLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 pt-6">
      <div className="container mx-auto px-4 max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="p-2 hover:bg-surface-alt rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h2 className="text-2xl font-black">Mon Profil Atlas</h2>
        </div>

        <ProfileHeader user={user} />

        <ProfileStats stats={{
          favorites: dashboard?.favorites_count || 0,
          albums: dashboard?.albums_count || 0,
          orders: orders.length,
          visits: bookings.length
        }} />

        <div className="bg-surface-alt p-8 rounded-[40px] border border-border">
          <h3 className="text-xl font-black mb-4">À propos de moi</h3>
          <p className="text-muted-foreground leading-relaxed">
            Membre passionné de la communauté Atlas Voyages. Explorant le Togo et ses merveilles
            depuis mon inscription en {new Date(user.created_at).getFullYear()}.
          </p>
        </div>
      </div>
    </div>
  );
}