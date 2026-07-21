import { formatPrice } from "@/stores/cartStore";
import { ArrowRight, Ticket, Loader2, ShieldCheck } from "lucide-react";

interface CartSummaryProps {
  subtotal: number;
  onCheckout: () => void;
  isLoading?: boolean;
}

export default function CartSummary({
  subtotal,
  onCheckout,
  isLoading = false,
}: CartSummaryProps) {
  const tva = subtotal * 0.18; // 18% TVA au Togo
  const total = subtotal + tva;

  return (
    <div className="group sticky top-24 overflow-hidden rounded-[24px] border border-border/60 bg-card p-8 shadow-sm">
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/5 blur-3xl transition-colors group-hover:bg-primary/10" />

      <h3 className="mb-8 text-2xl font-black tracking-tight">Récapitulatif<span className="text-primary">.</span></h3>

      <div className="mb-10 space-y-5">
        <div className="flex justify-between text-sm font-semibold text-muted-foreground">
          <span>Sous-total</span>
          <span className="text-foreground">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm font-semibold text-muted-foreground">
          <span>TVA (18%)</span>
          <span className="text-foreground">{formatPrice(tva)}</span>
        </div>
        <div className="flex justify-between text-sm font-semibold text-muted-foreground">
          <span>Livraison</span>
          <span className="rounded bg-muted px-2 py-0.5 text-[10px] font-black uppercase">Calculée ensuite</span>
        </div>

        <div className="mt-6 border-t border-border/60 pt-6">
          <div className="flex items-end justify-between">
            <span className="text-lg font-black tracking-tight">Total TTC</span>
            <div className="text-right">
              <span className="block text-3xl font-black leading-none tracking-tighter text-primary">
                {formatPrice(total)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <label className="mb-3 block text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
          Code Privilège
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Ticket className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
            <input
              type="text"
              placeholder="ATLAS2026"
              className="w-full rounded-xl border border-border/40 bg-surface-alt py-3.5 pl-10 pr-4 text-sm font-bold shadow-inner transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <button className="rounded-xl bg-foreground px-5 text-xs font-black uppercase tracking-[0.2em] text-background transition-all hover:bg-foreground/90 active:scale-95">
            Ok
          </button>
        </div>
      </div>

      <button
        onClick={onCheckout}
        disabled={isLoading || subtotal === 0}
        className="flex w-full items-center justify-center gap-3 rounded-xl bg-primary py-5 text-base font-black text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <>
            <span>Confirmer la commande</span>
            <ArrowRight className="h-5 w-5" />
          </>
        )}
      </button>

      <div className="mt-8 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 text-muted-foreground opacity-60">
          <ShieldCheck className="h-4 w-4" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Paiement 100% Sécurisé</span>
        </div>
        <p className="px-4 text-center text-[10px] font-medium leading-relaxed text-muted-foreground">
          En confirmant, vous acceptez nos <span className="cursor-pointer underline">CGV</span> et notre politique de confidentialité.
        </p>
      </div>
    </div>
  );
}
