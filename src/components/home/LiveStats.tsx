import { useMemo } from "react";
import { usePlaces } from "@/hooks/queries/usePlaces";

export default function LiveStats() {
  const { data } = usePlaces({ page_size: 100 });

  const stats = useMemo(() => {
    const items = data?.items ?? [];
    const total = data?.total ?? items.length;
    const cities = new Set(items.map((i) => i.city).filter(Boolean));
    return [
      { value: total > 0 ? String(total) : "—", label: "Destinations" },
      { value: cities.size > 0 ? String(cities.size) : "—", label: "Villes" },
      { value: "98%", label: "Satisfaction" },
      { value: "VR", label: "Disponible" },
    ];
  }, [data?.items, data?.total]);

  return (
    <div className="absolute bottom-0 left-0 right-0 z-20">
      <div className="container">
        <div className="grid grid-cols-2 gap-4 rounded-t-2xl bg-card/10 p-6 backdrop-blur-md md:grid-cols-4 border-t border-x border-white/10 shadow-xl">
          {stats.map((s) => (
            <div key={s.label} className="text-center text-white">
              <div className="text-[clamp(1.5rem,3vw+0.5rem,2.5rem)] font-heading font-semibold italic drop-shadow-md">
                {s.value}
              </div>
              <div className="text-xs text-white/90 md:text-sm font-medium drop-shadow-sm uppercase tracking-widest">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
