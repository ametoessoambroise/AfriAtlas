import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { getAccessToken, setAccessToken } from "@/lib/api/token";
import { authenticationApi } from "@/lib/api";

type Status = "processing" | "error" | "no_token";

const OAuthCallbackPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<Status>("processing");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Le token a déjà été sauvegardé dans localStorage par main.tsx (IIFE),
    // mais on vérifie aussi le fallback au cas où.
    let accessToken = getAccessToken();

    if (!accessToken) {
      // Fallback : tenter de lire depuis l'URL (si l'IIFE n'a pas pu le faire)
      const params = new URLSearchParams(window.location.search);
      accessToken = params.get("access_token") ?? "";
      if (accessToken) {
        setAccessToken(accessToken);
      }
    }

    if (!accessToken) {
      setStatus("no_token");
      return;
    }

    // Récupérer le profil utilisateur ET mettre à jour le cache React Query
    queryClient
      .fetchQuery({
        queryKey: ["auth", "me"],
        queryFn: () => authenticationApi.getCurrentUserProfile(),
      })
      .then((user) => {
        console.log("✅ OAuthCallback - Utilisateur connecté:", user.email);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.error("❌ OAuthCallback - Erreur récupération profil:", err);
        setErrorMessage(
          err?.friendlyMessage ||
            err?.message ||
            "Impossible de récupérer vos informations.",
        );
        setStatus("error");
      });
  }, [navigate, queryClient]);

  if (status === "processing") {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-border border-t-primary" />
          <p className="mt-4 text-sm text-muted-foreground">
            Connexion en cours…
          </p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
            <svg
              className="h-6 w-6 text-destructive"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-sm font-medium text-destructive">
            Connexion impossible
          </p>
          <p className="mt-1 text-xs text-muted-foreground max-w-xs">
            {errorMessage}
          </p>
          <button
            type="button"
            onClick={() => navigate("/login", { replace: true })}
            className="mt-6 text-sm text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
          >
            Retour à la connexion
          </button>
        </div>
      </div>
    );
  }

  if (status === "no_token") {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-destructive">
            Aucun jeton d'authentification trouvé.
          </p>
          <button
            type="button"
            onClick={() => navigate("/login", { replace: true })}
            className="mt-4 text-sm text-primary underline underline-offset-4"
          >
            Retour à la connexion
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default OAuthCallbackPage;
