import { Minus, Plus, Trash2 } from "lucide-react";
import { formatPrice } from "@/stores/cartStore";
import type { CartItemDetailResponse } from "@/lib/types/cart";

interface CartItemListProps {
  items: CartItemDetailResponse[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  isUpdating?: boolean;
}

export default function CartItemList({
  items,
  onUpdateQuantity,
  onRemove,
  isUpdating = false,
}: CartItemListProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.id}
          className={`flex items-center gap-4 p-4 bg-card rounded-2xl border border-border transition-opacity ${
            isUpdating ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <img
            src={item.product_image_url || "/images/places/placeholder-place.jpg"}
            alt={item.product_name}
            className="w-20 h-20 rounded-xl object-cover shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg truncate">{item.product_name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {item.product_description}
            </p>
            <p className="mt-1 text-primary font-black">
              {formatPrice(Number(item.unit_price))}
            </p>
          </div>
          
          <div className="flex flex-col items-end gap-3">
             <div className="flex items-center gap-3 bg-surface-alt p-1 rounded-full border border-border">
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-background transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-bold w-4 text-center">{item.quantity}</span>
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  disabled={item.quantity >= item.stock_available}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-background transition-colors disabled:opacity-30"
                >
                  <Plus className="w-4 h-4" />
                </button>
             </div>
             
             <button
               onClick={() => onRemove(item.id)}
               className="text-destructive hover:text-destructive/80 transition-colors p-1"
             >
               <Trash2 className="w-5 h-5" />
             </button>
          </div>
        </div>
      ))}
    </div>
  );
}
