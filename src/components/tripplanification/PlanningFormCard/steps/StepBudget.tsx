import React from "react";
import { motion } from "framer-motion";
import { TripDraft } from "@/lib/types/trip_planning";
import { cn } from "@/lib/utils";

interface StepBudgetProps {
  draft: TripDraft;
  updateDraft: (updates: Partial<TripDraft>) => void;
}

const CURRENCIES = ["EUR (€)", "USD ($)", "GBP (£)", "CHF (Fr)", "MAD (DH)"];

const BUDGET_BREAKDOWN_LABELS: Array<{
  key: keyof TripDraft["budgetBreakdown"];
  label: string;
  color: string;
  icon: string;
}> = [
  { key: "transport", label: "Transport", color: "bg-blue-500", icon: "✈️" },
  { key: "lodging", label: "Hébergement", color: "bg-indigo-500", icon: "🏨" },
  { key: "activities", label: "Activités", color: "bg-violet-500", icon: "🎭" },
  { key: "food", label: "Repas", color: "bg-amber-500", icon: "🍽️" },
  { key: "other", label: "Divers", color: "bg-slate-400", icon: "📦" },
];

const MIN_BUDGET = 500;
const MAX_BUDGET = 15000;

function formatBudget(val: number) {
  return val.toLocaleString("fr-FR");
}

export function StepBudget({ draft, updateDraft }: StepBudgetProps) {
  const { totalBudget, currency, budgetBreakdown } = draft;

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateDraft({ totalBudget: Number(e.target.value) });
  };

  const updateBreakdown = (key: keyof typeof budgetBreakdown, val: number) => {
    // Clamp min 0, adjust "other" to keep total = 100
    const others = BUDGET_BREAKDOWN_LABELS.filter(
      (b) => b.key !== key && b.key !== "other",
    );
    const sumOthers = others.reduce(
      (acc, b) => acc + budgetBreakdown[b.key],
      0,
    );
    const newOther = Math.max(0, 100 - val - sumOthers);
    updateDraft({
      budgetBreakdown: {
        ...budgetBreakdown,
        [key]: val,
        other: newOther,
      },
    });
  };

  const sliderPercent =
    ((totalBudget - MIN_BUDGET) / (MAX_BUDGET - MIN_BUDGET)) * 100;

  return (
    <motion.div
      key="budget"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-8"
    >
      {/* Header */}
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-1">5. Budget</h3>
        <p className="text-sm text-slate-500">
          Définissez votre budget global pour le voyage.
        </p>
      </div>

      {/* Budget total + devise */}
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_200px] gap-6 items-start">
        {/* Slider */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
            Budget total{" "}
            <span className="text-slate-400 font-normal normal-case">
              (tout inclus)
            </span>
          </p>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-4xl font-bold text-slate-900 tabular-nums">
              {formatBudget(totalBudget)}
            </span>
            <span className="text-xl font-semibold text-slate-500">€</span>
          </div>

          {/* Range slider */}
          <div className="relative pt-1">
            <input
              type="range"
              min={MIN_BUDGET}
              max={MAX_BUDGET}
              step={100}
              value={totalBudget}
              onChange={handleBudgetChange}
              className="w-full h-2 appearance-none rounded-full cursor-pointer
                [&::-webkit-slider-runnable-track]:rounded-full
                [&::-webkit-slider-runnable-track]:h-2
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-5
                [&::-webkit-slider-thumb]:h-5
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-white
                [&::-webkit-slider-thumb]:border-2
                [&::-webkit-slider-thumb]:border-blue-500
                [&::-webkit-slider-thumb]:shadow-md
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-webkit-slider-thumb]:-mt-1.5"
              style={{
                background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${sliderPercent}%, #e2e8f0 ${sliderPercent}%, #e2e8f0 100%)`,
              }}
              aria-label="Budget total"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>{formatBudget(MIN_BUDGET)} €</span>
              <span>{formatBudget(MAX_BUDGET)} €</span>
            </div>
          </div>
        </div>

        {/* Devise */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
            Devise
          </p>
          <select
            value={currency}
            onChange={(e) =>
              updateDraft({ currency: e.target.value.split(" ")[0] })
            }
            className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Budget breakdown */}
      <div className="space-y-4">
        <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
          Répartition du budget{" "}
          <span className="text-slate-400 font-normal normal-case">
            (modifiable)
          </span>
        </p>

        {/* Visual bar */}
        <div className="flex h-3 rounded-full overflow-hidden gap-0.5">
          {BUDGET_BREAKDOWN_LABELS.map(({ key, color, label }) => (
            <motion.div
              key={key}
              className={cn("h-full", color)}
              style={{ width: `${budgetBreakdown[key]}%` }}
              title={`${label} : ${budgetBreakdown[key]}%`}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        {/* Breakdown items */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {BUDGET_BREAKDOWN_LABELS.map(({ key, label, color, icon }) => {
            const pct = budgetBreakdown[key];
            const amount = Math.round((totalBudget * pct) / 100);
            return (
              <div
                key={key}
                className="bg-white border border-slate-200 rounded-xl p-3 space-y-2"
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">{icon}</span>
                  <span className="text-[10px] font-semibold text-slate-600 uppercase tracking-wide truncate">
                    {label}
                  </span>
                </div>
                <div className="flex items-end gap-1">
                  <input
                    type="number"
                    value={pct}
                    min={0}
                    max={100}
                    onChange={(e) =>
                      updateBreakdown(
                        key,
                        Math.min(100, Math.max(0, Number(e.target.value))),
                      )
                    }
                    className="w-10 text-sm font-bold text-slate-900 bg-transparent focus:outline-none"
                  />
                  <span className="text-xs text-slate-500">%</span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium">
                  ≈ {amount.toLocaleString("fr-FR")} €
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
