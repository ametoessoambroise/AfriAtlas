import React, { useState } from "react";
import { Loader2, PackageX, Plus } from "lucide-react";
import { useOrders } from "@/hooks/queries/useOrders";
import { OrderCard } from "@/components/orders/OrderCard";
import type { OrderStatus } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useNavigate } from "react-router-dom";

export default function OrdersPage() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");

  const { data, isLoading, error } = useOrders(
    statusFilter === "all" ? null : statusFilter,
    1,
  );

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6 animate-in fade-in duration-700">
        {/* ── PAGE HEADER ─────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-black text-foreground tracking-tight uppercase">
              Mes <span className="text-primary">Commandes</span>
            </h1>
            <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest mt-1 opacity-70">
              Suivez vos achats de la boutique et vos souvenirs.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate("/destinations")}
              className="flex items-center hover:bg-primary/90 transition-all gap-2 px-4 py-2.5 rounded-md border border-border bg-primary text-primary-foreground text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/10"
            >
              <Plus className="w-4 h-4" /> Boutique
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 pb-2 animate-in slide-in-from-bottom-4 duration-500 delay-100">
          {[
            { id: "all", label: "Toutes" },
            { id: "pending", label: "En attente" },
            { id: "paid", label: "Payées" },
            { id: "processing", label: "Préparation" },
            { id: "completed", label: "Livrées" },
          ].map((filter) => (
            <Button
              key={filter.id}
              variant={statusFilter === filter.id ? "default" : "outline"}
              className="rounded-md px-6 text-xs font-black uppercase tracking-widest h-10 transition-all duration-300"
              onClick={() => setStatusFilter(filter.id as OrderStatus | "all")}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        <div className="animate-in slide-in-from-bottom-4 duration-500 delay-200">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center p-12 bg-destructive/5 rounded-md border border-destructive/10">
              <p className="text-destructive font-bold uppercase tracking-widest text-xs">
                Erreur lors de la récupération de vos commandes.
              </p>
            </div>
          ) : data?.items?.length === 0 ? (
            <div className="text-center p-20 bg-muted/20 rounded-md border-2 border-dashed border-border/50">
              <div className="h-20 w-20 bg-muted rounded-md flex items-center justify-center mx-auto mb-6">
                <PackageX className="h-10 w-10 text-muted-foreground/30" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight mb-2">Aucune commande</h3>
              <p className="text-muted-foreground text-sm font-medium max-w-md mx-auto">
                Vous n'avez passé aucune commande dans la boutique (ou aucune ne
                correspond au filtre).
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {data?.items?.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
