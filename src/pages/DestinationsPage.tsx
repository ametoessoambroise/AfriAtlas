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

  const quickHighlights = [
    {
      title: "Sélection premium",
      copy: "Des lieux testés pour une expérience plus fluide, plus belle et plus sûre.",
    },
    {
      title: "Planifiez vite",
      copy: "Trouvez rapidement les meilleures adresses par ville, catégorie ou proximité.",
    },
    {
      title: "Expérience locale",
      copy: "Passez du simple repérage à une vraie inspiration de voyage, pensée pour le Togo.",
    },
  ];

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
      <section className="relative overflow-hidden pt-24 pb-16 min-h-[560px] flex flex-col justify-end">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://media.istockphoto.com/id/1176896935/fr/photo/lom%C3%A9-togo-place-de-lind%C3%A9pendance-le-centre-du-pays-palais-de-congr%C3%A9s-en-haut-%C3%A0-droite-et.jpg?s=612x612&w=0&k=20&c=rriow9DOqVoMdSIFSeSoWbKvpAY5lCfm66DSSj34csc=')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20" />
        </div>

        <div className="container relative z-10 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-[11px] font-bold tracking-[0.2em] text-white uppercase rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              Découvrez le meilleur du Togo
            </span>
            <h1 className="text-[clamp(2.6rem,5.5vw+1rem,4.5rem)] font-heading font-semibold italic text-white mb-5 leading-[1.06]">
              Toutes les
              <br />
              <span className="text-secondary">destinations</span>
            </h1>
            <p className="max-w-2xl text-white/90 text-base md:text-lg font-body leading-relaxed">
              Explorez les lieux les plus marquants du Togo : hôtels, attractions,
              restaurants et expériences à vivre sans détour.
            </p>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-3 max-w-4xl">
            {[
              { label: "Hôtels premium", value: "120+" },
              { label: "Places à vivre", value: "45" },
              { label: "Expériences locales", value: "24h" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md px-4 py-3.5 text-white shadow-lg shadow-black/10"
              >
                <div className="text-2xl font-bold text-secondary">{item.value}</div>
                <div className="text-xs uppercase tracking-[0.2em] text-white/80 mt-1">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          <div className="w-full max-w-4xl mt-8">
            <CategoryFilters />
          </div>
        </div>
      </section>

      <section className="sticky top-0 z-30 border-b border-border/70 bg-background/90 py-4 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.18)] backdrop-blur-md">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          <div className="w-full rounded-2xl border border-border/70 bg-card/85 px-3 py-3 shadow-sm">
            <CityFilters />
          </div>
        </div>
      </section>

      <section className="py-8 md:py-10 bg-background">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-3">
            {quickHighlights.map((item) => (
              <div
                key={item.title}
                className="rounded-[24px] border border-border/70 bg-card p-5 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-22px_rgba(0,0,0,0.28)]"
              >
                <div className="mb-3 h-2 w-12 rounded-full bg-secondary" />
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-5">
            <div>
              <span className="inline-flex items-center rounded-full bg-primary/5 px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-primary border border-primary/10">
                Explorer les meilleures adresses
              </span>
              <h2 className="mt-4 text-[clamp(2rem,4vw+1rem,3rem)] font-heading font-semibold italic text-foreground">
                Destinations populaires
              </h2>
              <div className="h-1 w-20 bg-secondary mt-3 rounded-full" />
              <p className="text-muted-foreground mt-4 text-lg font-body leading-relaxed max-w-2xl">
                Des lieux d'exception sélectionnés pour vous, pensés pour rendre chaque séjour plus simple, plus beau et plus mémorable.
              </p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-card px-4 py-3 shadow-sm">
              <div className="text-xs font-black uppercase tracking-[0.22em] text-muted-foreground">
                Résultats
              </div>
              <div className="mt-1 text-2xl font-bold text-foreground">
                {list.data?.total || 0}
              </div>
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
