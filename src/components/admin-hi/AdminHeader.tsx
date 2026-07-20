import { Link } from "react-router-dom";
import { Search, Bell, Menu, Home } from "lucide-react";

const AdminHeader = ({ onToggleMobile }: { onToggleMobile: () => void }) => {
  return (
    <header className="h-20 border-b border-gold/15 bg-card/80 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-40">
      <button onClick={onToggleMobile} className="lg:hidden p-2 hover:bg-gold/10 transition-colors" aria-label="Menu">
        <Menu className="w-5 h-5 text-gold" />
      </button>

      <div className="flex-1 max-w-md mx-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/50" />
          <input
            type="text"
            placeholder="Rechercher..."
            aria-label="Rechercher"
            className="w-full pl-10 pr-4 py-2.5 bg-background border border-gold/15 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/40 transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 px-3 py-2 text-xs tracking-[0.15em] uppercase text-gold/60 hover:text-gold border border-gold/20 hover:border-gold/40 transition-colors"
        >
          <Home className="w-3.5 h-3.5" /> Site
        </Link>
        <button className="relative p-2 hover:bg-gold/10 transition-colors" aria-label="Notifications">
          <Bell className="w-5 h-5 text-gold/60" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-gold rounded-full" />
        </button>
        <div className="w-9 h-9 rounded-full bg-gradient-gold grid place-items-center text-ink font-display text-sm">
          A
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
