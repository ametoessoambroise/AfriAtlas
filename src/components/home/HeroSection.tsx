import { Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { Globe, ArrowDown } from "lucide-react";

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HeroSection() {
  return (
    <section className="relative flex h-[100dvh] w-full items-center justify-center overflow-hidden bg-[#003b95]">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <iframe
          src="https://player.vimeo.com/video/80522930?h=60cc78a870&autoplay=1&loop=1&muted=1&background=1&quality=1080p"
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "100vw",
            height: "56.25vw",
            minHeight: "100vh",
            minWidth: "177.77vh",
            border: 0,
          }}
          allow="autoplay; fullscreen"
          title="Vidéo d'accueil Afriatlas Travel"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,59,149,0.88),rgba(0,20,42,0.72))]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-5xl px-6 text-center text-white"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={fadeUp}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm"
        >
          <Globe className="h-3.5 w-3.5 shrink-0 text-secondary" aria-hidden />
          Découvrez l'Afrique de l'Ouest
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="mb-6 text-[clamp(2.8rem,5vw+1rem,4.8rem)] font-heading font-semibold leading-[1.05] tracking-tight"
        >
          Réservez votre prochaine aventure au Togo
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mb-10 max-w-2xl text-base text-white/85 sm:text-lg md:text-xl leading-relaxed"
        >
          Destinations authentiques, séjours mémorables et expériences locales sélectionnées pour inspirer vos voyages.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mx-auto mb-8 max-w-4xl rounded-[28px] border border-white/20 bg-white/10 p-3.5 backdrop-blur-xl shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)]"
        >
          <div className="grid gap-3 md:grid-cols-[1.4fr_1fr_1fr_auto]">
            <div className="rounded-2xl bg-white dark:bg-black/80 px-4 py-3 text-left text-sm text-foreground shadow-sm">
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Destination</div>
              <div className="mt-1 font-semibold">Lomé, Kpalimé, Kara...</div>
            </div>
            <div className="rounded-2xl bg-white dark:bg-black/80 px-4 py-3 text-left text-sm text-foreground shadow-sm">
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Dates</div>
              <div className="mt-1 font-semibold">12 - 18 août</div>
            </div>
            <div className="rounded-2xl bg-white dark:bg-black/80 px-4 py-3 text-left text-sm text-foreground shadow-sm">
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Voyageurs</div>
              <div className="mt-1 font-semibold">2 adultes</div>
            </div>
            <Link
              to="/destinations"
              className="inline-flex items-center justify-center rounded-2xl bg-secondary px-5 py-3 text-sm font-bold text-foreground shadow-[0_10px_30px_-12px_rgba(254,187,2,0.9)] transition-all hover:-translate-y-0.5"
            >
              Rechercher
            </Link>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mb-6 flex flex-wrap items-center justify-center gap-3"
        >
          {[
            "Séjours premium",
            "Expériences locales",
            "Paiement simplifié",
          ].map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white/85 backdrop-blur-sm"
            >
              {item}
            </span>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="flex items-center justify-center gap-3"
        >
          <Link
            to="/destinations"
            className="btn-primary inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold shadow-lg hover:scale-105 active:scale-95 transition-transform"
          >
            Explorer le Togo
          </Link>
          <Link
            to="/carte"
            className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm hover:bg-white/20 active:scale-95 transition-all"
          >
            Voir la carte
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        <span className="text-xs uppercase tracking-[0.2em] text-white/50">Scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4 text-white/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
