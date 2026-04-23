import { Link } from "react-router-dom";
import { Star, Heart, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import type { Destination } from "@/lib/models/ui";
import { useFavoriteMutations } from "@/hooks/queries/useFavorites";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { LazyImage } from "@/components/ui/lazy-image";
import { cn } from "@/lib/utils";

const typeLabels: Record<string, string> = {
  city: "Ville",
  hotel: "Hôtel",
  restaurant: "Restaurant",
  supermarket: "Supermarché",
  attraction: "Attraction",
  museum: "Musée",
  park: "Parc",
  zoo: "Zoo",
  stadium: "Stade",
  university: "Université",
};

const DestinationCard = ({
  destination,
  onRemoveFavorite,
}: {
  destination: Destination;
  onRemoveFavorite?: () => void;
}) => {
  const { user } = useAuth();
  const { addFavorite, removeFavorite } = useFavoriteMutations();
  const isPending = addFavorite.isPending || removeFavorite.isPending;

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error("Veuillez vous connecter pour ajouter des favoris");
      return;
    }

    try {
      if (destination.isFavorite) {
        await removeFavorite.mutateAsync(destination.id);
        toast.success("Retiré des favoris");
        onRemoveFavorite?.();
      } else {
        await addFavorite.mutateAsync(destination.id);
        toast.success("Ajouté aux favoris", {
          description:
            "Vous pouvez maintenant retrouver cette destination dans votre profil.",
        });
      }
    } catch (error: any) {
      toast.error(error.friendlyMessage || "Une erreur est survenue");
    }
  };

  return (
    <motion.div
      whileHover={{
        y: -8,
        boxShadow: "0 25px 50px -12px rgba(0, 51, 102, 0.15)",
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={`/destinations/${destination.slug}`}
        className="group bg-card rounded-2xl border border-border/50 overflow-hidden block transition-all duration-300"
      >
        <div className="relative h-72 overflow-hidden">
          <LazyImage
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Subtle gradient to ensure badges are readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

          <span className="absolute top-4 left-4 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
            {typeLabels[destination.type]}
          </span>

          <button
            onClick={handleToggleFavorite}
            disabled={isPending}
            className={cn(
              "absolute top-4 right-4 h-10 w-10 flex items-center justify-center rounded-full backdrop-blur-md border transition-all duration-300",
              destination.isFavorite
                ? "bg-red-500 border-red-500 text-white shadow-lg shadow-red-500/30 scale-110"
                : "bg-white/10 border-white/20 text-white hover:bg-white/30 hover:scale-110",
            )}
            aria-label={
              destination.isFavorite
                ? "Retirer des favoris"
                : "Ajouter aux favoris"
            }
          >
            {isPending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Heart
                className={cn(
                  "h-5 w-5",
                  destination.isFavorite && "fill-current",
                )}
              />
            )}
          </button>
        </div>
        <div className="p-6 bg-card relative z-10 transition-transform duration-500 ease-out group-hover:-translate-y-2">
          <div className="flex items-start justify-between mb-3 gap-2">
            <h3 className="font-heading font-bold text-2xl text-foreground group-hover:text-primary transition-colors leading-tight">
              {destination.name}
            </h3>
            <div className="flex items-center gap-1 bg-secondary/10 px-2 py-1.5 rounded-lg border border-secondary/20 backdrop-blur-sm shadow-sm">
              <Star className="w-3.5 h-3.5 fill-secondary text-secondary" />
              <span className="text-xs font-bold text-secondary">
                {destination.rating}
              </span>
            </div>
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(var(--secondary),0.8)]" />
            {destination.city} · {destination.category}
          </p>

          <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
            <div className="overflow-hidden">
              <p className="text-sm text-muted-foreground line-clamp-3 font-body leading-relaxed pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                {destination.description}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-border/50 flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
              <span className="font-bold text-foreground">
                {destination.reviewsCount ?? 0}
              </span>{" "}
              avis
            </span>
            <span className="text-xs font-bold text-primary inline-flex items-center gap-1 relative overflow-hidden">
              <span className="transform transition-transform duration-300 group-hover:-translate-x-1">
                Voir les détails
              </span>
              <span className="absolute right-0 opacity-0 transform translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                →
              </span>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default DestinationCard;
