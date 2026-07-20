import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="min-h-[70vh] pt-32 pb-16 container text-center">
    <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-4">404</div>
    <h1 className="font-display text-6xl lg:text-8xl mb-6 text-gradient-gold">Page introuvable</h1>
    <p className="text-muted-foreground mb-10 max-w-md mx-auto">
      Cette pièce n'existe pas dans notre maison. Retournons à l'entrée.
    </p>
    <Link to="/" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-gold text-ink tracking-wide">
      Retour à l'accueil
    </Link>
  </div>
);

export default NotFound;
