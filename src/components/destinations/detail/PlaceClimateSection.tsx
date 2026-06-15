import { Thermometer, CloudRain, Droplets, Sun, Clock, Star } from "lucide-react";
import { motion } from "framer-motion";
import type { Destination } from "@/lib/models/ui";
import type { ClimateSeasonalityEntry, ClimateBestTimingEntry } from "@/lib/types";

interface PlaceClimateSectionProps {
  destination: Destination;
}

const MONTH_LABELS = [
  "Jan", "Fév", "Mars", "Avril", "Mai", "Juin",
  "Juil", "Août", "Sept", "Oct", "Nov", "Déc",
];

/**
 * Default seasonality used when the backend has no data for this place yet.
 */
const DEFAULT_SEASONALITY: ClimateSeasonalityEntry[] = MONTH_LABELS.map(
  (month) => ({ month, status: "favorable" }),
);

export default function PlaceClimateSection({ destination }: PlaceClimateSectionProps) {
  const climate = destination.climate;

  // Climate stat boxes — fall back to generic values when backend has no data
  const stats = [
    {
      label: "Température",
      value: climate?.temperature_range ?? "–",
      icon: Thermometer,
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
    {
      label: "Pluviométrie",
      value: climate?.rainfall_yearly ?? "–",
      icon: CloudRain,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      label: "Humidité",
      value: climate?.humidity_range ?? "–",
      icon: Droplets,
      color: "text-cyan-500",
      bg: "bg-cyan-50",
    },
    {
      label: "Ensoleillement",
      value: climate?.sunshine_hours ?? "–",
      icon: Sun,
      color: "text-yellow-500",
      bg: "bg-yellow-50",
    },
  ];

  const seasonality: ClimateSeasonalityEntry[] =
    climate?.seasonality?.length ? climate.seasonality : DEFAULT_SEASONALITY;

  const timing: ClimateBestTimingEntry[] = climate?.best_timings ?? [];

  const hasClimate = !!climate;

  return (
    <div className="space-y-12">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left: Climate Stats */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2.5 rounded-xl">
              <Sun className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Climat</h2>
          </div>
          {hasClimate ? (
            <p className="text-sm text-muted-foreground leading-relaxed">
              Données climatiques spécifiques à {destination.name}.
            </p>
          ) : (
            <p className="text-sm text-muted-foreground leading-relaxed">
              Climat équatorial avec une température agréable toute l'année et une forte humidité.
            </p>
          )}

          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-3 p-3 rounded-2xl bg-surface-alt border border-border/50"
              >
                <div className={`p-1.5 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground font-medium uppercase">
                    {stat.label}
                  </p>
                  <p className="text-xs font-bold">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center: Best Period */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-100 p-2.5 rounded-xl">
              <Star className="h-6 w-6 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold">Meilleure période</h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            La période idéale pour visiter {destination.name} se situe entre
            novembre et mars.
          </p>

          <div className="bg-card border border-border rounded-3xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-5 overflow-x-auto no-scrollbar pb-2">
              {seasonality.map((s) => (
                <div
                  key={s.month}
                  className="flex flex-col items-center gap-2.5 shrink-0 px-1"
                >
                  <span className="text-[9px] font-bold text-muted-foreground uppercase">
                    {s.month}
                  </span>
                  <div
                    className={`h-2.5 w-2.5 rounded-full ${
                      s.status === "ideal"
                        ? "bg-emerald-500"
                        : s.status === "favorable"
                          ? "bg-yellow-400"
                          : "bg-slate-200"
                    }`}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 text-[10px] font-medium">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-emerald-500" /> Idéal
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-yellow-400" /> Favorable
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-slate-200" /> À éviter
              </div>
            </div>
          </div>
        </div>

        {/* Right: Timing */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-50 p-2.5 rounded-xl">
              <Clock className="h-6 w-6 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold">À quel moment partir ?</h2>
          </div>

          {timing.length > 0 ? (
            <div className="space-y-4">
              {timing.map((item) => (
                <motion.div
                  key={item.range}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 p-3 rounded-2xl border border-border bg-card/50"
                >
                  <div className="bg-emerald-100 p-1.5 rounded-lg shrink-0 mt-0.5">
                    <Clock className="h-3.5 w-3.5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{item.range}</p>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      {item.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              Aucune recommandation d'horaire disponible.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
