import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import PageWrapper from "@/components/layout/PageWrapper";
import { ApiErrorState } from "@/components/feedback/ApiQueryState";
import { DestinationDetailSkeleton } from "@/components/feedback/DestinationDetailSkeleton";
import { usePlace } from "@/hooks/queries/usePlaces";
import { mapPlaceResponseToDestination } from "@/lib/mappers/placeMapper";
import { inferHasCatalog } from "@/lib/catalog";
import { getErrorMessage, is404 } from "@/lib/utils/errorMessages";

// Extracted Moduler Components
import PlaceHero from "@/components/destinations/detail/PlaceHero";
import PlaceInfoPanel from "@/components/destinations/detail/PlaceInfoPanel";
import PlaceDescription from "@/components/destinations/detail/PlaceDescription";
import ReviewSection from "@/components/destinations/detail/ReviewSection";
import SimilarPlaces from "@/components/destinations/detail/SimilarPlaces";
import VrSessionCalendar from "@/components/destinations/detail/VrSessionCalendar";
import CommonPlaceButtons from "@/components/destinations/detail/CommonPlaceButtons";
import AnalyticsTracker from "@/components/destinations/detail/AnalyticsTracker";

const DestinationDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const placeQuery = usePlace(slug);

  const dest = useMemo(() => {
    if (!placeQuery.data) return undefined;
    return mapPlaceResponseToDestination(placeQuery.data);
  }, [placeQuery.data]);

  if (!slug) {
    return (
      <PageWrapper>
        <div className="container py-20 text-center">
          <Link to="/destinations" className="btn-primary">
            Retour
          </Link>
        </div>
      </PageWrapper>
    );
  }

  if (placeQuery.isLoading) return <DestinationDetailSkeleton />;

  if (placeQuery.isError || !placeQuery.data) {
    return (
      <PageWrapper>
        <div className="container py-16">
          {is404(placeQuery.error) ? (
            <div className="flex flex-col items-center text-center justify-center min-h-[40vh]">
              <p className="mb-4 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">Lieu introuvable</p>
              <p className="mb-8 max-w-md text-muted-foreground leading-relaxed">Ce lieu n&apos;existe pas ou a peut-être été archivé par son propriétaire.</p>
              <Link to="/destinations" className="btn-primary">
                Explorer d'autres destinations
              </Link>
            </div>
          ) : (
            <ApiErrorState
              message={getErrorMessage(placeQuery.error)}
              onRetry={() => placeQuery.refetch()}
            />
          )}
        </div>
      </PageWrapper>
    );
  }

  if (!dest) return null;

  const showCatalog = inferHasCatalog(placeQuery.data);

  return (
    <PageWrapper>
      {/* Tracker Silencieux */}
      <AnalyticsTracker placeId={dest.id} />

      {/* Section Hero avec le Diaporama Image*/}
      <div className="relative">
        {/* Navigation Flottante Mobile & Desktop (Z-index high pour passer par dessus l'image) */}
        <div className="absolute top-6 left-6 z-30">
           <Link
             to="/destinations"
             className="inline-flex items-center justify-center gap-2 rounded-full bg-black/30 backdrop-blur-md px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-black/50 shadow-sm border border-white/10"
           >
             <ArrowLeft className="h-4 w-4" aria-hidden />
             Retour
           </Link>
        </div>
        <PlaceHero destination={dest} />
      </div>

      <div className="container py-12 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        {/* Grille principale : 2/3 Description, 1/3 Infos pratiques */}
        <div className="grid gap-10 lg:grid-cols-3">
          
          <div className="lg:col-span-2 space-y-12">
            <PlaceDescription destination={dest} />
            <VrSessionCalendar slug={dest.slug} />
            <ReviewSection placeId={dest.id} />
          </div>

          <div className="space-y-6">
            <CommonPlaceButtons destination={dest} />
            <PlaceInfoPanel destination={dest} />

            {showCatalog ? (
              <Link
                to={`/destinations/${slug}/catalog`}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition-transform active:scale-95 hover:bg-indigo-700"
              >
                <ShoppingBag className="h-5 w-5" aria-hidden />
                Voir le Catalogue Produits
              </Link>
            ) : null}
          </div>
        </div>

        {/* Section Lieux similaires branchée par Catégorie */}
        <SimilarPlaces currentSlug={dest.slug} category={placeQuery.data?.category} />
      </div>
    </PageWrapper>
  );
};

export default DestinationDetail;
