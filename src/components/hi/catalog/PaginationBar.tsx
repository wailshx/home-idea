import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationBarProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const PaginationBar = ({ page, totalPages, onPageChange }: PaginationBarProps) => {
  if (totalPages <= 1) return null;

  const pages: (number | "...")[] = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (page > 3) pages.push("...");
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
      pages.push(i);
    }
    if (page < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  return (
    <div className="flex items-center justify-center gap-2 pt-10">
      <button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="w-10 h-10 grid place-items-center border border-gold/20 text-gold/60 hover:border-gold/60 hover:text-gold disabled:opacity-30 disabled:pointer-events-none transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`dots-${i}`} className="px-2 text-gold/30">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-10 h-10 grid place-items-center border text-sm transition-colors ${
              p === page
                ? "border-gold bg-gold/15 text-gold"
                : "border-gold/20 text-muted-foreground hover:border-gold/50 hover:text-foreground"
            }`}
          >
            {p}
          </button>
        )
      )}
      <button
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="w-10 h-10 grid place-items-center border border-gold/20 text-gold/60 hover:border-gold/60 hover:text-gold disabled:opacity-30 disabled:pointer-events-none transition-colors"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default PaginationBar;
