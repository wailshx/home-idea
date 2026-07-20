import { ROOM_TYPES, ROOM_META } from "@/lib/configurator-data";
import { useConfigurator } from "@/contexts/ConfiguratorContext";
import {
  ChefHat,
  Sofa,
  Bed,
  Lightbulb,
  Frame,
  Layers,
  Square,
  Armchair,
  Check,
} from "lucide-react";

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  ChefHat,
  Sofa,
  Bed,
  Lightbulb,
  Frame,
  Layers,
  Square,
  Armchair,
};

const RoomSelector = () => {
  const { config, toggleActiveRoom, setActive } = useConfigurator();

  return (
    <div>
      <div className="text-center mb-12">
        <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-4">
          Étape 1
        </div>
        <h2 className="font-display text-3xl lg:text-5xl mb-4">
          Choisissez vos espaces
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Sélectionnez les pièces que vous souhaitez personnaliser. Chaque espace
          devient une toile pour votre vision.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {ROOM_TYPES.map((type) => {
          const meta = ROOM_META[type];
          const isActive = config.activeRooms.includes(type);
          const Icon = ICON_MAP[meta.icon] || Square;
          const hasSelections = Object.keys(config.rooms[type].selections).length > 0;

          return (
            <button
              key={type}
              onClick={() => toggleActiveRoom(type)}
              className={`group relative aspect-[3/4] overflow-hidden border transition-all duration-500 ${
                isActive
                  ? "border-gold shadow-gold"
                  : "border-gold/15 hover:border-gold/50"
              }`}
            >
              <img
                src={meta.image}
                alt={meta.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />

              {isActive && (
                <div className="absolute top-3 right-3 w-7 h-7 grid place-items-center bg-gradient-gold text-ink">
                  <Check className="w-4 h-4" />
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-5">
                <Icon className="w-6 h-6 text-gold mb-2" />
                <h3 className="font-display text-xl mb-1">{meta.name}</h3>
                <p className="text-[10px] tracking-[0.2em] uppercase text-gold/60">
                  {meta.tagline}
                </p>
                {isActive && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActive(type);
                    }}
                    className="mt-3 text-[10px] tracking-[0.2em] uppercase text-gold border-b border-gold/40 pb-0.5 hover:text-gold-soft transition-colors"
                  >
                    {hasSelections ? "Personnaliser" : "Commencer"} →
                  </button>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RoomSelector;
