import {
  MapPin,
  Clock,
  Users,
  Gamepad2,
  CreditCard,
  Phone,
  Mail,
  CheckCircle2,
  Shield,
  Zap,
  Star,
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import type { BookingFormValues } from "./bookingSchema";
import { PARTICIPATION_TYPES } from "./bookingSchema";
import type { VRSessionResponse, SubscriptionPlanResponse } from "@/lib/types";

interface VrBookingSidebarProps {
  session: VRSessionResponse;
  values: BookingFormValues;
  destinationSlug?: string;
  selectedPlaceName?: string;
  selectedPlan?: SubscriptionPlanResponse;
}

function RecapRow({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-muted-foreground mt-0.5 flex-shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">
          {label}
        </p>
        <p
          className={[
            "text-sm font-medium truncate",
            accent ? "text-primary" : "text-foreground",
          ].join(" ")}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

export function VrBookingSidebar({
  session,
  values,
  destinationSlug,
  selectedPlaceName,
  selectedPlan,
}: VrBookingSidebarProps) {
  const participationLabel = PARTICIPATION_TYPES.find(
    (t) => t.id === values.participation_type,
  )?.label;

  return (
    <div className="lg:col-span-4 space-y-5">
      {/* ── Hero card ── */}
      <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-border">
        <img
          src="/dark-blue.png"
          alt="Casque VR"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 p-5">
          <p className="text-white text-2xl font-medium mb-1">Vivez le monde</p>
          <h2 className="text-xl font-bold text-white leading-snug">
            autrement.
          </h2>
          <p className="text-xs text-primary mt-1.5 font-medium">
            Expérience immersive VR unique
          </p>
        </div>
      </div>

      {/* ── Récapitulatif ── */}
      <div className="rounded-2xl border border-border bg-background p-5 space-y-5">
        <div className="flex items-center gap-2 pb-4 border-b border-border">
          <CheckCircle2 className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">
            Récapitulatif
          </h3>
        </div>

        <div className="space-y-4">
          <RecapRow
            icon={<MapPin className="h-4 w-4" />}
            label="Destination"
            value={
              destinationSlug
                ? destinationSlug.replace(/-/g, " ")
                : "Non définie"
            }
          />
          <RecapRow
            icon={<Gamepad2 className="h-4 w-4" />}
            label="Lieu d'immersion"
            value={selectedPlaceName || "À définir"}
          />
          <RecapRow
            icon={<Clock className="h-4 w-4" />}
            label="Date & Heure"
            value={
              values.booking_date
                ? `${format(values.booking_date, "dd/MM/yyyy", { locale: fr })}${values.time_slot ? ` · ${values.time_slot.split(" - ")[0]}` : ""}`
                : "Date non sélectionnée"
            }
          />
          <RecapRow
            icon={<Users className="h-4 w-4" />}
            label="Participants"
            value={`${values.num_participants} pers. · ${participationLabel || "—"}`}
          />
          <RecapRow
            icon={<Star className="h-4 w-4" />}
            label="Expérience"
            value={session.title}
          />
          <RecapRow
            icon={<CreditCard className="h-4 w-4" />}
            label="Tarif sélectionné"
            value={
              selectedPlan
                ? `${selectedPlan.name} · ${selectedPlan.price_monthly}€ / pers.`
                : "À définir"
            }
            accent={!!selectedPlan}
          />
        </div>

        {/* Total */}
        {selectedPlan && (
          <div className="pt-4 border-t border-border flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Total estimé</p>
            <p className="text-lg font-bold text-foreground">
              {selectedPlan.price_monthly * values.num_participants} €
            </p>
          </div>
        )}
      </div>

      {/* ── Aide ── */}
      <div className="rounded-2xl border border-border bg-muted/20 p-5 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Besoin d'aide ?
        </h3>
        <div className="space-y-3">
          <a
            href="tel:+33123456789"
            className="flex items-center gap-3 text-sm text-foreground hover:text-primary transition-colors"
          >
            <div className="h-8 w-8 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
              <Phone className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            +33 1 23 45 67 89
          </a>
          <a
            href="mailto:support@worldatlas.com"
            className="flex items-center gap-3 text-sm text-foreground hover:text-primary transition-colors"
          >
            <div className="h-8 w-8 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
              <Mail className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            support@worldatlas.com
          </a>
        </div>
      </div>

      {/* ── Pourquoi nous ── */}
      <div className="rounded-2xl border border-border bg-background p-5 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Pourquoi choisir WorldAtlas VR ?
        </h3>
        <ul className="space-y-3">
          {[
            {
              icon: <Shield className="h-4 w-4 text-primary" />,
              text: "Matériel dernière génération garanti",
            },
            {
              icon: <Zap className="h-4 w-4 text-secondary" />,
              text: "Sans mal de cœur (optimisation 120fps)",
            },
            {
              icon: <CheckCircle2 className="h-4 w-4 text-primary" />,
              text: "Guide touristique certifié en direct",
            },
          ].map(({ icon, text }) => (
            <li
              key={text}
              className="flex items-center gap-2.5 text-sm text-muted-foreground"
            >
              {icon}
              {text}
            </li>
          ))}
        </ul>
      </div>
      <img
        src="/casque.png"
        alt="casque"
        className="rounded-md shadow-lg w-full object-cover "
      />
    </div>
  );
}
