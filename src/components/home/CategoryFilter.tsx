import { Link } from "react-router-dom";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Map, Hotel, Gamepad2, ArrowRight, Utensils } from "lucide-react";
import { MouseEvent } from "react";
import type { PlaceCategory } from "@/lib/types";

interface CategoryItem {
  id: PlaceCategory;
  icon: any;
  title: string;
  desc: string;
  link: string;
  accent: string;
  iconBg: string;
  iconColor: string;
  number: string;
}

const categories: CategoryItem[] = [
  {
    id: "museum",
    icon: Map,
    title: "Culture & Patrimoine",
    desc: "Plongez dans l'histoire, les musées et le riche patrimoine du Togo.",
    link: "/destinations?category=museum",
    accent: "from-amber-500/20 via-orange-400/10 to-transparent",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-500",
    number: "01",
  },
  {
    id: "hotel",
    icon: Hotel,
    title: "Hébergements",
    desc: "Hôtels de luxe, éco-lodges et maisons d'hôtes de charme sélectionnées.",
    link: "/destinations?category=hotel",
    accent: "from-blue-500/20 via-indigo-400/10 to-transparent",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
    number: "02",
  },
  {
    id: "activity",
    icon: Gamepad2,
    title: "Loisirs & Aventures",
    desc: "Randonnées, parcs, expériences VR et activités en plein air.",
    link: "/destinations?category=activity",
    accent: "from-emerald-500/20 via-teal-400/10 to-transparent",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-500",
    number: "03",
  },
  {
    id: "restaurant",
    icon: Utensils,
    title: "Gastronomie",
    desc: "Découvrez les meilleures saveurs locales et restaurants raffinés.",
    link: "/destinations?category=restaurant",
    accent: "from-rose-500/20 via-pink-400/10 to-transparent",
    iconBg: "bg-rose-500/10",
    iconColor: "text-rose-500",
    number: "04",
  },
];

// ─── Card avec spotlight effect au hover ──────────────────────────────────────
function CategoryCard({
  cat,
  index,
}: {
  cat: (typeof categories)[0];
  index: number;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }: MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const spotlight = useMotionTemplate`radial-gradient(220px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.06), transparent 80%)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link
        to={cat.link}
        className="block h-full group"
        onMouseMove={handleMouseMove as any}
      >
        <div
          className="relative h-full overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-300 group-hover:border-border group-hover:shadow-xl group-hover:-translate-y-1"
          onMouseMove={handleMouseMove}
        >
          {/* Spotlight au hover */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            style={{ background: spotlight }}
          />

          {/* Gradient accent en haut */}
          <div
            className={`absolute inset-x-0 top-0 h-32 bg-gradient-to-b ${cat.accent} pointer-events-none`}
          />

          {/* Numéro décoratif */}
          <span className="absolute top-5 right-6 text-6xl font-black text-muted-foreground/5 select-none leading-none pointer-events-none">
            {cat.number}
          </span>

          <div className="relative z-20 flex h-full flex-col p-7 sm:p-8">
            {/* Icône */}
            <motion.div
              className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${cat.iconBg} border border-border/40`}
              whileHover={{ scale: 1.08, rotate: -4 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <cat.icon className={`h-7 w-7 ${cat.iconColor}`} aria-hidden />
            </motion.div>

            {/* Texte */}
            <h3 className="mb-2.5 text-lg font-bold tracking-tight">
              {cat.title}
            </h3>
            <p className="mb-6 flex-1 text-sm text-muted-foreground leading-relaxed">
              {cat.desc}
            </p>

            {/* CTA */}
            <div className="flex items-center gap-2 text-sm font-semibold text-primary mt-auto">
              Explorer
              <motion.span
                className="inline-flex items-center"
                animate={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </motion.span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Section principale ───────────────────────────────────────────────────────
export default function CategoryFilter() {
  return (
    <section className="bg-surface-alt py-20 sm:py-24 overflow-hidden">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 text-center"
        >
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/15 mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Catégories
          </motion.span>

          <h2 className="section-title mb-4 max-w-xl mx-auto">
            Une plateforme,{" "}
            <span className="relative inline-block">
              toutes vos expériences
              <motion.span
                className="absolute -bottom-1 left-0 h-[3px] bg-primary/40 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.7,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </span>
          </h2>

          <p className="section-subtitle mx-auto max-w-md">
            Explorez le Togo par catégorie pour un voyage qui vous ressemble
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.title} cat={cat} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link
            to="/destinations"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors group"
          >
            Voir toutes les destinations
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
