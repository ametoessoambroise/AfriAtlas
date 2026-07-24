"use client";

import { Bell, Calendar, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

import { ThemeToggle } from "../layout/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import SearchBar from "../destinations/SearchBar";

export function DashboardHeader() {
  const { user } = useAuth();

  return (
    <header className="flex h-16 items-center border-b border-border bg-card px-6 gap-4 sticky top-0 z-20">
      {/* Search Bar - Integrated from Afriatlas */}
      <div className="flex-1 max-w-sm hidden md:block">
        <SearchBar />
      </div>

      {/* Right Controls */}
      <div className="ml-auto flex items-center gap-3 text-foreground">
        {/* Date Picker Placeholder */}
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-2 text-[10px] font-black uppercase tracking-widest hidden lg:flex"
        >
          <Calendar className="h-3.5 w-3.5" />
          Prochain Voyage
        </Button>

        {/* Export / Sync */}
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-2 text-[10px] font-black uppercase tracking-widest hidden sm:flex"
        >
          <Download className="h-3.5 w-3.5" />
          Exporter
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
          <Bell className="h-4 w-4" />
        </Button>

        {/* Theme Toggle */}
        <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center">
          <ThemeToggle />
        </div>

        {/* User Profile Summary */}
        <div className="flex items-center gap-3 pl-3 border-l border-border ml-1">
          <div className="w-8 h-8 rounded-full border-2 border-primary/20 p-0.5 bg-card overflow-hidden">
            {user?.avatar_url ? (
              <img
                src={user.avatar_url}
                alt="Avatar"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-primary flex items-center justify-center text-primary-foreground text-[10px] font-black">
                {user?.fullname?.charAt(0).toUpperCase() || "A"}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
