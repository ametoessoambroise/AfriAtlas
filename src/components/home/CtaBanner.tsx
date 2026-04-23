import { useRef, ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Gamepad2, ArrowRight, Play } from "lucide-react";

// ─── Variants originaux (CtaBanner) ──────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const staggerChildren = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  viewport: { once: true },
};

const childFade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

// ─── Orb flottant (CtaBanner) ───────────────────────────────────────────────
const FloatingOrb = () => (
  <motion.div
    className="relative flex items-center justify-center"
    animate={{ y: [0, -14, 0] }}
    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
  >
    <div className="absolute inset-0 rounded-full bg-white/10 blur-2xl scale-110" />
    <motion.div
      className="absolute w-full h-full rounded-full border border-dashed border-primary/40"
      animate={{ rotate: 360 }}
      transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
    />
    <motion.div
      className="absolute w-[75%] h-[75%] rounded-full border border-dotted border-primary/30"
      animate={{ rotate: -360 }}
      transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
    />
    {[0, 120, 240].map((deg, i) => (
      <motion.div
        key={i}
        className="absolute w-3 h-3 rounded-full bg-primary/40 shadow-[0_0_12px_4px_rgba(59,130,246,0.25)]"
        style={{ top: "50%", left: "50%", transformOrigin: "0 0" }}
        animate={{ rotate: [deg, deg + 360] }}
        transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
      >
        <span
          className="absolute block w-3 h-3 rounded-full bg-primary/60"
          style={{ transform: `rotate(0deg) translateX(${i % 2 === 0 ? 90 : 70}px)` }}
        />
      </motion.div>
    ))}
    <div className="relative flex h-64 w-64 sm:h-72 sm:w-72 md:h-80 md:w-80 lg:h-96 lg:w-96 items-center justify-center rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-sm shadow-2xl">
      <motion.div
        className="absolute inset-0 rounded-full bg-primary/5"
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <Gamepad2 className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 lg:h-36 lg:w-36 text-primary drop-shadow-lg" aria-hidden />
      </motion.div>
      <motion.div
        className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-card text-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, type: "spring", stiffness: 300, damping: 20 }}
      >
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        360° Live
      </motion.div>
      <motion.div
        className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 bg-card text-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.0, type: "spring", stiffness: 300, damping: 20 }}
      >
        ✦ Togo VR
      </motion.div>
    </div>
  </motion.div>
);

// ─── Composant ScrollExpandMedia (Re-écrit avec Framer Motion natif) ────────
interface ScrollExpandMediaProps {
  mediaType?: "video" | "image";
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = "video",
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Utilisation de useScroll de framer-motion pour lier directement l'animation
  // au défilement natif du navigateur. C'est 100x plus robuste que d'écouter les évènements wheel/touch.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calcul des dimensions en fonction du scroll (de 0 à 0.6)
  const mediaWidth = useTransform(scrollYProgress, [0, 0.6], ["300px", "100vw"]);
  const mediaHeight = useTransform(scrollYProgress, [0, 0.6], ["400px", "100vh"]);
  const mediaRadius = useTransform(scrollYProgress, [0, 0.6], ["16px", "0px"]);

  // Déplacement du texte vers l'extérieur
  const titleXLeft = useTransform(scrollYProgress, [0, 0.6], ["0vw", "-100vw"]);
  const titleXRight = useTransform(scrollYProgress, [0, 0.6], ["0vw", "100vw"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Transitions de fond et d'overlay
  const bgOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.7, 0.2]);

