import React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { DashboardHeader } from "./DashboardHeader";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background overflow-hidden flex flex-col h-screen">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto no-scrollbar pb-10">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export { RecentFavorites } from "./RecentFavorites";
export { RecentOrders } from "./RecentOrders";
export { GlobalTopPlaces } from "./GlobalTopPlaces";
