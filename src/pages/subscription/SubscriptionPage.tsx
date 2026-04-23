import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TimelineContent } from "@/components/ui/timeline-animation";
import NumberFlow from "@number-flow/react";
import { Check, CheckCheck, Loader2, AlertTriangle, Users } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import {
  useSubscriptionPlans,
  useSubscribe,
} from "@/hooks/queries/useSubscription";
import { StripeBuyButton } from "@/components/shared/StripeBuyButton";
import { useAuth } from "@/hooks/useAuth";

const PricingSwitch = ({ onSwitch }: { onSwitch: (value: string) => void }) => {
  const [selected, setSelected] = useState("0");

  const handleSwitch = (value: string) => {
    setSelected(value);
    onSwitch(value);
  };

  return (
    <div className="flex justify-center">
      <div className="relative z-50 mx-auto flex w-fit rounded-full bg-neutral-50 border border-gray-200 p-1 shadow-sm">
        <button
          onClick={() => handleSwitch("0")}
          className={`relative z-10 w-fit sm:h-12 h-10 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors ${
            selected === "0"
              ? "text-white"
              : "text-muted-foreground hover:text-black"
          }`}
        >
          {selected === "0" && (
            <motion.span
              layoutId={"switch"}
              className="absolute top-0 left-0 sm:h-12 h-10 w-full rounded-full border-4 shadow-sm shadow-blue-600 border-blue-600 bg-gradient-to-t from-blue-500 via-blue-400 to-blue-600"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative">Mensuel</span>
        </button>

        <button
          onClick={() => handleSwitch("1")}
          className={`relative z-10 w-fit sm:h-12 h-8 flex-shrink-0 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors ${
            selected === "1"
              ? "text-white"
              : "text-muted-foreground hover:text-black"
          }`}
        >
          {selected === "1" && (
            <motion.span
              layoutId={"switch"}
              className="absolute top-0 left-0 sm:h-12 h-10 w-full rounded-full border-4 shadow-sm shadow-blue-600 border-blue-600 bg-gradient-to-t from-blue-500 via-blue-400 to-blue-600"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative flex items-center gap-2">
            Annuel
            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-black">
              Éco
            </span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default function SubscriptionPage() {
  const [isYearly, setIsYearly] = useState(false);
  const pricingRef = useRef<HTMLDivElement>(null);
  const { data: apiPlans, isLoading, isError } = useSubscriptionPlans();
  const { user } = useAuth();
  const { mutate: subscribe, isPending: isSubscribing } = useSubscribe();

  const userPlanType =
    (user as any)?.subscription_plan_type ?? (user as any)?.plan_type ?? null;

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { delay: i * 0.4, duration: 0.5 },
    }),
    hidden: { filter: "blur(10px)", y: -20, opacity: 0 },
  };

  const togglePricingPeriod = (value: string) =>
    setIsYearly(Number.parseInt(value) === 1);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (isError || !apiPlans) {
    return (
      <div className="min-h-screen bg-neutral-100 flex flex-col items-center justify-center gap-4 text-neutral-600">
        <AlertTriangle className="h-10 w-10 text-red-500" />
        <p>Impossible de charger les plans. Réessayez.</p>
      </div>
    );
  }

  const sortedPlans = [...apiPlans].sort(
    (a, b) => a.price_monthly - b.price_monthly,
  );

  const mappedPlans = sortedPlans.map((plan) => ({
    ...plan,
    popular: plan.plan_type.toLowerCase() === "premium",
    description:
      plan.plan_type.toLowerCase() === "premium"
        ? "Le choix idéal pour des expériences inoubliables."
        : plan.plan_type.toLowerCase() === "family"
          ? "Parfait pour partager vos souvenirs en famille."
          : "Un point de départ idéal pour vos aventures.",
    buttonVariant:
      plan.plan_type.toLowerCase() === "premium" ? "default" : "outline",
    uiFeatures: (plan.features || []).map((f) => ({
      text: f,
      icon: (
        <Check size={20} className="text-emerald-500 mt-0.5 flex-shrink-0" />
      ),
    })),
    includes: [
      plan.plan_type.toLowerCase() !== "free"
        ? "Avantages supplémentaires :"
        : "Inclus :",
      `Jusqu'à ${plan.max_family_members} membres par famille`,
    ],
  }));

  return (
    <div
      className="px-4 pt-40 min-h-screen mx-auto relative bg-neutral-100 overflow-hidden"
      ref={pricingRef}
    >
      <div
        className="absolute top-0 left-[10%] right-[10%] w-[80%] h-full z-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at center, #206ce8 0%, transparent 70%)`,
          opacity: 0.2,
          mixBlendMode: "multiply",
        }}
      />

      <div className="text-center mb-10 max-w-3xl mx-auto relative z-10">
        <TimelineContent
          as="h2"
          animationNum={0}
          timelineRef={pricingRef}
          customVariants={revealVariants}
          className="md:text-6xl sm:text-4xl text-3xl font-medium text-gray-900 mb-6 leading-tight"
        >
          Choisissez votre prochaine{" "}
          <TimelineContent
            as="span"
            animationNum={1}
            timelineRef={pricingRef}
            customVariants={revealVariants}
            className="border border-dashed border-blue-500 px-3 py-1 rounded-2xl bg-blue-100/50 capitalize inline-block text-blue-600"
          >
            aventure
          </TimelineContent>
        </TimelineContent>

        <TimelineContent
          as="p"
          animationNum={2}
          timelineRef={pricingRef}
          customVariants={revealVariants}
          className="sm:text-lg text-base text-gray-600 sm:w-[70%] w-[80%] mx-auto"
        >
          Débloquez des expériences exclusives et partagez-les avec vos proches.
          Quel que soit votre style de voyage, nous avons l'offre parfaite.
        </TimelineContent>
      </div>

      <TimelineContent
        as="div"
        animationNum={3}
        timelineRef={pricingRef}
        customVariants={revealVariants}
        className="relative z-10"
      >
        <PricingSwitch onSwitch={togglePricingPeriod} />
      </TimelineContent>

      <div className="grid md:grid-cols-3 max-w-6xl gap-6 py-10 mx-auto relative z-10">
        {mappedPlans.map((plan, index) => {
          const isCurrentPlan = userPlanType === plan.plan_type.toLowerCase();

          return (
            <TimelineContent
              key={plan.id}
              as="div"
              animationNum={4 + index}
              timelineRef={pricingRef}
              customVariants={revealVariants}
            >
              <Card
                className={`relative flex flex-col h-full border-neutral-200 shadow-md ${
                  plan.popular
                    ? "ring-2 ring-blue-500 bg-blue-50/50"
                    : "bg-white "
                } transition-all duration-300 hover:shadow-xl`}
              >
                <CardHeader className="text-left pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold text-gray-900 capitalize">
                      {plan.name}
                    </h3>
                    <div className="flex flex-col items-end gap-2">
                      {plan.popular && (
                        <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                          Populaire
                        </span>
                      )}
                      {isCurrentPlan && (
                        <span className="bg-neutral-800 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm flex items-center gap-1">
                          <Check size={14} /> Actuel
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 h-10">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-gray-900 tracking-tight">
                      $
                      <NumberFlow
                        value={
                          isYearly ? plan.price_yearly : plan.price_monthly
                        }
                        className="text-5xl font-bold"
                      />
                    </span>
                    <span className="text-gray-500 ml-1 font-medium">
                      /{isYearly ? "an" : "mois"}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="pt-0 flex-1 flex flex-col">
                  {/* Action Button */}
                  <div className="mb-8">
                    {plan.plan_type.toLowerCase() !== "free" &&
                    (!userPlanType || userPlanType === "free") &&
                    !isCurrentPlan ? (
                      <StripeBuyButton
                        amount={
                          isYearly ? plan.price_yearly : plan.price_monthly
                        }
                        label={`Choisir ${plan.name}`}
                        className={`w-full py-4 text-lg rounded-xl font-semibold transition-all ${
                          plan.popular
                            ? "bg-gradient-to-t from-blue-500 to-blue-600 shadow-blue-500/20 shadow-lg border border-blue-400 text-white"
                            : "bg-gradient-to-t from-neutral-800 to-neutral-900 shadow-neutral-900/20 shadow-lg border border-neutral-700 text-white"
                        } hover:opacity-90 active:scale-[0.98]`}
                        onSuccess={(paymentMethodId) => {
                          subscribe({
                            plan_id: plan.id,
                            billing_period: isYearly ? "yearly" : "monthly",
                            payment_method_id: paymentMethodId,
                          });
                        }}
                      />
                    ) : (
                      <button
                        disabled={isCurrentPlan || isSubscribing}
                        onClick={() => {
                          subscribe({
                            plan_id: plan.id,
                            billing_period: isYearly ? "yearly" : "monthly",
                          });
                        }}
                        className={`w-full py-4 text-lg flex items-center justify-center rounded-xl font-semibold transition-all ${
                          plan.popular
                            ? "bg-gradient-to-t from-blue-500 to-blue-600 shadow-lg shadow-blue-500/20 border border-blue-400 text-white"
                            : "bg-gradient-to-t from-neutral-800 to-neutral-900 shadow-lg shadow-neutral-900/20 border border-neutral-700 text-white"
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        {isSubscribing ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : isCurrentPlan ? (
                          "Plan actuel"
                        ) : (
                          `Choisir ${plan.name}`
                        )}
                      </button>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 font-medium mb-8 flex-1">
                    {plan.uiFeatures.map(
                      (feature: any, featureIndex: number) => (
                        <li key={featureIndex} className="flex items-start">
                          <span className="mr-3">{feature.icon}</span>
                          <span className="text-sm text-gray-700 leading-relaxed">
                            {feature.text}
                          </span>
                        </li>
                      ),
                    )}
                  </ul>

                  {/* Included (Family size etc) */}
                  <div className="space-y-4 pt-6 border-t border-neutral-200/60 mt-auto">
                    <h4 className="font-semibold text-sm text-gray-900">
                      {plan.includes[0]}
                    </h4>
                    <ul className="space-y-3 font-medium">
                      <li className="flex items-center">
                        <span className="h-7 w-7 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center mr-3 shadow-sm">
                          <Users className="h-3.5 w-3.5 text-blue-600" />
                        </span>
                        <span className="text-sm text-gray-700">
                          {plan.includes[1]}
                        </span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TimelineContent>
          );
        })}
      </div>
    </div>
  );
}
