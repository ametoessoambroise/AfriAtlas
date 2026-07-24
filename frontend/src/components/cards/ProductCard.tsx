import { Plus, Minus, AlertCircle, Loader2 } from 'lucide-react';
import { useCart } from '@/hooks/queries/useCart';
import { useAuth } from '@/hooks/useAuth';
import { formatPrice } from '@/stores/cartStore';
import type { Product } from '@/lib/models/ui';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ProductCard = ({ product }: { product: Product }) => {
  const { items, addItem, updateItem, isAdding, isUpdating } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [localBusy, setLocalBusy] = useState(false);

  const cartItem = items.find((i) => i.product_id === product.id);
  const isBusy = (isAdding || isUpdating || localBusy);

  const handleAdd = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setLocalBusy(true);
    try {
      await addItem({ product_id: product.id, quantity: 1 });
      toast.success(`${product.name} ajouté au panier !`, {
        description: "Vous pouvez finaliser votre commande dans le panier.",
        action: {
          label: "Voir le panier",
          onClick: () => navigate("/cart"),
        },
      });
    } catch (error: any) {
      toast.error("Erreur lors de l'ajout au panier", {
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
        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
        {!product.inStock && (
          <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center backdrop-blur-[2px]">
            <span className="flex items-center gap-1 bg-destructive text-destructive-foreground px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
              <AlertCircle className="w-3.5 h-3.5" /> Rupture de stock
            </span>
          </div>
        )}
        <span className="absolute top-2 right-2 bg-card/90 text-foreground text-[10px] px-2 py-1 rounded-full font-bold shadow-sm backdrop-blur-md">
          {product.unit}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <span className="text-[10px] text-primary font-black tracking-widest uppercase mb-1">{product.category}</span>
        <h3 className="font-extrabold text-base leading-tight mb-1 group-hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
        <p className="text-xs text-muted-foreground mb-4 line-clamp-2 leading-relaxed">{product.description}</p>
        <div className="mt-auto flex items-center justify-between border-t border-border/40 pt-4">
          <span className="font-black text-primary text-lg">{formatPrice(product.price)}</span>
          
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
              disabled={!product.inStock || isBusy}
              onClick={handleAdd}
              className="btn-primary text-xs py-2 px-5 rounded-md font-bold flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:shadow-lg hover:shadow-primary/20"
            >
              {isBusy ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Plus className="w-3.5 h-3.5" />
              )}
              {!user ? "Se connecter" : "Ajouter"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
