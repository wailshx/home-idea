import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { categories } from "@/lib/products";

gsap.registerPlugin(ScrollTrigger);

export default function CategoriesGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Section header entrance
      gsap.from(".cat-header > *", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cat-header",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Category cards staggered entrance
      gsap.from(".cat-card", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cat-grid",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Parallax on category images
      gsap.utils.toArray<HTMLElement>(".cat-card img").forEach((img) => {
        gsap.to(img, {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: img.closest(".cat-card"),
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="container py-24">
      <div className="cat-header flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-14">
        <div>
          <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-3">
            Nos univers
          </div>
          <h2 className="font-display text-4xl sm:text-5xl">
            Une maison, cinq langages
          </h2>
        </div>
        <p className="text-muted-foreground max-w-md">
          Chaque pièce de la maison a sa grammaire. Nous la traduisons en
          matière, en lumière, en présence.
        </p>
      </div>

      <div className="cat-grid grid gap-4 md:grid-cols-6 md:grid-rows-2">
        {categories.map((c, i) => (
          <Link
            key={c.slug}
            to={`/collection/${c.slug}`}
            className={`cat-card group relative overflow-hidden bg-card border border-gold/15 hover:border-gold/60 transition-colors ${
              i === 0
                ? "md:col-span-3 md:row-span-2 aspect-[4/5] md:aspect-auto"
                : i === 1
                  ? "md:col-span-3 aspect-[16/10]"
                  : "md:col-span-2 aspect-[4/3]"
            }`}
          >
            <img
              src={c.image}
              alt={c.name}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-2">
                Collection
              </div>
              <h3 className="font-display text-2xl md:text-3xl mb-2">
                {c.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">{c.tagline}</p>
              <div className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-gold">
                Voir la collection <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-12 h-12 rounded-full bg-gradient-gold text-ink grid place-items-center">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
