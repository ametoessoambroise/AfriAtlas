import React from "react";
import { useTripPlanning } from "@/hooks/queries/useTripPlanning";
import PlanningFormCard from "@/components/tripplanification/PlanningFormCard";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Send, ShieldCheck, Headphones, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

const TRUST_BADGES = [
  {
    icon: Send,
    title: "Itinéraire 100% personnalisé",
    sub: "Adapté à vos envies et à votre budget",
  },
  {
    icon: ShieldCheck,
    title: "Réservations sécurisées",
    sub: "Vos données sont protégées",
  },
  {
    icon: Headphones,
    title: "Assistance 24/7",
    sub: "Nous sommes là pour vous",
  },
  {
    icon: CreditCard,
    title: "Paiement sécurisé",
    sub: "Transactions 100% sécurisées",
  },
];

export default function TripPlanningPage() {
  const { step, draft, updateDraft, goToNextStep, goToPreviousStep, setStep } =
    useTripPlanning();

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">
        {/* ── PAGE HEADER ──────────────────────────────────────────────────── */}
        <header className="space-y-1.5">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Planifiez votre voyage
            </h1>
            <span className="text-2xl sm:text-3xl" aria-hidden>
              ✈️
            </span>
          </div>
          <p className="text-sm text-slate-500">
            Créez votre itinéraire sur-mesure en quelques étapes simples.
          </p>
        </header>

        {/* ── PLANNING FORM CARD ───────────────────────────────────────────── */}
        <PlanningFormCard
          step={step}
          draft={draft}
          updateDraft={updateDraft}
          onNext={goToNextStep}
          onBack={goToPreviousStep}
          setStep={setStep}
        />

        {/* ── TRUST BADGES ─────────────────────────────────────────────────── */}
        <div className="border-t border-slate-100 pt-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {TRUST_BADGES.map(({ icon: Icon, title, sub }) => (
              <div
                key={title}
                className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-2xl shadow-sm"
              >
                <div className="w-9 h-9 shrink-0 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-blue-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-slate-800 leading-tight">
                    {title}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5 leading-tight truncate">
                    {sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
