// ---------------------------------------------------------------------------

// c:\Users\Dell-Laptop\Downloads\atlas-voyages\atlas-voyages-main\frontend\src\components\dashboard\RecentOrders.tsx
import { OrderListResponse } from "@/lib/types/order";
import { ShoppingBag, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface RecentOrdersProps {
  orders: OrderListResponse[];
}

export function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-black flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-primary" />
          Commandes Récentes
        </h3>
      </div>
      <div className="bg-card border border-border rounded-[32px] overflow-hidden">
        {orders.length > 0 ? (
          <div className="divide-y divide-border">
            {orders.slice(0, 3).map((order) => (
              <Link key={order.id} to={`/orders/${order.id}`} className="flex items-center justify-between p-4 hover:bg-surface-alt transition-colors">
                <div>
                   <p className="font-bold text-sm">Commande #{order.id.slice(0, 8)}</p>
                   <p className="text-[10px] text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-3">
                   <div className="text-right">
                      <p className="font-black text-sm">{parseInt(order.total_price).toLocaleString()} {order.currency}</p>
                      <span className={`text-[9px] font-black uppercase tracking-widest ${
                        order.status === "paid" || order.status === "completed" ? "text-green-500" : "text-yellow-600"
                      }`}>
                        {order.status}
                      </span>
                   </div>
                   <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-muted-foreground italic text-sm">
             Aucune commande pour le moment.
          </div>
        )}
      </div>
    </div>
  );
}

