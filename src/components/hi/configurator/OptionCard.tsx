import type { ConfigOption } from "@/lib/configurator-data";
import { Check } from "lucide-react";

type OptionCardProps = {
  option: ConfigOption;
  selected: boolean;
  onSelect: (id: string) => void;
};

const OptionCard = ({ option, selected, onSelect }: OptionCardProps) => (
  <button
    onClick={() => onSelect(option.id)}
    className={`relative group text-left p-4 border transition-all duration-300 ${
      selected
        ? "border-gold bg-gold/10 shadow-gold"
        : "border-gold/15 hover:border-gold/40 bg-card"
    }`}
  >
    {selected && (
      <div className="absolute top-3 right-3 w-6 h-6 grid place-items-center bg-gradient-gold text-ink">
        <Check className="w-3.5 h-3.5" />
      </div>
    )}

    {option.color && (
      <div
        className="w-full h-16 mb-3 border border-gold/20"
        style={{ backgroundColor: option.color }}
      />
    )}

    {option.material && (
      <div className="text-[10px] tracking-[0.2em] uppercase text-gold/60 mb-1">
        {option.material}
      </div>
    )}

    <h4 className="font-display text-sm mb-1 group-hover:text-gold transition-colors">
      {option.name}
    </h4>

    {option.description && (
      <p className="text-xs text-muted-foreground mb-2">{option.description}</p>
    )}

    <div className="text-sm text-gold">
      {option.priceDelta > 0
        ? `+ ${option.priceDelta.toLocaleString("fr-FR")} €`
        : option.priceDelta === 0
        ? "Inclus"
        : ""}
    </div>
  </button>
);

export default OptionCard;
