import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getProduct, productsByCategory } from "@/lib/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
  Check,
  ShieldCheck,
  Heart,
  Truck,
  Clock,
  Award,
  FileText,
  Share2,
  RotateCcw,
} from "lucide-react";
import ProductCard from "@/components/hi/ProductCard";
import ProductGallery from "@/components/hi/product/ProductGallery";
import Viewer360 from "@/components/hi/product/Viewer360";
import MaterialsPanel from "@/components/hi/product/MaterialsPanel";
import DimensionsDiagram from "@/components/hi/product/DimensionsDiagram";
import ReviewsSection from "@/components/hi/product/ReviewsSection";
import QuoteForm from "@/components/hi/product/QuoteForm";
import { toast } from "sonner";

type Tab = "description" | "materials" | "dimensions" | "reviews" | "quote";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProduct(slug) : undefined;
  const navigate = useNavigate();
  const { add } = useCart();
  const { has, toggle } = useWishlist();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("description");
  const [show360, setShow360] = useState(false);

  if (!product) {
    return (
      <div className="pt-32 container">
        <p className="text-muted-foreground">Produit introuvable.</p>
        <Link to="/" className="text-gold link-gold">
          Retour à l'accueil
        </Link>
      </div>
    );
  }

  const related = productsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  const handleAdd = () => {
    if (product.price === 0) {
      setActiveTab("quote");
      return;
    }
    add(product.id, qty);
    setAdded(true);
    toast.success(`${product.name} ajouté au panier`);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Lien copié dans le presse-papier");
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: "description", label: "Description" },
    { key: "materials", label: "Matériaux" },
    { key: "dimensions", label: "Dimensions" },
    ...(product.reviews && product.reviews.length > 0
      ? [{ key: "reviews" as Tab, label: `Avis (${product.reviews.length})` }]
      : []),
    ...(product.price === 0 ? [{ key: "quote" as Tab, label: "Demander un devis" }] : []),
  ];

  return (
    <div className="pt-28">
      <div className="container">
        {/* Breadcrumb */}
        <Link
          to={`/collection/${product.category}`}
          className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-gold mb-8 link-gold"
        >
          <ArrowLeft className="w-4 h-4" /> {product.category}
        </Link>

        {/* Hero section */}
        <div className="grid lg:grid-cols-2 gap-14 items-start mb-20">
          {/* Left — Gallery */}
          <div className="anim-rise">
            {show360 ? (
              <Viewer360 images={product.gallery} name={product.name} />
            ) : (
              <ProductGallery
                images={product.gallery}
                name={product.name}
                isNew={product.isNew}
              />
            )}
            <button
              onClick={() => setShow360(!show360)}
              className="mt-4 flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-gold/60 hover:text-gold transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              {show360 ? "Retour à la galerie" : "Voir en 360°"}
            </button>
          </div>

          {/* Right — Info */}
          <div className="anim-rise" style={{ animationDelay: "150ms" }}>
            {/* Category */}
            <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-3">
              {product.subcategory}
            </div>

            {/* Title */}
            <h1 className="font-display text-4xl lg:text-5xl mb-4">{product.name}</h1>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i <= Math.round(product.rating!)
                          ? "fill-gold text-gold"
                          : "text-gold/20"
                      }`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating.toFixed(1)} ({product.reviewCount} avis)
                </span>
              </div>
            )}

            {/* Short description */}
            <p className="text-muted-foreground text-lg italic mb-6">{product.short}</p>

            {/* Price */}
            <div className="font-display text-4xl text-gradient-gold mb-8">
              {product.price > 0
                ? `${product.price.toLocaleString("fr-FR")} €`
                : "Sur devis"}
            </div>

            {/* SKU & Meta */}
            <div className="flex flex-wrap gap-4 text-[10px] tracking-[0.2em] uppercase text-gold/50 mb-8">
              {product.sku && <span>SKU: {product.sku}</span>}
              {product.weight && <span>Poids: {product.weight}</span>}
            </div>

            {/* Description */}
            <p className="text-foreground/80 leading-relaxed mb-8">{product.description}</p>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 mb-8 py-6 border-y border-gold/15">
              <div className="text-center">
                <Truck className="w-5 h-5 text-gold mx-auto mb-2" />
                <div className="text-[10px] tracking-[0.15em] uppercase text-gold/70">
                  Livraison
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {product.deliveryWeeks
                    ? `${product.deliveryWeeks} sem.`
                    : "Sur devis"}
                </div>
              </div>
              <div className="text-center">
                <Clock className="w-5 h-5 text-gold mx-auto mb-2" />
                <div className="text-[10px] tracking-[0.15em] uppercase text-gold/70">
                  Garantie
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {product.warranty || "5 ans"}
                </div>
              </div>
              <div className="text-center">
                <Award className="w-5 h-5 text-gold mx-auto mb-2" />
                <div className="text-[10px] tracking-[0.15em] uppercase text-gold/70">
                  Fabrication
                </div>
                <div className="text-xs text-muted-foreground mt-1">Artisanale</div>
              </div>
            </div>

            {/* Quantity + Actions */}
            {product.price > 0 ? (
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="inline-flex items-center border border-gold/40">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="p-3 hover:bg-gold/10"
                  >
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
                  {added ? (
                    <>
                      <Check className="w-4 h-4" /> Ajouté
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" /> Ajouter au panier
                    </>
                  )}
                </button>
              </div>
            ) : (
              <button
                onClick={handleAdd}
                className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-gold text-ink font-medium tracking-wide mb-4"
              >
                <FileText className="w-4 h-4" /> Demander un devis
              </button>
            )}

            {/* Wishlist + Share */}
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => toggle(product.id)}
                className={`flex items-center gap-2 px-5 py-3 border text-sm transition-colors ${
                  has(product.id)
                    ? "border-gold bg-gold/15 text-gold"
                    : "border-gold/40 text-gold/60 hover:border-gold hover:text-gold"
                }`}
              >
                <Heart className={`w-4 h-4 ${has(product.id) ? "fill-gold" : ""}`} />
                {has(product.id) ? "Dans vos souhaits" : "Ajouter aux souhaits"}
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-5 py-3 border border-gold/40 text-sm text-gold/60 hover:border-gold hover:text-gold transition-colors"
              >
                <Share2 className="w-4 h-4" /> Partager
              </button>
            </div>

            {/* Guarantee text */}
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
              Livraison & installation par nos équipes. Garantie 5 ans.
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t border-gold/10 pt-12 mb-20">
          <div className="flex flex-wrap gap-1 mb-10 border-b border-gold/10">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3 text-xs tracking-[0.2em] uppercase transition-colors relative ${
                  activeTab === tab.key
                    ? "text-gold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-gold" />
                )}
              </button>
            ))}
          </div>

          <div className="max-w-3xl anim-rise" key={activeTab}>
            {activeTab === "description" && (
              <div>
                <p className="text-foreground/80 leading-relaxed text-lg mb-6">
                  {product.description}
                </p>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="p-5 border border-gold/10">
                    <div className="text-[10px] tracking-[0.2em] uppercase text-gold mb-2">
                      Caractéristiques
                    </div>
                    <ul className="text-sm space-y-2 text-foreground/70">
                      <li className="flex justify-between">
                        <span>Catégorie</span>
                        <span className="text-foreground">{product.subcategory}</span>
                      </li>
                      {product.sku && (
                        <li className="flex justify-between">
                          <span>Référence</span>
                          <span className="text-foreground">{product.sku}</span>
                        </li>
                      )}
                      {product.weight && (
                        <li className="flex justify-between">
                          <span>Poids</span>
                          <span className="text-foreground">{product.weight}</span>
                        </li>
                      )}
                      <li className="flex justify-between">
                        <span>Dimensions</span>
                        <span className="text-foreground">{product.dimensions}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-5 border border-gold/10">
                    <div className="text-[10px] tracking-[0.2em] uppercase text-gold mb-2">
                      Livraison
                    </div>
                    <ul className="text-sm space-y-2 text-foreground/70">
                      <li className="flex justify-between">
                        <span>Délai estimé</span>
                        <span className="text-foreground">
                          {product.deliveryWeeks
                            ? `${product.deliveryWeeks} semaines`
                            : "Sur devis"}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span>Garantie</span>
                        <span className="text-foreground">
                          {product.warranty || "5 ans"}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span>Installation</span>
                        <span className="text-foreground">Incluse</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "materials" && (
              <MaterialsPanel materials={product.materials} />
            )}

            {activeTab === "dimensions" && (
              <DimensionsDiagram
                dimensions={product.dimensions}
                dimensionValues={product.dimensionValues}
              />
            )}

            {activeTab === "reviews" && product.reviews && (
              <ReviewsSection
                reviews={product.reviews}
                rating={product.rating}
                reviewCount={product.reviewCount}
              />
            )}

            {activeTab === "quote" && (
              <QuoteForm productName={product.name} productPrice={product.price} />
            )}
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="py-24 border-t border-gold/10">
            <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-8">
              Vous pourriez aimer
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
