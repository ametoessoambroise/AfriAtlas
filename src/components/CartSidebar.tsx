import { Minus, Plus, Trash2, X, AlertCircle } from 'lucide-react';
import { useCart } from '@/hooks/queries/useCart';
import { formatPrice } from '@/stores/cartStore'; // On garde uniquement le formatPrice depuis mobx ou store
import { useState } from 'react';
import { motion } from 'framer-motion';

const CartSidebar = ({ onClose }: { onClose?: () => void }) => {
  const {
    items,
    subtotal,
    updateItem,
    removeItem,
    clearCart,
    checkout,
    isCheckingOut,
    isUpdating,
    isRemoving,
    isClearing,
  } = useCart();
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorVisible, setErrorVisible] = useState<string | null>(null);

  const handleOrder = async () => {
    try {
      setErrorVisible(null);
      await checkout();
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose?.();
      }, 2500);
    } catch (err: any) {
      setErrorVisible(err.message || "Impossible de traiter la commande");
    }
  };

  const isBusy = isUpdating || isRemoving || isClearing || isCheckingOut;

  if (showSuccess) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center h-full gap-4 p-8 text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-3xl">🎉</div>
        <h3 className="text-xl font-bold">Commande confirmée !</h3>
        <p className="text-sm text-muted-foreground">Merci pour votre commande. Vous recevrez une confirmation sous peu.</p>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-card">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-bold text-lg">Votre panier</h3>
        {onClose && <button onClick={onClose} aria-label="Fermer le panier"><X className="w-5 h-5" /></button>}
      </div>

      {errorVisible && (
        <div className="mx-4 mt-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm flex items-start gap-2">
           <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
           <span>{errorVisible}</span>
        </div>
      )}

      {items.length === 0 ? (
        <div className="flex-1 flex items-center justify-center p-8 text-center">
          <p className="text-muted-foreground text-sm">Votre panier est vide</p>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.map((ci) => (
              <div key={ci.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl relative overflow-hidden group">
                <div className={`absolute inset-0 bg-background/50 backdrop-blur-[1px] z-10 flex items-center justify-center transition-opacity ${isBusy ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                  {/* Subtle overlay while mutating */}
                </div>
                <img src={ci.product_image_url || "/images/places/placeholder-place.jpg"} alt={ci.product_name} className="w-14 h-14 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{ci.product_name}</p>
                  <p className="text-xs text-primary font-semibold">{formatPrice(Number(ci.unit_price))}</p>
                </div>
                <div className="flex items-center gap-1.5 relative z-20">
                  <button 
                     disabled={isBusy}
                     onClick={() => updateItem({ itemId: ci.id, data: { quantity: ci.quantity - 1 }})} 
                     className="w-6 h-6 rounded-full bg-card flex items-center justify-center border border-border disabled:opacity-50"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-sm font-semibold w-5 text-center">{ci.quantity}</span>
                  <button 
                     disabled={isBusy || ci.quantity >= ci.stock_available}
                     onClick={() => updateItem({ itemId: ci.id, data: { quantity: ci.quantity + 1 }})} 
                     className="w-6 h-6 rounded-full bg-card flex items-center justify-center border border-border disabled:opacity-50"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                  <button 
                     disabled={isBusy}
                     onClick={() => removeItem(ci.id)} 
                     className="w-6 h-6 rounded-full flex items-center justify-center text-destructive hover:bg-destructive/10 ml-1 disabled:opacity-50"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
                {!ci.is_available && (
                   <div className="absolute inset-0 bg-destructive/5 border border-destructive/20 z-10 p-2 text-xs text-destructive font-bold flex items-end">
                      <span className="bg-destructive text-destructive-foreground px-2 py-0.5 rounded">Rupture</span>
                   </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-start px-4 mb-2">
             <button 
               onClick={() => clearCart()} 
               disabled={isBusy} 
               className="text-xs text-muted-foreground hover:text-destructive underline disabled:opacity-50 transition-colors"
             >
               Vider le panier
             </button>
          </div>
          <div className="p-4 border-t border-border space-y-3 bg-surface-alt">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-primary">{formatPrice(Number(subtotal))}</span>
            </div>
            <button 
              onClick={handleOrder} 
              disabled={isBusy || items.some(i => !i.is_available)}
              className="btn-primary w-full text-center py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCheckingOut ? "Traitement..." : "Commander"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartSidebar;
