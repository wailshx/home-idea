import { Link } from "react-router-dom";
import { useWishlist } from "@/contexts/WishlistContext";
import ProductCard from "@/components/hi/ProductCard";
import { ArrowLeft, Heart } from "lucide-react";

const Wishlist = () => {
  const { items, count } = useWishlist();

  return (
    <div className="pt-20">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 to-background" />
        <div className="container relative py-24 lg:py-32">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-gold mb-6 link-gold"
          >
            <ArrowLeft className="w-4 h-4" /> Accueil
          </Link>
          <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-4">Votre sélection</div>
          <h1 className="font-display text-5xl lg:text-7xl mb-4">Liste de souhait</h1>
          <p className="text-lg text-muted-foreground max-w-xl italic">
            {count > 0
              ? `${count} pièce${count > 1 ? "s" : ""} sélectionnée${count > 1 ? "s" : ""}`
              : "Aucune pièce pour l'instant"}
          </p>
        </div>
      </section>

      <section className="container py-14">
        {items.length === 0 ? (
          <div className="py-20 text-center">
            <Heart className="w-12 h-12 text-gold/30 mx-auto mb-6" />
            <p className="text-muted-foreground mb-6">Votre liste de souhait est vide.</p>
            <Link
              to="/collection"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-gold text-ink font-medium tracking-wide"
            >
              Découvrir nos collections
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Wishlist;
