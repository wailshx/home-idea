import React, { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { useConfigurator } from "@/contexts/ConfiguratorContext";
import { ROOM_META, calculateRoomCost } from "@/lib/configurator-data";
import { ArrowLeft, Share2 } from "lucide-react";
import { toast } from "sonner";

const RoomScene = React.lazy(() => import("./room-scenes/RoomScene"));

const LuxuryPreview = () => {
  const { config, totalCost, completedRooms } = useConfigurator();
  const navigate = useNavigate();

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Lien copié dans le presse-papier");
  };

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container">
        <div className="flex items-center gap-4 mb-10">
          <button
            onClick={() => navigate("/configurateur")}
            className="flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-gold hover:text-gold-soft transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Retour au configurateur
          </button>
        </div>

        <div className="text-center mb-12">
          <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-4">
            Aperçu Luxe
          </div>
          <h1 className="font-display text-4xl lg:text-6xl mb-4">
            Votre Vision
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto italic">
            Une preview de votre espace personnalisé, avec estimation détaillée.
          </p>
        </div>

        {/* 3D Preview */}
        <div className="relative aspect-video max-w-4xl mx-auto mb-16 gold-border shadow-deep overflow-hidden bg-ink">
          <div className="absolute inset-0">
            <Suspense
              fallback={
                <div className="w-full h-full grid place-items-center">
                  <div className="text-center">
                    <div className="w-12 h-12 border-2 border-gold/30 border-t-gold rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-xs tracking-[0.2em] uppercase text-gold/60">
                      Chargement de la scène 3D…
                    </p>
                  </div>
                </div>
              }
            >
              <RoomScene />
            </Suspense>
          </div>
          <div className="absolute bottom-4 left-4 text-[10px] tracking-[0.2em] uppercase text-gold/50 bg-background/60 backdrop-blur px-3 py-1.5">
            Aperçu 3D interactif — rotation automatique
          </div>
        </div>

        {/* Summary grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {completedRooms.map((type) => {
            const meta = ROOM_META[type];
            const room = config.rooms[type];
            const cost = calculateRoomCost(room);
            const selections = Object.values(room.selections)
              .map((id) => room.options.find((o) => o.id === id))
              .filter(Boolean);

            return (
              <div
                key={type}
                className="border border-gold/15 p-6 hover:border-gold/40 transition-colors"
              >
                <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-2">
                  {meta.name}
                </div>
                <ul className="space-y-1 mb-4">
                  {selections.map((opt) => (
                    <li key={opt!.id} className="text-sm text-foreground/80">
                      — {opt!.name}
                    </li>
                  ))}
                </ul>
                <div className="text-sm text-gold font-medium">
                  {cost.toLocaleString("fr-FR")} €
                </div>
              </div>
            );
          })}
        </div>

        {/* Total */}
        <div className="text-center py-12 border-t border-b border-gold/15 mb-12">
          <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-4">
            Investissement total
          </div>
          <div className="font-display text-5xl lg:text-7xl text-gradient-gold mb-4">
            {totalCost.toLocaleString("fr-FR")} €
          </div>
          <p className="text-sm text-muted-foreground">
            Estimation indicative. Contactez-nous pour un devis personnalisé.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-8 py-4 border border-gold/40 text-sm text-gold hover:border-gold hover:bg-gold/10 transition-colors"
          >
            <Share2 className="w-4 h-4" /> Partager ma configuration
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="flex items-center gap-3 px-10 py-4 bg-gradient-gold text-ink font-medium tracking-wide text-sm"
          >
            Demander un devis gratuit
          </button>
        </div>
      </div>
    </div>
  );
};

export default LuxuryPreview;
