import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Eye, Heart, Star, TrendingUp, Calendar, ChevronRight,
  AlertTriangle, Package, MapPin, Clock, ChevronDown,
  Loader2, RefreshCw, Gamepad2, CheckCircle2, XCircle,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from "recharts";
import { useAuth } from "@/hooks/useAuth";
import {
  useOwnerClaims,
  usePlaceAnalytics,
  useOwnerRecentBookings,
} from "@/hooks/queries/useOwnerDashboard";
import { Skeleton } from "@/components/ui/skeleton";
import type { OwnerRevenueListResponse, PlaceClaimResponse } from "@/lib/types";
import { useMyRevenues, useMyRevenueSummary } from "@/hooks/queries/useRevenues";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function fmt(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

function buildDays(count: number, base: number, variance: number): { day: string; value: number }[] {
  return Array.from({ length: count }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (count - 1 - i));
    return {
      day: d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" }),
      value: Math.max(0, Math.round(base + (Math.random() - 0.5) * variance)),
    };
  });
}

// ─── KPI Card ─────────────────────────────────────────────────────────────────
interface KpiCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  trend?: string;
  color: string;
}

function KpiCard({ icon, label, value, trend, color }: KpiCardProps) {
  return (
    <div className={`bg-zinc-900/60 border border-white/8 rounded-md p-5 flex flex-col gap-3 hover:border-white/15 transition-colors`}>
      <div className="flex items-center justify-between">
        <div className={`w-9 h-9 rounded-md flex items-center justify-center ${color}`}>
          {icon}
        </div>
        {trend && (
          <span className="text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
            {trend}
          </span>
        )}
      </div>
      <div>
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-xs text-white/40 mt-0.5">{label}</p>
      </div>
    </div>
  );
}

