import React, { useState } from "react";
import {
  LayoutDashboard,
  MapPin,
  CalendarDays,
  BarChart2,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  Globe,
  Camera,
  ShoppingBag,
  Heart,
  Menu,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import SearchBar from "../destinations/SearchBar";
import { ThemeToggle } from "../layout/ThemeToggle";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navMenu = [
  {
    icon: <LayoutDashboard className="w-4 h-4" />,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: <MapPin className="w-4 h-4" />,
    label: "Destinations",
    href: "/destinations",
  },
  {
    icon: <CalendarDays className="w-4 h-4" />,
    label: "Réservations",
    href: "/bookings",
  },
  {
    icon: <ShoppingBag className="w-4 h-4" />,
    label: "Commandes",
    href: "/orders",
  },
  { icon: <Heart className="w-4 h-4" />, label: "Favoris", href: "/favorites" },
];

const navGeneral = [
  {
    icon: <Settings className="w-4 h-4" />,
    label: "Paramètres",
    href: "/profile/edit",
  },
  { icon: <HelpCircle className="w-4 h-4" />, label: "Aide", href: "/help" },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const location = useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background overflow-hidden font-body relative">
      {/* ══ MOBILE SIDEBAR OVERLAY ═══════════════════════════════════════════ */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ══ SIDEBAR ══════════════════════════════════════════════════════════ */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-[240px] bg-card border-r border-border transition-transform duration-300 md:relative md:translate-x-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        flex flex-col justify-between py-6 px-4
      `}
      >
        {/* Logo */}
        <div>
          <Link to="/" className="flex items-center gap-2.5 mb-8 px-2 group">
            <div className="w-8 h-8 flex items-center justify-center group-hover:scale-110 transition-transform">
              <img
                src="/favicon.ico"
                alt="logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-base font-black tracking-tight text-foreground font-premium">
              WorldAtlas Travel
            </span>
          </Link>

          {/* Menu section */}
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-2 mb-2">
            Menu
          </p>
          <nav className="space-y-0.5 mb-6">
            {navMenu.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* General section */}
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-2 mb-2">
            General
          </p>
          <nav className="space-y-0.5">
            {navGeneral.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => logout()}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-destructive hover:bg-destructive/10 transition-all"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </nav>
        </div>

        {/* Support Card — bottom */}
        <div className="bg-primary rounded-2xl p-5 relative overflow-hidden group">
          <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-secondary/20 blur-2xl group-hover:scale-125 transition-transform" />
          <Camera className="w-6 h-6 text-primary-foreground mb-3" />
          <p className="text-primary-foreground text-sm font-black leading-tight mb-1">
            Télécharger le <span className="text-secondary">Guide</span>
          </p>
          <p className="text-primary-foreground/60 text-[11px] mb-4">
            Cartes offline & réservations
          </p>
          <button className="w-full py-2 rounded-xl text-xs font-bold text-primary-foreground border border-primary-foreground/30 hover:bg-primary-foreground/10 transition-all backdrop-blur-sm">
            Download App
          </button>
        </div>
      </aside>

      {/* ══ MAIN ════════════════════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="flex items-center justify-between px-6 py-3.5 bg-card border-b border-border flex-shrink-0 z-20">
          {/* Search */}
          <div className="flex-1 max-w-sm ml-8 md:ml-0">
            <SearchBar />
          </div>

          {/* Right side: icons + user */}
          <div className="flex items-center gap-1 md:gap-2">
            <button className="bg-primary rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary/80 transition-all">
              <ThemeToggle />
            </button>

            {/* Hamburger (Mobile) */}
            <button
              className="w-9 h-9 rounded-xl bg-muted border border-border flex items-center justify-center md:hidden hover:bg-muted/80 transition-all"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>

            {/* User info + avatar */}
            <div className="flex items-center gap-3 pl-3 border-l border-border ml-1">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-foreground leading-none">
                  {user?.fullname || "Voyageur"}
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5 truncate max-w-[140px]">
                  {user?.email || ""}
                </p>
              </div>
              <div className="w-9 h-9 rounded-full border-2 border-primary/20 p-0.5 bg-card overflow-hidden transition-transform hover:scale-105 cursor-pointer flex-shrink-0">
                {user?.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    alt="Avatar"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-black">
                    {user?.fullname?.charAt(0).toUpperCase() || "A"}
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto no-scrollbar bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}

export { RecentFavorites } from "./RecentFavorites";
export { RecentOrders } from "./RecentOrders";
export { GlobalTopPlaces } from "./GlobalTopPlaces";
