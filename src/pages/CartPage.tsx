import { useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/queries/useCart";
import CartItemList from "@/components/cart/CartItemList";
import CartSummary from "@/components/cart/CartSummary";
import { ShoppingBag, ArrowLeft } from "lucide-react";

export default function CartPage() {
  const navigate = useNavigate();
  const { items, subtotal, updateItem, removeItem, isLoading, isUpdating, isRemoving } = useCart();

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    updateItem({ itemId, data: { quantity } });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        <p className="font-bold text-muted-foreground animate-pulse">Chargement de votre panier...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 bg-surface-alt rounded-full flex items-center justify-center text-muted-foreground mb-6">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-black mb-2">Votre panier est vide.</h2>
        <p className="text-muted-foreground max-w-sm mb-8 font-medium">
          Il semble que vous n'ayez pas encore ajouté de destinations ou de délices à votre sélection.
        </p>
        <button
          onClick={() => navigate("/destinations")}
          className="btn-primary px-8 py-3 font-bold"
        >
          Découvrir les destinations
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-12">
        <div>
          <button 
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-2 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-widest">Retourner voter</span>
          </button>
          <h1 className="text-4xl font-black tracking-tight">Votre Sélection.</h1>
        </div>
        <div className="bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
          <span className="text-primary font-bold">{items.length} {items.length > 1 ? "Articles" : "Article"}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Liste des articles */}
        <div className="lg:col-span-2 space-y-8">
          <CartItemList
            items={items}
            onUpdateQuantity={handleUpdateQuantity}
            onRemove={removeItem}
            isUpdating={isUpdating || isRemoving}
          />
          
          <div className="p-6 bg-surface-alt rounded-3xl border border-dashed border-border/60">
             <h4 className="font-bold mb-2">Assistance Voyage</h4>
             <p className="text-sm text-muted-foreground">
               Besoin d'aide avec votre commande ? Contactez notre concierge 24/7 au 
               <span className="text-primary font-medium"> +228 90 00 00 00</span>
             </p>
          </div>
        </div>

        {/* Résumé et Checkout */}
        <div className="lg:col-span-1">
          <CartSummary
            subtotal={Number(subtotal)}
            onCheckout={() => navigate("/checkout")}
          />
        </div>
      </div>
    </div>
  );
}
