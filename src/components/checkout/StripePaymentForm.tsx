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
        color: "#ffffff",
        fontFamily: "DM Sans, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Lock className="w-5 h-5 text-primary" />
          Paiement Sécurisé
        </h3>
        <div className="flex gap-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg"
            alt="Stripe"
            className="h-5 opacity-50"
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-surface-alt p-6 rounded-md border border-border">
          <label className="text-xs font-bold uppercase text-muted-foreground mb-4 block">
            Détails de la Carte
          </label>
          <div className="p-4 bg-background border border-border rounded-md">
            <CardElement options={CARD_ELEMENT_OPTIONS} />
          </div>
          <div className="mt-4 flex items-start gap-2 text-[10px] text-muted-foreground">
            <AlertCircle className="w-3 h-3 shrink-0" />
            <p>
              Vos données de carte ne sont jamais stockées sur nos serveurs.
              Elles sont traitées de manière chiffrée par Stripe (PCI-DSS).
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={!stripe || isProcessing || isExternalLoading || total <= 0}
          className="w-full btn-primary py-4 flex items-center justify-center gap-3 font-black transition-transform active:scale-95 disabled:opacity-50"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
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
