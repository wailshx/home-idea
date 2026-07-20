import type { ConfigOption } from "@/lib/configurator-data";
import { Check } from "lucide-react";

type ColorPickerProps = {
  options: ConfigOption[];
  selected: string;
  onSelect: (id: string) => void;
};

const ColorPicker = ({ options, selected, onSelect }: ColorPickerProps) => (
  <div className="flex flex-wrap gap-3">
    {options.map((opt) => (
      <button
        key={opt.id}
        onClick={() => onSelect(opt.id)}
        className="group relative flex flex-col items-center gap-2"
        title={opt.name}
      >
        <div
          className={`w-12 h-12 rounded-full border-2 transition-all duration-300 ${
            selected === opt.id
              ? "border-gold scale-110 shadow-gold"
              : "border-gold/30 hover:border-gold/60 hover:scale-105"
          }`}
          style={{ backgroundColor: opt.color || "#333" }}
        >
          {selected === opt.id && (
            <div className="w-full h-full grid place-items-center">
              <Check className="w-4 h-4 text-gold drop-shadow-lg" />
            </div>
          )}
        </div>
        <span className="text-[10px] tracking-wider text-muted-foreground group-hover:text-gold transition-colors text-center leading-tight max-w-[70px]">
          {opt.name.split(" ").slice(-1)}
        </span>
      </button>
    ))}
  </div>
);

export default ColorPicker;
