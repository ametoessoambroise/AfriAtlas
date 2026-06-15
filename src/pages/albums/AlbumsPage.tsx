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
import { Link } from "react-router-dom";
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

const AlbumsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h1 className="text-6xl font-heading tracking-tight text-primary/80">
              Mes Albums <br />
              <span className="text-muted-foreground italic font-light">
                de Voyage
              </span>
            </h1>
            <p className="text-foreground text-lg max-w-md">
              Organisez et revivez vos plus beaux souvenirs de voyage.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              to="/albums/new"
              className="flex items-center gap-3 bg-primary text-foreground px-10 py-5 rounded-full shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all font-black uppercase tracking-widest text-xs"
            >
              <Plus className="w-5 h-5" />
              Nouvel Album
            </Link>
          </motion.div>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground" />
              <Input
                placeholder="Rechercher un album..."
                className="pl-12 py-6 rounded-2xl border-border bg-background shadow-sm focus:ring-primary/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48 py-6 rounded-2xl border border-border/20 bg-background/20 backdrop-blur-lg">
                <div className="flex items-center gap-3">
                  <Filter className="w-4 h-4 text-foreground" />
                  <SelectValue placeholder="Tous les statuts" />
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-md border border-border/20 bg-background/20 backdrop-blur-lg">
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="private">Privé</SelectItem>
              </SelectContent>
            </Select>

            {/* Date Filter */}
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-full md:w-48 py-6 rounded-2xl border-border bg-background shadow-sm">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-foreground" />
                  <SelectValue placeholder="Toutes les dates" />
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-md border border-border/20 bg-background/20 backdrop-blur-lg">
                <SelectItem value="all">Toutes les dates</SelectItem>
                <SelectItem value="2026">2026</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2 p-1 bg-background border border-border rounded-2xl shadow-sm self-end lg:self-auto">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-3 rounded-xl transition-all",
                viewMode === "grid"
                  ? "bg-primary/10 text-primary shadow-inner"
                  : "text-zinc-400 hover:text-zinc-600",
              )}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "p-3 rounded-xl transition-all",
                viewMode === "list"
                  ? "bg-primary/10 text-primary shadow-inner"
                  : "text-zinc-400 hover:text-zinc-600",
              )}
            >
              <ListIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Albums Grid/List */}
        <AlbumsGrid
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          dateFilter={dateFilter}
          viewMode={viewMode}
        />
      </div>
    </div>
  );
};

export default AlbumsPage;
