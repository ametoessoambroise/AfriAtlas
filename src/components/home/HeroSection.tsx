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
    <section className="relative flex h-[100dvh] w-full items-center justify-center overflow-hidden bg-black">
      {/* ── Vidéo background ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <iframe
          src="https://player.vimeo.com/video/80522930?h=60cc78a870&autoplay=1&loop=1&muted=1&background=1&quality=1080p"
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "100vw",
            height: "56.25vw" /* 16:9 ratio */,
            minHeight: "100vh",
            minWidth: "177.77vh" /* 100 * 16 / 9 */,
            border: 0,
          }}
          allow="autoplay; fullscreen"
          title="Vidéo d'accueil Afriatlas Travel"
        />
        {/* Overlay sombre + Fallback image si besoin */}
        <div className="absolute inset-0 bg-black/55" />
        {/* Gradient bas pour transition vers la section suivante */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      {/* ── Contenu ── */}
      <motion.div
        className="relative z-10 mx-auto max-w-3xl px-6 text-center text-white"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow */}
        <motion.p
          variants={fadeUp}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm"
        >
          <Globe className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
          Découvrez l'Afrique de l'Ouest
        </motion.p>

        {/* Titre */}
        <motion.h1
          variants={fadeUp}
          className="mb-6 text-[clamp(2.5rem,5vw+1rem,4rem)] font-heading font-semibold italic leading-[1.1] tracking-tight"
        >
          Le Togo comme{" "}
          <span className="relative inline-block text-primary">
            vous ne l'avez
            <motion.span
              className="absolute -bottom-1 left-0 h-[3px] rounded-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
          </span>{" "}
          jamais vu
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="mb-10 text-base text-white/75 sm:text-lg md:text-xl leading-relaxed"
        >
          Destinations authentiques, expériences uniques, souvenirs inoubliables
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          className="flex items-center justify-center gap-3"
        >
          <Link
            to="/destinations"
            className="btn-primary inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold shadow-lg hover:scale-105 active:scale-95 transition-transform"
          >
            Explorer le Togo
          </Link>
          <Link
            to="/carte"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm hover:bg-white/20 active:scale-95 transition-all"
          >
            Voir la carte
          </Link>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        <span className="text-xs uppercase tracking-[0.2em] text-white/40">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4 text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
