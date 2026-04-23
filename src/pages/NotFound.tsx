import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";

// ─── Curved text SVG ─────────────────────────────────────────────────────────
function CircularText({ top, bottom }: { top: string; bottom: string }) {
  return (
    <motion.svg
      className="absolute -top-14 -left-10 w-[130px] h-[130px] pointer-events-none z-20"
      viewBox="0 0 140 140"
      animate={{ rotate: 360 }}
      transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
    >
      <defs>
        <path
          id="circlePath"
          d="M 70,70 m -50,0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0"
          fill="transparent"
        />
      </defs>
      <text
        className="fill-foreground"
        style={{ fontSize: "10.5px", fontWeight: 500, letterSpacing: "0.13em", fontFamily: "sans-serif", textTransform: "uppercase" }}
      >
        <textPath href="#circlePath" startOffset="0%">
          {top} • {bottom} •
        </textPath>
      </text>
    </motion.svg>
  );
}

// ─── Postcard stamp ──────────────────────────────────────────────────────────
function PostalLines() {
  return (
    <svg className="absolute -right-14 top-1/2 -translate-y-1/2 w-24 h-16 opacity-60" viewBox="0 0 100 60">
      {[15, 27, 39].map((y, i) => (
        <path
          key={i}
          d={`M 10 ${y} Q 25 ${y - 6} 40 ${y} Q 55 ${y + 6} 70 ${y} Q 85 ${y - 6} 95 ${y}`}
          stroke="#888"
          strokeWidth="1.5"
          fill="none"
        />
      ))}
    </svg>
  );
}

// ─── Postcard ────────────────────────────────────────────────────────────────
function Postcard({ image, alt }: { image: string; alt: string }) {
  return (
    <motion.div
      className="relative z-10"
      initial={{ rotate: 6, scale: 0.92, opacity: 0 }}
      animate={{ rotate: 4, scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
      whileHover={{ rotate: 0, scale: 1.02, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } }}
    >
      {/* Shadow */}
      <div className="absolute inset-0 translate-x-2 translate-y-3 bg-black/20 blur-md rounded-sm" />

      {/* Card */}
      <div className="relative bg-white p-3 shadow-2xl">
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={alt}
            className="w-[320px] h-[200px] sm:w-[380px] sm:h-[230px] object-cover"
          />
          {/* Stamp overlay */}
          <div className="absolute top-3 right-3 w-12 h-14 border-2 border-white/80 bg-white/10 backdrop-blur-[2px] flex items-center justify-center">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
        </div>

        {/* Postcard bottom strip */}
        <div className="mt-2 flex items-center justify-between px-1">
          <span className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">Togo • Afrique</span>
          <span className="text-[10px] text-gray-400 font-mono">404</span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── 404 Page ────────────────────────────────────────────────────────────────
interface NotFoundProps {
  postcardImage?: string;
  postcardAlt?: string;
  curvedTextTop?: string;
  curvedTextBottom?: string;
  heading?: string;
  subtext?: string;
  backButtonLabel?: string;
  backButtonHref?: string;
}

export default function NotFound({
  postcardImage = "https://images.unsplash.com/photo-1575986767340-5d17ae767ab0?w=800&q=80",
  postcardAlt = "Lomé, Togo — Vue du bord de mer",
  curvedTextTop = "WorldAtlas Travel",
  curvedTextBottom = "Lomé • Togo",
  heading = "(404) Cette page s'est perdue quelque part au Togo.",
  subtext = "Pas de panique — même les meilleurs explorateurs font des détours. Revenez à l'accueil et reprenez la route.",
  backButtonLabel = "Retour à l'accueil",
  backButtonHref = "/",
}: NotFoundProps) {

  // Stagger container
  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.13, delayChildren: 0.2 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-background">
      <motion.div
        className="flex flex-col items-center gap-14 sm:gap-16"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >

        {/* ── Postcard area ── */}
        <motion.div variants={fadeUp} className="relative">
          <CircularText top={curvedTextTop} bottom={curvedTextBottom} />
          <Postcard image={postcardImage} alt={postcardAlt} />
          <PostalLines />
        </motion.div>

        {/* ── Text content ── */}
        <motion.div variants={stagger} className="text-center max-w-lg">

          {/* 404 number */}
          <motion.div variants={fadeUp} className="mb-4">
            <span className="inline-block text-[80px] sm:text-[100px] font-black leading-none text-primary/10 select-none tracking-tighter">
              404
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-balance mb-4"
          >
            {heading}
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            className="text-muted-foreground text-sm sm:text-base mb-10 leading-relaxed max-w-sm mx-auto"
          >
            {subtext}
          </motion.p>

          {/* CTA */}
          <motion.div variants={fadeUp}>
            <Link
              to={backButtonHref}
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground shadow-md hover:scale-105 active:scale-95 transition-transform"
            >
              {backButtonLabel}
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </Link>
          </motion.div>

          {/* Lien secondaire */}
          <motion.p variants={fadeUp} className="mt-6 text-xs text-muted-foreground/50">
            Vous cherchez quelque chose ?{" "}
            <Link to="/destinations" className="underline underline-offset-4 hover:text-foreground transition-colors">
              Voir les destinations
            </Link>
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
}