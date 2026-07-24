// src/pages/profile/ProfilePage.tsx
import { useAuth } from "@/hooks/useAuth";
import { useUserDashboard } from "@/hooks/queries/useUserDashboard";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileStats } from "@/components/profile/ProfilesStats";
import { Loader2, ArrowLeft, User } from "lucide-react";
import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

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
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6 animate-in fade-in duration-700">
        {/* ── PAGE HEADER ─────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-black text-foreground tracking-tight uppercase">
              Mon <span className="text-primary">Profil</span> Atlas
            </h1>
            <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest mt-1 opacity-70">
              Aperçu de votre présence dans la communauté Atlas.
            </p>
          </div>
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center text-primary shadow-sm">
                <User className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 delay-100">
            <ProfileHeader user={user} />

            <ProfileStats stats={{
              favorites: dashboard?.favorites_count || 0,
              albums: dashboard?.albums_count || 0,
              orders: orders.length,
              visits: bookings.length
            }} />

            <div className="bg-card p-8 rounded-md border border-border shadow-sm">
              <h3 className="text-xl font-black uppercase tracking-tight mb-4">À propos de moi</h3>
              <p className="text-muted-foreground leading-relaxed font-medium">
                Membre passionné de la communauté Atlas Voyages. Explorant le Togo et ses merveilles
                depuis mon inscription en {new Date(user.created_at).getFullYear()}.
              </p>
            </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
