import { Controller, UseFormReturn } from "react-hook-form";
import { fr } from "date-fns/locale";
import {
  MapPin,
  CheckCircle2,
  User,
  Heart,
  Users,
  UserCheck,
  Minus,
  Plus,
} from "lucide-react";

import { CalendarScheduler } from "@/components/ui/calendar-scheduler";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { VR_TIME_SLOTS } from "@/constants/TimeSlots";
import type { BookingFormValues } from "./bookingSchema";
import { PARTICIPATION_TYPES } from "./bookingSchema";
import type {
  VRSessionResponse,
  PlaceListResponse,
  SubscriptionPlanResponse,
} from "@/lib/types";

interface VrBookingFormProps {
  form: UseFormReturn<BookingFormValues>;
  session: VRSessionResponse;
  places: PlaceListResponse[];
  plans?: SubscriptionPlanResponse[];
  onSubmit: (data: BookingFormValues) => void;
}

const PARTICIPATION_ICONS: Record<string, React.ReactNode> = {
  solo: <User className="w-4 h-4" />,
  couple: <Heart className="w-4 h-4" />,
  family: <Users className="w-4 h-4" />,
  friends: <UserCheck className="w-4 h-4" />,
};

function SectionHeading({ n, title }: { n: number; title: string }) {
  return (
    <div className="flex items-center gap-3 pb-5 border-b border-border">
      <div className="w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">
        {n}
      </div>
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
    </div>
  );
}

