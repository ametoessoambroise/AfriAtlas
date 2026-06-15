import React from "react";
import { Link } from "react-router-dom";
import { Rocket, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface AdPromoCardProps {
  layout?: "vertical" | "horizontal";
  className?: string;
}

const AdPromoCard = ({ layout = "vertical", className }: AdPromoCardProps) => {
  const isVertical = layout === "vertical";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn(
        "group relative overflow-hidden rounded-[2.5rem] shadow-2xl transition-all duration-500 hover:shadow-primary/20",
        isVertical ? "aspect-[4/5] w-full max-w-sm" : "h-[400px] w-full",
        className,
      )}
    >
      {/* Background Image & Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1576267423048-15c0040fec78?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Lancer votre business"
          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/40 to-transparent" />
      </div>

      {/* Content */}
      <div
        className={cn(
          "relative h-full flex flex-col p-8 md:p-12",
          isVertical ? "justify-between" : "justify-center sm:max-w-2xl",
        )}
      >
        {/* Top Icon */}
        <motion.div
          whileHover={{ rotate: 12, scale: 1.1 }}
          className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center shadow-xl mb-6 sm:mb-8"
        >
          <Rocket className="w-6 h-6 md:w-8 md:h-8 text-white" />
        </motion.div>

        {/* Text Section */}
        <div className={cn(!isVertical && "sm:mt-0")}>
          <h3 className="text-3xl md:text-5xl font-heading font-bold text-white leading-[1.1] mb-6">
            Veux-tu lancer <br className="hidden sm:block" />
            ton business <br className="hidden sm:block" />
            avec WorldAtlas ?
          </h3>
          <p className="text-white/80 text-base md:text-xl font-medium mb-10 max-w-lg leading-relaxed">
            Rejoins une communauté de voyageurs et d'entrepreneurs et transforme
            ta passion en projet.
          </p>

          <Button
            asChild
            className="h-14 md:h-16 px-10 rounded-2xl bg-white text-primary font-black uppercase tracking-widest hover:bg-zinc-100 transition-all shadow-2xl shadow-black/30 group/btn"
          >
            <Link to="/how-ads-works" className="flex items-center gap-3">
              Lancer mon business
              <ArrowUpRight className="w-6 h-6 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default AdPromoCard;
