import { Link } from "react-router-dom";
import { Instagram, Mail, MapPin } from "lucide-react";
import { categories } from "@/lib/products";

const Footer = () => {
  return (
    <footer className="mt-32 border-t border-gold/15 bg-gradient-to-b from-transparent to-black/60">
      <div className="container py-20 grid gap-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 grid place-items-center relative">
              <div className="absolute inset-0 rotate-45 bg-gradient-gold" />
              <span className="relative font-display text-ink text-lg leading-none">H</span>
            </div>
            <div className="font-display text-xl">Home Idea</div>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
            Mobilier de luxe & aménagement complet. Du premier croquis à l'installation finale.
          </p>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.3em] text-gold mb-4">Collections</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link to={`/collection/${c.slug}`} className="hover:text-gold transition-colors">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.3em] text-gold mb-4">Maison</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/amenagement" className="hover:text-gold transition-colors">Service Aménagement</Link></li>
            <li><Link to="/a-propos" className="hover:text-gold transition-colors">À propos</Link></li>
            <li><Link to="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.3em] text-gold mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 text-gold" />
              <span>Showroom Home Idea</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gold" />
              <a href="mailto:contact@homeidea.co" className="hover:text-gold">contact@homeidea.co</a>
            </li>
            <li className="flex items-center gap-2">
              <Instagram className="w-4 h-4 text-gold" />
              <a href="https://www.instagram.com/ho_me__idea" target="_blank" rel="noreferrer" className="hover:text-gold">
                @ho_me__idea
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gold/10">
        <div className="container py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Home Idea. Tous droits réservés.</p>
          <p className="tracking-[0.3em] uppercase text-gold/70">Du design à l'exécution</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
