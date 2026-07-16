import { Minus, Plus, Trash2, X, AlertCircle, Loader2 } from "lucide-react";
import { useCart } from "@/hooks/queries/useCart";
import { formatPrice } from "@/stores/cartStore";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [busyItemId, setBusyItemId] = useState<string | null>(null);

  const handleUpdate = async (itemId: string, quantity: number) => {
    setBusyItemId(itemId);
    try {
      await updateItem({ itemId, data: { quantity } });
    } catch (err: any) {
      setErrorVisible(err.message || "Erreur lors de la mise à jour");
    } finally {
      setBusyItemId(null);
    }
  };

  const handleRemove = async (itemId: string) => {
    setBusyItemId(itemId);
    try {
      await removeItem(itemId);
    } catch (err: any) {
      setErrorVisible(err.message || "Erreur lors de la suppression");
    } finally {
      setBusyItemId(null);
    }
  };

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

  const isBusy = isClearing || isCheckingOut;

  if (showSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center h-full gap-4 p-8 text-center"
      >
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-3xl">
          🎉
        </div>
        <h3 className="text-xl font-bold">Commande confirmée !</h3>
        <p className="text-sm text-muted-foreground">
          Merci pour votre commande. Vous recevrez une confirmation sous peu.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-card">
      <div className="flex items-center justify-between p-5 border-b border-border">
        <div>
          <h3 className="font-black text-xl tracking-tight">Votre Panier</h3>
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mt-0.5">
            Afriatlas Travel
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
            aria-label="Fermer le panier"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {errorVisible && (
        <div className="mx-4 mt-4 p-3 rounded-md bg-destructive/10 text-destructive text-xs font-medium flex items-start gap-2 border border-destructive/20 animate-in fade-in slide-in-from-top-1">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{errorVisible}</span>
        </div>
      )}

      {items.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
          <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center">
            <X className="w-8 h-8 text-muted-foreground/30" />
          </div>
          <p className="text-muted-foreground text-sm font-medium">
            Votre panier est vide
          </p>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence mode="popLayout">
              {items.map((ci) => (
                <motion.div
                  layout
                  key={ci.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex items-center gap-3 p-3 bg-muted/30 rounded-md relative overflow-hidden group border border-transparent hover:border-border/60 transition-colors shadow-sm"
                >
                  <div className="relative shrink-0">
                    <img
                      src={
                        ci.product_image_url ||
                        "/images/places/placeholder-place.jpg"
                      }
                      alt={ci.product_name}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                    {busyItemId === ci.id && (
                      <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] rounded-md flex items-center justify-center">
                        <Loader2 className="w-5 h-5 animate-spin text-primary" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-extrabold truncate group-hover:text-primary transition-colors">
                      {ci.product_name}
                    </p>
                    <p className="text-xs text-primary font-black mt-0.5">
                      {formatPrice(Number(ci.unit_price))}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2 relative z-20">
                    <div className="flex items-center gap-1 bg-card rounded-full p-0.5 border border-border/60 shadow-sm">
                      <button
                        disabled={isBusy || busyItemId === ci.id}
                        onClick={() => handleUpdate(ci.id, ci.quantity - 1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-muted disabled:opacity-50 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-[11px] font-black w-5 text-center">
                        {ci.quantity}
                      </span>
                      <button
                        disabled={
                          isBusy ||
                          busyItemId === ci.id ||
                          ci.quantity >= ci.stock_available
                        }
                        onClick={() => handleUpdate(ci.id, ci.quantity + 1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-muted disabled:opacity-50 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button
                      disabled={isBusy || busyItemId === ci.id}
                      onClick={() => handleRemove(ci.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors p-1"
                      title="Supprimer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {!ci.is_available && (
                    <div className="absolute inset-0 bg-destructive/5 border border-destructive/20 z-10 p-2 text-[10px] text-destructive font-black flex items-end">
                      <span className="bg-destructive text-white px-2 py-0.5 rounded-md shadow-sm">
                        ÉPUISÉ
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="p-5 border-t border-border bg-surface-alt/50 space-y-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => clearCart()}
                disabled={isBusy}
                className="text-[11px] text-muted-foreground hover:text-destructive font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
              >
                Vider le panier
              </button>
              <div className="text-right">
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
                  Sous-total
                </p>
                <p className="text-2xl font-black text-primary">
                  {formatPrice(Number(subtotal))}
                </p>
              </div>
            </div>

            <button
              onClick={handleOrder}
              disabled={isBusy || items.some((i) => !i.is_available)}
              className="btn-primary w-full py-4 rounded-md font-black text-sm tracking-tight flex items-center justify-center gap-2 shadow-xl shadow-primary/10 hover:shadow-primary/20 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {isCheckingOut ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Traitement...
                </>
              ) : (
                "Commander"
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartSidebar;
