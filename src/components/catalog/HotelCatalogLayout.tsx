import { Users, Check, Plus, Minus, Calendar, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatPrice } from "@/stores/cartStore";
import type { Room } from "@/lib/models/ui";
import { useState } from "react";

interface HotelCatalogProps {
  rooms: Room[];
  selectedRoom: string | null;
  setSelectedRoom: (id: string | null) => void;
  checkIn: string;
  setCheckIn: (v: string) => void;
  checkOut: string;
  setCheckOut: (v: string) => void;
  guests: number;
  setGuests: (n: number) => void;
  room: Room | undefined;
  nights: number;
  totalPrice: number;
  onBook: () => void;
  showSuccess: boolean;
}

export default function HotelCatalogLayout({
  rooms,
  selectedRoom,
  setSelectedRoom,
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
  guests,
  setGuests,
  room,
  nights,
  totalPrice,
  onBook,
  showSuccess,
}: HotelCatalogProps) {
  const [isBooking, setIsBooking] = useState(false);

  const handleBook = async () => {
    setIsBooking(true);
    try {
      await onBook();
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <>
      <div className="mb-12">
         <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-3">Chambres & Suites<span className="text-primary">.</span></h2>
         <p className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed">
            Découvrez nos espaces d'exception et réservez votre séjour au cœur de l'Afrique.
         </p>
      </div>

      <div className="mb-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {rooms.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5 }}
            className={`group card-destination overflow-hidden rounded-md transition-all border-2 ${selectedRoom === r.id ? "border-primary shadow-2xl shadow-primary/10 scale-[1.02]" : "border-border/60 shadow-lg shadow-foreground/5 hover:border-primary/20"}`}
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={r.image || "/images/places/placeholder-place.jpg"}
                alt={r.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full text-[10px] font-black text-white uppercase tracking-widest">
                <Users className="h-3 w-3" />
                {r.capacity} Voyageurs
              </div>
              {!r.available && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-[2px]">
                  <span className="rounded-md bg-destructive text-white px-5 py-2 text-xs font-black tracking-[0.2em] uppercase shadow-xl">
                    Complet
                  </span>
                </div>
              )}
            </div>
            
            <div className="p-8">
              <h3 className="font-black text-2xl leading-tight mb-3 group-hover:text-primary transition-colors">{r.name}</h3>
              <p className="mb-8 text-sm text-muted-foreground line-clamp-3 leading-relaxed font-medium">
                {r.description}
              </p>
              
              <div className="flex items-center justify-between border-t border-border/40 pt-6">
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-primary leading-none tracking-tighter">
                    {formatPrice(r.price)}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mt-2">
                    par nuitée
                  </span>
                </div>
                <button
                  type="button"
                  disabled={!r.available}
                  onClick={() => setSelectedRoom(r.id)}
                  className={`rounded-md px-8 py-3.5 text-xs font-black uppercase tracking-widest transition-all ${selectedRoom === r.id ? "bg-foreground text-background shadow-xl" : "bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:scale-105 active:scale-95"}`}
                >
                  {selectedRoom === r.id ? "Ok" : "Choisir"}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="card-destination mb-12 p-10 md:p-14 rounded-[3rem] border border-border/60 bg-card shadow-2xl shadow-foreground/5 relative overflow-hidden group">
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent/5 rounded-full blur-2xl" />
        
        <div className="flex items-center gap-4 mb-10 relative z-10">
           <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center">
              <Calendar className="text-primary w-6 h-6" />
           </div>
           <h2 className="text-3xl font-black tracking-tight">Vérifier les dates</h2>
        </div>
        
        <div className="mb-12 grid gap-6 md:grid-cols-4 relative z-10">
          <div className="p-5 bg-muted/40 rounded-md border border-border/40 focus-within:border-primary/40 transition-colors">
            <label className="mb-3 block text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-60">Arrivée</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full bg-transparent text-sm font-black focus:outline-none cursor-pointer"
            />
          </div>
          <div className="p-5 bg-muted/40 rounded-md border border-border/40 focus-within:border-primary/40 transition-colors">
            <label className="mb-3 block text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-60">Départ</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full bg-transparent text-sm font-black focus:outline-none cursor-pointer"
            />
          </div>
          <div className="p-5 bg-muted/40 rounded-md border border-border/40">
            <label className="mb-3 block text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-60">Voyageurs</label>
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setGuests(Math.max(1, guests - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-md bg-card border border-border/60 text-lg font-black shadow-sm hover:bg-muted active:scale-90 transition-all"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-black text-xl">{guests}</span>
              <button
                type="button"
                onClick={() => setGuests(Math.min(10, guests + 1))}
                className="flex h-10 w-10 items-center justify-center rounded-md bg-card border border-border/60 text-lg font-black shadow-sm hover:bg-muted active:scale-90 transition-all"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="p-5 bg-muted/40 rounded-md border border-border/40 focus-within:border-primary/40 transition-colors">
            <label className="mb-3 block text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-60">Hébergement</label>
            <select
              value={selectedRoom ?? ""}
              onChange={(e) => setSelectedRoom(e.target.value || null)}
              className="w-full bg-transparent text-sm font-black focus:outline-none appearance-none cursor-pointer"
            >
              <option value="">-- Sélectionner --</option>
              {rooms
                .filter((x) => x.available)
                .map((x) => (
                  <option key={x.id} value={x.id}>
                    {x.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        
        <AnimatePresence>
           {room ? (
             <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.98 }}
               className="mb-10 flex flex-col md:flex-row items-center justify-between rounded-md bg-primary/5 border border-primary/20 p-8 overflow-hidden relative z-10"
             >
               <div>
                 <p className="font-black text-foreground text-2xl mb-1 tracking-tight">{room.name}</p>
                 <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest opacity-80">
                   {nights} Nuitée{nights > 1 ? "s" : ""} • {formatPrice(room.price)} / nuit
                 </p>
               </div>
               <div className="mt-6 md:mt-0 text-center md:text-right">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1">Total estimé</p>
                  <p className="text-4xl font-black text-primary tracking-tighter">
                    {formatPrice(totalPrice)}
                  </p>
               </div>
             </motion.div>
           ) : null}
        </AnimatePresence>
        
        <button
          type="button"
          onClick={handleBook}
          disabled={!room || !checkIn || !checkOut || isBooking}
          className="btn-primary w-full md:w-auto px-12 py-5 rounded-md font-black text-base uppercase tracking-widest shadow-2xl shadow-primary/30 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none hover:scale-[1.02] active:scale-[0.98] transition-all relative z-10 flex items-center justify-center gap-3"
        >
           {isBooking ? (
             <>
               <Loader2 className="w-5 h-5 animate-spin" />
               Validation...
             </>
           ) : (
             "Confirmer la demande"
           )}
        </button>
      </div>

      <AnimatePresence>
         {showSuccess ? (
           <motion.div
             initial={{ opacity: 0, y: 50, scale: 0.9 }}
             animate={{ opacity: 1, y: 0, scale: 1 }}
             exit={{ opacity: 0, y: 20, scale: 0.9 }}
             className="fixed bottom-10 right-10 z-50 flex items-center gap-5 rounded-md bg-emerald-600 px-8 py-6 text-white shadow-2xl border border-white/20"
             role="status"
           >
             <div className="bg-white/20 p-3 rounded-md backdrop-blur-sm shadow-inner">
                <Check className="h-7 w-7" aria-hidden />
             </div>
             <div>
               <p className="font-black text-xl tracking-tight leading-tight">Réservation Transmise !</p>
               <p className="text-sm text-emerald-50 mt-1 font-bold opacity-90 uppercase tracking-widest">
                 Réponse de l'hôte sous 24h.
               </p>
             </div>
           </motion.div>
         ) : null}
      </AnimatePresence>
    </>
  );
}
