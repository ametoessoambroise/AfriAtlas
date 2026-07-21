import { motion, AnimatePresence } from "framer-motion";
import { Star, MessageSquare, Plus, X, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AdPromoCard from "@/components/ads/AdPromoCard";

interface ReviewSectionProps {
  placeId: string;
  slug: string;
}

export default function ReviewSection({ placeId, slug }: ReviewSectionProps) {
  const [showForm, setShowForm] = useState(false);

  // Hardcoded reviews data
  // // TODO: Replace with API data when ready
  const hardcodedReviews = [
    {
      id: "1",
      user: {
        fullname: "Jean-Baptiste Kouamé",
        avatar_url: "https://i.pravatar.cc/150?u=jb",
        location: "Lomé, Togo",
      },
      rating: 5,
      created_at: "2024-03-15T10:00:00Z",
      comment:
        "Une expérience absolument époustouflante. Les chutes d'eau sont majestueuses et le guide local connaissait parfaitement l'histoire du site. Un incontournable pour tout visiteur au Togo.",
      likes: 24,
    },
    {
      id: "2",
      user: {
        fullname: "Marie-Claire Dubois",
        avatar_url: "https://i.pravatar.cc/150?u=mc",
        location: "Paris, France",
      },
      rating: 4,
      created_at: "2024-02-28T14:30:00Z",
      comment:
        "Magnifique lieu ! La marche pour y accéder est un peu physique mais en vaut largement la peine. Prévoyez de bonnes chaussures et beaucoup d'eau. La vue est imprenable.",
      likes: 12,
    },
    {
      id: "3",
      user: {
        fullname: "Samuel Mensah",
        avatar_url: "https://i.pravatar.cc/150?u=sm",
        location: "Accra, Ghana",
      },
      rating: 5,
      created_at: "2024-01-10T09:15:00Z",
      comment:
        "J'y retourne chaque année. C'est le poumon vert du Togo. Le climat y est frais et ressourçant. La gastronomie locale aux alentours est aussi un grand plus.",
      likes: 31,
    },
  ];

  const ratingDistribution = [
    { stars: 5, count: 85, percentage: 85 },
    { stars: 4, count: 12, percentage: 12 },
    { stars: 3, count: 2, percentage: 2 },
    { stars: 2, count: 1, percentage: 1 },
    { stars: 1, count: 0, percentage: 0 },
  ];

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
            Avis des voyageurs
          </h2>
          {summary && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="text-lg font-bold text-foreground">
                  {summary.average_rating.toFixed(1)}
                </span>
              </div>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">
                {summary.total_reviews} avis au total
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Avis des voyageurs
            </h2>
          </div>
          <p className="text-muted-foreground">
            Découvrez les retours d'expérience de notre communauté.
          </p>
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
          <ApiErrorState
            message={error?.message || "Erreur lors du chargement des avis"}
            onRetry={() => refetch()}
          />
        ) : reviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 bg-zinc-900/20 rounded-3xl border border-dashed border-white/10 text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <MessageSquare className="h-8 w-8 text-zinc-600" />
            </div>
          </div>

          <div className="p-6 rounded-md bg-primary/20 border border-primary">
            <p className="text-sm text-primary leading-relaxed font-medium">
              "100% des voyageurs recommandent cette destination pour son
              authenticité et la qualité de l'accueil."
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
                        <div className="font-bold text-white">
                          {r.user.fullname}
                        </div>
                        <div className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mt-0.5">
                          {new Date(r.created_at).toLocaleDateString("fr-FR", {
                            month: "long",
                            year: "numeric",
                          })}
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

          <div className="pt-6 text-center">
            <button className="text-primary font-bold hover:underline">
              Voir les 125 autres avis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
