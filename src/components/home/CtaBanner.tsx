import { motion } from "framer-motion";
import { Eye, Menu, Award, ArrowRight, Play, Globe, Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function CtaBanner() {
  return (
    <section className="relative w-full py-12 md:py-20 lg:py-24 overflow-hidden">
      {/* ── Dot pattern ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#8B8B80 0.6px, transparent 0.6px)`,
          backgroundSize: "24px 24px",
          opacity: 0.28,
        }}
      />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          {/* ── PANNEAU GAUCHE (Noir) ── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex-1 bg-black rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-12 lg:p-14 flex flex-col justify-between overflow-hidden group shadow-2xl min-h-[380px] md:min-h-[440px] lg:min-h-[600px]"
          >
            {/* Glow subtil en arrière-plan */}
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/20 blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex justify-between items-start mb-10 md:mb-14">
              <div className="space-y-3">
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-white text-xl md:text-2xl font-bold tracking-widest"
                >
                  WORLDATLAS
                </motion.h3>
                <div className="flex flex-wrap gap-2">
                  {["Voyages", "Culture", "Découverte"].map((tag, idx) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + idx * 0.1 }}
                      className="px-3 py-1 rounded-full border border-white/20 text-white/60 text-[10px] md:text-xs uppercase tracking-wider"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
              <motion.div
                whileHover={{ rotate: 15 }}
                viewport={{ once: true }}
                className="p-2.5 rounded-full border border-white/20 cursor-pointer hover:border-white/40 transition-colors"
              >
                <Eye className="w-5 h-5 text-white/80" />
              </motion.div>
            </div>

            {/* Titre */}
            <div className="max-w-md">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tighter"
              >
                Votre voyage <br />
                commence <br />
                <span className="text-white/90">ICI&nbsp;!</span>
              </motion.h2>
            </div>

            {/* Footer du panneau */}
            <div className="mt-10 md:mt-14 flex items-end justify-between flex-wrap gap-4">
              <div className="flex gap-5 items-center">
                {/* Mini card image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                  className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 flex-shrink-0 cursor-pointer"
                >
                  <img
                    src="/vr.png"
                    alt="Destination Preview"
                    className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                      <Play className="w-3.5 h-3.5 md:w-4 md:h-4 text-white fill-white ml-0.5" />
                    </div>
                  </div>
                </motion.div>

                {/* Stat */}
                <div className="space-y-1">
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className="text-white text-3xl md:text-4xl font-bold tracking-tight flex items-end gap-0.5"
                  >
                    4<span className="text-xl align-top leading-none">.</span>8
                    <Star className="w-5 h-5 text-amber-400 fill-amber-400 mb-1 ml-1" />
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.9 }}
                    className="text-white/40 text-[10px] md:text-xs leading-tight max-w-[130px]"
                  >
                    Note moyenne sur +12 000 avis voyageurs vérifiés.
                  </motion.p>
                </div>
              </div>

              {/* Indicateur globe */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
                className="flex items-center gap-2 text-white/30 text-xs tracking-widest uppercase"
              >
                <Globe className="w-4 h-4" />
                <span>Togo · Afrique</span>
              </motion.div>
            </div>
          </motion.div>

          {/* ── PANNEAU DROIT (Image) ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex-[1.4] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl group min-h-[380px] md:min-h-[440px] lg:min-h-[600px] cursor-pointer"
          >
            {/* Image */}
            <img
              src="/vr.png"
              alt="Destination Experience"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

            {/* Boutons flottants haut */}
            <div className="absolute top-4 left-4 right-4 sm:top-8 sm:left-8 sm:right-8 flex justify-between items-start">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-black rounded-full flex items-center justify-center shadow-lg cursor-pointer"
              >
                <Award className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer"
              >
                <Menu className="w-4 h-4 md:w-5 md:h-5 text-black" />
              </motion.div>
            </div>

            {/* Carte flottante bas droite */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.8,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 bg-white rounded-[1.75rem] md:rounded-[2rem] p-5 md:p-7 shadow-2xl w-[calc(100%-2rem)] max-w-[260px] sm:max-w-[280px] cursor-pointer"
            >
              <Link to="/destinations" className="block">
                <div className="flex flex-col gap-3 md:gap-4">
                  <div className="flex items-center justify-between bg-black rounded-full py-2.5 px-4 md:px-6 group/btn">
                    <span className="text-white text-xs md:text-sm font-bold uppercase tracking-wider">
                      Explorer
                    </span>
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white flex items-center justify-center -mr-1.5 transition-transform duration-300 group-hover/btn:translate-x-1">
                      <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-black" />
                    </div>
                  </div>
                  <p className="text-black/55 text-xs md:text-sm leading-snug px-1">
                    Découvrez des destinations authentiques au Togo et en
                    Afrique de l'Ouest.
                  </p>
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
