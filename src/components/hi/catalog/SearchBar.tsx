import { Search, X } from "lucide-react";

type SearchBarProps = {
  value: string;
  onChange: (v: string) => void;
};

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="relative flex-1 max-w-md">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/60" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Rechercher un produit..."
        className="w-full pl-11 pr-10 py-3 bg-card border border-gold/20 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold/60 transition-colors"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 grid place-items-center hover:bg-gold/10 rounded-full transition-colors"
        >
          <X className="w-3 h-3 text-gold" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
