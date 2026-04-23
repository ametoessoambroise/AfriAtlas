import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import MenuItemCard from "@/components/cards/MenuItemCard";
import CartSidebar from "@/components/CartSidebar";
import type { MenuItem } from "@/lib/models/ui";

interface MenuCatalogProps {
  menuCat: string;
  setMenuCat: (v: string) => void;
  categories: string[];
  items: MenuItem[];
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  count: number;
}

export default function MenuCatalogLayout({
  menuCat,
  setMenuCat,
  categories,
  items,
  setCartOpen,
  count,
}: MenuCatalogProps) {
  return (
    <>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
           <h2 className="text-3xl font-extrabold tracking-tight">La Carte</h2>
           <p className="text-muted-foreground mt-1 text-sm md:text-base">Commandez vos plats et boissons favoris.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 bg-muted/30 p-2 rounded-2xl border border-border/50">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setMenuCat(c)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                menuCat === c
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "text-muted-foreground hover:bg-surface-alt hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="relative ml-2 rounded-full bg-primary p-3 text-primary-foreground lg:hidden shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
            aria-label="Ouvrir le panier"
          >
            <ShoppingCart className="h-5 w-5" />
            {count > 0 ? (
              <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-xs font-black text-background ring-2 ring-primary">
                {count}
              </span>
            ) : null}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="min-w-0 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {items.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <MenuItemCard item={m} />
              </motion.div>
            ))}
          </div>
          {items.length === 0 ? (
             <div className="py-20 text-center flex flex-col items-center justify-center bg-surface-alt/50 rounded-3xl border border-dashed border-border/80">
                <p className="text-lg font-medium text-foreground">Menu non disponible.</p>
             </div>
          ) : null}
        </div>
        
        <aside className="hidden w-[340px] shrink-0 lg:block">
          <div className="card-destination overflow-hidden sticky top-[100px] h-[calc(100vh-140px)] shadow-xl shadow-foreground/5 border border-border/60 rounded-3xl">
            <CartSidebar />
          </div>
        </aside>
      </div>
    </>
  );
}
