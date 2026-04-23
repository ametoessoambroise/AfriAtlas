import { motion } from "framer-motion";
import { Star, MessageSquare, Filter, Plus } from "lucide-react";
import { useDestinationReviews, useDestinationReviewsSummary } from "@/hooks/queries/useReviews";
import { ApiErrorState } from "@/components/feedback/ApiQueryState";
import { Skeleton } from "@/components/ui/skeleton";
import { ReviewForm } from "@/components/shared/ReviewForm";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AtlasPagination } from "@/components/shared/AtlasPagination";

export default function ReviewSection({ placeId }: { placeId: string }) {
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuth();
  
  // Correction migration UUID : l'ID est déjà une string, pas besoin de parseInt
  const destinationId = placeId; 
  const { data: paginatedReviews, isLoading, isError, error, refetch } = useDestinationReviews(destinationId, page);
  const { data: summary } = useDestinationReviewsSummary(destinationId);

  const reviews = paginatedReviews?.items || [];

  return (
    <div className="space-y-12 mt-12 pt-10 border-t border-white/5">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-extrabold tracking-tight text-black">Avis des voyageurs</h2>
          {summary && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="text-lg font-bold text-white">{summary.average_rating.toFixed(1)}</span>
              </div>
              <span className="text-zinc-500">•</span>
              <span className="text-zinc-400">{summary.total_reviews} avis au total</span>
            </div>
          )}
        </div>

        {!showForm && (
          <Button 
            onClick={() => setShowForm(true)}
            className="rounded-full bg-primary hover:bg-primary/90 font-bold"
          >
            <Plus className="h-4 w-4 mr-2" />
            Laisser un avis
          </Button>
        )}
      </div>
      
      {showForm && (
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
            variant="ghost" 
            onClick={() => setShowForm(false)}
            className="mt-4 text-zinc-500 hover:text-white"
          >
            Annuler
          </Button>
        </motion.div>
      )}

      <div className="space-y-6">
        {isLoading ? (
          <div className="space-y-4">
             <Skeleton className="h-32 w-full rounded-2xl bg-white/5" />
             <Skeleton className="h-32 w-full rounded-2xl bg-white/5" />
          </div>
        ) : isError ? (
          <ApiErrorState message={error?.message || "Erreur lors du chargement des avis"} onRetry={() => refetch()} />
        ) : reviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 bg-zinc-900/20 rounded-3xl border border-dashed border-white/10 text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <MessageSquare className="h-8 w-8 text-zinc-600" />
            </div>
            <p className="font-bold text-white text-lg">Aucun avis pour le moment</p>
            <p className="text-zinc-500 mt-1 max-w-xs">
              Partagez votre expérience et soyez le premier à évaluer ce lieu !
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid gap-4">
              {reviews.map((r) => (
                <motion.div 
                   key={r.id} 
                  className="p-6 rounded-2xl border border-white/5 bg-zinc-900/40 backdrop-blur-sm shadow-xl"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-primary uppercase">
                        {r.user.avatar_url ? (
                           <img src={r.user.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
                        ) : (
                          r.user.fullname.charAt(0)
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-white">{r.user.fullname}</div>
                        <div className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mt-0.5">
                          {new Date(r.created_at).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                        </div>
                      </div>
                    </div>
                    <div className="bg-amber-400/10 text-amber-400 px-2 py-1 rounded-lg flex items-center gap-1.5">
                      <Star className="h-3.5 w-3.5 fill-amber-400" />
                      <span className="text-sm font-black">{r.rating}</span>
                    </div>
                  </div>
                  {r.comment && (
                    <p className="text-zinc-300 leading-relaxed italic border-l-2 border-white/10 pl-4 py-1">
                      "{r.comment}"
                    </p>
                  )}
                </motion.div>
              ))}
            </div>

            {paginatedReviews && paginatedReviews.pages > 1 && (
              <div className="pt-6">
                <AtlasPagination
                  currentPage={page}
                  totalPages={paginatedReviews.pages}
                  onPageChange={setPage}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
