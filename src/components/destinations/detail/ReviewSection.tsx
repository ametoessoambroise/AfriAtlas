import { motion, AnimatePresence } from "framer-motion";
import { Star, MessageSquare, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ReviewForm } from "@/components/shared/ReviewForm";
import {
  useDestinationReviews,
  useDestinationReviewsSummary,
} from "@/hooks/queries/useReviews";
import { SectionError } from "@/components/dashboard/SectionError";

interface ReviewSectionProps {
  slug: string;
  destinationId?: string;
}

export default function ReviewSection({
  slug,
  destinationId,
}: ReviewSectionProps) {
  const [showForm, setShowForm] = useState(false);

  // Fetch reviews data from API
  const {
    data: reviewsData,
    isLoading,
    isError,
    error,
    refetch,
  } = useDestinationReviews(slug);
  const { data: summary } = useDestinationReviewsSummary(slug);

  const reviews = reviewsData?.items || [];
  const totalReviews = reviewsData?.total || 0;

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-heading font-semibold text-foreground">
            Avis des voyageurs
          </h2>
          {summary && summary.total_reviews > 0 && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-secondary text-secondary" />
                <span className="text-lg font-bold text-foreground">
                  {summary.average_rating.toFixed(1)}
                </span>
              </div>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">
                {summary.total_reviews} avis au total
              </span>
            </div>
          )}
          <p className="text-muted-foreground">
            Découvrez les retours d'expérience de notre communauté.
          </p>
        </div>

        {!showForm && (
          <Button
            onClick={() => setShowForm(true)}
            className="rounded-md bg-primary hover:bg-primary/90 font-bold"
          >
            <Plus className="h-4 w-4 mr-2" />
            Laisser un avis
          </Button>
        )}
      </div>

      {showForm && destinationId && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <ReviewForm
            destinationId={destinationId}
            onSuccess={() => {
              setShowForm(false);
              refetch();
            }}
          />
          <Button
            variant="outline"
            onClick={() => setShowForm(false)}
            className="mt-4"
          >
            Annuler
          </Button>
        </motion.div>
      )}

      <div className="space-y-6">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-32 w-full rounded-md bg-muted" />
            <Skeleton className="h-32 w-full rounded-md bg-muted" />
          </div>
        ) : isError ? (
          <SectionError
            message={error?.message || "Erreur lors du chargement des avis"}
            onRetry={() => refetch()}
          />
        ) : reviews.length === 0 ? (
          <>
            <div className="flex flex-col items-center justify-center p-12 bg-muted/30 rounded-md border border-border text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <MessageSquare className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">Aucun avis pour le moment</p>
            </div>
          </>
        ) : (
          <div className="space-y-6">
            <div className="grid gap-4">
              {reviews.map((r) => (
                <motion.div
                  key={r.id}
                  className="p-4 rounded-md border border-border bg-card shadow-sm"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold text-foreground uppercase">
                        {r.user.avatar_url ? (
                          <img
                            src={r.user.avatar_url}
                            alt=""
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          r.user.fullname.charAt(0)
                        )}
                      </div>
                      <div>
                        <div className="font-heading font-semibold text-foreground">
                          {r.user.fullname}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {new Date(r.created_at).toLocaleDateString("fr-FR", {
                            month: "long",
                            year: "numeric",
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-secondary text-secondary" />
                      <span className="text-sm font-bold text-foreground">
                        {r.rating}
                      </span>
                    </div>
                  </div>
                  {r.comment && (
                    <p className="text-muted-foreground leading-relaxed">
                      {r.comment}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>

            {totalReviews > reviews.length && (
              <div className="pt-6 text-center">
                <button className="text-primary font-bold hover:underline">
                  Voir les {totalReviews - reviews.length} autres avis
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
