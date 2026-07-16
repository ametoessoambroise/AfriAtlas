import { Minus, Plus, Trash2, Loader2 } from "lucide-react";
import { formatPrice } from "@/stores/cartStore";
import type { CartItemDetailResponse } from "@/lib/types/cart";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface CartItemListProps {
  items: CartItemDetailResponse[];
  onUpdateQuantity: (id: string, quantity: number) => Promise<void>;
  onRemove: (id: string) => Promise<void>;
  isUpdating?: boolean;
}

export default function CartItemList({
  items,
  onUpdateQuantity,
  onRemove,
  isUpdating = false,
}: CartItemListProps) {
  const [busyItemId, setBusyItemId] = useState<string | null>(null);

  const handleUpdate = async (id: string, q: number) => {
    setBusyItemId(id);
    try {
      await onUpdateQuantity(id, q);
    } finally {
      setBusyItemId(null);
    }
  };

  const handleRemove = async (id: string) => {
    setBusyItemId(id);
    try {
      await onRemove(id);
    } finally {
      setBusyItemId(null);
    }
  };

  return (
    <div className="space-y-6">
      <AnimatePresence mode="popLayout">
        {items.map((item, index) => (
          <motion.div
            layout
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: index * 0.05 }}
            className={`group relative flex flex-col md:flex-row items-center gap-6 p-6 bg-card rounded-md border border-border/60 hover:border-primary/20 transition-all hover:shadow-xl hover:shadow-primary/5 ${
              (isUpdating && busyItemId === item.id) ? "opacity-70" : ""
            }`}
          >
            {/* Image Section */}
            <div className="relative shrink-0 w-full md:w-32 h-32">
              <img
                src={item.product_image_url || "/images/places/placeholder-place.jpg"}
                alt={item.product_name}
                className="w-full h-full rounded-md object-cover shadow-sm group-hover:scale-105 transition-transform duration-500"
              />
              {!item.is_available && (
                <div className="absolute inset-0 bg-destructive/10 backdrop-blur-[2px] rounded-md flex items-center justify-center">
                  <span className="bg-destructive text-white text-[10px] font-black px-2 py-1 rounded-lg shadow-lg">ÉPUISÉ</span>
                </div>
              )}
              {busyItemId === item.id && (
                <div className="absolute inset-0 bg-background/40 backdrop-blur-[1px] rounded-md flex items-center justify-center">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              )}
            </div>

            {/* Info Section */}
            <div className="flex-1 min-w-0 text-center md:text-left">
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1 block opacity-60">
                Article Sélectionné
              </span>
              <h3 className="font-black text-2xl truncate mb-1 tracking-tight group-hover:text-primary transition-colors">
                {item.product_name}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-1 font-medium mb-3">
                {item.product_description}
              </p>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <p className="text-xl font-black text-foreground">
                  {formatPrice(Number(item.unit_price))}
                </p>
                <span className="text-xs text-muted-foreground font-bold">/ unité</span>
              </div>
            </div>
            
            {/* Actions Section */}
            <div className="flex flex-row md:flex-col items-center gap-4 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-border/40">
               <div className="flex items-center gap-4 bg-muted/40 p-1.5 rounded-md border border-border/50 shadow-inner">
                  <button
                    disabled={isUpdating || busyItemId === item.id}
                    onClick={() => handleUpdate(item.id, item.quantity - 1)}
                    className="w-10 h-10 rounded-md flex items-center justify-center bg-card hover:bg-primary hover:text-primary-foreground transition-all shadow-sm disabled:opacity-50 active:scale-90"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-black text-lg w-8 text-center tabular-nums">
                    {item.quantity}
                  </span>
                  <button
                    disabled={isUpdating || busyItemId === item.id || item.quantity >= item.stock_available}
                    onClick={() => handleUpdate(item.id, item.quantity + 1)}
                    className="w-10 h-10 rounded-md flex items-center justify-center bg-primary text-primary-foreground hover:scale-105 transition-all shadow-lg shadow-primary/10 disabled:opacity-50 active:scale-90"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
               </div>
               
               <button
                 disabled={isUpdating || busyItemId === item.id}
                 onClick={() => handleRemove(item.id)}
                 className="flex items-center gap-2 text-muted-foreground hover:text-destructive transition-all p-2 font-bold text-xs uppercase tracking-widest disabled:opacity-50"
               >
                 <Trash2 className="w-4 h-4" />
                 <span className="hidden md:inline">Retirer</span>
               </button>
            </div>

            {/* Total Badge Mobile-friendly */}
            <div className="absolute top-4 right-4 md:relative md:top-0 md:right-0 bg-primary/5 px-3 py-1.5 rounded-full border border-primary/10 md:hidden">
                <span className="text-primary font-black text-xs">{formatPrice(Number(item.unit_price) * item.quantity)}</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
