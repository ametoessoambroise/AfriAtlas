import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, Search, ShoppingCart, User, LayoutDashboard, Map, Camera } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });

  /** Cinq destinations de premier niveau (recommandation Material ≤5) + défilement horizontal pour le reste */
  const items = [
    { id: 0, icon: <Home size={20} aria-hidden />, label: "Accueil", path: "/" },
    { id: 1, icon: <Search size={20} aria-hidden />, label: "Destinations", path: "/destinations" },
    { id: 2, icon: <Camera size={20} aria-hidden />, label: "Albums", path: "/albums" },
    { id: 3, icon: <Map size={20} aria-hidden />, label: "Carte", path: "/carte" },
    { id: 4, icon: <ShoppingCart size={20} aria-hidden />, label: "Panier", path: "/cart" },
    { id: 5, icon: <LayoutDashboard size={20} aria-hidden />, label: "Tableau de bord", path: "/dashboard" },
    { id: 6, icon: <User size={20} aria-hidden />, label: "Profil", path: "/profile" },
  ];

  // Find active index based on current path
  const activeIndex = items.findIndex(item => 
    item.path === "/" ? location.pathname === "/" : location.pathname.startsWith(item.path)
  );

  const active = activeIndex === -1 ? 0 : activeIndex;

  useEffect(() => {
    const updateIndicator = () => {
      if (btnRefs.current[active] && containerRef.current) {
        const btn = btnRefs.current[active];
        const container = containerRef.current;
        if (!btn) return;
        const btnRect = btn.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        setIndicatorStyle({
          width: btnRect.width,
          left: btnRect.left - containerRect.left,
        });
      }
    };

    updateIndicator();
    // Use a small timeout to ensure DOM is ready after route change
    const timeoutId = setTimeout(updateIndicator, 50);
    
    window.addEventListener("resize", updateIndicator);
    return () => {
      window.removeEventListener("resize", updateIndicator);
      clearTimeout(timeoutId);
    };
  }, [active, location.pathname]);

  return (
    <nav
      className="fixed bottom-4 left-0 right-0 z-50 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom,0px))] md:hidden"
      aria-label="Navigation principale mobile"
    >
      <div className="mx-auto max-w-lg overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div
        ref={containerRef}
        className="relative flex min-h-[3.5rem] min-w-max items-center justify-between gap-1 rounded-full border border-white/20 bg-white/85 p-1.5 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-neutral-900/85"
      >
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            ref={(el) => {
              btnRefs.current[index] = el;
            }}
            onClick={() => navigate(item.path)}
            aria-label={item.label}
            aria-current={active === index ? "page" : undefined}
            className={cn(
              "relative flex min-h-11 min-w-11 shrink-0 flex-col items-center justify-center rounded-full px-2 py-1.5 transition-colors duration-200 touch-manipulation",
              active === index
                ? "text-primary dark:text-white"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <div className="z-10">{item.icon}</div>
            <span className="mt-0.5 max-w-[4.25rem] truncate text-center text-[11px] font-semibold uppercase leading-tight tracking-tight sm:text-xs">
              {item.label}
            </span>
          </button>
        ))}

        {/* Sliding Active Indicator */}
        <motion.div
          animate={indicatorStyle}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="absolute top-1.5 bottom-1.5 rounded-full bg-primary/10 dark:bg-white/10 z-0"
        />
      </div>
      </div>
    </nav>
  );
};

export default BottomNav;
export { BottomNav as MobileFootbar };