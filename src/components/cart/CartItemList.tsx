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
            className={`group relative flex flex-col items-center gap-6 rounded-[24px] border border-border/60 bg-card p-6 transition-all hover:border-primary/20 hover:shadow-sm md:flex-row ${
              isUpdating && busyItemId === item.id ? "opacity-70" : ""
            }`}
          >
            <div className="relative h-32 w-full shrink-0 md:w-32">
              <img
                src={item.product_image_url || "/images/places/placeholder-place.jpg"}
                alt={item.product_name}
                className="h-full w-full rounded-[18px] object-cover shadow-sm transition-transform duration-500 group-hover:scale-105"
              />
              {!item.is_available && (
                <div className="absolute inset-0 flex items-center justify-center rounded-[18px] bg-destructive/10 backdrop-blur-[2px]">
                  <span className="rounded-lg bg-destructive px-2 py-1 text-[10px] font-black text-white shadow-lg">ÉPUISÉ</span>
                </div>
              )}
              {busyItemId === item.id && (
                <div className="absolute inset-0 flex items-center justify-center rounded-[18px] bg-background/40 backdrop-blur-[1px]">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1 text-center md:text-left">
              <span className="mb-1 block text-[10px] font-black uppercase tracking-[0.2em] text-primary opacity-60">
                Article Sélectionné
              </span>
              <h3 className="mb-1 truncate text-2xl font-black tracking-tight transition-colors group-hover:text-primary">
                {item.product_name}
              </h3>
              <p className="mb-3 line-clamp-1 text-sm font-medium text-muted-foreground">
                {item.product_description}
              </p>
              <div className="flex items-center justify-center gap-3 md:justify-start">
                <p className="text-xl font-black text-foreground">{formatPrice(Number(item.unit_price))}</p>
                <span className="text-xs font-bold text-muted-foreground">/ unité</span>
              </div>
            </div>

            <div className="flex w-full flex-row items-center gap-4 border-t border-border/40 pt-4 md:w-auto md:flex-col md:border-t-0 md:pt-0">
              <div className="flex items-center gap-4 rounded-xl border border-border/50 bg-muted/40 p-1.5 shadow-inner">
                <button
                  disabled={isUpdating || busyItemId === item.id}
                  onClick={() => handleUpdate(item.id, item.quantity - 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-card text-foreground shadow-sm transition-all hover:bg-primary hover:text-primary-foreground active:scale-90 disabled:opacity-50"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center text-lg font-black tabular-nums">{item.quantity}</span>
                <button
                  disabled={isUpdating || busyItemId === item.id || item.quantity >= item.stock_available}
                  onClick={() => handleUpdate(item.id, item.quantity + 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/10 transition-all hover:scale-105 active:scale-90 disabled:opacity-50"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button
                disabled={isUpdating || busyItemId === item.id}
                onClick={() => handleRemove(item.id)}
                className="flex items-center gap-2 p-2 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground transition-all hover:text-destructive disabled:opacity-50"
              >
                <Trash2 className="h-4 w-4" />
                <span className="hidden md:inline">Retirer</span>
              </button>
            </div>

            <div className="absolute right-4 top-4 rounded-full border border-primary/10 bg-primary/5 px-3 py-1.5 md:hidden">
              <span className="text-xs font-black text-primary">{formatPrice(Number(item.unit_price) * item.quantity)}</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
