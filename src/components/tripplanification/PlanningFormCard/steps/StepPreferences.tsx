import React from "react";
import { motion } from "framer-motion";
import {
  TripDraft,
  HousingStyle,
  TravelRhythm,
  TransportMode,
} from "@/lib/types/trip_planning";
import { cn } from "@/lib/utils";

interface StepPreferencesProps {
  draft: TripDraft;
  updateDraft: (updates: Partial<TripDraft>) => void;
}

const TRAVEL_STYLES = [
  { value: "Authentique & Local", icon: "🏘️" },
  { value: "Nature & Aventure", icon: "🌿" },
  { value: "Culture & Histoire", icon: "🏛️" },
  { value: "Gastronomie", icon: "🍽️" },
  { value: "Bien-être", icon: "🧘" },
];

const HOUSING_STYLES: Array<{ id: HousingStyle; label: string; icon: string }> =
  [
    { id: "economique", label: "Économique", icon: "🏕️" },
    { id: "confort", label: "Confort", icon: "🏨" },
    { id: "premium", label: "Premium", icon: "⭐" },
    { id: "luxe", label: "Luxe", icon: "💎" },
  ];

const RHYTHMS: Array<{ id: TravelRhythm; label: string; icon: string }> = [
  { id: "lent", label: "Lent", icon: "🐢" },
  { id: "equilibre", label: "Équilibré", icon: "⚖️" },
  { id: "intense", label: "Intense", icon: "⚡" },
];

const INTEREST_OPTIONS = [
  "Histoire",
  "Cuisine, Art",
  "Architecture",
  "Musées",
  "Plein air",
  "Shopping",
  "Festivals",
  "Photographie",
];

const TRANSPORT_MODES: Array<{
  id: TransportMode;
  label: string;
  icon: string;
}> = [
  { id: "mixte", label: "Mixte", icon: "🔀" },
  { id: "voiture", label: "Voiture", icon: "🚗" },
  { id: "transports", label: "Transports", icon: "🚌" },
  { id: "avion", label: "Avion", icon: "✈️" },
];

function PillGroup<T extends string>({
  label,
  options,
  value,
  onChange,
  multiple = false,
}: {
  label: string;
  options: Array<{ id: T; label: string; icon?: string }>;
  value: T | T[];
  onChange: (val: T) => void;
  multiple?: boolean;
}) {
  const isSelected = (id: T) =>
    Array.isArray(value) ? value.includes(id) : value === id;

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            aria-pressed={isSelected(opt.id)}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-200",
              isSelected(opt.id)
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-slate-50",
            )}
          >
            {opt.icon && (
              <span className="text-base leading-none">{opt.icon}</span>
            )}
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function StepPreferences({ draft, updateDraft }: StepPreferencesProps) {
  const toggleInterest = (interest: string) => {
    const current = draft.interests ?? [];
    const next = current.includes(interest)
      ? current.filter((i) => i !== interest)
      : [...current, interest];
    updateDraft({ interests: next });
  };

  return (
    <motion.div
      key="preferences"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-8"
    >
      {/* Header */}
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-1">
          4. Préférences de voyage
        </h3>
        <p className="text-sm text-slate-500">
          Personnalisez votre expérience.
        </p>
      </div>

      {/* Preferences grid - 2 cols on md+ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
        {/* Style de voyage */}
        <PillGroup
          label="Style de voyage"
          options={TRAVEL_STYLES.map((s) => ({
            id: s.value as any,
            label: s.value,
            icon: s.icon,
          }))}
          value={draft.travelStyle as any}
          onChange={(val) => updateDraft({ travelStyle: val })}
        />

        {/* Hébergement */}
        <PillGroup
          label="Hébergement"
          options={HOUSING_STYLES}
          value={draft.housingStyle}
          onChange={(val) => updateDraft({ housingStyle: val })}
        />

        {/* Rythme du voyage */}
        <PillGroup
          label="Rythme du voyage"
          options={RHYTHMS}
          value={draft.rhythm}
          onChange={(val) => updateDraft({ rhythm: val })}
        />

        {/* Transport sur place */}
        <PillGroup
          label="Transport sur place"
          options={TRANSPORT_MODES}
          value={draft.transport}
          onChange={(val) => updateDraft({ transport: val })}
        />
      </div>

      {/* Intérêts - multiselect */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Intérêts principaux
        </p>
        <div className="flex flex-wrap gap-2">
          {INTEREST_OPTIONS.map((interest) => {
            const isSelected = (draft.interests ?? []).includes(interest);
            return (
              <button
                key={interest}
                onClick={() => toggleInterest(interest)}
                aria-pressed={isSelected}
                className={cn(
                  "px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-200",
                  isSelected
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-slate-200 bg-white text-slate-600 hover:border-blue-200",
                )}
              >
                {interest}
              </button>
            );
          })}
        </div>
      </div>

      {/* Demandes spéciales */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Demandes spéciales{" "}
          <span className="normal-case text-slate-400 font-normal">
            (optionnel)
          </span>
        </p>
        <textarea
          value={draft.specialRequests ?? ""}
          onChange={(e) => updateDraft({ specialRequests: e.target.value })}
          placeholder="Ex : Besoin d'accessibilité, régime alimentaire, surprise pour un anniversaire..."
          rows={3}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all resize-none"
        />
      </div>
    </motion.div>
  );
}
