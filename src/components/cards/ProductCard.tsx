import { Plus, Minus, AlertCircle } from 'lucide-react';
import { useCart } from '@/hooks/queries/useCart';
import { useAuth } from '@/hooks/useAuth';
import { formatPrice } from '@/stores/cartStore';
import type { Product } from '@/lib/models/ui';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }: { product: Product }) => {
  const { items, addItem, updateItem, isAdding, isUpdating } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const cartItem = items.find((i) => i.product_id === product.id);
  const isBusy = isAdding || isUpdating;

  const handleAdd = () => {
    if (!user) {
      // Pour une meilleure UX, on redirige vers le login
      navigate('/login');
      return;
    }
    addItem({ product_id: product.id, quantity: 1 });
  };

  const handleUpdate = (newQuantity: number) => {
    if (!cartItem) return;
    updateItem({ itemId: cartItem.id, data: { quantity: newQuantity } });
  };

  return (
    <div className="card-destination flex flex-col transition-all hover:border-primary/30">
      <div className="relative h-44 overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
        {!product.inStock && (
          <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
            <span className="flex items-center gap-1 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
              <AlertCircle className="w-4 h-4" /> Rupture de stock
            </span>
          </div>
        )}
        <span className="absolute top-2 right-2 bg-card/90 text-foreground text-xs px-2 py-1 rounded-full font-medium shadow-sm">
          {product.unit}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <span className="text-xs text-primary font-bold tracking-wider uppercase mb-1">{product.category}</span>
        <h3 className="font-extrabold text-base leading-tight mb-1">{product.name}</h3>
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
        <div className="mt-auto flex items-center justify-between border-t border-border/40 pt-3">
          <span className="font-black text-primary text-lg">{formatPrice(product.price)}</span>
          
          {cartItem ? (
            <div className="flex items-center gap-2">
              <button 
                disabled={isBusy}
                onClick={() => handleUpdate(cartItem.quantity - 1)} 
                className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors disabled:opacity-50"
              >
                <Minus className="w-3.5 h-3.5 text-primary" />
              </button>
              <span className="text-sm font-bold w-5 text-center">{cartItem.quantity}</span>
              <button 
                disabled={isBusy || cartItem.quantity >= (cartItem.stock_available ?? 99)}
                onClick={() => handleUpdate(cartItem.quantity + 1)} 
                className="w-7 h-7 rounded-full bg-primary flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50"
              >
                <Plus className="w-3.5 h-3.5 text-primary-foreground" />
              </button>
            </div>
          ) : (
            <button
              disabled={!product.inStock || isBusy}
              onClick={handleAdd}
              className="btn-primary text-xs py-1.5 px-4 rounded-lg font-bold disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
            >
              {!user ? "Se connecter" : "+ Ajouter"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
