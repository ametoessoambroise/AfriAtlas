import { motion } from "framer-motion";
import DestinationCard from "@/components/cards/DestinationCard";
import AdNativeCard from "@/components/ads/AdNativeCard";
import type { Destination } from "@/lib/models/ui";
import type { AdvertisementListResponse } from "@/lib/types";
import {
  ApiErrorState,
  DestinationGridSkeleton,
  EmptyState,
} from "@/components/feedback/ApiQueryState";
import { AtlasPagination } from "@/components/shared/AtlasPagination";

interface DestinationGridProps {
  destinations: Destination[];
  ads?: AdvertisementListResponse[];
  isLoading: boolean;
  isError: boolean;
  error?: Error | null;
  onRetry: () => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function DestinationGrid({
  destinations,
  ads = [],
  isLoading,
  isError,
  error,
  onRetry,
  currentPage,
  onPageChange,
  totalPages,
}: DestinationGridProps) {
  if (isLoading) {
    return <DestinationGridSkeleton count={9} className="mt-8" />;
  }

  if (isError) {
    return (
      <div className="mt-8">
        <ApiErrorState
          message={error?.message || "Impossible de charger les destinations"}
          onRetry={onRetry}
        />
      </div>
    );
  }

  if (destinations.length === 0) {
    return (
      <div className="mt-8">
        <EmptyState
          title="Aucun résultat trouvé"
          description="Essayez de modifier vos filtres ou de chercher autre chose."
        />
      </div>
    );
  }

  // ─── Injection logic ──────────────────────────────────────────────────────────
  // On injecte une publicité tous les 4 items.
  const AD_FREQUENCY = 4;
  const itemsWithAds: Array<
    | { type: "destination"; data: Destination }
    | { type: "ad"; data: AdvertisementListResponse }
  > = [];

  destinations.forEach((d, index) => {
    itemsWithAds.push({ type: "destination", data: d });

    // Si on a assez d'items et qu'on a encore des pubs dispos
    const adIndex = Math.floor((index + 1) / AD_FREQUENCY) - 1;
    if ((index + 1) % AD_FREQUENCY === 0 && ads[adIndex]) {
      itemsWithAds.push({ type: "ad", data: ads[adIndex] });
    }
  });

  return (
    <div className="mt-8 flex flex-col gap-10">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {itemsWithAds.map((item, idx) => {
          const isAd = item.type === "ad";
          return (
            <motion.div
              key={item.data.id + "-" + idx}
              variants={fadeUp}
              className={isAd ? "sm:col-span-2 lg:col-span-2" : ""}
            >
              {item.type === "destination" ? (
                <DestinationCard destination={item.data} />
              ) : (
                <AdNativeCard ad={item.data} />
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {totalPages > 1 && (
        <AtlasPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          className="mt-8"
        />
      )}
    </div>
  );
}
