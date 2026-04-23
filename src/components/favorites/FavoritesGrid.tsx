import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFavorites } from '@/hooks/queries/useFavorites';
import DestinationCard from '@/components/cards/DestinationCard';
import { mapDestinationResponseToUi } from '@/lib/mappers/destinationMapper';
import EmptyFavorites from './EmptyFavorites';
import { DestinationGridSkeleton, ApiErrorState } from '@/components/feedback/ApiQueryState';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const FavoritesGrid = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error, refetch } = useFavorites({ page, per_page: 9 });

  if (isLoading) {
    return <DestinationGridSkeleton count={6} className="mt-8" />;
  }

  if (isError) {
    return (
      <div className="mt-8">
        <ApiErrorState
          message={error instanceof Error ? error.message : "Erreur lors du chargement des favoris"}
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  const favorites = data?.items.map(mapDestinationResponseToUi) || [];
  const totalPages = data?.total_pages || 1;

  if (favorites.length === 0) {
    return <div className="mt-8"><EmptyFavorites /></div>;
  }

  return (
    <div className="mt-8 flex flex-col gap-10">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {favorites.map((d) => (
            <motion.div
              key={d.id}
              variants={fadeUp}
              layout
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <DestinationCard
                destination={d}
                onRemoveFavorite={() => refetch()}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {totalPages > 1 && (
        <Pagination className="mx-auto w-full max-w-md">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (page > 1) setPage(page - 1);
                }}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            <PaginationItem>
              <span className="text-sm font-medium px-4 text-muted-foreground">
                Page {page} sur {totalPages}
              </span>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (page < totalPages) setPage(page + 1);
                }}
                className={page === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default FavoritesGrid;
