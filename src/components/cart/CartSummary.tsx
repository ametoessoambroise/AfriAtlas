import { formatPrice } from "@/stores/cartStore";
import { ArrowRight, Ticket } from "lucide-react";

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
    <div className="bg-card rounded-3xl border border-border p-6 shadow-sm sticky top-24">
      <h3 className="text-xl font-bold mb-6">Récapitulatif</h3>
      
      <div className="space-y-4 mb-8">
        <div className="flex justify-between text-muted-foreground font-medium">
          <span>Sous-total</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground font-medium">
          <span>TVA (18%)</span>
          <span>{formatPrice(tva)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground font-medium">
           <span>Livraison</span>
           <span className="text-xs italic uppercase">Calculée au checkout</span>
        </div>
        
        <div className="pt-4 border-t border-border mt-4">
          <div className="flex justify-between items-end">
            <span className="text-lg font-bold">Total TTC</span>
            <div className="text-right">
              <span className="block text-2xl font-black text-primary leading-none">
                {formatPrice(total)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
         <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">
            Code Promo
         </label>
         <div className="flex gap-2">
            <div className="relative flex-1">
              <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="ATLAS2026"
                className="w-full bg-surface-alt border border-border/60 rounded-xl py-2 pl-9 pr-4 text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <button className="bg-surface-alt hover:bg-border/40 px-4 rounded-xl text-sm font-bold transition-colors">
               Appliquer
            </button>
         </div>
      </div>

      <button
        onClick={onCheckout}
        disabled={isLoading || subtotal === 0}
        className="w-full btn-primary py-4 flex items-center justify-center gap-2 font-black transition-transform active:scale-95 disabled:opacity-50"
      >
        <span>Passer la commande</span>
        <ArrowRight className="w-5 h-5" />
      </button>
      
      <p className="mt-4 text-[10px] text-center text-muted-foreground leading-relaxed">
        En commandant, vous acceptez nos conditions générales de vente et notre politique de confidentialité.
      </p>
    </div>
  );
}
