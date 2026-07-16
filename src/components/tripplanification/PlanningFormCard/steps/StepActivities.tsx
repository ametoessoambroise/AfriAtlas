import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { TripDraft } from "@/lib/types/trip_planning";
import { cn } from "@/lib/utils";

interface StepActivitiesProps {
  draft: TripDraft;
  updateDraft: (updates: Partial<TripDraft>) => void;
}

const FEATURED_ACTIVITIES = [
  {
    id: "colisee",
    name: "Colisée",
    location: "Rome, Italie",
    type: "Visite guidée",
    price: 45,
    image:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=280&auto=format&fit=crop",
  },
  {
    id: "galerie-offices",
    name: "Galerie des Offices",
    location: "Florence, Italie",
    type: "Billet coupe-file",
    price: 30,
    image:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=280&auto=format&fit=crop",
  },
  {
    id: "gondole",
    name: "Tour en gondole",
    location: "Venise, Italie",
    type: "Expérience privée",
    price: 60,
    image:
      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400&h=280&auto=format&fit=crop",
  },
  {
    id: "positano",
    name: "Positano",
    location: "Côte Amalfitaine",
    type: "Journée découverte",
    price: 40,
    image:
      "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=400&h=280&auto=format&fit=crop",
  },
];

export function StepActivities({ draft, updateDraft }: StepActivitiesProps) {
  const selected = draft.selectedActivities ?? [];

  const toggle = (id: string) => {
    const next = selected.includes(id)
      ? selected.filter((a) => a !== id)
      : [...selected, id];
    updateDraft({ selectedActivities: next });
  };

  return (
    <motion.div
      key="activities"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-1">
          6. Itinéraire &amp; Activités
        </h3>
        <p className="text-sm text-slate-500">
          Ajoutez des activités incontournables à votre itinéraire.
        </p>
      </div>

      {/* Activity grid */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.06 } },
        }}
      >
        {FEATURED_ACTIVITIES.map((activity) => {
          const isSelected = selected.includes(activity.id);

          return (
            <motion.div
              key={activity.id}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className={cn(
                "group relative rounded-xl overflow-hidden border-2 cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md",
                isSelected
                  ? "border-blue-500 ring-2 ring-blue-500/20"
                  : "border-slate-200 hover:border-blue-300",
              )}
              onClick={() => toggle(activity.id)}
              role="button"
              aria-pressed={isSelected}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={activity.image}
                  alt={activity.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Selected overlay */}
                {isSelected && (
                  <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-3 bg-white">
                <h4 className="text-sm font-bold text-slate-900 truncate">
                  {activity.name}
                </h4>
                <p className="text-[10px] text-slate-500 mt-0.5 truncate">
                  {activity.location}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] text-slate-400">
                    {activity.type}
                  </span>
                  <span className="text-sm font-bold text-blue-600">
                    {activity.price} €
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Add custom activity card */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
            },
          }}
          className="rounded-xl border-2 border-dashed border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-3 p-6 min-h-[200px] group"
        >
          <div className="w-12 h-12 rounded-xl bg-white border-2 border-slate-200 group-hover:border-blue-400 group-hover:bg-blue-500 flex items-center justify-center transition-all duration-200 shadow-sm">
            <Plus className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-slate-700">
              Ajouter une activité
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              Personnalisez votre voyage
            </p>
          </div>
        </motion.div>
      </motion.div>

      {selected.length > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-blue-600 font-medium"
        >
          {selected.length} activité{selected.length > 1 ? "s" : ""}{" "}
          sélectionnée{selected.length > 1 ? "s" : ""} · Coût estimé :{" "}
          <strong>
            {FEATURED_ACTIVITIES.filter((a) => selected.includes(a.id)).reduce(
              (sum, a) => sum + a.price,
              0,
            )}{" "}
            €
          </strong>{" "}
          / personne
        </motion.p>
      )}
    </motion.div>
  );
}
