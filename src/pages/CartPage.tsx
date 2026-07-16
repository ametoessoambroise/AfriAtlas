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
          <div className="w-16 h-16 border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
          <ShoppingBag className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-primary" />
        </div>
        <div className="text-center space-y-2">
          <p className="font-black text-xl tracking-tight">Préparation de votre sélection...</p>
          <p className="text-muted-foreground text-sm font-medium">Un instant, nous récupérons vos trésors.</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center"
      >
        <div className="w-32 h-32 bg-surface-alt rounded-full flex items-center justify-center text-muted-foreground mb-8 relative">
          <ShoppingBag className="w-12 h-12 opacity-20" />
          <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-2 -right-2 bg-primary/10 p-3 rounded-full"
          >
            <Sparkles className="w-6 h-6 text-primary" />
          </motion.div>
        </div>
        <h2 className="text-4xl font-black mb-4 tracking-tight">Votre panier est vide.</h2>
        <p className="text-muted-foreground max-w-sm mb-10 text-lg leading-relaxed">
          Il semble que vous n'ayez pas encore ajouté de destinations ou de délices à votre sélection.
        </p>
        <button
          onClick={() => navigate("/destinations")}
          className="btn-primary px-10 py-4 font-black rounded-md shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all hover:scale-105 active:scale-95"
        >
          Découvrir les destinations
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-24">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col md:flex-row gap-6 items-start md:items-end justify-between mb-16"
      >
        <div>
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-4 group font-bold"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] uppercase tracking-[0.2em]">Retour</span>
          </button>
          <h1 className="text-3xl md:text-5xl lg:text-5xl font-black tracking-tighter">Votre Sélection<span className="text-primary">.</span></h1>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="bg-primary text-primary-foreground px-6 py-3 rounded-md shadow-lg shadow-primary/10 flex items-center gap-3">
            <ShoppingBag className="w-5 h-5" />
            <span className="font-black text-lg">{itemCount} {items.length > 1 ? "Articles" : "Article"}</span>
          </div>
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest mr-2">Sous-total : {formatPrice(subtotal)}</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Liste des articles */}
        <div className="lg:col-span-8 space-y-10">
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
            className="p-8 bg-surface-alt rounded-md border border-dashed border-border/60 flex flex-col md:flex-row items-center gap-6"
          >
             <div className="w-16 h-16 bg-background rounded-md flex items-center justify-center shrink-0 shadow-sm">
                <span className="text-2xl">🌍</span>
             </div>
             <div>
               <h4 className="font-black text-xl mb-1 tracking-tight">Besoin d'un guide personnalisé ?</h4>
               <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                 Nos experts locaux sont là pour vous aider à finaliser votre itinéraire.
                 Contactez notre concierge 24/7 au <span className="text-primary font-bold">+228 90 00 00 00</span>
               </p>
             </div>
          </motion.div>
        </div>

        {/* Résumé et Checkout */}
        <div className="lg:col-span-4">
          <div className="sticky top-32">
            <CartSummary
              subtotal={Number(subtotal)}
              onCheckout={() => navigate("/checkout")}
            />
            
            {/* Trust Badges */}
            <div className="mt-8 grid grid-cols-3 gap-4 px-2">
               {[
                 { icon: "🛡️", label: "Sécurisé" },
                 { icon: "⚡", label: "Rapide" },
                 { icon: "🎁", label: "Privilèges" }
               ].map((b, i) => (
                 <div key={i} className="flex flex-col items-center gap-1.5">
                    <span className="text-xl">{b.icon}</span>
                    <span className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground">{b.label}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
