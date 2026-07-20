import { Link, NavLink } from "react-router-dom";
import { ShoppingBag, Heart, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { categories } from "@/lib/products";

const Navbar = () => {
  const { count } = useCart();
  const { count: wishlistCount } = useWishlist();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/85 backdrop-blur-xl border-b border-gold/15" : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 grid place-items-center">
            <div className="absolute inset-0 rotate-45 bg-gradient-gold opacity-90 group-hover:rotate-[135deg] transition-transform duration-700" />
            <span className="relative font-display text-ink text-lg leading-none">H</span>
          </div>
          <div className="leading-tight">
            <div className="font-display text-xl tracking-wide">Home Idea</div>
            <div className="text-[10px] tracking-[0.3em] text-gold/80 uppercase">Design · Exécution</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8 text-sm">
          <NavLink to="/" end className="link-gold">Accueil</NavLink>
          <NavLink to="/collection" className="link-gold">Collection</NavLink>
          {categories.filter((c) => c.slug !== "amenagement").map((c) => (
            <NavLink key={c.slug} to={`/collection/${c.slug}`} className="link-gold">
              {c.name}
            </NavLink>
          ))}
          <NavLink to="/amenagement" className="link-gold">Aménagement</NavLink>
          <NavLink to="/configurateur" className="link-gold">Configurateur</NavLink>
          <NavLink to="/contact" className="link-gold">Contact</NavLink>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to="/liste-de-souhaits"
            className="relative inline-flex items-center gap-2 px-4 py-2 border border-gold/40 hover:border-gold hover:bg-gold/10 transition-colors group"
          >
            <Heart className="w-4 h-4 text-gold" />
            <span className="hidden sm:inline text-xs uppercase tracking-widest">Souhaits</span>
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gradient-gold text-ink text-[10px] font-semibold grid place-items-center">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link
            to="/panier"
            className="relative inline-flex items-center gap-2 px-4 py-2 border border-gold/40 hover:border-gold hover:bg-gold/10 transition-colors group"
          >
            <ShoppingBag className="w-4 h-4 text-gold" />
            <span className="hidden sm:inline text-xs uppercase tracking-widest">Panier</span>
            {count > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gradient-gold text-ink text-[10px] font-semibold grid place-items-center">
                {count}
              </span>
            )}
          </Link>
          <button
            className="lg:hidden p-2 border border-gold/30"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5 text-gold" /> : <Menu className="w-5 h-5 text-gold" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-gold/15 bg-background/95 backdrop-blur-xl">
          <nav className="container py-6 grid gap-4 text-sm">
            <NavLink onClick={() => setOpen(false)} to="/" end className="link-gold">Accueil</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/collection" className="link-gold">Collection</NavLink>
            {categories.filter((c) => c.slug !== "amenagement").map((c) => (
              <NavLink key={c.slug} onClick={() => setOpen(false)} to={`/collection/${c.slug}`} className="link-gold">
                {c.name}
              </NavLink>
            ))}
            <NavLink onClick={() => setOpen(false)} to="/amenagement" className="link-gold">Aménagement</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/configurateur" className="link-gold">Configurateur</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/contact" className="link-gold">Contact</NavLink>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
