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
    <div className="overflow-hidden rounded-[24px] border border-border bg-card shadow-sm">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between p-6 transition-colors hover:bg-surface-alt"
      >
        <div className="flex flex-col items-start">
          <h3 className="text-xl font-black">Votre commande</h3>
          <p className="text-sm text-muted-foreground">{items.length} article(s)</p>
        </div>
        {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </button>

      {isExpanded && (
        <div className="space-y-4 px-6 pb-6 duration-300 animate-in fade-in slide-in-from-top-2">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between gap-4 text-sm font-medium">
              <div className="flex gap-3">
                <span className="text-muted-foreground">x{item.quantity}</span>
                <span className="max-w-[150px] truncate">{item.product_name}</span>
              </div>
              <span>{formatPrice(Number(item.unit_price) * item.quantity)}</span>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-3 border-t border-border bg-surface-alt p-6">
        <div className="flex justify-between text-sm font-medium text-muted-foreground">
          <span>Sous-total</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm font-medium text-muted-foreground">
          <span>TVA (18%)</span>
          <span>{formatPrice(tva)}</span>
        </div>
        <div className="flex justify-between text-sm font-medium text-muted-foreground">
          <span>Frais de livraison</span>
          <span className={deliveryFee === 0 ? "text-green-600" : "text-foreground"}>
            {deliveryFee === 0 ? "Gratuit" : formatPrice(deliveryFee)}
          </span>
        </div>

        <div className="mt-4 flex items-baseline justify-between border-t border-border pt-4">
          <span className="text-lg font-bold">Total</span>
          <div className="text-right">
            <span className="block text-2xl font-black leading-none text-primary">
              {formatPrice(total)}
            </span>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Paiement sécurisé via Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
