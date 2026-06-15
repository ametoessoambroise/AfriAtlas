import { motion } from "framer-motion";
import { ChevronRight, ShoppingBag, Star } from "lucide-react";
import type { Destination } from "@/lib/models/ui";

interface PlaceProductsPreviewProps {
  destination: Destination;
}

export default function PlaceProductsPreview({
  destination,
}: PlaceProductsPreviewProps) {
  // Hardcoded menu/products based on the provided design
  // // TODO: Fetch from products API associated with this place
  const products = [
    {
      id: "1",
      name: "Poisson braisé",
      price: "4 500 FCFA",
      category: "Plat principal",
      image:
        "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: "2",
      name: "Poulet DG",
      price: "5 500 FCFA",
      category: "Plat principal",
      image:
        "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: "3",
      name: "Attiéké complet",
      price: "3 000 FCFA",
      category: "Accompagnement",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: "4",
      name: "Jus de Gingembre",
      price: "1 500 FCFA",
      category: "Boisson",
      image:
        "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&q=80&w=400",
    },
  ];

  return (
    <div className="space-y-12">
      <div className="flex items-end justify-between gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-2.5 rounded-xl">
              <ShoppingBag className="h-6 w-6 text-orange-600" />
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Gastronomie & Carte
            </h2>
          </div>
          <p className="text-muted-foreground">
            Découvrez les saveurs authentiques préparées par nos chefs.
          </p>
        </div>

        <button className="flex items-center gap-2 text-orange-600 font-bold hover:underline text-sm transition-all">
          Voir tout le menu
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group flex flex-col rounded-3xl border border-border bg-card overflow-hidden transition-all hover:shadow-xl"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-4 right-4">
                <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-sm">
                  <p className="text-xs font-black text-slate-900">
                    {product.price}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5">
              <p className="text-[10px] font-bold text-orange-600 uppercase tracking-widest mb-1">
                {product.category}
              </p>
              <h3 className="text-lg font-bold mb-3">{product.name}</h3>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-bold">4.9</span>
                </div>
                <button className="p-2 rounded-full bg-slate-100 hover:bg-primary hover:text-white transition-colors">
                  <ShoppingBag className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
