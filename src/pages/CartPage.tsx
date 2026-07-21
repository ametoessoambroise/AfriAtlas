import { useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/queries/useCart";
import CartItemList from "@/components/cart/CartItemList";
import CartSummary from "@/components/cart/CartSummary";
import { ShoppingBag, ArrowLeft, Loader2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatPrice } from "@/stores/cartStore";

export default function CartPage() {
  const navigate = useNavigate();
  const { 
    items, 
    subtotal, 
    updateItem, 
    removeItem, 
    isLoading, 
    isUpdating, 
    isRemoving,
    itemCount 
  } = useCart();

  const handleUpdateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) {
      await removeItem(itemId);
    } else {
      await updateItem({ itemId, data: { quantity } });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-6">
        <div className="relative">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary/10 border-t-primary" />
          <ShoppingBag className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-primary" />
        </div>
        <div className="space-y-2 text-center">
          <p className="text-xl font-black tracking-tight">Préparation de votre sélection...</p>
          <p className="text-sm font-medium text-muted-foreground">Un instant, nous récupérons vos trésors.</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex min-h-[70vh] flex-col items-center justify-center p-6 text-center"
      >
        <div className="relative mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-surface-alt text-muted-foreground">
          <ShoppingBag className="h-12 w-12 opacity-20" />
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -right-2 -top-2 rounded-full bg-primary/10 p-3"
          >
            <Sparkles className="h-6 w-6 text-primary" />
          </motion.div>
        </div>
        <h2 className="mb-4 text-4xl font-black tracking-tight">Votre panier est vide.</h2>
        <p className="mb-10 max-w-sm text-lg leading-relaxed text-muted-foreground">
          Il semble que vous n’ayez pas encore ajouté de destinations ou de délices à votre sélection.
        </p>
        <button
          onClick={() => navigate("/destinations")}
          className="rounded-xl bg-primary px-10 py-4 text-sm font-black uppercase tracking-[0.2em] text-primary-foreground shadow-xl shadow-primary/20 transition-all hover:scale-105 hover:shadow-primary/30 active:scale-95"
        >
          Découvrir les destinations
        </button>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:py-24">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
      >
        <div>
          <button
            onClick={() => navigate(-1)}
            className="group mb-4 flex items-center gap-2 font-bold text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-[10px] uppercase tracking-[0.2em]">Retour</span>
          </button>
          <h1 className="text-3xl font-black tracking-tighter md:text-5xl lg:text-5xl">
            Votre Sélection<span className="text-primary">.</span>
          </h1>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-3 rounded-xl bg-primary px-6 py-3 text-primary-foreground shadow-lg shadow-primary/10">
            <ShoppingBag className="h-5 w-5" />
            <span className="text-lg font-black">{itemCount} {items.length > 1 ? "Articles" : "Article"}</span>
          </div>
          <p className="mr-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Sous-total : {formatPrice(subtotal)}
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
        <div className="space-y-10 lg:col-span-8">
          <AnimatePresence mode="popLayout">
            <CartItemList
              items={items}
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={removeItem}
              isUpdating={isUpdating || isRemoving}
            />
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center gap-6 rounded-[24px] border border-dashed border-border/60 bg-surface-alt p-8 md:flex-row"
          >
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-background shadow-sm">
              <span className="text-2xl">🌍</span>
            </div>
            <div>
              <h4 className="mb-1 text-xl font-black tracking-tight">Besoin d’un guide personnalisé ?</h4>
              <p className="text-sm font-medium leading-relaxed text-muted-foreground">
                Nos experts locaux sont là pour vous aider à finaliser votre itinéraire. Contactez notre concierge 24/7 au <span className="font-bold text-primary">+228 90 00 00 00</span>
              </p>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-4">
          <div className="sticky top-32">
            <CartSummary
              subtotal={Number(subtotal)}
              onCheckout={() => navigate("/checkout")}
            />

            <div className="mt-8 grid grid-cols-3 gap-4 px-2">
              {[
                { icon: "🛡️", label: "Sécurisé" },
                { icon: "⚡", label: "Rapide" },
                { icon: "🎁", label: "Privilèges" },
              ].map((b, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <span className="text-xl">{b.icon}</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.16em] text-muted-foreground">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
