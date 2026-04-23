import React, { useState } from "react";
import { Loader2, PackageX } from "lucide-react";
import { useOrders } from "@/hooks/queries/useOrders";
import { OrderCard } from "@/components/orders/OrderCard";
import type { OrderStatus } from "@/lib/types";
import { Button } from "@/components/ui/button";

export default function OrdersPage() {
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");

  const { data, isLoading, error } = useOrders(
    statusFilter === "all" ? null : statusFilter,
    1,
  );

  return (
    <div className="container py-12 px-4 md:px-8 mx-auto max-w-5xl space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-primary">
          Mes Commandes
        </h1>
        <p className="text-lg text-muted-foreground">
          Suivez vos achats de la boutique, vos souvenirs et vos livraisons.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 pb-4">
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
            className="rounded-full px-6"
            onClick={() => setStatusFilter(filter.id as OrderStatus | "all")}
          >
            {filter.label}
          </Button>
        ))}
      </div>

      <div>
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center p-12 bg-red-500/10 rounded-3xl border border-red-500/20">
            <p className="text-red-500 font-medium">
              Erreur lors de la récupération de vos commandes.
            </p>
          </div>
        ) : data?.items?.length === 0 ? (
          <div className="text-center p-20 bg-muted/30 rounded-3xl border-2 border-dashed border-border/50">
            <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <PackageX className="h-10 w-10 text-muted-foreground/30" />
            </div>
            <h3 className="text-xl font-bold mb-2">Aucune commande</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Vous n'avez passé aucune commande dans la boutique (ou aucune ne
              correspond au filtre).
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {data?.items?.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
