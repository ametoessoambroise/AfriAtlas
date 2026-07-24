import { BookOpen, Users, Map as MapIcon, Utensils } from "lucide-react";
import { motion } from "framer-motion";
import type { Destination } from "@/lib/models/ui";

interface PlaceOverviewProps {
  destination: Destination;
}

export default function PlaceOverview({ destination }: PlaceOverviewProps) {
  // Hardcoded data for demonstration based on the provided design
  // // TODO: Fetch these from API when available
  const features = [
    {
      id: "histoire",
      title: "Histoire",
      icon: BookOpen,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      description:
        "Lieu sacré pour les populations locales, ces cascades sont entourées de légendes transmises de génération en génération. Elles représentent un patrimoine naturel et culturel inestimable.",
      image:
        "https://media.gettyimages.com/id/542926059/fr/photo/german-colonial-history-recruitment-among-native-volunteers-for-the-protection-force-in-the.jpg?s=612x612&w=0&k=20&c=_FUkT7EkjPt06TIn9mSVufz5NRnlSGAHjfUDPOa7jB4=",
    },
    {
      id: "culture",
      title: "Culture",
      icon: Users,
      color: "text-purple-600",
      bg: "bg-purple-50",
      description:
        "Les communautés locales valorisent ce site à travers des rites traditionnels et des célébrations. L'hospitalité y est chaleureuse et les visiteurs peuvent découvrir l'artisanat local.",
      image:
        "https://media.gettyimages.com/id/85327539/fr/photo/lome-togo-thetamberma-whose-name-means-the-real-architects-of-the-earth-are-hunters-farmers.jpg?s=612x612&w=0&k=20&c=G-Hi1o89HvAlEHXFIEPxp12mW96gHcrBp5V-mT0NrA8=",
    },
    {
      id: "paysages",
      title: "Paysages",
      icon: MapIcon,
      color: "text-blue-600",
      bg: "bg-blue-50",
      description:
        "Une chute d'eau majestueuse entourée d'une forêt luxuriante, d'une faune et d'une flore exceptionnelles. Un endroit parfait pour les amoureux de la nature et les photographes.",
      image:
        "https://media.istockphoto.com/id/1172075150/fr/photo/government-services-center-casef-centre-administratif-et-des-services-economiques-et.jpg?s=612x612&w=0&k=20&c=u0rRNbAu4beb20_LQPEwvY_rKikecbuNIomIINdgsQU=",
    },
    {
      id: "gastronomie",
      title: "Gastronomie",
      icon: Utensils,
      color: "text-orange-600",
      bg: "bg-orange-50",
      description:
        "Dégustez les saveurs locales : poissons frais, mets traditionnels à base de plantain, manioc, légumes sauvages et sauces épicées. Sans oublier les jus de fruits tropicaux frais.",
      image:
        "https://lepatio-lome.com/wp-content/uploads/2021/06/maxresdefault.jpg",
    },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h2 className="mb-6 text-2xl md:text-3xl font-extrabold tracking-tight">
          À propos de {destination.name}
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
          {destination.longDescription}
        </p>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, i) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group flex flex-col rounded-md border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/20"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-3 rounded-md ${feature.bg}`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
            </div>

            <p className="text-muted-foreground leading-relaxed text-sm mb-6 flex-grow">
              {feature.description}
            </p>

            <div className="relative h-40 w-full overflow-hidden rounded-md">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
