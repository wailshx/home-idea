import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Ruler, Truck, ShieldCheck } from "lucide-react";
import heroImg from "@/assets/hero-salon.jpg";
import { categories, products } from "@/lib/products";
import ProductCard from "@/components/hi/ProductCard";

const Home = () => {
  const featured = products.slice(0, 6);

  return (
    <div className="pt-20">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 grain" />

        {/* Floating 3D-ish image */}
        <div className="container relative pt-16 pb-24 lg:pt-24 lg:pb-32 grid lg:grid-cols-2 gap-14 items-center">
          <div className="relative z-10 anim-rise">
            <div className="flex items-center gap-2 text-[10px] tracking-[0.4em] uppercase text-gold mb-6">
              <span className="w-8 h-px bg-gold" /> Maison de design
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.02] mb-6">
              L'art de <span className="text-gradient-gold italic">vivre</span>,<br />
              sculpté sur mesure.
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg mb-10 leading-relaxed">
              Home Idea imagine, dessine et installe des intérieurs modernes et luxueux. Du meuble signature à l'aménagement complet de votre maison.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/collection/salon"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-gold text-ink font-medium tracking-wide overflow-hidden relative"
              >
                <span className="relative z-10">Explorer la collection</span>
                <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                <span className="absolute inset-0 anim-shimmer opacity-60" />
              </Link>
              <Link
                to="/amenagement"
                className="inline-flex items-center gap-3 px-8 py-4 border border-gold/50 hover:border-gold hover:bg-gold/5 transition-colors"
              >
                <Sparkles className="w-4 h-4 text-gold" />
                Aménager ma maison
              </Link>
            </div>

            <div className="mt-14 grid grid-cols-3 gap-6 max-w-md">
              {[
                { k: "12+", v: "Ans d'expertise" },
                { k: "500+", v: "Projets livrés" },
                { k: "100%", v: "Sur mesure" },
              ].map((s) => (
                <div key={s.v}>
                  <div className="font-display text-3xl text-gold">{s.k}</div>
                  <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mt-1">{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 3D-esque floating hero visual */}
          <div className="relative h-[480px] lg:h-[620px] perspective-1000">
            {/* Rotating gold ring */}
            <div className="absolute -inset-10 anim-spin-slow opacity-40 pointer-events-none">
              <div className="w-full h-full rounded-full border border-dashed border-gold/50" />
            </div>
            <div className="absolute inset-6 anim-spin-slow opacity-30 pointer-events-none" style={{ animationDirection: "reverse", animationDuration: "60s" }}>
              <div className="w-full h-full rounded-full border border-gold/30" />
            </div>

            <div className="relative w-full h-full anim-float">
              <div className="absolute inset-0 rounded-sm overflow-hidden gold-border shadow-deep anim-glow">
                <img src={heroImg} alt="Salon luxueux Home Idea" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              </div>

              {/* Floating info card */}
              <div className="absolute -left-6 lg:-left-14 bottom-16 bg-card/90 backdrop-blur-xl border border-gold/30 p-5 max-w-[240px] shadow-gold anim-rise" style={{ animationDelay: "500ms" }}>
                <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-2">Signature</div>
                <div className="font-display text-lg leading-tight mb-2">Salon Nocturne — Édition 2026</div>
                <div className="text-xs text-muted-foreground">Marbre Carrara, velours italien, laiton brossé.</div>
              </div>

              {/* Floating gold badge */}
              <div className="absolute -right-4 top-8 w-28 h-28 rounded-full bg-gradient-gold text-ink grid place-items-center text-center anim-glow">
                <div>
                  <div className="font-display text-2xl leading-none">01</div>
                  <div className="text-[9px] tracking-[0.25em] uppercase mt-1">Édition<br/>limitée</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="border-y border-gold/10 py-5 overflow-hidden">
          <div className="flex gap-14 whitespace-nowrap anim-marquee text-gold/70 text-sm tracking-[0.4em] uppercase">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex gap-14 shrink-0">
                <span>Design ✦ Exécution</span>
                <span>Cuisine · Salon · Chambres · Éclairage</span>
                <span>Sur mesure</span>
                <span>Made with ✦ Home Idea</span>
                <span>Livraison & installation</span>
                <span>Pièces signature</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container py-24">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-14">
          <div>
            <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-3">Nos univers</div>
            <h2 className="font-display text-4xl sm:text-5xl">Une maison, cinq langages</h2>
          </div>
          <p className="text-muted-foreground max-w-md">
            Chaque pièce de la maison a sa grammaire. Nous la traduisons en matière, en lumière, en présence.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-6 md:grid-rows-2">
          {categories.map((c, i) => (
            <Link
              key={c.slug}
              to={`/collection/${c.slug}`}
              className={`group relative overflow-hidden bg-card border border-gold/15 hover:border-gold/60 transition-colors anim-rise ${
                i === 0 ? "md:col-span-3 md:row-span-2 aspect-[4/5] md:aspect-auto" :
                i === 1 ? "md:col-span-3 aspect-[16/10]" :
                          "md:col-span-2 aspect-[4/3]"
              }`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <img
                src={c.image}
                alt={c.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-2">Collection</div>
                <h3 className="font-display text-2xl md:text-3xl mb-2">{c.name}</h3>
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

      {/* SIGNATURE PRODUCTS */}
      <section className="container py-24">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-14">
          <div>
            <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-3">Pièces signature</div>
            <h2 className="font-display text-4xl sm:text-5xl">Le meilleur du moment</h2>
          </div>
          <Link to="/collection/salon" className="text-sm tracking-[0.25em] uppercase text-gold link-gold">
            Toute la collection
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* AMÉNAGEMENT CTA */}
      <section className="container py-24">
        <div className="relative overflow-hidden border border-gold/20 bg-card">
          <div className="grid lg:grid-cols-2 items-stretch">
            <div className="p-10 lg:p-16 flex flex-col justify-center">
              <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-4">Service Signature</div>
              <h2 className="font-display text-4xl sm:text-5xl leading-tight mb-6">
                Aménagement complet<br /><span className="text-gradient-gold italic">de votre maison</span>
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg">
                Un projet, un chef d'orchestre. Notre studio pilote chaque étape : plans, moodboard, sourcing des matériaux, fabrication, livraison et installation.
              </p>

              <div className="grid grid-cols-3 gap-6 mb-10">
                {[
                  { icon: Ruler, label: "Étude 3D" },
                  { icon: Truck, label: "Livraison" },
                  { icon: ShieldCheck, label: "Garantie 5 ans" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="text-center">
                    <div className="w-12 h-12 mx-auto mb-2 border border-gold/40 grid place-items-center">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">{label}</div>
                  </div>
                ))}
              </div>

              <Link
                to="/amenagement"
                className="self-start inline-flex items-center gap-3 px-8 py-4 bg-gradient-gold text-ink font-medium tracking-wide"
              >
                Démarrer mon projet <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="relative min-h-[400px] overflow-hidden">
              <img src={categories[4].image} alt="Aménagement Home Idea" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-ink/40" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
