import React, { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  Settings,
  Bell,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Map,
  ShoppingBag,
  Star,
  Settings2,
  BarChart3,
  Megaphone,
  Banknote,
} from "lucide-react";

import { useAuth } from "@/hooks/useAuth";

// ─── Sidebar links ────────────────────────────────────────────────────────────
const adminNavLinks = [
  {
    label: "Tableau de Bord",
    href: "/admin/dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    label: "Analyses & BI",
    href: "/admin/analytics",
    icon: <BarChart3 className="h-4 w-4" />,
  },
  {
    label: "Revenus",
    href: "/admin/revenues",
    icon: <Banknote className="h-4 w-4" />,
  },
  {
    label: "Publicités",
    href: "/admin/ads",
    icon: <Megaphone className="h-4 w-4" />,
  },

  {
    label: "Revendications",
    href: "/admin/claims",
    icon: <ShieldCheck className="h-4 w-4" />,
  },
  {
    label: "Utilisateurs",
    href: "/admin/users",
    icon: <Users className="h-4 w-4" />,
  },
  {
    label: "Destinations",
    href: "/admin/destinations",
    icon: <Map className="h-4 w-4" />,
  },
  {
    label: "Catalogues",
    href: "/admin/products",
    icon: <ShoppingBag className="h-4 w-4" />,
  },
  {
    label: "Avis Clients",
    href: "/admin/reviews",
    icon: <Star className="h-4 w-4" />,
  },
  {
    label: "Paramètres",
    href: "/admin/settings",
    icon: <Settings2 className="h-4 w-4" />,
  },
];

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function AdminSidebar({ onClose }: { onClose?: () => void }) {
  const { user, logout } = useAuth();
  const location = useLocation();

  const initials =
    (user as any)?.fullname
      ?.split(" ")
      .map((n: string) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() ?? "A";

  return (
    <div className="flex flex-col h-full bg-zinc-950 border-r border-white/5">
      {/* Logo & Close */}
      <div className="flex items-center justify-between px-6 pt-8 pb-6">
        <Link to="/" className="flex items-center gap-3" onClick={onClose}>
          <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center font-black text-zinc-950 italic text-lg">
            A
          </div>
          <span className="text-sm font-bold tracking-widest uppercase text-white/90">
            Atlas Admin
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

      {/* Admin Info */}
      <div className="mx-4 mb-6 flex items-center gap-3 bg-white/[0.03] border border-white/5 rounded-md p-4">
        <div className="w-10 h-10 rounded-md bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-lg shadow-blue-500/10">
          {initials}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white truncate">
            {(user as any)?.fullname ?? "Administrateur"}
          </p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <ShieldCheck className="h-3 w-3 text-emerald-400" />
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
              Super Admin
            </span>
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 flex flex-col gap-1.5 overflow-y-auto custom-scrollbar">
        {adminNavLinks.map(({ label, href, icon }) => {
          const active = location.pathname.startsWith(href);
          return (
            <Link
              key={href}
              to={href}
              onClick={onClose}
              className={`flex items-center gap-3.5 px-4 py-3 rounded-md text-sm font-medium transition-all duration-300 ${
                active
                  ? "bg-amber-500 text-zinc-950 shadow-lg shadow-amber-500/20"
                  : "text-white/40 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              <span className={active ? "text-zinc-950" : "text-white/30"}>
                {icon}
              </span>
              {label}
              {active && (
                <ChevronRight className="h-3.5 w-3.5 ml-auto text-zinc-950/60" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/5">
        <Link
          to="/owner/dashboard"
          className="flex items-center gap-2.5 px-4 py-2 text-xs text-white/30 hover:text-white/60 transition-colors"
        >
          <Settings className="h-3.5 w-3.5" />
          Accès Owner
        </Link>
        <button
          onClick={() => logout()}
          className="flex items-center gap-2.5 px-4 py-2 mt-1 text-xs text-red-400/50 hover:text-red-400 transition-colors w-full text-left"
        >
          <LogOut className="h-3.5 w-3.5" />
          Déconnexion
        </button>
      </div>
    </div>
  );
}

// ─── AdminLayout ──────────────────────────────────────────────────────────────
const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 flex font-sans selection:bg-amber-500/30 selection:text-amber-500">
      {/* Desktop sidebar */}
      <div
        className={`hidden md:flex flex-col flex-shrink-0 fixed top-0 left-0 h-full z-40 transition-all duration-500 ease-in-out ${
          sidebarOpen ? "w-64" : "w-0 overflow-hidden"
        }`}
      >
        <AdminSidebar />
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed top-0 left-0 h-full w-72 z-50 md:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ damping: 25, stiffness: 200, type: "spring" }}
            >
              <AdminSidebar onClose={() => setMobileOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-500 ease-in-out ${
          sidebarOpen ? "md:ml-64" : "md:ml-0"
        }`}
      >
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-16 flex items-center justify-between px-8 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (window.innerWidth < 768) setMobileOpen(true);
                else setSidebarOpen(!sidebarOpen);
              }}
              className="text-white/40 hover:text-white hover:bg-white/5 p-2 rounded-lg transition-colors"
              aria-label="Toggle Menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="h-4 w-px bg-white/10 hidden md:block" />
            <h2 className="text-white/40 text-xs font-bold uppercase tracking-widest hidden md:block">
              Console Admin
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden lg:block">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <LayoutDashboard className="h-3.5 w-3.5 text-white/20" />
              </div>
              <input
                type="text"
                placeholder="Recherche globale..."
                className="bg-white/5 border border-white/5 rounded-full py-1.5 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-amber-500/30 transition-all w-64"
              />
            </div>
            <button className="relative w-9 h-9 rounded-md bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center text-white/40 hover:text-white transition-all group">
              <Bell className="h-4 w-4 group-hover:rotate-12 transition-transform" />
              <span className="absolute top-2 right-2.5 w-1.5 h-1.5 rounded-full bg-amber-500 border border-zinc-950" />
            </button>
            <div className="w-9 h-9 rounded-md bg-gradient-to-br from-zinc-700 to-zinc-900 border border-white/10" />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-8 lg:p-10 max-w-[1600px] mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
