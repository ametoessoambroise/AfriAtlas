import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X, ChevronDown, Compass2 } from "lucide-react";
import { TripDraft, StayType } from "@/lib/types/trip_planning";
import { cn } from "@/lib/utils";

interface StepDestinationsProps {
  draft: TripDraft;
  updateDraft: (updates: Partial<TripDraft>) => void;
}

const STAY_TYPES: Array<{ id: StayType; label: string; icon: string }> = [
  { id: "decouverte", label: "Découverte", icon: "🔭" },
  { id: "detente", label: "Détente", icon: "🌿" },
  { id: "aventure", label: "Aventure", icon: "⛰️" },
  { id: "culture", label: "Culture", icon: "🏛️" },
];

const SUGGESTED_CITIES = [
  "Florence",
  "Venise",
  "Rome",
  "Naples",
  "Capri",
  "Côte Amalfitaine",
  "Milan",
  "Toscane",
  "Sardaigne",
  "Sicile",
];

export function StepDestinations({
  draft,
  updateDraft,
}: StepDestinationsProps) {
  const [cityInput, setCityInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions =
    cityInput.length > 0
      ? SUGGESTED_CITIES.filter(
          (c) =>
            c.toLowerCase().includes(cityInput.toLowerCase()) &&
            !draft.regionsCities.includes(c),
        )
      : SUGGESTED_CITIES.filter((c) => !draft.regionsCities.includes(c)).slice(
          0,
          6,
        );

  const addCity = (city: string) => {
    if (city.trim() && !draft.regionsCities.includes(city.trim())) {
      updateDraft({ regionsCities: [...draft.regionsCities, city.trim()] });
    }
    setCityInput("");
    setShowSuggestions(false);
  };

  const removeCity = (city: string) => {
    updateDraft({
      regionsCities: draft.regionsCities.filter((c) => c !== city),
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && cityInput.trim()) {
      e.preventDefault();
      addCity(cityInput.trim());
    }
    if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  return (
    <motion.div
      key="destinations"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-8"
    >
      {/* Header with illustration */}
      <div className="flex items-start justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-1">
            1. Destinations
          </h3>
          <p className="text-sm text-slate-500">
            Choisissez où vous voulez aller et ce que vous souhaitez découvrir.
          </p>
        </div>
        <div className="hidden sm:block shrink-0">
          <img
            src="https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=220&h=130&auto=format&fit=crop"
            alt="Colisée Rome"
            className="w-52 h-28 object-cover rounded-2xl shadow-md"
            loading="lazy"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Destination principale */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
            Destination principale
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
            <input
              type="text"
              value={draft.mainDestination}
              onChange={(e) => updateDraft({ mainDestination: e.target.value })}
              placeholder="Italie, Rome"
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
            />
          </div>
        </div>

        {/* Régions / Villes multiselect */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
            Régions / Villes à visiter
          </label>
          <div className="relative">
            {/* Tags container */}
            <div
              className={cn(
                "min-h-11 w-full rounded-xl border bg-white px-3 py-2 flex flex-wrap gap-1.5 items-center cursor-text transition-all",
                showSuggestions
                  ? "border-blue-400 ring-2 ring-blue-500/30"
                  : "border-slate-200 hover:border-slate-300",
              )}
              onClick={() => {
                setShowSuggestions(true);
                document.getElementById("city-input")?.focus();
              }}
            >
              <AnimatePresence>
                {draft.regionsCities.map((city) => (
                  <motion.span
                    key={city}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.15 }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium border border-blue-100"
                  >
                    {city}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeCity(city);
                      }}
                      className="ml-0.5 w-3.5 h-3.5 rounded-full hover:bg-blue-200 flex items-center justify-center transition-colors"
                      aria-label={`Supprimer ${city}`}
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </motion.span>
                ))}
              </AnimatePresence>
              <input
                id="city-input"
                type="text"
                value={cityInput}
                onChange={(e) => {
                  setCityInput(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                onKeyDown={handleKeyDown}
                placeholder={
                  draft.regionsCities.length === 0 ? "Florence, Venise..." : ""
                }
                className="flex-1 min-w-[80px] h-6 bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
              />
              <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-auto" />
            </div>

            {/* Dropdown suggestions */}
            <AnimatePresence>
              {showSuggestions && filteredSuggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-lg z-20 overflow-hidden"
                >
                  {filteredSuggestions.map((city) => (
                    <button
                      key={city}
                      onMouseDown={() => addCity(city)}
                      className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                    >
                      {city}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Type de séjour */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
          Type de séjour
        </label>
        <div className="flex flex-wrap gap-3">
          {STAY_TYPES.map((type) => {
            const isSelected = draft.stayType === type.id;
            return (
              <button
                key={type.id}
                onClick={() => updateDraft({ stayType: type.id })}
                aria-pressed={isSelected}
                className={cn(
                  "flex flex-col items-center gap-2 px-5 py-3.5 rounded-2xl border-2 text-sm font-semibold transition-all duration-200 min-w-[90px]",
                  isSelected
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-slate-50",
                )}
              >
                <span className="text-xl">{type.icon}</span>
                <span className="text-xs">{type.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
