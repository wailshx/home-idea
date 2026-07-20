import { useState } from "react";
import { categories, Category } from "@/lib/products";
import { ChevronDown, ChevronUp, X } from "lucide-react";

export type Filters = {
  subcategory: string;
  minPrice: number;
  maxPrice: number;
  materials: string[];
};

const ALL_MATERIALS = ["Velours", "Marbre", "Laiton", "Verre", "Bois", "Métal", "LED"];

const PRICE_RANGES = [
  { label: "Tous les prix", min: 0, max: Infinity },
  { label: "Moins de 500 €", min: 0, max: 499 },
  { label: "500 € — 1 500 €", min: 500, max: 1500 },
  { label: "1 500 € — 3 000 €", min: 1500, max: 3000 },
  { label: "Plus de 3 000 €", min: 3000, max: Infinity },
];

type FilterPanelProps = {
  filters: Filters;
  onChange: (f: Filters) => void;
  category?: Category;
};

const Collapsible = ({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gold/10 py-5">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-[11px] tracking-[0.25em] uppercase text-gold/80 hover:text-gold transition-colors"
      >
        {title}
        {open ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </button>
      {open && <div className="mt-4">{children}</div>}
    </div>
  );
};

const FilterPanel = ({ filters, onChange, category }: FilterPanelProps) => {
  const subcategories = category?.subcategories ?? [];

  const toggleMaterial = (mat: string) => {
    const next = filters.materials.includes(mat)
      ? filters.materials.filter((m) => m !== mat)
      : [...filters.materials, mat];
    onChange({ ...filters, materials: next });
  };

  const activeCount =
    (filters.subcategory ? 1 : 0) +
    (filters.minPrice > 0 || filters.maxPrice < Infinity ? 1 : 0) +
    filters.materials.length;

  const clearAll = () =>
    onChange({ subcategory: "", minPrice: 0, maxPrice: Infinity, materials: [] });

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-display text-lg">Filtres</h3>
        {activeCount > 0 && (
          <button
            onClick={clearAll}
            className="text-[10px] tracking-[0.2em] uppercase text-gold/60 hover:text-gold flex items-center gap-1 transition-colors"
          >
            <X className="w-3 h-3" /> Effacer ({activeCount})
          </button>
        )}
      </div>

      {/* Subcategories */}
      {subcategories.length > 0 && (
        <Collapsible title="Sous-catégorie">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onChange({ ...filters, subcategory: "" })}
              className={`px-3 py-1.5 text-[11px] tracking-[0.15em] uppercase border transition-colors ${
                !filters.subcategory
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-gold/20 text-muted-foreground hover:border-gold/50"
              }`}
            >
              Tout
            </button>
            {subcategories.map((s) => (
              <button
                key={s}
                onClick={() => onChange({ ...filters, subcategory: s })}
                className={`px-3 py-1.5 text-[11px] tracking-[0.15em] uppercase border transition-colors ${
                  filters.subcategory === s
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-gold/20 text-muted-foreground hover:border-gold/50"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </Collapsible>
      )}

      {/* Price */}
      <Collapsible title="Prix">
        <div className="space-y-2">
          {PRICE_RANGES.map((range) => (
            <button
              key={range.label}
              onClick={() => onChange({ ...filters, minPrice: range.min, maxPrice: range.max })}
              className={`block w-full text-left px-3 py-2 text-sm border transition-colors ${
                filters.minPrice === range.min && filters.maxPrice === range.max
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-gold/10 text-muted-foreground hover:border-gold/40"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </Collapsible>

      {/* Materials */}
      <Collapsible title="Matériaux">
        <div className="flex flex-wrap gap-2">
          {ALL_MATERIALS.map((mat) => (
            <button
              key={mat}
              onClick={() => toggleMaterial(mat)}
              className={`px-3 py-1.5 text-[11px] tracking-[0.15em] uppercase border transition-colors ${
                filters.materials.includes(mat)
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-gold/20 text-muted-foreground hover:border-gold/50"
              }`}
            >
              {mat}
            </button>
          ))}
        </div>
      </Collapsible>
    </div>
  );
};

export default FilterPanel;
