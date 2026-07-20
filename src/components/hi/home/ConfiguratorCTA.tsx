import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const ConfiguratorCTA = () => (
  <section className="relative overflow-hidden py-28">
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/95 to-ink/80" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-gold/30 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-gold/20 blur-[100px]" />
      </div>
    </div>

    <div className="container relative">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 border border-gold/30 mb-8">
          <Sparkles className="w-3 h-3 text-gold" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-gold">
            Nouveau — Configurateur
          </span>
        </div>

        <h2 className="font-display text-4xl lg:text-6xl mb-6">
          Concevez votre
          <br />
          <span className="text-gradient-gold">espace sur mesure</span>
        </h2>

        <p className="text-lg text-muted-foreground mb-10 italic max-w-lg mx-auto">
          Choisissez chaque détail — du sol au plafond — et visualisez votre
          intérieur de luxe en temps réel.
        </p>

        <Link
          to="/configurateur"
          className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-gold text-ink font-medium tracking-wide text-sm hover:opacity-90 transition-opacity"
        >
          Lancer le configurateur
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  </section>
);

export default ConfiguratorCTA;
