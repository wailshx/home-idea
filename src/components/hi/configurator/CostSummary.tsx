import { useConfigurator } from "@/contexts/ConfiguratorContext";
import { ROOM_META } from "@/lib/configurator-data";
import { Calculator } from "lucide-react";

const CostSummary = () => {
  const { config, activeRoom, totalCost, getRoomCost } = useConfigurator();

  return (
    <div className="border border-gold/15 bg-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 grid place-items-center border border-gold/30">
          <Calculator className="w-5 h-5 text-gold" />
        </div>
        <div>
          <h3 className="font-display text-lg">Estimation</h3>
          <p className="text-[10px] tracking-[0.2em] uppercase text-gold/60">
            Budget prévisionnel
          </p>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {config.activeRooms.map((type) => {
          const meta = ROOM_META[type];
          const cost = getRoomCost(type);
          const room = config.rooms[type];
          const selectionCount = Object.keys(room.selections).length;

          return (
            <div
              key={type}
              className={`flex items-center justify-between py-2 px-3 transition-colors ${
                activeRoom === type ? "bg-gold/10 border-l-2 border-gold" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">{meta.name}</span>
                {selectionCount > 0 && (
                  <span className="text-[10px] text-gold/60">
                    ({selectionCount})
                  </span>
                )}
              </div>
              <span className="text-sm text-gold font-medium">
                {cost.toLocaleString("fr-FR")} €
              </span>
            </div>
          );
        })}
      </div>

      {config.activeRooms.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-6">
          Sélectionnez des espaces pour commencer
        </p>
      )}

      {config.activeRooms.length > 0 && (
        <div className="border-t border-gold/15 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm tracking-[0.15em] uppercase text-gold">
              Total estimé
            </span>
            <span className="font-display text-2xl text-gradient-gold">
              {totalCost.toLocaleString("fr-FR")} €
            </span>
          </div>
          <p className="text-[10px] text-muted-foreground mt-2">
            * Estimation indicative. Prix finaux sur devis.
          </p>
        </div>
      )}
    </div>
  );
};

export default CostSummary;
