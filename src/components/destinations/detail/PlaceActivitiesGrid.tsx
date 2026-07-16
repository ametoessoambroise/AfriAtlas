import { motion } from "framer-motion";
import { ChevronRight, ShieldCheck, BarChart } from "lucide-react";
import type { Destination } from "@/lib/models/ui";

interface PlaceActivitiesGridProps {
  destination: Destination;
}

export default function PlaceActivitiesGrid({
  destination,
}: PlaceActivitiesGridProps) {
  // Hardcoded activities based on the provided design
  // // TODO: Fetch from backend activities relationship
  const activities = [
    {
      title: "Randonnée & Trekking",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306",
      description:
        "Explorez les sentiers de montagne et les forêts tropicales.",
      level: "Facile - Difficile",
      status: "safe",
      period: "Nov. - Mars",
      timing: "Matin",
    },
    {
      title: "Ascension du Mont Agou",
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      description:
        "Gravissez le plus haut sommet du Togo avec vue panoramique.",
      level: "Modéré",
      status: "recommended",
      period: "Nov. - Mars",
      timing: "Matin",
    },
    {
      title: "Baignade en cascade",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
      description: "Profitez des eaux fraîches des cascades naturelles.",
      level: "Facile",
      status: "safe",
      period: "Nov. - Avr.",
      timing: "Midi",
    },
    {
      title: "Visite de cascades (Kpimé, Womé)",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
      description: "Découvrez plusieurs chutes d’eau au cœur de la forêt.",
      level: "Facile",
      status: "recommended",
      period: "Toute l'année",
      timing: "Journée",
    },
    // {
    //   title: "Photographie nature",
    //   image: "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81",
    //   description: "Capturez paysages, cascades et biodiversité.",
    //   level: "Tous niveaux",
    //   status: "recommended",
    //   period: "Nov. - Mars",
    //   timing: "Matin / Soir",
    // },
    // {
    //   title: "Observation des papillons",
    //   image: "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0",
    //   description: "Admirez des espèces rares dans les forêts de la région.",
    //   level: "Facile",
    //   status: "recommended",
    //   period: "Toute l'année",
    //   timing: "Matin",
    // },
    // {
    //   title: "Visite de plantations (café/cacao)",
    //   image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
    //   description: "Découvrez la culture du café et du cacao.",
    //   level: "Facile",
    //   status: "recommended",
    //   period: "Toute l'année",
    //   timing: "Matin",
    // },
    // {
    //   title: "Découverte artisanale",
    //   image: "https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0",
    //   description: "Visitez les ateliers de sculpture, batik et tissage.",
    //   level: "Facile",
    //   status: "recommended",
    //   period: "Toute l'année",
    //   timing: "Journée",
    // },
    // {
    //   title: "Atelier batik",
    //   image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf",
    //   description: "Initiez-vous à la teinture traditionnelle togolaise.",
    //   level: "Facile",
    //   status: "recommended",
    //   period: "Toute l'année",
    //   timing: "Après-midi",
    // },
    // {
    //   title: "Visite de villages traditionnels",
    //   image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d",
    //   description: "Rencontrez les populations locales et leurs traditions.",
    //   level: "Facile",
    //   status: "recommended",
    //   period: "Toute l'année",
    //   timing: "Journée",
    // },
    // {
    //   title: "Exploration de la forêt tropicale",
    //   image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    //   description: "Partez à l’aventure dans une végétation dense et humide.",
    //   level: "Modéré",
    //   status: "safe",
    //   period: "Nov. - Mars",
    //   timing: "Matin",
    // },
    // {
    //   title: "Pique-nique en pleine nature",
    //   image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe",
    //   description: "Profitez d’un moment convivial au bord d’une cascade.",
    //   level: "Facile",
    //   status: "safe",
    //   period: "Toute l'année",
    //   timing: "Midi",
    // },
    // {
    //   title: "Balade au Mont Kloto",
    //   image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
    //   description: "Marchez à travers collines et paysages verdoyants.",
    //   level: "Facile",
    //   status: "recommended",
    //   period: "Toute l'année",
    //   timing: "Matin",
    // },
    // {
    //   title: "Visite du marché local",
    //   image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9",
    //   description: "Découvrez les produits locaux et l’ambiance du marché.",
    //   level: "Facile",
    //   status: "recommended",
    //   period: "Toute l'année",
    //   timing: "Matin",
    // },
    // {
    //   title: "Dégustation de cuisine locale",
    //   image: "https://images.unsplash.com/photo-1604908176997-431ff1c4b64b",
    //   description: "Goûtez aux spécialités comme le foufou et sauces locales.",
    //   level: "Facile",
    //   status: "recommended",
    //   period: "Toute l'année",
    //   timing: "Midi / Soir",
    // },
    // {
    //   title: "Visite historique (château / vestiges)",
    //   image: "https://images.unsplash.com/photo-1505842465776-3d90f616310d",
    //   description: "Explorez des sites historiques et coloniaux.",
    //   level: "Facile",
    //   status: "recommended",
    //   period: "Toute l'année",
    //   timing: "Journée",
    // },
    // {
    //   title: "Observation des chauves-souris",
    //   image: "https://images.unsplash.com/photo-1501706362039-c6b2a7baf6d6",
    //   description: "Découvrez une vallée célèbre pour ses colonies.",
    //   level: "Facile",
    //   status: "recommended",
    //   period: "Toute l'année",
    //   timing: "Soir",
    // },
    // {
    //   title: "Visite de monastère (Dzogbegan)",
    //   image: "https://images.unsplash.com/photo-1507692049790-de58290a4334",
    //   description: "Découvrez un lieu spirituel unique en pleine nature.",
    //   level: "Facile",
    //   status: "recommended",
    //   period: "Toute l'année",
    //   timing: "Matin",
    // },
    // {
    //   title: "Cyclisme rural",
    //   image: "https://images.unsplash.com/photo-1508973378895-527c0a8fb4a7",
    //   description: "Parcourez les villages et routes rurales à vélo.",
    //   level: "Modéré",
    //   status: "safe",
    //   period: "Nov. - Mars",
    //   timing: "Matin",
    // },
    // {
    //   title: "Soirée culturelle & danse",
    //   image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
    //   description: "Participez à des animations traditionnelles locales.",
    //   level: "Facile",
    //   status: "recommended",
    //   period: "Toute l'année",
    //   timing: "Soir",
    // },
  ];

  return (
    <div className="space-y-12">
      <div className="flex items-end justify-between gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2.5 rounded-md">
              <ChevronRight className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Activités à faire
            </h2>
          </div>
          <p className="text-muted-foreground">
            Vivez des expériences inoubliables au cœur de la nature.
          </p>
        </div>

        <button className="hidden sm:flex items-center gap-2 text-primary font-bold hover:underline text-sm transition-all">
          Voir toutes les activités
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid gap-10 lg:grid-cols-3">
        {/* Left: Activities Grid */}
        <div className="lg:col-span-2 grid gap-6 sm:grid-cols-2">
          {activities.map((activity, i) => (
            <motion.div
              key={activity.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col rounded-md border border-border bg-card overflow-hidden transition-all hover:shadow-lg"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full backdrop-blur-md border ${
                      activity.status === "safe"
                        ? "bg-emerald-500/80 text-white border-emerald-400/50"
                        : "bg-primary/80 text-white border-primary/40"
                    }`}
                  >
                    {activity.status === "safe" ? "Sécurisé" : "Recommandé"}
                  </span>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-bold mb-2">{activity.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-grow">
                  {activity.description}
                </p>

                <div className="flex items-center gap-2 text-[11px] font-bold text-primary bg-primary/5 px-3 py-1.5 rounded-lg w-fit">
                  {activity.level}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right: Activities Period Table */}
        <div className="lg:col-span-1 rounded-md border border-border bg-surface-alt overflow-hidden flex flex-col h-full">
          <div className="p-6 border-b border-border bg-background/50 flex items-center gap-3">
            <BarChart className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-bold">Période idéale</h3>
          </div>
          <div className="overflow-x-auto flex-grow">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-muted-foreground text-[10px] font-semibold border-b border-border/50">
                  <th className="px-4 py-4 text-left font-semibold">
                    Activité
                  </th>
                  <th className="px-4 py-4 text-left font-semibold">Période</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {activities.map((activity) => (
                  <tr
                    key={activity.title}
                    className="hover:bg-background/40 transition-colors"
                  >
                    <td className="px-4 py-4 font-medium">{activity.title}</td>
                    <td className="px-4 py-4 text-muted-foreground">
                      {activity.period}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-primary/5 border-t border-border">
            <p className="text-[10px] text-primary/70 italic text-center">
              Planifiez vos sorties selon ces recommandations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
