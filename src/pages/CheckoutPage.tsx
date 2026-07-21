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

  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null,
  );
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);

  // Recalculer les frais dès que l'adresse change
  useEffect(() => {
    if (selectedAddressId && subtotal > 0) {
      estimateFee({
        address_id: selectedAddressId,
        order_total: Number(subtotal),
        delivery_type: "standard",
      })
        .then((res) => setDeliveryFee(res.total_fee))
        .catch(() =>
          toast.error("Erreur lors du calcul des frais de livraison."),
        );
    }
  }, [selectedAddressId, subtotal, estimateFee]);

  const handlePaymentSuccess = async (paymentIntentId: string) => {
    if (!selectedAddressId) return;

    setIsProcessingOrder(true);
    try {
      // 1. Créer la commande
      const order = await ordersApi.createNewOrder({
        items: items.map((it) => ({
          product_id: it.product_id,
          quantity: it.quantity,
          unit_price: String(it.unit_price),
        })),
      });

      // 2. Créer la demande de livraison (frais payés séparément selon consigne utilisateur)
      await deliveryApi.createDelivery({
        order_id: order.id,
        address_id: selectedAddressId,
        delivery_type: "standard",
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
      <div className="min-h-screen bg-background pb-24 pt-12">
        <div className="mx-auto max-w-7xl px-6">
          <button
            onClick={() => navigate("/cart")}
            className="group mb-8 flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-xs font-bold uppercase tracking-[0.22em]">
              Retour au panier
            </span>
          </button>

          <div className="mb-8 rounded-[28px] border border-border bg-card p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.24em] text-primary">
                  Finaliser votre réservation
                </p>
                <h1 className="mt-2 text-3xl font-black tracking-tight text-foreground md:text-4xl">
                  Paiement et livraison
                </h1>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                  1. Adresse
                </span>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                  2. Paiement
                </span>
                <span className="rounded-full bg-muted px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                  3. Confirmation
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="space-y-12 lg:col-span-7">
              <section className="rounded-[24px] border border-border bg-card p-8 shadow-sm">
                <DeliveryForm
                  selectedAddressId={selectedAddressId}
                  onAddressSelect={setSelectedAddressId}
                />
              </section>

              <section
                className={`rounded-[24px] border border-border bg-card p-8 shadow-sm transition-opacity ${!selectedAddressId ? "pointer-events-none opacity-30" : ""}`}
              >
                <StripePaymentForm
                  total={
                    Number(subtotal) + Number(subtotal) * 0.18 + deliveryFee
                  }
                  onSuccess={handlePaymentSuccess}
                  isLoading={isProcessingOrder}
                />
              </section>

              <div className="flex flex-wrap items-center justify-center gap-8 border-t border-dashed border-border py-4">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-green-500" />
                  SSL 256-bit Secure
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-muted-foreground">
                  <Truck className="h-4 w-4 text-primary" />
                  Logistique Togo Express
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="sticky top-24">
                <OrderSummary
                  items={items}
                  subtotal={Number(subtotal)}
                  deliveryFee={deliveryFee}
                />

                <div className="mt-6 rounded-[22px] border border-primary/10 bg-primary/5 p-6">
                  <p className="text-xs font-medium leading-relaxed text-primary">
                    <span className="font-black italic">Note sur la livraison :</span>{" "}
                    Les frais de livraison ({deliveryFee} XOF) seront réglés
                    séparément lors de la remise du colis au transporteur ou via
                    mobile money.
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
