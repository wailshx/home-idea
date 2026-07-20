import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, X, ShoppingBag, ArrowRight } from "lucide-react";

const Cart = () => {
  const { detailed, updateQty, remove, subtotal, count } = useCart();

  return (
    <div className="pt-28 pb-16">
      <div className="container max-w-6xl">
        <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-4">Panier</div>
        <h1 className="font-display text-5xl mb-12">Votre sélection</h1>

        {detailed.length === 0 ? (
          <div className="border border-gold/15 p-16 text-center">
            <ShoppingBag className="w-12 h-12 text-gold mx-auto mb-6 opacity-60" />
            <p className="text-muted-foreground mb-6">Votre panier est vide.</p>
            <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 border border-gold/50 hover:bg-gold/10 text-gold tracking-widest text-xs uppercase">
              Explorer les collections <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-4">
              {detailed.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-5 p-5 border border-gold/15 bg-card">
                  <Link to={`/produit/${product.slug}`} className="w-28 h-28 shrink-0 overflow-hidden bg-ink">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </Link>
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-[10px] tracking-[0.3em] uppercase text-gold/80 mb-1">{product.subcategory}</div>
                        <Link to={`/produit/${product.slug}`} className="font-display text-xl hover:text-gold transition-colors">
                          {product.name}
                        </Link>
                      </div>
                      <button onClick={() => remove(product.id)} className="p-1 text-muted-foreground hover:text-gold">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-4">
                      <div className="inline-flex items-center border border-gold/30">
                        <button onClick={() => updateQty(product.id, quantity - 1)} className="p-2 hover:bg-gold/10">
                          <Minus className="w-3 h-3 text-gold" />
                        </button>
                        <span className="w-10 text-center text-sm">{quantity}</span>
                        <button onClick={() => updateQty(product.id, quantity + 1)} className="p-2 hover:bg-gold/10">
                          <Plus className="w-3 h-3 text-gold" />
                        </button>
                      </div>
                      <div className="font-display text-lg">
                        {(product.price * quantity).toLocaleString("fr-FR")} €
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="border border-gold/20 p-6 h-fit bg-card sticky top-28">
              <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-4">Récapitulatif</div>
              <div className="space-y-3 text-sm border-b border-gold/15 pb-4 mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Articles</span>
                  <span>{count}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sous-total</span>
                  <span>{subtotal.toLocaleString("fr-FR")} €</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Livraison</span>
                  <span className="text-gold">Estimée au checkout</span>
                </div>
              </div>
              <div className="flex justify-between items-baseline mb-6">
                <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">Total</span>
                <span className="font-display text-3xl text-gradient-gold">{subtotal.toLocaleString("fr-FR")} €</span>
              </div>
              <Link
                to="/commande"
                className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-gradient-gold text-ink font-medium tracking-wide"
              >
                Passer commande <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/" className="mt-4 block text-center text-xs tracking-[0.3em] uppercase text-muted-foreground hover:text-gold">
                Continuer les achats
              </Link>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