export function VrBookingForm({
  form,
  session,
  places,
  plans,
  onSubmit,
}: VrBookingFormProps) {
  const { control, handleSubmit, setValue, watch, formState } = form;
  const values = watch();

  return (
    <div className="lg:col-span-8">
      {/* Page title */}
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
          Réservation VR
        </p>
        <h1 className="text-2xl font-bold text-foreground mb-1.5">
          Informations de participation
        </h1>
        <p className="text-sm text-muted-foreground">
          Veuillez remplir ce formulaire pour préparer votre session au mieux.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        {/* ── 1. Date & Heure ── */}
        <section className="space-y-6">
          <SectionHeading n={1} title="Date & Heure de l'événement" />
          <div className="flex flex-col xl:flex-row gap-6 items-start">
            <div className="flex-1 w-full">
              <Controller
                control={control}
                name="booking_date"
                render={({ field }) => (
                  <CalendarScheduler
                    date={field.value}
                    onDateChange={field.onChange}
                    time={values.time_slot}
                    onTimeChange={(time) => setValue("time_slot", time || "")}
                    timeSlots={VR_TIME_SLOTS.slice(0, 6)}
                    className="w-full"
                    locale={fr}
                    disabled={(d: Date) => d < new Date()}
                  />
                )}
              />
              {(formState.errors.booking_date ||
                formState.errors.time_slot) && (
                <p className="text-destructive text-xs mt-2 px-1">
                  {formState.errors.booking_date?.message ||
                    formState.errors.time_slot?.message}
                </p>
              )}
            </div>

            {/* Image de casque vr */}
            {/* <div className="w-full xl:w-64 shrink-0 rounded-md border border-border bg-background p-2">
              <img
                src="/casqueBlanche.png"
                alt="VR Headset"
                className="w-full h-[280px] object-cover rounded-md"
              />
            </div> */}
          </div>
        </section>

        {/* ── 2. Lieu d'immersion ── */}
        <section className="space-y-6">
          <SectionHeading n={2} title="Lieu d'immersion" />
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {places?.slice(0, 3).map((place) => {
              const selected = values.immersion_location_id === place.id;
              return (
                <button
                  key={place.id}
                  type="button"
                  onClick={() => setValue("immersion_location_id", place.id)}
                  className={[
                    "relative p-4 rounded-md border text-left transition-all",
                    selected
                      ? "border-primary bg-primary/5"
                      : "border-border bg-muted/20 hover:border-primary/30",
                  ].join(" ")}
                >
                  <MapPin
                    className={[
                      "h-5 w-5 mb-2.5",
                      selected ? "text-primary" : "text-muted-foreground",
                    ].join(" ")}
                  />
                  <p className="text-sm font-semibold text-foreground leading-snug">
                    Afriatlas VR Center
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">
                    {place.name}
                  </p>
                  {selected && (
                    <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <CheckCircle2 className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          {formState.errors.immersion_location_id && (
            <p className="text-destructive text-xs">
              {formState.errors.immersion_location_id.message}
            </p>
          )}
        </section>

        {/* ── 3 & 4. Participation ── */}
        <section className="space-y-6">
          <SectionHeading n={3} title="Participation" />
          <div className="grid md:grid-cols-2 gap-8">
            {/* Type */}
            <div className="space-y-3">
              <Label className="text-xs font-medium text-muted-foreground">
                Type de participation
              </Label>
              <div className="grid grid-cols-2 gap-2.5">
                {PARTICIPATION_TYPES.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() =>
                      setValue("participation_type", type.id as any)
                    }
                    className={[
                      "flex items-center gap-2.5 px-3 py-3 rounded-md border text-sm font-medium transition-all",
                      values.participation_type === type.id
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border bg-muted/20 text-muted-foreground hover:border-primary/30 hover:text-foreground",
                    ].join(" ")}
                  >
                    {PARTICIPATION_ICONS[type.id]}
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Count */}
            <div className="space-y-3">
              <Label className="text-xs font-medium text-muted-foreground">
                Nombre de participants (max {session.max_participants})
              </Label>
              <div className="flex items-center gap-5 pt-1">
                <button
                  type="button"
                  onClick={() =>
                    setValue(
                      "num_participants",
                      Math.max(1, values.num_participants - 1),
                    )
                  }
                  className="w-10 h-10 rounded-full border-2 border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-all"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-3xl font-bold text-foreground w-8 text-center tabular-nums">
                  {values.num_participants}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setValue(
                      "num_participants",
                      Math.min(
                        session.max_participants,
                        values.num_participants + 1,
                      ),
                    )
                  }
                  className="w-10 h-10 rounded-full border-2 border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-all"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. Profil ── */}
        <section className="space-y-6">
          <SectionHeading n={4} title="Profil des participants" />
          <div className="grid sm:grid-cols-3 gap-4">
            {/* Âge */}
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground">
                Âge moyen
              </Label>
              <Controller
                name="age_range"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="h-11 rounded-md border-border bg-muted/20 text-foreground">
                      <SelectValue placeholder="Sélectionnez…" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12-17">12 - 17 ans</SelectItem>
                      <SelectItem value="18-25">18 - 25 ans</SelectItem>
                      <SelectItem value="26-40">26 - 40 ans</SelectItem>
                      <SelectItem value="41-60">41 - 60 ans</SelectItem>
                      <SelectItem value="60+">60+ ans</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {formState.errors.age_range && (
                <p className="text-destructive text-xs">
                  {formState.errors.age_range.message}
                </p>
              )}
            </div>

            {/* Nationalité */}
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground">
                Pays / Nationalité
              </Label>
              <Controller
                name="nationality"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="h-11 rounded-md border-border bg-muted/20 text-foreground">
                      <SelectValue placeholder="Sélectionnez…" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="France">🇫🇷 France</SelectItem>
                      <SelectItem value="Togo">🇹🇬 Togo</SelectItem>
                      <SelectItem value="Belgique">🇧🇪 Belgique</SelectItem>
                      <SelectItem value="Suisse">🇨🇭 Suisse</SelectItem>
                      <SelectItem value="Canada">🇨🇦 Canada</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {formState.errors.nationality && (
                <p className="text-destructive text-xs">
                  {formState.errors.nationality.message}
                </p>
              )}
            </div>

            {/* Langue */}
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground">
                Langue de l'expérience
              </Label>
              <Controller
                name="language"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="h-11 rounded-md border-border bg-muted/20 text-foreground">
                      <SelectValue placeholder="Sélectionnez…" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Français">Français</SelectItem>
                      <SelectItem value="Anglais">Anglais</SelectItem>
                      <SelectItem value="Ewé">Ewé</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {formState.errors.language && (
                <p className="text-destructive text-xs">
                  {formState.errors.language.message}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ── 5. Expérience & Santé ── */}
        <section className="space-y-6">
          <SectionHeading n={5} title="Expérience & Santé" />
          <div className="grid md:grid-cols-2 gap-8">
            {/* Niveau VR */}
            <div className="space-y-3">
              <Label className="text-xs font-medium text-muted-foreground">
                Niveau d'expérience VR
              </Label>
              <Controller
                name="experience_level"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="space-y-2"
                  >
                    {[
                      {
                        value: "beginner",
                        label: "Débutant",
                        desc: "Première fois",
                      },
                      {
                        value: "intermediate",
                        label: "Intermédiaire",
                        desc: "Quelques essais",
                      },
                      {
                        value: "expert",
                        label: "Expert",
                        desc: "Utilisateur régulier",
                      },
                    ].map((lvl) => (
                      <Label
                        key={lvl.value}
                        htmlFor={lvl.value}
                        className={[
                          "flex items-center gap-3 px-4 py-3 rounded-md border-2 cursor-pointer transition-all",
                          field.value === lvl.value
                            ? "border-primary bg-primary/5"
                            : "border-border bg-muted/20 hover:border-primary/20",
                        ].join(" ")}
                      >
                        <RadioGroupItem value={lvl.value} id={lvl.value} />
                        <div>
                          <p
                            className={[
                              "text-sm font-medium",
                              field.value === lvl.value
                                ? "text-primary"
                                : "text-foreground",
                            ].join(" ")}
                          >
                            {lvl.label}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {lvl.desc}
                          </p>
                        </div>
                      </Label>
                    ))}
                  </RadioGroup>
                )}
              />
            </div>

            {/* Santé */}
            <div className="space-y-3">
              <Label className="text-xs font-medium text-muted-foreground">
                Préférences / État de santé
              </Label>
              <div className="space-y-2">
                {[
                  {
                    name: "health_preferences.motion_sickness" as const,
                    id: "motion",
                    label: "Sensible au mal des transports",
                  },
                  {
                    name: "health_preferences.glasses" as const,
                    id: "glasses",
                    label: "Porte des lunettes de vue",
                  },
                  {
                    name: "health_preferences.loud_noise_sensitive" as const,
                    id: "noise",
                    label: "Sensible aux bruits forts",
                  },
                  {
                    name: "health_preferences.other" as const,
                    id: "other",
                    label: "Autre condition particulière",
                  },
                ].map((item) => (
                  <Controller
                    key={item.id}
                    name={item.name}
                    control={control}
                    render={({ field }) => (
                      <Label
                        htmlFor={item.id}
                        className={[
                          "flex items-center gap-3 px-4 py-3 rounded-md border-2 cursor-pointer transition-all",
                          field.value
                            ? "border-primary bg-primary/5"
                            : "border-border bg-muted/20 hover:border-primary/20",
                        ].join(" ")}
                      >
                        <Checkbox
                          id={item.id}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <span className="text-sm text-foreground">
                          {item.label}
                        </span>
                      </Label>
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. Tarifs ── */}
        <section className="space-y-6">
          <SectionHeading n={6} title="Tarifs & Options" />
          <div className="grid sm:grid-cols-3 gap-4">
            {plans?.slice(0, 3).map((plan, index) => {
              const isPopular = index === 0;
              const selected = values.subscription_plan_id === plan.id;
              return (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setValue("subscription_plan_id", plan.id)}
                  className={[
                    "relative flex flex-col items-start p-5 rounded-md border-2 text-left transition-all",
                    selected
                      ? "border-primary bg-primary/5"
                      : "border-border bg-muted/10 hover:border-primary/30",
                  ].join(" ")}
                >
                  {isPopular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-primary text-primary-foreground px-3 py-0.5 rounded-full uppercase tracking-wider">
                      Recommandé
                    </span>
                  )}

                  <p className="text-sm font-bold text-foreground mb-1">
                    {plan.name}
                  </p>
                  <p className="text-xs text-muted-foreground mb-4 min-h-[2.5rem]">
                    {plan.features || "Expérience immersive complète"}
                  </p>

                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-2xl font-black text-foreground">
                      {plan.price_monthly}€
                    </span>
                    <span className="text-xs text-muted-foreground">
                      / pers.
                    </span>
                  </div>

                  <ul className="space-y-2 w-full">
                    {[
                      "Casque haute résolution",
                      "Guide dédié",
                      ...(isPopular ? ["Souvenir photo inclus"] : []),
                    ].map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-xs text-muted-foreground"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {selected && (
                    <div className="absolute top-4 right-4 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <CheckCircle2 className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          {formState.errors.subscription_plan_id && (
            <p className="text-destructive text-xs">
              {formState.errors.subscription_plan_id.message}
            </p>
          )}
        </section>
      </form>
    </div>
  );
}
