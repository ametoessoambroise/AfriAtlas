import { useMemo, useState, useEffect } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingCart, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";

import PageWrapper from "@/components/layout/PageWrapper";
import { ApiErrorState, EmptyState } from "@/components/feedback/ApiQueryState";
import { PlaceCatalogSkeleton } from "@/components/feedback/PlaceCatalogSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import CartSidebar from "@/components/CartSidebar";

// Nouvelles extractions modulaires
import CatalogHeader from "@/components/catalog/CatalogHeader";
import RetailCatalogLayout from "@/components/catalog/RetailCatalogLayout";
import MenuCatalogLayout from "@/components/catalog/MenuCatalogLayout";
import HotelCatalogLayout from "@/components/catalog/HotelCatalogLayout";

import { usePlace } from "@/hooks/queries/usePlaces";
import { usePlaceProducts } from "@/hooks/queries/useProducts";
import { getCatalogMode, inferHasCatalog } from "@/lib/catalog";
import {
  mapProductListToProduct,
  mapProductListToMenuItem,
  mapProductListToRoom,
} from "@/lib/mappers/productMapper";
import { useCart } from "@/hooks/queries/useCart";
import { getErrorMessage, is404 } from "@/lib/utils/errorMessages";

const PlaceCatalogPage = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const placeQuery = usePlace(slug);
  const productsQuery = usePlaceProducts(slug);
  const { itemCount: count, subtotal, isAdding, isUpdating } = useCart();

  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("Tous");
  const [menuCat, setMenuCat] = useState("Tous");
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [showSuccess, setShowSuccess] = useState(false);

  // Feedback visuel global lors des mutations du panier
  useEffect(() => {
    if (isAdding) {
       // On peut imaginer un petit effet ici si nécessaire
    }
  }, [isAdding]);

  const place = placeQuery.data;
  const mode = place ? getCatalogMode(place.category) : "retail";

  const products = useMemo(
    () => productsQuery.data ?? [],
    [productsQuery.data],
  );

  const retailItems = useMemo(
    () => products.map(mapProductListToProduct),
    [products],
  );
  const menuItems = useMemo(
    () => products.map(mapProductListToMenuItem),
    [products],
  );
  const rooms = useMemo(() => products.map(mapProductListToRoom), [products]);

  const filteredRetail = useMemo(() => {
    return retailItems.filter((p) => {
      if (cat !== "Tous" && p.category !== cat) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()))
        return false;
      return true;
    });
  }, [retailItems, cat, search]);

  const filteredMenu = useMemo(() => {
    return menuCat === "Tous"
      ? menuItems
      : menuItems.filter((m) => m.category === menuCat);
  }, [menuItems, menuCat]);

  const retailCategories = useMemo(() => {
    const u = [...new Set(retailItems.map((p) => p.category))]
      .filter(Boolean)
      .sort();
    return ["Tous", ...u];
  }, [retailItems]);

  const menuCategories = useMemo(() => {
    const u = [...new Set(menuItems.map((m) => m.category))]
      .filter(Boolean)
      .sort();
    return ["Tous", ...u];
  }, [menuItems]);

  const room = rooms.find((r) => r.id === selectedRoom);
  const nights =
    checkIn && checkOut
      ? Math.max(
          1,
          Math.ceil(
            (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
              86400000,
          ),
        )
      : 1;
  const totalPrice = room ? room.price * nights : 0;

  const handleBook = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  if (!slug) return <Navigate to="/destinations" replace />;

  if (placeQuery.isLoading) return <PlaceCatalogSkeleton />;

  if (placeQuery.isError) {
    const msg = is404(placeQuery.error)
      ? "Ce lieu n'existe pas ou n'est plus disponible."
      : getErrorMessage(placeQuery.error);
    return (
      <PageWrapper>
        <div className="container py-12">
          <ApiErrorState message={msg} onRetry={() => placeQuery.refetch()} />
        </div>
      </PageWrapper>
    );
  }

  if (!place || !inferHasCatalog(place)) {
    return <Navigate to={`/destinations/${slug}`} replace />;
  }

  const showCartDrawer = mode === "retail" || mode === "menu";

  return (
    <PageWrapper>
      {/* 1. Header extrait */}
      <CatalogHeader place={place} />

      {/* 2. Formulaire & Listing orchestré */}
      <div className="container py-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {productsQuery.isLoading ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-md border border-border bg-card shadow-sm">
                <Skeleton className="aspect-[4/3] w-full rounded-none" />
                <div className="space-y-3 p-5">
                  <Skeleton className="h-5 w-3/4 rounded-full" />
                  <Skeleton className="h-4 w-1/2 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : productsQuery.isError ? (
          <ApiErrorState
            message={getErrorMessage(productsQuery.error)}
            onRetry={() => productsQuery.refetch()}
          />
        ) : products.length === 0 ? (
          <EmptyState
            title="Aucune offre pour le moment"
            description="Les offres seront affichées ici dès publication par l’établissement."
            actionLabel="Retour à la fiche lieu"
            onAction={() => {
              navigate(`/destinations/${slug}`);
            }}
          />
        ) : mode === "retail" ? (
          <RetailCatalogLayout
            search={search}
            setSearch={setSearch}
            cat={cat}
            setCat={setCat}
            categories={retailCategories}
            items={filteredRetail}
            setCartOpen={setCartOpen}
            count={count}
          />
        ) : mode === "menu" ? (
          <MenuCatalogLayout
            menuCat={menuCat}
            setMenuCat={setMenuCat}
            categories={menuCategories}
            items={filteredMenu}
            cartOpen={cartOpen}
            setCartOpen={setCartOpen}
            count={count}
          />
        ) : (
          <HotelCatalogLayout
            rooms={rooms}
            selectedRoom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
            checkIn={checkIn}
            setCheckIn={setCheckIn}
            checkOut={checkOut}
            setCheckOut={setCheckOut}
            guests={guests}
            setGuests={setGuests}
            room={room}
            nights={nights}
            totalPrice={totalPrice}
            onBook={handleBook}
            showSuccess={showSuccess}
          />
        )}
      </div>

      {/* Floating Cart Button (Mobile) */}
      <AnimatePresence>
        {count > 0 && showCartDrawer && !cartOpen && (
          <motion.button
            initial={{ scale: 0, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0, y: 20 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCartOpen(true)}
            className="fixed bottom-24 right-6 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl shadow-primary/40 lg:hidden"
            aria-label="Voir le panier"
          >
            <div className="relative">
              <ShoppingCart className="h-7 w-7" />
              <span className="absolute -right-3 -top-3 flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-[10px] font-black text-background ring-2 ring-primary">
                {count}
              </span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Cart Drawer Transition (Mobile seulement si retail/menu) */}
      <AnimatePresence>
        {cartOpen && showCartDrawer ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm lg:hidden"
              onClick={() => setCartOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed bottom-0 right-0 top-0 z-50 w-[85vw] max-w-sm bg-card shadow-2xl lg:hidden"
            >
              <CartSidebar onClose={() => setCartOpen(false)} />
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </PageWrapper>
  );
};

export default PlaceCatalogPage;
