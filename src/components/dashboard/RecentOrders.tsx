import React, { memo } from "react";
import { ShoppingBag, ChevronRight, CheckCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { OrderResponse } from "@/lib/types/order";
import { formatCurrency, formatDate } from "@/lib/utils/formatters";

interface RecentOrdersProps {
  orders?: OrderResponse[];
  isLoading?: boolean;
}

export const RecentOrders = memo(({ orders, isLoading }: RecentOrdersProps) => {
  if (isLoading) {
    return (
      <div className="bg-card rounded-[32px] p-6 border border-border space-y-4 animate-pulse">
        <div className="w-1/3 h-4 bg-muted rounded" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex justify-between items-center">
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-muted rounded-xl" />
              <div className="space-y-2">
                <div className="w-24 h-3 bg-muted rounded" />
                <div className="w-16 h-2 bg-muted rounded" />
              </div>
            </div>
            <div className="w-12 h-4 bg-muted rounded" />
          </div>
        ))}
      </div>
    );
  }

  const items = orders?.slice(0, 5) || [];

  return (
    <div className="bg-card rounded-[32px] p-6 border border-border h-full shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-6">
        <p className="font-black text-foreground">Commandes Récentes</p>
        <Link
          to="/orders"
          className="text-primary hover:bg-primary/5 p-1.5 rounded-lg transition-all"
        >
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-4">
        {items.length > 0 ? (
          items.map((order) => (
            <Link
              key={order.id}
              to={`/orders/${order.id}`}
              className="flex items-center justify-between group focus:outline-none"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-muted border border-border flex items-center justify-center text-muted-foreground group-hover:bg-primary/5 group-hover:text-primary transition-all">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-black text-foreground group-hover:text-primary transition-colors">
                    #{order.id.substring(0, 8)}
                  </p>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                    {formatDate(order.created_at)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-black text-foreground">
                  {formatCurrency(Number(order.total_price))}
                </p>
                <div className="flex items-center gap-1 justify-end mt-0.5">
                  {order.status === "paid" ? (
                    <CheckCircle className="w-3 h-3 text-secondary" />
                  ) : (
                    <Clock className="w-3 h-3 text-amber-500" />
                  )}
                  <span
                    className={`text-[9px] font-black uppercase tracking-tighter ${order.status === "paid" ? "text-secondary" : "text-amber-500"}`}
                  >
                    {order.status === "paid" ? "Payé" : "En attente"}
                  </span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-8">
            <ShoppingBag className="w-8 h-8 text-muted mx-auto mb-2" />
            <p className="text-xs font-bold text-muted-foreground">
              Aucune commande récente
            </p>
          </div>
        )}
      </div>

      <Link
        to="/orders"
        className="w-full mt-6 py-3 rounded-2xl bg-muted text-xs font-black text-foreground hover:bg-border transition-all flex items-center justify-center gap-2"
      >
        Voir tout l'historique
      </Link>
    </div>
  );
});
