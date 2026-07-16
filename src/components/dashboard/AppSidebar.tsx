"use client";

import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  MapPin,
  CalendarDays,
  ShoppingBag,
  Heart,
  Settings,
  LogOut,
  Building2,
  ChevronDown,
  Camera,
  Compass
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const navMain = [
  { title: "Tableau de bord", url: "/dashboard", icon: LayoutDashboard },
  { title: "Destinations", url: "/destinations", icon: Compass },
];

const navTravel = [
  { title: "Réservations", url: "/bookings", icon: CalendarDays },
  { title: "Commandes", url: "/orders", icon: ShoppingBag },
  { title: "Favoris", url: "/favorites", icon: Heart },
];

const navProfile = [
  { title: "Paramètres", url: "/profile/edit", icon: Settings },
];

const Logo = () => (
  <Link
    to="/"
    className="flex items-center gap-3 shrink-0 px-1"
    aria-label="Home"
  >
    <motion.div
      whileHover={{ scale: 1.08, rotate: 3 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-lg shadow-primary/20"
    >
      <Building2 className="h-5 w-5" />
    </motion.div>
    <span className="text-sm font-black tracking-tighter text-foreground group-data-[collapsible=icon]:sr-only">
      WORLD<span className="text-primary">ATLAS</span>
    </span>
  </Link>
);

export function AppSidebar() {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();

  return (
    <Sidebar variant="sidebar" collapsible="icon" className="border-r border-border/60">
      <SidebarHeader className="border-b border-border/50 px-4 py-4">
        <div className="flex items-center gap-3">
          <Logo />
          <SidebarTrigger className="ml-auto h-4 w-4 text-muted-foreground hidden group-data-[collapsible=icon]:flex" />
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-6">
        {/* MAIN */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 px-3 mb-2">
            Principal
          </SidebarGroupLabel>
          <SidebarMenu>
            {navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.url}
                  className="rounded-md transition-all duration-300"
                >
                  <Link to={item.url}>
                    <item.icon className={`h-4 w-4 ${pathname === item.url ? "text-primary" : ""}`} />
                    <span className="font-bold">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* TRAVEL */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 px-3 mb-2 mt-4">
            Mes Voyages
          </SidebarGroupLabel>
          <SidebarMenu>
            {navTravel.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.url}
                  className="rounded-md transition-all duration-300"
                >
                  <Link to={item.url}>
                    <item.icon className={`h-4 w-4 ${pathname === item.url ? "text-primary" : ""}`} />
                    <span className="font-bold">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* PROFILE */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 px-3 mb-2 mt-4">
            Compte
          </SidebarGroupLabel>
          <SidebarMenu>
            {navProfile.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.url}
                  className="rounded-md transition-all duration-300"
                >
                  <Link to={item.url}>
                    <item.icon className={`h-4 w-4 ${pathname === item.url ? "text-primary" : ""}`} />
                    <span className="font-bold">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => logout()}
                  className="rounded-md text-destructive hover:bg-destructive/10 hover:text-destructive transition-all duration-300"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="font-bold">Déconnexion</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* PROMO CARD (Internal Tool Style) */}
        <div className="mt-8 px-3 group-data-[collapsible=icon]:hidden">
           <div className="bg-primary/5 border border-primary/10 rounded-md p-4 relative overflow-hidden group/card">
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/10 rounded-full blur-xl group-hover/card:scale-150 transition-transform" />
              <Camera className="w-5 h-5 text-primary mb-2" />
              <p className="text-[11px] font-black text-foreground uppercase tracking-wider leading-tight mb-1">
                 Version Mobile
              </p>
              <p className="text-[10px] text-muted-foreground font-medium mb-3">
                 Emportez vos cartes partout avec vous.
              </p>
              <button className="w-full py-2 bg-primary text-white rounded-md text-[10px] font-black uppercase tracking-widest hover:shadow-lg transition-all">
                 Installer
              </button>
           </div>
        </div>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/50 px-4 py-5 bg-muted/20">
        <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
          <Avatar className="h-9 w-9 border-2 border-primary/10 shadow-sm">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-black">
              {user?.fullname?.substring(0, 2).toUpperCase() || "V"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0 group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-black text-foreground truncate leading-none mb-1">
              {user?.fullname || "Voyageur"}
            </span>
            <span className="text-[10px] text-muted-foreground font-bold truncate opacity-70">
              {user?.email || "Afriatlas.travel"}
            </span>
          </div>
          <ChevronDown className="ml-auto h-4 w-4 text-muted-foreground group-data-[collapsible=icon]:hidden" />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
