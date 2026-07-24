import React from "react";
import { Heart, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useFavoriteMutations } from "@/hooks/queries/useFavorites";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  destinationId: string;
  isFavorite: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  onToggleSuccess?: (isFavorite: boolean) => void;
}

export function FavoriteButton({
  destinationId,
  isFavorite,
  className,
  size = "md",
  onToggleSuccess,
}: FavoriteButtonProps) {
  const { user } = useAuth();
  const { addFavorite, removeFavorite } = useFavoriteMutations();
  const isPending = addFavorite.isPending || removeFavorite.isPending;

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error("Veuillez vous connecter pour ajouter des favoris");
      return;
    }

    try {
      if (isFavorite) {
        await removeFavorite.mutateAsync(destinationId);
        toast.success("Retiré des favoris");
        onToggleSuccess?.(false);
      } else {
        await addFavorite.mutateAsync(destinationId);
        toast.success("Ajouté aux favoris !");
        onToggleSuccess?.(true);
      }
    } catch (error) {
      toast.error("Une erreur est survenue");
    }
  };

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={handleToggle}
      disabled={isPending}
      className={cn(
        "flex items-center justify-center rounded-full transition-all backdrop-blur-md border",
        isFavorite
          ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
          : "bg-white/10 border-white/20 text-white hover:bg-white/20",
        sizeClasses[size],
        className
      )}
    >
      <AnimatePresence mode="wait">
        {isPending ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Loader2 className={cn("animate-spin", iconSizes[size])} />
          </motion.div>
        ) : (
          <motion.div
            key="icon"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Heart
              className={cn(iconSizes[size], isFavorite && "fill-current")}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
