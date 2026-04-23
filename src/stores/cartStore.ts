import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product, MenuItem } from "@/lib/models/ui";

interface CartStore {
  items: CartItem[];
  addItem: (item: Product | MenuItem, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
  count: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item, quantity = 1) => {
        const existing = get().items.find((i) => i.item.id === item.id);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.item.id === item.id
                ? { ...i, quantity: i.quantity + quantity }
                : i,
            ),
          });
        } else {
          set({ items: [...get().items, { item, quantity }] });
        }
      },
      removeItem: (id) =>
        set({ items: get().items.filter((i) => i.item.id !== id) }),
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          set({ items: get().items.filter((i) => i.item.id !== id) });
        } else {
          set({
            items: get().items.map((i) =>
              i.item.id === id ? { ...i, quantity } : i,
            ),
          });
        }
      },
      clearCart: () => set({ items: [] }),
      total: () =>
        get().items.reduce((sum, i) => sum + i.item.price * i.quantity, 0),
      count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: "worldatlas-cart" },
  ),
);

export const formatPrice = (price: number): string => {
  return price.toLocaleString("fr-FR") + " FCFA";
};
