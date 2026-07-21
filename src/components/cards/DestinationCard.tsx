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
        boxShadow: "0 25px 50px -14px rgba(0, 51, 102, 0.18)",
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={`/destinations/${destination.slug}`}
        className="group bg-card rounded-[26px] border border-border/60 overflow-hidden block transition-all duration-300 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.14)]"
      >
        <div className="relative h-72 overflow-hidden">
          <LazyImage
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

          <span className="absolute top-4 left-4 px-3 py-1 bg-white/12 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
            {typeLabels[destination.type]}
          </span>

          <button
            onClick={handleToggleFavorite}
            disabled={isPending}
            className={cn(
              "absolute top-4 right-4 h-10 w-10 flex items-center justify-center rounded-full backdrop-blur-md border transition-all duration-300",
              destination.isFavorite
                ? "bg-red-500 border-red-500 text-white shadow-lg shadow-red-500/30 scale-110"
                : "bg-white/12 border-white/20 text-white hover:bg-white/25 hover:scale-110",
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
        <div className="p-5 bg-card relative z-10 transition-transform duration-500 ease-out group-hover:-translate-y-1">
          <div className="mb-3 flex items-start justify-between gap-3">
            <h3 className="text-[1.55rem] font-semibold text-foreground leading-tight transition-colors group-hover:text-primary">
              {destination.name}
            </h3>
            <div className="flex items-center gap-1 rounded-full bg-secondary/15 px-2.5 py-1.5 text-xs font-bold text-foreground shadow-sm shrink-0">
              <Star className="h-3.5 w-3.5 fill-secondary text-secondary" />
              <span>{destination.rating}</span>
            </div>
          </div>

          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-muted-foreground mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(var(--secondary),0.8)]" />
            {destination.city} · {destination.category}
          </p>

          <div className="overflow-hidden">
            <p className="pb-4 text-sm leading-relaxed text-muted-foreground line-clamp-3 min-h-[3.6rem]">
              {destination.description}
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-border/60 pt-4">
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
