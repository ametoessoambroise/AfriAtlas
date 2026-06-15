import { Loader2, Lock } from "lucide-react";
import type { SubscriptionPlanResponse } from "@/lib/types";

// Note: ce composant n'est plus sticky — le CTA est intégré directement
// dans VrBookingPage en bas du formulaire pour ne pas conflicter avec la BottomNavBar.
// Ce fichier est conservé pour compatibilité si réutilisé ailleurs.

interface VrBookingStickyFooterProps {
  selectedPlan?: SubscriptionPlanResponse;
  numParticipants: number;
  isBooking: boolean;
  onSubmit: () => void;
}

export function VrBookingStickyFooter({
  selectedPlan,
  numParticipants,
  isBooking,
  onSubmit,
}: VrBookingStickyFooterProps) {
  return (
    <div className="rounded-2xl border border-border bg-background p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div>
        <p className="text-xs text-muted-foreground">
          Total à régler aujourd'hui
        </p>
        <p className="text-2xl font-bold text-foreground mt-0.5">
          {selectedPlan && numParticipants
            ? `${selectedPlan.price_monthly * numParticipants} €`
            : "— €"}
        </p>
      </div>

      <button
        onClick={onSubmit}
        disabled={isBooking}
        className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl px-8 py-3.5 transition-all active:scale-[0.98] disabled:opacity-60"
      >
        {isBooking ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Lock className="h-4 w-4" />
        )}
        Réserver mon expérience
      </button>
    </div>
  );
}
