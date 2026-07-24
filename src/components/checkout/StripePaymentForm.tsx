import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Lock, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface StripePaymentFormProps {
  onSuccess: (paymentIntentId: string) => void;
  isLoading?: boolean;
  total: number;
}

export default function StripePaymentForm({
  onSuccess,
  isLoading: isExternalLoading,
  total,
}: StripePaymentFormProps) {
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
        toast.success("Carte validée avec succès !");
        onSuccess(paymentMethod.id);
      }
    } catch (err) {
      toast.error("Échec du paiement. Veuillez réessayer.");
    } finally {
      setIsProcessing(false);
    }
  };

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#0f172a",
        fontFamily: "DM Sans, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#94a3b8",
        },
      },
      invalid: {
        color: "#e11d48",
        iconColor: "#e11d48",
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
            <Lock className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-black">Paiement Sécurisé</h3>
            <p className="text-sm text-muted-foreground">Validation de carte via Stripe.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg"
            alt="Stripe"
            className="h-5 opacity-50"
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-[20px] border border-border bg-surface-alt p-6">
          <label className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Détails de la Carte
          </label>
          <div className="rounded-2xl border border-border bg-background p-4">
            <CardElement options={CARD_ELEMENT_OPTIONS} />
          </div>
          <div className="mt-4 flex items-start gap-2 text-[10px] text-muted-foreground">
            <AlertCircle className="h-3 w-3 shrink-0" />
            <p>
              Vos données de carte ne sont jamais stockées sur nos serveurs.
              Elles sont traitées de manière chiffrée par Stripe (PCI-DSS).
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={!stripe || isProcessing || isExternalLoading || total <= 0}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-primary px-4 py-4 text-sm font-black uppercase tracking-[0.2em] text-primary-foreground transition-transform active:scale-95 disabled:opacity-50"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Traitement en cours...</span>
            </>
          ) : (
            <span>Confirmer et Payer</span>
          )}
        </button>
      </form>
    </div>
  );
}
