import { Link } from 'react-router-dom';
import { HeartOff, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const IMAGES = [
  "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1506461883276-594a12b11cc3?auto=format&fit=crop&q=80&w=400"
];

const EmptyFavorites = () => {
  return (
    <div className="relative min-h-[60vh] flex flex-col items-center justify-center p-6 text-center overflow-hidden rounded-3xl border border-dashed border-border bg-surface/50">
      {/* Background decoration */}
      <div className="absolute inset-0 grid grid-cols-2 gap-4 opacity-5 pointer-events-none scale-110 -rotate-3">
        {IMAGES.map((img, i) => (
          <img key={i} src={img} className="w-full h-full object-cover rounded-2xl" alt="" />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-md"
      >
        <div className="mx-auto w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <HeartOff className="w-10 h-10 text-primary" />
        </div>

        <h2 className="text-2xl font-black mb-3">Votre carnet de voyage est vide</h2>
        <p className="text-muted-foreground mb-8">
          Enregistrez les lieux qui vous font rêver pour les retrouver facilement et planifier votre prochaine escapade au Togo.
        </p>

        <Link
          to="/destinations"
          className="btn-primary inline-flex items-center gap-2 px-8 py-3"
        >
          <MapPin className="w-4 h-4" />
          Explorer les destinations
        </Link>
      </motion.div>
    </div>
  );
};

export default EmptyFavorites;
