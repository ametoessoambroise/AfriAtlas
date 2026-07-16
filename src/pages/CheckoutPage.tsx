import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/queries/useCart";
import { useDelivery } from "@/hooks/queries/useDelivery";
import { ordersApi, deliveryApi } from "@/lib/api";
import { StripeProvider } from "@/providers/StripeProvider";
import OrderSummary from "@/components/checkout/OrderSummary";
import DeliveryForm from "@/components/checkout/DeliveryForm";
import StripePaymentForm from "@/components/checkout/StripePaymentForm";
import { ArrowLeft, ShieldCheck, Truck } from "lucide-react";
import { toast } from "sonner";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const { estimateFee } = useDelivery();
  
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);

  // Recalculer les frais dès que l'adresse change
  useEffect(() => {
    if (selectedAddressId && subtotal > 0) {
      estimateFee({ 
        address_id: selectedAddressId, 
        order_total: Number(subtotal),
        delivery_type: "standard" 
      })
      .then(res => setDeliveryFee(res.total_fee))
      .catch(() => toast.error("Erreur lors du calcul des frais de livraison."));
    }
  }, [selectedAddressId, subtotal, estimateFee]);

  const handlePaymentSuccess = async (paymentIntentId: string) => {
    if (!selectedAddressId) return;
    
    setIsProcessingOrder(true);
    try {
      // 1. Créer la commande
      const order = await ordersApi.createNewOrder({
        items: items.map(it => ({
          product_id: it.product_id,
          quantity: it.quantity,
          unit_price: String(it.unit_price)
        }))
      });

      // 2. Créer la demande de livraison (frais payés séparément selon consigne utilisateur)
      await deliveryApi.createDelivery({
        order_id: order.id,
        address_id: selectedAddressId,
        delivery_type: "standard"
      });

      // 3. Vider le panier et rediriger
      clearCart();
      toast.success("Commande confirmée !");
      navigate(`/checkout/confirm?orderId=${order.id}`);
      
    } catch (err) {
      toast.error("Erreur lors de la création de la commande.");
    } finally {
      setIsProcessingOrder(false);
    }
  };

  if (items.length === 0) {
     return null; // Redirection auto ou message
  }

  return (
    <StripeProvider>
      <div className="bg-surface pt-12 pb-24 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <button 
            onClick={() => navigate("/cart")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-widest">Retour au panier</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Formulaires (Gauche) */}
            <div className="lg:col-span-7 space-y-12">
              <section className="bg-card p-8 rounded-md border border-border shadow-sm">
                 <DeliveryForm 
                   selectedAddressId={selectedAddressId}
                   onAddressSelect={setSelectedAddressId}
                 />
              </section>

              <section className={`bg-card p-8 rounded-md border border-border shadow-sm transition-opacity ${!selectedAddressId ? 'opacity-30 pointer-events-none' : ''}`}>
                 <StripePaymentForm 
                   total={Number(subtotal) + (Number(subtotal) * 0.18) + deliveryFee}
                   onSuccess={handlePaymentSuccess}
                   isLoading={isProcessingOrder}
                 />
              </section>
              
              <div className="flex items-center justify-center gap-8 py-4 border-t border-dashed border-border">
                 <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-muted-foreground">
                    <ShieldCheck className="w-4 h-4 text-green-500" />
                    SSL 256-bit Secure
                 </div>
                 <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-muted-foreground">
                    <Truck className="w-4 h-4 text-primary" />
                    Logistique Togo Express
                 </div>
              </div>
            </div>

            {/* Récapitulatif (Droite) */}
            <div className="lg:col-span-5">
              <div className="sticky top-24">
                <OrderSummary 
                  items={items}
                  subtotal={Number(subtotal)}
                  deliveryFee={deliveryFee}
                />
                
                <div className="mt-6 p-6 bg-primary/5 rounded-md border border-primary/10">
                   <p className="text-xs text-primary font-medium leading-relaxed">
                     <span className="font-black italic">Note sur la livraison :</span> Les frais de livraison ({deliveryFee} XOF) seront réglés séparément lors de la remise du colis au transporteur ou via mobile money.
                   </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StripeProvider>
  );
}
