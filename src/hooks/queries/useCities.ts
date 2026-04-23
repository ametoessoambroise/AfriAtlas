import { useQuery } from "@tanstack/react-query";
import { placesApi } from "@/lib/api";

/**
 * Hook pour récupérer la liste unique des villes disponibles pour le filtrage.
 * Exclut les doublons et ajoute l'option par défaut "Toutes".
 */
export function useCities() {
  return useQuery({
    queryKey: ["places", "cities"],
    queryFn: async () => {
      const cities = await placesApi.getCities();
      // On s'assure que "Toutes" est toujours présent en haut de liste
      return ["Toutes", ...cities];
    },
    staleTime: 1000 * 60 * 60, // Les villes changent rarement (1h de cache)
  });
}
