import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Composant qui réinitialise la position de défilement (scroll) 
 * au sommet de la page à chaque changement de route.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // On scroll vers le haut de la fenêtre
    window.scrollTo(0, 0);
    
    // On peut aussi forcer le scroll sur l'élément principal si nécessaire
    const mainContent = document.getElementById("contenu-principal");
    if (mainContent) {
      mainContent.scrollTop = 0;
    }
  }, [pathname]);

  return null;
}
