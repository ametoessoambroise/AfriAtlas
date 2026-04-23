import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAlbums } from '@/hooks/queries/useAlbums';
import AlbumCard from './AlbumCard';
import EmptyAlbums from './EmptyAlbums';
import { ApiErrorState } from '@/components/feedback/ApiQueryState';
import { Skeleton } from '@/components/ui/skeleton';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const AlbumsGrid = () => {
  const { data: albums, isLoading, isError, error, refetch } = useAlbums();

  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
        message={error instanceof Error ? error.message : "Erreur lors du chargement des albums"}
        onRetry={() => refetch()}
      />
    );
  }

  if (!albums || albums.length === 0) {
    return <EmptyAlbums />;
  }

  return (
    <div className="flex flex-col gap-10">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {albums.map((album) => (
          <motion.div key={album.id} variants={fadeUp}>
            <AlbumCard album={album} />
          </motion.div>
        ))}

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
      </motion.div>
    </div>
  );
};

export default AlbumsGrid;
