import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2, Mail, Lock, User } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import { getErrorMessage } from "@/lib/utils/errorMessages";
import AuthLayout from "@/components/auth/AuthLayout";
import OAuthButtons from "@/components/auth/OAuthButtons";
import PasswordStrength from "@/components/auth/PasswordStrength";
import { Input } from "@/components/ui/input";

const registerSchema = z.object({
  first_name: z.string().min(2, "Le prénom doit contenir au moins 2 caractères."),
  last_name: z.string().min(2, "Le nom doit contenir au moins 2 caractères."),
  email: z.string().email("Veuillez entrer une adresse email valide."),
  password: z.string().min(8, "Le mot de passe doit faire au moins 8 caractères."),
  password_confirm: z.string(),
  acceptTerms: z.literal(true, {
    message: "Vous devez accepter les conditions.",
  }),
}).refine((data) => data.password === data.password_confirm, {
  path: ["password_confirm"],
  message: "Les mots de passe ne correspondent pas.",
});

type RegisterValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register: registerApi, isRegistering } = useAuth();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirm: "",
    },
  });

  const pwValue = watch("password");

  const onSubmit = async (data: RegisterValues) => {
    setErrorMsg(null);
    try {
      await registerApi({ 
         email: data.email,
         password: data.password,
         fullname: `${data.first_name} ${data.last_name}`.trim(),
      });
      toast.success("Compte créé avec succès !");
      navigate("/");
    } catch (err: any) {
      setErrorMsg(getErrorMessage(err));
    }
  };

  const onValidationError = () => {
    toast.error("Veuillez remplir tous les champs obligatoires correctement.");
  };

  return (
    <AuthLayout
      heading="Créer un compte"
      subheading="Entrez vos informations pour planifier de futures escapades."
      backgroundImageUrl="https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&q=80"
    >
      <form onSubmit={handleSubmit(onSubmit, onValidationError)} className="space-y-4">
        
        {errorMsg && (
          <div className="bg-destructive/10 text-destructive text-sm font-medium p-3 rounded-lg border border-destructive/20">
            {errorMsg}
          </div>
        )}

        <div className="flex gap-3">
          <div className="flex-1">
             <div className="relative">
               <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
               <input
                 {...register("first_name")}
                 type="text"
                 placeholder="Prénom"
                 className={`w-full bg-surface-alt border ${errors.first_name ? 'border-destructive' : 'border-border/60'} rounded-md py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-primary`}
               />
             </div>
             {errors.first_name && <p className="text-xs text-destructive mt-1 font-medium">{errors.first_name.message}</p>}
          </div>

          <div className="flex-1">
             <input
               {...register("last_name")}
               type="text"
               placeholder="Nom"
               className={`w-full bg-surface-alt border ${errors.last_name ? 'border-destructive' : 'border-border/60'} rounded-md py-3 px-4 text-sm focus:outline-none focus:border-primary`}
             />
             {errors.last_name && <p className="text-xs text-destructive mt-1 font-medium">{errors.last_name.message}</p>}
          </div>
        </div>

        <div>
           <div className="relative">
             <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
             <input
               {...register("email")}
               type="email"
               placeholder="Adresse email"
               className={`w-full bg-surface-alt border ${errors.email ? 'border-destructive' : 'border-border/60'} rounded-md py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-primary`}
             />
           </div>
           {errors.email && <p className="text-xs text-destructive mt-1 font-medium">{errors.email.message}</p>}
        </div>

        <div>
           <div className="relative">
             <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
             <Input
               {...register("password")}
               type="password"
               placeholder="Mot de passe"
               className={`w-full bg-surface-alt border ${errors.password ? 'border-destructive' : 'border-border/60'} rounded-md h-12 pl-10 pr-4 text-sm focus:ring-primary/20 font-bold`}
             />
           </div>
           <PasswordStrength password={pwValue} />
           {errors.password && <p className="text-xs text-destructive mt-1 font-medium">{errors.password.message}</p>}
        </div>

        <div>
           <div className="relative">
             <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
             <input
               {...register("password_confirm")}
               type="password"
               placeholder="Confirmer le mot de passe"
               className={`w-full bg-surface-alt border ${errors.password_confirm ? 'border-destructive' : 'border-border/60'} rounded-md py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-primary`}
             />
           </div>
           {errors.password_confirm && <p className="text-xs text-destructive mt-1 font-medium">{errors.password_confirm.message}</p>}
        </div>

        <div className="flex items-start text-xs text-muted-foreground mt-2">
           <label className="flex items-start gap-2 cursor-pointer transition-colors mt-1">
              <input type="checkbox" {...register("acceptTerms")} className="rounded border-muted-foreground accent-primary mt-0.5" />
              <span className="font-medium leading-tight">
                 J'accepte les <Link to="/terms" className="text-primary hover:underline">Conditions Générales d'Utilisation</Link> et la <Link to="/privacy" className="text-primary hover:underline">Politique de Confidentialité</Link>.
              </span>
           </label>
        </div>
        {errors.acceptTerms && <p className="text-xs text-destructive font-medium">{errors.acceptTerms.message}</p>}

        <button
          type="submit"
          disabled={isRegistering}
          className="w-full btn-primary py-3 flex justify-center mt-4 font-bold rounded-md"
        >
          {isRegistering ? <Loader2 className="w-5 h-5 animate-spin" /> : "S'inscrire"}
        </button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground font-bold">Ou s'inscrire avec</span>
        </div>
      </div>

      <OAuthButtons />

      <p className="mt-8 text-center text-sm text-muted-foreground font-medium">
        Vous avez déjà un compte ?{" "}
        <Link to="/login" className="font-bold text-primary hover:underline">
          Connectez-vous
        </Link>
      </p>
    </AuthLayout>
  );
}
