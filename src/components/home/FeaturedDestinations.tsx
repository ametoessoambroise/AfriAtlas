import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import DestinationCard from "@/components/cards/DestinationCard";
import { ApiErrorState, DestinationGridSkeleton } from "@/components/feedback/ApiQueryState";
import { usePlaces } from "@/hooks/queries/usePlaces";
import { mapPlaceListToDestination } from "@/lib/mappers/placeMapper";
import { getErrorMessage } from "@/lib/utils/errorMessages";

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } 
  },
};

function pickFeaturedIds(items: { id: string; is_featured: boolean }[]) {
  const feat = items.filter((i) => i.is_featured);
  return (feat.length ? feat : items).slice(0, 6);
}

export default function FeaturedDestinations() {
  const catalog = usePlaces({ page_size: 100 });

  const featuredDestinations = useMemo(() => {
    const items = catalog.data?.items ?? [];
    return pickFeaturedIds(items).map(mapPlaceListToDestination);
  }, [catalog.data?.items]);

  return (
    <section className="py-20 sm:py-24 bg-background">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mb-14 text-center"
        >
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary mb-5">
              <Sparkles className="h-3 w-3" />
              Sélection experts
            </span>
          </motion.div>

          <motion.h2 variants={fadeUp} className="mx-auto mb-4 max-w-3xl text-[clamp(2rem,4vw+1rem,3rem)] font-semibold text-foreground">
            Destinations à ne pas manquer
          </motion.h2>

          <motion.p variants={fadeUp} className="mx-auto max-w-2xl text-base text-muted-foreground leading-relaxed">
            Les lieux incontournables sélectionnés pour pallier les visites rapides et offrir un séjour plus mémorable.
          </motion.p>
        </motion.div>

        {/* ── États : loading / error / empty / data ── */}
        {catalog.isLoading ? (
          <DestinationGridSkeleton />
        ) : catalog.isError ? (
          <ApiErrorState
            message={getErrorMessage(catalog.error)}
            onRetry={() => catalog.refetch()}
          />
        ) : featuredDestinations.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-16 text-center text-muted-foreground"
          >
            Aucune destination publiée pour le moment. Revenez bientôt.
          </motion.p>
        ) : (
          <>
            {/* ── Grid cards ── */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="mb-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {featuredDestinations.map((d) => (
                <motion.div key={d.id} variants={fadeUp}>
                  <DestinationCard destination={d} />
                </motion.div>
              ))}
            </motion.div>

            {/* ── CTA ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <Link
                to="/destinations"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground shadow-md hover:scale-105 active:scale-95 transition-transform"
              >
                Voir toutes les destinations
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
