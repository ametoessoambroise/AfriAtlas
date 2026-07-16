import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { Loader2, Mail, Lock } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import { getErrorMessage } from "@/lib/utils/errorMessages";
import AuthLayout from "@/components/auth/AuthLayout";
import OAuthButtons from "@/components/auth/OAuthButtons";
import { Input } from "@/components/ui/input";

const loginSchema = z.object({
  email: z.string().email("Veuillez entrer une adresse email valide."),
  password: z.string().min(1, "Le mot de passe est requis."),
  rememberMe: z.boolean().optional(),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoggingIn } = useAuth();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Récupérer l'URL d'origine depuis le state de navigation ou sessionStorage
  const from =
    location.state?.from?.pathname ||
    sessionStorage.getItem("redirectAfterLogin") ||
    "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginValues) => {
    setErrorMsg(null);
    try {
      await login({
        email: data.email,
        password: data.password,
      });
      toast.success("Content de vous revoir !");

      // Nettoyer le sessionStorage après utilisation
      sessionStorage.removeItem("redirectAfterLogin");

      // Rediriger vers l'URL d'origine ou la page d'accueil
      navigate(from, { replace: true });
    } catch (err: any) {
      setErrorMsg(getErrorMessage(err));
    }
  };

  const onValidationError = () => {
    toast.error("Veuillez remplir tous les champs obligatoires correctement.");
  };

  return (
    <AuthLayout
      heading="Bienvenue."
      subheading="Connectez-vous pour accéder à vos réservations et favoris."
      backgroundImageUrl="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80"
    >
      <form
        onSubmit={handleSubmit(onSubmit, onValidationError)}
        className="space-y-4"
      >
        {errorMsg && (
          <div className="bg-destructive/10 text-destructive text-sm font-medium p-3 rounded-lg border border-destructive/20">
            {errorMsg}
          </div>
        )}

        <div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
            <Input
              {...register("email")}
              type="email"
              placeholder="Adresse email"
              className={`w-full bg-surface-alt border ${errors.email ? "border-destructive" : "border-border/60"} rounded-md py-6 pl-10 pr-4 text-sm focus:outline-none focus:border-primary`}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-destructive mt-1 font-medium">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
            <Input
              {...register("password")}
              type="password"
              placeholder="Mot de passe"
              className={`w-full bg-surface-alt border ${errors.password ? "border-destructive" : "border-border/60"} rounded-md h-12 pl-10 pr-4 text-sm focus:ring-primary/20 font-bold`}
            />
          </div>
          {errors.password && (
            <p className="text-xs text-destructive mt-1 font-medium">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer text-muted-foreground hover:text-foreground transition-colors">
            <input
              type="checkbox"
              {...register("rememberMe")}
              className="rounded border-muted-foreground accent-primary"
            />
            <span className="font-medium">Se souvenir de moi</span>
          </label>
          <Link
            to="/forgot-password"
            className="font-bold text-primary hover:underline"
          >
            Mot de passe oublié ?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoggingIn}
          className="w-full btn-primary py-3 flex justify-center mt-2 font-bold"
        >
          {isLoggingIn ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            "Se connecter"
          )}
        </button>
      </form>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground font-bold">
            Ou continuer avec
          </span>
        </div>
      </div>

      <OAuthButtons />

      <p className="mt-8 text-center text-sm text-muted-foreground font-medium">
        Vous n'avez pas de compte ?{" "}
        <Link to="/register" className="font-bold text-primary hover:underline">
          Inscrivez-vous
        </Link>
      </p>
    </AuthLayout>
  );
}

