import { useEffect, useState, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const { verifyEmail } = useAuth();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // useRef to prevent double requests caused by React 18 StrictMode
  const verified = useRef(false);

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setErrorMsg("Aucun jeton de vérification fourni.");
      return;
    }

    if (verified.current) return;
    verified.current = true;

    const performVerification = async () => {
      try {
        await verifyEmail(token);
        setStatus("success");
      } catch (err: any) {
        setStatus("error");
        setErrorMsg(err.message || "Ce lien est invalide ou a expiré.");
      }
    };

    performVerification();
  }, [token, verifyEmail]);

  return (
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-card p-8 rounded-3xl shadow-xl border border-border text-center">
        
        {status === "loading" && (
          <div className="animate-in fade-in zoom-in duration-300">
             <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-6" />
             <h2 className="text-xl font-bold mb-2">Vérification en cours...</h2>
             <p className="text-muted-foreground text-sm font-medium">
               Veuillez patienter pendant que nous validons votre identité.
             </p>
          </div>
        )}

        {status === "success" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="w-16 h-16 bg-green-500/20 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8" />
             </div>
             <h2 className="text-xl font-bold mb-2">Email Confirmé !</h2>
             <p className="text-muted-foreground text-sm font-medium mb-8">
               Votre compte WorldAtlas est désormais actif. Vous pouvez accéder à toutes les fonctionnalités.
             </p>
             <Link to="/login" className="btn-primary w-full py-3 inline-block font-bold">
               Aller à la connexion
             </Link>
          </div>
        )}

        {status === "error" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="w-16 h-16 bg-destructive/20 text-destructive rounded-full flex items-center justify-center mx-auto mb-6">
                <XCircle className="w-8 h-8" />
             </div>
             <h2 className="text-xl font-bold mb-2">Échec de la validation</h2>
             <p className="text-muted-foreground text-sm font-medium mb-8">
               {errorMsg}
             </p>
             <Link to="/forgot-password" className="btn-primary w-full py-3 inline-block font-bold">
               Redemander un lien
             </Link>
          </div>
        )}

      </div>
    </div>
  );
}
