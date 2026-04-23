import { Users, Check, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatPrice } from "@/stores/cartStore";
import type { Room } from "@/lib/models/ui";

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
  return (
    <>
      <div className="mb-8">
         <h2 className="text-3xl font-extrabold tracking-tight mb-2">Chambres & Tarifs</h2>
         <p className="text-muted-foreground text-sm md:text-base">Découvrez les disponibilités et bloquez votre nid pour le séjour.</p>
      </div>

      <div className="mb-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rooms.map((r) => (
          <motion.div
            key={r.id}
            whileHover={{ y: -3 }}
            className={`card-destination overflow-hidden rounded-3xl transition-all border-2 ${selectedRoom === r.id ? "border-primary shadow-lg shadow-primary/20 scale-[1.01]" : "border-border/60"}`}
          >
            <div className="relative h-56">
              <img
                src={r.image || "/images/places/placeholder-place.jpg"}
                alt={r.name}
                className="h-full w-full object-cover"
              />
              {!r.available ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-[2px]">
                  <span className="rounded-full bg-destructive px-5 py-2 text-sm font-bold tracking-widest uppercase text-destructive-foreground">
                    Complet
                  </span>
                </div>
              ) : null}
            </div>
            
            <div className="p-6">
              <div className="mb-3 flex items-start justify-between gap-4">
                <h3 className="font-extrabold text-lg leading-tight">{r.name}</h3>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-muted/60 rounded-full text-xs font-semibold text-muted-foreground shrink-0">
                  <Users className="h-3.5 w-3.5" aria-hidden />
                  {r.capacity} pers.
                </div>
              </div>
              
              <p className="mb-6 text-sm text-muted-foreground line-clamp-3">
                {r.description}
              </p>
              
              <div className="flex items-center justify-between border-t border-border/60 pt-4 mt-auto">
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-primary leading-none">
                    {formatPrice(r.price)}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-1">
                    par nuit
                  </span>
                </div>
                <button
                  type="button"
                  disabled={!r.available}
                  onClick={() => setSelectedRoom(r.id)}
                  className={`btn-primary rounded-xl px-6 py-2.5 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-40 transition-colors ${selectedRoom === r.id ? "bg-primary text-primary-foreground" : "bg-primary text-primary-foreground"}`}
                >
                  {selectedRoom === r.id ? "Sélectionné" : "Choisir"}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="card-destination mb-8 p-8 md:p-10 rounded-[2rem] border border-border/80 bg-card shadow-xl shadow-foreground/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
           <svg viewBox="0 0 100 100" className="w-64 h-64 fill-current"><circle cx="50" cy="50" r="50"/></svg>
        </div>
        
        <h2 className="mb-8 text-2xl font-extrabold relative z-10">Configurer le séjour</h2>
        
        <div className="mb-8 grid gap-5 md:grid-cols-4 relative z-10">
          <div className="p-4 bg-muted/30 rounded-2xl border border-border/40">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Arrivée</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full bg-transparent text-sm font-semibold focus:outline-none"
            />
          </div>
          <div className="p-4 bg-muted/30 rounded-2xl border border-border/40">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Départ</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full bg-transparent text-sm font-semibold focus:outline-none"
            />
          </div>
          <div className="p-4 bg-muted/30 rounded-2xl border border-border/40">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Voyageurs
            </label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setGuests(Math.max(1, guests - 1))}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-background border border-border text-lg font-bold shadow-sm hover:scale-105 active:scale-95 transition-transform"
              >
                <Minus />
              </button>
              <span className="font-bold text-lg">{guests}</span>
              <button
                type="button"
                onClick={() => setGuests(Math.min(10, guests + 1))}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-background border border-border text-lg font-bold shadow-sm hover:scale-105 active:scale-95 transition-transform"
              >
                <Plus />
              </button>
            </div>
          </div>
          <div className="p-4 bg-muted/30 rounded-2xl border border-border/40">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Chambre</label>
            <select
              value={selectedRoom ?? ""}
              onChange={(e) => setSelectedRoom(e.target.value || null)}
              className="w-full bg-transparent text-sm font-semibold focus:outline-none appearance-none truncate"
            >
              <option value="">Sélectionner...</option>
              {rooms
                .filter((x) => x.available)
                .map((x) => (
                  <option key={x.id} value={x.id}>
                    {x.name} ({formatPrice(x.price)})
                  </option>
                ))}
            </select>
          </div>
        </div>
        
        <AnimatePresence>
           {room ? (
             <motion.div 
               initial={{ opacity: 0, height: 0 }}
               animate={{ opacity: 1, height: 'auto' }}
               exit={{ opacity: 0, height: 0 }}
               className="mb-6 flex flex-col md:flex-row items-center justify-between rounded-2xl bg-primary/5 border border-primary/20 p-6 overflow-hidden relative z-10"
             >
               <div>
                 <p className="font-extrabold text-foreground text-lg mb-1">{room.name}</p>
                 <p className="text-sm font-medium text-muted-foreground">
                   {nights} nuit{nights > 1 ? "s" : ""} sélectionnée(s) au tarif de {formatPrice(room.price)}
                 </p>
               </div>
               <div className="mt-4 md:mt-0 text-right">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Total à régler</p>
                  <p className="text-3xl font-black text-primary">
                    {formatPrice(totalPrice)}
                  </p>
               </div>
             </motion.div>
           ) : null}
        </AnimatePresence>
        
        <button
          type="button"
          onClick={onBook}
          disabled={!room || !checkIn || !checkOut}
          className="btn-primary w-full md:w-auto px-10 py-4 rounded-xl font-bold text-base shadow-lg shadow-primary/20 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none hover:scale-105 active:scale-95 transition-all relative z-10"
        >
           Confirmer ma Demande de Réservation
        </button>
      </div>

      <AnimatePresence>
         {showSuccess ? (
           <motion.div
             initial={{ opacity: 0, y: 50, scale: 0.9 }}
             animate={{ opacity: 1, y: 0, scale: 1 }}
             exit={{ opacity: 0, y: 20, scale: 0.9 }}
             className="fixed bottom-6 right-6 z-50 flex items-center gap-4 rounded-2xl bg-emerald-600 px-6 py-5 text-white shadow-2xl"
             role="status"
           >
             <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                <Check className="h-6 w-6" aria-hidden />
             </div>
             <div>
               <p className="font-extrabold text-lg leading-tight">Réservation prise en compte</p>
               <p className="text-sm text-emerald-50 mt-1 font-medium">
                 L'établissement vous contactera sous 24h pour validation.
               </p>
             </div>
           </motion.div>
         ) : null}
      </AnimatePresence>
    </>
  );
}
