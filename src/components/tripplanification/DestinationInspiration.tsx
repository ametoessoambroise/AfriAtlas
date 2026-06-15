import React from "react";
import { motion } from "framer-motion";
import { Heart, ChevronRight } from "lucide-react";

const inspirations = [
  {
    id: 1,
    name: "Islande",
    price: "1 890 €",
    image:
      "https://images.unsplash.com/photo-1504109586057-7a2ae83d1338?w=500&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Norvège",
    price: "1 750 €",
    image:
      "https://plus.unsplash.com/premium_photo-1698405316329-fd9c43d7e11c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG5vcnYlQzMlQThnZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 3,
    name: "Nouvelle-Zélande",
    price: "2 100 €",
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Canada",
    price: "1 680 €",
    image:
      "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=500&auto=format&fit=crop",
  },
];

export default function DestinationInspiration() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <h3 className="text-foreground font-bold text-lg">
            Inspiration de destinations
          </h3>
          <span className="text-[9px] font-black uppercase tracking-widest bg-primary/20 text-primary px-1.5 py-0.5 rounded leading-none">
            IA
          </span>
        </div>
        <button className="w-8 h-8 rounded-md bg-background/20 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-all">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-2 px-2">
        {inspirations.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="min-w-[180px] group cursor-pointer"
          >
            <div className="relative h-44 rounded-2xl overflow-hidden mb-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/20 backdrop-blur-md border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-all opacity-0 group-hover:opacity-100">
                <Heart className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-3">
                <h4 className="text-white font-bold text-sm">{item.name}</h4>
                <p className="text-white text-[10px] mt-0.5 font-medium">
                  À partir de {item.price}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
