import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Minus, Plus } from "lucide-react";
import { TripDraft } from "@/lib/types/trip_planning";
import { format, differenceInDays, addDays } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface StepDatesProps {
  draft: TripDraft;
  updateDraft: (updates: Partial<TripDraft>) => void;
}

function getDurationLabel(days: number): string {
  if (days === 1) return "1 jour";
  if (days < 7) return `${days} jours`;
  const weeks = Math.floor(days / 7);
  const rem = days % 7;
  if (rem === 0) return `${weeks} semaine${weeks > 1 ? "s" : ""}`;
  return `${weeks} sem. ${rem} j.`;
}

export function StepDates({ draft, updateDraft }: StepDatesProps) {
  const [startInput, setStartInput] = useState(
    draft.startDate ? format(draft.startDate, "yyyy-MM-dd") : "",
  );
  const [endInput, setEndInput] = useState(
    draft.endDate ? format(draft.endDate, "yyyy-MM-dd") : "",
  );

  const handleStartChange = (val: string) => {
    setStartInput(val);
    if (val) {
      const d = new Date(val);
      updateDraft({
        startDate: d,
        endDate:
          draft.endDate && draft.endDate > d ? draft.endDate : addDays(d, 14),
      });
      if (!endInput) {
        const end = addDays(d, 14);
        setEndInput(format(end, "yyyy-MM-dd"));
      }
    }
  };

  const handleEndChange = (val: string) => {
    setEndInput(val);
    if (val) {
      updateDraft({ endDate: new Date(val) });
    }
  };

  const durationDays =
    draft.startDate && draft.endDate
      ? Math.max(1, differenceInDays(draft.endDate, draft.startDate))
      : null;

  const adjustDuration = (delta: number) => {
    if (!draft.startDate || !draft.endDate) return;
    const newEnd = addDays(draft.endDate, delta);
    if (newEnd > draft.startDate) {
      updateDraft({ endDate: newEnd });
      setEndInput(format(newEnd, "yyyy-MM-dd"));
    }
  };

  return (
    <motion.div
      key="dates"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-1">3. Dates</h3>
          <p className="text-sm text-slate-500">
            Choisissez vos dates de départ et de retour.
          </p>
        </div>
        <div className="hidden sm:block shrink-0">
          <div className="w-24 h-24 bg-blue-50 rounded-2xl flex items-center justify-center">
            <Calendar className="w-12 h-12 text-blue-400" />
          </div>
        </div>
      </div>

      {/* Date pickers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Départ */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
            Date de départ
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500 pointer-events-none" />
            <input
              type="date"
              value={startInput}
              onChange={(e) => handleStartChange(e.target.value)}
              min={format(new Date(), "yyyy-MM-dd")}
              className="w-full h-12 pl-10 pr-10 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all [color-scheme:light]"
            />
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
          {draft.startDate && (
            <p className="text-xs text-slate-500 px-1">
              {format(draft.startDate, "EEEE d MMMM yyyy", { locale: fr })}
            </p>
          )}
        </div>

        {/* Retour */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
            Date de retour
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500 pointer-events-none" />
            <input
              type="date"
              value={endInput}
              onChange={(e) => handleEndChange(e.target.value)}
              min={startInput || format(new Date(), "yyyy-MM-dd")}
              className="w-full h-12 pl-10 pr-10 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all [color-scheme:light]"
            />
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
          {draft.endDate && (
            <p className="text-xs text-slate-500 px-1">
              {format(draft.endDate, "EEEE d MMMM yyyy", { locale: fr })}
            </p>
          )}
        </div>
      </div>

      {/* Duration display */}
      {durationDays && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-4 bg-white border border-slate-200 rounded-2xl px-6 py-4 shadow-sm"
        >
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Durée du séjour
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={() => adjustDuration(-1)}
              disabled={durationDays <= 1}
              className={cn(
                "w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all",
                durationDays <= 1
                  ? "border-slate-100 text-slate-300 cursor-not-allowed"
                  : "border-slate-300 text-slate-600 hover:border-blue-400 hover:text-blue-600",
              )}
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <motion.span
              key={durationDays}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="text-lg font-bold text-slate-900 min-w-[80px] text-center"
            >
              {getDurationLabel(durationDays)}
            </motion.span>
            <button
              onClick={() => adjustDuration(1)}
              className="w-8 h-8 rounded-lg border-2 border-blue-500 bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Arrow connector visual */}
      {draft.startDate && draft.endDate && (
        <div className="flex items-center gap-3 text-xs text-slate-500 px-2">
          <span className="font-medium text-slate-700">
            {format(draft.startDate, "d MMM", { locale: fr })}
          </span>
          <div className="flex-1 flex items-center gap-1">
            <div className="h-px flex-1 bg-blue-200" />
            <ArrowRight className="w-4 h-4 text-blue-400 shrink-0" />
            <div className="h-px flex-1 bg-blue-200" />
          </div>
          <span className="font-medium text-slate-700">
            {format(draft.endDate, "d MMM yyyy", { locale: fr })}
          </span>
        </div>
      )}
    </motion.div>
  );
}

// Need to import ChevronDown
function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