  // Apparition du contenu enfant
  const contentOpacity = useTransform(scrollYProgress, [0.7, 0.95], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.7, 1], ["50px", "0px"]);
  const pointerEvents = useTransform(scrollYProgress, (v) => (v > 0.8 ? "auto" : "none"));

  const firstWord = title ? title.split(" ")[0] : "";
  const restOfTitle = title ? title.split(" ").slice(1).join(" ") : "";
  const isIframe = mediaSrc.includes("youtube.com") || mediaSrc.includes("vimeo.com");

  return (
    // Hauteur de 300vh pour créer 3 "écrans" virtuels de défilement pour l'animation
    <div ref={containerRef} className="relative h-[300vh] w-full bg-background">
      {/* Conteneur sticky qui reste fixé à l'écran pendant le scroll */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        
        {/* Background initial */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ opacity: bgOpacity }}
        >
          <img
            src={bgImageSrc}
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>

        {/* Media (Vidéo ou Image) qui s'étend */}
        <motion.div
          className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden shadow-2xl flex items-center justify-center"
          style={{
            width: mediaWidth,
            height: mediaHeight,
            borderRadius: mediaRadius,
          }}
        >
          {mediaType === "video" ? (
            isIframe ? (
              <div className="relative w-full h-[150%] md:h-[120%] pointer-events-none">
                <iframe
                  src={mediaSrc}
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen"
                />
              </div>
            ) : (
              <video
                src={mediaSrc}
                poster={posterSrc}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover pointer-events-none"
              />
            )
          ) : (
            <img
              src={mediaSrc}
              alt={title || "Media"}
              className="w-full h-full object-cover pointer-events-none"
            />
          )}

          {/* Calque d'assombrissement dynamique */}
          <motion.div
            className="absolute inset-0 bg-black"
            style={{ opacity: overlayOpacity }}
          />
        </motion.div>

        {/* Texte du milieu qui s'écarte */}
        <motion.div
          className={`absolute z-10 flex flex-col items-center justify-center w-full pointer-events-none ${
            textBlend ? "mix-blend-difference" : "mix-blend-normal"
          }`}
          style={{ opacity: textOpacity }}
        >
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center justify-center w-full">
            <motion.h2
              className="text-5xl sm:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter"
              style={{ x: titleXLeft }}
            >
              {firstWord}
            </motion.h2>
            <motion.h2
              className="text-5xl sm:text-7xl lg:text-8xl font-black text-primary uppercase tracking-tighter"
              style={{ x: titleXRight }}
            >
              {restOfTitle}
            </motion.h2>
          </div>
          {scrollToExpand && (
            <motion.p
              className="text-white/80 font-medium mt-6 text-sm sm:text-base tracking-widest uppercase"
              style={{ x: titleXLeft }}
            >
              {scrollToExpand}
            </motion.p>
          )}
        </motion.div>

        {/* Contenu final (Les appels à l'action VR) */}
        <motion.div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm"
          style={{ 
            opacity: contentOpacity, 
            y: contentY,
            // @ts-ignore
            pointerEvents: pointerEvents 
          }}
        >
          <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto py-20 overflow-y-auto max-h-screen">
            {children}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

// ─── Main CtaBanner Export ───────────────────────────────────────────────────
export default function CtaBanner() {
  const reduced = useReducedMotion();

  const videoSrc = "https://player.vimeo.com/video/1182356574?h=f5cdf9d140&autoplay=1&loop=1&muted=1&background=1";
  const bgImage = "https://images.unsplash.com/photo-1523496922380-91d5afba98a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";

  return (
    <ScrollExpandMedia
      mediaType="video"
      mediaSrc={videoSrc}
      bgImageSrc={bgImage}
      title="Atlas VR"
      scrollToExpand="Scrollez pour étendre l'expérience"
      textBlend={true}
    >
      <div className="grid items-center gap-12 lg:gap-16 md:grid-cols-2 w-full">
        {/* ── Colonne texte ── */}
        <motion.div
          variants={staggerChildren}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="flex flex-col items-start"
        >
          {/* Badge */}
          <motion.div variants={childFade}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider bg-primary/20 text-primary-foreground rounded-full mb-5 border border-primary/30">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Premium Expérience
            </span>
          </motion.div>

          {/* Titre */}
          <motion.h2
            variants={childFade}
            className="mb-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] text-white"
          >
            Vivez le Togo en{" "}
            <span className="relative inline-block text-primary">
              Réalité Virtuelle
              <motion.span
                className="absolute -bottom-1 left-0 h-[3px] bg-primary/50 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </span>
          </motion.h2>

          {/* Body */}
          <motion.p
            variants={childFade}
            className="mb-8 text-base sm:text-lg text-white/80 leading-relaxed max-w-lg"
          >
            Plongez dans une expérience immersive à 360° avant même de faire vos valises.
            Explorez les plages de Lomé, les montagnes de Kpalimé et les marchés colorés depuis chez vous.
          </motion.p>

          {/* Stats rapides */}
          <motion.div
            variants={childFade}
            className="flex gap-6 sm:gap-8 mb-8"
          >
            {[
              { value: "50+", label: "Destinations" },
              { value: "4K", label: "Résolution" },
              { value: "360°", label: "Immersif" },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col">
                <span className="text-xl sm:text-2xl font-extrabold text-white">{value}</span>
                <span className="text-xs text-white/50 uppercase tracking-wider">{label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={childFade}
            className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
          >
            <Link
              to="/destinations"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 sm:px-8 py-3.5 font-bold text-primary-foreground transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-primary/50 text-sm sm:text-base"
            >
              Réserver une session VR
              <motion.span
                className="inline-block"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </Link>

            <Link
              to="/pricing"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-6 sm:px-8 py-3.5 font-bold text-white transition-all hover:bg-white/20 active:scale-95 backdrop-blur-md border border-white/20 text-sm sm:text-base"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Voir nos offres
            </Link>
          </motion.div>
        </motion.div>

        {/* ── Colonne orb ── */}
        <motion.div
          {...fadeUp(0.25)}
          className="flex justify-center md:justify-end py-10"
        >
          <FloatingOrb />
        </motion.div>
      </div>
    </ScrollExpandMedia>
  );
}