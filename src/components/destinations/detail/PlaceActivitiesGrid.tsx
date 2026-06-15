import { motion } from "framer-motion";
import { ChevronRight, BarChart } from "lucide-react";
import type { Destination } from "@/lib/models/ui";

interface PlaceActivitiesGridProps {
  destination: Destination;
}

const PLACEHOLDER_IMAGE = "/placeholder.png";

export default function PlaceActivitiesGrid({
  destination,
}: PlaceActivitiesGridProps) {
  const activities = destination.activities ?? [];

  if (activities.length === 0) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2.5 rounded-xl">
            <ChevronRight className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight">
            Activités à faire
          </h2>
        </div>
        <p className="text-sm text-muted-foreground italic">
          Aucune activité enregistrée pour ce lieu.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="flex items-end justify-between gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2.5 rounded-xl">
              <ChevronRight className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Activités à faire
            </h2>
          </div>
          <p className="text-muted-foreground">
            Vivez des expériences inoubliables au cœur de la nature.
          </p>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-3">
        {/* Left: Activities Grid */}
        <div className="lg:col-span-2 grid gap-6 sm:grid-cols-2">
          {activities.map((activity, i) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col rounded-[2rem] border border-border bg-card overflow-hidden transition-all hover:shadow-lg"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={activity.image_url ?? PLACEHOLDER_IMAGE}
                  alt={activity.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      PLACEHOLDER_IMAGE;
                  }}
                />
                {activity.status && (
                  <div className="absolute top-4 left-4">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full backdrop-blur-md border ${
                        activity.status === "safe"
                          ? "bg-emerald-500/80 text-white border-emerald-400/50"
                          : "bg-primary/80 text-white border-primary/40"
                      }`}
                    >
                      {activity.status === "safe" ? "Sécurisé" : "Recommandé"}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-bold mb-2">{activity.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-grow">
                  {activity.description}
                </p>

                {activity.level && (
                  <div className="flex items-center gap-2 text-[11px] font-bold text-primary bg-primary/5 px-3 py-1.5 rounded-lg w-fit">
                    {activity.level}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right: Activities Period Table */}
        <div className="lg:col-span-1 rounded-[2rem] border border-border bg-surface-alt overflow-hidden flex flex-col h-full">
          <div className="p-6 border-b border-border bg-background/50 flex items-center gap-3">
            <BarChart className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-bold">Période idéale</h3>
          </div>
          <div className="overflow-x-auto flex-grow">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-muted-foreground text-[10px] font-semibold border-b border-border/50">
                  <th className="px-4 py-4 text-left font-semibold">
                    Activité
                  </th>
                  <th className="px-4 py-4 text-left font-semibold">Période</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {activities.map((activity) => (
                  <tr
                    key={activity.id}
                    className="hover:bg-background/40 transition-colors"
                  >
                    <td className="px-4 py-4 font-medium">{activity.title}</td>
                    <td className="px-4 py-4 text-muted-foreground">
                      {activity.period ?? "–"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-primary/5 border-t border-border">
            <p className="text-[10px] text-primary/70 italic text-center">
              Planifiez vos sorties selon ces recommandations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
