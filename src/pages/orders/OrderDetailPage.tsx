import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ChevronLeft, PackageCheck, MapPin, Euro, Truck, XCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOrderDetail, useCancelOrder } from "@/hooks/queries/useOrders";
import { Skeleton } from "@/components/ui/skeleton";
import { OrderStatusBadge } from "@/components/orders/OrderStatusBadge";

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: order, isLoading, error } = useOrderDetail(id || "");
  const { mutateAsync: cancelOrder, isPending: cancelling } = useCancelOrder();

  const handleCancel = async () => {
    if (!id) return;
    if (confirm("Êtes-vous sûr de vouloir annuler cette commande ? (Si payée, un remboursement sera initié)")) {
      try {
        await cancelOrder(id);
      } catch (err) {
        // Error handled in hook
      }
    }
  };

  if (isLoading) {
    return (
      <div className="container py-8 max-w-4xl mx-auto space-y-8">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-96 w-full rounded-3xl" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold">Commande introuvable</h1>
        <Button asChild className="mt-8 rounded-xl" variant="outline">
          <Link to="/orders">Retour à mes commandes</Link>
        </Button>
      </div>
    );
  }

  const date = new Date(order.created_at);

  return (
    <div className="container py-8 px-4 md:px-8 mx-auto max-w-4xl space-y-8">
      <Button asChild variant="ghost" className="gap-2 rounded-xl text-muted-foreground hover:text-foreground">
        <Link to="/orders">
          <ChevronLeft className="h-4 w-4" />
          Toutes les commandes
        </Link>
      </Button>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row gap-6 md:items-end justify-between border-b border-border pb-6">
          <div>
            <h1 className="text-3xl font-black mb-2">Commande #{order.id.split("-").pop()?.toUpperCase()}</h1>
            <p className="text-muted-foreground">
              Passée le {date.toLocaleDateString("fr-FR", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          <div className="shrink-0 scale-150 origin-left md:origin-right">
             <OrderStatusBadge status={order.status} />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            <div className="bg-card border border-border shadow-sm rounded-3xl p-6 md:p-8">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <PackageCheck className="h-5 w-5 text-primary" />
                Articles commandés
              </h2>
              
              <div className="space-y-4">
                {order.items?.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center justify-between py-4 border-b border-border/50 last:border-0 last:pb-0">
                    <div>
                      <p className="font-bold">Article ID: {item.product_id}</p>
                      <p className="text-sm text-muted-foreground">Quantité: {item.quantity} x {parseFloat(item.unit_price).toFixed(2)} {order.currency || "€"}</p>
                    </div>
                    <div className="font-bold">
                      {parseFloat(item.total_price).toFixed(2)} {order.currency || "€"}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-6 mt-4 border-t border-border">
                <span className="text-muted-foreground font-medium text-lg">Total</span>
                <span className="text-2xl font-black text-primary">
                  {order.total_price ? parseFloat(order.total_price).toFixed(2) : "0.00"} {order.currency || "€"}
                </span>
              </div>
            </div>

            {/* Address */}
            <div className="bg-card border border-border shadow-sm rounded-3xl p-8">
               <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                 <Truck className="h-5 w-5 text-primary" />
                 Détails de Livraison
               </h2>
               <div className="space-y-2 text-muted-foreground bg-muted/40 p-4 rounded-xl">
                 {order.shipping_address ? (
                   <pre className="font-sans whitespace-pre-wrap">{JSON.stringify(order.shipping_address, null, 2)}</pre>
                 ) : (
                   <p className="text-sm italic">Aucune adresse de livraison enregistrée. (Produit dématérialisé ou en magasin).</p>
                 )}
               </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-muted/40 border border-border p-6 rounded-3xl">
              <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Actions</h3>
              <div className="space-y-3">
                {order.status === "pending" && (
                  <Button className="w-full rounded-xl gap-2 font-bold bg-green-600 hover:bg-green-700 text-white">
                     <Euro className="h-4 w-4" /> Finaliser le paiement
                  </Button>
                )}
                
                {(order.status === "pending" || order.status === "paid") && (
                  <Button 
                    variant="outline" 
                    className="w-full rounded-xl text-red-600 hover:bg-red-500 hover:text-white border-red-500/20 hover:border-red-500"
                    onClick={handleCancel}
                    disabled={cancelling}
                  >
                    {cancelling ? <Loader2 className="h-4 w-4 animate-spin" /> : "Annuler la commande"}
                  </Button>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
