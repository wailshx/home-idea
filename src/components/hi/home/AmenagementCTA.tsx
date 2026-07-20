import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Ruler, Truck, ShieldCheck } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { categories } from "@/lib/products";

gsap.registerPlugin(ScrollTrigger);

export default function AmenagementCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      tl.from(".amen-label", { y: 20, opacity: 0, duration: 0.6 })
        .from(".amen-heading", { y: 40, opacity: 0, duration: 0.8 }, "-=0.3")
        .from(".amen-desc", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(".amen-feature", { y: 20, opacity: 0, duration: 0.5, stagger: 0.08 }, "-=0.3")
        .from(".amen-cta", { y: 20, opacity: 0, duration: 0.5 }, "-=0.2")
        .from(".amen-image", { x: 60, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.8");
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="container py-24">
      <div className="relative overflow-hidden border border-gold/20 bg-card">
        <div className="grid lg:grid-cols-2 items-stretch">
          <div className="p-10 lg:p-16 flex flex-col justify-center">
            <div className="amen-label text-[10px] tracking-[0.4em] uppercase text-gold mb-4">
              Service Signature
            </div>
            <h2 className="amen-heading font-display text-4xl sm:text-5xl leading-tight mb-6">
              Aménagement complet
              <br />
              <span className="text-gradient-gold italic">de votre maison</span>
            </h2>
            <p className="amen-desc text-muted-foreground mb-8 max-w-lg">
              Un projet, un chef d&apos;orchestre. Notre studio pilote chaque
              étape : plans, moodboard, sourcing des matériaux, fabrication,
              livraison et installation.
            </p>

            <div className="grid grid-cols-3 gap-6 mb-10">
              {[
                { icon: Ruler, label: "Étude 3D" },
                { icon: Truck, label: "Livraison" },
                { icon: ShieldCheck, label: "Garantie 5 ans" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="amen-feature text-center">
                  <div className="w-12 h-12 mx-auto mb-2 border border-gold/40 grid place-items-center">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                    {label}
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/amenagement"
              className="amen-cta self-start inline-flex items-center gap-3 px-8 py-4 bg-gradient-gold text-ink font-medium tracking-wide group"
            >
              Démarrer mon projet{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="amen-image relative min-h-[400px] overflow-hidden">
            <img
              src={categories[4].image}
              alt="Aménagement Home Idea"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-ink/40" />
          </div>
        </div>
      </div>
    </section>
  );
}
