import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getProduct, productsByCategory } from "@/lib/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { ArrowLeft, Minus, Plus, ShoppingBag, Check, Ruler, Package, ShieldCheck, Heart } from "lucide-react";
import ProductCard from "@/components/hi/ProductCard";
import { toast } from "sonner";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProduct(slug) : undefined;
  const navigate = useNavigate();
  const { add } = useCart();
  const { has, toggle } = useWishlist();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="pt-32 container">
        <p className="text-muted-foreground">Produit introuvable.</p>
        <Link to="/" className="text-gold link-gold">Retour à l'accueil</Link>
      </div>
    );
  }

  const related = productsByCategory(product.category).filter((p) => p.id !== product.id).slice(0, 3);

  const handleAdd = () => {
    if (product.price === 0) {
      navigate("/amenagement");
      return;
    }
    add(product.id, qty);
    setAdded(true);
    toast.success(`${product.name} ajouté au panier`);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="pt-28">
      <div className="container">
        <Link to={`/collection/${product.category}`} className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-gold mb-8 link-gold">
          <ArrowLeft className="w-4 h-4" /> {product.category}
        </Link>

        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Image side */}
          <div className="relative perspective-1000">
            <div className="absolute -inset-8 anim-spin-slow opacity-30 pointer-events-none">
              <div className="w-full h-full rounded-full border border-dashed border-gold/40" />
            </div>
            <div className="relative aspect-square overflow-hidden gold-border shadow-deep anim-float bg-ink">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            {product.isNew && (
              <div className="absolute top-6 left-6 text-[10px] tracking-[0.3em] uppercase bg-gradient-gold text-ink px-4 py-1.5">
                Nouveauté
              </div>
            )}
          </div>

          {/* Info side */}
          <div className="anim-rise">
            <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-3">{product.subcategory}</div>
            <h1 className="font-display text-4xl lg:text-5xl mb-4">{product.name}</h1>
            <p className="text-muted-foreground text-lg italic mb-6">{product.short}</p>

            <div className="font-display text-4xl text-gradient-gold mb-8">
              {product.price > 0 ? `${product.price.toLocaleString("fr-FR")} €` : "Sur devis"}
            </div>

            <p className="text-foreground/80 leading-relaxed mb-8">{product.description}</p>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-4 mb-10 py-6 border-y border-gold/15">
              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-2 flex items-center gap-2">
                  <Package className="w-3 h-3" /> Matériaux
                </div>
                <ul className="text-sm space-y-1">
                  {product.materials.map((m) => <li key={m}>— {m}</li>)}
                </ul>
              </div>
              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-2 flex items-center gap-2">
                  <Ruler className="w-3 h-3" /> Dimensions
                </div>
                <p className="text-sm">{product.dimensions}</p>
              </div>
            </div>

            {/* Quantity + add */}
            {product.price > 0 && (
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="inline-flex items-center border border-gold/40">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 hover:bg-gold/10">
                    <Minus className="w-4 h-4 text-gold" />
                  </button>
                  <span className="w-12 text-center font-display text-lg">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="p-3 hover:bg-gold/10">
                    <Plus className="w-4 h-4 text-gold" />
                  </button>
                </div>
                <button
                  onClick={handleAdd}
                  className="flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-gold text-ink font-medium tracking-wide min-w-[220px]"
                >
                  {added ? <><Check className="w-4 h-4" /> Ajouté</> : <><ShoppingBag className="w-4 h-4" /> Ajouter au panier</>}
                </button>
                <button
                  onClick={() => toggle(product.id)}
                  className={`inline-flex items-center justify-center w-14 h-14 border transition-colors ${
                    has(product.id)
                      ? "border-gold bg-gold/15 text-gold"
                      : "border-gold/40 text-gold/60 hover:border-gold hover:text-gold"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${has(product.id) ? "fill-gold" : ""}`} />
                </button>
              </div>
            )}
            {product.price === 0 && (
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <button
                  onClick={handleAdd}
                  className="flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-gold text-ink font-medium tracking-wide"
                >
                  Demander un devis
                </button>
                <button
                  onClick={() => toggle(product.id)}
                  className={`inline-flex items-center justify-center w-14 h-14 border transition-colors ${
                    has(product.id)
                      ? "border-gold bg-gold/15 text-gold"
                      : "border-gold/40 text-gold/60 hover:border-gold hover:text-gold"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${has(product.id) ? "fill-gold" : ""}`} />
                </button>
              </div>
            )}

            <div className="mt-10 flex items-center gap-3 text-xs text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-gold" />
              Livraison & installation par nos équipes. Garantie 5 ans.
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="py-24 mt-16 border-t border-gold/10">
            <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-8">Vous pourriez aimer</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
