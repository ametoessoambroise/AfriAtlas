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
    return [...new Set(destinations.map((d) => d.category))].filter(Boolean) as string[];
  }, [destinations]);

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
      <div className="relative w-full mt-20" style={{ height: "calc(100vh - 120px)" }}>
        {/* Full Screen Map avec Restriction sur le Togo */}
        <InteractiveMap>
          
          {/* Composant de filtre flottant par dessus la carte */}
          <MapFilters
            search={search}
            setSearch={setSearch}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
            destinations={filteredDestinations}
            onSelect={handleSelect}
          />

          {/* Cluster regroupant les points */}
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

          {/* Point utilisateur (demande GPS Custom) */}
          <UserLocationDot />
          
        </InteractiveMap>
      </div>
    </PageWrapper>
  );
};

export default CartePage;
