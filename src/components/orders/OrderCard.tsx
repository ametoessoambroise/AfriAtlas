import React from "react";
import { Link } from "react-router-dom";
import { Calendar, ChevronRight, ShoppingBag, Euro } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { OrderListResponse } from "@/lib/types";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface OrderCardProps {
  order: OrderListResponse;
}

export function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="bg-card border border-border rounded-md p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6 items-center">
      <div className="h-20 w-20 bg-primary/10 text-primary rounded-md flex items-center justify-center shrink-0">
        <ShoppingBag className="h-8 w-8" />
      </div>

      <div className="flex-1 flex flex-col min-w-0 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
          <h3 className="font-bold text-lg truncate">Commande #{order.id.split("-").pop()?.toUpperCase()}</h3>
          <div className="shrink-0 flex items-center justify-between sm:justify-end w-full sm:w-auto">
            <OrderStatusBadge status={order.status} />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-muted-foreground mt-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{format(new Date(order.created_at), "dd MMM yyyy", { locale: fr })}</span>
          </div>
          <div className="flex items-center gap-1.5 text-foreground font-extrabold text-base">
            <span>{parseFloat(order.total_price).toFixed(2)} {order.currency || "€"}</span>
          </div>
        </div>
      </div>

      <div className="w-full md:w-auto shrink-0 flex justify-end">
        <Button asChild variant="outline" className="w-full md:w-auto rounded-md">
          <Link to={`/orders/${order.id}`}>
            Voir la commande
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
