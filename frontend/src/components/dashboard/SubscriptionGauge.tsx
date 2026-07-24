import React, { memo } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CurrencyIcon, Crown } from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import { formatPrice } from "@/stores/cartStore";

interface SubscriptionGaugeProps {
  status?: string | null;
}

export const SubscriptionGauge = memo(({ status }: SubscriptionGaugeProps) => {
  const isPremium = status === "premium" || status === "active";

  return (
    <Card className="border border-border shadow-none h-full">
      <CardHeader className="pb-2 px-5 pt-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CurrencyIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-semibold text-foreground text-primary">Budget Voyage</span>
          </div>
          {isPremium && <Crown className="h-4 w-4 text-secondary fill-secondary" />}
          <Button variant="outline" size="sm" className="h-7 text-xs">
            Détails
          </Button>
        </div>

        <div className="mt-3">
          <p className="text-2xl font-bold text-foreground">{formatPrice(125000)}</p>
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mt-0.5">
            Estimation cumulée
          </p>
        </div>
      </CardHeader>

      <CardContent className="px-5 pb-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[10px] uppercase font-bold text-muted-foreground">Confirmé</p>
            <p className="text-base font-semibold text-foreground">{formatPrice(45000)}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-muted-foreground">En attente</p>
            <p className="text-base font-semibold text-foreground">{formatPrice(80000)}</p>
          </div>
        </div>

        {/* Circle Chart */}
        <div className="mt-4 h-[160px] w-full min-h-[160px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                contentStyle={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  fontSize: 10
                }}
              />
              <Pie
                dataKey="value"
                data={[
                  { name: "Confirmé", value: 45000 },
                  { name: "En attente", value: 80000 },
                ]}
                innerRadius={36}
                outerRadius={56}
                paddingAngle={4}
                startAngle={90}
                endAngle={-270}
              >
                <Cell key="confirmed" fill="var(--primary)" />
                <Cell key="pending" fill="var(--destructive)" opacity={0.6} />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
});
