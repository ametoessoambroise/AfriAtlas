import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Loader2, Mail, CheckCircle2 } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import AuthLayout from "@/components/auth/AuthLayout";

const forgotSchema = z.object({
  email: z.string().email("Veuillez entrer une adresse email valide."),
});

type ForgotValues = z.infer<typeof forgotSchema>;

export default function ForgotPasswordPage() {
  const { forgotPassword, isForgotRequesting } = useAuth();
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotValues>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = async (data: ForgotValues) => {
    setErrorMsg(null);
    try {
      await forgotPassword(data.email);
      setSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message || "Impossible d'envoyer l'email de réinitialisation.");
    }
  };

  return (
    <AuthLayout
      heading="Oubli de passe ?"
      subheading="Ne vous inquiétez pas, ça arrive à tout le monde. Entrez votre email."
      backgroundImageUrl="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80"
    >
      {success ? (
        <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 text-center animate-in fade-in zoom-in duration-300">
           <div className="w-16 h-16 bg-green-500/20 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
           </div>
           <h3 className="text-xl font-bold mb-2">Lien envoyé !</h3>
           <p className="text-sm text-muted-foreground font-medium mb-6">
              Vérifiez votre boîte de réception. Un lien sécurisé vous a été transmis pour choisir un nouveau mot de passe.
           </p>
           <Link to="/login" className="w-full btn-primary py-3 flex justify-center font-bold">
              Retour à la connexion
           </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {errorMsg && (
            <div className="bg-destructive/10 text-destructive text-sm font-medium p-3 rounded-lg border border-destructive/20">
              {errorMsg}
            </div>
          )}

          <div>
             <div className="relative">
               <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
               <input
                 {...register("email")}
                 type="email"
                 placeholder="Adresse email du compte"
                 className={`w-full bg-surface-alt border ${errors.email ? 'border-destructive' : 'border-border/60'} rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-primary`}
               />
             </div>
             {errors.email && <p className="text-xs text-destructive mt-1 font-medium">{errors.email.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isForgotRequesting}
            className="w-full btn-primary py-3 flex justify-center mt-2 font-bold"
          >
            {isForgotRequesting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Envoyer le lien"}
          </button>
        </form>
      )}

      {!success && (
        <p className="mt-8 text-center text-sm text-muted-foreground font-medium">
          Je me souviens de mon passe.{" "}
          <Link to="/login" className="font-bold text-primary hover:underline">
            Se connecter
          </Link>
        </p>
      )}
    </AuthLayout>
  );
}
