import React from "react";
import { motion } from "framer-motion";
import { TripDraft } from "@/lib/types/trip_planning";
import { format, differenceInDays } from "date-fns";
import { fr } from "date-fns/locale";
import {
  MapPin,
  Users,
  Calendar,
  Wallet,
  ArrowRight,
  Save,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StepRecapProps {
  draft: TripDraft;
}

export function StepRecap({ draft }: StepRecapProps) {
  const durationDays =
    draft.startDate && draft.endDate
      ? Math.max(1, differenceInDays(draft.endDate, draft.startDate))
      : null;

  const totalTravelers = draft.adults + draft.children + draft.babies;

  const summaryItems = [
    {
      icon: MapPin,
      label: "Destinations",
      value:
        [draft.mainDestination, ...draft.regionsCities]
          .filter(Boolean)
          .join(", ") || "—",
      sub:
        draft.regionsCities.length > 0
          ? `${draft.regionsCities.length} ville${draft.regionsCities.length > 1 ? "s" : ""}`
          : undefined,
    },
    {
      icon: Users,
      label: "Voyageurs",
      value: `${totalTravelers > 0 ? totalTravelers : draft.adults} adulte${draft.adults !== 1 ? "s" : ""}${draft.children > 0 ? `, ${draft.children} enfant${draft.children > 1 ? "s" : ""}` : ""}`,
      sub:
        draft.travelType === "couple"
          ? "En couple"
          : draft.travelType === "famille"
            ? "En famille"
            : draft.travelType === "amis"
              ? "Entre amis"
              : "Solo",
    },
    {
      icon: Calendar,
      label: "Dates",
      value:
        draft.startDate && draft.endDate
          ? `${format(draft.startDate, "d MMM", { locale: fr })} – ${format(draft.endDate, "d MMM yyyy", { locale: fr })}`
          : "—",
      sub: durationDays
        ? `${durationDays} jour${durationDays > 1 ? "s" : ""}`
        : undefined,
    },
    {
      icon: Wallet,
      label: "Budget",
      value: `${draft.totalBudget.toLocaleString("fr-FR")} €`,
      sub: "Tout inclus",
    },
  ];

  return (
    <motion.div
      key="recap"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-8"
    >
      {/* Header */}
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-1">
          7. Récapitulatif
        </h3>
        <p className="text-sm text-slate-500">
          Vérifiez les détails de votre voyage avant de continuer.
        </p>
      </div>

      {/* Summary grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {summaryItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: idx * 0.07,
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-sm"
            >
              <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center">
                <Icon className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                  {item.label}
                </p>
                <p className="text-sm font-bold text-slate-900 mt-0.5 leading-tight">
                  {item.value}
                </p>
                {item.sub && (
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {item.sub}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button className="flex-1 h-13 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-blue-600/25 text-sm">
          Voir le récapitulatif
          <ArrowRight className="w-4 h-4" />
        </button>
        <button className="sm:flex-none h-13 px-6 border-2 border-slate-200 hover:border-slate-300 bg-white text-slate-700 font-semibold rounded-2xl flex items-center justify-center gap-2 transition-all text-sm">
          <Save className="w-4 h-4 text-slate-500" />
          Enregistrer le brouillon
        </button>
      </div>
    </motion.div>
  );
}
