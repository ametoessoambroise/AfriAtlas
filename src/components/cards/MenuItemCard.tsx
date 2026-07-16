import { Plus, Minus, Flame, Loader2 } from 'lucide-react';
import { useCart } from '@/hooks/queries/useCart';
import { useAuth } from '@/hooks/useAuth';
import { formatPrice } from '@/stores/cartStore';
import type { MenuItem } from '@/lib/models/ui';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const MenuItemCard = ({ item }: { item: MenuItem }) => {
  const { items, addItem, updateItem, isAdding, isUpdating } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [localBusy, setLocalBusy] = useState(false);

  const cartItem = items.find((i) => i.product_id === item.id);
  const isBusy = (isAdding || isUpdating || localBusy);

  const handleAdd = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setLocalBusy(true);
    try {
      await addItem({ product_id: item.id, quantity: 1 });
      toast.success(`${item.name} ajouté à votre commande !`, {
        description: "Votre commande est en cours de préparation.",
        action: {
          label: "Voir le panier",
          onClick: () => navigate("/cart"),
        },
      });
    } catch (error: any) {
      toast.error("Erreur lors de l'ajout", {
        description: error.message || "Veuillez réessayer plus tard.",
      });
    } finally {
      setLocalBusy(false);
    }
  };

  const handleUpdate = async (newQuantity: number) => {
    if (!cartItem) return;
    setLocalBusy(true);
    try {
      await updateItem({ itemId: cartItem.id, data: { quantity: newQuantity } });
    } finally {
      setLocalBusy(false);
    }
  };

  return (
    <div className="card-destination flex flex-col transition-all hover:border-primary/30 group">
      <div className="relative h-44 overflow-hidden rounded-t-2xl">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
        {item.isPopular && (
          <span className="absolute top-2 left-2 flex items-center gap-1.5 bg-accent text-accent-foreground px-3 py-1.5 rounded-full text-[10px] font-black shadow-lg backdrop-blur-md">
            <Flame className="w-3.5 h-3.5 fill-current" /> POPULAIRE
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-extrabold text-base leading-tight mb-1 group-hover:text-primary transition-colors line-clamp-1">{item.name}</h3>
        <p className="text-xs text-muted-foreground mb-4 line-clamp-2 leading-relaxed">{item.description}</p>
        <div className="mt-auto flex items-center justify-between border-t border-border/40 pt-4">
          <span className="font-black text-primary text-lg">{formatPrice(item.price)}</span>
          
          {cartItem ? (
            <div className="flex items-center gap-2 bg-muted/30 p-1 rounded-full border border-border/50">
              <button 
                disabled={isBusy}
                onClick={() => handleUpdate(cartItem.quantity - 1)} 
                className="w-8 h-8 rounded-full bg-card flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all disabled:opacity-50 shadow-sm"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-black w-6 text-center">
                {isBusy ? <Loader2 className="w-3 h-3 animate-spin mx-auto text-primary" /> : cartItem.quantity}
              </span>
              <button 
                disabled={isBusy || cartItem.quantity >= (cartItem.stock_available ?? 99)}
                onClick={() => handleUpdate(cartItem.quantity + 1)} 
                className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:scale-105 transition-all disabled:opacity-50 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button 
              disabled={isBusy}
              onClick={handleAdd} 
              className="btn-primary text-xs py-2 px-5 rounded-md font-bold flex items-center gap-2 transition-all disabled:opacity-50 hover:shadow-lg hover:shadow-primary/20"
            >
              {isBusy ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Plus className="w-3.5 h-3.5" />
              )}
              {!user ? "Se connecter" : "Commander"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
