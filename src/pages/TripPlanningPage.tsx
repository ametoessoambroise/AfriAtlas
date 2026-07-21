import React from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import { useTripPlanning } from "@/hooks/queries/useTripPlanning";
import AIInspirationSidebar from "@/components/tripplanification/AIInspirationSidebar";
import PlanningFormCard from "@/components/tripplanification/PlanningFormCard";
import TripInsightsSidebar from "@/components/tripplanification/TripInsightsSidebar";
import FeatureHighlights from "@/components/tripplanification/FeatureHighlights";
import DestinationInspiration from "@/components/tripplanification/DestinationInspiration";
import { motion } from "framer-motion";

export default function TripPlanningPage() {
  const { step, draft, updateDraft, goToNextStep, goToPreviousStep, setStep } =
    useTripPlanning();

  return (
    <PageWrapper>
      {/* Background Image with Blur */}
      <div className="fixed inset-0 z-10">
        <img
          src="https://images.unsplash.com/photo-1522771936559-01040c9c110a?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Trip Planning Background"
          className="h-full w-full object-cover opacity-40 scale-105"
        />
        <div className="absolute inset-0 backdrop-blur-[30px] bg-background/40" />
      </div>

      <div className="container relative z-10 px-4 pt-32 pb-20 mx-auto max-w-[1600px]">
        {/* Header Text */}
        <div className="mb-12">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-bold uppercase tracking-[0.2em] text-xs mb-3"
          >
            Planifie ton avenir voyage ✈️
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-heading font-black text-foreground leading-tight"
          >
            Planifie ton <br />
            <span className="italic font-premium text-primary">
              Trip parfait
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-foreground/60 text-lg mt-4 max-w-md"
          >
            Crée ton itinéraire sur-mesure en quelques minutes avec l'aide de
            l'IA.
          </motion.p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar: AI Inspiration */}
          <div className="lg:col-span-3">
            <AIInspirationSidebar />
            <img
              src="/casque-2.png"
              alt="casque"
              className="w-full h-full rounded-md shadow-lg mt-8"
            />
          </div>

          {/* Center: Planning Form */}
          <div className="lg:col-span-6">
            <PlanningFormCard
              step={step}
              draft={draft}
              updateDraft={updateDraft}
              onNext={goToNextStep}
              onBack={goToPreviousStep}
              setStep={setStep}
            />

            {/* Bottom Inspiration (only visible on step 1/2) */}
            {(step === "destinations" || step === "activities") && (
              <div className="mt-8">
                <DestinationInspiration />
              </div>
            )}
          </div>

          {/* Right Sidebar: Insights */}
          <div className="lg:col-span-3">
            <TripInsightsSidebar draft={draft} />
          </div>
        </div>

        {/* Footer Features */}
        <div className="mt-20">
          <FeatureHighlights />
        </div>
      </div>
    </PageWrapper>

  );
}
