import React, { memo } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { OrderResponse } from "@/lib/types/order";
import { formatCurrency } from "@/lib/utils/formatters";

const statusStyles: Record<string, string> = {
  "paid": "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400",
  "pending": "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400",
  "cancelled": "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/20 dark:text-rose-400",
};

const statusLabels: Record<string, string> = {
  "paid": "Confirmé",
  "pending": "En attente",
  "cancelled": "Annulé",
};

interface RecentOrdersProps {
  orders?: OrderResponse[];
  isLoading?: boolean;
}

export const RecentOrders = memo(({ orders, isLoading }: RecentOrdersProps) => {
  const navigate = useNavigate();
  const items = orders?.slice(0, 8) || [];

  return (
    <Card className="border border-border shadow-none overflow-hidden">
      <CardHeader className="pb-2 px-6 pt-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-foreground uppercase tracking-wider">
            Dernières Commandes
          </span>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-7 text-[10px] font-black uppercase tracking-widest"
            onClick={() => navigate("/orders")}
          >
            Voir tout
          </Button>
        </div>
      </CardHeader>

      <CardContent className="px-6 pb-6">
        <div className="overflow-x-auto -mx-6 sm:mx-0">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-muted-foreground text-[10px] uppercase font-black tracking-widest text-left">
                <th className="px-4 pb-3">Référence</th>
                <th className="px-4 pb-3">Date</th>
                <th className="px-4 pb-3">Montant</th>
                <th className="px-4 pb-3">Statut</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-t border-border/50 animate-pulse">
                    <td colSpan={4} className="py-4 px-4"><div className="h-4 bg-muted rounded w-full" /></td>
                  </tr>
                ))
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-muted-foreground font-medium italic">
                    Aucune commande trouvée.
                  </td>
                </tr>
              ) : (
                items.map((r) => (
                  <tr 
                    key={r.id} 
                    className="border-t border-border/50 hover:bg-muted/30 transition-colors cursor-pointer"
                    onClick={() => navigate(`/orders/${r.id}`)}
                  >
                    <td className="py-4 px-4 font-black text-primary text-xs">
                      #{r.id.substring(0, 8).toUpperCase()}
                    </td>
                    <td className="py-4 px-4 text-[11px] font-bold text-muted-foreground">
                      {new Date(r.created_at).toLocaleDateString("fr-FR")}
                    </td>
                    <td className="py-4 px-4 font-extrabold text-foreground">
                      {formatCurrency(Number(r.total_price))}
                    </td>
                    <td className="py-4 px-4">
                      <Badge 
                        variant="outline"
                        className={`text-[9px] font-black uppercase py-0.5 px-2 tracking-tighter ${statusStyles[r.status] ?? ""}`}
                      >
                        {statusLabels[r.status] || r.status}
                      </Badge>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
});
