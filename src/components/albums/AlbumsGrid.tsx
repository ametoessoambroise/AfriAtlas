import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Camera } from "lucide-react";
import { Link } from "react-router-dom";
import { useAlbums } from "@/hooks/queries/useAlbums";
import AlbumCard from "./AlbumCard";
import EmptyAlbums from "./EmptyAlbums";
import { ApiErrorState } from "@/components/feedback/ApiQueryState";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface AlbumsGridProps {
  searchQuery: string;
  statusFilter: string;
  dateFilter: string;
  viewMode: "grid" | "list";
}

const AlbumsGrid = ({
  searchQuery,
  statusFilter,
  dateFilter,
  viewMode,
}: AlbumsGridProps) => {
  const { data: albums, isLoading, isError, error, refetch } = useAlbums();

  const filteredAlbums = useMemo(() => {
    if (!albums) return [];

    return albums.filter((album) => {
      const matchesSearch = album.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "public" && album.is_public) ||
        (statusFilter === "private" && !album.is_public);

      const albumDate = new Date(album.created_at);
      const matchesDate =
        dateFilter === "all" ||
        albumDate.getFullYear().toString() === dateFilter;

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [albums, searchQuery, statusFilter, dateFilter]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="rounded-md overflow-hidden bg-background h-[400px]"
          >
            <Skeleton className="w-full h-full" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <ApiErrorState
        message={
          error instanceof Error
            ? error.message
            : "Erreur lors du chargement des albums"
        }
        onRetry={() => refetch()}
      />
    );
  }

  if (!albums || albums.length === 0) {
    return <EmptyAlbums />;
  }

  return (
    <div className="flex flex-col gap-10">
      {filteredAlbums.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-background rounded-[3rem] border border-dashed border-border">
          <Camera className="w-12 h-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground font-medium">
            Aucun album ne correspond à vos critères.
          </p>
        </div>
      ) : (
        <div
          className={cn(
            "grid gap-8",
            viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1",
          )}
        >
          <AnimatePresence mode="popLayout">
            {filteredAlbums.map((album, index) => (
              <AlbumCard
                key={album.id}
                album={album}
                index={index}
                className={
                  viewMode === "list" ? "flex flex-row aspect-auto" : ""
                }
              />
            ))}
          </AnimatePresence>

          {/* Quick Add Card */}
          {viewMode === "grid" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="md:col-span-1"
            >
              <Link
                to="/albums/new"
                className="flex flex-col items-center justify-center h-full min-h-[300px] rounded-md border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 transition-all group bg-background/50"
              >
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-4 shadow-xl shadow-primary/20 group-hover:scale-110 transition-transform">
                  <Plus className="w-8 h-8 text-white" />
                </div>
                <span className="font-black text-sm uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">
                  Nouvel Album
                </span>
              </Link>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default AlbumsGrid;
