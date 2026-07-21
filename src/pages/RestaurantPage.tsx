import { useState } from "react";
import {
  Star,
  MapPin,
  Clock,
  Phone,
  Truck,
  ShoppingCart,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PageWrapper from "@/components/layout/PageWrapper";
import MenuItemCard from "@/components/cards/MenuItemCard";
import CartSidebar from "@/components/CartSidebar";
import { useCartStore } from "@/stores/cartStore";
import { useDestination } from "@/hooks/queries/useDestinations";
import { useProducts } from "@/hooks/queries/useProducts";
import { mapProductListToMenuItem } from "@/lib/mappers/productMapper";

const categories = ["Tous", "Entrées", "Plats", "Desserts", "Boissons"];

const reviews = [
  {
    name: "Kofi Amevor",
    rating: 5,
    text: "Le Fufu est incroyable, le meilleur que j'ai mangé. Ambiance chaleureuse et service attentionné.",
  },
  {
    name: "Claire Durand",
    rating: 5,
    text: "Le Poulet DG est une révélation ! Le chef Akif est un artiste. Je recommande absolument.",
  },
  {
    name: "Yao Mensah",
    rating: 4,
    text: "Cocktail Bissap Twist exceptionnel. Le cadre est magnifique, surtout en terrasse le soir.",
  },
];

const RestaurantPage = () => {
  const [cat, setCat] = useState("Tous");
  const [cartOpen, setCartOpen] = useState(false);
  const count = useCartStore((s) => s.count());

  const slug = "restaurant-akif";
  const { data: restaurant, isLoading: isLoadingDest } = useDestination(slug);
  const { data: rawProducts, isLoading: isLoadingProducts } = useProducts(slug);

  const menuItems = rawProducts
    ? rawProducts.map(mapProductListToMenuItem)
    : [];
  const filtered =
    cat === "Tous" ? menuItems : menuItems.filter((m) => m.category === cat);

  if (isLoadingDest) {
    return (
      <PageWrapper>
        <div className="flex h-screen items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </PageWrapper>
    );
  }

  if (!restaurant) {
    return (
      <PageWrapper>
        <div className="flex h-screen items-center justify-center">
          <p className="text-muted-foreground">Restaurant introuvable.</p>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      {/* Hero */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-foreground/20" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container">
            <span className="badge-rating text-xs mb-3 inline-block">
              Gastronomie
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-card mb-3">
              {restaurant.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-card/80 text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-primary text-primary" />
                {restaurant.rating}
              </div>
              <span>{restaurant.priceRange}</span>
              <span>{restaurant.openingHours}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {restaurant.gallery.map((img, i) => (
            <div key={i} className="rounded-xl overflow-hidden aspect-[4/3]">
              <img src={img} alt={`Ambiance ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          ))}
        </div>

        {/* Menu */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold">Notre carte</h2>
            <div className="flex gap-2 flex-wrap">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${cat === c ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:border-primary/40"}`}
                >
                  {c}
                </button>
              ))}
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2.5 bg-primary text-primary-foreground rounded-full lg:hidden"
              >
                <ShoppingCart className="w-5 h-5" />
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 bg-foreground text-card text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {count}
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className="flex gap-8">
            <div className="flex-1">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {isLoadingProducts ? (
                  <div className="col-span-full py-16 flex justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : (
                  filtered.map((m, i) => (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                    >
                      <MenuItemCard item={m} />
                    </motion.div>
                  ))
                )}
                {!isLoadingProducts && filtered.length === 0 && (
                  <div className="col-span-full text-center py-16 text-muted-foreground">
                    Aucun plat trouvé dans cette catégorie.
                  </div>
                )}
              </div>
            </div>
            <div className="hidden lg:block w-[320px] flex-shrink-0">
              <div className="sticky top-[88px] card-destination h-[calc(100vh-120px)]">
                <CartSidebar />
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Avis et ambiance</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div key={r.name} className="card-destination p-6">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-3 italic">
                  "{r.text}"
                </p>
                <p className="font-semibold text-sm">{r.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Infos pratiques */}
        <div className="card-destination p-8">
          <h2 className="text-2xl font-bold mb-6">Informations pratiques</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium">Horaires</p>
                <p className="text-sm text-muted-foreground">
                  {restaurant.openingHours}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium">Adresse</p>
                <p className="text-sm text-muted-foreground">
                  {restaurant.address}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium">Téléphone</p>
                <p className="text-sm text-muted-foreground">
                  {restaurant.phone}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium">Livraison</p>
                <p className="text-sm text-muted-foreground">
                  Disponible dans Lomé
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile cart drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/40 z-50 lg:hidden"
              onClick={() => setCartOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed right-0 top-0 bottom-0 w-[340px] bg-card z-50 lg:hidden shadow-2xl"
            >
              <CartSidebar onClose={() => setCartOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
};

export default RestaurantPage;
