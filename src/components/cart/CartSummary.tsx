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
    <div className="bg-card rounded-md border border-border/60 p-8 shadow-xl shadow-foreground/5 sticky top-24 overflow-hidden group">
      {/* Background Decor */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />

      <h3 className="text-2xl font-black mb-8 tracking-tight">Récapitulatif<span className="text-primary">.</span></h3>
      
      <div className="space-y-5 mb-10">
        <div className="flex justify-between text-muted-foreground font-semibold text-sm">
          <span>Sous-total</span>
          <span className="text-foreground">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground font-semibold text-sm">
          <span>TVA (18%)</span>
          <span className="text-foreground">{formatPrice(tva)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground font-semibold text-sm">
           <span>Livraison</span>
           <span className="text-[10px] bg-muted px-2 py-0.5 rounded uppercase font-black">Calculée ensuite</span>
        </div>
        
        <div className="pt-6 border-t border-border/60 mt-6">
          <div className="flex justify-between items-end">
            <span className="text-lg font-black tracking-tight">Total TTC</span>
            <div className="text-right">
              <span className="block text-3xl font-black text-primary leading-none tracking-tighter">
                {formatPrice(total)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
         <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-3 block">
            Code Privilège
         </label>
         <div className="flex gap-2">
            <div className="relative flex-1">
              <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
              <input 
                type="text" 
                placeholder="ATLAS2026"
                className="w-full bg-surface-alt border border-border/40 rounded-md py-3.5 pl-10 pr-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-inner"
              />
            </div>
            <button className="bg-foreground text-background hover:bg-foreground/90 px-5 rounded-md text-xs font-black uppercase tracking-widest transition-all active:scale-95">
               Ok
            </button>
         </div>
      </div>

      <button
        onClick={onCheckout}
        disabled={isLoading || subtotal === 0}
        className="w-full btn-primary py-5 rounded-md flex items-center justify-center gap-3 font-black text-base shadow-2xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            <span>Confirmer la commande</span>
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>
      
      <div className="mt-8 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 text-muted-foreground opacity-60">
           <ShieldCheck className="w-4 h-4" />
           <span className="text-[10px] font-bold uppercase tracking-widest">Paiement 100% Sécurisé</span>
        </div>
        <p className="text-[10px] text-center text-muted-foreground leading-relaxed font-medium px-4">
          En confirmant, vous acceptez nos <span className="underline cursor-pointer">CGV</span> et notre politique de confidentialité.
        </p>
      </div>
    </div>
  );
}
