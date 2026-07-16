import { useParams, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";

import { useVrSession, useBookVrSession } from "@/hooks/queries/useVrSessions";
import { getPlaces } from "@/lib/api/places";
import { listSubscriptionPlans } from "@/lib/api/subscriptions";

import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2, Lock, ShieldCheck, Headset } from "lucide-react";

import {
  bookingSchema,
  type BookingFormValues,
} from "./components/bookingSchema";
import { VrBookingSidebar } from "./components/VrBookingSidebar";
import { VrBookingForm } from "./components/VrBookingForm";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export default function VrBookingPage() {
  const { slug, id } = useParams<{ slug: string; id: string }>();
  const navigate = useNavigate();

  const { data: session, isLoading: sessionLoading } = useVrSession(id || "");
  const { mutateAsync: bookSession, isPending: isBooking } = useBookVrSession(
    id || "",
  );
  const { data: placesResponse } = useQuery({
    queryKey: ["places-list"],
    queryFn: () => getPlaces({ page_size: 10 }),
  });
  const { data: plans } = useQuery({
    queryKey: ["subscription-plans"],
    queryFn: listSubscriptionPlans,
  });

  const places = placesResponse?.items || [];

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      participation_type: "solo",
      num_participants: 1,
      experience_level: "beginner",
      health_preferences: {
        motion_sickness: false,
        glasses: false,
        loud_noise_sensitive: false,
        other: false,
      },
    },
  });

  const { watch, handleSubmit } = form;
  const values = watch();

  const onSubmit = async (data: BookingFormValues) => {
    if (!slug) return;
    try {
      await bookSession({
        body: {
          booking_date: data.booking_date.toISOString(),
          time_slot: data.time_slot,
          num_participants: data.num_participants,
          immersion_location_id: data.immersion_location_id,
          participation_type: data.participation_type,
          age_range: data.age_range,
          nationality: data.nationality,
          language: data.language,
          experience_level: data.experience_level,
          health_preferences: JSON.stringify(data.health_preferences),
          subscription_plan_id: data.subscription_plan_id,
        },
        slug,
      });
      navigate("/bookings");
    } catch {
      // toast handled by hook
    }
  };

  if (sessionLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  if (!session) {
    return (
      <DashboardLayout>
        <div className="p-6 lg:p-8 text-center space-y-4">
          <h1 className="text-2xl font-black uppercase tracking-tight">Session introuvable</h1>
          <Button asChild variant="outline" className="rounded-md px-8 h-12 font-black uppercase tracking-widest text-xs">
            <Link to="/vr-sessions">Retour au catalogue</Link>
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const selectedPlaceName = places.find(
    (p) => p.id === values.immersion_location_id,
  )?.name;
  const selectedPlan = plans?.find((p) => p.id === values.subscription_plan_id);

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6 animate-in fade-in duration-700">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-2">
          <button
            onClick={() => navigate(`/destinations/${slug}`)}
            className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-bold text-xs uppercase tracking-widest w-fit"
          >
            <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:border-primary/50 transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </div>
            Retour à la destination
          </button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black text-foreground tracking-tight uppercase">
                Réservation <span className="text-primary">VR</span>
              </h1>
              <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest mt-1 opacity-70">
                Configurez votre expérience virtuelle immersive.
              </p>
            </div>
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center text-primary shadow-sm">
                  <Headset className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start animate-in slide-in-from-bottom-4 duration-500 delay-100">
          <VrBookingSidebar
            session={session}
            values={values}
            destinationSlug={slug}
            selectedPlaceName={selectedPlaceName}
            selectedPlan={selectedPlan}
          />
          <div className="lg:col-span-8 space-y-8">
            <VrBookingForm
              form={form}
              session={session}
              places={places}
              plans={plans}
              onSubmit={onSubmit}
            />

            {/* CTA section integrated in layout */}
            <div className="bg-card border border-border rounded-md p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">
                  Total à régler aujourd'hui
                </p>
                <p className="text-3xl font-black text-primary">
                  {selectedPlan && values.num_participants
                    ? `${selectedPlan.price_monthly * values.num_participants} €`
                    : "— €"}
                </p>
              </div>
              <button
                onClick={handleSubmit(onSubmit)}
                disabled={isBooking}
                className="w-full md:w-auto h-14 flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase tracking-widest text-xs rounded-md px-10 shadow-xl shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-60"
              >
                {isBooking ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Lock className="h-5 w-5" />
                )}
                Réserver mon expérience
              </button>
            </div>
            
            <p className="text-center text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center justify-center gap-2 opacity-60">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              Paiement sécurisé · Confirmation immédiate par email
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
