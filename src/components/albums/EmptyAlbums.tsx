import { Link } from "react-router-dom";
import { Camera, Plus } from "lucide-react";
import { motion } from "framer-motion";

const DECORATIVE_IMAGES = [
  "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1506461883276-594a12b11cc3?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?auto=format&fit=crop&q=80&w=400",
];

const EmptyAlbums = () => {
  return (
    <div className="relative min-h-[60vh] flex flex-col items-center justify-center p-8 text-center overflow-hidden rounded-[2.5rem] border border-dashed border-border ">
      {/* Decorative background grid */}
      <div className="absolute inset-0 grid grid-cols-2 gap-4 opacity-[0.09] pointer-events-none scale-110 -rotate-2">
        {DECORATIVE_IMAGES.map((img, i) => (
          <img
            key={i}
            src={img}
            className="w-full h-full object-cover rounded-3xl"
            alt=""
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-lg"
      >
        <div className="mx-auto w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-8 rotate-3">
          <Camera className="w-10 h-10 text-primary" />
        </div>

        <h2 className="text-3xl font-black mb-4 tracking-tight">
          Capturez vos souvenirs
        </h2>
        <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
          Commencez à créer des albums pour organiser vos photos de voyage,
          raconter vos histoires et partager vos aventures au Togo avec vos
          proches.
        </p>

        <Link
          to="/albums/new"
          className="btn-primary inline-flex items-center gap-3 px-10 py-4 shadow-xl shadow-primary/20 hover:scale-105 transition-all"
        >
          <Plus className="w-5 h-5" />
          Créer mon premier album
        </Link>
      </motion.div>
    </div>
  );
};

export default EmptyAlbums;
