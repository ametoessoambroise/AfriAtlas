import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// ⚡ Intercepter le token OAuth AVANT le rendu React
// Évite le race condition où le Navbar (useAuth) fetch /auth/me
// avant que OAuthCallbackPage n'ait sauvegardé le token.
(function interceptOAuthToken() {
  try {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("access_token");
    if (token) {
      localStorage.setItem("access_token", token);
      // Nettoyer l'URL pour ne pas exposer le token
      window.history.replaceState({}, "", "/auth/callback");
    }
  } catch {
    // Sécurité : ignorer silencieusement en cas d'erreur
  }
})();

createRoot(document.getElementById("root")!).render(<App />);
