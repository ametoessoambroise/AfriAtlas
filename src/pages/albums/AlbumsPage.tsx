import { useState } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  Plus,
  Search,
  Filter,
  LayoutGrid,
  List as ListIcon,
  ChevronDown,
  Calendar,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AlbumsGrid from "@/components/albums/AlbumsGrid";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

const AlbumsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6 animate-in fade-in duration-700">
        {/* ── PAGE HEADER ─────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-black text-foreground tracking-tight uppercase">
              Mes <span className="text-primary">Albums</span> de Voyage
            </h1>
            <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest mt-1 opacity-70">
              Organisez et revivez vos plus beaux souvenirs de voyage.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate("/albums/new")}
              className="flex items-center hover:bg-primary/90 transition-all gap-2 px-4 py-2.5 rounded-md border border-border bg-primary text-primary-foreground text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/10"
            >
              <Plus className="w-4 h-4" /> Nouvel Album
            </button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-4 animate-in slide-in-from-bottom-4 duration-500 delay-100">
          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un album..."
                className="pl-12 h-12 rounded-md border-border bg-card shadow-sm focus:ring-primary/20 text-xs font-bold"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48 h-12 rounded-md border border-border bg-card text-xs font-bold uppercase tracking-widest">
                <div className="flex items-center gap-3">
                  <Filter className="w-4 h-4 text-primary" />
                  <SelectValue placeholder="Tous les statuts" />
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-md border border-border bg-card shadow-xl">
                <SelectItem value="all" className="text-xs font-bold uppercase tracking-widest py-3">Tous les statuts</SelectItem>
                <SelectItem value="public" className="text-xs font-bold uppercase tracking-widest py-3">Public</SelectItem>
                <SelectItem value="private" className="text-xs font-bold uppercase tracking-widest py-3">Privé</SelectItem>
              </SelectContent>
            </Select>

            {/* Date Filter */}
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-full md:w-48 h-12 rounded-md border border-border bg-card text-xs font-bold uppercase tracking-widest">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-primary" />
                  <SelectValue placeholder="Toutes les dates" />
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-md border border-border bg-card shadow-xl">
                <SelectItem value="all" className="text-xs font-bold uppercase tracking-widest py-3">Toutes les dates</SelectItem>
                <SelectItem value="2026" className="text-xs font-bold uppercase tracking-widest py-3">2026</SelectItem>
                <SelectItem value="2025" className="text-xs font-bold uppercase tracking-widest py-3">2025</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2 p-1 bg-card border border-border rounded-md shadow-sm self-end lg:self-auto">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-2.5 rounded-lg transition-all",
                viewMode === "grid"
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "text-muted-foreground hover:bg-muted/10",
              )}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "p-2.5 rounded-lg transition-all",
                viewMode === "list"
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "text-muted-foreground hover:bg-muted/10",
              )}
            >
              <ListIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Albums Grid/List */}
        <div className="animate-in slide-in-from-bottom-4 duration-500 delay-200">
          <AlbumsGrid
            searchQuery={searchQuery}
            statusFilter={statusFilter}
            dateFilter={dateFilter}
            viewMode={viewMode}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AlbumsPage;
