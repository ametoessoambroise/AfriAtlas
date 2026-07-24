import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useDelivery } from "@/hooks/queries/useDelivery";
import { useRealtimeTracker } from "@/components/navigation/UserTracker";
import { searchApi } from "@/lib/api";
import { MapPin, Navigation, Search, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface DeliveryFormProps {
  onAddressSelect: (addressId: string) => void;
  selectedAddressId: string | null;
}

export default function DeliveryForm({ 
  onAddressSelect, 
  selectedAddressId 
}: DeliveryFormProps) {
  const { user } = useAuth();
  const { addresses, createAddress, isCreatingAddress } = useDelivery();
  const { position, isTracking, setIsTracking } = useRealtimeTracker();
  
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeout = useRef<NodeJS.Timeout>();

  const [formData, setFormData] = useState({
    label: "Maison",
    recipient_name: user ? `${user.fullname || ""}`.trim() : "",
    recipient_phone: "",
    street_address: "",
    city: "Lomé",
    country: "Togo",
    latitude: undefined as number | undefined,
    longitude: undefined as number | undefined,
  });

  // Recherche Autocomplete
  useEffect(() => {
    if (searchQuery.length > 2) {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
      searchTimeout.current = setTimeout(async () => {
        setIsSearching(true);
        try {
          const results = await searchApi.searchDestinations({ q: searchQuery });
          setSearchResults(results);
        } catch (err) {
          console.error(err);
        } finally {
          setIsSearching(false);
        }
      }, 500);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSelectResult = (place: any) => {
    setFormData(prev => ({
      ...prev,
      street_address: place.name,
      city: place.city || prev.city,
      latitude: place.latitude,
      longitude: place.longitude
    }));
    setSearchResults([]);
    setSearchQuery("");
  };

  // Gérer la détection GPS
  useEffect(() => {
    if (position) {
      setFormData(prev => ({
        ...prev,
        latitude: position[0],
        longitude: position[1],
        street_address: prev.street_address || "Position GPS détectée"
      }));
      setIsTracking(false);
      toast.success("Position GPS récupérée !");
    }
  }, [position, setIsTracking]);

  const handleCreateAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newAddr = await createAddress(formData);
      onAddressSelect(newAddr.id);
      setIsAddingNew(false);
      toast.success("Adresse enregistrée.");
    } catch (err) {
      toast.error("Erreur lors de l'enregistrement.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
            <MapPin className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-black">Adresse de livraison</h3>
            <p className="text-sm text-muted-foreground">Choisissez où le colis doit être livré.</p>
          </div>
        </div>
        {!isAddingNew && (
          <button
            onClick={() => setIsAddingNew(true)}
            className="rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary transition-colors hover:bg-primary/15"
          >
            + Nouvelle adresse
          </button>
        )}
      </div>

      {isAddingNew ? (
        <form onSubmit={handleCreateAddress} className="space-y-4 rounded-[20px] border border-border bg-surface-alt p-6 animate-in fade-in zoom-in-95 duration-200">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 md:col-span-1">
              <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">Libellé (ex: Bureau)</label>
              <input 
                required
                value={formData.label}
                onChange={e => setFormData({...formData, label: e.target.value})}
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
              />
            </div>
            <div className="col-span-2 md:col-span-1">
               <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">Destinataire</label>
               <input 
                 required
                 value={formData.recipient_name}
                 onChange={e => setFormData({...formData, recipient_name: e.target.value})}
                 className="w-full bg-background border border-border rounded-md px-4 py-2"
               />
            </div>
          </div>

          <div>
             <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">Téléphone Togo</label>
             <input 
               required
               placeholder="+228 XX XX XX XX"
               value={formData.recipient_phone}
               onChange={e => setFormData({...formData, recipient_phone: e.target.value})}
               className="w-full bg-background border border-border rounded-md px-4 py-2"
             />
          </div>

          <div className="relative">
             <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">Rechercher un lieu ou saisir l'adresse</label>
             <div className="relative">
                <input 
                  required
                  placeholder="Ex: Rue 15, Quartier Adidogomé"
                  value={formData.street_address}
                  onChange={e => {
                    setFormData({...formData, street_address: e.target.value});
                    setSearchQuery(e.target.value);
                  }}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 pr-24 text-sm focus:border-primary focus:outline-none"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                   {isSearching && <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />}
                   <button
                     type="button"
                     onClick={() => setIsTracking(true)}
                     disabled={isTracking}
                     className="rounded-lg bg-primary/10 p-1.5 text-primary transition-colors hover:bg-primary/20"
                     title="Utiliser ma position GPS"
                   >
                      {isTracking ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Navigation className="w-3.5 h-3.5" />}
                   </button>
                </div>
             </div>

             {searchResults.length > 0 && (
               <div className="absolute z-50 w-full mt-1 bg-background border border-border rounded-md shadow-xl max-h-48 overflow-y-auto">
                 {searchResults.map((result) => (
                   <button
                     key={result.id}
                     type="button"
                     onClick={() => handleSelectResult(result)}
                     className="w-full px-4 py-3 text-left hover:bg-surface-alt transition-colors border-b border-border/50 last:border-0 flex items-center gap-3"
                   >
                     <MapPin className="w-4 h-4 text-muted-foreground" />
                     <div>
                        <p className="text-sm font-bold">{result.name}</p>
                        <p className="text-[10px] text-muted-foreground">{result.city || "Togo"}</p>
                     </div>
                   </button>
                 ))}
               </div>
             )}
          </div>

          <div className="flex gap-4">
             <button 
               type="button"
               onClick={() => setIsAddingNew(false)}
               className="flex-1 rounded-xl border border-border py-3 font-bold transition-colors hover:bg-background"
             >
               Annuler
             </button>
             <button 
               type="submit"
               disabled={isCreatingAddress}
               className="flex-1 rounded-xl bg-primary py-3 font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
             >
               {isCreatingAddress ? "Enregistrement..." : "Confirmer"}
             </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {addresses.map((addr) => (
            <button
              key={addr.id}
              onClick={() => onAddressSelect(addr.id)}
              className={`rounded-[18px] border p-4 text-left transition-all ${
                selectedAddressId === addr.id
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "border-border bg-card hover:border-primary/30"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-black uppercase text-primary bg-primary/10 px-2 py-0.5 rounded">
                  {addr.label}
                </span>
                {selectedAddressId === addr.id && <CheckCircle2 className="w-4 h-4 text-primary" />}
              </div>
              <p className="font-bold text-sm">{addr.recipient_name}</p>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                {addr.street_address}, {addr.city}
              </p>
              <p className="text-[10px] font-medium text-muted-foreground mt-2">
                {addr.recipient_phone}
              </p>
            </button>
          ))}
          
          {addresses.length === 0 && (
             <div className="col-span-2 py-8 text-center bg-surface-alt rounded-md border border-dashed border-border">
                <p className="text-sm text-muted-foreground italic mb-4">Aucune adresse enregistrée.</p>
                <button 
                  onClick={() => setIsAddingNew(true)}
                  className="btn-primary text-xs px-6 py-2"
                >
                  Ajouter ma première adresse
                </button>
             </div>
          )}
        </div>
      )}
    </div>
  );
}
