import { useParams, Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { categories, getCategory, productsByCategory } from "@/lib/products";
import ProductCard from "@/components/hi/ProductCard";
import { ArrowLeft } from "lucide-react";

const Catalog = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = slug ? getCategory(slug) : undefined;
  const all = slug ? productsByCategory(slug) : [];
  const [sub, setSub] = useState<string>("Tout");

  const filtered = useMemo(
    () => (sub === "Tout" ? all : all.filter((p) => p.subcategory === sub)),
    [sub, all]
  );

  if (!category) {
    return (
      <div className="pt-32 container">
        <p className="text-muted-foreground">Collection introuvable.</p>
        <Link to="/" className="text-gold link-gold">Retour à l'accueil</Link>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={category.image} alt={category.name} className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/70 to-background" />
        </div>
        <div className="container relative py-24 lg:py-32">
          <Link to="/" className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-gold mb-6 link-gold">
            <ArrowLeft className="w-4 h-4" /> Accueil
          </Link>
          <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-4">Collection</div>
          <h1 className="font-display text-5xl lg:text-7xl mb-4">{category.name}</h1>
          <p className="text-lg text-muted-foreground max-w-xl italic">{category.tagline}</p>
        </div>
      </section>

      {/* Sub filter */}
      <section className="container py-10 border-b border-gold/10">
        <div className="flex flex-wrap gap-2">
          {["Tout", ...category.subcategories].map((s) => (
            <button
              key={s}
              onClick={() => setSub(s)}
              className={`px-4 py-2 text-xs tracking-[0.2em] uppercase border transition-colors ${
                sub === s
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-gold/20 text-muted-foreground hover:border-gold/60 hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="container py-14">
        {filtered.length === 0 ? (
          <p className="text-muted-foreground py-20 text-center">Aucun produit dans cette sous-catégorie pour l'instant.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* Other collections */}
      <section className="container py-24 border-t border-gold/10">
        <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-6">Continuer la visite</div>
        <div className="grid gap-4 md:grid-cols-4">
          {categories.filter((c) => c.slug !== slug).map((c) => (
            <Link key={c.slug} to={`/collection/${c.slug}`} className="group relative overflow-hidden aspect-[4/5] border border-gold/15 hover:border-gold/60">
              <img src={c.image} alt={c.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-display text-2xl">{c.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Catalog;
