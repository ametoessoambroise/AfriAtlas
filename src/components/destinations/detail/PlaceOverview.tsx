import { BookOpen, Users, Map as MapIcon, Utensils, Tag } from "lucide-react";
import { motion } from "framer-motion";
import type { Destination } from "@/lib/models/ui";

interface PlaceOverviewProps {
  destination: Destination;
}

const FEATURE_ICON_MAP: Record<string, React.ElementType> = {
  histoire: BookOpen,
  history: BookOpen,
  culture: Users,
  paysages: MapIcon,
  landscape: MapIcon,
  gastronomie: Utensils,
  gastronomy: Utensils,
};

const FEATURE_COLOR_MAP: Record<
  string,
  { color: string; bg: string }
> = {
  histoire: { color: "text-emerald-600", bg: "bg-emerald-50" },
  history: { color: "text-emerald-600", bg: "bg-emerald-50" },
  culture: { color: "text-purple-600", bg: "bg-purple-50" },
  paysages: { color: "text-blue-600", bg: "bg-blue-50" },
  landscape: { color: "text-blue-600", bg: "bg-blue-50" },
  gastronomie: { color: "text-orange-600", bg: "bg-orange-50" },
  gastronomy: { color: "text-orange-600", bg: "bg-orange-50" },
};

const PLACEHOLDER_IMAGE = "/placeholder.png";

export default function PlaceOverview({ destination }: PlaceOverviewProps) {
  const features = destination.features ?? [];

  return (
    <div className="space-y-12">
      <div>
        <h2 className="mb-6 text-3xl font-extrabold tracking-tight">
          À propos de {destination.name}
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
          {destination.longDescription}
        </p>
      </div>

      {features.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => {
            const typeKey = feature.feature_type.toLowerCase();
            const Icon = FEATURE_ICON_MAP[typeKey] ?? Tag;
            const { color, bg } = FEATURE_COLOR_MAP[typeKey] ?? {
              color: "text-primary",
              bg: "bg-primary/10",
            };

            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col rounded-[2rem] border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/20"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-2xl ${bg}`}>
                    <Icon className={`h-6 w-6 ${color}`} />
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                </div>

                <p className="text-muted-foreground leading-relaxed text-sm mb-6 flex-grow">
                  {feature.description}
                </p>

                <div className="relative h-40 w-full overflow-hidden rounded-2xl">
                  <img
                    src={feature.image_url ?? PLACEHOLDER_IMAGE}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        PLACEHOLDER_IMAGE;
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground italic">
          Aucun aperçu disponible pour ce lieu.
        </p>
      )}
    </div>
  );
}
