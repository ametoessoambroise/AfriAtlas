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
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2.5 rounded-md">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Avis des voyageurs
            </h2>
          </div>
          <p className="text-muted-foreground">
            Découvrez les retours d'expérience de notre communauté.
          </p>
        </div>

        <Button
          onClick={() => setShowForm(!showForm)}
          className="rounded-md font-bold bg-primary px-8 py-6 h-auto shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
        >
          {showForm ? (
            <X className="h-5 w-5 mr-2" />
          ) : (
            <Plus className="h-5 w-5 mr-2" />
          )}
          {showForm ? "Annuler" : "Laisser un avis"}
        </Button>
      </div>

      <div className="grid gap-12 lg:grid-cols-3">
        {/* Rating Summary Card */}
        <div className="lg:col-span-1 space-y-8">
          <div className="rounded-md border border-border bg-surface-alt p-8 space-y-6">
            <div className="text-center space-y-2">
              <p className="text-5xl font-black text-primary">4.9</p>
              <div className="flex justify-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                Basé sur 128 avis vérifiés
              </p>
            </div>

            <Separator className="bg-border/50" />

            <div className="space-y-3">
              {ratingDistribution.map((dist) => (
                <div key={dist.stars} className="flex items-center gap-4">
                  <div className="flex items-center gap-1 w-8">
                    <span className="text-xs font-bold">{dist.stars}</span>
                    <Star className="h-3 w-3 fill-slate-400 text-slate-400" />
                  </div>
                  <div className="flex-grow h-2 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${dist.percentage}%` }}
                      viewport={{ once: true }}
                      className="h-full bg-primary"
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-8 text-right">
                    {dist.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-md bg-primary/20 border border-primary">
            <p className="text-sm text-primary leading-relaxed font-medium">
              "100% des voyageurs recommandent cette destination pour son
              authenticité et la qualité de l'accueil."
            </p>
          </div>
          <div className="">
            <img src="/joystick.png" alt="casque" className="w-full h-full object-cover rounded-md" />
          </div>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-8 rounded-md border-2 border-dashed border-primary/20 bg-primary/5 mb-10"
              >
                <div className="text-center space-y-4">
                  <p className="text-lg font-bold">Partagez votre aventure</p>
                  <p className="text-sm text-muted-foreground">
                    La fonctionnalité de dépôt d'avis est en cours de
                    déploiement.
                  </p>
                  <Button
                    variant="outline"
                    className="rounded-md"
                    onClick={() => setShowForm(false)}
                  >
                    Fermer
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-6">
            {hardcodedReviews.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-md border border-border bg-card shadow-sm hover:shadow-md transition-shadow space-y-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-md overflow-hidden bg-muted border border-border">
                      <img
                        src={review.user.avatar_url}
                        alt={review.user.fullname}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">
                        {review.user.fullname}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {review.user.location} •{" "}
                        {new Date(review.created_at).toLocaleDateString(
                          "fr-FR",
                          { month: "long", year: "numeric" },
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-primary/10 px-3 py-1.5 rounded-md border border-primary/10">
                    <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                    <span className="text-sm font-black text-primary">
                      {review.rating.toFixed(1)}
                    </span>
                  </div>
                </div>

                <p className="text-slate-600 leading-relaxed italic">
                  "{review.comment}"
                </p>

                <div className="flex items-center gap-4 pt-2">
                  <button className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary transition-colors">
                    <ThumbsUp className="h-4 w-4" />
                    Utile ({review.likes})
                  </button>
                  <button className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors">
                    Signaler
                  </button>
                </div>
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
