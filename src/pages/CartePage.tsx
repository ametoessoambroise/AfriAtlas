import { useState, useMemo, useCallback } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import { usePlaces } from "@/hooks/queries/usePlaces";
import { mapPlaceListToDestination } from "@/lib/mappers/placeMapper";
import type { Destination } from "@/lib/models/ui";
import { ApiErrorState } from "@/components/feedback/ApiQueryState";
import { getErrorMessage } from "@/lib/utils/errorMessages";

// Map Components
import InteractiveMap from "@/components/map/InteractiveMap";
import ClusterLayer from "@/components/map/ClusterLayer";
import PlaceMarker from "@/components/map/PlaceMarker";
import MapFilters from "@/components/map/MapFilters";
import UserLocationDot from "@/components/map/UserLocationDot";

const CartePage = () => {
  // L'objectif 5 : Appeler la map en chargeant un max de lieux pour clusteriser
  const list = usePlaces({ page_size: 100 });
  const destinations = useMemo(
    () => (list.data?.items ?? []).map(mapPlaceListToDestination),
    [list.data?.items],
  );

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  // Génération dynamique des catégories à partir des données
  const categories = useMemo(() => {
    return [...new Set(destinations.map((d) => d.category))].filter(
      Boolean,
    ) as string[];
  }, [destinations]);

  const explorerHighlights = [
    {
      title: "Découverte instantanée",
      copy: "Visualisez les lieux du Togo, filtrez par catégorie et passez d’un repérage à une vraie inspiration de voyage.",
    },
    {
      title: "Navigation fluide",
      copy: "La carte devient un moteur de décision : vous cherchez, vous zoommez, vous sélectionnez et vous partez explorer.",
    },
    {
      title: "Parcours premium",
      copy: "Un écran pensé pour rester simple à lire mais riche dans l’expérience, comme un moteur de découverte moderne.",
    },
  ];

  // Filtrage combiné (Recherche + Catégorie)
  const filteredDestinations = useMemo(() => {
    return destinations.filter((d) => {
      const matchSearch =
        !search ||
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.city.toLowerCase().includes(search.toLowerCase());
      const matchCategory =
        !selectedCategory || d.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [destinations, search, selectedCategory]);

  const handleSelect = useCallback((slug: string) => {
    setSelectedSlug(slug);
  }, []);

  if (list.isError) {
    return (
      <PageWrapper>
        <div className="container py-12 flex items-center justify-center min-h-[calc(100vh-72px)]">
          <ApiErrorState
            message={getErrorMessage(list.error)}
            onRetry={() => list.refetch()}
          />
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <section className="relative pt-24 pb-6">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <span className="inline-flex items-center rounded-full bg-primary/5 px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-primary border border-primary/10">
                Explorer le Togo
              </span>
              <h1 className="mt-4 text-[clamp(2.3rem,4vw+1rem,4rem)] font-heading font-semibold italic text-foreground leading-[1.05]">
                Trouvez les lieux qui donnent envie de voyager.
              </h1>
              <p className="mt-4 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
                Recherchez par destination, filtrez par catégorie et naviguez
                visuellement sur la carte pour découvrir les meilleurs lieux du
                pays.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[420px]">
              {[
                { label: "Lieux visibles", value: `${destinations.length}` },
                { label: "Catégories", value: `${categories.length}` },
                { label: "Résultats actifs", value: `${filteredDestinations.length}` },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-[22px] border border-border/70 bg-card px-4 py-3.5 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.2)]"
                >
                  <div className="text-2xl font-bold text-foreground">{item.value}</div>
                  <div className="mt-1 text-[11px] font-black uppercase tracking-[0.24em] text-muted-foreground">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-4">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            {explorerHighlights.map((item) => (
              <div
                key={item.title}
                className="rounded-[24px] border border-border/70 bg-card p-5 shadow-[0_12px_32px_-22px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-22px_rgba(0,0,0,0.28)]"
              >
                <div className="mb-3 h-1.5 w-12 rounded-full bg-secondary" />
                <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-8">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className="relative overflow-hidden rounded-[30px] border border-border/70 bg-card shadow-[0_20px_60px_-30px_rgba(0,0,0,0.24)]"
            style={{ height: "calc(100vh - 200px)" }}
          >
            <div className="absolute left-4 top-4 z-[1000] rounded-2xl border border-white/20 bg-black/20 px-3 py-2 text-white backdrop-blur-md">
              <div className="text-[11px] font-black uppercase tracking-[0.24em] text-white/70">
                Carte interactive
              </div>
              <div className="text-sm font-semibold">
                {filteredDestinations.length} lieux visibles sur le Togo
              </div>
            </div>

            <InteractiveMap>
              <MapFilters
                search={search}
                setSearch={setSearch}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                categories={categories}
                destinations={filteredDestinations}
                onSelect={handleSelect}
              />

              <ClusterLayer>
                {filteredDestinations.map((d: Destination) => (
                  <PlaceMarker
                    key={d.id}
                    destination={d}
                    isSelected={selectedSlug === d.slug}
                    onClick={handleSelect}
                  />
                ))}
              </ClusterLayer>

              <UserLocationDot />
            </InteractiveMap>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default CartePage;
