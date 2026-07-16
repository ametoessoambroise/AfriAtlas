import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useSearchParams } from "react-router-dom";
import { Loader2, Lock, CheckCircle2 } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import AuthLayout from "@/components/auth/AuthLayout";
import PasswordStrength from "@/components/auth/PasswordStrength";
import { Input } from "@/components/ui/input";

const resetSchema = z.object({
  password: z.string().min(8, "Le mot de passe doit faire au moins 8 caractères."),
  password_confirm: z.string(),
}).refine((data) => data.password === data.password_confirm, {
  path: ["password_confirm"],
  message: "Les mots de passe ne correspondent pas.",
});

type ResetValues = z.infer<typeof resetSchema>;

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const { resetPassword, isResetting } = useAuth();
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetValues>({
    resolver: zodResolver(resetSchema),
  });

  const pwValue = watch("password");

  const onSubmit = async (data: ResetValues) => {
    if (!token) return;
    setErrorMsg(null);
    try {
      await resetPassword({ token, new_password: data.password });
      setSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message || "Jeton expiré ou erreur.");
    }
  };

  if (!token && !success) {
     return (
       <AuthLayout
          heading="Lien invalide"
          subheading="Oups ! Ce lien de réinitialisation est incomplet ou expiré."
          backgroundImageUrl="https://images.unsplash.com/photo-1542382257-80da9fb9f5ab?auto=format&fit=crop&q=80"
       >
          <Link to="/forgot-password" className="w-full btn-primary py-3 flex justify-center font-bold">
            Renforcer la demande
          </Link>
       </AuthLayout>
     );
  }

  return (
    <AuthLayout
      heading="Nouveau départ"
      subheading="Définissez un nouveau mot de passe robuste."
      backgroundImageUrl="https://images.unsplash.com/photo-1542382257-80da9fb9f5ab?auto=format&fit=crop&q=80"
    >
      {success ? (
        <div className="bg-green-500/10 border border-green-500/20 rounded-md p-6 text-center animate-in fade-in zoom-in duration-300">
           <div className="w-16 h-16 bg-green-500/20 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
           </div>
           <h3 className="text-xl font-bold mb-2">Mot de passe réinitialisé !</h3>
           <p className="text-sm text-muted-foreground font-medium mb-6">
              Votre sésame pour l'Atlas a bien été chiffré et enregistré.
           </p>
           <Link to="/login" className="w-full btn-primary py-3 flex justify-center font-bold">
              Se connecter maintenant
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
               <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
               <Input
                 {...register("password")}
                 type="password"
                 placeholder="Nouveau mot de passe"
                 className={`w-full bg-surface-alt border ${errors.password ? 'border-destructive' : 'border-border/60'} rounded-md h-12 pl-10 pr-4 text-sm focus:ring-primary/20 font-bold`}
               />
             </div>
             <PasswordStrength password={pwValue} />
             {errors.password && <p className="text-xs text-destructive mt-1 font-medium">{errors.password.message}</p>}
          </div>

          <div>
             <div className="relative">
               <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
               <Input
                 {...register("password_confirm")}
                 type="password"
                 placeholder="Confirmer"
                 className={`w-full bg-surface-alt border ${errors.password_confirm ? 'border-destructive' : 'border-border/60'} rounded-md h-12 pl-10 pr-4 text-sm focus:ring-primary/20 font-bold`}
               />
             </div>
             {errors.password_confirm && <p className="text-xs text-destructive mt-1 font-medium">{errors.password_confirm.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isResetting}
            className="w-full btn-primary py-3 flex justify-center mt-2 font-bold rounded-md"
          >
            {isResetting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sauvegarder"}
          </button>
        </form>
      )}
    </AuthLayout>
  );
}
