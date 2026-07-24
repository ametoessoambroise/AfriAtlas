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
  searchQuery?: string;
  statusFilter?: string;
  dateFilter?: string;
  viewMode?: "grid" | "list";
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const AlbumsGrid = ({
  searchQuery = "",
  statusFilter = "all",
  dateFilter = "all",
  viewMode = "grid",
}: AlbumsGridProps = {}) => {
  const { data: albums, isLoading, isError, error, refetch } = useAlbums();

  const filteredAlbums = useMemo(() => {
    if (!albums) return [];

    const query = (searchQuery ?? "").toLowerCase();

    return albums.filter((album) => {
      const title = album?.title ?? "";
      const matchesSearch = title.toLowerCase().includes(query);
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "public" && album.is_public) ||
        (statusFilter === "private" && !album.is_public);

      const albumDate = album?.created_at ? new Date(album.created_at) : null;
      const matchesDate =
        dateFilter === "all" ||
        (albumDate &&
          !isNaN(albumDate.getTime()) &&
          albumDate.getFullYear().toString() === dateFilter);

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [albums, searchQuery, statusFilter, dateFilter]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="aspect-[4/5] rounded-[2rem] overflow-hidden">
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
        <motion.div variants={fadeUp}>
          <Link
            to="/albums/new"
            className="flex flex-col items-center justify-center aspect-[4/5] rounded-[2rem] border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
          >
            <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center mb-4 border border-border group-hover:scale-110 transition-transform">
              <Plus className="w-8 h-8 text-primary" />
            </div>
            <span className="font-black text-sm uppercase tracking-widest text-muted-foreground group-hover:text-primary">Nouvel Album</span>
          </Link>
        </motion.div>
      </div>
      )}
    </div>
  );
};

export default AlbumsGrid;
