import { Search, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import ProductCard from "@/components/cards/ProductCard";
import CartSidebar from "@/components/CartSidebar";
import type { Product } from "@/lib/models/ui";

interface RetailCatalogProps {
  search: string;
  setSearch: (v: string) => void;
  cat: string;
  setCat: (v: string) => void;
  categories: string[];
  items: Product[];
  setCartOpen: (v: boolean) => void;
  count: number;
}

export default function RetailCatalogLayout({
  search,
  setSearch,
  cat,
  setCat,
  categories,
  items,
  setCartOpen,
  count,
}: RetailCatalogProps) {
  return (
    <>
      {/* Barre d'outils et de Filtres */}
      <div className="mb-8 flex flex-wrap items-center gap-4 bg-muted/40 p-4 rounded-md border border-border/50">
        <div className="relative min-w-[240px] max-w-sm flex-1">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground/60" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un produit..."
            className="w-full rounded-full border border-border/60 bg-background py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-sm transition-shadow"
            aria-label="Rechercher un produit"
          />
        </div>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 flex-1 items-center" role="tablist" aria-label="Catégories de produits">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={cat === c}
              onClick={() => setCat(c)}
              className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                cat === c
                  ? "text-primary-foreground"
                  : "bg-surface-alt text-muted-foreground hover:bg-border/60 hover:text-foreground"
              }`}
            >
              {cat === c && (
                <motion.div
                  layoutId="active-cat-retail"
                  className="absolute inset-0 bg-primary rounded-full shadow-md shadow-primary/20"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{c}</span>
            </button>
          ))}
        </div>
        
        {/* Mobile Cart Trigger */}
        <button
          type="button"
          onClick={() => setCartOpen(true)}
          className="relative rounded-full bg-primary p-3 text-primary-foreground lg:hidden shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
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

      {/* Grille principale avec Panier latéral (Desktop) */}
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="min-w-0 flex-1">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
            {items.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </div>
          {items.length === 0 ? (
             <div className="py-20 text-center flex flex-col items-center justify-center bg-surface-alt/50 rounded-md border border-dashed border-border/80">
                <p className="text-lg font-medium text-foreground">Aucun produit trouvé.</p>
                <p className="text-sm text-muted-foreground mt-2 max-w-sm">Essayer avec d'autres mots-clés ou changer de catégorie.</p>
             </div>
          ) : null}
        </div>
        
        {/* Sidebar Panier Desktop */}
        <aside className="hidden w-[340px] shrink-0 lg:block">
          <div className="card-destination overflow-hidden sticky top-[100px] h-[calc(100vh-140px)] shadow-xl shadow-foreground/5 border border-border/60 rounded-md">
            <CartSidebar />
          </div>
        </aside>
      </div>
    </>
  );
}
