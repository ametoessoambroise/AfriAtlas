import React from "react";
import { motion } from "framer-motion";
import { Minus, Plus, Users } from "lucide-react";
import { TripDraft, TravelType } from "@/lib/types/trip_planning";
import { cn } from "@/lib/utils";

interface StepTravelersProps {
  draft: TripDraft;
  updateDraft: (updates: Partial<TripDraft>) => void;
}

const TRAVEL_TYPES: Array<{ id: TravelType; label: string }> = [
  { id: "couple", label: "En couple" },
  { id: "famille", label: "En famille" },
  { id: "amis", label: "Entre amis" },
  { id: "solo", label: "Solo" },
];

interface CounterProps {
  value: number;
  min?: number;
  max?: number;
  onDecrement: () => void;
  onIncrement: () => void;
  label: string;
  sublabel: string;
}

function Counter({
  value,
  min = 0,
  max = 20,
  onDecrement,
  onIncrement,
  label,
  sublabel,
}: CounterProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-4 border-b border-slate-100 last:border-0">
      <div>
        <p className="text-sm font-semibold text-slate-800">{label}</p>
        <p className="text-xs text-slate-500 mt-0.5">{sublabel}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onDecrement}
          disabled={value <= min}
          aria-label={`Diminuer ${label}`}
          className={cn(
            "w-9 h-9 rounded-xl border-2 flex items-center justify-center transition-all duration-150",
            value <= min
              ? "border-slate-100 text-slate-300 cursor-not-allowed"
              : "border-slate-300 text-slate-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 active:scale-95",
          )}
        >
          <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>

        <motion.span
          key={value}
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.15 }}
          className="w-8 text-center text-lg font-bold text-slate-900 tabular-nums"
        >
          {value}
        </motion.span>

        <button
          onClick={onIncrement}
          disabled={value >= max}
          aria-label={`Augmenter ${label}`}
          className={cn(
            "w-9 h-9 rounded-xl border-2 flex items-center justify-center transition-all duration-150",
            value >= max
              ? "border-slate-100 text-slate-300 cursor-not-allowed"
              : "border-blue-500 bg-blue-500 text-white hover:bg-blue-600 hover:border-blue-600 active:scale-95",
          )}
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
}

export function StepTravelers({ draft, updateDraft }: StepTravelersProps) {
  return (
    <motion.div
      key="travelers"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-1">
            2. Voyageurs
          </h3>
          <p className="text-sm text-slate-500">
            Informations sur les personnes qui voyagent.
          </p>
        </div>
        <div className="hidden sm:flex items-end justify-center shrink-0 w-28 h-28">
          <img
            src="https://images.unsplash.com/photo-1609609834081-8fce40c6dfed?w=160&h=160&auto=format&fit=crop"
            alt="Famille voyageurs"
            className="w-full h-full object-cover rounded-2xl shadow-sm"
            loading="lazy"
          />
        </div>
      </div>

      {/* Counters */}
      <div className="bg-white border border-slate-200 rounded-2xl px-6 py-2 shadow-sm">
        <Counter
          label="Adultes"
          sublabel=""
          value={draft.adults}
          min={1}
          onDecrement={() =>
            updateDraft({ adults: Math.max(1, draft.adults - 1) })
          }
          onIncrement={() => updateDraft({ adults: draft.adults + 1 })}
        />
        <Counter
          label="Enfants"
          sublabel="2-12 ans"
          value={draft.children}
          min={0}
          onDecrement={() =>
            updateDraft({ children: Math.max(0, draft.children - 1) })
          }
          onIncrement={() => updateDraft({ children: draft.children + 1 })}
        />
        <Counter
          label="Bébés"
          sublabel="1-2 ans"
          value={draft.babies}
          min={0}
          onDecrement={() =>
            updateDraft({ babies: Math.max(0, draft.babies - 1) })
          }
          onIncrement={() => updateDraft({ babies: draft.babies + 1 })}
        />
      </div>

      {/* Type de voyage */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
          Type de voyage
        </label>
        <div className="flex flex-wrap gap-2">
          {TRAVEL_TYPES.map((type) => {
            const isSelected = draft.travelType === type.id;
            return (
              <button
                key={type.id}
                onClick={() => updateDraft({ travelType: type.id })}
                aria-pressed={isSelected}
                className={cn(
                  "px-5 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all duration-200",
                  isSelected
                    ? "border-blue-500 bg-blue-500 text-white shadow-md shadow-blue-500/20"
                    : "border-slate-200 bg-white text-slate-600 hover:border-blue-200",
                )}
              >
                {type.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Summary pill */}
      {draft.adults + draft.children + draft.babies > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-slate-600 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3"
        >
          <Users className="w-4 h-4 text-blue-500 shrink-0" />
          <span>
            <strong className="text-slate-800">
              {draft.adults + draft.children + draft.babies}
            </strong>{" "}
            voyageur
            {draft.adults + draft.children + draft.babies > 1 ? "s" : ""} au
            total
            {draft.children > 0 && (
              <>
                {" "}
                · {draft.children} enfant{draft.children > 1 ? "s" : ""}
              </>
            )}
            {draft.babies > 0 && (
              <>
                {" "}
                · {draft.babies} bébé{draft.babies > 1 ? "s" : ""}
              </>
            )}
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}
