import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { toast } from "sonner";
import { Lock, ShieldCheck, CreditCard, Loader2, Calendar as CalendarIcon, ChevronLeft, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SessionSummary } from "@/components/bookings/SessionSummary";
import { useVrSession, useBookVrSession } from "@/hooks/queries/useVrSessions";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || "pk_test_sample");

export default function VrBookingPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: session, isLoading } = useVrSession(id || "");
  const { mutateAsync: bookSession } = useBookVrSession(id || "");

  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("10:00");
  const [participants, setParticipants] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePaymentSuccess = async () => {
    if (!session?.place_slug || !date || !timeSlot) {
      toast.error("Données de réservation incomplètes.");
      return;
    }
    
    setIsProcessing(true);
    try {
      await bookSession({
        body: {
          booking_date: date,
          time_slot: timeSlot,
          num_participants: participants
        },
        slug: session.place_slug
      });
      toast.success("Réservation confirmée avec succès !");
      navigate("/bookings");
    } catch (error) {
      // toast is already handled in the hook's onError
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold">Session introuvable</h1>
        <Button asChild className="mt-8 rounded-xl" variant="outline">
          <Link to="/vr-sessions">Retour au catalogue</Link>
        </Button>
      </div>
    );
  }

  const totalPrice = parseFloat(session.price) * participants;

  return (
    <div className="container py-8 px-4 md:px-8 mx-auto max-w-6xl">
      <Button asChild variant="ghost" className="mb-8 gap-2 rounded-xl text-muted-foreground hover:text-foreground">
        <Link to="/vr-sessions">
          <ChevronLeft className="h-4 w-4" />
          Retour au catalogue
        </Link>
      </Button>

      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight">{session.title}</h1>
        <p className="text-lg text-muted-foreground mt-2">Réservez votre créneau pour cette expérience virtuelle.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12 items-start">
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <CalendarIcon className="h-6 w-6 text-primary" />
                Informations de Réservation
              </h2>
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl flex items-start gap-3">
                <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-primary/80 leading-relaxed">
                  Sélectionnez une date et un créneau horaire. Assurez-vous d'avoir une connexion internet
                  stable pour profiter pleinement de la visite virtuelle avec notre guide.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-sm font-semibold">Date souhaitée</label>
                <div className="relative">
                  <Input 
                    type="date" 
                    required 
                    min={new Date().toISOString().split('T')[0]}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="rounded-xl bg-card border-border h-12 px-4 shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold">Créneau</label>
                <select 
                  className="flex h-12 w-full rounded-xl border border-input bg-card px-3 py-2 text-sm shadow-sm transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-white"
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  required
                >
                  <option value="10:00">10:00 - Matin</option>
                  <option value="14:00">14:00 - Après-midi</option>
                  <option value="18:00">18:00 - Soirée</option>
                </select>
              </div>

              <div className="space-y-3 sm:col-span-2">
                <label className="text-sm font-semibold">Nombre de participants (Max {session.max_participants})</label>
                <Input 
                  type="number" 
                  min={1} 
                  max={session.max_participants}
                  required
                  value={participants}
                  onChange={(e) => setParticipants(parseInt(e.target.value))}
                  className="rounded-xl bg-card border-border h-12 px-4 shadow-sm max-w-[200px]"
                />
              </div>
            </div>

            <div className="pt-8 border-t border-white/10">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Lock className="h-6 w-6 text-emerald-500" />
                Paiement Sécurisé
              </h2>
              
              <div className="p-1 px-1 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  <span className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Transaction Chiffrée par Stripe</span>
                </div>
              </div>

              <Elements stripe={stripePromise}>
                <PaymentForm 
                  amount={totalPrice} 
                  isProcessing={isProcessing}
                  disabled={!date}
                  onSuccess={handlePaymentSuccess} 
                />
              </Elements>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <SessionSummary 
            session={session} 
            date={date ? new Date(date) : undefined} 
            timeSlot={timeSlot} 
            participants={participants} 
          />
        </div>
      </div>
    </div>
  );
}

function PaymentForm({ amount, onSuccess, isProcessing: isBookingPending, disabled }: { 
  amount: number; 
  onSuccess: () => void; 
  isProcessing: boolean;
  disabled: boolean;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isPaying, setIsPaying] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsPaying(true);
    
    // Simulations pour le test
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      onSuccess();
    } catch (err) {
      toast.error("Le paiement a échoué. Veuillez réessayer.");
    } finally {
      setIsPaying(false);
    }
  };

  const CARD_OPTIONS = {
    style: {
      base: {
        color: "#ffffff",
        fontFamily: "DM Sans, sans-serif",
        fontSize: "16px",
        "::placeholder": { color: "rgba(255,255,255,0.2)" },
      },
      invalid: { color: "#ef4444", iconColor: "#ef4444" },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-6 rounded-3xl bg-zinc-900 border border-white/5 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
           <CreditCard className="h-24 w-24 text-white rotate-12" />
        </div>
        
        <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 block mb-4">
          Détails de la Carte Bancaire
        </label>
        
        <div className="py-4 px-2 bg-white/5 rounded-xl border border-white/5">
          <CardElement options={CARD_OPTIONS} />
        </div>
        
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
             <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 text-emerald-500" />
             </div>
             <div>
                <p className="text-xs font-bold text-white uppercase tracking-tighter">Atlas Secure Pay</p>
                <p className="text-[10px] text-white/40">Vos données sont protégées</p>
             </div>
          </div>
          
          <Button 
            type="submit" 
            disabled={!stripe || isPaying || isBookingPending || disabled}
            className="w-full sm:w-auto px-10 h-14 rounded-2xl bg-primary hover:bg-primary/90 text-zinc-950 font-black text-lg shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {isPaying || isBookingPending ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              `Payer ${amount.toLocaleString()} FCFA`
            )}
          </Button>
        </div>
      </div>
      
      <div className="flex items-center justify-center gap-6 py-4 border-t border-dashed border-white/5">
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-5 opacity-30 grayscale brightness-200" />
        <div className="flex items-center gap-1.5 text-[10px] text-white/30 uppercase font-black tracking-widest">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Verified Network
        </div>
      </div>
    </form>
  );
}