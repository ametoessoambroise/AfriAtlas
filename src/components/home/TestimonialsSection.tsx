import { TimelineContent } from "@/components/ui/timeline-animation";
import { useRef } from "react";
import { Quote } from "lucide-react";
import { LazyImage } from "@/components/ui/lazy-image";

export default function TestimonialsSection() {
  const testimonialRef = useRef<HTMLDivElement>(null);

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.4,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  return (
    <main className="w-full bg-background border-t border-border/40">
      <section
        className="relative h-full container text-foreground mx-auto rounded-lg py-20 bg-background"
        ref={testimonialRef}
      >
        <article className="max-w-screen-md mx-auto text-center space-y-4 mb-8">
          <TimelineContent
            as="h1"
            className="text-[clamp(2rem,4vw+1rem,3rem)] font-heading font-semibold italic tracking-tight"
            animationNum={0}
            customVariants={revealVariants}
            timelineRef={testimonialRef}
          >
            Recommandé par des milliers de voyageurs
          </TimelineContent>
          <TimelineContent
            as="p"
            className="mx-auto text-muted-foreground text-lg leading-relaxed"
            animationNum={1}
            customVariants={revealVariants}
            timelineRef={testimonialRef}
          >
            Découvrez comment nos clients vivent leur aventure au Togo avec
            Afriatlas Travel.
          </TimelineContent>
        </article>

        <div className="lg:grid lg:grid-cols-3 gap-4 flex flex-col w-full lg:py-10 pt-6 pb-4 lg:px-10 px-4">
          <div className="md:flex lg:flex-col lg:space-y-4 h-full lg:gap-0 gap-4">
            <TimelineContent
              animationNum={0}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="lg:flex-[7] flex-[6] flex flex-col justify-between relative bg-primary/10 overflow-hidden rounded-md border border-primary/20 p-6 md:p-8 shadow-sm"
            >
              <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:50px_56px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-30"></div>
              <article className="mt-auto relative z-10">
                <Quote className="w-8 h-8 text-primary/40 mb-4" />
                <p className="text-lg font-medium leading-relaxed mb-8">
                  "Afriatlas Travel a été une découverte incroyable. Leur
                  service est irréprochable et l'équipe sur place est
                  exceptionnelle pour nous guider à travers Lomé."
                </p>
                <div className="flex justify-between items-end pt-5 border-t border-primary/10">
                  <div>
                    <h2 className="font-semibold lg:text-xl text-lg">
                      Guillaume Rousseau
                    </h2>
                    <p className="text-primary/80 font-medium">
                      Voyageur régulier
                    </p>
                  </div>
                  <LazyImage
                    src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=687&auto=format&fit=crop"
                    alt="Guillaume"
                    containerClassName="w-14 h-14 rounded-full object-cover shadow-md border-2 border-background"
                  />
                </div>
              </article>
            </TimelineContent>

            <TimelineContent
              animationNum={1}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="lg:flex-[3] flex-[4] lg:h-fit lg:shrink-0 flex flex-col justify-between relative bg-primary text-primary-foreground overflow-hidden rounded-md border border-primary/20 p-6 md:p-8 shadow-md"
            >
              <article className="mt-auto relative z-10">
                <Quote className="w-6 h-6 text-white/30 mb-3" />
                <p className="text-primary-foreground/90 font-medium mb-6">
                  "Notre séjour au Togo a été magique grâce à Afriatlas. Une
                  expertise et un dévouement rares."
                </p>
                <div className="flex justify-between items-end pt-4 border-t border-white/10">
                  <div>
                    <h2 className="font-semibold text-xl">Sophie Dubois</h2>
                    <p className="text-white/70">Famille en vacances</p>
                  </div>
                  <LazyImage
                    src="https://images.unsplash.com/photo-1512485694743-9c9538b4e6e0?q=80&w=687&auto=format&fit=crop"
                    alt="Sophie"
                    containerClassName="w-12 h-12 rounded-full object-cover shadow-sm border-2 border-primary-foreground/20"
                  />
                </div>
              </article>
            </TimelineContent>
          </div>

          <div className="lg:h-full md:flex lg:flex-col h-fit lg:space-y-4 lg:gap-0 gap-4">
            <TimelineContent
              animationNum={2}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="flex flex-col justify-between relative bg-card text-card-foreground overflow-hidden rounded-md border border-border p-6 md:p-8 shadow-sm"
            >
              <article className="mt-auto relative z-10">
                <p className="2xl:text-base text-sm mb-6">
                  "Une équipe très professionnelle, leurs recommandations ont
                  vraiment transformé notre voyage en une aventure inoubliable à
                  Kpalimé."
                </p>
                <div className="flex justify-between items-end pt-4 border-t border-border/50">
                  <div>
                    <h2 className="font-semibold lg:text-xl text-lg">
                      Richard Mendy
                    </h2>
                    <p className="lg:text-sm text-xs text-muted-foreground">
                      Explorateur solo
                    </p>
                  </div>
                  <LazyImage
                    src="https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=1021&auto=format&fit=crop"
                    alt="Richard"
                    containerClassName="lg:w-12 lg:h-12 w-10 h-10 rounded-full object-cover"
                  />
                </div>
              </article>
            </TimelineContent>

            <TimelineContent
              animationNum={3}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="flex flex-col justify-between relative bg-card text-card-foreground overflow-hidden rounded-md border border-border p-6 md:p-8 shadow-sm"
            >
              <article className="mt-auto relative z-10">
                <p className="2xl:text-base text-sm mb-6">
                  "Extrêmement satisfaits des services de Afriatlas.
                  L'organisation a dépassé toutes nos attentes."
                </p>
                <div className="flex justify-between items-end pt-4 border-t border-border/50">
                  <div>
                    <h2 className="font-semibold lg:text-xl text-lg">
                      Jean & Marie
                    </h2>
                    <p className="lg:text-sm text-xs text-muted-foreground">
                      Couple en lune de miel
                    </p>
                  </div>
                  <LazyImage
                    src="https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=687&auto=format&fit=crop"
                    alt="Jean"
                    containerClassName="lg:w-12 lg:h-12 w-10 h-10 rounded-full object-cover"
                  />
                </div>
              </article>
            </TimelineContent>

            <TimelineContent
              animationNum={4}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="flex flex-col justify-between relative bg-card text-card-foreground overflow-hidden rounded-md border border-border p-6 md:p-8 shadow-sm"
            >
              <article className="mt-auto relative z-10">
                <p className="2xl:text-base text-sm mb-6">
                  "Un support client exceptionnel. Ils sont toujours
                  disponibles, incroyablement serviables et connaissent
                  parfaitement la région."
                </p>
                <div className="flex justify-between items-end pt-4 border-t border-border/50">
                  <div>
                    <h2 className="font-semibold lg:text-xl text-lg">
                      Céline Touré
                    </h2>
                    <p className="lg:text-sm text-xs text-muted-foreground">
                      Nomade digital
                    </p>
                  </div>
                  <LazyImage
                    src="https://images.unsplash.com/photo-1740102074295-c13fae3e4f8a?q=80&w=687&auto=format&fit=crop"
                    alt="Céline"
                    containerClassName="lg:w-12 lg:h-12 w-10 h-10 rounded-full object-cover"
                  />
                </div>
              </article>
            </TimelineContent>
          </div>

          <div className="h-full md:flex lg:flex-col lg:space-y-4 lg:gap-0 gap-4">
            <TimelineContent
              animationNum={5}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="lg:flex-[3] flex-[4] flex flex-col justify-between relative bg-secondary text-secondary-foreground overflow-hidden rounded-md border border-border p-6 md:p-8 shadow-sm"
            >
              <article className="mt-auto relative z-10">
                <Quote className="w-6 h-6 text-foreground/20 mb-3" />
                <p className="mb-6 font-medium">
                  "Afriatlas a été le partenaire idéal pour notre voyage de
                  groupe au cœur de l'Afrique."
                </p>
                <div className="flex justify-between items-end pt-4 border-t border-border/50">
                  <div>
                    <h2 className="font-semibold text-xl">Antoine L.</h2>
                    <p className="text-muted-foreground text-sm">
                      Organisateur
                    </p>
                  </div>
                  <LazyImage
                    src="https://images.unsplash.com/photo-1563237023-b1e970526dcb?q=80&w=765&auto=format&fit=crop"
                    alt="Antoine"
                    containerClassName="w-12 h-12 rounded-full object-cover border-2 border-background"
                  />
                </div>
              </article>
            </TimelineContent>

            <TimelineContent
              animationNum={6}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="lg:flex-[7] flex-[6] flex flex-col justify-between relative bg-primary/5 overflow-hidden rounded-md border border-primary/20 p-6 md:p-8 shadow-sm"
            >
              <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:50px_56px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-30"></div>
              <article className="mt-auto relative z-10">
                <Quote className="w-8 h-8 text-primary/40 mb-4" />
                <p className="text-lg font-medium leading-relaxed mb-8">
                  "Afriatlas a radicalement changé notre vision du Togo. Leur
                  service exceptionnel, combiné à une vraie connaissance du
                  terrain, a rendu notre expérience unique et mémorable."
                </p>
                <div className="flex justify-between items-end pt-5 border-t border-primary/10">
                  <div>
                    <h2 className="font-semibold text-xl">Élise & Paul</h2>
                    <p className="text-primary/80 font-medium">
                      Touristes internationaux
                    </p>
                  </div>
                  <LazyImage
                    src="https://images.unsplash.com/photo-1590086782957-93c06ef21604?q=80&w=687&auto=format&fit=crop"
                    alt="Elise"
                    containerClassName="w-14 h-14 rounded-full object-cover shadow-md border-2 border-background"
                  />
                </div>
              </article>
            </TimelineContent>
          </div>
        </div>
      </section>
    </main>
  );
}
