import { ChevronDown } from "lucide-react";

export type SortOption = {
  value: string;
  label: string;
};

export const SORT_OPTIONS: SortOption[] = [
  { value: "popular", label: "Les plus populaires" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
  { value: "newest", label: "Nouveautés" },
  { value: "name-asc", label: "Nom A → Z" },
];

type SortSelectProps = {
  value: string;
  onChange: (v: string) => void;
};

const SortSelect = ({ value, onChange }: SortSelectProps) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-card border border-gold/20 pl-4 pr-10 py-3 text-sm text-foreground focus:outline-none focus:border-gold/60 transition-colors cursor-pointer"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/60 pointer-events-none" />
    </div>
  );
};

export default SortSelect;
