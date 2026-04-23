import React, { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  MapPin,
  Star,
  Package,
  ChevronRight,
  Menu,
  X,
  Crown,
  LogOut,
  Bell,
  Settings,
  Camera,
  Shield,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useOwnerClaims } from "@/hooks/queries/useOwnerDashboard";

// ─── Sidebar links ────────────────────────────────────────────────────────────
const ownerNavLinks = [
  {
    label: "Dashboard",
    href: "/owner/dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    label: "Mes Lieux",
    href: "/owner/places",
    icon: <MapPin className="h-4 w-4" />,
  },
  {
    label: "Revendications",
    href: "/owner/claims",
    icon: <Shield className="h-4 w-4" />,
  },
  {
    label: "Sessions VR",
    href: "/owner/vr-sessions",
    icon: <Camera className="h-4 w-4" />,
  },
  { label: "Avis", href: "/owner/reviews", icon: <Star className="h-4 w-4" /> },
  {
    label: "Produits",
    href: "/owner/products",
    icon: <Package className="h-4 w-4" />,
  },
  {
    label: "Paramètres",
    href: "/owner/settings",
    icon: <Settings className="h-4 w-4" />,
  },
];

// ─── PlaceSwitcherSidebar ─────────────────────────────────────────────────────
function SidebarPlaceSwitcher({
  activePlaceName,
}: {
  activePlaceName?: string;
}) {
  const { data: claims } = useOwnerClaims();
  if (!claims?.length) return null;
  return (
    <div className="mx-4 mb-4">
      <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-2 px-2">
        Lieu actif
      </p>
      <div className="bg-white/5 border border-white/8 rounded-xl px-3 py-2.5 flex items-center gap-2">
        <MapPin className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
        <span className="text-sm text-white/80 font-medium truncate">
          {activePlaceName ?? claims[0]?.place_name ?? "—"}
        </span>
        <ChevronRight className="h-3.5 w-3.5 text-white/30 ml-auto flex-shrink-0" />
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function OwnerSidebar({ onClose }: { onClose?: () => void }) {
  const { user, logout } = useAuth();
  const location = useLocation();

  const initials =
    (user as any)?.fullname
      ?.split(" ")
      .map((n: string) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() ?? "O";

  return (
    <div className="flex flex-col h-full bg-zinc-950 border-r border-white/8">
      {/* Logo & Close */}
      <div className="flex items-center justify-between px-5 pt-6 pb-5">
        <Link to="/" className="flex items-center gap-2.5" onClick={onClose}>
          <img
            src="/favicon.ico"
            alt="WorldAtlas"
            className="w-7 h-7 rounded-full object-cover"
          />
          <span className="text-xs font-bold tracking-widest uppercase text-white/70">
            WorldAtlas
          </span>
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Owner badge */}
      <div className="mx-4 mb-5 flex items-center gap-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl px-3 py-2.5">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
          {initials}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white truncate">
            {(user as any)?.fullname ?? "Propriétaire"}
          </p>
          <div className="flex items-center gap-1">
            <Crown className="h-3 w-3 text-amber-400" />
            <span className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider">
              Espace Owner
            </span>
          </div>
        </div>
      </div>

      {/* Place switcher */}
      <SidebarPlaceSwitcher />

      {/* Nav links */}
      <nav className="flex-1 px-3 flex flex-col gap-1">
        {ownerNavLinks.map(({ label, href, icon }) => {
          const active = location.pathname === href;
          return (
            <Link
              key={href}
              to={href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? "bg-amber-500/15 text-amber-300 border border-amber-500/20"
                  : "text-white/50 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              <span className={active ? "text-amber-400" : "text-white/30"}>
                {icon}
              </span>
              {label}
              {active && (
                <ChevronRight className="h-3.5 w-3.5 ml-auto text-amber-400/60" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/8">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors"
        >
          <LayoutDashboard className="h-3.5 w-3.5" />
          Vue Voyageur
        </Link>
        <button
          onClick={() => logout()}
          className="flex items-center gap-2 mt-2 text-xs text-red-400/60 hover:text-red-400 transition-colors"
        >
          <LogOut className="h-3.5 w-3.5" />
          Déconnexion
        </button>
      </div>
    </div>
  );
}

// ─── OwnerLayout ──────────────────────────────────────────────────────────────
const OwnerLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 flex">
      {/* Desktop sidebar — fixed */}
      <div className="hidden md:flex flex-col w-60 flex-shrink-0 fixed top-0 left-0 h-full z-40">
        <OwnerSidebar />
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed top-0 left-0 h-full w-64 z-50 md:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ ease: [0.4, 0, 0.2, 1], duration: 0.35 }}
            >
              <OwnerSidebar onClose={() => setMobileOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col md:ml-60 min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-14 flex items-center justify-between px-6 bg-zinc-950/90 backdrop-blur-md border-b border-white/8">
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden text-white/50 hover:text-white transition-colors"
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="hidden md:block" />
          <div className="flex items-center gap-3">
            <button className="relative w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/8 flex items-center justify-center text-white/50 hover:text-white transition-colors">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-400" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default OwnerLayout;
