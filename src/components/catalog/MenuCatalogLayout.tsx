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
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight">La Carte</h2>
          <p className="mt-1 text-sm text-muted-foreground md:text-base">Commandez vos plats et boissons favoris.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2 rounded-xl bg-muted/30 p-2" role="tablist" aria-label="Catégories du menu">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={menuCat === c}
              onClick={() => setMenuCat(c)}
              className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                menuCat === c
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:bg-surface-alt hover:text-foreground"
              }`}
            >
              {menuCat === c && (
                <motion.div
                  layoutId="active-cat-menu"
                  className="absolute inset-0 rounded-full bg-primary shadow-md shadow-primary/20"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{c}</span>
            </button>
          ))}
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="relative ml-2 rounded-full bg-primary p-3 text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 lg:hidden"
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
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
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
            <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/20 py-20 text-center">
              <p className="text-lg font-medium text-foreground">Menu non disponible.</p>
            </div>
          ) : null}
        </div>

        <aside className="hidden w-[340px] shrink-0 lg:block">
          <div className="card-destination sticky top-[100px] h-[calc(100vh-140px)] overflow-hidden rounded-2xl border border-border/60 shadow-sm">
            <CartSidebar />
          </div>
        </aside>
      </div>
    </>
  );
}
