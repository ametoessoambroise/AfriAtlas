import { useState } from 'react';
import { Star, Users, Check, MapPin, Phone, Clock, Wifi, Car, Waves, Dumbbell, Wine, Coffee, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import PageWrapper from '@/components/layout/PageWrapper';
import { formatPrice } from '@/stores/cartStore';
import { useDestination } from '@/hooks/queries/useDestinations';
import { useProducts } from '@/hooks/queries/useProducts';
import { mapProductListToRoom } from '@/lib/mappers/productMapper';
import 'leaflet/dist/leaflet.css';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const amenityIcons: Record<string, React.ElementType> = {
  Wifi, Piscine: Waves, 'Salle de sport': Dumbbell, Parking: Car, Restaurant: Coffee, Bar: Wine,
};

const reviews = [
  { name: 'Pierre Mensah', rating: 5, text: "Service impeccable, vue à couper le souffle depuis le 25ème étage. La piscine est magnifique." },
  { name: 'Aïcha Diallo', rating: 5, text: "Le meilleur hôtel de Lomé sans hésitation. Le personnel est aux petits soins. Je reviendrai !" },
  { name: 'Marc Lefèvre', rating: 4, text: "Excellent rapport qualité-prix pour un hôtel de ce standing. La suite junior est spacieuse et luxueuse." },
];

const HotelPage = () => {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [showSuccess, setShowSuccess] = useState(false);

  const slug = 'hotel-2-fevrier';
  const { data: hotel, isLoading: isLoadingDest } = useDestination(slug);
  const { data: rawProducts, isLoading: isLoadingProducts } = useProducts(slug);

  const ROOMS = rawProducts ? rawProducts.map(mapProductListToRoom) : [];
  const room = ROOMS.find((r) => r.id === selectedRoom);
  const nights = checkIn && checkOut ? Math.max(1, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000)) : 1;
  const totalPrice = room ? room.price * nights : 0;

  const handleBook = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  if (isLoadingDest) {
    return (
      <PageWrapper>
        <div className="flex h-screen items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </PageWrapper>
    );
  }

  if (!hotel) {
    return (
      <PageWrapper>
        <div className="flex h-screen items-center justify-center">
          <p className="text-muted-foreground">Hôtel introuvable.</p>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      {/* Hero */}
      <div className="relative h-[450px] overflow-hidden">
        <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-foreground/10" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container">
            <span className="badge-rating text-xs mb-3 inline-block">Hôtel de luxe</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-card mb-3">{hotel.name}</h1>
            <div className="flex items-center gap-4 text-card/80 text-sm">
              <div className="flex items-center gap-1"><Star className="w-4 h-4 fill-primary text-primary" />{hotel.rating}</div>
              <span>{hotel.address}</span>
              <span>{hotel.priceRange}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-12">
        {/* Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {hotel.gallery.map((img, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} className="rounded-md overflow-hidden aspect-[4/3]">
              <img src={img} alt={`${hotel.name} ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </motion.div>
          ))}
        </div>

        {/* About */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">À propos</h2>
          <p className="text-muted-foreground leading-relaxed max-w-3xl">{hotel.longDescription}</p>
        </div>

        {/* Rooms */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Nos chambres</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {isLoadingProducts ? (
              <div className="col-span-full py-16 flex justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              ROOMS.map((r) => (
                <motion.div key={r.id} whileHover={{ y: -2 }} className={`card-destination overflow-hidden ${selectedRoom === r.id ? 'ring-2 ring-primary' : ''}`}>
                  <div className="relative h-48">
                    <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
                    {!r.available && (
                      <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
                        <span className="bg-destructive text-destructive-foreground px-4 py-1.5 rounded-full font-semibold text-sm">Complet</span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold">{r.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="w-4 h-4" /> {r.capacity}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{r.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {r.amenities.slice(0, 5).map((a) => (
                        <span key={a} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">{a}</span>
                      ))}
                      {r.amenities.length > 5 && <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full">+{r.amenities.length - 5}</span>}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xl font-bold text-primary">{formatPrice(r.price)}</span>
                        <span className="text-sm text-muted-foreground"> / nuit</span>
                      </div>
                      <button
                        disabled={!r.available}
                        onClick={() => setSelectedRoom(r.id)}
                        className="btn-primary text-sm py-2 px-5 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {selectedRoom === r.id ? '✓ Sélectionné' : 'Réserver'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Booking widget */}
        <div className="card-destination p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">Réserver votre séjour</h2>
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1.5">Date d'arrivée</label>
              <Input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full h-11 rounded-md bg-card border-border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Date de départ</label>
              <Input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full h-11 rounded-md bg-card border-border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Voyageurs</label>
              <div className="flex items-center gap-3">
                <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-10 h-10 rounded-md border border-border flex items-center justify-center font-bold text-lg">-</button>
                <span className="font-semibold">{guests}</span>
                <button onClick={() => setGuests(Math.min(6, guests + 1))} className="w-10 h-10 rounded-md border border-border flex items-center justify-center font-bold text-lg">+</button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Chambre</label>
              <Select value={selectedRoom || ''} onValueChange={(val) => setSelectedRoom(val || null)}>
                <SelectTrigger className="w-full h-11 rounded-md bg-card border-border">
                  <SelectValue placeholder="Choisir..." />
                </SelectTrigger>
                <SelectContent>
                  {ROOMS.filter((r) => r.available).map((r) => (
                    <SelectItem key={r.id} value={r.id}>
                      {r.name} — {formatPrice(r.price)}/nuit
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          {room && (
            <div className="flex items-center justify-between p-4 bg-primary/5 rounded-md mb-4">
              <div>
                <p className="font-semibold">{room.name}</p>
                <p className="text-sm text-muted-foreground">{nights} nuit{nights > 1 ? 's' : ''} × {formatPrice(room.price)}</p>
              </div>
              <p className="text-2xl font-bold text-primary">{formatPrice(totalPrice)}</p>
            </div>
          )}
          <button onClick={handleBook} disabled={!room || !checkIn || !checkOut} className="btn-primary w-full md:w-auto disabled:opacity-40 disabled:cursor-not-allowed">
            Confirmer la réservation
          </button>
        </div>

        {showSuccess && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="fixed bottom-6 right-6 bg-primary text-primary-foreground px-6 py-4 rounded-md shadow-2xl flex items-center gap-3 z-50">
            <Check className="w-6 h-6" />
            <div>
              <p className="font-bold">Réservation confirmée !</p>
              <p className="text-sm text-primary-foreground/80">Vous recevrez une confirmation par email.</p>
            </div>
          </motion.div>
        )}

        {/* Services */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Services & Équipements</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {hotel.amenities?.map((a) => {
              const Icon = amenityIcons[a] || Check;
              return (
                <div key={a} className="flex items-center gap-3 p-4 bg-card rounded-md border border-border">
                  <Icon className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">{a}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mini map */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Localisation</h2>
          <div className="h-[300px] rounded-md overflow-hidden border border-border">
            <MapContainer center={[hotel.coordinates.lat, hotel.coordinates.lng]} zoom={15} className="h-full w-full" scrollWheelZoom={false}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[hotel.coordinates.lat, hotel.coordinates.lng]}>
                <Popup>{hotel.name}</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>

        {/* Reviews */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Avis des voyageurs</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div key={r.name} className="card-destination p-6">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-3 italic">"{r.text}"</p>
                <p className="font-semibold text-sm">{r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default HotelPage;
