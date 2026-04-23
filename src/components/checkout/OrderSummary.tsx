import { formatPrice } from "@/stores/cartStore";
import type { CartItemDetailResponse } from "@/lib/types/cart";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface OrderSummaryProps {
  items: CartItemDetailResponse[];
  subtotal: number;
  deliveryFee: number;
}

export default function OrderSummary({
  items,
  subtotal,
  deliveryFee,
}: OrderSummaryProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const tva = subtotal * 0.18;
  const total = subtotal + tva + deliveryFee;

  return (
    <div className="bg-card rounded-3xl border border-border overflow-hidden shadow-sm">
      <button 
         onClick={() => setIsExpanded(!isExpanded)}
         className="w-full flex items-center justify-between p-6 hover:bg-surface-alt transition-colors"
      >
        <div className="flex flex-col items-start">
           <h3 className="text-xl font-bold">Votre commande</h3>
           <p className="text-sm text-muted-foreground">{items.length} article(s)</p>
        </div>
        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>

      {isExpanded && (
        <div className="px-6 pb-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between gap-4 text-sm font-medium">
              <div className="flex gap-3">
                 <span className="text-muted-foreground">x{item.quantity}</span>
                 <span className="truncate max-w-[150px]">{item.product_name}</span>
              </div>
              <span>{formatPrice(Number(item.unit_price) * item.quantity)}</span>
            </div>
          ))}
        </div>
      )}

      <div className="bg-surface-alt p-6 space-y-3 border-t border-border">
        <div className="flex justify-between text-sm text-muted-foreground font-medium">
          <span>Sous-total</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm text-muted-foreground font-medium">
          <span>TVA (18%)</span>
          <span>{formatPrice(tva)}</span>
        </div>
        <div className="flex justify-between text-sm text-muted-foreground font-medium">
          <span>Frais de livraison</span>
          <span className={deliveryFee === 0 ? "text-green-600" : "text-foreground"}>
            {deliveryFee === 0 ? "Gratuit" : formatPrice(deliveryFee)}
          </span>
        </div>
        
        <div className="pt-4 border-t border-border mt-4 flex justify-between items-baseline">
          <span className="text-lg font-bold">Total</span>
          <div className="text-right">
             <span className="text-2xl font-black text-primary block leading-none">
                {formatPrice(total)}
             </span>
             <p className="text-[10px] text-muted-foreground mt-1 uppercase font-bold tracking-tighter">
                Paiement sécurisé via Stripe
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
