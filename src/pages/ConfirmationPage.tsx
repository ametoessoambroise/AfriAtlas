import { useSearchParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ordersApi, deliveryApi } from "@/lib/api";
import {
  CheckCircle,
  Package,
  MapPin,
  Printer,
  ArrowRight,
} from "lucide-react";
import { formatPrice } from "@/stores/cartStore";

export default function ConfirmationPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderId = searchParams.get("orderId");

  const orderQuery = useQuery({
    queryKey: ["orders", orderId],
    queryFn: () => ordersApi.getOrderDetail(orderId!),
    enabled: !!orderId,
  });

  // Pour la démo, on récupère la dernière livraison de l'utilisateur
  const deliveryQuery = useQuery({
    queryKey: ["delivery", "last"],
    queryFn: () =>
      deliveryApi.listAddresses().then(() => {
        // Simulation: On récupère les livraisons (le snippet backend ne montrait pas listDeliveries mais je l'ai ajouté dans le client)
        //TODO: @ts-ignore - Mocking list logic if needed
        return {
          tracking_number:
            "ATL-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
        };
      }),
    enabled: !!orderId,
  });

  if (orderQuery.isLoading)
    return (
      <div className="p-20 text-center text-sm font-bold uppercase tracking-[0.22em] text-muted-foreground">
        Génération de votre reçu...
      </div>
    );

  const order = orderQuery.data;

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <div className="overflow-hidden rounded-[32px] border border-border bg-card shadow-sm">
        <div className="bg-primary p-12 text-center text-white">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[22px] bg-white/20">
            <CheckCircle className="h-10 w-10" />
          </div>
          <h1 className="mb-2 text-4xl font-black">
            Merci pour votre confiance !
          </h1>
          <p className="font-medium opacity-80">
            Votre commande #{orderId?.slice(0, 8)} est en cours de préparation.
          </p>
        </div>

        <div className="space-y-12 p-8 md:p-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-[24px] border border-border bg-surface-alt p-6">
              <div className="mb-4 flex items-center gap-3">
                <Package className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-black">Livraison Togo Express</h3>
              </div>
              <p className="mb-4 text-xs font-medium leading-relaxed text-muted-foreground">
                Votre colis sera expédié vers votre adresse de livraison. Suivez
                son trajet en temps réel.
              </p>
              <div className="rounded-2xl border border-border bg-background p-4">
                <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  N° de suivi
                </span>
                <span className="text-lg font-black tracking-[0.25em] text-primary">
                  {deliveryQuery.data?.tracking_number}
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-4">
              <button className="group flex items-center justify-between rounded-[18px] border border-border bg-background p-4 text-left transition-colors hover:bg-surface-alt">
                <div className="flex items-center gap-3">
                  <Printer className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-bold">Télécharger la facture</span>
                </div>
                <ArrowRight className="h-4 w-4 opacity-0 transition-all group-hover:opacity-100" />
              </button>
              <button
                onClick={() => navigate("/destinations")}
                className="group flex items-center justify-between rounded-[18px] border border-border bg-background p-4 text-left transition-colors hover:bg-surface-alt"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-bold">Explorer d’autres lieux</span>
                </div>
                <ArrowRight className="h-4 w-4 opacity-0 transition-all group-hover:opacity-100" />
              </button>
            </div>
          </div>

          <div className="border-t border-border pt-8">
            <h3 className="mb-6 text-lg font-black">Résumé du paiement</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Articles</span>
                <span className="font-bold">{formatPrice(Number(order?.total_price))}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Mode de paiement</span>
                <span className="font-bold">Stripe (Carte Bancaire)</span>
              </div>
              <div className="flex justify-between border-t border-dashed border-border pt-4 text-lg font-black">
                <span>Payé</span>
                <span className="text-primary">{formatPrice(Number(order?.total_price))}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border bg-surface-alt p-6 text-center">
          <p className="text-xs font-medium text-muted-foreground">
            Un email de confirmation contenant votre QR Code a été envoyé à
            votre adresse.
          </p>
        </div>
      </div>

      <p className="mt-12 text-center text-xs text-muted-foreground">
        Besoin d'aide ?{" "}
        <span className="cursor-pointer font-bold text-primary">Contactez le Support Client Atlas</span>
      </p>
    </div>
  );
}
