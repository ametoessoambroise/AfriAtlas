import React, { useState } from "react";
import { Star, Send, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useReviewMutations } from "@/hooks/queries/useReviews";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ReviewFormProps {
  destinationId: string; // Mis à jour en string (UUID)
  onSuccess?: () => void;
  className?: string;
}

export function ReviewForm({ destinationId, onSuccess, className }: ReviewFormProps) {
  const { user } = useAuth();
  const { createReview } = useReviewMutations();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Veuillez vous connecter pour laisser un avis");
      return;
    }

    if (rating === 0) {
      toast.error("Veuillez sélectionner une note");
      return;
    }

    try {
      await createReview.mutateAsync({
        rating,
        comment: comment.trim() || undefined,
        destination_id: destinationId 
      });
      
      toast.success("Votre avis a été publié !");
      setRating(0);
      setComment("");
      onSuccess?.();
    } catch (error) {
      toast.error("Impossible de publier l'avis");
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={cn("p-6 rounded-2xl bg-zinc-900/40 border border-white/5", className)}
    >
      <h3 className="text-lg font-bold text-white mb-4">Laissez un avis</h3>
      
      <div className="flex items-center gap-2 mb-6">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            onClick={() => setRating(star)}
            className="transition-transform hover:scale-110 active:scale-95"
          >
            <Star
              className={cn(
                "h-8 w-8 transition-colors",
                star <= (hoveredRating || rating)
                  ? "fill-amber-400 text-amber-400"
                  : "text-zinc-700"
              )}
            />
          </button>
        ))}
        <span className="ml-2 text-sm text-white/40 font-medium">
          {rating > 0 ? `${rating} / 5` : "Sélectionner une note"}
        </span>
      </div>

      <div className="space-y-4">
        <Textarea
          placeholder="Partagez votre expérience (optionnel)..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="bg-zinc-950/50 border-white/10 text-white min-h-[120px] rounded-xl focus:ring-primary/20 placeholder:text-white/20"
        />
        
        <Button
          type="submit"
          disabled={createReview.isPending}
          className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-6 font-bold"
        >
          {createReview.isPending ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              Publier mon avis
              <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
