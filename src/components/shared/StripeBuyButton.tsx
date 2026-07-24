import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lock, Loader2, ShieldCheck, CreditCard, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Load stripe using same logic as existing StripeProvider
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || "pk_test_sample");

interface StripeBuyButtonProps {
  amount: number;
  label?: string;
  onSuccess?: (paymentIntentId: string) => void;
  className?: string;
  variant?: "primary" | "outline" | "ghost";
}

export function StripeBuyButton({
  amount,
  label = "Acheter maintenant",
  onSuccess,
  className,
  variant = "primary",
}: StripeBuyButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant={variant === "primary" ? "default" : variant}
        className={cn(
          variant === "primary" ? "bg-primary hover:bg-primary/90 text-zinc-950 font-black shadow-lg shadow-primary/20" : "",
          "rounded-md",
          className
        )}
      >
        <CreditCard className="mr-2 h-4 w-4" />
        {label}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-zinc-950 border-white/10 text-white sm:max-w-[400px] p-0 overflow-hidden rounded-md">
          <Elements stripe={stripePromise}>
            <PaymentModalContent 
                amount={amount} 
                onSuccess={(id) => {
                    onSuccess?.(id);
                    setIsOpen(false);
                }} 
            />
          </Elements>
        </DialogContent>
      </Dialog>
    </>
  );
}

function PaymentModalContent({ amount, onSuccess }: { amount: number; onSuccess: (id: string) => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    
    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement)!,
      });

      if (error) {
        toast.error(error.message || "Échec de la vérification de la carte.");
      } else if (paymentMethod) {
        // Au lieu d'une fausse promesse, on renvoie l'ID généré par Stripe
        toast.success("Carte validée avec succès !");
        onSuccess(paymentMethod.id);
      }
    } catch (err) {
      toast.error("Échec du paiement. Veuillez réessayer.");
    } finally {
      setIsProcessing(false);
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
    <div className="flex flex-col">
      <div className="p-6 bg-gradient-to-br from-zinc-900 to-zinc-950 border-b border-white/5">
        <DialogHeader className="mb-0">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                <Lock className="h-4 w-4 text-primary" />
            </div>
            <DialogTitle className="text-xl font-bold">Paiement Sécurisé</DialogTitle>
          </div>
          <DialogDescription className="text-white/40">
            Finalisez votre achat de <span className="text-white font-bold">{amount.toLocaleString()} FCFA</span>
          </DialogDescription>
        </DialogHeader>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="p-4 rounded-md bg-white/5 border border-white/10">
            <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 block mb-3">Détails de la carte</label>
            <div className="py-2">
                <CardElement options={CARD_OPTIONS} />
            </div>
          </div>
          
          <div className="flex items-center gap-2 px-1">
             <ShieldCheck className="h-3 w-3 text-emerald-400" />
             <span className="text-[10px] text-white/30 uppercase font-medium">Chiffré par Stripe (PCI-DSS)</span>
          </div>
        </div>

        <Button
          type="submit"
          disabled={!stripe || isProcessing}
          className="w-full bg-primary hover:bg-primary/90 text-zinc-950 font-black py-6 rounded-md shadow-xl shadow-primary/10"
        >
          {isProcessing ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            `Payer ${amount.toLocaleString()} FCFA`
          )}
        </Button>

        <div className="flex items-center justify-center gap-4 py-2 border-t border-dashed border-white/5">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-4 opacity-20 grayscale brightness-200" />
             <div className="flex items-center gap-1.5 text-[9px] text-white/20 uppercase font-black tracking-tighter">
                <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                Live Network
             </div>
        </div>
      </form>
    </div>
  );
}
