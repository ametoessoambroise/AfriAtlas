import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ChevronLeft, PackageCheck, MapPin, Euro, Truck, XCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOrderDetail, useCancelOrder } from "@/hooks/queries/useOrders";
import { Skeleton } from "@/components/ui/skeleton";
import { OrderStatusBadge } from "@/components/orders/OrderStatusBadge";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

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
      <DashboardLayout>
        <div className="p-6 lg:p-8 space-y-6">
          <Skeleton className="h-10 w-48 rounded-md" />
          <Skeleton className="h-[600px] w-full rounded-md" />
        </div>
      </DashboardLayout>
    );
  }

  if (error || !order) {
    return (
      <DashboardLayout>
        <div className="p-6 lg:p-8 text-center space-y-4">
          <h1 className="text-2xl font-black uppercase tracking-tight">Commande introuvable</h1>
          <Button asChild className="rounded-md px-8 h-12 font-black uppercase tracking-widest text-xs" variant="outline">
            <Link to="/orders">Retour à mes commandes</Link>
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const date = new Date(order.created_at);

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6 animate-in fade-in duration-700">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-2">
          <button
            onClick={() => navigate("/orders")}
            className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-bold text-xs uppercase tracking-widest w-fit"
          >
            <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:border-primary/50 transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </div>
            Toutes les commandes
          </button>

          <div className="flex flex-col md:flex-row gap-6 md:items-end justify-between">
            <div>
              <h1 className="text-2xl font-black text-foreground tracking-tight uppercase">
                Commande <span className="text-primary">#{order.id.split("-").pop()?.toUpperCase()}</span>
              </h1>
              <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest mt-1 opacity-70">
                Passée le {date.toLocaleDateString("fr-FR", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            <div className="shrink-0">
               <OrderStatusBadge status={order.status} />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start animate-in slide-in-from-bottom-4 duration-500 delay-100">
          
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-card border border-border shadow-sm rounded-md p-8 md:p-10">
              <h2 className="text-xl font-black uppercase tracking-tight mb-8 flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center text-primary shadow-sm">
                  <PackageCheck className="h-5 w-5" />
                </div>
                Articles commandés
              </h2>
              
              <div className="space-y-2">
                {order.items?.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center justify-between py-6 border-b border-border/50 last:border-0">
                    <div>
                      <p className="font-black text-sm tracking-tight">Article ID: {item.product_id}</p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-1">Quantité: {item.quantity} x {parseFloat(item.unit_price).toFixed(2)} {order.currency || "€"}</p>
                    </div>
                    <div className="font-black text-lg">
                      {parseFloat(item.total_price).toFixed(2)} {order.currency || "€"}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-8 mt-4 border-t border-border/60">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Total de la commande</span>
                <span className="text-3xl font-black text-primary">
                  {order.total_price ? parseFloat(order.total_price).toFixed(2) : "0.00"} {order.currency || "€"}
                </span>
              </div>
            </div>

            {/* Address */}
            <div className="bg-card border border-border shadow-sm rounded-md p-8 md:p-10">
               <h2 className="text-xl font-black uppercase tracking-tight mb-6 flex items-center gap-3">
                 <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center text-primary shadow-sm">
                  <Truck className="h-5 w-5" />
                 </div>
                 Livraison
               </h2>
               <div className="space-y-2 text-muted-foreground bg-muted/20 p-6 rounded-md border border-border/50">
                 {order.shipping_address ? (
                   <pre className="font-bold text-xs leading-relaxed uppercase tracking-widest">{JSON.stringify(order.shipping_address, null, 2)}</pre>
                 ) : (
                   <p className="text-xs font-black uppercase tracking-widest italic opacity-60">Aucune adresse de livraison enregistrée.</p>
                 )}
               </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card border border-border p-8 rounded-md shadow-sm">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-6">Actions disponibles</h3>
              <div className="space-y-3">
                {order.status === "pending" && (
                  <Button className="w-full h-12 rounded-md gap-2 font-black uppercase tracking-widest text-xs bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/20 transition-all">
                     <Euro className="h-4 w-4" /> Finaliser le paiement
                  </Button>
                )}
                
                {(order.status === "pending" || order.status === "paid") && (
                  <Button 
                    variant="outline" 
                    className="w-full h-12 rounded-md font-black uppercase tracking-widest text-xs text-red-600 border-red-500/20 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
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
    </DashboardLayout>
  );
}
