import { Link } from "react-router-dom";
import { Product } from "@/lib/products";
import { ArrowUpRight } from "lucide-react";

const ProductCard = ({ product, index = 0 }: { product: Product; index?: number }) => {
  return (
    <Link
      to={`/produit/${product.slug}`}
      className="group block perspective-1000 anim-rise"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="card-3d relative overflow-hidden bg-card border border-gold/15 hover:border-gold/60 transition-colors">
        <div className="aspect-[4/5] overflow-hidden bg-ink relative">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
          {product.isNew && (
            <span className="absolute top-4 left-4 text-[10px] tracking-[0.3em] uppercase text-ink bg-gradient-gold px-3 py-1">
              Nouveau
            </span>
          )}
          <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/70 backdrop-blur border border-gold/40 grid place-items-center opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            <ArrowUpRight className="w-4 h-4 text-gold" />
          </div>
        </div>
        <div className="p-5">
          <div className="text-[10px] tracking-[0.3em] uppercase text-gold/80 mb-2">{product.subcategory}</div>
          <h3 className="font-display text-xl mb-1 leading-tight group-hover:text-gold transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground mb-4 line-clamp-1">{product.short}</p>
          <div className="flex items-center justify-between">
            <span className="font-display text-lg">
              {product.price > 0 ? `${product.price.toLocaleString("fr-FR")} €` : "Sur devis"}
            </span>
            <span className="text-[10px] tracking-[0.25em] uppercase text-gold border-b border-gold/40 pb-0.5">
              Découvrir
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
