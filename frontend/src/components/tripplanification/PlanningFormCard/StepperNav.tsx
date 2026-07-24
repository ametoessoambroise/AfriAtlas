import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { PlanningStep } from "@/lib/types/trip_planning";
import { cn } from "@/lib/utils";

export const STEPS: Array<{ key: PlanningStep; label: string; short: string }> =
  [
    { key: "destinations", label: "Destinations", short: "Dest." },
    { key: "travelers", label: "Voyageurs", short: "Voy." },
    { key: "dates", label: "Dates", short: "Dates" },
    { key: "preferences", label: "Préférences", short: "Prefs" },
    { key: "budget", label: "Budget", short: "Budget" },
    { key: "activities", label: "Activités", short: "Activ." },
    { key: "recap", label: "Récapitulatif", short: "Récap." },
  ];

interface StepperNavProps {
  currentStep: PlanningStep;
  onStepClick?: (step: PlanningStep) => void;
}

export function StepperNav({ currentStep, onStepClick }: StepperNavProps) {
  const currentIdx = STEPS.findIndex((s) => s.key === currentStep);

  return (
    <nav
      className="w-full px-6 sm:px-8 py-5 border-b border-border/60 overflow-x-auto no-scrollbar"
      aria-label="Étapes de planification"
    >
      <ol className="flex items-center gap-0 min-w-max mx-auto">
        {STEPS.map((s, idx) => {
          const isActive = s.key === currentStep;
          const isCompleted = currentIdx > idx;
          const isClickable = isCompleted || isActive;

          return (
            <React.Fragment key={s.key}>
              <li>
                <button
                  onClick={() => isClickable && onStepClick?.(s.key)}
                  disabled={!isClickable}
                  aria-current={isActive ? "step" : undefined}
                  className={cn(
                    "flex items-center gap-2.5 transition-all duration-200 group",
                    isClickable ? "cursor-pointer" : "cursor-default",
                  )}
                >
                  {/* Circle number */}
                  <motion.div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 shrink-0",
                      isActive
                        ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/30"
                        : isCompleted
                          ? "bg-blue-600 border-blue-600 text-white"
                          : "bg-white border-slate-200 text-slate-400",
                    )}
                    animate={isActive ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    {isCompleted ? (
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    ) : (
                      <span>{idx + 1}</span>
                    )}
                  </motion.div>

                  {/* Label */}
                  <span
                    className={cn(
                      "text-xs font-semibold transition-colors duration-200 whitespace-nowrap hidden sm:block",
                      isActive
                        ? "text-blue-600"
                        : isCompleted
                          ? "text-slate-700"
                          : "text-slate-400",
                    )}
                  >
                    {s.label}
                  </span>
                  {/* Mobile short label */}
                  <span
                    className={cn(
                      "text-[10px] font-semibold transition-colors duration-200 whitespace-nowrap sm:hidden",
                      isActive
                        ? "text-blue-600"
                        : isCompleted
                          ? "text-slate-700"
                          : "text-slate-400",
                    )}
                  >
                    {s.short}
                  </span>
                </button>
              </li>

              {/* Connector line */}
              {idx < STEPS.length - 1 && (
                <li
                  aria-hidden="true"
                  className="relative flex-shrink-0 mx-2 sm:mx-3"
                >
                  <div className="w-8 sm:w-12 h-[2px] bg-slate-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-blue-600 rounded-full origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isCompleted ? 1 : 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
