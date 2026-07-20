import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Claire & Marc D.",
    location: "Paris 16e",
    text: "Home Idea a transformé notre appartement en un lieu que nous n'osions pas imaginer. Chaque détail respire l'élégance, sans jamais tomber dans l'excès.",
    rating: 5,
    project: "Appartement haussmannien — 180 m²",
  },
  {
    name: "Sophie L.",
    location: "Lyon",
    text: "Le service d'aménagement est remarquable. De la première consultation à l'installation, chaque étape a été pensée avec une précision chirurgicale.",
    rating: 5,
    project: "Villa contemporaine — 320 m²",
  },
  {
    name: "Antoine & Julie R.",
    location: "Bordeaux",
    text: "Nous avions un budget défini et des exigences élevées. L'équipe a trouvé le juste équilibre entre luxe et sobriété. Le résultat est époustouflant.",
    rating: 5,
    project: "Loft industriel — 140 m²",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const cardVariant = {
  hidden: { y: 50, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="container py-24">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-14">
        <div>
          <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-3">
            Témoignages
          </div>
          <h2 className="font-display text-4xl sm:text-5xl">
            Ils nous ont fait confiance
          </h2>
        </div>
        <p className="text-muted-foreground max-w-md">
          Chaque projet est une relation. Voici ce que nos clients disent de
          leur expérience Home Idea.
        </p>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
      >
        {testimonials.map((t) => (
          <motion.div
            key={t.name}
            variants={cardVariant}
            className="group relative bg-card border border-gold/15 p-8 hover:border-gold/50 transition-colors"
          >
            <Quote className="w-8 h-8 text-gold/20 mb-6" />

            <div className="flex gap-1 mb-4">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="w-3.5 h-3.5 fill-gold text-gold"
                />
              ))}
            </div>

            <p className="text-foreground/90 leading-relaxed mb-8">
              &ldquo;{t.text}&rdquo;
            </p>

            <div className="border-t border-gold/15 pt-6">
              <div className="font-display text-lg">{t.name}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {t.location}
              </div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-gold/70 mt-2">
                {t.project}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
