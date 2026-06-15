import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import PageWrapper from "@/components/layout/PageWrapper";
import { ApiErrorState } from "@/components/feedback/ApiQueryState";
import { DestinationDetailSkeleton } from "@/components/feedback/DestinationDetailSkeleton";
import { usePlace } from "@/hooks/queries/usePlaces";
import { useVrSessions } from "@/hooks/queries/useVrSessions";
import { mapPlaceResponseToDestination } from "@/lib/mappers/placeMapper";
import { inferHasCatalog } from "@/lib/catalog";
import { getErrorMessage, is404 } from "@/lib/utils/errorMessages";

// Extracted Moduler Components
import PlaceHero from "@/components/destinations/detail/PlaceHero";
import PlaceInfoPanel from "@/components/destinations/detail/PlaceInfoPanel";
import PlaceDescription from "@/components/destinations/detail/PlaceDescription";
import ReviewSection from "@/components/destinations/detail/ReviewSection";
import SimilarPlaces from "@/components/destinations/detail/SimilarPlaces";
import CommonPlaceButtons from "@/components/destinations/detail/CommonPlaceButtons";
import AnalyticsTracker from "@/components/destinations/detail/AnalyticsTracker";
import PlaceSubNav from "@/components/destinations/detail/PlaceSubNav";
import PlaceOverview from "@/components/destinations/detail/PlaceOverview";
import PlaceClimateSection from "@/components/destinations/detail/PlaceClimateSection";
import PlaceActivitiesGrid from "@/components/destinations/detail/PlaceActivitiesGrid";
import PlaceProductsPreview from "@/components/destinations/detail/PlaceProductsPreview";
import PlaceFooterBanners from "@/components/destinations/detail/PlaceFooterBanners";

const DestinationDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const placeQuery = usePlace(slug);

  // Fetch sessions for this destination
  const { data: localSessions = [] } = useVrSessions(slug || "");
  // Fallback: fetch all sessions to get a 'real' ID for the demo if local is empty
  const { data: allSessions = [] } = useVrSessions();

  const firstSessionId =
    localSessions.length > 0
      ? localSessions[0].id
      : allSessions.length > 0
        ? allSessions[0].id
        : "00000000-0000-0000-0000-000000000000";

  const dest = useMemo(() => {
    if (!placeQuery.data) return undefined;
    return mapPlaceResponseToDestination(placeQuery.data);
  }, [placeQuery.data]);

  if (!slug) {
    return (
      <PageWrapper>
        <div className="container py-20 text-center">
          <Link to="/destinations" className="btn-primary cursor-pointer">
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
              <p className="mb-4 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                Lieu introuvable
              </p>
              <p className="mb-8 max-w-md text-muted-foreground leading-relaxed">
                Ce lieu n&apos;existe pas ou a peut-être été archivé par son
                propriétaire.
              </p>
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

      {/* Section Hero avec le Diaporama Image & Weather Widget */}
      <div className="relative">
        <div className="absolute top-6 left-6 z-30">
          <Link
            to="/destinations"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-black/20 backdrop-blur-md px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-black/40 shadow-sm border border-white/10"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Toutes les destinations
          </Link>
        </div>
        <PlaceHero destination={dest} />
      </div>

      {/* Barre de Navigation Secondaire (SubNav) */}
      <PlaceSubNav
        destination={dest}
        showCatalog={showCatalog}
        sessionId={firstSessionId}
      />

      <div className="container py-12 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl space-y-24">
        {/* Section Aperçu (Histoire, Culture, etc.) - Sur une seule ligne responsive */}
        <section id="aperçu">
          <PlaceOverview destination={dest} />
        </section>

        {/* Section Climat & Période - Sur une seule ligne responsive */}
        <section id="climat">
          <PlaceClimateSection destination={dest} />
        </section>

        {/* Section Activités - Activités et Tableau sur la même ligne responsive */}
        <section id="activités">
          <PlaceActivitiesGrid destination={dest} />
        </section>

        {/* Section Gastronomie (si applicable) */}
        {dest.type === "restaurant" && (
          <section id="gastronomie">
            <PlaceProductsPreview destination={dest} />
          </section>
        )}

        {/* Section Galerie */}
        <section id="galerie">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-extrabold tracking-tight">
              Galerie photos
            </h2>
            <button className="text-primary font-bold text-sm hover:underline">
              Voir tout
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {dest.gallery.map((img, i) => (
              <div
                key={i}
                className={`aspect-square rounded-xl overflow-hidden bg-muted group ${
                  i === 0 ? "md:col-span-2 md:row-span-2 aspect-auto" : ""
                }`}
              >
                <img
                  src={img}
                  alt={`Vue ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Section Avis */}
        <section id="avis">
          <ReviewSection placeId={dest.id} slug={dest.slug} />
        </section>

        {/* Section Lieux similaires branchée par Catégorie */}
        <div className="pt-12">
          <SimilarPlaces
            currentSlug={dest.slug}
            category={placeQuery.data?.category}
          />
        </div>

        {/* Bannières de Fin (VR avec bouton de redirection et Réservation) */}
        <PlaceFooterBanners destination={dest} sessionId={firstSessionId} />
      </div>
    </PageWrapper>
  );
};

export default DestinationDetail;
