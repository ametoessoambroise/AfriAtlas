import { useState, useMemo } from 'react';
import { Search, ShoppingCart, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageWrapper from '@/components/layout/PageWrapper';
import ProductCard from '@/components/cards/ProductCard';
import CartSidebar from '@/components/CartSidebar';
import { useCartStore } from '@/stores/cartStore';
import { useDestination } from '@/hooks/queries/useDestinations';
import { useProducts } from '@/hooks/queries/useProducts';
import { mapProductListToProduct } from '@/lib/mappers/productMapper';

const categories = ['Tous', 'Épicerie', 'Boissons', 'Snacks', 'Beauté'];

const ChampionPage = () => {
  const [cat, setCat] = useState('Tous');
  const [search, setSearch] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const count = useCartStore((s) => s.count());

  const slug = 'le-champion';
  const { data: champion, isLoading: isLoadingDest } = useDestination(slug);
  const { data: rawProducts, isLoading: isLoadingProducts } = useProducts(slug);

  const filtered = useMemo(() => {
    if (!rawProducts) return [];
    const products = rawProducts.map(mapProductListToProduct);
    return products.filter((p) => {
      if (cat !== 'Tous' && p.category !== cat) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [rawProducts, cat, search]);

  if (isLoadingDest) {
    return (
      <PageWrapper>
        <div className="flex h-screen items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </PageWrapper>
    );
  }

  if (!champion) {
    return (
      <PageWrapper>
        <div className="flex h-screen items-center justify-center">
          <p className="text-muted-foreground">Supermarché introuvable.</p>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      {/* Hero */}
      <div className="relative h-[300px] overflow-hidden">
        <img src={champion.image} alt={champion.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-foreground/20" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container">
            <span className="badge-rating text-xs mb-3 inline-block">Supermarché</span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-card mb-2">{champion.name}</h1>
            <p className="text-card/80 text-sm">{champion.openingHours} · {champion.address}</p>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un produit..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((c) => (
              <button key={c} onClick={() => setCat(c)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${cat === c ? 'bg-primary text-primary-foreground' : 'bg-card border border-border text-muted-foreground hover:border-primary/40'}`}>
                {c}
              </button>
            ))}
          </div>
          <button
            onClick={() => setCartOpen(true)}
            className="relative p-2.5 bg-primary text-primary-foreground rounded-full lg:hidden"
          >
            <ShoppingCart className="w-5 h-5" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-foreground text-card text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">{count}</span>
            )}
          </button>
        </div>

        <div className="flex gap-8">
          <div className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {isLoadingProducts ? (
                <div className="col-span-full py-16 flex justify-center">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : (
                filtered.map((p, i) => (
                  <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                    <ProductCard product={p} />
                  </motion.div>
                ))
              )}
            </div>
            {!isLoadingProducts && filtered.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">Aucun produit trouvé</p>
              </div>
            )}
          </div>
          <div className="hidden lg:block w-[320px] flex-shrink-0">
            <div className="sticky top-[88px] card-destination h-[calc(100vh-120px)]">
              <CartSidebar />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile cart drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-foreground/40 z-50 lg:hidden" onClick={() => setCartOpen(false)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25 }} className="fixed right-0 top-0 bottom-0 w-[340px] bg-card z-50 lg:hidden shadow-2xl">
              <CartSidebar onClose={() => setCartOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
};

export default ChampionPage;
