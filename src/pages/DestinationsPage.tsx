import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import PageWrapper from "@/components/layout/PageWrapper";
import { usePlaces } from "@/hooks/queries/usePlaces";
import { usePublicAds } from "@/hooks/queries/useAds";

import { mapPlaceListToDestination } from "@/lib/mappers/placeMapper";

import {
  CategoryFilters,
  CityFilters,
} from "@/components/destinations/FilterPanel";
import { SortType } from "@/components/destinations/SortSelect";
import DestinationGrid from "@/components/destinations/DestinationGrid";
import type { DestinationUiType } from "@/lib/models/ui";

const ITEMS_PER_PAGE = 9;

const DestinationsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read State from URL
  const search = (searchParams.get("search") || "").toLowerCase();
  const city = searchParams.get("city") || "Toutes";
  const category = (searchParams.get("category") || "all") as
    | "all"
    | DestinationUiType;
  const sort = (searchParams.get("sort") || "popular") as SortType;
  const page = parseInt(searchParams.get("page") || "1", 10);
  const lat = searchParams.get("lat")
    ? parseFloat(searchParams.get("lat")!)
    : undefined;
  const lon = searchParams.get("lon")
    ? parseFloat(searchParams.get("lon")!)
    : undefined;

  // Fetch with actual parameters
  const list = usePlaces({
    page,
    page_size: ITEMS_PER_PAGE,
    city: city === "Toutes" ? undefined : city,
    category: category === "all" ? undefined : category,
    query: search || undefined,
    sort_by: sort,
    ...(sort === "distance" && lat !== undefined && lon !== undefined
      ? { lat, lon }
      : {}),
  });

  const ads = usePublicAds({ per_page: 5 });

  const destinations = useMemo(() => {
    return (list.data?.items ?? []).map(mapPlaceListToDestination);
  }, [list.data?.items]);

  const totalPages = list.data?.total_pages || 1;

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", String(newPage));
      return next;
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <PageWrapper>
      {/* ── HERO SECTION AVEC BACKGROUND ── */}
      <section className="relative pt-24 pb-16 min-h-[500px] flex flex-col justify-end">
        {/* Background Image (unsplash placeholder pour simuler le coucher de soleil) */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://media.istockphoto.com/id/1176896935/fr/photo/lom%C3%A9-togo-place-de-lind%C3%A9pendance-le-centre-du-pays-palais-de-congr%C3%A9s-en-haut-%C3%A0-droite-et.jpg?s=612x612&w=0&k=20&c=rriow9DOqVoMdSIFSeSoWbKvpAY5lCfm66DSSj34csc=')",
          }}
        >
          {/* Dégradé assombrissant pour rendre le texte lisible */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        </div>

        <div className="container relative z-10 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] text-white uppercase rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              Découvrez le meilleur du Togo
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-5xl font-heading font-bold text-white mb-6 leading-[1.1]">
              Toutes les
              <br />
              <span className="text-secondary">destinations</span>
            </h1>
            <p className="max-w-xl text-white/90 text-lg font-body leading-relaxed">
              Explorez les merveilles du Togo grâce à nos filtres détaillés.
              Trouvez l'hôtel de vos rêves ou l'activité parfaite pour votre
              prochaine aventure.
            </p>
          </motion.div>

          <div className="w-full max-w-4xl mt-8">
            {/* Pilules de catégories avec Glassmorphism */}
            <CategoryFilters />
          </div>
        </div>
      </section>

      {/* ── BARRE DE FILTRES VILLES ET TRI (Glassmorphism Sticky) ── */}
      <section className="sticky top-0 bg-background/80 backdrop-blur-lg border-b border-border/40 py-5 shadow-sm z-30">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          <div className="w-full">
            <CityFilters />
          </div>
        </div>
      </section>

      {/* ── GRILLE DE RESULTATS ── */}
      <section className="py-20 bg-background">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                Destinations populaires
              </h2>
              <div className="h-1 w-20 bg-secondary mt-3 rounded-full" />
              <p className="text-muted-foreground mt-4 text-lg font-body">
                Des lieux d'exception sélectionnés pour vous
              </p>
            </div>
            <div className="text-sm font-medium text-muted-foreground bg-muted/30 px-4 py-2 rounded-full border border-border/50">
              {list.data?.total || 0} destinations trouvées
            </div>
          </div>
          <DestinationGrid
            destinations={destinations}
            ads={ads.data?.items}
            isLoading={list.isLoading}
            isError={list.isError}
            error={list.error}
            onRetry={() => list.refetch()}
            currentPage={page}
            onPageChange={handlePageChange}
            totalPages={totalPages}
          />
        </div>
      </section>
    </PageWrapper>
  );
};

export default DestinationsPage;
