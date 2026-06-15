import { useParams, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";

import { useVrSession, useBookVrSession } from "@/hooks/queries/useVrSessions";
import { getPlaces } from "@/lib/api/places";
import { listSubscriptionPlans } from "@/lib/api/subscriptions";

import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2, Lock, ShieldCheck } from "lucide-react";

import {
  bookingSchema,
  type BookingFormValues,
} from "./components/bookingSchema";
import { VrBookingSidebar } from "./components/VrBookingSidebar";
import { VrBookingForm } from "./components/VrBookingForm";

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
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground">
          Session introuvable
        </h1>
        <p className="text-muted-foreground mt-2 mb-8">
          Cette session VR n'existe pas ou a été supprimée.
        </p>
        <Button asChild variant="outline" className="rounded-xl">
          <Link to="/vr-sessions">Retour au catalogue</Link>
        </Button>
      </div>
    );
  }

  const selectedPlaceName = places.find(
    (p) => p.id === values.immersion_location_id,
  )?.name;
  const selectedPlan = plans?.find((p) => p.id === values.subscription_plan_id);

  return (
    <div className="min-h-screen bg-muted/30">
      {/* ── Topbar ── */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="gap-1.5 text-muted-foreground hover:text-foreground rounded-xl"
          >
            <Link to={`/destination/${slug}`}>
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:block">Retour à la destination</span>
              <span className="sm:hidden">Retour</span>
            </Link>
          </Button>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            Paiement sécurisé
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <VrBookingSidebar
            session={session}
            values={values}
            destinationSlug={slug}
            selectedPlaceName={selectedPlaceName}
            selectedPlan={selectedPlan}
          />
          <VrBookingForm
            form={form}
            session={session}
            places={places}
            plans={plans}
            onSubmit={onSubmit}
          />
        </div>

        {/* ── CTA inline (remplace le sticky footer) ── */}
        <div className="mt-10 max-w-3xl ml-auto">
          <div className="rounded-2xl border border-border bg-background p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-xs text-muted-foreground">
                Total à régler aujourd'hui
              </p>
              <p className="text-2xl font-bold text-foreground mt-0.5">
                {selectedPlan && values.num_participants
                  ? `${selectedPlan.price_monthly * values.num_participants} €`
                  : "— €"}
              </p>
            </div>
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={isBooking}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl px-8 py-3.5 transition-all active:scale-[0.98] disabled:opacity-60"
            >
              {isBooking ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Lock className="h-4 w-4" />
              )}
              Réserver mon expérience
            </button>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-3 flex items-center justify-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5" />
            Une confirmation vous sera envoyée par email avec tous les détails.
          </p>
        </div>
      </div>
    </div>
  );
}