// ─── PlaceSwitcher ────────────────────────────────────────────────────────────
function PlaceSwitcher({
  claims,
  selected,
  onChange,
}: {
  claims: PlaceClaimResponse[];
  selected: PlaceClaimResponse | null;
  onChange: (c: PlaceClaimResponse) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 bg-zinc-900 border border-white/10 rounded-md px-4 py-2.5 text-sm text-white hover:border-white/20 transition-colors"
      >
        <MapPin className="h-3.5 w-3.5 text-amber-400" />
        <span className="font-medium">{selected?.place_name ?? "Choisir un lieu"}</span>
        <ChevronDown className="h-3.5 w-3.5 text-white/40 ml-1" />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-zinc-900 border border-white/10 rounded-md shadow-2xl z-20 overflow-hidden">
          {claims.map((c) => (
            <button
              key={c.id}
              onClick={() => { onChange(c); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-white/5 ${selected?.id === c.id ? "text-amber-300" : "text-white/70"}`}
            >
              <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="truncate">{c.place_name}</span>
              {selected?.id === c.id && <CheckCircle2 className="h-3.5 w-3.5 ml-auto text-amber-400 flex-shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── RevenueChart ─────────────────────────────────────────────────────────────
function RevenueChart({ history, isLoading }: { history: OwnerRevenueListResponse[] | undefined; isLoading: boolean }) {
  const chartData = (history ?? [])
    .map(r => ({ day: r.period_label, value: r.total_revenue }))
    .reverse(); // Standard ordering

  return (
    <div className={`bg-zinc-900/60 border border-white/8 rounded-md p-6 ${isLoading ? "animate-pulse" : ""}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-white">Revenus VR</h3>
          <p className="text-xs text-white/40 mt-0.5">Historique des périodes</p>
        </div>
        <TrendingUp className="h-5 w-5 text-emerald-400" />
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={chartData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
          <defs>
            <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 10 }} tickLine={false} axisLine={false} interval={0} />
          <YAxis tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 10 }} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#fff", fontSize: 12 }}
            formatter={(v: number) => [`${v} FCFA`, "Revenus"]}
          />
          <Area type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={2} fill="url(#revenueGrad)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}


// ─── ViewsChart ───────────────────────────────────────────────────────────────
function ViewsChart() {
  const data = buildDays(14, 350, 200);
  return (
    <div className="bg-zinc-900/60 border border-white/8 rounded-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-white">Vues par jour</h3>
          <p className="text-xs text-white/40 mt-0.5">14 derniers jours</p>
        </div>
        <Eye className="h-5 w-5 text-indigo-400" />
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 10 }} tickLine={false} axisLine={false} interval={2} />
          <YAxis tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 10 }} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#fff", fontSize: 12 }}
            formatter={(v: number) => [v, "Vues"]}
          />
          <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─── RecentBookings ───────────────────────────────────────────────────────────
function RecentBookings() {
  const { data: sessions, isLoading } = useOwnerRecentBookings();
  const items = (sessions as any)?.items ?? sessions ?? [];

  return (
    <div className="bg-zinc-900/60 border border-white/8 rounded-md p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold text-white flex items-center gap-2">
          <Gamepad2 className="h-4 w-4 text-indigo-400" />
          Dernières sessions VR
        </h3>
        <Link to="/vr-sessions" className="text-xs text-white/30 hover:text-white/60 flex items-center gap-1 transition-colors">
          Voir tout <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-14 w-full bg-white/5 rounded-md" />)}
        </div>
      ) : items.length === 0 ? (
        <p className="text-sm text-white/30 text-center py-6">Aucune session enregistrée.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {items.slice(0, 5).map((s: any) => (
            <div key={s.id} className="flex items-center gap-4 bg-white/4 hover:bg-white/6 border border-white/6 rounded-md px-4 py-3 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
                <Gamepad2 className="h-3.5 w-3.5 text-indigo-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{s.title ?? s.slug ?? "Session VR"}</p>
                <p className="text-xs text-white/30 flex items-center gap-1 mt-0.5">
                  <Clock className="h-3 w-3" />
                  {s.duration_minutes} min · {s.max_participants} places max
                </p>
              </div>
              <span className="text-sm font-bold text-white">{s.price} {s.currency}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── AlertsPanel ──────────────────────────────────────────────────────────────
function AlertsPanel({ claims }: { claims: PlaceClaimResponse[] }) {
  const pendingClaims = claims.filter((c) => c.status === "pending");
  const rejectedClaims = claims.filter((c) => c.status === "rejected");

  const alerts = [
    ...pendingClaims.map((c) => ({
      id: `claim-${c.id}`,
      type: "warn" as const,
      icon: <Clock className="h-4 w-4 text-amber-400" />,
      title: "Revendication en attente",
      desc: `${c.place_name} est en cours de vérification par notre équipe.`,
    })),
    ...rejectedClaims.map((c) => ({
      id: `rejected-${c.id}`,
      type: "error" as const,
      icon: <XCircle className="h-4 w-4 text-red-400" />,
      title: "Revendication refusée",
      desc: `${c.place_name} — ${c.admin_notes ?? "Contactez le support pour plus d'informations."}`,
    })),
  ];

  if (alerts.length === 0) {
    alerts.push({
      id: "ok",
      type: "warn",
      icon: <CheckCircle2 className="h-4 w-4 text-emerald-400" />,
      title: "Tout est en ordre",
      desc: "Aucune alerte en attente. Continuez comme ça !",
    });
  }

  return (
    <div className="bg-zinc-900/60 border border-white/8 rounded-md p-6">
      <h3 className="font-semibold text-white flex items-center gap-2 mb-5">
        <AlertTriangle className="h-4 w-4 text-amber-400" />
        Alertes & Notifications
      </h3>
      <div className="flex flex-col gap-3">
        {alerts.map((a) => (
          <div
            key={a.id}
            className={`flex items-start gap-3 p-3 rounded-md border ${
              a.type === "error"
                ? "bg-red-500/8 border-red-500/20"
                : a.id === "ok"
                ? "bg-emerald-500/8 border-emerald-500/20"
                : "bg-amber-500/8 border-amber-500/20"
            }`}
          >
            <div className="mt-0.5 flex-shrink-0">{a.icon}</div>
            <div>
              <p className="text-sm font-semibold text-white">{a.title}</p>
              <p className="text-xs text-white/50 mt-0.5 leading-relaxed">{a.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── OwnerWelcome ─────────────────────────────────────────────────────────────
function OwnerWelcome({ name, placeCount }: { name: string; placeCount: number }) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Bonjour" : hour < 18 ? "Bon après-midi" : "Bonsoir";
  return (
    <div>
      <h1 className="text-2xl font-bold text-white">
        {greeting}, <span className="text-amber-400">{name.split(" ")[0]}</span> 👋
      </h1>
      <p className="text-white/40 text-sm mt-1">
        Vous gérez <span className="text-white/70 font-medium">{placeCount} lieu{placeCount !== 1 ? "x" : ""}</span> sur Afriatlas.
      </p>
    </div>
  );
}

// ─── OwnerDashboardPage ───────────────────────────────────────────────────────
const OwnerDashboardPage = () => {
  const { user } = useAuth();
  const { data: claims, isLoading } = useOwnerClaims();
  const { data: revenueSummary, isLoading: summaryLoading } = useMyRevenueSummary();
  const { data: revenueHistory, isLoading: historyLoading } = useMyRevenues();
  const [selectedClaim, setSelectedClaim] = useState<PlaceClaimResponse | null>(null);

  const activeClaims = claims ?? [];
  const activeClaim = selectedClaim ?? activeClaims[0] ?? null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Derive analytics-like numbers from claim (stub until backend provides richer data)
  const analytics = {
    views: 4218, // Still stubbed as there's no owner-specific analytics hook for views yet
    favorites: 312,
    reviews: 87,
    revenue: revenueSummary ? formatCurrency(revenueSummary.total_gross_revenue) : "0 FCFA",
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-7 w-7 animate-spin text-amber-400" />
      </div>
    );
  }

  if (!activeClaims.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
          <MapPin className="h-7 w-7 text-amber-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white mb-2">Aucun lieu enregistré</h2>
          <p className="text-white/40 text-sm max-w-sm">Enregistrez votre premier lieu pour commencer à gérer vos statistiques.</p>
        </div>
        <Link
          to="/owner/places"
          className="bg-amber-500 hover:bg-amber-400 text-zinc-900 font-bold px-6 py-3 rounded-md transition-colors flex items-center gap-2 text-sm"
        >
          <Package className="h-4 w-4" />
          Enregistrer un lieu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">

      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <OwnerWelcome
          name={(user as any)?.fullname ?? "Propriétaire"}
          placeCount={activeClaims.length}
        />
        <PlaceSwitcher
          claims={activeClaims}
          selected={activeClaim}
          onChange={setSelectedClaim}
        />
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard icon={<Eye className="h-4 w-4 text-indigo-400" />} label="Vues totales" value={fmt(analytics.views)} trend="+12%" color="bg-indigo-500/15" />
        <KpiCard icon={<Heart className="h-4 w-4 text-rose-400" />} label="Favoris" value={fmt(analytics.favorites)} trend="+5%" color="bg-rose-500/15" />
        <KpiCard icon={<Star className="h-4 w-4 text-amber-400" />} label="Avis reçus" value={analytics.reviews} color="bg-amber-500/15" />
        <KpiCard icon={<TrendingUp className="h-4 w-4 text-emerald-400" />} label="Revenus VR" value={analytics.revenue} trend="+8%" color="bg-emerald-500/15" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart history={revenueHistory} isLoading={historyLoading} />
        <ViewsChart />
      </div>


      {/* Recent Bookings + Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentBookings />
        <AlertsPanel claims={activeClaims} />
      </div>

      {/* Active claim summary */}
      {activeClaim && (
        <div className="bg-zinc-900/60 border border-white/8 rounded-md p-6 flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="flex-1">
            <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Lieu sélectionné</p>
            <h3 className="text-lg font-bold text-white">{activeClaim.place_name}</h3>
            <p className="text-sm text-white/40 mt-1">
              {activeClaim.address_city ?? "—"} · {activeClaim.category}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${
              activeClaim.status === "approved"
                ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                : activeClaim.status === "pending"
                ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                : "bg-red-500/15 text-red-300 border-red-500/30"
            }`}>
              {activeClaim.status === "approved" ? "✓ Vérifié" : activeClaim.status === "pending" ? "⏳ En attente" : "✗ Refusé"}
            </span>
            <Link
              to={`/owner/places`}
              className="flex items-center gap-1 text-xs text-white/30 hover:text-white/60 transition-colors ml-3"
            >
              Gérer <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerDashboardPage;
